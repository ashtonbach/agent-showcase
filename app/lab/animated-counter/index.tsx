"use client";

import { useEffect, useRef, useState } from "react";

type Stat = { id: string; label: string; target: number; final: string; format: (n: number) => string };

function withCommas(n: number): string {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const STATS: Stat[] = [
  { id: "checks", label: "Preview checks run", target: 12400, final: "12,400", format: withCommas },
  { id: "features", label: "Features shipped", target: 48, final: "48", format: (n) => String(Math.round(n)) },
  { id: "gate", label: "Gate pass rate", target: 99.2, final: "99.2%", format: (n) => `${n.toFixed(1)}%` },
];

const css = `
.lab-ac-section { width: min(720px, 100%); margin: 8px auto 56px; }
.lab-ac-title { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 20px; color: var(--mist); }
.lab-ac-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.lab-ac-card { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; display: flex; flex-direction: column; gap: 8px; }
.lab-ac-value { font-family: var(--serif); font-weight: 400; font-size: 32px; color: var(--sage); }
.lab-ac-label { font-family: var(--sans); font-weight: 500; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--mist); }
.lab-ac-note { margin: 16px 0 0; color: var(--muted); font-size: 14px; }
@media (max-width: 420px) { .lab-ac-grid { grid-template-columns: 1fr; } .lab-ac-card { padding: 18px; } }
`;

export default function AnimatedCounter() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const startedRef = useRef(false);
  const [values, setValues] = useState<number[]>(() => STATS.map(() => 0));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValues(STATS.map((stat) => stat.target));
      return;
    }

    function animate() {
      if (startedRef.current) return;
      startedRef.current = true;
      const start = performance.now();
      const duration = 1200;
      function tick(now: number) {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        if (progress < 1) {
          setValues(STATS.map((stat) => stat.target * eased));
          requestAnimationFrame(tick);
        } else {
          setValues(STATS.map((stat) => stat.target));
        }
      }
      requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) animate();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      data-lab="animated-counter"
      aria-labelledby="lab-animated-counter-heading"
      ref={sectionRef}
      className="lab-ac-section"
    >
      <h2 id="lab-animated-counter-heading" className="lab-ac-title">
        Showcase run numbers
      </h2>
      <div className="lab-ac-grid">
        {STATS.map((stat, i) => (
          <div key={stat.id} className="lab-ac-card">
            <strong data-final={stat.final} className="lab-ac-value">
              {stat.format(values[i])}
            </strong>
            <span className="lab-ac-label">{stat.label}</span>
          </div>
        ))}
      </div>
      <p className="lab-ac-note">Example data: run totals and rates shown here are illustrative, not live figures.</p>
      <style>{css}</style>
    </section>
  );
}
