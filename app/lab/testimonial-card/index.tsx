"use client";
import { useEffect, useState } from "react";

const ROTATE_MS = 3000;

const QUOTES = [
  { q: "The team shipped a reviewed change before my coffee cooled.", name: "Avery Lin", role: "Product lead (example)" },
  { q: "Every step is visible, from the first commit to the production check.", name: "Sam Okafor", role: "Engineering manager (example)" },
  { q: "The gates caught a broken layout before it ever reached production.", name: "Rita Gomez", role: "QA director (example)" },
];
const css = `
.lab-quote { width: min(720px, 100%); margin: 8px auto 56px; padding: 32px; border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; }
.lab-quote blockquote { font-family: var(--serif); font-size: 28px; line-height: 1.3; margin: 12px 0 18px; min-height: 2.6em; }
.lab-quote .lab-dots { display: flex; gap: 8px; margin-top: 16px; }
.lab-quote .lab-dots button { width: 8px; height: 8px; padding: 0; border: 0; border-radius: 50%; background: rgba(176, 203, 188, 0.35); cursor: pointer; }
.lab-quote .lab-dots button[aria-current="true"] { background: var(--sage); }
.lab-quote .lab-dots button:focus-visible { outline: 2px solid var(--sage); outline-offset: 3px; }
`;

export default function TestimonialCard() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0); // bumping this restarts the timer (dot click)
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setI((x) => (x + 1) % QUOTES.length), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, tick]);
  const t = QUOTES[i];
  return (
    <section
      data-lab="testimonial-card"
      className="lab-quote"
      aria-label="Testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{css}</style>
      <p className="label">What people say</p>
      <figure aria-live="polite">
        <blockquote data-index={i}>&ldquo;{t.q}&rdquo;</blockquote>
        <figcaption>
          <strong>{t.name}</strong> <span className="label">{t.role}</span>
        </figcaption>
      </figure>
      <div className="lab-dots">
        {QUOTES.map((x, k) => (
          <button
            key={x.name}
            type="button"
            aria-label={`Show quote ${k + 1}`}
            aria-current={k === i}
            onClick={() => { setI(k); setTick((n) => n + 1); }}
          />
        ))}
      </div>
    </section>
  );
}
