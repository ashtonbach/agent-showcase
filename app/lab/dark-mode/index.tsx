"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE = "ab-theme";
const MARK_DARK = "/ab-mark.svg";
const MARK_LIGHT =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 20"><path fill="#2F5A46" d="M14 1.5 26.5 18.5H22l-4.2-6.8H10.2L6 18.5H1.5L14 1.5zm1.8 7.2L14 6.8l-1.8 1.9-2.2 3.6h8l-2.2-3.6z"/></svg>',
  );

const css = `
[data-lab="dark-mode"]{width:min(720px,100%);margin:8px auto 56px}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px}
.lab-copy{margin:0 0 20px;color:var(--mist);max-width:52ch;line-height:1.55}
.lab-toggle{border:0;border-radius:999px;padding:12px 24px;font-family:var(--sans);font-size:15px;font-weight:500;cursor:pointer;background:var(--sage);color:#14201A;transition:background .2s,color .2s}
html[data-theme="light"]{background:#E8EEE9;color:#14201A}
html[data-theme="light"] body{color:#14201A}
html[data-theme="light"] body::before{background:linear-gradient(180deg,#E8EEE9 0%,#dde5df 100%)}
html[data-theme="light"] .brand{color:#14201A}
html[data-theme="light"] .nav-list a{color:#2F5A46}
html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible,html[data-theme="light"] .nav-list a[aria-current="page"]{color:#14201A}
html[data-theme="light"] .nav-list a::after{background:#2F5A46}
html[data-theme="light"] .site-footer{color:#2F5A46;opacity:1}
html[data-theme="light"] .site-disclaimer{color:#2F5A46}
html[data-theme="light"] .demo-title,html[data-theme="light"] main.page [data-lab]>h2{color:#14201A}
html[data-theme="light"] .label{color:#2F5A46}
html[data-theme="light"] main.page [data-lab]{border-top-color:rgba(47,90,70,.22)}
html[data-theme="light"] .lab-copy{color:#14201A}
html[data-theme="light"] .lab-toggle{background:#2F5A46;color:#E8EEE9}
html[data-theme="light"] .skip-link:focus{background:#E8EEE9;color:#14201A}
html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97)}
@media (prefers-reduced-motion:reduce){.lab-toggle{transition:none}}
`;

function syncMark(light: boolean) {
  const img = document.querySelector<HTMLImageElement>("img.brand-mark");
  if (!img) return;
  img.src = light ? MARK_LIGHT : MARK_DARK;
}

function applyTheme(light: boolean) {
  if (light) document.documentElement.dataset.theme = "light";
  else delete document.documentElement.dataset.theme;
  syncMark(light);
}

export default function DarkModeLab() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    try {
      const light = localStorage.getItem(STORAGE) === "light";
      setDark(!light);
      applyTheme(light);
    } catch {
      applyTheme(false);
    }
  }, []);

  const onToggle = useCallback(() => {
    setDark((wasDark) => {
      const nextDark = !wasDark;
      applyTheme(!nextDark);
      try {
        localStorage.setItem(STORAGE, nextDark ? "dark" : "light");
      } catch {
        /* ignore */
      }
      return nextDark;
    });
  }, []);

  return (
    <section data-lab="dark-mode" aria-labelledby="dark-mode-h2">
      <style>{css}</style>
      <h2 id="dark-mode-h2">Dark mode toggle</h2>
      <div className="lab-card">
        <p className="lab-copy">
          Switch between the default Forest look and a light Mist palette. Your choice is saved on this device.
        </p>
        <button type="button" className="lab-toggle" aria-pressed={dark} onClick={onToggle}>
          {dark ? "Switch to light" : "Switch to dark"}
        </button>
      </div>
    </section>
  );
}
