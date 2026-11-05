"use client";

import { useState, type FormEvent } from "react";

function isValidEmail(value: string): boolean {
  const t = value.trim();
  if (!t) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
}

export default function LabNewsletterSignup() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showError, setShowError] = useState(false);

  const valid = isValidEmail(email);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (subscribed) return;
    if (!valid) {
      setShowError(true);
      return;
    }
    setSubscribed(true);
  }

  function onBlur() {
    if (!valid) setShowError(true);
  }

  function onEmailChange(value: string) {
    setEmail(value);
    if (isValidEmail(value)) setShowError(false);
  }

  return (
    <section data-lab="custom-1793862608" aria-labelledby="lab-newsletter-heading">
      <h2 id="lab-newsletter-heading">Stay in the loop</h2>
      <div className="lab-card">
        <p className="lab-lead">Get occasional updates from the showcase—no spam, unsubscribe anytime.</p>
        {subscribed ? (
          <p className="lab-success" role="status">
            Thanks—you&apos;re on the list. We&apos;ll be in touch when there&apos;s news.
          </p>
        ) : (
          <form className="lab-form" onSubmit={onSubmit} noValidate>
            <label className="lab-label" htmlFor="lab-newsletter-email">
              Email address
            </label>
            <div className="lab-field">
              <div className="lab-row">
                <input
                  id="lab-newsletter-email"
                  className="lab-input"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(ev) => onEmailChange(ev.target.value)}
                  onBlur={onBlur}
                  aria-invalid={showError && !valid ? true : undefined}
                  aria-describedby={showError && !valid ? "lab-email-error" : undefined}
                />
                <button className="lab-btn" type="submit" disabled={!valid}>
                  Subscribe
                </button>
              </div>
              {showError && !valid ? (
                <p id="lab-email-error" className="lab-error" role="alert">
                  Enter a valid email address
                </p>
              ) : null}
            </div>
          </form>
        )}
      </div>
      <style>{`
        [data-lab="custom-1793862608"] {
          width: min(720px, 100%);
          margin: 8px auto 56px;
          color: var(--mist, #f2efe6);
          box-sizing: border-box;
        }
        [data-lab="custom-1793862608"] h2 {
          font-family: var(--serif);
          font-weight: 400;
          font-size: 30px;
          margin: 0 0 20px;
          text-align: center;
        }
        [data-lab="custom-1793862608"] .lab-card {
          border: 1px solid rgba(176, 203, 188, 0.28);
          border-radius: 16px;
          padding: 24px;
          background: rgba(18, 26, 22, 0.35);
        }
        [data-lab="custom-1793862608"] .lab-lead {
          margin: 0 0 20px;
          font-size: 16px;
          line-height: 1.5;
          color: #e8eee9;
          text-align: center;
        }
        [data-lab="custom-1793862608"] .lab-form { margin: 0; }
        [data-lab="custom-1793862608"] .lab-label {
          display: block;
          font-family: var(--sans);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-bottom: 8px;
          color: var(--sage, #b0cbbc);
        }
        [data-lab="custom-1793862608"] .lab-field { margin: 0; }
        [data-lab="custom-1793862608"] .lab-row {
          display: flex;
          gap: 12px;
          align-items: stretch;
        }
        [data-lab="custom-1793862608"] .lab-input {
          flex: 1;
          min-width: 0;
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid rgba(176, 203, 188, 0.35);
          background: #14201a;
          color: var(--mist, #f2efe6);
          font-size: 16px;
        }
        [data-lab="custom-1793862608"] .lab-input:focus {
          outline: 2px solid var(--sage, #b0cbbc);
          outline-offset: 2px;
        }
        [data-lab="custom-1793862608"] .lab-error {
          margin: 8px 0 0;
          font-size: 14px;
          line-height: 1.4;
          color: #e8eee9;
        }
        [data-lab="custom-1793862608"] .lab-btn {
          flex-shrink: 0;
          padding: 12px 22px;
          border: none;
          border-radius: 10px;
          background: var(--sage, #b0cbbc);
          color: #121a16;
          font-family: var(--sans);
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: filter 0.15s ease;
        }
        [data-lab="custom-1793862608"] .lab-btn:disabled {
          cursor: not-allowed;
        }
        [data-lab="custom-1793862608"] .lab-btn:hover:not(:disabled) { filter: brightness(1.06); }
        [data-lab="custom-1793862608"] .lab-btn:focus-visible {
          outline: 2px solid var(--mist, #f2efe6);
          outline-offset: 2px;
        }
        [data-lab="custom-1793862608"] .lab-success {
          margin: 0;
          text-align: center;
          font-size: 16px;
          line-height: 1.5;
          color: #e8eee9;
        }
        @media (max-width: 480px) {
          [data-lab="custom-1793862608"] .lab-row { flex-direction: column; }
          [data-lab="custom-1793862608"] .lab-btn { width: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-lab="custom-1793862608"] * { transition: none !important; }
        }
      `}</style>
    </section>
  );
}
