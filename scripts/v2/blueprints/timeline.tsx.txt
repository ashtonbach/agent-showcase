const STEPS = [
  ["Visitor", "Picks a feature from the menu."],
  ["Coordinator", "Resets to base and launches the team."],
  ["Coder", "Builds the feature in one folder."],
  ["Reviewer", "Runs the gates on the preview."],
  ["QA", "Checks production and signs off."],
];
const css = `
.lab-timeline { width: min(960px, 100%); margin: 8px auto 56px; }
.lab-timeline h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.2; margin: 6px 0 24px; }
.lab-timeline ol { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; list-style: none; position: relative; }
.lab-timeline ol::before { content: ""; position: absolute; left: 0; right: 0; top: 13px; height: 1px; background: rgba(176, 203, 188, 0.35); }
.lab-timeline li { position: relative; }
.lab-timeline .lab-dot { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 50%; background: #14201A; border: 1px solid var(--sage); color: var(--sage); font-size: 13px; position: relative; }
.lab-timeline h3 { font: 500 16px var(--sans); margin: 12px 0 4px; }
.lab-timeline p { opacity: 0.85; font-size: 15px; }
@media (max-width: 760px) {
  .lab-timeline ol { grid-template-columns: 1fr; gap: 20px; padding-left: 44px; }
  .lab-timeline ol::before { left: 13px; right: auto; top: 0; bottom: 0; width: 1px; height: auto; }
  .lab-timeline .lab-dot { position: absolute; left: -44px; top: 0; }
  .lab-timeline h3 { margin-top: 2px; }
}
`;

export default function Timeline() {
  return (
    <section data-lab="timeline" className="lab-timeline" aria-labelledby="lab-timeline-title">
      <style>{css}</style>
      <p className="label">The flow</p>
      <h2 id="lab-timeline-title">How the team works</h2>
      <ol>
        {STEPS.map(([t, d], i) => (
          <li key={t}>
            <span className="lab-dot" aria-hidden="true">
              {i + 1}
            </span>
            <h3>{t}</h3>
            <p>{d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
