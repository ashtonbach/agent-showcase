"use client";
import { useCallback, useEffect, useState } from "react";

const KEY = "ab-theme";

function syncTheme(dark: boolean) {
  document.documentElement.dataset.theme = dark ? "dark" : "light";
}

export default function Lab() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    const isDark = saved !== "light";
    setDark(isDark);
    syncTheme(isDark);
  }, []);

  const onToggle = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      syncTheme(next);
      localStorage.setItem(KEY, next ? "dark" : "light");
      return next;
    });
  }, []);

  const css = `
html[data-theme="light"],html[data-theme="light"] body{color:#14201A;background:#E8EEE9}
html[data-theme="light"] body::before{background:linear-gradient(180deg,#E8EEE9 0%,#dfe8e1 100%)}
html[data-theme="light"] .brand,html[data-theme="light"] .brand-word,html[data-theme="light"] .demo-title{color:#14201A}
html[data-theme="light"] .nav-list a{color:#2F5A46}
html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible,html[data-theme="light"] .nav-list a[aria-current="page"]{color:#14201A}
html[data-theme="light"] .site-footer,html[data-theme="light"] .site-disclaimer{color:#2F5A46;opacity:1}
html[data-theme="light"] .brand-mark{filter:brightness(0) saturate(100%) invert(22%) sepia(18%) saturate(900%) hue-rotate(100deg)}
html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97)}
[data-lab="dark-mode"]{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6)}
html[data-theme="light"] [data-lab="dark-mode"]{color:#14201A}
[data-lab="dark-mode"] h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.15;margin:0 0 16px}
[data-lab="dark-mode"] .lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;max-width:100%}
html[data-theme="light"] [data-lab="dark-mode"] .lab-card{border-color:rgba(47,90,70,.28)}
[data-lab="dark-mode"] .lab-copy{margin:0 0 20px;line-height:1.6;max-width:52ch}
[data-lab="dark-mode"] .lab-toggle{font-family:var(--sans);font-weight:500;font-size:15px;border:0;border-radius:999px;padding:12px 22px;cursor:pointer;background:var(--sage,#B0CBBC);color:#121A16}
html[data-theme="light"] [data-lab="dark-mode"] .lab-toggle{background:#2F5A46;color:#E8EEE9}
[data-lab="dark-mode"] .lab-toggle:focus-visible{outline:2px solid var(--sage,#B0CBBC);outline-offset:3px}
html[data-theme="light"] [data-lab="dark-mode"] .lab-toggle:focus-visible{outline-color:#2F5A46}
@media (prefers-reduced-motion:reduce){[data-lab="dark-mode"] .lab-toggle{transition:none}}
`;

  return (
    <section data-lab="dark-mode" aria-labelledby="lab-dark-mode-heading">
      <style>{css}</style>
      <h2 id="lab-dark-mode-heading">Theme</h2>
      <div className="lab-card">
        <p className="lab-copy">
          Switch between the default forest look and a light mist palette. Your choice is saved for the next visit.
        </p>
        <button type="button" className="lab-toggle" aria-pressed={dark} onClick={onToggle}>
          {dark ? "Dark mode on" : "Light mode on"}
        </button>
      </div>
    </section>
  );
}
