# Merge Gates Configuration

This document explains the merge gates for the agent-showcase repository and how to configure them.

## Required Checks (Block Merge)

All pull requests to `main` must pass these required checks before merge:

1. **Gate checks (Allowlist, Size, Banned calls)** - CI job `gate-checks`
   - Validates only approved file paths change
   - Enforces 150-line code change limit
   - Blocks banned calls (fetch, eval, external imports)

2. **Functional checks** - CI job `functional-checks`
   - Runs feature-specific functional tests from `scripts/v2/specs/<slug>.js`
   - Validates feature renders correctly
   - Checks for console errors and layout issues

3. **Copy coverage (>=90% for spanish-translation)** - CI job `copy-coverage`
   - Only runs for spanish-translation feature
   - Requires at least 90% of message keys to be translated
   - Blocks merge if coverage is below threshold

4. **Build** - Vercel deployment check
   - `npm run build` must succeed
   - Vercel preview must deploy successfully

5. **Reviewer approval**
   - Manual approval by reviewer after checking Vercel preview

## Advisory Checks (Informational)

These checks provide information but do NOT block merge:

- **Visual diff**: Pixel comparison against reference screenshots
  - References may be outdated
  - Used to detect unintended visual changes
  - Max 1% pixel difference is informational only

## GitHub Repository Configuration

To enforce these gates, configure required status checks in GitHub:

### Settings → Branches → Branch protection rules → main

1. **Require status checks to pass before merging**: ✓ Enabled

2. **Required status checks**:
   - `Gate checks (Allowlist, Size, Banned calls)`
   - `Functional checks`
   - `Copy coverage (>=90% for spanish-translation)` (if applicable)
   - `Vercel` (build check)

3. **Require branches to be up to date before merging**: ✓ Enabled

4. **Require pull request reviews before merging**: ✓ Enabled
   - Required approving reviews: 1

### Verification

After configuration:
1. Create a test PR with a failing check
2. Verify the "Merge" button is disabled
3. Verify the PR shows "Merging is blocked"
4. Verify the specific failing check is highlighted

## Testing

Run the gate tests locally:

```bash
node scripts/v2/gate.test.js
```

This verifies that gate violations are correctly detected and would block merge in CI.

## PR Body Template

The PR template at `.github/pull_request_template.md` includes a "Merge gate status" section that lists all required and advisory checks. Update this section as checks run:

- Required checks must show PASS before merge
- A FAIL in any required check blocks merge
- Advisory checks are clearly labeled as informational

## Historical Context

**Issue identified**: PR #122 (Spanish translation) merged despite showing:
- Functional FAIL
- COPY_OK 44% (below 90% threshold)

**Root cause**: These checks were only documented in PR bodies but not configured as required GitHub status checks, allowing manual merge despite failures.

**Fix**: Added CI workflows that run these checks and marked them as required in branch protection rules.
