"use client";
import { useEffect, useState } from "react";
import enUS from "../../../messages/en-US.json";
import esES from "../../../messages/es-ES.json";

const catalogs = { "en-US": enUS, "es-ES": esES };
type Locale = "en-US" | "es-ES";

function applyLocale(locale: Locale) {
  const dict = catalogs[locale];
  document.documentElement.lang = locale;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (key && key in dict) node.textContent = dict[key as keyof typeof dict];
  });
}

export default function Lab() {
  const [locale, setLocale] = useState<Locale>("en-US");
  const t = catalogs[locale];

  useEffect(() => {
    applyLocale(locale);
  }, [locale]);

  return (
    <section
      data-lab="spanish-translation"
      aria-labelledby="lab-spanish-heading"
      className="lab-spanish"
    >
      <style>{`
        .lab-spanish { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #F2EFE6); }
        .lab-spanish h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 16px; line-height: 1.25; }
        .lab-spanish p { margin: 0 0 16px; line-height: 1.6; color: #E8EEE9; }
        .lab-lang { display: flex; gap: 0; margin-top: 8px; }
        .lab-lang button {
          flex: 1; padding: 10px 16px; font-family: var(--sans); font-size: 14px; cursor: pointer;
          border: 1px solid var(--sage); background: transparent; color: var(--mist, #F2EFE6);
        }
        .lab-lang button:first-child { border-radius: 8px 0 0 8px; }
        .lab-lang button:last-child { border-radius: 0 8px 8px 0; border-left: none; }
        .lab-lang button[aria-pressed="true"] { background: var(--sage); color: #14201A; border-color: var(--sage); }
        .lab-lang button:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) { .lab-lang button { transition: none; } }
      `}</style>
      <h2 id="lab-spanish-heading" data-i18n="lab.spanish-translation.heading">
        {t["lab.spanish-translation.heading"]}
      </h2>
      <p data-i18n="lab.spanish-translation.p1">{t["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{t["lab.spanish-translation.p2"]}</p>
      <div className="lab-lang" role="group" aria-label="Language">
        <button
          type="button"
          data-locale="en-US"
          aria-pressed={locale === "en-US"}
          onClick={() => setLocale("en-US")}
        >
          English
        </button>
        <button
          type="button"
          data-locale="es-ES"
          aria-pressed={locale === "es-ES"}
          onClick={() => setLocale("es-ES")}
        >
          Español
        </button>
      </div>
    </section>
  );
}
