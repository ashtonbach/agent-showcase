"use client";
import { useState } from "react";

const CARDS: { t: string; d: string }[] = [
  { t: "Fresh branch", d: "Showcase work never lands on main directly—agents branch first, then open a focused PR." },
  { t: "Allowlist", d: "If a path is not on the feature list, the merge gate rejects it, even when the UI looks fine." },
  { t: "Size cap", d: "Large diffs fail automatically; the budget keeps each lab change easy to scan in review." },
  { t: "No network", d: "Browsers may load static assets, but component code cannot initiate outbound requests." },
  { t: "Visual gate", d: "Before push, Playwright measures overflow and heading visibility at two breakpoints." },
  { t: "Nightly reset", d: "Environments roll back to a known snapshot so the morning run does not inherit yesterday's clutter." },
];

const fb = (
  <svg viewBox="0 0 32 32" width={32} height={32} aria-hidden="true">
    <circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16 11v10M11 16h10" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export default function Lab() {
  const [bad, setBad] = useState<Record<number, true>>({});
  const fail = (n: number) => setBad((s) => (s[n] ? s : { ...s, [n]: true }));

  return (
    <section data-lab="feature-grid" aria-labelledby="lab-fg-title">
      <h2 id="lab-fg-title">Feature grid</h2>
      <ul className="lab-fg-cards">
        {CARDS.map((c, n) => (
          <li key={c.t} className="lab-fg-card">
            <div className="lab-fg-top">
              <span className="lab-fg-art">
                {bad[n] ? (
                  <span data-art="fallback" aria-hidden="true" className="lab-fg-art-fb">{fb}</span>
                ) : (
                  <img data-art="image" src={`/lab/feature-grid/icon-${n}.svg`} width={32} height={32} alt="" onError={() => fail(n)} />
                )}
              </span>
              <h3>{c.t}</h3>
            </div>
            <p>{c.d}</p>
          </li>
        ))}
      </ul>
      <style>{`
[data-lab="feature-grid"]{max-width:min(960px,100%);margin:8px auto 56px;color:#E8EEE9}
[data-lab="feature-grid"] h2{font:400 30px/1.2 var(--serif);margin:0 0 20px;color:#F2EFE6}
.lab-fg-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;list-style:none;margin:0;padding:0}
.lab-fg-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px}
.lab-fg-top{display:flex;align-items:center;gap:12px;margin-bottom:8px}
.lab-fg-art{width:32px;height:32px;color:var(--sage);flex-shrink:0}
.lab-fg-art-fb{display:flex;align-items:center;justify-content:center;width:32px;height:32px;background:rgba(176,203,188,.15);border-radius:8px}
.lab-fg-card h3{margin:0;font:400 19px var(--serif);color:#F2EFE6}
.lab-fg-card p{margin:0;font-size:14px;line-height:1.5;color:rgba(232,238,233,.88)}
@media(max-width:900px){.lab-fg-cards{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:600px){.lab-fg-cards{grid-template-columns:1fr;max-width:min(720px,100%)}}
`}</style>
    </section>
  );
}
