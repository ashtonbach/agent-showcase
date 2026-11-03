"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const TITLE_ID = "testimonial-card-title";
const QUOTES = [
  {
    text: "The forest mist palette made our launch page feel calm without losing clarity.",
    name: "Mira Chen",
    role: "Product lead",
    avatar: "avatar-0.svg",
  },
  {
    text: "We shipped the whole lab section in one afternoon and the gate caught every edge case.",
    name: "Jonah Ellis",
    role: "Staff engineer",
    avatar: "avatar-1.svg",
  },
  {
    text: "Readers actually finish the quotes now—the pause on hover is a small touch that matters.",
    name: "Sage Porter",
    role: "Editor",
    avatar: "avatar-2.svg",
  },
];

export default function TestimonialCard() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);
  const q = QUOTES[index];

  const pick = useCallback((i: number) => {
    setIndex(i);
    setImgOk(true);
  }, []);

  useEffect(() => {
    setImgOk(true);
    const img = imgRef.current;
    if (!img) return;
    if (img.complete && img.naturalWidth === 0) setImgOk(false);
  }, [index]);

  useEffect(() => {
    if (hovered) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % QUOTES.length), 3000);
    return () => window.clearInterval(id);
  }, [hovered, index]);

  const css = `
[data-lab="testimonial-card"]{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6)}
[data-lab="testimonial-card"] h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 24px;line-height:1.2}
[data-lab="testimonial-card"] .lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.35)}
[data-lab="testimonial-card"] blockquote{margin:0 0 20px;font-size:18px;line-height:1.55}
[data-lab="testimonial-card"] figcaption{display:flex;align-items:center;gap:12px}
[data-lab="testimonial-card"] .lab-avatar{width:48px;height:48px;border-radius:50%;object-fit:cover;flex-shrink:0}
[data-lab="testimonial-card"] .lab-fallback{width:48px;height:48px;border-radius:50%;background:rgba(176,203,188,.22);display:inline-block;flex-shrink:0}
[data-lab="testimonial-card"] .label{font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:11px;color:var(--sage,#B0CBBC);display:block;margin-top:2px}
[data-lab="testimonial-card"] .lab-dots{display:flex;gap:10px;justify-content:center;margin:20px 0 16px}
[data-lab="testimonial-card"] .lab-dots button{width:10px;height:10px;border-radius:50%;border:1px solid rgba(176,203,188,.55);background:transparent;padding:0;cursor:pointer}
[data-lab="testimonial-card"] .lab-dots button[aria-current="true"]{background:var(--sage,#B0CBBC)}
[data-lab="testimonial-card"] .lab-dots button:focus-visible{outline:2px solid var(--sage,#B0CBBC);outline-offset:3px}
[data-lab="testimonial-card"] .lab-note{margin:0;font-size:14px;color:#E8EEE9;opacity:.85}
`;

  return (
    <section
      data-lab="testimonial-card"
      aria-labelledby={TITLE_ID}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <style>{css}</style>
      <h2 id={TITLE_ID}>What people say</h2>
      <figure className="lab-card">
        <blockquote data-index={index}>{q.text}</blockquote>
        <figcaption>
          {imgOk ? (
            <img
              ref={imgRef}
              className="lab-avatar"
              data-art="image"
              src={`/lab/testimonial-card/${q.avatar}`}
              width={48}
              height={48}
              alt=""
              onError={() => setImgOk(false)}
            />
          ) : (
            <span className="lab-fallback" data-art="fallback" aria-hidden="true" />
          )}
          <div>
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
