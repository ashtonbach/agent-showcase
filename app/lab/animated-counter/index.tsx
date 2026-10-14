"use client";

import { useEffect, useRef, useState } from "react";

// FAO Global Forest Resources Assessment 2020
const STATS = [
  { final: "31%", label: "Land under forest" },
  { final: "4.06bn", label: "Hectares of forest" },
  { final: "4.7M", label: "Hectares lost a year" },
] as const;

const CSS = `
.lab-stats{width:min(960px,100%);margin:8px auto 56px}
.lab-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;list-style:none;margin:24px 0 0;padding:0}
.lab-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;text-align:center}
.lab-stats h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin:8px 0 0}
.lab-value{display:block;font-family:var(--serif);font-size:40px;font-weight:400;color:var(--mist);line-height:1.1}
.lab-caption{display:block;margin-top:8px;font-family:var(--sans);font-size:12px;font-weight:500;letter-spacing:0.16em;text-transform:uppercase;color:var(--sage)}
@media (max-width:640px){.lab-grid{grid-template-columns:1fr}}
`;

function useCount(final: string, play: boolean) {
  const [text, setText] = useState("0");
  useEffect(() => {
    if (!play) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(final);
      return;
    }
    const target = parseFloat(final) || 0;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1200);
      const eased = 1 - (1 - t) * (1 - t);
      if (t < 1) {
        setText(final.includes(".") ? (target * eased).toFixed(2) : String(Math.round(target * eased)));
        raf = requestAnimationFrame(tick);
      } else {
        setText(final);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [final, play]);
  return text;
}

function Stat({ final, label, play }: { final: string; label: string; play: boolean }) {
  const text = useCount(final, play);
  return (
    <li className="lab-card">
      <strong className="lab-value" data-final={final}>{text}</strong>
      <span className="lab-caption">{label}</span>
    </li>
  );
}

export default function AnimatedCounter() {
  const ref = useRef<HTMLElement>(null);
  const [play, setPlay] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setPlay(true);
        io.disconnect();
      }
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className="lab-stats" data-lab="animated-counter" aria-labelledby="lab-forest-title">
      <style>{CSS}</style>
      <p className="label">Forest facts</p>
      <h2 id="lab-forest-title">Forests, in three numbers</h2>
      <ul className="lab-grid">
        {STATS.map((s) => (
          <Stat key={s.final} final={s.final} label={s.label} play={play} />
        ))}
      </ul>
    </section>
  );
}
