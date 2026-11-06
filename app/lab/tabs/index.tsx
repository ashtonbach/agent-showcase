"use client";

import { useCallback, useRef, useState, type KeyboardEvent } from "react";

const STEPS = [
  {
    id: "coordination",
    title: "Coordinator",
    body: "The coordinator sets the spec and timebox so each specialist agent can ship one small UI slice without blocking the rest of the showcase run.",
  },
  {
    id: "handoff",
    title: "Handoffs",
    body: "Coder builds the lab slot, then hands off to the reviewer; QA exercises the preview; fixes loop only on the notes returned until checks pass.",
  },
  {
    id: "gate",
    title: "Gate",
    body: "SHIP runs layout checks at two widths, production build, and a gate script on allowed files and banned APIs before the branch is ready to merge.",
  },
] as const;

const css = `
.lab-tabs { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #f2efe6); }
.lab-tabs-card {
  border: 1px solid rgba(176, 203, 188, 0.28);
  border-radius: 16px;
  padding: 24px;
  background: rgba(18, 26, 22, 0.45);
}
.lab-tabs h2 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: 30px;
  color: var(--mist, #f2efe6);
  margin: 0 0 16px;
}
.lab-tablist {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0 0 20px;
  padding: 0;
  list-style: none;
}
.lab-tab {
  font-family: var(--sans);
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #e8eee9;
  background: rgba(22, 32, 26, 0.6);
  border: 1px solid rgba(176, 203, 188, 0.35);
  border-radius: 999px;
  padding: 10px 14px;
  cursor: pointer;
  transition: border-color 0.18s ease, background 0.18s ease;
}
.lab-tab[aria-selected="true"] {
  border-color: var(--sage);
  background: rgba(176, 203, 188, 0.16);
  color: var(--mist, #f2efe6);
}
.lab-tab:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
.lab-tabpanel {
  font-family: var(--sans);
  font-size: 15px;
  line-height: 1.6;
  color: #e8eee9;
  margin: 0;
}
.lab-tabpanel h3 {
  margin: 0 0 8px;
  font-family: var(--sans);
  font-size: 16px;
  font-weight: 600;
  color: var(--mist, #f2efe6);
}
@media (prefers-reduced-motion: reduce) {
  .lab-tab { transition: none; }
}
`;

const baseId = "lab-tabs-heading";

export default function LabTabs() {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = useCallback((index: number) => {
    const el = tabRefs.current[index];
    if (el) el.focus();
  }, []);

  const move = useCallback(
    (delta: number) => {
      setSelected((prev) => {
        const next = (prev + delta + STEPS.length) % STEPS.length;
        queueMicrotask(() => focusTab(next));
        return next;
      });
    },
    [focusTab],
  );

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      move(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      move(-1);
    }
  };

  return (
    <section className="lab-tabs" data-lab="tabs" aria-labelledby={baseId}>
      <style>{css}</style>
      <div className="lab-tabs-card">
        <h2 id={baseId}>How this showcase team works</h2>
        <div
          role="tablist"
          aria-label="Showcase workflow steps"
          className="lab-tablist"
          onKeyDown={onKeyDown}
        >
          {STEPS.map((step, index) => {
            const tabId = `tab-${step.id}`;
            const panelId = `panel-${step.id}`;
            const isSelected = selected === index;
            return (
              <button
                key={step.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={tabId}
                aria-selected={isSelected}
                aria-controls={panelId}
                tabIndex={isSelected ? 0 : -1}
                className="lab-tab"
                onClick={() => setSelected(index)}
              >
                {step.title}
              </button>
            );
          })}
        </div>
        {STEPS.map((step, index) => {
          const tabId = `tab-${step.id}`;
          const panelId = `panel-${step.id}`;
          const isSelected = selected === index;
          return (
            <div
              key={step.id}
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId}
              hidden={!isSelected}
              className="lab-tabpanel"
            >
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
