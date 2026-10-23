"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { final: "2,400", label: "Acres protected", note: "US Forest Service, 2024 stewardship report" },
  { final: "186", label: "Volunteer hours", note: "Trail maintenance season total" },
  { final: "12", label: "Restored sites", note: "Habitat recovery milestones" },
];

function parseNumber(text: string): { prefix: string; num: number; suffix: string; decimals: number } {
  const m = text.match(/^([^0-9]*)([0-9][0-9,]*(?:\.[0-9]+)?)(.*)$/);
  if (!m) return { prefix: "", num: 0, suffix: text, decimals: 0 };
  const raw = m[2].replace(/,/g, "");
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  return { prefix: m[1], num: parseFloat(raw), suffix: m[3], decimals };
}

function formatValue(n: number, decimals: number, useCommas: boolean): string {
  if (decimals > 0) return n.toFixed(decimals);
  const v = Math.round(n);
  return useCommas ? v.toLocaleString("en-US") : String(v);
}

const css = `
.lab-wrap { width: min(720px, 100%); margin: 8px auto 56px; padding: 0 16px; box-sizing: border-box; }
.lab-card {
  border: 1px solid rgba(176, 203, 188, 0.28);
  border-radius: 16px;
  padding: 24px;
  background: rgba(18, 26, 22, 0.35);
}
.lab-wrap h2 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: 30px;
  line-height: 1.2;
  color: var(--mist, #f2efe6);
  margin: 0 0 20px;
}
.lab-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
@media (max-width: 520px) {
  .lab-grid { grid-template-columns: 1fr; }
}
.lab-stat { text-align: center; }
.lab-stat strong {
  display: block;
  font-family: var(--serif);
  font-size: 36px;
  font-weight: 400;
  color: var(--sage, #b0cbbc);
  line-height: 1.1;
}
.lab-stat span {
  display: block;
  margin-top: 8px;
  font-family: var(--sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #e8eee9;
}
.lab-note {
  margin: 20px 0 0;
  font-size: 14px;
  color: #e8eee9;
  opacity: 0.85;
}
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

    const finals = STATS.map((s) => {
      const p = parseNumber(s.final);
      const useCommas = s.final.includes(",");
      return { ...p, useCommas, text: s.final };
    });

    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || ranRef.current) return;
        ranRef.current = true;
        const start = performance.now();
        const duration = 1200;

        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - (1 - t) ** 3;
          setDisplay(
            finals.map((f) => {
              if (t >= 1) return f.text;
              const n = f.num * eased;
              return f.prefix + formatValue(n, f.decimals, f.useCommas) + f.suffix;
            })
          );
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} data-lab="animated-counter" aria-labelledby="lab-animated-counter-title">
      <style>{css}</style>
      <div className="lab-wrap">
        <div className="lab-card">
          <h2 id="lab-animated-counter-title">Impact at a glance</h2>
          <div className="lab-grid">
            {STATS.map((s, i) => (
              <div className="lab-stat" key={s.label}>
                <strong data-final={s.final}>{display[i]}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <p className="lab-note">Example data: figures illustrate typical stewardship outcomes.</p>
        </div>
      </div>
    </section>
  );
}
