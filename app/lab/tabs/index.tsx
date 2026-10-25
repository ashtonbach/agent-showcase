"use client";
import { useCallback, useRef, useState } from "react";

const TITLE_ID = "lab-tabs-title";
const STEPS = [
  { id: "tab-plan", panelId: "panel-plan", label: "Plan", heading: "Kickoff", text: "The coordinator assigns roles and shares one spec so the run stays aligned." },
  { id: "tab-build", panelId: "panel-build", label: "Build", heading: "Parallel work", text: "The coder ships the lab feature while design and review prepare assets and checks." },
  { id: "tab-ship", panelId: "panel-ship", label: "Ship", heading: "Gate and preview", text: "Automated gate builds, verifies layout, then pushes a branch preview for QA." },
] as const;

export default function TabsLab() {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const focusTab = useCallback((i: number) => { tabRefs.current[i]?.focus(); }, []);
  const selectTab = useCallback((i: number, focus: boolean) => {
    setSelected(i);
    if (focus) focusTab(i);
  }, [focusTab]);
  const onTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight") { e.preventDefault(); selectTab((i + 1) % 3, true); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); selectTab((i + 2) % 3, true); }
  };
  const css = `[data-lab="tabs"]{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#E8EEE9)}
[data-lab="tabs"] .lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.35)}
[data-lab="tabs"] .lab-tablist{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 20px;padding:0}
[data-lab="tabs"] .lab-tab{font:500 .75rem/1.2 var(--sans);letter-spacing:.16em;text-transform:uppercase;color:var(--mist);background:0;border:1px solid rgba(176,203,188,.35);border-radius:999px;padding:10px 16px;cursor:pointer}
[data-lab="tabs"] .lab-tab[aria-selected="true"]{background:var(--sage);color:#121A16;border-color:var(--sage)}
[data-lab="tabs"] .lab-tab:focus-visible{outline:2px solid var(--sage);outline-offset:2px}
[data-lab="tabs"] .lab-role{display:inline-block;margin-bottom:8px;font:500 .7rem/1 var(--sans);letter-spacing:.16em;text-transform:uppercase;color:var(--sage)}
[data-lab="tabs"] .lab-panel-title{font:400 1.25rem/1.2 var(--serif);margin:0 0 12px;color:var(--mist)}
[data-lab="tabs"] .lab-panel-text{margin:0;line-height:1.55}
@media (prefers-reduced-motion:reduce){[data-lab="tabs"] .lab-tab{transition:none}}`;

  return (
    <section data-lab="tabs" aria-labelledby={TITLE_ID}>
      <style>{css}</style>
      <h2 id={TITLE_ID}>How the showcase team works</h2>
      <div className="lab-card">
        <div role="tablist" aria-label="Showcase workflow steps" className="lab-tablist">
          {STEPS.map((step, i) => (
            <button key={step.id} type="button" role="tab" id={step.id} ref={(el) => { tabRefs.current[i] = el; }}
              className="lab-tab" aria-selected={selected === i} aria-controls={step.panelId}
              tabIndex={selected === i ? 0 : -1} onClick={() => selectTab(i, false)} onKeyDown={(e) => onTabKeyDown(e, i)}>
              {step.label}
            </button>
          ))}
        </div>
        {STEPS.map((step, i) => (
          <div key={step.panelId} role="tabpanel" id={step.panelId} aria-labelledby={step.id} hidden={selected !== i}>
            <span className="lab-role">Step {i + 1}</span>
            <h3 className="lab-panel-title">{step.heading}</h3>
            <p className="lab-panel-text">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
