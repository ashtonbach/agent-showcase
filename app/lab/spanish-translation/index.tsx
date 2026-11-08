"use client";

import { useCallback, useId, useState } from "react";
import enUS from "../../../messages/en-US.json";
import esES from "../../../messages/es-ES.json";

type Locale = "en-US" | "es-ES";
type Messages = Record<string, string>;

const byLocale: Record<Locale, Messages> = {
  "en-US": enUS as Messages,
  "es-ES": esES as Messages,
};

function applyLocale(locale: Locale) {
  const messages = byLocale[locale];
  document.documentElement.lang = locale;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (!key) return;
    const text = messages[key];
    if (text) node.textContent = text;
  });
}

const css = `
.lab-spanish-translation {
  width: min(720px, 100%);
  margin: 8px auto 56px;
  color: var(--mist, #f2efe6);
}
.lab-spanish-translation h2 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: 30px;
  line-height: 1.25;
  margin: 0 0 16px;
  color: var(--mist, #f2efe6);
}
.lab-spanish-translation p {
  margin: 0 0 14px;
  line-height: 1.55;
  color: #e8eee9;
}
.lab-lang {
  display: inline-flex;
  gap: 0;
  margin-top: 20px;
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
  transition: background 0.15s ease, color 0.15s ease;
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
.lab-lang button:focus-visible {
  outline: 2px solid var(--sage);
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .lab-lang button {
    transition: none;
  }
}
`;

export default function Lab() {
  const headingId = useId();
  const [locale, setLocale] = useState<Locale>("en-US");
  const copy = byLocale[locale];

  const pick = useCallback((next: Locale) => {
    setLocale(next);
    applyLocale(next);
  }, []);

  return (
    <section
      className="lab-spanish-translation"
      data-lab="spanish-translation"
      aria-labelledby={headingId}
    >
      <style>{css}</style>
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
