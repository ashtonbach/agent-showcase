// Timeline: 5 steps, horizontal on desktop, vertical on mobile.
module.exports = {
  async check({ sec, ok, w }) {
    const s = sec.locator("ol > li");
    ok((await s.count()) === 5, `5 steps (${await s.count()})`);
    const b = await s.evaluateAll((n) => n.map((x) => { const r = x.getBoundingClientRect(); return [r.left, r.top]; }));
    const horiz = b.every((p, i) => i === 0 || (Math.abs(p[1] - b[0][1]) < 2 && p[0] > b[i - 1][0]));
    const vert = b.every((p, i) => i === 0 || (Math.abs(p[0] - b[0][0]) < 2 && p[1] > b[i - 1][1]));
    if (w > 760) ok(horiz, "horizontal on desktop"); else ok(vert, "vertical on mobile");
  },
};
