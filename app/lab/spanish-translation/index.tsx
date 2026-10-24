"use client";

import { useEffect, useState } from "react";
import enUS from "../../../messages/en-US.json";
import esES from "../../../messages/es-ES.json";

type Locale = "en-US" | "es-ES";

const packs: Record<Locale, Record<string, string>> = {
  "en-US": enUS,
  "es-ES": esES,
};

function applyLocaleToDocument(locale: Locale) {
  document.documentElement.lang = locale;
  const messages = packs[locale];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key && messages[key]) el.textContent = messages[key];
  });
}

export default function Lab() {
  const [locale, setLocale] = useState<Locale>("en-US");
  const msgs = packs[locale];

  useEffect(() => {
    applyLocaleToDocument(locale);
  }, [locale]);

  return (
    <section
      data-lab="spanish-translation"
      aria-labelledby="lab-spanish-heading"
    >
      <style>{`
        [data-lab="spanish-translation"] {
          width: min(720px, 100%);
          margin: 8px auto 56px;
          color: var(--mist, #F2EFE6);
        }
        [data-lab="spanish-translation"] h2 {
          font-family: var(--serif);
          font-weight: 400;
          font-size: 30px;
          margin: 0 0 16px;
          color: var(--mist, #F2EFE6);
        }
        [data-lab="spanish-translation"] p {
          margin: 0 0 14px;
          line-height: 1.55;
          color: #E8EEE9;
        }
        .lab-lang {
          display: flex;
          gap: 0;
          margin-top: 20px;
        }
        .lab-lang button {
          flex: 1;
          font-family: var(--sans);
          font-size: 14px;
          padding: 10px 16px;
          cursor: pointer;
          border: 1px solid var(--sage);
          background: transparent;
          color: var(--mist, #F2EFE6);
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
          color: #14201A;
        }
        .lab-lang button[aria-pressed="false"] {
          background: transparent;
          color: var(--mist, #F2EFE6);
        }
        @media (prefers-reduced-motion: reduce) {
          .lab-lang button { transition: none; }
        }
      `}</style>
      <h2 id="lab-spanish-heading" data-i18n="lab.spanish-translation.heading">
        {msgs["lab.spanish-translation.heading"]}
      </h2>
      <p data-i18n="lab.spanish-translation.p1">{msgs["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{msgs["lab.spanish-translation.p2"]}</p>
      <div role="group" aria-label="Language" className="lab-lang">
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
