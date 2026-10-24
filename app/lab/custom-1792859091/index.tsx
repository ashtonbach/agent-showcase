"use client";

import { useEffect, useState } from "react";

type Locale = "en-US" | "es-ES" | "he-IL" | "fr-FR" | "de-DE" | "pt-BR" | "zh-CN" | "ja-JP";
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
const fr: Msg = { ...en, skip: "Aller au contenu", "nav.live": "Flux de production", "nav.contact": "Contact", "footer.disclaimer": "Les fonctionnalités et le contenu de cette démo ont été créés par l'IA.", "demo.showcase": "Vitrine", "demo.dark-mode": "Mode sombre", "demo.faq-accordion": "FAQ", "demo.pricing-table": "Tarifs", "demo.animated-counter": "Compteur animé", "demo.tabs": "Onglets", "demo.testimonial-card": "Citation", "demo.feature-grid": "Grille de fonctionnalités", "demo.spanish-translation": "Traduction", "lab.spanish-translation.eyebrow": "Langue", "lab.spanish-translation.heading": "Rencontrez l'équipe d'agents", "lab.spanish-translation.p1": "Chez AshtonBach, une équipe d'agents IA construit les fonctionnalités de cette page vitrine. Alder écrit le code, Rowan le relit et Cedar le vérifie sur le site en direct.", "lab.spanish-translation.p2": "Une personne a conçu le système et le supervise. Chaque changement est relu avant publication, et vous pouvez voir les agents travailler en temps réel.", "lab.spanish-translation.cta": "Rencontrer l'équipe" };
const de: Msg = { ...en, skip: "Zum Inhalt springen", "nav.live": "Produktionsablauf", "nav.contact": "Kontakt", "footer.disclaimer": "Funktionen und Inhalte dieser Demo wurden von KI erstellt.", "demo.showcase": "Showcase", "demo.dark-mode": "Dunkelmodus", "demo.faq-accordion": "FAQ-Akkordeon", "demo.pricing-table": "Preistabelle", "demo.animated-counter": "Animierter Zähler", "demo.tabs": "Tabs", "demo.testimonial-card": "Zitatkarte", "demo.feature-grid": "Feature-Raster", "demo.spanish-translation": "Übersetzung", "lab.spanish-translation.eyebrow": "Sprache", "lab.spanish-translation.heading": "Lernen Sie das Agententeam kennen", "lab.spanish-translation.p1": "Bei AshtonBach entwickelt ein Team von KI-Agenten die Funktionen auf dieser Showcase-Seite. Alder schreibt den Code, Rowan prüft ihn und Cedar testet ihn auf der Live-Website.", "lab.spanish-translation.p2": "Eine Person hat das System entworfen und überwacht es. Jede Änderung wird vor dem Release geprüft, und Sie können die Agenten live bei der Arbeit sehen.", "lab.spanish-translation.cta": "Team kennenlernen" };
const pt: Msg = { ...en, skip: "Ir para o conteúdo", "nav.live": "Fluxo de produção", "nav.contact": "Contacto", "footer.disclaimer": "As funcionalidades e o conteúdo desta demonstração foram criados por IA.", "demo.showcase": "Showcase", "demo.dark-mode": "Modo escuro", "demo.faq-accordion": "FAQ", "demo.pricing-table": "Tabela de preços", "demo.animated-counter": "Contador animado", "demo.tabs": "Separadores", "demo.testimonial-card": "Cartão de citação", "demo.feature-grid": "Grelha de funcionalidades", "demo.spanish-translation": "Tradução", "lab.spanish-translation.eyebrow": "Idioma", "lab.spanish-translation.heading": "Conheça a equipa de agentes", "lab.spanish-translation.p1": "Na AshtonBach, uma equipa de agentes de IA constrói as funcionalidades desta página de showcase. O Alder escreve o código, a Rowan revê-o e o Cedar verifica-o no site em direto.", "lab.spanish-translation.p2": "Uma pessoa desenhou o sistema e o supervisiona. Cada alteração é revista antes de ser publicada, e pode ver os agentes a trabalhar em tempo real.", "lab.spanish-translation.cta": "Conhecer a equipa" };
const zh: Msg = { ...en, skip: "跳到内容", "nav.live": "生产工作流", "nav.contact": "联系", "footer.disclaimer": "本演示的功能和内容由 AI 创建。", "demo.showcase": "展示", "demo.dark-mode": "深色模式", "demo.faq-accordion": "常见问题", "demo.pricing-table": "价格表", "demo.animated-counter": "动画计数器", "demo.tabs": "标签页", "demo.testimonial-card": "引用卡片", "demo.feature-grid": "功能网格", "demo.spanish-translation": "翻译", "lab.spanish-translation.eyebrow": "语言", "lab.spanish-translation.heading": "认识代理团队", "lab.spanish-translation.p1": "在 AshtonBach，一支 AI 代理团队构建本展示页面的功能。Alder 编写代码，Rowan 审查，Cedar 在 live 站点上验证。", "lab.spanish-translation.p2": "由一人设计并监督该系统。每次更改在发布前都会经过审查，您可以实时观看代理工作。", "lab.spanish-translation.cta": "认识团队" };
const ja: Msg = { ...en, skip: "コンテンツへスキップ", "nav.live": "本番ワークフロー", "nav.contact": "お問い合わせ", "footer.disclaimer": "このデモの機能とコンテンツは AI が作成しました。", "demo.showcase": "ショーケース", "demo.dark-mode": "ダークモード", "demo.faq-accordion": "FAQ", "demo.pricing-table": "料金表", "demo.animated-counter": "アニメーションカウンター", "demo.tabs": "タブ", "demo.testimonial-card": "引用カード", "demo.feature-grid": "機能グリッド", "demo.spanish-translation": "翻訳", "lab.spanish-translation.eyebrow": "言語", "lab.spanish-translation.heading": "エージェントチームに会う", "lab.spanish-translation.p1": "AshtonBach では、AI エージェントのチームがこのショーケースページの機能を構築します。Alder がコードを書き、Rowan がレビューし、Cedar がライブサイトで確認します。", "lab.spanish-translation.p2": "システムは人が設計し監督しています。変更は公開前にレビューされ、エージェントの作業をリアルタイムで見られます。", "lab.spanish-translation.cta": "チームに会う" };
const packs: Record<Locale, Msg> = { "en-US": en, "es-ES": es, "he-IL": he, "fr-FR": fr, "de-DE": de, "pt-BR": pt, "zh-CN": zh, "ja-JP": ja };

const css = `[data-lab="custom-1792859091"]{width:min(720px,100%);margin:8px auto 56px}[data-lab="custom-1792859091"] h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin:0 0 .7rem}[data-lab="custom-1792859091"] p{color:var(--mist);margin:0 0 1rem;line-height:1.55}.lab-switch{display:inline-flex;flex-wrap:wrap;gap:0}.lab-seg{font-family:var(--sans);font-size:14px;padding:.45rem 1rem;cursor:pointer;background:transparent;color:var(--mist);border:1px solid var(--sage)}.lab-seg[aria-pressed="true"]{background:var(--sage);color:#14201A}`;

function applyLocale(locale: Locale) {
  document.documentElement.lang = locale === "he-IL" ? "he" : locale.split("-")[0];
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
    <section data-lab="custom-1792859091" aria-labelledby="lab-es-h">
      <style>{css}</style>
      <h2 id="lab-es-h" data-i18n="lab.spanish-translation.heading">{pack["lab.spanish-translation.heading"]}</h2>
      <p data-i18n="lab.spanish-translation.p1">{pack["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{pack["lab.spanish-translation.p2"]}</p>
      <div className="lab-switch" role="group" aria-label="Language">
        <button type="button" data-locale="en-US" aria-pressed={locale === "en-US"} className="lab-seg" onClick={() => setLocale("en-US")}>English</button>
        <button type="button" data-locale="es-ES" aria-pressed={locale === "es-ES"} className="lab-seg" onClick={() => setLocale("es-ES")}>Español</button>
        <button type="button" data-locale="he-IL" aria-pressed={locale === "he-IL"} className="lab-seg" onClick={() => setLocale("he-IL")}>עברית</button>
        <button type="button" data-locale="fr-FR" aria-pressed={locale === "fr-FR"} className="lab-seg" onClick={() => setLocale("fr-FR")}>Français</button>
        <button type="button" data-locale="de-DE" aria-pressed={locale === "de-DE"} className="lab-seg" onClick={() => setLocale("de-DE")}>Deutsch</button>
        <button type="button" data-locale="pt-BR" aria-pressed={locale === "pt-BR"} className="lab-seg" onClick={() => setLocale("pt-BR")}>Português</button>
        <button type="button" data-locale="zh-CN" aria-pressed={locale === "zh-CN"} className="lab-seg" onClick={() => setLocale("zh-CN")}>中文</button>
        <button type="button" data-locale="ja-JP" aria-pressed={locale === "ja-JP"} className="lab-seg" onClick={() => setLocale("ja-JP")}>日本語</button>
      </div>
    </section>
  );
}
