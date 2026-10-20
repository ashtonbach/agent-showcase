"use client";
import { useCallback, useState } from "react";

const CARDS = [
  { title: "Fresh branch", body: "Every run starts on a new branch cut from a shared base.", icon: "icon-0.svg" },
  { title: "Allowlist", body: "Only listed files and APIs may change; everything else is blocked.", icon: "icon-1.svg" },
  { title: "Size cap", body: "A line budget keeps each feature small and easy to review.", icon: "icon-2.svg" },
  { title: "No network", body: "Lab code cannot fetch or open sockets to the outside world.", icon: "icon-3.svg" },
  { title: "Visual gate", body: "Layout, contrast, and console checks run before ship.", icon: "icon-4.svg" },
  { title: "Nightly reset", body: "Workspaces reset on a schedule so each day starts clean.", icon: "icon-5.svg" },
];

function LabIcon({ file }: { file: string }) {
  const [bad, setBad] = useState(false);
  const onError = useCallback(() => setBad(true), []);
  if (bad) {
    return (
      <span data-art="fallback" aria-hidden="true" className="lab-icon-fb">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="24" height="24" rx="6" stroke="currentColor" strokeWidth="1.5" />
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
      onError={onError}
    />
  );
}

export default function FeatureGrid() {
  return (
    <section data-lab="feature-grid" aria-labelledby="lab-feature-grid-h2">
      <style>{`
        .lab-fg { width: min(960px, 100%); margin: 8px auto 56px; color: var(--mist, #E8EEE9); }
        .lab-fg h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.15; margin: 0 0 24px; color: #F2EFE6; }
        .lab-grid { list-style: none; margin: 0; padding: 0; display: grid; gap: 16px; grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 900px) { .lab-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .lab-grid { grid-template-columns: 1fr; width: min(720px, 100%); } }
        .lab-card { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; background: rgba(18, 26, 22, 0.35); }
        .lab-card h3 { margin: 12px 0 8px; font-family: var(--serif); font-weight: 400; font-size: 1.15rem; color: #F2EFE6; }
        .lab-card p { margin: 0; font-size: 0.95rem; line-height: 1.45; color: var(--mist, #E8EEE9); opacity: 0.92; }
        .lab-icon-fb { display: inline-flex; color: var(--sage, #B0CBBC); opacity: 0.7; }
        @media (prefers-reduced-motion: reduce) { .lab-card { transition: none; } }
      `}</style>
      <div className="lab-fg">
        <h2 id="lab-feature-grid-h2">Six guardrails of the showcase</h2>
        <ul className="lab-grid">
          {CARDS.map((c) => (
            <li key={c.title} className="lab-card">
              <LabIcon file={c.icon} />
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
