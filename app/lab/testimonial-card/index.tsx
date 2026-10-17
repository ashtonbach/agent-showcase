"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const Q = [
  { t: "The onboarding felt calm and clear from the first screen.", n: "Mira Ellison", r: "Example data — invented product lead" },
  { t: "I finally saw the whole pipeline without switching tools.", n: "Jonah Hale", r: "Example data — invented designer" },
  { t: "Reviews landed in one place and the team actually used them.", n: "Priya Shah", r: "Example data — invented engineer" },
];

const css = `
.lab-wrap{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6)}
.lab-wrap h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 20px}
.lab-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px}
.lab-card blockquote{margin:0 0 16px;font-size:18px;line-height:1.5}
.lab-cap{display:flex;align-items:center;gap:12px}
.lab-cap strong{display:block;font-weight:600}
.lab-cap .label{font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:11px;color:var(--sage)}
.lab-av,.lab-fb{width:48px;height:48px;border-radius:50%;flex-shrink:0}
.lab-av{object-fit:cover}
.lab-fb{display:block;background:rgba(176,203,188,.22)}
.lab-dots{display:flex;gap:8px;margin:16px 0;justify-content:center}
.lab-dots button{width:10px;height:10px;padding:0;border:0;border-radius:50%;background:rgba(176,203,188,.35);cursor:pointer}
.lab-dots button[aria-current="true"]{background:var(--sage,#A8C4B4)}
.lab-dots button:focus{outline:2px solid var(--sage);outline-offset:3px}
.lab-note{margin:0;font-size:14px;color:#E8EEE9}
@media (prefers-reduced-motion:reduce){.lab-card{transition:none}}
`;

function Av({ i }: { i: number }) {
  const [fb, setFb] = useState(false);
  const r = useRef<HTMLImageElement>(null);
  useEffect(() => {
    setFb(false);
    const el = r.current;
    if (el && el.complete && el.naturalWidth === 0) setFb(true);
  }, [i]);
  if (fb) return <span data-art="fallback" aria-hidden="true" className="lab-fb" />;
  return (
    <img ref={r} className="lab-av" data-art="image" src={`/lab/testimonial-card/avatar-${i}.svg`} width={48} height={48} alt="" onError={() => setFb(true)} />
  );
}

export default function Lab() {
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const go = useCallback((n: number) => setI(n), []);
  useEffect(() => {
    if (hold) return;
    const t = setInterval(() => setI((x) => (x + 1) % 3), 3000);
    return () => clearInterval(t);
  }, [hold, i]);
  const q = Q[i];
  return (
    <section data-lab="testimonial-card" aria-labelledby="lab-tc-h" className="lab-wrap" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
      <style>{css}</style>
      <h2 id="lab-tc-h">What people say</h2>
      <figure className="lab-card">
        <blockquote data-index={String(i)}>{q.t}</blockquote>
        <figcaption className="lab-cap">
          <Av i={i} />
          <span>
            <strong>{q.n}</strong>
            <span className="label">{q.r}</span>
          </span>
        </figcaption>
      </figure>
      <div className="lab-dots">
        {Q.map((_, n) => (
          <button key={n} type="button" aria-label={`Show quote ${n + 1}`} aria-current={n === i ? "true" : undefined} onClick={() => go(n)} />
        ))}
      </div>
      <p className="lab-note">Example data: these quotes and people are invented.</p>
    </section>
  );
}
