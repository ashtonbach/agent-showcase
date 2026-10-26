"use client";

import { useCallback, useState } from "react";
import enUS from "../../../messages/en-US.json";
import esES from "../../../messages/es-ES.json";

type Locale = "en-US" | "es-ES";
type Messages = Record<string, string>;

const PACKS: Record<Locale, Messages> = { "en-US": enUS, "es-ES": esES };

function applyLocale(locale: Locale) {
  const pack = PACKS[locale];
  document.documentElement.lang = locale;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (key && key in pack) node.textContent = pack[key];
  });
}

const css = `
.lab-wrap{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6)}
.lab-wrap h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.25;margin:0 0 16px;color:var(--mist,#F2EFE6)}
.lab-wrap p{margin:0 0 14px;line-height:1.6;color:#E8EEE9}
.lab-seg{display:flex;margin-top:24px;border-radius:8px;overflow:hidden;gap:0;width:fit-content}
.lab-seg button{font-family:var(--sans);font-size:15px;padding:10px 20px;border:1px solid var(--sage);cursor:pointer;transition:background .15s,color .15s}
@media (prefers-reduced-motion:reduce){.lab-seg button{transition:none}}
.lab-seg button[data-active="true"]{background:var(--sage);color:#14201A;border-color:var(--sage)}
.lab-seg button[data-active="false"]{background:#14201A;color:var(--mist,#F2EFE6);border:1px solid var(--sage)}
.lab-seg button:first-child{border-radius:8px 0 0 8px}
.lab-seg button:last-child{border-radius:0 8px 8px 0;border-left:none}
.lab-seg button[data-active="false"]:last-child{border-left:1px solid var(--sage)}
`;

export default function Lab() {
  const [locale, setLocale] = useState<Locale>("en-US");
  const m = PACKS[locale];
  const pick = useCallback((next: Locale) => {
    setLocale(next);
    applyLocale(next);
  }, []);

  return (
    <section
      data-lab="spanish-translation"
      aria-labelledby="lab-spanish-heading"
      className="lab-wrap"
    >
      <style>{css}</style>
      <h2 id="lab-spanish-heading" data-i18n="lab.spanish-translation.heading">
        {m["lab.spanish-translation.heading"]}
      </h2>
      <p data-i18n="lab.spanish-translation.p1">{m["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{m["lab.spanish-translation.p2"]}</p>
      <div className="lab-seg" role="group" aria-label="Language">
        <button
          type="button"
          data-locale="en-US"
          aria-pressed={locale === "en-US"}
          data-active={locale === "en-US" ? "true" : "false"}
          onClick={() => pick("en-US")}
        >
          English
        </button>
        <button
          type="button"
          data-locale="es-ES"
          aria-pressed={locale === "es-ES"}
          data-active={locale === "es-ES" ? "true" : "false"}
          onClick={() => pick("es-ES")}
        >
          Español
        </button>
      </div>
    </section>
  );
}
