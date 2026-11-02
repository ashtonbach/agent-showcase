"use client";

import { useCallback, useEffect, useState } from "react";
import enUS from "../../../messages/en-US.json";
import esES from "../../../messages/es-ES.json";

type Locale = "en-US" | "es-ES";
const catalogs: Record<Locale, Record<string, string>> = {
  "en-US": enUS,
  "es-ES": esES,
};

export default function SpanishTranslationLab() {
  const [locale, setLocale] = useState<Locale>("en-US");
  const copy = catalogs[locale];

  const applyLocale = useCallback((loc: Locale) => {
    document.documentElement.lang = loc;
    const bag = catalogs[loc];
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (key && bag[key]) node.textContent = bag[key];
    });
  }, []);

  useEffect(() => {
    applyLocale(locale);
  }, [locale, applyLocale]);

  return (
    <section
      data-lab="spanish-translation"
      aria-labelledby="lab-spanish-heading"
      className="lab-spanish"
    >
      <style>{`
.lab-spanish{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6)}
.lab-spanish h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.25;margin:0 0 16px}
.lab-spanish p{margin:0 0 14px;line-height:1.6;color:#E8EEE9}
.lab-lang{display:flex;margin-top:24px;border-radius:8px;overflow:hidden;width:fit-content;max-width:100%}
.lab-lang button{font-family:var(--sans);font-size:15px;line-height:1;padding:10px 18px;border:1px solid var(--sage);cursor:pointer;background:transparent;color:var(--mist,#F2EFE6)}
.lab-lang button[aria-pressed="true"]{background:var(--sage);color:#14201A;border-color:var(--sage)}
.lab-lang button[aria-pressed="false"]{background:transparent;color:var(--mist,#F2EFE6)}
@media (prefers-reduced-motion:reduce){.lab-lang button{transition:none}}
`}</style>
      <h2 id="lab-spanish-heading" data-i18n="lab.spanish-translation.heading">
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
