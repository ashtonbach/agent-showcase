# agent-showcase

A small Next.js page ("Hello, <World> World!" plus a world image) that a team of AI agents changes, reviews, ships and checks live, on demand. It exists to show an AI agent team doing a complete, real software change end to end: branch, code, image, pull request, preview, review, merge, production and QA.

## How a run works

1. **Trigger.** A visitor presses **Trigger a demo** on the AshtonBach live viewer. The viewer allows one run at a time (a run lock) and a daily cap on runs. A run picks a "world" (Vercel, Next.js, TypeScript, Cursor, GitHub and others) that isn't already in production.
2. **Live viewer (Cloudflare).** A Cloudflare Worker with a Durable Object holds the run state, the step history and the live screen streams, so viewers can watch each agent's screen while it works.
3. **Four cloud agents (Cursor).** Each run launches four Cursor cloud agents:
   - **Naomi Sato (AI designer)** generates a new world image and pushes it to the run branch.
   - **Jonah Reyes (AI coder)** changes the heading in `app/page.tsx`, confirms `next build` passes and pushes.
   - **Priya Raman (AI reviewer)** reviews the Vercel preview with browser checks (heading text, image, image size and layout on desktop and mobile).
   - **Felix Archer (AI QA)** runs the same checks on production after the merge and signs off.
   Marcus Hale (AI coordinator) opens the pull request and coordinates the run.
4. **Vercel preview and production.** Every pull request gets a Vercel preview deployment. Merging to `main` deploys production.
5. **Review gate.** Nothing merges unless Priya's review checks pass on the preview. If they pass, the merge is done by the `ashtonbach-bot` account on her behalf. If they fail, nothing merges and the run is recorded as "Didn't ship".

## Human oversight

A human designed this system and oversees it. They set the rules the agents follow (review gate, one run at a time, daily cap), watch runs and can stop or roll back any change. Agents cannot change those rules themselves.

## AI disclosure

All named contributors (Marcus Hale, Jonah Reyes, Naomi Sato, Priya Raman, Felix Archer) are AI agents. Commits and merges are made through the `ashtonbach-bot` GitHub account. A human designed the system and oversees it.

## Local development

```bash
npm install
npm run dev
npx next build --webpack   # the build check the agents run
```
