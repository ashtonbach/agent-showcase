"use client";
import { useEffect, useState } from "react";

const ITEMS = [
  ["Fresh branch", "Each run starts on a clean branch with an empty lab slot."],
  ["Allowlist", "Only the feature file, two page lines, and the lab slug may change."],
  ["Size cap", "The whole diff stays inside a hard line budget."],
  ["No network", "The feature must not fetch, post, or open sockets."],
  ["Visual gate", "Layout is checked at desktop and phone widths before ship."],
  ["Nightly reset", "The lab slot is cleared so the next run starts empty."],
] as const;

const css = `
.lab-grid{width:min(960px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6)}
.lab-grid h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 20px}
.lab-list{list-style:none;margin:0;padding:0;display:grid;gap:16px;grid-template-columns:1fr}
@media (min-width:601px){.lab-list{grid-template-columns:repeat(2,1fr)}}
@media (min-width:901px){.lab-list{grid-template-columns:repeat(3,1fr)}}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px}
.lab-card h3{font-family:var(--serif);font-weight:400;font-size:20px;margin:12px 0 8px}
.lab-card p{margin:0;color:#E8EEE9;line-height:1.45;font-size:15px}
.lab-tile{display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:12px;background:var(--sage,#B0CBBC)}
.lab-icon{display:block;width:32px;height:32px;background:var(--sage,#B0CBBC);border-radius:6px}
.lab-fb{display:block;width:32px;height:32px;border-radius:6px;background:#121A16}
@media (prefers-reduced-motion:reduce){.lab-grid *{animation:none!important;transition:none!important}}
`;

function Icon({ i }: { i: number }) {
  const [fail, setFail] = useState(false);
  useEffect(() => {
    const el = document.getElementById("lab-fg-i" + i) as HTMLImageElement | null;
    if (el && el.complete && el.naturalWidth === 0) setFail(true);
  }, [i]);
  return (
    <span className="lab-tile">
      {fail ? (
        <span data-art="fallback" aria-hidden="true" className="lab-fb" />
      ) : (
        <img
          id={"lab-fg-i" + i}
          data-art="image"
          src={"/lab/feature-grid/icon-" + i + ".svg"}
          width={32}
          height={32}
          alt=""
          className="lab-icon"
          onError={() => setFail(true)}
        />
      )}
    </span>
  );
}

export default function FeatureGrid() {
  return (
    <section data-lab="feature-grid" aria-labelledby="lab-fg-h" className="lab-grid">
      <style>{css}</style>
      <h2 id="lab-fg-h">Six guardrails of the showcase</h2>
      <ul className="lab-list">
        {ITEMS.map(([title, line], i) => (
          <li key={title} className="lab-card">
            <Icon i={i} />
            <h3>{title}</h3>
            <p>{line}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
