"use client";
import { useEffect, useState } from "react";

const KEY = "ab-theme";
const css = `
html[data-theme="light"], html[data-theme="light"] body { background: #E8EEE9; color: #14201A; }
html[data-theme="light"] .label, html[data-theme="light"] .nav-list a { color: #2F5A46; }
html[data-theme="light"] .brand { color: #14201A; }
html[data-theme="light"] .site-header { border-bottom-color: rgba(20, 32, 26, 0.18); }
.lab-theme { width: min(720px, 100%); margin: 8px auto 56px; padding: 28px; border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; display: flex; gap: 20px; align-items: center; justify-content: space-between; flex-wrap: wrap; }
html[data-theme="light"] .lab-theme { border-color: rgba(20, 32, 26, 0.2); }
.lab-theme h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.2; }
.lab-theme p { margin-top: 6px; opacity: 0.85; }
.lab-theme button { font: 500 13px var(--sans); letter-spacing: 0.16em; text-transform: uppercase; padding: 12px 20px; border-radius: 999px; border: 1px solid currentColor; background: transparent; color: inherit; cursor: pointer; }
`;
export default function DarkModeToggle() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const saved = window.localStorage.getItem(KEY);
    if (saved === "light") setDark(false);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    window.localStorage.setItem(KEY, next ? "dark" : "light");
  };
  return (
    <section data-lab="dark-mode" className="lab-theme" aria-labelledby="lab-theme-title">
      <style>{css}</style>
      <div>
        <p className="label">Theme</p>
        <h2 id="lab-theme-title">Forest or Mist</h2>
        <p>Switch the whole page between the dark and light palettes. Your choice is remembered.</p>
      </div>
      <button type="button" aria-pressed={dark} onClick={toggle}>
        {dark ? "Dark mode: on" : "Dark mode: off"}
      </button>
    </section>
  );
}
