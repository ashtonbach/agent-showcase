"use client";

import { useEffect, useState } from "react";

const MARK_LIGHT =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 20'%3E%3Cpath fill='%232F5A46' d='M4 18L14 2l10 16h-6.2L14 9.2 10.2 18z'/%3E%3C/svg%3E";

const css = `
.lab-card{max-width:min(720px,100%);margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,.28);border-radius:16px}
.lab-card p{margin:0 0 20px;color:var(--mist)}
.lab-toggle{border:0;border-radius:999px;padding:10px 22px;font:500 15px/1.3 var(--sans);cursor:pointer;background:var(--sage);color:#14201A}
html[data-theme="light"]{background:#E8EEE9}
html[data-theme="light"] body{color:#14201A}
html[data-theme="light"] body::before{background:#E8EEE9}
html[data-theme="light"] .brand,html[data-theme="light"] .brand-word,html[data-theme="light"] .demo-title,html[data-theme="light"] h1,html[data-theme="light"] h2{color:#14201A}
html[data-theme="light"] .nav-list a,html[data-theme="light"] .label,html[data-theme="light"] .site-footer,html[data-theme="light"] .site-disclaimer{color:#2F5A46;opacity:1}
html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible,html[data-theme="light"] .nav-list a[aria-current="page"]{color:#14201A}
html[data-theme="light"] .nav-list a::after{background:#2F5A46}
html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97);border-color:rgba(47,90,70,.18)}
html[data-theme="light"] .brand-mark{filter:brightness(0) saturate(100%) invert(22%) sepia(18%) saturate(900%) hue-rotate(100deg);content:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 20'%3E%3Cpath fill='%232F5A46' d='M4 18L14 2l10 16h-6.2L14 9.2 10.2 18z'/%3E%3C/svg%3E")}
html[data-theme="light"] .lab-card{border-color:rgba(47,90,70,.28);background:#F4F7F4}
html[data-theme="light"] .lab-card p{color:#14201A}
html[data-theme="light"] .lab-toggle{background:#2F5A46;color:#E8EEE9}
html[data-theme="light"] main.page [data-lab]{border-top-color:rgba(47,90,70,.22)}
html[data-theme="light"] .skip-link:focus{background:#E8EEE9;color:#14201A}
@media (prefers-reduced-motion:reduce){.nav-list a,.nav-list a::after{transition:none}}
`;

function applyTheme(isDark: boolean) {
  const root = document.documentElement;
  if (isDark) delete root.dataset.theme;
  else root.dataset.theme = "light";
  localStorage.setItem("ab-theme", isDark ? "dark" : "light");
  const mark = document.querySelector(".brand-mark");
  if (mark instanceof HTMLImageElement) mark.src = isDark ? "/ab-mark.svg" : MARK_LIGHT;
}

export default function DarkModeLab() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const isDark = localStorage.getItem("ab-theme") !== "light";
    setDark(isDark);
    applyTheme(isDark);
  }, []);

  function onToggle() {
    const next = !dark;
    setDark(next);
    applyTheme(next);
  }

  return (
    <section data-lab="dark-mode" aria-labelledby="lab-theme-heading">
      <style>{css}</style>
      <h2 id="lab-theme-heading">Dark mode</h2>
      <div className="lab-card">
        <p>Use the control to switch the whole page between the default forest night and a light mist day. Your choice is saved on this device.</p>
        <button type="button" className="lab-toggle" aria-pressed={dark} onClick={onToggle}>
          {dark ? "Switch to light" : "Switch to dark"}
        </button>
      </div>
    </section>
  );
}
