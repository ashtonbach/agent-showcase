"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "ab-theme";

function applyTheme(dark: boolean) {
  const root = document.documentElement;
  if (dark) {
    root.dataset.theme = "dark";
  } else {
    root.dataset.theme = "light";
  }
}

export default function Lab() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const isDark = stored !== "light";
    setDark(isDark);
    applyTheme(isDark);
  }, []);

  const toggle = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
      return next;
    });
  }, []);

  return (
    <section data-lab="dark-mode" aria-labelledby="lab-dark-mode-title">
      <style>{`
html[data-theme="light"]{background:#E8EEE9;color:#14201A}
html[data-theme="light"] body{color:#14201A}
html[data-theme="light"] body::before{background:linear-gradient(180deg,#E8EEE9 0%,#dde5df 100%)}
html[data-theme="light"] .demo-title,html[data-theme="light"] main.page [data-lab]>h2{color:#14201A}
html[data-theme="light"] .brand{color:#14201A}
html[data-theme="light"] .nav-list a{color:#2F5A46}
html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible{color:#14201A}
html[data-theme="light"] .site-footer{color:#2F5A46;opacity:1}
html[data-theme="light"] .site-disclaimer{color:#2F5A46}
html[data-theme="light"] .brand-mark,html[data-theme="light"] .footer-mark-img{filter:brightness(0) saturate(100%) invert(22%) sepia(18%) saturate(900%) hue-rotate(100deg)}
html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97)}
html[data-theme="light"] main.page [data-lab]{border-top-color:rgba(47,90,70,.22)}
.lab-dark-wrap{width:min(720px,100%);margin:8px auto 56px}
.lab-dark-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px}
.lab-dark-card p{margin:0;color:var(--mist);font-size:var(--fs-body);line-height:1.5;max-width:36ch}
html[data-theme="light"] .lab-dark-card p{color:#14201A}
.lab-dark-toggle{border:0;border-radius:999px;padding:12px 22px;font-family:var(--sans);font-size:15px;font-weight:500;cursor:pointer;background:var(--sage);color:#14201A;letter-spacing:.04em}
html[data-theme="light"] .lab-dark-toggle{background:#2F5A46;color:#E8EEE9}
.lab-dark-toggle:focus-visible{outline:2px solid var(--sage);outline-offset:3px}
html[data-theme="light"] .lab-dark-toggle:focus-visible{outline-color:#2F5A46}
@media (prefers-reduced-motion:reduce){.lab-dark-toggle{transition:none}}
      `}</style>
      <h2 id="lab-dark-mode-title">Dark mode toggle</h2>
      <div className="lab-dark-wrap">
        <div className="lab-dark-card">
          <p>Switch the whole page between the forest palette and a light mist surface. Your choice stays after reload.</p>
          <button type="button" className="lab-dark-toggle" aria-pressed={dark} onClick={toggle}>
            {dark ? "Switch to light" : "Switch to dark"}
          </button>
        </div>
      </div>
    </section>
  );
}
