"use client";
import { useEffect, useState } from "react";

const ITEMS = [
  { t: "Fresh branch", s: "/lab/feature-grid/icon-0.svg", d: "Each run starts on a new branch from the empty lab base." },
  { t: "Allowlist", s: "/lab/feature-grid/icon-1.svg", d: "Only the feature file, the page slot, and current.json may change." },
  { t: "Size cap", s: "/lab/feature-grid/icon-2.svg", d: "The gate rejects a feature that grows past the line budget." },
  { t: "No network", s: "/lab/feature-grid/icon-3.svg", d: "Client code cannot fetch, open sockets, or read environment variables." },
  { t: "Visual gate", s: "/lab/feature-grid/icon-4.svg", d: "Layout is checked at desktop and phone widths for clip, scroll, and contrast." },
  { t: "Nightly reset", s: "/lab/feature-grid/icon-5.svg", d: "Overnight the showcase returns to an empty lab for the next run." },
];

const css = `
.lab-grid{box-sizing:border-box;width:min(960px,100%);max-width:100%;margin:8px auto 56px;padding:0 8px;color:var(--mist,#F2EFE6)}
.lab-grid *,.lab-grid ::before,.lab-grid ::after{box-sizing:border-box}
.lab-grid h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;margin:0 0 20px;color:var(--mist,#F2EFE6)}
.lab-list{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
@media (max-width:900px){.lab-list{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:600px){.lab-list{grid-template-columns:minmax(0,1fr)}}
.lab-card{margin:0;border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;min-width:0}
.lab-card h3{font-family:var(--sans);font-weight:500;letter-spacing:0.16em;text-transform:uppercase;font-size:12px;line-height:1.4;margin:12px 0 8px;color:var(--sage,#B0CBBC)}
.lab-card p{margin:0;font-size:15px;line-height:1.5;color:#E8EEE9;overflow-wrap:anywhere}
.lab-icon{display:block;width:32px;height:32px}
.lab-fb{display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;background:rgba(176,203,188,0.16)}
.lab-fb svg{width:20px;height:20px;stroke:var(--sage,#B0CBBC);fill:none;stroke-width:1.5}
@media (prefers-reduced-motion:reduce){.lab-grid *{animation:none!important;transition:none!important}}
`;

function Art({ src, label }: { src: string; label: string }) {
  const [ok, setOk] = useState(true);
  useEffect(() => {
    setOk(true);
  }, [src]);
  if (!ok) {
    return (
      <span data-art="fallback" aria-hidden="true" className="lab-fb">
        <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5v14" /></svg>
      </span>
    );
  }
  return (
    <img
      data-art="image"
      src={src}
      width={32}
      height={32}
      alt={label}
      className="lab-icon"
      onError={() => setOk(false)}
      ref={(el) => {
        if (el && el.complete && el.naturalWidth === 0) setOk(false);
      }}
    />
  );
}

export default function FeatureGrid() {
  return (
    <section data-lab="feature-grid" aria-labelledby="lab-fg-h" className="lab-grid">
      <style>{css}</style>
      <h2 id="lab-fg-h">Six guardrails of the showcase</h2>
      <ul className="lab-list">
        {ITEMS.map((item) => (
          <li key={item.t} className="lab-card">
            <Art src={item.s} label={item.t} />
            <h3>{item.t}</h3>
            <p>{item.d}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
