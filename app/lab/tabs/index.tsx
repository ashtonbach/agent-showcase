"use client";
import { useCallback, useEffect, useId, useRef, useState } from "react";

const STEPS = [
  {
    label: "Design",
    text: "Hazel sets the Forest Mist look and any artwork for the lab slot while the coder builds in parallel.",
  },
  {
    label: "Build",
    text: "Alder writes this client component, runs the ship gate on branch sc/tabs-tnpwc6, and pushes for review.",
  },
  {
    label: "Ship",
    text: "Rowan reviews the diff and checks; Cedar signs off on the preview before the operator merges.",
  },
];

export default function Tabs() {
  const uid = useId().replace(/:/g, "");
  const titleId = `${uid}-title`;
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const tabId = (i: number) => `${uid}-tab-${i}`;
  const panelId = (i: number) => `${uid}-panel-${i}`;

  useEffect(() => {
    tabsRef.current[active]?.focus();
  }, [active]);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActive((n) => (n + 1) % STEPS.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActive((n) => (n + STEPS.length - 1) % STEPS.length);
    }
  }, []);

  return (
    <section data-lab="tabs" aria-labelledby={titleId}>
      <style>{`
        [data-lab="tabs"] { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist); }
        [data-lab="tabs"] .lab-card {
          border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px;
        }
        [data-lab="tabs"] .lab-tablist { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
        [data-lab="tabs"] .lab-tab {
          font-family: var(--sans); font-size: 0.75rem; font-weight: 500; letter-spacing: 0.16em;
          text-transform: uppercase; color: var(--mist); background: transparent;
          border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 8px; padding: 10px 14px; cursor: pointer;
        }
        [data-lab="tabs"] .lab-tab[aria-selected="true"] { background: var(--sage); color: #121a16; border-color: var(--sage); }
        [data-lab="tabs"] .lab-tab:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
        [data-lab="tabs"] .lab-panel { line-height: 1.55; margin: 0; }
        @media (prefers-reduced-motion: reduce) { [data-lab="tabs"] .lab-tab { transition: none; } }
      `}</style>
      <h2 id={titleId}>How the showcase team works</h2>
      <div className="lab-card">
        <div className="lab-tablist" role="tablist" aria-label="Showcase workflow" onKeyDown={onKeyDown}>
          {STEPS.map((step, i) => (
            <button
              key={step.label}
              type="button"
              className="lab-tab"
              role="tab"
              id={tabId(i)}
              ref={(el) => { tabsRef.current[i] = el; }}
              aria-selected={active === i}
              aria-controls={panelId(i)}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
            >
              {step.label}
            </button>
          ))}
        </div>
        {STEPS.map((step, i) => (
          <div
            key={step.label}
            className="lab-panel"
            role="tabpanel"
            id={panelId(i)}
            aria-labelledby={tabId(i)}
            hidden={active !== i}
          >
            <p>{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
