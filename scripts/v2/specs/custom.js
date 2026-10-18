// Typed request (Local runs, slug custom-<timestamp>): one-off content, so only generic checks apply on top of the shared ones
// (section present, h2 first with no eyebrow, no sideways scroll, no console errors, no off-site requests). No reference image.
module.exports = {
  noRef: true,
  async check({ sec, ok }) {
    const t = ((await sec.innerText()) || "").trim();
    ok(t.length > 0, "feature shows visible text");
  },
};
