"use client";

import { useId, useState, type KeyboardEvent } from "react";

const STEPS = [
  {
    label: "Design",
    title: "Hazel shapes the lab",
    body:
      "Hazel picks type, color, and layout for each showcase feature so every lab slot matches the Forest Mist look on the demo site.",
  },
  {
    label: "Build",
    title: "Alder codes from the spec",
    body:
      "Alder writes a fresh client component in app/lab from the run brief, keeps the diff small, and ships through the kit gate on the feature branch.",
  },
  {
    label: "Review",
    title: "Rowan and Cedar gate the merge",
    body:
      "Rowan reviews accessibility and copy; Cedar runs QA on the preview. The operator merges only after checks pass and the live viewer shows the run.",
  },
] as const;

export default function TabsLab() {
  const uid = useId();
  const [active, setActive] = useState(0);

  const focusTab = (index: number) => {
    document.getElementById(`${uid}-tab-${index}`)?.focus();
  };

  const select = (index: number) => {
    setActive(index);
    focusTab(index);
  };

  const onTabKeyDown = (index: number, e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = e.key === "ArrowRight" ? (index + 1) % 3 : (index + 2) % 3;
    setActive(next);
    focusTab(next);
  };

  return (
    <section data-lab="tabs" aria-labelledby={`${uid}-heading`} className="lab-wrap">
      <style>{`
        .lab-wrap { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist); }
        .lab-card { border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; background: rgba(18,26,22,0.35); }
        .lab-wrap h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.15; margin: 0 0 20px; color: var(--mist); }
        [role="tablist"] { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 20px; padding: 0; list-style: none; }
        [role="tab"] { font-family: var(--sans); font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; font-size: 11px;
          padding: 10px 14px; border-radius: 999px; border: 1px solid rgba(176,203,188,0.35); background: transparent; color: var(--mist); cursor: pointer; }
        [role="tab"][aria-selected="true"] { background: var(--sage); color: #121A16; border-color: var(--sage); }
        [role="tab"]:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
        .lab-step-label { font-family: var(--sans); font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; font-size: 11px; color: var(--sage); margin: 0 0 8px; }
        .lab-step-title { font-family: var(--serif); font-weight: 400; font-size: 22px; margin: 0 0 10px; color: var(--mist); }
        .lab-step-body { margin: 0; line-height: 1.55; color: #F2EFE6; font-size: 15px; }
        @media (prefers-reduced-motion: reduce) { [role="tab"] { transition: none; } }
      `}</style>
      <h2 id={`${uid}-heading`}>How this showcase run works</h2>
      <div className="lab-card">
        <div role="tablist" aria-label="Showcase team steps">
          {STEPS.map((step, i) => (
            <button
              key={step.label}
              type="button"
              role="tab"
              id={`${uid}-tab-${i}`}
              aria-selected={active === i}
              aria-controls={`${uid}-panel-${i}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => onTabKeyDown(i, e)}
            >
              {step.label}
            </button>
          ))}
        </div>
        {STEPS.map((step, i) => (
          <div
            key={step.label}
            role="tabpanel"
            id={`${uid}-panel-${i}`}
            aria-labelledby={`${uid}-tab-${i}`}
            hidden={active !== i}
          >
            <p className="lab-step-label">{step.label}</p>
            <h3 className="lab-step-title">{step.title}</h3>
            <p className="lab-step-body">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
