"use client";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { label: "Community plantings", final: "847" },
  { label: "Seedlings placed", final: "12.4K" },
  { label: "Volunteer hours", final: "3,200" },
];

function parseFinal(final: string) {
  const m = final.match(/^([\d,]+(?:\.\d+)?)(.*)$/);
  if (!m) return { num: 0, suffix: final, decimals: 0 };
  const raw = m[1].replace(/,/g, "");
  const decimals = (raw.split(".")[1] || "").length;
  return { num: parseFloat(raw), suffix: m[2], decimals };
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function formatMid(num: number, decimals: number, suffix: string) {
  const n =
    decimals > 0 ? num.toFixed(decimals) : String(Math.round(num));
  return n + suffix;
}

export default function Lab() {
  const rootRef = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState<string[]>(() =>
    STATS.map(() => "0")
  );
  const ranRef = useRef(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const run = () => {
      if (ranRef.current) return;
      ranRef.current = true;
      if (reduced) {
        setDisplay(STATS.map((s) => s.final));
        return;
      }
      const parsed = STATS.map((s) => parseFinal(s.final));
      const start = performance.now();
      const duration = 1200;
      let frame = 0;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const e = easeOutCubic(t);
        if (t >= 1) {
          setDisplay(STATS.map((s) => s.final));
          return;
        }
        setDisplay(
          parsed.map((p, i) =>
            formatMid(p.num * e, p.decimals, p.suffix)
          )
        );
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frame);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((x) => x.isIntersecting)) run();
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const css = `
.lab-wrap{max-width:min(720px,100%);margin:8px auto 56px;padding:0 16px;box-sizing:border-box}
.lab-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;background:rgba(18,26,22,0.45)}
.lab-title{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;color:var(--mist,#F2EFE6);margin:0 0 20px}
.lab-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;text-align:center}
@media(max-width:520px){.lab-stats{grid-template-columns:1fr;gap:20px}}
.lab-val{display:block;font-family:var(--serif);font-size:clamp(28px,6vw,40px);font-weight:400;color:var(--sage);line-height:1.1;margin-bottom:8px}
.lab-label{font-family:var(--sans);font-size:11px;font-weight:500;letter-spacing:0.16em;text-transform:uppercase;color:#E8EEE9;opacity:0.85}
.lab-note{margin:16px 0 0;font-size:14px;color:#E8EEE9;opacity:0.75;line-height:1.5}
`;

  return (
    <section
      ref={rootRef}
      data-lab="animated-counter"
      aria-labelledby="ac-heading"
      className="lab-wrap"
    >
      <style>{css}</style>
      <h2 id="ac-heading" className="lab-title">Impact at a glance</h2>
      <div className="lab-card">
        <div className="lab-stats">
          {STATS.map((s, i) => (
            <div key={s.label}>
              <strong
                className="lab-val"
                data-final={s.final}
              >
                {display[i]}
              </strong>
              <span className="lab-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="lab-note">Example data: figures shown for demonstration only.</p>
    </section>
  );
}
