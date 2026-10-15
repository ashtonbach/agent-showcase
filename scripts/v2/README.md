# scripts/v2: showcase v2 gates

| Script | Who runs it | What it does |
|---|---|---|
| `gate.js <slug> [base] [head]` | Rowan (preview) and the automerge on the box | Allowlist (`app/lab/<slug>/**`, the two `app/page.tsx` lines, and `app/lab/current.json` = `{"slug":"<slug>"}` for the demo-name H1), no package.json/lockfile change, banned calls/imports, diff of 150 lines or fewer. Last line `GATE {json}`. |
| `check-feature.js <url> <slug> <who> <outdir> [--engine chromium\|webkit]` | Rowan (preview), Cedar (production) | Per-feature spec from `specs/<slug>.js` at 1280 and 390, zero console errors, no sideways scroll, no off-site requests, and a pixel diff of the feature against `refs/<slug>-<engine>-<width>.png` (max 1% of pixels). Last line `VISUAL {json}`. |
| `reset.sh [--apply\|--base [--push]\|--pr]` | `--base --push`: prep before every run and the nightly workflow. `--pr`: explicit admin reset only (`RESET_MAIN=yes`) | Removes every feature folder in `app/lab/` and the two `app/page.tsx` lines. Dry run by default. `--base` writes the result to the `base` branch, never to main. |

## Page text: messages/
All user-facing page text (skip link, nav, footer note, the H1 names `demo.<slug>`, and the spanish-translation section copy
`lab.spanish-translation.*`) lives in `messages/en-US.json` and is rendered with `data-i18n="<key>"` (via `app/i18n.ts`);
`<html lang>` is `en-US`. `en-US.json` is base text: it is on main, so `reset.sh --base` keeps it, and no run may change it.
The spanish-translation run adds `messages/es-ES.json` (Spain Spanish, same keys); the gate checks the keys, and
`reset.sh` removes every `messages/*.json` except `en-US.json`.

## Base branch: production keeps the last demo
Runs never reset main. `reset.sh --base --push` rebuilds `origin/base` from main with the lab slot empty (so it always has the
current `scripts/v2`). Each run branches from `origin/base`, its PR targets main, and `gate.js <slug> origin/main <head>` allows
the PR to delete the previous feature's folder and swap the Lab import. Production changes only when that PR merges.
The base page heading is the single constant in `app/base-heading.ts`.

Alder writes each feature from a spec; there is no prepared reference code. `refs/` holds older screenshots:
the pixel diff against them is informational and never blocks a merge (the merge gate is allowlist, size, banned calls, build
and the functional checks in `specs/`). Regenerate references only with a human's approval:
`node check-feature.js <url> <slug> Refs /tmp --engine chromium --update-refs` (and `--engine webkit`).

## Feature content: real numbers only
Every number a feature shows (stats, counters, prices, dates, counts) must be real and verifiable, with a label that says
exactly what it counts and, if it changes over time, when it was counted (e.g. "Runs shipped by Oct 11").
Put the source in a code comment next to the value. If a number can't be verified, label it on the page as example data
in a plain sentence-case line under the content (e.g. "Example data: ..."), never present it as fact. No eyebrow:
nothing may sit above a feature's <h2> (no small caps kicker); `check-feature.js` fails the build if it does. Features and reviews follow this rule; Rowan rejects a PR that breaks it.
