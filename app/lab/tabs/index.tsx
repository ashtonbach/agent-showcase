"use client";

import { useRef, useState, type KeyboardEvent } from "react";

const STEPS = [
  { id: "write", label: "Write", title: "Coder ships the lab slot", body: "The coder writes one client component from the spec and mounts it in the empty lab slot." },
  { id: "review", label: "Review", title: "Review checks the preview", body: "Review walks the Vercel preview for layout, contrast, and the accessibility contract." },
  { id: "qa", label: "QA", title: "QA signs off", body: "QA records PASS or FAIL on the live preview before the run closes." },
];

const css = `.lab-tabs{width:min(720px,100%);max-width:100%;margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,.28);border-radius:16px;box-sizing:border-box;color:var(--mist)}
.lab-tabs h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;margin:8px 0 20px;overflow-wrap:anywhere}
.lab-tablist{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 20px}
.lab-tab{font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:12px;background:transparent;color:var(--mist);border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:10px 14px;cursor:pointer}
.lab-tab[aria-selected="true"]{background:var(--sage);color:#121A16}
.lab-panel{color:#E8EEE9}
.lab-panel[hidden]{display:none}
.lab-step{font-family:var(--serif);font-weight:400;font-size:20px;margin:0 0 8px;color:var(--mist)}
.lab-panel p{margin:0;font-family:var(--sans);line-height:1.5}
@media (prefers-reduced-motion:reduce){.lab-tab,.lab-panel{transition:none}}`;

export default function Tabs() {
  const [i, setI] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  function select(n: number) {
    const next = (n + 3) % 3;
    setI(next);
    refs.current[next]?.focus();
  }
  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") { e.preventDefault(); select(i + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); select(i - 1); }
  }

  return (
    <section data-lab="tabs" aria-labelledby="lab-tabs-title" className="lab-tabs">
      <style>{css}</style>
      <p className="label">Showcase</p>
      <h2 id="lab-tabs-title">How the team works</h2>
      <div role="tablist" aria-label="Team steps" className="lab-tablist" onKeyDown={onKey}>
        {STEPS.map((s, n) => (
          <button key={s.id} id={"lab-tab-" + s.id} role="tab" aria-selected={i === n} aria-controls={"lab-panel-" + s.id} tabIndex={i === n ? 0 : -1} className="lab-tab" ref={(el) => { refs.current[n] = el; }} onClick={() => select(n)}>{s.label}</button>
        ))}
      </div>
      {STEPS.map((s, n) => (
        <div key={s.id} id={"lab-panel-" + s.id} role="tabpanel" aria-labelledby={"lab-tab-" + s.id} hidden={i !== n} className="lab-panel">
          <h3 className="lab-step">{s.title}</h3>
          <p>{s.body}</p>
        </div>
      ))}
    </section>
  );
}

