"use client";

import { useEffect, useState } from "react";
import en from "../../../messages/en-US.json";
import es from "../../../messages/es-ES.json";

type Locale = "en-US" | "es-ES";
const copy: Record<Locale, Record<string, string>> = { "en-US": en, "es-ES": es };

const css = `
.lab-st{width:min(720px,100%);margin:8px auto 56px}
.lab-st h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin:0 0 16px}
.lab-st p{color:var(--mist);margin:0 0 16px;line-height:1.6}
.lab-lang{display:inline-flex}
.lab-lang button{font-family:var(--sans);font-size:14px;padding:8px 16px;cursor:pointer;color:var(--mist);background:transparent;border:1px solid var(--sage)}
.lab-lang button[aria-pressed="true"]{background:var(--sage);color:#14201A;border-color:var(--sage)}
.lab-lang button:first-child{border-radius:8px 0 0 8px}
.lab-lang button:last-child{border-radius:0 8px 8px 0;margin-left:-1px}
@media (prefers-reduced-motion:reduce){.lab-lang button{transition:none}}
`;

export default function Lab() {
  const [locale, setLocale] = useState<Locale>("en-US");
  const t = copy[locale];
  useEffect(() => {
    document.documentElement.lang = locale;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const k = el.getAttribute("data-i18n");
      if (k && t[k]) el.textContent = t[k];
    });
  }, [locale, t]);
  const pick = (next: Locale) => () => setLocale(next);
  return (
    <section className="lab-st" data-lab="spanish-translation" aria-labelledby="lab-st-h">
      <style>{css}</style>
      <h2 id="lab-st-h" data-i18n="lab.spanish-translation.heading">{t["lab.spanish-translation.heading"]}</h2>
      <p data-i18n="lab.spanish-translation.p1">{t["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{t["lab.spanish-translation.p2"]}</p>
      <div className="lab-lang" role="group" aria-label="Language">
        <button type="button" data-locale="en-US" aria-pressed={locale === "en-US"} onClick={pick("en-US")}>English</button>
        <button type="button" data-locale="es-ES" aria-pressed={locale === "es-ES"} onClick={pick("es-ES")}>Español</button>
      </div>
    </section>
  );
}
