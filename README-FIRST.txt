CFA DOOMSCROLL — FSA + EQUITY INTEGRATED BUILD

This build now contains and uses the exact uploaded production banks:

FSA
- 100 questions
- permanent internal IDs q201–q300
- file: FSA_100_QUESTIONS_q201-q300.json

EQUITY
- 100 questions
- permanent internal IDs q301–q400
- file: EQUITY_100_QUESTIONS_q301-q400.json

APP BEHAVIOR
- FSA and Equity are separate queues.
- Internal IDs are never shown in the normal quiz UI.
- Visible numbering starts at QUESTION 1 for a fresh page/session.
- Hidden subject progress persists independently in localStorage.
- Correct / wrong / streak / position are independent per subject.
- Questions stay in bank order; no randomization is performed.
- Exactly three A/B/C options are used.
- The `correct` field is interpreted as zero-based: 0=A, 1=B, 2=C.
- The question-count label is read from the actual loaded bank, so FSA and Equity show 100 QUESTIONS.

UPLOAD THESE FILES TO THE ROOT OF YOUR GITHUB PAGES REPOSITORY
- index.html
- manifest.webmanifest
- app-icon.png
- app-icon-maskable.png
- FSA_100_QUESTIONS_q201-q300.json
- EQUITY_100_QUESTIONS_q301-q400.json

OPTIONAL / REFERENCE
- CFA_REEL_FSA_EQUITY_200_QUESTIONS.json

ETHICS
The app still supports your existing Ethics `questions.js` file. Keep/upload that alongside these files.

IMPORTANT FOR IPHONE HOME-SCREEN CACHE
After GitHub Pages finishes deploying:
1. Open the site in Safari.
2. Refresh once.
3. If an older Home Screen copy still appears, remove the old Home Screen icon and add the site to Home Screen again.
