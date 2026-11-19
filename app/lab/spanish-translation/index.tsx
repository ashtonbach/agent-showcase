"use client";

import { useCallback, useId, useState } from "react";
import enUS from "../../../messages/en-US.json";
import esES from "../../../messages/es-ES.json";

type Locale = "en-US" | "es-ES";

const MSGS: Record<Locale, Record<string, string>> = {
  "en-US": enUS,
  "es-ES": esES,
};

function paintLocale(locale: Locale) {
  const table = MSGS[locale];
  document.documentElement.lang = locale;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (key && table[key]) node.textContent = table[key];
  });
}

export default function SpanishTranslationLab() {
  const uid = useId().replace(/:/g, "");
  const titleId = `${uid}-heading`;
  const [locale, setLocale] = useState<Locale>("en-US");
  const copy = MSGS[locale];

  const choose = useCallback((next: Locale) => {
    setLocale(next);
    paintLocale(next);
  }, []);

  return (
    <section
      data-lab="spanish-translation"
      aria-labelledby={titleId}
      className="lab-spanish"
    >
      <h2 id={titleId} data-i18n="lab.spanish-translation.heading">
        {copy["lab.spanish-translation.heading"]}
      </h2>
      <p data-i18n="lab.spanish-translation.p1">
        {copy["lab.spanish-translation.p1"]}
      </p>
      <p data-i18n="lab.spanish-translation.p2">
        {copy["lab.spanish-translation.p2"]}
      </p>
      <div role="group" aria-label="Language" className="lab-spanish-toggle">
        <button
          type="button"
          data-locale="en-US"
          aria-pressed={locale === "en-US"}
          onClick={() => choose("en-US")}
        >
          English
        </button>
        <button
          type="button"
          data-locale="es-ES"
          aria-pressed={locale === "es-ES"}
          onClick={() => choose("es-ES")}
        >
          Español
        </button>
      </div>
      <style>{`
        .lab-spanish {
          width: min(720px, 100%);
          margin: 8px auto 56px;
          color: var(--mist, #f2efe6);
        }
        .lab-spanish h2 {
          margin: 0 0 16px;
          font-family: var(--serif);
          font-weight: 400;
          font-size: 30px;
          line-height: 1.2;
        }
        .lab-spanish p {
          margin: 0 0 14px;
          font-family: var(--sans);
          font-size: 15px;
          line-height: 1.55;
          color: #e8eee9;
        }
        .lab-spanish-toggle {
          display: flex;
          width: min(280px, 100%);
          margin-top: 22px;
        }
        .lab-spanish-toggle button {
          flex: 1;
          padding: 10px 14px;
          font-family: var(--sans);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          border: 1px solid var(--sage);
        }
        .lab-spanish-toggle button:first-child {
          border-radius: 8px 0 0 8px;
        }
        .lab-spanish-toggle button:last-child {
          border-radius: 0 8px 8px 0;
          margin-left: -1px;
        }
        .lab-spanish-toggle button[aria-pressed="true"] {
          background: var(--sage);
          color: #14201a;
        }
        .lab-spanish-toggle button[aria-pressed="false"] {
          background: transparent;
          color: var(--mist, #f2efe6);
        }
        .lab-spanish-toggle button:focus-visible {
          outline: 2px solid var(--sage);
          outline-offset: 2px;
          z-index: 1;
        }
        @media (prefers-reduced-motion: no-preference) {
          .lab-spanish-toggle button {
            transition: background 0.15s ease, color 0.15s ease;
          }
        }
      `}</style>
    </section>
  );
}