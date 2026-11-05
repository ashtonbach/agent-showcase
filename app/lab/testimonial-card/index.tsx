"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const QUOTES = [
  { text: "The forest palette made our launch page feel calm without losing clarity.", name: "Mira Chen", role: "Product lead", src: "/lab/testimonial-card/avatar-0.svg" },
  { text: "Rotating quotes stayed readable on mobile and the dots were easy to hit.", name: "Jonah Ellis", role: "Design engineer", src: "/lab/testimonial-card/avatar-1.svg" },
  { text: "Hover pause and keyboard focus on the dots matched what we asked for in the spec.", name: "Sage Porter", role: "Accessibility reviewer", src: "/lab/testimonial-card/avatar-2.svg" },
] as const;

const css = `
.lab-tcard { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #f2efe6); }
.lab-tcard-card { border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; background: rgba(18,26,22,0.45); }
.lab-tcard h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 20px; color: var(--mist, #f2efe6); }
.lab-tcard blockquote { margin: 0; font-size: 18px; line-height: 1.55; color: var(--mist, #e8eee9); }
.lab-tcard figcaption { display: flex; align-items: center; gap: 12px; margin-top: 20px; }
.lab-tcard .label { font-family: var(--sans); font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; font-size: 11px; color: var(--sage); }
.lab-tcard-avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
.lab-tcard-avatar-fb { display: block; width: 48px; height: 48px; border-radius: 50%; background: rgba(176,203,188,0.25); flex-shrink: 0; }
.lab-dots { display: flex; justify-content: center; gap: 10px; margin-top: 20px; }
.lab-dots button { width: 10px; height: 10px; padding: 0; border: none; border-radius: 50%; background: rgba(176,203,188,0.35); cursor: pointer; }
.lab-dots button[aria-current="true"] { background: var(--sage); }
.lab-dots button:focus-visible { outline: 2px solid var(--sage); outline-offset: 3px; }
.lab-note { margin: 16px 0 0; font-size: 14px; color: rgba(232,238,233,0.75); }
`;

function Avatar({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState(true);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el?.complete && el.naturalWidth === 0) setOk(false);
  }, [src]);
  if (!ok) return <span data-art="fallback" aria-hidden="true" className="lab-tcard-avatar-fb" />;
  return (
    <img ref={ref} data-art="image" className="lab-tcard-avatar" src={src} width={48} height={48} alt={alt}
      onLoad={() => setOk(true)} onError={() => setOk(false)} />
  );
}

export default function TestimonialCard() {
  const [idx, setIdx] = useState(0);
  const hover = useRef(false);
  const reduce = useRef(false);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const q = QUOTES[idx];

  const arm = useCallback(() => {
    if (tick.current) clearInterval(tick.current);
    if (reduce.current || hover.current) return;
    tick.current = setInterval(() => setIdx((i) => (i + 1) % QUOTES.length), 3000);
  }, []);

  const pick = (n: number) => { setIdx(n); arm(); };

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    arm();
    return () => { if (tick.current) clearInterval(tick.current); };
  }, [arm]);

  return (
    <section data-lab="testimonial-card" aria-labelledby="lab-tcard-title" className="lab-tcard"
      onMouseEnter={() => { hover.current = true; if (tick.current) clearInterval(tick.current); }}
      onMouseLeave={() => { hover.current = false; arm(); }}>
      <style>{css}</style>
      <h2 id="lab-tcard-title">What people say</h2>
      <div className="lab-tcard-card">
        <figure>
          <blockquote data-index={String(idx)}>&ldquo;{q.text}&rdquo;</blockquote>
          <figcaption>
            <Avatar src={q.src} alt="" />
            <div><strong>{q.name}</strong><br /><span className="label">{q.role}</span></div>
          </figcaption>
        </figure>
        <div className="lab-dots">
          {QUOTES.map((_, i) => (
            <button key={i} type="button" aria-label={`Show quote ${i + 1}`} aria-current={i === idx ? "true" : undefined}
              onClick={() => pick(i)} />
          ))}
        </div>
      </div>
      <p className="lab-note">Example data: these quotes and people are invented.</p>
    </section>
  );
}
