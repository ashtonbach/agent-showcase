"use client";

import { useEffect, useId, useState } from "react";
import enUS from "../../../messages/en-US.json";
import esES from "../../../messages/es-ES.json";

type Locale = "en-US" | "es-ES";

const messages: Record<Locale, Record<string, string>> = {
  "en-US": enUS,
  "es-ES": esES,
};

function syncPageLocale(locale: Locale) {
  const table = messages[locale];
  document.documentElement.lang = locale;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (!key) return;
    const value = table[key];
    if (typeof value === "string" && value.length > 0) {
      node.textContent = value;
    }
  });
}

export default function Lab() {
  const headingId = useId().replace(/:/g, "");
  const [locale, setLocale] = useState<Locale>("en-US");
  const copy = messages[locale];

  useEffect(() => {
    syncPageLocale(locale);
  }, [locale]);

  return (
    <section data-lab="spanish-translation" aria-labelledby={headingId}>
      <style>{`
        [data-lab="spanish-translation"] {
          width: min(720px, 100%);
          margin: 8px auto 56px;
          color: var(--mist, #f2efe6);
        }
        [data-lab="spanish-translation"] h2 {
          font-family: var(--serif);
          font-weight: 400;
          font-size: 30px;
          line-height: 1.25;
          margin: 0 0 16px;
          color: var(--mist, #f2efe6);
        }
        [data-lab="spanish-translation"] p {
          font-family: var(--sans);
          font-size: 16px;
          line-height: 1.6;
          margin: 0 0 14px;
          color: #e8eee9;
        }
        .lab-lang {
          display: inline-flex;
          margin-top: 20px;
          gap: 0;
        }
        .lab-lang button {
          font-family: var(--sans);
          font-size: 14px;
          font-weight: 500;
          padding: 10px 18px;
          cursor: pointer;
          border: 1px solid var(--sage);
          background: transparent;
          color: var(--mist, #f2efe6);
        }
        .lab-lang button:first-child {
          border-radius: 8px 0 0 8px;
        }
        .lab-lang button:last-child {
          border-radius: 0 8px 8px 0;
          border-left: none;
        }
        .lab-lang button[aria-pressed="true"] {
          background: var(--sage);
          color: #14201a;
          border-color: var(--sage);
        }
        .lab-lang button[aria-pressed="false"]:hover {
          border-color: var(--sage);
        }
        @media (prefers-reduced-motion: reduce) {
          .lab-lang button {
            transition: none;
          }
        }
      `}</style>
      <h2 id={headingId} data-i18n="lab.spanish-translation.heading">
        {copy["lab.spanish-translation.heading"]}
      </h2>
      <p data-i18n="lab.spanish-translation.p1">{copy["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{copy["lab.spanish-translation.p2"]}</p>
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