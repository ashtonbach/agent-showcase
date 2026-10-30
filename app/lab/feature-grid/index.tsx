"use client";

import { useCallback, useState, type SyntheticEvent } from "react";

const cards = [
  { title: "Fresh branch", body: "Each run starts on a new branch cut from base, not from main.", icon: 0 },
  { title: "Allowlist", body: "The gate only permits changes in the lab slot and a few fixed paths.", icon: 1 },
  { title: "Size cap", body: "More than 150 changed lines in the diff fails the merge gate.", icon: 2 },
  { title: "No network", body: "Lab code must not fetch, poll sockets, or read secrets from the environment.", icon: 3 },
  { title: "Visual gate", body: "SHIP checks layout at 1280 and 390 pixels before the build may pass.", icon: 4 },
  { title: "Nightly reset", body: "The operator's demo stack resets on a nightly schedule to a clean baseline.", icon: 5 },
];

function FallbackIcon() {
  return (
    <span data-art="fallback" aria-hidden="true" className="lab-icon-fb">
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="6" fill="#14201A" />
        <path d="M8 22 L16 8 L24 22 Z" fill="none" stroke="#B0CBBC" strokeWidth="1.5" />
        <circle cx="16" cy="18" r="3" fill="#D9B45A" />
      </svg>
    </span>
  );
}

function CardIcon({ n }: { n: number }) {
  const [broken, setBroken] = useState(false);
  const onErr = useCallback((e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.removeAttribute("data-art");
    setBroken(true);
  }, []);
  return (
    <span className="lab-icon">
      {broken ? (
        <FallbackIcon />
      ) : (
        <img
          data-art="image"
          src={`/lab/feature-grid/icon-${n}.svg`}
          width={32}
          height={32}
          alt=""
          onError={onErr}
        />
      )}
    </span>
  );
}

export default function FeatureGrid() {
  return (
    <section data-lab="feature-grid" aria-labelledby="lab-feature-grid-title">
      <style>{`
.lab-feature-grid { width: min(960px, 100%); margin: 8px auto 56px; padding: 0 16px; }
.lab-feature-grid h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; color: var(--mist); margin-bottom: 28px; }
.lab-grid { list-style: none; display: grid; gap: 16px; grid-template-columns: repeat(3, minmax(0, 1fr)); }
@media (max-width: 900px) { .lab-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 600px) { .lab-grid { grid-template-columns: 1fr; } }
.lab-card { border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; background: rgba(18,26,22,0.35); }
.lab-icon { display: block; margin-bottom: 12px; width: 32px; height: 32px; }
.lab-icon-fb { display: block; }
.lab-card h3 { font-family: var(--sans); font-size: 17px; font-weight: 500; color: var(--mist); margin-bottom: 8px; }
.lab-card p { color: var(--muted); font-size: 15px; line-height: 1.55; }
@media (prefers-reduced-motion: reduce) { .lab-card { transition: none; } }
`}</style>
      <div className="lab-feature-grid">
        <h2 id="lab-feature-grid-title">Six guardrails of the showcase</h2>
        <ul className="lab-grid">
          {cards.map((c) => (
            <li key={c.title} className="lab-card">
              <CardIcon n={c.icon} />
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
