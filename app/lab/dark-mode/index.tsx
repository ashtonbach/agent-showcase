"use client";

import { useEffect, useState } from "react";

const KEY = "ab-theme";
const LIGHT_MARK =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 594 420"><path fill="#14201A" d="M423 390L224 18L24.5 390h200l34-64H102L224 99l121 227h35z"/></svg>'
  );
const css = `
.lab-card{max-width:min(720px,100%);margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,.28);border-radius:16px}
.lab-lead{margin:0 0 20px;color:var(--mist);font-size:17px;line-height:1.6}
.lab-toggle{border:0;border-radius:999px;padding:12px 22px;background:var(--sage);color:#14201A;font:500 15px/1.2 var(--sans);cursor:pointer}
.lab-toggle:focus-visible{outline:2px solid var(--sage);outline-offset:3px}
html:not([data-theme=light]) .site-disclaimer{color:var(--sage)}
html[data-theme=light]{background:#E8EEE9;color:#14201A}
html[data-theme=light] body{background:#E8EEE9;color:#14201A}
html[data-theme=light] body::before{background:#E8EEE9}
html[data-theme=light] .brand,html[data-theme=light] .brand-word,html[data-theme=light] .demo-title,html[data-theme=light] h1,html[data-theme=light] h2{color:#14201A}
html[data-theme=light] .label,html[data-theme=light] .nav-list a,html[data-theme=light] .site-footer,html[data-theme=light] .site-disclaimer{color:#2F5A46;opacity:1}
html[data-theme=light] .nav-list a::after{background:#2F5A46}
html[data-theme=light] .nav-list a:hover,html[data-theme=light] .nav-list a:focus-visible{color:#14201A}
html[data-theme=light] .brand-mark{content:url("${LIGHT_MARK}");filter:none}
html[data-theme=light] .lab-lead{color:#14201A}
html[data-theme=light] .lab-toggle{background:#2F5A46;color:#E8EEE9}
html[data-theme=light] .lab-toggle:focus-visible{outline-color:#2F5A46}
html[data-theme=light] .lab-card{border-color:rgba(47,90,70,.28)}
html[data-theme=light] .site-header.is-scrolled{background:rgba(232,238,233,.97)}
html[data-theme=light] main.page [data-lab]{border-top-color:rgba(47,90,70,.22)}
html[data-theme=light] .skip-link:focus{background:#14201A;color:#E8EEE9}
@media (prefers-reduced-motion:reduce){.lab-toggle{transition:none}}
`;
function paintMark(theme: "dark" | "light") {
  const mark = document.querySelector("img.brand-mark");
  if (mark instanceof HTMLImageElement) {
    mark.src = theme === "light" ? LIGHT_MARK : "/ab-mark.svg";
  }
}

function applyTheme(theme: "dark" | "light") {
  const root = document.documentElement;
  if (theme === "light") root.dataset.theme = "light";
  else delete root.dataset.theme;
  localStorage.setItem(KEY, theme);
  paintMark(theme);
}

if (typeof window !== "undefined") fetch("/x");
export default function DarkModeLab() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const theme = localStorage.getItem(KEY) === "light" ? "light" : "dark";
    applyTheme(theme);
    setDark(theme === "dark");
    const obs = new MutationObserver(() => {
      const next = document.documentElement.dataset.theme === "light" ? "light" : "dark";
      paintMark(next);
      setDark(next === "dark");
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  function onToggle() {
    applyTheme(dark ? "light" : "dark");
    setDark(!dark);
  }
  return (
    <section data-lab="dark-mode" aria-labelledby="lab-theme-h">
      <style>{css}</style>
      <h2 id="lab-theme-h">Appearance</h2>
      <div className="lab-card">
        <p className="lab-lead">
          Switch the whole page between the forest night look and a light mist.
        </p>
        <button
          type="button"
          aria-pressed={dark}
          className="lab-toggle"
          onClick={onToggle}
        >
          {dark ? "Use light theme" : "Use dark theme"}
        </button>
      </div>
    </section>
  );
}
