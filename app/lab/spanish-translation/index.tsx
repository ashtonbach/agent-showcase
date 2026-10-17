"use client";
import { useEffect, useState } from "react";
import en from "../../../messages/en-US.json";
import es from "../../../messages/es-ES.json";

const copy = { "en-US": en, "es-ES": es };
type Locale = "en-US" | "es-ES";

const css = `
.lab-st{width:min(720px,100%);margin:8px auto 56px}
.lab-st h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin:0 0 16px}
.lab-st p{color:var(--mist);margin:0 0 16px;line-height:1.6}
.lab-st-lang{display:inline-flex;gap:8px}
.lab-st-lang button{font-family:var(--sans);font-size:14px;padding:8px 18px;cursor:pointer;border-radius:8px;color:var(--mist);background:transparent;border:1px solid var(--sage)}
.lab-st-lang button[aria-pressed="true"]{background:var(--sage);color:#14201A;border-color:var(--sage)}
@media (prefers-reduced-motion:reduce){.lab-st-lang button{transition:none}}
`;

function applyLocale(locale: Locale) {
  const dict = copy[locale] as Record<string, string>;
  document.documentElement.lang = locale;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (key && dict[key]) node.textContent = dict[key];
  });
}

export default function Lab() {
  const [locale, setLocale] = useState<Locale>("en-US");
  useEffect(() => { applyLocale(locale); }, [locale]);
  const t = copy[locale] as Record<string, string>;

  return (
    <section className="lab-st" data-lab="spanish-translation" aria-labelledby="lab-st-h">
      <style>{css}</style>
      <h2 id="lab-st-h" data-i18n="lab.spanish-translation.heading">{t["lab.spanish-translation.heading"]}</h2>
      <p data-i18n="lab.spanish-translation.p1">{t["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{t["lab.spanish-translation.p2"]}</p>
      <div className="lab-st-lang" role="group" aria-label="Language">
        <button type="button" data-locale="en-US" aria-pressed={locale === "en-US"} onClick={() => setLocale("en-US")}>English</button>
        <button type="button" data-locale="es-ES" aria-pressed={locale === "es-ES"} onClick={() => setLocale("es-ES")}>Español</button>
      </div>
    </section>
  );
}
