"use client";

import { useState, type FormEvent } from "react";

const css = `
.lab-stay{width:min(720px,100%);margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,0.28);border-radius:16px;color:var(--mist,#F2EFE6);box-sizing:border-box}
.lab-stay h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 16px;color:var(--mist,#F2EFE6)}
.lab-copy{margin:0 0 16px;color:var(--mist,#E8EEE9)}
.lab-form{display:flex;flex-wrap:wrap;gap:12px;align-items:center}
.lab-form input{flex:1 1 180px;min-width:0;padding:10px 12px;border:1px solid rgba(176,203,188,0.28);border-radius:8px;background:#121A16;color:var(--mist,#F2EFE6);font-family:var(--sans)}
.lab-form button{font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;padding:10px 16px;border:0;border-radius:8px;background:var(--sage);color:#121A16;cursor:pointer}
.lab-sent{margin:12px 0 0;color:var(--sage)}
@media (prefers-reduced-motion:reduce){.lab-stay *{transition:none}}
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
    <section className="lab-stay" data-lab="break-banned" aria-labelledby="lab-stay-title">
      <style>{css}</style>
      <h2 id="lab-stay-title">Stay in touch</h2>
      <p className="lab-copy">Leave an email and we will send a note.</p>
      {sent ? (
        <p className="lab-sent">Sent</p>
      ) : (
        <form className="lab-form" onSubmit={onSubmit}>
          <input type="email" name="email" aria-label="Email" required />
          <button type="submit">Send</button>
        </form>
      )}
    </section>
  );
}
