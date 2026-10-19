"use client";

import { useCallback, useState } from "react";
import enUS from "../../../messages/en-US.json";
import esES from "../../../messages/es-ES.json";

const locales: Record<string, Record<string, string>> = {
  "en-US": enUS,
  "es-ES": esES,
};

function applyLocale(locale: string) {
  const messages = locales[locale];
  if (!messages) return;
  document.documentElement.lang = locale;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key && messages[key]) el.textContent = messages[key];
  });
}

const css = `
.lab-wrap{width:min(720px,100%);margin:8px auto 56px}
.lab-wrap h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin:0 0 16px}
.lab-wrap p{color:#E8EEE9;line-height:1.6;margin:0 0 14px}
.lab-lang{margin-top:24px;width:fit-content;display:inline-flex;border-radius:8px;overflow:hidden;border:1px solid var(--sage)}
.lab-lang button{font-family:var(--sans);font-size:15px;padding:10px 20px;border:0;border-radius:0;cursor:pointer;background-color:#14201A;background-image:none;box-shadow:none;transition:background-color .15s,color .15s}
@media (prefers-reduced-motion:reduce){.lab-lang button{transition:none}}
.lab-lang button[data-active="true"]{background-color:var(--sage);color:#14201A}
.lab-lang button[data-active="false"]{background-color:#14201A;color:var(--mist)}
.lab-lang button+button{border-left:1px solid var(--sage)}
`;

export default function Lab() {
  const [locale, setLocale] = useState("en-US");
  const pick = useCallback((next: string) => {
    setLocale(next);
    applyLocale(next);
  }, []);
  const t = locales[locale];

  return (
    <section
      data-lab="spanish-translation"
      aria-labelledby="lab-es-heading"
      className="lab-wrap"
    >
      <style>{css}</style>
      <h2 id="lab-es-heading" data-i18n="lab.spanish-translation.heading">
        {t["lab.spanish-translation.heading"]}
      </h2>
      <p data-i18n="lab.spanish-translation.p1">{t["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{t["lab.spanish-translation.p2"]}</p>
      <div className="lab-lang" role="group" aria-label="Language">
        <button
          type="button"
          data-locale="en-US"
          data-active={locale === "en-US" ? "true" : "false"}
          aria-pressed={locale === "en-US"}
          onClick={() => pick("en-US")}
        >
          English
        </button>
        <button
          type="button"
          data-locale="es-ES"
          data-active={locale === "es-ES" ? "true" : "false"}
          aria-pressed={locale === "es-ES"}
          onClick={() => pick("es-ES")}
        >
          Español
        </button>
      </div>
    </section>
  );
}
