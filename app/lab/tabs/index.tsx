"use client";

import { useCallback, useId, useRef, useState, type KeyboardEvent } from "react";

const TABS = [
  {
    id: "design",
    label: "Design",
    kicker: "Hazel",
    text: "Hazel sets the Forest Mist direction—type, color, and spacing—so each lab section matches the demo site before any code lands.",
  },
  {
    id: "build",
    label: "Build",
    kicker: "Alder",
    text: "Alder writes the feature from the written spec in the lab slot, runs SHIP for build and gate checks, then hands off for review.",
  },
  {
    id: "ship",
    label: "Ship",
    kicker: "Rowan & Cedar",
    text: "Rowan reviews the diff and layout; Cedar runs QA on the preview. Fixes go back to the coder until the gate and checks pass.",
  },
] as const;

const COUNT = TABS.length;

export default function TabsLab() {
  const base = useId().replace(/:/g, "");
  const titleId = `${base}-h2`;
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const pick = useCallback((index: number) => {
    setActive(index);
    refs.current[index]?.focus();
  }, []);

  const onListKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      pick((active + 1) % COUNT);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      pick((active + COUNT - 1) % COUNT);
    }
  };

  return (
    <section data-lab="tabs" aria-labelledby={titleId} className="lab-tabs-root">
      <h2 id={titleId}>How the showcase team works</h2>
      <div className="lab-tabs-shell">
        <div role="tablist" aria-label="Showcase workflow" className="lab-tabs-bar" onKeyDown={onListKey}>
          {TABS.map((tab, i) => {
            const tabId = `${base}-tab-${tab.id}`;
            const panelId = `${base}-panel-${tab.id}`;
            const isOn = active === i;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={tabId}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                aria-selected={isOn}
                aria-controls={panelId}
                tabIndex={isOn ? 0 : -1}
                className="lab-tabs-tab"
                onClick={() => pick(i)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        {TABS.map((tab, i) => {
          const tabId = `${base}-tab-${tab.id}`;
          const panelId = `${base}-panel-${tab.id}`;
          const isOn = active === i;
          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={panelId}
              aria-labelledby={tabId}
              hidden={!isOn}
              className="lab-tabs-panel"
            >
              <span className="lab-tabs-role">{tab.kicker}</span>
              <p>{tab.text}</p>
            </div>
          );
        })}
      </div>
      <style>{`
        .lab-tabs-root { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #f2efe6); }
        .lab-tabs-root h2 { margin: 0 0 20px; font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.2; }
        .lab-tabs-shell { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; background: rgba(18, 26, 22, 0.35); }
        .lab-tabs-bar { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
        .lab-tabs-tab { flex: 1 1 auto; min-width: 5.5rem; padding: 10px 14px; border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 10px; background: transparent; color: #e8eee9; font-family: var(--sans); font-size: 14px; font-weight: 500; cursor: pointer; }
        .lab-tabs-tab[aria-selected="true"] { border-color: var(--sage); color: var(--mist, #f2efe6); background: rgba(176, 203, 188, 0.12); }
        .lab-tabs-tab:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
        .lab-tabs-panel p { margin: 8px 0 0; font-family: var(--sans); font-size: 15px; line-height: 1.55; color: #e8eee9; }
        .lab-tabs-role { display: inline-block; font-family: var(--sans); font-weight: 500; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--sage); padding: 4px 10px; border-radius: 6px; background: #14201a; }
        @media (prefers-reduced-motion: no-preference) {
          .lab-tabs-tab { transition: background 0.15s ease, border-color 0.15s ease; }
        }
      `}</style>
    </section>
  );
}