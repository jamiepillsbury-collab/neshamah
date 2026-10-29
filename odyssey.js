/* Her Odyssey: a solo journaling game in the Journal tab.
   Mechanics follow Jamie's copy of "Her Odyssey" by S. Kaiya J. (Caltrop Core x Aspire; her PDF).
   All wording here is written for Neshamah; the book holds its own text and prompts (page refs below). */
(function(){
var KEY="neshamah_odyssey";
var ST={vit:["Vitality","fire: strength, presence"],qui:["Quickness","air: wit, deftness"],fort:["Fortitude","earth: calm, steadiness, self-belief"]};
var SUITS={D:["♦","Diamonds","Settled places",["A town that doesn't want strangers","A fever on the road","An empty house with the lamps still warm","Someone too friendly, too fast","A rumor that arrives before you do","A truth you weren't looking for","A lost key, or a found one"]],
 H:["♥","Hearts","Open country",["A question you can't leave alone","Something you did weeks ago catches up","Soldiers on the road","A snare in the grass","Someone blames you","A tool or wagon gives out","A glimpse of what you lost"]],
 S:["♠","Spades","Wild edges",["The weather turns without warning","Old stones of a fallen place","Someone waiting in ambush","A promise asked of you","Words taken the wrong way","The weight of despair","A creature you have no name for","Your shadow, close enough to touch"]],
 C:["♣","Clubs","Far reaches",["A curse, or something that feels like one","The ground itself changes","A wrong done, by you or to you","A door you must decide to cross","Wanting more than you need","A stranger who needs help","A language you can't read","The land in upheaval"]]};
var OUT=[null,["Absolute failure","No, and it gets worse."],["Partial failure","No, but nothing worse."],["Partial success","Yes, but it gets complicated."],["Absolute success","Yes, and more besides."]];
var QS=["What is your wanderer called, and what pronouns does she use?","What is she looking for out there?","What did she leave behind when she set out?","Did she leave ready, or in a hurry?","Who or what did she love and lose?","What shadow follows her?"];
var VAR=[["easy","Easier checks","Roll one d4 and add the stat, instead of rolling a d4 per point. The outcome still reads from the d4."],
 ["doom","Doom","At the False Homecoming you also gain Doom (one per Inauspicious day). Inauspicious days then cost Doom to make up the gap. At 0 Doom, the journey ends in death."],
 ["reshuffle","Reshuffle daily","Each Hazard card goes back into the deck."],
 ["fixed","Fixed length","No jokers. False Homecoming after 25 draws, True Homecoming after 40."]];

function load(){try{return JSON.parse(localStorage.getItem(KEY))||{};}catch(e){return {};}}
var S=load();
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
function $(q){return document.querySelector(q);}
function h(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function btn(t,f,cls){var b=h("button",cls||"",t);b.onclick=function(){f();};return b;}
function card(){var c=h("div","card");$("#od-body").appendChild(c);return c;}
function say(t){if(window.toast)toast(t);}
function fmt(t){return new Date(t).toLocaleDateString(undefined,{month:"short",day:"numeric"});}
function d4(){return 1+Math.floor(Math.random()*4);}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
function deck(){var a=[];"SHDC".split("").forEach(function(s){for(var r=1;r<=13;r++)a.push(r+s);});if(!S.v.fixed)a.push("J1","J2");return shuffle(a);}
var RN={1:"A",11:"J",12:"Q",13:"K"};
function joker(c){return c.charAt(0)==="J"&&c.length===2&&/\d/.test(c.charAt(1))&&!/[SHDC]$/.test(c);}
function rank(c){return parseInt(c,10);}
function cname(c){return joker(c)?"Joker":(RN[rank(c)]||rank(c))+SUITS[c.slice(-1)][0];}
function cel(c){return h("span","lc"+(/[HD]$/.test(c)?" red":""),cname(c));}
function clamp(v){return Math.max(1,Math.min(5,v));}

var css="#odyssey{position:fixed;inset:0;z-index:22;display:none;overflow-y:auto;background:radial-gradient(ellipse at 50% 0%,#3a2f45 0%,#22192e 60%,#150f1d 100%);padding:16px 16px calc(90px + env(safe-area-inset-bottom))}"+
"#odyssey.on{display:block}#odyssey .in{max-width:640px;margin:0 auto}#odyssey .top{display:flex;justify-content:space-between;align-items:center;gap:8px}"+
"#odyssey .lc{display:inline-block;min-width:46px;padding:12px 8px;margin:2px;border-radius:8px;background:#f6f1e7;color:#2a2233;font-weight:600;text-align:center;font-size:20px}#odyssey .lc.red{color:#a8323e}"+
"#odyssey .row{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:6px 0}"+
"#odyssey .die{display:inline-block;width:30px;height:30px;line-height:30px;border:1px solid var(--line);border-radius:7px;text-align:center;color:var(--dim)}#odyssey .die.hi{border-color:var(--amber);color:var(--amber)}"+
"#odyssey .res{font-size:20px;color:var(--amber);margin:6px 0}#odyssey .cab{font-size:18px;color:var(--amber)}"+
"#odyssey textarea{width:100%;min-height:64px}#odyssey input[type=text]{width:100%}#odyssey .ent{margin:6px 0;padding-left:10px;border-left:2px solid var(--line)}"+
"#odyssey .box{border:1px solid var(--line);border-radius:10px;padding:8px 10px;margin:8px 0}#odyssey label{display:block;margin:6px 0}";
function el(){
 var o=$("#odyssey");if(o)return o;
 var st=h("style");st.textContent=css;document.head.appendChild(st);
 o=h("div");o.id="odyssey";o.setAttribute("role","dialog");o.setAttribute("aria-label","Her Odyssey");
 o.innerHTML="<div class='in'><div class='top'><h2 style='margin:0'>Her Odyssey</h2><button class='ghost' id='od-x'>Close</button></div><div id='od-body'></div></div>";
 document.body.appendChild(o);o.querySelector("#od-x").onclick=close;return o;
}
function open(){el().classList.add("on");document.body.style.overflow="hidden";render();}
function close(){var o=$("#odyssey");if(o)o.classList.remove("on");document.body.style.overflow="";}

function render(){
 var b=$("#od-body");if(!b)return;b.innerHTML="";
 if(!S.w)setup();else if(S.end)ended();else if(S.cur)today();else ready();
 archive();
 var f=card();
 f.appendChild(h("p","small","If the road stirs something heavier than a journaling game should carry, set it down and reach a person."));
 f.appendChild(h("p","src","Mechanics from Her Odyssey by S. Kaiya J. (your PDF). Its own Hazard prompts are on p. 7, setup questions on p. 3, variations on pp. 18–19. Wording here is original."));
}

/* ---------- setup ---------- */
function setup(){
 var c=card();
 c.appendChild(h("p","small","A wanderer trying to return home, or to find a new one. One Hazard a day: draw it in the morning, let it sit, and meet it in the evening."));
 c.appendChild(h("h3",null,"Stats"));c.appendChild(h("p","small","Eleven points across three stats, each from 1 to 5."));
 var sel={},sum=h("p","small");
 function upd(){var t=0;for(var k in sel)t+=+sel[k].value;sum.textContent="Points used: "+t+" of 11";}
 Object.keys(ST).forEach(function(k,i){var l=h("label",null,ST[k][0]+" ("+ST[k][1]+") ");var s=h("select");for(var v=1;v<=5;v++){var o=h("option",null,v);o.value=v;s.appendChild(o);}s.value=[4,3,4][i];s.onchange=upd;sel[k]=s;l.appendChild(s);c.appendChild(l);});
 c.appendChild(sum);upd();
 c.appendChild(h("h3",null,"Your wanderer"));
 var nm=h("input");nm.type="text";nm.placeholder="Name";c.appendChild(nm);
 var tas=QS.slice(1).map(function(q){var bx=h("div","box");bx.appendChild(h("div","small",q));var ta=h("textarea");bx.appendChild(ta);c.appendChild(bx);return ta;});
 c.appendChild(h("h3",null,"Variations (optional)"));
 var vs={};VAR.forEach(function(v){var l=h("label");var x=h("input");x.type="checkbox";vs[v[0]]=x;l.appendChild(x);l.appendChild(document.createTextNode(" "+v[1]+": "));l.appendChild(h("span","small",v[2]));c.appendChild(l);});
 c.appendChild(btn("Set out",function(){
  var st={},t=0;for(var k in sel){st[k]=+sel[k].value;t+=st[k];}
  if(t!==11){say("Use exactly 11 points.");return;}
  S.v={};for(var k2 in vs)S.v[k2]=vs[k2].checked;
  S.w={name:nm.value.trim()||"The wanderer",st:st,ans:QS.slice(1).map(function(q,i){return {q:q,a:tas[i].value.trim()};})};
  S.deck=deck();S.disc=[];S.days=[];S.aus=0;S.ina=0;S.drawn=0;S.jokers=0;S.hope=null;S.doom=null;S.cur=null;S.end=null;S.t=Date.now();
  save();render();},"on"));
}
function sheet(c){
 var w=S.w,r=h("div","row");
 Object.keys(ST).forEach(function(k){r.appendChild(h("span","small",ST[k][0]+" "+w.st[k]));});
 if(S.hope!=null)r.appendChild(h("span","small","Hope "+S.hope));
 if(S.doom!=null)r.appendChild(h("span","small","Doom "+S.doom));
 c.appendChild(h("div","cab",w.name));c.appendChild(r);
 c.appendChild(h("p","small","Day "+(S.days.length+(S.cur?1:0))+" · Auspicious "+S.aus+" · Inauspicious "+S.ina+(S.v.fixed?" · "+S.drawn+" of 40 drawn":"")));
 var d=h("details");d.appendChild(h("summary",null,"About "+w.name));
 w.ans.forEach(function(a){var e=h("div","ent");e.appendChild(h("div","small",a.q));if(a.a)e.appendChild(h("div",null,a.a));d.appendChild(e);});
 c.appendChild(d);
}

/* ---------- days ---------- */
function ready(){
 var c=card();sheet(c);
 var last=S.days[S.days.length-1];
 if(last&&new Date(last.t).toDateString()===new Date().toDateString())c.appendChild(h("p","small","Today's Hazard is already met. The game is meant for one a day, but the road is yours."));
 c.appendChild(btn(S.days.length?"Draw the next Hazard":"Draw the first Hazard",drawDay,"on"));
}
function drawDay(){
 if(!S.deck.length){S.deck=shuffle(S.disc);S.disc=[];}
 var c=S.deck.pop();S.drawn++;
 if(S.v.reshuffle){S.deck.push(c);shuffle(S.deck);}else S.disc.push(c);
 var home=null;
 if(S.v.fixed){if(S.drawn===25)home="false";else if(S.drawn===40)home="true";}
 else if(joker(c)){S.jokers++;home=S.jokers===1?"false":"true";if(S.v.reshuffle&&home==="false"){S.deck=S.deck.filter(function(x){return x!==c;});}}
 if(home==="true"&&!S.v.fixed&&S.hope==null)home="false"; /* reshuffle edge: first joker seen twice */
 S.cur={c:c,t:Date.now(),home:home,checks:[],am:"",omen:joker(c)?0:rank(c)};
 if(home==="false"){S.hope=S.aus;if(S.v.doom)S.doom=S.ina;}
 save();render();
}
function today(){
 var d=S.cur,c=card();sheet(c);
 if(d.home==="true"){trueHome();return;}
 if(d.home==="false"&&joker(d.c)){falseHome(c);return;}
 if(d.home==="false")falseHome(c,true);
 var s=SUITS[d.c.slice(-1)],hz=card();
 var r=h("div","row");r.appendChild(cel(d.c));var tx=h("div");tx.appendChild(h("div","cab","Omen Score "+d.omen));tx.appendChild(h("div","small",s[1]+": "+s[2]));r.appendChild(tx);hz.appendChild(r);
 var pl=h("div","box");pl.appendChild(h("div","small","Choose one or more, or use your book's list (p. 7):"));
 s[3].forEach(function(p){pl.appendChild(h("div",null,"· "+p));});hz.appendChild(pl);
 var am=h("textarea");am.placeholder="Morning: what lies ahead? (Then let it sit until evening.)";am.value=d.am;am.oninput=function(){d.am=am.value;save();};hz.appendChild(am);
 /* checks */
 var ck=card();ck.appendChild(h("h3",null,"Evening: meeting the Hazard"));
 ck.appendChild(h("p","small","Use any stat that fits how she meets it. Each stat once per day."));
 d.checks.forEach(function(x,i){
  var bx=h("div","box");bx.appendChild(h("div","small",ST[x.k][0]+(S.v.easy?" (d4 + "+x.stat+")":" ("+x.dice.length+"d4, highest counts)")));
  var dr=h("div","row");x.dice.forEach(function(v,j){dr.appendChild(h("span","die"+(j===x.hiAt?" hi":""),v));});
  if(x.hope)dr.appendChild(h("span","small","+"+x.hope+" Hope"));dr.appendChild(h("span","small","= "+x.val));bx.appendChild(dr);
  var o=OUT[Math.min(4,x.out)];bx.appendChild(h("div","cab",o[0]));bx.appendChild(h("div","small",o[1]));
  if(S.hope>0&&x.out<4)bx.appendChild(btn("Spend 1 Hope: +1",function(){S.hope--;x.hope=(x.hope||0)+1;x.out++;x.val++;if(S.hope<=0){S.hope=0;}save();render();},"ghost"));
  var ta=h("textarea");ta.placeholder="What happens?";ta.value=x.txt||"";ta.oninput=function(){x.txt=ta.value;save();};bx.appendChild(ta);
  ck.appendChild(bx);
 });
 var used=d.checks.map(function(x){return x.k;}),r2=h("div","row");
 Object.keys(ST).forEach(function(k){if(used.indexOf(k)<0)r2.appendChild(btn("Roll "+ST[k][0]+" ("+S.w.st[k]+")",function(){roll(k);},"on"));});
 ck.appendChild(r2);
 if(d.checks.length){
  var tot=d.checks.reduce(function(a,x){return a+x.val;},0);
  ck.appendChild(h("p","small","Total so far "+tot+" against Omen Score "+d.omen+"."));
  ck.appendChild(btn("End the day",endDay,"on"));
 }
}
function roll(k){
 var d=S.cur,stat=S.w.st[k],dice=[],hi=0,hiAt=0,x;
 if(S.v.easy){dice=[d4()];hi=dice[0];x={k:k,stat:stat,dice:dice,hiAt:0,out:hi,val:hi+stat};}
 else{for(var i=0;i<stat;i++){dice.push(d4());if(dice[i]>hi){hi=dice[i];hiAt=i;}}x={k:k,stat:stat,dice:dice,hiAt:hiAt,out:hi,val:hi};}
 d.checks.push(x);save();render();
}
function endDay(){
 var d=S.cur,tot=d.checks.reduce(function(a,x){return a+x.val;},0),aus=tot>=d.omen,used=d.checks.map(function(x){return x.k;});
 if(aus){S.aus++;used.forEach(function(k){S.w.st[k]=clamp(S.w.st[k]-1);});}
 else{S.ina++;Object.keys(ST).forEach(function(k){if(used.indexOf(k)<0)S.w.st[k]=clamp(S.w.st[k]+1);});
  if(S.doom!=null&&!aus){S.doom-=d.omen-tot;if(S.doom<=0){S.doom=0;S.end="doom";}}}
 d.tot=tot;d.res=aus?"Auspicious":"Inauspicious";
 S.days.push(d);S.cur=null;
 if(S.hope!=null&&S.hope<=0&&!S.end&&d.checks.some(function(x){return x.hope;}))S.end="hope";
 if(typeof plogAdd==="function"){try{plogAdd("odyssey",d.res+" day");}catch(e){}}
 save();say(d.res+" day.");render();
}
function falseHome(c,already){
 var d=S.cur,bx=h("div","box");
 bx.appendChild(h("div","cab","False Homecoming"));
 bx.appendChild(h("p","small","She arrives somewhere that feels like home, or could become one, and something stops her. Maybe she is a stranger here now. Maybe it has changed, or she has."));
 bx.appendChild(h("p","small","Look back: mostly Auspicious, or mostly not? How does she feel about the road so far? (Your book's framing is on p. 14.)"));
 bx.appendChild(h("p",null,"Hope: "+S.hope+(S.doom!=null?" · Doom: "+S.doom:"")));
 bx.appendChild(h("p","small","From now on, spend 1 Hope to add +1 to any single check. If Hope runs out, she abandons the journey. Days no longer add to Hope"+(S.doom!=null?" or Doom":"")+"."));
 c.appendChild(bx);
 if(already)return;
 var ta=h("textarea");ta.placeholder="Write the homecoming that wasn't.";ta.value=d.am;ta.oninput=function(){d.am=ta.value;save();};c.appendChild(ta);
 c.appendChild(btn("Continue the road",function(){d.res="False Homecoming";S.days.push(d);S.cur=null;save();render();},"on"));
}
function trueHome(){
 var d=S.cur,c=card();
 c.appendChild(h("div","cab","True Homecoming"));
 c.appendChild(h("p","small","The journey ends. Write about all she has seen and done, the joys and the scars."));
 var ta=h("textarea");ta.style.minHeight="140px";ta.value=d.am;ta.oninput=function(){d.am=ta.value;save();};c.appendChild(ta);
 c.appendChild(btn("End the journey",function(){d.res="True Homecoming";S.days.push(d);S.cur=null;S.end="home";save();render();},"on"));
}
function ended(){
 var c=card();sheet(c);
 c.appendChild(h("div","res",{home:"She came home.",hope:"She lost hope and left the road.",doom:"The road ended in her death."}[S.end]));
 c.appendChild(h("p","small",S.days.length+" days · "+S.aus+" Auspicious · "+S.ina+" Inauspicious"));
 if(S.end!=="home"){var ta=h("textarea");ta.placeholder="A last page, if you want one.";ta.value=S.last||"";ta.oninput=function(){S.last=ta.value;save();};c.appendChild(ta);}
 c.appendChild(btn("Begin a new wanderer",function(){if(Date.now()-(S.arm||0)>4000){S.arm=Date.now();say("Tap again: this wanderer moves to the archive.");return;}
  S.past=S.past||[];S.past.push({w:S.w,days:S.days,end:S.end,aus:S.aus,ina:S.ina,last:S.last||"",t:S.t});
  var past=S.past;S={past:past};save();render();},"ghost"));
}

/* ---------- archive ---------- */
function dayEnt(x,i){
 var e=h("div","ent");e.appendChild(h("div","small","Day "+(i+1)+" · "+fmt(x.t)+" · "+cname(x.c)+(x.res?" · "+x.res:"")+(x.tot!=null?" ("+x.tot+" vs "+x.omen+")":"")));
 if(x.am)e.appendChild(h("div",null,x.am));
 (x.checks||[]).forEach(function(k){if(k.txt)e.appendChild(h("div",null,ST[k.k][0]+": "+k.txt));});return e;
}
function archive(){
 if(S.days&&S.days.length){var c=card(),d=h("details");d.appendChild(h("summary",null,"The road so far ("+S.days.length+" days)"));
  S.days.map(dayEnt).reverse().forEach(function(e){d.appendChild(e);});c.appendChild(d);}
 if(S.past&&S.past.length){var c2=card(),p=h("details");p.appendChild(h("summary",null,"Past wanderers ("+S.past.length+")"));
  S.past.forEach(function(w){var q=h("details");q.appendChild(h("summary",null,w.w.name+" · "+w.days.length+" days"));w.days.forEach(function(x,i){q.appendChild(dayEnt(x,i));});if(w.last)q.appendChild(h("div","ent",w.last));p.appendChild(q);});
  c2.appendChild(p);}
}
window.odysseyOpen=open;
document.addEventListener("keydown",function(e){if(e.key==="Escape")close();});
})();
