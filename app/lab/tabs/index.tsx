"use client";
import { useId, useLayoutEffect, useState } from "react";
const STEPS = [
  { label: "Design", text: "Hazel sets Forest Mist visuals for each lab slot before code starts." },
  { label: "Build", text: "Alder codes the spec in the lab slot and ships through the kit gate." },
  { label: "Review", text: "Rowan reviews the PR and Cedar QA signs off on preview before merge." },
] as const;
export default function TabsLab() {
  const uid = useId().replace(/:/g, "");
  const titleId = `${uid}-title`;
  const [active, setActive] = useState(0);
  const n = STEPS.length;
  useLayoutEffect(() => {
    document.getElementById(`${uid}-tab-${active}`)?.focus();
  }, [active, uid]);
  const select = (index: number) => setActive(((index % n) + n) % n);
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") { event.preventDefault(); select(active + 1); }
    else if (event.key === "ArrowLeft") { event.preventDefault(); select(active - 1); }
  };
  return (
    <section data-lab="tabs" aria-labelledby={titleId}>
      <h2 id={titleId}>How the showcase team works</h2>
      <div className="lab-tabs-shell">
        <div className="lab-tabs-list" role="tablist" aria-label="Showcase workflow steps" onKeyDown={onKeyDown}>
          {STEPS.map((step, i) => (
            <button key={step.label} type="button" role="tab" className="lab-tab" id={`${uid}-tab-${i}`}
              aria-selected={active === i} aria-controls={`${uid}-panel-${i}`} tabIndex={active === i ? 0 : -1}
              onClick={() => select(i)}>{step.label}</button>
          ))}
        </div>
        {STEPS.map((step, i) => (
          <div key={step.label} role="tabpanel" className="lab-tabpanel" id={`${uid}-panel-${i}`}
            aria-labelledby={`${uid}-tab-${i}`} hidden={active !== i}><p>{step.text}</p></div>
        ))}
      </div>
      <style>{`[data-lab="tabs"]{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#f2efe6)}
[data-lab="tabs"] h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 20px;line-height:1.2}
.lab-tabs-shell{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.35)}
.lab-tabs-list{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px}
.lab-tab{font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:11px;padding:10px 14px;border-radius:999px;border:1px solid rgba(176,203,188,.28);background:transparent;color:#e8eee9;cursor:pointer;transition:background .2s,border-color .2s}
.lab-tab[aria-selected=true]{background:var(--sage);color:#121a16;border-color:var(--sage)}
.lab-tab:focus-visible{outline:2px solid var(--sage);outline-offset:2px}
.lab-tabpanel p{margin:0;line-height:1.55;font-size:16px;color:#e8eee9}
@media (prefers-reduced-motion:reduce){.lab-tab{transition:none}}`}</style>
    </section>
  );
}
