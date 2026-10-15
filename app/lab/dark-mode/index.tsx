"use client";
import { useEffect, useState } from "react";

const KEY = "ab-theme";
const LIGHT_MARK =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 20"><path fill="#2F5A46" d="M2 18 14 1l12 17h-5L14 8 7 18H2z"/></svg>'
  );

const css = `
.lab-card{width:min(720px,100%);margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,.28);border-radius:16px}
.lab-dm-h{color:var(--mist)}
.lab-copy{margin:0 0 20px;color:var(--mist);line-height:1.55;max-width:52ch}
.lab-btn{border:0;border-radius:999px;padding:10px 22px;background:var(--sage);color:#14201A;font:500 14px/1.3 var(--sans);cursor:pointer}
.lab-btn:focus-visible{outline:2px solid var(--sage);outline-offset:3px}
.site-disclaimer{color:var(--sage)}
html[data-theme="light"]{background:#E8EEE9;color:#14201A}
html[data-theme="light"] body{background:#E8EEE9;color:#14201A}
html[data-theme="light"] body::before{background:#E8EEE9}
html[data-theme="light"] .brand,html[data-theme="light"] .brand-word,html[data-theme="light"] .demo-title,html[data-theme="light"] .lab-dm-h{color:#14201A}
html[data-theme="light"] .label,html[data-theme="light"] .nav-list a,html[data-theme="light"] .site-footer{color:#2F5A46;opacity:1}
html[data-theme="light"] .nav-list a::after{background:#2F5A46}
html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible{color:#14201A}
html[data-theme="light"] .site-disclaimer,html[data-theme="light"] .site-footer span{color:#2F5A46}
html[data-theme="light"] .lab-copy{color:#14201A}
html[data-theme="light"] .lab-card{border-color:rgba(47,90,70,.28)}
html[data-theme="light"] .lab-btn{border:0;background:#2F5A46;color:#F2EFE6}
html[data-theme="light"] .lab-btn:focus-visible{outline-color:#2F5A46}
html[data-theme="light"] .brand-mark{content:url("${LIGHT_MARK}");filter:brightness(0) saturate(100%) invert(22%) sepia(18%) saturate(900%) hue-rotate(100deg)}
html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97);border-color:rgba(47,90,70,.18)}
html[data-theme="light"] .skip-link:focus{background:#E8EEE9;color:#14201A}
html[data-theme="light"] :focus-visible{outline-color:#2F5A46}
html[data-theme="light"] main.page [data-lab]{border-top-color:rgba(47,90,70,.18)}
@media (prefers-reduced-motion:reduce){.lab-btn,.site-header{transition:none;animation:none}}
`;

function applyTheme(dark: boolean) {
  const root = document.documentElement;
  if (dark) delete root.dataset.theme;
  else root.dataset.theme = "light";
  localStorage.setItem(KEY, dark ? "dark" : "light");
  const mark = document.querySelector("img.brand-mark");
  if (mark instanceof HTMLImageElement) mark.src = dark ? "/ab-mark.svg" : LIGHT_MARK;
}

export default function DarkModeLab() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const next = localStorage.getItem(KEY) !== "light";
    setDark(next);
    applyTheme(next);
  }, []);
  function onToggle() {
    const next = !dark;
    setDark(next);
    applyTheme(next);
  }

  return (
    <section data-lab="dark-mode" aria-labelledby="lab-dm-h">
      <style>{css}</style>
      <h2 id="lab-dm-h" className="lab-dm-h">Dark mode toggle</h2>
      <div className="lab-card">
        <p className="lab-copy">Switch the whole page between the default forest night and a light mist theme. Your choice is saved on this device.</p>
        <button type="button" className="lab-btn" aria-pressed={dark} onClick={onToggle}>
          {dark ? "Switch to light" : "Switch to dark"}
        </button>
      </div>
    </section>
  );
}
