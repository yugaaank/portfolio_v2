# Mobile Visual Interest — Design

**Date:** 2026-07-20
**Project:** portfolio_v2 (Yugank Rathore)
**Scope:** Mobile layout only (`max-width: 768px`). Desktop press-engine untouched.

## Context

The mobile layout was re-grounded as a simple, centered, static document flow
(commit `500d415`): fixed panels become `position: static` blocks, the
scroll engine is gated off, ambient WebGL shaders are hidden, and each section
keeps its signature solid color (dark / cream / lime). That solved the
structural jank but left the phone view feeling bare.

Goal (user-confirmed): **add restrained, on-brand visual interest** — not a
structural rethink, not a motion-heavy redesign. Interest comes from type,
rules, color blocking, flat texture, and one calm reveal moment.

**Brand guardrail:** the `ascent-frontend-design` skill that was invoked is for
a *different* product (Ascent Training — emerald/charcoal, topographic maps,
"you climb we guide"). Its brand is explicitly NOT applied here. This design
stays within the existing press-engine identity: dark `#0c0c0c`, cream
`#f0e9d6`, lime `#d4f53c`, Bebas Neue display, Syne Mono body, dithering
motif. The skill is used only as a generic UX-quality lens.

## Design decisions

### 1. Consistent section-index eyebrow (structure as information)
The desktop experience is an ordered "press run" (`00 / Intro` … `04 / Contact`).
On mobile those markers are inconsistent. Every section gets a uniform, large
index eyebrow at its top — Bebas Neue, lime-on-dark / dark-on-cream,
e.g. `02 — PROCESS`. Justified because the numbered sequence is *true* to the
content (it is an ordered pass), not decorative.

### 2. Hairline rule dividers between sections
A 1px rule in the section's contrasting tone, with the section number or a
short label centered on it — evokes a film-strip perforation. Quiet delimiter
that holds the centered column together and gives vertical rhythm.

### 3. Subtle scroll-reveal (the one motion moment)
Plain CSS transition (`opacity` + `translateY(16px)→0`, ~400ms,
`cubic-bezier(0.16,1,0.3,1)`) toggled by an `IntersectionObserver`
adding `.in-view`. Because `tick()` is gated off on mobile, there is no
engine conflict. Each proof card and each section reveals on enter.
`prefers-reduced-motion` disables the transform/opacity transition (content
just shows). No bounce, no parallax hijack.

### 4. Flat dither texture as a static accent
Instead of the WebGL shader (hidden on mobile for perf), a static CSS/SVG
Bayer-dot pattern at low opacity behind the hero (or the lime projects block)
evokes the dithering motif with zero GPU cost. Used once or twice, not
everywhere — "spend boldness in one place."

### 5. Tightened vertical rhythm
Consistent padding scale across sections; proof-card spacing already improved
(commit `6b0c78a`); tap targets already ≥44px. The reveal + dividers supply
the breathing rhythm the plain version lacked.

## Explicitly NOT doing
- No emerald/Ascent palette, topographic maps, or Outfit/Inter fonts.
- No carousel, no scroll-hijack/parallax, no bounce or wiggle.
- No change to desktop layout, no re-enabling of the mobile scroll engine.

## Implementation notes (for the plan)
- All changes live in `src/App.css` (proof cards / dividers) and
  `src/components/Layout/GlobalCSS.jsx` (mobile `@media` block) plus a small
  `IntersectionObserver` effect in `src/App.jsx` (mobile-only) that toggles
  `.in-view` on `[data-reveal]` elements.
- Reveal targets: section panels + `.proof-frame` (already static-stacked on
  mobile). Add `data-reveal` to those nodes.
- Static dither: a `.dither-accent` CSS background (radial/SVG dot pattern)
  applied to one or two section backgrounds at low opacity.
- Reduced-motion: wrap reveal transition in the existing
  `@media (prefers-reduced-motion: reduce)` guard.

## Success criteria
- Mobile (375px / 768px) shows: consistent section indices, hairline
  dividers, a calm fade-up reveal on scroll, one flat dither accent.
- No horizontal scroll, no layout shift, no engine conflict on mobile.
- Desktop rendering identical to before.
- `bun run build` + `bun run lint` clean (pre-existing lint errors excepted).
