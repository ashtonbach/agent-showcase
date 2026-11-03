"use client";
import { useState } from "react";

const CARDS = [
  { title: "Fresh branch", text: "Each run starts on a new branch from origin/base so the lab slot is empty and isolated.", n: 0 },
  { title: "Allowlist", text: "The gate allows changes only in the lab folder, current.json, and the single page import line.", n: 1 },
  { title: "Size cap", text: "Merged diffs stay within a 150-line budget so reviews stay focused and fast.", n: 2 },
  { title: "No network", text: "Lab components may not call fetch, WebSockets, or other client network APIs during render.", n: 3 },
  { title: "Visual gate", text: "SHIP checks layout at 1280px and 390px for scroll, heading visibility, and contrast.", n: 4 },
  { title: "Nightly reset", text: "A scheduled workflow removes lab features and restores the base showcase shell.", n: 5 },
];

function LabIcon({ n, alt }: { n: number; alt: string }) {
  const [bad, setBad] = useState(false);
  if (bad) {
    return (
      <span data-art="fallback" aria-hidden="true" className="lab-fg-fb">
        <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
          <rect width="32" height="32" rx="6" fill="rgba(176,203,188,0.22)" />
        </svg>
      </span>
    );
  }
  return (
    <img
      data-art="image"
      src={`/lab/feature-grid/icon-${n}.svg`}
      width={32}
      height={32}
      alt={alt}
      onError={() => setBad(true)}
    />
  );
}

export default function FeatureGrid() {
  const titleId = "lab-feature-grid-title";
  return (
    <section data-lab="feature-grid" aria-labelledby={titleId} className="lab-fg">
      <h2 id={titleId} className="lab-fg-h2">
        Six guardrails of the showcase
      </h2>
      <ul className="lab-fg-list">
        {CARDS.map((c) => (
          <li key={c.title} className="lab-fg-card">
            <LabIcon n={c.n} alt={c.title} />
            <h3 className="lab-fg-ct">{c.title}</h3>
            <p className="lab-fg-tx">{c.text}</p>
          </li>
        ))}
      </ul>
      <style>{`
.lab-fg{width:min(960px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6)}
.lab-fg-h2{font-family:var(--serif,serif);font-weight:400;font-size:30px;line-height:1.25;margin:0 0 24px;color:var(--mist,#F2EFE6)}
.lab-fg-list{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr;gap:16px}
@media(min-width:601px){.lab-fg-list{grid-template-columns:repeat(2,1fr)}}
@media(min-width:901px){.lab-fg-list{grid-template-columns:repeat(3,1fr)}}
.lab-fg-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;background:rgba(18,26,22,0.35)}
.lab-fg-card img,.lab-fg-fb{display:block;margin-bottom:12px}
.lab-fg-ct{margin:0 0 8px;font-family:var(--serif,serif);font-weight:400;font-size:18px;color:var(--mist,#F2EFE6)}
.lab-fg-tx{margin:0;font-family:var(--sans,sans-serif);font-size:15px;line-height:1.5;color:#E8EEE9}
@media(prefers-reduced-motion:reduce){.lab-fg *{animation:none!important;transition:none!important}}
`}</style>
    </section>
  );
}
