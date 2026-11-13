"use client";

import { useCallback, useState } from "react";
import en from "../../../messages/en-US.json";
import es from "../../../messages/es-ES.json";

type Locale = "en-US" | "es-ES";
type Catalog = Record<string, string>;

const EN = en as Catalog;
const ES = es as Catalog;

const css = `
[data-lab="spanish-translation"]{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#E8EEE9)}
[data-lab="spanish-translation"] h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;margin:0 0 16px}
[data-lab="spanish-translation"] p{margin:0 0 14px;line-height:1.55;font-size:1rem;opacity:.92}
.lab-st-lang{display:inline-flex;margin-top:10px;border-radius:999px;overflow:hidden}
.lab-st-lang button{font-family:var(--sans);font-size:15px;font-weight:500;line-height:1;padding:11px 22px;cursor:pointer;border:1px solid var(--sage,#B0CBBC);background:transparent;color:var(--mist,#E8EEE9)}
.lab-st-lang button.lab-st-active{background:var(--sage,#B0CBBC);color:#14201A;border-color:var(--sage,#B0CBBC)}
.lab-st-lang button:focus-visible{outline:2px solid var(--sage);outline-offset:2px}
@media (prefers-reduced-motion:reduce){.lab-st-lang button{transition:none}}
`;

function applyAll(loc: Locale) {
  const pack = loc === "en-US" ? EN : ES;
  document.documentElement.lang = loc;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key && pack[key]) el.textContent = pack[key];
  });
}

export default function SpanishTranslation() {
  const [locale, setLocale] = useState<Locale>("en-US");
  const pack = locale === "en-US" ? EN : ES;
  const titleId = "spanish-translation-heading";

  const select = useCallback((next: Locale) => {
    setLocale(next);
    applyAll(next);
  }, []);

  return (
    <section data-lab="spanish-translation" aria-labelledby={titleId}>
      <style>{css}</style>
      <h2 id={titleId} data-i18n="lab.spanish-translation.heading">
        {pack["lab.spanish-translation.heading"]}
      </h2>
      <p data-i18n="lab.spanish-translation.p1">{pack["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{pack["lab.spanish-translation.p2"]}</p>
      <div className="lab-st-lang" role="group" aria-label="Language">
        <button
          type="button"
          data-locale="en-US"
          className={locale === "en-US" ? "lab-st-active" : undefined}
          aria-pressed={locale === "en-US"}
          onClick={() => select("en-US")}
        >
          English
        </button>
        <button
          type="button"
          data-locale="es-ES"
          className={locale === "es-ES" ? "lab-st-active" : undefined}
          aria-pressed={locale === "es-ES"}
          onClick={() => select("es-ES")}
        >
          Español
        </button>
      </div>
    </section>
  );
}
