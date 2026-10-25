"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "ab-theme";

function applyTheme(light: boolean) {
  const root = document.documentElement;
  if (light) root.dataset.theme = "light";
  else delete root.dataset.theme;
}

const css = `
html[data-theme="light"]{background:#E8EEE9}
html[data-theme="light"] body{color:#14201A}
html[data-theme="light"] body::before{
  background:linear-gradient(180deg,#E8EEE9 0%,#dfe8e2 100%)}
html[data-theme="light"] .brand{color:#14201A}
html[data-theme="light"] .brand-mark,
html[data-theme="light"] .footer-mark-img{
  filter:brightness(0) saturate(100%) invert(22%) sepia(18%) saturate(900%) hue-rotate(100deg)}
html[data-theme="light"] .nav-list a{color:#2F5A46}
html[data-theme="light"] .nav-list a:hover,
html[data-theme="light"] .nav-list a:focus-visible,
html[data-theme="light"] .nav-list a[aria-current="page"]{color:#14201A}
html[data-theme="light"] .nav-list a::after{background:#2F5A46}
html[data-theme="light"] .demo-title{color:#14201A}
html[data-theme="light"] .site-footer{color:#2F5A46;opacity:1}
html[data-theme="light"] .site-disclaimer{color:rgba(47,90,70,.85)}
html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97)}
html[data-theme="light"] .skip-link:focus{background:#E8EEE9;color:#14201A}
html[data-theme="light"] main.page [data-lab]{border-top-color:rgba(47,90,70,.22)}
html[data-theme="light"] main.page [data-lab] > h2{color:#14201A}
[data-lab="dark-mode"].lab-wrap{
  width:min(720px,100%);margin:8px auto 56px;padding:0}
.lab-card{
  border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;
  display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px}
html[data-theme="light"] .lab-card{border-color:rgba(47,90,70,.28)}
.lab-copy{flex:1;min-width:200px}
.lab-copy p{margin:0;color:var(--muted);font-size:15px;line-height:1.5}
html[data-theme="light"] .lab-copy p{color:rgba(20,32,26,.78)}
.lab-toggle{
  border:0;border-radius:999px;padding:12px 22px;font-family:var(--sans);
  font-size:14px;font-weight:500;letter-spacing:.04em;cursor:pointer;
  background:var(--sage);color:#14201A;transition:background .2s,color .2s}
html[data-theme="light"] .lab-toggle{background:#2F5A46;color:#E8EEE9}
@media (prefers-reduced-motion:reduce){.lab-toggle{transition:none}}
`;

export default function DarkModeLab() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const wantLight = stored === "light";
    setDark(!wantLight);
    applyTheme(wantLight);
  }, []);

  const toggle = useCallback(() => {
    setDark((prev) => {
      const nextDark = !prev;
      const light = !nextDark;
      applyTheme(light);
      localStorage.setItem(STORAGE_KEY, light ? "light" : "dark");
      return nextDark;
    });
  }, []);

  return (
    <section
      data-lab="dark-mode"
      className="lab-wrap"
      aria-labelledby="dark-mode-title"
    >
      <style>{css}</style>
      <h2 id="dark-mode-title">Dark mode toggle</h2>
      <div className="lab-card">
        <div className="lab-copy">
          <p>
            Switch the whole showcase between the default forest look and a light
            palette. Your choice is saved in this browser.
          </p>
        </div>
        <button
          type="button"
          className="lab-toggle"
          aria-pressed={dark}
          onClick={toggle}
        >
          {dark ? "Switch to light mode" : "Switch to dark mode"}
        </button>
      </div>
    </section>
  );
}
