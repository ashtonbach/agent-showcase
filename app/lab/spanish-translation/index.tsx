"use client";

import { useEffect, useState } from "react";
import en from "../../../messages/en-US.json";
import es from "../../../messages/es-ES.json";

type Locale = "en-US" | "es-ES";
const pack: Record<Locale, Record<string, string>> = { "en-US": en, "es-ES": es };
const css = `
.lab-es { width: min(720px, 100%); margin: 8px auto 56px; }
.lab-es p { color: var(--mist); line-height: 1.65; margin: 0 0 16px; }
.lab-es-cta { display: inline-block; margin: 0 0 20px; color: var(--sage); font-family: var(--sans); text-decoration: none; }
.lab-es-lang { display: inline-flex; margin-top: 8px; }
.lab-es-lang button {
  font-family: var(--sans); font-size: 14px; font-weight: 500;
  padding: 8px 18px; cursor: pointer; color: var(--mist);
  background: transparent; border: 1px solid var(--sage);
}
.lab-es-lang button[aria-pressed="true"] { background: var(--sage); color: #14201A; }
.lab-es-lang button + button { border-left: none; }
`;
function apply(locale: Locale) {
  document.documentElement.lang = locale;
  const dict = pack[locale];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key && dict[key]) el.textContent = dict[key];
  });
}

export default function SpanishTranslation() {
  const [locale, setLocale] = useState<Locale>("en-US");
  const t = pack[locale];
  useEffect(() => { apply(locale); }, [locale]);
  return (
    <section className="lab-es" data-lab="spanish-translation" aria-labelledby="lab-es-h">
      <style>{css}</style>
      <h2 id="lab-es-h" data-i18n="lab.spanish-translation.heading">{t["lab.spanish-translation.heading"]}</h2>
      <p data-i18n="lab.spanish-translation.p1">{t["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{t["lab.spanish-translation.p2"]}</p>
      <a className="lab-es-cta" data-cta="" data-i18n="lab.spanish-translation.cta" href="https://agents-live.davidashtonwells.workers.dev/">{t["lab.spanish-translation.cta"]}</a>
      <div className="lab-es-lang" role="group" aria-label="Language">
        <button type="button" data-locale="en-US" aria-pressed={locale === "en-US"} onClick={() => setLocale("en-US")}>English</button>
        <button type="button" data-locale="es-ES" aria-pressed={locale === "es-ES"} onClick={() => setLocale("es-ES")}>Español</button>
      </div>
    </section>
  );
}
