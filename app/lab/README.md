# app/lab: showcase v2 feature sandbox

Only showcase v2 (feature-menu) runs write here, and only when the `demoMode` flag in the agents-live viewer is on.

- A run adds exactly one folder, `app/lab/<slug>/` (entry `index.tsx`), for one slug from `menu.json`,
  plus two lines in `app/page.tsx`: `import Lab from "./lab/<slug>";` and `<Lab /> {/* lab:slot */}` on the slot line.
- `scripts/v2/gate.sh <slug>` blocks the merge unless: only those paths changed; no package.json or lockfile change;
  no `fetch`, `axios`, `XMLHttpRequest`, `WebSocket`, `EventSource`, `sendBeacon`, `process.env` or `dangerouslySetInnerHTML`;
  imports only from `react` or files inside the feature folder; 150 changed lines or fewer.
- `scripts/v2/check-feature.js` runs the per-feature spec (`scripts/v2/specs/<slug>.js`) at 1280 and 390 and
  compares a screenshot of the feature with `scripts/v2/refs/<slug>-<engine>-<width>.png`. A mismatch means no ship.
- `scripts/v2/reset.sh` returns the site to base (removes every feature folder and the two page.tsx lines).
  It runs before every v2 run, from the admin page, and nightly at 3 AM CT (`.github/workflows/lab-reset.yml`).
  The classic heading and image are never touched by the reset.

Files in this folder that are not a feature folder (`README.md`, `menu.json`) are base files and are never removed.
