"use client";

import { useState, useEffect, useCallback } from "react";
import enUS from "../../../messages/en-US.json";
import esES from "../../../messages/es-ES.json";

type Locale = "en-US" | "es-ES";

const catalogs: Record<Locale, Record<string, string>> = {
  "en-US": enUS as Record<string, string>,
  "es-ES": esES as Record<string, string>,
};

function syncPageLocale(locale: Locale) {
  const dict = catalogs[locale];
  document.documentElement.lang = locale;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (key && dict[key]) node.textContent = dict[key];
  });
}

const css = `
.lab-wrap{width:min(720px,100%);margin:8px auto 56px}
.lab-wrap h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin:0 0 16px}
.lab-wrap p{color:#E8EEE9;line-height:1.6;margin:0 0 14px}
.lab-lang{display:flex;margin-top:24px;border-radius:8px;overflow:hidden;width:fit-content}
.lab-lang button{font-family:var(--sans);font-size:14px;padding:10px 20px;cursor:pointer;border:1px solid var(--sage);background:transparent;color:#E8EEE9}
.lab-lang button.lab-on{background:var(--sage);color:#14201A;border-color:var(--sage)}
.lab-lang button:not(.lab-on){background:transparent}
.lab-lang button:focus-visible{outline:2px solid var(--sage);outline-offset:2px}
@media (prefers-reduced-motion:reduce){.lab-lang button{transition:none}}
`;

export default function Lab() {
  const [locale, setLocale] = useState<Locale>("en-US");
  const t = catalogs[locale];
  const hid = "lab-spanish-heading";

  const pick = useCallback((next: Locale) => setLocale(next), []);

  useEffect(() => {
    syncPageLocale(locale);
  }, [locale]);

  return (
    <section data-lab="spanish-translation" aria-labelledby={hid} className="lab-wrap">
      <style>{css}</style>
      <h2 id={hid} data-i18n="lab.spanish-translation.heading">
        {t["lab.spanish-translation.heading"]}
      </h2>
      <p data-i18n="lab.spanish-translation.p1">{t["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{t["lab.spanish-translation.p2"]}</p>
      <div className="lab-lang" role="group" aria-label="Language">
        <button
          type="button"
          data-locale="en-US"
          className={locale === "en-US" ? "lab-on" : undefined}
          aria-pressed={locale === "en-US"}
          onClick={() => pick("en-US")}
        >
          English
        </button>
        <button
          type="button"
          data-locale="es-ES"
          className={locale === "es-ES" ? "lab-on" : undefined}
          aria-pressed={locale === "es-ES"}
          onClick={() => pick("es-ES")}
        >
          Español
        </button>
      </div>
    </section>
  );
}
