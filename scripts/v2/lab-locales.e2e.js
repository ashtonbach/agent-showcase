// Browser check: each language button switches the visible heading and paragraphs live.
// Run against a running build: BASE=http://localhost:3000 node scripts/v2/lab-locales.e2e.js [shotDir]
const { chromium } = require("playwright");
const BASE = process.env.BASE || "http://localhost:3000", SHOTS = process.argv[2];
const LOCALES = ["en-US", "es-ES", "pt-BR", "de-DE", "he-IL", "ja-JP"]; // 10/25: the six languages the live page shipped before #318 (en, es, pt, de, he, ja)
(async () => {
  const b = await chromium.launch(); const page = await b.newPage({ viewport: { width: 1024, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  // Scope to the one switcher that owns all six locale buttons. The page nests an older en/es section[data-lab]
  // inside it, so buttons inside a nested section don't count toward (or get clicked for) the outer one.
  const all = page.locator("section[data-lab]"), n = await all.count(), idx = [];
  for (let i = 0; i < n; i++) {
    const c = await all.nth(i).evaluate((s) => [...s.querySelectorAll("button[data-locale]")].filter((x) => x.closest("section[data-lab]") === s).length);
    if (c === LOCALES.length) idx.push(i);
  }
  if (idx.length !== 1) { console.log(`FAIL expected exactly 1 section[data-lab] with ${LOCALES.length} locale buttons, found ${idx.length}`); await b.close(); process.exit(1); }
  const sec = all.nth(idx[0]);
  const depth = await sec.evaluate((s) => { let d = 0; for (let e = s; e; e = e.parentElement.closest("section[data-lab]")) { d++; if (!e.parentElement) break; } return d; });
  const owned = (l) => `xpath=.//button[@data-locale="${l}"][count(ancestor::section[@data-lab]) = ${depth}]`;
  const read = () => sec.evaluate((s) => [...s.querySelectorAll("[data-i18n]")].map((e) => e.textContent.trim()).join("|"));
  const seen = new Map(); let fail = 0;
  for (const l of LOCALES) {
    await sec.locator(owned(l)).click(); await page.waitForTimeout(200);
    const t = await read(), pressed = await sec.locator(owned(l)).getAttribute("aria-pressed");
    const dup = [...seen].find(([, v]) => v === t);
    const ok = pressed === "true" && !dup && t.length > 20; if (!ok) fail++;
    console.log(`${ok ? "PASS" : "FAIL"} ${l} lang=${await page.evaluate(() => document.documentElement.lang)} text="${t.slice(0, 50)}"`);
    seen.set(l, t);
    if (SHOTS && (l === "he-IL" || l === "ja-JP")) { await sec.scrollIntoViewIfNeeded(); await page.screenshot({ path: `${SHOTS}/sc-lang-${l.slice(0, 2)}.png` }); }
  }
  await b.close(); console.log(fail ? `FAIL ${fail}` : `PASS all ${LOCALES.length} locales switch text`); process.exit(fail ? 1 : 0);
})();
