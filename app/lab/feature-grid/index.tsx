"use client";
import { useEffect, useRef, useState } from "react";

// 6 cards: scripts/v2/specs/feature-grid.js and the run spec
const ITEMS = [
  { title: "Fresh branch", line: "Each run starts from a clean base, so leftover lab work cannot leak in." },
  { title: "Allowlist", line: "Only the feature folder, the page slot, and current.json may change." },
  { title: "Size cap", line: "The merge gate rejects a diff over the documented line budget." }, // 150 — scripts/v2/gate.js MAX
  { title: "No network", line: "The feature cannot fetch, open sockets, or read host environment values." },
  { title: "Visual gate", line: "Layout is checked at the documented desktop and phone widths." }, // 1280 and 390 — layout-check.js
  { title: "Nightly reset", line: "The lab slot is cleared overnight so the next run starts empty." },
];
const css = `
.lab-fg{width:min(960px,100%);margin:8px auto 56px;padding:0 8px;box-sizing:border-box;color:var(--mist,#E8EEE9)}
.lab-fg .label{font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;margin:0 0 12px}
.lab-fg h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 28px}
.lab-fg-list{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.lab-fg-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;box-sizing:border-box;display:flex;flex-direction:column;gap:14px;min-width:0}
.lab-fg-card h3{font-family:var(--serif);font-weight:400;font-size:20px;margin:8px 0 0}
.lab-fg-card p{font-family:var(--sans);margin:0;line-height:1.5;color:#E8EEE9}
.lab-fg-fb{display:inline-flex;width:32px;height:32px;color:var(--sage,#B0CBBC)}
@media (max-width:900px){.lab-fg-list{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:600px){.lab-fg-list{grid-template-columns:minmax(0,1fr)}}
@media (prefers-reduced-motion:reduce){.lab-fg-card{transition:none}}
`;
function Slot({ i }: { i: number }) {
  const [fb, setFb] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFb(true);
  }, []);
  if (fb) {
    return (
      <span data-art="fallback" aria-hidden="true" className="lab-fg-fb">
        <svg viewBox="0 0 32 32" width="32" height="32">
          <rect x="3" y="3" width="26" height="26" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 17.5 14 21l8-10" fill="none" stroke="currentColor" strokeWidth="1.5" />
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
      alt=""
      onError={() => setFb(true)}
    />
  );
}
export default function FeatureGrid() {
  return (
    <section className="lab-fg" data-lab="feature-grid" aria-labelledby="lab-fg-heading">
      <style>{css}</style>
      <p className="label">Showcase guardrails</p>
      <h2 id="lab-fg-heading">Six rails that keep a run honest</h2>
      <ul className="lab-fg-list">
        {ITEMS.map((item, i) => (
          <li className="lab-fg-card" key={item.title}>
            <Slot i={i} />
            <h3>{item.title}</h3>
            <p>{item.line}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
