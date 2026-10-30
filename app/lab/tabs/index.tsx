"use client";
import { useCallback, useRef, useState } from "react";

const STEPS = [
  { tab: "Design", body: "Hazel sets layout, type, and Forest Mist styling for each lab feature." },
  { tab: "Build", body: "Alder implements the spec in the lab slot and ships through the automated gate." },
  { tab: "Review", body: "Rowan reviews the PR and Cedar runs QA; the coordinator merges when checks pass." },
];

export default function TabsLab() {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const select = useCallback((i: number, focus = false) => {
    setSelected(i);
    if (focus) tabRefs.current[i]?.focus();
  }, []);
  const onKey = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      select((i + 1) % 3, true);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      select((i + 2) % 3, true);
    }
  };

  return (
    <section data-lab="tabs" aria-labelledby="lab-tabs-title">
      <style>{`[data-lab="tabs"]{width:min(720px,100%);margin:8px auto 56px}[data-lab="tabs"] .lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.35)}[data-lab="tabs"] [role=tablist]{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 20px}[data-lab="tabs"] [role=tab]{font:500 11px/1 var(--sans);letter-spacing:.16em;text-transform:uppercase;padding:10px 14px;border-radius:999px;border:1px solid rgba(176,203,188,.28);background:transparent;color:var(--mist);cursor:pointer}[data-lab="tabs"] [role=tab][aria-selected=true]{background:var(--sage);color:#121a16}[data-lab="tabs"] [role=tab]:focus-visible{outline:2px solid var(--sage);outline-offset:2px}[data-lab="tabs"] [role=tabpanel]{color:var(--mist);line-height:1.55;margin:0}`}</style>
      <h2 id="lab-tabs-title">How the showcase team works</h2>
      <div className="lab-card">
        <div role="tablist" aria-label="Showcase team steps">
          {STEPS.map((step, i) => {
            const tabId = `lab-tabs-tab-${i}`;
            const panelId = `lab-tabs-panel-${i}`;
            const on = selected === i;
            return (
              <button
                key={tabId}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={tabId}
                aria-selected={on}
                aria-controls={panelId}
                tabIndex={on ? 0 : -1}
                onClick={() => select(i)}
                onKeyDown={(e) => onKey(e, i)}
              >
                {step.tab}
              </button>
            );
          })}
        </div>
        {STEPS.map((step, i) => {
          const tabId = `lab-tabs-tab-${i}`;
          const panelId = `lab-tabs-panel-${i}`;
          return (
            <div
              key={panelId}
              role="tabpanel"
              id={panelId}
              aria-labelledby={tabId}
              hidden={selected !== i}
            >
              <p>{step.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
