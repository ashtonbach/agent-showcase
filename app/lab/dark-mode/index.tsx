"use client";

import { useEffect, useState } from "react";

const KEY = "ab-theme";
const DARK_MARK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 20'%3E%3Cpath fill='%2314201A' d='M3 18L14 2l11 16h-7l-4-7-4 7z'/%3E%3C/svg%3E";

const css = `
.lab-box{width:min(720px,100%);margin:8px auto 56px}
.lab-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px}
.lab-copy{margin:0 0 20px;color:var(--mist);max-width:40em}
.lab-toggle{border:0;border-radius:999px;padding:10px 22px;background:var(--sage);color:#14201A;font:500 15px var(--sans);cursor:pointer}
.lab-role{margin:16px 0 0;font:500 12px var(--sans);letter-spacing:0.16em;text-transform:uppercase;color:var(--sage)}
.site-footer{opacity:1;color:var(--sage)}
.site-disclaimer{color:var(--sage)}
html[data-theme="light"]{background:#E8EEE9}
html[data-theme="light"] body{color:#14201A;background:#E8EEE9}
html[data-theme="light"] body::before{background:#E8EEE9}
html[data-theme="light"] .brand,html[data-theme="light"] .brand-word,html[data-theme="light"] .demo-title,html[data-theme="light"] h1,html[data-theme="light"] h2{color:#14201A}
html[data-theme="light"] .label,html[data-theme="light"] .nav-list a,html[data-theme="light"] .site-footer,html[data-theme="light"] .site-disclaimer,html[data-theme="light"] .lab-role{color:#2F5A46}
html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible{color:#14201A}
html[data-theme="light"] .nav-list a::after{background:#2F5A46}
html[data-theme="light"] .site-header.is-scrolled{background:#E8EEE9}
html[data-theme="light"] .skip-link:focus{background:#E8EEE9;color:#14201A}
html[data-theme="light"] .brand-mark{content:url("${DARK_MARK}");filter:brightness(0)}
html[data-theme="light"] .lab-copy{color:#14201A}
html[data-theme="light"] .lab-toggle{background:#2F5A46;color:#E8EEE9}
html[data-theme="light"] .lab-card{border-color:rgba(47,90,70,0.28);background:#F3F6F3}
html[data-theme="light"] main.page [data-lab]{border-top-color:rgba(47,90,70,0.22)}
@media (prefers-reduced-motion:reduce){.lab-toggle{transition:none}}
`;

function paintMark(dark: boolean) {
  const mark = document.querySelector("img.brand-mark") as HTMLImageElement | null;
  if (mark) mark.src = dark ? "/ab-mark.svg" : DARK_MARK;
}

function applyTheme(dark: boolean) {
  const root = document.documentElement;
  if (dark) delete root.dataset.theme;
  else root.dataset.theme = "light";
  paintMark(dark);
}

export default function DarkModeLab() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const next = localStorage.getItem(KEY) !== "light";
    setDark(next);
    applyTheme(next);
    const root = document.documentElement;
    const obs = new MutationObserver(() => {
      const isDark = root.dataset.theme !== "light";
      setDark(isDark);
      paintMark(isDark);
    });
    obs.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    applyTheme(next);
    localStorage.setItem(KEY, next ? "dark" : "light");
  }

  return (
    <section data-lab="dark-mode" aria-labelledby="lab-theme-title">
      <style>{css}</style>
      <h2 id="lab-theme-title">Choose a theme</h2>
      <div className="lab-box">
        <div className="lab-card">
          <p className="lab-copy">
            Switch the whole page between the default forest night and a light mist day. Your choice is stored on this device.
          </p>
          <button type="button" aria-pressed={dark} className="lab-toggle" onClick={toggle}>
            {dark ? "Use light theme" : "Use dark theme"}
          </button>
          <p className="lab-role">{dark ? "Night" : "Day"}</p>
        </div>
      </div>
    </section>
  );
}
