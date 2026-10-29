/* The Ghost: a cozy-spooky solo journaling game in the Journal tab.
   Mechanics follow Jamie's copy of "Should I Tame the Ghost?" (her Kindle book).
   All roles, tables and wording here are original to Neshamah; the book holds its own (page refs below). */
(function(){
var KEY="neshamah_ghost";
var ROLES=[null,
 ["Tea-leaf Reader","desire","People ask you what they want before they know it themselves.","A chipped cup you never wash.","You hum when you're thinking."],
 ["Town Archivist","identity","You are the one who knows whose house was whose.","A ring of keys to every records room.","You correct people's dates."],
 ["Bell-ringer","behavior","You notice when something keeps time differently.","Rope-worn gloves.","You count everything."],
 ["Lantern Keeper","appearance","You see well in the dark, and the town has noticed.","A lantern with a blue glass pane.","You can't sleep without a light on."],
 ["Apothecary","effect","When something feels off in a house, they send for you first.","A satchel of labeled jars.","You smell everything before you touch it."],
 ["Stonecarver","death","You carve the headstones, so you know how everyone went.","A small chisel worn smooth.","You talk to graves when you think no one's listening."]];
var TR={
 appearance:["Appearance","What it looks like",["A shape made of drifting candle smoke","A child's coat that walks without a child","Footprints in spilled flour, and nothing above them","A veil of cobweb at head height","A cat that is mostly shadow","A man whose edges flicker like a bad lantern","Breath on the window, spelling nothing yet","A tall figure that only appears in mirrors","A pair of gardening gloves, moving","A soft green glow under the floorboards","An old sailor, always dripping","Humming with no body to hold it","A girl with ink-stained fingers and no face","A swarm of moths in the shape of a person","A gentleman in a coat from two centuries ago","A smell of oranges and woodsmoke, then a silhouette","A crown of dried flowers floating where a head would be","Someone who looks like you, a little older"]],
 identity:["Identity","Who it was",["The town's old lamplighter","A schoolteacher everyone feared and secretly loved","A traveling musician who never left","The baker's apprentice","A landlord who evicted half the street","The midwife who delivered most of the town","A thief who only stole books","A soldier who came home too late","A child who was best at hiding","The lighthouse keeper's wife","A clockmaker obsessed with exactness","The gossip who knew every secret","A healer the town turned against","A miser who buried coins in the garden","A painter no one ever bought from","The town's founder, half-forgotten","A nameless stranger who arrived in a storm","Your own great-grandparent"]],
 death:["Death","How it died",["Fell asleep in the snow","A fever in the bad winter","Lost at sea; the boat came back empty","Old age, quietly, mid-sentence","A fire in the workshop","Lightning on the hill","Thrown from a horse on the river road","Poisoned, and no one was ever named","When the old mill collapsed","In the millpond, trying to save a dog","Simply vanished; never found","A broken heart, the town insists","Something in the woods","Lost in fog on the moor","A fall from the bell tower","An accident everyone agreed not to discuss","The night of a great celebration","It doesn't remember, and won't be told"]],
 behavior:["Behavior","What it does",["Rearranges the teacups every night","Rings the chapel bell at 3 a.m.","Hums the same four notes","Leaves wildflowers on one particular doorstep","Slams doors whenever anyone argues","Tidies the graveyard","Knocks twice and waits","Steals left shoes","Writes one word in the frost each morning","Sits in an empty chair at town meetings","Follows children home to keep them safe","Blows out every candle in the chapel","Waters a garden that died long ago","Weeps at the well","Rocks a cradle in an empty nursery","Reads aloud from books no one can see","Paces one hallway, counting","Mimics the voices of the living"]],
 effect:["Effect","What it does to the living",["Milk sours where it lingers","Clocks stop when it passes","Everyone nearby dreams of the sea","Dogs won't walk down that lane","Lost things turn up on the windowsill","Plants grow strangely fast","People forget why they came into a room","The air smells of rain indoors","Candles burn blue","Music goes slightly off-key","Neighbors feel unaccountably sad","Bread won't rise in the whole village","Letters arrive years late","People find themselves speaking kindly","Reflections lag a heartbeat behind","A chill no fire can fix","Small cuts heal faster","Everyone is a little more honest"]],
 desire:["Desire","What it wants",["To hear its name said aloud","To finish a song it started","To be forgiven by someone still living","To see the sea once more","To return something it borrowed","To know who was responsible","To be properly buried","To dance at one more festival","To have its story told true","To pass on a recipe","To keep its house from being sold","To find a lost pet","To be thanked","To apologize","To see its child grown","To be left truly alone","To have a friend","To rest, at last"]],
 anchor:["Anchor","What holds it here",["A pocket watch no one winds","A grave with the name misspelled","A letter never sent","A cracked teacup","A ring at the bottom of the well","A tree it planted","A portrait hung upside down","A music box","A pair of spectacles","A doorframe marked with children's heights","A key to a door that no longer exists","A quilt in the attic","A bell","A recipe book with one page torn out","A boat rotting on the shore","A promise someone made it","A song only it remembers","You"]],
 secret:["Secret","What it isn't telling",["It isn't haunting the place; it's haunting a person","It is the reason the town survived the flood","It was never the one who died","It is waiting for someone who is also a ghost","It knows something about your family","It is a memory the town keeps alive by fearing it"]]};
var ORDER=["appearance","identity","death","behavior","effect","desire","anchor","secret"];
var HARSH=["Trap it in a jar of river water","Burn the anchor","Ring iron bells until it flees","Draw a line of ash across every threshold","Speak its name backward at midnight","Lock it in the old chapel","Ask the town to stop remembering it","Bury its anchor at a crossroads","Bargain it into service","Scatter salt and rowan","Call on something bigger to take it","Board up the room and walk away"];
var KIND=["Learn its whole story","Say its name at the festival","Mend its anchor","Finish its unfinished task","Find the one it's waiting for","Set a place for it at the table","Write its story down","Carry it to the sea","Give it a proper funeral","Ask what it wants, and wait","Apologize on the town's behalf","Simply keep it company"];
var OUT=[null,["It fades like breath on glass.","Gone."],["It settles.","The house feels warm for the first time in years.",0,0,0,1],["It stays, quietly.","It becomes a neighbor, of a sort.",0,0,0,1],["It attaches to you.","It will follow you home.",0,0,0,1],["It leaves, mostly.","You catch yourself humming its song.",0,0,0,1],["Nothing changes.","Maybe it wasn't ready. Maybe you weren't."],
 ["It costs you something.","Next time, −1 Ability.",-1],["You learn from it.","Next time, +1 Ability.",1],["It whispers before it goes.","Next time, you'll learn the Secret for free.",0,1],["It leaves a warning.","There is another ghost, and it's closer."],["It turns on you.","You get out, shaken but whole."],["It seems gone…","but the teacups moved again last night.",0,0,0,1]];
/* OUT[i] = [title, line, abilityMod, freeSecret, -, canReturn] */

function load(){try{return JSON.parse(localStorage.getItem(KEY))||{};}catch(e){return {};}}
var S=load();S.past=S.past||[];S.mod=S.mod||0;
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
function $(q){return document.querySelector(q);}
function h(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function btn(t,f,cls){var b=h("button",cls||"",t);b.onclick=function(){f();};return b;}
function card(){var c=h("div","card");$("#gh-body").appendChild(c);return c;}
function say(t){if(window.toast)toast(t);}
function fmt(t){return new Date(t).toLocaleDateString(undefined,{month:"short",day:"numeric"});}
function d6(){return 1+Math.floor(Math.random()*6);}
function r12(){var a=d6(),b=d6();return {v:a+(b>=4?6:0),d:[a,b]};}
function r18(){var a=d6(),b=d6();return {v:a+(b>=5?12:b>=3?6:0),d:[a,b]};}
function ta(ph,obj,key,tall){var t=h("textarea");t.placeholder=ph;t.value=obj[key]||"";if(tall)t.style.minHeight="110px";t.oninput=function(){obj[key]=t.value;save();};return t;}

var css="#ghost{position:fixed;inset:0;z-index:22;display:none;overflow-y:auto;background:radial-gradient(ellipse at 50% 0%,#2c3a3a 0%,#18232a 60%,#10171c 100%);padding:16px 16px calc(90px + env(safe-area-inset-bottom))}"+
"#ghost.on{display:block}#ghost .in{max-width:640px;margin:0 auto}#ghost .top{display:flex;justify-content:space-between;align-items:center;gap:8px}"+
"#ghost .row{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:6px 0}#ghost .die{display:inline-block;width:28px;height:28px;line-height:28px;border:1px solid var(--line);border-radius:7px;text-align:center;color:var(--dim);font-size:13px}"+
"#ghost .cab{font-size:18px;color:var(--amber)}#ghost .res{font-size:20px;color:var(--amber);margin:6px 0}#ghost textarea{width:100%;min-height:60px}"+
"#ghost .box{border:1px solid var(--line);border-radius:10px;padding:8px 10px;margin:8px 0}#ghost .ent{margin:6px 0;padding-left:10px;border-left:2px solid var(--line)}";
function el(){
 var o=$("#ghost");if(o)return o;
 var st=h("style");st.textContent=css;document.head.appendChild(st);
 o=h("div");o.id="ghost";o.setAttribute("role","dialog");o.setAttribute("aria-label","The Ghost");
 o.innerHTML="<div class='in'><div class='top'><h2 style='margin:0'>The Ghost</h2><button class='ghost' id='gh-x'>Close</button></div><div id='gh-body'></div></div>";
 document.body.appendChild(o);o.querySelector("#gh-x").onclick=close;return o;
}
function open(){el().classList.add("on");document.body.style.overflow="hidden";render();}
function close(){var o=$("#ghost");if(o)o.classList.remove("on");document.body.style.overflow="";}

function render(){
 var b=$("#gh-body");if(!b)return;b.innerHTML="";
 var g=S.cur;
 if(!g)start();else if(g.step===1)meet();else if(g.step===2)decide();else if(g.step===3)outcome();
 archive();
 var f=card();
 f.appendChild(h("p","small","Any truth can be rerolled or left unknown. You decide what this ghost carries."));
 f.appendChild(h("p","src","Mechanics from Should I Tame the Ghost? (your Kindle book): roles pp. 6–8, ability p. 9, truths pp. 10–18, approaches p. 19, outcomes p. 20, variants p. 22, journaling prompts p. 23. All tables and wording here are original."));
}

/* ---------- step 1: who you are ---------- */
function start(){
 var c=card();
 c.appendChild(h("p","small","A town called Hollowmere, and something in it that won't rest. In one sitting, learn what you can about the ghost, then decide: harsh, or kind? About half an hour."));
 if(S.mod||S.freeSec)c.appendChild(h("p","small","Carried from last time: "+(S.mod?(S.mod>0?"+":"")+S.mod+" Ability":"")+(S.mod&&S.freeSec?" · ":"")+(S.freeSec?"the Secret comes free":"")+"."));
 c.appendChild(btn("Meet a new ghost",function(){begin(null);},"on"));
 var back=S.past.filter(function(p){return OUT[p.out]&&OUT[p.out][5]&&!p.returned;});
 if(back.length){var r=h("div","row");back.slice(-3).forEach(function(p){r.appendChild(btn("Return to "+(p.name||"the ghost from "+fmt(p.t)),function(){begin(p);},"ghost"));});c.appendChild(h("p","small","Some ghosts are still around:"));c.appendChild(r);}
}
function begin(prev){
 var rr=d6(),ab=[0,1,2,3,4,5,5][d6()],a=Math.max(1,Math.min(5,ab+S.mod));
 var g={t:Date.now(),role:rr,abRoll:ab,ab:a,pts:a,tr:{},step:1,name:prev?prev.name:"",prev:prev?prev.t:null};
 if(prev){prev.returned=1;Object.keys(prev.tr).forEach(function(k){g.tr[k]={v:prev.tr[k].v,d:prev.tr[k].d,known:1,note:prev.tr[k].note};});}
 var free=ROLES[rr][1];if(!g.tr[free])g.tr[free]=roll(free);g.tr[free].free=1;
 if(S.freeSec&&!g.tr.secret){g.tr.secret=roll("secret");g.tr.secret.free=1;}
 S.mod=0;S.freeSec=0;S.cur=g;save();render();
}
function roll(k){var x=k==="secret"?{v:d6(),d:[]}:r18();return {v:x.v,d:x.d};}
function cost(k){return k==="secret"?2:1;}

/* ---------- step 2: meet the ghost ---------- */
function meet(){
 var g=S.cur,R=ROLES[g.role],c=card();
 c.appendChild(h("div","cab",R[0]));
 c.appendChild(h("p","small",R[2]+" "+R[3]+" "+R[4]));
 c.appendChild(h("p","small","Ability "+g.ab+(g.ab!==g.abRoll?" (rolled "+g.abRoll+")":"")+" · "+g.pts+" left to spend. Each truth costs 1; the Secret costs 2."));
 var nm=h("input");nm.type="text";nm.placeholder="A name for the ghost, if it has one yet";nm.value=g.name;nm.oninput=function(){g.name=nm.value;save();};c.appendChild(nm);
 ORDER.forEach(function(k){
  var t=TR[k],x=g.tr[k],bx=h("div","box");
  bx.appendChild(h("div","small",t[0]+": "+t[1]+(x&&x.free?" (free)":"")+(x&&x.known?" (known before)":"")));
  if(x){
   bx.appendChild(h("div","cab",t[2][x.v-1]));
   var r=h("div","row");r.appendChild(btn("Reroll",function(){var y=roll(k);x.v=y.v;x.d=y.d;save();render();},"ghost"));
   if(!x.free&&!x.known)r.appendChild(btn("Leave it unknown",function(){delete g.tr[k];g.pts+=cost(k);save();render();},"ghost"));
   bx.appendChild(r);bx.appendChild(ta("What do you notice?",x,"note"));
  }else if(g.pts>=cost(k))bx.appendChild(btn("Learn this"+(k==="secret"?" (2)":""),function(){g.tr[k]=roll(k);g.pts-=cost(k);save();render();},"ghost"));
  else bx.appendChild(h("div","small","Unknown."));
  c.appendChild(bx);
 });
 c.appendChild(btn("Decide what to do",function(){g.step=2;save();render();},"on"));
}

/* ---------- step 3: decide ---------- */
function decide(){
 var g=S.cur,c=card();
 c.appendChild(h("div","cab","Harsh, or kind?"));
 c.appendChild(h("p","small","Choose the way, then choose a method or roll for one."));
 var r=h("div","row");
 [["Harsh",HARSH],["Kind",KIND]].forEach(function(w){r.appendChild(btn(w[0],function(){g.way=w[0];g.meth=null;save();render();},g.way===w[0]?"on":"ghost"));});c.appendChild(r);
 if(g.way){
  var L=g.way==="Harsh"?HARSH:KIND,bx=h("div","box");
  L.forEach(function(m,i){bx.appendChild(btn(m,function(){g.meth=i+1;save();render();},g.meth===i+1?"on":"ghost"));});
  bx.appendChild(btn("Roll for it",function(){g.meth=r12().v;save();render();},"ghost"));c.appendChild(bx);
 }
 if(g.meth){c.appendChild(h("p",null,(g.way==="Harsh"?HARSH:KIND)[g.meth-1]+"."));c.appendChild(ta("How do you go about it?",g,"how"));
  c.appendChild(btn("See what happens",function(){var o=r12();g.out=o.v;g.outD=o.d;g.step=3;save();render();},"on"));}
 c.appendChild(btn("Back to the ghost",function(){g.step=1;save();render();},"ghost"));
}

/* ---------- step 4: outcome ---------- */
function outcome(){
 var g=S.cur,o=OUT[g.out],c=card();
 c.appendChild(h("div","small",g.way+": "+(g.way==="Harsh"?HARSH:KIND)[g.meth-1]));
 c.appendChild(h("div","res",o[0]));c.appendChild(h("p",null,o[1]));
 c.appendChild(ta("A closing line.",g,"close",true));
 c.appendChild(btn("Close this story",function(){
  if(o[2])S.mod=o[2];if(o[3])S.freeSec=1;
  delete g.step;S.past.push(g);S.cur=null;save();
  if(typeof plogAdd==="function"){try{plogAdd("ghost",(g.name||"A ghost")+": "+o[0]);}catch(e){}}
  render();},"on"));
}

/* ---------- archive ---------- */
function archive(){
 if(!S.past.length)return;
 var c=card(),d=h("details");d.appendChild(h("summary",null,"Ghosts you've met ("+S.past.length+")"));
 S.past.slice().reverse().forEach(function(g){
  var q=h("details");q.appendChild(h("summary",null,fmt(g.t)+" · "+(g.name||"unnamed")+" · "+(OUT[g.out]?OUT[g.out][0]:"")));
  q.appendChild(h("div","small","You: "+ROLES[g.role][0]));
  ORDER.forEach(function(k){var x=g.tr[k];if(!x)return;var e=h("div","ent");e.appendChild(h("div","small",TR[k][0]+": "+TR[k][2][x.v-1]));if(x.note)e.appendChild(h("div",null,x.note));q.appendChild(e);});
  if(g.meth){var e=h("div","ent");e.appendChild(h("div","small",g.way+": "+(g.way==="Harsh"?HARSH:KIND)[g.meth-1]));if(g.how)e.appendChild(h("div",null,g.how));q.appendChild(e);}
  if(g.close)q.appendChild(h("div","ent",g.close));
  d.appendChild(q);
 });
 c.appendChild(d);
}
window.ghostOpen=open;
document.addEventListener("keydown",function(e){if(e.key==="Escape")close();});
})();
