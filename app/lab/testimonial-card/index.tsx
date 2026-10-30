"use client";

import { useEffect, useRef, useState } from "react";

type Quote = { text: string; name: string; role: string; avatar: string };

const QUOTES: Quote[] = [
  {
    text: "Switching felt risky, but it paid off inside the first week.",
    name: "Priya Nair",
    role: "Operations Lead",
    avatar: "/lab/testimonial-card/avatar-0.svg",
  },
  {
    text: "Our team finally has one shared view instead of five spreadsheets.",
    name: "Marcus Webb",
    role: "Product Manager",
    avatar: "/lab/testimonial-card/avatar-1.svg",
  },
  {
    text: "Support actually replies, and the fixes stick around.",
    name: "Elena Kovac",
    role: "Customer Success",
    avatar: "/lab/testimonial-card/avatar-2.svg",
  },
];

const ROTATE_MS = 3000;
const TITLE_ID = "testimonial-card-title";

export default function Lab() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [avatarOk, setAvatarOk] = useState(true);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setAvatarOk(true);
  }, [index]);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduced) return;
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % QUOTES.length);
    }, ROTATE_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, index]);

  const quote = QUOTES[index];

  return (
    <section
      data-lab="testimonial-card"
      aria-labelledby={TITLE_ID}
      className="lab-tc"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h2 id={TITLE_ID} className="lab-tc-title">
        What people say
      </h2>
      <figure className="lab-tc-figure">
        <blockquote data-index={index} className="lab-tc-quote">
          "{quote.text}"
        </blockquote>
        <figcaption className="lab-tc-caption">
          {avatarOk ? (
            <img
              data-art="image"
              className="lab-tc-avatar"
              src={quote.avatar}
              width={48}
              height={48}
              alt={quote.name}
              onError={() => setAvatarOk(false)}
            />
          ) : (
            <span
              data-art="fallback"
              aria-hidden="true"
              className="lab-tc-avatar lab-tc-avatar-fallback"
            />
          )}
          <span className="lab-tc-who">
            <strong>{quote.name}</strong>
            <span className="label">{quote.role}</span>
          </span>
        </figcaption>
      </figure>
      <div className="lab-dots" role="group" aria-label="Choose a quote">
        {QUOTES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show quote ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            className={i === index ? "lab-dot lab-dot-active" : "lab-dot"}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
      <p className="lab-tc-note">
        Example data: these quotes and people are invented.
      </p>
      <style>{css}</style>
    </section>
  );
}

const css = `
.lab-tc{max-width:min(720px,100%);margin:8px auto 56px;padding:24px;
  border:1px solid rgba(176,203,188,0.28);border-radius:16px;box-sizing:border-box;
  color:#E8EEE9;}
.lab-tc-title{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 20px;}
.lab-tc-figure{margin:0;min-height:120px;}
.lab-tc-quote{margin:0 0 16px;font-size:18px;line-height:1.5;color:#F2EFE6;}
.lab-tc-caption{display:flex;align-items:center;gap:12px;}
.lab-tc-avatar{border-radius:50%;object-fit:cover;flex:0 0 auto;}
.lab-tc-avatar-fallback{display:inline-block;width:48px;height:48px;
  background:rgba(176,203,188,0.22);}
.lab-tc-who{display:flex;flex-direction:column;gap:2px;}
.lab-tc-who strong{color:#F2EFE6;font-weight:600;}
.lab-tc-who .label{font-family:var(--sans);font-weight:500;font-size:11px;
  letter-spacing:0.16em;text-transform:uppercase;color:var(--sage);}
.lab-dots{display:flex;gap:10px;margin-top:20px;}
.lab-dot{width:10px;height:10px;border-radius:50%;border:1px solid rgba(176,203,188,0.4);
  background:transparent;padding:0;cursor:pointer;}
.lab-dot-active{background:var(--sage);border-color:var(--sage);}
.lab-dot:focus-visible{outline:2px solid var(--sage);outline-offset:3px;}
.lab-tc-note{margin:20px 0 0;font-size:13px;color:#E8EEE9;opacity:0.75;}
@media (max-width:480px){.lab-tc{padding:16px;}}
`;
