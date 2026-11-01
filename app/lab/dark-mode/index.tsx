"use client";

import { useCallback, useEffect, useState } from "react";

const css = `
[data-lab="dark-mode"]{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#E8EEE9)}
[data-lab="dark-mode"]>h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.15;margin:0 0 20px;color:var(--mist,#F2EFE6)}
[data-lab="dark-mode"] .lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;display:flex;flex-direction:column;align-items:flex-start;gap:16px}
[data-lab="dark-mode"] .lab-desc{margin:0;font-family:var(--sans);font-size:17px;line-height:1.55;color:var(--mist,#E8EEE9)}
[data-lab="dark-mode"] .lab-toggle{font-family:var(--sans);font-weight:500;font-size:15px;border:0;border-radius:999px;padding:12px 22px;cursor:pointer;background:var(--sage,#B0CBBC);color:#14201A}
[data-lab="dark-mode"] .lab-toggle:focus-visible{outline:2px solid var(--sage,#B0CBBC);outline-offset:3px}
@media (prefers-reduced-motion:reduce){[data-lab="dark-mode"] .lab-toggle{transition:none}}
html[data-theme="light"]{background:#E8EEE9}
html[data-theme="light"] body{color:#14201A}
html[data-theme="light"] body::before{background:linear-gradient(180deg,#E8EEE9 0%,#DDE5DF 100%)}
html[data-theme="light"] .brand{color:#14201A}
html[data-theme="light"] .nav-list a{color:#2F5A46}
html[data-theme="light"] .nav-list a::after{background:#2F5A46}
html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible,html[data-theme="light"] .nav-list a[aria-current="page"]{color:#14201A}
html[data-theme="light"] .demo-title{color:#14201A}
html[data-theme="light"] .site-footer{color:#2F5A46;opacity:1}
html[data-theme="light"] .site-disclaimer{color:#2F5A46;opacity:.85}
html[data-theme="light"] .label{color:#2F5A46}
html[data-theme="light"] main.page [data-lab]{border-top-color:rgba(47,90,70,.22)}
html[data-theme="light"] [data-lab="dark-mode"],html[data-theme="light"] [data-lab="dark-mode"]>h2,html[data-theme="light"] [data-lab="dark-mode"] .lab-desc{color:#14201A}
html[data-theme="light"] [data-lab="dark-mode"] .lab-card{border-color:rgba(47,90,70,.28);background:rgba(255,255,255,.45)}
html[data-theme="light"] [data-lab="dark-mode"] .lab-toggle{background:#2F5A46;color:#F2EFE6}
html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97)}
`;

const lightMarkSrc =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0.5 -6 594 420"><path fill="#2F5A46" fill-rule="evenodd" d="M423 390 224 18 24.5 390H224l34.3-64H102.3L224 99.1l121.4 226.9h34.2z"/></svg>',
  );

let defaultMarkSrc: string | null = null;

function syncMarks(mode: "dark" | "light") {
  const imgs = document.querySelectorAll<HTMLImageElement>(".brand-mark, .footer-mark-img");
  imgs.forEach((img) => {
    if (!defaultMarkSrc) defaultMarkSrc = img.getAttribute("src") || img.src;
    img.src = mode === "light" ? lightMarkSrc : defaultMarkSrc;
  });
}

function applyTheme(mode: "dark" | "light") {
  const root = document.documentElement;
  if (mode === "light") root.dataset.theme = "light";
  else root.dataset.theme = "dark";
  syncMarks(mode);
  try {
    localStorage.setItem("ab-theme", mode);
  } catch {
    /* ignore */
  }
}

export default function DarkModeLab() {
  const titleId = "dark-mode-title";
  const [dark, setDark] = useState(true);

  useEffect(() => {
    let mode: "dark" | "light" = "dark";
    try {
      const saved = localStorage.getItem("ab-theme");
      if (saved === "light" || saved === "dark") mode = saved;
    } catch {
      /* ignore */
    }
    setDark(mode === "dark");
    applyTheme(mode);
  }, []);

  const onToggle = useCallback(() => {
    setDark((wasDark) => {
      const next = !wasDark;
      applyTheme(next ? "dark" : "light");
      return next;
    });
  }, []);

  return (
    <section data-lab="dark-mode" aria-labelledby={titleId}>
      <h2 id={titleId}>Dark mode toggle</h2>
      <div className="lab-card">
        <p className="lab-desc">
          Switch the whole showcase between the default forest palette and a light mist theme. Your choice is saved in this browser.
        </p>
        <button type="button" className="lab-toggle" aria-pressed={dark} onClick={onToggle}>
          {dark ? "Switch to light mode" : "Switch to dark mode"}
        </button>
      </div>
      <style>{css}</style>
    </section>
  );
}
