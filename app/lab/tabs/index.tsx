"use client";
import { useId, useState } from "react";

const STEPS: readonly [string, string][] = [
  ["Design", "Hazel shapes Forest Mist and artwork before code lands."],
  ["Build", "Alder writes the lab feature, runs the gate, and ships."],
  ["Review & QA", "Rowan reviews the PR; Cedar signs off before merge."],
];

export default function TabsLab() {
  const baseId = useId().replace(/:/g, "");
  const [selected, setSelected] = useState(0);
  const pick = (index: number) =>
    setSelected((index + STEPS.length) % STEPS.length);
  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      pick(selected + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      pick(selected - 1);
    }
  };

  return (
    <section data-lab="tabs" aria-labelledby={`${baseId}-h`} className="lab-wrap">
      <h2 id={`${baseId}-h`} className="lab-title">How the showcase team works</h2>
      <div className="lab-card">
        <div role="tablist" aria-label="Showcase workflow steps" className="lab-tablist">
          {STEPS.map(([title], index) => {
            const tabId = `${baseId}-t${index}`;
            const panelId = `${baseId}-p${index}`;
            const on = selected === index;
            return (
              <button
                key={tabId}
                type="button"
                role="tab"
                id={tabId}
                aria-selected={on}
                aria-controls={panelId}
                tabIndex={on ? 0 : -1}
                className={on ? "lab-tab lab-tab-on" : "lab-tab"}
                onClick={() => pick(index)}
                onKeyDown={onKeyDown}
              >
                {title}
              </button>
            );
          })}
        </div>
        {STEPS.map(([, body], index) => {
          const tabId = `${baseId}-t${index}`;
          const panelId = `${baseId}-p${index}`;
          const on = selected === index;
          return (
            <div
              key={panelId}
              role="tabpanel"
              id={panelId}
              aria-labelledby={tabId}
              hidden={!on}
              className="lab-panel"
            >
              <p className="lab-copy">{body}</p>
            </div>
          );
        })}
      </div>
      <style>{`
.lab-wrap{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6)}
.lab-title{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;margin:0 0 20px}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.35)}
.lab-tablist{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px}
.lab-tab{font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:11px;padding:10px 14px;border-radius:999px;border:1px solid rgba(176,203,188,.28);background:transparent;color:var(--mist,#E8EEE9);cursor:pointer}
.lab-tab-on{background:var(--sage);color:#121A16;border-color:transparent}
.lab-tab:focus-visible{outline:2px solid var(--sage);outline-offset:2px}
.lab-copy{margin:0;line-height:1.6;font-size:16px}
      `}</style>
    </section>
  );
}
