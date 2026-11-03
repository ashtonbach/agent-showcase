"use client";
import { useCallback, useEffect, useRef, useState } from "react";
const Q=[
  {t:"The forest palette made our launch page feel calm without losing clarity.",n:"Mira Chen",r:"Product lead"},
  {t:"We shipped the rebrand in a week; the type and spacing just worked.",n:"Jonah Ellis",r:"Design ops"},
  {t:"Readers stayed longer once we matched the UI to the story we tell.",n:"Sam Okonkwo",r:"Editor"},
];
const css=`.lab-tc{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6)}.lab-tc-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px}.lab-tc-q{margin:0;font-family:var(--serif);font-weight:400;font-size:22px;line-height:1.45}.lab-tc-cap{display:flex;align-items:center;gap:14px;margin-top:20px}.lab-tc-av{width:48px;height:48px;border-radius:50%;object-fit:cover;flex-shrink:0}.lab-tc-av-fb{display:block;width:48px;height:48px;border-radius:50%;background:rgba(176,203,188,.22);flex-shrink:0}.lab-tc-name{display:block;font-family:var(--sans);font-weight:500}.lab-tc .label{font-family:var(--sans);font-weight:500;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--sage,#B0CBBC);margin-top:2px;display:block}.lab-dots{display:flex;justify-content:center;gap:10px;margin-top:22px}.lab-dots button{width:10px;height:10px;padding:0;border:0;border-radius:50%;cursor:pointer;background:rgba(176,203,188,.35)}.lab-dots button[aria-current=true]{background:var(--sage,#B0CBBC)}.lab-dots button:focus-visible{outline:2px solid var(--sage,#B0CBBC);outline-offset:3px}.lab-tc-note{margin:28px 0 0;font-family:var(--sans);font-size:14px;line-height:1.5;color:#E8EEE9;opacity:.85}@media (prefers-reduced-motion:reduce){.lab-tc-card{transition:none}}`;
function Av({i}:{i:number}){
  const[bad,setBad]=useState(false);
  if(bad)return<span data-art="fallback" aria-hidden="true" className="lab-tc-av-fb"/>;
  return<img data-art="image" className="lab-tc-av" src={`/lab/testimonial-card/avatar-${i}.svg`} width={48} height={48} alt="" onError={()=>setBad(true)}/>;
}
export default function TestimonialCard(){
  const[idx,setIdx]=useState(0);
  const[hover,setHover]=useState(false);
  const tmr=useRef<ReturnType<typeof setInterval>|null>(null);
  const arm=useCallback(()=>{
    if(tmr.current)clearInterval(tmr.current);
    if(typeof window!=="undefined"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    tmr.current=setInterval(()=>setIdx(v=>(v+1)%3),3000);
  },[]);
  useEffect(()=>{
    if(hover){if(tmr.current)clearInterval(tmr.current);return;}
    arm();
    return()=>{if(tmr.current)clearInterval(tmr.current);};
  },[hover,arm]);
  const pick=(n:number)=>{setIdx(n);arm();};
  const q=Q[idx];
  return(
    <section data-lab="testimonial-card" aria-labelledby="lab-tc-h2" onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
      <h2 id="lab-tc-h2">What people say</h2>
      <div className="lab-tc"><figure className="lab-tc-card">
        <blockquote className="lab-tc-q" data-index={String(idx)}>&ldquo;{q.t}&rdquo;</blockquote>
        <figcaption className="lab-tc-cap"><Av i={idx}/><div><strong className="lab-tc-name">{q.n}</strong><span className="label">{q.r}</span></div></figcaption>
      </figure>
      <div className="lab-dots">{Q.map((_,i)=>(
        <button key={i} type="button" aria-label={`Show quote ${i+1}`} aria-current={i===idx?"true":undefined} onClick={()=>pick(i)}/>
      ))}</div></div>
      <p className="lab-tc-note lab-note">Example data: these quotes and people are invented.</p>
      <style>{css}</style>
    </section>
  );
}
