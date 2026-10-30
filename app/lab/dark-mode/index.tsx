"use client";

import { useCallback, useEffect, useState } from "react";

const MARK_LIGHT =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0.5 -6 593.5 420"><path fill="#2F5A46" d="M423.02 390 224 18 24.5 390h200l34.32-64H102.27L223.95 99.12 345.33 326H379.57Z"/></svg>'
  );

const themeRules = [
  'html[data-theme="light"]{--mist:#14201A;--sage:#2F5A46;--header-line:rgba(47,90,70,.22);--line:rgba(47,90,70,.18)}',
  'html[data-theme="light"],html[data-theme="light"] body{background:#E8EEE9;color:#14201A}',
  'html[data-theme="light"] body::before{background:linear-gradient(180deg,#E8EEE9,#dfe8e1)}',
  'html[data-theme="light"] .label,html[data-theme="light"] .nav-list a,html[data-theme="light"] .site-footer,html[data-theme="light"] .site-disclaimer{color:#2F5A46}',
  'html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible{color:#14201A}',
  'html[data-theme="light"] .brand{color:#14201A}',
  'html[data-theme="light"] .skip-link.label{color:#2F5A46}',
  'html[data-theme="light"] .skip-link:focus{background:#14201A;color:#E8EEE9}',
  'html[data-theme="light"] .demo-title,html[data-theme="light"] main.page [data-lab]>h2{color:#14201A!important}',
  'html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97)}',
  ".lab-dm-shell{width:min(720px,100%);margin:8px auto 56px}",
  ".lab-dm-h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 16px;color:var(--mist,#f2efe6)}",
  'html[data-theme="light"] .lab-dm-h2{color:#14201A}',
  ".lab-dm-panel{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.35)}",
  'html[data-theme="light"] .lab-dm-panel{background:rgba(255,255,255,.55);border-color:rgba(47,90,70,.28)}',
  ".lab-dm-copy{margin:0 0 18px;line-height:1.55;font-size:16px;color:var(--mist,#e8eee9)}",
  'html[data-theme="light"] .lab-dm-copy{color:#14201A}',
  ".lab-dm-switch{font-family:var(--sans);font-weight:500;font-size:14px;border:0;border-radius:999px;padding:12px 22px;cursor:pointer;background:var(--sage);color:#121a16}",
  'html[data-theme="light"] .lab-dm-switch{background:#2F5A46;color:#F2EFE6}',
  ".lab-dm-switch:focus-visible{outline:2px solid var(--sage);outline-offset:3px}",
  "@media (prefers-reduced-motion:reduce){.lab-dm-switch{transition:none}}",
];
const themeCss = themeRules.join("");

function paintMarks(isDark: boolean) {
  document.querySelectorAll<HTMLImageElement>(".brand-mark, .footer-mark-img").forEach((node) => {
    if (!node.dataset.abDefault) node.dataset.abDefault = node.getAttribute("src") ?? "";
    node.src = isDark ? node.dataset.abDefault : MARK_LIGHT;
  });
}

function writeTheme(isDark: boolean) {
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  paintMarks(isDark);
  try {
    localStorage.setItem("ab-theme", isDark ? "dark" : "light");
  } catch {
    /* ignore */
  }
}

function readInitialDark(): boolean {
  try {
    const raw = localStorage.getItem("ab-theme");
    if (raw === "light") return false;
    if (raw === "dark") return true;
  } catch {
    /* ignore */
  }
  return true;
}

export default function DarkModeLab() {
  const [dark, setDark] = useState(true);

  const apply = useCallback((next: boolean) => {
    setDark(next);
    writeTheme(next);
  }, []);

  useEffect(() => {
    apply(readInitialDark());
  }, [apply]);

  return (
    <section data-lab="dark-mode" aria-labelledby="lab-dm-title">
      <h2 id="lab-dm-title" className="lab-dm-h2">
        Dark mode toggle
      </h2>
      <style>{themeCss}</style>
      <div className="lab-dm-shell">
        <article className="lab-dm-panel">
          <p className="lab-dm-copy">
            Toggle the full page between forest dark and mist light. The setting stays on this device after reload.
          </p>
          <button type="button" className="lab-dm-switch" aria-pressed={dark} onClick={() => apply(!dark)}>
            {dark ? "Switch to light" : "Switch to dark"}
          </button>
        </article>
      </div>
    </section>
  );
}
