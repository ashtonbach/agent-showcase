"use client";

import { useEffect, useRef } from "react";

const STATS = [
  { final: "500+", label: "Partner sites" },
  { final: "98%", label: "Renewable share" },
  { final: "24", label: "Countries served" },
] as const;

const TITLE_ID = "lab-animated-counter-title";
const DURATION_MS = 1200;

function zeroText(final: string): string {
  const m = final.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return "0";
  return `${m[1]}0${m[3]}`;
}

function parseFinal(final: string): { num: number; decimals: number } {
  const m = final.match(/(\d+(?:\.\d+)?)/);
  if (!m) return { num: 0, decimals: 0 };
  const num = Number(m[1]);
  const decimals = m[1].includes(".") ? m[1].split(".")[1].length : 0;
  return { num, decimals };
}

function tweenText(final: string, progress: number): string {
  if (progress >= 1) return final;
  const m = final.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return final;
  const { num, decimals } = parseFinal(final);
  const v = num * progress;
  const shown =
    decimals > 0 ? v.toFixed(decimals) : String(Math.round(v));
  return `${m[1]}${shown}${m[3]}`;
}

function runCountUp(els: HTMLElement[], reduced: boolean) {
  if (reduced) {
    els.forEach((el) => {
      el.textContent = el.getAttribute("data-final") ?? el.textContent;
    });
    return;
  }
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / DURATION_MS);
    els.forEach((el) => {
      const final = el.getAttribute("data-final") ?? "";
      el.textContent = tweenText(final, t);
    });
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const css = `
.lab-ac-wrap { width: min(960px, 100%); margin: 8px auto 56px; }
.lab-ac-card {
  border: 1px solid rgba(176, 203, 188, 0.28);
  border-radius: 16px;
  padding: 24px;
  background: rgba(18, 26, 22, 0.35);
}
.lab-ac-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  text-align: center;
}
.lab-ac-stat strong {
  display: block;
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(28px, 5vw, 40px);
  color: var(--mist);
  line-height: 1.1;
}
.lab-ac-label {
  margin: 10px 0 0;
  font-family: var(--sans);
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--sage);
}
.lab-ac-note {
  margin: 24px 0 0;
  font-size: 15px;
  color: rgba(232, 238, 233, 0.72);
  text-align: center;
}
@media (max-width: 520px) {
  .lab-ac-grid { grid-template-columns: 1fr; gap: 16px; }
}
`;

export default function AnimatedCounterLab() {
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      const els = statRefs.current.filter(Boolean) as HTMLElement[];
      runCountUp(els, reduced);
    };
    if (reduced) {
      play();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-lab="animated-counter"
      aria-labelledby={TITLE_ID}
    >
      <style>{css}</style>
      <div className="lab-ac-wrap">
        <div className="lab-ac-card">
          <h2 id={TITLE_ID}>Impact at a glance</h2>
          <div className="lab-ac-grid">
            {STATS.map((s, i) => (
              <div className="lab-ac-stat" key={s.label}>
                <strong
                  data-final={s.final}
                  ref={(el) => {
                    statRefs.current[i] = el;
                  }}
                >
                  {zeroText(s.final)}
                </strong>
                <p className="lab-ac-label">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="lab-ac-note">Example data</p>
        </div>
      </div>
    </section>
  );
}
