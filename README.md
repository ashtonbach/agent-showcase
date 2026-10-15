# agent-showcase

A small Next.js page ("Hello, <World> World!" plus a world image) that a team of AI agents changes, reviews, ships and checks live, on demand. It exists to show an AI agent team doing a complete, real software change end to end: branch, code, image, pull request, preview, review, merge, production and QA.

## How a run works

1. **Trigger.** A visitor presses **Trigger a demo** on the AshtonBach live viewer. The viewer allows one run at a time (a run lock) and a daily cap on runs. A run picks a "world" (Vercel, Next.js, TypeScript, Cursor, GitHub and others) that isn't already in production.
2. **Live viewer (Cloudflare).** A Cloudflare Worker with a Durable Object holds the run state, the step history and the live screen streams, so viewers can watch each agent's screen while it works.
3. **Four cloud agents (Cursor).** Each run launches four Cursor cloud agents:
   - **Hazel (AI designer)** generates a new world image and pushes it to the run branch.
   - **Alder (AI coder)** changes the heading in `app/page.tsx`, confirms `next build` passes and pushes.
   - **Rowan (AI reviewer)** reviews the Vercel preview with browser checks (heading text, image, image size and layout on desktop and mobile).
   - **Cedar (AI QA)** runs the same checks on production after the merge and signs off.
   Ash (AI coordinator) opens the pull request and coordinates the run.
4. **Vercel preview and production.** Every pull request gets a Vercel preview deployment. Merging to `main` deploys production.
<<<<<<< HEAD
5. **Review gate.** Nothing merges unless Rowan's review checks pass on the preview. If they pass, the merge is done on their behalf through the `ashtonbach-coder` GitHub account (the AI coder account). If they fail, nothing merges and the run is recorded as "Didn't ship".
=======
5. **Merge gates (required checks).** Nothing merges unless all required checks pass:
   - **Allowlist**: Only approved file paths may change (`app/lab/<slug>/`, `app/page.tsx` import/render lines, `app/lab/current.json`, and artwork in `public/lab/<slug>/`)
   - **Size cap**: Code changes limited to 150 lines (excluding artwork)
   - **Banned calls**: No network calls, eval, or external imports
   - **Build**: `npm run build` must succeed
   - **Functional**: Feature must render correctly, pass all functional checks from its spec, and show no console errors
   - **Copy coverage**: For spanish-translation, at least 90% of keys must be translated (non-identical to English)
   - **Reviewer approval**: Review checks pass on the Vercel preview
   
   These checks are enforced as required GitHub status checks. Any FAIL blocks the merge. If all pass, the merge is done on behalf of the reviewer through the `ashtonbach-coder` GitHub account (the AI coder account). Visual diff against reference screenshots is advisory (informational only) since references may be outdated.
>>>>>>> c75ec59 (Add merge gate CI workflows and enforcement)

## Human oversight

A human designed this system and oversees it. They set the rules the agents follow (review gate, one run at a time, daily cap), watch runs and can stop or roll back any change. Agents cannot change those rules themselves.

## AI disclosure

All named contributors (Ash, Alder, Hazel, Rowan, Cedar) are AI agents. Commits and merges are made through the `ashtonbach-coder` GitHub account (the AI coder account). A human designed the system and oversees it.

## Local development

```bash
npm install
npm run dev
npx next build --webpack   # the build check the agents run
```
