"use client";

import { useEffect, useRef, useState } from "react";

type Quote = { text: string; name: string; role: string; file: string };

const Q: Quote[] = [
  { text: "Shipping small kept the forest of work walkable.", name: "Elena Voss", role: "Editor · Example data", file: "avatar-0.svg" },
  { text: "The brief was quiet, so the product could be too.", name: "Sam Okoye", role: "Maker · Example data", file: "avatar-1.svg" },
  { text: "We measured the week by what we left unfinished.", name: "Rin Calder", role: "Guide · Example data", file: "avatar-2.svg" },
];

const css = `
.lab-quote{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6);max-width:100%}
.lab-quote,.lab-quote *{box-sizing:border-box}
.lab-quote h2{font-family:var(--serif);font-weight:400;font-size:clamp(22px,4vw,30px);margin:8px 0 18px;line-height:1.2}
.lab-card{margin:0;border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(20,32,26,.4);max-width:100%}
.lab-card blockquote{margin:0 0 18px;font-family:var(--serif);font-size:clamp(18px,4vw,22px);line-height:1.45;color:#E8EEE9;overflow-wrap:anywhere}
.lab-who{display:flex;align-items:center;gap:12px;min-width:0}
.lab-who strong{display:block;font-family:var(--sans);font-weight:500;color:#F2EFE6}
.lab-ava{width:48px;height:48px;border-radius:50%;flex:0 0 48px;overflow:hidden}
.lab-ava img,.lab-ava span{width:48px;height:48px;display:block}
.lab-ava span{background:rgba(176,203,188,.22)}
.lab-dots{display:flex;gap:10px;margin-top:16px;justify-content:center}
.lab-dots button{width:10px;height:10px;padding:0;border:0;border-radius:50%;background:rgba(176,203,188,.35);cursor:pointer}
.lab-dots button[aria-current="true"]{background:var(--sage,#B0CBBC)}
.lab-dots button:focus{outline:2px solid var(--sage,#B0CBBC);outline-offset:3px}
@media (prefers-reduced-motion:reduce){.lab-card,.lab-quote *{transition:none;animation:none}}
`;

function Avatar({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState(true);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setOk(false);
  }, [src]);
  if (!ok) return <span data-art="fallback" aria-hidden="true" />;
  return <img ref={ref} data-art="image" src={src} width={48} height={48} alt={alt} onError={() => setOk(false)} />;
}

export default function QuoteCard() {
  const [i, setI] = useState(0);
  const [pulse, setPulse] = useState(0);
  const hold = useRef(false);
  const go = (n: number) => { setI(n); setPulse((p) => p + 1); };
  useEffect(() => {
    const id = setInterval(() => { if (!hold.current) setI((n) => (n + 1) % 3); }, 3000);
    return () => clearInterval(id);
  }, [i, pulse]);

  const q = Q[i];
  return (
    <section data-lab="testimonial-card" aria-labelledby="lab-quote-h" className="lab-quote" onMouseEnter={() => { hold.current = true; }} onMouseLeave={() => { hold.current = false; }}>
      <style>{css}</style>
      <p className="label">Quote card · Example data</p>
      <h2 id="lab-quote-h">Notes from the path</h2>
      <figure className="lab-card">
        <blockquote data-index={String(i)}>{q.text}</blockquote>
        <figcaption className="lab-who">
          <span className="lab-ava"><Avatar key={i} src={"/lab/testimonial-card/" + q.file} alt="" /></span>
          <span>
            <strong>{q.name}</strong>
            <span className="label">{q.role}</span>
          </span>
        </figcaption>
      </figure>
      <div className="lab-dots">
        {Q.map((_, n) => (
          <button key={n} type="button" aria-label={"Show quote " + (n + 1)} aria-current={n === i ? "true" : undefined} onClick={() => go(n)} />
        ))}
      </div>
    </section>
  );
}
