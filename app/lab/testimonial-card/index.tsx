"use client";

import { useEffect, useState } from "react";

const QUOTES = [
  {
    text: "The forest mist palette made our launch feel calm and considered.",
    name: "Maya Chen",
    role: "Invented role, product lead",
  },
  {
    text: "We shipped this quote card in one sitting and it still looks like us.",
    name: "Owen Hart",
    role: "Invented role, design partner",
  },
  {
    text: "Rotation, pause on hover, and the dots just work without fuss.",
    name: "Priya Shah",
    role: "Invented role, engineering manager",
  },
];

const css = `
.lab-wrap{width:min(720px,100%);margin:8px auto 56px;padding:0 12px;box-sizing:border-box;color:var(--mist,#F2EFE6)}
.lab-wrap h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 18px;line-height:1.2}
.lab-card{margin:0;padding:24px;border:1px solid rgba(176,203,188,0.28);border-radius:16px;background:rgba(18,26,22,0.35)}
.lab-card blockquote{margin:0 0 18px;font-size:18px;line-height:1.5;overflow-wrap:anywhere}
.lab-card figcaption{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.lab-card img,.lab-fb{width:48px;height:48px;border-radius:50%;object-fit:cover;flex:0 0 48px}
.lab-fb{display:inline-block;background:rgba(176,203,188,0.22)}
.lab-meta{display:flex;flex-direction:column;gap:4px;min-width:0}
.lab-card strong{font-weight:500}
.lab-card .label{font-family:var(--sans);font-weight:500;letter-spacing:0.16em;text-transform:uppercase;font-size:11px;color:var(--sage,#B0CBBC)}
.lab-dots{display:flex;gap:10px;margin:16px 0;justify-content:center}
.lab-dots button{width:10px;height:10px;padding:0;border:0;border-radius:50%;background:rgba(176,203,188,0.35);cursor:pointer}
.lab-dots button[aria-current=true]{background:var(--sage,#B0CBBC)}
.lab-dots button:focus{outline:2px solid var(--sage,#B0CBBC);outline-offset:3px}
.lab-note{margin:0;font-size:14px;color:#E8EEE9}
@media (prefers-reduced-motion:reduce){.lab-wrap *{transition:none}}
`;

export default function Lab() {
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const [broken, setBroken] = useState([false, false, false]);
  const q = QUOTES[i];

  useEffect(() => {
    if (hold || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % 3), 3000);
    return () => clearInterval(t);
  }, [hold, i]);

  function jump(n: number) {
    setI(n);
  }

  return (
    <section data-lab="testimonial-card" aria-labelledby="lab-quotes-title" className="lab-wrap" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
      <h2 id="lab-quotes-title">What people say</h2>
      <figure className="lab-card">
        <blockquote data-index={String(i) as "0" | "1" | "2"}>{q.text}</blockquote>
        <figcaption>
          {broken[i] ? (
            <span data-art="fallback" className="lab-fb" aria-hidden="true" />
          ) : (
            <img data-art="image" src={`/lab/testimonial-card/avatar-${i}.svg`} width={48} height={48} alt="" onError={() => setBroken((b) => b.map((x, k) => (k === i ? true : x)))} />
          )}
          <span className="lab-meta">
            <strong>{q.name}</strong>
            <span className="label">{q.role}</span>
          </span>
        </figcaption>
      </figure>
      <div className="lab-dots">
        {QUOTES.map((_, n) => (
          <button key={n} type="button" aria-label={`Show quote ${n + 1}`} aria-current={n === i ? "true" : undefined} onClick={() => jump(n)} />
        ))}
      </div>
      <p className="lab-note">Example data: these quotes and people are invented.</p>
      <style>{css}</style>
    </section>
  );
}
