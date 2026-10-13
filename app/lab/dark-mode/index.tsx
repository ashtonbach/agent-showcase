"use client";
import { useEffect, useState } from "react";

const KEY = "ab-theme";

const css = `
.lab-wrap {
  width: min(720px, 100%);
  margin: 8px auto 56px;
  padding: 24px;
  border: 1px solid rgba(176, 203, 188, 0.28);
  border-radius: 16px;
  box-sizing: border-box;
}
.lab-wrap h2,
[data-lab="dark-mode"] h2 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: 30px;
  color: var(--mist);
  margin: 0 0 12px;
}
[data-lab="dark-mode"] .label {
  font-family: var(--sans);
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin: 0 0 8px;
}
.lab-copy {
  color: #E8EEE9;
  margin: 0 0 20px;
  line-height: 1.55;
}
.lab-btn {
  font-family: var(--sans);
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  background: var(--sage);
  color: #14201A;
  border: 0;
  border-radius: 16px;
  padding: 12px 20px;
  cursor: pointer;
}
@media (prefers-reduced-motion: no-preference) {
  .lab-btn { transition: opacity 0.2s ease; }
}
html[data-theme="light"],
html[data-theme="light"] body {
  background: #E8EEE9;
  color: #14201A;
}
html[data-theme="light"] .demo-title,
html[data-theme="light"] [data-lab="dark-mode"] h2,
html[data-theme="light"] .lab-copy {
  color: #14201A;
}
html[data-theme="light"] .label,
html[data-theme="light"] nav a {
  color: #2F5A46;
}
html[data-theme="light"] .lab-wrap {
  border-color: rgba(20, 32, 26, 0.2);
}
`;

function apply(dark: boolean) {
  const root = document.documentElement;
  if (dark) root.dataset.theme = "dark";
  else root.dataset.theme = "light";
  localStorage.setItem(KEY, dark ? "dark" : "light");
}

export default function Lab() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const next = localStorage.getItem(KEY) !== "light";
    setDark(next);
    apply(next);
  }, []);

  function onToggle() {
    const next = !dark;
    setDark(next);
    apply(next);
  }

  return (
    <section data-lab="dark-mode" aria-labelledby="lab-dm-h2">
      <style>{css}</style>
      <p className="label">Atmosphere</p>
      <h2 id="lab-dm-h2">Dark mode toggle</h2>
      <div className="lab-wrap">
        <p className="lab-copy">
          Switch the whole page between forest night and light mist. The choice is saved in this browser.
        </p>
        <button type="button" aria-pressed={dark} className="lab-btn" onClick={onToggle}>
          {dark ? "Use light theme" : "Use dark theme"}
        </button>
      </div>
    </section>
  );
}
