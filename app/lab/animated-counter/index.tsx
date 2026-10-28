"use client";
import { useEffect, useRef, useState } from "react";

// Example data: illustrative figures, not reported metrics.
const STATS = [
  { final: "128", label: "Features shipped" },
  { final: "97%", label: "Build success rate" },
  { final: "42", label: "Cities represented" },
];
const PARTS = STATS.map(({ final }) => {
  const m = final.match(/^(\d+(?:\.\d+)?)(.*)$/);
  return m ? { amount: parseFloat(m[1]), suffix: m[2] } : { amount: 0, suffix: final };
});
const css = `
.lab-counter-section { width: min(960px, 100%); margin: 8px auto 56px; color: #E8EEE9; }
.lab-counter-title { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 20px; color: #F2EFE6; }
.lab-counter-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.lab-counter-card { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; text-align: center; }
.lab-counter-value { display: block; font-family: var(--serif); font-size: 40px; color: var(--sage); line-height: 1.1; }
.lab-counter-label { display: block; margin-top: 10px; font-family: var(--sans); font-weight: 500; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; }
.lab-note { margin: 20px 0 0; font-size: 14px; color: rgba(232, 238, 233, 0.78); }
@media (max-width: 480px) { .lab-counter-grid { grid-template-columns: 1fr; } }
`;
export default function AnimatedCounter() {
  const ref = useRef<HTMLElement | null>(null);
  const [display, setDisplay] = useState<string[]>(() => STATS.map(() => "0"));
  const started = useRef(false);

  useEffect(() => {
    const section = ref.current;
    if (!section || started.current) return;
    const finish = () => { started.current = true; setDisplay(STATS.map((s) => s.final)); };
    const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { finish(); return; }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / 1200);
          if (progress >= 1) { finish(); return; }
          setDisplay(PARTS.map((p) => `${Math.round(p.amount * progress)}${p.suffix}`));
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.3 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section data-lab="animated-counter" aria-labelledby="animated-counter-title" className="lab-counter-section" ref={ref}>
      <style>{css}</style>
      <h2 id="animated-counter-title" className="lab-counter-title">By the numbers</h2>
      <div className="lab-counter-grid">
        {STATS.map((stat, i) => (
          <div className="lab-counter-card" key={stat.label}>
            <strong className="lab-counter-value" data-final={stat.final}>{display[i]}</strong>
            <span className="lab-counter-label">{stat.label}</span>
          </div>
        ))}
      </div>
      <p className="lab-note">Example data: figures are illustrative, not reported metrics.</p>
    </section>
  );
}
