"use client";

import { useCallback, useState } from "react";
import en from "../../../messages/en-US.json";
import es from "../../../messages/es-ES.json";

type Loc = "en-US" | "es-ES";
const MAP: Record<Loc, Record<string, string>> = {
  "en-US": en as Record<string, string>,
  "es-ES": es as Record<string, string>,
};

function applyPageLocale(loc: Loc) {
  document.documentElement.lang = loc;
  const msg = MAP[loc];
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const k = node.getAttribute("data-i18n");
    if (k && msg[k]) node.textContent = msg[k];
  });
}

const css = `
.lab-st{width:min(720px,100%);margin:8px auto 56px}
.lab-st h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin:0 0 16px}
.lab-st p{color:#E8EEE9;line-height:1.65;margin:0 0 14px}
.lab-st p.lab-st-p2{margin-bottom:22px}
.lab-seg{display:inline-flex;border-radius:8px;overflow:hidden}
.lab-seg button{font-family:var(--sans);font-size:14px;line-height:1;padding:10px 22px;cursor:pointer;
  border:1px solid var(--sage);background:transparent;color:#E8EEE9;margin:0}
.lab-seg button+button{margin-left:-1px}
.lab-seg button.lab-on{background:var(--sage);color:#14201A;border-color:var(--sage);z-index:1;position:relative}
.lab-seg button:focus-visible{outline:2px solid var(--mist);outline-offset:2px}
@media (prefers-reduced-motion:reduce){.lab-seg button{transition:none}}
`;

export default function SpanishTranslation() {
  const [loc, setLoc] = useState<Loc>("en-US");
  const msg = MAP[loc];
  const pick = useCallback((next: Loc) => {
    setLoc(next);
    applyPageLocale(next);
  }, []);
  const hid = "lab-spanish-translation-heading";
  return (
    <section data-lab="spanish-translation" aria-labelledby={hid} className="lab-st">
      <style>{css}</style>
      <h2 id={hid} data-i18n="lab.spanish-translation.heading">
        {msg["lab.spanish-translation.heading"]}
      </h2>
      <p data-i18n="lab.spanish-translation.p1">{msg["lab.spanish-translation.p1"]}</p>
      <p className="lab-st-p2" data-i18n="lab.spanish-translation.p2">
        {msg["lab.spanish-translation.p2"]}
      </p>
      <div className="lab-seg" role="group" aria-label="Language">
        <button
          type="button"
          data-locale="en-US"
          aria-pressed={loc === "en-US"}
          className={loc === "en-US" ? "lab-on" : undefined}
          onClick={() => pick("en-US")}
        >
          English
        </button>
        <button
          type="button"
          data-locale="es-ES"
          aria-pressed={loc === "es-ES"}
          className={loc === "es-ES" ? "lab-on" : undefined}
          onClick={() => pick("es-ES")}
        >
          Español
        </button>
      </div>
    </section>
  );
}
