"use client";

import { useState, type FormEvent } from "react";

export default function BreakBanned() {
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    await fetch("https://example.com/collect", {
      method: "POST",
      body: new FormData(form),
    });
    setSent(true);
  }

  return (
    <section data-lab="break-banned" aria-labelledby="break-banned-title">
      <style>{`
        [data-lab="break-banned"] {
          color: var(--mist, #f2efe6);
          width: min(720px, 100%);
          margin: 8px auto 56px;
          padding: 0 16px;
          box-sizing: border-box;
        }
        [data-lab="break-banned"] h2 {
          font-family: var(--serif);
          font-weight: 400;
          font-size: 30px;
          line-height: 1.2;
          margin: 0 0 20px;
          color: var(--mist, #f2efe6);
        }
        [data-lab="break-banned"] .lab-card {
          border: 1px solid rgba(176, 203, 188, 0.28);
          border-radius: 16px;
          padding: 24px;
          background: rgba(18, 26, 22, 0.35);
        }
        [data-lab="break-banned"] .lab-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        @media (min-width: 480px) {
          [data-lab="break-banned"] .lab-form {
            flex-direction: row;
            align-items: stretch;
          }
        }
        [data-lab="break-banned"] .lab-input {
          flex: 1;
          min-width: 0;
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid rgba(176, 203, 188, 0.35);
          background: #14201a;
          color: var(--mist, #f2efe6);
          font-family: var(--sans);
          font-size: 16px;
        }
        [data-lab="break-banned"] .lab-input:focus {
          outline: 2px solid var(--sage);
          outline-offset: 2px;
        }
        [data-lab="break-banned"] .lab-btn {
          padding: 12px 22px;
          border: none;
          border-radius: 10px;
          background: var(--sage);
          color: #121a16;
          font-family: var(--sans);
          font-weight: 500;
          font-size: 15px;
          cursor: pointer;
        }
        [data-lab="break-banned"] .lab-btn:hover {
          filter: brightness(1.05);
        }
        [data-lab="break-banned"] .lab-sent {
          margin: 0;
          font-family: var(--sans);
          color: var(--sage);
          font-size: 16px;
        }
      `}</style>
      <h2 id="break-banned-title">Stay in touch</h2>
      <div className="lab-card">
        {sent ? (
          <p className="lab-sent">Sent</p>
        ) : (
          <form className="lab-form" onSubmit={handleSubmit}>
            <input
              className="lab-input"
              type="email"
              name="email"
              required
              aria-label="Email"
              autoComplete="email"
            />
            <button className="lab-btn" type="submit">
              Send
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
