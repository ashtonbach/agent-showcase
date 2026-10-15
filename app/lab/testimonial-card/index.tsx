"use client";
import { useEffect, useRef, useState } from "react";

const Q = [
  { t: "The forest mist screens feel calm. Every detail earns its place.", n: "Mira Chen", r: "Product designer (example, invented)" },
  { t: "Reviews got quieter. We ship with more care and fewer late surprises.", n: "Jonah Hale", r: "Engineering lead (example, invented)" },
  { t: "Customers notice the quiet craft first. That is the whole point.", n: "Priya Nair", r: "Founder (example, invented)" },
];

const CSS = `
.lab-tc{max-width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6);padding:0 16px;box-sizing:border-box}
.lab-tc *,.lab-tc *::before,.lab-tc *::after{box-sizing:border-box}
.lab-tc h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 20px;color:var(--mist,#F2EFE6)}
.lab-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;margin:0}
.lab-card blockquote{margin:0 0 16px;font-size:18px;line-height:1.5;overflow-wrap:anywhere}
.lab-cap{display:flex;align-items:center;gap:12px}
.lab-cap img,.lab-fb{width:48px;height:48px;border-radius:50%;object-fit:cover;flex-shrink:0}
.lab-fb{display:block;background:rgba(176,203,188,0.22)}
.lab-who{display:flex;flex-direction:column;gap:4px;min-width:0}
.lab-who strong{font-weight:600;color:var(--mist,#F2EFE6)}
.lab-who .label{font-family:var(--sans);font-weight:500;letter-spacing:0.16em;text-transform:uppercase;font-size:11px;color:var(--sage,#B0CBBC)}
.lab-dots{display:flex;gap:8px;justify-content:center;margin:16px 0 0}
.lab-dots button{width:10px;height:10px;padding:0;border:0;border-radius:50%;background:rgba(176,203,188,0.35);cursor:pointer}
.lab-dots button[aria-current="true"]{background:var(--sage,#B0CBBC)}
.lab-dots button:focus{outline:2px solid var(--sage,#B0CBBC);outline-offset:3px}
.lab-note{margin:16px 0 0;font-size:14px;color:#E8EEE9;letter-spacing:normal;text-transform:none}
@media (prefers-reduced-motion:reduce){.lab-tc *{transition:none;animation:none}}
`;

function Avatar({ i }: { i: number }) {
  const [bad, setBad] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    setBad(false);
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setBad(true);
  }, [i]);
  if (bad) return <span data-art="fallback" aria-hidden="true" className="lab-fb" />;
  return (
    <img ref={ref} data-art="image" src={`/lab/testimonial-card/avatar-${i}.svg`} width={48} height={48} alt="" onError={() => setBad(true)} />
  );
}

export default function Lab() {
  const [i, setI] = useState(0);
  const [hov, setHov] = useState(false);
  useEffect(() => {
    if (hov) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((x) => (x + 1) % 3), 3000);
    return () => clearInterval(id);
  }, [i, hov]);
  const q = Q[i];

  return (
    <section data-lab="testimonial-card" className="lab-tc" aria-labelledby="lab-tc-title" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <h2 id="lab-tc-title">What people say</h2>
      <figure className="lab-card">
        <blockquote data-index={String(i)}>{q.t}</blockquote>
        <figcaption className="lab-cap">
          <Avatar i={i} />
          <span className="lab-who">
            <strong>{q.n}</strong>
            <span className="label">{q.r}</span>
          </span>
        </figcaption>
      </figure>
      <div className="lab-dots">
        {Q.map((_, n) => (
          <button key={n} type="button" aria-label={`Show quote ${n + 1}`} aria-current={i === n ? "true" : undefined} onClick={() => setI(n)} />
        ))}
      </div>
      <p className="lab-note">Example data: these quotes and people are invented.</p>
      <style>{CSS}</style>
    </section>
  );
}

