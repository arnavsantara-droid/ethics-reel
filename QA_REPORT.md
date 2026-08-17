# CFA Reel QA — v2026.08.17.03

Validation targets for this patch:

- JavaScript syntax
- 100-question FSA bank loads
- 100-question Equity bank loads
- legacy Ethics loader remains intact
- exactly A/B/C rendering logic unchanged
- timer/timeout behavior unchanged
- Next behavior unchanged
- stable per-subject position/correct/wrong/streak persistence unchanged
- daily stats increment once on correct answer
- daily stats increment once on incorrect answer
- daily stats increment once on timeout
- daily stats are keyed by local YYYY-MM-DD and therefore reset on a new local calendar day without resetting subject progress
- Questions Today renders every configured subject dynamically
- shell/cache version bumped without changing QUESTION_BUILD_ID
- app icon files replaced at 180×180, 192×192, and 512×512

See final response for executed validation results.


## Executed validation
- PASS — `node --check` on `app.js`, both new subject banks, and `sw.js`.
- PASS — FSA bank count = 100; Equity bank count = 100.
- PASS — every FSA/Equity question still has exactly 3 options and a valid 0/1/2 correct index.
- PASS — one-time daily migration copied existing subject correct/wrong totals into today's dashboard without changing subject progress.
- PASS — recording a new answer increments the correct daily bucket exactly once in the unit harness.
- PASS — loading a different local-date key returns a fresh zeroed daily summary while saved subject progress remains unchanged.
- PASS — rendered home markup contains the QUESTIONS TODAY card and configured subject rows.
- PASS — app icons are exactly 180×180, 192×192, and 512×512 and were visually inspected.
- NOT EXECUTED — full Safari/iPhone PWA runtime test; this environment cannot reproduce the user's installed iOS Home Screen cache behavior.
