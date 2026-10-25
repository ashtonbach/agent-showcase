"use client";
import { useEffect, useState } from "react";

const catalogs = {
  "en-US": {
    skip: "Skip to content",
    "nav.live": "Production workflow",
    "nav.contact": "Contact",
    "footer.disclaimer": "Features and content for this demo were created by AI.",
    "demo.showcase": "Showcase",
    "lab.spanish-translation.heading": "Meet the agent team",
    "lab.spanish-translation.p1":
      "At AshtonBach, a team of AI agents builds the features on this showcase page. Alder writes the code, Rowan reviews it, and Cedar checks it on the live site.",
    "lab.spanish-translation.p2":
      "A person designed the system and oversees it. Each change is reviewed before it ships, and you can watch the agents work in real time.",
  },
  "es-ES": {
    skip: "Saltar al contenido",
    "nav.live": "Flujo de trabajo de producción",
    "nav.contact": "Contacto",
    "footer.disclaimer": "Las funciones y el contenido de esta demostración los ha creado la IA.",
    "demo.showcase": "Exhibición",
    "lab.spanish-translation.heading": "Conoced al equipo de agentes",
    "lab.spanish-translation.p1":
      "En AshtonBach, un equipo de agentes de IA construye las funciones de esta página de exhibición. Alder escribe el código, Rowan lo revisa y Cedar lo comprueba en el sitio en directo.",
    "lab.spanish-translation.p2":
      "Una persona diseñó el sistema y lo supervisa. Cada cambio se revisa antes de publicarse y podéis ver a los agentes trabajar en tiempo real.",
  },
} as const;
type Locale = "en-US" | "es-ES";

function applyLocale(locale: Locale) {
  const dict = catalogs[locale];
  document.documentElement.lang = locale;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (key && key in dict) node.textContent = dict[key as keyof typeof dict];
  });
}

export default function Lab() {
  const [locale, setLocale] = useState<Locale>("en-US");
  const t = catalogs[locale];

  useEffect(() => {
    applyLocale(locale);
  }, [locale]);

  return (
    <section
      data-lab="custom-1792914185"
      aria-labelledby="lab-spanish-heading"
      className="lab-spanish"
    >
      <style>{`
        .lab-spanish { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #F2EFE6); }
        .lab-spanish h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 16px; line-height: 1.25; }
        .lab-spanish p { margin: 0 0 16px; line-height: 1.6; color: #E8EEE9; }
        .lab-hero-head {
          position: relative; margin: 0 0 12px; padding: 28px 22px; border-radius: 16px; overflow: hidden;
          border: 1px solid rgba(176,203,188,0.28); line-height: 1.15;
        }
        .lab-hero-head::before {
          content: ""; position: absolute; inset: -40%; z-index: 0;
          background: linear-gradient(120deg, rgba(45,74,58,0.95) 0%, rgba(120,168,138,0.55) 35%, rgba(30,52,42,0.9) 70%, rgba(176,203,188,0.45) 100%);
          background-size: 220% 220%;
          animation: lab-grad-move 14s ease-in-out infinite;
        }
        .lab-hero-head::after {
          content: ""; position: absolute; inset: 0; z-index: 0;
          background: linear-gradient(180deg, rgba(18,26,22,0.35) 0%, rgba(18,26,22,0.55) 100%);
        }
        .lab-hero-title {
          position: relative; z-index: 1; display: block;
          font-family: var(--serif); font-weight: 700; font-size: clamp(1.75rem, 5vw, 2.5rem);
          color: var(--mist, #F2EFE6); text-shadow: 0 1px 12px rgba(18,26,22,0.65);
        }
        .lab-hero-tag {
          margin: 0 0 18px; font-size: 1.05rem; line-height: 1.5; color: #E8EEE9;
        }
        .lab-hero-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px; }
        .lab-hero-actions button {
          padding: 11px 20px; font-family: var(--sans); font-size: 14px; font-weight: 500; cursor: pointer;
          border-radius: 8px; border: 1px solid rgba(176,203,188,0.65); background: #1a2820; color: #F2EFE6;
        }
        .lab-hero-actions button:first-child { background: var(--sage); color: #121A16; border-color: var(--sage); }
        .lab-hero-actions button:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
        @keyframes lab-grad-move {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .lab-lang { display: flex; gap: 0; margin-top: 8px; }
        .lab-lang button {
          flex: 1; padding: 10px 16px; font-family: var(--sans); font-size: 14px; cursor: pointer;
          border: 1px solid var(--sage); background: transparent; color: var(--mist, #F2EFE6);
        }
        .lab-lang button:first-child { border-radius: 8px 0 0 8px; }
        .lab-lang button:last-child { border-radius: 0 8px 8px 0; border-left: none; }
        .lab-lang button[aria-pressed="true"] { background: var(--sage); color: #14201A; border-color: var(--sage); }
        .lab-lang button:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) {
          .lab-hero-head::before { animation: none; background-position: 50% 50%; }
          .lab-lang button, .lab-hero-actions button { transition: none; }
        }
      `}</style>
      <h2 id="lab-spanish-heading" className="lab-hero-head" data-i18n="lab.spanish-translation.heading">
        <span className="lab-hero-title">{t["lab.spanish-translation.heading"]}</span>
      </h2>
      <p className="lab-hero-tag">Switch languages below — the whole page follows your choice.</p>
      <div className="lab-hero-actions">
        <button type="button">See the demo</button>
        <button type="button">How it works</button>
      </div>
      <p data-i18n="lab.spanish-translation.p1">{t["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{t["lab.spanish-translation.p2"]}</p>
      <div className="lab-lang" role="group" aria-label="Language">
        <button
          type="button"
          data-locale="en-US"
          aria-pressed={locale === "en-US"}
          onClick={() => setLocale("en-US")}
        >
          English
        </button>
        <button
          type="button"
          data-locale="es-ES"
          aria-pressed={locale === "es-ES"}
          onClick={() => setLocale("es-ES")}
        >
          Español
        </button>
      </div>
    </section>
  );
}
