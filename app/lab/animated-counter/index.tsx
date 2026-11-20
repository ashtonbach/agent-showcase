"use client";

import { useEffect, useRef, useState } from "react";

/* Example figures for demo layout only */
const STATS = [
  { final: "2,400", label: "Acres restored" },
  { final: "98%", label: "Native cover" },
  { final: "47", label: "Trail partners" },
] as const;

function stepValue(final: string, t: number): string {
  if (t >= 1) return final;
  if (final.includes("%")) {
    const n = parseInt(final, 10);
    return `${Math.round(n * t)}%`;
  }
  const n = parseInt(final.replace(/,/g, ""), 10);
  const v = Math.round(n * t);
  return final.includes(",") ? v.toLocaleString("en-US") : String(v);
}

const css = `
  .lab-ac { width: min(960px, 100%); margin: 8px auto 56px; color: var(--mist, #F2EFE6); }
  .lab-ac h2 { margin: 0 0 24px; font-family: var(--serif); font-weight: 400; font-size: 30px; color: var(--mist, #F2EFE6); }
  .lab-ac-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  @media (max-width: 520px) { .lab-ac-grid { grid-template-columns: 1fr; } }
  .lab-ac-stat {
    border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; text-align: center;
    background: rgba(18, 26, 22, 0.35);
  }
  .lab-ac-stat strong { display: block; font-family: var(--serif); font-weight: 400; font-size: 36px; line-height: 1.1; color: var(--mist, #F2EFE6); }
  .lab-ac-stat span {
    display: block; margin-top: 8px; font-family: var(--sans); font-weight: 500; font-size: 11px;
    letter-spacing: 0.16em; text-transform: uppercase; color: var(--sage, #B0CBBC);
  }
  .lab-ac-note { margin: 20px 0 0; font-size: 14px; color: rgba(242, 239, 230, 0.75); }
`;

export default function AnimatedCounter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(() => STATS.map(() => "0"));

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(STATS.map((s) => s.final));
      return;
    }
    let raf = 0;
    let start = 0;
    const run = (ts: number) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / 1200, 1);
      setShown(STATS.map((s) => stepValue(s.final, t)));
      if (t < 1) raf = requestAnimationFrame(run);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          io.disconnect();
          raf = requestAnimationFrame(run);
        }
      },
      { threshold: 0.25 }
    );
    io.observe(root);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} data-lab="animated-counter" aria-labelledby="lab-ac-title" className="lab-ac">
      <style>{css}</style>
      <h2 id="lab-ac-title">Impact at a glance</h2>
      <div className="lab-ac-grid">
        {STATS.map((s, i) => (
          <Stat key={s.label} s={s} value={shown[i]} />
        ))}
      </div>
      <p className="lab-ac-note">Example data</p>
    </section>
  );
}

function Stat({ s, value }: { s: (typeof STATS)[number]; value: string }) {
  return (
    <div className="lab-ac-stat">
      <strong data-final={s.final}>{value}</strong>
      <span>{s.label}</span>
    </div>
  );
}