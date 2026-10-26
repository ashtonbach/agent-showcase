// Browser check: no horizontal overflow in any of the six locales at 1280 and 390 wide.
// Switches locale through the single six-locale switcher (same scoping as lab-locales.e2e.js).
// Run: BASE=https://<preview> node scripts/v2/lab-overflow.e2e.js [shotDir]   (shotDir: saves he-1280.png, he-390.png)
const { chromium } = require("playwright");
const { settle } = require("./settle");
const BASE = process.env.BASE || "http://localhost:3000", SHOTS = process.argv[2];
const LOCALES = ["en-US", "es-ES", "pt-BR", "de-DE", "he-IL", "ja-JP"];
const WIDTHS = [1280, 390];
(async () => {
  const b = await chromium.launch(); let fail = 0, n = 0;
  for (const w of WIDTHS) {
    const page = await b.newPage({ viewport: { width: w, height: 900 } });
    await page.goto(BASE, { waitUntil: "networkidle" });
    const all = page.locator("section[data-lab]"), cnt = await all.count(), idx = [];
    for (let i = 0; i < cnt; i++) {
      const c = await all.nth(i).evaluate((s) => [...s.querySelectorAll("button[data-locale]")].filter((x) => x.closest("section[data-lab]") === s).length);
      if (c === LOCALES.length) idx.push(i);
    }
    if (idx.length !== 1) { console.log(`FAIL ${w}px expected exactly 1 section[data-lab] with ${LOCALES.length} locale buttons, found ${idx.length}`); fail++; await page.close(); continue; }
    const sec = all.nth(idx[0]);
    const depth = await sec.evaluate((s) => { let d = 0; for (let e = s; e; e = e.parentElement && e.parentElement.closest("section[data-lab]")) d++; return d; });
    for (const l of LOCALES) {
      n++;
      await sec.locator(`xpath=.//button[@data-locale="${l}"][count(ancestor::section[@data-lab]) = ${depth}]`).click(); await page.waitForFunction((l) => document.documentElement.lang === l, l, { timeout: 3000 }).catch(() => {}); await settle(page, null, { label: `${w}px ${l}` });
      const r = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth, lang: document.documentElement.lang, dir: document.documentElement.dir }));
      const ok = r.sw <= r.iw; if (!ok) fail++;
      console.log(`${ok ? "PASS" : "FAIL"} ${w}px ${l} lang=${r.lang} dir=${r.dir || "ltr"} scrollWidth=${r.sw} innerWidth=${r.iw}`);
      if (SHOTS && l === "he-IL") await page.screenshot({ path: `${SHOTS}/he-${w}.png` });
    }
    await page.close();
  }
  await b.close(); console.log(fail ? `FAIL ${fail} of ${n}` : `PASS all ${n} (6 locales x 2 widths) have no horizontal overflow`); process.exit(fail ? 1 : 0);
})();
