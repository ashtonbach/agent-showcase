"use client";

import { useEffect, useState } from "react";

type Locale = "en-US" | "es-ES" | "ja-JP" | "de-DE" | "pt-BR";
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
const ja: Msg = {
  skip: "コンテンツへスキップ",
  "nav.live": "本番ワークフロー",
  "nav.contact": "お問い合わせ",
  "footer.disclaimer": "このデモの機能とコンテンツはAIによって作成されました。",
  "demo.showcase": "ショーケース",
  "lab.spanish-translation.heading": "エージェントチームに会う",
  "lab.spanish-translation.p1":
    "AshtonBachでは、AIエージェントのチームがこのショーケースページの機能を構築しています。Alderがコードを書き、Rowanがレビューし、Cedarが本番サイトで確認します。",
  "lab.spanish-translation.p2":
    "システムは人が設計し監督しています。変更は公開前にレビューされ、エージェントの作業をリアルタイムで見ることができます。",
};
const de: Msg = {
  skip: "Zum Inhalt springen",
  "nav.live": "Produktions-Workflow",
  "nav.contact": "Kontakt",
  "footer.disclaimer": "Funktionen und Inhalte dieser Demo wurden von KI erstellt.",
  "demo.showcase": "Showcase",
  "lab.spanish-translation.heading": "Lernt das Agententeam kennen",
  "lab.spanish-translation.p1":
    "Bei AshtonBach entwickelt ein Team von KI-Agenten die Funktionen auf dieser Showcase-Seite. Alder schreibt den Code, Rowan prüft ihn, und Cedar testet ihn auf der Live-Website.",
  "lab.spanish-translation.p2":
    "Eine Person hat das System entworfen und überwacht es. Jede Änderung wird vor dem Release geprüft, und ihr könnt die Agenten in Echtzeit bei der Arbeit beobachten.",
};
const pt: Msg = {
  skip: "Ir para o conteúdo",
  "nav.live": "Fluxo de produção",
  "nav.contact": "Contato",
  "footer.disclaimer": "Os recursos e o conteúdo desta demonstração foram criados por IA.",
  "demo.showcase": "Vitrine",
  "lab.spanish-translation.heading": "Conheça a equipe de agentes",
  "lab.spanish-translation.p1":
    "Na AshtonBach, uma equipe de agentes de IA constrói os recursos desta página de vitrine. Alder escreve o código, Rowan revisa e Cedar verifica no site ao vivo.",
  "lab.spanish-translation.p2":
    "Uma pessoa projetou o sistema e o supervisiona. Cada alteração é revisada antes de publicar, e você pode ver os agentes trabalhando em tempo real.",
};
const packs: Record<Locale, Msg> = { "en-US": en, "es-ES": es, "ja-JP": ja, "de-DE": de, "pt-BR": pt };
const css = `[data-lab="custom-1792819891"]{width:min(720px,100%);margin:8px auto 56px}[data-lab="custom-1792819891"] h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin:0 0 .7rem}[data-lab="custom-1792819891"] p{color:var(--mist);margin:0 0 1rem;line-height:1.55}.lab-switch{display:inline-flex;flex-wrap:wrap;max-width:100%}.lab-seg{font-family:var(--sans);font-size:14px;padding:.45rem 1rem;cursor:pointer;background:transparent;color:var(--mist);border:1px solid var(--sage)}.lab-seg[aria-pressed="true"]{background:var(--sage);color:#14201A}`;

function applyLocale(locale: Locale) {
  document.documentElement.lang = locale;
  const pack = packs[locale];
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (key && pack[key]) node.textContent = pack[key];
  });
}

export default function Lab() {
  const [locale, setLocale] = useState<Locale>("en-US");
  const pack = packs[locale];
  useEffect(() => {
    applyLocale(locale);
  }, [locale]);
  return (
    <section data-lab="custom-1792819891" aria-labelledby="lab-es-h">
      <style>{css}</style>
      <h2 id="lab-es-h" data-i18n="lab.spanish-translation.heading">{pack["lab.spanish-translation.heading"]}</h2>
      <p data-i18n="lab.spanish-translation.p1">{pack["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{pack["lab.spanish-translation.p2"]}</p>
      <div className="lab-switch" role="group" aria-label="Language">
        <button type="button" aria-pressed={locale === "en-US"} className="lab-seg" onClick={() => setLocale("en-US")}>English</button>
        <button type="button" aria-pressed={locale === "es-ES"} className="lab-seg" onClick={() => setLocale("es-ES")}>Español</button>
        <button type="button" aria-pressed={locale === "ja-JP"} className="lab-seg" onClick={() => setLocale("ja-JP")}>日本語</button>
        <button type="button" aria-pressed={locale === "de-DE"} className="lab-seg" onClick={() => setLocale("de-DE")}>Deutsch</button>
        <button type="button" aria-pressed={locale === "pt-BR"} className="lab-seg" onClick={() => setLocale("pt-BR")}>Português</button>
      </div>
    </section>
  );
}
