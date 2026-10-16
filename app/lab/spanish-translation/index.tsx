"use client";
import { useEffect, useState } from "react";
import en from "../../../messages/en-US.json";
import es from "../../../messages/es-ES.json";

const M = { "en-US": en, "es-ES": es } as const;
type Locale = keyof typeof M;

const css = `.lab-st{width:min(720px,100%);margin:8px auto 56px}.lab-st h2{font-family:var(--serif);font-weight:400;font-size:1.875rem;color:var(--mist);margin:0 0 1rem}.lab-st p{color:var(--mist);line-height:1.55;margin:0 0 1rem}.lab-lang{display:inline-flex}.lab-lang button{font:500 .875rem var(--sans);padding:.5rem 1rem;cursor:pointer;color:var(--mist);background:transparent;border:1px solid var(--sage)}.lab-lang button[aria-pressed="true"]{background:var(--sage);color:#14201A}@media (prefers-reduced-motion:reduce){.lab-st *{transition:none}}`;

export default function SpanishTranslation() {
  const [locale, setLocale] = useState<Locale>("en-US");
  const msg = M[locale];
  useEffect(() => {
    document.documentElement.lang = locale;
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (key && key in msg) node.textContent = msg[key as keyof typeof msg];
    });
  }, [locale, msg]);
  return (
    <section data-lab="spanish-translation" aria-labelledby="lab-st-heading" className="lab-st">
      <h2 id="lab-st-heading" data-i18n="lab.spanish-translation.heading">{msg["lab.spanish-translation.heading"]}</h2>
      <p data-i18n="lab.spanish-translation.p1">{msg["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{msg["lab.spanish-translation.p2"]}</p>
      <div className="lab-lang" role="group" aria-label="Language">
        <button type="button" data-locale="en-US" aria-pressed={locale === "en-US"} onClick={() => setLocale("en-US")}>English</button>
        <button type="button" data-locale="es-ES" aria-pressed={locale === "es-ES"} onClick={() => setLocale("es-ES")}>Español</button>
      </div>
      <style>{css}</style>
    </section>
  );
}
