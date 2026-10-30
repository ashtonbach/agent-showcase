"use client";

import { useCallback, useId, useState } from "react";

const STEPS = [
  {
    title: "Design",
    body: "Hazel sets the Forest Mist look and any artwork before the build lands.",
  },
  {
    title: "Build",
    body: "Alder writes the lab feature in code, runs the gate, and ships the branch.",
  },
  {
    title: "Review and QA",
    body: "Rowan checks the PR; Cedar signs off on behavior before the coordinator merges.",
  },
] as const;

export default function TabsLab() {
  const baseId = useId().replace(/:/g, "");
  const [selected, setSelected] = useState(0);

  const select = useCallback((index: number) => {
    setSelected((index + STEPS.length) % STEPS.length);
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        select(selected + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        select(selected - 1);
      }
    },
    [select, selected]
  );

  return (
    <section
      data-lab="tabs"
      aria-labelledby={`${baseId}-heading`}
      className="lab-wrap"
    >
      <h2 id={`${baseId}-heading`} className="lab-title">
        How the showcase team works
      </h2>
      <div className="lab-card">
        <div
          role="tablist"
          aria-label="Showcase workflow steps"
          className="lab-tablist"
        >
          {STEPS.map((step, index) => {
            const tabId = `${baseId}-tab-${index}`;
            const panelId = `${baseId}-panel-${index}`;
            const isSelected = selected === index;
            return (
              <button
                key={tabId}
                type="button"
                role="tab"
                id={tabId}
                aria-selected={isSelected}
                aria-controls={panelId}
                tabIndex={isSelected ? 0 : -1}
                className={`lab-tab${isSelected ? " lab-tab-active" : ""}`}
                onClick={() => select(index)}
                onKeyDown={onKeyDown}
              >
                {step.title}
              </button>
            );
          })}
        </div>
        {STEPS.map((step, index) => {
          const tabId = `${baseId}-tab-${index}`;
          const panelId = `${baseId}-panel-${index}`;
          const isSelected = selected === index;
          return (
            <div
              key={panelId}
              role="tabpanel"
              id={panelId}
              aria-labelledby={tabId}
              hidden={!isSelected}
              className="lab-panel"
            >
              <p className="lab-panel-text">{step.body}</p>
            </div>
          );
        })}
      </div>
      <style>{`
        .lab-wrap { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #F2EFE6); }
        .lab-title { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.2; margin: 0 0 20px; }
        .lab-card {
          border: 1px solid rgba(176, 203, 188, 0.28);
          border-radius: 16px;
          padding: 24px;
          background: rgba(18, 26, 22, 0.35);
        }
        .lab-tablist { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
        .lab-tab {
          font-family: var(--sans);
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-size: 11px;
          padding: 10px 14px;
          border-radius: 999px;
          border: 1px solid rgba(176, 203, 188, 0.28);
          background: transparent;
          color: var(--mist, #E8EEE9);
          cursor: pointer;
        }
        .lab-tab-active {
          background: var(--sage);
          color: #121A16;
          border-color: transparent;
        }
        .lab-tab:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
        .lab-panel-text { margin: 0; line-height: 1.6; font-size: 16px; }
        @media (prefers-reduced-motion: reduce) {
          .lab-tab { transition: none; }
        }
      `}</style>
    </section>
  );
}
