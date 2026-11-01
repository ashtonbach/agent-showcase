"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const QUOTES = [
  { text: "The live gate caught a hydration slip before it ever reached preview—exactly the safety net we wanted.", name: "Morgan Vale", role: "Platform engineer", avatar: "/lab/testimonial-card/avatar-0.svg" },
  { text: "Watching each role hand off with a written spec felt like a calm sprint review, not a black box.", name: "Jordan Kei", role: "Design lead", avatar: "/lab/testimonial-card/avatar-1.svg" },
  { text: "Our team reused the same Forest Mist tokens and the section still felt fresh on mobile.", name: "Riley Moss", role: "Frontend developer", avatar: "/lab/testimonial-card/avatar-2.svg" },
];

function Avatar({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span data-art="fallback" aria-hidden="true" className="lab-avatar-fb" />;
  return (
    <img data-art="image" src={src} width={48} height={48} alt={alt} className="lab-avatar" onError={() => setFailed(true)} />
  );
}

export default function TestimonialCard() {
  const titleId = "testimonial-card-title";
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = useCallback(() => {
    clearTimer();
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % QUOTES.length), 3000);
  }, []);

  useEffect(() => {
    if (paused) clearTimer();
    else startTimer();
    return clearTimer;
  }, [paused, startTimer]);

  const pick = (i: number) => {
    setIndex(i);
    startTimer();
  };

  const q = QUOTES[index];

  return (
    <section
      data-lab="testimonial-card"
      aria-labelledby={titleId}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h2 id={titleId}>What people say</h2>
      <figure className="lab-card">
        <blockquote data-index={index}>{q.text}</blockquote>
        <figcaption>
          <Avatar src={q.avatar} alt="" />
          <div className="lab-meta">
            <strong>{q.name}</strong>
            <span className="label">{q.role}</span>
          </div>
        </figcaption>
      </figure>
      <div className="lab-dots">
        {QUOTES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show quote ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => pick(i)}
          />
        ))}
      </div>
      <p className="lab-note">Example data: these quotes and people are invented.</p>
      <style>{`
        [data-lab="testimonial-card"] { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #E8EEE9); }
        [data-lab="testimonial-card"] > h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.15; margin: 0 0 20px; color: var(--mist, #F2EFE6); }
        [data-lab="testimonial-card"] .lab-card { margin: 0; border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; background: rgba(18, 26, 22, 0.35); }
        [data-lab="testimonial-card"] blockquote { margin: 0 0 20px; font-family: var(--serif); font-size: 1.125rem; line-height: 1.45; color: var(--mist, #F2EFE6); }
        [data-lab="testimonial-card"] figcaption { display: flex; align-items: center; gap: 14px; }
        [data-lab="testimonial-card"] .lab-avatar, [data-lab="testimonial-card"] .lab-avatar-fb { width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0; object-fit: cover; }
        [data-lab="testimonial-card"] .lab-avatar-fb { display: block; background: rgba(176, 203, 188, 0.25); }
        [data-lab="testimonial-card"] .lab-meta { display: flex; flex-direction: column; gap: 4px; }
        [data-lab="testimonial-card"] strong { font-family: var(--serif); font-weight: 400; font-size: 1rem; color: var(--mist, #F2EFE6); }
        [data-lab="testimonial-card"] .label { font-family: var(--sans); font-weight: 500; font-size: 0.7rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--sage, #B0CBBC); }
        [data-lab="testimonial-card"] .lab-dots { display: flex; justify-content: center; gap: 10px; margin: 18px 0 14px; }
        [data-lab="testimonial-card"] .lab-dots button { width: 10px; height: 10px; padding: 0; border: 1px solid rgba(176, 203, 188, 0.5); border-radius: 50%; background: transparent; cursor: pointer; }
        [data-lab="testimonial-card"] .lab-dots button[aria-current="true"] { background: var(--sage, #B0CBBC); border-color: var(--sage, #B0CBBC); }
        [data-lab="testimonial-card"] .lab-dots button:focus-visible { outline: 2px solid var(--sage, #B0CBBC); outline-offset: 3px; }
        [data-lab="testimonial-card"] .lab-note { margin: 0; font-size: 0.875rem; line-height: 1.4; color: var(--mist, #E8EEE9); opacity: 0.85; }
        @media (prefers-reduced-motion: reduce) { [data-lab="testimonial-card"] * { transition: none !important; animation: none !important; } }
      `}</style>
    </section>
  );
}
