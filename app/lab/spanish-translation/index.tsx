"use client";

import { useEffect, useState } from "react";
import en from "../../../messages/en-US.json";
import es from "../../../messages/es-ES.json";

type Locale = "en-US" | "es-ES";
const bags: Record<Locale, Record<string, string>> = {
  "en-US": en,
  "es-ES": es,
};

const css = `
.lab-st{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6)}
.lab-st h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 16px}
.lab-st p{margin:0 0 16px;line-height:1.55}
.lab-st-switch{display:flex;flex-wrap:wrap;gap:8px}
.lab-st-seg{font-family:var(--sans);background:transparent;color:var(--mist,#F2EFE6);border:1px solid var(--sage);padding:8px 16px;cursor:pointer}
.lab-st-on{background:var(--sage);color:#14201A;border-color:var(--sage)}
@media (prefers-reduced-motion:reduce){.lab-st-seg{transition:none}}
`;

function apply(locale: Locale) {
  const bag = bags[locale];
  document.documentElement.lang = locale;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (key && bag[key]) node.textContent = bag[key];
  });
}

export default function SpanishTranslation() {
  const [locale, setLocale] = useState<Locale>("en-US");
  useEffect(() => {
    apply(locale);
  }, [locale]);
  const bag = bags[locale];

  return (
    <section data-lab="spanish-translation" aria-labelledby="lab-st-h" className="lab-st">
      <style>{css}</style>
      <h2 id="lab-st-h" data-i18n="lab.spanish-translation.heading">{bag["lab.spanish-translation.heading"]}</h2>
      <p data-i18n="lab.spanish-translation.p1">{bag["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{bag["lab.spanish-translation.p2"]}</p>
      <div role="group" aria-label="Language" className="lab-st-switch">
        <button type="button" data-locale="en-US" aria-pressed={locale === "en-US"} className={locale === "en-US" ? "lab-st-seg lab-st-on" : "lab-st-seg"} onClick={() => setLocale("en-US")}>English</button>
        <button type="button" data-locale="es-ES" aria-pressed={locale === "es-ES"} className={locale === "es-ES" ? "lab-st-seg lab-st-on" : "lab-st-seg"} onClick={() => setLocale("es-ES")}>Español</button>
      </div>
    </section>
  );
}

