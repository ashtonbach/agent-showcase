"use client";
import { useEffect, useState } from "react";

const ITEMS = [
  { title: "Fresh branch", body: "Each run starts on a clean branch so work stays isolated from other demos." },
  { title: "Allowlist", body: "Only listed files may change; anything outside that set is rejected." },
  { title: "Size cap", body: "The whole diff stays inside a tight line budget so the feature stays small." },
  { title: "No network", body: "The component cannot fetch, open sockets, or read environment secrets." },
  { title: "Visual gate", body: "Layout is checked at desktop and phone widths so nothing clips or scrolls sideways." },
  { title: "Nightly reset", body: "The lab slot is cleared on a nightly cycle so the next run starts empty." },
];

const css = `
.lab-wrap{width:min(960px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6)}
.lab-wrap,.lab-wrap *{box-sizing:border-box}
.lab-wrap h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 20px;color:var(--mist,#F2EFE6)}
.lab-list{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
@media (max-width:900px){.lab-list{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:600px){.lab-list{grid-template-columns:minmax(0,1fr)}}
.lab-list li{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px}
.lab-list h3{font-family:var(--sans);font-weight:500;letter-spacing:0.16em;text-transform:uppercase;font-size:12px;color:var(--sage,#B0CBBC);margin:12px 0 8px}
.lab-list p{margin:0;font-size:15px;line-height:1.45;color:#E8EEE9}
.lab-art{display:block;width:32px;height:32px}
.lab-fb{display:block;width:32px;height:32px;border-radius:8px;background:rgba(176,203,188,0.2)}
`;

function Art({ i }: { i: number }) {
  const [fb, setFb] = useState(false);
  useEffect(() => {
    const el = document.getElementById("lab-icon-" + i) as HTMLImageElement | null;
    if (el && el.complete && el.naturalWidth === 0) setFb(true);
  }, [i]);
  if (fb) return <span className="lab-fb" data-art="fallback" aria-hidden="true" />;
  return (
    <img
      id={"lab-icon-" + i}
      className="lab-art"
      data-art="image"
      src={"/lab/feature-grid/icon-" + i + ".svg"}
      width={32}
      height={32}
      alt=""
      onError={() => setFb(true)}
    />
  );
}

export default function FeatureGrid() {
  return (
    <section className="lab-wrap" data-lab="feature-grid" aria-labelledby="lab-fg-title">
      <h2 id="lab-fg-title">Six guardrails of the showcase</h2>
      <ul className="lab-list">
        {ITEMS.map((item, i) => (
          <li key={item.title}>
            <Art i={i} />
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
      <style>{css}</style>
    </section>
  );
}
