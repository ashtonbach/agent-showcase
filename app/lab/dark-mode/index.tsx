"use client";

import { useEffect, useState } from "react";

const KEY = "ab-theme";

const css = `
.lab-theme{width:min(720px,100%);margin:8px auto 56px;box-sizing:border-box;padding:0 16px}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;box-sizing:border-box}
.lab-theme h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;margin:8px 0 16px;color:var(--mist)}
.lab-copy{font-family:var(--sans);color:var(--mist);line-height:1.5;margin:0 0 20px}
.lab-btn{font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;background:var(--sage);color:#121A16;border:0;border-radius:12px;padding:12px 20px;cursor:pointer}
.lab-btn:focus-visible{outline:2px solid var(--sage);outline-offset:3px}
html[data-theme="light"],html[data-theme="light"] body{background:#E8EEE9;color:#14201A}
html[data-theme="light"] h1,html[data-theme="light"] h2,html[data-theme="light"] p,html[data-theme="light"] a{color:#14201A}
html[data-theme="light"] .label,html[data-theme="light"] nav a{color:#2F5A46}
html[data-theme="light"] .lab-card{border-color:rgba(47,90,70,.28);background:#F2EFE6}
`;

function applyTheme(dark: boolean) {
  const root = document.documentElement;
  if (dark) root.dataset.theme = "dark";
  else root.dataset.theme = "light";
  localStorage.setItem(KEY, dark ? "dark" : "light");
}

export default function DarkModeLab() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    const next = saved !== "light";
    setDark(next);
    applyTheme(next);
  }, []);

  function onToggle() {
    const next = !dark;
    setDark(next);
    applyTheme(next);
  }

  return (
    <section data-lab="dark-mode" aria-labelledby="lab-theme-heading" className="lab-theme">
      <style>{css}</style>
      <p className="label">Appearance</p>
      <h2 id="lab-theme-heading">Dark mode toggle</h2>
      <div className="lab-card">
        <p className="lab-copy">
          Switch the whole page between the default forest dark theme and a mist light theme. Your choice is saved on this device.
        </p>
        <button type="button" aria-pressed={dark} className="lab-btn" onClick={onToggle}>
          {dark ? "Use light theme" : "Use dark theme"}
        </button>
      </div>
    </section>
  );
}
