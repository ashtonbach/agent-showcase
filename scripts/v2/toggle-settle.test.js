#!/usr/bin/env node
// Spanish toggle check must read computed styles only after CSS transitions settle (run spanish-translation-1792995162:
// a .15s background-color transition sampled after a 150ms wait read rgba(176,203,188,0.008) and failed "outlined, not filled").
const assert = require("assert");
const { chromium } = require("playwright");
const spec = require("./specs/spanish-translation");
const { settle } = require("./settle");
const HTML = `<style>button{border:1px solid rgb(176,203,188);background-color:transparent;transition:background-color .6s linear}
button[aria-pressed="true"]{background-color:rgb(176,203,188)}</style>
<section data-lab="spanish-translation"><button data-locale="en-US" aria-pressed="false">English</button><button data-locale="es-ES" aria-pressed="true">Español</button></section>
<script>for (const b of document.querySelectorAll("button")) b.onclick = () => { for (const x of document.querySelectorAll("button")) x.setAttribute("aria-pressed", String(x === b)); document.documentElement.lang = b.dataset.locale; };</script>`;
(async () => {
  const b = await chromium.launch(); let n = 0;
  const t = async (name, f) => { await f(); n++; console.log("ok", name); };
  try {
    const page = await b.newPage({ reducedMotion: "no-preference" });
    const fresh = async () => { await page.setContent(HTML); await page.waitForTimeout(50); await page.click('button[data-locale="en-US"]'); await page.waitForTimeout(150); };
    await t("repro: sampling 150ms into the transition reads a partly filled inactive segment", async () => {
      await fresh(); const st = await spec._test.readNow(page);
      assert.ok(/rgba\(176, 203, 188, 0\.\d+\)/.test(st.es.bg), `expected mid-transition alpha, got ${st.es.bg}`);
    });
    await t("read() waits for the transition: inactive segment fully transparent, active fully filled", async () => {
      await fresh(); const st = await spec._test.read(page);
      assert.strictEqual(st.es.bg, "rgba(0, 0, 0, 0)"); assert.strictEqual(st.en.bg, "rgb(176, 203, 188)");
    });
    await t("assertion not weakened: a settled near-transparent fill still fails 'outlined, not filled'", async () => {
      await page.setContent(HTML.replace("background-color:transparent;", "background-color:rgba(176,203,188,0.008);"));
      const st = await spec._test.read(page); const fails = [];
      spec._test.segs((c, m) => { if (!c) fails.push(m); }, st, "es-ES", "x");
      assert.ok(fails.some((m) => /inactive segment is outlined, not filled/.test(m)), fails.join("; "));
    });
    await t("settle throws 'toggle did not settle within Ns' when a finite transition outlasts the cap", async () => {
      await page.setContent(HTML.replace(".6s linear", "10s linear")); await page.waitForTimeout(50);
      await page.click('button[data-locale="en-US"]'); const t0 = Date.now();
      await assert.rejects(spec._test.settle(page, 500), /toggle did not settle within 0\.5s/);
      assert.ok(Date.now() - t0 < 2000, "total wait is capped");
      await assert.rejects(spec._test.read(page), /toggle did not settle within 3s/);
    });
    await t("infinite animations (iterations === Infinity) are ignored, not waited on", async () => {
      await page.setContent(HTML + `<style>@keyframes spin{to{transform:rotate(1turn)}} .sp{animation:spin 1s linear infinite}</style>`);
      await page.evaluate(() => { const i = document.createElement("i"); i.className = "sp"; document.querySelector("section").append(i); });
      const t0 = Date.now(); await spec._test.settle(page); assert.ok(Date.now() - t0 < 1000);
      const st = await spec._test.read(page); assert.strictEqual(st.en.bg, "rgba(0, 0, 0, 0)");
    });
    await t("missing section fails with a clear error (no silent pass)", async () => {
      await page.setContent("<main>no lab here</main>");
      await assert.rejects(spec._test.read(page), /toggle cannot settle: no element matches section\[data-lab="spanish-translation"\]/);
      await assert.rejects(settle(page, "#nope", { label: "x" }), /x cannot settle: no element matches #nope/);
    });
    await t("no getAnimations support fails with a clear error", async () => {
      await page.setContent(HTML); await page.evaluate(() => { Element.prototype.getAnimations = undefined; });
      await assert.rejects(spec._test.read(page), /toggle cannot settle: getAnimations\(\) is not supported/);
    });
    await t("spanish spec has no fixed waits left", async () => {
      assert.ok(!/waitForTimeout/.test(require("fs").readFileSync(require.resolve("./specs/spanish-translation"), "utf8")));
    });
  } finally { await b.close(); }
  console.log(`toggle-settle: ${n}/8 passed`);
})().catch((e) => { console.error("FAIL", e.message); process.exit(1); });
