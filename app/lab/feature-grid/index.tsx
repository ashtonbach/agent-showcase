"use client";

import { useState } from "react";

const ITEMS = [
  { title: "Fresh branch", text: "Every showcase run codes on a dedicated branch cut from base.", icon: "icon-0.svg", alt: "Branch icon" },
  { title: "Allowlist", text: "The gate allows edits only in the lab slot, page import, and current.json.", icon: "icon-1.svg", alt: "Allowlist icon" },
  { title: "Size cap", text: "Merged work stays under one hundred fifty changed lines in the diff.", icon: "icon-2.svg", alt: "Size cap icon" },
  { title: "No network", text: "Lab components must not fetch, beacon, or open sockets during render.", icon: "icon-3.svg", alt: "No network icon" },
  { title: "Visual gate", text: "SHIP checks layout at twelve eighty and three ninety pixels before push.", icon: "icon-4.svg", alt: "Visual gate icon" },
  { title: "Nightly reset", text: "Preview environments refresh on a schedule so demos start clean.", icon: "icon-5.svg", alt: "Nightly reset icon" },
] as const;

function CardIcon({ file, alt }: { file: string; alt: string }) {
  const [bad, setBad] = useState(false);
  const onErr = () => setBad(true);
  if (bad) {
    return (
      <span data-art="fallback" aria-hidden="true" className="lab-fg-icon-fb">
        <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
          <rect x="4" y="4" width="24" height="24" rx="6" fill="rgba(176,203,188,0.35)" />
        </svg>
      </span>
    );
  }
  return (
    <img
      data-art="image"
      className="lab-fg-icon"
      src={`/lab/feature-grid/${file}`}
      width={32}
      height={32}
      alt={alt}
      onError={onErr}
    />
  );
}

export default function FeatureGrid() {
  return (
    <section data-lab="feature-grid" aria-labelledby="lab-fg-title" className="lab-fg">
      <h2 id="lab-fg-title">Six guardrails of the showcase</h2>
      <ul className="lab-fg-grid">
        {ITEMS.map((item) => (
          <li key={item.title} className="lab-fg-card">
            <CardIcon file={item.icon} alt={item.alt} />
            <h3 className="lab-fg-card-title">{item.title}</h3>
            <p className="lab-fg-card-text">{item.text}</p>
          </li>
        ))}
      </ul>
      <style>{`
        .lab-fg { width: min(960px, 100%); margin: 8px auto 56px; color: var(--mist, #E8EEE9); }
        .lab-fg > h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.15; margin: 10px 0 24px; color: var(--mist, #F2EFE6); }
        .lab-fg-grid { list-style: none; margin: 0; padding: 0; display: grid; gap: 16px; grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .lab-fg-card { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; background: rgba(18, 26, 22, 0.35); }
        .lab-fg-icon, .lab-fg-icon-fb { display: block; margin-bottom: 12px; }
        .lab-fg-card-title { margin: 0 0 8px; font-family: var(--serif); font-weight: 400; font-size: 20px; color: var(--mist, #F2EFE6); }
        .lab-fg-card-text { margin: 0; font-family: var(--sans); font-size: 15px; line-height: 1.5; color: var(--mist, #E8EEE9); }
        @media (max-width: 900px) { .lab-fg-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 600px) { .lab-fg-grid { grid-template-columns: minmax(0, 1fr); } .lab-fg { width: min(720px, 100%); } }
        @media (prefers-reduced-motion: reduce) { .lab-fg * { animation: none !important; transition: none !important; } }
      `}</style>
    </section>
  );
}
