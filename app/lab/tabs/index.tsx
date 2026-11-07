"use client";

import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

const STEPS = [
  {
    title: "Design",
    body: "Hazel picks Forest Mist styling and any artwork for the feature slot while the coder branch is prepared on the operator's repo.",
  },
  {
    title: "Build",
    body: "Alder implements the lab component from the written spec, keeps the diff inside the gate limits, and ships through the kit's self-check and merge gate.",
  },
  {
    title: "Review",
    body: "Rowan reviews the pull request on GitHub; Cedar signs off on behavior and layout; the operator's box merges only after those checks pass.",
  },
] as const;

export default function TabsLab() {
  const base = useId().replace(/:/g, "");
  const titleId = `${base}-title`;
  const [index, setIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = useCallback((next: number) => {
    setIndex(((next % STEPS.length) + STEPS.length) % STEPS.length);
  }, []);

  useEffect(() => {
    tabRefs.current[index]?.focus();
  }, [index]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      select(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      select(index - 1);
    }
  };

  return (
    <section data-lab="tabs" aria-labelledby={titleId} className="lab-tabs">
      <h2 id={titleId}>How this showcase run works</h2>
      <div
        role="tablist"
        aria-label="Showcase team steps"
        className="lab-tablist"
        onKeyDown={onKeyDown}
      >
        {STEPS.map((step, i) => {
          const tabId = `${base}-tab-${i}`;
          const panelId = `${base}-panel-${i}`;
          const selected = i === index;
          return (
            <button
              key={step.title}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={tabId}
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              className="lab-tab"
              onClick={() => select(i)}
            >
              <span className="lab-tab-step">Step {i + 1}</span>
              {step.title}
            </button>
          );
        })}
      </div>
      {STEPS.map((step, i) => {
        const tabId = `${base}-tab-${i}`;
        const panelId = `${base}-panel-${i}`;
        const selected = i === index;
        return (
          <div
            key={step.title}
            role="tabpanel"
            id={panelId}
            aria-labelledby={tabId}
            hidden={!selected}
            className="lab-panel"
          >
            <p>{step.body}</p>
          </div>
        );
      })}
      <style>{`
        .lab-tabs {
          width: min(720px, 100%);
          margin: 8px auto 56px;
          color: var(--mist, #f2efe6);
        }
        .lab-tabs h2 {
          font-family: var(--serif);
          font-weight: 400;
          font-size: 30px;
          line-height: 1.25;
          margin: 0 0 20px;
        }
        .lab-tablist {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }
        .lab-tab {
          flex: 1 1 100px;
          min-width: 0;
          padding: 12px 14px;
          border: 1px solid rgba(176, 203, 188, 0.28);
          border-radius: 12px;
          background: transparent;
          color: var(--mist, #e8eee9);
          font-family: var(--sans);
          font-size: 15px;
          cursor: pointer;
          text-align: left;
        }
        .lab-tab[aria-selected="true"] {
          border-color: var(--sage);
          box-shadow: inset 0 0 0 1px var(--sage);
        }
        .lab-tab:focus-visible {
          outline: 2px solid var(--sage);
          outline-offset: 2px;
        }
        .lab-tab-step {
          display: block;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(242, 239, 230, 0.72);
          margin-bottom: 4px;
        }
        .lab-panel {
          border: 1px solid rgba(176, 203, 188, 0.28);
          border-radius: 16px;
          padding: 24px;
        }
        .lab-panel p {
          margin: 0;
          line-height: 1.55;
          font-size: 16px;
        }
        @media (prefers-reduced-motion: reduce) {
          .lab-tab {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
