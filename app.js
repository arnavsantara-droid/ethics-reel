const timerEl = document.getElementById("timer");
const feedback = document.getElementById("feedback");
const feedbackTitle = document.getElementById("feedbackTitle");
const answers = [...document.querySelectorAll(".answer")];

let seconds = 60;
let locked = false;
let interval = null;

function paintTimer(){
  const mm = String(Math.floor(seconds/60)).padStart(2,"0");
  const ss = String(seconds%60).padStart(2,"0");
  timerEl.textContent = `${mm}:${ss}`;
}

function stopTimer(){
  if(interval){ clearInterval(interval); interval = null; }
}

function startTimer(){
  stopTimer();
  seconds = 60;
  paintTimer();
  interval = setInterval(()=>{
    if(locked) return;
    seconds -= 1;
    paintTimer();
    if(seconds <= 0){
      stopTimer();
      locked = true;
      feedback.classList.remove("hidden");
      feedbackTitle.textContent = "TIME OUT";
      feedbackTitle.style.color = "#d60000";
      answers[1].classList.add("correct");
    }
  },1000);
}

answers.forEach((btn,i)=>{
  btn.addEventListener("click",()=>{
    if(locked) return;
    locked = true;
    stopTimer();
    const correct = i === 1;
    btn.classList.add(correct ? "correct" : "wrong");
    if(!correct) answers[1].classList.add("correct");
    feedback.classList.remove("hidden");
    feedbackTitle.textContent = correct ? "✓ CORRECT" : "✕ WRONG — B";
    feedbackTitle.style.color = correct ? "#138a45" : "#d60000";
  });
});

document.getElementById("bookmark").addEventListener("click",(e)=>{
  e.currentTarget.textContent = e.currentTarget.textContent === "♡" ? "♥" : "♡";
});

if("serviceWorker" in navigator){
  window.addEventListener("load",()=>{
    navigator.serviceWorker.register("./sw.js").catch(()=>{});
  });
}

startTimer();
