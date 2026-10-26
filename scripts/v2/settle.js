// Shared settle helper: resolve once every finite CSS transition/animation under `selector` (or the whole document when
// selector is null) has finished, so computed styles and layout are read in their end state, not mid-transition.
// Throws "<label> did not settle within Ns" after timeoutMs total; infinite animations (iterations === Infinity, e.g.
// spinners) are ignored because they never finish. A missing root or a browser without getAnimations fails loudly.
async function settle(page, selector, { label = "page", timeoutMs = 3000 } = {}) {
  const r = await page.evaluate(async ({ selector, timeoutMs }) => {
    const root = selector ? document.querySelector(selector) : document;
    if (!root) return { err: "missing", detail: `no element matches ${selector}` };
    if (typeof root.getAnimations !== "function") return { err: "missing", detail: "getAnimations() is not supported in this browser" };
    const end = performance.now() + timeoutMs;
    const live = () => (root === document ? document.getAnimations() : root.getAnimations({ subtree: true })).filter((a) => {
      if (a.playState === "finished" || a.playState === "idle") return false;
      const t = a.effect && a.effect.getComputedTiming ? a.effect.getComputedTiming() : {};
      return t.iterations !== Infinity;
    });
    for (;;) {
      const a = live(); if (!a.length) return { ok: true };
      const left = end - performance.now(); if (left <= 0) return { err: "timeout", detail: `${a.length} still running` };
      await Promise.race([Promise.all(a.map((x) => x.finished.catch(() => {}))), new Promise((res) => setTimeout(res, left))]);
    }
  }, { selector, timeoutMs });
  if (r.err === "missing") throw new Error(`${label} cannot settle: ${r.detail}`);
  if (r.err === "timeout") throw new Error(`${label} did not settle within ${timeoutMs / 1000}s (${r.detail})`);
}
module.exports = { settle };
