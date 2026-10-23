"use client";
import { useState, useEffect, useCallback } from "react";

const KEY = "ab-theme";
const MARK_DARK = "/ab-mark.svg";
const MARK_LIGHT =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0.5 -6 593.5 420"><path fill="#2F5A46" d="M423.02 390 224 18 24.5 390h200l34.32-64H102.27L224 99.12l121.38 226.88 34.24 64z"/></svg>',
  );
const css = `
html[data-theme="light"]{background:#E8EEE9}
html[data-theme="light"] body{color:#14201A}
html[data-theme="light"] body::before{background:linear-gradient(180deg,#E8EEE9 0%,#dfe8e1 100%)}
html[data-theme="light"] .brand{color:#14201A}
html[data-theme="light"] .label,html[data-theme="light"] .nav-list a{color:#2F5A46}
html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible{color:#14201A}
html[data-theme="light"] .nav-list a::after{background:#2F5A46}
html[data-theme="light"] .site-disclaimer{color:rgba(47,90,70,.78)}
html[data-theme="light"] .site-footer{color:#2F5A46;opacity:1}
html[data-theme="light"] .demo-title{color:#14201A}
html[data-theme="light"] .skip-link:focus{background:#E8EEE9;color:#14201A}
html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97)}
html[data-theme="light"] main.page [data-lab]{border-top-color:rgba(47,90,70,.22)}
html[data-theme="light"] main.page [data-lab]>h2{color:#14201A}
.lab-wrap{width:min(720px,100%);margin:8px auto 56px}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px}
html[data-theme="light"] .lab-card{border-color:rgba(47,90,70,.28)}
.lab-copy{margin:0 0 20px;color:var(--muted);line-height:1.55}
html[data-theme="light"] .lab-copy{color:rgba(20,32,26,.78)}
.lab-toggle{border:0;border-radius:999px;padding:12px 26px;font-family:var(--sans);font-size:16px;font-weight:500;cursor:pointer}
html:not([data-theme="light"]) .lab-toggle{background:var(--sage);color:#14201A}
html[data-theme="light"] .lab-toggle{background:#2F5A46;color:#E8EEE9}
@media (prefers-reduced-motion:reduce){.lab-toggle{transition:none}}
`;

function syncMarks(light: boolean) {
  document.querySelectorAll<HTMLImageElement>(".brand-mark, .footer-mark-img").forEach((img) => {
    img.src = light ? MARK_LIGHT : MARK_DARK;
  });
}

function setTheme(mode: "dark" | "light") {
  document.documentElement.dataset.theme = mode;
  syncMarks(mode === "light");
}

export default function DarkModeLab() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    const mode = saved === "light" ? "light" : "dark";
    setDark(mode === "dark");
    setTheme(mode);
  }, []);

  const onToggle = useCallback(() => {
    const next = !dark;
    setDark(next);
    const mode = next ? "dark" : "light";
    setTheme(mode);
    localStorage.setItem(KEY, mode);
  }, [dark]);

  return (
    <section data-lab="dark-mode" aria-labelledby="lab-dark-mode-h">
      <style>{css}</style>
      <h2 id="lab-dark-mode-h">Theme</h2>
      <div className="lab-wrap">
        <div className="lab-card">
          <p className="lab-copy">
            Switch between the default Forest Mist palette and a light Mist surface. Your choice is remembered on this device.
          </p>
          <button type="button" className="lab-toggle" aria-pressed={dark} onClick={onToggle}>
            {dark ? "Switch to light mode" : "Switch to dark mode"}
          </button>
        </div>
      </div>
    </section>
  );
}
