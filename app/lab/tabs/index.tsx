"use client";

import { useEffect, useId, useRef, useState } from "react";

const STEPS = [
  { title: "Design", body: "Hazel sets Forest Mist visuals while the run streams on the viewer." },
  { title: "Build", body: "Alder codes one lab feature and ships it through the merge gate." },
  { title: "Review", body: "Rowan reviews the PR; Cedar QA signs off before the operator merges." },
];

export default function TabsLab() {
  const base = useId().replace(/:/g, "");
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const skipFocus = useRef(true);
  const headingId = `${base}-title`;

  useEffect(() => {
    if (skipFocus.current) {
      skipFocus.current = false;
      return;
    }
    tabRefs.current[selected]?.focus();
  }, [selected]);

  const move = (delta: number) =>
    setSelected((i) => (i + delta + STEPS.length) % STEPS.length);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
  };

  return (
    <section data-lab="tabs" aria-labelledby={headingId}>
      <style>{`.lab-tabs-wrap{width:min(720px,100%);margin:8px auto 56px}.lab-tabs-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.35)}.lab-tabs-title{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;color:var(--mist,#f2efe6);margin:0 0 20px}.lab-tablist{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 20px;padding:0}.lab-tab{font-family:var(--sans);font-size:14px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--mist,#e8eee9);background:transparent;border:1px solid rgba(176,203,188,.28);border-radius:999px;padding:10px 16px;cursor:pointer}.lab-tab[aria-selected=true]{background:var(--sage);color:#121a16;border-color:transparent}.lab-tab:focus-visible{outline:2px solid var(--sage);outline-offset:2px}.lab-tabpanel{color:var(--mist,#e8eee9);line-height:1.55;margin:0;font-size:16px}.lab-tabpanel[hidden]{display:none}@media (prefers-reduced-motion:reduce){.lab-tab{transition:none}}`}</style>
      <div className="lab-tabs-wrap">
        <div className="lab-tabs-card">
          <h2 id={headingId} className="lab-tabs-title">How this run works</h2>
          <div role="tablist" aria-label="Showcase team steps" className="lab-tablist" onKeyDown={onKeyDown}>
            {STEPS.map((step, index) => {
              const tabId = `${base}-tab-${index}`;
              const panelId = `${base}-panel-${index}`;
              const on = selected === index;
              return (
                <button
                  key={tabId}
                  type="button"
                  role="tab"
                  id={tabId}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  aria-selected={on}
                  aria-controls={panelId}
                  tabIndex={on ? 0 : -1}
                  className="lab-tab"
                  onClick={() => setSelected(index)}
                >
                  {step.title}
                </button>
              );
            })}
          </div>
          {STEPS.map((step, index) => {
            const tabId = `${base}-tab-${index}`;
            const panelId = `${base}-panel-${index}`;
            const on = selected === index;
            return (
              <div
                key={panelId}
                role="tabpanel"
                id={panelId}
                aria-labelledby={tabId}
                hidden={!on}
                className="lab-tabpanel"
              >
                {step.body}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
