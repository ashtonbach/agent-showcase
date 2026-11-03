"use client";
import { useEffect, useRef, useState } from "react";

const CARDS = [
  { t: "Fresh branch", s: "Every run checks out a dedicated branch so changes stay isolated from main.", i: 0 },
  { t: "Allowlist", s: "The gate only permits edits in the lab slot, page import, and current.json.", i: 1 },
  { t: "Size cap", s: "Diffs over the line budget fail the gate before merge.", i: 2 },
  { t: "No network", s: "Banned fetch and socket APIs keep the demo deterministic and safe.", i: 3 },
  { t: "Visual gate", s: "SHIP captures layout at 1280px and 390px before push.", i: 4 },
  { t: "Nightly reset", s: "Demo environments reset on a schedule so each run starts clean.", i: 5 },
];

function Icon({ n }: { n: number }) {
  const ref = useRef<HTMLImageElement>(null);
  const [ok, setOk] = useState(true);
  const src = `/lab/feature-grid/icon-${n}.svg`;
  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth === 0) setOk(false);
  }, []);
  if (!ok) {
    return (
      <span data-art="fallback" aria-hidden="true" className="lab-fb">
        <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
          <rect x="6" y="6" width="20" height="20" rx="5" fill="rgba(176,203,188,0.15)" stroke="#B0CBBC" />
        </svg>
      </span>
    );
  }
  return (
    <img ref={ref} data-art="image" src={src} width={32} height={32} alt="" onError={() => setOk(false)} />
  );
}

export default function FeatureGrid() {
  return (
    <section data-lab="feature-grid" aria-labelledby="fg-h2">
      <h2 id="fg-h2">Six guardrails of the showcase</h2>
      <ul className="lab-fg-list">
        {CARDS.map((c) => (
          <li key={c.t} className="lab-fg-card">
            <Icon n={c.i} />
            <h3 className="lab-fg-title">{c.t}</h3>
            <p className="lab-fg-copy">{c.s}</p>
          </li>
        ))}
      </ul>
      <style>{`
[data-lab="feature-grid"]{width:min(960px,100%);margin:8px auto 56px;color:var(--mist,#E8EEE9)}
[data-lab="feature-grid"]>h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.15;margin:0 0 24px;color:#F2EFE6}
.lab-fg-list{list-style:none;margin:0;padding:0;display:grid;gap:16px;grid-template-columns:repeat(3,1fr)}
@media(max-width:900px){.lab-fg-list{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){.lab-fg-list{grid-template-columns:1fr}}
.lab-fg-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;background:rgba(18,26,22,0.35)}
.lab-fg-card img,.lab-fb{display:block;margin-bottom:12px}
.lab-fg-title{margin:0 0 8px;font-family:var(--serif);font-weight:400;font-size:1.15rem;color:#F2EFE6}
.lab-fg-copy{margin:0;font-size:0.95rem;line-height:1.45;color:var(--mist,#E8EEE9)}
@media(prefers-reduced-motion:reduce){.lab-fg-card{transition:none}}
`}</style>
    </section>
  );
}
