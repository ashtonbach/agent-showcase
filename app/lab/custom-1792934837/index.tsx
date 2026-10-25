"use client";

import { useEffect, useState } from "react";

type Locale = "en-US" | "es-ES" | "pt-BR" | "de-DE" | "he-IL" | "ja-JP";
type Msg = Record<string, string>;
const en: Msg = {
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
};
const es: Msg = {
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
};
const pt: Msg = {
  skip: "Ir para o conteúdo",
  "nav.live": "Fluxo de trabalho em produção",
  "nav.contact": "Contato",
  "footer.disclaimer": "As funcionalidades e o conteúdo desta demonstração foram criados por IA.",
  "demo.showcase": "Vitrine",
  "lab.spanish-translation.heading": "Conheça a equipe de agentes",
  "lab.spanish-translation.p1":
    "Na AshtonBach, uma equipe de agentes de IA constrói as funcionalidades desta página de vitrine. Alder escreve o código, Rowan revisa e Cedar valida no site ao vivo.",
  "lab.spanish-translation.p2":
    "Uma pessoa desenhou o sistema e o supervisiona. Cada mudança é revisada antes de ir ao ar, e você pode acompanhar os agentes em tempo real.",
};
const de: Msg = {
  skip: "Zum Inhalt springen",
  "nav.live": "Produktions-Workflow",
  "nav.contact": "Kontakt",
  "footer.disclaimer": "Funktionen und Inhalte dieser Demo wurden von KI erstellt.",
  "demo.showcase": "Showcase",
  "lab.spanish-translation.heading": "Lernen Sie das Agententeam kennen",
  "lab.spanish-translation.p1":
    "Bei AshtonBach entwickelt ein Team aus KI-Agenten die Funktionen auf dieser Showcase-Seite. Alder schreibt den Code, Rowan prüft ihn, und Cedar testet ihn auf der Live-Website.",
  "lab.spanish-translation.p2":
    "Eine Person hat das System entworfen und beaufsichtigt es. Jede Änderung wird vor dem Release geprüft, und Sie können den Agenten in Echtzeit zuschauen.",
};
const he: Msg = {
  skip: "דלג לתוכן",
  "nav.live": "תהליך עבודה בפרודקשן",
  "nav.contact": "יצירת קשר",
  "footer.disclaimer": "התכונות והתוכן בהדגמה זו נוצרו על ידי בינה מלאכותית.",
  "demo.showcase": "חלון ראווה",
  "lab.spanish-translation.heading": "הכירו את צוות הסוכנים",
  "lab.spanish-translation.p1":
    "ב-AshtonBach צוות של סוכני בינה מלאכותית בונה את התכונות בדף החלון ראווה. Alder כותב הקוד, Rowan בודק אותו, ו-Cedar מאמת באתר החי.",
  "lab.spanish-translation.p2":
    "אדם אחד תכנן את המערכת ומפקח עליה. כל שינוי נבדק לפני שהוא עולה לאוויר, ואפשר לצפות בסוכנים בזמן אמת.",
};
const ja: Msg = {
  skip: "コンテンツへスキップ",
  "nav.live": "本番ワークフロー",
  "nav.contact": "お問い合わせ",
  "footer.disclaimer": "このデモの機能とコンテンツはAIによって作成されました。",
  "demo.showcase": "ショーケース",
  "lab.spanish-translation.heading": "エージェントチームに会う",
  "lab.spanish-translation.p1":
    "AshtonBachでは、AIエージェントのチームがこのショーケースページの機能を作ります。Alderがコードを書き、Rowanがレビューし、Cedarが本番サイトで確認します。",
  "lab.spanish-translation.p2":
    "人がシステムを設計し監督しています。変更は公開前にレビューされ、エージェントの作業をリアルタイムで見られます。",
};
const copy: Record<Locale, Msg> = { "en-US": en, "es-ES": es, "pt-BR": pt, "de-DE": de, "he-IL": he, "ja-JP": ja };
const css = `
.lab-es{width:min(720px,100%);margin:8px auto 56px}
.lab-es h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin:0 0 16px}
.lab-es p{color:var(--mist);margin:0 0 16px;line-height:1.6}
.lab-es-lang{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
.lab-es-lang button{font-family:var(--sans);font-size:13px;padding:8px 12px;cursor:pointer}
.lab-es-lang button[aria-pressed="true"]{background:var(--sage);color:#14201A;border:1px solid var(--sage)}
.lab-es-lang button[aria-pressed="false"]{background:transparent;color:var(--mist);border:1px solid var(--sage)}
`;
function applyLocale(locale: Locale) {
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === "he-IL" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    const text = key ? copy[locale][key] : "";
    if (text) node.textContent = text;
  });
}

export default function Lab() {
  const [locale, setLocale] = useState<Locale>("en-US");
  useEffect(() => {
    applyLocale(locale);
  }, [locale]);
  const t = copy[locale];
  return (
    <section className="lab-es" data-lab="custom-1792934837" aria-labelledby="lab-es-h2">
      <style>{css}</style>
      <h2 id="lab-es-h2" data-i18n="lab.spanish-translation.heading">{t["lab.spanish-translation.heading"]}</h2>
      <p data-i18n="lab.spanish-translation.p1">{t["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{t["lab.spanish-translation.p2"]}</p>
      <div className="lab-es-lang" role="group" aria-label="Language">
        <button type="button" data-locale="en-US" aria-pressed={locale === "en-US"} onClick={() => setLocale("en-US")}>English</button>
        <button type="button" data-locale="es-ES" aria-pressed={locale === "es-ES"} onClick={() => setLocale("es-ES")}>Español</button>
        <button type="button" data-locale="pt-BR" aria-pressed={locale === "pt-BR"} onClick={() => setLocale("pt-BR")}>Português</button>
        <button type="button" data-locale="de-DE" aria-pressed={locale === "de-DE"} onClick={() => setLocale("de-DE")}>Deutsch</button>
        <button type="button" data-locale="he-IL" aria-pressed={locale === "he-IL"} onClick={() => setLocale("he-IL")}>עברית</button>
        <button type="button" data-locale="ja-JP" aria-pressed={locale === "ja-JP"} onClick={() => setLocale("ja-JP")}>日本語</button>
      </div>
    </section>
  );
}
