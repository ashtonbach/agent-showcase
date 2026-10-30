"use client";
import { useCallback, useId, useState } from "react";

const STEPS = [
  {
    label: "Design",
    text: "Hazel shapes the lab feature in the Forest Mist palette so each showcase slot stays on-brand before any code lands.",
  },
  {
    label: "Build",
    text: "Alder implements the spec in the lab slot—client-only React, gated size limits, and no network calls—then ships through the kit.",
  },
  {
    label: "Review",
    text: "Rowan reviews the pull request and Cedar runs QA on preview; the operator merges only after checks and review pass.",
  },
] as const;

export default function TabsLab() {
  const uid = useId().replace(/:/g, "");
  const titleId = `${uid}-title`;
  const [active, setActive] = useState(0);
  const count = STEPS.length;

  const select = useCallback(
    (index: number) => {
      const next = ((index % count) + count) % count;
      setActive(next);
      requestAnimationFrame(() => {
        document.getElementById(`${uid}-tab-${next}`)?.focus();
      });
    },
    [count, uid],
  );

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      select(active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      select(active - 1);
    }
  };

  return (
    <section data-lab="tabs" aria-labelledby={titleId}>
      <h2 id={titleId}>How the showcase team works</h2>
      <div className="lab-tabs-shell">
        <div
          className="lab-tabs-list"
          role="tablist"
          aria-label="Showcase workflow steps"
          onKeyDown={onKeyDown}
        >
          {STEPS.map((step, index) => (
            <button
              key={step.label}
              type="button"
              role="tab"
              className="lab-tab"
              id={`${uid}-tab-${index}`}
              aria-selected={active === index}
              aria-controls={`${uid}-panel-${index}`}
              tabIndex={active === index ? 0 : -1}
              onClick={() => select(index)}
            >
              {step.label}
            </button>
          ))}
        </div>
        {STEPS.map((step, index) => (
          <div
            key={step.label}
            role="tabpanel"
            className="lab-tabpanel"
            id={`${uid}-panel-${index}`}
            aria-labelledby={`${uid}-tab-${index}`}
            hidden={active !== index}
          >
            <p>{step.text}</p>
          </div>
        ))}
      </div>
      <style>{`
        [data-lab="tabs"] { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #f2efe6); }
        [data-lab="tabs"] h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 20px; line-height: 1.2; }
        .lab-tabs-shell { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; background: rgba(18, 26, 22, 0.35); }
        .lab-tabs-list { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
        .lab-tab { font-family: var(--sans); font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; font-size: 11px;
          padding: 10px 14px; border-radius: 999px; border: 1px solid rgba(176, 203, 188, 0.28); background: transparent;
          color: var(--mist, #e8eee9); cursor: pointer; transition: background 0.2s ease, border-color 0.2s ease; }
        .lab-tab[aria-selected="true"] { background: var(--sage); color: #121a16; border-color: var(--sage); }
        .lab-tab:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
        .lab-tabpanel p { margin: 0; line-height: 1.55; font-size: 16px; color: #e8eee9; }
        @media (prefers-reduced-motion: reduce) { .lab-tab { transition: none; } }
      `}</style>
    </section>
  );
}
