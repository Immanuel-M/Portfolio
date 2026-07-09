import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/content'
import heroVideo from '../assets/scrolling_animation.mp4'
import heroPoster from '../assets/Film_clapboard.jpg'

// each caption spends this fraction of its own range fading in, and (unless
// persist) the same fraction fading back out
const CAPTION_FADE_FRACTION = 0.2

// iOS Safari needs a play()/pause() nudge after each seek to actually
// repaint the frame — throttled so rapid scrolling doesn't stack overlapping
// play() promises (roughly every 5th frame at 60fps)
const IOS_REPAINT_NUDGE_THROTTLE_MS = 80

// real Safari on iOS only — excludes Chrome/Firefox/Edge on iOS, which all
// run on WebKit too but carry their own UA tokens (CriOS/FxiOS/EdgiOS),
// and excludes Android/desktop Safari entirely
function isIOSSafari() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  const isIOSDevice =
    /iPad|iPhone|iPod/.test(ua) ||
    // iPadOS 13+ reports as "Macintosh" in desktop mode; touch points give it away
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  if (!isIOSDevice) return false
  return /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua)
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function getCaptionOpacity(progress, start, end, persist = false) {
  const rangeLength = end - start
  const fadeInEnd = start + rangeLength * CAPTION_FADE_FRACTION
  const fadeOutStart = end - rangeLength * CAPTION_FADE_FRACTION

  if (progress <= start) return 0
  if (progress < fadeInEnd) return clamp((progress - start) / (fadeInEnd - start), 0, 1)
  if (persist || progress <= fadeOutStart) return 1
  if (progress < end) return clamp((end - progress) / (end - fadeOutStart), 0, 1)
  return 0
}

// visible at progress 0, linearly fades out by `end` — no fade-in needed,
// it's the very first thing a visitor sees
function getScrollHintOpacity(progress, end) {
  if (progress >= end) return 0
  return clamp(1 - progress / end, 0, 1)
}

// opacity fade + slight upward rise, tied directly to each caption's own opacity
function captionMotionStyle(opacity) {
  return {
    opacity,
    transform: `translateY(${(1 - opacity) * 16}px)`,
    transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
    pointerEvents: opacity > 0.5 ? 'auto' : 'none',
  }
}

export default function Hero() {
  const [videoFailed, setVideoFailed] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isIOSSafariDevice] = useState(isIOSSafari)
  const [isPortrait, setIsPortrait] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(orientation: portrait)').matches
  )

  const wrapperRef = useRef(null)
  const videoRef = useRef(null)
  // iOS Safari can accept currentTime seeks and never paint a frame (solid
  // black) if the video hasn't been through a real play/pause cycle first.
  // A ref (not state) so the scroll-sync closure below always reads the
  // latest value without needing to be recreated. Starts "true" (no gate)
  // on every other browser.
  const iosWarmedUpRef = useRef(!isIOSSafariDevice)
  // guards the per-seek repaint nudge: prevents starting a new play() while
  // one is still in flight, and throttles how often one starts at all
  const iosNudgeInFlightRef = useRef(false)
  const iosLastNudgeAtRef = useRef(0)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // only matters for the iOS Safari letterbox layout — everywhere else stays
  // full-bleed regardless of orientation
  useEffect(() => {
    if (!isIOSSafariDevice) return
    const mediaQuery = window.matchMedia('(orientation: portrait)')
    setIsPortrait(mediaQuery.matches)

    const handleChange = (e) => setIsPortrait(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [isIOSSafariDevice])

  const showVideo = !prefersReducedMotion && !videoFailed
  const iosLetterbox = isIOSSafariDevice && isPortrait

  // iOS Safari warm-up: a silent play/pause cycle so the video decoder
  // actually activates before any scroll-driven currentTime seeking is
  // allowed to run. Without this, iOS Safari can accept the seeks but
  // render solid black instead of the target frame.
  useEffect(() => {
    if (!showVideo || !isIOSSafariDevice) return
    const video = videoRef.current
    if (!video) return

    let cancelled = false

    const attemptWarmup = () => {
      video
        .play()
        .then(() => {
          video.pause()
          try {
            video.currentTime = 0
          } catch {
            // ignore
          }
          if (!cancelled) iosWarmedUpRef.current = true
        })
        .catch(() => {
          // muted autoplay can still be blocked in rare cases — don't block
          // scroll-scrubbing forever waiting on it; it may recover once the
          // user interacts with the page
          if (!cancelled) iosWarmedUpRef.current = true
        })
    }

    if (video.readyState >= 2) {
      attemptWarmup()
    } else {
      video.addEventListener('loadeddata', attemptWarmup, { once: true })
    }

    return () => {
      cancelled = true
      video.removeEventListener('loadeddata', attemptWarmup)
    }
  }, [showVideo, isIOSSafariDevice])

  // Scroll → video sync (unchanged): ties video.currentTime to how far the
  // user has scrolled through the tall wrapper below (not the whole page).
  // scrollProgress is stored as-is so captions read the exact same value
  // driving the video, instead of recomputing it separately.
  useEffect(() => {
    if (!showVideo) return

    let rafId = null

    const updateScrub = () => {
      rafId = null
      const wrapper = wrapperRef.current
      const video = videoRef.current
      if (!wrapper) return

      const rect = wrapper.getBoundingClientRect()
      const scrollableDistance = wrapper.offsetHeight - window.innerHeight
      const progress = scrollableDistance > 0 ? clamp(-rect.top / scrollableDistance, 0, 1) : 0

      setScrollProgress(progress)

      if (
        video &&
        !Number.isNaN(video.duration) &&
        video.duration > 0 &&
        video.readyState >= 2 && // HAVE_CURRENT_DATA — enough decoded to seek meaningfully
        iosWarmedUpRef.current // no-op gate on non-iOS; on iOS Safari, waits for the warm-up cycle
      ) {
        const targetTime = progress * video.duration
        // skip redundant seeks, and swallow failures — currentTime scrubbing
        // can silently misbehave on iOS Safari, but it should never break the page
        if (Math.abs(video.currentTime - targetTime) > 0.01) {
          try {
            video.currentTime = targetTime
          } catch {
            // ignore
          }

          // iOS Safari frequently accepts a paused-video seek without ever
          // repainting the canvas. A brief play()/pause() forces the repaint.
          // Throttled + in-flight-guarded so fast scrolling can't stack up
          // overlapping play() calls. Non-iOS browsers repaint seeks fine on
          // their own, so they skip this entirely.
          if (isIOSSafariDevice) {
            const now = performance.now()
            if (
              !iosNudgeInFlightRef.current &&
              now - iosLastNudgeAtRef.current >= IOS_REPAINT_NUDGE_THROTTLE_MS
            ) {
              iosNudgeInFlightRef.current = true
              iosLastNudgeAtRef.current = now
              video
                .play()
                .then(() => {
                  video.pause()
                })
                .catch(() => {
                  // best-effort nudge — a blocked play() here isn't fatal
                })
                .finally(() => {
                  iosNudgeInFlightRef.current = false
                })
            }
          }
        }
      }
    }

    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(updateScrub)
    }

    updateScrub()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [showVideo])

  const roleOpacity = getCaptionOpacity(scrollProgress, 0.15, 0.45)
  const vfxOpacity = getCaptionOpacity(scrollProgress, 0.45, 0.7)
  const nameOpacity = getCaptionOpacity(scrollProgress, 0.7, 1, true)
  const scrollHintOpacity = getScrollHintOpacity(scrollProgress, 0.1)

  const finalCaption = (
    <>
      <h1 className="font-display text-[10vw] sm:text-[7vw] md:text-[5vw] leading-[0.9] uppercase text-paper">
        {profile.name}
      </h1>
      <div className="mt-8 flex flex-wrap gap-4 font-mono text-xs uppercase tracking-widest">
        <a
          href="#projects"
          className="px-5 py-3 bg-signal text-ink font-bold hover:bg-paper transition-colors"
        >
          View Work
        </a>
        <a
          href="#contact"
          className="px-5 py-3 border border-wire text-paper hover:border-paper transition-colors"
        >
          Get In Touch
        </a>
      </div>
    </>
  )

  // Reduced-motion / video-failed users: static poster, no scroll-scrubbing,
  // no timed captions — just the final caption + buttons shown immediately.
  if (!showVideo) {
    return (
      <section id="top" className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 overflow-hidden">
        <img src={heroPoster} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 sprocket-rail opacity-[0.06] pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto w-full">{finalCaption}</div>
      </section>
    )
  }

  return (
    <section id="top" className="relative">
      <div ref={wrapperRef} className="relative h-[400vh]">
        <div
          className={`sticky top-0 w-full overflow-hidden ${isIOSSafariDevice ? 'h-ios-hero' : 'h-screen'} ${
            iosLetterbox ? 'bg-ink flex items-center justify-center' : ''
          }`}
        >
          {/* "stage" is the video's own box — full-bleed normally, but shrunk
              to the letterboxed 16:9 rect on iOS Safari portrait, so captions
              positioned by percentage sit relative to the actual video, not
              the full (much taller) viewport */}
          <div className={iosLetterbox ? 'relative w-full aspect-video' : 'absolute inset-0'}>
            <video
              ref={videoRef}
              className={
                iosLetterbox
                  ? 'absolute inset-0 w-full h-full object-contain will-change-transform'
                  : 'absolute inset-0 w-full h-full object-cover will-change-transform'
              }
              muted
              playsInline
              poster={heroPoster}
              preload="auto"
              aria-hidden="true"
              onError={() => setVideoFailed(true)}
            >
              <source src={heroVideo} type="video/mp4" />
            </video>

            {/* scroll affordance — visible only before the user starts scrolling */}
            <div
              className="absolute z-10 inset-x-0 bottom-12 flex flex-col items-center gap-2 bg-ink/50 backdrop-blur-sm rounded-full w-fit mx-auto px-5 py-3"
              style={{
                opacity: scrollHintOpacity,
                transform: `translateY(${(1 - scrollHintOpacity) * 12}px)`,
                transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
                pointerEvents: 'none',
              }}
            >
              <span className="font-mono text-[10px] text-paper tracking-widest2 uppercase">Scroll</span>
              <svg
                className="w-4 h-4 text-paper animate-bounce"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {/* film-leader countdown ticks, purely decorative */}
            <div className="absolute inset-0 sprocket-rail opacity-[0.06] pointer-events-none" />

            {/* 15–45%: role, lower-left third */}
            <div
              className="absolute z-10 bottom-[15%] left-6 md:left-16 max-w-xs md:max-w-sm bg-gradient-to-r from-ink/70 via-ink/35 to-transparent px-5 py-4 rounded"
              style={captionMotionStyle(roleOpacity)}
            >
              <p className="font-mono text-sm md:text-base text-paper uppercase tracking-widest2">
                {profile.role}
              </p>
            </div>

            {/* 45–70%: formerly VFX supervisor, upper-right third */}
            <div
              className="absolute z-10 top-[15%] right-6 md:right-16 max-w-xs md:max-w-sm text-right bg-gradient-to-l from-ink/70 via-ink/35 to-transparent px-5 py-4 rounded"
              style={captionMotionStyle(vfxOpacity)}
            >
              <p className="font-mono text-sm md:text-base text-paper uppercase tracking-widest2">
                {profile.subRole}
              </p>
            </div>

            {/* 70–100%: name + CTAs, beside the monitor — persists through 100% */}
            <div
              className="absolute z-10 left-6 md:left-16 top-1/2 -translate-y-1/2 max-w-xl bg-gradient-to-r from-ink/70 via-ink/30 to-transparent px-6 py-6 rounded"
              style={captionMotionStyle(nameOpacity)}
            >
              {finalCaption}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
