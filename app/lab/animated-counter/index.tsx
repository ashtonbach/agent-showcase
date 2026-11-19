"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

type Stat = { final: string; label: string; target: number; suffix?: string; group?: boolean };

const STATS: Stat[] = [
  { final: "2,400", label: "Acres reforested", target: 2400, group: true },
  { final: "98%", label: "Canopy survival", target: 98, suffix: "%" },
  { final: "18", label: "Partner regions", target: 18 },
];

function frame(n: number, s: Stat): string {
  if (s.suffix) return `${Math.round(n)}${s.suffix}`;
  const v = Math.round(n);
  if (!s.group) return String(v);
  return String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function AnimatedCounterLab() {
  const titleId = `${useId().replace(/:/g, "")}-title`;
  const rootRef = useRef<HTMLElement>(null);
  const [vals, setVals] = useState(["0", "0%", "0"]);
  const armed = useRef(false);

  const settle = useCallback(() => setVals(STATS.map((s) => s.final)), []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (ents) => {
        if (armed.current || !ents.some((e) => e.isIntersecting)) return;
        armed.current = true;
        if (reduce) {
          settle();
          return;
        }
        const t0 = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / 1200);
          const ease = 1 - (1 - p) ** 3;
          setVals(STATS.map((s) => (p >= 1 ? s.final : frame(s.target * ease, s))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.2 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [settle]);

  return (
    <section ref={rootRef} data-lab="animated-counter" aria-labelledby={titleId} className="lab-ac">
      <h2 id={titleId}>Stewardship impact</h2>
      <div className="lab-ac-card">
        <ul className="lab-ac-stats">
          {STATS.map((s, i) => (
            <li key={s.label} className="lab-ac-stat">
              <strong data-final={s.final} className="lab-ac-value">
                {vals[i]}
              </strong>
              <span className="lab-ac-label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="lab-note">Example data: illustrative figures for this demo layout.</p>
      <style>{`
        .lab-ac { width: min(960px, 100%); margin: 8px auto 56px; color: var(--mist, #f2efe6); }
        .lab-ac h2 {
          font-family: var(--serif, Georgia, serif);
          font-weight: 400;
          font-size: 30px;
          line-height: 1.25;
          margin: 0 0 20px;
          color: var(--mist, #f2efe6);
        }
        .lab-ac-card {
          border: 1px solid rgba(176, 203, 188, 0.28);
          border-radius: 16px;
          padding: 24px;
          background: rgba(18, 26, 22, 0.45);
        }
        .lab-ac-stats {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }
        .lab-ac-stat { text-align: center; min-width: 0; }
        .lab-ac-value {
          display: block;
          font-family: var(--serif, Georgia, serif);
          font-weight: 400;
          font-size: clamp(28px, 6vw, 40px);
          line-height: 1.1;
          color: var(--sage, #b0cbb8);
        }
        .lab-ac-label {
          display: block;
          margin-top: 8px;
          font-family: var(--sans, system-ui, sans-serif);
          font-weight: 500;
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #e8eee9;
        }
        .lab-note {
          margin: 16px 0 0;
          font-size: 14px;
          line-height: 1.45;
          color: #e8eee9;
        }
        @media (max-width: 520px) {
          .lab-ac-stats { grid-template-columns: 1fr; gap: 20px; }
        }
      `}</style>
    </section>
  );
}