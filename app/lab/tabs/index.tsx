"use client";

import { useCallback, useId, useRef, useState } from "react";

const STEPS = [
  {
    label: "Design",
    title: "Hazel shapes the section",
    body:
      "Hazel picks layout, type, and Forest Mist styling so each lab slot matches the demo brand before code lands.",
  },
  {
    label: "Build",
    title: "Alder writes the lab feature",
    body:
      "Alder implements the spec in app/lab, runs the ship gate, and pushes the branch for preview and review.",
  },
  {
    label: "Review",
    title: "Rowan and Cedar gate the merge",
    body:
      "Rowan reviews accessibility and spec fit; Cedar checks behavior on preview. The coordinator merges after both pass.",
  },
];

export default function TabsLab() {
  const base = useId().replace(/:/g, "");
  const [selected, setSelected] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const select = useCallback((index: number) => {
    setSelected(index);
    tabsRef.current[index]?.focus();
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        select((index + 1) % STEPS.length);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        select((index - 1 + STEPS.length) % STEPS.length);
      }
    },
    [select],
  );

  const headingId = `${base}-heading`;

  return (
    <section data-lab="tabs" aria-labelledby={headingId} className="lab-tabs">
      <style>{`
        .lab-tabs { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #f2efe6); }
        .lab-tabs h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 20px; }
        .lab-tabs-card {
          border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px;
          background: rgba(18, 26, 22, 0.35);
        }
        .lab-tablist { display: flex; gap: 8px; flex-wrap: wrap; margin: 0 0 20px; padding: 0; list-style: none; }
        .lab-tab {
          font-family: var(--sans); font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase;
          font-size: 11px; padding: 10px 14px; border-radius: 999px; cursor: pointer;
          border: 1px solid rgba(176, 203, 188, 0.28); background: transparent; color: var(--mist, #e8eee9);
        }
        .lab-tab[aria-selected="true"] { background: var(--sage); color: #121a16; border-color: transparent; }
        .lab-tab:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
        .lab-panel-title { font-family: var(--serif); font-size: 22px; font-weight: 400; margin: 0 0 10px; }
        .lab-panel-body { margin: 0; line-height: 1.55; color: #e8eee9; }
        @media (prefers-reduced-motion: reduce) { .lab-tab { transition: none; } }
      `}</style>
      <h2 id={headingId}>How the showcase team works</h2>
      <div className="lab-tabs-card">
        <div role="tablist" aria-label="Showcase workflow steps" className="lab-tablist">
          {STEPS.map((step, index) => {
            const tabId = `${base}-tab-${index}`;
            const panelId = `${base}-panel-${index}`;
            const isSelected = selected === index;
            return (
              <button
                key={step.label}
                type="button"
                role="tab"
                id={tabId}
                ref={(el) => {
                  tabsRef.current[index] = el;
                }}
                aria-selected={isSelected}
                aria-controls={panelId}
                tabIndex={isSelected ? 0 : -1}
                className="lab-tab"
                onClick={() => setSelected(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                {step.label}
              </button>
            );
          })}
        </div>
        {STEPS.map((step, index) => {
          const tabId = `${base}-tab-${index}`;
          const panelId = `${base}-panel-${index}`;
          const isSelected = selected === index;
          return (
            <div
              key={step.label}
              role="tabpanel"
              id={panelId}
              aria-labelledby={tabId}
              hidden={!isSelected}
            >
              <h3 className="lab-panel-title">{step.title}</h3>
              <p className="lab-panel-body">{step.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
