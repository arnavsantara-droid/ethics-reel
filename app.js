const Q = window.QUESTIONS;
const $ = s => document.querySelector(s);
const stem=$("#stem"), answers=$("#answers"), feedback=$("#feedback"), result=$("#result"), standard=$("#standard"), explanation=$("#explanation"), source=$("#source");
const timer=$("#timer"), qnum=$("#qnum"), difficulty=$("#difficulty"), score=$("#score"), streakEl=$("#streak"), seen=$("#seen"), next=$("#next");

let order=[], pos=0, current=null, seconds=60, interval=null, locked=false, attempted=Number(localStorage.getItem("er_attempted")||0), correct=Number(localStorage.getItem("er_correct")||0), streak=Number(localStorage.getItem("er_streak")||0);
let touchStartY=null;

function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function freshOrder(){order=shuffle(Q.map((_,i)=>i));pos=0}
function persist(){localStorage.setItem("er_attempted",attempted);localStorage.setItem("er_correct",correct);localStorage.setItem("er_streak",streak)}
function renderStats(){score.textContent=`${correct}/${attempted}`;streakEl.textContent=`🔥 ${streak}`;seen.textContent=`${pos+1} / ${Q.length}`}
function paintTimer(){timer.textContent=`00:${String(seconds).padStart(2,"0")}`;timer.classList.toggle("urgent",seconds<=10)}
function stopTimer(){if(interval){clearInterval(interval);interval=null}}
function startTimer(){stopTimer();seconds=60;paintTimer();interval=setInterval(()=>{if(locked)return;seconds--;paintTimer();if(seconds<=0){stopTimer();timeout()}},1000)}
function timeout(){locked=true;attempted++;streak=0;persist();reveal(null,false,true)}
function showQuestion(){
  if(order.length===0||pos>=order.length){freshOrder()}
  current=Q[order[pos]];
  locked=false;feedback.classList.add("hidden");answers.innerHTML="";
  stem.textContent=current.stem;difficulty.textContent=current.difficulty;qnum.textContent=`QUESTION ${pos+1}`;renderStats();
  current.options.forEach((text,i)=>{
    const b=document.createElement("button");b.className="answer";
    b.innerHTML=`<span class="letter">${String.fromCharCode(65+i)}</span><span>${text}</span>`;
    b.addEventListener("click",()=>choose(i,b));answers.appendChild(b)
  });
  window.scrollTo({top:0,behavior:"instant"});startTimer()
}
function choose(i,btn){
  if(locked)return;locked=true;stopTimer();attempted++;const ok=i===current.correct;if(ok){correct++;streak++}else{streak=0}persist();reveal(i,ok,false)
}
function reveal(selected,ok,timedOut){
  [...answers.children].forEach((b,i)=>{b.disabled=true;if(i===current.correct)b.classList.add("correct");if(selected===i&&!ok)b.classList.add("wrong")});
  feedback.classList.remove("hidden");
  if(timedOut){result.textContent=`TIME OUT — ${String.fromCharCode(65+current.correct)}`;result.className="result bad"}
  else if(ok){result.textContent="✓ CORRECT";result.className="result good"}
  else{result.textContent=`✕ WRONG — ${String.fromCharCode(65+current.correct)}`;result.className="result bad"}
  standard.textContent=current.standard;explanation.textContent=current.explanation;source.href=current.source;renderStats();
  feedback.scrollIntoView({behavior:"smooth",block:"nearest"})
}
function nextQuestion(){
  if(!locked)return;
  pos++;
  if(pos>=order.length){freshOrder()} 
  showQuestion()
}
next.addEventListener("click",nextQuestion);
$("#bookmark").addEventListener("click",e=>{e.currentTarget.textContent=e.currentTarget.textContent==="♡"?"♥":"♡"});

document.addEventListener("touchstart",e=>{touchStartY=e.changedTouches[0].screenY},{passive:true});
document.addEventListener("touchend",e=>{
  if(touchStartY===null)return;
  const dy=touchStartY-e.changedTouches[0].screenY;touchStartY=null;
  if(dy>70 && locked) nextQuestion();
},{passive:true});

if("serviceWorker" in navigator){
  window.addEventListener("load",async()=>{
    try{const r=await navigator.serviceWorker.register("./sw.js");r.update()}catch(e){}
  })
}
freshOrder();showQuestion();
