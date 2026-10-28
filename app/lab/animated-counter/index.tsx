"use client";

import { useEffect, useRef, useState } from "react";

// Example data: illustrative counts, not pulled from a live metrics source.
type Stat = { id: string; label: string; final: number; suffix: string };

const STATS: Stat[] = [
  { id: "builds", label: "Lab builds shipped", final: 128, suffix: "" },
  { id: "checks", label: "Automated gate checks", final: 42, suffix: "" },
  { id: "uptime", label: "Preview uptime", final: 99, suffix: "%" },
];

const DURATION_MS = 1200;

function formatValue(value: number, suffix: string) {
  return `${value}${suffix}`;
}

const css = `
.lab-counter-section { width: min(960px, 100%); margin: 8px auto 56px; }
.lab-counter-title { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 20px; color: var(--mist); }
.lab-counter-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.lab-counter-card { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; text-align: center; }
.lab-counter-value { display: block; font-family: var(--serif); font-weight: 400; font-size: 40px; color: var(--sage); }
.lab-counter-label { display: block; margin-top: 8px; font-family: var(--sans); font-weight: 500; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--mist); }
.lab-note { margin: 20px 0 0; color: var(--mist); font-family: var(--sans); font-size: 14px; line-height: 1.6; }
@media (max-width: 640px) { .lab-counter-grid { grid-template-columns: 1fr; } .lab-counter-card { padding: 18px; } }
`;

export default function AnimatedCounter() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const startedRef = useRef(false);
  const [counts, setCounts] = useState<number[]>(() => STATS.map(() => 0));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function startCountUp() {
      if (startedRef.current) return;
      startedRef.current = true;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) {
        setCounts(STATS.map((stat) => stat.final));
        return;
      }

      const start = performance.now();
      function tick(now: number) {
        const progress = Math.min((now - start) / DURATION_MS, 1);
        setCounts(STATS.map((stat) => Math.round(stat.final * progress)));
        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      }
      requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            startCountUp();
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
      aria-labelledby="lab-counter-heading"
      className="lab-counter-section"
      ref={sectionRef}
    >
      <h2 id="lab-counter-heading" className="lab-counter-title">
        By the numbers
      </h2>
      <div className="lab-counter-grid">
        {STATS.map((stat, index) => (
          <div key={stat.id} className="lab-counter-card">
            <strong
              className="lab-counter-value"
              data-final={formatValue(stat.final, stat.suffix)}
            >
              {formatValue(counts[index], stat.suffix)}
            </strong>
            <span className="lab-counter-label">{stat.label}</span>
          </div>
        ))}
      </div>
      <p className="lab-note">
        Example data: illustrative counts shown for demonstration.
      </p>
      <style>{css}</style>
    </section>
  );
}
