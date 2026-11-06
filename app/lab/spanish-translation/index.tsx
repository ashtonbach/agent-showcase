"use client";

import { useCallback, useId, useState } from "react";
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
.lab-st-wrap{width:min(720px,100%);margin:8px auto 56px}
.lab-st-wrap h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.25;color:var(--mist);margin:0 0 16px}
.lab-st-wrap p{color:#E8EEE9;line-height:1.6;margin:0 0 14px}
.lab-st-lang{display:flex;gap:0;margin-top:22px;border-radius:8px;overflow:hidden;width:fit-content}
.lab-st-lang button{font-family:var(--sans);font-size:15px;line-height:1;padding:10px 18px;cursor:pointer;border:1px solid var(--sage);background:transparent;color:#F2EFE6}
.lab-st-lang button[aria-pressed=true]{background:var(--sage);color:#14201A;border-color:var(--sage)}
.lab-st-lang button[aria-pressed=false]{background:transparent;color:#F2EFE6}
@media (prefers-reduced-motion:reduce){.lab-st-lang button{transition:none}}
`;

export default function Lab() {
  const headingId = useId();
  const [locale, setLocale] = useState<Locale>("en-US");
  const copy = catalogs[locale];

  const choose = useCallback((next: Locale) => {
    setLocale(next);
    syncPageLocale(next);
  }, []);

  return (
    <section
      data-lab="spanish-translation"
      aria-labelledby={headingId}
      className="lab-st-wrap"
    >
      <style>{css}</style>
      <h2 id={headingId} data-i18n="lab.spanish-translation.heading">
        {copy["lab.spanish-translation.heading"]}
      </h2>
      <p data-i18n="lab.spanish-translation.p1">{copy["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{copy["lab.spanish-translation.p2"]}</p>
      <div className="lab-st-lang" role="group" aria-label="Language">
        <button
          type="button"
          data-locale="en-US"
          aria-pressed={locale === "en-US"}
          onClick={() => choose("en-US")}
        >
          English
        </button>
        <button
          type="button"
          data-locale="es-ES"
          aria-pressed={locale === "es-ES"}
          onClick={() => choose("es-ES")}
        >
          Español
        </button>
      </div>
    </section>
  );
}
