CFA DOOMSCROLL — FINAL BUILD

FILES TO PUT IN THE ROOT OF YOUR GITHUB PAGES REPOSITORY:
1. index.html
2. manifest.webmanifest
3. app-icon.png
4. app-icon-maskable.png
5. your question-bank JS files

IMPORTANT:
- Replace the included fallback app-icon.png with your chosen square logo if you want that exact logo on the iPhone Home Screen.
- Keep the filename exactly: app-icon.png
- The latest Ethics production bank found in your prior uploads contains 200 questions and was named questions(1).js.
  Rename that file to questions.js before uploading it to the repository.
- The app displays bank.length automatically, so it will show 200 QUESTIONS rather than a hard-coded 115.

OTHER SUBJECT FILE NAMES SUPPORTED AUTOMATICALLY:
Quantitative Methods: questions-quant.js / quant.js / quantitative-methods.js
Economics: questions-economics.js / economics.js
FSA: questions-fsa.js / fsa.js / financial-statement-analysis.js
Corporate Issuers: questions-corporate.js / corporate.js / corporate-issuers.js
Equity: questions-equity.js / equity.js
Fixed Income: questions-fixed-income.js / fixed-income.js / fixedincome.js
Derivatives: questions-derivatives.js / derivatives.js
Alternative Investments: questions-alternatives.js / alternatives.js / alternative-investments.js
Portfolio Management: questions-portfolio.js / portfolio.js / portfolio-management.js

BANK EXPORT FORMAT:
Legacy format (works for any subject because the file is loaded on demand):
window.QUESTIONS = [ ... ];

Preferred format:
window.CFA_BANKS = window.CFA_BANKS || {};
window.CFA_BANKS.equity = [ ... ];

REFRESH BEHAVIOR:
- Visible label resets to QUESTION 1 on every fresh page/session.
- Hidden bank progress remains saved, so you continue from the next unseen internal question.
- Internal IDs remain hidden.
