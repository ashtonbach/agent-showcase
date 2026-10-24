"use client";

import { useEffect, useState } from "react";
import en from "../../../messages/en-US.json";
import es from "../../../messages/es-ES.json";

type Locale = "en-US" | "es-ES";
type Msg = Record<string, string>;
const packs: Record<Locale, Msg> = { "en-US": en as Msg, "es-ES": es as Msg };

const css = `[data-lab="spanish-translation"]{width:min(720px,100%);margin:8px auto 56px}[data-lab="spanish-translation"] h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin:0 0 .7rem}[data-lab="spanish-translation"] p{color:var(--mist);margin:0 0 1rem;line-height:1.55}.lab-switch{display:inline-flex}.lab-seg{font-family:var(--sans);font-size:14px;padding:.45rem 1rem;cursor:pointer;background:transparent;color:var(--mist);border:1px solid var(--sage)}.lab-seg[aria-pressed="true"]{background:var(--sage);color:#14201A}`;

function applyLocale(locale: Locale) {
  document.documentElement.lang = locale;
  const pack = packs[locale];
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (key && pack[key]) node.textContent = pack[key];
  });
}

export default function Lab() {
  const [locale, setLocale] = useState<Locale>("en-US");
  const pack = packs[locale];
  useEffect(() => { applyLocale(locale); }, [locale]);
  return (
    <section data-lab="spanish-translation" aria-labelledby="lab-es-h">
      <style>{css}</style>
      <h2 id="lab-es-h" data-i18n="lab.spanish-translation.heading">{pack["lab.spanish-translation.heading"]}</h2>
      <p data-i18n="lab.spanish-translation.p1">{pack["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{pack["lab.spanish-translation.p2"]}</p>
      <div className="lab-switch" role="group" aria-label="Language">
        <button type="button" data-locale="en-US" aria-pressed={locale === "en-US"} className="lab-seg" onClick={() => setLocale("en-US")}>English</button>
        <button type="button" data-locale="es-ES" aria-pressed={locale === "es-ES"} className="lab-seg" onClick={() => setLocale("es-ES")}>Español</button>
      </div>
    </section>
  );
}
