"use client";

import { useEffect, useState } from "react";

const KEY = "ab-theme";
const LIGHT_MARK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 20'%3E%3Cpath fill='%232F5A46' d='M4 18 14 2l10 16h-6l-4-8-4 8z'/%3E%3C/svg%3E";

const css = `
.lab-card{width:min(720px,100%);margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,0.28);border-radius:16px}
.lab-card h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist)}
.lab-lead{margin:0 0 20px;color:var(--mist)}
.lab-btn{border:0;border-radius:999px;padding:10px 22px;background:var(--sage);color:#121A16;font:500 15px/1.2 var(--sans);cursor:pointer}
html[data-theme="light"],html[data-theme="light"] body{background:#E8EEE9;color:#14201A}
html[data-theme="light"] .label,html[data-theme="light"] .nav-list a{color:#2F5A46}
html[data-theme="light"] .brand,html[data-theme="light"] .brand-word,html[data-theme="light"] .demo-title,html[data-theme="light"] .site-footer,html[data-theme="light"] .site-disclaimer,html[data-theme="light"] .lab-card h2,html[data-theme="light"] .lab-lead{color:#14201A}
html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible{color:#14201A}
html[data-theme="light"] .brand-mark{content:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 20'%3E%3Cpath fill='%232F5A46' d='M4 18 14 2l10 16h-6l-4-8-4 8z'/%3E%3C/svg%3E");filter:brightness(0) saturate(100%) invert(22%) sepia(18%) saturate(900%) hue-rotate(100deg)}
html[data-theme="light"] .lab-btn{background:#2F5A46;color:#E8EEE9}
html[data-theme="light"] .lab-card{border-color:rgba(47,90,70,0.28)}
html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,0.97)}
html[data-theme="light"] .site-header{border-bottom-color:rgba(47,90,70,0.22)}
@media (prefers-reduced-motion:reduce){.lab-btn{transition:none}}
`;

function apply(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(KEY, theme);
  const mark = document.querySelector("img.brand-mark");
  if (mark) mark.src = theme === "light" ? LIGHT_MARK : "/ab-mark.svg";
}

export default function DarkModeLab() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const light = localStorage.getItem(KEY) === "light";
    setDark(!light);
    apply(light ? "light" : "dark");
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    apply(next ? "dark" : "light");
  }

  return (
    <section className="lab-card" data-lab="dark-mode" aria-labelledby="lab-theme-title">
      <h2 id="lab-theme-title">Dark mode toggle</h2>
      <p className="lab-lead">Use the control to restyle the whole page. The forest night look is the default; light mist is stored in this browser and restored after a reload.</p>
      <button type="button" className="lab-btn" aria-pressed={dark} onClick={toggle}>
        {dark ? "Switch to light" : "Switch to dark"}
      </button>
      <style>{css}</style>
    </section>
  );
}
