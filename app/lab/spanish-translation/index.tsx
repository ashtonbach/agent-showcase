"use client";

import { useEffect, useState } from "react";
import en from "../../../messages/en-US.json";
import es from "../../../messages/es-ES.json";

type Locale = "en-US" | "es-ES";
const copy: Record<Locale, Record<string, string>> = { "en-US": en, "es-ES": es };
const css = `
.lab-es{width:min(720px,100%);margin:8px auto 56px}
.lab-es h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin:0 0 16px}
.lab-es p{color:var(--mist);margin:0 0 16px;line-height:1.6}
.lab-es-lang{display:inline-flex;margin-top:8px}
.lab-es-lang button{font-family:var(--sans);font-size:14px;padding:8px 16px;cursor:pointer}
.lab-es-lang button[aria-pressed="true"]{background:var(--sage);color:#14201A;border:1px solid var(--sage)}
.lab-es-lang button[aria-pressed="false"]{background:transparent;color:var(--mist);border:1px solid var(--sage)}
`;
function applyLocale(locale: Locale) {
  document.documentElement.lang = locale;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    const text = key ? copy[locale][key] : "";
    if (text) node.textContent = text;
  });
}

export default function Lab() {
  const [locale, setLocale] = useState<Locale>("en-US");
  useEffect(() => {
    applyLocale(locale);
  }, [locale]);
  const t = copy[locale];
  return (
    <section className="lab-es" data-lab="spanish-translation" aria-labelledby="lab-es-h2">
      <style>{css}</style>
      <h2 id="lab-es-h2" data-i18n="lab.spanish-translation.heading">{t["lab.spanish-translation.heading"]}</h2>
      <p data-i18n="lab.spanish-translation.p1">{t["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{t["lab.spanish-translation.p2"]}</p>
      <div className="lab-es-lang" role="group" aria-label="Language">
        <button type="button" data-locale="en-US" aria-pressed={locale === "en-US"} onClick={() => setLocale("en-US")}>English</button>
        <button type="button" data-locale="es-ES" aria-pressed={locale === "es-ES"} onClick={() => setLocale("es-ES")}>Español</button>
      </div>
    </section>
  );
}
