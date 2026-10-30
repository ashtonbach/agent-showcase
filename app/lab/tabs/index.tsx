"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const TABS = [
  { id: "tabs-design", panel: "panel-design", label: "Design", body: "Hazel shapes each lab — layout, Forest Mist styling, and artwork — before coding starts." },
  { id: "tabs-build", panel: "panel-build", label: "Build", body: "Alder writes the feature in the lab slot from the spec; the kit ships on the run branch for review." },
  { id: "tabs-review", panel: "panel-review", label: "Review", body: "Rowan reviews the PR, Cedar QA checks the preview, and the kit merges after the gate passes." },
] as const;

export default function TabsLab() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const select = useCallback((index: number) => {
    setActive(index);
    tabsRef.current[index]?.focus();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const t = event.target as HTMLElement | null;
      if (!t?.closest('[data-lab="tabs"] [role="tablist"]')) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        select((active + 1) % TABS.length);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        select((active + TABS.length - 1) % TABS.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, select]);

  const css = `.lab-tabs-wrap{width:min(720px,100%);margin:8px auto 56px}.lab-tabs-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.35)}.lab-tabs-title{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;color:var(--mist,#f2efe6);margin:0 0 20px}.lab-tablist{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 20px}.lab-tab{font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:11px;padding:10px 14px;border-radius:999px;border:1px solid rgba(176,203,188,.35);background:transparent;color:var(--mist,#e8eee9);cursor:pointer}.lab-tab[aria-selected=true]{background:var(--sage);color:#14201a;border-color:var(--sage)}.lab-tab:focus-visible{outline:2px solid var(--sage);outline-offset:2px}.lab-tabpanel{color:var(--mist,#f2efe6);font-size:16px;line-height:1.55;margin:0}.lab-tabpanel[hidden]{display:none}`;

  return (
    <section data-lab="tabs" aria-labelledby="tabs-heading">
      <style>{css}</style>
      <div className="lab-tabs-wrap">
        <div className="lab-tabs-card">
          <h2 id="tabs-heading" className="lab-tabs-title">How this run works</h2>
          <div role="tablist" aria-label="Showcase team steps">
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={tab.id}
                ref={(el) => { tabsRef.current[i] = el; }}
                aria-selected={active === i}
                aria-controls={tab.panel}
                tabIndex={active === i ? 0 : -1}
                className="lab-tab"
                onClick={() => select(i)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {TABS.map((tab, i) => (
            <div key={tab.panel} role="tabpanel" id={tab.panel} aria-labelledby={tab.id} hidden={active !== i} className="lab-tabpanel">
              {tab.body}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
