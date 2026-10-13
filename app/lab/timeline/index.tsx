"use client";

const STEPS = [
  { title: "Request", line: "A teammate files the run request." },
  { title: "Design", line: "Look and copy are set before code." },
  { title: "Code", line: "The feature is written in the lab slot." },
  { title: "Review", line: "A reviewer checks the work against the spec." },
  { title: "QA / Ship", line: "QA signs off, then the run ships." },
];

const css = `
.lab-timeline{width:min(960px,100%);margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,0.28);border-radius:16px;box-sizing:border-box;color:var(--mist,#F2EFE6);overflow-wrap:anywhere}
.lab-timeline .label{font-family:var(--sans);font-weight:500;letter-spacing:0.16em;text-transform:uppercase;margin:0 0 8px}
.lab-timeline h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 20px}
.lab-steps{display:flex;gap:16px;list-style:none;margin:0;padding:0}
.lab-step{flex:1;min-width:0}
.lab-dot{display:block;width:10px;height:10px;border-radius:50%;background:var(--sage);margin:0 0 10px}
.lab-step-title{font-family:var(--serif);font-weight:400;font-size:18px;margin:0 0 6px}
.lab-step-line{font-family:var(--sans);margin:0;line-height:1.45;color:#E8EEE9}
@media (max-width:760px){
  .lab-timeline{width:min(720px,100%)}
  .lab-steps{flex-direction:column}
}
@media (prefers-reduced-motion:reduce){
  .lab-timeline *{transition:none;animation:none}
}
`;

export default function Timeline() {
  return (
    <section data-lab="timeline" aria-labelledby="lab-timeline-title" className="lab-timeline">
      <p className="label">Lab flow</p>
      <h2 id="lab-timeline-title">How the team works a run</h2>
      <ol className="lab-steps">
        {STEPS.map((step) => (
          <li key={step.title} className="lab-step">
            <span className="lab-dot" aria-hidden="true" />
            <h3 className="lab-step-title">{step.title}</h3>
            <p className="lab-step-line">{step.line}</p>
          </li>
        ))}
      </ol>
      <style>{css}</style>
    </section>
  );
}
