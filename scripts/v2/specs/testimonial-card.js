// Testimonial card: quote+name+role, rotates every 5s, pauses on hover.
module.exports = {
  async beforeShot({ sec }) { await sec.hover(); },
  async check({ sec, ok }) {
    ok(await sec.locator("blockquote").isVisible(), "quote visible");
    ok((await sec.locator("figcaption strong").count()) === 1 && (await sec.locator("figcaption .label").count()) === 1, "name and role shown");
  },
  async after({ page, sec, ok }) {
    await page.mouse.move(0, 0);
    const q = sec.locator("blockquote");
    const i0 = await q.getAttribute("data-index");
    await page.waitForTimeout(5600);
    const i1 = await q.getAttribute("data-index");
    ok(i1 !== i0, `rotates after 5s (quote ${i0} -> ${i1})`);
    await sec.hover();
    await page.waitForTimeout(5600);
    ok((await q.getAttribute("data-index")) === i1, "pauses while hovered");
  },
};
