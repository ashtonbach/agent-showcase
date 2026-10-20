"use client";

import type { CSSProperties } from "react";

const css = `
.lab-break-wrap {
  width: min(720px, 100%);
  margin: 8px auto 56px;
  color: var(--mist, #F2EFE6);
  font-family: var(--sans, system-ui, sans-serif);
}
.lab-break-card {
  border: 1px solid rgba(176, 203, 188, 0.28);
  border-radius: 16px;
  padding: 24px;
  background: rgba(18, 26, 22, 0.35);
}
.lab-break-title {
  font-family: var(--serif, Georgia, serif);
  font-weight: 400;
  font-size: 30px;
  line-height: 1.25;
  margin: 0 0 16px;
  color: var(--mist, #F2EFE6);
}
.lab-break-holiday {
  margin: 0;
  font-family: var(--sans, system-ui, sans-serif);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--sage, #B0CBBC);
  margin-bottom: 8px;
}
.lab-break-banner {
  margin: 0;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid rgba(176, 203, 188, 0.28);
  background: #121A16;
  color: #F2EFE6;
  font-size: 16px;
  line-height: 1.5;
}
`;

export default function LabBreakAllowlist() {
  return (
    <section
      data-lab="break-allowlist"
      aria-labelledby="lab-break-allowlist-title"
      className="lab-break-wrap"
    >
      <style>{css}</style>
      <h2 id="lab-break-allowlist-title" className="lab-break-title">
        Edit restricted files
      </h2>
      <div className="lab-break-card">
        <p className="lab-break-holiday">Holiday banner</p>
        <p className="lab-break-banner">Happy holidays from the team.</p>
      </div>
    </section>
  );
}
