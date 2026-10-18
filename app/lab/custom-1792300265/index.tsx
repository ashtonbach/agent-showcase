"use client";

import { useEffect, useRef, useState } from "react";

const BANNER_VARIANTS = [
  { icon: "🎄", label: "Evergreen" },
  { icon: "⭐", label: "Starlight" },
  { icon: "🎁", label: "Gift wrap" },
  { icon: "❄️", label: "Snowfall" },
];

const STATS = [
  { label: "Projects shipped", value: 128 },
  { label: "Happy clients", value: 42 },
  { label: "Cups of coffee", value: 903 },
];

const css = `
.lab-xmas-banner {
  position: fixed;
  top: var(--header-h);
  left: 0;
  right: 0;
  z-index: 19;
  max-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 10px 20px;
  box-sizing: border-box;
  background: linear-gradient(90deg, #8b1a1a 0%, #1a5c34 50%, #b8860b 100%);
  border-bottom: 2px solid rgba(242, 239, 230, 0.25);
  color: #f2efe6;
  font-family: var(--sans);
  font-size: clamp(13px, 2.8vw, 16px);
  font-weight: 500;
  text-align: center;
  line-height: 1.35;
}
.lab-xmas-banner .lab-xmas-graphic {
  font-size: clamp(28px, 6vw, 40px);
  line-height: 1;
  flex-shrink: 0;
}
.lab-xmas-banner .lab-xmas-msg { max-width: 52rem; margin: 0; }
body:has([data-lab="custom-1792300265"]) .page-stack {
  padding-top: min(100px, 18vw);
}
.lab-wrap { width: min(720px, 100%); margin: 8px auto 56px; }
.lab-card {
  border: 1px solid rgba(176, 203, 188, 0.28);
  border-radius: 16px;
  padding: 24px;
}
.lab-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 0;
}
@media (max-width: 640px) {
  .lab-stats { grid-template-columns: 1fr; }
}
.lab-stat { text-align: center; }
.lab-stat .lab-stat-label {
  font-family: var(--sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(232, 238, 233, 0.75);
  margin: 0 0 8px;
}
.lab-stat .lab-stat-num {
  font-family: var(--serif);
  font-size: clamp(28px, 5vw, 36px);
  color: var(--mist);
  margin: 0;
}
.lab-note {
  margin: 24px 0 0;
  font-size: 14px;
  color: rgba(232, 238, 233, 0.7);
  text-align: center;
}
`;

export default function Lab() {
  const [variant, setVariant] = useState(0);
  const [counts, setCounts] = useState(() => STATS.map(() => 0));
  const sectionRef = useRef<HTMLElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    setVariant(Math.floor(Math.random() * BANNER_VARIANTS.length));
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setCounts(STATS.map((s) => s.value));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || animatedRef.current) return;
        animatedRef.current = true;
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const ease = 1 - (1 - t) ** 3;
          setCounts(STATS.map((s) => Math.round(s.value * ease)));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const v = BANNER_VARIANTS[variant] ?? BANNER_VARIANTS[0];

  return (
    <section
      ref={sectionRef}
      data-lab="custom-1792300265"
      aria-labelledby="lab-custom-h2"
    >
      <style>{css}</style>
      <h2 id="lab-custom-h2">Animated counter</h2>
      <div className="lab-xmas-banner" role="region" aria-label="Christmas holiday notice">
        <span className="lab-xmas-graphic" aria-hidden="true">{v.icon}</span>
        <p className="lab-xmas-msg">
          We&apos;re closed Dec 24 &amp; 25 for Christmas. Wishing you a warm, festive season!
        </p>
      </div>
      <div className="lab-wrap">
        <div className="lab-card">
          <div className="lab-stats">
            {STATS.map((s, i) => (
              <div className="lab-stat" key={s.label}>
                <p className="lab-stat-label">{s.label}</p>
                <p className="lab-stat-num">{counts[i]}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="lab-note">Example data: stat values are illustrative for this demo.</p>
      </div>
    </section>
  );
}
