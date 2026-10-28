"use client";

import { useCallback, useState, type KeyboardEvent } from "react";

const TABS = [
  {
    id: "tab-plan",
    panelId: "panel-plan",
    label: "Plan",
    body:
      "The coordinator scopes each showcase run, assigns roles, and keeps the team on a fixed deadline.",
  },
  {
    id: "tab-build",
    panelId: "panel-build",
    label: "Build",
    body:
      "Alder implements the lab feature from the written spec while Hazel supplies artwork in parallel.",
  },
  {
    id: "tab-ship",
    panelId: "panel-ship",
    label: "Ship",
    body:
      "Automated gates verify layout and build; Rowan reviews and Cedar signs off before merge.",
  },
];


const css = `
.lab-tabs-wrap { width: min(720px, 100%); margin: 8px auto 56px; }
.lab-tabs-card {
  border: 1px solid rgba(176, 203, 188, 0.28);
  border-radius: 16px;
  padding: 24px;
  background: rgba(18, 26, 22, 0.35);
}
.lab-tabs-title {
  font-family: var(--serif);
  font-weight: 400;
  font-size: 30px;
  line-height: 1.2;
  color: var(--mist, #f2efe6);
  margin: 0 0 20px;
}
.lab-tablist {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0 0 16px;
  padding: 0;
  list-style: none;
}
.lab-tab {
  font-family: var(--sans);
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-size: 12px;
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid rgba(176, 203, 188, 0.28);
  background: transparent;
  color: var(--mist, #e8eee9);
  cursor: pointer;
}
.lab-tab[aria-selected="true"] {
  background: var(--sage);
  color: #121a16;
  border-color: var(--sage);
}
.lab-tab:focus-visible {
  outline: 2px solid var(--sage);
  outline-offset: 2px;
}
.lab-tabpanel {
  color: var(--mist, #f2efe6);
  font-size: 16px;
  line-height: 1.55;
  margin: 0;
}
.lab-tabpanel[hidden] { display: none; }
@media (prefers-reduced-motion: reduce) {
  .lab-tab { transition: none; }
}
`;


export default function TabsLab() {
  const [selected, setSelected] = useState(0);
  const titleId = "lab-tabs-heading";

  const selectTab = useCallback((index: number) => {
    setSelected(index);
  }, []);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const delta = event.key === "ArrowRight" ? 1 : -1;
      const next = (selected + delta + TABS.length) % TABS.length;
      setSelected(next);
      const el = document.getElementById(TABS[next].id);
      el?.focus();
    },
    [selected],
  );


  return (
    <section
      className="lab-tabs-wrap"
      data-lab="tabs"
      aria-labelledby={titleId}
    >
      <div className="lab-tabs-card">
        <h2 id={titleId} className="lab-tabs-title">How the showcase team works</h2>
        <div
          role="tablist"
          aria-label="Showcase workflow steps"
          className="lab-tablist"
          onKeyDown={onKeyDown}
        >
          {TABS.map((tab, index) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={tab.id}
              className="lab-tab"
              aria-selected={selected === index}
              aria-controls={tab.panelId}
              tabIndex={selected === index ? 0 : -1}
              onClick={() => selectTab(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {TABS.map((tab, index) => (
          <div
            key={tab.panelId}
            role="tabpanel"
            id={tab.panelId}
            className="lab-tabpanel"
            aria-labelledby={tab.id}
            hidden={selected !== index}
          >
            <p>{tab.body}</p>
          </div>
        ))}
      </div>
      <style>{css}</style>
    </section>
  );
}

