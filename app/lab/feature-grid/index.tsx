"use client";

import { useState } from "react";

const CARDS = [
  ["Fresh branch", "Every run checks out a new branch from base so earlier labs never get overwritten.", "icon-0.svg"],
  ["Allowlist", "The gate rejects imports and APIs that are not on the approved list for lab code.", "icon-1.svg"],
  ["Size cap", "Total diffs stay within a line budget so each feature stays small and reviewable.", "icon-2.svg"],
  ["No network", "Lab components must not call fetch, beacons, or sockets at runtime.", "icon-3.svg"],
  ["Visual gate", "SHIP checks layout at 1280px and 390px before the branch can merge.", "icon-4.svg"],
  ["Nightly reset", "Cloud demo environments rebuild from base on a nightly schedule.", "icon-5.svg"],
] as const;

function CardIcon({ file }: { file: string }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <span data-art="fallback" aria-hidden="true" className="lab-fb">
        <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="rgba(176,203,188,0.18)" />
          <path d="M10 16h12" stroke="rgba(242,239,230,0.55)" strokeWidth="2" />
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
    <section data-lab="feature-grid" aria-labelledby="lab-feature-grid-h2">
      <style>{`
.lab-wrap{width:min(960px,100%);margin:8px auto 56px;padding:0 16px;box-sizing:border-box}
.lab-h2{margin:0 0 24px;font:400 30px/1.2 var(--serif);color:var(--mist,#F2EFE6)}
.lab-grid{list-style:none;margin:0;padding:0;display:grid;gap:16px;grid-template-columns:1fr}
@media(min-width:601px){.lab-grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:901px){.lab-grid{grid-template-columns:repeat(3,1fr)}}
.lab-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;background:rgba(18,26,22,0.35)}
.lab-card h3{margin:12px 0 8px;font:500 1.05rem var(--sans);color:var(--mist,#F2EFE6);letter-spacing:0.02em}
.lab-card p{margin:0;font:400 0.95rem/1.5 var(--sans);color:#E8EEE9}
.lab-fb{display:block;width:32px;height:32px;color:rgba(242,239,230,0.5)}
.lab-card img{display:block;width:32px;height:32px}
`}</style>
      <div className="lab-wrap">
        <h2 id="lab-feature-grid-h2">Six guardrails of the showcase</h2>
        <ul className="lab-grid">
          {CARDS.map(([title, text, file]) => (
            <li key={title} className="lab-card">
              <CardIcon file={file} />
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
