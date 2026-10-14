"use client";

import { useLayoutEffect, useState } from "react";

const css = `
.lab-card{width:min(720px,100%);margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,.28);border-radius:16px}
.lab-toggle{font-family:var(--sans);font-size:15px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:#F2EFE6;background:transparent;border:1px solid #B0CBBC;border-radius:8px;padding:12px 20px;cursor:pointer}
.lab-hint{margin-top:12px;color:var(--mist);font-size:15px;line-height:1.5}
@media (prefers-reduced-motion:reduce){.lab-toggle{transition:none}}
html[data-theme="light"]{--forest:#E8EEE9;--sage:#2F5A46;--mist:#14201A;--muted:rgba(20,32,26,.72);--header-line:rgba(47,90,70,.22);--line:rgba(47,90,70,.18);background:#E8EEE9}
html[data-theme="light"] body{color:#14201A;background:#E8EEE9}
html[data-theme="light"] body::before{background:#E8EEE9}
html[data-theme="light"] .brand,.lab-x .brand-word,html[data-theme="light"] .brand-word,html[data-theme="light"] .demo-title,html[data-theme="light"] h1,html[data-theme="light"] h2{color:#14201A}
html[data-theme="light"] .label,html[data-theme="light"] .nav-list a,html[data-theme="light"] .site-footer,html[data-theme="light"] .site-disclaimer{color:#2F5A46}
html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible{color:#14201A}
html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97)}
html[data-theme="light"] .site-footer{opacity:1}
html[data-theme="light"] .lab-card{border-color:rgba(47,90,70,.4)}
html[data-theme="light"] .lab-toggle{color:#14201A;border-color:#2F5A46}
html[data-theme="dark"] .site-disclaimer{color:#B0CBBC}
`;

function applyTheme(dark: boolean) {
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  localStorage.setItem("ab-theme", dark ? "dark" : "light");
}

export default function DarkModeLab() {
  const [dark, setDark] = useState(true);

  useLayoutEffect(() => {
    const next = localStorage.getItem("ab-theme") !== "light";
    setDark(next);
    applyTheme(next);
  }, []);

  function onToggle() {
    const next = !dark;
    setDark(next);
    applyTheme(next);
  }

  return (
    <section data-lab="dark-mode" aria-labelledby="lab-theme-heading">
      <p className="label">Appearance</p>
      <h2 id="lab-theme-heading">Choose a theme</h2>
      <div className="lab-card">
        <button type="button" className="lab-toggle" aria-pressed={dark} onClick={onToggle}>
          {dark ? "Switch to light" : "Switch to dark"}
        </button>
        <p className="lab-hint">Applies to the whole page and is remembered after reload.</p>
      </div>
      <style>{css}</style>
    </section>
  );
}

