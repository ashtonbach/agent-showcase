"use client";

import { useEffect, useState } from "react";

const KEY = "ab-theme";
const DARK_MARK = "data:image/svg+xml;charset=utf-8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 20"><path fill="#2F5A46" d="M2 18 14 2 26 18H2z"/></svg>');
const css = `
.lab-theme{width:min(720px,100%);margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,0.28);border-radius:16px}
.lab-theme h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 12px;color:var(--mist)}
.lab-copy{margin:0 0 20px;color:var(--mist);line-height:1.55}
.lab-toggle{border:0;border-radius:999px;padding:10px 20px;background:var(--sage);color:#14201A;font:500 14px/1.2 var(--sans);cursor:pointer}
.lab-toggle:focus-visible{outline:2px solid var(--sage);outline-offset:3px}
@media (prefers-reduced-motion:no-preference){.lab-toggle{transition:background .2s,color .2s}}
html[data-theme="light"],html[data-theme="light"] body{background:#E8EEE9;color:#14201A}
html[data-theme="light"] header,html[data-theme="light"] header a,html[data-theme="light"] h1,html[data-theme="light"] footer,html[data-theme="light"] footer *,html[data-theme="light"] a.brand,html[data-theme="light"] a.skip-link{color:#14201A}
html[data-theme="light"] a.skip-link{background:#E8EEE9}
html[data-theme="light"] nav a{color:#2F5A46}
html[data-theme="light"] .brand-mark{content:url("${DARK_MARK}");filter:brightness(0) saturate(100%) invert(22%) sepia(18%) saturate(900%) hue-rotate(100deg)}
html[data-theme="light"] header svg,html[data-theme="light"] footer svg,html[data-theme="light"] a.brand svg{fill:#2F5A46;color:#2F5A46}
html[data-theme="light"] .lab-theme{border-color:rgba(47,90,70,0.28)}
html[data-theme="light"] .lab-theme h2,html[data-theme="light"] .lab-copy{color:#14201A}
html[data-theme="light"] .lab-toggle{background:#2F5A46;color:#E8EEE9}
`;
function readTheme(): "dark" | "light" {
  try {
    return localStorage.getItem(KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

function paintMark(theme: "dark" | "light") {
  const mark = document.querySelector<HTMLImageElement>("img.brand-mark");
  if (mark) mark.src = theme === "light" ? DARK_MARK : "/ab-mark.svg";
}

function applyTheme(theme: "dark" | "light") {
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem(KEY, theme); } catch { /* ignore */ }
  paintMark(theme);
}

export default function Lab() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const t = readTheme();
    setDark(t === "dark");
    applyTheme(t);
    const obs = new MutationObserver(() => {
      const now = document.documentElement.dataset.theme === "light" ? "light" : "dark";
      paintMark(now);
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);
  function toggle() {
    const next = dark ? "light" : "dark";
    setDark(!dark);
    applyTheme(next);
  }
  return (
    <section className="lab-theme" data-lab="dark-mode" aria-labelledby="lab-theme-h2">
      <h2 id="lab-theme-h2">Dark mode toggle</h2>
      <p className="lab-copy">Switch the whole page between the forest dark theme and a light reading theme. Your choice is saved in this browser.</p>
      <button type="button" className="lab-toggle" aria-pressed={dark} onClick={toggle}>
        {dark ? "Use light theme" : "Use dark theme"}
      </button>
      <style>{css}</style>
    </section>
  );
}
