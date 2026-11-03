"use client";
import { useCallback, useState, type KeyboardEvent } from "react";

const STEPS = [
  {
    label: "Design",
    body: "Hazel shapes Forest Mist layout and any artwork while the coder implements the lab slot in parallel from the written spec.",
  },
  {
    label: "Build",
    body: "Alder writes the client component, wires the lab import, runs SHIP for layout self-check, build, and the automated gate, then pushes the feature branch.",
  },
  {
    label: "Review",
    body: "Rowan reviews the diff and preview; Cedar signs off on QA. Fix rounds address only the returned notes until checks pass and the kit merges.",
  },
];

export default function TabsLab() {
  const [selected, setSelected] = useState(0);
  const titleId = "lab-tabs-title";
  const tabPrefix = "lab-tabs-tab";
  const panelPrefix = "lab-tabs-panel";

  const selectTab = useCallback((index: number) => {
    setSelected(index);
    const el = document.getElementById(`${tabPrefix}-${index}`);
    el?.focus();
  }, []);

  const onTabListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const delta = event.key === "ArrowRight" ? 1 : -1;
    const next = (selected + delta + STEPS.length) % STEPS.length;
    selectTab(next);
  };

  return (
    <section data-lab="tabs" aria-labelledby={titleId} className="lab-wrap">
      <h2 id={titleId} className="lab-title">
        How the showcase team works
      </h2>
      <div className="lab-card">
        <div
          role="tablist"
          aria-label="Showcase workflow steps"
          className="lab-tablist"
          onKeyDown={onTabListKeyDown}
        >
          {STEPS.map((step, index) => {
            const tabId = `${tabPrefix}-${index}`;
            const panelId = `${panelPrefix}-${index}`;
            const isSelected = selected === index;
            return (
              <button
                key={tabId}
                type="button"
                role="tab"
                id={tabId}
                className="lab-tab"
                aria-selected={isSelected}
                aria-controls={panelId}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => selectTab(index)}
              >
                <span className="lab-tab-label">{step.label}</span>
              </button>
            );
          })}
        </div>
        {STEPS.map((step, index) => {
          const tabId = `${tabPrefix}-${index}`;
          const panelId = `${panelPrefix}-${index}`;
          const isSelected = selected === index;
          return (
            <div
              key={panelId}
              role="tabpanel"
              id={panelId}
              aria-labelledby={tabId}
              className="lab-panel"
              hidden={!isSelected}
            >
              <p className="lab-step-role">{step.label}</p>
              <p className="lab-step-body">{step.body}</p>
            </div>
          );
        })}
      </div>
      <style>{`
        .lab-wrap { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #f2efe6); }
        .lab-title { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.2; margin: 0 0 20px; }
        .lab-card { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; }
        .lab-tablist { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
        .lab-tab {
          flex: 1 1 auto; min-width: 0; padding: 10px 16px; border-radius: 10px;
          border: 1px solid rgba(176, 203, 188, 0.35); background: transparent; color: inherit;
          cursor: pointer; font-family: var(--sans); font-weight: 500; font-size: 13px;
          letter-spacing: 0.16em; text-transform: uppercase;
        }
        .lab-tab[aria-selected="true"] { border-color: var(--sage); color: var(--sage); background: rgba(176, 203, 188, 0.12); }
        .lab-tab:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
        .lab-tab-label { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .lab-panel { margin: 0; }
        .lab-step-role {
          margin: 0 0 8px; font-family: var(--sans); font-weight: 500; font-size: 12px;
          letter-spacing: 0.16em; text-transform: uppercase; color: var(--sage);
        }
        .lab-step-body { margin: 0; font-size: 15px; line-height: 1.55; color: #e8eee9; }
        @media (prefers-reduced-motion: reduce) { .lab-tab { transition: none; } }
      `}</style>
    </section>
  );
}
