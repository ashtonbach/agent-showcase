"use client";

import { useRef, useState, type KeyboardEvent } from "react";

const STEPS = [
  {
    label: "Design",
    body: "Hazel sketches the lab's visuals and artwork before any code is written, so the coder starts from a clear look.",
  },
  {
    label: "Build",
    body: "The coder writes the feature straight from the written spec, with no blueprint or reference file to copy from.",
  },
  {
    label: "Review",
    body: "A reviewer checks the diff against the gate's rules, and the run merges once every automated check passes.",
  },
] as const;

export default function Tabs() {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function select(index: number, focus: boolean) {
    setSelected(index);
    if (focus) tabRefs.current[index]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const dir = event.key === "ArrowRight" ? 1 : -1;
    const next = (selected + dir + STEPS.length) % STEPS.length;
    select(next, true);
  }

  return (
    <section data-lab="tabs" aria-labelledby="tabs-h2">
      <h2 id="tabs-h2" className="lab-tabs-h2">
        How the showcase team works
      </h2>
      <div className="lab-tabs-card">
        <div
          role="tablist"
          aria-label="Showcase workflow"
          className="lab-tabs-list"
          onKeyDown={onKeyDown}
        >
          {STEPS.map((step, i) => (
            <button
              key={step.label}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tabs-tab-${i}`}
              aria-selected={selected === i}
              aria-controls={`tabs-panel-${i}`}
              tabIndex={selected === i ? 0 : -1}
              className="lab-tabs-tab"
              onClick={() => select(i, false)}
            >
              {step.label}
            </button>
          ))}
        </div>
        {STEPS.map((step, i) => (
          <div
            key={step.label}
            id={`tabs-panel-${i}`}
            role="tabpanel"
            aria-labelledby={`tabs-tab-${i}`}
            hidden={selected !== i}
            tabIndex={0}
            className="lab-tabs-panel"
          >
            <p className="lab-tabs-kicker">{`Step ${i + 1}`}</p>
            <p className="lab-tabs-body">{step.body}</p>
          </div>
        ))}
      </div>
      <style>{`
.lab-tabs-h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin:0 0 16px}
.lab-tabs-card{width:min(720px,100%);margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,.28);border-radius:16px;box-sizing:border-box}
.lab-tabs-list{display:flex;gap:8px;flex-wrap:wrap;border-bottom:1px solid rgba(176,203,188,.2);padding-bottom:12px;margin-bottom:16px}
.lab-tabs-tab{font-family:var(--sans);font-size:14px;color:#e8eee9;background:transparent;border:1px solid rgba(176,203,188,.28);border-radius:999px;padding:8px 16px;cursor:pointer}
.lab-tabs-tab[aria-selected="true"]{background:var(--sage);color:var(--forest);border-color:var(--sage)}
.lab-tabs-tab:focus-visible{outline:2px solid var(--sage);outline-offset:2px}
.lab-tabs-panel{outline:none}
.lab-tabs-kicker{font-family:var(--sans);font-weight:500;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--sage);margin:0 0 8px}
.lab-tabs-body{margin:0;font-family:var(--sans);font-size:15px;line-height:1.55;color:#e8eee9}
@media (prefers-reduced-motion:reduce){.lab-tabs-tab{transition:none}}
      `}</style>
    </section>
  );
}
