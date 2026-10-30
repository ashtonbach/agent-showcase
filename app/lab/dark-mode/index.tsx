"use client";

import { useCallback, useEffect, useState } from "react";

const css = `
.lab-dm-h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 16px;color:var(--mist,#f2efe6)}
.lab-dm-card{width:min(720px,100%);margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,.28);border-radius:16px;box-sizing:border-box}
.lab-dm-copy{margin:0 0 20px;font-family:var(--sans);font-size:17px;line-height:1.6;color:var(--mist,#e8eee9)}
.lab-dm-btn{display:inline-flex;align-items:center;justify-content:center;font-family:var(--sans);font-weight:500;font-size:15px;line-height:1.2;padding:12px 22px;border:0;border-radius:999px;cursor:pointer;background:var(--sage);color:#121a16}
.lab-dm-btn:focus-visible{outline:2px solid var(--sage);outline-offset:3px}
html[data-theme="light"],html[data-theme="light"] body{color:#14201a;background:#e8eee9}
html[data-theme="light"] body::before{background:linear-gradient(180deg,#e8eee9 0%,#dde5df 100%)}
html[data-theme="light"] .brand{color:#14201a}
html[data-theme="light"] .nav-list a{color:#2f5a46}
html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible{color:#14201a}
html[data-theme="light"] .nav-list a::after{background:#2f5a46}
html[data-theme="light"] .demo-title,html[data-theme="light"] main.page [data-lab]>h2{color:#14201a!important}
html[data-theme="light"] .site-footer{color:#2f5a46;opacity:1}
html[data-theme="light"] .site-disclaimer{color:#2f5a46;opacity:.88}
html[data-theme="light"] main.page [data-lab]{border-top-color:rgba(47,90,70,.22)}
html[data-theme="light"] .skip-link.label{color:#2f5a46}
html[data-theme="light"] .skip-link:focus{background:#14201a;color:#e8eee9}
html[data-theme="light"] .skip-link:focus.label{color:#e8eee9}
html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97)}
html[data-theme="light"] .lab-dm-h2,html[data-theme="light"] .lab-dm-copy{color:#14201a}
html[data-theme="light"] .lab-dm-card{border-color:rgba(47,90,70,.28)}
html[data-theme="light"] .lab-dm-btn{background:#2f5a46;color:#e8eee9}
html[data-theme="light"] .lab-dm-btn:focus-visible{outline-color:#2f5a46}
@media (prefers-reduced-motion:reduce){.lab-dm-btn{transition:none}}
`;

const LIGHT_MARK_SRC =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0.5 -6 593.5 420"><path fill="#2F5A46" d="M423.02 390 224 18 24.5 390h200l34.32-64H102.27L223.95 99.12 345.33 326H379.57Z"/></svg>'
  );

function readStoredDark(): boolean {
  try {
    const v = localStorage.getItem("ab-theme");
    if (v === "light") return false;
    if (v === "dark") return true;
  } catch {
    /* ignore */
  }
  return true;
}

function syncMarkSources(isDark: boolean) {
  document.querySelectorAll<HTMLImageElement>(".brand-mark, .footer-mark-img").forEach((img) => {
    if (!img.dataset.abDefaultSrc) img.dataset.abDefaultSrc = img.currentSrc || img.src;
    const next = isDark ? img.dataset.abDefaultSrc : LIGHT_MARK_SRC;
    if (img.getAttribute("src") !== next) img.setAttribute("src", next);
  });
}

function applyTheme(isDark: boolean) {
  const root = document.documentElement;
  if (isDark) root.dataset.theme = "dark";
  else root.dataset.theme = "light";
  syncMarkSources(isDark);
  try {
    localStorage.setItem("ab-theme", isDark ? "dark" : "light");
  } catch {
    /* ignore */
  }
}

export default function DarkModeToggle() {
  const [dark, setDark] = useState(true);

  const sync = useCallback((isDark: boolean) => {
    setDark(isDark);
    applyTheme(isDark);
  }, []);

  useEffect(() => {
    sync(readStoredDark());
  }, [sync]);

  function onToggle() {
    sync(!dark);
  }

  return (
    <section data-lab="dark-mode" aria-labelledby="lab-dark-mode-h2">
      <h2 id="lab-dark-mode-h2" className="lab-dm-h2">
        Dark mode toggle
      </h2>
      <div className="lab-dm-card">
        <p className="lab-dm-copy">
          Switch the whole page between the default forest look and a light mist palette. Your choice is saved for the next visit.
        </p>
        <button type="button" className="lab-dm-btn" aria-pressed={dark} onClick={onToggle}>
          {dark ? "Switch to light" : "Switch to dark"}
        </button>
      </div>
      <style>{css}</style>
    </section>
  );
}
