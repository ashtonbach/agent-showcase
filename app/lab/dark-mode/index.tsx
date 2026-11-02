"use client";

import { useCallback, useEffect, useState } from "react";

const css = `
html[data-theme="light"]{background:#E8EEE9}
html[data-theme="light"] body{color:#14201A}
html[data-theme="light"] body::before{background:linear-gradient(180deg,#E8EEE9 0%,#dde5df 100%)}
html[data-theme="light"] .demo-title{color:#14201A}
html[data-theme="light"] .brand-mark,html[data-theme="light"] .footer-mark-img{filter:brightness(0) saturate(100%) invert(22%) sepia(18%) saturate(900%) hue-rotate(100deg)}
html[data-theme="light"] .nav-list a{color:#2F5A46}
html[data-theme="light"] .nav-list a::after{background:#2F5A46}
html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible,html[data-theme="light"] .nav-list a[aria-current="page"]{color:#14201A}
html[data-theme="light"] .site-footer{color:#2F5A46;opacity:1}
html[data-theme="light"] .site-disclaimer{color:#2F5A46;opacity:.85}
html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97)}
html[data-theme="light"] main.page [data-lab]{border-top-color:rgba(47,90,70,.22)}
html[data-theme="light"] .lab-card{border-color:rgba(47,90,70,.28)}
html[data-theme="light"] .lab-lead{color:rgba(20,32,26,.78)}
html[data-theme="light"] .lab-toggle{background:#2F5A46;color:#E8EEE9}
.lab-wrap{width:min(720px,100%);margin:8px auto 56px}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px}
.lab-lead{margin:0 0 20px;color:var(--muted);max-width:52ch}
.lab-toggle{display:inline-block;border:0;border-radius:999px;padding:12px 22px;font-family:var(--sans);font-size:15px;font-weight:500;cursor:pointer;background:var(--sage);color:#14201A}
.lab-toggle:focus-visible{outline:2px solid var(--sage);outline-offset:3px}
@media (prefers-reduced-motion:reduce){.lab-toggle{transition:none}}
`;

export default function DarkModeLab() {
  const [dark, setDark] = useState(true);

  const applyTheme = useCallback((isDark: boolean) => {
    const root = document.documentElement;
    if (isDark) root.dataset.theme = "dark";
    else root.dataset.theme = "light";
    try {
      localStorage.setItem("ab-theme", isDark ? "dark" : "light");
    } catch {
      /* storage blocked */
    }
  }, []);

  useEffect(() => {
    let isDark = true;
    try {
      const saved = localStorage.getItem("ab-theme");
      if (saved === "light") isDark = false;
    } catch {
      /* storage blocked */
    }
    setDark(isDark);
    applyTheme(isDark);
  }, [applyTheme]);

  function toggle() {
    const next = !dark;
    setDark(next);
    applyTheme(next);
  }

  return (
    <section data-lab="dark-mode" aria-labelledby="lab-dark-mode-title">
      <style>{css}</style>
      <h2 id="lab-dark-mode-title">Dark mode toggle</h2>
      <div className="lab-wrap">
        <div className="lab-card">
          <p className="lab-lead">
            Switch the whole page between the default forest look and a light mist palette. Your choice is saved for the next visit.
          </p>
          <button type="button" className="lab-toggle" aria-pressed={dark} onClick={toggle}>
            {dark ? "Switch to light theme" : "Switch to dark theme"}
          </button>
        </div>
      </div>
    </section>
  );
}
