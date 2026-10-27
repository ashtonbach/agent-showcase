"use client";

import { useRef, useState } from "react";

const FLOW = [
  { id: "align", label: "Align", head: "Everyone reads the same brief", body: "A written spec lands before coding so review and QA judge one target." },
  { id: "build", label: "Build", head: "Work stays inside the lab slot", body: "The coder changes only their lab folder and the shared import line on the page." },
  { id: "verify", label: "Verify", head: "Checks run before merge", body: "Layout, gate, reviewer, and QA on the preview must pass before the branch ships." },
];

export default function ShowcaseTabs() {
  const [idx, setIdx] = useState(0);
  const refs = useRef<HTMLButtonElement[]>([]);

  function pick(n: number) {
    const i = (n + FLOW.length) % FLOW.length;
    setIdx(i);
    refs.current[i]?.focus();
  }

  function onKey(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight") { event.preventDefault(); pick(idx + 1); }
    else if (event.key === "ArrowLeft") { event.preventDefault(); pick(idx - 1); }
  }

  return (
    <section data-lab="tabs" aria-labelledby="showcase-tabs-h2">
      <h2 id="showcase-tabs-h2" className="lab-st-h2">How the showcase team works</h2>
      <div className="lab-st-card">
        <div role="tablist" aria-label="Team workflow" className="lab-st-list" onKeyDown={onKey}>
          {FLOW.map((t, i) => (
            <button
              key={t.id}
              type="button"
              ref={(el) => { if (el) refs.current[i] = el; }}
              role="tab"
              id={`showcase-tab-${t.id}`}
              aria-selected={i === idx}
              aria-controls={`showcase-panel-${t.id}`}
              tabIndex={i === idx ? 0 : -1}
              className={i === idx ? "lab-st-tab on" : "lab-st-tab"}
              onClick={() => pick(i)}
            >
              {t.label}
            </button>
          ))}
        </div>
        {FLOW.map((t, i) => (
          <div key={t.id} role="tabpanel" id={`showcase-panel-${t.id}`} aria-labelledby={`showcase-tab-${t.id}`} hidden={i !== idx} className="lab-st-panel">
            <h3 className="lab-st-h3">{t.head}</h3>
            <p className="lab-st-p">{t.body}</p>
          </div>
        ))}
      </div>
      <style>{`
.lab-st-h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin:0 0 16px}
.lab-st-card{width:min(720px,100%);margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,.28);border-radius:16px;box-sizing:border-box}
.lab-st-list{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:18px}
.lab-st-tab{font-family:var(--sans);font-weight:500;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#e8eee9;background:transparent;border:1px solid rgba(176,203,188,.28);border-radius:999px;padding:8px 14px;cursor:pointer}
.lab-st-tab.on{color:#121a16;background:var(--sage);border-color:var(--sage)}
.lab-st-tab:focus-visible{outline:2px solid var(--sage);outline-offset:2px}
.lab-st-h3{font-family:var(--serif);font-weight:400;font-size:20px;color:var(--mist);margin:0 0 8px}
.lab-st-p{font-family:var(--sans);font-size:15px;line-height:1.5;color:#f2efe6;margin:0}
      `}</style>
    </section>
  );
}
