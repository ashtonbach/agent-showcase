"use client";

import { useCallback, useLayoutEffect, useState } from "react";

const css = `
html[data-theme="light"]{background:#E8EEE9}
html[data-theme="light"] body{color:#14201A}
html[data-theme="light"] body::before{background:linear-gradient(180deg,#E8EEE9 0%,#dfe8e1 100%)}
html[data-theme="light"] .brand,html[data-theme="light"] .brand-word,html[data-theme="light"] .demo-title{color:#14201A}
html[data-theme="light"] .label,html[data-theme="light"] .nav-list a,html[data-theme="light"] .site-footer,html[data-theme="light"] .site-disclaimer{color:#2F5A46;opacity:1}
html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible{color:#14201A}
html[data-theme="light"] .nav-list a::after{background:#2F5A46}
html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97);border-color:rgba(47,90,70,.18)}
html[data-theme="light"] main.page [data-lab]{border-top-color:rgba(47,90,70,.22)}
html[data-theme="light"] .lab-x,html[data-theme="light"] .lab-x h2,html[data-theme="light"] [data-lab="dark-mode"] h2{color:#14201A}
html[data-theme="light"] .lab-x p{color:#2F5A46}
html[data-theme="light"] .lab-flake{color:#2F5A46;opacity:.78;text-shadow:none}
html[data-theme="light"] .lab-ban,html[data-theme="light"] .lab-ban.lab-v0,html[data-theme="light"] .lab-ban.lab-v1,html[data-theme="light"] .lab-ban.lab-v2,html[data-theme="light"] .lab-ban.lab-v3{background:#2F5A46!important;color:#E8EEE9!important;border-bottom-color:rgba(232,238,233,.4)}
html[data-theme="light"] .lab-ban span,html[data-theme="light"] .lab-ban .lab-gfx{color:#E8EEE9}
.lab-wrap{width:min(720px,100%);margin:8px auto 56px}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;display:flex;flex-direction:column;align-items:flex-start;gap:16px}
html[data-theme="light"] .lab-card{border-color:rgba(47,90,70,.28)}
.lab-desc{margin:0;color:var(--muted);line-height:1.55;max-width:52ch}
html[data-theme="light"] .lab-desc{color:rgba(20,32,26,.85)}
.lab-toggle{border:0;border-radius:999px;padding:12px 22px;font-family:var(--sans);font-size:15px;font-weight:500;cursor:pointer;background:var(--sage);color:#14201A}
html[data-theme="light"] .lab-toggle{background:#2F5A46;color:#E8EEE9}
.lab-toggle:focus-visible{outline:2px solid var(--sage);outline-offset:3px}
html[data-theme="light"] .lab-toggle:focus-visible{outline-color:#2F5A46}
@media (prefers-reduced-motion:reduce){.lab-toggle{transition:none}}
`;

const MARK_LIGHT =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 20"><path fill="#2F5A46" d="M14 1.2 26.5 18.5H1.5L14 1.2z"/><path fill="#14201A" d="M14 5.5 22 17.5H6L14 5.5z"/></svg>'
  );

function syncMark(isDark: boolean) {
  const img = document.querySelector("img.brand-mark");
  if (img instanceof HTMLImageElement) img.src = isDark ? "/ab-mark.svg" : MARK_LIGHT;
}

function applyTheme(isDark: boolean) {
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  syncMark(isDark);
}

export default function LabDarkMode() {
  const [dark, setDark] = useState(true);

  const apply = useCallback((isDark: boolean) => {
    applyTheme(isDark);
    try {
      localStorage.setItem("ab-theme", isDark ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }, []);

  useLayoutEffect(() => {
    try {
      const saved = localStorage.getItem("ab-theme");
      const isDark = saved !== "light";
      setDark(isDark);
      applyTheme(isDark);
    } catch {
      applyTheme(true);
    }
  }, []);

  const onToggle = useCallback(() => {
    const next = !dark;
    setDark(next);
    apply(next);
  }, [dark, apply]);

  return (
    <section data-lab="dark-mode" aria-labelledby="lab-dark-mode-title">
      <style>{css}</style>
      <h2 id="lab-dark-mode-title">Dark mode toggle</h2>
      <div className="lab-wrap">
        <div className="lab-card">
          <p className="lab-desc">
            Switch the whole AshtonBach page between the default forest look and a light
            surface. Your choice is saved in this browser.
          </p>
          <button type="button" className="lab-toggle" aria-pressed={dark} onClick={onToggle}>
            {dark ? "Switch to light mode" : "Switch to dark mode"}
          </button>
        </div>
      </div>
    </section>
  );
}
