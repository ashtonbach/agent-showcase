"use client";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { final: "24", label: "Active projects" },
  { final: "150", label: "Commits shipped" },
  { final: "99%", label: "Client satisfaction" },
];

function parseFinal(text: string) {
  const m = text.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return { num: 0, suffix: text };
  return { num: parseFloat(m[1]), suffix: m[2] };
}

function formatProgress(n: number, suffix: string) {
  const whole = suffix === "%" || !String(n).includes(".");
  const v = whole ? Math.round(n) : Math.round(n * 10) / 10;
  return `${v}${suffix}`;
}

export default function AnimatedCounter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [values, setValues] = useState(() => STATS.map((s) => formatProgress(0, parseFinal(s.final).suffix)));

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValues(STATS.map((s) => s.final));
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const start = performance.now();
        const parsed = STATS.map((s) => parseFinal(s.final));
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1200);
          const eased = 1 - (1 - t) ** 3;
          setValues(parsed.map((p, i) => (t >= 1 ? STATS[i].final : formatProgress(p.num * eased, p.suffix))));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} data-lab="animated-counter" aria-labelledby="lab-ac-title" className="lab-wrap">
      <style>{`
        .lab-wrap { width: min(720px, 100%); margin: 8px auto 56px; padding: 0 16px; box-sizing: border-box; }
        .lab-card { border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; background: rgba(18,26,22,0.35); }
        .lab-stats { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        @media (max-width: 520px) { .lab-stats { grid-template-columns: 1fr; } }
        .lab-stat { text-align: center; }
        .lab-stat strong { display: block; font-family: var(--serif); font-weight: 400; font-size: 2.25rem; line-height: 1.1; color: var(--mist); font-variant-numeric: tabular-nums; }
        .lab-stat-label { display: block; margin-top: 8px; font-family: var(--sans); font-weight: 500; font-size: 0.72rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--sage); }
        .lab-note { margin: 20px 0 0; font-size: 0.9rem; color: var(--mist); opacity: 0.85; }
      `}</style>
      <h2 id="lab-ac-title">By the numbers</h2>
      <div className="lab-card">
        <ul className="lab-stats">
          {STATS.map((s, i) => (
            <li key={s.label} className="lab-stat">
              <strong data-final={s.final}>{values[i]}</strong>
              <span className="lab-stat-label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="lab-note">Example data: illustrative metrics for this demo section.</p>
    </section>
  );
}
