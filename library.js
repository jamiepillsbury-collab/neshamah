/* The Library: "The Librarian's Apprentice" as a solo journaling game in the Journal tab.
   Game text and roll tables: The Librarian's Apprentice by Dan Bronson-Lowe (Almost Bedtime Theater), CC BY 4.0.
   That game is based on Firelights by René-Pier Deshaies-Gélinas (Fari RPGs), CC BY 4.0.
   Adapted for Neshamah: digital deck, dice and map; rules summaries reworded. */
(function(){
var KEY="neshamah_library";
var T={"formats":[["A single line on","A bowl"],["An announcement by","A butterfly"],["An interpretive dance by","A clay tablet"],["Bumps and ridges on","A coin"],["Carvings on","A computer screen"],["Decorations on","A constellation"],["Dents in","A crystal"],["Drawings on","A fire"],["Etchings on","A garden"],["Flashes of light from","A globe"],["Hidden text on","A map"],["Images created by","A meal"],["Memories passed along by","A painting"],["Runes on","A piece of ice"],["Sparks from","A poem"],["Strange symbols on","A pool of water"],["The changing colors of","A raven"],["The emotions of","A scroll"],["The folds in","A serpent"],["The form of","A set of vials"],["The humming of","A skull"],["The melody of","A song"],["The paintings on","A spirit"],["The pressure from","A statue"],["The shape of","A tapestry"],["The size of","A wand"],["The smell from","A weapon"],["The taste of","Bees"],["The teachings of","Book pages"],["The temperature of","Clothing"],["The texture of","Colored glass"],["The undulations of","Knotted yarn"],["The vibrations of","Leaves"],["Whispers of","The air"],["Words spoken by","The room"],["Writing on","Trees"]],"comps":[["Difficult terrain [3]"],["A patron in need [3]"],["The Library shifts [4]"],["A document escaping its section [4]"],["An intruder [5]"],["A Keeper of the Forbidden [5]"],["A gnosiphage [6]"],["An Acolyte of the Scryptwyrm [6]"],["A Librarian who will test you [6]"],["An angry library spirit [8]"],["A swarm of hungry books [8]"],["The Thing Below [10]"]],"desc":[["Arboreal","Armor","Autobiographies"],["Bone","Atrium","Children’s stories"],["Burned","Coral reef","Cities"],["Cavernous","Costumes","Contains a hidden letter"],["Chained","Eggs","Cookbooks"],["Cheerful","Elevator","Destroyed by the author"],["Dark","Eyes","Diaries"],["Decorative","Feathers","Fashion"],["Dilapidated","Garden","Flying"],["Dusty","Gears","Gambling"],["Eldritch","Gift shop","Geology"],["Elegant","Glowing crystals","Imaginary languages"],["Ephemeral","Hourglasses","Libraries"],["Floating","Insect collection","Marginalia"],["Frost","Instruments","Medicine"],["Fungal","Invisible walls","Meteorology"],["Futuristic","Locked safe","Missing vital information"],["Glowing","Maps","Music"],["Haunted","Models","Mysteries"],["Hidden","Orrery","Natural history"],["Hive","Paintings","Never read"],["Labyrinthine","Pits","Not really blank"],["Long","Potions","Plays"],["Lost","Rain","Religious scriptures"],["Lower","Rugs","Riddles"],["Modern","Scales","Saved a life"],["Narrow","Scrolls","Smells"],["Organic","Sculpture","Spirits"],["Primitive","Skylights","Stained by notable meals"],["Pristine","Slides","Star charts"],["Shifting","Stained glass","Survival guides"],["Shrouded","Stairs","Things that are lucky"],["Stone","Taxidermy","Too heavy to lift"],["Underwater","Teeth","Too small to see"],["Upper","Weapons","Will never be written"],["Well-traveled","Workbenches","Written by undead"]],"interests":[["Accounts of","Artifacts of unimaginable power"],["An expert on","Blacksmithing techniques"],["A game about","Combat techniques"],["Ancient poetry about","Cooking techniques"],["Anything but","Cryptology"],["Arcane","Divination methods"],["Ballads about","Dreams and their symbolism"],["Blueprints of","Elemental control"],["Charms for","Forbidden practices"],["Coded messages about","Friends made along the way"],["Contests involving","Frogs"],["Cursed","Gambling strategies"],["Dances about","Game mechanics"],["DIY guides on","Gardening"],["Equipment related to","Get rich quick schemes"],["Fantastical tales about","Healing techniques"],["Folklore about","Historical mysteries"],["Forgotten","Home improvement"],["Help writing a report on","Infinite libraries"],["Historical records about","Interdimensional travel"],["Jewelry related to","Languages and grammar"],["Lost scrolls detailing","Legendary weapon designs"],["Maps related to","Lost cities"],["Plays that incorporate","Magical creatures"],["Prophecies about","Numbering systems"],["Rants about","Other planets"],["Recorded debates on","Outfits from other cultures"],["Riddles about","Paths to enlightenment"],["Rituals related to","Phobias"],["Rumors about","Plagues"],["Sketches of","Practical jokes"],["Spells related to","Revolutionary movements"],["Star charts for","Sleight of hand techniques"],["That one book on","Strategies of famous detectives"],["Tips and tricks related to","Time manipulation"],["Weapons inspired by","Treasure troves"]],"jobs":[["Acquisitions","Accountant"],["Anomaly","Analyst"],["Artifact","Apprentice"],["Citation","Archivist"],["Divination","Bearer"],["Dream","Breaker"],["Egg","Calibrator"],["Exhibit","Cleaner"],["Glyph","Collector"],["Headwear","Consultant"],["Hyperbole","Courier"],["Index","Curator"],["Ink","Designer"],["Inspiration","Director"],["Language","Feeder"],["Map","Gardener"],["Memory","Guardian"],["Migratory","Guide"],["Paradox","Healer"],["Pattern","Historian"],["Pillow","Hunter"],["Poetry","Inventor"],["Portal","Investigator"],["Provisions","Keeper"],["Randomization","Liaison"],["Reflection","Merchant"],["Refreshments","Officer"],["Research","Recycler"],["Restoration","Sealer"],["Riddle","Smith"],["Rogue","Specialist"],["Sign","Spy"],["Spirit","Warden"],["Swarm","Warrior"],["Time","Whistler"],["Translation","Wrangler"]],"npc":[["Ancient","Adventurous","Amuse"],["Armored","Altruistic","Argue"],["Bejeweled","Ambivalent","Betray"],["Blurry","Animated","Calculate"],["Colorful","Confident","Celebrate"],["Cute","Curious","Challenge"],["Damp","Distractible","Compare"],["Disturbing","Enigmatic","Compliment"],["Elegant","Fearless","Correct"],["Fanged","Focused","Daydream"],["Gangly","Furious","Decorate"],["Gigantic","Giggly","Deduce"],["Hairy","Grateful","Discover"],["Headless","Humble","Disrupt"],["Imposing","Impulsive","Empathize"],["Luminescent","Independent","Exaggerate"],["Miniature","Irritable","Explore"],["Monochromatic","Loyal","Feed"],["Monstrous","Optimistic","Gossip"],["Ocular","Persistent","Guide"],["Oily","Pessimistic","Hide"],["Opulent","Proper","Hunt"],["Pointy","Relaxed","Innovate"],["Serene","Reserved","Learn"],["Serpentine","Scared","Listen"],["Shiny","Silly","Manipulate"],["Sickly","Sincere","Perform"],["Sleek","Skeptical","Protect"],["Squat","Spontaneous","Provoke"],["Symmetrical","Stubborn","Repair"],["Tentacled","Suspicious","Shave"],["Translucent","Tense","Sketch"],["Undead","Vindictive","Snarl"],["Weathered","Wise","Steal"],["Wild","Witty","Succeed"],["Winged","Zealous","Trade"]],"quirk":[["Always gives a different name"],["Answers to the moth on their shoulder"],["Assumes everyone knows them"],["Believes the Library is finite"],["Bites their fingernails"],["Can’t resist straightening up your clothes"],["Chews on a clove"],["Claims they were a Librarian’s apprentice once"],["Doesn’t speak a language you know"],["Has a sunburn"],["Has a very expressive tail"],["Has finely buffed scales"],["Has one more eyeball than usual"],["Insists they can do magic"],["Loves to talk about their interest"],["Mutters about weasels"],["Never gets names right"],["Offers sandwiches"],["Only communicates in song"],["Plays with their jewelry"],["Refers to themselves in the third person"],["Refuses to acknowledge anything green"],["Repeats the last few words you say"],["Seems unaware they are constantly humming"],["Smells of lumberjacks"],["Snorts when laughing"],["Speaks in five word sentences"],["Spits, like, a lot"],["Stops talking in mid-sentence"],["Tea first, then talk"],["Wants to know more about your teeth"],["Wears a stolen mustache"],["Wears an ornamental eyepatch"],["Wears mismatched socks"],["Wears silver to ward off ghosts"],["Will try to pickle anything"]],"events":[["Library spirits can combine into forms much larger and smarter than people realize.","A headless suit of living armor kindly provides directions. (+2 to your next Travel roll)","An inhabitant of the Library requires assistance with their job duties.","The documents here are mischievous.","A troop of cattacoons are raiding a refreshments cabinet.","This is an active Library entrance."],["What a cozy nook! Rest here to clear 2 Fatigue.","Sentient documents have formed a secret society.","Forbidden section: Librarians Only.","The party is underway. They are singing karaoke.","A colony of bats emerges to feed on bothersome insects.","This abandoned Library entrance is sealed to prevent use."],["A lost patron is trying to find an exit. Any exit.","A window here opens onto a tropical island beach.","The Scryptwyrm trades knowledge for sacrifices. The required sacrifice is different each time.","Thick fog fills the area. (-1 to Travel and Conduct Research rolls here)","This room is a parasite impersonating the Library.","Welcome to 24/7 drag queen story hour!"],["Another Librarian’s apprentice is here, trying to complete their own task.","A patron is trying to steal something.","Everything here changes when not being watched.","The Keepers of the Forbidden maintain a collection of documents that are impossible to destroy.","The furnishings are smashed and torn. The damage is recent.","A cluster of library spirits merge to form a figure the size of your palm. It cautiously examines each thing you touch."],["A sleeping patron is here with a handwritten sign: Do Not Disturb.","A swarm of glow mites scuttles along, cleaning.","A novice researcher is trying to deal with a Complication.","A small flock of birds flit about the room, singing sea shanties.","Glow mites are powered by the minds of those caught stealing from the Library.","The ring of keys on the floor can be taken and used to resolve a Complication."],["Several senior Librarians are conferring in low voices.","A researcher is locked in a cage with a rare book.","A group of hunters are tracking a gnosiphage.","Something is slowly tunneling along under the floor. Something large.","A reference desk is here. Draw a card. If it's a face card, add it to the map and move to it. Else, trade it in.","Gnosiphages feed the knowledge they steal to the burned section of the Library to help it heal."]],"patrons":[["Pemith the Elder","Died in the library ages ago but won't let that stop them from working on their thesis."],["Blance Henbury","Believes they’re still in that quaint used book shop around the corner from the deli. Do you happen to have any scones, dear?"],["Sufidius","Recently expelled from magic school for a crime they didn’t commit. Desperately seeking resources on how to be a detective."],["Menry","Playful trickster on the hunt for gullible new targets. Or gullible old ones. No need to be picky."],["Talif von Canter","Valiant knight with a strong sense of honor. On a quest. Wouldn’t mind a little peril."],["Guilip I, II, and III","Trying to crack the puzzle of time-travel, but on purpose this time. Have met you before, you know, in the future."]],"inhabitants":[["Tert","Wrangles living glyphs etched into the walls of the Library. Doesn't trust graffiti."],["Hence","Constantly testing methods of mapping the Library. None remain accurate for long."],["Bolle","Crafts messages into origami beetles. They fly to the intended recipient."],["Caess","Hunts down new Library entrances so they can be the first to explore the source."],["Regess","I have just the thing to go with that outfit; oh, yes."],["Verley","Carefully collects all ink from their section of the Library, stores it safely, and returns it to the documents when someone wishes to read them."]]};
var SK={nav:"Navigation",res:"Research",lore:"Lore"};
var FAM={"cattacoon":"Part lemur, part raccoon, all trouble.",
 "glow mite":"A crab-like automaton with glowing gems. Often tasked with cleaning the Library.",
 "tumblefluff":"A library spirit: a ball of dust and library debris the size of your little finger."};
var GUIDE=[["Cattacoon","Part lemur, part raccoon, all trouble."],
 ["Glow mites","Crab-like automatons with glowing gems. Often tasked with cleaning the Library."],
 ["Gnosiphage","A.k.a. booklicker; a withered husk of a person from the burned section. Steals words and knowledge from documents by licking them; the content appears on their skin like tattoos."],
 ["The Thing Below","Burrows beneath the Library, rips open the floor, and consumes what falls into the hole. Haphazardly fixes the floor afterward, leaving behind a polite note listing what it ate."],
 ["Tumblefluff","Library spirit; a ball of dust and library debris the size of your little finger. Multiple spirits can temporarily merge into humanoid forms as big as your hand."]];
var TRUTHS=[["Your background",["You were found at a Library entrance as an infant. What trinket was with you that you still keep around your neck?",
 "You discovered a way into the Library and survived on your own in the stacks for a while, but the Library can be dangerous. What did you barely escape during those first few days?",
 "You were born and raised in the Library. What secret did older Library children share with you when you were growing up?"]],
 ["Your community",["There are always two: a Librarian and an apprentice. You live with your Librarian and rarely have visitors. Why do you suspect your Librarian is hiding something from you?",
 "You travel throughout the Library with your family, the royal librarians of a lost kingdom. Why do they never settle in one place for long?",
 "You live in Periphery, an enclave at the perimeter of the burned section. The people there try to keep gnosiphages from reaching the rest of the Library. How can you tell when a gnosiphage is near?"]],
 ["Your Library",["The Library is a sentient place; a Librarian knows how to communicate with it. The Library whispered to you once. What did it say?",
 "Each section of the Library is a separate creature; a Librarian is chosen by their section. You've heard tales of a section that went rogue. What happened?",
 "The Library is an ecosystem; a Librarian helps to keep it in balance. What is your favorite season in the Library?"]]];

function load(){try{return JSON.parse(localStorage.getItem(KEY))||{};}catch(e){return {};}}
var S=load();S.days=S.days||[];S.ents=S.ents||[];
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
function $(q){return document.querySelector(q);}
function h(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function btn(t,f,cls){var b=h("button",cls||"",t);b.onclick=function(){f();};return b;}
function card(){var c=h("div","card");$("#lb-body").appendChild(c);return c;}
function say(t){if(window.toast)toast(t);}
function lc(s){return s.charAt(0).toLowerCase()+s.slice(1);}
function fmt(t){return new Date(t).toLocaleDateString(undefined,{month:"short",day:"numeric"});}
function d6(){return 1+Math.floor(Math.random()*6);}
function d66(){return (d6()-1)*6+d6()-1;}

/* cards are strings like "7H": rank 1-13 + suit S H D C */
var SUIT={S:"♠",H:"♥",D:"♦",C:"♣"},RN={1:"A",11:"J",12:"Q",13:"K"};
function rank(c){return parseInt(c,10);}
function suit(c){return c.slice(-1);}
function val(c){var r=rank(c);return r>10?11:r;}
function face(c){return rank(c)>10;}
function cname(c){return (RN[rank(c)]||rank(c))+SUIT[suit(c)];}
function cel(c){return h("span","lc"+(/[HD]/.test(suit(c))?" red":""),cname(c));}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
function fresh(){var a=[];"SHDC".split("").forEach(function(s){for(var r=1;r<=13;r++)a.push(r+s);});return shuffle(a);}
function D(){return S.day;}
function draw(){var d=D();if(!d.deck.length){d.deck=shuffle(d.disc);d.disc=[];say("Deck reshuffled from the discard pile.");}return d.deck.pop();}
function here(){return D().map[D().at];}
function evk(m){return m&&m.ev?m.ev[1]+""+m.ev[0]:"";}
function stuck(){var d=D();return !!(d.comp||d.pend||d.q.length);}

/* ---------- map ---------- */
function occ(x,y){return D().map.some(function(m){return m.x===x&&m.y===y;});}
function place(c){
 var d=D(),cur=here(),v=val(c),cv=val(cur.c),x=cur.x,y=cur.y,tries,p=null;
 if(v>cv)tries=[[x,y-1],[x-1,y-1],[x+1,y-1]];else if(v<cv)tries=[[x,y+1],[x-1,y+1],[x+1,y+1]];else tries=[[x+1,y],[x-1,y]];
 tries.some(function(t){if(!occ(t[0],t[1])){p=t;return true;}return false;});
 if(!p){var dx=v===cv?1:0,dy=v>cv?-1:v<cv?1:0,px=x+dx,py=y+dy;while(occ(px,py)){px+=dx;py+=dy;}p=[px,py];}
 var m={c:c,x:p[0],y:p[1],desc:[d66(),d66(),d66()],ev:[d6(),d6()],used:{}};
 d.map.push(m);d.at=d.map.length-1;
 if(face(c)){m.doc=1;m.fmt=[d66(),d66()];d.docs++;say("A document you seek is here.");}
 return m;
}

/* ---------- fatigue, trading, complications ---------- */
function trade(c){var d=D();if(/[SC]/.test(suit(c))){d.resr++;d.disc.push(c);say("Traded in "+cname(c)+": +1 Resource.");}else d.q.push({k:"trade",c:c});}
function fatigue(){D().q.push({k:"fat"});}
function clearFat(n){var d=D();for(var i=0;i<n;i++){if(d.fat>0)d.fat--;else if(S.ch.fam.tired)S.ch.fam.tired=false;}}
function newComp(){var a=d6(),b=d6(),i=(a<=3?0:6)+b-1,s=T.comps[i][0],m=s.match(/^(.*) \[(\d+)\]$/);
 D().comp={n:m[1],diff:+m[2],stack:[],loc:D().at};}
function compCount(){var d=D(),s=suit(d.map[d.comp.loc].c);return d.comp.stack.reduce(function(a,c){return a+(suit(c)===s?2:1);},0);}
function checkComp(){var d=D();if(d.comp&&compCount()>=d.comp.diff){d.disc=d.disc.concat(d.comp.stack);say(d.comp.n+": addressed.");d.comp=null;}}
function checkOver(){var d=D();if(d.q.length||d.pend)return;if(d.docs>=6)d.over="done";else if(d.fat>=4)d.over="tired";}
function after(){checkComp();checkOver();save();render();}

/* ---------- actions ---------- */
function bonus(act){
 var ch=S.ch,b=0,parts=[],sk=act==="travel"?"nav":act==="research"?"res":"lore";
 b+=ch.sk[sk];parts.push(SK[sk]+" +"+ch.sk[sk]);
 if(ch.fam.skill===sk&&!ch.fam.tired){b++;parts.push(ch.fam.name+" +1");}
 if((act==="travel"||act==="research")&&evk(here())==="34"){b--;parts.push("fog −1");}
 if(act==="travel"&&D().armor){b+=2;parts.push("directions +2");}
 return {b:b,parts:parts};
}
var SP=0,QT="";
function act(a,likely){
 var d=D();if(d.deck.length+d.disc.length<2){say("Not enough cards left to draw.");return;}
 var c1=draw(),c2=draw(),r=[d6(),d6()],bb=a==="ask"?{b:likely,parts:[["Unlikely +0","Even odds +1","Likely +2"][likely]]}:bonus(a);
 var sp=Math.min(SP,d.resr);d.resr-=sp;if(sp)bb.parts.push(sp+" Resource"+(sp>1?"s":"")+" +"+sp);
 if(a==="travel")d.armor=0;
 var tot=r[0]+r[1]+bb.b+sp,n=(tot>val(c1)?1:0)+(tot>val(c2)?1:0);
 d.pend={a:a,cards:[c1,c2],roll:r,parts:bb.parts,tot:tot,res:n===2?"Light":n===1?"Shadow":"Darkness",qt:a==="ask"?QT:""};
 SP=0;QT="";save();render();
}
function resolve(i){ /* i = index of the chosen card, where a choice applies */
 var d=D(),p=d.pend,c=p.cards,o=c[1-(i||0)];
 if(p.a==="travel"){if(p.res==="Light")trade(o);else d.disc.push(o);place(c[i]);if(p.res==="Darkness")newComp();}
 else if(p.a==="research"){if(p.res==="Light"){trade(c[0]);trade(c[1]);}else if(p.res==="Shadow"){trade(c[i]);d.disc.push(o);}else{d.disc.push(c[0],c[1]);newComp();}}
 else if(p.a==="address"){if(p.res==="Light"){d.comp.stack.push(c[0],c[1]);}else if(p.res==="Shadow"){d.comp.stack.push(c[i]);d.disc.push(o);fatigue();}else{d.disc.push(c[0],c[1]);fatigue();}}
 else d.disc.push(c[0],c[1]);
 d.pend=null;after();
}

/* ---------- overlay ---------- */
var css="#library{position:fixed;inset:0;z-index:22;display:none;overflow-y:auto;background:radial-gradient(ellipse at 50% 0%,#2e3550 0%,#1b1f36 60%,#121426 100%);padding:16px 16px calc(90px + env(safe-area-inset-bottom))}"+
"#library.on{display:block}#library .in{max-width:640px;margin:0 auto}"+
"#library .top{display:flex;justify-content:space-between;align-items:center;gap:8px}"+
"#library .lc{display:inline-block;min-width:34px;padding:6px 6px;margin:2px;border-radius:6px;background:#f6f1e7;color:#1f2236;font-weight:600;text-align:center;font-size:15px}"+
"#library .lc.red{color:#a8323e}#library button .lc{margin:0}"+
"#library .dots{display:inline-flex;gap:5px;vertical-align:middle}#library .dots i{width:11px;height:11px;border-radius:50%;border:1px solid var(--amber);display:block}#library .dots i.f{background:var(--amber)}"+
"#library .row{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:6px 0}"+
"#library .die{display:inline-block;width:30px;height:30px;line-height:30px;border:1px solid var(--amber);border-radius:7px;text-align:center;color:var(--amber);margin-right:4px}"+
"#library .res{font-size:20px;color:var(--amber);margin:6px 0}"+
"#library .map{display:grid;gap:4px;justify-content:center;overflow-x:auto;padding:4px}"+
"#library .map .cell{width:38px;height:50px}#library .map .lc{width:38px;height:50px;margin:0;padding:4px 0;font-size:13px;position:relative;cursor:pointer;line-height:1.1}"+
"#library .map .lc.at{outline:3px solid var(--amber)}#library .map .lc small{display:block;font-size:10px;color:#6b5a2e}"+
"#library textarea,#library input[type=text]{width:100%}#library textarea{min-height:64px}"+
"#library .ent{margin:6px 0;padding-left:10px;border-left:2px solid var(--line)}#library .box{border:1px solid var(--line);border-radius:10px;padding:8px 10px;margin:8px 0}"+
"#library .cab{font-size:18px;color:var(--amber)}#library label{display:block;margin:4px 0}#library select{max-width:100%}";
function el(){
 var o=$("#library");if(o)return o;
 var st=h("style");st.textContent=css;document.head.appendChild(st);
 o=h("div");o.id="library";o.setAttribute("role","dialog");o.setAttribute("aria-label","The Librarian's Apprentice");
 o.innerHTML="<div class='in'><div class='top'><h2 style='margin:0'>The Librarian's Apprentice</h2><button class='ghost' id='lb-x'>Close</button></div><div id='lb-body'></div></div>";
 document.body.appendChild(o);o.querySelector("#lb-x").onclick=close;return o;
}
function open(){el().classList.add("on");document.body.style.overflow="hidden";render();}
function close(){var o=$("#library");if(o)o.classList.remove("on");document.body.style.overflow="";}

function render(){
 var b=$("#lb-body");if(!b)return;b.innerHTML="";
 if(!S.ch){setup();}
 else if(!S.day){between();}
 else if(S.day.over){ending();}
 else play();
 archive();guide();
 var f=card();f.appendChild(h("p","src","The Librarian's Apprentice by Dan Bronson-Lowe (Almost Bedtime Theater), CC BY 4.0. Based on Firelights by René-Pier Deshaies-Gélinas (Fari RPGs), CC BY 4.0. Tables used as published; rules summaries reworded; deck, dice and map made digital for Neshamah."));
 var a=h("a","src","creativecommons.org/licenses/by/4.0");a.href="https://creativecommons.org/licenses/by/4.0/";a.target="_blank";a.rel="noopener";f.appendChild(a);
}

/* ---------- character ---------- */
function setup(){
 var c=card();c.appendChild(h("p","small","The Great Library exists in the space between worlds and times. You are a Librarian's apprentice. Today's test: find six documents your Librarian has requested before the day is out."));
 c.appendChild(h("h3",null,"Who are you?"));
 var nm=h("input");nm.type="text";nm.placeholder="Name";var pr=h("input");pr.type="text";pr.placeholder="Pronouns";
 c.appendChild(nm);c.appendChild(pr);
 c.appendChild(h("h3",null,"Skills"));c.appendChild(h("p","small","Give +2 to the skill you're best at, +1 to the one you're good at, +0 to the last."));
 var sel={};["nav","res","lore"].forEach(function(k,i){var l=h("label",null,SK[k]+" ");var s=h("select");[2,1,0].forEach(function(v){var o=h("option",null,"+"+v);o.value=v;s.appendChild(o);});s.value=2-i;sel[k]=s;l.appendChild(s);c.appendChild(l);});
 c.appendChild(h("h3",null,"Familiar"));c.appendChild(h("p","small","It's dangerous to go alone. Your familiar adds +1 to one skill and can absorb one Fatigue for you (it loses the bonus until that Fatigue is cleared)."));
 var ft=h("select");Object.keys(FAM).forEach(function(k){var o=h("option",null,k+": "+FAM[k]);o.value=k;ft.appendChild(o);});c.appendChild(ft);
 var fs=h("select");Object.keys(SK).forEach(function(k){var o=h("option",null,"+1 to "+SK[k]);o.value=k;fs.appendChild(o);});c.appendChild(fs);
 var fn=h("input");fn.type="text";fn.placeholder="Familiar's name";c.appendChild(fn);
 c.appendChild(h("h3",null,"Truths"));c.appendChild(h("p","small","Choose one from each. Answer in a line, or leave it for the page."));
 var tr=TRUTHS.map(function(t,ti){var bx=h("div","box");bx.appendChild(h("div","small",t[0]));var s=h("select");t[1].forEach(function(q,i){var o=h("option",null,q);o.value=i;s.appendChild(o);});bx.appendChild(s);var ta=h("textarea");ta.placeholder="Your answer (optional)";bx.appendChild(ta);c.appendChild(bx);return [s,ta];});
 c.appendChild(btn("Begin",function(){
  var v={nav:+sel.nav.value,res:+sel.res.value,lore:+sel.lore.value};
  if([v.nav,v.res,v.lore].sort().join()!=="0,1,2"){say("Use +2, +1 and +0 once each.");return;}
  S.ch={name:nm.value.trim()||"Apprentice",pron:pr.value.trim(),sk:v,fam:{type:ft.value,skill:fs.value,name:fn.value.trim()||ft.value,tired:false},
   truths:tr.map(function(x,i){return {q:TRUTHS[i][1][+x[0].value],a:x[1].value.trim()};})};
  save();render();},"on"));
}
function sheet(c){
 var ch=S.ch;var d=h("details");d.appendChild(h("summary",null,ch.name+(ch.pron?" ("+ch.pron+")":"")));
 d.appendChild(h("p","small","Navigation +"+ch.sk.nav+" · Research +"+ch.sk.res+" · Lore +"+ch.sk.lore));
 d.appendChild(h("p","small",ch.fam.name+", a "+ch.fam.type+": +1 to "+SK[ch.fam.skill]+(ch.fam.tired?" (tired; bonus returns when its Fatigue is cleared)":"")));
 ch.truths.forEach(function(t){var e=h("div","ent");e.appendChild(h("div","small",t.q));if(t.a)e.appendChild(h("div",null,t.a));d.appendChild(e);});
 d.appendChild(btn("New character",function(){if(confirmTwice(this))return;S.ch=null;S.day=null;save();render();},"ghost"));
 c.appendChild(d);
}
var armed=0;function confirmTwice(){if(Date.now()-armed>4000){armed=Date.now();say("Tap again to confirm.");return true;}armed=0;return false;}

/* ---------- days ---------- */
function between(){
 var c=card();sheet(c);
 var n=S.days.length+1;
 c.appendChild(h("p","small",n===1?"Draw your first card: the Librarian's Office. From there, the Library unfolds one card at a time.":"A new day, a new task: six documents before the day is out. The Library has shifted overnight; the map starts fresh."));
 c.appendChild(btn("Begin day "+n,newDay,"on"));
 if(S.days.length){var l=h("p","small",S.days.map(function(x){return "Day "+x.n+" ("+fmt(x.t)+"): "+(x.res==="done"?"task complete":x.docs+" of 6, too tired");}).join(" · "));c.appendChild(l);}
}
function newDay(){
 var deck=fresh(),c=null;while(!c){c=deck.pop();if(face(c)){deck.unshift(c);shuffle(deck);c=null;}}
 S.day={n:S.days.length+1,deck:deck,disc:[],map:[{c:c,x:0,y:0,office:1,used:{}}],at:0,fat:0,resr:0,saved:[],docs:0,comp:null,armor:0,keys:0,q:[],pend:null,t:Date.now()};
 S.ch.fam.tired=false;save();render();
}
function ending(){
 var d=D(),c=card();
 c.appendChild(h("div","res",d.over==="done"?"Six documents recovered.":"Too tired to go on."));
 c.appendChild(h("p","small",d.over==="done"?"One more step on the path to becoming a Librarian. What do you bring back to your Librarian, and what do you keep for yourself?":"The day is over; the task waits for another time. Where do you rest tonight, and what did the Library show you anyway?"));
 var ta=h("textarea");c.appendChild(ta);
 c.appendChild(btn("Close the day",function(){
  if(ta.value.trim())keep("End of day "+d.n,ta.value.trim());
  S.days.push({n:d.n,res:d.over,docs:d.docs,t:Date.now()});S.day=null;save();
  if(typeof plogAdd==="function"){try{plogAdd("library","Day "+d.n+(d.over==="done"?" complete":""));}catch(e){}}
  render();},"on"));
}
function keep(where,txt){S.ents.push({t:Date.now(),day:S.day?S.day.n:S.days.length,where:where,txt:txt});save();say("Kept.");}

/* ---------- play ---------- */
function where(m){return m.office?"Librarian's Office":T.desc[m.desc[0]][0]+" "+lc(T.desc[m.desc[1]][1]);}
function play(){
 var d=D(),ch=S.ch,c=card();sheet(c);
 var r=h("div","row");r.appendChild(h("span","small","Day "+d.n+" · Fatigue "));var fd=h("span","dots");for(var i=0;i<4;i++)fd.appendChild(h("i",i<d.fat?"f":""));r.appendChild(fd);
 r.appendChild(h("span","small"," · Documents "));var dd=h("span","dots");for(i=0;i<6;i++)dd.appendChild(h("i",i<d.docs?"f":""));r.appendChild(dd);c.appendChild(r);
 r=h("div","row");r.appendChild(h("span","small","Resources "+d.resr+(ch.fam.tired?" · "+ch.fam.name+" is tired":"")+(d.keys?" · ring of keys":"")+(d.armor?" · +2 to next Travel":"")));c.appendChild(r);
 if(!d.q.length&&!d.pend){
  r=h("div","row");
  if(d.resr>=3&&(d.fat||ch.fam.tired))r.appendChild(btn("Rest (3 Resources): clear all Fatigue",function(){d.resr-=3;d.fat=0;ch.fam.tired=false;after();},"ghost"));
  if(d.resr>=5&&!d.comp)r.appendChild(btn("Find a document (5 Resources)",findDoc,"ghost"));
  d.saved.forEach(function(sc,j){if(d.fat||ch.fam.tired)r.appendChild(btn("Use saved "+cname(sc)+": clear 1 Fatigue",function(){d.saved.splice(j,1);d.disc.push(sc);clearFat(1);after();},"ghost"));});
  if(r.childNodes.length)c.appendChild(r);
 }
 if(d.q.length)queue();else if(d.pend)pending();
 location();
 if(!d.q.length&&!d.pend)actions();
 mapCard();
}
function findDoc(){
 var d=D(),pool=d.deck.filter(face).length?"deck":"disc",arr=d[pool],i=-1;
 arr.some(function(c,j){if(face(c)){i=j;return true;}return false;});
 if(i<0){say("No face cards left to find.");return;}
 var c=arr.splice(i,1)[0];d.resr-=5;place(c);after();
}
function queue(){
 var d=D(),q=d.q[0],c=card(),ch=S.ch;
 if(q.k==="trade"){
  c.appendChild(h("p",null,"You traded in "));c.lastChild.appendChild(cel(q.c));
  c.appendChild(h("p","small","Hearts and diamonds clear 1 Fatigue, now or later."));
  var r=h("div","row");
  if(d.fat||ch.fam.tired)r.appendChild(btn("Clear 1 Fatigue now",function(){d.q.shift();d.disc.push(q.c);clearFat(1);after();},"on"));
  r.appendChild(btn("Save it for later",function(){d.q.shift();d.saved.push(q.c);after();},d.fat||ch.fam.tired?"ghost":"on"));c.appendChild(r);
 }else{
  if(ch.fam.tired){d.q.shift();d.fat++;after();return;}
  c.appendChild(h("p",null,"Mark 1 Fatigue."));
  var r2=h("div","row");
  r2.appendChild(btn("Take it yourself",function(){d.q.shift();d.fat++;after();},"on"));
  r2.appendChild(btn("Let "+ch.fam.name+" absorb it",function(){d.q.shift();ch.fam.tired=true;after();},"ghost"));c.appendChild(r2);
 }
}
var VERB={travel:"Travel",research:"Conduct Research",address:"Address the Complication",ask:"Ask a Question"};
function pending(){
 var d=D(),p=d.pend,c=card();
 c.appendChild(h("div","small",VERB[p.a]+(p.qt?": "+p.qt:"")));
 var r=h("div","row");r.appendChild(h("span","die",p.roll[0]));r.appendChild(h("span","die",p.roll[1]));
 r.appendChild(h("span","small",p.parts.length?"+ "+p.parts.join(", ")+" = "+p.tot:"= "+p.tot));c.appendChild(r);
 r=h("div","row");r.appendChild(h("span","small","against "));p.cards.forEach(function(x){r.appendChild(cel(x));});c.appendChild(r);
 c.appendChild(h("div","res",p.res));
 var r3=h("div","row");
 function pick(label){p.cards.forEach(function(x,i){var b=btn("",function(){resolve(i);},"ghost");b.appendChild(cel(x));r3.appendChild(b);});c.appendChild(h("p","small",label));}
 if(p.a==="travel"){
  pick({Light:"Choose the card to add to the map. You trade in the other.",Shadow:"Choose the card to add to the map. The other is discarded.",Darkness:"Choose the card to add to the map. The other is discarded, and something is waiting there."}[p.res]+" A face card holds a document.");
 }else if(p.a==="research"){
  if(p.res==="Light"){c.appendChild(h("p","small","You find something useful. Trade in both cards."));r3.appendChild(btn("Trade in both",function(){resolve(0);},"on"));}
  else if(p.res==="Shadow")pick("Choose the card to trade in. The other is discarded.");
  else{c.appendChild(h("p","small","Nothing useful, and you've stirred something up. Both cards are discarded."));r3.appendChild(btn("Discover a Complication",function(){resolve(0);},"on"));}
 }else if(p.a==="address"){
  if(p.res==="Light"){c.appendChild(h("p","small","Both cards go on the Complication stack."));r3.appendChild(btn("Add both",function(){resolve(0);},"on"));}
  else if(p.res==="Shadow")pick("Choose the card for the stack. The other is discarded, and you mark 1 Fatigue.");
  else{c.appendChild(h("p","small","Both cards are discarded, and you mark 1 Fatigue."));r3.appendChild(btn("Go on",function(){resolve(0);},"on"));}
 }else{
  c.appendChild(h("div","res",{Light:"Yes, and…",Shadow:"Yes, but…",Darkness:"No, and…"}[p.res]));
  r3.appendChild(btn("Done",function(){resolve(0);},"on"));
 }
 c.appendChild(r3);
}
function location(){
 var d=D(),m=here(),c=card();
 var t=h("div","row");t.appendChild(cel(m.c));t.appendChild(h("span","cab",where(m)));c.appendChild(t);
 if(!m.office){
  var ds=h("div","row");ds.appendChild(h("span","small",T.desc[m.desc[0]][0]+" · "+T.desc[m.desc[1]][1]+" · "+T.desc[m.desc[2]][2]));
  if(!stuck())ds.appendChild(btn("↻",function(){m.desc=[d66(),d66(),d66()];save();render();},"ghost"));c.appendChild(ds);
  c.appendChild(h("p","small","Descriptor · feature · the category of documents here."));
  var k=evk(m),ev=T.events[m.ev[1]-1][m.ev[0]-1],bx=h("div","box");
  bx.appendChild(h("div",null,ev));if(m.ev[0]===m.ev[1])bx.appendChild(h("div","small","A secret. How did you discover it?"));
  var er=h("div","row");
  if(!stuck()&&!m.used.ev){
   if(k==="21"&&(d.fat||S.ch.fam.tired))er.appendChild(btn("Rest here: clear 2 Fatigue",function(){m.used.ev=1;clearFat(2);after();},"ghost"));
   if(k==="12")er.appendChild(btn("Take the directions (+2 to next Travel)",function(){m.used.ev=1;d.armor=1;after();},"ghost"));
   if(k==="56")er.appendChild(btn("Take the ring of keys",function(){m.used.ev=1;d.keys++;after();},"ghost"));
   if(k==="65")er.appendChild(btn("Draw a card at the desk",function(){m.used.ev=1;var x=draw();if(face(x))place(x);else trade(x);after();},"ghost"));
  }
  if(k==="34")er.appendChild(h("span","small","−1 to Travel and Conduct Research here."));
  if(er.childNodes.length)bx.appendChild(er);c.appendChild(bx);
 }
 if(m.doc){var db=h("div","box");db.appendChild(h("div","small","Document recovered. Its information is presented as…"));db.appendChild(h("div",null,T.formats[m.fmt[0]][0]+" "+lc(T.formats[m.fmt[1]][1])));
  if(!stuck())db.appendChild(btn("↻",function(){m.fmt=[d66(),d66()];save();render();},"ghost"));c.appendChild(db);}
 if(d.comp&&d.comp.loc===d.at){
  var cb=h("div","box");cb.appendChild(h("div","cab",d.comp.n));
  cb.appendChild(h("div","small","Difficulty "+d.comp.diff+" · stack "+compCount()+" (cards matching this location's suit "+SUIT[suit(m.c)]+" count double)"));
  var sr=h("div","row");d.comp.stack.forEach(function(x){sr.appendChild(cel(x));});cb.appendChild(sr);
  cb.appendChild(h("p","small","Help, avoid, fix, flee, trick, pacify. Violence is a last resort."));
  if(d.keys&&!stuck2())cb.appendChild(btn("Use the ring of keys",function(){d.keys--;d.disc=d.disc.concat(d.comp.stack);d.comp=null;say("Resolved with the keys.");after();},"ghost"));
  c.appendChild(cb);
 }
 if(m.who){var wb=h("div","box");m.who.forEach(function(s){wb.appendChild(h("div","small",s));});c.appendChild(wb);}
 var wr=h("div","row");wr.appendChild(btn(m.who?"Someone else":"Meet someone",function(){m.who=someone();save();render();},"ghost"));c.appendChild(wr);
 var ta=h("textarea");ta.placeholder="Write what happens here.";c.appendChild(ta);
 c.appendChild(btn("Keep",function(){var v=ta.value.trim();if(!v)return;keep(cname(m.c)+" · "+where(m),v);render();},"on"));
}
function stuck2(){var d=D();return !!(d.pend||d.q.length);}
function someone(){
 var a=T.npc[d66()][0],t=T.npc[d66()][1],im=T.npc[d66()][2],q=T.quirk[d66()][0];
 var it=T.interests[d66()][0]+" "+lc(T.interests[d66()][1]),jb=T.jobs[d66()][0]+" "+T.jobs[d66()][1];
 var out=[a+", "+lc(t)+"; wants to "+lc(im)+".","Quirk: "+q,"Interested in: "+it,"Title: "+jb];
 if(d6()===6){var L=d6()<=3?T.patrons:T.inhabitants,n=L[d6()-1];out=[n[0]+": "+n[1]];}
 return out;
}
function actions(){
 var d=D(),c=card();
 if(d.resr){var r=h("div","row");r.appendChild(h("span","small","Spend Resources on this roll: "+SP));
  r.appendChild(btn("−",function(){if(SP>0)SP--;render();},"ghost"));r.appendChild(btn("+",function(){if(SP<d.resr)SP++;render();},"ghost"));c.appendChild(r);}
 var a=h("div","row");
 if(d.comp){a.appendChild(btn("Address the Complication (+Lore)",function(){act("address");},"on"));}
 else{a.appendChild(btn("Travel (+Navigation)",function(){act("travel");},"on"));a.appendChild(btn("Conduct Research (+Research)",function(){act("research");},"on"));}
 c.appendChild(a);
 var qd=h("details");qd.appendChild(h("summary",null,"Ask a yes/no question"));
 var qi=h("input");qi.type="text";qi.placeholder="Your question (optional)";qi.value=QT;qi.oninput=function(){QT=qi.value;};qd.appendChild(qi);
 var qr=h("div","row");[["Likely",2],["Even odds",1],["Unlikely",0]].forEach(function(x){qr.appendChild(btn(x[0],function(){act("ask",x[1]);},"ghost"));});qd.appendChild(qr);c.appendChild(qd);
}
function mapCard(){
 var d=D(),c=card(),xs=d.map.map(function(m){return m.x;}),ys=d.map.map(function(m){return m.y;});
 var x0=Math.min.apply(null,xs),x1=Math.max.apply(null,xs),y0=Math.min.apply(null,ys),y1=Math.max.apply(null,ys);
 c.appendChild(h("div","small","Map · higher cards sit above, lower below. Tap a card to walk there."+(d.comp?" (Not while a Complication blocks the way.)":"")));
 var g=h("div","map");g.style.gridTemplateColumns="repeat("+(x1-x0+1)+",38px)";
 for(var y=y0;y<=y1;y++)for(var x=x0;x<=x1;x++){
  var i=-1;d.map.some(function(m,j){if(m.x===x&&m.y===y){i=j;return true;}return false;});
  if(i<0){g.appendChild(h("div","cell"));continue;}
  (function(i){var m=d.map[i],e=cel(m.c);if(i===d.at)e.className+=" at";
   var s=h("small",null,m.office?"office":m.doc?"★":(d.comp&&d.comp.loc===i?"!":""));e.appendChild(s);
   e.onclick=function(){if(stuck()){say(d.comp?"A Complication blocks the way.":"Finish this step first.");return;}d.at=i;save();render();};g.appendChild(e);})(i);
 }
 c.appendChild(g);
}

/* ---------- archive & guide ---------- */
function archive(){
 if(!S.ents.length)return;
 var c=card(),d=h("details");d.appendChild(h("summary",null,"Your journal ("+S.ents.length+")"));
 S.ents.slice().reverse().forEach(function(e){var x=h("div","ent");x.appendChild(h("div","small","Day "+e.day+" · "+fmt(e.t)+" · "+e.where));x.appendChild(h("div",null,e.txt));d.appendChild(x);});
 c.appendChild(d);
}
function guide(){
 var c=card(),d=h("details");d.appendChild(h("summary",null,"How it works"));
 ["Every action: draw two cards and roll 2d6 plus your skill. Aces are 1, face cards 11. Beat both cards: Light. Beat one: Shadow. Beat neither: Darkness.",
  "Travel finds a new area, placed above the current card if higher, below if lower, beside if equal. Any face card on the map holds a document; you collect it on arrival.",
  "Conduct Research turns cards into Resources (clubs, spades) or Fatigue relief (hearts, diamonds, which you can save).",
  "Complications must be addressed before you move on: build a stack of cards equal to the difficulty.",
  "Resources: 1 adds +1 to a roll; 3 lets you rest and clear all Fatigue; 5 finds a document.",
  "Four Fatigue ends the day. Six documents completes the task. How much you write is up to you."].forEach(function(t){d.appendChild(h("p","small",t));});
 c.appendChild(d);
 var g=h("details");g.appendChild(h("summary",null,"Field guide"));
 GUIDE.forEach(function(x){g.appendChild(h("p","small",x[0]+": "+x[1]));});
 g.appendChild(h("h3",null,"Patrons"));T.patrons.forEach(function(x){g.appendChild(h("p","small",x[0]+": "+x[1]));});
 g.appendChild(h("h3",null,"Inhabitants"));T.inhabitants.forEach(function(x){g.appendChild(h("p","small",x[0]+": "+x[1]));});
 c.appendChild(g);
}
window.libraryOpen=open;
document.addEventListener("keydown",function(e){if(e.key==="Escape")close();});
})();
