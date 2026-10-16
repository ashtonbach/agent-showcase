"use client";

import { useEffect, useState } from "react";
import en from "../../../messages/en-US.json";
import es from "../../../messages/es-ES.json";

type Locale = "en-US" | "es-ES";
const pack = { "en-US": en, "es-ES": es };

const css =
  ".lab-i18n{width:min(720px,100%);margin:8px auto 56px;color:var(--mist)}" +
  ".lab-i18n h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 16px}" +
  ".lab-i18n p{margin:0 0 16px;line-height:1.65;color:var(--mist)}" +
  ".lab-lang{display:inline-flex;margin-top:8px}" +
  ".lab-lang button{font:500 14px/1.2 var(--sans);padding:8px 18px;cursor:pointer;background:transparent;color:var(--mist);border:1px solid var(--sage)}" +
  ".lab-lang button[aria-pressed=\"true\"]{background:var(--sage);color:#14201A}" +
  ".lab-lang button:first-child{border-radius:8px 0 0 8px}" +
  ".lab-lang button:last-child{border-radius:0 8px 8px 0;margin-left:-1px}" +
  "@media (prefers-reduced-motion:reduce){.lab-i18n,.lab-lang button{transition:none}}";

export default function SpanishTranslation() {
  const [locale, setLocale] = useState<Locale>("en-US");
  useEffect(() => {
    document.documentElement.lang = locale;
    const m = pack[locale] as Record<string, string>;
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (key && m[key]) node.textContent = m[key];
    });
  }, [locale]);
  const text = (key: string) => (pack[locale] as Record<string, string>)[key];

  return (
    <section data-lab="spanish-translation" aria-labelledby="lab-es-h" className="lab-i18n">
      <h2 id="lab-es-h" data-i18n="lab.spanish-translation.heading">{text("lab.spanish-translation.heading")}</h2>
      <p data-i18n="lab.spanish-translation.p1">{text("lab.spanish-translation.p1")}</p>
      <p data-i18n="lab.spanish-translation.p2">{text("lab.spanish-translation.p2")}</p>
      <div className="lab-lang" role="group" aria-label="Language">
        <button type="button" data-locale="en-US" aria-pressed={locale === "en-US"} onClick={() => setLocale("en-US")}>English</button>
        <button type="button" data-locale="es-ES" aria-pressed={locale === "es-ES"} onClick={() => setLocale("es-ES")}>Español</button>
      </div>
      <style>{css}</style>
    </section>
  );
}

