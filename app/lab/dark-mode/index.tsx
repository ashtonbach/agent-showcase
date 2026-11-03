"use client";
import { useCallback, useEffect, useState } from "react";

const STORAGE = "ab-theme";
const MARK_LIGHT =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 35"><path fill="#2F5A46" d="M24 2 4 33h40L24 2Zm0 9 11 18H13L24 11Z"/></svg>',
  );
const css = `
html[data-theme="light"]{background:#E8EEE9;color:#14201A}
html[data-theme="light"] body{color:#14201A}
html[data-theme="light"] body::before{background:linear-gradient(180deg,#E8EEE9 0%,#dde5df 100%)}
html[data-theme="light"] .demo-title,html[data-theme="light"] .brand{color:#14201A}
html[data-theme="light"] .label,html[data-theme="light"] .nav-list a,html[data-theme="light"] .site-footer{color:#2F5A46}
html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible{color:#14201A}
html[data-theme="light"] .site-disclaimer{color:#14201A;opacity:1}
html[data-theme="light"] .site-footer,html[data-theme="light"] .footer-mark{opacity:1}
html[data-theme="light"] .skip-link:focus{background:#E8EEE9;color:#14201A}
html[data-theme="light"] main.page [data-lab]{border-top-color:rgba(47,90,70,.22)}
html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97)}
.lab-dm{width:min(720px,100%);margin:8px auto 56px;padding:0 16px;color:var(--mist,#F2EFE6)}
html[data-theme="light"] .lab-dm{color:#14201A}
.lab-dm-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px}
html[data-theme="light"] .lab-dm-card{border-color:rgba(47,90,70,.28)}
.lab-dm-copy{margin:0;font-family:var(--sans);font-size:1rem;line-height:1.5;max-width:28rem}
.lab-dm-btn{font-family:var(--sans);font-size:15px;font-weight:500;line-height:1;padding:12px 22px;border:0;border-radius:999px;cursor:pointer;background:var(--sage,#B0CBBC);color:#121A16}
html[data-theme="light"] .lab-dm-btn{background:#2F5A46;color:#E8EEE9}
.lab-dm-btn:focus-visible{outline:2px solid var(--sage);outline-offset:2px}
html[data-theme="light"] .lab-dm-btn:focus-visible{outline-color:#2F5A46}
@media (prefers-reduced-motion:reduce){.lab-dm-btn{transition:none}}
`;

export default function DarkModeToggle() {
  const titleId = "dark-mode-title";
  const [dark, setDark] = useState(true);

  const syncTheme = useCallback((isDark: boolean) => {
    const root = document.documentElement;
    if (isDark) delete root.dataset.theme;
    else root.dataset.theme = "light";
    const marks = document.querySelectorAll<HTMLImageElement>("img.brand-mark, img.footer-mark-img");
    marks.forEach((img) => {
      if (!isDark) {
        if (!img.dataset.abOrig) img.dataset.abOrig = img.getAttribute("src") || "";
        img.src = MARK_LIGHT;
        return;
      }
      if (img.dataset.abOrig) img.src = img.dataset.abOrig;
    });
    try {
      localStorage.setItem(STORAGE, isDark ? "dark" : "light");
    } catch {
      /* ignore quota / private mode */
    }
  }, []);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE);
    } catch {
      saved = null;
    }
    const isDark = saved !== "light";
    setDark(isDark);
    syncTheme(isDark);
  }, [syncTheme]);

  const onToggle = () => {
    setDark((prev) => {
      const next = !prev;
      syncTheme(next);
      return next;
    });
  };

  return (
    <section data-lab="dark-mode" aria-labelledby={titleId}>
      <h2 id={titleId}>Dark mode toggle</h2>
      <div className="lab-dm-card">
        <p className="lab-dm-copy">
          Switch the whole showcase between the default forest look and a light mist palette. Your choice is saved for the next visit.
        </p>
        <button type="button" className="lab-dm-btn" aria-pressed={dark} onClick={onToggle}>
          {dark ? "Switch to light" : "Switch to dark"}
        </button>
      </div>
      <style>{css}</style>
    </section>
  );
}
