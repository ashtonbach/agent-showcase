"use client";
import { useRef, useState, KeyboardEvent } from "react";

const TABS = [
  { id: "write", label: "Write", title: "Alder codes the lab slot", body: "The coder implements the live spec as a client component, then ships a preview for review." },
  { id: "review", label: "Review", title: "Rowan checks the preview", body: "The reviewer verifies accessibility, layout, and the gate on the deployed preview." },
  { id: "qa", label: "QA", title: "Cedar signs off", body: "QA exercises desktop and mobile, then posts PASS or FAIL to the coordinator." },
];

const css = `
.lab-tabs{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6);padding:0 12px;box-sizing:border-box}
.lab-tabs h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 16px;line-height:1.2}
.lab-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px}
.lab-list{display:flex;gap:8px;flex-wrap:wrap}
.lab-tab{font-family:var(--sans);font-weight:500;letter-spacing:0.16em;text-transform:uppercase;background:transparent;color:var(--mist,#F2EFE6);border:1px solid rgba(176,203,188,0.28);border-radius:999px;padding:8px 14px;cursor:pointer;font-size:12px}
.lab-tab[aria-selected="true"]{background:var(--sage);color:#121A16;border-color:var(--sage)}
.lab-kicker{font-family:var(--sans);font-weight:500;letter-spacing:0.16em;text-transform:uppercase;color:var(--sage);font-size:12px;margin:16px 0 0}
.lab-panel h3{font-family:var(--serif);font-weight:400;font-size:22px;margin:8px 0;color:var(--mist,#F2EFE6)}
.lab-panel p{color:#E8EEE9;margin:0;line-height:1.5}
@media (prefers-reduced-motion:reduce){.lab-tab{transition:none}}
`;

export default function Tabs() {
  const [sel, setSel] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  function pick(n: number) {
    setSel(n);
    refs.current[n]?.focus();
  }
  function onKey(e: KeyboardEvent<HTMLButtonElement>, n: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    pick(e.key === "ArrowRight" ? (n + 1) % 3 : (n + 2) % 3);
  }

  return (
    <section data-lab="tabs" aria-labelledby="lab-tabs-title" className="lab-tabs">
      <style>{css}</style>
      <h2 id="lab-tabs-title">How the team works</h2>
      <div className="lab-card">
        <div role="tablist" aria-label="Showcase steps" className="lab-list">
          {TABS.map((t, n) => (
            <button key={t.id} id={"lab-tab-" + t.id} role="tab" aria-selected={sel === n} aria-controls={"lab-panel-" + t.id} tabIndex={sel === n ? 0 : -1} ref={(el) => { refs.current[n] = el; }} onClick={() => pick(n)} onKeyDown={(e) => onKey(e, n)} className="lab-tab">{t.label}</button>
          ))}
        </div>
        {TABS.map((t, n) => (
          <div key={t.id} id={"lab-panel-" + t.id} role="tabpanel" aria-labelledby={"lab-tab-" + t.id} hidden={sel !== n} className="lab-panel">
            <p className="lab-kicker">{t.label}</p>
            <h3>{t.title}</h3>
            <p>{t.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
