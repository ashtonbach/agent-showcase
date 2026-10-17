"use client";
import { useEffect, useState } from "react";

const Q = [
  { q: "The trail felt like home after one quiet afternoon.", n: "Mira Ellison", r: "Example visitor, invented" },
  { q: "Green, still, and easy to linger. We came back that week.", n: "Jonah Hale", r: "Example guest, invented" },
  { q: "I wait for the mist hours now. The light does the rest.", n: "Priya Sen", r: "Example neighbor, invented" },
];

const css = `.lab-wrap{display:block;width:min(720px,100%);margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,.28);border-radius:16px;box-sizing:border-box;color:var(--mist,#F2EFE6);overflow:hidden}.lab-wrap h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;margin:0 0 16px;color:var(--mist,#F2EFE6)}.lab-wrap figure{margin:0}.lab-wrap blockquote{margin:0 0 16px;font-family:var(--serif);font-size:20px;line-height:1.45;overflow-wrap:anywhere}.lab-wrap figcaption{display:flex;align-items:center;gap:12px;min-width:0}.lab-wrap img,.lab-fb{width:48px;height:48px;border-radius:50%;object-fit:cover;flex:0 0 48px}.lab-fb{display:block;background:rgba(176,203,188,.22)}.lab-wrap strong{display:block;font-family:var(--sans);font-weight:500;color:var(--mist,#F2EFE6)}.lab-wrap .label{display:block;font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:11px;color:var(--sage)}.lab-dots{display:flex;gap:8px;margin:20px 0 0;justify-content:center}.lab-dots button{width:10px;height:10px;padding:0;border:0;border-radius:50%;background:rgba(176,203,188,.35);cursor:pointer}.lab-dots button[aria-current="true"]{background:var(--sage)}.lab-dots button:focus{outline:2px solid var(--sage);outline-offset:3px}.lab-note{margin:16px 0 0;font-family:var(--sans);font-size:13px;letter-spacing:normal;text-transform:none;color:#E8EEE9}@media(prefers-reduced-motion:reduce){.lab-wrap *{transition:none;animation:none}}`;

function Av({ i, alt }: { i: number; alt: string }) {
  const [ok, setOk] = useState(true);
  useEffect(() => {
    setOk(true);
  }, [i]);
  return ok ? (
    <img
      key={i}
      data-art="image"
      src={"/lab/testimonial-card/avatar-" + i + ".svg"}
      width={48}
      height={48}
      alt={alt}
      onError={() => setOk(false)}
      onLoad={(e) => {
        if (e.currentTarget.naturalWidth === 0) setOk(false);
      }}
      ref={(el) => {
        if (el && el.complete && el.naturalWidth === 0) setOk(false);
      }}
    />
  ) : (
    <span data-art="fallback" aria-hidden="true" className="lab-fb" />
  );
}

export default function Lab() {
  const [i, setI] = useState(0);
  const [hov, setHov] = useState(false);
  useEffect(() => {
    if (hov || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((x) => (x + 1) % 3), 3000);
    return () => clearInterval(id);
  }, [i, hov]);
  const t = Q[i];
  return (
    <section data-lab="testimonial-card" aria-labelledby="lab-tc-h" className="lab-wrap" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <h2 id="lab-tc-h">What people say</h2>
      <figure>
        <blockquote data-index={String(i)}>{t.q}</blockquote>
        <figcaption>
          <Av i={i} alt="" />
          <span>
            <strong>{t.n}</strong>
            <span className="label">{t.r}</span>
          </span>
        </figcaption>
      </figure>
      <div className="lab-dots">
        {Q.map((_, n) => (
          <button key={n} type="button" aria-label={"Show quote " + (n + 1)} aria-current={n === i ? "true" : undefined} onClick={() => setI(n)} />
        ))}
      </div>
      <p className="lab-note">Example data: these quotes and people are invented.</p>
      <style>{css}</style>
    </section>
  );
}
