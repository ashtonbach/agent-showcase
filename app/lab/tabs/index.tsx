"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

const STEPS = [
  {
    label: "Design",
    title: "Hazel sets the visual direction",
    body: "Hazel picks typography, color, and layout so each lab section matches the Forest Mist brand before code lands.",
  },
  {
    label: "Build",
    title: "Alder writes the lab feature",
    body: "Alder implements the spec in the lab slot, keeps the diff small, and ships through the showcase gate on the run branch.",
  },
  {
    label: "Review",
    title: "Rowan and Cedar finish the loop",
    body: "Rowan reviews accessibility and structure; Cedar checks the preview. The operator merges after the gate and checks pass.",
  },
];

export default function TabsLab() {
  const rid = useId().replace(/:/g, "");
  const h2Id = `${rid}-title`;
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const pick = useCallback((i: number) => setActive(i), []);

  useEffect(() => {
    tabsRef.current[active]?.focus();
  }, [active]);

  const onKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActive((a) => (a + 1) % STEPS.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActive((a) => (a + STEPS.length - 1) % STEPS.length);
    }
  };

  return (
    <section data-lab="tabs" aria-labelledby={h2Id} className="lab-tabs-wrap">
      <style>{`
        .lab-tabs-wrap { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #E8EEE9); }
        .lab-tabs-card { border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; background: rgba(18,26,22,0.35); }
        .lab-tablist { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 20px; padding: 0; list-style: none; }
        .lab-tab {
          font-family: var(--sans); font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; font-size: 11px;
          padding: 10px 14px; border-radius: 10px; border: 1px solid rgba(176,203,188,0.28); background: transparent;
          color: var(--mist, #E8EEE9); cursor: pointer;
        }
        .lab-tab[aria-selected="true"] { background: rgba(176,203,188,0.14); border-color: var(--sage, #B0CBBC); color: var(--sage, #B0CBBC); }
        .lab-tab:focus-visible { outline: 2px solid var(--sage, #B0CBBC); outline-offset: 2px; }
        .lab-panel-title { font-family: var(--serif); font-weight: 400; font-size: 22px; margin: 0 0 12px; color: var(--mist, #F2EFE6); }
        .lab-panel-body { margin: 0; line-height: 1.55; font-size: 15px; }
        @media (prefers-reduced-motion: reduce) { .lab-tab { transition: none; } }
      `}</style>
      <h2 id={h2Id}>How this showcase run works</h2>
      <div className="lab-tabs-card">
        <div role="tablist" aria-label="Showcase team steps" className="lab-tablist">
          {STEPS.map((step, i) => {
            const tabId = `${rid}-tab-${i}`;
            const panelId = `${rid}-panel-${i}`;
            return (
              <button
                key={step.label}
                type="button"
                role="tab"
                id={tabId}
                ref={(el) => { tabsRef.current[i] = el; }}
                aria-selected={active === i}
                aria-controls={panelId}
                tabIndex={active === i ? 0 : -1}
                className="lab-tab"
                onClick={() => pick(i)}
                onKeyDown={onKey}
              >
                {step.label}
              </button>
            );
          })}
        </div>
        {STEPS.map((step, i) => {
          const tabId = `${rid}-tab-${i}`;
          const panelId = `${rid}-panel-${i}`;
          return (
            <div
              key={step.label}
              role="tabpanel"
              id={panelId}
              aria-labelledby={tabId}
              hidden={active !== i}
              className="lab-panel"
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
