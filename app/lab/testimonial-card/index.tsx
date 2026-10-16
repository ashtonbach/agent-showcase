"use client";
import { useEffect, useState } from "react";

const Q = [
  { name: "Mara Ellison", role: "Invented product lead", text: "The handoff felt calm — we always knew what was next." },
  { name: "Theo Brennan", role: "Invented design partner", text: "The card stays quiet so the quote can do the talking." },
  { name: "Nia Colter", role: "Invented community host", text: "People linger on the words, then tap a name they trust." },
];

const css = `
.lab-q{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6);box-sizing:border-box}
.lab-q h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;margin:0 0 18px}
.lab-card{margin:0;border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px}
.lab-card blockquote{margin:0 0 18px;font-size:18px;line-height:1.45;color:#E8EEE9;overflow-wrap:anywhere}
.lab-card figcaption{display:flex;align-items:center;gap:12px}
.lab-card img,.lab-ph{width:48px;height:48px;border-radius:50%;object-fit:cover;flex:none}
.lab-ph{display:block;background:rgba(176,203,188,.22)}
.lab-who{min-width:0}
.lab-who strong{display:block;font-weight:500}
.label{display:block;font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:11px;color:var(--sage);margin-top:4px}
.lab-dots{display:flex;gap:10px;justify-content:center;margin:16px 0}
.lab-dots button{width:10px;height:10px;padding:0;border-radius:50%;border:1px solid var(--sage);background:transparent;cursor:pointer}
.lab-dots button[aria-current="true"]{background:var(--sage)}
.lab-dots button:focus{outline:2px solid var(--sage);outline-offset:3px}
.lab-note{margin:0;font-size:14px;line-height:1.4;color:#E8EEE9}
@media (prefers-reduced-motion:reduce){.lab-q *{transition:none}}
`;

function Face({ n, alt }: { n: number; alt: string }) {
  const [ok, setOk] = useState(true);
  const [node, setNode] = useState<HTMLImageElement | null>(null);
  useEffect(() => { setOk(true); }, [n]);
  useEffect(() => {
    if (node && node.complete && node.naturalWidth === 0) setOk(false);
  }, [node, n]);
  if (!ok) return <span data-art="fallback" className="lab-ph" aria-hidden="true" />;
  return (
    <img data-art="image" src={"/lab/testimonial-card/avatar-" + n + ".svg"}
      width={48} height={48} alt={alt} onError={() => setOk(false)} ref={setNode} />
  );
}

export default function QuoteCard() {
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const [kick, setKick] = useState(0);
  useEffect(() => {
    if (hold || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % 3), 3000);
    return () => clearInterval(t);
  }, [hold, kick]);
  const go = (n: number) => { setI(n); setKick((k) => k + 1); };
  const q = Q[i];
  return (
    <section data-lab="testimonial-card" className="lab-q" aria-labelledby="lab-q-title"
      onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
      <h2 id="lab-q-title">What people say</h2>
      <figure className="lab-card">
        <blockquote data-index={i}>{q.text}</blockquote>
        <figcaption>
          <Face n={i} alt={q.name} />
          <div className="lab-who">
            <strong>{q.name}</strong>
            <span className="label">{q.role}</span>
          </div>
        </figcaption>
      </figure>
      <div className="lab-dots">
        {Q.map((_, n) => (
          <button key={n} type="button" aria-label={"Show quote " + (n + 1)}
            aria-current={n === i ? "true" : undefined} onClick={() => go(n)} />
        ))}
      </div>
      <style>{css}</style>
      <p className="lab-note">Example data: these quotes and people are invented.</p>
    </section>
  );
}
