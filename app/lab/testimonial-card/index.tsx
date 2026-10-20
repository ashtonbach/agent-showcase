"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const Q = [
  { t: "The forest palette made our product feel calm without losing clarity.", n: "Mira Chen", r: "Design lead (invented)", a: "/lab/testimonial-card/avatar-0.svg" },
  { t: "Shipping felt steady: fewer surprises in review on every breakpoint.", n: "Jonas Okonkwo", r: "Engineering manager (invented)", a: "/lab/testimonial-card/avatar-1.svg" },
  { t: "Clients noticed the polish first; we noticed less rework afterward.", n: "Elena Vasquez", r: "Studio founder (invented)", a: "/lab/testimonial-card/avatar-2.svg" },
];

const css = `[data-lab="testimonial-card"]{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#E8EEE9)}
.lab-tc-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;margin:0 0 20px}
[data-lab="testimonial-card"] blockquote{margin:0 0 20px;font-family:var(--serif);font-size:1.25rem;line-height:1.45}
.lab-tc-cap{display:flex;align-items:center;gap:14px}
.lab-tc-av{width:48px;height:48px;border-radius:50%;object-fit:cover;flex-shrink:0}
.lab-tc-av-f{width:48px;height:48px;border-radius:50%;background:rgba(176,203,188,.25);flex-shrink:0}
.lab-tc-meta strong{display:block;font-weight:500;color:var(--mist,#F2EFE6)}
[data-lab="testimonial-card"] .label{font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:.7rem;color:var(--sage,#B0CBBC)}
.lab-dots{display:flex;justify-content:center;gap:10px;margin-bottom:16px}
.lab-dots button{width:10px;height:10px;padding:0;border:0;border-radius:50%;background:rgba(176,203,188,.35);cursor:pointer}
.lab-dots button[aria-current="true"]{background:var(--sage,#B0CBBC)}
.lab-dots button:focus-visible{outline:2px solid var(--sage,#B0CBBC);outline-offset:3px}
.lab-note{font-size:.875rem;color:rgba(232,238,233,.75);margin:0;text-align:center}
@media (prefers-reduced-motion:reduce){[data-lab="testimonial-card"] *{transition:none!important}}`;

export default function TestimonialCard() {
  const [idx, setIdx] = useState(0);
  const [pause, setPause] = useState(false);
  const [badAv, setBadAv] = useState<Record<number, boolean>>({});
  const iv = useRef<ReturnType<typeof setInterval> | null>(null);
  const stop = useCallback(() => { if (iv.current) { clearInterval(iv.current); iv.current = null; } }, []);
  const tick = useCallback(() => { stop(); iv.current = setInterval(() => setIdx((i) => (i + 1) % 3), 3000); }, [stop]);
  const pick = useCallback((i: number) => { setIdx(i); tick(); }, [tick]);
  useEffect(() => { if (pause) stop(); else tick(); return stop; }, [pause, tick, stop]);
  const c = Q[idx];
  return (
    <section data-lab="testimonial-card" aria-labelledby="tc-h" onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)}>
      <style>{css}</style>
      <h2 id="tc-h">What people say</h2>
      <figure className="lab-tc-card">
        <blockquote data-index={String(idx)}>&ldquo;{c.t}&rdquo;</blockquote>
        <figcaption className="lab-tc-cap">
          {badAv[idx] ? (
            <span className="lab-tc-av-f" data-art="fallback" aria-hidden="true" />
          ) : (
            <img className="lab-tc-av" data-art="image" src={c.a} width={48} height={48} alt="" onError={() => setBadAv((m) => ({ ...m, [idx]: true }))} />
          )}
          <div className="lab-tc-meta"><strong>{c.n}</strong><span className="label">{c.r}</span></div>
        </figcaption>
      </figure>
      <div className="lab-dots">
        {Q.map((_, i) => (
          <button key={i} type="button" aria-label={`Show quote ${i + 1}`} aria-current={i === idx ? "true" : undefined} onClick={() => pick(i)} />
        ))}
      </div>
      <p className="lab-note">Example data: these quotes and people are invented.</p>
    </section>
  );
}
