"use client";

import { useEffect, useRef, useState } from "react";

const ITEMS = [
  { t: "Fresh branch", s: "Each run starts on a new branch with an empty lab slot." },
  { t: "Allowlist", s: "Only the feature module, the page slot, and current.json may change." },
  { t: "Size cap", s: "The feature diff stays compact so the gate can review every line." },
  { t: "No network", s: "The component stays offline and never calls remote APIs." },
  { t: "Visual gate", s: "Layout must hold on wide and phone widths without sideways scroll." },
  { t: "Nightly reset", s: "The lab slot is cleared so the next demo starts empty." },
];

const css = `
.lab-wrap{width:min(960px,100%);margin:8px auto 56px;padding:0 16px;box-sizing:border-box;color:var(--mist,#F2EFE6)}
.lab-wrap *{box-sizing:border-box}
.lab-wrap h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 20px;color:var(--mist,#F2EFE6)}
.lab-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;list-style:none;margin:0;padding:0}
.lab-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px}
.lab-card h3{font-family:var(--serif);font-weight:400;font-size:20px;margin:12px 0 8px}
.lab-card p{margin:0;font-family:var(--sans);line-height:1.45;color:#E8EEE9}
.lab-fb{display:inline-flex;width:32px;height:32px;color:var(--sage,#9BB8A8);align-items:center;justify-content:center}
.lab-fb svg{display:block}
@media (max-width:900px){.lab-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:600px){.lab-grid{grid-template-columns:minmax(0,1fr)}}
@media (prefers-reduced-motion:reduce){.lab-wrap *{animation:none!important;transition:none!important}}
`;

function Art({ i, alt }: { i: number; alt: string }) {
  const [fb, setFb] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFb(true);
  }, []);
  if (fb) {
    return (
      <span data-art="fallback" aria-hidden="true" className="lab-fb">
        <svg width="32" height="32" viewBox="0 0 32 32">
          <path d="M8 16h16M16 8v16" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </span>
    );
  }
  return (
    <img
      ref={ref}
      data-art="image"
      src={"/lab/feature-grid/icon-" + i + ".svg"}
      width={32}
      height={32}
      alt={alt}
      onError={() => setFb(true)}
    />
  );
}

export default function FeatureGrid() {
  return (
    <section data-lab="feature-grid" aria-labelledby="lab-fg-h" className="lab-wrap">
      <style>{css}</style>
      <h2 id="lab-fg-h">Six guardrails of the showcase</h2>
      <ul className="lab-grid">
        {ITEMS.map((item, i) => (
          <li className="lab-card" key={item.t}>
            <Art i={i} alt="" />
            <h3>{item.t}</h3>
            <p>{item.s}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
