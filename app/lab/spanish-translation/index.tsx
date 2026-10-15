"use client";

import { useEffect, useState } from "react";
import en from "../../../messages/en-US.json";
import es from "../../../messages/es-ES.json";

type Locale = "en-US" | "es-ES";
type Msgs = Record<string, string>;
const msgs: Record<Locale, Msgs> = { "en-US": en, "es-ES": es };

const css = `
.lab-i18n{width:min(720px,100%);margin:8px auto 56px;color:var(--mist)}
.lab-i18n h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.25;margin:0 0 16px}
.lab-i18n p{margin:0 0 16px;line-height:1.65;color:#E8EEE9}
.lab-switch{display:inline-flex;margin-top:8px}
.lab-switch button{appearance:none;font-family:var(--sans);font-size:14px;font-weight:500;padding:8px 18px;cursor:pointer}
.lab-switch button[aria-pressed="true"]{background:var(--sage);color:#14201A;border:1px solid var(--sage)}
.lab-switch button[aria-pressed="false"]{background:transparent;color:var(--mist);border:1px solid var(--sage)}
.lab-switch button:first-child{border-radius:8px 0 0 8px}
.lab-switch button:last-child{border-radius:0 8px 8px 0;margin-left:-1px}
`;

function apply(locale: Locale) {
  document.documentElement.lang = locale;
  const m = msgs[locale];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const k = el.getAttribute("data-i18n");
    if (k && m[k]) el.textContent = m[k];
  });
}

export default function Lab() {
  const [locale, setLocale] = useState<Locale>("en-US");
  useEffect(() => { apply(locale); }, [locale]);
  const t = msgs[locale];
  return (
    <section className="lab-i18n" data-lab="spanish-translation" aria-labelledby="lab-es-h">
      <h2 id="lab-es-h" data-i18n="lab.spanish-translation.heading">{t["lab.spanish-translation.heading"]}</h2>
      <p data-i18n="lab.spanish-translation.p1">{t["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{t["lab.spanish-translation.p2"]}</p>
      <div className="lab-switch" role="group" aria-label="Language">
        <button type="button" data-locale="en-US" aria-pressed={locale === "en-US"} onClick={() => setLocale("en-US")}>English</button>
        <button type="button" data-locale="es-ES" aria-pressed={locale === "es-ES"} onClick={() => setLocale("es-ES")}>Español</button>
      </div>
      <style>{css}</style>
    </section>
  );
}
