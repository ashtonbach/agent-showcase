"use client";

import { useCallback, useId, useState } from "react";

const ITEMS = [
  {
    q: "What counts as a seat on a team plan?",
    a: "A seat is one signed-in member who can create runs and view shared results. View-only guests do not use seats.",
  },
  {
    q: "Can we switch plans mid-cycle?",
    a: "Yes. Upgrades apply immediately with prorated credit. Downgrades take effect at the next renewal date.",
  },
  {
    q: "Do you offer annual billing?",
    a: "Annual billing is available on Growth and Enterprise tiers with a discount versus paying month to month.",
  },
  {
    q: "Is there a trial before we commit?",
    a: "Starter includes a limited trial window so you can run one showcase section before choosing a paid tier.",
  },
] as const;

export default function LabSection() {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(null);
  const toggle = useCallback((i: number) => {
    setOpen((prev) => (prev === i ? null : i));
  }, []);

  return (
    <section data-lab="custom-1793867320" aria-labelledby={`${baseId}-title`}>
      <h2 id={`${baseId}-title`}>Pricing FAQ</h2>
      <div className="lab-card">
        <ul className="lab-list">
          {ITEMS.map((item, i) => {
            const openItem = open === i;
            const panelId = `${baseId}-panel-${i}`;
            const btnId = `${baseId}-btn-${i}`;
            return (
              <li key={item.q} className="lab-item">
                <h3 className="lab-q">
                  <button
                    type="button"
                    id={btnId}
                    className="lab-trigger"
                    aria-expanded={openItem}
                    aria-controls={panelId}
                    onClick={() => toggle(i)}
                  >
                    <span>{item.q}</span>
                    <span className="lab-chevron" aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className="lab-panel"
                  hidden={!openItem}
                >
                  <p>{item.a}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="lab-note">Example data: questions and answers are illustrative, not live pricing.</p>
      <style>{`
        [data-lab="custom-1793867320"] { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #E8EEE9); }
        [data-lab="custom-1793867320"] .lab-card {
          border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px;
          background: rgba(18, 26, 22, 0.35);
        }
        [data-lab="custom-1793867320"] .lab-list { list-style: none; margin: 0; padding: 0; }
        [data-lab="custom-1793867320"] .lab-item { border-top: 1px solid rgba(176, 203, 188, 0.2); }
        [data-lab="custom-1793867320"] .lab-item:first-child { border-top: none; }
        [data-lab="custom-1793867320"] .lab-q { margin: 0; font: inherit; }
        [data-lab="custom-1793867320"] .lab-trigger {
          width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 12px;
          padding: 16px 0; border: none; background: transparent; color: inherit; text-align: left;
          font-family: var(--sans); font-size: 1rem; font-weight: 500; cursor: pointer;
        }
        [data-lab="custom-1793867320"] .lab-trigger:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
        [data-lab="custom-1793867320"] .lab-chevron {
          flex-shrink: 0; width: 10px; height: 10px; border-right: 2px solid var(--sage); border-bottom: 2px solid var(--sage);
          transform: rotate(45deg); transition: transform 0.2s ease;
        }
        [data-lab="custom-1793867320"] .lab-trigger[aria-expanded="true"] .lab-chevron { transform: rotate(-135deg); }
        @media (prefers-reduced-motion: reduce) {
          [data-lab="custom-1793867320"] .lab-chevron { transition: none; }
        }
        [data-lab="custom-1793867320"] .lab-panel { padding: 0 0 16px; }
        [data-lab="custom-1793867320"] .lab-panel p { margin: 0; line-height: 1.55; color: rgba(232, 238, 233, 0.92); }
        [data-lab="custom-1793867320"] .lab-note { margin: 20px 0 0; font-size: 0.9rem; opacity: 0.85; }
      `}</style>
    </section>
  );
}
