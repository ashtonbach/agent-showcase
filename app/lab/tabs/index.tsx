"use client";

import { useRef, useState, type KeyboardEvent } from "react";

const TABS = [
  {
    id: "write",
    label: "Write",
    heading: "Alder codes the slot",
    body: "Alder implements the lab feature from the posted spec, then ships a Vercel preview on a feature branch.",
  },
  {
    id: "review",
    label: "Review",
    heading: "Rowan checks the preview",
    body: "Rowan reviews the live preview against the gate and layout checks, then posts APPROVE or CHANGES.",
  },
  {
    id: "qa",
    label: "QA",
    heading: "Cedar signs off",
    body: "Cedar runs QA on the preview and reports PASS or FAIL with each finding.",
  },
];

const css = `
.lab-tabs{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6);box-sizing:border-box;padding:0 8px}
.lab-tabs h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 16px;line-height:1.2}
.lab-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px}
.lab-tablist{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 20px}
.lab-tab{font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:12px;background:transparent;color:var(--mist,#F2EFE6);border:1px solid rgba(176,203,188,0.28);border-radius:999px;padding:8px 14px;cursor:pointer}
.lab-tab[aria-selected="true"]{background:var(--sage);color:#121A16;border-color:var(--sage)}
.lab-panel h3{font-family:var(--serif);font-weight:400;font-size:22px;margin:0 0 8px}
.lab-panel p{margin:0;line-height:1.55;color:#E8EEE9}
@media (prefers-reduced-motion:no-preference){.lab-tab{transition:background .15s,color .15s,border-color .15s}}
`;

export default function Tabs() {
  const [sel, setSel] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  function select(n: number) {
    const next = (n + TABS.length) % TABS.length;
    setSel(next);
    refs.current[next]?.focus();
  }

  function onKey(e: KeyboardEvent<HTMLButtonElement>, n: number) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      select(n + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      select(n - 1);
    }
  }

  return (
    <section className="lab-tabs" data-lab="tabs" aria-labelledby="lab-tabs-h">
      <style>{css}</style>
      <h2 id="lab-tabs-h">How the showcase team works</h2>
      <div className="lab-card">
        <div role="tablist" aria-label="How the showcase team works" className="lab-tablist">
          {TABS.map((t, n) => (
            <button
              key={t.id}
              id={`lab-tab-${t.id}`}
              role="tab"
              aria-selected={sel === n}
              aria-controls={`lab-panel-${t.id}`}
              tabIndex={sel === n ? 0 : -1}
              className="lab-tab"
              ref={(el) => {
                refs.current[n] = el;
              }}
              onClick={() => select(n)}
              onKeyDown={(e) => onKey(e, n)}
            >
              {t.label}
            </button>
          ))}
        </div>
        {TABS.map((t, n) => (
          <div
            key={t.id}
            id={`lab-panel-${t.id}`}
            role="tabpanel"
            aria-labelledby={`lab-tab-${t.id}`}
            hidden={sel !== n}
            className="lab-panel"
          >
            <h3>{t.heading}</h3>
            <p>{t.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
