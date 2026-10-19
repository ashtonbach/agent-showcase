"use client";

import { useId } from "react";

// Example data: not a live visit count. Typed as number so next build fails.
const visits: number = "twelve";

const css = `
  .lab-bb {
    width: min(720px, 100%);
    margin: 8px auto 56px;
    color: var(--mist, #F2EFE6);
    box-sizing: border-box;
    padding: 0 12px;
  }
  .lab-bb *, .lab-bb *::before, .lab-bb *::after { box-sizing: border-box; }
  .lab-bb h2 {
    font-family: var(--serif);
    font-weight: 400;
    font-size: 30px;
    line-height: 1.25;
    margin: 0 0 16px;
    color: var(--mist, #F2EFE6);
  }
  .lab-card {
    border: 1px solid rgba(176, 203, 188, 0.28);
    border-radius: 16px;
    padding: 24px;
  }
  .lab-kicker {
    font-family: var(--sans);
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--sage);
    font-size: 12px;
    margin: 0 0 8px;
  }
  .lab-line {
    margin: 0;
    font-size: 18px;
    line-height: 1.5;
    color: #E8EEE9;
    overflow-wrap: anywhere;
  }
  .lab-note {
    margin: 16px 0 0;
    font-size: 14px;
    line-height: 1.45;
    color: #E8EEE9;
  }
  @media (prefers-reduced-motion: reduce) {
    .lab-bb * { animation: none !important; transition: none !important; }
  }
`;

export default function BreakBuild() {
  const titleId = useId();
  return (
    <section className="lab-bb" data-lab="break-build" aria-labelledby={titleId}>
      <style>{css}</style>
      <h2 id={titleId}>Visit counter</h2>
      <div className="lab-card">
        <p className="lab-kicker">Count</p>
        <p className="lab-line">This page has been visited {visits} times.</p>
      </div>
      <p className="lab-note">Example data: this visit count is a stand-in, not measured traffic.</p>
    </section>
  );
}
