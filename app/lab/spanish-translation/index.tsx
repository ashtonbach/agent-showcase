"use client";

import { useEffect, useState } from "react";
import enUS from "../../../messages/en-US.json";
import esES from "../../../messages/es-ES.json";

type Messages = Record<string, string>;
type Locale = "en-US" | "es-ES";

const MESSAGES: Record<Locale, Messages> = { "en-US": enUS, "es-ES": esES };
const HEADING_ID = "spanish-translation-heading";
const KEYS = {
  heading: "lab.spanish-translation.heading",
  p1: "lab.spanish-translation.p1",
  p2: "lab.spanish-translation.p2",
};

// Walks every [data-i18n] node on the page (not just this section) so the shared chrome -
// skip link, nav, footer, the H1 - switches languages along with this feature.
function paintLocale(locale: Locale) {
  const dict = MESSAGES[locale];
  document.documentElement.lang = locale;
  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    const value = key ? dict[key] : undefined;
    if (value) node.textContent = value;
  });
}

const css = `
.lab-translate-shell{width:min(720px,100%);margin:8px auto 0}
.lab-translate-p{margin:0 0 16px;line-height:1.6;font-size:17px;color:var(--mist,#e8eee9)}
.lab-translate-switch{display:inline-flex;gap:10px;margin-top:8px}
.lab-translate-seg{font-family:var(--sans);font-weight:500;font-size:13px;letter-spacing:.04em;border-radius:999px;padding:10px 20px;cursor:pointer;border:1px solid var(--sage);background:transparent;color:var(--mist,#e8eee9)}
.lab-translate-seg.is-active{background:var(--sage);color:#14201A}
.lab-translate-seg:focus-visible{outline:2px solid var(--sage);outline-offset:3px}
`;

export default function SpanishTranslation() {
  const [locale, setLocale] = useState<Locale>("en-US");

  // Runs after mount only, so the first paint always matches the static English markup below -
  // no Date/Math.random here, just a DOM sync to keep the fixed/live content in step.
  useEffect(() => {
    paintLocale(locale);
  }, [locale]);

  const base = MESSAGES["en-US"];

  return (
    <section data-lab="spanish-translation" aria-labelledby={HEADING_ID}>
      <style>{css}</style>
      <h2 id={HEADING_ID} data-i18n={KEYS.heading}>
        {base[KEYS.heading]}
      </h2>
      <div className="lab-translate-shell">
        <p className="lab-translate-p" data-i18n={KEYS.p1}>
          {base[KEYS.p1]}
        </p>
        <p className="lab-translate-p" data-i18n={KEYS.p2}>
          {base[KEYS.p2]}
        </p>
        <div className="lab-translate-switch" role="group" aria-label="Language">
          <button
            type="button"
            data-locale="en-US"
            aria-pressed={locale === "en-US"}
            className={locale === "en-US" ? "lab-translate-seg is-active" : "lab-translate-seg"}
            onClick={() => setLocale("en-US")}
          >
            English
          </button>
          <button
            type="button"
            data-locale="es-ES"
            aria-pressed={locale === "es-ES"}
            className={locale === "es-ES" ? "lab-translate-seg is-active" : "lab-translate-seg"}
            onClick={() => setLocale("es-ES")}
          >
            Español
          </button>
        </div>
      </div>
    </section>
  );
}
