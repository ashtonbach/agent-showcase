"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const STEPS = [
  {
    id: "tab-plan",
    panelId: "panel-plan",
    label: "Plan",
    title: "Coordinator sets the run",
    body:
      "The coordinator assigns roles, shares the feature spec, and keeps the team on the clock so each handoff stays clear.",
  },
  {
    id: "tab-build",
    panelId: "panel-build",
    label: "Build",
    title: "Coder ships in the lab slot",
    body:
      "The coder implements only the scoped lab component, runs the gate checks locally, and pushes a branch for review.",
  },
  {
    id: "tab-verify",
    panelId: "panel-verify",
    label: "Verify",
    title: "Review and QA sign off",
    body:
      "Review checks accessibility and copy; QA exercises layout and console behavior before the feature merges to main.",
  },
] as const;

export default function TabsLab() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = useCallback((index: number) => {
    tabRefs.current[index]?.focus();
  }, []);

  useEffect(() => {
    focusTab(active);
  }, [active, focusTab]);

  const onTabKeyDown = (index: number, e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next =
      e.key === "ArrowRight" ? (index + 1) % STEPS.length : (index - 1 + STEPS.length) % STEPS.length;
    setActive(next);
  };

  const css = `
    .lab-tabs-wrap { width: min(720px, 100%); margin: 8px auto 56px; }
    .lab-tabs-card {
      border: 1px solid rgba(176, 203, 188, 0.28);
      border-radius: 16px;
      padding: 24px;
      background: rgba(18, 26, 22, 0.35);
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
      letter-spacing: 0.16em;
      text-transform: uppercase;
      font-size: 12px;
      color: var(--mist);
      background: transparent;
      border: 1px solid rgba(176, 203, 188, 0.28);
      border-radius: 999px;
      padding: 10px 16px;
      cursor: pointer;
    }
    .lab-tab[aria-selected="true"] {
      color: #121a16;
      background: var(--sage);
      border-color: var(--sage);
    }
    .lab-tab:focus-visible {
      outline: 2px solid var(--sage);
      outline-offset: 2px;
    }
    .lab-panel-title {
      font-family: var(--serif);
      font-weight: 400;
      font-size: 22px;
      color: var(--mist);
      margin: 0 0 12px;
    }
    .lab-panel-body {
      margin: 0;
      color: #f2efe6;
      line-height: 1.55;
      font-size: 16px;
    }
    @media (prefers-reduced-motion: reduce) {
      .lab-tab { transition: none; }
    }
  `;

  return (
    <section data-lab="tabs" aria-labelledby="lab-tabs-heading" className="lab-tabs-wrap">
      <style>{css}</style>
      <h2 id="lab-tabs-heading">How the showcase team works</h2>
      <div className="lab-tabs-card">
        <div role="tablist" aria-label="Showcase workflow steps" className="lab-tablist">
          {STEPS.map((step, i) => (
            <button
              key={step.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={step.id}
              aria-selected={active === i}
              aria-controls={step.panelId}
              tabIndex={active === i ? 0 : -1}
              className="lab-tab"
              onClick={() => setActive(i)}
              onKeyDown={(e) => onTabKeyDown(i, e)}
            >
              {step.label}
            </button>
          ))}
        </div>
        {STEPS.map((step, i) => (
          <div
            key={step.panelId}
            role="tabpanel"
            id={step.panelId}
            aria-labelledby={step.id}
            hidden={active !== i}
          >
            <p className="lab-panel-title">{step.title}</p>
            <p className="lab-panel-body">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
