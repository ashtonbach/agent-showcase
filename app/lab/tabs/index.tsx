"use client";
import { useCallback, useId, useRef, useState } from "react";

const STEPS = [
  {
    title: "Design",
    body:
      "Hazel shapes the Forest Mist look and any artwork while the run clock is ticking, so the lab slot stays on-brand.",
  },
  {
    title: "Build",
    body:
      "Alder writes this client component from the spec, keeps the diff small, and ships through the gate on branch sc/tabs-tnptu6.",
  },
  {
    title: "Review",
    body:
      "Rowan checks accessibility and copy; Cedar runs QA; the coordinator merges only after checks pass on the preview.",
  },
];

export default function TabsLab() {
  const uid = useId().replace(/:/g, "");
  const titleId = `lab-tabs-title-${uid}`;
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const pick = useCallback((i: number) => {
    setActive(i);
    refs.current[i]?.focus();
  }, []);
  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const d = e.key === "ArrowRight" ? 1 : -1;
    pick((active + d + STEPS.length) % STEPS.length);
  };
  return (
    <section data-lab="tabs" aria-labelledby={titleId} className="lab-tabs-wrap">
      <style>{`
        .lab-tabs-wrap { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #F2EFE6); }
        .lab-tabs-wrap h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 20px; }
        .lab-tabs-card { border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; }
        [role="tablist"] { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 16px; padding: 0; list-style: none; }
        [role="tab"] {
          font-family: var(--sans); font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase;
          font-size: 11px; padding: 10px 14px; border-radius: 999px; border: 1px solid rgba(176,203,188,0.28);
          background: transparent; color: var(--mist, #E8EEE9); cursor: pointer;
        }
        [role="tab"][aria-selected="true"] { background: var(--sage); color: #121A16; border-color: transparent; }
        [role="tab"]:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
        .lab-tab-label { font-family: var(--sans); font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; font-size: 11px; color: var(--sage); margin: 0 0 8px; }
        .lab-tab-body { margin: 0; line-height: 1.55; font-size: 15px; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>
      <h2 id={titleId}>How this showcase run works</h2>
      <div className="lab-tabs-card">
        <div role="tablist" aria-label="Showcase team steps" onKeyDown={onKey}>
          {STEPS.map((s, i) => {
            const tabId = `${uid}-tab-${i}`;
            const panelId = `${uid}-panel-${i}`;
            return (
              <button
                key={tabId}
                type="button"
                role="tab"
                id={tabId}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                aria-selected={active === i}
                aria-controls={panelId}
                tabIndex={active === i ? 0 : -1}
                onClick={() => pick(i)}
              >
                {s.title}
              </button>
            );
          })}
        </div>
        {STEPS.map((s, i) => {
          const tabId = `${uid}-tab-${i}`;
          const panelId = `${uid}-panel-${i}`;
          return (
            <div
              key={panelId}
              role="tabpanel"
              id={panelId}
              aria-labelledby={tabId}
              hidden={active !== i}
            >
              <p className="lab-tab-label">{s.title}</p>
              <p className="lab-tab-body">{s.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
