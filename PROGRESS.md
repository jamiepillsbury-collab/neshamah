# Neshamah — progress

## 2026-10-16 review (no code changed)
Local index.html is v2.3. It ALREADY has: Neshamah card at top of Breathe, guided grounding (where/look/listen/feel/differentiate/choose),
ladder with text + voice memo + save, feelings wheel, step bar + countdown on guided practices.
Open question: Jamie's phone may be running an older deployed copy. Confirm the version shown in the header on the phone.

## Bugs/risks found
- Priestly Blessing Hebrew: line 2 has פָּנֶיךָ, Num 6:25 is פָּנָיו (the transliteration is correct).
- Refa'einu: Hebrew is missing כִּי תְהִלָּתֵנוּ אָתָּה (it's in the transliteration); וְנִוָּשֵׁעַ is probably וְנִוָּשֵׁעָה. Check against Sefaria + MT.
- Hashkiveinu: "malkeinu" wording needs checking against Mishkan T'filah.
- Source lines read as if translations came from Plaut/WTC/MT. They are original, so relabel them "original translation · compare:".
- Kaplan (Orthodox) / Nachman (Hasidic) citations: Jamie to decide.
- Voice memos are stored as base64 in localStorage (~5MB cap), so audio gets dropped silently. Move to IndexedDB + navigator.storage.persist().
- No service worker, so the app isn't actually offline. Timers use setInterval, which Android throttles when the screen is off. Add Wake Lock + timestamp-based timing.
- Progress bar jumps once per step, so nothing moves during a long step.
- Feelings wheel uses Willcox data, not the IOP wheel (Anger/Disgust/Sad/Happy/Surprise/Fear, ~120 words). The app also has no outer-word-first mode.
- IOP PDFs are scanned images with no text layer. They need OCR to be used.

## 2026-10-16 — v2.4 DONE (phases 1–2), tested headless, no JS errors
- Full-screen practice player (#player): ring = whole session, orb pulses on an 8s cycle, big step countdown, step segments, Pause/Resume, End, gray "why" line (SEQWHY).
  Timing is clock-based; screen wake lock is on while it runs.
- Fixed: somatic first-aid buttons were not wired (now sigh→Breathe 1 min, shake, bfly, new FEET seq). Body scan crashed (string steps, now 36s each).
- Breathe: length chips (1/3/5/10/open), time-left + bar, real Resume, bell at the end.
- Hebrew: Priestly Blessing פָּנָיו, Refa'einu completed. ⚑ flags on Hashkiveinu + Refa'einu. "About these texts" honesty card.
- Memos in IndexedDB (old data: URLs still play), storage.persist(), Backup/Restore JSON in Log.
- sw.js added (network-first for the page, so updates arrive). Must be uploaded next to index.html.
- Backup of the old file: index.v2.3.bak.html (don't upload it).

## 2026-10-16 — v2.5 DONE (phase 3), tested headless, no JS errors
- Ground order: You are here → Ground with me (guided flow) → Somatic first aid (5 states → 3 tools each, gray why) → Name it to tame it → Eyes → Reference (map + framework + cold/slow text, collapsed).
- New player sequences: COLD, SLOW. The FA table and WHY live in JS. FAST starters are merged into STARTERS at init.
- Wheel = IOP handout data (WHEEL/IDX; duplicate words show every path). Two modes: exact word (search) / big feeling. Body-location chips + 0–10 strength. Save to log / add to note / breath.
- New practice log (localStorage neshamah_practice, "plog"): grounding + feelings. Shown in Log, included in copy summary + backup/restore.
- Removed the inline reset/shake/bfly cards (everything runs in the player). sw.js cache → v2.5.

## 2026-10-16 — v2.6 DONE (phase 4), tested headless, no JS errors
- prayers.js (var PRAYERS) = 10 prayers / 55 lines. Hebrew came from the Sefaria API through Jamie's Chrome; it matches Sefaria exactly (SHA-256 identical after Unicode NFD normalization).
  Sefaria is blocked from both shells; Chrome JS fetch is the working route. Base text: Siddur Ashkenaz (Metsudah 1981 on Sefaria) + Tanakh (MAM). Cantillation stripped; divine name shown as יְיָ.
- Phonetic + English drafted by a Sonnet sub-agent (original wording, gender-neutral God-language), reviewed and corrected.
- Marked changes: Modah/Elohai feminine forms; Elohai N'shamah Reform ending (Job 12:10), removed "atid litlah" line, added v'imotai (⚑ reconstructed, verify);
  Oseh Shalom adds v'al kol yoshvei teiveil; Birkat Kohanim has a feminine alt; Hashkiveinu is the traditional weekday text plus a Shabbat-ending note (⚑).
- Pray tab renders from the data. Hebrew/Phonetic/English toggles are remembered. "Pray it with breath" = one line per 10s breath in the player.
- Dropped: the Kaplan citation (no longer in the text). Nishmat skipped (Sefaria's version had incomplete nikkud). Mi Shebeirach not included (Friedman lyrics are copyrighted).
- Build scripts live in the cloud container only. To regenerate, re-fetch via Chrome.
- OPEN: Jamie checks every prayer against Mishkan T'filah. Then set "verify" off or mark verified in prayers.js.

## 2026-10-16 — v2.7 DONE (phase 5), tested headless, no JS errors
- Nav down to 6 tabs (Today/Breathe/Pray/Ground/Rest/Journal) with SVG line icons. The Log tab is merged into the bottom of Today ("Your history").
- Noto Serif Hebrew via Google Fonts; sw.js caches the fonts cache-first.
- Breathe → "For pain": Sefirot body scan (SEF, 11 steps, ~11 min; Aramaic phrases verified from Tikkunei Zohar 17a on Sefaria, plus How/Why on every step),
  somatic tracking (TRACK, PRT), pendulation (PEND). History/red-flags explainer in a details block.
- Journal → Parts check-in (PQ), modeled on the IFS worksheet structure (kind, name, shows up, triggers, job, fear, 8 Cs, need). Saves to plog as k:"parts". Text-only (no voice yet).
- Player: added Next ›. Long step text gets a smaller font.
- _to_delete/_ifs_preview.png can be deleted.

## Next phases
- Ideas, not started: voice memos for parts, Omer counting with the sefirot, real recorded soundscapes (CC0), guided meditation audio slots, Prayer & Meditation tab from BRIEF.
- Waiting on Jamie: verify prayers vs Mishkan T'filah.

## 2026-10-18 — v2.13 DONE (Phase 1: Pray tab declutter), tested headless, no JS errors
- Each prayer card: Hebrew + one short line (first sentence of its note). Collapsed rows below: Transliteration, English, Sources & notes ⚑ (changes, verify flag, sources), Why this matters (full note).
- Hebrew/Phonetic/English buttons now mean "open this row by default" (Hebrew can be hidden). Stored under new key neshamah_prview2; defaults = Hebrew only.
- "Pray it with breath" uses Hebrew + English (plus phonetic if on).
- Files changed: index.html, sw.js (cache neshamah-v2.13). prayers.js unchanged.
- NOTE: this PROGRESS.md was last saved at v2.7; v2.8–v2.12 notes are missing locally (build itself came from Netlify).
## Next
- Phase 2: berachot as "Bless something" (hidden until tapped, category picker, "when you'd use it" note).
- Phase 3: screen Jewish resources folder (not started; do not read everything).
- Open: switch English to Sefaria's with credit (check license each); text-size setting; "My readings"; Lightfully support contacts.

## 2026-10-20 — scan OCR pass (no code changed)
- All 26 image-only Drive scans OCR'd (tesseract). Text: Neshamah/ocr_text/*.txt; extracted practices: Neshamah/ocr_text/scan-notes-ocr.md (also in project docs).
- Integration plan drafted (project doc claude/neshamah-integration-plan-2026-10-20.md): multi-select check-in (Grief/Dissociation/Pain) with safety filters, 21 practices with how/why.
- Next: Jamie answers plan's open questions → build step (a): chips + filter logic + practices.js.

## 2026-10-20 — v2.14 build step (a) DONE, tested headless, no JS errors
- practices.js (28 practices: steps, how, why, caution, avoid, flags). Loaded in index.html + sw.js cache (v2.14). Backups: index.v2.13.bak.html, sw.v2.13.bak.js.
- Today tab: multi-select "Right now I'm noticing" chips (Grief, Dissociation/unreal, Pain, Anxiety, Can't sleep); Dissociation chip replaces the "unreal" checkbox (still saved as u). Check-ins log f:[flags].
- Suggestions: one per chip in order dissoc→pain→anx→sleep→grief (ground→breathe→pray), safety filters (avoid lists, dissoc hides >6 min), top 3 + "▶ Do these in order" + "more options".
- Decisions: Name-breathing included (Jamie asking rabbi 10/21). Bedtime Shema line softened ("so I wake to the morning"), flagged.
- To deploy: upload index.html, practices.js, sw.js to Netlify.
- Next: step (b) Breathe + Ground cards for the new practices (collapsed How / Why rows).
- Open: "Grieving" state button now overlaps the Grief chip — keep both or drop the button?
- 10/20 later: Bedtime Shema keeps the traditional "lest I sleep the sleep of death" line (Jamie's decision). Old "Grieving" state button removed (Grief chip replaces it; old log entries still label fine).

## 2026-10-20 — v2.15 build step (b) DONE, tested headless, no JS errors
- Breathe tab: "Breath practices" card after the breath pacer (4 practices). Ground tab: "Grounding practices" card after "Ground with me" (3 practices).
- Generated by renderPracticeCards() in index.html from PRACTICES (tab breathe/ground). Each: title, mins (or sec if <1), eyes-closed/standing tags, ▶ Start (runPractice), caution line, collapsed "How it works" / "Why it's holy", ⚑ review flag line.
- sw.js cache neshamah-v2.15. Backups: index.v2.14a.bak.html, sw.v2.14a.bak.js.
- To deploy: upload index.html, practices.js, sw.js to Netlify.
- Next: step (c) Pray additions, then (d) Sleep + Journal cards (reuse renderPracticeCards: add tab rows to its list).
- Open: ⚑ flag lines show to the user; hide them once Jamie/rabbi sign off.

## 2026-10-20 — v2.16 build step (c) DONE, tested headless, no JS errors
- Pray tab: "Guided prayer practices" card just above the prayer list (#prayers). 12 practices: first 4 shown (Modeh Ani, Arrive, One verse, Silent prayer), other 8 under "More practices (8)".
- renderPracticeCards rows now take optional 5th value = number shown before "More"; anchor "^id" = insert before that element.
- sw.js cache neshamah-v2.16. Backups: index.v2.15.bak.html, sw.v2.15.bak.js.
- To deploy: upload index.html, practices.js, sw.js to Netlify.
- Next: step (d) Sleep + Journal cards (add rows; Rest tab section id to check).
- Waiting on Jamie: verify ⚑ blessing wordings (Mi Sheberach, Tefillat HaDerech, memorial candle, new moon, Shehecheyanu) vs Mishkan T'filah.

## 2026-10-20 — v2.17 build step (d) DONE, tested headless, no JS errors. All 28 practices now have cards.
- Rest tab: "Evening practices" card at end (Bedtime Shema, Evening download, Bad dream to good). Journal tab: "Short writing practices" card after Daily journal (6).
- Writing practices get "✎ Write" (inline: numbered prompts + textarea + Save / Let it go; saves to the log as the practice id, label = title) plus "▶ Start" (timed player).
- renderPracticeCards anchors: id (or its parent card) = insert after, "^id" = before, "$" = end. CSS: buttons wrap under the title on narrow screens.
- sw.js cache neshamah-v2.17. Backups: index.v2.16.bak.html, sw.v2.16.bak.js.
- To deploy: upload index.html, practices.js, sw.js to Netlify.
- Note: Evening download now exists twice (Daily journal list + Rest card). Keep both or drop one? (Jamie)
- Next: deploy + phone test; Jamie/rabbi review of ⚑ items; then hide flag lines. Then Phase 2 "Bless something".

## 2026-10-20 — v2.18 (mission alignment, step 1), tested headless, no JS errors
- Mission & principles doc written (project: claude/neshamah-mission-principles.md; editable copy in Claude Docs).
- Today: "Begin with breath · 1 min" button (slow exhale, 1 min) under the sanctuary verse; "Reach a person" card (call/text 988 + your own people, saved on device as neshamah_people); collapsed "Why Neshamah" card (breath, two answers, People of the Book, not a substitute).
- Audit found already aligned: no streaks/scores, holds only in optional Box, all 28 practices eyes-open, How/Why on cards, data on device, chakras mentioned only as a warning.
- Backups: index.v2.17.bak.html, sw.v2.17.bak.js. sw cache neshamah-v2.18.
- To deploy: upload index.html and sw.js.
- Proposed next (Jamie to pick): (1) declutter Today check-in (sliders + chips overlap); (2) add missing framework practices: defusion, calm-place resourcing, healthy-adult letter, gentle stuck-point check; (3) Cantor recordings on prayer/practice cards; (4) move ⚑ lines into Sources & notes; (5) drop duplicate Evening download.

## 2026-10-20 — v2.19 (mission alignment, step 2), tested headless, no JS errors
- Today check-in: chips moved up; pain/anxiety sliders + note folded into "Add … numbers or a note (optional)".
- ⚑ lines on practice cards now sit in a collapsed "For review ⚑" row.
- Duplicate Evening download removed from the Daily journal list (the Rest-tab practice stays; old log entries still label fine).
- Expressive writing note now says it's best with a therapist for PTSD.
- practices.js: 4 new (32 total): thought-on-water (defusion), calm-place (EMDR-informed butterfly hug), healthy-adult-letter (schema), stuck-point (CPT, no trauma account). ⚑ Tashlich framing for rabbi.
- Cantor songs linked to 10 practice cards ("♪ Sung" plays the first match via songsFor).
- Backups: index.v2.17.bak.html, sw.v2.17.bak.js, practices.v2.17.bak.js. sw cache neshamah-v2.19.
- To deploy: upload index.html, practices.js, sw.js.
- Next: phone test; Jamie/rabbi review ⚑; Phase 2 "Bless something".

## 2026-10-22 — v2.20 (Jamie's Home + Breathe feedback), tested headless, no JS errors
- Guiding doc revised first (see its Revision notes): levels of breath, tea story told whole, "why holy" only with a real source, writing rules (concrete, short, no em dashes).
- Home: Reach a person = Text 988, Message my doctor (Sutter communication center), Kyle (number added on phone), text-only, no intro line. Why Neshamah: breath levels + full tea story.
- Breathe: intro = three soul words only. Em dashes removed from Home + Breathe text.
- Breathing the Name: Y-H in / W-H out spelled out; why = Waskow + Nishmat. "A name of God on the exhale": Hebrew name list; how = Bormann; why = Exodus Rabbah 3:6. "Air as sacred" → "Receive one breath" (given / thank you; Job 33:4).
- Player's background-niggun button hidden on the two silent Name practices; relabeled "soft niggun in the background". Songs unlinked from those cards.
- Backups: *.v2.19.bak. sw cache neshamah-v2.20. Deploy index.html, practices.js, sw.js.
- Next: Jamie's feedback on Pray, Ground, Rest, Journal (apply writing rules + em-dash sweep per tab). Offered: PaRDeS research doc.

## 2026-10-24 — v2.21 (Jamie's Pray feedback, part 1), tested headless, no JS errors
- About these texts: collapsed card. Display default = Phonetic only (key neshamah_prview3); Hebrew/English off, shown layers interleave per line, hidden ones are tap rows. Brachot follow the same setting.
- Brachot: new "Shabbat and the table" row (candles, wine, challah), with "first" instructions; Hebrew endings typed ⚑. Science How replaced with Menachot 43b.
- Songs: card is now "Sung prayers" (Childs + Shore mp3 + MRJ SoundCloud set via Widget API skip(i)). Cut English/modern: Raede, Sher, Friedman. Added MRJ: Mi Shebeirach (Taubman), Elohai N'shamah (Gold), V'al Kulam, Mah Gadlu (⚑ MRJ lists it as "Mali Gadlu"), Oseh Shalom (S&P). Shore: Sh'ma (first), Nishmat, Shehecheyanu, Kaddish, Candles, Kiddush. Practice song buttons now show the song title.
- Pray-tab practices: How/Why rewritten from Jewish sources only (handbook, Green, Talmud refs); empty How is hidden. Prayer titles: em dashes removed.
- OPEN (Jamie): Sefaria has no transliterations for these prayers (only Mourner's Kaddish). English options on Sefaria: Metsudah (Orthodox, CC-BY), Singer 1915, Sefaria Community (CC0), Sim Shalom (Conservative, partial); Tanakh: Contemporary Torah/JPS. Decide phonetic source, then swap.
- OPEN: unheard Childs tracks kept: Psalm 23, Ray Mi Shebeirach, Taubman Hashkiveinu. Prayer "note" lines are still drafted text (next: replace with sourced lines).
- Backups: *.v2.20.bak. sw cache neshamah-v2.21. Deploy index.html, prayers.js, practices.js, sw.js.

## 2026-10-26 — v2.22, tested headless, no JS errors
- Phonetic is now script-generated from the Sefaria Hebrew (cloud: /home/claude/scripts/translit.py + apply_tl.py; MT-style: tsere=ei, sheva na=', small exceptions dict for kol/Yisrael/Adonai etc.). Applied to prayers, grief, brachot, shabbat. 5 prayer lines flagged tlf (⚑ kamatz katan / sheva). Each prayer gets a "tl" change note.
- Berakhot card reordered: own words + Bless this, Shabbat and the table, Awe, Gratitude (body, good news, first time), then counter + How/Why.
- OPEN: English source choice still pending.
- Backups: *.v2.21.bak. sw cache neshamah-v2.22. Deploy index.html, prayers.js, sw.js.
- (same v2.22) English now from Sefaria per Jamie: Torah = Contemporary Torah (JPS 2006), Psalms/Job = JPS Gender-Sensitive; siddur = Sim Shalom > Sefaria Community > Birnbaum > Metsudah. Fetched via the desktop app's built-in browser (Sefaria CORS from the Netlify page). יהוה shown as Adonai. Lines inside one Sefaria segment share one English (on the first line). Reform-only lines have no English (noted in Sources & notes). Each prayer has a k:"en" change note naming the version.
- OPEN: brachot/Shabbat blessing English is still drafted text.

## 2026-10-29 — v2.23: Small Things (Oracle of Small Things game), tested headless (5 simulated weeks), no JS errors
- NOTE: code now deploys from D:\Claude Files\neshamah-site (GitHub repo "neshamah", GitHub Pages). That folder had v2.20; v2.21-v2.22 work (Pray tab, Sefaria English, script phonetics) is included here.
- oracle.js (new, cached in sw): full-screen page opened from a card at the top of Journal. Name + own-words promise; d6 roll (d8 from week 9, choose from week 17); "insists" on repeat cabinet; "stirs" = choose; deeper rooms weeks 5+; one image/day; 7th day read-back + Synthesis prompt; month/season/year pauses every 4/13/52 weeks; "Nothing surfacing?" helpers; archive. Storage neshamah_oracle; included in Backup/Restore; plog entries k:"oracle".
- Wording is original; the book's own prompts are referenced by page (9, 19, 28, 30, 32), not copied (book is copyrighted; repo is public).
- NEXT: digest new resources (mental health resources/, Jewish resources/) -> integrate. Text extracted to neshamah/_claude_text/ (can delete after).

## 2026-10-29 — v2.24: resources integrated (from claude/neshamah-resources-digest-2026-10-29.md), tested headless, no JS errors
- New practices (practices.js, cards render automatically, Today suggestions use their tags): Held on four sides (sleep; angel names optional, ⚑ Reform check), Oseh Shalom on the out-breath (pray; Reform line optional; songs linked), Outside or inside (ground), Two-minute sensory circuit (ground), Hands over your face (ground, ACT), Two true things (journal, DBT), Let one kind thing in (journal).
- Improved: Name on the exhale (+Shaddai "enough"), Here and now (+orienting steps from Jamie's cheat sheet), I believe (+"willing to consider"), Pleasure list (+permission line), New moon (mourner caution), Mi Sheberach (+small act of giving), Psalms (+4 sleep, +42 sadness).
- Skipped on purpose: "view from above" (unreality risk), reference-only handouts. Unreadable: CPT ABC worksheet (upside-down scan), Tefillat HaDerech (empty).
- Backups *.v2.23.bak. sw cache neshamah-v2.24. Deploy index.html, practices.js, sw.js, PROGRESS.md.

## 2026-10-29 — v2.25: The Librarian's Apprentice, tested headless (6 simulated days, 52-card check), no JS errors
- library.js (new, cached in sw): full-screen page; the Journal card is now "Journaling games" (Small Things + the Library). Storage neshamah_library; in Backup/Restore; plog k:"library".
- Game is CC BY 4.0 (Dan Bronson-Lowe; based on Firelights, CC BY 4.0), so tables are used as published with a credit and license link. Tables were extracted by script (source: neshamah/_claude_text/la-tables.json).
- Has: character setup (skills, familiar, truths), digital deck + 2d6, Light/Shadow/Darkness, auto map, documents on face cards, complications + suit-match doubling, resources (+1, rest, find doc), saved hearts/diamonds, familiar absorbs Fatigue, event buttons (nook, directions, fog, keys, reference desk), document formats, "Meet someone" NPC generator, per-location journaling, archive, field guide.
- Rule calls of mine (Jamie to confirm): you can't leave a location with an active Complication; clearing Fatigue clears yours first, then the familiar's; "Ask a Question" Darkness = "No, and…" exactly as printed.
- Wandering Library.pdf is a separate game (Abi Pullen, © 2023, not CC). Not built.
- Kindle games still pending: The Road Notices You (C. H. Blackwell), Should I Tame the Ghost?. Not found online; need Jamie's rules summary.
- Her Odyssey (S. Kaiya J., no license in PDF, so treated as copyrighted): odyssey.js, third entry on the Journaling games card. Original wording; book prompts cited by page (3, 7, 14, 18-19). Stats 11 pts, Nd4 highest, Omen Score, Auspicious/Inauspicious stat drift, jokers = False/True Homecoming, Hope (+Doom), 4 variations as checkboxes with my own labels (book's names not mapped). Storage neshamah_odyssey; Backup/Restore; plog k:"odyssey". Tested all endings headless, no errors.
- Open: if a wanderer reaches the False Homecoming with 0 Auspicious days, Hope starts at 0 and the journey doesn't end (rule unclear).
- The Ghost (Should I Tame the Ghost?, Kindle; Jamie's screenshots OCR'd to neshamah/_claude_text/Ghost-RPG.txt; spec in claude outputs spec-ghost.md): ghost.js, 4th entry on the card. All roles/tables/approaches/outcomes ORIGINAL (no license). Role d6 + free truth, Ability d6 (1,2,3,4,5,5) + carried mod, 8 truths (1-18 via 2d6, Secret d6 costs 2), Harsh/Kind (pick or roll 1-12), outcome 1-12 with carry-over (-1/+1 ability, free Secret), recurring ghosts ("Return to"). Reroll/leave-unknown on any truth. Two-ghost and friend variants not built. Storage neshamah_ghost. Tested 8 runs headless, no errors.
- The Road Notices You: Jamie's screenshots (29) end at p29 (The Turning table). Missing: 52-card encounter tables, second Joker, Kings/endings, Parts V-VII. OCR text in _claude_text/The-Road-Notices-You.txt. NOT built yet — needs the remaining pages (screenshot 30+, same folder).
- Backups *.v2.24.bak. Deploy: index.html, library.js, odyssey.js, ghost.js, sw.js, PROGRESS.md.

## 2026-10-30 — v2.26: rabbi's resources screened (IJS, Hadar); At The Well pending
- Added "Mercy on the breath" (pray; rachum / rav chesed on the breath, Ex. 34:6-7; source Rebecca Schisler, IJS). IJS guided MP3 noted in flag, not linked until Jamie listens.
- IJS: mostly essays/events/courses; starter kit is email-gated. Hadar: no short practices; niggun albums (Joey Weisenberg, Rising Song) listed UNVERIFIED in neshamah/Jewish resources/Hadar/_songs.md for Jamie to preview.
- Copies: neshamah/Jewish resources/IJS/, /Hadar/ (summaries; fetch tool gives summaries, not verbatim pages).
- OPEN: At The Well ritual library needs Jamie's login in desktop Chrome. Not yet tested headless. Backups *.v2.25.bak. Deploy practices.js, sw.js, PROGRESS.md.
