/*
CFA Doomscroll FIFO Refresh — 2026-08-18
Completed since prior refresh: Ethics 2.
FIFO action: drop first 2 old Ethics questions, append 2 brand-new Ethics questions.
Active bank remains 115 questions.
*/
window.__ETHICS_BANK_READY__ = (async () => {
  const urls = [
    "https://raw.githubusercontent.com/arnavsantara-droid/ethics-reel/cf9ade0cf3d1cce83f228ac55f1b18a66a24794f/questions.js",
    "https://cdn.jsdelivr.net/gh/arnavsantara-droid/ethics-reel@cf9ade0cf3d1cce83f228ac55f1b18a66a24794f/questions.js"
  ];
  async function fetchSource() {
    let lastError;
    for (const url of urls) {
      try {
        const r = await fetch(url, {cache:"force-cache"});
        if (r.ok) return await r.text();
        lastError = new Error(`HTTP ${r.status}`);
      } catch (e) { lastError = e; }
    }
    throw lastError || new Error("Could not load prior Ethics bank");
  }
  const oldSource = await fetchSource();
  window.QUESTIONS = undefined;
  (0,eval)(oldSource);
  const prior = Array.isArray(window.QUESTIONS) ? window.QUESTIONS.slice() : [];
  if (prior.length < 115) throw new Error("Prior Ethics bank is incomplete");
  const newTail = [
  {
    "id": "eth20260818_001",
    "difficulty": "HARD",
    "standard": "III(A) Loyalty, Prudence, and Care",
    "stem": "A portfolio manager receives a client instruction to hold a concentrated position in the stock of the client's employer even though the manager believes the position is unsuitable for the client's stated long-term objective. The instruction is lawful and the client fully understands the concentration risk. Under the Standards, the manager should most appropriately:",
    "options": [
      "ignore the instruction because the manager's fiduciary judgment always overrides an informed client's lawful directions.",
      "follow the client's lawful instruction while documenting the instruction and continuing to communicate the resulting risks.",
      "sell enough of the position to satisfy the manager's normal diversification policy, then inform the client afterward."
    ],
    "correct": 1,
    "explanation": "Loyalty, prudence, and care are owed to the client and must be exercised within the client's objectives, constraints, and lawful instructions. An informed client can impose a concentration constraint. The manager should document it and continue to communicate the consequences rather than unilaterally overriding it.",
    "source": ""
  },
  {
    "id": "eth20260818_002",
    "difficulty": "BRUTAL",
    "standard": "V(A) Diligence and Reasonable Basis",
    "stem": "An analyst builds an earnings forecast using a reputable third-party industry database that the firm has used successfully for years. A newly released data point looks inconsistent with the issuer's filings, but using it would not materially change the analyst's recommendation. The analyst most appropriately should:",
    "options": [
      "use the data because a reputable external source automatically provides a reasonable basis.",
      "investigate the inconsistency before relying on the questionable data, even if the recommendation is unlikely to change.",
      "use the data as long as the report discloses that a third-party database was the source."
    ],
    "correct": 1,
    "explanation": "A reasonable basis requires diligence in evaluating the reliability of information used in investment analysis. A reputable source can be relied on in many circumstances, but a specific red flag creates a duty to investigate. Immateriality to the final recommendation does not eliminate the diligence requirement.",
    "source": ""
  }
];
  window.QUESTIONS = prior.slice(2).concat(newTail);
  if (window.QUESTIONS.length !== 115) throw new Error("FIFO Ethics bank length mismatch");
})();
