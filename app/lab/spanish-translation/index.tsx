"use client";

import { useEffect, useState } from "react";
import enUS from "../../../messages/en-US.json";
import esES from "../../../messages/es-ES.json";

type Locale = "en-US" | "es-ES";

const catalogs: Record<Locale, Record<string, string>> = {
  "en-US": enUS as Record<string, string>,
  "es-ES": esES as Record<string, string>,
};

function applyLocale(locale: Locale) {
  const msgs = catalogs[locale];
  document.documentElement.lang = locale;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (key && msgs[key]) node.textContent = msgs[key];
  });
}

export default function SpanishTranslationLab() {
  const [locale, setLocale] = useState<Locale>("en-US");
  const copy = catalogs[locale];

  useEffect(() => {
    applyLocale(locale);
  }, [locale]);

  return (
    <section
      data-lab="spanish-translation"
      aria-labelledby="lab-spanish-heading"
      className="lab-spanish-root"
    >
      <style>{`
        .lab-spanish-root {
          width: min(720px, 100%);
          margin: 8px auto 56px;
          color: var(--mist, #f2efe6);
        }
        .lab-spanish-root h2 {
          font-family: var(--serif);
          font-weight: 400;
          font-size: 30px;
          line-height: 1.25;
          margin: 0 0 16px;
        }
        .lab-spanish-root p {
          margin: 0 0 14px;
          line-height: 1.6;
          color: #e8eee9;
        }
        .lab-spanish-switch {
          display: inline-flex;
          margin-top: 8px;
          border-radius: 999px;
          overflow: hidden;
        }
        .lab-spanish-seg {
          font-family: var(--sans);
          font-size: 14px;
          font-weight: 500;
          padding: 10px 18px;
          cursor: pointer;
          border: 1px solid var(--sage);
          background: transparent;
          color: var(--mist, #f2efe6);
        }
        .lab-spanish-seg + .lab-spanish-seg {
          margin-left: -1px;
        }
        .lab-spanish-seg[aria-pressed="true"] {
          background: var(--sage);
          color: #14201a;
          border-color: var(--sage);
        }
        .lab-spanish-seg[aria-pressed="false"] {
          background: transparent;
          color: var(--mist, #f2efe6);
        }
        @media (prefers-reduced-motion: reduce) {
          .lab-spanish-seg { transition: none; }
        }
      `}</style>
      <h2 id="lab-spanish-heading" data-i18n="lab.spanish-translation.heading">
        {copy["lab.spanish-translation.heading"]}
      </h2>
      <p data-i18n="lab.spanish-translation.p1">{copy["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{copy["lab.spanish-translation.p2"]}</p>
      <div className="lab-spanish-switch" role="group" aria-label="Language">
        <button
          type="button"
          className="lab-spanish-seg"
          data-locale="en-US"
          aria-pressed={locale === "en-US"}
          onClick={() => setLocale("en-US")}
        >
          English
        </button>
        <button
          type="button"
          className="lab-spanish-seg"
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
