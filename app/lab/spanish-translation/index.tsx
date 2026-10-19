"use client";

import { useCallback, useEffect, useState } from "react";
import enUS from "../../../messages/en-US.json";
import esES from "../../../messages/es-ES.json";

const locales = { "en-US": enUS, "es-ES": esES } as const;
type Locale = keyof typeof locales;

const css = `
.lab-wrap{width:min(720px,100%);margin:8px auto 56px}
.lab-wrap h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin:0 0 16px}
.lab-wrap p{color:#E8EEE9;line-height:1.6;margin:0 0 14px}
.lab-switch{display:flex;gap:0;margin-top:24px;border-radius:8px;overflow:hidden;width:fit-content}
.lab-switch button{font-family:var(--sans);font-size:15px;padding:10px 20px;border:1px solid var(--sage);cursor:pointer;box-shadow:none;transition:color .15s}
.lab-switch button:first-child{border-radius:8px 0 0 8px}
.lab-switch button:last-child{border-radius:0 8px 8px 0;margin-left:-1px}
@media (prefers-reduced-motion:reduce){.lab-switch button{transition:none}}
`;

export default function Lab() {
  const [locale, setLocale] = useState<Locale>("en-US");
  const msgs = locales[locale];

  const applyLocale = useCallback((loc: Locale) => {
    document.documentElement.lang = loc;
    const m = locales[loc];
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key && key in m) el.textContent = (m as Record<string, string>)[key];
    });
  }, []);

  useEffect(() => {
    applyLocale(locale);
  }, [locale, applyLocale]);

  return (
    <section
      data-lab="spanish-translation"
      aria-labelledby="lab-st-heading"
      className="lab-wrap"
    >
      <style>{css}</style>
      <h2 id="lab-st-heading" data-i18n="lab.spanish-translation.heading">
        {msgs["lab.spanish-translation.heading"]}
      </h2>
      <p data-i18n="lab.spanish-translation.p1">{msgs["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{msgs["lab.spanish-translation.p2"]}</p>
      <div className="lab-switch" role="group" aria-label="Language">
        <button
          type="button"
          data-locale="en-US"
          aria-pressed={locale === "en-US"}
          style={{
            backgroundColor: locale === "en-US" ? "var(--sage)" : "rgba(0,0,0,0)",
            color: locale === "en-US" ? "#14201A" : "var(--mist)",
          }}
          onClick={() => setLocale("en-US")}
        >
          English
        </button>
        <button
          type="button"
          data-locale="es-ES"
          aria-pressed={locale === "es-ES"}
          style={{
            backgroundColor: locale === "es-ES" ? "var(--sage)" : "rgba(0,0,0,0)",
            color: locale === "es-ES" ? "#14201A" : "var(--mist)",
          }}
          onClick={() => setLocale("es-ES")}
        >
          Español
        </button>
      </div>
    </section>
  );
}
