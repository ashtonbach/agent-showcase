"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { final: "12", label: "Years in practice" },
  { final: "340", label: "Projects delivered" },
  { final: "98%", label: "Client retention" },
];

function parseFinal(text: string) {
  const m = text.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return { value: 0, suffix: text, decimals: 0 };
  const core = m[1];
  const decimals = core.includes(".") ? core.split(".")[1].length : 0;
  return { value: parseFloat(core), suffix: m[2], decimals };
}

function formatProgress(value: number, decimals: number, suffix: string) {
  const n = decimals ? value.toFixed(decimals) : String(Math.round(value));
  return `${n}${suffix}`;
}

const css = `
.lab-ac { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist); }
.lab-ac h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.15; margin: 10px 0 24px; color: var(--mist); }
.lab-ac-card { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; }
.lab-ac-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; text-align: center; }
.lab-ac-grid strong { display: block; font-family: var(--serif); font-size: 2.25rem; font-weight: 400; line-height: 1.1; color: var(--mist); margin-bottom: 8px; }
.lab-ac-label { font-family: var(--sans); font-size: 0.7rem; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: var(--sage); }
.lab-ac-note { margin: 20px 0 0; font-size: 0.9rem; color: rgba(232, 238, 233, 0.75); }
@media (max-width: 520px) { .lab-ac-grid { grid-template-columns: 1fr; gap: 16px; } }
`;

export default function AnimatedCounter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState<string[]>(() => STATS.map(() => "0"));
  const ranRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(STATS.map((s) => s.final));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || ranRef.current) return;
        ranRef.current = true;
        const parsed = STATS.map((s) => parseFinal(s.final));
        const start = performance.now();
        const duration = 1200;

        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - (1 - t) ** 3;
          setDisplay(
            parsed.map((p) => formatProgress(p.value * eased, p.decimals, p.suffix))
          );
          if (t < 1) requestAnimationFrame(tick);
          else setDisplay(STATS.map((s) => s.final));
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-lab="animated-counter"
      aria-labelledby="lab-ac-title"
      className="lab-ac"
    >
      <h2 id="lab-ac-title">Impact at a glance</h2>
      <div className="lab-ac-card">
        <div className="lab-ac-grid">
          {STATS.map((stat, i) => (
            <div key={stat.label}>
              <strong data-final={stat.final}>{display[i]}</strong>
              <span className="lab-ac-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="lab-ac-note">Example data: figures shown are illustrative for this demo.</p>
      <style>{css}</style>
    </section>
  );
}
