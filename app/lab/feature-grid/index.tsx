"use client";

import { useCallback, useState } from "react";

const TITLE_ID = "lab-feature-grid-title";

const CARDS = [
  {
    title: "Fresh branch",
    body: "Every feature ships from a dedicated branch cut from the shared base.",
    src: "/lab/feature-grid/icon-0.svg",
  },
  {
    title: "Allowlist",
    body: "Only named files and APIs may change during a showcase run.",
    src: "/lab/feature-grid/icon-1.svg",
  },
  {
    title: "Size cap",
    body: "The gate rejects diffs that exceed the allowed line budget.",
    src: "/lab/feature-grid/icon-2.svg",
  },
  {
    title: "No network",
    body: "Lab code cannot use fetch, sockets, or other outbound network calls.",
    src: "/lab/feature-grid/icon-3.svg",
  },
  {
    title: "Visual gate",
    body: "Layout, contrast, and artwork slots are checked before merge.",
    src: "/lab/feature-grid/icon-4.svg",
  },
  {
    title: "Nightly reset",
    body: "Showcase workspaces are reset on a nightly schedule.",
    src: "/lab/feature-grid/icon-5.svg",
  },
];

const css = `
.lab-wrap { width: min(960px, 100%); margin: 8px auto 56px; color: var(--mist, #E8EEE9); }
.lab-wrap h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.15; margin: 0 0 24px; color: #F2EFE6; }
.lab-grid { display: grid; gap: 16px; list-style: none; padding: 0; margin: 0; grid-template-columns: 1fr; }
@media (min-width: 601px) { .lab-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 901px) { .lab-grid { grid-template-columns: repeat(3, 1fr); } }
.lab-card { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; background: rgba(18, 26, 22, 0.35); }
.lab-card h3 { margin: 12px 0 8px; font-family: var(--serif); font-weight: 400; font-size: 1.15rem; color: var(--mist, #F2EFE6); }
.lab-card p { margin: 0; font-size: 0.95rem; line-height: 1.5; color: var(--mist, #E8EEE9); opacity: 0.92; }
.lab-icon { display: block; width: 32px; height: 32px; }
.lab-icon-fallback { display: inline-flex; width: 32px; height: 32px; align-items: center; justify-content: center; border-radius: 8px; background: rgba(176, 203, 188, 0.12); color: var(--sage, #B0CBBC); }
.lab-icon-fallback svg { width: 20px; height: 20px; stroke: currentColor; fill: none; stroke-width: 1.5; }
`;

function CardIcon({ src, label }: { src: string; label: string }) {
  const [failed, setFailed] = useState(false);
  const onError = useCallback(() => setFailed(true), []);
  if (failed) {
    return (
      <span data-art="fallback" aria-hidden="true" className="lab-icon-fallback">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="M8 12h8" />
        </svg>
      </span>
    );
  }
  return (
    <img
      className="lab-icon"
      data-art="image"
      src={src}
      width={32}
      height={32}
      alt=""
      onError={onError}
    />
  );
}

export default function FeatureGrid() {
  return (
    <section data-lab="feature-grid" aria-labelledby={TITLE_ID} className="lab-wrap">
      <style>{css}</style>
      <h2 id={TITLE_ID}>Six guardrails of the showcase</h2>
      <ul className="lab-grid">
        {CARDS.map((card) => (
          <li key={card.title} className="lab-card">
            <CardIcon src={card.src} label={card.title} />
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
