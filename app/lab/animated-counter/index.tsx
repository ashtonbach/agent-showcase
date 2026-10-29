"use client";

import { useEffect, useRef, useState } from "react";

type Stat = { id: string; label: string; target: number; suffix: string };

// Example data: illustrative figures for this demo feature, not a live source.
const STATS: Stat[] = [
  { id: "runs", label: "Showcase runs this quarter", target: 1204, suffix: "" },
  { id: "checks", label: "Gate checks passed", target: 97, suffix: "%" },
  { id: "agents", label: "Agents per run", target: 4, suffix: "" },
];

const DURATION_MS = 1200;

function withCommas(value: number): string {
  const sign = value < 0 ? "-" : "";
  const digits = Math.abs(value).toString();
  return sign + digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function finalText(stat: Stat): string {
  return withCommas(stat.target) + stat.suffix;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

const css = `
.lab-counter-section { width: min(960px, 100%); margin: 8px auto 56px; }
.lab-counter-title { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 24px; color: var(--mist); }
.lab-counter-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.lab-counter-card { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; text-align: center; }
.lab-counter-value { display: block; font-family: var(--serif); font-weight: 400; font-size: 40px; line-height: 1.1; color: var(--sage); }
.lab-counter-label { display: block; margin-top: 8px; font-family: var(--sans); font-weight: 500; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); }
.lab-counter-note { margin: 20px 0 0; color: var(--muted); font-family: var(--sans); font-size: 14px; }
@media (max-width: 640px) { .lab-counter-grid { grid-template-columns: 1fr; gap: 12px; } .lab-counter-value { font-size: 34px; } }
`;

export default function AnimatedCounter() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [displayed, setDisplayed] = useState<string[]>(() => STATS.map(() => "0"));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const showFinal = () => setDisplayed(STATS.map(finalText));

    const prefersReduced =
      typeof window !== "undefined" &&
      "matchMedia" in window &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      showFinal();
      return;
    }

    const runCountUp = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const t = Math.min(1, elapsed / DURATION_MS);
        if (t >= 1) {
          showFinal();
          return;
        }
        const eased = easeOutCubic(t);
        setDisplayed(
          STATS.map((stat) => withCommas(Math.round(stat.target * eased)) + stat.suffix)
        );
        frameRef.current = requestAnimationFrame(tick);
      };
      frameRef.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          runCountUp();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-lab="animated-counter"
      aria-labelledby="lab-counter-heading"
      className="lab-counter-section"
    >
      <h2 id="lab-counter-heading" className="lab-counter-title">
        Showcase by the numbers
      </h2>
      <div className="lab-counter-grid">
        {STATS.map((stat, index) => (
          <div key={stat.id} className="lab-counter-card">
            <strong data-final={finalText(stat)} className="lab-counter-value">
              {displayed[index]}
            </strong>
            <span className="lab-counter-label">{stat.label}</span>
          </div>
        ))}
      </div>
      <p className="lab-counter-note">Example data: illustrative figures for this demo.</p>
      <style>{css}</style>
    </section>
  );
}
