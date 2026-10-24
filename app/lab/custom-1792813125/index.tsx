"use client";

import { useEffect, useState } from "react";
import en from "../../../messages/en-US.json";
import es from "../../../messages/es-ES.json";

type Locale = "en-US" | "es-ES" | "fr-FR";
type Msg = Record<string, string>;
const fr: Msg = {
  skip: "Aller au contenu",
  "nav.live": "Flux de production",
  "nav.contact": "Contact",
  "footer.disclaimer": "Les fonctionnalités et le contenu de cette démo ont été créés par l'IA.",
  "demo.showcase": "Vitrine",
  "demo.dark-mode": "Mode sombre",
  "demo.faq-accordion": "FAQ",
  "demo.pricing-table": "Tableau des tarifs",
  "demo.animated-counter": "Compteur animé",
  "demo.tabs": "Onglets",
  "demo.testimonial-card": "Carte témoignage",
  "demo.feature-grid": "Grille de fonctionnalités",
  "demo.spanish-translation": "Traduction",
  "lab.spanish-translation.eyebrow": "Langue",
  "lab.spanish-translation.heading": "Rencontrez l'équipe d'agents",
  "lab.spanish-translation.p1":
    "Chez AshtonBach, une équipe d'agents IA construit les fonctionnalités de cette page vitrine. Alder écrit le code, Rowan le relit et Cedar le vérifie sur le site en direct.",
  "lab.spanish-translation.p2":
    "Une personne a conçu le système et le supervise. Chaque modification est relue avant publication, et vous pouvez voir les agents travailler en temps réel.",
  "lab.spanish-translation.cta": "Rencontrer l'équipe",
};
const packs: Record<Locale, Msg> = { "en-US": en as Msg, "es-ES": es as Msg, "fr-FR": fr };

const css = `[data-lab="custom-1792813125"]{width:min(720px,100%);margin:8px auto 56px}[data-lab="custom-1792813125"] h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin:0 0 .7rem}[data-lab="custom-1792813125"] p{color:var(--mist);margin:0 0 1rem;line-height:1.55}.lab-switch{display:inline-flex;flex-wrap:wrap;gap:0}.lab-seg{font-family:var(--sans);font-size:14px;padding:.45rem 1rem;cursor:pointer;background:transparent;color:var(--mist);border:1px solid var(--sage)}.lab-seg[aria-pressed="true"]{background:var(--sage);color:#14201A}`;

function pageLang(locale: Locale) {
  if (locale === "fr-FR") return "fr";
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
    <section data-lab="custom-1792813125" aria-labelledby="lab-es-h">
      <style>{css}</style>
      <h2 id="lab-es-h" data-i18n="lab.spanish-translation.heading">{pack["lab.spanish-translation.heading"]}</h2>
      <p data-i18n="lab.spanish-translation.p1">{pack["lab.spanish-translation.p1"]}</p>
      <p data-i18n="lab.spanish-translation.p2">{pack["lab.spanish-translation.p2"]}</p>
      <div className="lab-switch" role="group" aria-label="Language">
        <button type="button" data-locale="en-US" aria-pressed={locale === "en-US"} className="lab-seg" onClick={() => setLocale("en-US")}>English</button>
        <button type="button" data-locale="es-ES" aria-pressed={locale === "es-ES"} className="lab-seg" onClick={() => setLocale("es-ES")}>Español</button>
        <button type="button" data-locale="fr-FR" aria-pressed={locale === "fr-FR"} className="lab-seg" onClick={() => setLocale("fr-FR")}>Français</button>
      </div>
    </section>
  );
}
