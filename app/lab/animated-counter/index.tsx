"use client";
import { useEffect, useRef, useState } from "react";

const FINALS = ["240", "18", "99%"];
const LABELS = ["Projects delivered", "Core contributors", "Renewal rate"];

function parseFinal(text: string) {
  const m = text.match(/^(\d+(?:\.\d+)?)(.*)$/);
  return m ? { num: parseFloat(m[1]), suffix: m[2] } : { num: 0, suffix: text };
}

function formatPartial(num: number, suffix: string, done: boolean, final: string) {
  if (done) return final;
  const n = Number.isInteger(num) ? String(Math.round(num)) : num.toFixed(1);
  return n + suffix;
}

export default function AnimatedCounter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState(["0", "0", "0"]);
  const ran = useRef(false);

  useEffect(() => {
    const showFinal = () => setDisplay([...FINALS]);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      showFinal();
      return;
    }
    const root = sectionRef.current;
    if (!root) return;
    const targets = FINALS.map(parseFinal);
    const start = () => {
      if (ran.current) return;
      ran.current = true;
      const t0 = performance.now();
      const dur = 1200;
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - (1 - p) ** 3;
        setDisplay(
          targets.map((t, i) =>
            formatPartial(t.num * eased, t.suffix, p >= 1, FINALS[i])
          )
        );
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start();
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-lab="animated-counter"
      aria-labelledby="ac-heading"
    >
      <style>{`
.lab-ac { width: min(960px, 100%); margin: 8px auto 56px; padding: 24px; border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; box-sizing: border-box; }
.lab-ac h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.15; color: var(--mist); margin: 0 0 24px; }
.lab-ac-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; text-align: center; }
.lab-ac strong { display: block; font-family: var(--serif); font-size: clamp(2rem, 6vw, 2.75rem); font-weight: 400; color: var(--mist); line-height: 1.1; }
.lab-ac-label { display: block; margin-top: 8px; font-family: var(--sans); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: var(--sage); }
.lab-ac-note { margin: 24px 0 0; font-size: 0.9rem; color: var(--mist); opacity: 0.85; }
@media (max-width: 520px) { .lab-ac-grid { grid-template-columns: 1fr; gap: 16px; } }
`}</style>
      <h2 id="ac-heading">Impact in numbers</h2>
      <div className="lab-ac-grid">
        {FINALS.map((final, i) => (
          <div key={final} className="lab-ac-stat">
            <strong data-final={final}>{display[i]}</strong>
            <span className="lab-ac-label">{LABELS[i]}</span>
          </div>
        ))}
      </div>
      <p className="lab-ac-note">Example data: illustrative studio metrics.</p>
    </section>
  );
}
