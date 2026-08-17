# Ethics Reel — 115-question build

Upload every file in this folder to the root of your existing GitHub `ethics-reel` repository and commit the changes. GitHub Pages will redeploy automatically.

Then open your site with `?v=3` once in Safari to force a fresh version, for example:
`https://YOUR-USERNAME.github.io/ethics-reel/?v=3`

Delete/re-add the Home Screen icon only if iOS keeps an old cached shell.

Features: 115 original questions, A/B/C only, 60-second red timer, timeout = incorrect, explanation + CFA Institute verification link, persistent bottom-right Next button, score, streak, bookmarks. No swipe gesture is required.

UI v4: top-left now shows only `ETHICS · 115 QUESTIONS`; answered/correct count removed from the header.

UI v5:
- Removed visible HARD / BRUTAL / EXTREME labels.
- Top meta now shows only ETHICS · 2027.
- Added cache-busting to prevent mixed old/new files on iPhone.
- Disabled the old service-worker cache because it caused the question stem to load without A/B/C answer choices.

UI v6: bottom-left now shows streak on top, a green tick count for correct answers, a red cross count for wrong answers, and current position below.
