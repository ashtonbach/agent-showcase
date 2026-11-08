"use client";

import { useCallback, useId, useState } from "react";
import enUS from "../../../messages/en-US.json";
import esES from "../../../messages/es-ES.json";

type Locale = "en-US" | "es-ES";
type Msg = Record<string, string>;

const en = enUS as Msg;
const es = esES as Msg;

function applyLocale(locale: Locale) {
  const pack = locale === "en-US" ? en : es;
  document.documentElement.lang = locale;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (!key) return;
    const text = pack[key];
    if (text) node.textContent = text;
  });
}

const css = `
.lab-break-copy {
  width: min(720px, 100%);
  margin: 8px auto 56px;
  padding: 24px;
  border: 1px solid rgba(176, 203, 188, 0.28);
  border-radius: 16px;
  color: #e8eee9;
}
.lab-break-copy h2 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: 30px;
  line-height: 1.25;
  margin: 0 0 16px;
  color: var(--mist, #f2efe6);
}
.lab-break-copy p {
  margin: 0 0 14px;
  line-height: 1.55;
}
.lab-break-locale {
  display: inline-flex;
  margin-top: 20px;
}
.lab-break-locale button {
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
.lab-break-locale button:first-child { border-radius: 8px 0 0 8px; }
.lab-break-locale button:last-child {
  border-radius: 0 8px 8px 0;
  margin-left: -1px;
}
.lab-break-locale button[aria-pressed="true"] {
  background: var(--sage);
  color: #14201a;
}
.lab-break-locale button:focus-visible {
  outline: 2px solid var(--sage);
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .lab-break-locale button { transition: none; }
}
`;

export default function Lab() {
  const titleId = useId();
  const [locale, setLocale] = useState<Locale>("en-US");
  const pack = locale === "en-US" ? en : es;

  const setLang = useCallback((next: Locale) => {
    setLocale(next);
    applyLocale(next);
  }, []);

  return (
    <section className="lab-break-copy" data-lab="break-copy" aria-labelledby={titleId}>
      <style>{css}</style>
      <h2 id={titleId} data-i18n="lab.spanish-translation.heading">
        {pack["lab.spanish-translation.heading"]}
      </h2>
      <p data-i18n="lab.spanish-translation.p1">{pack["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{pack["lab.spanish-translation.p2"]}</p>
      <div className="lab-break-locale" role="group" aria-label="Language">
        <button
          type="button"
          data-locale="en-US"
          aria-pressed={locale === "en-US"}
          onClick={() => setLang("en-US")}
        >
          English
        </button>
        <button
          type="button"
          data-locale="es-ES"
          aria-pressed={locale === "es-ES"}
          onClick={() => setLang("es-ES")}
        >
          Español
        </button>
      </div>
    </section>
  );
}
