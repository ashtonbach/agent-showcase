// Browser check: each language button switches the visible heading and paragraphs live.
// Run against a running build: BASE=http://localhost:3000 node scripts/v2/lab-locales.e2e.js [shotDir]
const { chromium } = require("playwright");
const BASE = process.env.BASE || "http://localhost:3000", SHOTS = process.argv[2];
const LOCALES = ["en-US", "es-ES", "fr-FR", "zh-CN", "ja-JP", "de-DE", "pt-BR"];
(async () => {
  const b = await chromium.launch(); const page = await b.newPage({ viewport: { width: 1024, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  const sec = page.locator("section[data-lab]").filter({ has: page.locator("button[data-locale]") });
  const read = () => sec.evaluate((s) => [...s.querySelectorAll("[data-i18n]")].map((e) => e.textContent.trim()).join("|"));
  const seen = new Map(); let fail = 0;
  for (const l of LOCALES) {
    await sec.locator(`button[data-locale="${l}"]`).click(); await page.waitForTimeout(200);
    const t = await read(), pressed = await sec.locator(`button[data-locale="${l}"]`).getAttribute("aria-pressed");
    const dup = [...seen].find(([, v]) => v === t);
    const ok = pressed === "true" && !dup && t.length > 20; if (!ok) fail++;
    console.log(`${ok ? "PASS" : "FAIL"} ${l} lang=${await page.evaluate(() => document.documentElement.lang)} text="${t.slice(0, 50)}"`);
    seen.set(l, t);
    if (SHOTS && (l === "fr-FR" || l === "zh-CN")) { await sec.scrollIntoViewIfNeeded(); await page.screenshot({ path: `${SHOTS}/sc-lang-${l.slice(0, 2)}.png` }); }
  }
  await b.close(); console.log(fail ? `FAIL ${fail}` : `PASS all ${LOCALES.length} locales switch text`); process.exit(fail ? 1 : 0);
})();
