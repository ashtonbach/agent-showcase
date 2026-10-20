"use client";
import { useState } from "react";

const CARDS = [
  { title: "Fresh branch", text: "Every run branches from origin/base with an empty lab slot.", icon: "/lab/feature-grid/icon-0.svg" },
  { title: "Allowlist", text: "Only the feature folder, current.json, and two page.tsx lines may change.", icon: "/lab/feature-grid/icon-1.svg" },
  { title: "Size cap", text: "The gate rejects diffs larger than 150 lines of code.", icon: "/lab/feature-grid/icon-2.svg" },
  { title: "No network", text: "Client code must not fetch or open off-site connections.", icon: "/lab/feature-grid/icon-3.svg" },
  { title: "Visual gate", text: "Layout and contrast are checked at 1280px and 390px before ship.", icon: "/lab/feature-grid/icon-4.svg" },
  { title: "Nightly reset", text: "The showcase environment resets on a nightly schedule.", icon: "/lab/feature-grid/icon-5.svg" },
];

function Icon({ src, label }: { src: string; label: string }) {
  const [bad, setBad] = useState(false);
  if (bad) {
    return (
      <span data-art="fallback" aria-hidden="true" className="lab-icon-fb">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="24" height="24" rx="6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11 16h10" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </span>
    );
  }
  return <img data-art="image" src={src} width={32} height={32} alt={label} onError={() => setBad(true)} />;
}

const css = `
.lab-feature-grid { width: min(960px, 100%); margin: 8px auto 56px; color: var(--mist, #E8EEE9); }
.lab-feature-grid h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.15; margin: 10px 0 24px; color: var(--mist, #F2EFE6); }
.lab-grid { list-style: none; margin: 0; padding: 0; display: grid; gap: 16px; grid-template-columns: repeat(3, 1fr); }
@media (max-width: 900px) { .lab-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .lab-grid { grid-template-columns: 1fr; } .lab-feature-grid { width: min(720px, 100%); } }
.lab-card { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; background: rgba(18, 26, 22, 0.35); }
.lab-card h3 { margin: 12px 0 8px; font-family: var(--serif); font-weight: 400; font-size: 20px; color: var(--mist, #F2EFE6); }
.lab-card p { margin: 0; font-size: 15px; line-height: 1.5; color: var(--mist, #E8EEE9); opacity: 0.92; }
.lab-icon-fb { display: inline-flex; color: var(--sage, #B0CBBC); }
@media (prefers-reduced-motion: reduce) { .lab-card { transition: none; } }
`;

export default function Lab() {
  return (
    <section data-lab="feature-grid" aria-labelledby="lab-feature-grid-title" className="lab-feature-grid">
      <style>{css}</style>
      <h2 id="lab-feature-grid-title">Six guardrails</h2>
      <ul className="lab-grid">
        {CARDS.map((c) => (
          <li key={c.title} className="lab-card">
            <Icon src={c.icon} label={c.title} />
            <h3>{c.title}</h3>
            <p>{c.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
