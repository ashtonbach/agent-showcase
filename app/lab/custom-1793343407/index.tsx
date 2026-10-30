"use client";

import { useId } from "react";

const css = `
section[data-lab="custom-1793343407"] {
  width: min(720px, 100%); margin: 8px auto 56px;
}
section[data-lab="custom-1793343407"] h2 {
  font-family: var(--serif); font-weight: 400; font-size: 30px;
  color: var(--mist, #f2efe6); margin: 0 0 20px;
}
.lab-card {
  border: 1px solid rgba(176, 203, 188, 0.28);
  border-radius: 16px;
  padding: 24px;
  background: rgba(18, 26, 22, 0.35);
}
.lab-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 14px; }
.lab-row {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  font-family: var(--sans); font-size: 15px; color: var(--mist, #f2efe6);
}
.lab-service { font-weight: 500; letter-spacing: 0.02em; }
.lab-status { display: flex; align-items: center; gap: 10px; }
.lab-dot {
  width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0;
  box-shadow: 0 0 0 2px rgba(242, 239, 230, 0.12);
}
.lab-dot--green { background: #6ecf8a; }
.lab-dot--amber { background: #e6b84d; }
.lab-dot--red { background: #e06b6b; }
.lab-label { font-size: 13px; color: #e8eee9; letter-spacing: 0.04em; }
.lab-sr {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}
.lab-note {
  margin: 16px 0 0; font-family: var(--sans); font-size: 14px; color: #e8eee9;
  opacity: 0.85;
}
`;

type Tone = "green" | "amber" | "red";

const rows: { service: string; tone: Tone; label: string }[] = [
  { service: "Website", tone: "green", label: "Operational" },
  { service: "API", tone: "amber", label: "Degraded" },
  { service: "Docs", tone: "green", label: "Operational" },
];

export default function LabSection() {
  const titleId = useId();
  return (
    <section data-lab="custom-1793343407" aria-labelledby={titleId}>
      <h2 id={titleId}>Status board</h2>
      <div className="lab-card">
        <ul className="lab-list">
          {rows.map((row) => (
            <li key={row.service} className="lab-row">
              <span className="lab-service">{row.service}</span>
              <span className="lab-status">
                <span
                  className={`lab-dot lab-dot--${row.tone}`}
                  role="img"
                  aria-label={`${row.service} status: ${row.label}`}
                />
                <span className="lab-sr">{row.label}</span>
                <span className="lab-label" aria-hidden="true">
                  {row.label}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <p className="lab-note">Example data: statuses shown are illustrative only.</p>
      <style>{css}</style>
    </section>
  );
}
