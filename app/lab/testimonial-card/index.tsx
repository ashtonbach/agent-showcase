"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const QUOTES = [
  { text: "The forest palette made our launch page feel calm without losing clarity.", name: "Mira Chen", role: "Product lead" },
  { text: "Rotating quotes drew attention to social proof while staying readable on mobile.", name: "Jonah Ellis", role: "Design engineer" },
  { text: "Pausing on hover let us read each line; the dots made jumping intentional.", name: "Sage Porter", role: "Frontend developer" },
];

export default function TestimonialCardLab() {
  const titleId = "lab-testimonial-title";
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [artOk, setArtOk] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hoveredRef = useRef(false);

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const startTimer = useCallback(() => {
    stopTimer();
    if (hoveredRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % QUOTES.length), 3000);
  }, []);

  const jumpTo = useCallback(
    (i: number) => {
      setIndex(i);
      stopTimer();
      startTimer();
    },
    [startTimer],
  );

  useEffect(() => {
    hoveredRef.current = hovered;
    if (hovered) stopTimer();
    else startTimer();
    return stopTimer;
  }, [hovered, startTimer]);

  useEffect(() => {
    setArtOk(true);
  }, [index]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img || !artOk) return;
    if (img.complete && img.naturalWidth === 0) setArtOk(false);
  }, [index, artOk]);

  const q = QUOTES[index];

  return (
    <section
      data-lab="testimonial-card"
      aria-labelledby={titleId}
      className="lab-wrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h2 id={titleId} className="lab-title">
        What people say
      </h2>
      <figure className="lab-card">
        <blockquote data-index={String(index)} className="lab-quote">
          {q.text}
        </blockquote>
        <figcaption className="lab-cap">
          {artOk ? (
            <img
              ref={imgRef}
              data-art="image"
              src={`/lab/testimonial-card/avatar-${index}.svg`}
              width={48}
              height={48}
              alt=""
              className="lab-avatar"
              onLoad={() => setArtOk(true)}
              onError={() => setArtOk(false)}
            />
          ) : (
            <span data-art="fallback" aria-hidden="true" className="lab-avatar-fb" />
          )}
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
            className="lab-dot"
            onClick={() => jumpTo(i)}
          />
        ))}
      </div>
      <p className="lab-note">Example data: these quotes and people are invented.</p>
      <style>{`
        .lab-wrap{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#f2efe6)}
        .lab-title{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;margin:0 0 20px}
        .lab-card{margin:0;border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px}
        .lab-quote{margin:0 0 20px;font-size:17px;line-height:1.55;color:#e8eee9}
        .lab-cap{display:flex;align-items:center;gap:14px;margin:0}
        .lab-avatar{width:48px;height:48px;border-radius:50%;object-fit:cover}
        .lab-avatar-fb{width:48px;height:48px;border-radius:50%;background:rgba(176,203,188,.22);flex-shrink:0}
        .lab-meta{display:flex;flex-direction:column;gap:4px}
        .lab-meta strong{font-weight:600;font-size:15px}
        .lab-meta .label{font-family:var(--sans);font-weight:500;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--sage)}
        .lab-dots{display:flex;justify-content:center;gap:10px;margin:18px 0 14px}
        .lab-dot{width:10px;height:10px;padding:0;border:1px solid rgba(176,203,188,.45);border-radius:50%;background:transparent;cursor:pointer}
        .lab-dot[aria-current="true"]{background:var(--sage);border-color:var(--sage)}
        .lab-dot:focus-visible{outline:2px solid var(--sage);outline-offset:3px}
        .lab-note{margin:0;font-size:14px;line-height:1.45;color:#e8eee9}
        @media (prefers-reduced-motion:reduce){.lab-dot{transition:none}}
      `}</style>
    </section>
  );
}
