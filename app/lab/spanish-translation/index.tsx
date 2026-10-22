"use client";

import { useEffect, useState } from "react";
import en from "../../../messages/en-US.json";
import es from "../../../messages/es-ES.json";

type Locale = "en-US" | "es-ES";
const copy: Record<Locale, Record<string, string>> = { "en-US": en, "es-ES": es };

const css = `
.lab-i18n{width:min(720px,100%);margin:8px auto 56px}
.lab-i18n h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin:0 0 16px}
.lab-i18n p{color:var(--mist);margin:0 0 16px;line-height:1.55}
.lab-lang{display:inline-flex;gap:8px}
.lab-lang button{font-family:var(--sans);font-size:14px;padding:8px 18px;cursor:pointer;border-radius:8px}
.lab-lang button[aria-pressed="true"]{background:var(--sage);color:#14201A;border:1px solid var(--sage)}
.lab-lang button[aria-pressed="false"]{background:transparent;color:var(--mist);border:1px solid var(--sage)}
`;

function apply(locale: Locale) {
  document.documentElement.lang = locale;
  const dict = copy[locale];
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (key && dict[key]) node.textContent = dict[key];
  });
}

export default function Lab() {
  const [locale, setLocale] = useState<Locale>("en-US");
  useEffect(() => { apply(locale); }, [locale]);
  const t = copy[locale];
  const pick = (next: Locale) => { setLocale(next); apply(next); };

  return (
    <section data-lab="spanish-translation" aria-labelledby="lab-i18n-h" className="lab-i18n">
      <h2 id="lab-i18n-h" data-i18n="lab.spanish-translation.heading">{t["lab.spanish-translation.heading"]}</h2>
      <p data-i18n="lab.spanish-translation.p1">{t["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{t["lab.spanish-translation.p2"]}</p>
      <div className="lab-lang" role="group" aria-label="Language">
        <button type="button" data-locale="en-US" aria-pressed={locale === "en-US"} onClick={() => pick("en-US")}>English</button>
        <button type="button" data-locale="es-ES" aria-pressed={locale === "es-ES"} onClick={() => pick("es-ES")}>Español</button>
      </div>
      <style>{css}</style>
    </section>
  );
}

