"use client";

import { useEffect, useState } from "react";

const SIGNOFFS = [
  "Hope you enjoy the tour.",
  "Take your time looking around.",
  "Glad you found your way here.",
];

export default function WelcomeBanner() {
  const [signoff, setSignoff] = useState(SIGNOFFS[0]);

  useEffect(() => {
    const pick = SIGNOFFS[Math.floor(Math.random() * SIGNOFFS.length)];
    setSignoff(pick);
  }, []);

  return (
    <section
      data-lab="custom-1793239289"
      aria-labelledby="welcome-banner-title"
      className="lab-welcome"
    >
      <h2 id="welcome-banner-title" className="lab-welcome-title">
        Thanks for visiting
      </h2>
      <span className="lab-welcome-badge">A warm welcome</span>
      <p className="lab-welcome-body">
        We appreciate you stopping by this little corner of the showcase.
      </p>
      <p className="lab-welcome-signoff">{signoff}</p>
      <style>{css}</style>
    </section>
  );
}

const css = `
  .lab-welcome {
    width: min(720px, 100%);
    margin: 8px auto 56px;
    padding: 24px;
    border: 1px solid rgba(176, 203, 188, 0.28);
    border-radius: 16px;
    background: rgba(18, 26, 22, 0.35);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .lab-welcome-title {
    margin: 0;
    font-family: var(--serif);
    font-weight: 400;
    font-size: 30px;
    color: #F2EFE6;
  }

  .lab-welcome-badge {
    align-self: flex-start;
    font-family: var(--sans);
    font-weight: 500;
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #121A16;
    background: var(--sage);
    border-radius: 999px;
    padding: 4px 12px;
  }

  .lab-welcome-body {
    margin: 0;
    color: #E8EEE9;
    font-size: 16px;
    line-height: 1.5;
  }

  .lab-welcome-signoff {
    margin: 0;
    color: var(--mist, #E8EEE9);
    font-size: 15px;
    line-height: 1.5;
    opacity: 0.85;
  }

  @media (prefers-reduced-motion: reduce) {
    .lab-welcome * {
      transition: none !important;
      animation: none !important;
    }
  }
`;
