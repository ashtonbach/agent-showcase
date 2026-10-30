"use client";

import { useCallback, useRef, useState } from "react";

const STEPS = [
  {
    id: "tab-hazel",
    panel: "panel-hazel",
    label: "Design",
    heading: "Hazel shapes the look",
    text: "Hazel picks layout, type, and any artwork so each lab section matches the Forest Mist brand before code lands.",
  },
  {
    id: "tab-alder",
    panel: "panel-alder",
    label: "Build",
    heading: "Alder writes the feature",
    text: "Alder implements the spec in the lab slot, keeps the diff small, and ships through the same gate the live site uses.",
  },
  {
    id: "tab-review",
    panel: "panel-review",
    label: "Review",
    heading: "Rowan and Cedar gate it",
    text: "Rowan reviews accessibility and copy; Cedar runs QA on the preview. The coordinator merges only after both sign off.",
  },
];

export default function TabsLab() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const select = useCallback((index: number) => {
    setActive(index);
    tabsRef.current[index]?.focus();
  }, []);

  const onTabKey = (index: number, e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      select((index + 1) % STEPS.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      select((index + STEPS.length - 1) % STEPS.length);
    }
  };

  return (
    <section data-lab="tabs" aria-labelledby="tabs-title">
      <h2 id="tabs-title">How the showcase team works</h2>
      <div className="lab-tabs-card">
        <div role="tablist" aria-label="Showcase workflow steps" className="lab-tablist">
          {STEPS.map((step, i) => (
            <button
              key={step.id}
              type="button"
              ref={(el) => {
                tabsRef.current[i] = el;
              }}
              role="tab"
              id={step.id}
              aria-selected={active === i}
              aria-controls={step.panel}
              tabIndex={active === i ? 0 : -1}
              className="lab-tab"
              onClick={() => setActive(i)}
              onKeyDown={(e) => onTabKey(i, e)}
            >
              {step.label}
            </button>
          ))}
        </div>
        {STEPS.map((step, i) => (
          <div
            key={step.panel}
            role="tabpanel"
            id={step.panel}
            aria-labelledby={step.id}
            hidden={active !== i}
            className="lab-panel"
          >
            <p className="lab-panel-kicker">{step.heading}</p>
            <p className="lab-panel-body">{step.text}</p>
          </div>
        ))}
      </div>
      <style>{`
        [data-lab="tabs"] { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist); }
        [data-lab="tabs"] .lab-tabs-card {
          border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px;
        }
        [data-lab="tabs"] .lab-tablist { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
        [data-lab="tabs"] .lab-tab {
          font-family: var(--sans); font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase;
          font-size: 11px; padding: 10px 14px; border-radius: 999px; border: 1px solid rgba(176, 203, 188, 0.35);
          background: transparent; color: var(--mist); cursor: pointer;
        }
        [data-lab="tabs"] .lab-tab[aria-selected="true"] {
          background: var(--sage); border-color: var(--sage); color: #121A16;
        }
        [data-lab="tabs"] .lab-tab:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
        [data-lab="tabs"] .lab-panel-kicker {
          font-family: var(--sans); font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase;
          font-size: 11px; color: var(--sage); margin: 0 0 10px;
        }
        [data-lab="tabs"] .lab-panel-body { margin: 0; line-height: 1.55; color: #F2EFE6; }
        @media (prefers-reduced-motion: reduce) {
          [data-lab="tabs"] .lab-tab { transition: none; }
        }
      `}</style>
    </section>
  );
}
