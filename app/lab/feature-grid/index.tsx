"use client";

import { useEffect, useId, useRef, useState } from "react";

const CARDS = [
  { title: "Fresh branch", text: "Each run works on an isolated git branch so agents never commit directly to main.", icon: "icon-0.svg" },
  { title: "Allowlist", text: "Only approved file paths and imports may change; anything else fails the automated gate.", icon: "icon-1.svg" },
  { title: "Size cap", text: "The gate measures changed lines and blocks oversized diffs so features stay reviewable.", icon: "icon-2.svg" },
  { title: "No network", text: "Client code must not open fetches, sockets, or beacons—network calls fail the merge check.", icon: "icon-3.svg" },
  { title: "Visual gate", text: "SHIP snapshots layout at 1280px and 390px before push to catch scroll and clipping issues.", icon: "icon-4.svg" },
  { title: "Nightly reset", text: "Preview and lab state reset on a schedule so each demo starts from a known clean baseline.", icon: "icon-5.svg" },
] as const;

const FB = (
  <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
    <rect x="4" y="4" width="24" height="24" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 16h12" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

function ArtIcon({ file, label }: { file: string; label: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const [ok, setOk] = useState(true);
  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth === 0) setOk(false);
  }, []);
  if (!ok) {
    return (
      <span data-art="fallback" className="lab-fg-fb" aria-hidden="true">
        {FB}
      </span>
    );
  }
  return (
    <img
      ref={ref}
      data-art="image"
      src={`/lab/feature-grid/${file}`}
      width={32}
      height={32}
      alt={label}
      onError={() => setOk(false)}
    />
  );
}

const css = `
.lab-fg{width:min(960px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6)}
.lab-fg h2{margin:0 0 24px;font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2}
.lab-fg-grid{display:grid;gap:16px;grid-template-columns:repeat(3,1fr);list-style:none;margin:0;padding:0}
@media(max-width:900px){.lab-fg-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){.lab-fg-grid{grid-template-columns:1fr}}
.lab-fg-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.35)}
.lab-fg-icon{display:block;width:32px;height:32px;margin-bottom:14px;color:var(--sage,#B0CBBC)}
.lab-fg-icon img{display:block;width:32px;height:32px}
.lab-fg-card h3{margin:0 0 8px;font-family:var(--sans);font-size:17px;font-weight:500;color:var(--mist,#F2EFE6)}
.lab-fg-card p{margin:0;font-family:var(--sans);font-size:14px;line-height:1.5;color:#E8EEE9}
`;

export default function FeatureGrid() {
  const titleId = useId().replace(/:/g, "") + "-title";
  return (
    <section data-lab="feature-grid" aria-labelledby={titleId} className="lab-fg">
      <style>{css}</style>
      <h2 id={titleId}>Six guardrails of the showcase</h2>
      <ul className="lab-fg-grid">
        {CARDS.map((c) => (
          <li key={c.title} className="lab-fg-card">
            <span className="lab-fg-icon">
              <ArtIcon file={c.icon} label={c.title} />
            </span>
            <h3>{c.title}</h3>
            <p>{c.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}