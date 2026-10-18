"use client";

import { useEffect, useState } from "react";

const VARIATIONS = [
  {
    className: "lab-banner-v0",
    label: "Classic stripes",
    message: "We're closed Dec 24 & 25 — Merry Christmas!",
  },
  {
    className: "lab-banner-v1",
    label: "Gold ribbon",
    message: "Closed Dec 24–25. Wishing you joy & peace!",
  },
  {
    className: "lab-banner-v2",
    label: "Evergreen glow",
    message: "Holiday hours: closed Dec 24 & 25. See you soon!",
  },
];

const css = `
  .lab-wrap {
    width: min(720px, 100%);
    margin: 8px auto 56px;
  }
  .lab-wrap h2 {
    font-family: var(--serif);
    font-weight: 400;
    font-size: 30px;
    color: var(--mist, #f2efe6);
    margin: 0 0 16px;
  }
  .lab-banner {
    width: 100%;
    max-height: 100px;
    min-height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 12px 20px;
    box-sizing: border-box;
    border-radius: 16px;
    border: 1px solid rgba(176, 203, 188, 0.28);
    font-family: var(--sans);
    font-size: clamp(0.85rem, 2.5vw, 1rem);
    font-weight: 500;
    letter-spacing: 0.04em;
    color: #f2efe6;
    overflow: hidden;
  }
  .lab-banner-v0 {
    background: linear-gradient(
      105deg,
      #8b1a1a 0%,
      #8b1a1a 18%,
      #1a5c32 18%,
      #1a5c32 36%,
      #b8860b 36%,
      #b8860b 54%,
      #8b1a1a 54%,
      #8b1a1a 72%,
      #1a5c32 72%,
      #1a5c32 90%,
      #b8860b 90%
    );
    text-shadow: 0 1px 2px rgba(18, 26, 22, 0.6);
  }
  .lab-banner-v1 {
    background: linear-gradient(180deg, #6b1515 0%, #1a4d28 50%, #6b1515 100%);
    box-shadow: inset 0 0 0 3px #c9a227, inset 0 0 24px rgba(201, 162, 39, 0.35);
  }
  .lab-banner-v2 {
    background: radial-gradient(ellipse at 20% 50%, #9a2222 0%, transparent 50%),
      radial-gradient(ellipse at 80% 50%, #c9a227 0%, transparent 45%),
      linear-gradient(90deg, #14201a, #1a5c32 50%, #14201a);
  }
  @media (prefers-reduced-motion: no-preference) {
    .lab-banner-v2 {
      animation: lab-shimmer 8s ease-in-out infinite;
    }
  }
  @keyframes lab-shimmer {
    0%, 100% { filter: brightness(1); }
    50% { filter: brightness(1.08); }
  }
  @media (prefers-reduced-motion: reduce) {
    .lab-banner-v2 { animation: none; }
  }
`;

export default function Lab() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    setIdx(Math.floor(Math.random() * VARIATIONS.length));
  }, []);
  const v = VARIATIONS[idx];

  return (
    <section
      data-lab="custom-1792292827"
      aria-labelledby="lab-holiday-heading"
      className="lab-wrap"
    >
      <style>{css}</style>
      <h2 id="lab-holiday-heading">Holiday notice</h2>
      <div
        className={`lab-banner ${v.className}`}
        role="status"
        aria-label={`${v.label}. ${v.message}`}
      >
        {v.message}
      </div>
    </section>
  );
}
