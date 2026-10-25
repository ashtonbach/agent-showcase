"use client";
import { useEffect, useState } from "react";
import Kept from "../spanish-translation";

type Locale = "en-US" | "es-ES" | "pt-BR" | "de-DE" | "he-IL" | "ja-JP";
const K = [
  "skip", "nav.live", "nav.contact", "footer.disclaimer", "demo.showcase",
  "lab.spanish-translation.heading", "lab.spanish-translation.p1", "lab.spanish-translation.p2",
  "lab.custom-1792911271.heading", "lab.custom-1792911271.lang",
] as const;
const T: Record<Locale, readonly string[]> = {
  "en-US": [
    "Skip to content", "Production workflow", "Contact",
    "Features and content for this demo were created by AI.", "Showcase",
    "Meet the agent team",
    "At AshtonBach, a team of AI agents builds the features on this showcase page. Alder writes the code, Rowan reviews it, and Cedar checks it on the live site.",
    "A person designed the system and oversees it. Each change is reviewed before it ships, and you can watch the agents work in real time.",
    "Page language", "Language",
  ],
  "es-ES": [
    "Saltar al contenido", "Flujo de trabajo de producción", "Contacto",
    "Las funciones y el contenido de esta demostración los ha creado la IA.", "Exhibición",
    "Conoced al equipo de agentes",
    "En AshtonBach, un equipo de agentes de IA construye las funciones de esta página de exhibición. Alder escribe el código, Rowan lo revisa y Cedar lo comprueba en el sitio en directo.",
    "Una persona diseñó el sistema y lo supervisa. Cada cambio se revisa antes de publicarse y podéis ver a los agentes trabajar en tiempo real.",
    "Idioma de la página", "Idioma",
  ],
  "pt-BR": [
    "Ir para o conteúdo", "Fluxo de trabalho em produção", "Contato",
    "Os recursos e o conteúdo desta demonstração foram criados por IA.", "Vitrine",
    "Conheça a equipe de agentes",
    "Na AshtonBach, uma equipe de agentes de IA constrói os recursos desta página de vitrine. Alder escreve o código, Rowan revisa e Cedar verifica no site ao vivo.",
    "Uma pessoa projetou o sistema e o supervisiona. Cada alteração é revisada antes de ir ao ar, e você pode ver os agentes trabalhando em tempo real.",
    "Idioma da página", "Idioma",
  ],
  "de-DE": [
    "Zum Inhalt springen", "Produktionsablauf", "Kontakt",
    "Funktionen und Inhalte dieser Demo wurden von KI erstellt.", "Schaufenster",
    "Lernen Sie das Agententeam kennen",
    "Bei AshtonBach entwickelt ein Team aus KI-Agenten die Funktionen auf dieser Schaufensterseite. Alder schreibt den Code, Rowan prüft ihn, und Cedar testet ihn auf der Live-Website.",
    "Eine Person hat das System entworfen und beaufsichtigt es. Jede Änderung wird vor dem Release geprüft, und Sie können die Agenten in Echtzeit bei der Arbeit zusehen.",
    "Seitensprache", "Sprache",
  ],
  "he-IL": [
    "דלג לתוכן", "זרימת עבודה בפרודקשן", "יצירת קשר",
    "התכונות והתוכן בהדגמה זו נוצרו על ידי בינה מלאכותית.", "חלון ראווה",
    "הכירו את צוות הסוכנים",
    "ב-AshtonBach צוות של סוכני בינה מלאכותית בונה את התכונות בדף החלון ראווה. אלדר כותב הקוד, רואן בודק אותו, וסידר בודק באתר החי.",
    "אדם תכנן את המערכת ומפקח עליה. כל שינוי נבדק לפני העלאה, ואפשר לצפות בסוכנים עובדים בזמן אמת.",
    "שפת הדף", "שפה",
  ],
  "ja-JP": [
    "コンテンツへスキップ", "本番ワークフロー", "お問い合わせ",
    "このデモの機能とコンテンツは AI が作成しました。", "ショーケース",
    "エージェントチームに会う",
    "AshtonBach では、AI エージェントのチームがこのショーケースページの機能を構築しています。Alder がコードを書き、Rowan がレビューし、Cedar が本番サイトで確認します。",
    "人がシステムを設計し監督しています。変更は公開前にレビューされ、エージェントの作業をリアルタイムで見られます。",
    "ページの言語", "言語",
  ],
};
const labels: Record<Locale, string> = {
  "en-US": "English", "es-ES": "Español", "pt-BR": "Português", "de-DE": "Deutsch",
  "he-IL": "עברית", "ja-JP": "日本語",
};

function dict(locale: Locale): Record<string, string> {
  const out: Record<string, string> = {};
  K.forEach((key, i) => { out[key] = T[locale][i]; });
  return out;
}

function applyLocale(locale: Locale) {
  const d = dict(locale);
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === "he-IL" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (key && key in d) node.textContent = d[key];
  });
}

export default function Lab() {
  const [locale, setLocale] = useState<Locale>("en-US");
  const t = dict(locale);

  useEffect(() => {
    applyLocale(locale);
  }, [locale]);

  return (
    <section data-lab="custom-1792911271" aria-labelledby="lab-custom-heading" className="lab-custom">
      <style>{`
        .lab-custom { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #F2EFE6); }
        .lab-custom h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 16px; line-height: 1.25; }
        .lab-custom .lab-card { border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; margin-bottom: 24px; }
        .lab-custom .lab-lang { display: flex; flex-wrap: wrap; gap: 8px; }
        .lab-custom .lab-lang button {
          flex: 1 1 calc(33.333% - 8px); min-width: 96px; padding: 10px 12px; font-family: var(--sans);
          font-size: 13px; cursor: pointer; border: 1px solid var(--sage); border-radius: 8px;
          background: transparent; color: var(--mist, #F2EFE6);
        }
        .lab-custom .lab-lang button[aria-pressed="true"] { background: var(--sage); color: #14201A; border-color: var(--sage); }
        .lab-custom .lab-lang button:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
        .lab-custom .lab-spanish .lab-lang { display: none; }
        @media (max-width: 420px) { .lab-custom .lab-lang button { flex: 1 1 calc(50% - 8px); } }
        @media (prefers-reduced-motion: reduce) { .lab-custom .lab-lang button { transition: none; } }
      `}</style>
      <h2 id="lab-custom-heading" data-i18n="lab.custom-1792911271.heading">{t["lab.custom-1792911271.heading"]}</h2>
      <div className="lab-card">
        <div className="lab-lang" role="group" aria-label={t["lab.custom-1792911271.lang"]}>
          {(Object.keys(labels) as Locale[]).map((code) => (
            <button key={code} type="button" data-locale={code} aria-pressed={locale === code} onClick={() => setLocale(code)}>
              {labels[code]}
            </button>
          ))}
        </div>
      </div>
      <Kept />
    </section>
  );
}
