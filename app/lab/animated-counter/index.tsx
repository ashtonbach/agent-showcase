"use client";

import { useEffect, useRef, useState } from "react";

/* Demo figures only — not live metrics. */
const STATS = [
  { label: "Daily readers", final: "1,280", n: 1280 },
  { label: "Open rate", final: "42%", n: 42 },
  { label: "Avg. minutes", final: "6.4", n: 6.4 },
];

const css = `
.lab-stats{width:min(960px,100%);margin:8px auto 56px;box-sizing:border-box;padding:0 16px}
.lab-stats h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin:0 0 24px}
.lab-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.lab-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;text-align:center}
.lab-card strong{display:block;font-family:var(--serif);font-size:36px;font-weight:400;color:#F2EFE6}
.lab-card span{display:block;margin-top:8px;font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:12px;color:var(--sage)}
.lab-note{margin:20px 0 0;color:#E8EEE9;font-size:14px}
@media(max-width:640px){.lab-grid{grid-template-columns:1fr}}
`;

function format(n: number, final: string) {
  if (final.includes("%")) return `${Math.round(n)}%`;
  if (final.includes(".")) return n.toFixed(1);
  return Math.round(n).toLocaleString("en-US");
}

function Stat({ label, final, n, on }: { label: string; final: string; n: number; on: boolean }) {
  const [text, setText] = useState("0");
  useEffect(() => {
    if (!on) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(final);
      return;
    }
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 1200);
      const eased = 1 - (1 - p) ** 3;
      if (p < 1) {
        setText(format(n * eased, final));
        raf = requestAnimationFrame(tick);
      } else setText(final);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on, n, final]);
  return (
    <div className="lab-card">
      <strong data-final={final}>{text}</strong>
      <span>{label}</span>
    </div>
  );
}

export default function Lab() {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setOn(true);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} data-lab="animated-counter" aria-labelledby="lab-ac-title" className="lab-stats">
      <style>{css}</style>
      <h2 id="lab-ac-title">Growth at a glance</h2>
      <div className="lab-grid">
        {STATS.map((s) => (
          <Stat key={s.final} {...s} on={on} />
        ))}
      </div>
      <p className="lab-note">Example data: figures are sample values for this demo.</p>
    </section>
  );
}
