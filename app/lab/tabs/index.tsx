"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STEPS = [
  {
    label: "Design",
    body: "Hazel defines the feature brief and Forest Mist styling so each lab slot has a clear visual and content target before code starts.",
  },
  {
    label: "Build",
    body: "Alder writes one client component in app/lab, points page.tsx and current.json at it, and ships through the self-check and merge gate.",
  },
  {
    label: "Ship",
    body: "Rowan reviews the diff and checks; Cedar signs off in QA. The kit opens the pull request and merges once the gate and review pass.",
  },
];

const css = `
.lab-tabs-shell { width: min(720px, 100%); margin: 8px auto 56px; }
.lab-tabs-card { border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; }
.lab-tablist { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 18px; }
.lab-tab { font-family: var(--sans); font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; font-size: 11px; padding: 10px 14px; border-radius: 999px; border: 1px solid rgba(176,203,188,0.35); background: transparent; color: var(--mist); cursor: pointer; }
.lab-tab[aria-selected="true"] { background: var(--sage); color: #121A16; border-color: var(--sage); }
.lab-tab:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
.lab-panel p { margin: 0; color: var(--mist); line-height: 1.55; }
@media (prefers-reduced-motion: reduce) { .lab-tab { transition: none; } }
`;

export default function TabsLab() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabIds = ["tabs-step-design", "tabs-step-build", "tabs-step-ship"];
  const panelIds = ["tabs-panel-design", "tabs-panel-build", "tabs-panel-ship"];

  useEffect(() => {
    tabRefs.current[active]?.focus();
  }, [active]);

  const onListKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    setActive((i) => (e.key === "ArrowRight" ? (i + 1) % 3 : (i + 2) % 3));
  }, []);

  return (
    <section data-lab="tabs" aria-labelledby="tabs-feature-title">
      <style>{css}</style>
      <h2 id="tabs-feature-title">How the showcase team works</h2>
      <div className="lab-tabs-shell">
        <div className="lab-tabs-card">
          <div role="tablist" aria-label="Showcase workflow" className="lab-tablist" onKeyDown={onListKeyDown}>
            {STEPS.map((step, i) => (
              <button
                key={tabIds[i]}
                type="button"
                role="tab"
                id={tabIds[i]}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                aria-selected={active === i}
                aria-controls={panelIds[i]}
                tabIndex={active === i ? 0 : -1}
                className="lab-tab"
                onClick={() => setActive(i)}
              >
                {step.label}
              </button>
            ))}
          </div>
          {STEPS.map((step, i) => (
            <div
              key={panelIds[i]}
              role="tabpanel"
              id={panelIds[i]}
              aria-labelledby={tabIds[i]}
              hidden={active !== i}
              className="lab-panel"
            >
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
