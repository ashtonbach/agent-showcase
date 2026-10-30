"use client";

import { useCallback, useRef, useState, type KeyboardEvent } from "react";

const STEPS = [
  {
    id: "tabs-tab-design",
    panel: "tabs-panel-design",
    label: "Design",
    text: "Hazel shapes the look in Forest Mist tokens and hands off artwork paths when the spec calls for it.",
  },
  {
    id: "tabs-tab-code",
    panel: "tabs-panel-code",
    label: "Build",
    text: "Alder implements the lab slot on the run branch, keeps the diff inside the gate, and ships through the kit scripts.",
  },
  {
    id: "tabs-tab-ship",
    panel: "tabs-panel-ship",
    label: "Ship",
    text: "Rowan reviews on the preview, Cedar signs off behavior, and the operator box opens the PR and merges after checks pass.",
  },
] as const;

export default function TabsLab() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const pick = useCallback((index: number) => {
    setActive(index);
    tabRefs.current[index]?.focus();
  }, []);

  const onListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      pick((active + 1) % STEPS.length);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      pick((active + STEPS.length - 1) % STEPS.length);
    }
  };

  return (
    <section data-lab="tabs" aria-labelledby="tabs-title">
      <style>{`
.lab-tabs-wrap{width:min(720px,100%);margin:8px auto 56px}
.lab-tabs-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;background:rgba(18,26,22,0.35)}
.lab-tabs-title{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;color:var(--mist);margin:0 0 20px}
.lab-tablist{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 20px;padding:0;border-bottom:1px solid rgba(176,203,188,0.22)}
.lab-tab{font-family:var(--sans);font-size:14px;font-weight:500;letter-spacing:0.06em;color:var(--mist);background:transparent;border:none;border-bottom:2px solid transparent;padding:10px 14px;margin:0 0 -1px;cursor:pointer}
.lab-tab[aria-selected="true"]{color:var(--sage);border-bottom-color:var(--sage)}
.lab-tab:focus-visible{outline:2px solid var(--sage);outline-offset:2px}
.lab-panel{margin:0;color:var(--mist);font-family:var(--sans);font-size:16px;line-height:1.55}
.lab-step-label{display:block;font-size:12px;font-weight:500;letter-spacing:0.16em;text-transform:uppercase;color:var(--sage);margin-bottom:8px}
@media (prefers-reduced-motion:reduce){.lab-tab{transition:none}}
`}</style>
      <div className="lab-tabs-wrap">
        <div className="lab-tabs-card">
          <h2 id="tabs-title" className="lab-tabs-title">
            How the showcase team works
          </h2>
          <div
            role="tablist"
            aria-label="Showcase team steps"
            className="lab-tablist"
            onKeyDown={onListKeyDown}
          >
            {STEPS.map((step, index) => (
              <button
                key={step.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={step.id}
                aria-selected={active === index}
                aria-controls={step.panel}
                tabIndex={active === index ? 0 : -1}
                className="lab-tab"
                onClick={() => pick(index)}
              >
                {step.label}
              </button>
            ))}
          </div>
          {STEPS.map((step, index) => (
            <div
              key={step.panel}
              role="tabpanel"
              id={step.panel}
              aria-labelledby={step.id}
              hidden={active !== index}
              className="lab-panel"
            >
              <span className="lab-step-label">Step {index + 1}</span>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
