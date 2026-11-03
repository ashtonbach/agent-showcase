"use client";
import { useCallback, useEffect, useState } from "react";
const storeKey = "ab-theme";
const heading = "theme-lab-h2";
const lightMark =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 35"><path fill="#2F5A46" d="M24 2 4 33h40L24 2Zm0 9 11 18H13L24 11Z"/></svg>',
  );

const rules = [
  'html[data-theme="light"]{--mist:#14201A;--sage:#2F5A46;--header-line:rgba(47,90,70,.22);--line:rgba(47,90,70,.18)}',
  'html[data-theme="light"],html[data-theme="light"] body{background:#E8EEE9;color:#14201A}',
  'html[data-theme="light"] body::before{background:linear-gradient(180deg,#E8EEE9,#dfe8e1)}',
  'html[data-theme="light"] .demo-title{color:#14201A}',
  'html[data-theme="light"] .label,html[data-theme="light"] .nav-list a,html[data-theme="light"] .site-footer,html[data-theme="light"] .site-disclaimer{color:#2F5A46}',
  'html[data-theme="light"] .site-footer,html[data-theme="light"] .footer-mark,html[data-theme="light"] .site-disclaimer{opacity:1}',
  'html[data-theme="light"] .site-disclaimer{color:#14201A}',
  'html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible{color:#14201A}',
  'html[data-theme="light"] .brand{color:#14201A}',
  'html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97)}',
  ".lab-wrap{width:min(720px,100%);margin:8px auto 56px}",
  ".lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.35)}",
  'html[data-theme="light"] .lab-card{background:rgba(255,255,255,.55);border-color:rgba(47,90,70,.28)}',
  ".lab-lead{margin:0 0 18px;line-height:1.55;font-size:16px;color:var(--muted)}",
  'html[data-theme="light"] .lab-lead{color:#14201A}',
  ".lab-toggle{font-family:var(--sans);font-weight:500;font-size:14px;border:0;border-radius:999px;padding:12px 22px;cursor:pointer;background:var(--sage);color:#121a16}",
  'html[data-theme="light"] .lab-toggle{background:#2F5A46;color:#F2EFE6}',
  ".lab-toggle:focus-visible{outline:2px solid var(--sage);outline-offset:3px}",
  "@media (prefers-reduced-motion:reduce){.lab-toggle{transition:none}}",
];
const cssText = rules.join("");

export default function ThemeToggleLab() {
  const [dark, setDark] = useState(true);

  const commit = useCallback((nextDark: boolean) => {
    const root = document.documentElement;
    root.dataset.theme = nextDark ? "dark" : "light";
    document.querySelectorAll<HTMLImageElement>(".brand-mark, .footer-mark-img").forEach((img) => {
      if (!img.dataset.abOrig) img.dataset.abOrig = img.getAttribute("src") ?? "";
      img.src = nextDark ? img.dataset.abOrig : lightMark;
    });
    try {
      localStorage.setItem(storeKey, nextDark ? "dark" : "light");
    } catch {}
  }, []);

  useEffect(() => {
    let stored = "dark";
    try {
      const v = localStorage.getItem(storeKey);
      if (v === "light" || v === "dark") stored = v;
    } catch {}
    setDark(stored === "dark");
    commit(stored === "dark");
  }, [commit]);

  return (
    <section data-lab="dark-mode" aria-labelledby={heading}>
      <style>{cssText}</style>
      <h2 id={heading}>Dark mode toggle</h2>
      <div className="lab-wrap">
        <div className="lab-card">
          <p className="lab-lead">
            Pick light or dark for the entire showcase; ab-theme in localStorage restores it on reload.
          </p>
          <button
            type="button"
            className="lab-toggle"
            aria-pressed={dark}
            onClick={() => setDark((was) => { const n = !was; commit(n); return n; })}
          >
            {dark ? "Switch to light" : "Switch to dark"}
          </button>
        </div>
      </div>
    </section>
  );
}
