// FAQ accordion: 4 questions, one open at a time, keyboard Enter/Space, aria-expanded correct.
module.exports = {
  async check({ sec, ok }) {
    const q = sec.locator("button[aria-expanded]");
    ok((await q.count()) === 4, `4 questions (${await q.count()})`);
  },
  async after({ page, sec, ok }) {
    const q = sec.locator("button[aria-expanded]");
    const state = async () => Promise.all([0, 1, 2, 3].map(async (i) => ({ e: await q.nth(i).getAttribute("aria-expanded"), v: await page.locator("#" + (await q.nth(i).getAttribute("aria-controls"))).isVisible() })));
    await q.nth(0).click(); let s = await state();
    ok(s[0].e === "true" && s[0].v && s.slice(1).every((x) => x.e === "false" && !x.v), "click opens question 1 only, aria-expanded matches");
    await q.nth(1).focus(); await page.keyboard.press("Enter"); s = await state();
    ok(s[1].e === "true" && s[1].v && s[0].e === "false" && !s[0].v, "Enter opens question 2 and closes question 1");
    await q.nth(2).focus(); await page.keyboard.press(" "); s = await state();
    ok(s[2].e === "true" && s.filter((x) => x.e === "true").length === 1, "Space opens question 3, still only one open");
    await page.keyboard.press(" "); s = await state();
    ok(s.every((x) => x.e === "false" && !x.v), "Space again closes it");
  },
};
