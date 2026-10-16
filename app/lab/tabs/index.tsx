"use client";
import { useRef, useState, type KeyboardEvent } from "react";

const STEPS = [
  { id: "code", label: "Code", kicker: "Alder", title: "Write the slot", body: "Alder codes one client component from the spec, mounts it in the lab slot, and ships a preview branch." },
  { id: "review", label: "Review", kicker: "Rowan", title: "Check the preview", body: "Rowan reviews the live preview for markup, keyboard, layout, and Forest Mist brand." },
  { id: "qa", label: "QA", kicker: "Cedar", title: "Sign off", body: "Cedar runs the functional checks on the preview and reports PASS or FAIL to the coordinator." },
];

const css = `
.lab-tabs{width:min(720px,100%);margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,0.28);border-radius:16px;color:var(--mist,#F2EFE6);box-sizing:border-box}
.lab-tabs h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 18px;color:var(--mist,#F2EFE6)}
.lab-tablist{display:flex;gap:8px;flex-wrap:wrap}
.lab-tab{font-family:var(--sans);font-weight:500;letter-spacing:0.16em;text-transform:uppercase;font-size:12px;background:transparent;color:var(--mist,#E8EEE9);border:1px solid rgba(176,203,188,0.28);border-radius:999px;padding:8px 14px;cursor:pointer}
.lab-tab[aria-selected="true"]{background:var(--sage);color:#121A16;border-color:var(--sage)}
.lab-panel{margin-top:20px}
.lab-kicker{font-family:var(--sans);font-weight:500;letter-spacing:0.16em;text-transform:uppercase;font-size:11px;color:var(--sage);margin:0 0 6px}
.lab-panel h3{font-family:var(--serif);font-weight:400;font-size:20px;margin:0 0 8px}
.lab-panel p{margin:0;line-height:1.55;color:#E8EEE9}
@media (prefers-reduced-motion:reduce){.lab-tab{transition:none}}
`;

export default function Tabs() {
  const [i, setI] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  function select(n: number) {
    setI(n);
    refs.current[n]?.focus();
  }
  function onKey(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    select((i + (e.key === "ArrowRight" ? 1 : 2)) % 3);
  }

  return (
    <section data-lab="tabs" aria-labelledby="lab-tabs-h2" className="lab-tabs">
      <style>{css}</style>
      <h2 id="lab-tabs-h2">How the showcase runs</h2>
      <div role="tablist" className="lab-tablist" aria-label="Showcase steps">
        {STEPS.map((s, n) => (
          <button
            key={s.id}
            id={`lab-tab-${s.id}`}
            role="tab"
            aria-selected={i === n}
            aria-controls={`lab-panel-${s.id}`}
            tabIndex={i === n ? 0 : -1}
            className="lab-tab"
            ref={(el) => { refs.current[n] = el; }}
            onClick={() => select(n)}
            onKeyDown={onKey}
          >
            {s.label}
          </button>
        ))}
      </div>
      {STEPS.map((s, n) => (
        <div
          key={s.id}
          id={`lab-panel-${s.id}`}
          role="tabpanel"
          aria-labelledby={`lab-tab-${s.id}`}
          hidden={i !== n}
          className="lab-panel"
        >
          <p className="lab-kicker">{s.kicker}</p>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
        </div>
      ))}
    </section>
  );
}
