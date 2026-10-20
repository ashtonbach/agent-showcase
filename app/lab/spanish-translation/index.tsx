"use client";

import { useCallback, useState } from "react";
import enUS from "../../../messages/en-US.json";
import esES from "../../../messages/es-ES.json";

const locales = { "en-US": enUS, "es-ES": esES } as Record<string, Record<string, string>>;
const headingId = "lab-spanish-heading";

function applyLocale(locale: string) {
  const msgs = locales[locale];
  document.documentElement.lang = locale;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key && msgs[key]) el.textContent = msgs[key];
  });
}

export default function Lab() {
  const [locale, setLocale] = useState("en-US");
  const msgs = locales[locale];
  const pick = useCallback((next: string) => {
    setLocale(next);
    applyLocale(next);
  }, []);

  return (
    <section data-lab="spanish-translation" aria-labelledby={headingId}>
      <style>{`
        [data-lab="spanish-translation"]{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6)}
        [data-lab="spanish-translation"] h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.25;margin:0 0 16px}
        [data-lab="spanish-translation"] p{margin:0 0 14px;line-height:1.55;color:#E8EEE9}
        .lab-lang{display:flex;gap:0;margin-top:24px;border-radius:8px;overflow:hidden;width:fit-content}
        .lab-lang button{font-family:var(--sans);font-size:14px;padding:10px 20px;cursor:pointer;border:1px solid var(--sage);transition:background .15s,color .15s}
        .lab-lang button[aria-pressed="true"]{background:var(--sage);color:#14201A;border-color:var(--sage)}
        .lab-lang button[aria-pressed="false"]{background:transparent;color:var(--mist,#F2EFE6)}
        .lab-lang button:first-child{border-radius:8px 0 0 8px}
        .lab-lang button:last-child{border-radius:0 8px 8px 0;border-left:none}
        @media (prefers-reduced-motion:reduce){.lab-lang button{transition:none}}
      `}</style>
      <h2 id={headingId} data-i18n="lab.spanish-translation.heading">{msgs["lab.spanish-translation.heading"]}</h2>
      <p data-i18n="lab.spanish-translation.p1">{msgs["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{msgs["lab.spanish-translation.p2"]}</p>
      <div className="lab-lang" role="group" aria-label="Language">
        <button type="button" data-locale="en-US" aria-pressed={locale === "en-US"} onClick={() => pick("en-US")}>
          English
        </button>
        <button type="button" data-locale="es-ES" aria-pressed={locale === "es-ES"} onClick={() => pick("es-ES")}>
          Español
        </button>
      </div>
    </section>
  );
}
