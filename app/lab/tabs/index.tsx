"use client";

import { useCallback, useRef, useState } from "react";

const TABS = [
  { id: "tab-plan", panelId: "panel-plan", label: "Plan", title: "Align on the goal", body: "The coordinator sets the feature spec and timeline. Each role knows their lane before anyone writes code." },
  { id: "tab-build", panelId: "panel-build", label: "Build", title: "Ship in parallel", body: "Coder implements the lab slot while design and review run on their own tracks. The gate enforces files, build, and behavior." },
  { id: "tab-check", panelId: "panel-check", label: "Check", title: "Review and QA", body: "Reviewer reads the diff against the spec; QA signs off on layout and console. Fixes loop until the branch is merge-ready." },
];

const css = `
.lab-tabs-wrap { width: min(720px, 100%); margin: 8px auto 56px; }
.lab-tabs-card { border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; }
.lab-tabs-title { font-family: var(--serif); font-weight: 400; font-size: 30px; color: var(--mist, #F2EFE6); margin: 0 0 20px; }
.lab-tablist { display: flex; gap: 4px; margin: 0 0 20px; padding: 0; list-style: none; }
.lab-tab { font-family: var(--sans); font-size: 14px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: #E8EEE9; background: transparent; border: 1px solid transparent; border-radius: 8px; padding: 10px 16px; cursor: pointer; }
.lab-tab[aria-selected="true"] { color: #121A16; background: var(--sage); border-color: rgba(176,203,188,0.4); }
.lab-tab:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
.lab-panel-title { font-family: var(--serif); font-weight: 400; font-size: 22px; color: var(--mist, #F2EFE6); margin: 0 0 12px; }
.lab-panel-body { font-family: var(--sans); font-size: 16px; line-height: 1.55; color: #E8EEE9; margin: 0; }
@media (prefers-reduced-motion: reduce) { .lab-tab { transition: none; } }
`;

export default function LabTabs() {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = useCallback((index: number) => {
    setSelected(index);
    tabRefs.current[index]?.focus();
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        select((index + 1) % TABS.length);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        select((index - 1 + TABS.length) % TABS.length);
      }
    },
    [select]
  );

  return (
    <section data-lab="tabs" aria-labelledby="lab-tabs-heading" className="lab-tabs-wrap">
      <style>{css}</style>
      <h2 id="lab-tabs-heading" className="lab-tabs-title">How the showcase team works</h2>
      <div className="lab-tabs-card">
        <div role="tablist" aria-label="Showcase workflow steps" className="lab-tablist">
          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              ref={(el) => { tabRefs.current[i] = el; }}
              type="button"
              role="tab"
              id={tab.id}
              aria-selected={selected === i}
              aria-controls={tab.panelId}
              tabIndex={selected === i ? 0 : -1}
              className="lab-tab"
              onClick={() => setSelected(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {TABS.map((tab, i) => (
          <div
            key={tab.panelId}
            role="tabpanel"
            id={tab.panelId}
            aria-labelledby={tab.id}
            hidden={selected !== i}
          >
            <h3 className="lab-panel-title">{tab.title}</h3>
            <p className="lab-panel-body">{tab.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
