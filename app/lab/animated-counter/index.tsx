"use client";

import { useEffect, useId, useRef, useState } from "react";

type Stat = { label: string; final: number; suffix: string };

const STATS: Stat[] = [
  { label: "Labs shipped", final: 24, suffix: "+" },
  { label: "Median review time", final: 3, suffix: " min" },
  { label: "Builds passing", final: 98, suffix: "%" },
];

const DURATION_MS = 1200;

function useCountUp(final: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(final);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / DURATION_MS);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * final));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, final]);
  return value;
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const value = useCountUp(stat.final, active);
  const finalText = `${stat.final}${stat.suffix}`;
  return (
    <div className="lab-ac-stat">
      <strong data-final={finalText}>{`${value}${stat.suffix}`}</strong>
      <span className="lab-ac-label">{stat.label}</span>
    </div>
  );
}

export default function Lab() {
  const headingId = useId();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} data-lab="animated-counter" aria-labelledby={headingId} className="lab-ac">
      <h2 id={headingId} className="lab-ac-title">Momentum, at a glance</h2>
      <div className="lab-ac-grid">
        {STATS.map((stat) => (
          <StatItem key={stat.label} stat={stat} active={active} />
        ))}
      </div>
      <p className="lab-ac-note">Example data: illustrative figures for this demo section.</p>
      <style>{css}</style>
    </section>
  );
}

const css = `
  .lab-ac { width: min(720px, 100%); margin: 8px auto 56px; color: #F2EFE6; }
  .lab-ac-title { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 24px; }
  .lab-ac-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
    border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; background: rgba(18, 26, 22, 0.35);
  }
  .lab-ac-stat { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 8px; min-width: 0; }
  .lab-ac-stat strong {
    font-family: var(--serif); font-weight: 400; font-size: clamp(26px, 6vw, 40px); color: var(--sage);
    line-height: 1; font-variant-numeric: tabular-nums;
  }
  .lab-ac-label { font-family: var(--sans); font-weight: 500; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: #E8EEE9; }
  .lab-ac-note { margin: 24px 0 0; font-size: 14px; color: #E8EEE9; }
  @media (max-width: 560px) {
    .lab-ac-grid { grid-template-columns: 1fr; gap: 20px; }
  }
`;
