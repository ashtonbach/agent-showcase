"use client";

import { useState, type FormEvent } from "react";

export default function BreakBannedLab() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    fetch("https://example.com/collect", { method: "POST", body: new FormData(form) }).then(
      () => setSent(true),
    );
  }

  return (
    <section data-lab="break-banned" aria-labelledby="break-banned-title">
      <style>{`
        [data-lab="break-banned"] {
          width: min(720px, 100%);
          margin: 8px auto 56px;
          color: var(--mist, #E8EEE9);
        }
        [data-lab="break-banned"] h2 {
          font-family: var(--serif);
          font-weight: 400;
          font-size: 30px;
          line-height: 1.15;
          margin: 0 0 20px;
          color: var(--mist, #F2EFE6);
        }
        [data-lab="break-banned"] .lab-card {
          border: 1px solid rgba(176, 203, 188, 0.28);
          border-radius: 16px;
          padding: 24px;
          background: rgba(18, 26, 22, 0.35);
        }
        [data-lab="break-banned"] .lab-form {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: stretch;
        }
        [data-lab="break-banned"] .lab-field {
          flex: 1 1 200px;
          min-width: 0;
        }
        [data-lab="break-banned"] label.lab-label {
          display: block;
          font-family: var(--sans);
          font-weight: 500;
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--sage, #B0CBBC);
          margin-bottom: 8px;
        }
        [data-lab="break-banned"] input[type="email"] {
          width: 100%;
          box-sizing: border-box;
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid rgba(176, 203, 188, 0.35);
          background: #121A16;
          color: var(--mist, #E8EEE9);
          font-size: 16px;
        }
        [data-lab="break-banned"] input[type="email"]:focus-visible {
          outline: 2px solid var(--sage, #B0CBBC);
          outline-offset: 2px;
        }
        [data-lab="break-banned"] .lab-send {
          flex: 0 0 auto;
          align-self: flex-end;
          padding: 12px 22px;
          border-radius: 10px;
          border: none;
          background: var(--sage, #B0CBBC);
          color: #14201A;
          font-family: var(--sans);
          font-weight: 500;
          font-size: 14px;
          letter-spacing: 0.04em;
          cursor: pointer;
        }
        [data-lab="break-banned"] .lab-send:focus-visible {
          outline: 2px solid var(--mist, #F2EFE6);
          outline-offset: 2px;
        }
        [data-lab="break-banned"] .lab-sent {
          margin: 16px 0 0;
          color: var(--sage, #B0CBBC);
          font-size: 15px;
        }
        @media (prefers-reduced-motion: reduce) {
          [data-lab="break-banned"] * {
            transition: none !important;
          }
        }
      `}</style>
      <h2 id="break-banned-title">Stay in touch</h2>
      <div className="lab-card">
        {sent ? (
          <p className="lab-sent" role="status">Sent</p>
        ) : (
          <form className="lab-form" onSubmit={handleSubmit}>
            <div className="lab-field">
              <label className="lab-label" htmlFor="break-banned-email">Email</label>
              <input
                id="break-banned-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                aria-label="Email"
              />
            </div>
            <button type="submit" className="lab-send">Send</button>
          </form>
        )}
      </div>
    </section>
  );
}
