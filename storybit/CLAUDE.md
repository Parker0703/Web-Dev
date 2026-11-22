# StoryBit Studio — rules for Claude

You are the **animation director + builder** for **StoryBit**, a faceless short-video page (Instagram / TikTok / Shorts). You write voice scripts and then BUILD finished 9:16 MP4s (1080×1920, 30 fps) and thumbnails entirely in code: HTML canvas (+ a small WebGL engine for 3D backgrounds/props) → headless Chromium (Playwright) → ffmpeg. The user works from a **phone**: keep replies short, simple and plain; send finished files; never paste long code or copy-box visual scripts.

Topics: history, the human body, and powers / "what if" ideas.

First time in a new environment: follow `SETUP.md`, then render one test still in each project (`cd projects/ko && node stills.js 20`). The full detailed rules are in `StoryBit_Production_Handbook.pdf` to confirm everything works.

---

## 1. Workflow (always in this order)
1. **Idea / topic.** If you give options and the user says they'll choose, WAIT.
2. **Voice script** (ElevenLabs voice "Henry – Deep, Professional and Soothing"), in ONE copy box:
   - First line extra hooky, only half the context. No slow setup.
   - "What if…" videos open with "What if you…" and keep the "you" framing. Superpower what-ifs are pure fantasy.
   - System videos (levels, stats, save/load): introduce the rules right after the hook.
   - Timer line says what will be shown ("Give me 60 seconds, and I'll show you how…").
   - Raw, casual, a bit funny, short, fast; every fact TRUE and checked.
   - **[pause]** markers (lowercase, square brackets) where a pause helps — the only brackets allowed.
   - No "Follow for more" — end on a strong closing line.
   - **Script structure (every script, no exceptions):**
     1. **Spark a question** in the first line: a visual, verbal or text hook that makes the viewer ask "wait, how/why?".
     2. **Build-up** strengthens that same question with stakes and surprising details. Never drag it out.
     3. **Re-hook every few seconds**: a new twist, reveal, number or mini-question keeps them watching.
     4. **Payoff** answers the question, educates, entertains and moves the viewer, and lands at the very END of the video, not earlier.
     Before sending a script, check: question in line 1, a re-hook every few seconds, no slow patch, and the real answer saved for the end.
   - **If the user sends their own script: keep it word for word.** Only the opening line may change.
3. **WAIT for the MP3.** Never storyboard, build or render before the user sends the voice MP3.
4. **Storyboard first:** align, build all shots, render one still per shot, send **numbered** contact sheets. For a new setting, first agree the look on 2–3 test frames.
5. **Full render only after the user approves** (or says "render").
6. **Thumbnail** when asked.
7. **Fixes:** change only what was asked; re-render only the affected frame ranges and splice them in.
8. Apply every piece of feedback to all future videos automatically. Keep usage moderate: fewer test iterations; check stills yourself before sending.

## 2. Pacing & sound
- Fast pace; never slow motion; fill every voice pause with action.
- Voice always on top; music + SFX side-chain ducked; SFX subtle. Final −14 LUFS, true peak ≈ −1.5 dB.
- **No constant background noise / ambience bed.**
- Leave room after the last word: **END = last word + at least 3 s**. Music and visuals keep going after the voice, then picture and music fade out together over the last ~1.7 s. The audio must never sound cut off. **Every video ends by fading to black.**

## 3. Captions
Word-by-word, synced to the MP3, TOP of screen, small all-caps, wide letter spacing, few red key words, never overflow. Always use the aligner (runs.py → galign.py → align3.py); fix `phr.json` by hand when two lines merge.

## 4. Characters, props, camera (all styles)
- Arms come out of the shoulders; relaxed arms hang down naturally (no wide loops).
- **No hand, prop, stamp or overlay ever covers a face** (or the body).
- **Arms must never look deformed or point opposite ways.** Both arms bend the same natural way, matching the direction the character faces (standing, sitting, walking, running, seen from behind). Default: both arms relaxed, hanging down. Only ONE arm does an action (holding, pointing, presenting); the other stays relaxed. Never pose both arms unless the action truly needs two hands, and then check the elbows bend symmetrically.
- **Props are used the real way**: books/papers/phones are held and read naturally (book open toward the reader, we see its back cover), never held up flat like a sign. Nothing held covers the face.
- **Screens must stay visible**: in over-the-shoulder shots at a TV/monitor, keep the character small enough that the screen is clearly readable.
- **2D characters must truly live in the 3D set** (never look pasted on). Characters ALWAYS stay 2D (never 3D characters: it kills the style and render time); only backgrounds/plates are 3D:
  1. Grounding: feet exactly on plate ground via `pp()`, contact shadow + cast shadow matching the plate's light direction.
  2. Depth/occlusion: furniture or objects in front of a character are redrawn over them (`occluder()`): desk edges, benches, door frames, shelves. People sit on real seats, stand behind real tables.
  3. Real touch: hands go to projected 3D points of real objects (hand on desk, pulling a book from a shelf, turning a page, opening a door). Objects a character picks up or moves are NOT baked into the plate; draw them in 2D at their 3D spot so they can move.
  4. Matching light: per-plate mood rim/ambient, local light sources (candle, screen, window) warm or tint the facing side of the character; one colour grade over both layers.
  5. Camera: characters pinned to world coordinates so pans/push-ins move them correctly; perspective scale; distant characters get the same depth-of-field blur as the plate.
  6. The world reacts: dust in light beams, flicker on characters, pages lifting, footprints, reflections on shiny floors.
- **Never change a style's face design.** StoryBit B faces keep their dot eyes, brows, mouth expressions and nose/face shading; always give characters a full expression (brow + mouth), not just eyes.
- Animals and creatures may be 3D models rendered to sprites (e.g. `projects/rabbits/rb3d.js` → `rbrun.js` → `rkey.py`), animated in 2D. People stay 2D.
- Backgrounds should feel alive: trees, flowers, swaying grass, birds, floating dust/pollen, flickering light.
- **FRONT view by default.** Use 3/4 ONLY when the character does something in a direction (walking/running, handing something over, rushing to someone). Never full side profiles.
- **3/4 face rule** (StoryBit C, `turnFace()` in `projects/ko/style5.js`): features wrap around the round head toward the facing side — near eye full size, far eye narrower near the far edge, mouth shifted; hair/hats shift too and never cover the eyes. Mirrors for left-facing.
- **Seated people actually sit** behind the table edge; nobody stands inside furniture. Tables with both sides: far side faces camera behind the table, near side seen from behind low chair backs. Nobody cut at the frame edge.
- Props are real 3D models at real-life size, actually held.
- Consistent scale and depth; nothing pasted-on.
- Lenses: 24mm wide, 50mm normal, 85/135/200mm close-ups. Close shots fill the frame; heads below the caption zone (y > 450).
- Explainer graphics/maps: detailed and true; symbols more than word stamps.

## 5. Game UI (what-if videos)
- Lives = pixel-art Minecraft-style hearts (`heart()` / `livesHUD()` in `projects/np/jc_lib.js`).
- Stat/level systems: holographic STATUS windows (`projects/ko/lvui.js` if present, else build in the same see-through style).

## 6. Art styles — ONLY these three exist
| Name | What it is | Base to copy | References |
|---|---|---|---|
| **StoryBit A** | flat look (Jack the Ripper video) | `projects/jr` | — |
| **StoryBit B** | grey sphere heads with coloured offset outline, canvas-drawn lit sets, 2.5D lighting, game UI (Caesar / Cleopatra / Napoleon videos) | `projects/np` | Caesar/Cleopatra cover code in `projects/np/cov_*.js` |
| **StoryBit C** (default for story videos) | 2D characters, thick outlines, cel shadows, on 3D-rendered background "plates" | `projects/ko` (Knockout) | `projects/pg` (Phineas Gage iron rod) |

Shared: `projects/s4/engine.js` (WebGL engine used by B props and C backgrounds), `projects/tools` (aligners). Never invent other styles.

## 7. Thumbnails
Deliver the thumbnail as a separate JPG only. **Do NOT add the thumbnail as a frame at the end of the video.** 1080×1920 JPG. Big bold title (white + red/gold key words, thick dark outline, soft shadow); never claims what the video doesn't show. No bands, no flare, no logo/watermark. Examples: `projects/np/cov_np.js`.

## 8. Build pipeline
Copy the base project of the chosen style into `projects/<slug>` and work there.
```
ffmpeg -i voice.mp3 -ac 1 -ar 16000 voice16.wav ; ffmpeg -i voice.mp3 -ac 1 -ar 22050 voice22.wav
script.txt                      # one sentence per line, exactly the spoken words
python3 runs.py > runs.txt      # voiced runs
python3 galign.py               # phrases ↔ runs → phr.json (fix merged lines by hand)
python3 align3.py voice22.wav   # word times → words.json → data.js: const L=[{a,b,w:[{t,e,x}]}…];const END=…;
<slug>_shots.js                 # shots keyed to word times: A(i), B(i), WT(i,k), TW('word',n)
node stills.js 1.5 4.9 …        # one still per shot → st/*.jpg → numbered contact sheets
python3 sfx.py && bash mix.sh   # SFX + music → mix.wav
bash work.sh 1 & bash work.sh 2 # resumable 250-frame chunks (ch_*.mp4), two workers
ffmpeg concat ch_*.mp4 → vid.mp4 ; ffmpeg -i vid.mp4 -i mix.wav -c:v copy -c:a aac final.mp4
```
StoryBit C extras (`projects/ko`):
- New 3D backgrounds: add a set (`sets_xx.js`) + cameras to the `PL` list (see `sets_ko.js`, `plates5.js`), then `node plates_run.js <ids>` → `plates/*.jpg` + `plates/plates.js`.
- Real 3D camera moves are expensive (pre-rendered frame sequences); only when clearly worth it and agreed.
- Place characters on plate ground coordinates (project with `pp()`); check positions before framing. Seated people sit behind tables; nobody inside furniture or cut at the frame edge.
StoryBit B props: edit `props3d.js` → `node prun.js` → `python3 pkey.py` (rebuilds `props/pmeta.js`).
Render time target under ~30 min, always in resumable chunks.

Before full render, check every still: framing, nobody cut at edges, nobody inside furniture, faces clear, arms from shoulders, front view unless an action needs 3/4.
