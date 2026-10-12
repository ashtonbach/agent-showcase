"use client";
import { useEffect, useRef, useState } from "react";

// Real, verifiable numbers only (see scripts/v2/README.md, "Feature content"):
// 4 = AI agents on the showcase team (Naomi, Jonah, Priya, Felix; Naomi joins design-led runs); 20 = Shipped rows in the agents-live
// Demo history as of Oct 11, 2026; 24 = check-feature.js checks for this feature (12 at each of 1280 and 390 px).
const STATS = [
  { label: "AI agents on the team", value: 4 },
  { label: "Runs shipped by Oct 11", value: 20 },
  { label: "Checks per run", value: 24 },
];
const css = `
.lab-counter { width: min(960px, 100%); margin: 8px auto 56px; }
.lab-counter h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.2; margin: 6px 0 20px; }
.lab-counter ul { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; list-style: none; }
.lab-counter li { padding: 24px; border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; text-align: center; }
.lab-counter strong { display: block; font-family: var(--serif); font-weight: 500; font-size: 52px; line-height: 1.1; font-variant-numeric: tabular-nums; }
@media (max-width: 640px) { .lab-counter ul { grid-template-columns: 1fr; } }
`;

export default function AnimatedCounter() {
  const ref = useRef<HTMLElement>(null);
  const [n, setN] = useState(STATS.map(() => 0));
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const done = () => setN(STATS.map((s) => s.value));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return done();
    let raf = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1200);
        setN(STATS.map((s) => Math.round(s.value * p)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <section ref={ref} data-lab="animated-counter" className="lab-counter" aria-labelledby="lab-counter-title">
      <style>{css}</style>
      <p className="label">By the numbers</p>
      <h2 id="lab-counter-title">The team so far</h2>
      <ul>
        {STATS.map((s, i) => (
          <li key={s.label}>
            <strong data-final={s.value}>{n[i]}</strong>
            <span className="label">{s.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
