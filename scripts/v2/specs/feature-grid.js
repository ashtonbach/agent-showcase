// Feature grid: 6 cards with inline SVG icons in 3/2/1 columns.
module.exports = {
  art: 6, // design-led (the designer): artwork slots, masked from the pixel diff
  async check({ sec, ok, w }) {
    const c = sec.locator("ul > li");
    ok((await c.count()) === 6, `6 cards (${await c.count()})`);
    ok((await sec.locator("ul > li [data-art]").count()) === 6, "icon on every card (artwork or inline SVG fallback)");
    const xs = new Set((await c.evaluateAll((n) => n.map((x) => Math.round(x.getBoundingClientRect().left)))));
    const want = w > 900 ? 3 : w > 600 ? 2 : 1;
    ok(xs.size === want, `${xs.size} column(s) at ${w}px (want ${want})`);
  },
};
