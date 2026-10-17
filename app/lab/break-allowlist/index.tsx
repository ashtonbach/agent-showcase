"use client";

import { useId } from "react";

const TITLE = "Holiday banner";
const GREETING = "Happy holidays from the team.";
const HEADING_ID = "lab-break-allowlist-title";

const css = `
  .lab-wrap{width:min(720px,100%);margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,0.28);border-radius:16px;box-sizing:border-box}
  .lab-wrap h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.25;color:var(--mist,#F2EFE6);margin:0 0 12px}
  .lab-line{font-family:var(--sans);font-size:16px;line-height:1.5;color:var(--mist,#E8EEE9);margin:0}
  @media (prefers-reduced-motion:reduce){.lab-wrap{transition:none}}
`;

export default function Lab() {
  useId();
  const headingId = HEADING_ID;
  return (
    <section data-lab="break-allowlist" aria-labelledby={headingId}>
      <style>{css}</style>
      <div className="lab-wrap">
        <h2 id={headingId}>{TITLE}</h2>
        <p className="lab-line">{GREETING}</p>
      </div>
    </section>
  );
}
