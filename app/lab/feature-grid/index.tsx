"use client";
import { useState } from "react";

const ITEMS = [
  { title: "Fresh branch", text: "Each run checks out a new branch from origin/base before any code lands.", icon: "/lab/feature-grid/icon-0.svg" },
  { title: "Allowlist", text: "Only the lab component, two page lines, and current.json may change.", icon: "/lab/feature-grid/icon-1.svg" },
  { title: "Size cap", text: "The gate rejects diffs larger than the showcase line budget.", icon: "/lab/feature-grid/icon-2.svg" },
  { title: "No network", text: "Banned APIs include fetch, WebSocket, and other outbound calls in lab code.", icon: "/lab/feature-grid/icon-3.svg" },
  { title: "Visual gate", text: "Ship verifies layout, contrast, and heading visibility at 1280px and 390px.", icon: "/lab/feature-grid/icon-4.svg" },
  { title: "Nightly reset", text: "Kit environments return to a clean baseline on a nightly schedule.", icon: "/lab/feature-grid/icon-5.svg" },
];

const FB = (
  <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
    <rect x="4" y="4" width="24" height="24" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

function LabIcon({ src }: { src: string }) {
  const [bad, setBad] = useState(false);
  if (bad) {
    return (
      <span className="lab-icon-fb" data-art="fallback" aria-hidden="true">
        {FB}
      </span>
    );
  }
  return (
    <img
      className="lab-icon-img"
      data-art="image"
      src={src}
      width={32}
      height={32}
      alt=""
      onError={() => setBad(true)}
    />
  );
}

const css = `
[data-lab="feature-grid"] {
  width: min(960px, 100%);
  margin: 8px auto 56px;
  color: var(--mist, #E8EEE9);
}
[data-lab="feature-grid"] h2 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: 30px;
  line-height: 1.15;
  margin: 0 0 24px;
  color: var(--mist, #F2EFE6);
}
.lab-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, 1fr);
}
@media (max-width: 900px) {
  .lab-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .lab-grid { grid-template-columns: 1fr; }
  [data-lab="feature-grid"] { width: min(720px, 100%); }
}
.lab-card {
  border: 1px solid rgba(176, 203, 188, 0.28);
  border-radius: 16px;
  padding: 24px;
  background: rgba(18, 26, 22, 0.35);
}
.lab-card h3 {
  margin: 12px 0 8px;
  font-family: var(--serif);
  font-weight: 400;
  font-size: 1.15rem;
  color: var(--mist, #F2EFE6);
}
.lab-card p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.45;
  color: var(--mist, #E8EEE9);
}
.lab-icon-img, .lab-icon-fb {
  display: block;
  width: 32px;
  height: 32px;
  color: var(--sage, #B0CBBC);
}
@media (prefers-reduced-motion: reduce) {
  .lab-card { transition: none; }
}
`;

export default function FeatureGrid() {
  return (
    <section data-lab="feature-grid" aria-labelledby="feature-grid-title">
      <style>{css}</style>
      <h2 id="feature-grid-title">Six guardrails of the showcase</h2>
      <ul className="lab-grid">
        {ITEMS.map((item) => (
          <li key={item.title} className="lab-card">
            <LabIcon src={item.icon} />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
