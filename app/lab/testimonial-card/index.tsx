"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const QUOTES = [
  { text: "The forest mist palette made our launch page feel calm without losing clarity.", name: "Mira Chen", role: "Product lead", avatar: "/lab/testimonial-card/avatar-0.svg" },
  { text: "We shipped the showcase section in one afternoon; the quote card reads well on mobile.", name: "Jonah Ellis", role: "Frontend engineer", avatar: "/lab/testimonial-card/avatar-1.svg" },
  { text: "Invented quotes still land when the typography and spacing feel intentional.", name: "Sage Porter", role: "Design partner", avatar: "/lab/testimonial-card/avatar-2.svg" },
];

function LabAvatar({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState(true);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth === 0) setOk(false);
  }, [src]);
  if (!ok) return <span data-art="fallback" aria-hidden="true" className="lab-avatar-fallback" />;
  return (
    <img
      ref={ref}
      data-art="image"
      src={src}
      width={48}
      height={48}
      alt={alt}
      className="lab-avatar"
      onLoad={() => setOk(true)}
      onError={() => setOk(false)}
    />
  );
}

export default function Lab() {
  const titleId = "lab-testimonial-title";
  const [idx, setIdx] = useState(0);
  const [hover, setHover] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const q = QUOTES[idx];

  const pick = useCallback((n: number) => {
    setIdx(n);
    setEpoch((e) => e + 1);
  }, []);

  useEffect(() => {
    if (hover) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const t = window.setInterval(() => setIdx((i) => (i + 1) % QUOTES.length), 3000);
    return () => window.clearInterval(t);
  }, [hover, epoch]);

  return (
    <section
      data-lab="testimonial-card"
      aria-labelledby={titleId}
      className="lab-wrap"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h2 id={titleId}>What people say</h2>
      <figure className="lab-card">
        <blockquote data-index={String(idx)}>&ldquo;{q.text}&rdquo;</blockquote>
        <figcaption>
          <LabAvatar src={q.avatar} alt="" />
          <div className="lab-meta">
            <strong>{q.name}</strong>
            <span className="label">{q.role}</span>
          </div>
        </figcaption>
      </figure>
      <div className="lab-dots" role="tablist" aria-label="Quotes">
        {QUOTES.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-label={`Show quote ${i + 1}`}
            aria-current={i === idx ? "true" : undefined}
            className="lab-dot"
            onClick={() => pick(i)}
          />
        ))}
      </div>
      <p className="lab-note">Example data: these quotes and people are invented.</p>
      <style>{`
        .lab-wrap { width: min(720px, 100%); margin: 8px auto 56px; box-sizing: border-box; }
        .lab-card { margin: 0; padding: 24px; border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; background: rgba(18,26,22,0.35); }
        .lab-card blockquote { margin: 0 0 20px; font-family: var(--serif); font-weight: 400; font-size: 1.35rem; line-height: 1.45; color: var(--mist); }
        .lab-card figcaption { display: flex; align-items: center; gap: 14px; }
        .lab-meta strong { display: block; color: var(--mist); font-family: var(--sans); font-weight: 600; font-size: 0.95rem; }
        .lab-meta .label { display: block; margin-top: 4px; font-family: var(--sans); font-weight: 500; font-size: 0.72rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--sage); }
        .lab-avatar, .lab-avatar-fallback { width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0; }
        .lab-avatar-fallback { background: rgba(176,203,188,0.22); display: inline-block; }
        .lab-dots { display: flex; justify-content: center; gap: 10px; margin-top: 18px; }
        .lab-dot { width: 10px; height: 10px; padding: 0; border: none; border-radius: 50%; background: rgba(176,203,188,0.35); cursor: pointer; }
        .lab-dot[aria-current="true"] { background: var(--sage); }
        .lab-dot:focus-visible { outline: 2px solid var(--sage); outline-offset: 3px; }
        .lab-note { margin: 16px 0 0; font-size: 0.9rem; color: var(--mist); opacity: 0.85; }
        @media (prefers-reduced-motion: reduce) { .lab-dot { transition: none; } }
      `}</style>
    </section>
  );
}
