"use client";

import { useCallback, useEffect, useState } from "react";

const LIGHT_MARK =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0.5 -6 594 420"><path fill="#14201A" d="M423 390 224 18 24.5 390H224l34-64H102L224 99l121 227h34z"/><path fill="#2F5A46" d="M514 190l.9-.8 1.9-1.8 35-67-67-127 67-127h60c75 3 135 63 135 138s-60 135-135 138h-54l-22-42-22 42z"/></svg>',
  );

function swapChromeMarks(isDark: boolean) {
  document.querySelectorAll<HTMLImageElement>(".brand-mark,.footer-mark-img").forEach((img) => {
    if (!img.dataset.abOrig) img.dataset.abOrig = img.getAttribute("src") ?? "";
    img.src = isDark ? img.dataset.abOrig : LIGHT_MARK;
  });
}

const css = `
html[data-theme="light"]{background:#E8EEE9}
html[data-theme="light"] body{color:#14201A}
html[data-theme="light"] body::before{background:linear-gradient(180deg,#E8EEE9 0%,#dde5df 100%)}
html[data-theme="light"] .demo-title{color:#14201A}
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
    swapChromeMarks(isDark);
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
