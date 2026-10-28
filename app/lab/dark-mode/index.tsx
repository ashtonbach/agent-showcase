"use client";

import { useCallback, useEffect, useState } from "react";

const THEME_KEY = "ab-theme";
const TITLE_ID = "lab-dm-title";

const css = `html[data-theme="light"]{--mist:#14201A;--sage:#2F5A46;--header-line:rgba(47,90,70,.22);--line:rgba(47,90,70,.18);--danger:#A3261B}html[data-theme="light"],html[data-theme="light"] body{color:#14201A;background:#E8EEE9}html[data-theme="light"] body::before{background:linear-gradient(180deg,#E8EEE9 0%,#dfe8e1 100%)}html[data-theme="light"] .label,html[data-theme="light"] .nav-list a,html[data-theme="light"] .site-footer,html[data-theme="light"] .site-disclaimer{color:#2F5A46}html[data-theme="light"] .nav-list a::after{background:#2F5A46}html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible,html[data-theme="light"] .nav-list a[aria-current="page"]{color:#14201A}html[data-theme="light"] .brand{color:#14201A}html[data-theme="light"] .brand-mark,html[data-theme="light"] .footer-mark-img{filter:brightness(0) saturate(100%) invert(22%) sepia(18%) saturate(900%) hue-rotate(100deg)}html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97)}html[data-theme="light"] .skip-link:focus{background:#E8EEE9;color:#14201A}.lab-dm-wrap{width:min(720px,100%);margin:8px auto 56px}.lab-dm-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.35)}html[data-theme="light"] .lab-dm-card{background:rgba(255,255,255,.55);border-color:rgba(47,90,70,.28)}.lab-dm-title{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;color:var(--mist,#f2efe6);margin:0 0 16px}html[data-theme="light"] .lab-dm-title{color:#14201A}.lab-dm-text{margin:0 0 20px;font-size:16px;line-height:1.55;color:var(--mist,#e8eee9)}html[data-theme="light"] .lab-dm-text{color:#14201A}.lab-dm-btn{font-family:var(--sans);font-weight:500;font-size:14px;letter-spacing:.04em;border:0;border-radius:999px;padding:12px 22px;cursor:pointer;background:var(--sage);color:#121a16}html[data-theme="light"] .lab-dm-btn{background:#2F5A46;color:#F2EFE6}.lab-dm-btn:focus-visible{outline:2px solid var(--sage);outline-offset:3px}html[data-theme="light"] .lab-dm-btn:focus-visible{outline-color:#2F5A46}@media (prefers-reduced-motion:reduce){.lab-dm-btn{transition:none}}`;

function applyDocumentTheme(dark: boolean) {
  const root = document.documentElement;
  if (dark) {
    root.dataset.theme = "dark";
  } else {
    root.dataset.theme = "light";
  }
}

export default function DarkModeLab() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === "light") {
        setDark(false);
        applyDocumentTheme(false);
      } else if (stored === "dark") {
        setDark(true);
        applyDocumentTheme(true);
      } else {
        applyDocumentTheme(true);
      }
    } catch {
      applyDocumentTheme(true);
    }
  }, []);

  useEffect(() => {
    applyDocumentTheme(dark);
    try {
      localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }, [dark]);

  const toggle = useCallback(() => {
    setDark((prev) => !prev);
  }, []);

  return (
    <section data-lab="dark-mode" aria-labelledby={TITLE_ID}>
      <style>{css}</style>
      <h2 id={TITLE_ID}>Dark mode toggle</h2>
      <div className="lab-dm-wrap">
        <div className="lab-dm-card">
          <p className="lab-dm-text">
            Switch the whole showcase between the default forest palette and a light mist
            theme. Your choice is saved for the next visit.
          </p>
          <button type="button" className="lab-dm-btn" aria-pressed={dark} onClick={toggle}>
            {dark ? "Switch to light theme" : "Switch to dark theme"}
          </button>
        </div>
      </div>
    </section>
  );
}
