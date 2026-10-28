"use client";
import { useState, type KeyboardEvent } from "react";
const TITLE_ID = "lab-tabs-heading";
const TABS = [
  { id: "tab-plan", panel: "panel-plan", label: "Plan", body: "The coordinator scopes each run, assigns roles, and keeps the team on deadline." },
  { id: "tab-build", panel: "panel-build", label: "Build", body: "Alder codes the lab feature from the spec while Hazel supplies artwork in parallel." },
  { id: "tab-ship", panel: "panel-ship", label: "Ship", body: "Gates verify layout and build; Rowan reviews and Cedar signs off before merge." },
];
const css = `.lab-tabs-wrap{width:min(720px,100%);margin:8px auto 56px}.lab-tabs-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.35)}.lab-tabs-title{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;color:var(--mist,#f2efe6);margin:0 0 20px}.lab-tablist{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 16px}.lab-tab{font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:12px;padding:10px 14px;border-radius:999px;border:1px solid rgba(176,203,188,.28);background:transparent;color:var(--mist,#e8eee9);cursor:pointer}.lab-tab[aria-selected="true"]{background:var(--sage);color:#121a16;border-color:var(--sage)}.lab-tab:focus-visible{outline:2px solid var(--sage);outline-offset:2px}.lab-tabpanel{color:var(--mist,#f2efe6);font-size:16px;line-height:1.55;margin:0}.lab-tabpanel[hidden]{display:none}@media (prefers-reduced-motion:reduce){.lab-tab{transition:none}}`;
export default function TabsLab() {
  const [selected, setSelected] = useState(0);
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (selected + (e.key === "ArrowRight" ? 1 : -1) + TABS.length) % TABS.length;
    setSelected(next);
    document.getElementById(TABS[next].id)?.focus();
  };
  return (
    <section className="lab-tabs-wrap" data-lab="tabs" aria-labelledby={TITLE_ID}>
      <div className="lab-tabs-card">
        <h2 id={TITLE_ID} className="lab-tabs-title">How the showcase team works</h2>
        <div role="tablist" aria-label="Showcase workflow steps" className="lab-tablist" onKeyDown={onKeyDown}>
          {TABS.map((t, i) => (
            <button key={t.id} type="button" role="tab" id={t.id} className="lab-tab" aria-selected={selected === i} aria-controls={t.panel} tabIndex={selected === i ? 0 : -1} onClick={() => setSelected(i)}>{t.label}</button>
          ))}
        </div>
        {TABS.map((t, i) => (
          <div key={t.panel} role="tabpanel" id={t.panel} className="lab-tabpanel" aria-labelledby={t.id} hidden={selected !== i}><p>{t.body}</p></div>
        ))}
      </div>
      <style>{css}</style>
    </section>
  );
}

