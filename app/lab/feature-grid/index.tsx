"use client";

import { useEffect, useRef, useState } from "react";

// Source: showcase spec — six named guardrails, in this order.
const CARDS = [
  { t: "Fresh branch", d: "Each run starts on a clean branch so the last demo is gone." },
  { t: "Allowlist", d: "Only the lab slot files may change; everything else is blocked." },
  { t: "Size cap", d: "The gate keeps the feature compact by limiting how much can change." },
  { t: "No network", d: "This component cannot call the network or read environment secrets." },
  { t: "Visual gate", d: "The page is checked on phone and desktop so it does not scroll sideways." },
  { t: "Nightly reset", d: "The lab is wiped so the next showcase starts empty." },
] as const;

const css = `
.lab-fg{width:min(960px,100%);margin:8px auto 56px;color:var(--mist);box-sizing:border-box;padding:0 8px}
.lab-fg *{box-sizing:border-box}
.lab-fg .label{font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;margin:0 0 8px;font-size:12px;color:var(--sage)}
.lab-fg h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 24px;color:#F2EFE6}
.lab-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;list-style:none;margin:0;padding:0}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;min-width:0}
.lab-card h3{font-family:var(--serif);font-weight:400;font-size:20px;margin:12px 0 8px;color:#F2EFE6}
.lab-card p{font-family:var(--sans);margin:0;line-height:1.45;color:#E8EEE9;font-size:14px}
.lab-fb{display:inline-flex;width:32px;height:32px;align-items:center;justify-content:center;color:#121A16;background:#B0CBBC;border-radius:8px}
.lab-fg img{display:block}
@media (max-width:900px){.lab-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:600px){.lab-grid{grid-template-columns:1fr}}
@media (prefers-reduced-motion:reduce){.lab-fg *{animation:none!important;transition:none!important}}
`;

function Art({ i }: { i: number }) {
  const [fb, setFb] = useState(false);
  const r = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = r.current;
    if (el && el.complete && el.naturalWidth === 0) setFb(true);
  }, []);
  if (fb) {
    return (
      <span data-art="fallback" aria-hidden="true" className="lab-fb">
        <svg width="32" height="32" viewBox="0 0 32 32">
          <rect x="7" y="14" width="18" height="4" rx="2" fill="#121A16" stroke="#121A16" strokeWidth="2" />
        </svg>
      </span>
    );
  }
  return (
    <img
      ref={r}
      data-art="image"
      src={`/lab/feature-grid/icon-${i}.svg`}
      width={32}
      height={32}
      alt=""
      onError={() => setFb(true)}
    />
  );
}

export default function FeatureGrid() {
  return (
    <section data-lab="feature-grid" aria-labelledby="lab-fg-title" className="lab-fg">
      <style>{css}</style>
      <p className="label">Example data</p>
      <h2 id="lab-fg-title">Six guardrails of the showcase</h2>
      <ul className="lab-grid">
        {CARDS.map((c, i) => (
          <li key={c.t} className="lab-card">
            <Art i={i} />
            <h3>{c.t}</h3>
            <p>{c.d}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
