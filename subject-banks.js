/*
CFA Doomscroll FIFO Refresh — 2026-08-18
Completed since prior refresh: Equity 20, FSA 0.
FIFO action: keep FSA unchanged; drop first 20 old Equity questions; append 20 brand-new Equity questions.
Active banks remain FSA 100 and Equity 100 questions.
*/
window.__SUBJECT_BANKS_READY__ = (async () => {
  const urls = [
    "https://raw.githubusercontent.com/arnavsantara-droid/ethics-reel/cf9ade0cf3d1cce83f228ac55f1b18a66a24794f/subject-banks.js",
    "https://cdn.jsdelivr.net/gh/arnavsantara-droid/ethics-reel@cf9ade0cf3d1cce83f228ac55f1b18a66a24794f/subject-banks.js"
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
    throw lastError || new Error("Could not load prior subject banks");
  }
  const oldSource = await fetchSource();
  window.FSA_QUESTIONS = undefined;
  window.EQUITY_QUESTIONS = undefined;
  (0,eval)(oldSource);
  const priorFSA = Array.isArray(window.FSA_QUESTIONS) ? window.FSA_QUESTIONS.slice() : [];
  const priorEquity = Array.isArray(window.EQUITY_QUESTIONS) ? window.EQUITY_QUESTIONS.slice() : [];
  if (priorFSA.length < 100 || priorEquity.length < 100) throw new Error("Prior subject bank is incomplete");
  const newEquityTail = [
  {
    "id": "eq20260818_001",
    "subject": "Equity Investments",
    "topic": "Market Organization and Structure",
    "subtopic": "Order types",
    "difficulty": "HARD",
    "stem": "An investor wants to buy a thinly traded stock but is unwilling to pay more than ₹412 per share. Which order best matches the investor's objective?",
    "options": [
      "A market buy order",
      "A buy limit order at ₹412",
      "A stop buy order at ₹412"
    ],
    "correct": 1,
    "explanation": "A buy limit order sets the maximum acceptable purchase price. It protects price but does not guarantee execution. A market order prioritizes execution, while a buy stop becomes active only after the stop price is reached.",
    "source": ""
  },
  {
    "id": "eq20260818_002",
    "subject": "Equity Investments",
    "topic": "Market Organization and Structure",
    "subtopic": "Short selling",
    "difficulty": "HARD",
    "stem": "Compared with a long position in an unlevered common stock, a short position in the same stock is most accurately characterized by:",
    "options": [
      "a maximum loss limited to the initial proceeds from the short sale.",
      "a theoretically unlimited maximum loss because the stock price can rise without a fixed upper bound.",
      "a maximum gain that is theoretically unlimited because the stock price can fall below zero."
    ],
    "correct": 1,
    "explanation": "The maximum gain on a short sale is limited because a stock cannot fall below zero, while the loss can grow without a fixed upper bound if the stock price rises substantially.",
    "source": ""
  },
  {
    "id": "eq20260818_003",
    "subject": "Equity Investments",
    "topic": "Security Market Indexes",
    "subtopic": "Price-weighted index",
    "difficulty": "HARD",
    "stem": "A price-weighted index contains three stocks priced at ₹40, ₹60, and ₹100, with a divisor of 3. The next day their prices are ₹44, ₹57, and ₹105 and no corporate actions occur. The index return is closest to:",
    "options": [
      "2.0%",
      "3.0%",
      "5.0%"
    ],
    "correct": 1,
    "explanation": "Initial index = (40+60+100)/3 = 66.67. New index = (44+57+105)/3 = 68.67. Return = 68.67/66.67 − 1 ≈ 3.0%.",
    "source": ""
  },
  {
    "id": "eq20260818_004",
    "subject": "Equity Investments",
    "topic": "Security Market Indexes",
    "subtopic": "Float adjustment",
    "difficulty": "HARD",
    "stem": "The primary reason a market-capitalization-weighted index may use free-float adjustment is to:",
    "options": [
      "reduce the weight of shares that are not realistically available for public trading.",
      "prevent high-price stocks from dominating the index regardless of company size.",
      "force every constituent to have the same portfolio weight after each rebalancing."
    ],
    "correct": 0,
    "explanation": "Free-float adjustment excludes or reduces the influence of strategic, controlling, government, or other closely held shares that are not normally available to public investors.",
    "source": ""
  },
  {
    "id": "eq20260818_005",
    "subject": "Equity Investments",
    "topic": "Market Efficiency",
    "subtopic": "Semi-strong form efficiency",
    "difficulty": "BRUTAL",
    "stem": "If a market is semi-strong-form efficient, which strategy is least likely to generate persistent abnormal returns after costs?",
    "options": [
      "Trading immediately on newly published public earnings information after it becomes widely available",
      "Analyzing genuinely private information before it becomes public",
      "Earning compensation for bearing systematic risk over long horizons"
    ],
    "correct": 0,
    "explanation": "Semi-strong efficiency implies that publicly available information is rapidly reflected in prices. Trading on already-public information should therefore not produce persistent abnormal risk-adjusted returns after costs.",
    "source": ""
  },
  {
    "id": "eq20260818_006",
    "subject": "Equity Investments",
    "topic": "Equity Securities",
    "subtopic": "Common shareholders",
    "difficulty": "HARD",
    "stem": "Common shareholders are best described as:",
    "options": [
      "residual claimants on the firm's assets and earnings after higher-priority claims are satisfied.",
      "creditors with a contractual claim to fixed interest payments.",
      "holders of a claim that must receive dividends before all preferred shareholders."
    ],
    "correct": 0,
    "explanation": "Common equity represents the residual ownership claim. Debt and many preferred claims have priority over common shareholders for contractual payments and liquidation proceeds.",
    "source": ""
  },
  {
    "id": "eq20260818_007",
    "subject": "Equity Investments",
    "topic": "Equity Securities",
    "subtopic": "Preferred shares",
    "difficulty": "HARD",
    "stem": "A cumulative preferred share differs from an otherwise identical non-cumulative preferred share because:",
    "options": [
      "unpaid preferred dividends accumulate and generally must be satisfied before common dividends resume.",
      "the preferred dividend automatically increases whenever common dividends increase.",
      "the preferred shareholder always receives voting control when one dividend is missed."
    ],
    "correct": 0,
    "explanation": "Cumulative preferred dividends in arrears accumulate. They generally must be paid before dividends can again be distributed to common shareholders. Voting consequences depend on the specific security terms.",
    "source": ""
  },
  {
    "id": "eq20260818_008",
    "subject": "Equity Investments",
    "topic": "Industry and Competitive Analysis",
    "subtopic": "Threat of new entrants",
    "difficulty": "HARD",
    "stem": "All else equal, the threat of new entrants into an industry is most likely higher when:",
    "options": [
      "economies of scale are strong and minimum efficient scale is large.",
      "customer switching costs are low and required initial capital is modest.",
      "incumbents control scarce distribution channels and regulation restricts licensing."
    ],
    "correct": 1,
    "explanation": "Low switching costs and modest capital requirements lower entry barriers. Strong scale economies, controlled distribution, and restrictive licensing raise barriers and reduce the threat of entry.",
    "source": ""
  },
  {
    "id": "eq20260818_009",
    "subject": "Equity Investments",
    "topic": "Industry and Competitive Analysis",
    "subtopic": "Industry concentration",
    "difficulty": "BRUTAL",
    "stem": "An analyst concludes that a domestic industry has strong pricing power solely because its four-firm concentration ratio is high. Which factor most weakens that conclusion?",
    "options": [
      "Large imports compete directly with domestic producers but are excluded from the domestic concentration calculation.",
      "The largest domestic firms have similar market shares.",
      "The industry has existed for several decades."
    ],
    "correct": 0,
    "explanation": "A high domestic concentration ratio can overstate actual market power when imports provide meaningful competition. Concentration measures should be interpreted together with market definition, entry barriers, substitutes, and international competition.",
    "source": ""
  },
  {
    "id": "eq20260818_010",
    "subject": "Equity Investments",
    "topic": "Company Analysis",
    "subtopic": "ROE and leverage",
    "difficulty": "BRUTAL",
    "stem": "A company's ROE rises while its operating margin and asset turnover both decline. Which change could most plausibly explain the higher ROE?",
    "options": [
      "A substantial increase in financial leverage",
      "A decline in the equity multiplier",
      "A reduction in debt relative to equity"
    ],
    "correct": 0,
    "explanation": "Under DuPont analysis, ROE can rise despite weaker operating margin and asset turnover if the equity multiplier increases enough. Higher leverage can therefore mask deterioration in operating performance.",
    "source": ""
  },
  {
    "id": "eq20260818_011",
    "subject": "Equity Investments",
    "topic": "Equity Valuation",
    "subtopic": "Gordon growth model",
    "difficulty": "HARD",
    "stem": "A stock is expected to pay a dividend of ₹3.20 one year from now. If the required return is 10.5% and dividends are expected to grow at 4.5% indefinitely, the stock's intrinsic value is closest to:",
    "options": [
      "₹45.71",
      "₹53.33",
      "₹71.11"
    ],
    "correct": 1,
    "explanation": "Using the Gordon growth model, V0 = D1/(r − g) = 3.20/(0.105 − 0.045) = ₹53.33.",
    "source": ""
  },
  {
    "id": "eq20260818_012",
    "subject": "Equity Investments",
    "topic": "Equity Valuation",
    "subtopic": "Two-stage dividend discount model",
    "difficulty": "EXTREME",
    "stem": "A company just paid a dividend of ₹2.00. Dividends are expected to grow 12% annually for two years and 5% thereafter. If the required return is 10%, the stock's intrinsic value is closest to:",
    "options": [
      "₹47.65",
      "₹50.19",
      "₹52.68"
    ],
    "correct": 0,
    "explanation": "D1=2.24, D2=2.5088, D3=2.63424. Terminal value at t=2 is 2.63424/(0.10−0.05)=52.6848. Present value = 2.24/1.10 + (2.5088+52.6848)/1.10² ≈ ₹47.65.",
    "source": ""
  },
  {
    "id": "eq20260818_013",
    "subject": "Equity Investments",
    "topic": "Equity Valuation",
    "subtopic": "Justified P/E",
    "difficulty": "EXTREME",
    "stem": "A mature company has an expected ROE of 15%, a retention ratio of 40%, and a required return of 11%. Assuming sustainable growth and the Gordon framework, its justified leading P/E is closest to:",
    "options": [
      "12.0×",
      "12.7×",
      "20.0×"
    ],
    "correct": 0,
    "explanation": "Sustainable growth g = 0.15×0.40 = 6%. Payout ratio = 60%. Justified leading P/E = payout/(r−g) = 0.60/(0.11−0.06) = 12.0×.",
    "source": ""
  },
  {
    "id": "eq20260818_014",
    "subject": "Equity Investments",
    "topic": "Equity Valuation",
    "subtopic": "Enterprise value multiples",
    "difficulty": "HARD",
    "stem": "A company has equity market capitalization of ₹600 million, debt of ₹150 million, preferred stock of ₹20 million, non-controlling interest of ₹10 million, cash of ₹50 million, and EBITDA of ₹80 million. Its EV/EBITDA is closest to:",
    "options": [
      "7.5×",
      "9.1×",
      "10.4×"
    ],
    "correct": 1,
    "explanation": "EV = 600 + 150 + 20 + 10 − 50 = ₹730 million. EV/EBITDA = 730/80 = 9.125×, or about 9.1×.",
    "source": ""
  },
  {
    "id": "eq20260818_015",
    "subject": "Equity Investments",
    "topic": "Equity Valuation",
    "subtopic": "Price-to-book ratio",
    "difficulty": "HARD",
    "stem": "Price-to-book is generally most informative, all else equal, for a company that:",
    "options": [
      "has large identifiable financial assets carried at values reasonably related to economic value.",
      "derives most of its value from internally generated brands and human capital not recognized on the balance sheet.",
      "has persistently negative book value of equity."
    ],
    "correct": 0,
    "explanation": "P/B tends to be more useful when book value is meaningful and related to economic value, as is often the case for financial firms. It is less informative for asset-light businesses with important unrecognized intangibles or negative book equity.",
    "source": ""
  },
  {
    "id": "eq20260818_016",
    "subject": "Equity Investments",
    "topic": "Equity Valuation",
    "subtopic": "Enterprise value versus equity value",
    "difficulty": "BRUTAL",
    "stem": "An analyst prefers EV/EBITDA to P/E when comparing two otherwise similar firms with very different capital structures. The strongest reason is that EV/EBITDA:",
    "options": [
      "uses a numerator and denominator that both reflect returns available to all major capital providers before interest expense.",
      "completely eliminates differences in accounting policy and capital intensity.",
      "is unaffected by changes in operating profitability."
    ],
    "correct": 0,
    "explanation": "Enterprise value reflects claims of both debt and equity capital providers, while EBITDA is measured before interest. This matching makes EV/EBITDA useful when leverage differs, although accounting and operating differences still matter.",
    "source": ""
  },
  {
    "id": "eq20260818_017",
    "subject": "Equity Investments",
    "topic": "Industry and Company Analysis",
    "subtopic": "Cyclical versus defensive firms",
    "difficulty": "HARD",
    "stem": "Which company is most likely to exhibit relatively defensive earnings across the business cycle?",
    "options": [
      "A producer of luxury recreational boats",
      "A regulated electricity distributor serving residential customers",
      "A manufacturer of heavy construction equipment"
    ],
    "correct": 1,
    "explanation": "Demand for essential regulated utility services tends to be less sensitive to economic cycles than discretionary luxury goods or capital equipment.",
    "source": ""
  },
  {
    "id": "eq20260818_018",
    "subject": "Equity Investments",
    "topic": "Market Organization and Structure",
    "subtopic": "Bid-ask spread",
    "difficulty": "HARD",
    "stem": "A stock has a best bid of ₹49.80 and best ask of ₹50.20. The quoted bid-ask spread as a percentage of the midpoint is closest to:",
    "options": [
      "0.4%",
      "0.8%",
      "1.6%"
    ],
    "correct": 1,
    "explanation": "Spread = 50.20−49.80 = ₹0.40. Midpoint = ₹50.00. Percentage spread = 0.40/50.00 = 0.8%.",
    "source": ""
  },
  {
    "id": "eq20260818_019",
    "subject": "Equity Investments",
    "topic": "Security Market Indexes",
    "subtopic": "Index weighting and rebalancing",
    "difficulty": "BRUTAL",
    "stem": "Relative to a market-cap-weighted index, an equal-weighted index most characteristically requires periodic rebalancing that:",
    "options": [
      "sells relative winners and buys relative losers to restore equal weights.",
      "increases the weight of stocks that have risen the most since the prior rebalance.",
      "requires no trading unless a constituent is added or deleted."
    ],
    "correct": 0,
    "explanation": "Price movements cause equal weights to drift. Restoring equal weights generally means trimming securities that outperformed and adding to those that underperformed, creating a contrarian rebalancing effect.",
    "source": ""
  },
  {
    "id": "eq20260818_020",
    "subject": "Equity Investments",
    "topic": "Security Market Indexes",
    "subtopic": "Corporate actions",
    "difficulty": "HARD",
    "stem": "In a price-weighted index, a constituent undergoes a 2-for-1 stock split with no change in the company's economic value. To prevent the split from creating an artificial index return, the index provider should most appropriately:",
    "options": [
      "adjust the index divisor.",
      "double the weight of every other constituent.",
      "leave the divisor unchanged because stock splits never affect a price-weighted index."
    ],
    "correct": 0,
    "explanation": "A stock split mechanically changes the constituent's quoted price. In a price-weighted index, the divisor is adjusted so the corporate action does not itself create an index gain or loss.",
    "source": ""
  }
];
  window.FSA_QUESTIONS = priorFSA;
  window.EQUITY_QUESTIONS = priorEquity.slice(20).concat(newEquityTail);
  if (window.FSA_QUESTIONS.length !== 100 || window.EQUITY_QUESTIONS.length !== 100) {
    throw new Error("FIFO subject bank length mismatch");
  }
})();
