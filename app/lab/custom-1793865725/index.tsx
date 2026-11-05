"use client";

const ROSTER = [
  { id: "hazel", name: "Hazel", role: "Design" },
  { id: "alder", name: "Alder", role: "Coder" },
  { id: "rowan", name: "Rowan", role: "Reviewer" },
  { id: "cedar", name: "Cedar", role: "QA" },
  { id: "coord", name: "Coordinator", role: "Run lead" },
] as const;

const css = `
[data-lab="custom-1793865725"] {
  width: min(720px, 100%);
  margin: 8px auto 56px;
  box-sizing: border-box;
}
[data-lab="custom-1793865725"] .lab-title {
  font-family: var(--serif);
  font-weight: 400;
  font-size: 30px;
  color: var(--mist, #f2efe6);
  margin: 0 0 20px;
}
[data-lab="custom-1793865725"] .lab-card {
  border: 1px solid rgba(176, 203, 188, 0.28);
  border-radius: 16px;
  padding: 24px;
  background: #121a16;
}
[data-lab="custom-1793865725"] .lab-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}
[data-lab="custom-1793865725"] .lab-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 14px 0;
  border-bottom: 1px solid rgba(176, 203, 188, 0.28);
}
[data-lab="custom-1793865725"] .lab-row:last-child {
  padding-bottom: 0;
  border-bottom: none;
}
[data-lab="custom-1793865725"] .lab-name {
  margin: 0;
  font-family: var(--serif);
  font-weight: 400;
  font-size: 1.15rem;
  color: var(--mist, #f2efe6);
}
[data-lab="custom-1793865725"] .lab-role {
  font-family: var(--sans);
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-size: 0.72rem;
  color: var(--sage, #b0cbbc);
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid rgba(176, 203, 188, 0.35);
  background: #14201a;
}
[data-lab="custom-1793865725"] .lab-note {
  margin: 20px 0 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--mist, #e8eee9);
  opacity: 0.85;
}
@media (prefers-reduced-motion: reduce) {
  [data-lab="custom-1793865725"] * {
    transition: none !important;
  }
}
`;

export default function LabTeamRoster() {
  return (
    <section data-lab="custom-1793865725" aria-labelledby="lab-roster-title">
      <style>{css}</style>
      <h2 id="lab-roster-title" className="lab-title">
        Team roster
      </h2>
      <div className="lab-card">
        <ul className="lab-list">
          {ROSTER.map((member) => (
            <li key={member.id} className="lab-row">
              <p className="lab-name">{member.name}</p>
              <span className="lab-role">{member.role}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="lab-note">
        Example data: roles match the AshtonBach showcase agent roster for this
        demo run.
      </p>
    </section>
  );
}
