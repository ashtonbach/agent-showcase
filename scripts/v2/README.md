# scripts/v2: showcase v2 gates

| Script | Who runs it | What it does |
|---|---|---|
| `gate.js <slug> [base] [head]` | Priya (preview) and the automerge on the box | Allowlist (`app/lab/<slug>/**` + the two `app/page.tsx` lines), no package.json/lockfile change, banned calls/imports, diff of 150 lines or fewer. Last line `GATE {json}`. |
| `check-feature.js <url> <slug> <who> <outdir> [--engine chromium\|webkit]` | Priya (preview), Felix (production) | Per-feature spec from `specs/<slug>.js` at 1280 and 390, zero console errors, no sideways scroll, no off-site requests, and a pixel diff of the feature against `refs/<slug>-<engine>-<width>.png` (max 1% of pixels). Last line `VISUAL {json}`. |
| `reset.sh [--apply\|--pr]` | prep before every run, admin page, nightly workflow | Removes every feature folder in `app/lab/` and the two `app/page.tsx` lines. Dry run by default. |

`blueprints/<slug>.tsx.txt` are the approved reference implementations the references were captured from
(`.txt` so the site build ignores them). Regenerate references only with a human's approval:
build the blueprint, then `node check-feature.js <url> <slug> Refs /tmp --engine chromium --update-refs` (and `--engine webkit`).
