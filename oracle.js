/* Small Things: a solo journaling game in the Journal tab.
   Mechanics follow Jamie's copy of "The Oracle of Small Things" (her PDF).
   All wording here is written for Neshamah; the book holds its own text and prompts. */
(function(){
var KEY="neshamah_oracle";
var CAB=[null,
 {n:"Vanishing",s:"Something leaving: cooling, fading, drying, walking away.",d:"What remains",ds:"The mark something left behind after it went."},
 {n:"Waiting",s:"Something paused or held, not happening yet.",d:"What is being prepared",ds:"Under the stillness, what is getting ready?"},
 {n:"Light",s:"Something simply lovely, with no use and no reason.",d:"What you'd stopped seeing",ds:"Beauty in something so familiar you no longer register it."},
 {n:"Thresholds",s:"A crossing in progress: a change, an edge, a between.",d:"The threshold you are on",ds:"A crossing in your own life. Go only as far as you want."},
 {n:"Silence",s:"The quiet between things, or what no one is saying.",d:"What the silence protects",ds:"A hush that is keeping something safe."},
 {n:"Echoes",s:"Something repeating, returning, or reflecting.",d:"What returns changed",ds:"Something that came back, and how it is different now."},
 {n:"Hands",s:"Traces of people: things made, mended, worn smooth by use."},
 {n:"Self",s:"Notice yourself as gently as any other small thing. If it turns harsh, close it and roll again."}];
var STAND=[null,"Apprentice","Scribe of the Hours","Keeper of the Cabinets","Confidant"];
var SYN=["Read the six in order. Which one would you keep twice? Copy it again and say why.",
 "What ties two of these together that you didn't see on the day?",
 "Which cabinet resisted you this week? What were you looking at instead?",
 "Where did you slow down the most? Which entry holds the most breath?",
 "What would you ask next week's self to look for?",
 "Which of these would you bless, and with what words?"];
var LONGP={
 month:["In one image from these pages, what did this month feel like to live inside?","Which cabinet did you fill most, and which did you avoid?","Copy the one small thing from this month you're most glad you kept."],
 season:["Read the season through, slowly. Name the thread that keeps returning.","Copy the three entries that still carry the most charge.","Write to the person you were when the season began: what changed, what didn't.","Close with a small deliberate act: light a candle, step outside, or just shut the book for a day."],
 year:["What kind of attention did you turn out to have?","If you could save only one small thing from the year, which is it?","Say goodbye to the year, at any length."]};
var S=load();
function load(){try{return JSON.parse(localStorage.getItem(KEY))||{obs:[],syn:[],rec:[]};}catch(e){return {obs:[],syn:[],rec:[]};}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
function $(q){return document.querySelector(q);}
function h(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function week(){return S.syn.length+1;}
function mov(w){w=w||week();return w<=4?1:w<=8?2:w<=16?3:4;}
function thisWeek(){var w=week();return S.obs.filter(function(o){return o.wk===w;});}
function today(){var d=new Date().toDateString();return S.obs.filter(function(o){return new Date(o.t).toDateString()===d;});}
function fmt(t){return new Date(t).toLocaleDateString(undefined,{month:"short",day:"numeric"});}
var css="#oracle{position:fixed;inset:0;z-index:22;display:none;overflow-y:auto;background:radial-gradient(ellipse at 50% 0%,#33265e 0%,#1a1238 60%,#120c29 100%);padding:16px 16px calc(90px + env(safe-area-inset-bottom))}"+
"#oracle.on{display:block}#oracle .in{max-width:640px;margin:0 auto}"+
"#oracle .top{display:flex;justify-content:space-between;align-items:center;gap:8px}"+
"#oracle .dots{display:flex;gap:6px;margin:8px 0}#oracle .dots i{width:12px;height:12px;border-radius:50%;border:1px solid var(--amber);display:block}"+
"#oracle .dots i.f{background:var(--amber)}#oracle .dots i.s{border-radius:2px}"+
"#or-die{width:84px;height:84px;margin:14px auto;border-radius:16px;border:2px solid var(--amber);display:flex;align-items:center;justify-content:center;font-size:38px;color:var(--amber);transition:transform .5s}"+
"#or-die.d8{clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%);border-radius:0;background:rgba(242,201,160,.12);width:96px;height:96px}"+
"#or-die.roll{transform:rotate(540deg) scale(.9)}#oracle textarea{width:100%;min-height:70px}"+
"#oracle .cab{font-size:20px;color:var(--amber);margin:4px 0}#oracle .ent{margin:6px 0;padding-left:10px;border-left:2px solid var(--line)}"+
"#oracle .chips{text-align:center}#oracle .chips button{margin:3px}#toast{z-index:30}";
function el(){
 var o=$("#oracle");if(o)return o;
 var st=h("style");st.textContent=css;document.head.appendChild(st);
 o=h("div");o.id="oracle";o.setAttribute("role","dialog");o.setAttribute("aria-label","Small Things");
 o.innerHTML="<div class='in'><div class='top'><h2 style='margin:0'>Small Things</h2><button class='ghost' id='or-x'>Close</button></div><div id='or-body'></div></div>";
 document.body.appendChild(o);
 o.querySelector("#or-x").onclick=close;return o;
}
function open(){el().classList.add("on");document.body.style.overflow="hidden";render();}
function close(){var o=$("#oracle");if(o)o.classList.remove("on");document.body.style.overflow="";}
function card(){var c=h("div","card");$("#or-body").appendChild(c);return c;}
function btn(t,f,cls){var b=h("button",cls||"",t);b.onclick=f;return b;}
var CUR=null; /* {n,deep,how} rolled this sitting */
function render(){
 var b=$("#or-body");b.innerHTML="";
 if(!S.name){consecrate();return;}
 var w=week(),m=mov(w),tw=thisWeek();
 var c=card();
 c.appendChild(h("p","small",S.name+" · "+STAND[m]+" · week "+w));
 var dots=h("div","dots");for(var i=0;i<7;i++){var d=h("i",(i<tw.length?"f":"")+(i===6?" s":""));dots.appendChild(d);}
 c.appendChild(dots);
 if(m>1&&!S["seen"+m]){var n=h("p","small",m===2?"New this week: each cabinet now has a deeper room. Use it when you're ready; the surface still counts.":m===3?"New this week: two hidden cabinets, Hands and Self. The die is now eight-sided.":"New this week: you can choose your cabinet instead of rolling. The die stays within reach.");c.appendChild(n);S["seen"+m]=1;save();
  S.cross=S.cross||[];S.cross.push({t:Date.now(),m:m});save();}
 if(tw.length>=6){synthesis();}else{daily(m,tw);}
 archive();
 var f=card();f.appendChild(h("p","small","If this stirs something heavier than a journaling game should carry, set it down and reach a person. The large things are better carried with someone beside you."));
 f.appendChild(h("p","src","Mechanics from The Oracle of Small Things (your PDF). Its own prompts and text are in the book."));
}
function consecrate(){
 var c=card();
 c.appendChild(h("h3",null,"Before the first small thing"));
 c.appendChild(h("p","small","Six days, you keep one small image a day. On the seventh you read them back. Three minutes is enough. You can't fail and you can't fall behind; every day you show up is kept."));
 c.appendChild(h("p",null,"1. Name your book."));
 var nm=h("input");nm.type="text";nm.placeholder="Reliquary, Small Hours, anything";c.appendChild(nm);
 c.appendChild(h("p",null,"2. Write a promise to yourself about how you'll pay attention. Your own words, or copy the oath from the book (p. 9)."));
 var oa=h("textarea");c.appendChild(oa);
 c.appendChild(btn("Begin",function(){S.name=nm.value.trim()||"Reliquary";S.oath=oa.value.trim();S.start=Date.now();save();render();},"on"));
}
function roll(m){
 var n=m>=3?8:6,v=1+Math.floor(Math.random()*n);
 var used=thisWeek().map(function(o){return o.cab;});
 CUR={n:v,insist:used.indexOf(v)>-1,deep:false};return CUR;
}
function daily(m,tw){
 var c=card(),t=today();
 if(t.length&&!CUR){
  c.appendChild(h("p",null,"Kept for today:"));
  t.forEach(function(o){c.appendChild(entry(o));});
  c.appendChild(h("p","small","That's the whole practice for today. Close the book."));
  c.appendChild(btn("The Oracle stirs: keep another",function(){CUR={n:0};render();},"ghost"));
  return;
 }
 var die=h("div",m>=3?"d8":"");die.id="or-die";die.textContent=CUR&&CUR.n?CUR.n:"?";c.appendChild(die);
 var row=h("div","chips");
 if(!CUR||!CUR.n){
  row.appendChild(btn(m>=4?"Roll anyway":"Roll the die",function(){roll(m);die.classList.add("roll");if(navigator.vibrate)navigator.vibrate(15);setTimeout(render,520);},"on"));
  if(m>=4||(CUR&&CUR.n===0)){c.appendChild(h("p","small",m>=4?"Choose today's cabinet:":"Go where it points. Choose a cabinet:"));pick(c,m);}
  else row.appendChild(btn("Choose instead",function(){CUR={n:0};render();},"ghost"));
  c.appendChild(row);return;
 }
 var k=CAB[CUR.n];
 c.appendChild(h("div","cab","The Cabinet of "+k.n));
 if(CUR.insist)c.appendChild(h("p","small","Already filled this week. Don't reroll: look again in the same cabinet and find something different."));
 c.appendChild(h("p",null,CUR.deep?k.ds:k.s));
 if(m>=2&&k.d){c.appendChild(btn(CUR.deep?"Back to the surface":"Step into the deeper room: "+k.d,function(){CUR.deep=!CUR.deep;render();},"ghost"));}
 c.appendChild(h("p","small","Carry it through your day, or look back over the hours already gone. Write one image, one sentence. Show the thing, not the feeling. Present tense keeps it alive."));
 var ta=h("textarea");ta.placeholder="one small thing";c.appendChild(ta);
 c.appendChild(btn("Keep it",function(){var v=ta.value.trim();if(!v){if(window.toast)toast("one sentence is plenty");return;}keep(v);},"on"));
 stuck(c,ta);
}
function pick(c,m){var r=h("div","chips");for(var i=1;i<=(m>=3?8:6);i++){(function(i){r.appendChild(btn(CAB[i].n,function(){CUR={n:i,insist:false,deep:false,chosen:1};render();},"ghost"));})(i);}c.appendChild(r);}
function keep(v){
 S.obs.push({t:Date.now(),wk:week(),cab:CUR.n,deep:!!CUR.deep,txt:v});save();
 if(typeof plogAdd==="function"){try{plogAdd("oracle",CAB[CUR.n].n);}catch(e){}}
 CUR=null;if(window.toast)toast("Kept.");render();
}
function stuck(c,ta){
 var d=h("details");d.appendChild(h("summary",null,"Nothing surfacing?"));
 [["Senses ladder","Five things you see, four you hear, three you can touch, two you smell, one you taste. Something on the ladder will catch."],
  ["The plainest thing","Pick the most ordinary object in reach. Look at it for three slow breaths."],
  ["Start with \"I notice\"","Write I notice and keep the pen moving until something small turns up."]].forEach(function(x){
  var p=h("p","small");p.appendChild(h("b",null,x[0]+": "));p.appendChild(document.createTextNode(x[1]));d.appendChild(p);});
 d.appendChild(btn("I notice…",function(){ta.value="I notice ";ta.focus();},"ghost"));
 d.appendChild(btn("Keep: nothing surfaced today",function(){keep("Nothing surfaced today.");},"ghost"));
 d.appendChild(h("p","small","An empty day still counts. It's a quiet one."));
 c.appendChild(d);
}
function synthesis(){
 var c=card(),w=week();
 c.appendChild(h("h3",null,"The seventh day"));
 c.appendChild(h("p","small","Don't roll today. Read the six slowly, in order, like a small museum of your week."));
 thisWeek().forEach(function(o){c.appendChild(entry(o));});
 var pi=S.pi!=null?S.pi:Math.floor(Math.random()*SYN.length);
 var pp=h("p",null,SYN[pi]);c.appendChild(pp);
 c.appendChild(btn("Another prompt",function(){S.pi=(pi+1)%SYN.length;save();render();},"ghost"));
 c.appendChild(h("p","small","Or use one of the book's Synthesis prompts (p. 19)."));
 var ta=h("textarea");ta.placeholder="a short paragraph";c.appendChild(ta);
 var long=w%52===0?"year":w%13===0?"season":w%4===0?"month":null,lt=null;
 if(long){
  var lc=h("div");lc.appendChild(h("h3",null,{month:"This month, gathered",season:"The season turns",year:"A year kept"}[long]));
  lc.appendChild(h("p","small","A larger pause. Take more room; half a page or more. Book: "+{month:"Lunar Reckoning, p. 28",season:"The Turning, p. 30",year:"At a year, p. 32"}[long]+"."));
  LONGP[long].forEach(function(q){lc.appendChild(h("p","small","· "+q));});
  lt=h("textarea");lc.appendChild(lt);c.appendChild(lc);
 }
 c.appendChild(btn("Close the week",function(){
  S.syn.push({t:Date.now(),wk:w,prompt:SYN[pi],txt:ta.value.trim()});
  if(lt&&lt.value.trim())S.rec.push({t:Date.now(),wk:w,kind:long,txt:lt.value.trim()});
  S.pi=null;save();if(typeof plogAdd==="function"){try{plogAdd("oracle","week "+w+" synthesis");}catch(e){}}
  if(window.toast)toast("Week "+w+" kept.");render();},"on"));
}
function entry(o){var d=h("div","ent");d.appendChild(h("div","small",fmt(o.t)+" · "+CAB[o.cab].n+(o.deep?" · "+CAB[o.cab].d:"")));d.appendChild(h("div",null,o.txt));return d;}
function archive(){
 if(!S.obs.length)return;
 var c=card(),d=h("details");d.appendChild(h("summary",null,"Your "+S.name+" ("+S.obs.length+" small things)"));
 if(S.oath){d.appendChild(h("p","small",S.oath));}
 for(var w=week();w>=1;w--){
  var os=S.obs.filter(function(o){return o.wk===w;});if(!os.length)continue;
  d.appendChild(h("h3",null,"Week "+w+" · "+STAND[mov(w)]));
  os.forEach(function(o){d.appendChild(entry(o));});
  S.syn.filter(function(s){return s.wk===w;}).forEach(function(s){var e=h("div","ent");e.appendChild(h("div","small","★ "+s.prompt));e.appendChild(h("div",null,s.txt));d.appendChild(e);});
  S.rec.filter(function(s){return s.wk===w;}).forEach(function(s){var e=h("div","ent");e.appendChild(h("div","small","☾ "+s.kind));e.appendChild(h("div",null,s.txt));d.appendChild(e);});
 }
 c.appendChild(d);
}
window.oracleOpen=open;
document.addEventListener("keydown",function(e){if(e.key==="Escape")close();});
})();
