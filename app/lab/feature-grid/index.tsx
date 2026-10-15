"use client";
import { useEffect, useRef, useState } from "react";

/* Source: this run's Feature grid spec — six named guardrails. */
const ITEMS = [
  { t: "Fresh branch", s: "/lab/feature-grid/icon-0.svg", d: "Each run starts on a new branch so the lab slot is empty." },
  { t: "Allowlist", s: "/lab/feature-grid/icon-1.svg", d: "Only the feature module, the page slot, and current.json may change." },
  { t: "Size cap", s: "/lab/feature-grid/icon-2.svg", d: "The diff must stay under the line budget, excluding artwork." },
  { t: "No network", s: "/lab/feature-grid/icon-3.svg", d: "The feature may not fetch, open sockets, or read environment variables." },
  { t: "Visual gate", s: "/lab/feature-grid/icon-4.svg", d: "Layout is checked on desktop and phone widths for overflow, contrast, and a visible heading." },
  { t: "Nightly reset", s: "/lab/feature-grid/icon-5.svg", d: "The lab slot is cleared so the next run starts from an empty demo." },
];

const css = `
.lab-fg{width:min(960px,100%);margin:8px auto 56px;padding:0 16px;box-sizing:border-box;color:var(--mist,#F2EFE6)}
.lab-fg h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;margin:0 0 20px;color:var(--mist,#F2EFE6)}
.lab-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;list-style:none;margin:0;padding:0}
@media (max-width:900px){.lab-list{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:600px){.lab-list{grid-template-columns:minmax(0,1fr)}}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;margin:0}
.lab-card h3{font-family:var(--serif);font-weight:400;font-size:18px;margin:12px 0 8px;color:var(--mist,#F2EFE6)}
.lab-card p{margin:0;font-size:15px;line-height:1.45;color:#E8EEE9}
.lab-img,.lab-fb{display:block;width:32px;height:32px}
.lab-fb{display:flex;align-items:center;justify-content:center;border-radius:8px}
@media (prefers-reduced-motion:reduce){.lab-fg *{transition:none;animation:none}}
`;

function Art({ src }: { src: string }) {
  const [art, setArt] = useState<"image" | "fallback">("image");
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setArt("fallback");
  }, [src]);
  if (art === "fallback") {
    return (
      <span data-art="fallback" aria-hidden="true" className="lab-fb">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M6 16h20" stroke="#F2EFE6" strokeWidth="6" strokeLinecap="square" />
        </svg>
      </span>
    );
  }
  return (
    <img
      ref={ref}
      data-art="image"
      src={src}
      width={32}
      height={32}
      alt=""
      className="lab-img"
      onError={() => setArt("fallback")}
    />
  );
}

export default function FeatureGrid() {
  return (
    <section data-lab="feature-grid" aria-labelledby="lab-fg-h" className="lab-fg">
      <style>{css}</style>
      <h2 id="lab-fg-h">Feature grid</h2>
      <ul className="lab-list">
        {ITEMS.map((item) => (
          <li key={item.t} className="lab-card">
            <Art src={item.s} />
            <h3>{item.t}</h3>
            <p>{item.d}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
