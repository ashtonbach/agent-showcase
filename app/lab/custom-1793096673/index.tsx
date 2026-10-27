"use client";


const QUOTES = [
  {
    text: "The forest mist palette made our retreat site feel calm the moment visitors landed.",
    name: "Mara Chen",
    role: "Retreat host",
  },
  {
    text: "Clear typography and gentle contrast—our clients actually read the whole page now.",
    name: "Jonas Pike",
    role: "Studio lead",
  },
  {
    text: "We shipped the showcase section in one pass; the layout held on phones and desktops alike.",
    name: "Elena Ruiz",
    role: "Product owner",
  },
];

const css = `
.lab-testimonials {
  width: min(960px, 100%);
  margin: 8px auto 56px;
  padding: 0 16px;
  box-sizing: border-box;
  color: var(--mist, #F2EFE6);
}
.lab-testimonials h2 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: 30px;
  line-height: 1.25;
  margin: 0 0 24px;
  color: var(--mist, #F2EFE6);
}
.lab-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
@media (max-width: 720px) {
  .lab-grid {
    grid-template-columns: 1fr;
  }
}
.lab-card {
  border: 1px solid rgba(176, 203, 188, 0.28);
  border-radius: 16px;
  padding: 24px;
  background: rgba(18, 26, 22, 0.35);
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}
.lab-quote {
  margin: 0;
  font-size: 16px;
  line-height: 1.55;
  color: #E8EEE9;
}
.lab-quote::before {
  content: "\\201C";
  color: var(--sage);
  font-family: var(--serif);
  font-size: 1.4em;
  line-height: 0;
  vertical-align: -0.15em;
  margin-right: 2px;
}
.lab-footer {
  margin-top: auto;
}
.lab-role {
  font-family: var(--sans);
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-size: 11px;
  color: rgba(242, 239, 230, 0.65);
  margin: 0 0 4px;
}
.lab-name {
  margin: 0;
  font-size: 15px;
  color: var(--mist, #F2EFE6);
}
.lab-note {
  margin: 28px 0 0;
  font-size: 14px;
  color: rgba(242, 239, 230, 0.7);
}
`;

export default function LabTestimonials() {
  return (
    <section
      data-lab="custom-1793096673"
      aria-labelledby="lab-testimonials-title"
      className="lab-testimonials"
    >
      <style>{css}</style>
      <h2 id="lab-testimonials-title">What customers say</h2>
      <div className="lab-grid">
        {QUOTES.map((q) => (
          <article key={q.name} className="lab-card">
            <p className="lab-quote">{q.text}</p>
            <div className="lab-footer">
              <p className="lab-role">{q.role}</p>
              <p className="lab-name">{q.name}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="lab-note">Example data: fictional quotes for layout only.</p>
    </section>
  );
}
