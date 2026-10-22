"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";

const TABS = [
  { id: "tab-plan", panel: "panel-plan", label: "Plan", title: "Kickoff", body: "The coordinator sets the feature spec, assigns roles, and keeps the run on a fixed timeline so each teammate knows what to ship." },
  { id: "tab-build", panel: "panel-build", label: "Build", title: "Implement", body: "The coder writes the lab feature in isolation, runs the gate locally, and hands off to the reviewer once layout and accessibility checks pass." },
  { id: "tab-ship", panel: "panel-ship", label: "Ship", title: "Verify", body: "Review and QA confirm the preview build, console cleanliness, and spec behavior before the coordinator closes the showcase round." },
] as const;

const css = `
.lab-tabs-wrap { width: min(720px, 100%); margin: 8px auto 56px; }
.lab-tabs-wrap h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; color: var(--mist); margin: 0 0 20px; }
.lab-tablist { display: flex; gap: 4px; margin: 0 0 16px; padding: 0; list-style: none; }
.lab-tab {
  flex: 1; font-family: var(--sans); font-weight: 500; font-size: 12px; letter-spacing: 0.16em;
  text-transform: uppercase; color: var(--mist); background: transparent; border: 1px solid rgba(176,203,188,0.28);
  border-radius: 10px 10px 0 0; padding: 12px 8px; cursor: pointer; transition: background 0.15s, color 0.15s;
}
.lab-tab[aria-selected="true"] { background: var(--sage); color: #121A16; border-bottom-color: transparent; }
.lab-tab:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
.lab-panel {
  border: 1px solid rgba(176,203,188,0.28); border-radius: 0 16px 16px 16px; padding: 24px;
  color: var(--mist); background: rgba(18,26,22,0.35);
}
.lab-panel h3 { font-family: var(--serif); font-weight: 400; font-size: 22px; margin: 0 0 12px; color: var(--mist); }
.lab-panel p { margin: 0; line-height: 1.55; font-size: 15px; }
.lab-role { display: inline-block; font-family: var(--sans); font-weight: 500; font-size: 11px;
  letter-spacing: 0.16em; text-transform: uppercase; color: #121A16; background: var(--sage);
  padding: 4px 10px; border-radius: 6px; margin-bottom: 14px; }
@media (prefers-reduced-motion: reduce) { .lab-tab { transition: none; } }
`;

export default function LabTabs() {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const skipInitialFocus = useRef(true);

  useEffect(() => {
    if (skipInitialFocus.current) {
      skipInitialFocus.current = false;
      return;
    }
    tabRefs.current[selected]?.focus();
  }, [selected]);

  const select = useCallback((i: number) => {
    setSelected(((i % TABS.length) + TABS.length) % TABS.length);
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        select(selected + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        select(selected - 1);
      }
    },
    [selected, select]
  );

  const titleId = "lab-tabs-heading";

  return (
    <section data-lab="tabs" aria-labelledby={titleId} className="lab-tabs-wrap">
      <style>{css}</style>
      <h2 id={titleId}>How the showcase team works</h2>
      <div role="tablist" aria-label="Showcase workflow steps" className="lab-tablist" onKeyDown={onKeyDown}>
        {TABS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={t.id}
            aria-selected={i === selected}
            aria-controls={t.panel}
            tabIndex={i === selected ? 0 : -1}
            className="lab-tab"
            ref={(el) => { tabRefs.current[i] = el; }}
            onClick={() => select(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {TABS.map((t, i) => (
        <div
          key={t.panel}
          role="tabpanel"
          id={t.panel}
          aria-labelledby={t.id}
          hidden={i !== selected}
          className="lab-panel"
        >
          <span className="lab-role">Step {i + 1}</span>
          <h3>{t.title}</h3>
          <p>{t.body}</p>
        </div>
      ))}
    </section>
  );
}
