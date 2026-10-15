"use client";
// Gates hero (page-level, not a lab feature). Numbers come from the run history's public counts endpoint and are never
// hardcoded: until it answers (or if it fails) every number shows an em dash.
import { useEffect, useState } from "react";

const STATS_URL = "https://agents.ashtonbach.com/stats";

type Stats = {
  runs: number;
  shipped: number;
  didntShip: number;
  sentBack: number;
  blocked: Record<string, number>;
  live: { feature: string; title: string } | null;
};

const GATES: { id: string; name: string; desc: string; tip?: string }[] = [
  { id: "allowlist", name: "Allowlist", desc: "Only the feature's folder and its one page import can change. No new dependencies." },
  { id: "size", name: "Size cap", desc: "Diffs over 150 lines stop here" },
  { id: "banned", name: "Banned calls", desc: "No network calls, secrets, eval, raw HTML or outside imports" },
  { id: "build", name: "Build", desc: "npm run build must pass" },
  { id: "functional", name: "Functional", desc: "Built, started and checked that the feature works" },
  { id: "copy", name: "Copy coverage", desc: "Translated strings must reach 90% (Spanish translation)" },
  { id: "reviewer", name: "Reviewer approval", desc: "A second agent reads the diff and can refuse" },
  { id: "human", name: "Human release", desc: "Bypassed for this demo", tip: "Skipped for this demo so agents can ship live. In production a human approves every release." },
];

const n = (v: unknown) => (typeof v === "number" && isFinite(v) ? String(v) : "\u2014");

export default function GatesHero() {
  const [s, setS] = useState<Stats | null>(null);
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    let live = true;
    const load = () =>
      fetch(STATS_URL, { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
        .then((j: Stats) => { if (live) { setS(j); setOk(true); } })
        .catch(() => { if (live) setOk(false); });
    load();
    const t = setInterval(load, 30000);
    return () => { live = false; clearInterval(t); };
  }, []);
  const chip = s ? (s.live ? s.live.title || "Building" : "Idle") : ok === false ? "Status unavailable" : "\u2014";
  return (
    <section className="gh" aria-labelledby="gh-title">
      <div className="gh-top">
        <div>
          <p className="gh-kicker label">Production workflow · AI agents · real gates</p>
          <h1 id="gh-title" className="gh-title">Eight gates.<br />Any one of them <em>stops the release.</em></h1>
          <p className="gh-lede">Six AI agents design, build, review and ship features to a live site. They are not trusted. Every change has to clear eight checks, and a second agent is allowed to refuse the first one&apos;s work.</p>
        </div>
        <div className={"gh-live" + (s && s.live ? " on" : "")} aria-live="polite"><i aria-hidden="true" />{s && s.live ? <b>Live</b> : null}{s && s.live ? " · " : ""}{chip}</div>
      </div>
      <div className="gh-stats">
        <div className="gh-stat"><div className="gh-n">{n(s?.runs)}</div><div className="gh-l">runs</div></div>
        <div className="gh-stat"><div className="gh-n">{n(s?.shipped)}</div><div className="gh-l">shipped</div></div>
        <div className="gh-stat"><div className="gh-n hl">{n(s?.didntShip)}</div><div className="gh-l">didn&apos;t ship</div></div>
        <div className="gh-stat"><div className="gh-n">{n(s?.sentBack)}</div><div className="gh-l">sent back by reviewer</div></div>
      </div>
      <ol className="gh-gates">
        {GATES.map((g) => {
          const c = s?.blocked?.[g.id];
          const human = g.id === "human";
          return (
            <li key={g.id} className={"gh-g" + (typeof c === "number" && c > 0 ? " b" : "") + (human ? " h" : "")}>
              <div className="gh-gn">{g.name}{g.tip ? <span className="gh-i" tabIndex={0} role="img" aria-label={g.tip} title={g.tip}>i<span className="gh-tip" aria-hidden="true">{g.tip}</span></span> : null}</div>
              <div className="gh-gd">{g.desc}</div>
              <div className="gh-gc">{human ? "Bypassed (demo)" : n(c) + " blocked"}</div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
