# Hero Video — Best Practices (v2: Scroll-Scrubbed)

Reference doc for the full-bleed, scroll-scrubbed Hero video sequence
(clapperboard → code → monitor reveal, ~16s source, 720p 24fps H.264).

**This supersedes the original autoplay-once version of this doc.**
The video is now scroll-scrubbed (playback position tied directly to
scroll position within a tall wrapper), not autoplay. Below the
scrubbed sequence, the site continues into the existing stacked
sections (About, Skills, Projects, Film Crossover, Education, Contact)
exactly as before — no change there.

---

## 1. Structure

- A tall wrapper (`h-[400vh]` as a starting point — tune based on feel)
  contains the scroll-scrubbed sequence.
- The `<video>` element is `position: sticky; top: 0;`, filling the full
  viewport (`w-screen h-screen`, `object-cover`), pinned in place while
  the tall wrapper scrolls underneath it.
- Once scroll progress through that wrapper reaches 100%, the page
  continues normally into the existing stacked sections below.

## 2. Scroll → Video Sync

- Calculate scroll progress (0 to 1) based on how far the user has
  scrolled through the tall wrapper specifically — not the whole page.
- Set `video.currentTime = progress * video.duration`.
- Read `scrollY` once per `requestAnimationFrame` tick — do not
  recalculate on every raw scroll event. One scroll-progress value per
  frame is the single source of truth for both video position and
  caption timing (see below) — don't calculate them separately.
- Use `will-change: transform` on the video/container per standard
  scroll-performance practice.

## 3. Timed Captions (replaces the old static overlay)

Instead of one permanent text block sitting on top of the video the
whole time, captions fade in/out at specific scroll-progress ranges,
positioned in the open/empty space of that moment's composition —
never overlapping the video's own visual detail (e.g. the clapperboard's
baked-in text, or the monitor's code).

Current caption plan (subject to tuning once seen live):

| Scroll % | Caption | Position |
|---|---|---|
| 0–15% | *(none — let clapperboard's own text read)* | — |
| 15–45% | "SOFTWARE ENGINEER / AI DEVELOPER" | lower-left third |
| 45–70% | "FORMERLY LEAD VFX SUPERVISOR" | upper-right third |
| 70–100% | "IMMANUEL MORRIS" + View Work / Get In Touch buttons | beside monitor, persists at 100% |

- Each caption transition: opacity fade + slight y-axis rise, driven by
  the same scroll-progress value as the video.
- The final caption (70–100%) is the only one that persists once fully
  faded in — it should still be visible at the moment the tall wrapper
  ends and stacked sections begin.

## 4. Fallback & Accessibility

- `prefers-reduced-motion`: show the static poster image (clapperboard
  start frame) with the final caption + buttons displayed statically on
  top immediately — do not attempt scroll-scrubbing or timed captions
  for these users.
- `onError` on the video: same static poster fallback.
- `aria-hidden` on the decorative video element itself.

## 5. Nav

- No change — existing fixed-top, scroll-spy nav bar stays as-is for
  this pass.

## 6. Mobile / iOS Notes

- `playsInline` required for iOS Safari inline playback.
- Scroll-scrubbing via `currentTime` can be unreliable on iOS Safari
  specifically — test directly on device if possible. If scrubbing
  silently fails there, it should degrade gracefully (e.g. video simply
  holds on a frame) rather than breaking the page.
- On mobile, caption text size/padding may need adjustment for
  legibility — check once live.

## 7. Testing Checklist

- [ ] Video scrubs smoothly as user scrolls (no jank)
- [ ] Video does NOT scrub on scroll for `prefers-reduced-motion` users — static poster + final caption shown instead
- [ ] Each caption fades in/out at roughly the right scroll position and doesn't overlap video detail
- [ ] Final caption + buttons persist through 100% scroll and into the stacked sections below
- [ ] Poster/fallback still works if video fails to load
- [ ] Test on iOS Safari specifically
- [ ] `npm run build` passes with no errors

## Quick Reference — File Structure

```
portfolio/
├── src/
│   ├── assets/
│   │   ├── scrolling_animation.mp4
│   │   └── Film_clapboard.jpeg
│   ├── components/
│   │   └── Hero.jsx
│   ├── data/
│   │   └── content.js
│   └── App.jsx
├── index.html
├── package.json
├── tailwind.config.js
└── scroll-video-best-practices.md   (this file)
```
