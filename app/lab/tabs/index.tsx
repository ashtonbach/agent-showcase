"use client";
import { useRef, useState } from "react";

const STEPS = [
  ["tab-plan", "panel-plan", "Plan", "Coordinator sets the run", "The coordinator assigns roles, shares the spec, and keeps handoffs on schedule."],
  ["tab-build", "panel-build", "Build", "Coder ships in the lab slot", "The coder implements the scoped lab component, runs gate checks, and pushes for review."],
  ["tab-verify", "panel-verify", "Verify", "Review and QA sign off", "Review checks accessibility and copy; QA validates layout and console behavior before merge."],
] as const;

export default function TabsLab() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pick = (i: number) => {
    setActive(i);
    tabRefs.current[i]?.focus();
  };
  const onKey = (i: number, e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    pick(e.key === "ArrowRight" ? (i + 1) % 3 : (i + 2) % 3);
  };
  const css = `.lab-tabs{width:min(720px,100%);margin:8px auto 56px}.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.35)}.lab-tablist{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 20px}.lab-tab{font:500 12px var(--sans);letter-spacing:.16em;text-transform:uppercase;color:var(--mist);background:transparent;border:1px solid rgba(176,203,188,.28);border-radius:999px;padding:10px 16px;cursor:pointer}.lab-tab[aria-selected=true]{color:#121a16;background:var(--sage);border-color:var(--sage)}.lab-tab:focus-visible{outline:2px solid var(--sage);outline-offset:2px}.lab-pt{font:400 22px var(--serif);color:var(--mist);margin:0 0 12px}.lab-pb{margin:0;color:#f2efe6;line-height:1.55}@media(prefers-reduced-motion:reduce){.lab-tab{transition:none}}`;

  return (
    <section data-lab="tabs" aria-labelledby="lab-tabs-h" className="lab-tabs">
      <style>{css}</style>
      <h2 id="lab-tabs-h">How the showcase team works</h2>
      <div className="lab-card">
        <div role="tablist" aria-label="Showcase workflow steps" className="lab-tablist">
          {STEPS.map(([tid, , label], i) => (
            <button key={tid} ref={(el) => { tabRefs.current[i] = el; }} type="button" role="tab" id={tid}
              aria-selected={active === i} aria-controls={STEPS[i][1]} tabIndex={active === i ? 0 : -1}
              className="lab-tab" onClick={() => pick(i)} onKeyDown={(e) => onKey(i, e)}>{label}</button>
          ))}
        </div>
        {STEPS.map(([tid, pid, , title, body], i) => (
          <div key={pid} role="tabpanel" id={pid} aria-labelledby={tid} hidden={active !== i}>
            <p className="lab-pt">{title}</p>
            <p className="lab-pb">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
