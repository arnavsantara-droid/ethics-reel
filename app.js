(() => {
  'use strict';

  const BUILD_VERSION = '2026.08.17.03';
  const QUESTION_BUILD_ID = '2026-08-17-bank-1';
  const PROGRESS_PREFIX = 'cfaReel:progress:';
  const DAILY_PREFIX = 'cfaReel:daily:';
  const DAILY_MIGRATION = 'cfaReel:migration:daily-v1:2026.08.17.03';
  const ETHICS_Q8_MIGRATION = 'cfaReel:migration:ethics-q8:2026.08.17.02';
  const LEGACY_ETHICS_CANDIDATES = [
    `./questions.js?v=${encodeURIComponent(BUILD_VERSION)}`,
    `./questions(1).js?v=${encodeURIComponent(BUILD_VERSION)}`
  ];
  const SUBJECTS = {
    FSA: { key: 'FSA', label: 'FSA', long: 'Financial Statement Analysis', bank: () => window.FSA_QUESTIONS || [] },
    Equity: { key: 'Equity', label: 'EQUITY', long: 'Equity Investments', bank: () => window.EQUITY_QUESTIONS || [] },
    Ethics: { key: 'Ethics', label: 'ETHICS', long: 'Ethical & Professional Standards', bank: () => window.QUESTIONS || [] }
  };

  const app = document.getElementById('app');
  let activeSubject = null;
  let activeBank = [];
  let state = null;
  let timerHandle = null;
  let deadlineMs = null;

  function storageKey(subject) {
    return `${PROGRESS_PREFIX}${subject}`;
  }

  function blankState() {
    return { buildId: QUESTION_BUILD_ID, index: 0, correct: 0, wrong: 0, streak: 0, answered: false, selected: null, timedOut: false, remaining: 60 };
  }

  function legacyStateKeys(subject) {
    const keys = [`cfaReel:2026.08.17.01:${subject}`];
    try {
      for (let i = 0; i < localStorage.length; i += 1) {
        const key = localStorage.key(i);
        if (key && key !== storageKey(subject) && key.startsWith('cfaReel:') && key.endsWith(`:${subject}`) && !keys.includes(key)) keys.push(key);
      }
    } catch (_) {}
    return keys;
  }

  function readStoredState(subject) {
    try {
      const current = localStorage.getItem(storageKey(subject));
      if (current) return { value: JSON.parse(current), migrated: false };
      for (const key of legacyStateKeys(subject)) {
        const raw = localStorage.getItem(key);
        if (raw) return { value: JSON.parse(raw), migrated: true };
      }
    } catch (_) {}
    return { value: null, migrated: false };
  }

  function normalizeState(raw, bankLength) {
    let s = { ...blankState(), ...(raw || {}) };
    if (raw && raw.buildId && raw.buildId !== QUESTION_BUILD_ID) s = blankState();
    s.buildId = QUESTION_BUILD_ID;
    s.index = Number.isInteger(s.index) ? Math.max(0, Math.min(s.index, bankLength)) : 0;
    s.correct = Number.isInteger(s.correct) && s.correct >= 0 ? s.correct : 0;
    s.wrong = Number.isInteger(s.wrong) && s.wrong >= 0 ? s.wrong : 0;
    s.streak = Number.isInteger(s.streak) && s.streak >= 0 ? s.streak : 0;
    s.remaining = Number.isFinite(s.remaining) ? Math.max(0, Math.min(60, Math.ceil(s.remaining))) : 60;
    if (s.index >= bankLength) {
      s.answered = false; s.selected = null; s.timedOut = false; s.remaining = 60;
    }
    return s;
  }

  function applyOneTimeMigrations(subject, s, bankLength) {
    if (subject !== 'Ethics' || bankLength < 8) return s;
    try {
      if (!localStorage.getItem(ETHICS_Q8_MIGRATION)) {
        // User explicitly reported that visible Ethics Question 8 is the current question.
        // Preserve score/streak totals, but resume the queue at Q8 (zero-based index 7).
        s.index = 7;
        s.answered = false;
        s.selected = null;
        s.timedOut = false;
        s.remaining = 60;
        localStorage.setItem(ETHICS_Q8_MIGRATION, 'done');
      }
    } catch (_) {}
    return s;
  }

  function loadState(subject, bankLength) {
    const stored = readStoredState(subject);
    const s = applyOneTimeMigrations(subject, normalizeState(stored.value, bankLength), bankLength);
    // Persist migrations immediately under the stable key so future shell/cache versions cannot reset position.
    try { localStorage.setItem(storageKey(subject), JSON.stringify(s)); } catch (_) {}
    return s;
  }

  function saveState() {
    if (!activeSubject || !state) return;
    syncRemainingFromClock();
    try { localStorage.setItem(storageKey(activeSubject), JSON.stringify(state)); } catch (_) {}
  }

  function localDateKey(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function dailyStorageKey(dateKey = localDateKey()) {
    return `${DAILY_PREFIX}${dateKey}`;
  }

  function blankDaily(dateKey = localDateKey()) {
    return { date: dateKey, subjects: {} };
  }

  function normalizeDaily(raw, dateKey = localDateKey()) {
    const out = blankDaily(dateKey);
    if (!raw || raw.date !== dateKey || typeof raw.subjects !== 'object' || raw.subjects === null) return out;
    for (const [subject, values] of Object.entries(raw.subjects)) {
      const correct = Number.isInteger(values?.correct) && values.correct >= 0 ? values.correct : 0;
      const wrong = Number.isInteger(values?.wrong) && values.wrong >= 0 ? values.wrong : 0;
      out.subjects[subject] = { correct, wrong };
    }
    return out;
  }

  function loadDaily(dateKey = localDateKey()) {
    try {
      const raw = localStorage.getItem(dailyStorageKey(dateKey));
      return normalizeDaily(raw ? JSON.parse(raw) : null, dateKey);
    } catch (_) {
      return blankDaily(dateKey);
    }
  }

  function saveDaily(daily) {
    try { localStorage.setItem(dailyStorageKey(daily.date), JSON.stringify(daily)); } catch (_) {}
  }

  function recordDaily(subject, isCorrect) {
    const today = localDateKey();
    const daily = loadDaily(today);
    if (!daily.subjects[subject]) daily.subjects[subject] = { correct: 0, wrong: 0 };
    if (isCorrect) daily.subjects[subject].correct += 1;
    else daily.subjects[subject].wrong += 1;
    saveDaily(daily);
  }

  function migrateTodayFromExistingProgress() {
    try {
      if (localStorage.getItem(DAILY_MIGRATION)) return;
      const today = localDateKey();
      const key = dailyStorageKey(today);
      if (!localStorage.getItem(key)) {
        const daily = blankDaily(today);
        for (const [subject, cfg] of Object.entries(SUBJECTS)) {
          const bank = cfg.bank();
          if (!Array.isArray(bank) || !bank.length) continue;
          const saved = loadState(subject, bank.length);
          if (saved.correct > 0 || saved.wrong > 0) {
            daily.subjects[subject] = { correct: saved.correct, wrong: saved.wrong };
          }
        }
        saveDaily(daily);
      }
      localStorage.setItem(DAILY_MIGRATION, 'done');
    } catch (_) {}
  }

  function esc(s) {
    return String(s ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  }

  function answerLetter(i) { return ['A','B','C'][i] || ''; }
  function formatTime(sec) {
    sec = Math.max(0, Math.min(60, Math.ceil(sec)));
    return `${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`;
  }

  function syncRemainingFromClock() {
    if (!state || state.answered || deadlineMs == null) return;
    state.remaining = Math.max(0, Math.ceil((deadlineMs - Date.now()) / 1000));
  }

  function stopTimer() {
    if (timerHandle) clearInterval(timerHandle);
    timerHandle = null;
    syncRemainingFromClock();
    deadlineMs = null;
  }

  function setTimerText() {
    const el = document.getElementById('timer');
    if (!el || !state) return;
    el.textContent = formatTime(state.remaining);
    el.classList.toggle('expired', state.remaining <= 0);
  }

  function startTimer() {
    stopTimer();
    if (!state || state.answered || state.index >= activeBank.length) return;
    if (state.remaining <= 0) return timeoutQuestion();
    deadlineMs = Date.now() + state.remaining * 1000;
    setTimerText();
    timerHandle = setInterval(() => {
      const newRemaining = Math.max(0, Math.ceil((deadlineMs - Date.now()) / 1000));
      if (newRemaining !== state.remaining) {
        state.remaining = newRemaining;
        setTimerText();
        saveStateWithoutClockSync();
      }
      if (state.remaining <= 0) timeoutQuestion();
    }, 200);
  }

  function saveStateWithoutClockSync() {
    if (!activeSubject || !state) return;
    try { localStorage.setItem(storageKey(activeSubject), JSON.stringify(state)); } catch (_) {}
  }

  function timeoutQuestion() {
    if (!state || state.answered) return;
    if (timerHandle) clearInterval(timerHandle);
    timerHandle = null;
    deadlineMs = null;
    state.remaining = 0;
    state.answered = true;
    state.selected = null;
    state.timedOut = true;
    state.wrong += 1;
    state.streak = 0;
    recordDaily(activeSubject, false);
    saveStateWithoutClockSync();
    renderQuiz(false);
  }

  function chooseOption(i) {
    if (!state || state.answered || state.index >= activeBank.length) return;
    const q = activeBank[state.index];
    stopTimer();
    state.selected = i;
    state.answered = true;
    state.timedOut = false;
    if (i === q.correct) {
      state.correct += 1;
      state.streak += 1;
      recordDaily(activeSubject, true);
    } else {
      state.wrong += 1;
      state.streak = 0;
      recordDaily(activeSubject, false);
    }
    saveStateWithoutClockSync();
    renderQuiz(false);
  }

  function nextQuestion() {
    if (!state || !state.answered) return;
    state.index += 1;
    state.answered = false;
    state.selected = null;
    state.timedOut = false;
    state.remaining = 60;
    saveStateWithoutClockSync();
    if (state.index >= activeBank.length) renderComplete();
    else renderQuiz(true);
  }

  function goHome() {
    saveState();
    stopTimer();
    activeSubject = null;
    activeBank = [];
    state = null;
    renderHome();
  }

  function enterSubject(key) {
    const cfg = SUBJECTS[key];
    const bank = cfg ? cfg.bank() : [];
    if (!cfg || !Array.isArray(bank) || !bank.length) return;
    activeSubject = key;
    activeBank = bank;
    state = loadState(key, bank.length);
    if (state.index >= bank.length) renderComplete();
    else renderQuiz(true);
  }

  function renderHome() {
    const keys = Object.keys(SUBJECTS);
    const daily = loadDaily();
    const todayRows = keys.map(key => {
      const cfg = SUBJECTS[key];
      const stats = daily.subjects[key] || { correct: 0, wrong: 0 };
      const attempted = stats.correct + stats.wrong;
      return `<div class="today-row">
        <div class="today-subject">${esc(cfg.label)}</div>
        <div class="today-numbers"><strong>${attempted}</strong> question${attempted === 1 ? '' : 's'} <span>·</span> <span class="today-good">✓ ${stats.correct}</span> <span>·</span> <span class="today-bad">✕ ${stats.wrong}</span></div>
      </div>`;
    }).join('');

    const cards = keys.map(key => {
      const cfg = SUBJECTS[key];
      const bank = cfg.bank();
      const available = Array.isArray(bank) && bank.length > 0;
      const saved = available ? loadState(key, bank.length) : null;
      const resume = saved && saved.index > 0 && saved.index < bank.length ? `Resume at Question ${saved.index + 1}` : saved && saved.index >= bank.length ? 'Completed in this build' : 'Start at Question 1';
      const meta = available ? `${bank.length} questions · ${resume}` : (key === 'Ethics' ? 'Existing Ethics bank not found in this upload' : 'Question bank unavailable');
      return `<button class="subject-card" data-subject="${esc(key)}" ${available ? '' : 'disabled'}>
        <div><div class="subject-name">${esc(cfg.label)}</div><div class="subject-meta">${esc(meta)}</div></div>
        <div class="subject-arrow">→</div>
      </button>`;
    }).join('');

    app.innerHTML = `<section class="home">
      <div class="brand-kicker">CFA LEVEL I · 2027</div>
      <h1>CFA REEL</h1>
      <p class="home-intro">Choose one subject. Each subject keeps its own progress, score and streak.</p>
      <section class="today-card" aria-label="Questions Today">
        <div class="today-title">QUESTIONS TODAY</div>
        <div class="today-date">${esc(daily.date)}</div>
        <div class="today-list">${todayRows}</div>
      </section>
      <div class="subject-list">${cards}</div>
      <div class="home-foot">Independent practice tool. Original questions. Not affiliated with or endorsed by CFA Institute.</div>
    </section>`;
    app.querySelectorAll('[data-subject]:not(:disabled)').forEach(btn => btn.addEventListener('click', () => enterSubject(btn.dataset.subject)));
  }

  function renderQuiz(shouldStartTimer) {
    if (!state || state.index >= activeBank.length) return renderComplete();
    const q = activeBank[state.index];
    const cfg = SUBJECTS[activeSubject];
    const answered = state.answered;
    const correct = q.correct;
    const options = q.options.map((opt, i) => {
      let cls = 'option';
      if (answered) {
        if (i === correct) cls += ' correct';
        else if (state.selected === i) cls += ' wrong';
        else cls += ' muted';
      }
      return `<button class="${cls}" data-option="${i}" ${answered ? 'disabled' : ''}>
        <span class="option-letter">${answerLetter(i)}</span><span>${esc(opt)}</span>
      </button>`;
    }).join('');

    let result = '';
    if (answered) {
      const isGood = !state.timedOut && state.selected === correct;
      const title = state.timedOut ? 'Time expired — incorrect' : (isGood ? 'Correct' : 'Incorrect');
      const topic = q.topic || q.standard || cfg.long;
      const subtopic = q.subtopic ? ` · ${q.subtopic}` : '';
      result = `<section class="result">
        <div class="result-title ${isGood ? 'good' : 'bad'}">${esc(title)}</div>
        <div class="correct-answer">Correct answer: ${answerLetter(correct)} — ${esc(q.options[correct])}</div>
        <div class="explanation">${esc(q.explanation)}</div>
        <div class="topic-box"><strong>${esc(topic)}${esc(subtopic)}</strong>
          ${q.source ? `<a class="source-link" href="${esc(q.source)}" target="_blank" rel="noopener noreferrer">Official CFA Institute source ↗</a>` : ''}
        </div>
      </section>`;
    }

    app.innerHTML = `<section class="quiz">
      <header class="quiz-top">
        <div class="top-left"><button class="back-btn" id="back" aria-label="Back to subjects">‹</button><div class="subject-heading">${esc(cfg.label)} · ${activeBank.length} QUESTIONS</div></div>
        <div class="timer ${state.remaining <= 0 ? 'expired' : ''}" id="timer">${formatTime(state.remaining)}</div>
        <div></div>
      </header>
      <div class="quiz-scroll">
        <div class="q-label">QUESTION ${state.index + 1}</div>
        <p class="stem">${esc(q.stem)}</p>
        <div class="options">${options}</div>
        ${result}
      </div>
      <footer class="quiz-bottom">
        <div class="stats"><span>🔥 ${state.streak}</span><span class="stat good">✓ ${state.correct}</span><span class="stat bad">✕ ${state.wrong}</span></div>
        <button class="next-btn" id="next" ${answered ? '' : 'disabled'}>NEXT QUESTION →</button>
      </footer>
    </section>`;

    document.getElementById('back').addEventListener('click', goHome);
    document.getElementById('next').addEventListener('click', nextQuestion);
    if (!answered) app.querySelectorAll('[data-option]').forEach(btn => btn.addEventListener('click', () => chooseOption(Number(btn.dataset.option))));
    if (shouldStartTimer && !answered) startTimer();
  }

  function renderComplete() {
    stopTimer();
    const cfg = SUBJECTS[activeSubject];
    app.innerHTML = `<section class="complete"><div class="brand-kicker">${esc(cfg.label)}</div><h2>Subject bank complete.</h2><p>You reached the end of this build's ${activeBank.length} ${esc(cfg.label)} questions. Your completed state is preserved until the next refreshed build.</p><button id="homeBtn">BACK TO SUBJECTS</button></section>`;
    document.getElementById('homeBtn').addEventListener('click', goHome);
  }

  function tryLoadScript(url) {
    return new Promise(resolve => {
      const s = document.createElement('script');
      s.src = url;
      s.async = true;
      s.onload = () => resolve(Array.isArray(window.QUESTIONS) && window.QUESTIONS.length > 0);
      s.onerror = () => { s.remove(); resolve(false); };
      document.head.appendChild(s);
    });
  }

  async function loadLegacyEthics() {
    if (Array.isArray(window.QUESTIONS) && window.QUESTIONS.length) return true;
    for (const url of LEGACY_ETHICS_CANDIDATES) {
      const ok = await tryLoadScript(url);
      if (ok) return true;
    }
    return false;
  }

  function registerSW() {
    if ('serviceWorker' in navigator && location.protocol !== 'file:') {
      window.addEventListener('load', () => {
        const hadController = !!navigator.serviceWorker.controller;
        navigator.serviceWorker.register(`./sw.js?v=${BUILD_VERSION}`, { updateViaCache: 'none' }).then(reg => {
          reg.update().catch(() => {});
          if (hadController) {
            navigator.serviceWorker.addEventListener('controllerchange', () => {
              if (!sessionStorage.getItem('cfaReelSwReloaded')) {
                sessionStorage.setItem('cfaReelSwReloaded', '1');
                location.reload();
              }
            }, { once: true });
          }
        }).catch(() => {});
      });
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { saveState(); stopTimer(); }
    else if (activeSubject && state && !state.answered && state.index < activeBank.length) startTimer();
  });
  window.addEventListener('pagehide', () => { saveState(); stopTimer(); });

  async function boot() {
    await loadLegacyEthics();
    migrateTodayFromExistingProgress();
    renderHome();
    registerSW();
  }

  boot();
})();
