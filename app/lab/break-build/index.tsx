"use client";

import { useId } from "react";

export default function BreakBuildLab() {
  const titleId = useId().replace(/:/g, "") + "-title";
  const visits: number = "twelve";

  return (
    <section
      data-lab="break-build"
      aria-labelledby={titleId}
      className="lab-break"
    >
      <h2 id={titleId}>Visit counter</h2>
      <div className="lab-break-card">
        <p className="lab-break-lead">
          This page has been visited {visits} times.
        </p>
      </div>
      <p className="lab-note">Example data: visit count is illustrative only.</p>
      <style>{`
        .lab-break {
          width: min(720px, 100%);
          margin: 8px auto 56px;
          color: var(--mist, #f2efe6);
          font-family: var(--sans, system-ui, sans-serif);
        }
        .lab-break h2 {
          margin: 0 0 20px;
          font-family: var(--serif, Georgia, serif);
          font-weight: 400;
          font-size: 30px;
          line-height: 1.25;
          color: var(--mist, #f2efe6);
        }
        .lab-break-card {
          border: 1px solid rgba(176, 203, 188, 0.28);
          border-radius: 16px;
          padding: 24px;
          background: rgba(18, 26, 22, 0.35);
        }
        .lab-break-lead {
          margin: 0;
          font-size: 17px;
          line-height: 1.55;
          color: #e8eee9;
        }
        .lab-note {
          margin: 16px 0 0;
          font-size: 14px;
          line-height: 1.5;
          color: rgba(242, 239, 230, 0.72);
        }
      `}</style>
    </section>
  );
}
