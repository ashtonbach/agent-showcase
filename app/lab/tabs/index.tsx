"use client";
import { useRef, useState } from "react";
const PANELS: [string, string, string][] = [
  ["Design", "Hazel defines Forest Mist layout and any artwork while the run clock is still moving."],
  ["Build", "Alder implements the lab spec, keeps the diff inside the gate cap, and ships on the run branch."],
  ["Review", "Rowan reviews accessibility and copy; Cedar signs off QA before the coordinator merges."],
];
export default function TabsLab() {
  const [idx, setIdx] = useState(0);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);
  const pick = (n: number) => { setIdx(n); btns.current[n]?.focus(); };
  const onKey = (e: React.KeyboardEvent<HTMLButtonElement>, at: number) => {
    if (e.key === "ArrowRight") { e.preventDefault(); pick((at + 1) % 3); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); pick((at + 2) % 3); }
  };
  return (
    <section data-lab="tabs" aria-labelledby="tabs-h2">
      <h2 id="tabs-h2">How the showcase team works</h2>
      <div className="lab-shell">
        <div role="tablist" aria-label="Showcase team workflow" className="lab-row">
          {PANELS.map(([label], n) => (
            <button key={n} type="button" role="tab" id={`tabs-tab-${n}`} ref={(el) => { btns.current[n] = el; }}
              aria-selected={idx === n} aria-controls={`tabs-panel-${n}`} tabIndex={idx === n ? 0 : -1} className="lab-btn"
              onClick={() => pick(n)} onKeyDown={(e) => onKey(e, n)}>{label}</button>
          ))}
        </div>
        {PANELS.map(([label, copy], n) => (
          <div key={n} role="tabpanel" id={`tabs-panel-${n}`} aria-labelledby={`tabs-tab-${n}`} hidden={idx !== n}>
            <p className="lab-cap">{label}</p>
            <p className="lab-copy">{copy}</p>
          </div>
        ))}
      </div>
      <style>{`[data-lab="tabs"]{width:min(720px,100%);margin:8px auto 56px;color:var(--mist)}[data-lab="tabs"] .lab-shell{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px}[data-lab="tabs"] .lab-row{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}[data-lab="tabs"] .lab-btn{font:500 11px var(--sans);letter-spacing:.16em;text-transform:uppercase;padding:10px 14px;border-radius:999px;border:1px solid rgba(176,203,188,.35);background:transparent;color:var(--mist);cursor:pointer}[data-lab="tabs"] .lab-btn[aria-selected="true"]{background:var(--sage);border-color:var(--sage);color:#121A16}[data-lab="tabs"] .lab-btn:focus-visible{outline:2px solid var(--sage);outline-offset:2px}[data-lab="tabs"] .lab-cap{font:500 11px var(--sans);letter-spacing:.16em;text-transform:uppercase;color:var(--sage);margin:0 0 8px}[data-lab="tabs"] .lab-copy{margin:0;line-height:1.55;color:#F2EFE6}@media(prefers-reduced-motion:reduce){[data-lab="tabs"] .lab-btn{transition:none}}`}</style>
    </section>
  );
}
