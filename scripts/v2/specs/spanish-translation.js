// Spanish translation: one toggle switches the page's own visible text English <-> Español and back.
// Page chrome strings are fixed by the kit (exact pairs). The section's own content (h2, 1-2 p[data-copy], [data-cta]) is
// written by Jonah during the run, so it is NOT compared to fixed text: ES must be non-empty, read as Spanish and differ from
// EN for every element, and toggling back must restore the exact original EN text.
const PAIRS = {
  h1: ["Spanish translation", "Traducción al español"],
  about: ["About", "Acerca de"],
  contact: ["Contact", "Contacto"],
  disclaimer: ["Features and content for this demo were created by AI.", "Las funciones y el contenido de esta demo fueron creados por IA."],
  skip: ["Skip to content", "Saltar al contenido"],
  button: ["Español", "English"],
};
const S = 'section[data-lab="spanish-translation"]';
const SPANISH = /[áéíóúñ¿¡]|\b(el|la|los|las|del|que|y|en|un|una|es|para|con|por|su|al)\b/i;
const readS = (page) => page.evaluate((s) => {
  const t = (e) => (e ? e.textContent.trim() : null);
  const sec = document.querySelector(s), nav = [...document.querySelectorAll("nav[aria-label] a")];
  const tog = sec && sec.querySelector("button[aria-pressed]");
  return {
    lang: document.documentElement.lang, h1: t(document.querySelector("h1.demo-title")),
    about: t(nav[0]), contact: t(nav[1]), disclaimer: t(document.querySelector(".site-disclaimer")), skip: t(document.querySelector(".skip-link")),
    button: t(tog), pressed: tog && tog.getAttribute("aria-pressed"),
    content: sec ? [...sec.querySelectorAll("h2"), ...sec.querySelectorAll("p[data-copy]"), ...sec.querySelectorAll("[data-cta]")].map(t) : [],
    nH2: sec ? sec.querySelectorAll("h2").length : 0, nP: sec ? sec.querySelectorAll("p[data-copy]").length : 0,
    nCta: sec ? sec.querySelectorAll("[data-cta]").length : 0,
  };
}, S);
const fixed = (ok, st, i, tag) => {
  for (const k of Object.keys(PAIRS)) ok(st[k] === PAIRS[k][i], `${tag}: ${k} reads "${PAIRS[k][i]}" (got "${st[k]}")`);
  ok(st.lang === (i ? "es" : "en"), `${tag}: html lang="${i ? "es" : "en"}" (got "${st.lang}")`);
  ok(st.pressed === (i ? "true" : "false"), `${tag}: aria-pressed=${i ? "true" : "false"} (got ${st.pressed})`);
};
const name = (st, j) => (j < st.nH2 ? "heading" : j < st.nH2 + st.nP ? `paragraph ${j - st.nH2 + 1}` : "call to action");
module.exports = {
  async check({ page, sec, ok }) {
    ok((await sec.locator("button[aria-pressed]").count()) === 1, "one language toggle button with aria-pressed");
    const st = await readS(page);
    ok(st.nH2 === 1, `one h2 heading in the section (got ${st.nH2})`);
    ok(st.nP >= 1 && st.nP <= 2, `one or two p[data-copy] paragraphs (got ${st.nP})`);
    ok(st.nCta === 1, `one [data-cta] call to action (got ${st.nCta})`);
    st.content.forEach((x, j) => ok(!!x && x.length >= (j >= st.nH2 && j < st.nH2 + st.nP ? 40 : 2), `English on load: ${name(st, j)} has real text (${(x || "").length} chars)`));
    fixed(ok, st, 0, "English on load");
  },
  async after({ page, sec, ok }) {
    const btn = sec.locator("button[aria-pressed]");
    const en = await readS(page);
    await btn.click(); await page.waitForTimeout(150);
    const es = await readS(page);
    fixed(ok, es, 1, "Español after toggle");
    ok(es.content.length === en.content.length, `Español: same content elements (${es.content.length} vs ${en.content.length})`);
    en.content.forEach((x, j) => {
      const y = es.content[j], n = name(en, j);
      ok(!!y && y.length > 0, `Español: ${n} non-empty`);
      ok(y !== x, `Español: ${n} changed from English ("${(y || "").slice(0, 50)}")`);
      ok(!!y && SPANISH.test(y), `Español: ${n} reads as Spanish ("${(y || "").slice(0, 50)}")`);
    });
    await btn.click(); await page.waitForTimeout(150);
    const back = await readS(page);
    fixed(ok, back, 0, "English after toggling back");
    en.content.forEach((x, j) => ok(back.content[j] === x, `English after toggling back: ${name(en, j)} restored exactly`));
  },
};
