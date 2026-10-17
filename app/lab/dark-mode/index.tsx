"use client";

import { useEffect, useState } from "react";

const KEY = "ab-theme";
const TITLE = "lab-dark-mode-h2";
const MARK_DARK = "/ab-mark.svg";
const MARK_LIGHT = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 24'%3E%3Cpath fill='%2314201A' d='M2 22h7l7-13 7 13h7L16 1 2 22z'/%3E%3C/svg%3E";

const css = `
.lab-wrap{width:min(720px,100%);margin:8px auto 56px}
.lab-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px}
.lab-copy{color:var(--mist);margin:0 0 20px;max-width:42em}
.lab-toggle{border:0;border-radius:999px;background:var(--sage);color:#14201A;font:500 15px/1.2 var(--sans);padding:12px 22px;cursor:pointer}
.lab-toggle:focus-visible{outline:2px solid var(--sage);outline-offset:3px}
@media (prefers-reduced-motion:reduce){.lab-toggle{transition:none}}
.site-footer{opacity:1;color:var(--sage)}
.site-disclaimer{color:var(--sage)}
html[data-theme="light"]{background:#E8EEE9}
html[data-theme="light"] body{color:#14201A;background:transparent}
html[data-theme="light"] body::before{background:linear-gradient(180deg,#E8EEE9 0%,#d8e2da 100%)}
html[data-theme="light"] .brand,html[data-theme="light"] .brand-word,html[data-theme="light"] .demo-title,html[data-theme="light"] main.page [data-lab] > h2{color:#14201A}
html[data-theme="light"] .label,html[data-theme="light"] .nav-list a{color:#2F5A46}
html[data-theme="light"] .nav-list a::after{background:#2F5A46}
html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible,html[data-theme="light"] .nav-list a[aria-current="page"]{color:#14201A}
html[data-theme="light"] .site-footer{color:#2F5A46;opacity:1}
html[data-theme="light"] .site-disclaimer{color:#2F5A46}
html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,0.97)}
html[data-theme="light"] img.brand-mark{filter:none}
html[data-theme="light"] .lab-copy{color:#14201A}
html[data-theme="light"] .lab-card{border-color:rgba(47,90,70,0.32)}
html[data-theme="light"] .lab-toggle{background:#2F5A46;color:#E8EEE9}
`;

function apply(theme: "dark" | "light") {
  const root = document.documentElement;
  if (theme === "light") root.dataset.theme = "light";
  else root.dataset.theme = "dark";
  localStorage.setItem(KEY, theme);
  const img = document.querySelector("img.brand-mark") as HTMLImageElement | null;
  if (img) img.src = theme === "light" ? MARK_LIGHT : MARK_DARK;
}

export default function DarkModeLab() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    const theme = saved === "light" ? "light" : "dark";
    setDark(theme === "dark");
    apply(theme);
  }, []);

  function onToggle() {
    const next = dark ? "light" : "dark";
    setDark(next === "dark");
    apply(next);
  }

  return (
    <section data-lab="dark-mode" aria-labelledby={TITLE}>
      <h2 id={TITLE}>Dark mode toggle</h2>
      <div className="lab-wrap">
        <div className="lab-card">
          <p className="lab-copy">
            Switch the whole page between the default forest night and a light mist. Your choice stays in this browser until you change it.
          </p>
          <button type="button" aria-pressed={dark} className="lab-toggle" onClick={onToggle}>
            {dark ? "Dark mode on" : "Light mode on"}
          </button>
        </div>
      </div>
      <style>{css}</style>
    </section>
  );
}
