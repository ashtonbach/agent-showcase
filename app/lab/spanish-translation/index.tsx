"use client";

import { useEffect, useId, useState } from "react";
import enUS from "../../../messages/en-US.json";
import esES from "../../../messages/es-ES.json";

type Locale = "en-US" | "es-ES";
type Messages = Record<string, string>;

const PACKS: Record<Locale, Messages> = { "en-US": enUS, "es-ES": esES };

function syncPage(locale: Locale) {
  const map = PACKS[locale];
  document.documentElement.lang = locale;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (!key) return;
    const text = map[key];
    if (text) node.textContent = text;
  });
}

export default function Lab() {
  const rawId = useId();
  const titleId = `lab-spanish-heading-${rawId.replace(/:/g, "")}`;
  const [locale, setLocale] = useState<Locale>("en-US");
  const strings = PACKS[locale];

  useEffect(() => {
    syncPage(locale);
  }, [locale]);

  return (
    <section
      className="lab-spanish"
      data-lab="spanish-translation"
      aria-labelledby={titleId}
    >
      <style>{`
        .lab-spanish {
          width: min(720px, 100%);
          margin: 8px auto 56px;
          color: var(--mist);
        }
        .lab-spanish h2 {
          font-family: var(--serif);
          font-weight: 400;
          font-size: 30px;
          line-height: 1.25;
          margin: 0 0 16px;
        }
        .lab-spanish p {
          margin: 0 0 14px;
          line-height: 1.55;
          color: #e8eee9;
        }
        .lab-lang {
          display: flex;
          gap: 0;
          margin-top: 22px;
          width: fit-content;
          max-width: 100%;
        }
        .lab-lang button {
          font-family: var(--sans);
          font-size: 14px;
          font-weight: 500;
          padding: 10px 18px;
          cursor: pointer;
          border: 1px solid var(--sage);
          background: transparent;
          color: var(--mist);
        }
        .lab-lang button:first-child {
          border-radius: 8px 0 0 8px;
        }
        .lab-lang button:last-child {
          border-radius: 0 8px 8px 0;
          margin-left: -1px;
        }
        .lab-lang button[aria-pressed="true"] {
          background: var(--sage);
          color: #14201a;
        }
        .lab-lang button[aria-pressed="false"] {
          background: transparent;
          color: var(--mist);
        }
        @media (prefers-reduced-motion: reduce) {
          .lab-lang button { transition: none; }
        }
      `}</style>
      <h2 id={titleId} data-i18n="lab.spanish-translation.heading">
        {strings["lab.spanish-translation.heading"]}
      </h2>
      <p data-i18n="lab.spanish-translation.p1">
        {strings["lab.spanish-translation.p1"]}
      </p>
      <p data-i18n="lab.spanish-translation.p2">
        {strings["lab.spanish-translation.p2"]}
      </p>
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
