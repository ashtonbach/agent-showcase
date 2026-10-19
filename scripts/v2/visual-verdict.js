// Visual verdict for check-feature.js. A pixel diff can only FAIL when something was actually compared:
//  - a real diff over the threshold, or a size mismatch against a reference -> FAIL
//  - no reference for this feature (never shipped, so there is no known-good render to compare with) -> SKIPPED, not a failure
//  - nothing compared at all (maxDiff null: typed request, no reference) -> SKIPPED
// Missing references are reported as "visual: no reference (skipped)" and never count toward RESULT FAIL.
const verdict = ({ update = false, fails = [], diffs = [] }) => {
  if (update) return "UPDATED";
  if (fails.some((f) => f.startsWith("visual"))) return "FAIL";
  return diffs.length ? "PASS" : "SKIPPED";
};
const noRefNote = (name) => `visual: no reference (skipped): ${name} does not exist yet; this feature has no known-good render to diff against`;
module.exports = { verdict, noRefNote };
