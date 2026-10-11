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
.lab-quote .lab-controls { display: flex; align-items: center; gap: 12px; margin-top: 16px; }
.lab-quote .lab-controls .lab-dots { margin-top: 0; }
.lab-quote .lab-toggle { font: inherit; font-size: 13px; padding: 4px 10px; border: 1px solid rgba(176, 203, 188, 0.35); border-radius: 999px; background: transparent; color: inherit; cursor: pointer; }
.lab-quote .lab-toggle:focus-visible { outline: 2px solid var(--sage); outline-offset: 3px; }
@media (max-width: 480px) {
  .lab-quote { padding: 20px 16px; }
  .lab-quote blockquote { font-size: clamp(19px, 5.5vw, 24px); min-height: 5.2em; }
}
`;

export default function TestimonialCard() {
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [userDriven, setUserDriven] = useState(false); // last change came from a click, so announce it
  const [tick, setTick] = useState(0); // bumping this restarts the timer (dot click)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  const paused = hover || focused || userPaused || reducedMotion;
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => { setUserDriven(false); setI((x) => (x + 1) % QUOTES.length); }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, tick]);
  const t = QUOTES[i];
  return (
    <section
      data-lab="testimonial-card"
      className="lab-quote"
      aria-label="Testimonials"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onTouchStart={() => setHover(true)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false); }}
    >
      <style>{css}</style>
      <p className="label">What people say</p>
      <figure aria-live={userDriven ? "polite" : "off"}>
        <blockquote data-index={i}>&ldquo;{t.q}&rdquo;</blockquote>
        <figcaption>
          <strong>{t.name}</strong> <span className="label">{t.role}</span>
        </figcaption>
      </figure>
      <div className="lab-controls">
      <button
        type="button"
        className="lab-toggle"
        aria-label={userPaused ? "Play testimonials" : "Pause testimonials"}
        aria-pressed={userPaused}
        onClick={() => setUserPaused((p) => !p)}
      >
        {userPaused ? "Play" : "Pause"}
      </button>
      <div className="lab-dots">
        {QUOTES.map((x, k) => (
          <button
            key={x.name}
            type="button"
            aria-label={`Show quote ${k + 1}`}
            aria-current={k === i}
            onClick={() => { setUserDriven(true); setI(k); setTick((n) => n + 1); }}
          />
        ))}
      </div>
      </div>
    </section>
  );
}
