"use client";
import { useEffect, useRef, useState } from "react";

const Q = [
  { t: "The forest path felt like a second home.", n: "Mira Ellison", r: "Invented traveler" },
  { t: "Quiet mornings here reset my whole week.", n: "Theo Marsh", r: "Invented neighbor" },
  { t: "I keep coming back for the mist and the light.", n: "Sable Wren", r: "Invented guest" },
];

const css = `
.lab-wrap{max-width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6);box-sizing:border-box;padding:0 16px}
.lab-wrap h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 16px;line-height:1.2}
.lab-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;margin:0}
.lab-card blockquote{margin:0 0 18px;font-size:1.15rem;line-height:1.45;color:#E8EEE9}
.lab-cap{display:flex;align-items:center;gap:12px}
.lab-ava{width:48px;height:48px;border-radius:50%;object-fit:cover;display:block;flex:none}
.lab-fb{width:48px;height:48px;border-radius:50%;display:block;flex:none;background:rgba(176,203,188,0.22)}
.lab-card strong{display:block;font-weight:500}
.lab-card .label{display:block;font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:11px;color:var(--sage,#B0CBBC)}
.lab-dots{display:flex;gap:10px;margin:16px 0 12px;align-items:center}
.lab-dots button{width:10px;height:10px;padding:0;border:0;border-radius:50%;background:rgba(176,203,188,.35);cursor:pointer}
.lab-dots button[aria-current="true"]{background:var(--sage,#B0CBBC)}
.lab-dots button:focus{outline:2px solid var(--sage,#B0CBBC);outline-offset:3px}
.lab-note{margin:0;font-size:14px;color:#E8EEE9}
@media (prefers-reduced-motion:reduce){.lab-card,.lab-ava{transition:none}}
`;

export default function Lab() {
  const [i, setI] = useState(0);
  const [broken, setBroken] = useState("");
  const hov = useRef(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const start = () => {
    if (timer.current) clearInterval(timer.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = setInterval(() => {
      if (!hov.current) setI((x) => (x + 1) % 3);
    }, 3000);
  };
  useEffect(() => {
    start();
    return () => { if (timer.current) clearInterval(timer.current); };
  }, []);
  const go = (n: number) => { setI(n); start(); };
  const q = Q[i];
  const src = `/lab/testimonial-card/avatar-${i}.svg`;

  return (
    <section data-lab="testimonial-card" aria-labelledby="lab-quote-h" className="lab-wrap"
      onMouseEnter={() => { hov.current = true; }}
      onMouseLeave={() => { hov.current = false; }}>
      <style>{css}</style>
      <h2 id="lab-quote-h">What people say</h2>
      <figure className="lab-card">
        <blockquote data-index={i}>{q.t}</blockquote>
        <figcaption className="lab-cap">
          {broken === src ? (
            <span data-art="fallback" aria-hidden="true" className="lab-fb" />
          ) : (
            <img data-art="image" className="lab-ava" src={src} width={48} height={48} alt="" onError={() => setBroken(src)} />
          )}
          <div>
            <strong>{q.n}</strong>
            <span className="label">{q.r}</span>
          </div>
        </figcaption>
      </figure>
      <div className="lab-dots">
        {Q.map((_, n) => (
          <button key={n} type="button" aria-label={`Show quote ${n + 1}`}
            aria-current={n === i ? "true" : undefined} onClick={() => go(n)} />
        ))}
      </div>
      <p className="lab-note">Example data: these quotes and people are invented.</p>
    </section>
  );
}
