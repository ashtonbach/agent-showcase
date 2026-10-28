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
const fmt = (v: number, s: string) => `${v}${s}`;

const css = `
.lab-counter-section { width: min(960px, 100%); margin: 8px auto 56px; }
.lab-counter-title { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 20px; color: var(--mist); }
.lab-counter-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.lab-counter-card { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; text-align: center; }
.lab-counter-value { display: block; font-family: var(--serif); font-size: 40px; color: var(--sage); }
.lab-counter-label { display: block; margin-top: 8px; font-family: var(--sans); font-weight: 500; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--mist); }
.lab-note { margin: 20px 0 0; color: var(--mist); font-family: var(--sans); font-size: 14px; }
@media (max-width: 640px) { .lab-counter-grid { grid-template-columns: 1fr; } }
`;

export default function AnimatedCounter() {
  const ref = useRef<HTMLElement | null>(null);
  const started = useRef(false);
  const [counts, setCounts] = useState<number[]>(() => STATS.map(() => 0));

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    function start() {
      if (started.current) return;
      started.current = true;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        setCounts(STATS.map((s) => s.final));
        return;
      }
      const t0 = performance.now();
      function tick(now: number) {
        const p = Math.min((now - t0) / DURATION_MS, 1);
        setCounts(STATS.map((s) => Math.round(s.final * p)));
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            start();
            io.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section data-lab="animated-counter" aria-labelledby="lab-counter-heading" className="lab-counter-section" ref={ref}>
      <h2 id="lab-counter-heading" className="lab-counter-title">By the numbers</h2>
      <div className="lab-counter-grid">
        {STATS.map((s, i) => (
          <div key={s.id} className="lab-counter-card">
            <strong className="lab-counter-value" data-final={fmt(s.final, s.suffix)}>
              {fmt(counts[i], s.suffix)}
            </strong>
            <span className="lab-counter-label">{s.label}</span>
          </div>
        ))}
      </div>
      <p className="lab-note">Example data: illustrative counts shown for demonstration.</p>
      <style>{css}</style>
    </section>
  );
}
