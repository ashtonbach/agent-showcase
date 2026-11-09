"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE = "ab-theme";

const css = `
html[data-theme="light"]{background:#E8EEE9}
html[data-theme="light"] body{color:#14201A}
html[data-theme="light"] body::before{background:linear-gradient(180deg,#E8EEE9 0%,#dfe8e2 100%)}
html[data-theme="light"] .brand{color:#14201A}
html[data-theme="light"] .nav-list a{color:#2F5A46}
html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible,html[data-theme="light"] .nav-list a[aria-current="page"]{color:#14201A}
html[data-theme="light"] .nav-list a::after{background:#2F5A46}
html[data-theme="light"] .demo-title{color:#14201A}
html[data-theme="light"] .site-footer{color:#2F5A46;opacity:1}
html[data-theme="light"] .site-disclaimer{color:#2F5A46}
html[data-theme="light"] img.brand-mark,html[data-theme="light"] img.footer-mark-img{content:url("data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20594%20420'%3E%3Cpath%20fill%3D'%232F5A46'%20d%3D'M424%20390%20224%2018%2024%20390h200l34-64H102L224%2099l121%20227h35L424%20390z'/%3E%3Cpath%20fill%3D'%2314201A'%20d%3D'M447%2052h267l-200%20137c30-41%2070-91%20120-137H447z'/%3E%3C/svg%3E")}
html[data-theme="light"] .skip-link:focus{background:#E8EEE9;color:#14201A}
html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97)}
@media (prefers-reduced-motion:reduce){.lab-dm-btn{transition:none}}
[data-lab="dark-mode"]{width:min(720px,100%);margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,.28);border-radius:16px;color:var(--mist,#E8EEE9)}
html[data-theme="light"] [data-lab="dark-mode"]{color:#14201A;border-color:rgba(47,90,70,.28)}
[data-lab="dark-mode"] h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;margin:0 0 16px;color:inherit}
[data-lab="dark-mode"] .lab-dm-lead{margin:0 0 24px;line-height:1.55;font-size:1rem;opacity:.92}
.lab-dm-btn{font-family:var(--sans);font-size:15px;font-weight:500;padding:12px 22px;border:0;border-radius:999px;cursor:pointer;background:var(--sage,#B0CBBC);color:#121A16}
.lab-dm-btn:focus-visible{outline:2px solid var(--sage);outline-offset:3px}
html[data-theme="light"] .lab-dm-btn{background:#2F5A46;color:#E8EEE9}
`;

function applyTheme(dark: boolean) {
  const root = document.documentElement;
  if (dark) delete root.dataset.theme;
  else root.dataset.theme = "light";
  try {
    localStorage.setItem(STORAGE, dark ? "dark" : "light");
  } catch {
    /* quota */
  }
}

export default function DarkModeLab() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    let isDark = true;
    try {
      const stored = localStorage.getItem(STORAGE);
      if (stored === "light") isDark = false;
    } catch {
      /* private mode */
    }
    setDark(isDark);
    applyTheme(isDark);
  }, []);

  const toggle = useCallback(() => {
    setDark((was) => {
      const next = !was;
      applyTheme(next);
      return next;
    });
  }, []);

  return (
    <section data-lab="dark-mode" aria-labelledby="lab-dm-title">
      <style>{css}</style>
      <h2 id="lab-dm-title">Dark mode toggle</h2>
      <p className="lab-dm-lead">
        Switch the whole site between the forest default and a light mist palette. Your choice stays in this browser after reload.
      </p>
      <button type="button" className="lab-dm-btn" aria-pressed={dark} onClick={toggle}>
        {dark ? "Switch to light" : "Switch to dark"}
      </button>
    </section>
  );
}
