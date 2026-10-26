// Spanish translation (scalable i18n). Base text lives in messages/en-US.json and every visible string is rendered with
// data-i18n="<key>". The builder adds messages/es-ES.json (Spain Spanish, their own translation, same keys) and a segmented
// English | Español switch. QA never compares against fixed Spanish copy: it reads both message files from this checkout.
const fs = require("fs"), path = require("path");
const MSG = path.join(__dirname, "..", "..", "..", "messages");
const S = 'section[data-lab="spanish-translation"]';
const SPANISH = /[áéíóúñ¿¡]|\b(el|la|los|las|del|que|y|en|un|una|es|para|con|por|su|al|de)\b/i;
const load = (f) => { try { return JSON.parse(fs.readFileSync(path.join(MSG, f), "utf8")); } catch (e) { return null; } };
// Wait until every CSS transition/animation in the section has finished, so computed colors are the settled
// end state (a 150ms background-color transition sampled after a 150ms wait reads e.g. rgba(176,203,188,0.008)).
const settle = (page) => page.evaluate(async (s) => {
  const sec = document.querySelector(s); if (!sec || !sec.getAnimations) return;
  for (let i = 0; i < 20; i++) {
    const a = sec.getAnimations({ subtree: true }).filter((x) => x.playState !== "finished");
    if (!a.length) return;
    await Promise.race([Promise.all(a.map((x) => x.finished.catch(() => {}))), new Promise((r) => setTimeout(r, 2000))]);
  }
}, S);
const read = async (page) => { await settle(page); return readNow(page); };
const readNow = (page) => page.evaluate((s) => {
  const sec = document.querySelector(s), t = (e) => (e ? e.textContent.trim() : null);
  const seg = (loc) => { const b = sec && sec.querySelector(`button[data-locale="${loc}"]`); if (!b) return null;
    const cs = getComputedStyle(b); return { text: t(b), pressed: b.getAttribute("aria-pressed"), bg: cs.backgroundColor, border: cs.borderTopWidth }; };
  return {
    lang: document.documentElement.lang,
    items: [...document.querySelectorAll("[data-i18n]")].map((e) => ({ key: e.getAttribute("data-i18n"), tag: e.tagName.toLowerCase(),
      inSec: !!(sec && sec.contains(e)), cta: e.hasAttribute("data-cta"), text: t(e) })),
    nPressed: sec ? sec.querySelectorAll("button[aria-pressed]").length : 0, en: seg("en-US"), es: seg("es-ES"),
  };
}, S);
const clear = (bg) => !bg || bg === "transparent" || /rgba\(.*,\s*0\)$/.test(bg);
const segs = (ok, st, active, tag) => {
  const on = active === "en-US" ? st.en : st.es, off = active === "en-US" ? st.es : st.en;
  ok(st.lang === active, `${tag}: html lang="${active}" (got "${st.lang}")`);
  ok(on && on.pressed === "true" && off && off.pressed === "false", `${tag}: active segment ${active} aria-pressed=true, other false (got en-US ${st.en && st.en.pressed}, es-ES ${st.es && st.es.pressed})`);
  ok(on && !clear(on.bg), `${tag}: active segment is filled (background ${on && on.bg})`);
  ok(off && clear(off.bg) && parseFloat(off.border) >= 1, `${tag}: inactive segment is outlined, not filled (background ${off && off.bg}, border ${off && off.border})`);
};
const label = (it) => (it.inSec ? (it.cta ? "call to action" : it.tag === "h2" ? "heading" : it.tag === "p" ? "paragraph" : it.tag) : "page") + ` [${it.key}]`;
module.exports = {
  _test: { settle, read, readNow, segs },
  async check({ page, ok }) {
    const en = load("en-US.json"), es = load("es-ES.json");
    ok(!!en, "messages/en-US.json present (base text)");
    ok(!!es, "messages/es-ES.json present");
    if (en && es) {
      const miss = Object.keys(en).filter((k) => !(k in es)), extra = Object.keys(es).filter((k) => !(k in en));
      ok(!miss.length && !extra.length, `es-ES.json has exactly the en-US.json keys (missing: ${miss.join(", ") || "none"}; extra: ${extra.join(", ") || "none"})`);
      const empty = Object.keys(es).filter((k) => typeof es[k] !== "string" || !es[k].trim());
      ok(!empty.length, `es-ES.json values are non-empty strings (${empty.join(", ") || "all ok"})`);
    }
    const st = await read(page);
    ok(st.nPressed === 2 && st.en && st.es, `segmented switch: two buttons, data-locale="en-US" and "es-ES", each with aria-pressed (found ${st.nPressed})`);
    ok(st.en && st.en.text === "English" && st.es && st.es.text === "Español", `switch labels "English" | "Español" (got "${st.en && st.en.text}" | "${st.es && st.es.text}")`);
    const sec = st.items.filter((i) => i.inSec);
    ok(sec.filter((i) => i.tag === "h2").length === 1, "section has one h2 with data-i18n");
    const np = sec.filter((i) => i.tag === "p" && /\.p\d$/.test(i.key)).length;
    ok(np >= 1 && np <= 2, `section has one or two paragraphs with data-i18n (got ${np})`);
    ok(sec.filter((i) => i.cta).length === 0, "section has no [data-cta]");
    for (const k of ["skip", "nav.live", "nav.contact", "footer.disclaimer", "demo.spanish-translation"])
      ok(st.items.some((i) => i.key === k), `page renders "${k}" with data-i18n`);
    for (const it of st.items) ok(en && it.text === en[it.key], `English on load: ${label(it)} matches en-US.json`);
    segs(ok, st, "en-US", "English on load");
  },
  async after({ page, sec, ok }) {
    const en = load("en-US.json") || {}, es = load("es-ES.json") || {};
    const before = await read(page);
    await sec.locator('button[data-locale="es-ES"]').click(); await page.waitForTimeout(150);
    const st = await read(page);
    segs(ok, st, "es-ES", "Español");
    for (const it of st.items) {
      const b = before.items.find((x) => x.key === it.key), n = label(it);
      ok(!!it.text, `Español: ${n} non-empty`);
      ok(b && it.text !== b.text, `Español: ${n} differs from English ("${(it.text || "").slice(0, 50)}")`);
      ok(it.text === es[it.key], `Español: ${n} matches es-ES.json`);
      if (it.tag === "h1" || it.tag === "h2" || (it.text || "").length >= 30)
        ok(SPANISH.test(it.text || ""), `Español: ${n} reads as Spanish ("${(it.text || "").slice(0, 50)}")`);
    }
    await sec.locator('button[data-locale="en-US"]').click(); await page.waitForTimeout(150);
    const back = await read(page);
    segs(ok, back, "en-US", "English after switching back");
    for (const it of back.items) ok(it.text === en[it.key] && it.text === (before.items.find((x) => x.key === it.key) || {}).text, `English after switching back: ${label(it)} restored exactly`);
  },
};
