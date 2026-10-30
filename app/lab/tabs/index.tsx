"use client";
import { useCallback, useId, useRef, useState, type KeyboardEvent } from "react";
const STEPS = [
  { tab: "Design", title: "Hazel sets the look", body: "Hazel picks type, color, and layout so each lab matches the Forest Mist brand." },
  { tab: "Build", title: "Alder ships the slot", body: "Alder writes the client component, wires app/page.tsx, and pushes through the merge gate." },
  { tab: "Review", title: "Rowan and Cedar QA", body: "Rowan reviews accessibility and spec fit; Cedar checks the preview before merge." },
];
export default function TabsLab() {
  const uid = useId().replace(/:/g, "");
  const h2Id = `tabs-title-${uid}`;
  const [idx, setIdx] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pick = useCallback((next: number, focus: boolean) => {
    const n = ((next % STEPS.length) + STEPS.length) % STEPS.length;
    setIdx(n);
    if (focus) tabRefs.current[n]?.focus();
  }, []);
  const onKey = useCallback((e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight") { e.preventDefault(); pick(i + 1, true); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); pick(i - 1, true); }
  }, [pick]);
  return (
    <section data-lab="tabs" aria-labelledby={h2Id}>
      <style>{`[data-lab="tabs"]{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#f2efe6)}
[data-lab="tabs"] h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.25;margin:0 0 20px}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.35)}
.lab-tablist{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 16px}
.lab-tab{font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:12px;color:var(--mist);background:0;border:1px solid rgba(176,203,188,.28);border-radius:999px;padding:10px 16px;cursor:pointer}
.lab-tab[aria-selected=true]{background:var(--sage,#b0cbbc);color:#121a16;border-color:transparent}
.lab-tab:focus-visible{outline:2px solid var(--sage);outline-offset:2px}
.lab-panel-title{font-family:var(--serif);font-size:22px;font-weight:400;margin:0 0 10px}
.lab-panel-body{margin:0;line-height:1.55;font-family:var(--sans);font-size:16px}
@media (prefers-reduced-motion:reduce){.lab-tab{transition:none}}`}</style>
      <h2 id={h2Id}>How this showcase run works</h2>
      <div className="lab-card">
        <div role="tablist" aria-label="Showcase team steps" className="lab-tablist">
          {STEPS.map((s, i) => {
            const tabId = `tab-${uid}-${i}`;
            const panelId = `panel-${uid}-${i}`;
            return (
              <button key={tabId} type="button" role="tab" id={tabId} ref={(el) => { tabRefs.current[i] = el; }}
                className="lab-tab" aria-selected={idx === i} aria-controls={panelId} tabIndex={idx === i ? 0 : -1}
                onClick={() => pick(i, false)} onKeyDown={(e) => onKey(e, i)}>{s.tab}</button>
            );
          })}
        </div>
        {STEPS.map((s, i) => {
          const tabId = `tab-${uid}-${i}`;
          const panelId = `panel-${uid}-${i}`;
          return (
            <div key={panelId} role="tabpanel" id={panelId} aria-labelledby={tabId} hidden={idx !== i} className="lab-panel">
              <h3 className="lab-panel-title">{s.title}</h3>
              <p className="lab-panel-body">{s.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
