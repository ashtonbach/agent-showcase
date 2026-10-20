"use client";
import { useState } from "react";

const CARDS = [
  { title: "Fresh branch", body: "Each run codes on a dedicated branch cut from the shared base.", icon: 0 },
  { title: "Allowlist", body: "Only the lab slot files may change; everything else is blocked at the gate.", icon: 1 },
  { title: "Size cap", body: "A line budget keeps every feature small and reviewable.", icon: 2 },
  { title: "No network", body: "Client code cannot call fetch, WebSockets, or other outbound APIs.", icon: 3 },
  { title: "Visual gate", body: "Ship checks layout at 1280px and 390px before code leaves the box.", icon: 4 },
  { title: "Nightly reset", body: "Branches and previews roll back nightly so runs start clean.", icon: 5 },
] as const;

function LabIcon({ slot }: { slot: number }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span data-art="fallback" className="lab-icon-fb" aria-hidden="true">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="24" height="24" rx="6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11 16h10M16 11v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  return (
    <img data-art="image" src={`/lab/feature-grid/icon-${slot}.svg`} width={32} height={32} alt="" onError={() => setFailed(true)} />
  );
}

const css = `[data-lab="feature-grid"]{width:min(960px,100%);margin:8px auto 56px;color:var(--mist,#E8EEE9)}
[data-lab="feature-grid"]>h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.15;color:#F2EFE6;margin:10px 0 28px}
.lab-grid{list-style:none;display:grid;grid-template-columns:1fr;gap:16px;padding:0;margin:0}
@media(min-width:601px){.lab-grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:901px){.lab-grid{grid-template-columns:repeat(3,1fr)}}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(20,32,26,.35)}
.lab-card-icon{display:block;margin-bottom:14px;color:var(--sage,#B0CBBC)}
.lab-card-icon img{display:block;width:32px;height:32px}
.lab-icon-fb{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;background:rgba(176,203,188,.12);color:var(--sage,#B0CBBC)}
.lab-card-title{font-family:var(--serif);font-weight:400;font-size:22px;line-height:1.2;margin:0 0 8px;color:#F2EFE6}
.lab-card-body{margin:0;font-size:15px;line-height:1.55;color:rgba(232,238,233,.88)}`;

export default function FeatureGrid() {
  return (
    <section data-lab="feature-grid" aria-labelledby="feature-grid-heading">
      <style>{css}</style>
      <h2 id="feature-grid-heading">Six guardrails of the showcase</h2>
      <ul className="lab-grid">
        {CARDS.map((c) => (
          <li key={c.title} className="lab-card">
            <span className="lab-card-icon"><LabIcon slot={c.icon} /></span>
            <h3 className="lab-card-title">{c.title}</h3>
            <p className="lab-card-body">{c.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
