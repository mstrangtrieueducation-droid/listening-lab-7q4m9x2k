"use client";
import { useMemo, useState } from "react";

const sections = [
  { label:"01 · CURRENT AFFAIRS", title:"School in a hotter world", text:[
    "Across several cities, schools are changing their routines as unusually hot weather becomes more common. Some now begin lessons earlier, while others have created shaded outdoor areas and installed extra drinking-water stations. According to local officials, these changes are not simply about comfort: high temperatures can reduce concentration and may even affect students’ health.",
    "At Greenfield Secondary School, the day now starts at [1] and outdoor sports are moved indoors when temperatures reach [2]. The head teacher says the new timetable was introduced after students reported feeling tired and [3] during afternoon lessons. Parents were initially concerned, but most now agree that the school has made a [4] decision." ] },
  { label:"02 · SCIENCE BRIEF", title:"Your brain after bedtime", text:[
    "Meanwhile, new research is offering teenagers another reason to protect their sleep. During the night, the brain does more than rest. It organises information collected during the day and helps turn new experiences into [5]. In one recent experiment, students who slept for at least eight hours remembered [6] more information than those who stayed awake late.",
    "Researchers warn that checking messages in bed can delay sleep, partly because bright screens keep the brain [7]. Their advice is practical: lower the lights, leave the phone outside the bedroom, and follow the same bedtime routine. These habits may sound simple, but when practised [8], they can improve both memory and mood." ] },
  { label:"03 · TEEN LIFE", title:"The 9 p.m. experiment", text:[
    "That idea inspired a group of fourteen-year-olds in Bristol to try a seven-day digital detox. After nine o’clock each evening, they stopped using social media and recorded how they felt. On the first two nights, several participants admitted that they were [9] to check their phones. By the end of the week, however, most said they fell asleep faster and felt more [10] in class.",
    "The experiment did not persuade everyone to abandon social media. Instead, it showed that small boundaries can make technology feel more useful and less demanding. One student described the challenge as ‘surprisingly [11]’. Another said the quiet hour before bed gave her time to read, prepare for the next day, and have a [12] conversation with her family." ] },
];
const answers=["7:45 a.m.","35 degrees","dizzy","responsible","long-term memories","nearly 40 percent","alert","consistently","tempted","focused","refreshing","proper"];
const fullScript=sections.flatMap(s=>s.text).join(" ").replace(/\[(\d+)\]/g,(_,n)=>answers[Number(n)-1]);
const norm=(v:string)=>v.toLowerCase().replace(/[.,’']/g,"").replace(/\s+/g," ").trim();

export default function Home(){
  const [values,setValues]=useState<string[]>(Array(12).fill("")); const [checked,setChecked]=useState(false); const [speaking,setSpeaking]=useState(false); const [rate,setRate]=useState(.9);
  const score=useMemo(()=>values.filter((v,i)=>norm(v)===norm(answers[i])).length,[values]);
  const toggleAudio=()=>{ if(!("speechSynthesis" in window))return; if(speaking){window.speechSynthesis.cancel();setSpeaking(false);return} const u=new SpeechSynthesisUtterance(fullScript);u.lang="en-GB";u.rate=rate;u.onend=()=>setSpeaking(false);window.speechSynthesis.cancel();window.speechSynthesis.speak(u);setSpeaking(true) };
  const renderText=(text:string)=>text.split(/(\[\d+\])/g).map((part,index)=>{const m=part.match(/\[(\d+)\]/);if(!m)return <span key={index}>{part}</span>;const ai=Number(m[1])-1,correct=norm(values[ai])===norm(answers[ai]);return <span className="blank-wrap" key={index}><span className="blank-number">{m[1]}</span><input aria-label={`Answer ${m[1]}`} className={checked?(correct?"correct":"wrong"):""} value={values[ai]} onChange={e=>{const next=[...values];next[ai]=e.target.value;setValues(next);setChecked(false)}}/>{checked&&!correct&&<small>{answers[ai]}</small>}</span>});
  return <main>
    <nav><a className="brand" href="#top"><span>F</span> FIGHTER LISTENING</a><div className="nav-meta"><span>WEEKLY DRILL · 01</span><b>B1+ → B2</b></div></nav>
    <header id="top"><div className="eyebrow">MIXED DICTATION · 3–4 MINUTES</div><h1>Three stories.<br/><em>One sharp ear.</em></h1><p className="intro">A rapid listening workout for ambitious English learners. News, science and real teen life—packed into one focused session.</p><div className="topics"><span>EXTREME WEATHER</span><span>SLEEP SCIENCE</span><span>DIGITAL DETOX</span></div></header>
    <section className="player" aria-label="Audio player"><button className="play" onClick={toggleAudio} aria-label={speaking?"Stop audio":"Play audio"}>{speaking?"■":"▶"}</button><div className="track-info"><b>{speaking?"NOW PLAYING":"READY TO LISTEN"}</b><span>Youth News in Four Minutes</span></div><div className="wave" aria-hidden="true">{Array.from({length:34}).map((_,i)=><i key={i} style={{height:`${8+((i*13)%26)}px`}}/>)}</div><label className="speed">SPEED<select value={rate} onChange={e=>{setRate(Number(e.target.value));if(speaking){window.speechSynthesis.cancel();setSpeaking(false)}}}><option value="0.78">0.8×</option><option value="0.9">0.9×</option><option value="1">1.0×</option></select></label></section>
    <div className="instructions"><b>YOUR MISSION</b><p>Listen and complete gaps 1–12. Write the exact words you hear. You may replay the report.</p><span>12 POINTS</span></div>
    <section className="worksheet">{sections.map((s,idx)=><article key={s.label}><div className="section-head"><div><span>{s.label}</span><h2>{s.title}</h2></div><div className="slash">0{idx+1}</div></div>{s.text.map((t,i)=><p key={i}>{renderText(t)}</p>)}</article>)}</section>
    <section className="finish"><div><span>READY?</span><h2>Lock in your answers.</h2><p>Spelling, spacing and numbers all count.</p></div><button onClick={()=>setChecked(true)}>CHECK MY SCORE <b>→</b></button></section>
    {checked&&<section className="results" aria-live="polite"><div className="score">{score}<small>/12</small></div><div><span>MISSION REPORT</span><h2>{score===12?"Flawless listening.":score>=9?"Strong work, fighter.":"Replay. Refocus. Rise."}</h2><p>{score===12?"Every detail landed exactly right.":`Review the highlighted gaps—you’re ${12-score} answer${12-score===1?"":"s"} away from a perfect score.`}</p></div><button onClick={()=>{setValues(Array(12).fill(""));setChecked(false)}}>TRY AGAIN</button></section>}
    <footer><b>FIGHTER LISTENING</b><span>LISTEN HARD · THINK FAST · WRITE CLEAN</span><span>Designed for Grade 8–9 English specialists</span></footer>
  </main>
}
