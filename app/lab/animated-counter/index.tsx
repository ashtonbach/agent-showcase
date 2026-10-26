"use client";

import { useEffect, useRef } from "react";

type Stat = { id: string; final: string; label: string };

// Example data: illustrative figures, not measured in production.
const STATS: Stat[] = [
  { id: "downloads", final: "12,400", label: "Downloads" },
  { id: "satisfaction", final: "98%", label: "Satisfaction" },
  { id: "speed", final: "3.2x", label: "Faster workflows" },
];

function parseFinal(final: string) {
  const match = final.match(/^([\d,]+(?:\.\d+)?)/);
  const numberPart = match ? match[1] : "0";
  const suffix = final.slice(numberPart.length);
  const useCommas = numberPart.includes(",");
  const clean = numberPart.replace(/,/g, "");
  const dot = clean.indexOf(".");
  const decimals = dot === -1 ? 0 : clean.length - dot - 1;
  const value = parseFloat(clean);
  return { value, decimals, suffix, useCommas };
}

function formatValue(value: number, decimals: number, useCommas: boolean) {
  const fixed = value.toFixed(decimals);
  if (!useCommas) return fixed;
  const [intPart, decPart] = fixed.split(".");
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decPart ? `${withCommas}.${decPart}` : withCommas;
}

export default function AnimatedCounter() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const valueRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const setFinal = () => {
      valueRefs.current.forEach((el, i) => {
        if (el) el.textContent = STATS[i].final;
      });
    };

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setFinal();
      return;
    }

    const duration = 1200;
    const parsed = STATS.map((s) => parseFinal(s.final));
    let frame = 0;

    const tick = (startTime: number, now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      valueRefs.current.forEach((el, i) => {
        if (!el) return;
        if (t >= 1) {
          el.textContent = STATS[i].final;
        } else {
          const p = parsed[i];
          el.textContent = formatValue(p.value * eased, p.decimals, p.useCommas) + p.suffix;
        }
      });
      if (t < 1) {
        frame = requestAnimationFrame((n) => tick(startTime, n));
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect();
            frame = requestAnimationFrame((n) => tick(n, n));
          }
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-lab="animated-counter"
      aria-labelledby="animated-counter-heading"
      className="lab-ac"
    >
      <style>{css}</style>
      <h2 id="animated-counter-heading" className="lab-ac-title">
        Counting what matters
      </h2>
      <div className="lab-ac-grid">
        {STATS.map((stat, i) => (
          <div className="lab-ac-card" key={stat.id}>
            <strong
              className="lab-ac-value"
              data-final={stat.final}
              ref={(el) => {
                valueRefs.current[i] = el;
              }}
            >
              0
            </strong>
            <span className="lab-ac-label">{stat.label}</span>
          </div>
        ))}
      </div>
      <p className="lab-ac-note">
        Example data: downloads, satisfaction and workflow speed are illustrative, not measured.
      </p>
    </section>
  );
}

const css = `
.lab-ac { width: min(720px,100%); margin: 8px auto 56px; }
.lab-ac-title { color: var(--mist); }
.lab-ac-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 8px;
}
.lab-ac-card {
  border: 1px solid rgba(176,203,188,0.28);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
}
.lab-ac-value {
  font-family: var(--serif);
  font-weight: 400;
  font-size: 34px;
  color: var(--sage);
  line-height: 1.1;
}
.lab-ac-label {
  font-family: var(--sans);
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--mist);
}
.lab-ac-note {
  margin-top: 16px;
  color: var(--mist);
  opacity: 0.75;
  font-family: var(--sans);
  font-size: 14px;
}
@media (max-width: 480px) {
  .lab-ac-grid { grid-template-columns: 1fr; }
}
`;
