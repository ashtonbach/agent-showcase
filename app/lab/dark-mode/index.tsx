"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "ab-theme";

const css = `
.lab-wrap{width:min(720px,100%);margin:8px auto 56px}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:20px}
.lab-desc{margin:0;line-height:1.6;color:var(--mist)}
.lab-toggle{align-self:flex-start;border:0;border-radius:999px;padding:12px 22px;font-family:var(--sans);font-size:var(--fs-body);font-weight:500;cursor:pointer;background:var(--sage);color:#14201A}
.lab-toggle:focus-visible{outline:2px solid var(--sage);outline-offset:3px}
html[data-theme="light"]{background:#E8EEE9}
html[data-theme="light"] body{color:#14201A}
html[data-theme="light"] body::before{background:linear-gradient(180deg,#E8EEE9 0%,#dfe8e1 100%)}
html[data-theme="light"] .demo-title,html[data-theme="light"] .brand{color:#14201A}
html[data-theme="light"] .label,html[data-theme="light"] .nav-list a{color:#2F5A46}
html[data-theme="light"] .nav-list a::after{background:#2F5A46}
html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible{color:#14201A}
html[data-theme="light"] .site-footer{color:#2F5A46;opacity:1}
html[data-theme="light"] .site-disclaimer{color:#2F5A46;opacity:.85}
html[data-theme="light"] .site-header{border-bottom-color:rgba(47,90,70,.22)}
html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97)}
html[data-theme="light"] main.page [data-lab]{border-top-color:rgba(47,90,70,.18)}
html[data-theme="light"] main.page [data-lab]>h2{color:#14201A}
html[data-theme="light"] .lab-desc{color:#14201A}
html[data-theme="light"] .lab-card{border-color:rgba(47,90,70,.28)}
html[data-theme="light"] .lab-toggle{background:#2F5A46;color:#E8EEE9}
html[data-theme="light"] .lab-toggle:focus-visible{outline-color:#2F5A46}
html[data-theme="light"] .brand-mark,html[data-theme="light"] .footer-mark-img{filter:brightness(0) saturate(100%) invert(22%) sepia(18%) saturate(900%) hue-rotate(100deg)}
html[data-theme="light"] .skip-link:focus{background:#E8EEE9;color:#14201A}
@media (prefers-reduced-motion:reduce){.lab-toggle{transition:none}}
`;

function persist(theme: "dark" | "light") {
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* ignore */
  }
}

function applyDark(isDark: boolean) {
  if (isDark) delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = "light";
  persist(isDark ? "dark" : "light");
}

export default function DarkModeLab() {
  const [dark, setDark] = useState(true);

  const toggle = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      applyDark(next);
      return next;
    });
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "light") {
        setDark(false);
        document.documentElement.dataset.theme = "light";
      } else if (saved === "dark") {
        setDark(true);
        delete document.documentElement.dataset.theme;
      }
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <section data-lab="dark-mode" aria-labelledby="lab-dark-mode-title">
      <style>{css}</style>
      <h2 id="lab-dark-mode-title">Dark mode toggle</h2>
      <div className="lab-wrap">
        <div className="lab-card">
          <p className="lab-desc">
            Switch the whole page between the default forest look and a light palette. Your
            choice is saved in this browser.
          </p>
          <button type="button" className="lab-toggle" aria-pressed={dark} onClick={toggle}>
            {dark ? "Switch to light" : "Switch to dark"}
          </button>
        </div>
      </div>
    </section>
  );
}
