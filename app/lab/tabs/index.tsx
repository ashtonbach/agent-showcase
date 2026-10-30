"use client";
import { useCallback, useRef, useState } from "react";

const STEPS = [
  {
    tab: "Design",
    body:
      "Hazel shapes each feature’s layout, typography, and Forest Mist styling so the lab slot matches the demo brand.",
  },
  {
    tab: "Build",
    body:
      "Alder writes the client component from the spec, keeps the diff small, and ships through the automated gate on the feature branch.",
  },
  {
    tab: "Review",
    body:
      "Rowan reviews the pull request and Cedar runs QA smoke checks; the coordinator merges once checks and review pass.",
  },
];

export default function TabsLab() {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const select = useCallback((index: number, moveFocus = false) => {
    setSelected(index);
    if (moveFocus) tabRefs.current[index]?.focus();
  }, []);

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      select((index + 1) % STEPS.length, true);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      select((index + STEPS.length - 1) % STEPS.length, true);
    }
  };

  return (
    <section data-lab="tabs" aria-labelledby="lab-tabs-title">
      <style>{`
        [data-lab="tabs"] { width: min(720px, 100%); margin: 8px auto 56px; }
        [data-lab="tabs"] .lab-card {
          border: 1px solid rgba(176, 203, 188, 0.28);
          border-radius: 16px;
          padding: 24px;
          background: rgba(18, 26, 22, 0.35);
        }
        [data-lab="tabs"] [role="tablist"] {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 0 0 20px;
          padding: 0;
          list-style: none;
        }
        [data-lab="tabs"] [role="tab"] {
          font-family: var(--sans);
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-size: 11px;
          padding: 10px 14px;
          border-radius: 999px;
          border: 1px solid rgba(176, 203, 188, 0.28);
          background: transparent;
          color: var(--mist);
          cursor: pointer;
        }
        [data-lab="tabs"] [role="tab"][aria-selected="true"] {
          background: var(--sage);
          color: #121a16;
        }
        [data-lab="tabs"] [role="tab"]:focus-visible {
          outline: 2px solid var(--sage);
          outline-offset: 2px;
        }
        [data-lab="tabs"] [role="tabpanel"] {
          color: var(--mist);
          line-height: 1.55;
          margin: 0;
        }
        @media (prefers-reduced-motion: reduce) {
          [data-lab="tabs"] [role="tab"] { transition: none; }
        }
      `}</style>
      <h2 id="lab-tabs-title">How the showcase team works</h2>
      <div className="lab-card">
        <div role="tablist" aria-label="Showcase team steps">
          {STEPS.map((step, index) => {
            const tabId = `lab-tabs-tab-${index}`;
            const panelId = `lab-tabs-panel-${index}`;
            const isSelected = selected === index;
            return (
              <button
                key={tabId}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={tabId}
                aria-selected={isSelected}
                aria-controls={panelId}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => select(index)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
              >
                {step.tab}
              </button>
            );
          })}
        </div>
        {STEPS.map((step, index) => {
          const tabId = `lab-tabs-tab-${index}`;
          const panelId = `lab-tabs-panel-${index}`;
          const isSelected = selected === index;
          return (
            <div
              key={panelId}
              role="tabpanel"
              id={panelId}
              aria-labelledby={tabId}
              hidden={!isSelected}
            >
              <p>{step.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
