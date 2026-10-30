"use client";

import { useCallback, useId, useState, type KeyboardEvent } from "react";

const STEPS = [
  {
    label: "Design",
    text: "Hazel sets the Forest Mist look and any artwork for the lab slot.",
  },
  {
    label: "Build",
    text: "Alder writes one client component from the spec on a showcase branch.",
  },
  {
    label: "Review",
    text: "Rowan reviews the PR and Cedar QA checks the preview before merge.",
  },
];

export default function TabsLab() {
  const uid = useId();
  const titleId = `${uid}-title`;
  const [active, setActive] = useState(0);

  const tabId = (i: number) => `${uid}-tab-${i}`;
  const panelId = (i: number) => `${uid}-panel-${i}`;

  const focusTab = (i: number) => {
    document.getElementById(tabId(i))?.focus();
  };

  const choose = useCallback((i: number) => {
    setActive(i);
  }, []);

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = e.key === "ArrowRight" ? (i + 1) % 3 : (i + 2) % 3;
    setActive(next);
    focusTab(next);
  };

  return (
    <section data-lab="tabs" aria-labelledby={titleId}>
      <style>{`
        .lab-tabs-wrap { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #f2efe6); }
        .lab-tabs-card {
          border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px;
          background: rgba(18, 26, 22, 0.35);
        }
        .lab-tabs-wrap h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 20px; }
        .lab-tablist { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 20px; padding: 0; list-style: none; }
        .lab-tab {
          font-family: var(--sans); font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase;
          font-size: 12px; padding: 10px 14px; border-radius: 999px; cursor: pointer;
          border: 1px solid rgba(176, 203, 188, 0.28); background: transparent; color: #e8eee9;
        }
        .lab-tab[aria-selected="true"] { background: var(--sage); color: #14201a; border-color: transparent; }
        .lab-tab:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
        .lab-tabpanel { margin: 0; line-height: 1.55; }
        .lab-tabpanel[hidden] { display: none; }
        .lab-tab-role {
          display: inline-block; font-family: var(--sans); font-weight: 500; letter-spacing: 0.16em;
          text-transform: uppercase; font-size: 11px; color: var(--sage); margin-bottom: 8px;
        }
        @media (prefers-reduced-motion: reduce) { .lab-tab { transition: none; } }
      `}</style>
      <div className="lab-tabs-wrap">
        <div className="lab-tabs-card">
          <h2 id={titleId}>How the showcase team works</h2>
          <div role="tablist" aria-label="Showcase workflow steps" className="lab-tablist">
            {STEPS.map((step, i) => (
              <button
                key={step.label}
                type="button"
                role="tab"
                id={tabId(i)}
                className="lab-tab"
                aria-selected={active === i}
                aria-controls={panelId(i)}
                tabIndex={active === i ? 0 : -1}
                onClick={() => choose(i)}
                onKeyDown={(e) => onTabKey(e, i)}
              >
                {step.label}
              </button>
            ))}
          </div>
          {STEPS.map((step, i) => (
            <div
              key={step.label}
              role="tabpanel"
              id={panelId(i)}
              className="lab-tabpanel"
              aria-labelledby={tabId(i)}
              hidden={active !== i}
            >
              <span className="lab-tab-role">{step.label}</span>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
