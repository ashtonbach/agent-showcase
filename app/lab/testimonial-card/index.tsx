"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const QUOTES = [
  {
    text: "The live run made our release rhythm feel calmer—we ship small pieces with checks we can see.",
    name: "Mira Chen",
    role: "Product lead",
    avatar: "/lab/testimonial-card/avatar-0.svg",
  },
  {
    text: "Handoffs stayed short because the gate caught layout issues before anyone merged.",
    name: "Jonah Ellis",
    role: "Engineering manager",
    avatar: "/lab/testimonial-card/avatar-1.svg",
  },
  {
    text: "Reviewers got screenshots at both widths, so feedback matched what viewers saw on stream.",
    name: "Sasha Ortiz",
    role: "Design ops",
    avatar: "/lab/testimonial-card/avatar-2.svg",
  },
];

function Avatar({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState(true);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth === 0) setOk(false);
  }, [src]);
  if (!ok) {
    return <span data-art="fallback" aria-hidden="true" className="lab-avatar-fb" />;
  }
  return (
    <img
      ref={ref}
      data-art="image"
      src={src}
      width={48}
      height={48}
      alt={alt}
      className="lab-avatar"
      onError={() => setOk(false)}
    />
  );
}

export default function TestimonialCard() {
  const titleId = "lab-testimonial-title";
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const q = QUOTES[index];

  const clearTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  const startTimer = useCallback(() => {
    clearTimer();
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % QUOTES.length);
    }, 3000);
  }, []);

  useEffect(() => {
    if (paused) {
      clearTimer();
      return clearTimer;
    }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return clearTimer;
    startTimer();
    return clearTimer;
  }, [paused, startTimer]);

  const goTo = (i: number) => {
    setIndex(i);
    if (!paused && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      startTimer();
    }
  };

  return (
    <section
      data-lab="testimonial-card"
      aria-labelledby={titleId}
      className="lab-wrap"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h2 id={titleId} className="lab-title">
        What people say
      </h2>
      <figure className="lab-card">
        <blockquote data-index={index} className="lab-quote">
          {q.text}
        </blockquote>
        <figcaption className="lab-cap">
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
            className="lab-dot"
            aria-label={`Show quote ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
      <p className="lab-note">Example data: these quotes and people are invented.</p>
      <style>{`
        .lab-wrap { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #f2efe6); }
        .lab-title { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.2; margin: 0 0 20px; }
        .lab-card { margin: 0; border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; }
        .lab-quote { margin: 0 0 20px; font-size: 18px; line-height: 1.55; color: #e8eee9; }
        .lab-cap { display: flex; align-items: center; gap: 14px; margin: 0; }
        .lab-avatar, .lab-avatar-fb { width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0; }
        .lab-avatar-fb { display: block; background: rgba(176, 203, 188, 0.25); }
        .lab-meta { display: flex; flex-direction: column; gap: 4px; }
        .lab-meta strong { font-family: var(--sans); font-weight: 500; font-size: 16px; }
        .lab-meta .label { font-family: var(--sans); font-weight: 500; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--sage); }
        .lab-dots { display: flex; justify-content: center; gap: 10px; margin: 20px 0 16px; }
        .lab-dot { width: 10px; height: 10px; padding: 0; border: none; border-radius: 50%; background: rgba(176, 203, 188, 0.35); cursor: pointer; }
        .lab-dot[aria-current="true"] { background: var(--sage); }
        .lab-dot:focus-visible { outline: 2px solid var(--sage); outline-offset: 3px; }
        .lab-note { margin: 0; font-size: 14px; line-height: 1.45; color: #e8eee9; }
        @media (prefers-reduced-motion: reduce) { .lab-dot { transition: none; } }
      `}</style>
    </section>
  );
}
