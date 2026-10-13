"use client";

import { useEffect, useState } from "react";

const KEY = "ab-theme";

const css = `
.lab-wrap{width:min(720px,100%);margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,.28);border-radius:16px;box-sizing:border-box}
.lab-wrap .label{font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--sage);margin:0 0 8px}
.lab-wrap h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin:0 0 16px}
.lab-row{display:flex;flex-wrap:wrap;gap:12px;align-items:center}
.lab-btn{font-family:var(--sans);font-weight:500;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;border-radius:16px;padding:12px 20px;border:1px solid rgba(176,203,188,.28);background:transparent;color:var(--mist)}
.lab-btn[aria-pressed="true"]{background:var(--sage);color:#14201A}
.lab-note{font-family:var(--sans);color:var(--mist);margin:0}
html[data-theme="light"]{background:#E8EEE9;color:#14201A}
html[data-theme="light"] body{background:#E8EEE9;color:#14201A}
html[data-theme="light"] .label,html[data-theme="light"] nav a{color:#2F5A46}
html[data-theme="light"] .lab-wrap h2,html[data-theme="light"] .lab-note,html[data-theme="light"] .lab-btn{color:#14201A}
html[data-theme="light"] .lab-btn[aria-pressed="true"]{background:#2F5A46;color:#E8EEE9}
@media (prefers-reduced-motion:reduce){.lab-btn{transition:none}}
`;

function applyTheme(theme: "dark" | "light") {
  const root = document.documentElement;
  if (theme === "light") root.dataset.theme = "light";
  else delete root.dataset.theme;
  try { localStorage.setItem(KEY, theme); } catch { /* private mode */ }
}

export default function DarkModeLab() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    let theme: "dark" | "light" = "dark";
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "light" || saved === "dark") theme = saved;
    } catch { /* private mode */ }
    applyTheme(theme);
    setDark(theme === "dark");
  }, []);

  function toggle() {
    const next = dark ? "light" : "dark";
    applyTheme(next);
    setDark(next === "dark");
  }
  return (
    <section data-lab="dark-mode" aria-labelledby="lab-theme-title" className="lab-wrap">
      <style>{css}</style>
      <p className="label">Atmosphere</p>
      <h2 id="lab-theme-title">Dark mode toggle</h2>
      <div className="lab-row">
        <button type="button" aria-pressed={dark} className="lab-btn" onClick={toggle}>
          {dark ? "Switch to light" : "Switch to dark"}
        </button>
        <p className="lab-note">{dark ? "Forest night is on." : "Mist morning is on."}</p>
      </div>
    </section>
  );
}
