"use client";

import { useRef, useState } from "react";

type TabItem = {
  id: string;
  label: string;
  heading: string;
  body: string;
};

const TABS: TabItem[] = [
  {
    id: "spec",
    label: "Spec",
    heading: "We start from a written spec",
    body: "Every feature begins as a short, explicit spec so the whole team builds the same thing.",
  },
  {
    id: "build",
    label: "Build",
    heading: "One person builds in a lab slot",
    body: "A single teammate writes the component in isolation, so it never collides with other work in flight.",
  },
  {
    id: "review",
    label: "Review",
    heading: "Review and QA close the loop",
    body: "A reviewer and a QA pass check the result against the spec before anything ships.",
  },
];

export default function Tabs() {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function move(nextIndex: number) {
    const count = TABS.length;
    const wrapped = (nextIndex + count) % count;
    setSelected(wrapped);
    tabRefs.current[wrapped]?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(selected + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(selected - 1);
    }
  }

  return (
    <section data-lab="tabs" aria-labelledby="lab-tabs-title">
      <h2 id="lab-tabs-title" className="lab-tabs-title">
        How the showcase team works
      </h2>
      <div className="lab-tabs-card">
        <div role="tablist" aria-label="How the showcase team works" className="lab-tabs-list">
          {TABS.map((tab, index) => {
            const isSelected = index === selected;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                role="tab"
                id={`lab-tab-${tab.id}`}
                aria-selected={isSelected}
                aria-controls={`lab-tabpanel-${tab.id}`}
                tabIndex={isSelected ? 0 : -1}
                className={`lab-tabs-tab${isSelected ? " is-selected" : ""}`}
                onClick={() => setSelected(index)}
                onKeyDown={onKeyDown}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        {TABS.map((tab, index) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`lab-tabpanel-${tab.id}`}
            aria-labelledby={`lab-tab-${tab.id}`}
            hidden={index !== selected}
            className="lab-tabs-panel"
          >
            <h3 className="lab-tabs-heading">{tab.heading}</h3>
            <p className="lab-tabs-body">{tab.body}</p>
          </div>
        ))}
      </div>
      <style>{`
        .lab-tabs-title {
          font-family: var(--serif);
          font-weight: 400;
          font-size: 30px;
          color: var(--mist);
          margin: 0 0 16px;
        }
        .lab-tabs-card {
          width: min(720px, 100%);
          margin: 8px auto 56px;
          border: 1px solid rgba(176, 203, 188, 0.28);
          border-radius: 16px;
          padding: 24px;
          box-sizing: border-box;
        }
        .lab-tabs-list {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .lab-tabs-tab {
          font-family: var(--sans);
          font-weight: 500;
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--mist);
          background: transparent;
          border: 1px solid rgba(176, 203, 188, 0.28);
          border-radius: 10px;
          padding: 8px 16px;
          cursor: pointer;
        }
        .lab-tabs-tab.is-selected {
          color: #121a16;
          background: var(--sage);
          border-color: var(--sage);
        }
        .lab-tabs-tab:focus-visible {
          outline: 2px solid var(--sage);
          outline-offset: 2px;
        }
        .lab-tabs-heading {
          font-family: var(--serif);
          font-weight: 400;
          font-size: 20px;
          color: var(--mist);
          margin: 0 0 8px;
        }
        .lab-tabs-body {
          font-family: var(--sans);
          font-size: 15px;
          color: #e8eee9;
          margin: 0;
          line-height: 1.5;
        }
      `}</style>
    </section>
  );
}
