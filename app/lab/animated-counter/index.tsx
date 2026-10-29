"use client";

import { useEffect, useRef, useState } from "react";

// Example data: the showcase has no live metrics backend, so these illustrate the shape only.
const STATS = [
  { value: 120, suffix: "+", label: "Labs shipped" },
  { value: 38, suffix: "", label: "Review minutes (median)" },
  { value: 99, suffix: "%", label: "Builds green" },
];

const DURATION_MS = 1200;

function finalText(stat: (typeof STATS)[number]) {
  return `${stat.value}${stat.suffix}`;
}

function liveText(stat: (typeof STATS)[number], progress: number) {
  if (progress >= 1) return finalText(stat);
  return `${Math.floor(stat.value * progress)}${stat.suffix}`;
}

export default function Lab() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const startedRef = useRef(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduceMotion =
      typeof window !== "undefined" &&
      !!window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setProgress(1);
      return;
    }
    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / DURATION_MS);
        setProgress(p);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            start();
            observer.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      data-lab="animated-counter"
      aria-labelledby="animated-counter-title"
      className="lab-ac"
      ref={sectionRef}
    >
      <h2 id="animated-counter-title" className="lab-ac-title">
        By the numbers
      </h2>
      <ul className="lab-ac-grid">
        {STATS.map((stat) => (
          <li key={stat.label} className="lab-ac-stat">
            <strong data-final={finalText(stat)} className="lab-ac-value">
              {liveText(stat, progress)}
            </strong>
            <span className="lab-ac-label">{stat.label}</span>
          </li>
        ))}
      </ul>
      <p className="lab-ac-note">
        Example data: these figures are illustrative; the showcase tracks no real usage.
      </p>
      <style>{css}</style>
    </section>
  );
}

const css = `
  .lab-ac { width: min(960px, 100%); margin: 8px auto 56px; color: #F2EFE6; }
  .lab-ac-title { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 24px; }
  .lab-ac-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .lab-ac-stat {
    border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px;
    display: flex; flex-direction: column; gap: 8px; text-align: center;
  }
  .lab-ac-value { font-family: var(--serif); font-weight: 400; font-size: 44px; color: var(--sage); font-variant-numeric: tabular-nums; }
  .lab-ac-label {
    font-family: var(--sans); font-weight: 500; font-size: 12px; letter-spacing: 0.16em;
    text-transform: uppercase; color: #E8EEE9;
  }
  .lab-ac-note { margin: 24px 0 0; font-size: 14px; color: #E8EEE9; }
  @media (max-width: 760px) {
    .lab-ac-grid { grid-template-columns: 1fr; }
  }
`;
