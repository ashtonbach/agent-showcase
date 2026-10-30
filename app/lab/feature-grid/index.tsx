"use client";

import { useState } from "react";

// 150-line cap: scripts/v2/gate.js. Widths 1280 and 390: scripts/v2/check-feature.js.
// Cleared at 3 AM CT: app/lab/README.md and .github/workflows/lab-reset.yml.
const CARDS = [
  ["Fresh branch", "Each run starts on a new branch cut from origin/base, with this lab slot empty."],
  ["Allowlist", "Only this lab folder, the page slot, and current.json are allowed to change."],
  ["Size cap", "The merge gate rejects a diff larger than 150 changed lines."],
  ["No network", "The section renders from local code and does not call a remote API."],
  ["Visual gate", "Layout is checked at 1280 and 390 pixels wide for fit, heading, and contrast."],
  ["Nightly reset", "The lab sandbox is cleared at 3 AM CT so the next run starts empty."],
] as const;

const MARK = ["M8 16h16M16 8v16", "M9 17l5 5 10-11", "M8 22V10h16v12", "M8 15h16M12 15V11a4 4 0 018 0v4", "M7 22l6-13 4 8 2-4 6 9", "M16 7v5l4 2M16 7a9 9 0 110 18 9 9 0 010-18"];

const CSS = ".lab-fg{color:var(--mist,#E8EEE9)}.lab-fg-list{list-style:none;margin:8px auto 56px;padding:0;width:min(960px,100%);display:grid;grid-template-columns:1fr;gap:16px}.lab-fg-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;min-width:0}.lab-fg-mark{width:32px;height:32px;display:block}.lab-fg-card h3{font-family:var(--serif);font-weight:400;font-size:22px;line-height:1.2;margin:14px 0 8px;color:#F2EFE6}.lab-fg-card p{margin:0;font-size:15px;line-height:1.55;color:#E8EEE9}@media(min-width:601px){.lab-fg-list{grid-template-columns:1fr 1fr}}@media(min-width:901px){.lab-fg-list{grid-template-columns:1fr 1fr 1fr}}@media(prefers-reduced-motion:reduce){.lab-fg-card{transition:none}}";

export default function FeatureGrid() {
  const [miss, setMiss] = useState([false, false, false, false, false, false]);
  return (
    <section className="lab-fg" data-lab="feature-grid" aria-labelledby="lab-fg-title">
      <style>{CSS}</style>
      <h2 id="lab-fg-title">Feature grid</h2>
      <ul className="lab-fg-list">
        {CARDS.map(([title, body], i) => (
          <li className="lab-fg-card" key={title}>
            {miss[i] ? (
              <span className="lab-fg-mark" data-art="fallback" aria-hidden="true">
                <svg viewBox="0 0 32 32" width="32" height="32">
                  <rect x="3" y="3" width="26" height="26" rx="7" fill="#1C2C24" stroke="#B0CBBC" strokeWidth="1.5" />
                  <path d={MARK[i]} fill="none" stroke="#F2EFE6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            ) : (
              <img
                className="lab-fg-mark"
                data-art="image"
                src={"/lab/feature-grid/icon-" + i + ".svg"}
                width={32}
                height={32}
                alt=""
                onError={() => setMiss((prev) => (prev[i] ? prev : prev.map((v, j) => j === i || v)))}
              />
            )}
            <h3>{title}</h3>
            <p>{body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
