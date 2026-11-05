"use client";

import { useCallback, useId, useState } from "react";

export default function LabNewsletterSignup() {
  const titleId = useId();
  const emailId = useId();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const trimmed = email.trim();
      if (!trimmed || !trimmed.includes("@")) return;
      setSubmitted(true);
    },
    [email]
  );

  return (
    <section
      className="lab-wrap"
      data-lab="custom-1793874580"
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className="lab-title">
        Stay in the loop
      </h2>
      <p className="lab-lead">
        Occasional updates from the showcase—no spam, unsubscribe anytime.
      </p>
      <div className="lab-card">
        {submitted ? (
          <p className="lab-success" role="status">
            Thanks—we&apos;ll keep you posted.
          </p>
        ) : (
          <form className="lab-form" onSubmit={onSubmit} noValidate>
            <label className="lab-label" htmlFor={emailId}>
              Email
            </label>
            <div className="lab-row">
              <input
                id={emailId}
                className="lab-input"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="lab-btn" type="submit">
                Subscribe
              </button>
            </div>
          </form>
        )}
      </div>
      <style>{`
        .lab-wrap {
          width: min(720px, 100%);
          margin: 8px auto 56px;
          padding: 0 16px;
          box-sizing: border-box;
          color: var(--mist, #f2efe6);
        }
        .lab-title {
          margin: 0 0 12px;
          font-family: var(--serif);
          font-weight: 400;
          font-size: 30px;
          line-height: 1.2;
          color: var(--mist, #f2efe6);
        }
        .lab-lead {
          margin: 0 0 20px;
          font-family: var(--sans);
          font-size: 16px;
          line-height: 1.55;
          color: #e8eee9;
          max-width: 52ch;
        }
        .lab-card {
          border: 1px solid rgba(176, 203, 188, 0.28);
          border-radius: 16px;
          padding: 24px;
          background: rgba(18, 26, 22, 0.35);
        }
        .lab-form { margin: 0; }
        .lab-label {
          display: block;
          margin-bottom: 8px;
          font-family: var(--sans);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--sage, #b0cbb8);
        }
        .lab-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: stretch;
        }
        .lab-input {
          flex: 1 1 180px;
          min-width: 0;
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid rgba(176, 203, 188, 0.35);
          background: #14201a;
          color: var(--mist, #f2efe6);
          font-family: var(--sans);
          font-size: 16px;
        }
        .lab-input::placeholder { color: rgba(232, 238, 233, 0.45); }
        .lab-input:focus-visible {
          outline: 2px solid var(--sage, #b0cbb8);
          outline-offset: 2px;
        }
        .lab-btn {
          flex: 0 0 auto;
          padding: 12px 22px;
          border: none;
          border-radius: 10px;
          background: var(--sage, #b0cbb8);
          color: #121a16;
          font-family: var(--sans);
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.15s ease, filter 0.15s ease;
        }
        .lab-btn:hover { filter: brightness(1.06); }
        .lab-btn:active { transform: scale(0.98); }
        @media (prefers-reduced-motion: reduce) {
          .lab-btn { transition: none; }
          .lab-btn:active { transform: none; }
        }
        .lab-success {
          margin: 0;
          font-family: var(--sans);
          font-size: 17px;
          line-height: 1.5;
          color: var(--mist, #f2efe6);
        }
      `}</style>
    </section>
  );
}
