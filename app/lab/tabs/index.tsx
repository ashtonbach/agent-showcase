"use client";

import { useRef, useState, type KeyboardEvent } from "react";

const STEPS = [
  {
    key: "write",
    label: "Write",
    title: "Alder writes the feature",
    body: "The coder implements the lab from the spec as one client component, then ships a preview for review.",
  },
  {
    key: "review",
    label: "Review",
    title: "Rowan checks the preview",
    body: "The reviewer walks the live preview for layout, accessibility, and the spec, then posts APPROVE or CHANGES.",
  },
  {
    key: "qa",
    label: "QA",
    title: "Cedar signs off",
    body: "QA rechecks the shipped preview and reports PASS or FAIL with each finding to the coordinator.",
  },
];

const css = `
.lab-tabs{width:min(720px,100%);max-width:100%;margin:8px auto 56px;color:var(--mist,#F2EFE6);box-sizing:border-box}
.lab-tabs *,.lab-tabs *::before,.lab-tabs *::after{box-sizing:border-box}
.lab-tabs h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 16px;line-height:1.25}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px}
.lab-tablist{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 20px;padding:0}
.lab-tab{font-family:var(--sans);font-weight:500;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--mist,#F2EFE6);background:transparent;border:1px solid rgba(176,203,188,.28);border-radius:999px;padding:8px 14px;cursor:pointer}
.lab-tab[aria-selected="true"]{background:var(--sage);color:#121A16;border-color:var(--sage)}
.lab-panel{margin:0}
.lab-panel[hidden]{display:none}
.lab-kicker{font-family:var(--sans);font-weight:500;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--sage);margin:0 0 8px}
.lab-panel h3{font-family:var(--serif);font-weight:400;font-size:22px;margin:0 0 8px}
.lab-panel p{margin:0;line-height:1.55;color:#E8EEE9}
@media (max-width:420px){.lab-card{padding:16px}.lab-tab{padding:8px 12px}}
@media (prefers-reduced-motion:reduce){.lab-tab,.lab-panel{transition:none}}
`;

export default function Tabs() {
  const [i, setI] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (n: number) => {
    const next = (n + STEPS.length) % STEPS.length;
    setI(next);
    refs.current[next]?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      select(i + 1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      select(i - 1);
    }
  };

  return (
    <section data-lab="tabs" aria-labelledby="lab-tabs-title" className="lab-tabs">
      <style>{css}</style>
      <h2 id="lab-tabs-title">How the showcase team works</h2>
      <div className="lab-card">
        <div role="tablist" aria-label="Showcase steps" className="lab-tablist" onKeyDown={onKey}>
          {STEPS.map((s, n) => (
            <button
              key={s.key}
              id={`lab-tab-${s.key}`}
              role="tab"
              type="button"
              aria-selected={i === n}
              aria-controls={`lab-panel-${s.key}`}
              tabIndex={i === n ? 0 : -1}
              className="lab-tab"
              ref={(el) => {
                refs.current[n] = el;
              }}
              onClick={() => select(n)}
            >
              {s.label}
            </button>
          ))}
        </div>
        {STEPS.map((s, n) => (
          <div
            key={s.key}
            id={`lab-panel-${s.key}`}
            role="tabpanel"
            aria-labelledby={`lab-tab-${s.key}`}
            hidden={i !== n}
            className="lab-panel"
          >
            <p className="lab-kicker">{s.label}</p>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
