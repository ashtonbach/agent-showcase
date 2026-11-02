"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const HID = "quote-card-title";
const DATA = [
  { q: "The rollout felt calm—every edge case had a name before we shipped.", name: "Mira Chen", role: "Product lead", n: 0 },
  { q: "Our support queue dropped the week the card went live. Clear wins.", name: "Jonah Ellis", role: "Support ops", n: 1 },
  { q: "I stopped re-explaining the same story in every deck. This holds it.", name: "Samira Okoye", role: "Design partner", n: 2 },
];
const LIGHT =
  'html[data-theme="light"]{--mist:#14201A;--sage:#2F5A46;--header-line:rgba(47,90,70,.22)}html[data-theme="light"],html[data-theme="light"] body{background:#E8EEE9;color:#14201A}html[data-theme="light"] body::before{background:linear-gradient(180deg,#E8EEE9,#dfe8e1)}html[data-theme="light"] .label,html[data-theme="light"] .nav-list a,html[data-theme="light"] .site-footer,html[data-theme="light"] .site-disclaimer{color:#2F5A46}html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible,html[data-theme="light"] .brand,html[data-theme="light"] .demo-title{color:#14201A}html[data-theme="light"] [data-lab="testimonial-card"] .lab-card{background:rgba(255,255,255,.62);border-color:rgba(47,90,70,.32)}html[data-theme="light"] [data-lab="testimonial-card"] .lab-dots button{border-color:#2F5A46}html[data-theme="light"] [data-lab="testimonial-card"] .lab-theme{background:#2F5A46;color:#F2EFE6}';
const MF = "brightness(0) saturate(100%) invert(22%) sepia(18%) saturate(900%) hue-rotate(100deg)";
function paintMarks(light: boolean) {
  document.querySelectorAll<HTMLImageElement>(".brand-mark, .footer-mark-img").forEach((img) => {
    if (!img.dataset.abSrc) img.dataset.abSrc = img.getAttribute("src") ?? "";
    const home = img.dataset.abSrc;
    if (!light) { img.src = home; return; }
    const probe = new Image();
    probe.crossOrigin = "anonymous";
    probe.onload = () => {
      const w = probe.naturalWidth || 48, h = probe.naturalHeight || 24, c = document.createElement("canvas");
      c.width = w; c.height = h;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      ctx.filter = MF; ctx.drawImage(probe, 0, 0, w, h); img.src = c.toDataURL("image/png");
    };
    probe.src = home;
  });
}

export default function TestimonialCard() {
  const [idx, setIdx] = useState(0);
  const [hover, setHover] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [badImg, setBadImg] = useState(false);
  const [dark, setDark] = useState(true);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const cur = DATA[idx];
  const stop = () => { if (tick.current) clearInterval(tick.current); tick.current = null; };
  const arm = useCallback(() => {
    stop();
    if (hover || reduce) return;
    tick.current = setInterval(() => setIdx((i) => (i + 1) % DATA.length), 3000);
  }, [hover, reduce]);
  const go = (n: number) => { setIdx(n); setBadImg(false); stop(); arm(); };

  useEffect(() => { setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);
  useEffect(() => { document.documentElement.dataset.theme = dark ? "dark" : "light"; paintMarks(!dark); }, [dark]);
  useEffect(() => { setBadImg(false); }, [idx]);
  useEffect(() => { arm(); return stop; }, [arm]);

  return (
    <section data-lab="testimonial-card" aria-labelledby={HID} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <h2 id={HID}>What people say</h2>
      <div className="lab-shell">
        <figure className="lab-card">
          <blockquote data-index={idx} className="lab-quote">{cur.q}</blockquote>
          <figcaption className="lab-meta">
            {!badImg ? (
              <img data-art="image" src={`/lab/testimonial-card/avatar-${cur.n}.svg`} width={48} height={48} alt="" onError={() => setBadImg(true)} />
            ) : (
              <span data-art="fallback" className="lab-av-fb" aria-hidden="true" />
            )}
            <div className="lab-who">
              <strong>{cur.name}</strong>
              <span className="label">{cur.role}</span>
            </div>
          </figcaption>
        </figure>
        <div className="lab-dots">
          {DATA.map((_, i) => (
            <button key={i} type="button" aria-label={`Show quote ${i + 1}`} aria-current={i === idx ? "true" : undefined} onClick={() => go(i)} onKeyDown={(e) => { if (e.key === "Enter") go(i); }} />
          ))}
        </div>
        <button type="button" className="lab-theme" aria-pressed={dark} onClick={() => setDark((d) => !d)}>{dark ? "Show light theme" : "Show dark theme"}</button>
      </div>
      <p className="lab-note">Example data: these quotes and people are invented.</p>
      <style>{`
        ${LIGHT}
        [data-lab="testimonial-card"] { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #E8EEE9); }
        [data-lab="testimonial-card"] .lab-shell { display: grid; gap: 20px; }
        [data-lab="testimonial-card"] .lab-card { margin: 0; border: 1px solid rgba(176,203,188,0.38); border-radius: 16px; padding: 24px; background: rgba(18,26,22,0.35); }
        [data-lab="testimonial-card"] .lab-quote { margin: 0 0 20px; font-family: var(--serif); font-size: 1.25rem; line-height: 1.45; }
        [data-lab="testimonial-card"] .lab-meta { display: flex; gap: 14px; align-items: center; margin: 0; }
        [data-lab="testimonial-card"] .lab-meta img { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 1px solid rgba(176,203,188,0.45); }
        [data-lab="testimonial-card"] .lab-av-fb { width: 48px; height: 48px; border-radius: 50%; background: rgba(176,203,188,0.35); display: inline-block; }
        [data-lab="testimonial-card"] .lab-who { display: grid; gap: 4px; }
        [data-lab="testimonial-card"] .lab-who strong { font-weight: 500; }
        [data-lab="testimonial-card"] .label { font-family: var(--sans); font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; font-size: 0.72rem; color: var(--sage, #B0CBBC); }
        [data-lab="testimonial-card"] .lab-dots { display: flex; gap: 10px; justify-content: center; }
        [data-lab="testimonial-card"] .lab-dots button { width: 12px; height: 12px; border-radius: 50%; border: 1px solid rgba(176,203,188,0.72); background: transparent; padding: 0; cursor: pointer; }
        [data-lab="testimonial-card"] .lab-dots button[aria-current="true"] { background: var(--sage, #B0CBBC); border-color: var(--sage, #B0CBBC); }
        [data-lab="testimonial-card"] .lab-dots button:focus-visible, [data-lab="testimonial-card"] .lab-theme:focus-visible { outline: 2px solid var(--sage, #B0CBBC); outline-offset: 3px; }
        [data-lab="testimonial-card"] .lab-theme { font-family: var(--sans); font-weight: 500; font-size: 14px; border: 0; border-radius: 999px; padding: 10px 18px; cursor: pointer; background: var(--sage, #B0CBBC); color: #121a16; }
        [data-lab="testimonial-card"] .lab-note { margin: 24px 0 0; font-size: 0.9rem; color: var(--mist, #E8EEE9); }
        @media (prefers-reduced-motion: reduce) { [data-lab="testimonial-card"] .lab-quote, [data-lab="testimonial-card"] .lab-theme { transition: none; } }
      `}</style>
    </section>
  );
}
