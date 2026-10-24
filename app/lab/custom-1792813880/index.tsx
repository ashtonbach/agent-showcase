"use client";

import { useEffect, useState } from "react";

type Locale = "en-US" | "es-ES" | "fr-FR" | "zh-CN";
type Msg = Record<string, string>;
const packs = JSON.parse("{\"en-US\":{\"skip\":\"Skip to content\",\"nav.live\":\"Production workflow\",\"nav.contact\":\"Contact\",\"footer.disclaimer\":\"Features and content for this demo were created by AI.\",\"demo.showcase\":\"Showcase\",\"demo.dark-mode\":\"Dark mode toggle\",\"demo.faq-accordion\":\"FAQ accordion\",\"demo.pricing-table\":\"Pricing table\",\"demo.animated-counter\":\"Animated counter\",\"demo.tabs\":\"Tabs\",\"demo.testimonial-card\":\"Quote card\",\"demo.feature-grid\":\"Feature grid\",\"demo.spanish-translation\":\"Spanish translation\",\"lab.spanish-translation.eyebrow\":\"Language\",\"lab.spanish-translation.heading\":\"Meet the agent team\",\"lab.spanish-translation.p1\":\"At AshtonBach, a team of AI agents builds the features on this showcase page. Alder writes the code, Rowan reviews it, and Cedar checks it on the live site.\",\"lab.spanish-translation.p2\":\"A person designed the system and oversees it. Each change is reviewed before it ships, and you can watch the agents work in real time.\",\"lab.spanish-translation.cta\":\"Meet the team\"},\"es-ES\":{\"skip\":\"Saltar al contenido\",\"nav.live\":\"Flujo de trabajo de producción\",\"nav.contact\":\"Contacto\",\"footer.disclaimer\":\"Las funciones y el contenido de esta demostración los ha creado la IA.\",\"demo.showcase\":\"Exhibición\",\"demo.dark-mode\":\"Interruptor de modo oscuro\",\"demo.faq-accordion\":\"Acordeón de preguntas frecuentes\",\"demo.pricing-table\":\"Tabla de precios\",\"demo.animated-counter\":\"Contador animado\",\"demo.tabs\":\"Pestañas\",\"demo.testimonial-card\":\"Tarjeta de cita\",\"demo.feature-grid\":\"Rejilla de funciones\",\"demo.spanish-translation\":\"Traducción al español\",\"lab.spanish-translation.eyebrow\":\"Idioma\",\"lab.spanish-translation.heading\":\"Conoced al equipo de agentes\",\"lab.spanish-translation.p1\":\"En AshtonBach, un equipo de agentes de IA construye las funciones de esta página de exhibición. Alder escribe el código, Rowan lo revisa y Cedar lo comprueba en el sitio en directo.\",\"lab.spanish-translation.p2\":\"Una persona diseñó el sistema y lo supervisa. Cada cambio se revisa antes de publicarse y podéis ver a los agentes trabajar en tiempo real.\",\"lab.spanish-translation.cta\":\"Conoced al equipo\"},\"fr-FR\":{\"skip\":\"Aller au contenu\",\"nav.live\":\"Flux de production\",\"nav.contact\":\"Contact\",\"footer.disclaimer\":\"Les fonctionnalités et le contenu de cette démo ont été créés par l'IA.\",\"demo.showcase\":\"Vitrine\",\"demo.dark-mode\":\"Mode sombre\",\"demo.faq-accordion\":\"FAQ\",\"demo.pricing-table\":\"Tableau des tarifs\",\"demo.animated-counter\":\"Compteur animé\",\"demo.tabs\":\"Onglets\",\"demo.testimonial-card\":\"Carte témoignage\",\"demo.feature-grid\":\"Grille de fonctionnalités\",\"demo.spanish-translation\":\"Traduction\",\"lab.spanish-translation.eyebrow\":\"Langue\",\"lab.spanish-translation.heading\":\"Rencontrez l'équipe d'agents\",\"lab.spanish-translation.p1\":\"Chez AshtonBach, une équipe d'agents IA construit les fonctionnalités de cette page vitrine. Alder écrit le code, Rowan le relit et Cedar le vérifie sur le site en direct.\",\"lab.spanish-translation.p2\":\"Une personne a conçu le système et le supervise. Chaque modification est relue avant publication, et vous pouvez voir les agents travailler en temps réel.\",\"lab.spanish-translation.cta\":\"Rencontrer l'équipe\"},\"zh-CN\":{\"skip\":\"跳到内容\",\"nav.live\":\"生产工作流\",\"nav.contact\":\"联系\",\"footer.disclaimer\":\"本演示的功能和内容由 AI 创建。\",\"demo.showcase\":\"展示\",\"demo.dark-mode\":\"深色模式切换\",\"demo.faq-accordion\":\"常见问题手风琴\",\"demo.pricing-table\":\"价格表\",\"demo.animated-counter\":\"动画计数器\",\"demo.tabs\":\"标签页\",\"demo.testimonial-card\":\"引用卡片\",\"demo.feature-grid\":\"功能网格\",\"demo.spanish-translation\":\"西班牙语翻译\",\"lab.spanish-translation.eyebrow\":\"语言\",\"lab.spanish-translation.heading\":\"认识代理团队\",\"lab.spanish-translation.p1\":\"在 AshtonBach，一支 AI 代理团队负责构建此展示页面的功能。Alder 编写代码，Rowan 审查，Cedar 在实时站点上进行检查。\",\"lab.spanish-translation.p2\":\"由人工设计并监督该系统。每次更改在发布前都会经过审查，您可以实时观看代理工作。\",\"lab.spanish-translation.cta\":\"认识团队\"}}") as Record<Locale, Msg>;

const css = `[data-lab="custom-1792813880"]{width:min(720px,100%);margin:8px auto 56px}[data-lab="custom-1792813880"] h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin:0 0 .7rem}[data-lab="custom-1792813880"] p{color:var(--mist);margin:0 0 1rem;line-height:1.55}.lab-switch{display:inline-flex;flex-wrap:wrap}.lab-seg{font-family:var(--sans);font-size:14px;padding:.45rem 1rem;cursor:pointer;background:transparent;color:var(--mist);border:1px solid var(--sage)}.lab-seg[aria-pressed="true"]{background:var(--sage);color:#14201A}`;

function pageLang(locale: Locale) {
  if (locale === "fr-FR") return "fr";
  if (locale === "zh-CN") return "zh-CN";
  return locale;
}

function applyLocale(locale: Locale) {
  document.documentElement.lang = pageLang(locale);
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
    <section data-lab="custom-1792813880" aria-labelledby="lab-es-h">
      <style>{css}</style>
      <h2 id="lab-es-h" data-i18n="lab.spanish-translation.heading">{pack["lab.spanish-translation.heading"]}</h2>
      <p data-i18n="lab.spanish-translation.p1">{pack["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{pack["lab.spanish-translation.p2"]}</p>
      <div className="lab-switch" role="group" aria-label="Language">
        <button type="button" data-locale="en-US" aria-pressed={locale === "en-US"} className="lab-seg" onClick={() => setLocale("en-US")}>English</button>
        <button type="button" data-locale="es-ES" aria-pressed={locale === "es-ES"} className="lab-seg" onClick={() => setLocale("es-ES")}>Español</button>
        <button type="button" data-locale="fr-FR" aria-pressed={locale === "fr-FR"} className="lab-seg" onClick={() => setLocale("fr-FR")}>Français</button>
        <button type="button" data-locale="zh-CN" aria-pressed={locale === "zh-CN"} className="lab-seg" onClick={() => setLocale("zh-CN")}>中文</button>
      </div>
    </section>
  );
}
