"use client";

import {
  useCallback,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

const STEPS = [
  {
    title: "Hazel shapes the design",
    body: "Hazel defines layout, typography, and Forest Mist styling so each lab section matches the demo site.",
  },
  {
    title: "Alder builds and ships",
    body: "Alder writes the lab component on a feature branch, runs the self-check and gate, then pushes for review.",
  },
  {
    title: "Rowan and Cedar close the loop",
    body: "Rowan reviews the pull request; Cedar validates behavior on the preview. The kit merges when checks pass.",
  },
];

const css = `
[data-lab="tabs"]{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#f2efe6)}
[data-lab="tabs"] h2{margin:0 0 20px;font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2}
.lab-tabs-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px}
.lab-tabs-list{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 20px;padding:0}
.lab-tabs-tab{font-family:var(--sans);font-size:13px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;padding:10px 14px;border:1px solid rgba(176,203,188,.28);border-radius:8px;background:transparent;color:var(--mist,#f2efe6);cursor:pointer}
.lab-tabs-tab[aria-selected=true]{background:var(--sage,#b0cbb8);color:#121a16;border-color:var(--sage,#b0cbb8)}
.lab-tabs-tab:focus-visible{outline:2px solid var(--sage,#b0cbb8);outline-offset:2px}
.lab-tabs-panel h3{margin:0 0 10px;font-family:var(--serif);font-weight:400;font-size:22px;line-height:1.25}
.lab-tabs-panel p{margin:0;font-family:var(--sans);font-size:16px;line-height:1.55;color:#e8eee9}
@media (prefers-reduced-motion:reduce){.lab-tabs-tab{transition:none}}
`;

export default function TabsLab() {
  const base = useId();
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabId = (i: number) => `${base}-tab-${i}`;
  const panelId = (i: number) => `${base}-panel-${i}`;

  const select = useCallback((index: number) => {
    setSelected(index);
    tabRefs.current[index]?.focus();
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      select((index + 1) % STEPS.length);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      select((index - 1 + STEPS.length) % STEPS.length);
    }
  };

  return (
    <section data-lab="tabs" aria-labelledby={`${base}-heading`}>
      <style>{css}</style>
      <h2 id={`${base}-heading`}>How the showcase team works</h2>
      <div className="lab-tabs-card">
        <div role="tablist" aria-label="Showcase workflow steps" className="lab-tabs-list">
          {STEPS.map((step, index) => (
            <button
              key={tabId(index)}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={tabId(index)}
              aria-selected={selected === index}
              aria-controls={panelId(index)}
              tabIndex={selected === index ? 0 : -1}
              className="lab-tabs-tab"
              onClick={() => setSelected(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              {step.title.split(" ")[0]}
            </button>
          ))}
        </div>
        {STEPS.map((step, index) => (
          <div
            key={panelId(index)}
            role="tabpanel"
            id={panelId(index)}
            aria-labelledby={tabId(index)}
            hidden={selected !== index}
            className="lab-tabs-panel"
          >
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}