// Pricing table: 3 tiers, middle highlighted, stacks on mobile, no sideways scroll.
module.exports = {
  art: 1, // design-led (Hazel): artwork slots, masked from the pixel diff
  async check({ sec, ok, w }) {
    const t = sec.locator(":scope > ul > li");
    ok((await t.count()) === 3, `3 tiers (${await t.count()})`);
    ok((await t.nth(1).getAttribute("data-best")) === "true" && (await t.nth(0).getAttribute("data-best")) === null, "middle tier highlighted");
    const bx = await Promise.all([0, 1, 2].map((i) => t.nth(i).boundingBox()));
    if (w <= 600) ok(bx[0].y < bx[1].y && bx[1].y < bx[2].y && Math.abs(bx[0].x - bx[1].x) < 2, "tiers stack vertically on mobile");
    else ok(Math.abs(bx[0].y - bx[1].y) < 2 && bx[0].x < bx[1].x && bx[1].x < bx[2].x, "tiers side by side on desktop");
  },
};
