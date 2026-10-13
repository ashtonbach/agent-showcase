"use client";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

const STEPS = [
  { id: "write", tab: "Write", title: "Coder ships the feature", body: "The coder writes one client lab slot from the live spec, then builds and self-checks before push." },
  { id: "review", tab: "Review", title: "Reviewer reads the page", body: "Priya reviews a11y, brand, and the gate, then sends APPROVE or CHANGES to the coordinator." },
  { id: "qa", tab: "QA", title: "QA signs off", body: "Felix runs the functional and visual checks and posts PASS or FAIL with each finding." },
];

const css = `
.lab-tabs{width:min(720px,100%);margin:8px auto 56px;box-sizing:border-box}
.lab-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;box-sizing:border-box}
.lab-tabs h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin:8px 0 16px}
.lab-tablist{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 16px;padding:0}
.lab-tab{font-family:var(--sans);font-weight:500;letter-spacing:0.16em;text-transform:uppercase;background:transparent;color:#F2EFE6;border:1px solid rgba(176,203,188,0.28);border-radius:999px;padding:8px 14px;cursor:pointer}
.lab-tab[aria-selected="true"]{background:var(--sage);color:#121A16}
.lab-panel{color:#E8EEE9;font-family:var(--sans);line-height:1.55}
.lab-panel h3{font-family:var(--serif);font-weight:400;font-size:22px;color:var(--mist);margin:0 0 8px}
.lab-panel p{margin:0}
@media (prefers-reduced-motion:reduce){.lab-tab{transition:none}}
`;

export default function Tabs() {
  const [sel, setSel] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const saw = useRef(false);
  useEffect(() => {
    if (!saw.current) { saw.current = true; return; }
    refs.current[sel]?.focus();
  }, [sel]);
  function pick(i: number) { setSel((i + STEPS.length) % STEPS.length); }
  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") { e.preventDefault(); pick(sel + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); pick(sel - 1); }
  }

  return (
    <section data-lab="tabs" aria-labelledby="lab-tabs-title" className="lab-tabs">
      <style>{css}</style>
      <p className="label">How the run works</p>
      <h2 id="lab-tabs-title">Three steps on the showcase team</h2>
      <div className="lab-card">
        <div className="lab-tablist" role="tablist" aria-label="Showcase steps" onKeyDown={onKey}>
          {STEPS.map((s, i) => (
            <button key={s.id} id={`lab-tab-${s.id}`} className="lab-tab" role="tab" aria-selected={sel === i} aria-controls={`lab-panel-${s.id}`} tabIndex={sel === i ? 0 : -1} ref={(el) => { refs.current[i] = el; }} onClick={() => pick(i)}>{s.tab}</button>
          ))}
        </div>
        {STEPS.map((s, i) => (
          <div key={s.id} id={`lab-panel-${s.id}`} className="lab-panel" role="tabpanel" aria-labelledby={`lab-tab-${s.id}`} hidden={sel !== i}>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
