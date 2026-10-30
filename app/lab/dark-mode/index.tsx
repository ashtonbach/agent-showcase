"use client";

import { useCallback, useEffect, useState } from "react";

const css = `
.lab-dm-wrap{width:min(720px,100%);margin:8px auto 56px}
.lab-dm-h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 16px;color:var(--mist,#f2efe6)}
.lab-dm-panel{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;box-sizing:border-box}
.lab-dm-text{margin:0 0 20px;font-family:var(--sans);font-size:17px;line-height:1.6;color:var(--mist,#e8eee9)}
.lab-dm-toggle{font-family:var(--sans);font-weight:500;font-size:15px;border:0;border-radius:999px;padding:12px 22px;cursor:pointer;background:var(--sage);color:#121a16}
.lab-dm-toggle:focus-visible{outline:2px solid var(--sage);outline-offset:3px}
html[data-theme="light"]{--mist:#14201a;--sage:#2f5a46}
html[data-theme="light"],html[data-theme="light"] body{background:#e8eee9;color:#14201a}
html[data-theme="light"] body::before{background:linear-gradient(180deg,#e8eee9,#dde5df)}
html[data-theme="light"] .label,html[data-theme="light"] .nav-list a,html[data-theme="light"] .site-footer,html[data-theme="light"] .site-disclaimer{color:#2f5a46}
html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible{color:#14201a}
html[data-theme="light"] .brand{color:#14201a}
html[data-theme="light"] .skip-link.label{color:#2f5a46}
html[data-theme="light"] .skip-link:focus{background:#14201a;color:#e8eee9}
html[data-theme="light"] .demo-title,html[data-theme="light"] main.page [data-lab]>h2{color:#14201a!important}
html[data-theme="light"] main.page [data-lab]{border-top-color:rgba(47,90,70,.22)}
html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97)}
html[data-theme="light"] .lab-dm-h2,html[data-theme="light"] .lab-dm-text{color:#14201a}
html[data-theme="light"] .lab-dm-panel{border-color:rgba(47,90,70,.28)}
html[data-theme="light"] .lab-dm-toggle{background:#2f5a46;color:#e8eee9}
@media (prefers-reduced-motion:reduce){.lab-dm-toggle{transition:none}}
`;

const MARK_LIGHT =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0.5 -6 593.5 420"><path fill="#2F5A46" d="M423.02 390 224 18 24.5 390h200l34.32-64H102.27L223.95 99.12 345.33 326H379.57Z"/></svg>'
  );

function persistTheme(isDark: boolean) {
  const root = document.documentElement;
  root.dataset.theme = isDark ? "dark" : "light";
  document.querySelectorAll<HTMLImageElement>(".brand-mark, .footer-mark-img").forEach((img) => {
    if (!img.dataset.abDefault) img.dataset.abDefault = img.currentSrc || img.src;
    img.src = isDark ? img.dataset.abDefault : MARK_LIGHT;
  });
  try {
    localStorage.setItem("ab-theme", isDark ? "dark" : "light");
  } catch {
    /* ignore */
  }
}

function loadDarkPreference(): boolean {
  try {
    const saved = localStorage.getItem("ab-theme");
    if (saved === "light") return false;
    if (saved === "dark") return true;
  } catch {
    /* ignore */
  }
  return true;
}

export default function DarkModeLab() {
  const [dark, setDark] = useState(true);

  const pushTheme = useCallback((next: boolean) => {
    setDark(next);
    persistTheme(next);
  }, []);

  useEffect(() => {
    pushTheme(loadDarkPreference());
  }, [pushTheme]);

  return (
    <section data-lab="dark-mode" aria-labelledby="lab-dm-title">
      <h2 id="lab-dm-title" className="lab-dm-h2">
        Dark mode toggle
      </h2>
      <div className="lab-dm-wrap">
        <div className="lab-dm-panel">
          <p className="lab-dm-text">
            Toggle the full page between forest dark and mist light. The setting stays on this device after reload.
          </p>
          <button type="button" className="lab-dm-toggle" aria-pressed={dark} onClick={() => pushTheme(!dark)}>
            {dark ? "Switch to light" : "Switch to dark"}
          </button>
        </div>
      </div>
      <style>{css}</style>
    </section>
  );
}
