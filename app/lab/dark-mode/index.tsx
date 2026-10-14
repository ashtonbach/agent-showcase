"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "ab-theme";

const css = `
.lab-wrap{width:min(720px,100%);margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,0.28);border-radius:16px;box-sizing:border-box}
.lab-wrap .label{font-family:var(--sans);font-weight:500;letter-spacing:0.16em;text-transform:uppercase;color:var(--sage);margin:0 0 8px}
.lab-wrap h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin:0 0 16px}
.lab-copy{color:var(--mist);margin:0 0 20px;line-height:1.5}
.lab-toggle{font-family:var(--sans);font-weight:500;letter-spacing:0.16em;text-transform:uppercase;background:var(--sage);color:#121A16;border:0;border-radius:16px;padding:12px 20px;cursor:pointer}
@media (prefers-reduced-motion:reduce){.lab-toggle{transition:none}}
html[data-theme="light"],html[data-theme="light"] body{background:#E8EEE9;color:#14201A}
html[data-theme="light"] h1,html[data-theme="light"] .demo-title,html[data-theme="light"] header,html[data-theme="light"] footer{color:#14201A}
html[data-theme="light"] .label,html[data-theme="light"] nav a{color:#2F5A46}
html[data-theme="light"] .lab-wrap h2,html[data-theme="light"] .lab-copy{color:#14201A}
`;

function applyTheme(theme: "dark" | "light") {
  const root = document.documentElement;
  if (theme === "light") root.dataset.theme = "light";
  else root.dataset.theme = "dark";
  localStorage.setItem(THEME_KEY, theme);
}

export default function DarkModeLab() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);
    const next = saved === "light" ? "light" : "dark";
    setDark(next === "dark");
    applyTheme(next);
  }, []);

  function toggle() {
    const next = dark ? "light" : "dark";
    setDark(!dark);
    applyTheme(next);
  }

  return (
    <section data-lab="dark-mode" aria-labelledby="lab-theme-title" className="lab-wrap">
      <style>{css}</style>
      <p className="label">Appearance</p>
      <h2 id="lab-theme-title">Dark mode toggle</h2>
      <p className="lab-copy">Switch the whole page between the default forest night and a light mist. Your choice is saved on this device.</p>
      <button type="button" aria-pressed={dark} className="lab-toggle" onClick={toggle}>
        {dark ? "Switch to light" : "Switch to dark"}
      </button>
    </section>
  );
}
