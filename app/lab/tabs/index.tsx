"use client";
import { useCallback, useId, useRef, useState, type KeyboardEvent } from "react";

const STEPS = [
  {
    label: "Design",
    title: "Hazel shapes the feature",
    body: "The design agent reads the spec and commits scoped artwork and visual direction in parallel while the coder stays on behavior and layout inside the lab slot.",
  },
  {
    label: "Build",
    title: "Alder ships the lab slot",
    body: "The coder writes the client component from the spec, wires the page import, runs SHIP for build and gate checks, then pushes to the run branch for preview.",
  },
  {
    label: "Review",
    title: "Rowan and Cedar gate quality",
    body: "The reviewer checks accessibility, copy rules, and diffs; QA verifies the preview. Fix rounds apply only returned notes until automerge can land on main.",
  },
] as const;

export default function TabsLab() {
  const baseId = useId();
  const headingId = `${baseId}-heading`;
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = useCallback((i: number) => {
    tabRefs.current[i]?.focus();
  }, []);

  const goTo = useCallback(
    (i: number) => {
      setActive(i);
      focusTab(i);
    },
    [focusTab],
  );

  const onListKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo((active + 1) % STEPS.length);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo((active + STEPS.length - 1) % STEPS.length);
      }
    },
    [active, goTo],
  );

  return (
    <section data-lab="tabs" aria-labelledby={headingId} className="lab-tabs">
      <style>{`
.lab-tabs { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist); }
.lab-tabs h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.15; margin: 0 0 20px; }
.lab-tabs-card { border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; background: rgba(18,26,22,0.35); }
.lab-tabs-list { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 20px; padding: 0; list-style: none; }
.lab-tabs-tab { font-family: var(--sans); font-size: 0.75rem; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; padding: 10px 14px; border-radius: 999px; border: 1px solid rgba(176,203,188,0.28); background: transparent; color: var(--mist); cursor: pointer; }
.lab-tabs-tab[aria-selected="true"] { background: var(--sage); color: #121A16; border-color: transparent; }
.lab-tabs-tab:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
.lab-tabs-panel h3 { margin: 0 0 10px; font-family: var(--serif); font-weight: 400; font-size: 1.35rem; color: var(--mist); }
.lab-tabs-role { display: inline-block; margin-bottom: 8px; font-family: var(--sans); font-size: 0.7rem; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: var(--sage); }
.lab-tabs-panel p { margin: 0; font-family: var(--sans); font-size: 0.95rem; line-height: 1.55; color: #E8EEE9; }
@media (prefers-reduced-motion: no-preference) { .lab-tabs-tab { transition: background 0.15s ease, color 0.15s ease; } }
`}</style>
      <h2 id={headingId}>How the showcase team works</h2>
      <div className="lab-tabs-card">
        <div role="tablist" aria-label="Showcase workflow steps" className="lab-tabs-list" onKeyDown={onListKeyDown}>
          {STEPS.map((step, i) => {
            const tabId = `${baseId}-tab-${i}`;
            const panelId = `${baseId}-panel-${i}`;
            const selected = active === i;
            return (
              <button
                key={step.label}
                type="button"
                role="tab"
                id={tabId}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                className="lab-tabs-tab"
                onClick={() => setActive(i)}
              >
                {step.label}
              </button>
            );
          })}
        </div>
        {STEPS.map((step, i) => {
          const tabId = `${baseId}-tab-${i}`;
          const panelId = `${baseId}-panel-${i}`;
          return (
            <div
              key={step.title}
              role="tabpanel"
              id={panelId}
              aria-labelledby={tabId}
              hidden={active !== i}
              className="lab-tabs-panel"
            >
              <span className="lab-tabs-role">{step.label}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
