"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const QUOTES = [
  { q: "The weekend loop finally felt easy to follow after the fog lifted.", n: "Mira Chen", r: "Example data — invented walker" },
  { q: "Wet-morning guests stopped asking which fork to take at the ridge.", n: "Owen Hale", r: "Example data — invented ranger" },
  { q: "People keep asking who sketched the little wayfinding cards.", n: "Priya Nair", r: "Example data — invented host" },
];

const css = `
.lab-wrap{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6);box-sizing:border-box}
.lab-wrap *{box-sizing:border-box}
.lab-wrap h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 20px}
.lab-card{margin:0;padding:24px;border:1px solid rgba(176,203,188,0.28);border-radius:16px}
.lab-card blockquote{margin:0 0 16px;font-family:var(--serif);font-size:1.25rem;line-height:1.45;color:#E8EEE9;overflow-wrap:anywhere}
.lab-card figcaption{display:flex;flex-wrap:wrap;align-items:center;gap:10px 12px}
.lab-card strong{font-family:var(--sans);font-weight:500}
.lab-card .label{font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:11px;color:var(--sage)}
.lab-ava{width:48px;height:48px;border-radius:50%;object-fit:cover;flex:0 0 48px}
span.lab-ava{background:rgba(176,203,188,.22)}
.lab-dots{display:flex;gap:10px;margin:18px 0 16px}
.lab-dots button{width:10px;height:10px;padding:0;border:0;border-radius:50%;background:rgba(176,203,188,.35);cursor:pointer}
.lab-dots button[aria-current="true"]{background:var(--sage)}
.lab-dots button:focus-visible{outline:2px solid var(--sage);outline-offset:3px}
.lab-note{margin:0;font-size:14px;color:#E8EEE9}
@media (prefers-reduced-motion:reduce){.lab-wrap *{animation:none;transition:none}}
`;

export default function QuoteCard() {
  const [i, setI] = useState(0);
  const [ok, setOk] = useState(true);
  const hold = useRef(false);
  const pic = useRef<HTMLImageElement>(null);
  const go = useCallback((n: number) => {
    setI(n);
    setOk(true);
  }, []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (!hold.current) setI((v) => (v + 1) % 3);
    }, 3000);
    return () => clearInterval(id);
  }, [i]);
  useEffect(() => {
    setOk(true);
    const el = pic.current;
    if (el && el.complete && el.naturalWidth === 0) setOk(false);
  }, [i]);
  const item = QUOTES[i];

  return (
    <section data-lab="testimonial-card" aria-labelledby="lab-q-h" className="lab-wrap" onMouseEnter={() => { hold.current = true; }} onMouseLeave={() => { hold.current = false; }}>
      <style>{css}</style>
      <h2 id="lab-q-h">What people say</h2>
      <figure className="lab-card">
        <blockquote data-index={i}>{item.q}</blockquote>
        <figcaption>
          {ok ? (
            <img ref={pic} data-art="image" src={`/lab/testimonial-card/avatar-${i}.svg`} width={48} height={48} alt="" className="lab-ava" onError={() => setOk(false)} />
          ) : (
            <span data-art="fallback" aria-hidden="true" className="lab-ava" />
          )}
          <strong>{item.n}</strong>
          <span className="label">{item.r}</span>
        </figcaption>
      </figure>
      <div className="lab-dots">
        {QUOTES.map((_, n) => (
          <button key={n} type="button" aria-label={`Show quote ${n + 1}`} aria-current={n === i ? "true" : undefined} onClick={() => go(n)} />
        ))}
      </div>
      <p className="lab-note">Example data: these quotes and people are invented.</p>
    </section>
  );
}
