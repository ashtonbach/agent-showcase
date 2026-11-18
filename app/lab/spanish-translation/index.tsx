"use client";
import { useCallback, useState } from "react";
import enUS from "../../../messages/en-US.json";
import esES from "../../../messages/es-ES.json";

type Locale = "en-US" | "es-ES";
const packs: Record<Locale, Record<string, string>> = {
  "en-US": { ...(enUS as Record<string, string>) },
  "es-ES": { ...(esES as Record<string, string>) },
};

function applyLocale(loc: Locale) {
  const dict = packs[loc];
  document.documentElement.lang = loc;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (key && dict[key]) node.textContent = dict[key];
  });
}

export default function SpanishTranslation() {
  const [locale, setLocale] = useState<Locale>("en-US");
  const copy = packs[locale];
  const choose = useCallback((loc: Locale) => {
    setLocale(loc);
    applyLocale(loc);
  }, []);

  return (
    <section data-lab="spanish-translation" aria-labelledby="lab-st-heading">
      <style>{`
        .lab-st-wrap { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #F2EFE6); }
        .lab-st-wrap h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.25; margin: 0 0 16px; }
        .lab-st-wrap p { margin: 0 0 14px; line-height: 1.55; color: var(--mist, #E8EEE9); }
        .lab-st-switch { display: inline-flex; gap: 0; margin-top: 8px; }
        .lab-st-switch button {
          font-family: var(--sans); font-size: 14px; padding: 10px 18px; cursor: pointer; border: 1px solid var(--sage);
          background: transparent; color: var(--mist, #F2EFE6);
        }
        .lab-st-switch button:first-child { border-radius: 8px 0 0 8px; }
        .lab-st-switch button:last-child { border-radius: 0 8px 8px 0; margin-left: -1px; }
        .lab-st-switch button[aria-pressed="true"] { background: var(--sage); color: #14201A; border-color: var(--sage); }
        .lab-st-switch button:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) { .lab-st-switch button { transition: none; } }
        @media (prefers-reduced-motion: no-preference) { .lab-st-switch button { transition: background-color .15s, color .15s; } }
      `}</style>
      <div className="lab-st-wrap">
        <h2 id="lab-st-heading" data-i18n="lab.spanish-translation.heading">
          {copy["lab.spanish-translation.heading"]}
        </h2>
        <p data-i18n="lab.spanish-translation.p1">{copy["lab.spanish-translation.p1"]}</p>
        <p data-i18n="lab.spanish-translation.p2">{copy["lab.spanish-translation.p2"]}</p>
        <div className="lab-st-switch" role="group" aria-label="Language">
          <button type="button" data-locale="en-US" aria-pressed={locale === "en-US"} onClick={() => choose("en-US")}>
            English
          </button>
          <button type="button" data-locale="es-ES" aria-pressed={locale === "es-ES"} onClick={() => choose("es-ES")}>
            Español
          </button>
        </div>
      </div>
    </section>
  );
}