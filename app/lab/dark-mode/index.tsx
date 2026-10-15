"use client";

import { useEffect, useState } from "react";

const KEY = "ab-theme";
const DARK_SRC = "/ab-mark.svg";
const LIGHT_SRC =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 20"><path fill="#2F5A46" d="M3 18 14 2l11 16h-6L14 8 9 18z"/><path fill="#14201A" d="M16 18 20 9l5 9h-3l-2-4h-1z"/></svg>'
  );

const css = `
.lab-wrap{max-width:min(720px,100%);margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,.28);border-radius:16px}
.lab-copy{margin:0 0 20px;color:var(--mist);font:400 17px/1.6 var(--sans)}
.lab-btn{border:0;border-radius:999px;padding:10px 22px;background:var(--sage);color:#14201A;font:500 15px/1.3 var(--sans);cursor:pointer}
.lab-btn:focus-visible{outline:2px solid var(--sage);outline-offset:4px}
.site-disclaimer{color:var(--sage)}
html[data-theme="light"]{background:#E8EEE9}
html[data-theme="light"] body{color:#14201A;background:#E8EEE9}
html[data-theme="light"] body::before{background:#E8EEE9}
html[data-theme="light"] .brand,html[data-theme="light"] .demo-title,html[data-theme="light"] h1,html[data-theme="light"] h2{color:#14201A}
html[data-theme="light"] .label,html[data-theme="light"] .nav-list a,html[data-theme="light"] .site-footer,html[data-theme="light"] .site-disclaimer{color:#2F5A46;opacity:1}
html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible,html[data-theme="light"] .nav-list a[aria-current="page"]{color:#14201A}
html[data-theme="light"] .nav-list a::after{background:#2F5A46}
html[data-theme="light"] .brand-mark{filter:none;content:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 20'%3E%3Cpath fill='%232F5A46' d='M3 18 14 2l11 16h-6L14 8 9 18z'/%3E%3Cpath fill='%2314201A' d='M16 18 20 9l5 9h-3l-2-4h-1z'/%3E%3C/svg%3E")}
html[data-theme="light"] .lab-copy{color:#14201A}
html[data-theme="light"] .lab-btn{background:#2F5A46;color:#E8EEE9}
html[data-theme="light"] .lab-btn:focus-visible{outline-color:#2F5A46}
html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97);border-color:rgba(47,90,70,.22)}
html[data-theme="light"] main.page [data-lab]{border-top-color:rgba(47,90,70,.22)}
html[data-theme="light"] .skip-link:focus{background:#E8EEE9;color:#14201A}
@media (prefers-reduced-motion:reduce){.lab-btn{transition:none}}
`;

function applyTheme(dark: boolean) {
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  localStorage.setItem(KEY, dark ? "dark" : "light");
  const mark = document.querySelector<HTMLImageElement>("img.brand-mark");
  if (mark) mark.src = dark ? DARK_SRC : LIGHT_SRC;
}

export default function DarkModeLab() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    const next = saved !== "light";
    setDark(next);
    applyTheme(next);
  }, []);

  function onToggle() {
    const next = !dark;
    setDark(next);
    applyTheme(next);
  }

  return (
    <section data-lab="dark-mode" aria-labelledby="lab-theme-title">
      <style>{css}</style>
      <h2 id="lab-theme-title">Theme</h2>
      <div className="lab-wrap">
        <p className="lab-copy">
          Use the control to switch the whole page between the default forest
          dark look and a mist light look. The choice is stored in this browser.
        </p>
        <button type="button" aria-pressed={dark} className="lab-btn" onClick={onToggle}>
          {dark ? "Switch to light" : "Switch to dark"}
        </button>
      </div>
    </section>
  );
}
