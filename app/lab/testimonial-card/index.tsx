"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const QUOTES = [
  {
    text: "The trail felt like a second home after one quiet weekend with this crew.",
    name: "Mira Chen",
    role: "Example data — trail lead (invented)",
  },
  {
    text: "Clear maps, patient guides, and mornings that actually stay unhurried.",
    name: "Jonah Hale",
    role: "Example data — weekend hiker (invented)",
  },
  {
    text: "I booked a second trip before we even reached the last overlook.",
    name: "Priya Nair",
    role: "Example data — guest (invented)",
  },
];

const css = `
.lab-quote{width:min(720px,100%);max-width:100%;margin:8px auto 56px;box-sizing:border-box;padding:0 8px;color:var(--mist,#F2EFE6)}
.lab-quote h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;margin:0 0 20px;color:var(--mist,#F2EFE6)}
.lab-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;background:rgba(20,32,26,0.35);box-sizing:border-box;overflow-wrap:anywhere}
.lab-card blockquote{margin:0 0 20px;font-family:var(--serif);font-size:20px;line-height:1.45;color:#E8EEE9}
.lab-card figcaption{display:flex;align-items:center;gap:12px}
.lab-card strong{display:block;font-family:var(--sans);font-weight:500;color:var(--mist,#F2EFE6)}
.lab-card .label{display:block;font-family:var(--sans);font-weight:500;letter-spacing:0.16em;text-transform:uppercase;font-size:11px;color:var(--sage,#B0CBBC);margin-top:4px}
.lab-ava,.lab-ava img,.lab-ava [data-art=fallback]{width:48px;height:48px;border-radius:50%;flex:0 0 48px}
.lab-ava img{object-fit:cover;display:block}
.lab-ava [data-art=fallback]{display:block;background:rgba(176,203,188,0.22)}
.lab-dots{display:flex;gap:8px;margin:16px 0 12px;justify-content:center}
.lab-dots button{width:10px;height:10px;padding:0;border:0;border-radius:50%;background:rgba(176,203,188,0.35);cursor:pointer}
.lab-dots button[aria-current=true]{background:var(--sage,#B0CBBC)}
.lab-dots button:focus{outline:2px solid var(--sage,#B0CBBC);outline-offset:3px}
.lab-note{margin:0;font-family:var(--sans);font-size:14px;color:#E8EEE9;text-align:center}
`;

function Avatar({ i }: { i: number }) {
  const [ok, setOk] = useState(true);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => { setOk(true); }, [i]);
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setOk(false);
  }, [i, ok]);
  if (!ok) return <span data-art="fallback" aria-hidden="true" />;
  return (
    <img ref={ref} data-art="image" src={`/lab/testimonial-card/avatar-${i}.svg`} width={48} height={48} alt="" onError={() => setOk(false)} />
  );
}

export default function QuoteCard() {
  const [i, setI] = useState(0);
  const hover = useRef(false);
  const jump = useCallback((n: number) => setI(n), []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => { if (!hover.current) setI((v) => (v + 1) % 3); }, 3000);
    return () => clearInterval(t);
  }, [i]);
  const q = QUOTES[i];

  return (
    <section data-lab="testimonial-card" aria-labelledby="lab-quote-title" className="lab-quote" onMouseEnter={() => { hover.current = true; }} onMouseLeave={() => { hover.current = false; }}>
      <h2 id="lab-quote-title">What people say</h2>
      <figure className="lab-card">
        <blockquote data-index={i}>{q.text}</blockquote>
        <figcaption>
          <span className="lab-ava"><Avatar i={i} /></span>
          <span>
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
