// Spanish translation: one toggle switches the page's own visible text English <-> Español and back.
// Exact strings live here (single source); the kit spec text for Jonah lists the same pairs.
const PAIRS = {
  h1: ["Spanish translation", "Traducción al español"],
  about: ["About", "Acerca de"],
  contact: ["Contact", "Contacto"],
  disclaimer: ["Features and content for this demo were created by AI.", "Las funciones y el contenido de esta demo fueron creados por IA."],
  h2: ["Read this page in Spanish", "Lee esta página en español"],
  button: ["Español", "English"],
};
const read = (page, sec) => page.evaluate((s) => {
  const t = (e) => (e ? e.textContent.trim() : null);
  const sec = document.querySelector(s), nav = [...document.querySelectorAll("nav[aria-label] a")];
  return {
    lang: document.documentElement.lang, h1: t(document.querySelector("h1.demo-title")),
    about: t(nav[0]), contact: t(nav[1]), disclaimer: t(document.querySelector(".site-disclaimer")),
    h2: t(sec && sec.querySelector("h2")), button: t(sec && sec.querySelector("button[aria-pressed]")),
    pressed: sec && sec.querySelector("button[aria-pressed]") && sec.querySelector("button[aria-pressed]").getAttribute("aria-pressed"),
  };
}, sec);
const expect = (ok, st, i, tag) => {
  for (const k of Object.keys(PAIRS)) ok(st[k] === PAIRS[k][i], `${tag}: ${k} reads "${PAIRS[k][i]}" (got "${st[k]}")`);
  ok(st.lang === (i ? "es" : "en"), `${tag}: html lang="${i ? "es" : "en"}" (got "${st.lang}")`);
  ok(st.pressed === (i ? "true" : "false"), `${tag}: aria-pressed=${i ? "true" : "false"} (got ${st.pressed})`);
};
module.exports = {
  async check({ page, sec, ok }) {
    ok((await sec.locator("button[aria-pressed]").count()) === 1, "one language toggle button with aria-pressed");
    expect(ok, await read(page, 'section[data-lab="spanish-translation"]'), 0, "English on load");
  },
  async after({ page, sec, ok }) {
    const S = 'section[data-lab="spanish-translation"]', btn = sec.locator("button[aria-pressed]");
    await btn.click(); await page.waitForTimeout(150);
    expect(ok, await read(page, S), 1, "Español after toggle");
    await btn.click(); await page.waitForTimeout(150);
    expect(ok, await read(page, S), 0, "English after toggling back");
  },
};
