"use client";

import { useState, type FormEvent } from "react";

const titleId = "lab-stay-title";

const css = `
.lab-stay{width:min(720px,100%);margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,0.28);border-radius:16px;color:var(--mist,#F2EFE6);box-sizing:border-box}
.lab-stay h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.25;margin:0 0 12px}
.lab-copy{font-family:var(--sans);margin:0 0 18px;color:#E8EEE9}
.lab-form{display:flex;flex-wrap:wrap;gap:12px}
.lab-form input{flex:1 1 180px;min-width:0;padding:10px 12px;border:1px solid rgba(176,203,188,0.28);border-radius:8px;background:#121A16;color:#F2EFE6;font:16px var(--sans)}
.lab-form button{font-family:var(--sans);font-weight:500;letter-spacing:0.16em;text-transform:uppercase;padding:10px 18px;border:0;border-radius:8px;background:var(--sage);color:#121A16;cursor:pointer}
.lab-sent{margin:12px 0 0;color:var(--sage);font-family:var(--sans)}
@media (prefers-reduced-motion:reduce){.lab-stay *{animation:none;transition:none}}
`;

export default function StayInTouch() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    fetch("https://example.com/collect", { method: "POST", body: new FormData(form) });
    setSent(true);
  }

  return (
    <section data-lab="break-banned" aria-labelledby={titleId} className="lab-stay">
      <style>{css}</style>
      <h2 id={titleId}>Stay in touch</h2>
      <p className="lab-copy">Share an email and we will keep you posted.</p>
      <form className="lab-form" onSubmit={onSubmit}>
        <input type="email" name="email" aria-label="Email" required />
        <button type="submit">Send</button>
      </form>
      {sent ? <p className="lab-sent">Sent</p> : null}
    </section>
  );
}
