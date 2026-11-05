"use client";

import { useCallback, useEffect, useState } from "react";
import enUS from "../../../messages/en-US.json";
import esES from "../../../messages/es-ES.json";

type Locale = "en-US" | "es-ES";
type Messages = Record<string, string>;

const en = enUS as Messages;
const es = esES as Messages;

function applyLocale(locale: Locale) {
  const msgs = locale === "en-US" ? en : es;
  document.documentElement.lang = locale;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (key && typeof msgs[key] === "string") node.textContent = msgs[key];
  });
}

export default function SpanishTranslationLab() {
  const [locale, setLocale] = useState<Locale>("en-US");
  const titleId = "lab-spanish-translation-title";
  const copy = locale === "en-US" ? en : es;

  const pick = useCallback((next: Locale) => setLocale(next), []);

  useEffect(() => {
    applyLocale(locale);
  }, [locale]);

  return (
    <section
      data-lab="spanish-translation"
      aria-labelledby={titleId}
      className="lab-spanish-wrap"
    >
      <style>{`
        .lab-spanish-wrap{width:min(720px,100%);margin:8px auto 56px}
        .lab-spanish-heading{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin:0 0 16px;line-height:1.2}
        .lab-spanish-p{color:#E8EEE9;margin:0 0 12px;line-height:1.6;font-size:16px}
        .lab-spanish-p:last-of-type{margin-bottom:0}
        .lab-spanish-switch{display:flex;margin-top:24px;border-radius:8px;overflow:hidden;max-width:280px}
        .lab-spanish-seg{flex:1;padding:10px 16px;font-family:var(--sans);font-size:14px;font-weight:500;cursor:pointer;border:1px solid var(--sage);background:transparent;color:var(--mist)}
        .lab-spanish-seg[aria-pressed="true"]{background:var(--sage);color:#14201A}
        .lab-spanish-seg[aria-pressed="false"]{background:transparent;color:var(--mist)}
        .lab-spanish-seg + .lab-spanish-seg{border-left:0}
        @media (prefers-reduced-motion:reduce){.lab-spanish-seg{transition:none}}
      `}</style>
      <h2
        id={titleId}
        className="lab-spanish-heading"
        data-i18n="lab.spanish-translation.heading"
      >
        {copy["lab.spanish-translation.heading"]}
      </h2>
      <p className="lab-spanish-p" data-i18n="lab.spanish-translation.p1">
        {copy["lab.spanish-translation.p1"]}
      </p>
      <p className="lab-spanish-p" data-i18n="lab.spanish-translation.p2">
        {copy["lab.spanish-translation.p2"]}
      </p>
      <div className="lab-spanish-switch" role="group" aria-label="Language">
        <button
          type="button"
          className="lab-spanish-seg"
          data-locale="en-US"
          aria-pressed={locale === "en-US"}
          onClick={() => pick("en-US")}
        >
          English
        </button>
        <button
          type="button"
          className="lab-spanish-seg"
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
