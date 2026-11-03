"use client";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "ab-theme";
const LIGHT_MARK_SRC =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 594 426"><path fill="#2F5A46" fill-rule="evenodd" d="M423.02 390 224 18 24.5 390h200l34.32-64H102.27L223.95 99.12 345.33 326H379.57 390H423.02z"/></svg>'
  );

const css = `
html[data-theme="light"]{background:#E8EEE9}
html[data-theme="light"] body{color:#14201A}
html[data-theme="light"] body::before{background:linear-gradient(180deg,#E8EEE9 0%,#dde5df 100%)}
html[data-theme="light"] .brand{color:#14201A}
html[data-theme="light"] .demo-title{color:#14201A}
html[data-theme="light"] .nav-list a{color:#2F5A46}
html[data-theme="light"] .nav-list a:hover,
html[data-theme="light"] .nav-list a:focus-visible{color:#14201A}
html[data-theme="light"] .site-footer{color:#2F5A46;opacity:1}
html[data-theme="light"] .site-disclaimer{color:#2F5A46;opacity:.88}
html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97)}
html[data-theme="light"] main.page [data-lab]{border-top-color:rgba(47,90,70,.22)}
.lab-dm{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6)}
.lab-dm-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;display:flex;flex-direction:column;align-items:flex-start;gap:16px}
html[data-theme="light"] .lab-dm{color:#14201A}
html[data-theme="light"] .lab-dm-card{border-color:rgba(47,90,70,.28)}
.lab-dm-copy{margin:0;font-family:var(--sans);line-height:1.55;max-width:52ch}
.lab-dm-btn{font-family:var(--sans);font-weight:500;font-size:15px;border:0;border-radius:999px;padding:12px 22px;cursor:pointer;background:var(--sage,#B0CBBC);color:#121A16}
html[data-theme="light"] .lab-dm-btn{background:#2F5A46;color:#E8EEE9}
.lab-dm-btn:focus-visible{outline:2px solid var(--sage);outline-offset:3px}
html[data-theme="light"] .lab-dm-btn:focus-visible{outline-color:#2F5A46}
@media (prefers-reduced-motion:reduce){.lab-dm-btn{transition:none}}
`;

function syncMarks(isDark: boolean) {
  document.querySelectorAll<HTMLImageElement>("img.brand-mark, img.footer-mark-img").forEach((img) => {
    if (!img.dataset.abOrig) img.dataset.abOrig = img.getAttribute("src") || "";
    img.src = isDark ? img.dataset.abOrig : LIGHT_MARK_SRC;
  });
}

function applyTheme(isDark: boolean) {
  const root = document.documentElement;
  if (isDark) root.dataset.theme = "dark";
  else root.dataset.theme = "light";
  syncMarks(isDark);
  try {
    localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
  } catch {
    /* ignore */
  }
}

export default function DarkModeToggle() {
  const [dark, setDark] = useState(true);
  const toggle = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      applyTheme(next);
      return next;
    });
  }, []);

  useEffect(() => {
    let isDark = true;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light") isDark = false;
      else if (saved === "dark") isDark = true;
    } catch {
      /* ignore */
    }
    setDark(isDark);
    applyTheme(isDark);
  }, []);

  return (
    <section data-lab="dark-mode" aria-labelledby="dm-heading">
      <h2 id="dm-heading">Theme</h2>
      <div className="lab-dm">
        <div className="lab-dm-card">
          <p className="lab-dm-copy">
            Switch the whole page between the default forest look and a light mist palette. Your choice is saved in this browser.
          </p>
          <button type="button" className="lab-dm-btn" aria-pressed={dark} onClick={toggle}>
            {dark ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </div>
      <style>{css}</style>
    </section>
  );
}
