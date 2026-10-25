"use client";
import { useCallback, useRef, useState } from "react";

const TITLE_ID = "lab-tabs-title";

const STEPS = [
  {
    id: "tab-plan",
    panelId: "panel-plan",
    label: "Plan",
    heading: "Kickoff",
    text:
      "The coordinator opens the run, assigns roles, and shares the feature spec so everyone works from the same brief.",
  },
  {
    id: "tab-build",
    panelId: "panel-build",
    label: "Build",
    heading: "Parallel work",
    text:
      "The coder implements the lab feature while design and review prepare assets and criteria; messages keep the thread visible.",
  },
  {
    id: "tab-ship",
    panelId: "panel-ship",
    label: "Ship",
    heading: "Gate and preview",
    text:
      "Automated checks build the app, verify layout and behavior, then push a branch preview for review and QA sign-off.",
  },
] as const;

export default function TabsLab() {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = useCallback((index: number) => {
    tabRefs.current[index]?.focus();
  }, []);

  const selectTab = useCallback(
    (index: number, focus: boolean) => {
      setSelected(index);
      if (focus) focusTab(index);
    },
    [focusTab],
  );

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      selectTab((index + 1) % STEPS.length, true);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      selectTab((index + STEPS.length - 1) % STEPS.length, true);
    }
  };

  const css = `
    [data-lab="tabs"] {
      width: min(720px, 100%);
      margin: 8px auto 56px;
      color: var(--mist, #E8EEE9);
    }
    [data-lab="tabs"] .lab-card {
      border: 1px solid rgba(176, 203, 188, 0.28);
      border-radius: 16px;
      padding: 24px;
      background: rgba(18, 26, 22, 0.35);
    }
    [data-lab="tabs"] .lab-tablist {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 0 0 20px;
      padding: 0;
      list-style: none;
    }
    [data-lab="tabs"] .lab-tab {
      font-family: var(--sans);
      font-weight: 500;
      font-size: 0.75rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--mist, #F2EFE6);
      background: transparent;
      border: 1px solid rgba(176, 203, 188, 0.35);
      border-radius: 999px;
      padding: 10px 16px;
      cursor: pointer;
    }
    [data-lab="tabs"] .lab-tab[aria-selected="true"] {
      background: var(--sage, #B0CBBC);
      color: #121A16;
      border-color: var(--sage, #B0CBBC);
    }
    [data-lab="tabs"] .lab-tab:focus-visible {
      outline: 2px solid var(--sage, #B0CBBC);
      outline-offset: 2px;
    }
    [data-lab="tabs"] .lab-panel-title {
      font-family: var(--serif);
      font-weight: 400;
      font-size: 1.25rem;
      margin: 0 0 12px;
      color: var(--mist, #F2EFE6);
    }
    [data-lab="tabs"] .lab-panel-text {
      margin: 0;
      line-height: 1.55;
      font-size: 1rem;
    }
    [data-lab="tabs"] .lab-role {
      display: inline-block;
      margin-bottom: 8px;
      font-family: var(--sans);
      font-weight: 500;
      font-size: 0.7rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--sage, #B0CBBC);
    }
    @media (prefers-reduced-motion: reduce) {
      [data-lab="tabs"] .lab-tab { transition: none; }
    }
  `;

  return (
    <section data-lab="tabs" aria-labelledby={TITLE_ID}>
      <style>{css}</style>
      <h2 id={TITLE_ID}>How the showcase team works</h2>
      <div className="lab-card">
        <div role="tablist" aria-label="Showcase workflow steps" className="lab-tablist">
          {STEPS.map((step, index) => (
            <button
              key={step.id}
              type="button"
              role="tab"
              id={step.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              className="lab-tab"
              aria-selected={selected === index}
              aria-controls={step.panelId}
              tabIndex={selected === index ? 0 : -1}
              onClick={() => selectTab(index, false)}
              onKeyDown={(e) => onTabKeyDown(e, index)}
            >
              {step.label}
            </button>
          ))}
        </div>
        {STEPS.map((step, index) => (
          <div
            key={step.panelId}
            role="tabpanel"
            id={step.panelId}
            aria-labelledby={step.id}
            hidden={selected !== index}
          >
            <span className="lab-role">Step {index + 1}</span>
            <h3 className="lab-panel-title">{step.heading}</h3>
            <p className="lab-panel-text">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
