# CFA Reel update — v2026.08.17.03

## What changed
- Added a **QUESTIONS TODAY** dashboard card as the first card on the home screen.
- The dashboard shows, for every available subject: questions attempted today, correct, and wrong.
- Daily totals use the device's local calendar date and automatically start at zero on a new day.
- Daily totals are separate from persistent subject progress: midnight does **not** reset question position, build score, streak, or unseen-question order.
- Correct answers and timer timeouts both update the daily dashboard exactly once per attempted question.
- One-time migration seeds today's dashboard from existing current-build correct/wrong totals so the feature does not start blank in the middle of today's session.
- Existing independent subject progress persistence remains unchanged. Ethics remains on visible Question 8 unless the device has advanced beyond it since the prior patch.
- Replaced all PWA/app icons with the user's supplied portrait image.
- App/cache version bumped to **2026.08.17.03**. The hidden question-bank build ID is unchanged, so this shell update does not intentionally reset any subject queue.

## Upload to GitHub
Upload/replace:
- `index.html`
- `app.js`
- `styles.css`
- `sw.js`
- `manifest.webmanifest`
- `banks/`
- `icons/`

Keep your existing Ethics question file (`questions.js` or `questions(1).js`) in the repository.

After GitHub Pages deploys, open CFA Reel once in Safari. If the old Home Screen icon remains, remove the old Home Screen shortcut and use Safari → Share → Add to Home Screen again; iOS may retain an installed icon independently of the service-worker cache.
