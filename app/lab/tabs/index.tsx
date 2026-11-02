"use client";

import { useId, useRef, useState } from "react";

const COPY = [
  ["Design", "Hazel shapes Forest Mist while the run streams on the viewer."],
  ["Build", "Alder ships one lab feature through the merge gate."],
  ["Review", "Rowan reviews the PR; Cedar QA signs off before merge."],
] as const;

export default function TabsLab() {
  const uid = useId().replace(/:/g, "");
  const h2 = `${uid}-h2`;
  const [ix, setIx] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const pick = (n: number) => {
    setIx(n);
    queueMicrotask(() => refs.current[n]?.focus());
  };
  const keys = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      pick((ix + 1) % 3);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      pick((ix + 2) % 3);
    }
  };
  return (
    <section data-lab="tabs" aria-labelledby={h2}>
      <style>{`.lab-t{width:min(720px,100%);margin:8px auto 56px;border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.35)}.lab-t h2{font:400 30px/1.2 var(--serif);color:var(--mist,#f2efe6);margin:0 0 16px}.lab-tl{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 16px}.lab-tb{font:500 14px var(--sans);letter-spacing:.16em;text-transform:uppercase;color:var(--mist,#e8eee9);background:0;border:1px solid rgba(176,203,188,.28);border-radius:999px;padding:10px 14px;cursor:pointer}.lab-tb[aria-selected=true]{background:var(--sage);color:#121a16;border-color:transparent}.lab-tb:focus-visible{outline:2px solid var(--sage);outline-offset:2px}.lab-tp{color:var(--mist,#e8eee9);line-height:1.5;margin:0;font-size:16px}.lab-tp[hidden]{display:none}@media (prefers-reduced-motion:reduce){.lab-tb{transition:none}}`}</style>
      <div className="lab-t">
        <h2 id={h2}>How this run works</h2>
        <div role="tablist" aria-label="Showcase team steps" className="lab-tl" onKeyDown={keys}>
          {COPY.map(([label], i) => (
            <button key={i} type="button" role="tab" id={`${uid}-t${i}`} ref={(el) => { refs.current[i] = el; }} aria-selected={ix === i} aria-controls={`${uid}-p${i}`} tabIndex={ix === i ? 0 : -1} className="lab-tb" onClick={() => pick(i)}>{label}</button>
          ))}
        </div>
        {COPY.map(([_, text], i) => (
          <div key={i} role="tabpanel" id={`${uid}-p${i}`} aria-labelledby={`${uid}-t${i}`} hidden={ix !== i} className="lab-tp">{text}</div>
        ))}
      </div>
    </section>
  );
}
