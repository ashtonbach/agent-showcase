// Dark mode toggle: button switches theme, AA contrast both themes, survives reload.
const contrast = (page) => page.evaluate(() => {
  const L = (c) => { const v = c.match(/[\d.]+/g).slice(0, 3).map((x) => +x / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4)); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
  const bg = getComputedStyle(document.documentElement).backgroundColor, fg = getComputedStyle(document.body).color;
  const a = L(bg), b = L(fg); return { ratio: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05), theme: document.documentElement.dataset.theme };
});
module.exports = {
  async check({ page, sec, ok }) {
    const btn = sec.locator("button[aria-pressed]");
    ok((await btn.count()) === 1, "one toggle button with aria-pressed");
    const c0 = await contrast(page);
    ok(c0.ratio >= 4.5, `dark theme contrast ${c0.ratio.toFixed(1)}:1 (AA 4.5)`);
  },
  async after({ page, sec, ok }) {
    const btn = sec.locator("button[aria-pressed]");
    const before = await btn.getAttribute("aria-pressed");
    await btn.click(); await page.waitForTimeout(150);
    const c1 = await contrast(page);
    ok((await btn.getAttribute("aria-pressed")) !== before && c1.theme === "light", `click switches theme (now ${c1.theme})`);
    ok(c1.ratio >= 4.5, `light theme contrast ${c1.ratio.toFixed(1)}:1 (AA 4.5)`);
    await page.reload({ waitUntil: "networkidle" }); await page.waitForTimeout(200);
    const c2 = await contrast(page);
    ok(c2.theme === "light", `choice survives reload (theme ${c2.theme})`);
    await page.evaluate(() => localStorage.removeItem("ab-theme"));
  },
};
