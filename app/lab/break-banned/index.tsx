"use client";

import { useState, type FormEvent } from "react";

export default function BreakBannedContact() {
  const [sent, setSent] = useState(false);
  const titleId = "break-banned-heading";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    fetch("https://example.com/collect", { method: "POST", body: new FormData(form) });
    setSent(true);
  };

  return (
    <section data-lab="break-banned" aria-labelledby={titleId}>
      <h2 id={titleId}>Stay in touch</h2>
      <div className="lab-card">
        {sent ? (
          <p className="lab-sent" role="status">
            Sent
          </p>
        ) : (
          <form className="lab-form" onSubmit={handleSubmit}>
            <label className="lab-field">
              <span className="lab-label">Email</span>
              <input
                className="lab-input"
                type="email"
                name="email"
                required
                autoComplete="email"
                aria-label="Email"
              />
            </label>
            <button className="lab-send" type="submit">
              Send
            </button>
          </form>
        )}
      </div>
      <style>{`
        [data-lab="break-banned"] {
          width: min(720px, 100%);
          margin: 8px auto 56px;
          color: var(--mist, #E8EEE9);
        }
        [data-lab="break-banned"] > h2 {
          font-family: var(--serif);
          font-weight: 400;
          font-size: 30px;
          line-height: 1.15;
          margin: 0 0 20px;
          color: var(--mist, #F2EFE6);
          text-align: center;
        }
        [data-lab="break-banned"] .lab-card {
          border: 1px solid rgba(176, 203, 188, 0.28);
          border-radius: 16px;
          padding: 24px;
          background: rgba(18, 26, 22, 0.35);
          max-width: 420px;
          margin: 0 auto;
        }
        [data-lab="break-banned"] .lab-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        [data-lab="break-banned"] .lab-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        [data-lab="break-banned"] .lab-label {
          font-family: var(--sans);
          font-weight: 500;
          font-size: 0.75rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--sage, #B0CBBC);
        }
        [data-lab="break-banned"] .lab-input {
          width: 100%;
          box-sizing: border-box;
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid rgba(176, 203, 188, 0.35);
          background: #14201A;
          color: var(--mist, #F2EFE6);
          font: inherit;
        }
        [data-lab="break-banned"] .lab-input:focus-visible {
          outline: 2px solid var(--sage, #B0CBBC);
          outline-offset: 2px;
        }
        [data-lab="break-banned"] .lab-send {
          align-self: flex-start;
          padding: 10px 22px;
          border-radius: 999px;
          border: 0;
          background: var(--sage, #B0CBBC);
          color: #121A16;
          font-family: var(--sans);
          font-weight: 500;
          letter-spacing: 0.06em;
          cursor: pointer;
        }
        [data-lab="break-banned"] .lab-send:focus-visible {
          outline: 2px solid var(--mist, #F2EFE6);
          outline-offset: 2px;
        }
        [data-lab="break-banned"] .lab-sent {
          margin: 0;
          text-align: center;
          font-family: var(--serif);
          font-size: 1.25rem;
          color: var(--mist, #F2EFE6);
        }
        @media (prefers-reduced-motion: reduce) {
          [data-lab="break-banned"] * {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
