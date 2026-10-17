"use client";

import { useEffect, useState } from "react";

const CARDS = [
  ["Fresh branch", "Each run starts from origin/base so the lab slot is empty before the feature lands."],
  ["Allowlist", "Only the feature file, two lines of the home page, and current.json may change."],
  ["Size cap", "The whole diff, excluding artwork, stays under the line budget in the run spec."],
  ["No network", "The component may not fetch, open sockets, or read environment variables."],
  ["Visual gate", "Self-check renders desktop and phone widths and fails sideways scroll or a clipped heading."],
  ["Nightly reset", "The lab slot is cleared on the next cycle so the next feature starts from a clean page."],
];

const css = `
.lab-fg{width:min(960px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6);box-sizing:border-box;padding:0 12px;overflow-wrap:anywhere}
.lab-fg h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.25;margin:0 0 24px;color:var(--mist,#F2EFE6)}
.lab-grid{list-style:none;margin:0;padding:0;display:grid;gap:16px;grid-template-columns:1fr}
.lab-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;margin:0;display:flex;flex-direction:column;gap:12px;min-width:0}
.lab-card h3{font-family:var(--serif);font-weight:400;font-size:20px;margin:0;color:var(--mist,#F2EFE6)}
.lab-card p{margin:0;font-family:var(--sans,system-ui);font-size:15px;line-height:1.5;color:#E8EEE9}
.lab-card img,.lab-fb{width:32px;height:32px;display:block;flex:none}
.lab-fb{background:rgba(176,203,188,0.18);border-radius:8px;color:var(--sage,#9BB8A8);display:grid;place-items:center}
@media(min-width:601px){.lab-grid{grid-template-columns:1fr 1fr}}
@media(min-width:901px){.lab-grid{grid-template-columns:1fr 1fr 1fr}}
@media(prefers-reduced-motion:reduce){.lab-card{transition:none}}
`;

function Art({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState(true);
  useEffect(() => {
    setOk(true);
  }, [src]);
  if (!ok) {
    return (
      <span data-art="fallback" aria-hidden="true" className="lab-fb">
        <svg width={32} height={32} viewBox="0 0 32 32">
          <path d="M8 16h16" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </span>
    );
  }
  return (
    <img
      data-art="image"
      src={src}
      width={32}
      height={32}
      alt={alt}
      onError={() => setOk(false)}
      onLoad={(e) => {
        if (e.currentTarget.naturalWidth === 0) setOk(false);
      }}
    />
  );
}

export default function FeatureGrid() {
  return (
    <section data-lab="feature-grid" aria-labelledby="lab-fg-h" className="lab-fg">
      <style>{css}</style>
      <h2 id="lab-fg-h">Six guardrails</h2>
      <ul className="lab-grid">
        {CARDS.map(([title, body], i) => (
          <li className="lab-card" key={title}>
            <Art src={`/lab/feature-grid/icon-${i}.svg`} alt="" />
            <h3>{title}</h3>
            <p>{body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
