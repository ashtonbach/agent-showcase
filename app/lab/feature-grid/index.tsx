"use client";

import { useState } from "react";

const ITEMS = [
  ["Fresh branch", "Each showcase run starts from a clean branch so every feature is built in isolation.", "/lab/feature-grid/icon-0.svg"],
  ["Allowlist", "Only approved files and APIs may change, keeping demos safe and reviewable.", "/lab/feature-grid/icon-1.svg"],
  ["Size cap", "A tight line budget forces small, focused components instead of sprawling diffs.", "/lab/feature-grid/icon-2.svg"],
  ["No network", "Client code cannot call the network, so what you see is entirely local.", "/lab/feature-grid/icon-3.svg"],
  ["Visual gate", "Automated layout and contrast checks run before any push leaves the machine.", "/lab/feature-grid/icon-4.svg"],
  ["Nightly reset", "Preview environments reset on a schedule so stale state never lingers.", "/lab/feature-grid/icon-5.svg"],
] as const;

function CardIcon({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className="lab-icon-fallback" data-art="fallback" aria-hidden="true">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </span>
    );
  }
  return <img data-art="image" src={src} width={32} height={32} alt="" onError={() => setFailed(true)} />;
}

const css = `
[data-lab="feature-grid"]{width:min(960px,100%);margin:8px auto 56px;color:var(--mist,#E8EEE9)}
[data-lab="feature-grid"] h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.15;margin:0 0 24px;color:var(--mist,#F2EFE6)}
.lab-grid{list-style:none;margin:0;padding:0;display:grid;gap:16px;grid-template-columns:1fr}
@media(min-width:601px){.lab-grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:901px){.lab-grid{grid-template-columns:repeat(3,1fr)}}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.35)}
.lab-card-icon{display:block;margin-bottom:12px;color:var(--sage,#B0CBBC)}
.lab-card-icon img,.lab-icon-fallback{display:block;width:32px;height:32px}
.lab-icon-fallback{display:inline-flex;align-items:center;justify-content:center;background:rgba(176,203,188,.12);border-radius:6px}
.lab-card h3{margin:0 0 8px;font-family:var(--serif);font-weight:400;font-size:1.125rem;color:var(--mist,#F2EFE6)}
.lab-card p{margin:0;font-size:.9375rem;line-height:1.5;opacity:.92}
@media(prefers-reduced-motion:reduce){.lab-card{transition:none}}
`;

export default function FeatureGrid() {
  return (
    <section data-lab="feature-grid" aria-labelledby="feature-grid-title">
      <style>{css}</style>
      <h2 id="feature-grid-title">Six guardrails of the showcase</h2>
      <ul className="lab-grid">
        {ITEMS.map(([title, text, icon]) => (
          <li key={title} className="lab-card">
            <span className="lab-card-icon"><CardIcon src={icon} /></span>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
