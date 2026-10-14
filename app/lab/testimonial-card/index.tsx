"use client";
import { useEffect, useRef, useState } from "react";

const quotes = [
  { q: "The forest path felt shorter once we shared the map.", n: "Mira Chen", r: "Guide · Example data", src: "/lab/testimonial-card/avatar-0.svg", alt: "Mira Chen" },
  { q: "Mist over the ridge is how we know the day has started.", n: "Owen Hale", r: "Ranger · Example data", src: "/lab/testimonial-card/avatar-1.svg", alt: "Owen Hale" },
  { q: "I pack light now. The trail taught me what matters.", n: "Sable Ortiz", r: "Hiker · Example data", src: "/lab/testimonial-card/avatar-2.svg", alt: "Sable Ortiz" },
];

const css = `.lab-quote{box-sizing:border-box;width:min(720px,100%);margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,0.28);border-radius:16px}
.lab-quote .label{font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--sage);margin:0}
.lab-quote h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin:8px 0 20px}
.lab-quote figure{margin:0}
.lab-quote blockquote{margin:0 0 16px;color:#F2EFE6;font-family:var(--serif);font-size:22px;line-height:1.45}
.lab-quote figcaption{display:flex;align-items:center;gap:12px;color:#E8EEE9}
.lab-quote figcaption strong{display:block;font-family:var(--serif);font-weight:400}
.lab-quote .lab-ava,.lab-quote [data-art=fallback]{width:48px;height:48px;border-radius:50%;object-fit:cover;flex:none}
.lab-quote [data-art=fallback]{display:block;background:rgba(176,203,188,.28)}
.lab-dots{display:flex;gap:8px;margin-top:16px}
.lab-dots button{width:10px;height:10px;padding:0;border:0;border-radius:50%;background:rgba(176,203,188,.4);cursor:pointer}
.lab-dots button[aria-current=true]{background:var(--sage)}
.lab-dots button:focus{outline:2px solid var(--sage);outline-offset:3px}
@media (prefers-reduced-motion:reduce){.lab-quote *{animation:none!important;transition:none!important}}`;

export default function QuoteCard() {
  const [i, setI] = useState(0);
  const [art, setArt] = useState(true);
  const hover = useRef(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const img = useRef<HTMLImageElement>(null);
  function arm() {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => { if (!hover.current) setI((n) => (n + 1) % 3); }, 3000);
  }
  useEffect(() => { arm(); return () => { if (timer.current) clearInterval(timer.current); }; }, []);
  useEffect(() => {
    setArt(true);
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setArt(false);
  }, [i]);
  function go(n: number) { setI(n); arm(); }
  const q = quotes[i];

  return (
    <section data-lab="testimonial-card" aria-labelledby="lab-quote-h" className="lab-quote" onMouseEnter={() => { hover.current = true; }} onMouseLeave={() => { hover.current = false; }}>
      <style>{css}</style>
      <p className="label">Example data · Quotes</p>
      <h2 id="lab-quote-h">Voices from the trail</h2>
      <figure>
        <blockquote data-index={i}>{q.q}</blockquote>
        <figcaption>
          {art ? <img ref={img} className="lab-ava" data-art="image" src={q.src} width={48} height={48} alt={q.alt} onError={() => setArt(false)} /> : <span data-art="fallback" aria-hidden="true" />}
          <span><strong>{q.n}</strong><span className="label">{q.r}</span></span>
        </figcaption>
      </figure>
      <div className="lab-dots">
        {quotes.map((_, n) => (
          <button key={n} type="button" aria-label={`Show quote ${n + 1}`} aria-current={n === i ? "true" : undefined} onClick={() => go(n)} />
        ))}
      </div>
    </section>
  );
}

