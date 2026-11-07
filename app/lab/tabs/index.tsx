"use client";

import { useCallback, useId, useRef, useState, type KeyboardEvent } from "react";

const STEPS = [
  {
    title: "Design",
    body: "Hazel shapes the layout, typography, and Forest Mist styling so each lab slot matches the brand before code lands.",
  },
  {
    title: "Build",
    body: "Alder implements the feature in the lab slot from the spec, keeps the diff small, and ships through the kit gate.",
  },
  {
    title: "Review & QA",
    body: "Rowan reviews accessibility and behavior; Cedar signs off on the preview so the coordinator can merge when checks pass.",
  },
] as const;

export default function TabsLab() {
  const base = useId();
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabId = (i: number) => `${base}-tab-${i}`;
  const panelId = (i: number) => `${base}-panel-${i}`;

  const select = useCallback((i: number) => {
    setSelected(i);
    tabRefs.current[i]?.focus();
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next =
      e.key === "ArrowRight"
        ? (selected + 1) % STEPS.length
        : (selected - 1 + STEPS.length) % STEPS.length;
    select(next);
  };

  return (
    <section data-lab="tabs" aria-labelledby={`${base}-heading`} className="lab-tabs-wrap">
      <style>{`
        .lab-tabs-wrap { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #E8EEE9); }
        .lab-tabs-card {
          border: 1px solid rgba(176, 203, 188, 0.28);
          border-radius: 16px;
          padding: 24px;
          background: rgba(18, 26, 22, 0.35);
        }
        .lab-tabs-wrap h2 {
          font-family: var(--serif);
          font-weight: 400;
          font-size: 30px;
          line-height: 1.15;
          margin: 0 0 20px;
          color: var(--mist, #F2EFE6);
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
          font-size: 11px;
          padding: 10px 14px;
          border-radius: 999px;
          border: 1px solid rgba(176, 203, 188, 0.35);
          background: transparent;
          color: var(--mist, #E8EEE9);
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }
        .lab-tab[aria-selected="true"] {
          background: rgba(176, 203, 188, 0.18);
          border-color: var(--sage, #B0CBBC);
          color: var(--mist, #F2EFE6);
        }
        .lab-tab:focus-visible {
          outline: 2px solid var(--sage, #B0CBBC);
          outline-offset: 2px;
        }
        .lab-tabpanel { margin: 0; }
        .lab-tabpanel[hidden] { display: none; }
        .lab-step-label {
          display: block;
          font-family: var(--sans);
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-size: 10px;
          color: var(--sage, #B0CBBC);
          margin-bottom: 8px;
        }
        .lab-step-body { margin: 0; line-height: 1.55; font-size: 15px; }
        @media (prefers-reduced-motion: reduce) {
          .lab-tab { transition: none; }
        }
      `}</style>
      <div className="lab-tabs-card">
        <h2 id={`${base}-heading`}>How this run works</h2>
        <div
          role="tablist"
          aria-label="Showcase team steps"
          className="lab-tablist"
          onKeyDown={onKeyDown}
        >
          {STEPS.map((step, i) => (
            <button
              key={step.title}
              type="button"
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={tabId(i)}
              aria-selected={selected === i}
              aria-controls={panelId(i)}
              tabIndex={selected === i ? 0 : -1}
              className="lab-tab"
              onClick={() => setSelected(i)}
            >
              Step {i + 1}
            </button>
          ))}
        </div>
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            role="tabpanel"
            id={panelId(i)}
            aria-labelledby={tabId(i)}
            hidden={selected !== i}
            className="lab-tabpanel"
          >
            <span className="lab-step-label">{step.title}</span>
            <p className="lab-step-body">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
