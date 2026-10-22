"use client";

import { useState, useCallback, type FormEvent } from "react";

const TITLE_ID = "lab-signup-title";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function emailInvalid(v: string) {
  return v.length > 0 && !EMAIL_RE.test(v);
}

export default function Lab() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [updates, setUpdates] = useState(false);
  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const nameOk = name.trim().length > 0;
  const emailOk = email.length > 0 && EMAIL_RE.test(email);
  const canSubmit = nameOk && emailOk && !submitted;

  const onNameBlur = useCallback(() => {
    setNameErr(name.trim() ? "" : "Please enter your name.");
  }, [name]);

  const onEmailBlur = useCallback(() => {
    if (!email) setEmailErr("Please enter your email.");
    else if (emailInvalid(email)) setEmailErr("Enter a valid email address.");
    else setEmailErr("");
  }, [email]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  };

  const css = `
.lab-wrap{max-width:min(720px,100%);margin:8px auto 56px;padding:0 16px;box-sizing:border-box}
.lab-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;background:rgba(18,26,22,0.35)}
.lab-wrap h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.25;color:var(--mist);margin:0 0 20px}
.lab-success{color:var(--mist);font-size:18px;margin:0}
.lab-field{margin-bottom:18px}
.lab-field label{display:block;color:#E8EEE9;font-family:var(--sans);font-size:15px;margin-bottom:6px}
.lab-field input[type=text],.lab-field input[type=email]{width:100%;box-sizing:border-box;padding:12px 14px;border-radius:10px;border:1px solid rgba(176,203,188,0.35);background:#121A16;color:#F2EFE6;font-size:16px;font-family:var(--sans)}
.lab-field input:focus{outline:2px solid var(--sage);outline-offset:2px}
.lab-field input[aria-invalid=true]{border-color:#c97a7a}
.lab-err{color:#e8b4b4;font-size:14px;margin:6px 0 0;font-family:var(--sans)}
.lab-check{display:flex;align-items:flex-start;gap:10px;margin:20px 0 24px;color:#E8EEE9;font-family:var(--sans);font-size:15px}
.lab-check input{width:20px;height:20px;margin-top:2px;accent-color:var(--sage);flex-shrink:0}
.lab-submit{font-family:var(--sans);font-size:16px;padding:12px 24px;border-radius:10px;border:none;background:var(--sage);color:#121A16;cursor:pointer;font-weight:500}
.lab-submit:disabled{opacity:0.45;cursor:not-allowed}
.lab-submit:not(:disabled):hover{filter:brightness(1.06)}
@media (prefers-reduced-motion:reduce){.lab-submit:not(:disabled):hover{filter:none}}
`;

  return (
    <section data-lab="custom-1792654144" aria-labelledby={TITLE_ID} className="lab-wrap">
      <style>{css}</style>
      <div className="lab-card">
        <h2 id={TITLE_ID}>Stay in the loop</h2>
        {submitted ? (
          <p className="lab-success" role="status">Thanks, you&apos;re on the list.</p>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <div className="lab-field">
              <label htmlFor="lab-name">Name</label>
              <input
                id="lab-name"
                type="text"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={onNameBlur}
                aria-invalid={nameErr ? true : undefined}
                aria-describedby={nameErr ? "lab-name-err" : undefined}
              />
              {nameErr ? (
                <p id="lab-name-err" className="lab-err" role="alert">{nameErr}</p>
              ) : null}
            </div>
            <div className="lab-field">
              <label htmlFor="lab-email">Email</label>
              <input
                id="lab-email"
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={onEmailBlur}
                aria-invalid={emailErr ? true : undefined}
                aria-describedby={emailErr ? "lab-email-err" : undefined}
              />
              {emailErr ? (
                <p id="lab-email-err" className="lab-err" role="alert">{emailErr}</p>
              ) : null}
            </div>
            <div className="lab-check">
              <input
                id="lab-updates"
                type="checkbox"
                checked={updates}
                onChange={(e) => setUpdates(e.target.checked)}
              />
              <label htmlFor="lab-updates">Send me updates</label>
            </div>
            <button type="submit" className="lab-submit" disabled={!canSubmit}>
              Submit
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
