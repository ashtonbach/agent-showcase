"use client";

import { useEffect, useState } from "react";

const CLOSURE =
  "We will be closed on Dec. 24th - 25th to celebrate Christmas. Hope you all have a Merry Christmas and Happy New Year.";

const VARIATIONS = [
  { key: "crimson", label: "Crimson pine", accent: "#8B3A3A" },
  { key: "holly", label: "Holly stripe", accent: "#2F5C3E" },
  { key: "evergreen", label: "Evergreen glow", accent: "#3D6B52" },
  { key: "candy", label: "Candy ribbon", accent: "#B85C6E" },
];

const css = `
  .lab-wrap { width: min(720px, 100%); margin: 8px auto 56px; }
  .lab-card {
    border: 1px solid rgba(176, 203, 188, 0.28);
    border-radius: 16px;
    padding: 24px;
    background: rgba(18, 26, 22, 0.45);
  }
  .lab-banner {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    border: 1px solid rgba(176, 203, 188, 0.35);
    padding: 18px 20px 18px 24px;
    min-height: 88px;
    display: flex;
    align-items: center;
    transition: box-shadow 0.5s ease, border-color 0.5s ease;
  }
  .lab-banner-text {
    font-family: var(--sans);
    font-size: clamp(15px, 2.8vw, 17px);
    line-height: 1.55;
    color: var(--mist);
    margin: 0;
    position: relative;
    z-index: 2;
  }
  .lab-slot {
    margin: 14px 0 0;
    font-family: var(--sans);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--sage);
  }
  .lab-snow {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
  }
  .lab-flake {
    position: absolute;
    top: -8px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(232, 238, 233, 0.55);
    animation: lab-fall linear infinite;
  }
  @keyframes lab-fall {
    to { transform: translateY(120px); opacity: 0.2; }
  }
  @media (prefers-reduced-motion: reduce) {
    .lab-flake { animation: none; opacity: 0.35; }
    .lab-banner { transition: none; }
  }
`;

const FLAKE_POS = [
  { left: "8%", delay: "0s", dur: "6s" },
  { left: "22%", delay: "1.2s", dur: "7s" },
  { left: "38%", delay: "0.4s", dur: "5.5s" },
  { left: "55%", delay: "2s", dur: "6.5s" },
  { left: "72%", delay: "0.8s", dur: "7.2s" },
  { left: "88%", delay: "1.6s", dur: "5.8s" },
];

export default function Lab() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    let i = 0;
    const id = window.setInterval(() => {
      i = (i + 1) % VARIATIONS.length;
      setActive(i);
    }, 4500);
    return () => window.clearInterval(id);
  }, []);

  const v = VARIATIONS[active];

  return (
    <section data-lab="custom-1792302784" aria-labelledby="lab-banner-h2">
      <style>{css}</style>
      <h2 id="lab-banner-h2">Holiday closure banner</h2>
      <div className="lab-wrap">
        <div className="lab-card">
          <div
            className="lab-banner"
            role="status"
            aria-live="polite"
            style={{
              borderColor: `${v.accent}66`,
              boxShadow: `inset 0 0 0 1px ${v.accent}33`,
            }}
          >
            <div className="lab-snow" aria-hidden="true">
              {FLAKE_POS.map((f, n) => (
                <span
                  key={n}
                  className="lab-flake"
                  style={{
                    left: f.left,
                    animationDelay: f.delay,
                    animationDuration: f.dur,
                  }}
                />
              ))}
            </div>
            <p className="lab-banner-text">{CLOSURE}</p>
          </div>
          <p className="lab-slot">
            Banner variation {active + 1} of {VARIATIONS.length} — replaces “{v.label}”
          </p>
        </div>
      </div>
    </section>
  );
}
