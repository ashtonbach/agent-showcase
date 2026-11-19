"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

const QUOTES = [
  { text: "The forest mist palette made our launch page feel calm without looking sleepy.", name: "Mira Holt", role: "Product lead", avatar: 0 },
  { text: "Review gates caught layout issues before anyone on the team opened a laptop.", name: "Jonah Reed", role: "Design ops", avatar: 1 },
  { text: "Shipping from an isolated branch kept the live demo steady while we iterated.", name: "Sela Cho", role: "Engineering", avatar: 2 },
] as const;

function Avatar({ index }: { index: number }) {
  const src = `/lab/testimonial-card/avatar-${index}.svg`;
  const [ok, setOk] = useState(true);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = ref.current;
    if (!img || !ok) return;
    if (img.complete && img.naturalWidth === 0) setOk(false);
  }, [ok, index]);
  if (!ok) {
    return <span data-art="fallback" aria-hidden="true" className="lab-tc-av-fb" />;
  }
  return (
    <img
      ref={ref}
      data-art="image"
      src={src}
      width={48}
      height={48}
      alt=""
      onError={() => setOk(false)}
    />
  );
}

export default function TestimonialCardLab() {
  const titleId = `${useId().replace(/:/g, "")}-title`;
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    timer.current = setInterval(() => {
      setActive((i) => (i + 1) % QUOTES.length);
    }, 3000);
  }, [clearTimer]);

  const pick = useCallback(
    (i: number) => {
      setActive(i);
      startTimer();
    },
    [startTimer],
  );

  useEffect(() => {
    if (hovered) {
      clearTimer();
      return;
    }
    startTimer();
    return clearTimer;
  }, [hovered, startTimer, clearTimer]);

  const q = QUOTES[active];

  return (
    <section
      data-lab="testimonial-card"
      aria-labelledby={titleId}
      className="lab-tc"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <style>{`
        .lab-tc { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #F2EFE6); font-family: var(--sans, system-ui, sans-serif); }
        .lab-tc h2 { font-family: var(--serif, Georgia, serif); font-weight: 400; font-size: 30px; line-height: 1.2; margin: 0 0 24px; color: var(--mist, #F2EFE6); }
        .lab-tc-card { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; margin: 0; background: rgba(18, 26, 22, 0.35); }
        .lab-tc-card blockquote { margin: 0 0 20px; font-size: 18px; line-height: 1.55; color: #E8EEE9; }
        .lab-tc-card figcaption { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .lab-tc-card img, .lab-tc-av-fb { width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0; }
        .lab-tc-av-fb { display: block; background: rgba(176, 203, 188, 0.2); }
        .lab-tc-card strong { font-weight: 600; font-size: 16px; }
        .lab-tc-meta { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .lab-tc-card .label { font-family: var(--sans, system-ui, sans-serif); font-weight: 500; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--sage, #B0CBBC); }
        .lab-dots { display: flex; justify-content: center; gap: 10px; margin: 20px 0 0; padding: 0; list-style: none; }
        .lab-dots button { width: 12px; height: 12px; padding: 0; border: 1px solid rgba(176, 203, 188, 0.5); border-radius: 50%; background: transparent; cursor: pointer; }
        .lab-dots button[aria-current="true"] { background: var(--sage, #B0CBBC); border-color: var(--sage, #B0CBBC); }
        .lab-dots button:focus-visible { outline: 2px solid var(--sage, #B0CBBC); outline-offset: 3px; }
        .lab-note { margin: 28px 0 0; font-size: 14px; line-height: 1.4; color: rgba(242, 239, 230, 0.75); }
        @media (prefers-reduced-motion: reduce) { .lab-tc-card blockquote { transition: none; } }
      `}</style>
      <h2 id={titleId}>What people say</h2>
      <figure className="lab-tc-card">
        <blockquote data-index={active}>{q.text}</blockquote>
        <figcaption>
          <Avatar index={q.avatar} />
          <div className="lab-tc-meta">
            <strong>{q.name}</strong>
            <span className="label">{q.role}</span>
          </div>
        </figcaption>
      </figure>
      <div className="lab-dots" role="group" aria-label="Choose quote">
        {QUOTES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show quote ${i + 1}`}
            aria-current={i === active ? "true" : undefined}
            onClick={() => pick(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter") pick(i);
            }}
          />
        ))}
      </div>
      <p className="lab-note">Example data: these quotes and people are invented.</p>
    </section>
  );
}