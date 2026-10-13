"use client";

import { useEffect, useRef, useState } from "react";

const CARDS = [
  { t: "Fresh branch", s: "Each run starts on a new branch so the lab slot is empty." },
  { t: "Allowlist", s: "Only the feature file, two page lines, and current.json may change." },
  { t: "Size cap", s: "The gate rejects a diff that exceeds the documented line budget." },
  { t: "No network", s: "Client code may not fetch, open sockets, or read environment variables." },
  { t: "Visual gate", s: "Layout is checked at phone and desktop widths so the page does not scroll sideways." },
  { t: "Nightly reset", s: "The demo resets so the next run starts from a clean lab slot." },
];

const css = `
.lab-fg{width:min(960px,100%);margin:8px auto 56px;color:var(--mist);box-sizing:border-box;padding:0 12px}
.lab-fg .label{font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--sage);margin:0 0 8px;font-size:12px}
.lab-fg h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 20px;color:#F2EFE6}
.lab-grid{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
@media (max-width:900px){.lab-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:600px){.lab-grid{grid-template-columns:minmax(0,1fr)}}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;box-sizing:border-box;min-width:0}
.lab-card h3{font-family:var(--serif);font-weight:400;font-size:20px;margin:12px 0 8px;color:#F2EFE6}
.lab-card p{margin:0;font-family:var(--sans);font-size:14px;line-height:1.5;color:#E8EEE9}
.lab-fb{display:inline-flex;width:32px;height:32px;align-items:center;justify-content:center;border-radius:8px;background:rgba(176,203,188,.16);color:var(--sage)}
.lab-fg img{display:block;width:32px;height:32px}
@media (prefers-reduced-motion:reduce){.lab-fg *{animation:none!important;transition:none!important}}
`;

function Art({ i, alt }: { i: number; alt: string }) {
  const [ok, setOk] = useState(true);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setOk(false);
  }, []);
  if (!ok)
    return (
      <span data-art="fallback" aria-hidden="true" className="lab-fb">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10h12M10 4v12" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </span>
    );
  return (
    <img
      ref={ref}
      data-art="image"
      src={"/lab/feature-grid/icon-" + i + ".svg"}
      width={32}
      height={32}
      alt={alt}
      onError={() => setOk(false)}
    />
  );
}

export default function FeatureGrid() {
  return (
    <section data-lab="feature-grid" aria-labelledby="lab-fg-title" className="lab-fg">
      <style>{css}</style>
      <p className="label">Showcase guardrails · Example data</p>
      <h2 id="lab-fg-title">Six checks that keep a live run honest</h2>
      <ul className="lab-grid">
        {CARDS.map((c, i) => (
          <li key={c.t} className="lab-card">
            <Art i={i} alt="" />
            <h3>{c.t}</h3>
            <p>{c.s}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
