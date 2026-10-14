"use client";
import { useEffect, useState } from "react";
import en from "../../../messages/en-US.json";
import es from "../../../messages/es-ES.json";

type Locale = "en-US" | "es-ES";
const messages: Record<Locale, Record<string, string>> = { "en-US": en, "es-ES": es };
const keys = {
  eyebrow: "lab.spanish-translation.eyebrow",
  heading: "lab.spanish-translation.heading",
  p1: "lab.spanish-translation.p1",
  p2: "lab.spanish-translation.p2",
  cta: "lab.spanish-translation.cta",
} as const;

const css = `.lab-wrap{width:min(720px,100%);margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,0.28);border-radius:16px;box-sizing:border-box;color:var(--mist,#F2EFE6)}.lab-wrap .label{font-family:var(--sans);font-weight:500;letter-spacing:0.16em;text-transform:uppercase;margin:0 0 8px;color:var(--sage)}.lab-wrap h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;margin:0 0 16px}.lab-wrap p{margin:0 0 12px;color:#E8EEE9;line-height:1.5}.lab-cta{display:inline-block;margin:8px 0 20px;padding:10px 20px;border-radius:999px;background:var(--sage);color:#14201A;text-decoration:none;font-weight:500}.lab-lang{display:inline-flex;flex-wrap:wrap;gap:0}.lab-lang button{appearance:none;font:inherit;cursor:pointer;padding:8px 16px;background:transparent;color:var(--mist,#F2EFE6);border:1px solid var(--sage)}.lab-lang button[aria-pressed="true"]{background:var(--sage);color:#14201A}.lab-lang button:first-child{border-radius:999px 0 0 999px}.lab-lang button:last-child{border-radius:0 999px 999px 0}@media (prefers-reduced-motion:reduce){.lab-wrap,.lab-wrap *{transition:none!important}}`;

export default function SpanishTranslation() {
  const [locale, setLocale] = useState<Locale>("en-US");
  function applyLocale(next: Locale) {
    setLocale(next);
    document.documentElement.lang = next;
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (key && messages[next][key]) node.textContent = messages[next][key];
    });
  }
  useEffect(() => {
    applyLocale("en-US");
  }, []);
  const t = messages[locale];

  return (
    <section data-lab="spanish-translation" aria-labelledby="lab-es-heading" className="lab-wrap">
      <style>{css}</style>
      <p className="label" data-i18n={keys.eyebrow}>{t[keys.eyebrow]}</p>
      <h2 id="lab-es-heading" data-i18n={keys.heading}>{t[keys.heading]}</h2>
      <p data-i18n={keys.p1}>{t[keys.p1]}</p>
      <p data-i18n={keys.p2}>{t[keys.p2]}</p>
      <a data-cta href="https://ashtonbach.com/about" className="lab-cta" data-i18n={keys.cta}>{t[keys.cta]}</a>
      <div className="lab-lang" role="group" aria-label="Language">
        <button type="button" data-locale="en-US" aria-pressed={locale === "en-US"} onClick={() => applyLocale("en-US")}>English</button>
        <button type="button" data-locale="es-ES" aria-pressed={locale === "es-ES"} onClick={() => applyLocale("es-ES")}>Español</button>
      </div>
    </section>
  );
}

