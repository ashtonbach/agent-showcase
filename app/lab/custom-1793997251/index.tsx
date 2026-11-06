"use client";

import { useCallback, useId, useState } from "react";

type Locale = "en-US" | "es-ES" | "fr-FR" | "he-IL";

// Values match messages/en-US.json (source: repo messages file).
const enUS: Record<string, string> = {
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

// Values match messages/es-ES.json (source: repo messages file).
const esES: Record<string, string> = {
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

const frFR: Record<string, string> = {
  skip: "Aller au contenu",
  "nav.live": "Processus de production",
  "nav.contact": "Contact",
  "footer.disclaimer":
    "Les fonctionnalités et le contenu de cette démonstration ont été créés par l’IA.",
  "demo.showcase": "Vitrine",
  "demo.dark-mode": "Basculer le mode sombre",
  "demo.faq-accordion": "Accordéon FAQ",
  "demo.pricing-table": "Tableau des tarifs",
  "demo.animated-counter": "Compteur animé",
  "demo.tabs": "Onglets",
  "demo.testimonial-card": "Carte de citation",
  "demo.feature-grid": "Grille de fonctionnalités",
  "demo.spanish-translation": "Traduction vers l’espagnol",
  "lab.spanish-translation.eyebrow": "Langue",
  "lab.spanish-translation.heading": "Rencontrez l’équipe d’agents",
  "lab.spanish-translation.p1":
    "Chez AshtonBach, une équipe d’agents IA construit les fonctionnalités de cette page vitrine. Alder écrit le code, Rowan le relit et Cedar le vérifie sur le site en direct.",
  "lab.spanish-translation.p2":
    "Une personne a conçu le système et le supervise. Chaque modification est relue avant publication, et vous pouvez voir les agents travailler en temps réel.",
  "lab.spanish-translation.cta": "Rencontrez l’équipe",
};

// Hebrew strings translated in parallel with en-US/es-ES/fr-FR keys (same message sources).
const heIL: Record<string, string> = {
  skip: "דילוג לתוכן",
  "nav.live": "זרימת עבודה לייצור",
  "nav.contact": "יצירת קשר",
  "footer.disclaimer": "התכונות והתוכן של הדגמה זו נוצרו על ידי בינה מלאכותית.",
  "demo.showcase": "חלון ראווה",
  "demo.dark-mode": "מתג מצב כהה",
  "demo.faq-accordion": "אקורדיון שאלות נפוצות",
  "demo.pricing-table": "טבלת תמחור",
  "demo.animated-counter": "מונה מונפש",
  "demo.tabs": "לשוניות",
  "demo.testimonial-card": "כרטיס ציטוט",
  "demo.feature-grid": "רשת תכונות",
  "demo.spanish-translation": "תרגום לספרדית",
  "lab.spanish-translation.eyebrow": "שפה",
  "lab.spanish-translation.heading": "הכירו את צוות הסוכנים",
  "lab.spanish-translation.p1":
    "ב־AshtonBach צוות של סוכני בינה מלאכותית בונה את התכונות בדף הראווה הזה. אלדר כותב את הקוד, רואן סורק אותו, וסידר בודקת אותו באתר החי.",
  "lab.spanish-translation.p2":
    "אדם עיצב את המערכת ומפקח עליה. כל שינוי נבדק לפני שהוא יוצא לאוויר, ואפשר לראות את הסוכנים עובדים בזמן אמת.",
  "lab.spanish-translation.cta": "הכירו את הצוות",
};

const catalogs: Record<Locale, Record<string, string>> = {
  "en-US": enUS,
  "es-ES": esES,
  "fr-FR": frFR,
  "he-IL": heIL,
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
.lab-st-wrap{box-sizing:border-box;width:min(720px,100%);margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,0.28);border-radius:16px}
.lab-st-wrap h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.25;color:var(--mist);margin:0 0 16px}
.lab-st-wrap p{color:#E8EEE9;line-height:1.6;margin:0 0 14px}
.lab-st-lang{display:flex;flex-wrap:wrap;gap:0;margin-top:22px;border-radius:8px;overflow:hidden;width:fit-content;max-width:100%}
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
      data-lab="custom-1793997251"
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
        <button
          type="button"
          data-locale="fr-FR"
          aria-pressed={locale === "fr-FR"}
          onClick={() => choose("fr-FR")}
        >
          Français
        </button>
        <button
          type="button"
          data-locale="he-IL"
          aria-pressed={locale === "he-IL"}
          onClick={() => choose("he-IL")}
        >
          עברית
        </button>
      </div>
    </section>
  );
}
