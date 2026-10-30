"use client";

import { useCallback, useId, useRef, useState, type KeyboardEvent } from "react";

const STEPS = [
  {
    label: "Design",
    text: "Hazel sets the Forest Mist look and artwork while the coder implements the lab feature on a dedicated branch.",
  },
  {
    label: "Build",
    text: "Alder writes the client component in the lab slot; the kit runs layout checks, production build, and the merge gate before push.",
  },
  {
    label: "Ship",
    text: "Rowan reviews on the Vercel preview, Cedar runs QA smoke checks, and the coordinator merges once every gate passes.",
  },
];

export default function TabsLab() {
  const [active, setActive] = useState(0);
  const titleId = useId();
  const uid = useId().replace(/:/g, "");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = useCallback((index: number) => {
    setActive(index);
    tabRefs.current[index]?.focus();
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setActive((i) => {
        const next = (i + 1) % STEPS.length;
        tabRefs.current[next]?.focus();
        return next;
      });
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      setActive((i) => {
        const next = (i - 1 + STEPS.length) % STEPS.length;
        tabRefs.current[next]?.focus();
        return next;
      });
    }
  };

  return (
    <section data-lab="tabs" aria-labelledby={titleId}>
      <h2 id={titleId}>How the showcase team works</h2>
      <div className="lab-card">
        <div
          role="tablist"
          aria-label="Showcase workflow"
          className="lab-tablist"
          onKeyDown={onKeyDown}
        >
          {STEPS.map((step, index) => (
            <button
              key={step.label}
              type="button"
              role="tab"
              id={`${uid}-tab-${index}`}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              className="lab-tab"
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
            id={`${uid}-panel-${index}`}
            aria-labelledby={`${uid}-tab-${index}`}
            hidden={active !== index}
            className="lab-panel"
          >
            <p className="lab-copy">{step.text}</p>
          </div>
        ))}
      </div>
      <style>{`
        [data-lab="tabs"] { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist); }
        [data-lab="tabs"] .lab-card {
          border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px;
          background: rgba(18, 26, 22, 0.35);
        }
        [data-lab="tabs"] .lab-tablist { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
        [data-lab="tabs"] .lab-tab {
          font-family: var(--sans); font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase;
          font-size: 12px; padding: 10px 14px; border-radius: 999px; border: 1px solid rgba(176, 203, 188, 0.35);
          background: transparent; color: var(--mist); cursor: pointer;
        }
        [data-lab="tabs"] .lab-tab[aria-selected="true"] {
          background: var(--sage); color: #14201a; border-color: var(--sage);
        }
        [data-lab="tabs"] .lab-tab:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
        [data-lab="tabs"] .lab-copy { margin: 0; line-height: 1.55; color: #f2efe6; }
        @media (prefers-reduced-motion: reduce) {
          [data-lab="tabs"] .lab-tab { transition: none; }
        }
      `}</style>
    </section>
  );
}
