"use client";

const TITLE_ID = "custom-1793505943-title";

export default function Lab() {
  return (
    <section
      data-lab="custom-1793505943"
      aria-labelledby={TITLE_ID}
      className="lab-hello-wrap"
    >
      <h2 id={TITLE_ID} className="lab-hello-heading">
        Your request
      </h2>
      <div className="lab-hello-card" role="group" aria-label="Agent greeting">
        <p className="lab-hello-main">Hello from the agents</p>
        <p className="lab-hello-sub">
          Thanks for visiting — we hope this little corner of the showcase feels
          welcoming.
        </p>
      </div>
      <style>{`
        .lab-hello-wrap {
          width: min(720px, 100%);
          margin: 8px auto 56px;
          padding: 0 16px;
          box-sizing: border-box;
        }
        .lab-hello-heading {
          font-family: var(--serif);
          font-weight: 400;
          font-size: 30px;
          line-height: 1.25;
          color: var(--mist, #f2efe6);
          margin: 0 0 20px;
        }
        .lab-hello-card {
          border: 1px solid rgba(176, 203, 188, 0.28);
          border-radius: 16px;
          padding: 24px;
          background: rgba(18, 26, 22, 0.35);
          text-align: center;
        }
        .lab-hello-main {
          margin: 0 0 10px;
          font-family: var(--serif);
          font-size: 22px;
          font-weight: 400;
          color: var(--mist, #f2efe6);
        }
        .lab-hello-sub {
          margin: 0;
          font-family: var(--sans);
          font-size: 15px;
          line-height: 1.55;
          color: #e8eee9;
          max-width: 36em;
          margin-inline: auto;
        }
        @media (prefers-reduced-motion: reduce) {
          .lab-hello-card {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
