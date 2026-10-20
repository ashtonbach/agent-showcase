"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const Q = [
  { t: "The forest mist palette made our page feel calm without losing clarity.", n: "Mira Ellwood", r: "Invented product lead", a: "/lab/testimonial-card/avatar-0.svg" },
  { t: "Cards that pause on hover are small details readers actually notice.", n: "Jonah Pike", r: "Invented design writer", a: "/lab/testimonial-card/avatar-1.svg" },
  { t: "Even invented quotes need structure—dots, focus rings, and readable type.", n: "Sable Ren", r: "Invented reviewer", a: "/lab/testimonial-card/avatar-2.svg" },
];

const css = `[data-lab="testimonial-card"]{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#f2efe6);font-family:var(--sans,system-ui,sans-serif)}
[data-lab="testimonial-card"] h2{font-family:var(--serif,Georgia,serif);font-weight:400;font-size:30px;margin:0 0 20px}
[data-lab="testimonial-card"] .lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.35)}
[data-lab="testimonial-card"] figure{margin:0}[data-lab="testimonial-card"] blockquote{margin:0 0 20px;line-height:1.55;color:#e8eee9}
[data-lab="testimonial-card"] figcaption{display:flex;align-items:center;gap:14px}
[data-lab="testimonial-card"] .lab-av{width:48px;height:48px;border-radius:50%;overflow:hidden;background:rgba(176,203,188,.15);flex-shrink:0}
[data-lab="testimonial-card"] .lab-av img{width:48px;height:48px;display:block}
[data-lab="testimonial-card"] .lab-av [data-art="fallback"]{display:block;width:48px;height:48px;background:rgba(176,203,188,.25)}
[data-lab="testimonial-card"] .label{display:block;margin-top:4px;font-size:.72rem;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--sage,#b0cbbc)}
[data-lab="testimonial-card"] .lab-dots{display:flex;justify-content:center;gap:10px;margin-top:20px}
[data-lab="testimonial-card"] .lab-dots button{width:10px;height:10px;padding:0;border:0;border-radius:50%;background:rgba(176,203,188,.35);cursor:pointer}
[data-lab="testimonial-card"] .lab-dots button[aria-current="true"]{background:var(--sage,#b0cbbc)}
[data-lab="testimonial-card"] .lab-dots button:focus-visible{outline:2px solid var(--sage,#b0cbbc);outline-offset:3px}
[data-lab="testimonial-card"] .lab-note{margin:24px 0 0;font-size:.9rem;color:rgba(242,239,230,.75)}`;

function Av({ src }: { src: string }) {
  const [bad, setBad] = useState(false);
  return (
    <span className="lab-av">
      {bad ? <span data-art="fallback" aria-hidden="true" /> : (
        <img data-art="image" src={src} width={48} height={48} alt="" onError={() => setBad(true)} />
      )}
    </span>
  );
}

export default function TestimonialCardLab() {
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const reduced = useRef(false);

  const arm = useCallback(() => {
    if (tick.current) clearInterval(tick.current);
    if (reduced.current || hover) { tick.current = null; return; }
    tick.current = setInterval(() => setI((x) => (x + 1) % Q.length), 3000);
  }, [hover]);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    arm();
    return () => { if (tick.current) clearInterval(tick.current); };
  }, [arm]);

  useEffect(() => { arm(); }, [hover, arm]);

  const pick = (n: number) => { setI(n); arm(); };
  const c = Q[i];

  return (
    <section data-lab="testimonial-card" aria-labelledby="tc-title" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <style>{css}</style>
      <h2 id="tc-title">What people say</h2>
      <div className="lab-card">
        <figure>
          <blockquote data-index={i}>{c.t}</blockquote>
          <figcaption>
            <Av src={c.a} />
            <div><strong>{c.n}</strong><span className="label">{c.r}</span></div>
          </figcaption>
        </figure>
        <div className="lab-dots">
          {Q.map((_, k) => (
            <button key={k} type="button" aria-label={`Show quote ${k + 1}`} aria-current={k === i ? "true" : undefined} onClick={() => pick(k)} />
          ))}
        </div>
      </div>
      <p className="lab-note">Example data: these quotes and people are invented.</p>
    </section>
  );
}
