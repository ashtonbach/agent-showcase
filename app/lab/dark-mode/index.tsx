"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "ab-theme";
const titleId = "ab-dark-mode-title";

const lightMarkSrc =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0.5 -6 594 420"><path fill="#2F5A46" d="M423 390 224 18 24.5 390H224l34.3-64H102.3L224 99.1l121.4 226.9h34.2z"/></svg>',
  );

let savedMarkSrc: string | null = null;

const themeRules = [
  'html[data-theme="light"]{--mist:#14201A;--sage:#2F5A46;--header-line:rgba(47,90,70,.22);--line:rgba(47,90,70,.18)}',
  'html[data-theme="light"],html[data-theme="light"] body{background:#E8EEE9;color:#14201A}',
  'html[data-theme="light"] body::before{background:linear-gradient(180deg,#E8EEE9,#dfe8e1)}',
  'html[data-theme="light"] .label,html[data-theme="light"] .nav-list a,html[data-theme="light"] .site-footer,html[data-theme="light"] .site-disclaimer{color:#2F5A46}',
  'html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible{color:#14201A}',
  'html[data-theme="light"] .brand{color:#14201A}',
  'html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97)}',
  '[data-lab="dark-mode"]{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#E8EEE9)}',
  '[data-lab="dark-mode"]>h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 20px;color:var(--mist,#F2EFE6)}',
  '[data-lab="dark-mode"] .lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px}',
  'html[data-theme="light"] [data-lab="dark-mode"] .lab-card{border-color:rgba(47,90,70,.28);background:rgba(255,255,255,.45)}',
  '[data-lab="dark-mode"] .lab-lead{margin:0 0 16px;line-height:1.55;font-size:16px;color:var(--mist,#e8eee9)}',
  'html[data-theme="light"] [data-lab="dark-mode"] .lab-lead{color:#14201A}',
  '[data-lab="dark-mode"] .lab-toggle{font-family:var(--sans);font-weight:500;font-size:14px;border:0;border-radius:999px;padding:12px 22px;cursor:pointer;background:var(--sage);color:#121a16}',
  'html[data-theme="light"] [data-lab="dark-mode"] .lab-toggle{background:#2F5A46;color:#F2EFE6}',
  '[data-lab="dark-mode"] .lab-toggle:focus-visible{outline:2px solid var(--sage);outline-offset:3px}',
  "@media (prefers-reduced-motion:reduce){[data-lab=\"dark-mode\"] .lab-toggle{transition:none}}",
];
const themeCss = themeRules.join("");

type ThemeMode = "dark" | "light";

function patchMarks(mode: ThemeMode) {
  document.querySelectorAll<HTMLImageElement>(".brand-mark, .footer-mark-img").forEach((img) => {
    if (!savedMarkSrc) savedMarkSrc = img.getAttribute("src") ?? img.src;
    img.src = mode === "light" ? lightMarkSrc : savedMarkSrc;
  });
}

function writeTheme(mode: ThemeMode) {
  document.documentElement.dataset.theme = mode;
  patchMarks(mode);
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    /* ignore */
  }
}

export default function DarkModeLab() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    let mode: ThemeMode = "dark";
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === "light" || v === "dark") mode = v;
    } catch {
      /* ignore */
    }
    setDark(mode === "dark");
    writeTheme(mode);
  }, []);

  const onToggle = useCallback(() => {
    setDark((prev) => {
      const nextDark = !prev;
      writeTheme(nextDark ? "dark" : "light");
      return nextDark;
    });
  }, []);

  return (
    <section data-lab="dark-mode" aria-labelledby={titleId}>
      <h2 id={titleId}>Dark mode toggle</h2>
      <div className="lab-card">
        <p className="lab-lead">
          Tap the pill to flip the entire page between forest dark and mist light. The setting stays on reload.
        </p>
        <button type="button" className="lab-toggle" aria-pressed={dark} onClick={onToggle}>
          {dark ? "Switch to light mode" : "Switch to dark mode"}
        </button>
      </div>
      <style>{themeCss}</style>
    </section>
  );
}
