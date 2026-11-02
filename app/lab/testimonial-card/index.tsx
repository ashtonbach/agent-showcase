"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const HID = "quote-card-title";
const DATA = [
  { q: "The rollout felt calm—every edge case had a name before we shipped.", name: "Mira Chen", role: "Product lead", n: 0 },
  { q: "Our support queue dropped the week the card went live. Clear wins.", name: "Jonah Ellis", role: "Support ops", n: 1 },
  { q: "I stopped re-explaining the same story in every deck. This holds it.", name: "Samira Okoye", role: "Design partner", n: 2 },
];

export default function TestimonialCard() {
  const [idx, setIdx] = useState(0);
  const [hover, setHover] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [badImg, setBadImg] = useState(false);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const cur = DATA[idx];

  const stop = () => {
    if (tick.current) clearInterval(tick.current);
    tick.current = null;
  };
  const arm = useCallback(() => {
    stop();
    if (hover || reduce) return;
    tick.current = setInterval(() => setIdx((i) => (i + 1) % DATA.length), 3000);
  }, [hover, reduce]);
  const go = (n: number) => {
    setIdx(n);
    setBadImg(false);
    stop();
    arm();
  };

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  useEffect(() => {
    setBadImg(false);
  }, [idx]);
  useEffect(() => {
    arm();
    return stop;
  }, [arm]);

  return (
    <section data-lab="testimonial-card" aria-labelledby={HID} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <h2 id={HID}>What people say</h2>
      <div className="lab-shell">
        <figure className="lab-card">
          <blockquote data-index={idx} className="lab-quote">{cur.q}</blockquote>
          <figcaption className="lab-meta">
            {!badImg ? (
              <img data-art="image" src={`/lab/testimonial-card/avatar-${cur.n}.svg`} width={48} height={48} alt="" onError={() => setBadImg(true)} />
            ) : (
              <span data-art="fallback" className="lab-av-fb" aria-hidden="true" />
            )}
            <div className="lab-who">
              <strong>{cur.name}</strong>
              <span className="label">{cur.role}</span>
            </div>
          </figcaption>
        </figure>
        <div className="lab-dots">
          {DATA.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show quote ${i + 1}`}
              aria-current={i === idx ? "true" : undefined}
              onClick={() => go(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter") go(i);
              }}
            />
          ))}
        </div>
      </div>
      <p className="lab-note">Example data: these quotes and people are invented.</p>
      <style>{`
        [data-lab="testimonial-card"] { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #E8EEE9); }
        [data-lab="testimonial-card"] .lab-shell { display: grid; gap: 20px; }
        [data-lab="testimonial-card"] .lab-card { margin: 0; border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; background: rgba(18,26,22,0.35); }
        [data-lab="testimonial-card"] .lab-quote { margin: 0 0 20px; font-family: var(--serif); font-size: 1.25rem; line-height: 1.45; }
        [data-lab="testimonial-card"] .lab-meta { display: flex; gap: 14px; align-items: center; margin: 0; }
        [data-lab="testimonial-card"] .lab-meta img { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 1px solid rgba(176,203,188,0.35); }
        [data-lab="testimonial-card"] .lab-av-fb { width: 48px; height: 48px; border-radius: 50%; background: rgba(176,203,188,0.22); display: inline-block; }
        [data-lab="testimonial-card"] .lab-who { display: grid; gap: 4px; }
        [data-lab="testimonial-card"] .lab-who strong { font-weight: 500; }
        [data-lab="testimonial-card"] .label { font-family: var(--sans); font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; font-size: 0.72rem; color: var(--sage, #B0CBBC); }
        [data-lab="testimonial-card"] .lab-dots { display: flex; gap: 10px; justify-content: center; }
        [data-lab="testimonial-card"] .lab-dots button { width: 12px; height: 12px; border-radius: 50%; border: 1px solid rgba(176,203,188,0.5); background: transparent; padding: 0; cursor: pointer; }
        [data-lab="testimonial-card"] .lab-dots button[aria-current="true"] { background: var(--sage, #B0CBBC); }
        [data-lab="testimonial-card"] .lab-dots button:focus-visible { outline: 2px solid var(--sage, #B0CBBC); outline-offset: 3px; }
        [data-lab="testimonial-card"] .lab-note { margin: 24px 0 0; font-size: 0.9rem; color: rgba(232,238,233,0.75); }
        @media (prefers-reduced-motion: reduce) { [data-lab="testimonial-card"] .lab-quote { transition: none; } }
      `}</style>
    </section>
  );
}
