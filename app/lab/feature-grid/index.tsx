"use client";

import { useState } from "react";

const TITLE_ID = "feature-grid-heading";

const CARDS = [
  {
    title: "Fresh branch",
    body: "Each feature ships from a dedicated branch cut from the shared base.",
    src: "/lab/feature-grid/icon-0.svg",
    alt: "Fresh branch",
  },
  {
    title: "Allowlist",
    body: "Only the lab component, the page slot, and current.json may change.",
    src: "/lab/feature-grid/icon-1.svg",
    alt: "Allowlist",
  },
  {
    title: "Size cap",
    body: "The gate blocks merges when the diff exceeds the line budget.",
    src: "/lab/feature-grid/icon-2.svg",
    alt: "Size cap",
  },
  {
    title: "No network",
    body: "Lab code cannot fetch, beacon, or open live sockets in the browser.",
    src: "/lab/feature-grid/icon-3.svg",
    alt: "No network",
  },
  {
    title: "Visual gate",
    body: "Ship verifies layout at 390px and 1280px before code leaves the box.",
    src: "/lab/feature-grid/icon-4.svg",
    alt: "Visual gate",
  },
  {
    title: "Nightly reset",
    body: "Showcase workspaces return to a clean baseline every night.",
    src: "/lab/feature-grid/icon-5.svg",
    alt: "Nightly reset",
  },
];

const css = `
.lab-wrap { width: min(960px, 100%); margin: 8px auto 56px; }
.lab-grid { list-style: none; display: grid; gap: 16px; grid-template-columns: 1fr; padding: 0; }
@media (min-width: 601px) { .lab-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 901px) { .lab-grid { grid-template-columns: repeat(3, 1fr); } }
.lab-card {
  border: 1px solid rgba(176, 203, 188, 0.28);
  border-radius: 16px;
  padding: 24px;
  background: rgba(18, 26, 22, 0.35);
}
.lab-icon { display: block; width: 32px; height: 32px; margin-bottom: 14px; }
.lab-fallback {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin-bottom: 14px;
  border-radius: 8px;
  background: rgba(176, 203, 188, 0.12);
  color: var(--sage);
}
.lab-card h3 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: 22px;
  line-height: 1.2;
  color: var(--mist);
  margin: 0 0 8px;
}
.lab-card p { margin: 0; color: var(--muted); font-size: 15px; line-height: 1.55; }
@media (prefers-reduced-motion: reduce) { .lab-card { transition: none; } }
`;

export default function FeatureGrid() {
  const [broken, setBroken] = useState(() => CARDS.map(() => false));

  return (
    <section data-lab="feature-grid" aria-labelledby={TITLE_ID}>
      <style>{css}</style>
      <h2 id={TITLE_ID}>Six guardrails of the showcase</h2>
      <div className="lab-wrap">
        <ul className="lab-grid">
          {CARDS.map((card, i) => (
            <li key={card.title} className="lab-card">
              {broken[i] ? (
                <span className="lab-fallback" data-art="fallback" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="4" y="4" width="16" height="16" rx="3" />
                  </svg>
                </span>
              ) : (
                <img
                  className="lab-icon"
                  data-art="image"
                  src={card.src}
                  width={32}
                  height={32}
                  alt={card.alt}
                  onError={() =>
                    setBroken((prev) => {
                      const next = [...prev];
                      next[i] = true;
                      return next;
                    })
                  }
                />
              )}
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
