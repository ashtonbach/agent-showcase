"use client";

import { useEffect, useRef, useState } from "react";

type Stat = { id: string; label: string; final: string };

const STATS: Stat[] = [
  { id: "projects", label: "Projects shipped", final: "128" },
  { id: "feedback", label: "Faster feedback", final: "92%" },
  { id: "rating", label: "Average rating", final: "4.8" },
];

function parseFinal(final: string) {
  const m = final.match(/^(\D*)([\d.]+)(\D*)$/);
  if (!m) return { prefix: "", target: 0, decimals: 0, suffix: final };
  const decimals = m[2].includes(".") ? m[2].split(".")[1].length : 0;
  return { prefix: m[1], target: parseFloat(m[2]), decimals, suffix: m[3] };
}

const ease = (t: number) => Math.max(0, 1 - Math.pow(1 - t, 3));
const prefersReduce = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function AnimatedCounter() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const valueRefs = useRef<Array<HTMLElement | null>>([]);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (prefersReduce()) {
      setStarted(true);
      return;
    }
    const section = sectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (prefersReduce()) {
      valueRefs.current.forEach((el, i) => el && (el.textContent = STATS[i].final));
      return;
    }
    const parsed = STATS.map((s) => parseFinal(s.final));
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 1200);
      const eased = ease(progress);
      parsed.forEach((p, i) => {
        const el = valueRefs.current[i];
        if (!el) return;
        el.textContent =
          progress >= 1
            ? STATS[i].final
            : `${p.prefix}${(p.target * eased).toFixed(p.decimals)}${p.suffix}`;
      });
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started]);

  return (
    <section
      ref={sectionRef}
      data-lab="animated-counter"
      aria-labelledby="animated-counter-heading"
      className="lab-animated-counter"
    >
      <h2 id="animated-counter-heading" className="lab-ac-title">
        Momentum, counted up
      </h2>
      <div className="lab-ac-card">
        <div className="lab-ac-grid">
          {STATS.map((stat, i) => (
            <div className="lab-ac-stat" key={stat.id}>
              <strong
                className="lab-ac-value"
                data-final={stat.final}
                ref={(el) => (valueRefs.current[i] = el)}
              >
                0
              </strong>
              <span className="lab-ac-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="lab-note">Example data: illustrative figures, not live metrics.</p>
      <style>{css}</style>
    </section>
  );
}

const css = `
.lab-animated-counter { width: min(720px, 100%); margin: 8px auto 56px; }
.lab-ac-title { font-family: var(--serif); font-weight: 400; font-size: 30px; color: var(--mist); margin-bottom: 20px; }
.lab-ac-card { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; background-color: #182720; }
.lab-ac-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; text-align: center; }
.lab-ac-stat { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.lab-ac-value { font-family: var(--serif); font-weight: 400; font-size: clamp(32px, 6vw, 44px); color: var(--sage); line-height: 1; }
.lab-ac-label { font-family: var(--sans); font-weight: 500; font-size: var(--fs-label); letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); }
.lab-note { margin-top: 16px; font-size: 14px; color: var(--muted); }
@media (max-width: 480px) { .lab-ac-grid { grid-template-columns: 1fr; gap: 24px; } }
`;
