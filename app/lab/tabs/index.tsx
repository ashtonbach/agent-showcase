"use client";

import { useRef, useState, type KeyboardEvent } from "react";

type TabDef = { id: string; label: string; heading: string; body: string };

const TABS: TabDef[] = [
  {
    id: "pick",
    label: "Pick",
    heading: "Pick a feature",
    body: "A visitor triggers a run; the coordinator hands the team one small, scoped feature to build.",
  },
  {
    id: "build",
    label: "Build",
    heading: "Build in the open",
    body: "The coder writes the component live in its own lab slot while a reviewer and QA wait on deck.",
  },
  {
    id: "check",
    label: "Check",
    heading: "Check before merge",
    body: "Automated gates and a reviewer check the live preview before any change reaches production.",
  },
];

const css = `
.lab-tabs-section { width: min(720px, 100%); margin: 8px auto 56px; }
.lab-tabs-title { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 20px; color: var(--mist); }
.lab-tabs-list { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 16px; }
.lab-tabs-tab { font-family: var(--sans); font-size: 14px; color: var(--muted); background: transparent; border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 999px; padding: 8px 18px; cursor: pointer; }
.lab-tabs-tab--active { color: var(--forest); background: var(--sage); border-color: var(--sage); }
.lab-tabs-panel { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; }
.lab-tabs-panel-heading { font-family: var(--serif); font-weight: 400; font-size: 22px; margin: 0 0 10px; color: var(--mist); }
.lab-tabs-panel-body { margin: 0; color: var(--mist); line-height: 1.6; }
@media (prefers-reduced-motion: no-preference) { .lab-tabs-tab { transition: background 0.15s ease, color 0.15s ease; } }
@media (max-width: 420px) { .lab-tabs-tab { padding: 7px 14px; font-size: 13px; } .lab-tabs-panel { padding: 18px; } }
`;

export default function Tabs() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function selectAndFocus(index: number) {
    setActive(index);
    tabRefs.current[index]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectAndFocus((index + 1) % TABS.length);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectAndFocus((index - 1 + TABS.length) % TABS.length);
    }
  }

  return (
    <section data-lab="tabs" aria-labelledby="lab-tabs-heading" className="lab-tabs-section">
      <h2 id="lab-tabs-heading" className="lab-tabs-title">How the showcase team works</h2>
      <div role="tablist" aria-label="How the showcase team works" className="lab-tabs-list">
        {TABS.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`lab-tabs-tab-${tab.id}`}
            aria-selected={active === index}
            aria-controls={`lab-tabs-panel-${tab.id}`}
            tabIndex={active === index ? 0 : -1}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            className={`lab-tabs-tab${active === index ? " lab-tabs-tab--active" : ""}`}
            onClick={() => selectAndFocus(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {TABS.map((tab, index) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`lab-tabs-panel-${tab.id}`}
          aria-labelledby={`lab-tabs-tab-${tab.id}`}
          hidden={active !== index}
          className="lab-tabs-panel"
        >
          <h3 className="lab-tabs-panel-heading">{tab.heading}</h3>
          <p className="lab-tabs-panel-body">{tab.body}</p>
        </div>
      ))}
      <style>{css}</style>
    </section>
  );
}
