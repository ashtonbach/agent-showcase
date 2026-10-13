"use client";

import { useEffect, useRef, useState } from "react";

const QUOTES = [
  { name: "Lena Ortega", role: "Product lead · Example data", text: "The forest-mist palette made our dashboard feel calm without losing contrast.", alt: "Portrait of Lena Ortega" },
  { name: "Marcus Bell", role: "Design partner · Example data", text: "We shipped the review flow in a week because the card pattern was already there.", alt: "Portrait of Marcus Bell" },
  { name: "Asha Reddy", role: "Founder · Example data", text: "Customers quote this block back to us — it sounds like they actually talk.", alt: "Portrait of Asha Reddy" },
];

const css = `.lab-t{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6);box-sizing:border-box;padding:0 12px}
.lab-t .label{font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:12px;margin:0}
.lab-t h2{font-family:var(--serif);font-weight:400;font-size:clamp(22px,5vw,30px);line-height:1.2;margin:8px 0 20px}
.lab-card{margin:0;border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px}
.lab-card blockquote{margin:0 0 16px;font-family:var(--serif);font-size:clamp(18px,4vw,22px);line-height:1.45;overflow-wrap:anywhere}
.lab-who{display:flex;align-items:center;gap:12px;min-width:0}
.lab-ava{width:48px;height:48px;border-radius:50%;object-fit:cover}
.lab-fb{display:block;width:48px;height:48px;border-radius:50%;background:rgba(176,203,188,.22)}
.lab-dots{display:flex;gap:10px;margin:16px 0 0}
.lab-dots button{width:12px;height:12px;padding:0;border-radius:50%;border:1px solid var(--sage);background:transparent;cursor:pointer}
.lab-dots button[aria-current="true"]{background:var(--sage)}
.lab-dots button:focus{outline:2px solid var(--sage);outline-offset:3px}
`;

function Avatar({ n, alt }: { n: number; alt: string }) {
  const [ok, setOk] = useState(true);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    setOk(true);
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setOk(false);
  }, [n]);
  if (!ok) return <span data-art="fallback" className="lab-fb" aria-hidden="true" />;
  return (
    <img ref={ref} data-art="image" className="lab-ava" src={"/lab/testimonial-card/avatar-" + n + ".svg"} width={48} height={48} alt={alt} onError={() => setOk(false)} />
  );
}

export default function Lab() {
  const [i, setI] = useState(0);
  const [tick, setTick] = useState(0);
  const hold = useRef(false);
  useEffect(() => {
    const id = window.setInterval(() => {
      if (hold.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      setI((v) => (v + 1) % 3);
    }, 3000);
    return () => clearInterval(id);
  }, [i, tick]);
  const q = QUOTES[i];
  const jump = (n: number) => { setI(n); setTick((t) => t + 1); };

  return (
    <section data-lab="testimonial-card" className="lab-t" aria-labelledby="lab-t-title" onMouseEnter={() => { hold.current = true; }} onMouseLeave={() => { hold.current = false; }}>
      <p className="label">Voices · Example data</p>
      <h2 id="lab-t-title">What teams tell us</h2>
      <figure className="lab-card">
        <blockquote data-index={i}>{q.text}</blockquote>
        <figcaption className="lab-who">
          <Avatar n={i} alt={q.alt} />
          <span>
            <strong>{q.name}</strong>
            <span className="label">{q.role}</span>
          </span>
        </figcaption>
      </figure>
      <div className="lab-dots">
        {QUOTES.map((_, n) => (
          <button key={n} type="button" aria-label={"Show quote " + (n + 1)} aria-current={n === i ? "true" : undefined} onClick={() => jump(n)} />
        ))}
      </div>
      <style>{css}</style>
    </section>
  );
}
