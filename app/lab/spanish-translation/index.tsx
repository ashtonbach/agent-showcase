"use client";
import { useCallback, useEffect, useState } from "react";
import en from "../../../messages/en-US.json";
import es from "../../../messages/es-ES.json";

const pack = { "en-US": en, "es-ES": es } as const;
type Locale = keyof typeof pack;

const css = `.lab-i18n{width:min(720px,100%);margin:8px auto 56px;color:var(--mist)}.lab-i18n h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 16px}.lab-i18n p{margin:0 0 16px;line-height:1.6}.lab-i18n [role=group]{display:inline-flex}.lab-i18n button{font:500 14px/1.2 var(--sans);padding:8px 18px;cursor:pointer;color:var(--mist);background:transparent;border:1px solid var(--sage)}.lab-i18n button[aria-pressed=true]{background:var(--sage);color:#14201A}.lab-i18n button:first-of-type{border-radius:8px 0 0 8px}.lab-i18n button:last-of-type{border-radius:0 8px 8px 0;margin-left:-1px}@media (prefers-reduced-motion:reduce){.lab-i18n button{transition:none}}`;

export default function Lab() {
  const [locale, setLocale] = useState<Locale>("en-US");
  const apply = useCallback((next: Locale) => {
    setLocale(next);
    document.documentElement.lang = next;
    const msgs = pack[next] as Record<string, string>;
    document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((n) => {
      const k = n.getAttribute("data-i18n");
      if (k && msgs[k]) n.textContent = msgs[k];
    });
  }, []);
  useEffect(() => { apply("en-US"); }, [apply]);
  return (
    <section data-lab="spanish-translation" aria-labelledby="lab-i18n-h" className="lab-i18n">
      <h2 id="lab-i18n-h" data-i18n="lab.spanish-translation.heading">{(pack[locale] as Record<string, string>)["lab.spanish-translation.heading"]}</h2>
      <p data-i18n="lab.spanish-translation.p1">{(pack[locale] as Record<string, string>)["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{(pack[locale] as Record<string, string>)["lab.spanish-translation.p2"]}</p>
      <div role="group" aria-label="Language">
        <button type="button" data-locale="en-US" aria-pressed={locale === "en-US"} onClick={() => apply("en-US")}>English</button>
        <button type="button" data-locale="es-ES" aria-pressed={locale === "es-ES"} onClick={() => apply("es-ES")}>Español</button>
      </div>
      <style>{css}</style>
    </section>
  );
}
