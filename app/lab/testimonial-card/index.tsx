"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const QUOTES = [
  {
    text: "The forest palette made our product feel calm without losing clarity — exactly what we needed.",
    name: "Mira Chen",
    role: "Design lead (invented)",
    avatar: "/lab/testimonial-card/avatar-0.svg",
  },
  {
    text: "Shipping felt steady: fewer surprises in review and a layout that held up on every breakpoint.",
    name: "Jonas Okonkwo",
    role: "Engineering manager (invented)",
    avatar: "/lab/testimonial-card/avatar-1.svg",
  },
  {
    text: "Clients noticed the polish first; the team noticed how little we had to rework afterward.",
    name: "Elena Vasquez",
    role: "Studio founder (invented)",
    avatar: "/lab/testimonial-card/avatar-2.svg",
  },
];

const css = `
[data-lab="testimonial-card"] {
  width: min(720px, 100%);
  margin: 8px auto 56px;
  color: var(--mist, #E8EEE9);
}
[data-lab="testimonial-card"] .lab-card {
  border: 1px solid rgba(176, 203, 188, 0.28);
  border-radius: 16px;
  padding: 24px;
  margin: 0 0 20px;
}
[data-lab="testimonial-card"] blockquote {
  margin: 0 0 20px;
  font-family: var(--serif);
  font-size: 1.25rem;
  line-height: 1.45;
  font-weight: 400;
}
[data-lab="testimonial-card"] figcaption {
  display: flex;
  align-items: center;
  gap: 14px;
}
[data-lab="testimonial-card"] .lab-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}
[data-lab="testimonial-card"] .lab-avatar-fallback {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(176, 203, 188, 0.25);
  flex-shrink: 0;
}
[data-lab="testimonial-card"] .lab-meta strong {
  display: block;
  font-weight: 500;
  color: var(--mist, #F2EFE6);
}
[data-lab="testimonial-card"] .label {
  font-family: var(--sans);
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-size: 0.7rem;
  color: var(--sage, #B0CBBC);
}
[data-lab="testimonial-card"] .lab-dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 16px;
}
[data-lab="testimonial-card"] .lab-dots button {
  width: 10px;
  height: 10px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgba(176, 203, 188, 0.35);
  cursor: pointer;
}
[data-lab="testimonial-card"] .lab-dots button[aria-current="true"] {
  background: var(--sage, #B0CBBC);
}
[data-lab="testimonial-card"] .lab-dots button:focus-visible {
  outline: 2px solid var(--sage, #B0CBBC);
  outline-offset: 3px;
}
[data-lab="testimonial-card"] .lab-note {
  font-size: 0.875rem;
  color: rgba(232, 238, 233, 0.75);
  margin: 0;
  text-align: center;
}
@media (prefers-reduced-motion: reduce) {
  [data-lab="testimonial-card"] * { transition: none !important; }
}
`;

function Avatar({ src, alt }: { src: string; alt: string }) {
  const [err, setErr] = useState(false);
  if (err) {
    return <span className="lab-avatar-fallback" data-art="fallback" aria-hidden="true" />;
  }
  return (
    <img
      className="lab-avatar"
      data-art="image"
      src={src}
      width={48}
      height={48}
      alt={alt}
      onError={() => setErr(true)}
    />
  );
}

export default function TestimonialCard() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % QUOTES.length);
    }, 3000);
  }, [clearTimer]);

  const goTo = useCallback(
    (i: number) => {
      setIndex(i);
      startTimer();
    },
    [startTimer]
  );

  useEffect(() => {
    if (!paused) startTimer();
    else clearTimer();
    return clearTimer;
  }, [paused, startTimer, clearTimer]);

  const q = QUOTES[index];

  return (
    <section
      data-lab="testimonial-card"
      aria-labelledby="testimonial-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{css}</style>
      <h2 id="testimonial-heading">What people say</h2>
      <figure className="lab-card">
        <blockquote data-index={String(index)}>&ldquo;{q.text}&rdquo;</blockquote>
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
            onClick={() => goTo(i)}
          />
        ))}
      </div>
      <p className="lab-note">
        Example data: these quotes and people are invented.
      </p>
    </section>
  );
}
