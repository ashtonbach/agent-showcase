"use client";
import { useEffect, useRef, useState } from "react";

// Example showcase stats (not live figures).
const STATS = [
  { final: "1,200", label: "Trail miles", parse: () => 1200, render: (n: number) =>
    Math.round(n).toLocaleString("en-US") },
  { final: "48", label: "Native species", parse: () => 48, render: (n: number) => String(Math.round(n)) },
  { final: "94%", label: "Canopy cover", parse: () => 94, render: (n: number) => `${Math.round(n)}%` },
];

const DURATION = 1200;

export default function AnimatedCounter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(["0", "0", "0%"]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const runFinal = () => setShown(STATS.map((s) => s.final));

    const runAnimate = () => {
      const start = performance.now();
      let frame = 0;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION);
        const ease = 1 - (1 - t) ** 3;
        if (t >= 1) {
          runFinal();
          return;
        }
        setShown(STATS.map((s) => s.render(s.parse() * ease)));
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frame);
    };

    let cancelAnim: (() => void) | undefined;
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        obs.disconnect();
        if (reduced) runFinal();
        else cancelAnim = runAnimate();
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnim?.();
    };
  }, []);

  const css = `
    [data-lab="animated-counter"] {
      width: min(720px, 100%);
      margin: 8px auto 56px;
      color: var(--mist, #E8EEE9);
    }
    [data-lab="animated-counter"] .lab-card {
      border: 1px solid rgba(176, 203, 188, 0.28);
      border-radius: 16px;
      padding: 24px;
    }
    [data-lab="animated-counter"] .lab-stats {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 20px;
      text-align: center;
    }
    [data-lab="animated-counter"] .lab-stat strong {
      display: block;
      font-family: var(--serif);
      font-size: clamp(1.75rem, 5vw, 2.25rem);
      font-weight: 400;
      color: var(--sage, #B0CBBC);
      line-height: 1.1;
    }
    [data-lab="animated-counter"] .lab-stat-label {
      display: block;
      margin-top: 8px;
      font-family: var(--sans);
      font-size: 0.72rem;
      font-weight: 500;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #F2EFE6;
    }
    [data-lab="animated-counter"] .lab-note {
      margin: 20px 0 0;
      font-size: 0.9rem;
      color: rgba(232, 238, 233, 0.75);
    }
    @media (max-width: 520px) {
      [data-lab="animated-counter"] .lab-stats {
        grid-template-columns: 1fr;
        gap: 28px;
      }
    }
  `;

  return (
    <section
      ref={sectionRef}
      data-lab="animated-counter"
      aria-labelledby="animated-counter-heading"
    >
      <style>{css}</style>
      <h2 id="animated-counter-heading">Forest by the numbers</h2>
      <div className="lab-card">
        <div className="lab-stats">
          {STATS.map((s, i) => (
            <div className="lab-stat" key={s.label}>
              <strong data-final={s.final}>{shown[i]}</strong>
              <span className="lab-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="lab-note">Example data: illustrative figures for the showcase demo.</p>
    </section>
  );
}
