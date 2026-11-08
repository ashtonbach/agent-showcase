"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

const STEPS = [
  {
    title: "Design the slice",
    body: "Hazel shapes the Forest Mist layout and any artwork for the feature slot while the run is live on the demo viewer.",
  },
  {
    title: "Write the lab",
    body: "Alder implements the spec in app/lab, wires the page slot, and ships through the kit gate on the run branch.",
  },
  {
    title: "Review and verify",
    body: "Rowan reviews the change for accessibility and rules; Cedar exercises the preview before the operator merges.",
  },
] as const;

export default function Tabs() {
  const baseId = useId().replace(/:/g, "");
  const titleId = `${baseId}-title`;
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const select = useCallback((index: number) => {
    setActive(index);
  }, []);

  useEffect(() => {
    tabsRef.current[active]?.focus();
  }, [active]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const delta = event.key === "ArrowRight" ? 1 : -1;
    const next = (active + delta + STEPS.length) % STEPS.length;
    select(next);
  };

  return (
    <section data-lab="tabs" aria-labelledby={titleId}>
      <h2 id={titleId} className="lab-heading">
        How this showcase run works
      </h2>
      <div className="lab-card">
        <div
          role="tablist"
          aria-label="Showcase team steps"
          className="lab-tablist"
          onKeyDown={onKeyDown}
        >
          {STEPS.map((step, index) => {
            const tabId = `${baseId}-tab-${index}`;
            const panelId = `${baseId}-panel-${index}`;
            const selected = index === active;
            return (
              <button
                key={tabId}
                ref={(el) => {
                  tabsRef.current[index] = el;
                }}
                type="button"
                role="tab"
                id={tabId}
                className="lab-tab"
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(index)}
              >
                <span className="lab-tab-label">Step {index + 1}</span>
                <span className="lab-tab-title">{step.title}</span>
              </button>
            );
          })}
        </div>
        {STEPS.map((step, index) => {
          const tabId = `${baseId}-tab-${index}`;
          const panelId = `${baseId}-panel-${index}`;
          const selected = index === active;
          return (
            <div
              key={panelId}
              role="tabpanel"
              id={panelId}
              className="lab-panel"
              aria-labelledby={tabId}
              hidden={!selected}
            >
              <p className="lab-panel-lead">{step.title}</p>
              <p className="lab-panel-body">{step.body}</p>
            </div>
          );
        })}
      </div>
      <style>{`
        [data-lab="tabs"] {
          width: min(720px, 100%);
          margin: 8px auto 56px;
          color: var(--mist, #e8eee9);
        }
        [data-lab="tabs"] .lab-heading {
          font-family: var(--serif, Georgia, serif);
          font-weight: 400;
          font-size: 30px;
          line-height: 1.2;
          margin: 0 0 20px;
          color: var(--mist, #f2efe6);
        }
        [data-lab="tabs"] .lab-card {
          border: 1px solid rgba(176, 203, 188, 0.28);
          border-radius: 16px;
          padding: 24px;
        }
        [data-lab="tabs"] .lab-tablist {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }
        [data-lab="tabs"] .lab-tab {
          flex: 1 1 120px;
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid rgba(176, 203, 188, 0.28);
          background: transparent;
          color: var(--mist, #e8eee9);
          cursor: pointer;
          text-align: left;
        }
        [data-lab="tabs"] .lab-tab[aria-selected="true"] {
          border-color: var(--sage, #b0cbb7);
          background: rgba(176, 203, 188, 0.12);
        }
        [data-lab="tabs"] .lab-tab:focus-visible {
          outline: 2px solid var(--sage, #b0cbb7);
          outline-offset: 2px;
        }
        [data-lab="tabs"] .lab-tab-label {
          font-family: var(--sans, system-ui, sans-serif);
          font-weight: 500;
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--sage, #b0cbb7);
        }
        [data-lab="tabs"] .lab-tab-title {
          font-family: var(--sans, system-ui, sans-serif);
          font-size: 14px;
          line-height: 1.35;
        }
        [data-lab="tabs"] .lab-panel-lead {
          font-family: var(--serif, Georgia, serif);
          font-size: 20px;
          margin: 0 0 8px;
          color: var(--mist, #f2efe6);
        }
        [data-lab="tabs"] .lab-panel-body {
          margin: 0;
          line-height: 1.55;
          font-size: 15px;
        }
        @media (prefers-reduced-motion: no-preference) {
          [data-lab="tabs"] .lab-tab {
            transition: background 0.2s ease, border-color 0.2s ease;
          }
        }
      `}</style>
    </section>
  );
}
