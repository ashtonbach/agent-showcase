"use client";


const css = `
.lab-tips {
  width: min(720px, 100%);
  margin: 8px auto 56px;
  padding: 24px;
  border: 1px solid rgba(176, 203, 188, 0.28);
  border-radius: 16px;
  color: var(--mist, #f2efe6);
}
.lab-tips h2 {
  margin: 0 0 20px;
  font-family: var(--serif);
  font-weight: 400;
  font-size: 30px;
  line-height: 1.25;
  color: var(--mist, #f2efe6);
}
.lab-tips-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.lab-tip {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 14px 16px;
  border-radius: 12px;
  background: rgba(18, 26, 22, 0.35);
  border: 1px solid rgba(176, 203, 188, 0.18);
}
.lab-tip-num {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: var(--sage, #8fa99a);
  color: #121a16;
  font-family: var(--sans);
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.04em;
}
.lab-tip-body {
  margin: 0;
  font-family: var(--sans);
  font-size: 15px;
  line-height: 1.55;
  color: #e8eee9;
}
.lab-tip-body strong {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
  color: var(--mist, #f2efe6);
}
@media (max-width: 420px) {
  .lab-tips {
    padding: 20px 16px;
  }
  .lab-tips h2 {
    font-size: 26px;
  }
}
`;

const tips = [
  {
    title: "Start with the headline",
    body: "The title at the top names the active demo so you always know which section you are viewing.",
  },
  {
    title: "Watch the live build",
    body: "This page updates as agents ship code; refresh if you joined mid-run to see the latest section.",
  },
  {
    title: "One section per request",
    body: "Each custom run replaces only this lab block—everything else on the showcase stays the same.",
  },
];

export default function Lab() {
  return (
    <section
      data-lab="custom-1792923403"
      aria-labelledby="lab-tips-heading"
      className="lab-tips"
    >
      <style>{css}</style>
      <h2 id="lab-tips-heading">Quick tips for first-time visitors</h2>
      <ol className="lab-tips-list">
        {tips.map((tip, i) => (
          <li key={i} className="lab-tip">
            <span className="lab-tip-num" aria-hidden="true">{i + 1}</span>
            <p className="lab-tip-body">
              <strong>{tip.title}</strong>
              {tip.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
