"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const QUOTES = [
  { text: "The forest mist palette made our launch page feel calm without losing clarity.", name: "Mira Okonkwo", role: "Product lead", avatar: "/lab/testimonial-card/avatar-0.svg" },
  { text: "Shipping from a written spec meant review was about behavior, not surprises.", name: "Jon Hale", role: "Engineer", avatar: "/lab/testimonial-card/avatar-1.svg" },
  { text: "Example quotes in the lab slot let QA verify rotation and focus before we go live.", name: "Sage Lin", role: "QA", avatar: "/lab/testimonial-card/avatar-2.svg" },
];

export default function TestimonialCard() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [badAvatars, setBadAvatars] = useState<Record<number, boolean>>({});
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reducedRef = useRef(false);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = useCallback(() => {
    clearTimer();
    if (reducedRef.current || paused) return;
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % QUOTES.length), 3000);
  }, [paused]);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    startTimer();
    return clearTimer;
  }, [startTimer]);

  useEffect(() => {
    startTimer();
  }, [paused, startTimer]);

  const goTo = (i: number) => {
    setIndex(i);
    clearTimer();
    if (!reducedRef.current && !paused) {
      timerRef.current = setInterval(() => setIndex((n) => (n + 1) % QUOTES.length), 3000);
    }
  };

  const q = QUOTES[index];

  return (
    <section data-lab="testimonial-card" aria-labelledby="lab-tc-title" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <h2 id="lab-tc-title" className="lab-tc-title">What people say</h2>
      <div className="lab-tc-card">
        <figure className="lab-tc-figure">
          <blockquote data-index={String(index)} className="lab-tc-quote">&ldquo;{q.text}&rdquo;</blockquote>
          <figcaption className="lab-tc-cap">
            {badAvatars[index] ? (
              <span data-art="fallback" className="lab-tc-avatar-fb" aria-hidden="true" />
            ) : (
              <img data-art="image" src={q.avatar} width={48} height={48} alt="" className="lab-tc-avatar" onError={() => setBadAvatars((b) => ({ ...b, [index]: true }))} />
            )}
            <div className="lab-tc-meta">
              <strong className="lab-tc-name">{q.name}</strong>
              <span className="label">{q.role}</span>
            </div>
          </figcaption>
        </figure>
        <div className="lab-dots">
          {QUOTES.map((_, i) => (
            <button
              key={i}
              type="button"
              className="lab-tc-dot"
              aria-label={`Show quote ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
      <p className="lab-note">Example data: these quotes and people are invented.</p>
      <style>{`
        .lab-tc-title { font-family: var(--serif); font-weight: 400; font-size: 30px; color: var(--mist); margin: 0 0 16px; }
        .lab-tc-card { width: min(720px, 100%); margin: 8px auto 0; border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; box-sizing: border-box; }
        .lab-tc-quote { font-family: var(--serif); font-weight: 400; font-size: 20px; color: #f2efe6; margin: 0 0 20px; line-height: 1.45; }
        .lab-tc-cap { display: flex; align-items: center; gap: 14px; margin: 0; }
        .lab-tc-avatar, .lab-tc-avatar-fb { width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0; }
        .lab-tc-avatar-fb { background: rgba(176,203,188,0.22); display: block; }
        .lab-tc-meta { display: flex; flex-direction: column; gap: 4px; }
        .lab-tc-name { font-family: var(--sans); font-size: 15px; color: var(--mist); font-weight: 600; }
        .label { font-family: var(--sans); font-weight: 500; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #e8eee9; }
        .lab-dots { display: flex; justify-content: center; gap: 10px; margin-top: 20px; }
        .lab-tc-dot { width: 10px; height: 10px; border-radius: 50%; border: 1px solid rgba(176,203,188,0.5); background: transparent; cursor: pointer; padding: 0; }
        .lab-tc-dot[aria-current="true"] { background: var(--sage); border-color: var(--sage); }
        .lab-tc-dot:focus-visible { outline: 2px solid var(--sage); outline-offset: 3px; }
        .lab-note { font-family: var(--sans); font-size: 13px; color: #e8eee9; margin: 16px auto 56px; width: min(720px, 100%); line-height: 1.4; }
      `}</style>
    </section>
  );
}
