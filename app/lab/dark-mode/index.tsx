"use client";
import { useCallback, useEffect, useState } from "react";

const KEY = "ab-theme";
const MARK_LIGHT =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 35"><path fill="#2F5A46" d="M6 29V6h8.2l7.3 11.5L29 6H37v23h-6.5V14.8L22.5 29h-5.4L11.5 14.8V29H6z"/></svg>',
  );

function recolorMarks(light: boolean) {
  document.querySelectorAll<HTMLImageElement>(".brand-mark,.footer-mark-img").forEach((img) => {
    if (!img.dataset.abOrig) img.dataset.abOrig = img.currentSrc || img.src;
    img.src = light ? MARK_LIGHT : img.dataset.abOrig;
  });
}

function syncTheme(dark: boolean) {
  const root = document.documentElement;
  if (dark) root.dataset.theme = "dark";
  else root.dataset.theme = "light";
  recolorMarks(!dark);
  try {
    localStorage.setItem(KEY, dark ? "dark" : "light");
  } catch {
    /* ignore */
  }
}

const css = `
html[data-theme="light"]{background:#E8EEE9}
html[data-theme="light"] body{color:#14201A}
html[data-theme="light"] body::before{background:linear-gradient(180deg,#E8EEE9 0%,#dde5df 100%)}
html[data-theme="light"] .demo-title,html[data-theme="light"] main.page [data-lab]>h2{color:#14201A}
html[data-theme="light"] .brand{color:#14201A}
html[data-theme="light"] .nav-list a{color:#2F5A46}
html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible{color:#14201A}
html[data-theme="light"] .nav-list a::after{background:#2F5A46}
html[data-theme="light"] .site-footer{color:#2F5A46;opacity:1}
html[data-theme="light"] .site-disclaimer{color:#2F5A46}
html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97)}
html[data-theme="light"] main.page [data-lab]{border-top-color:rgba(47,90,70,.22)}
.lab-dm{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6)}
html[data-theme="light"] .lab-dm{color:#14201A}
.lab-dm-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px}
html[data-theme="light"] .lab-dm-card{border-color:rgba(47,90,70,.28)}
.lab-dm-p{margin:0 0 20px;font-family:var(--sans);line-height:1.55;color:inherit}
.lab-dm-btn{display:inline-block;font-family:var(--sans);font-weight:500;font-size:15px;line-height:1.2;padding:12px 22px;border:0;border-radius:999px;cursor:pointer;background:var(--sage);color:#121A16}
html[data-theme="light"] .lab-dm-btn{background:#2F5A46;color:#E8EEE9}
.lab-dm-btn:focus-visible{outline:2px solid var(--sage);outline-offset:3px}
html[data-theme="light"] .lab-dm-btn:focus-visible{outline-color:#2F5A46}
@media (prefers-reduced-motion:reduce){.lab-dm-btn{transition:none}}
`;

export default function DarkModeLab() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    let isDark = true;
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "light") isDark = false;
      else if (saved === "dark") isDark = true;
    } catch {
      /* ignore */
    }
    setDark(isDark);
    syncTheme(isDark);
  }, []);

  const onToggle = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      syncTheme(next);
      return next;
    });
  }, []);

  return (
    <section data-lab="dark-mode" aria-labelledby="lab-dm-h2">
      <h2 id="lab-dm-h2">Dark mode toggle</h2>
      <div className="lab-dm">
        <div className="lab-dm-card">
          <p className="lab-dm-p">
            Switch the whole page between the default Forest Mist look and a light Mist palette. Your choice is saved in this browser.
          </p>
          <button type="button" className="lab-dm-btn" aria-pressed={dark} onClick={onToggle}>
            {dark ? "Switch to light theme" : "Switch to dark theme"}
          </button>
        </div>
      </div>
      <style>{css}</style>
    </section>
  );
}
