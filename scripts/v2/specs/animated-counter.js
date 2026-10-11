// Animated counter: 3 stats count up in view, stop at exact values, respect reduced motion.
const vals = (sec) => sec.locator("strong[data-final]").evaluateAll((n) => n.map((x) => [x.textContent.trim(), x.dataset.final]));
module.exports = {
  async check({ page, sec, ok }) {
    ok((await sec.locator("strong[data-final]").count()) === 3, "3 stats");
    await page.waitForTimeout(1800);
    const v = await vals(sec);
    ok(v.every(([a, b]) => a === b), `stopped at exact values (${v.map((x) => x[0]).join(", ")})`);
  },
  async after({ page, ok, ctx, w }) {
    const p2 = await ctx.browser().newPage({ viewport: { width: w, height: 800 }, reducedMotion: "reduce" });
    await p2.goto(page.url(), { waitUntil: "networkidle" });
    const v = await vals(p2.locator('section[data-lab="animated-counter"]'));
    ok(v.every(([a, b]) => a === b), `reduced motion shows final values at once (${v.map((x) => x[0]).join(", ")})`);
    await p2.close();
  },
};
