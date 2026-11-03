"use client";

import { useState } from "react";

const CARDS = [
  { icon: "icon-0.svg", title: "Fresh branch", body: "Every run codes on a fresh branch from origin/base." },
  { icon: "icon-1.svg", title: "Allowlist", body: "The gate allowlists React imports and blocks risky APIs." },
  { icon: "icon-2.svg", title: "Size cap", body: "The coder keeps the lab diff within a 150-line cap." },
  { icon: "icon-3.svg", title: "No network", body: "Lab components never open fetch, sockets, or beacons." },
  { icon: "icon-4.svg", title: "Visual gate", body: "SHIP screenshots layout at 1280px and 390px before push." },
  { icon: "icon-5.svg", title: "Nightly reset", body: "The showcase base branch resets on a nightly schedule." },
] as const;

function LabIcon({ file }: { file: string }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <span data-art="fallback" aria-hidden="true" className="lab-fg-fb">
        <svg width="32" height="32" viewBox="0 0 32 32">
          <rect x="6" y="6" width="20" height="20" rx="4" fill="rgba(176,203,188,0.4)" />
        </svg>
      </span>
    );
  }
  return (
    <img
      data-art="image"
      src={`/lab/feature-grid/${file}`}
      width={32}
      height={32}
      alt=""
      onError={() => setErr(true)}
    />
  );
}

export default function FeatureGrid() {
  return (
    <section data-lab="feature-grid" aria-labelledby="fg-h">
      <h2 id="fg-h">Six guardrails of the showcase</h2>
      <ul className="lab-fg-list">
        {CARDS.map((c) => (
          <li key={c.title} className="lab-fg-card">
            <LabIcon file={c.icon} />
            <h3 className="lab-fg-h3">{c.title}</h3>
            <p className="lab-fg-p">{c.body}</p>
          </li>
        ))}
      </ul>
      <style>{`
        [data-lab="feature-grid"] { max-width: min(960px, 100%); margin: 8px auto 56px; padding: 0 12px; }
        .lab-fg-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 16px; grid-template-columns: 1fr; }
        @media (min-width: 601px) { .lab-fg-list { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 901px) { .lab-fg-list { grid-template-columns: repeat(3, 1fr); } }
        .lab-fg-card { border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; }
        .lab-fg-h3 { font-family: var(--serif); font-weight: 400; font-size: 1.125rem; color: var(--mist); margin: 12px 0 8px; }
        .lab-fg-p { font-family: var(--sans); color: var(--mist); font-size: 0.9375rem; line-height: 1.5; margin: 0; }
        .lab-fg-card img, .lab-fg-fb { display: block; width: 32px; height: 32px; }
      `}</style>
    </section>
  );
}
