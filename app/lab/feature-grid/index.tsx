"use client";
import { useState } from "react";

const CARDS = [
  { title: "Fresh branch", body: "Every v2 run checks out a new branch from origin/base before coding.", icon: "icon-0.svg" },
  { title: "Allowlist", body: "The gate allows only the lab folder, two page lines, and current.json—nothing else.", icon: "icon-1.svg" },
  { title: "Size cap", body: "Each feature diff is limited to 150 changed lines so reviews stay small.", icon: "icon-2.svg" },
  { title: "No network", body: "Lab code cannot call fetch, axios, WebSockets, or other network APIs.", icon: "icon-3.svg" },
  { title: "Visual gate", body: "Ship runs layout checks at 1280px and 390px before the merge gate passes.", icon: "icon-4.svg" },
  { title: "Nightly reset", body: "reset.sh removes lab features nightly at 3 AM CT via the lab-reset workflow.", icon: "icon-5.svg" },
];

export default function FeatureGrid() {
  const [bad, setBad] = useState<Record<number, boolean>>({});
  return (
    <section data-lab="feature-grid" aria-labelledby="lab-fg-heading">
      <h2 id="lab-fg-heading">Six guardrails of the showcase</h2>
      <ul className="lab-grid">
        {CARDS.map((c, i) => (
          <li key={c.title} className="lab-card">
            {bad[i] ? (
              <span className="lab-icon-fb" data-art="fallback" aria-hidden="true" />
            ) : (
              <img
                data-art="image"
                src={`/lab/feature-grid/${c.icon}`}
                width={32}
                height={32}
                alt=""
                onError={() => setBad((b) => ({ ...b, [i]: true }))}
              />
            )}
            <h3 className="lab-card-title">{c.title}</h3>
            <p className="lab-card-body">{c.body}</p>
          </li>
        ))}
      </ul>
      <style>{`
        [data-lab="feature-grid"]{width:min(960px,100%);margin:8px auto 56px;padding:0 16px;color:var(--mist,#E8EEE9)}
        [data-lab="feature-grid"] h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;margin-bottom:28px;color:var(--mist)}
        .lab-grid{list-style:none;display:grid;gap:16px;grid-template-columns:repeat(3,1fr)}
        @media(max-width:900px){.lab-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:600px){.lab-grid{grid-template-columns:1fr}}
        .lab-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;background:rgba(18,26,22,0.35)}
        .lab-card img,.lab-icon-fb{display:block;width:32px;height:32px;margin-bottom:14px}
        .lab-icon-fb{background:rgba(176,203,188,0.22);border-radius:6px}
        .lab-card-title{font-family:var(--sans);font-size:17px;font-weight:500;margin:0 0 8px;color:var(--sage)}
        .lab-card-body{font-size:15px;line-height:1.55;color:rgba(232,238,233,0.88);margin:0}
        @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
      `}</style>
    </section>
  );
}
