"use client";

import { useEffect, useRef, useState } from "react";

const CARDS = [
  { src: "/lab/feature-grid/icon-0.svg", title: "Fresh branch", body: "Each run starts on a clean branch cut from the empty lab base." },
  { src: "/lab/feature-grid/icon-1.svg", title: "Allowlist", body: "Only the lab slot files may change; the rest of the app stays locked." },
  { src: "/lab/feature-grid/icon-2.svg", title: "Size cap", body: "The feature diff stays under a tight line budget so review stays short." },
  { src: "/lab/feature-grid/icon-3.svg", title: "No network", body: "The lab component cannot fetch, open sockets, or read environment secrets." },
  { src: "/lab/feature-grid/icon-4.svg", title: "Visual gate", body: "Layout is checked at desktop and phone widths before the branch can ship." },
  { src: "/lab/feature-grid/icon-5.svg", title: "Nightly reset", body: "The showcase wipes back to a clean lab slot so the next run starts empty." },
];

const css = `
.lab-wrap{width:min(960px,100%);margin:8px auto 56px;box-sizing:border-box;padding:0 8px;color:var(--mist,#F2EFE6)}
.lab-wrap *{box-sizing:border-box}
.lab-wrap h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 20px;color:var(--mist,#F2EFE6)}
.lab-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;list-style:none;margin:0;padding:0}
.lab-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;margin:0}
.lab-card h3{font-family:var(--serif);font-weight:400;font-size:20px;margin:12px 0 8px;color:var(--mist,#F2EFE6)}
.lab-card p{margin:0;font-family:var(--sans);font-size:15px;line-height:1.45;color:#E8EEE9}
.lab-icon{display:block;width:32px;height:32px}
.lab-fallback{display:block;width:32px;height:32px;color:#F2EFE6}
@media (max-width:900px){.lab-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:600px){.lab-grid{grid-template-columns:minmax(0,1fr)}}
@media (prefers-reduced-motion:reduce){.lab-wrap *{animation:none!important;transition:none!important}}
`;

function Art({ src }: { src: string }) {
  const [ok, setOk] = useState(true);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setOk(false);
  }, []);
  if (!ok) {
    return (
      <span data-art="fallback" aria-hidden="true" className="lab-fallback">
        <svg viewBox="0 0 32 32" width="32" height="32">
          <line x1="7" y1="16" x2="25" y2="16" fill="none" stroke="#F2EFE6" strokeWidth="2" />
        </svg>
      </span>
    );
  }
  return (
    <img
      ref={ref}
      data-art="image"
      className="lab-icon"
      src={src}
      width={32}
      height={32}
      alt=""
      onError={() => setOk(false)}
    />
  );
}

export default function FeatureGrid() {
  return (
    <section data-lab="feature-grid" aria-labelledby="lab-fg-title" className="lab-wrap">
      <h2 id="lab-fg-title">Feature grid</h2>
      <ul className="lab-grid">
        {CARDS.map((c) => (
          <li key={c.title} className="lab-card">
            <Art src={c.src} />
            <h3>{c.title}</h3>
            <p>{c.body}</p>
          </li>
        ))}
      </ul>
      <style>{css}</style>
    </section>
  );
}
