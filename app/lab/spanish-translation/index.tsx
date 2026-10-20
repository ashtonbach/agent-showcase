"use client";

import { useCallback, useState } from "react";
import enUS from "../../../messages/en-US.json";
import esES from "../../../messages/es-ES.json";

type Locale = "en-US" | "es-ES";
const catalogs: Record<Locale, Record<string, string>> = {
  "en-US": enUS,
  "es-ES": esES,
};

function applyLocale(locale: Locale) {
  const dict = catalogs[locale];
  document.documentElement.lang = locale;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (key && dict[key]) node.textContent = dict[key];
  });
}

const css = `
.lab-spanish-wrap { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #f2efe6); }
.lab-spanish-wrap h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.25; margin: 0 0 16px; }
.lab-spanish-wrap p { margin: 0 0 14px; line-height: 1.55; color: #e8eee9; }
.lab-lang { display: flex; gap: 0; margin-top: 20px; width: fit-content; max-width: 100%; }
.lab-lang button { font-family: var(--sans); font-size: 14px; padding: 10px 18px; cursor: pointer; appearance: none; border: 1px solid var(--sage); background: none; background-color: rgba(0, 0, 0, 0); color: var(--mist, #f2efe6); transition: background-color 0.15s, color 0.15s; }
.lab-lang button:first-child { border-radius: 8px 0 0 8px; }
.lab-lang button:last-child { border-radius: 0 8px 8px 0; border-left: none; }
.lab-lang button[aria-pressed="true"] { background-color: var(--sage); color: #14201a; }
.lab-lang button[aria-pressed="false"] { background-color: rgba(0, 0, 0, 0); color: var(--mist, #f2efe6); }
@media (prefers-reduced-motion: reduce) { .lab-lang button { transition: none; } }
`;

export default function SpanishTranslation() {
  const [locale, setLocale] = useState<Locale>("en-US");
  const headingId = "lab-spanish-heading";
  const t = catalogs[locale];

  const pick = useCallback((next: Locale) => {
    setLocale(next);
    applyLocale(next);
  }, []);

  return (
    <section
      data-lab="spanish-translation"
      aria-labelledby={headingId}
      className="lab-spanish-wrap"
    >
      <style>{css}</style>
      <h2 id={headingId} data-i18n="lab.spanish-translation.heading">
        {t["lab.spanish-translation.heading"]}
      </h2>
      <p data-i18n="lab.spanish-translation.p1">{t["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{t["lab.spanish-translation.p2"]}</p>
      <div role="group" aria-label="Language" className="lab-lang">
        <button
          type="button"
          data-locale="en-US"
          aria-pressed={locale === "en-US"}
          onClick={() => pick("en-US")}
        >
          English
        </button>
        <button
          type="button"
          data-locale="es-ES"
          aria-pressed={locale === "es-ES"}
          onClick={() => pick("es-ES")}
        >
          Español
        </button>
      </div>
    </section>
  );
}
