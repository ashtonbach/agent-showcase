"use client";
import { useRef, useState, type KeyboardEvent } from "react";

const TABS = [
  ["Build", "Jonah Reyes writes the change on a fresh branch and checks that it builds."],
  ["Review", "Priya Raman runs the gates on the preview: files, size, banned calls and a screenshot."],
  ["Ship", "The change merges, deploys to production, and Felix Archer signs off."],
];
const css = `
.lab-tabs { width: min(720px, 100%); margin: 8px auto 56px; }
.lab-tabs h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.2; margin: 6px 0 16px; }
.lab-tabs [role="tablist"] { display: flex; gap: 8px; border-bottom: 1px solid rgba(176, 203, 188, 0.28); }
.lab-tabs [role="tab"] { padding: 10px 16px; background: none; border: 0; border-bottom: 2px solid transparent; color: var(--sage); font: 500 13px var(--sans); letter-spacing: 0.16em; text-transform: uppercase; cursor: pointer; }
.lab-tabs [role="tab"][aria-selected="true"] { color: var(--mist); border-bottom-color: var(--sage); }
.lab-tabs [role="tabpanel"] { padding: 20px 4px; opacity: 0.9; }
`;

export default function Tabs() {
  const [sel, setSel] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent) => {
    const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    let i = d ? (sel + d + TABS.length) % TABS.length : e.key === "Home" ? 0 : e.key === "End" ? TABS.length - 1 : -1;
    if (i < 0) return;
    e.preventDefault();
    setSel(i);
    refs.current[i]?.focus();
  };
  return (
    <section data-lab="tabs" className="lab-tabs" aria-labelledby="lab-tabs-title">
      <style>{css}</style>
      <p className="label">How it works</p>
      <h2 id="lab-tabs-title">Three steps</h2>
      <div role="tablist" aria-label="How it works" onKeyDown={onKey}>
        {TABS.map(([t], i) => (
          <button
            key={t}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            type="button"
            id={`lab-tab-${i}`}
            aria-selected={sel === i}
            aria-controls={`lab-panel-${i}`}
            tabIndex={sel === i ? 0 : -1}
            onClick={() => setSel(i)}
          >
            {t}
          </button>
        ))}
      </div>
      {TABS.map(([t, body], i) => (
        <div key={t} role="tabpanel" id={`lab-panel-${i}`} aria-labelledby={`lab-tab-${i}`} hidden={sel !== i} tabIndex={0}>
          {body}
        </div>
      ))}
    </section>
  );
}
