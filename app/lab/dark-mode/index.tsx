"use client";

import { useEffect, useState } from "react";

const css = `
.lab-theme{width:min(720px,100%);max-width:100%;margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,0.28);border-radius:16px;box-sizing:border-box}
.lab-theme h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist,#F2EFE6);margin:0 0 16px}
.lab-copy{color:var(--mist,#E8EEE9);line-height:1.55;margin:0 0 20px}
.lab-btn{font-family:var(--sans);font-weight:500;letter-spacing:0.16em;text-transform:uppercase;background:var(--sage,#B0CBBC);color:#14201A;border:0;border-radius:999px;padding:12px 20px;cursor:pointer}
.lab-btn:focus-visible{outline:2px solid var(--sage,#B0CBBC);outline-offset:3px}
@media (prefers-reduced-motion:reduce){.lab-btn{transition:none}}
html[data-theme="light"],html[data-theme="light"] body{background:#E8EEE9;color:#14201A}
html[data-theme="light"] .label,html[data-theme="light"] nav a,html[data-theme="light"] a{color:#2F5A46}
html[data-theme="light"] .demo-title,html[data-theme="light"] h1,html[data-theme="light"] .lab-theme h2,html[data-theme="light"] .lab-copy{color:#14201A}
html[data-theme="light"] .lab-theme{border-color:rgba(47,90,70,0.28)}
`;

function applyTheme(dark: boolean) {
  const root = document.documentElement;
  if (dark) {
    root.dataset.theme = "dark";
    localStorage.setItem("ab-theme", "dark");
  } else {
    root.dataset.theme = "light";
    localStorage.setItem("ab-theme", "light");
  }
}

export default function Lab() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("ab-theme");
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
    <section data-lab="dark-mode" aria-labelledby="lab-theme-title" className="lab-theme">
      <style>{css}</style>
      <p className="label">Display</p>
      <h2 id="lab-theme-title">Dark mode toggle</h2>
      <p className="lab-copy">
        Switch the whole page between the default forest night and a light mist. Your choice is saved locally and restored on reload.
      </p>
      <button type="button" aria-pressed={dark} className="lab-btn" onClick={onToggle}>
        {dark ? "Use light theme" : "Use dark theme"}
      </button>
    </section>
  );
}

