// Tabs: 3 tabs, arrow keys, correct roles.
module.exports = {
  async check({ sec, ok }) {
    const t = sec.locator('[role="tablist"] [role="tab"]');
    ok((await t.count()) === 3, `3 tabs in a tablist (${await t.count()})`);
    ok((await sec.locator('[role="tabpanel"]').count()) === 3, "3 tabpanels");
    const ctl = await t.evaluateAll((n) => n.every((x) => document.getElementById(x.getAttribute("aria-controls"))?.getAttribute("role") === "tabpanel"));
    ok(ctl, "every tab's aria-controls points to a tabpanel");
  },
  async after({ page, sec, ok }) {
    const t = sec.locator('[role="tab"]');
    const sel = () => t.evaluateAll((n) => n.findIndex((x) => x.getAttribute("aria-selected") === "true"));
    const vis = async (i) => page.locator("#" + (await t.nth(i).getAttribute("aria-controls"))).isVisible();
    await t.nth(0).focus(); await page.keyboard.press("ArrowRight");
    ok((await sel()) === 1 && (await vis(1)) && !(await vis(0)), "ArrowRight selects tab 2 and shows its panel");
    await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowRight");
    ok((await sel()) === 0, "ArrowRight wraps to tab 1");
    await page.keyboard.press("ArrowLeft");
    ok((await sel()) === 2, "ArrowLeft wraps to tab 3");
    ok(await t.nth(2).evaluate((x) => x === document.activeElement && x.tabIndex === 0), "focus follows selection (roving tabindex)");
  },
};
