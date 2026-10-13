"use client";
import { useEffect, useRef, useState } from "react";

const ITEMS = [
  { t: "Fresh branch", d: "Each run starts from a clean base so the lab slot is empty." },
  { t: "Allowlist", d: "Only the feature module, two page lines, and the current slug may change." },
  { t: "Size cap", d: "The gate rejects a diff that exceeds the line budget." },
  { t: "No network", d: "Cards stay local: no remote calls, sockets, or environment reads." },
  { t: "Visual gate", d: "Desktop and phone layouts are checked in dark and light before a push." },
  { t: "Nightly reset", d: "The showcase returns to an empty slot so the next run starts clean." },
];

const css = `
.lab-fg{width:min(960px,100%);margin:8px auto 56px;color:var(--mist,#E8EEE9)}
.lab-bar{display:flex;justify-content:flex-end;margin:0 0 12px}
.lab-theme{font:500 12px/1 var(--sans);letter-spacing:.16em;text-transform:uppercase;color:#121A16;background:var(--sage,#B0CBBC);border:0;border-radius:999px;padding:6px 12px;cursor:pointer}
.lab-grid{display:grid;grid-template-columns:1fr;gap:16px;list-style:none;margin:0;padding:0}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;min-width:0}
.lab-card h3{font-family:var(--serif);font-weight:400;font-size:22px;margin:10px 0 6px;color:var(--mist,#F2EFE6)}
.lab-card p{color:var(--mist,#E8EEE9);font-size:15px;line-height:1.5;overflow-wrap:anywhere}
.lab-icon{display:block;width:32px;height:32px}
.lab-fb{display:inline-flex;width:32px;height:32px;align-items:center;justify-content:center;border-radius:8px;background:rgba(176,203,188,.16);color:var(--sage,#B0CBBC)}
.lab-note{margin:0 0 16px;color:var(--sage,#B0CBBC);font-size:14px}
.lab-fg[data-theme="light"] .lab-card{background:#E8EEE9}
.lab-fg[data-theme="light"] .lab-card h3,.lab-fg[data-theme="light"] .lab-card p{color:#121A16}
@media(min-width:601px){.lab-grid{grid-template-columns:1fr 1fr}}
@media(min-width:901px){.lab-grid{grid-template-columns:1fr 1fr 1fr}}
@media(prefers-reduced-motion:reduce){.lab-theme{transition:none}}
`;

function Icon({ i, title }: { i: number; title: string }) {
  const [ok, setOk] = useState(true);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setOk(false);
  }, []);
  if (!ok) {
    return (
      <span data-art="fallback" aria-hidden="true" className="lab-fb">
        <svg viewBox="0 0 32 32" width={32} height={32}><path d="M8 16h16" stroke="currentColor" fill="none" strokeWidth="2" /></svg>
      </span>
    );
  }
  return (
    <img ref={ref} data-art="image" className="lab-icon" src={"/lab/feature-grid/icon-" + i + ".svg"} width={32} height={32} alt={title} onError={() => setOk(false)} />
  );
}

export default function FeatureGrid() {
  const [light, setLight] = useState(false);
  return (
    <section data-lab="feature-grid" aria-labelledby="lab-fg-title" className="lab-fg" data-theme={light ? "light" : "dark"}>
      <style>{css}</style>
      <p className="label">Showcase guardrails</p>
      <h2 id="lab-fg-title">Six guardrails of the showcase</h2>
      <div className="lab-bar">
        <button type="button" className="lab-theme" aria-pressed={light} onClick={() => setLight(!light)}>{light ? "Dark" : "Light"}</button>
      </div>
      <p className="lab-note">Example data</p>
      <ul className="lab-grid">
        {ITEMS.map((item, i) => (
          <li key={item.t} className="lab-card">
            <Icon i={i} title={item.t} />
            <h3>{item.t}</h3>
            <p>{item.d}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
