#!/bin/bash
# Showcase v2 reset: return app/lab and app/page.tsx to base. Never touches the classic heading or image.
# Usage: scripts/v2/reset.sh [--apply] [--pr]
#   (no flag)  dry run: print what would change, exit 0 if already at base ("ALREADY_BASE"), 3 if a reset is needed
#   --apply    change the working tree only
#   --pr       apply on a fresh branch from origin/main, commit, push, open a PR and squash-merge it (bot only).
#              The PR is gated: it may only delete files under app/lab/<feature>/ and revert the two page.tsx lines.
set -euo pipefail
ROOT=$(git rev-parse --show-toplevel); cd "$ROOT"; MODE=${1:-dry}
R=${RESET_REPO:-ashtonbach/agent-showcase}
if [ "$MODE" = --pr ]; then git fetch -q origin main; git checkout -q -B "reset/lab-$(date +%s)" origin/main; fi
FEAT=$(find app/lab -mindepth 1 -maxdepth 1 -type d | sort); ART=$(find public/lab -mindepth 1 -maxdepth 1 -type d 2>/dev/null | sort)
PAGE_DIRTY=0; grep -qE '^import Lab from "\./lab/|<Lab />' app/page.tsx && PAGE_DIRTY=1
if [ -z "$FEAT" ] && [ -z "$ART" ] && [ $PAGE_DIRTY = 0 ]; then echo "ALREADY_BASE"; exit 0; fi
echo "RESET_NEEDED features: ${FEAT:-none} page.tsx: $([ $PAGE_DIRTY = 1 ] && echo modified || echo base)"
[ "$MODE" = dry ] && exit 3
[ -n "$FEAT" ] && rm -rf $FEAT; [ -n "$ART" ] && rm -rf $ART
python3 - <<'P'
import re
p='app/page.tsx'; s=open(p).read()
s=re.sub(r'^import Lab from "\./lab/[a-z0-9-]+";\n','',s,flags=re.M)
s=re.sub(r'^(\s*)<Lab />\s*\{/\* lab:slot \*/\}$',r'\1{/* lab:slot */}',s,flags=re.M)
open(p,'w').write(s)
P
grep -q 'lab:slot' app/page.tsx || { echo "RESET_FAIL slot marker missing in app/page.tsx"; exit 1; }
[ "$MODE" = --apply ] && { echo "RESET_APPLIED"; exit 0; }
# --pr: verify the reset diff only removes lab files / reverts page.tsx, then ship it
git add -A app/lab app/page.tsx; git add -A -- public/lab 2>/dev/null || true
BAD=$(git diff --cached --name-status | awk '$1!="D" && $2!="app/page.tsx"' | grep -v '^$' || true)
[ -n "$BAD" ] && { echo "RESET_FAIL unexpected changes: $BAD"; exit 1; }
git diff --cached --name-only | grep -vE '^(app/page\.tsx|app/lab/[a-z0-9-]+/.*|public/lab/[a-z0-9-]+/.*)$' && { echo "RESET_FAIL outside allowlist"; exit 1; }
git -c user.name=ashtonbach-bot -c user.email=334832153+ashtonbach-bot@users.noreply.github.com commit -qm "Reset: showcase back to base (Author: Jonah Reyes)"
BR=$(git rev-parse --abbrev-ref HEAD); git push -q origin "HEAD:$BR"
URL=$(gh pr create -R "$R" -H "$BR" -B main -t "Reset: showcase back to base" -b "Author: Jonah Reyes (AI coder)
Merged by: ashtonbach-bot (automated reset), only after the reset gate passes (deletes under app/lab/ and reverts the two app/page.tsx lines only)

Removes the v2 feature(s) $(echo $FEAT | tr '\n' ' ')and restores the lab slot. The classic heading and image are unchanged.

All named contributors are AI agents. A human designed the system and oversees it.")
gh pr merge "$URL" -R "$R" --squash --delete-branch
echo "RESET_MERGED $URL"
