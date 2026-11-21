"use client";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

const QUOTES = [
  {
    text: "The forest-mist palette made our product feel calm without looking dull.",
    name: "Mira Chen",
    role: "Product lead",
    src: "/lab/testimonial-card/avatar-0.svg",
  },
  {
    text: "We shipped the rebrand in a week; the type and spacing system just worked.",
    name: "Jonah Ellis",
    role: "Design director",
    src: "/lab/testimonial-card/avatar-1.svg",
  },
  {
    text: "Clients keep mentioning how readable the site is on phones and desktops.",
    name: "Sage Ortiz",
    role: "Studio partner",
    src: "/lab/testimonial-card/avatar-2.svg",
  },
];

function Avatar({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) setOk(false);
  }, [src]);
  if (!ok) {
    return (
      <span
        data-art="fallback"
        aria-hidden="true"
        className="lab-avatar-fallback"
      />
    );
  }
  return (
    <img
      ref={imgRef}
      data-art="image"
      className="lab-avatar"
      src={src}
      width={48}
      height={48}
      alt={alt}
      onError={() => setOk(false)}
    />
  );
}

export default function TestimonialCard() {
  const titleId = useId();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const q = QUOTES[index];

  const pick = useCallback((i: number) => setIndex(i), []);

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = window.setInterval(
      () => setIndex((i) => (i + 1) % QUOTES.length),
      3000
    );
    return () => window.clearInterval(t);
  }, [paused, index]);

  const onDotKey = (i: number) => (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter") pick(i);
  };

  return (
    <section
      data-lab="testimonial-card"
      aria-labelledby={titleId}
      className="lab-testimonial"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h2 id={titleId}>What people say</h2>
      <figure className="lab-card">
        <blockquote data-index={index}>{q.text}</blockquote>
        <figcaption>
          <Avatar src={q.src} alt="" />
          <strong>{q.name}</strong>
          <span className="label">{q.role}</span>
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
            onKeyDown={onDotKey(i)}
          />
        ))}
      </div>
      <p className="lab-note">
        Example data: these quotes and people are invented.
      </p>
      <style>{`
        .lab-testimonial { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #f2efe6); }
        .lab-testimonial h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 20px; }
        .lab-card { margin: 0; padding: 24px; border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; }
        .lab-card blockquote { margin: 0 0 20px; font-size: 18px; line-height: 1.5; }
        .lab-card figcaption { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .lab-avatar, .lab-avatar-fallback { width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0; }
        .lab-avatar-fallback { background: rgba(176, 203, 188, 0.25); display: block; }
        .lab-card .label { font-family: var(--sans); font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; font-size: 11px; color: var(--sage, #b0cbbc); }
        .lab-dots { display: flex; gap: 10px; justify-content: center; margin: 16px 0 0; }
        .lab-dots button { width: 10px; height: 10px; padding: 0; border-radius: 50%; border: 1px solid rgba(176, 203, 188, 0.5); background: transparent; cursor: pointer; }
        .lab-dots button[aria-current="true"] { background: var(--sage, #b0cbbc); }
        .lab-dots button:focus-visible { outline: 2px solid var(--sage, #b0cbbc); outline-offset: 3px; }
        .lab-note { margin: 20px 0 0; font-size: 14px; color: #e8eee9; }
        @media (prefers-reduced-motion: reduce) { .lab-card blockquote { transition: none; } }
      `}</style>
    </section>
  );
}