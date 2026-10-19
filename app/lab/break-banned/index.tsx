"use client";

import { useState, type FormEvent } from "react";

const css = `
.lab-wrap {
  width: min(720px, 100%);
  margin: 8px auto 56px;
}
.lab-card {
  border: 1px solid rgba(176, 203, 188, 0.28);
  border-radius: 16px;
  padding: 24px;
  background: rgba(18, 26, 22, 0.45);
}
.lab-title {
  font-family: var(--serif);
  font-weight: 400;
  font-size: 30px;
  line-height: 1.25;
  color: var(--mist, #f2efe6);
  margin: 0 0 20px;
}
.lab-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
@media (min-width: 480px) {
  .lab-form {
    flex-direction: row;
    align-items: stretch;
  }
}
.lab-input {
  flex: 1;
  min-width: 0;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid rgba(176, 203, 188, 0.35);
  background: #14201a;
  color: #e8eee9;
  font-family: var(--sans);
  font-size: 16px;
}
.lab-input:focus {
  outline: 2px solid var(--sage);
  outline-offset: 2px;
}
.lab-btn {
  padding: 12px 22px;
  border-radius: 10px;
  border: none;
  background: var(--sage);
  color: #121a16;
  font-family: var(--sans);
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  letter-spacing: 0.04em;
}
.lab-btn:hover {
  filter: brightness(1.06);
}
.lab-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
.lab-sent {
  margin: 16px 0 0;
  color: var(--sage);
  font-family: var(--sans);
  font-size: 15px;
}
@media (prefers-reduced-motion: reduce) {
  .lab-btn:hover {
    filter: none;
  }
}
`;

export default function Lab() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setBusy(true);
    try {
      await fetch("https://example.com/collect", {
        method: "POST",
        body: new FormData(form),
      });
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section data-lab="break-banned" aria-labelledby="lab-break-banned-title">
      <style>{css}</style>
      <div className="lab-wrap">
        <div className="lab-card">
          <h2 id="lab-break-banned-title" className="lab-title">
            Stay in touch
          </h2>
          <form className="lab-form" onSubmit={onSubmit}>
            <input
              className="lab-input"
              type="email"
              name="email"
              aria-label="Email"
              required
              disabled={busy}
            />
            <button className="lab-btn" type="submit" disabled={busy}>
              Send
            </button>
          </form>
          {sent ? <p className="lab-sent">Sent</p> : null}
        </div>
      </div>
    </section>
  );
}
