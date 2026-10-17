"use client";

import { useEffect, useState } from "react";

const MARK_LIGHT = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 20'%3E%3Cpath fill='%2314201A' d='M14 1L26 19H2z'/%3E%3C/svg%3E";

const css = `
.lab-card{max-width:720px;padding:24px;border:1px solid rgba(176,203,188,.28);border-radius:16px}
.lab-copy{margin:0 0 20px;color:var(--mist);max-width:42rem}
.lab-toggle{border:0;border-radius:999px;background:#B0CBBC;color:#14201A;font:500 15px/1.3 var(--sans);padding:10px 20px;cursor:pointer}
html[data-theme=light]{--forest:#E8EEE9;--mist:#14201A;--sage:#2F5A46;--muted:rgba(20,32,26,.72);--header-line:rgba(47,90,70,.28);--line:rgba(47,90,70,.22);background:#E8EEE9;color:#14201A}
html[data-theme=light] body{background:#E8EEE9;color:#14201A}
html[data-theme=light] body::before{background:#E8EEE9}
html[data-theme=light] .brand,html[data-theme=light] .brand-word,html[data-theme=light] .demo-title,html[data-theme=light] h1,html[data-theme=light] h2{color:#14201A}
html[data-theme=light] .nav-list a,html[data-theme=light] .label,html[data-theme=light] .site-footer{color:#2F5A46;opacity:1}
html[data-theme=light] .nav-list a:hover,html[data-theme=light] .nav-list a:focus-visible,html[data-theme=light] .nav-list a[aria-current=page]{color:#14201A}
html[data-theme=light] .site-disclaimer,html[data-theme=light] .site-footer span{color:#2F5A46}
html[data-theme=light] .site-header.is-scrolled{background:#E8EEE9}
html[data-theme=light] img.brand-mark{filter:brightness(0);content:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 20'%3E%3Cpath fill='%2314201A' d='M14 1L26 19H2z'/%3E%3C/svg%3E")}
html[data-theme=light] .lab-toggle{background:#2F5A46;color:#E8EEE9}
html[data-theme=light] .lab-card{border-color:rgba(47,90,70,.28)}
@media (prefers-reduced-motion:reduce){.lab-toggle{transition:none}}
`;

function applyTheme(dark: boolean) {
  const root = document.documentElement;
  if (dark) delete root.dataset.theme;
  else root.dataset.theme = "light";
  localStorage.setItem("ab-theme", dark ? "dark" : "light");
  const mark = document.querySelector<HTMLImageElement>("img.brand-mark");
  if (mark) mark.src = dark ? "/ab-mark.svg" : MARK_LIGHT;
}

export default function DarkModeLab() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const next = localStorage.getItem("ab-theme") !== "light";
    setDark(next);
    applyTheme(next);
  }, []);

  return (
    <section data-lab="dark-mode" aria-labelledby="lab-theme-h2">
      <style>{css}</style>
      <h2 id="lab-theme-h2">Dark mode toggle</h2>
      <div className="lab-card">
        <p className="lab-copy">Switch the whole page between the default forest dark theme and a light theme. Your choice is saved in this browser.</p>
        <button type="button" className="lab-toggle" aria-pressed={dark} onClick={() => { const next = !dark; setDark(next); applyTheme(next); }}>
          {dark ? "Use light theme" : "Use dark theme"}
        </button>
      </div>
    </section>
  );
}
