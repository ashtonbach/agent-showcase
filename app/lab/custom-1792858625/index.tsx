"use client";

import { useEffect, useState } from "react";

type Locale = "en-US" | "es-ES" | "he-IL";
type Msg = Record<string, string>;
const en: Msg = {
  skip: "Skip to content",
  "nav.live": "Production workflow",
  "nav.contact": "Contact",
  "footer.disclaimer": "Features and content for this demo were created by AI.",
  "demo.showcase": "Showcase",
  "demo.dark-mode": "Dark mode toggle",
  "demo.faq-accordion": "FAQ accordion",
  "demo.pricing-table": "Pricing table",
  "demo.animated-counter": "Animated counter",
  "demo.tabs": "Tabs",
  "demo.testimonial-card": "Quote card",
  "demo.feature-grid": "Feature grid",
  "demo.spanish-translation": "Spanish translation",
  "lab.spanish-translation.eyebrow": "Language",
  "lab.spanish-translation.heading": "Meet the agent team",
  "lab.spanish-translation.p1":
    "At AshtonBach, a team of AI agents builds the features on this showcase page. Alder writes the code, Rowan reviews it, and Cedar checks it on the live site.",
  "lab.spanish-translation.p2":
    "A person designed the system and oversees it. Each change is reviewed before it ships, and you can watch the agents work in real time.",
  "lab.spanish-translation.cta": "Meet the team",
};
const es: Msg = {
  skip: "Saltar al contenido",
  "nav.live": "Flujo de trabajo de producción",
  "nav.contact": "Contacto",
  "footer.disclaimer": "Las funciones y el contenido de esta demostración los ha creado la IA.",
  "demo.showcase": "Exhibición",
  "demo.dark-mode": "Interruptor de modo oscuro",
  "demo.faq-accordion": "Acordeón de preguntas frecuentes",
  "demo.pricing-table": "Tabla de precios",
  "demo.animated-counter": "Contador animado",
  "demo.tabs": "Pestañas",
  "demo.testimonial-card": "Tarjeta de cita",
  "demo.feature-grid": "Rejilla de funciones",
  "demo.spanish-translation": "Traducción al español",
  "lab.spanish-translation.eyebrow": "Idioma",
  "lab.spanish-translation.heading": "Conoced al equipo de agentes",
  "lab.spanish-translation.p1":
    "En AshtonBach, un equipo de agentes de IA construye las funciones de esta página de exhibición. Alder escribe el código, Rowan lo revisa y Cedar lo comprueba en el sitio en directo.",
  "lab.spanish-translation.p2":
    "Una persona diseñó el sistema y lo supervisa. Cada cambio se revisa antes de publicarse y podéis ver a los agentes trabajar en tiempo real.",
  "lab.spanish-translation.cta": "Conoced al equipo",
};
const he: Msg = {
  skip: "דלג לתוכן",
  "nav.live": "זרימת עבודה בייצור",
  "nav.contact": "יצירת קשר",
  "footer.disclaimer": "התכונות והתוכן בהדגמה זו נוצרו על ידי בינה מלאכותית.",
  "demo.showcase": "תצוגה",
  "demo.dark-mode": "מצב כהה",
  "demo.faq-accordion": "שאלות נפוצות",
  "demo.pricing-table": "טבלת מחירים",
  "demo.animated-counter": "מונה מונפש",
  "demo.tabs": "לשוניות",
  "demo.testimonial-card": "כרטיס ציטוט",
  "demo.feature-grid": "רשת תכונות",
  "demo.spanish-translation": "תרגום לספרדית",
  "lab.spanish-translation.eyebrow": "שפה",
  "lab.spanish-translation.heading": "הכירו את צוות הסוכנים",
  "lab.spanish-translation.p1":
    "ב-AshtonBach צוות סוכני בינה מלאכותית בונה את התכונות בדף התצוגה הזה. Alder כותב הקוד, Rowan בודק אותו, ו-Cedar מאמת אותו באתר החי.",
  "lab.spanish-translation.p2":
    "אדם אחד תכנן המערכת ומפקח עליה. כל שינוי נבדק לפני שהוא עולה לאוויר, ואפשר לצפות בסוכנים עובדים בזמן אמת.",
  "lab.spanish-translation.cta": "הכירו את הצוות",
};
const packs: Record<Locale, Msg> = { "en-US": en, "es-ES": es, "he-IL": he };

const css = `[data-lab="custom-1792858625"]{width:min(720px,100%);margin:8px auto 56px}[data-lab="custom-1792858625"] h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin:0 0 .7rem}[data-lab="custom-1792858625"] p{color:var(--mist);margin:0 0 1rem;line-height:1.55}.lab-switch{display:inline-flex;flex-wrap:wrap;gap:0}.lab-seg{font-family:var(--sans);font-size:14px;padding:.45rem 1rem;cursor:pointer;background:transparent;color:var(--mist);border:1px solid var(--sage)}.lab-seg[aria-pressed="true"]{background:var(--sage);color:#14201A}`;

function applyLocale(locale: Locale) {
  document.documentElement.lang = locale === "he-IL" ? "he" : locale;
  document.documentElement.dir = locale === "he-IL" ? "rtl" : "ltr";
  const pack = packs[locale];
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (key && pack[key]) node.textContent = pack[key];
  });
}

export default function Lab() {
  const [locale, setLocale] = useState<Locale>("en-US");
  const pack = packs[locale];
  useEffect(() => { applyLocale(locale); }, [locale]);
  return (
    <section data-lab="custom-1792858625" aria-labelledby="lab-es-h">
      <style>{css}</style>
      <h2 id="lab-es-h" data-i18n="lab.spanish-translation.heading">{pack["lab.spanish-translation.heading"]}</h2>
      <p data-i18n="lab.spanish-translation.p1">{pack["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{pack["lab.spanish-translation.p2"]}</p>
      <div className="lab-switch" role="group" aria-label="Language">
        <button type="button" data-locale="en-US" aria-pressed={locale === "en-US"} className="lab-seg" onClick={() => setLocale("en-US")}>English</button>
        <button type="button" data-locale="es-ES" aria-pressed={locale === "es-ES"} className="lab-seg" onClick={() => setLocale("es-ES")}>Español</button>
        <button type="button" data-locale="he-IL" aria-pressed={locale === "he-IL"} className="lab-seg" onClick={() => setLocale("he-IL")}>עברית</button>
      </div>
    </section>
  );
}
