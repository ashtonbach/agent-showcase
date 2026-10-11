// Testimonial card: quote+name+role, rotates every 3s, pauses on hover; dots are buttons that jump to a quote and restart the timer.
module.exports = {
  art: 1, // design-led (Naomi Sato): artwork slots, masked from the pixel diff
  async beforeShot({ sec }) { await sec.hover(); },
  async check({ sec, ok }) {
    ok(await sec.locator("blockquote").isVisible(), "quote visible");
    ok((await sec.locator("figcaption strong").count()) === 1 && (await sec.locator("figcaption .label").count()) === 1, "name and role shown");
    const dots = sec.locator(".lab-dots button");
    const n = await dots.count();
    ok(n >= 2, `dots are buttons (${n})`);
    let labels = true; for (let k = 0; k < n; k++) labels = labels && (await dots.nth(k).getAttribute("aria-label")) === `Show quote ${k + 1}`;
    ok(labels, "dots labelled 'Show quote N'");
    ok((await sec.locator('.lab-dots button[aria-current="true"]').count()) === 1, "exactly one dot aria-current");
  },
  async after({ page, sec, ok }) {
    await page.mouse.move(0, 0);
    const q = sec.locator("blockquote");
    const i0 = await q.getAttribute("data-index");
    await page.waitForTimeout(3500);
    const i1 = await q.getAttribute("data-index");
    ok(i1 !== i0, `rotates after 3s (quote ${i0} -> ${i1})`);
    // keyboard: focus a different dot and press Enter
    const target = (Number(i1) + 2) % 3;
    const dot = sec.locator(".lab-dots button").nth(target);
    await dot.focus();
    ok(await dot.evaluate((e) => document.activeElement === e), "dot is keyboard focusable");
    const outline = await dot.evaluate((e) => getComputedStyle(e).outlineStyle);
    await page.keyboard.press("Enter");
    ok((await q.getAttribute("data-index")) === String(target), `dot ${target + 1} jumps to quote ${target}`);
    ok(outline !== "none", `visible focus (outline ${outline})`);
    ok((await dot.getAttribute("aria-current")) === "true", "clicked dot is aria-current");
    // timer restarted: still on target ~2s after the click, moved on by ~3.5s
    await page.waitForTimeout(2000);
    ok((await q.getAttribute("data-index")) === String(target), "dot click restarts the 3s timer");
    await page.waitForTimeout(1500);
    ok((await q.getAttribute("data-index")) !== String(target), "rotates again 3s after the click");
    await sec.hover();
    const i2 = await q.getAttribute("data-index");
    await page.waitForTimeout(3500);
    ok((await q.getAttribute("data-index")) === i2, "pauses while hovered");
  },
};
