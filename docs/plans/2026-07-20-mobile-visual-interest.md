# Mobile Visual Interest — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add restrained, on-brand visual interest to the mobile layout (section indices, hairline dividers, a calm scroll-reveal, one flat dither accent) without touching the desktop press-engine.

**Architecture:** All changes are mobile-only (`@media (max-width:768px)` in `GlobalCSS.jsx` + `App.css`), plus one small mobile-only `IntersectionObserver` in `App.jsx` that toggles an `.in-view` class on `[data-reveal]` nodes. The scroll engine stays gated off on mobile, so there is no engine/CSS conflict. Desktop is untouched. The `ascent-frontend-design` skill's brand (emerald/charcoal, maps, Outfit/Inter) is deliberately NOT used — it belongs to a different product.

**Tech Stack:** React 19 + Vite, hand-written CSS-in-JS (`GlobalCSS.jsx`), plain CSS (`App.css`), vanilla `IntersectionObserver`. No new dependencies.

---

### Task 1: Add `data-reveal` hooks to mobile-reveal targets

**Files:**
- Modify: `src/components/Hero/Hero.jsx` (panel root)
- Modify: `src/components/About/AboutStrip.jsx` (panel root)
- Modify: `src/components/About/AboutMain.jsx` (panel root)
- Modify: `src/components/Between/Between.jsx` (panel root)
- Modify: `src/components/Projects/ProjectsList.jsx` (panel root + each `.proof-frame`)
- Modify: `src/components/Projects/ProjectsStrip.jsx` (panel root)
- Modify: `src/components/Contact/ContactDarkContent.jsx` (panel root)
- Modify: `src/components/Contact/ContactLightContent.jsx` (panel root)
- Modify: `src/components/ThankYou/ThankYou.jsx` (stage root)

**Step 1:** Add `data-reveal` attribute to each listed panel root element. For `ProjectsList.jsx`, also add `data-reveal` to the `<article className="proof-frame">` elements (inside the `.map`).

Example (Hero.jsx panel root):
```jsx
<div className="panel p-hero" ref={ref} id="intro" data-reveal
  style={{ left: 0, width: "100vw", zIndex: 11 }}
  role="region" aria-label="Intro">
```

For proof frames (ProjectsList.jsx):
```jsx
<article key={p.n} className="proof-frame" data-reveal style={{ zIndex: PROJECTS.length - i }}>
```

**Step 2:** `bun run build` — expected PASS (no behavior change yet, just attributes).

**Step 3:** Commit.
```bash
git add src/components/Hero/Hero.jsx src/components/About/AboutStrip.jsx src/components/About/AboutMain.jsx src/components/Between/Between.jsx src/components/Projects/ProjectsList.jsx src/components/Projects/ProjectsStrip.jsx src/components/Contact/ContactDarkContent.jsx src/components/Contact/ContactLightContent.jsx src/components/ThankYou/ThankYou.jsx
git commit -m "feat: add data-reveal hooks to mobile panels + proof frames"
```

---

### Task 2: IntersectionObserver reveal (mobile-only, in App.jsx)

**Files:**
- Modify: `src/App.jsx` (add `useEffect` near the existing resize effect)

**Step 1:** Add an effect that, only on mobile (`matchMedia('(max-width:768px)')`), observes all `[data-reveal]` elements and toggles `.in-view`. Respect `prefers-reduced-motion` by adding the class immediately (no transition needed — CSS handles the no-motion case). Place after the existing `useEffect` (resize handler) block.

```jsx
useEffect(() => {
  if (typeof window === "undefined") return;
  if (!(window.matchMedia && window.matchMedia("(max-width: 768px)").matches)) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const els = Array.from(document.querySelectorAll("[data-reveal]"));
  if (reduce || els.length === 0) {
    els.forEach((el) => el.classList.add("in-view"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );
  els.forEach((el) => io.observe(el));
  return () => io.disconnect();
}, []);
```

**Step 2:** `bun run build` — expected PASS.

**Step 3:** Commit.
```bash
git add src/App.jsx
git commit -m "feat: mobile scroll-reveal via IntersectionObserver"
```

---

### Task 3: Reveal CSS + section-index eyebrow + hairline dividers

**Files:**
- Modify: `src/components/Layout/GlobalCSS.jsx` (inside `@media (max-width: 768px)` block)

**Step 1:** Add to the mobile block, after the panel base rules:
- `[data-reveal]` starts at `opacity:0; transform: translateY(16px); transition: opacity .4s var(--transition-main), transform .4s var(--transition-main);`
- `[data-reveal].in-view { opacity:1; transform:none; }`
- A reusable `.m-index` eyebrow (Bebas Neue, lime-on-dark / dark-on-cream) for consistent section numbers, and `.m-divider` hairline rule with a centered label.

```css
/* Calm scroll-reveal (one motion moment; reduced-motion shows instantly). */
[data-reveal] {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity .4s var(--transition-main), transform .4s var(--transition-main);
}
[data-reveal].in-view { opacity: 1; transform: none; }

/* Consistent section index eyebrow. */
.m-index {
  font-family: var(--font-heading);
  font-size: 1rem;
  letter-spacing: .25em;
  text-transform: uppercase;
  opacity: .5;
  margin-bottom: 1.5rem;
}
.p-hero .m-index, .p-about-l1 .m-index { color: var(--accent); }
.p-about-l2 .m-index, .p-between .m-index, .p-proj-l2 .m-index { color: var(--bg-dark); }
.p-proj-l3 .m-index { color: var(--bg-dark); }

/* Hairline divider with centered label (film-strip perforation feel). */
.m-divider {
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
  border: 0;
  border-top: 1px solid currentColor;
  opacity: .18;
  position: relative;
}
.m-divider span {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  background: inherit;
  padding: 0 .8rem;
  font-family: var(--font-heading);
  font-size: .8rem;
  letter-spacing: .2em;
}
```

**Step 2:** `bun run build` — expected PASS.

**Step 3:** Commit.
```bash
git add src/components/Layout/GlobalCSS.jsx
git commit -m "feat: mobile reveal CSS, section index eyebrow, hairline dividers"
```

---

### Task 4: Place `.m-index` + `.m-divider` in each mobile section

**Files:**
- Modify: `src/components/Hero/Hero.jsx` (add `<p className="m-index">00 — Intro</p>` at top of text block, replacing/augmenting existing `hero-index`)
- Modify: `src/components/About/AboutMain.jsx` (add `01 — About` index)
- Modify: `src/components/Between/Between.jsx` (use `02 — Process` index)
- Modify: `src/components/Projects/ProjectsList.jsx` (add `03 — Selected Work` index)
- Modify: `src/components/Projects/ProjectsStrip.jsx` (already has `03 / Selected Work` label — align format)
- Modify: `src/components/Contact/ContactDarkContent.jsx` (add `04 — Contact` index)
- Modify: `src/components/ThankYou/ThankYou.jsx` (add `05 — End` index)
- Modify: `src/App.css` (add `.m-divider` instances OR render `<hr className="m-divider">` between stacked panels — prefer rendering `<hr>` in components for clarity)

**Step 1:** Render the `.m-index` eyebrow inside each panel (Bebas Neue, consistent format `NN — NAME`). For dividers, render `<hr className="m-divider" aria-hidden="true"><span>NN</span></hr>` at the bottom of each panel except the last (or as a top border on the next). Keep it simple: one `<hr>` between sections.

Example (Hero.jsx, inside `.hero-text-block` first child):
```jsx
<p className="m-index">00 — Intro</p>
```

Example divider (end of AboutMain panel, before closing `</div>`):
```jsx
<hr className="m-divider" aria-hidden="true"><span>01</span></hr>
```

**Step 2:** `bun run build` — expected PASS. Verify in browser at 375px that indices show, dividers render centered, cards reveal on scroll.

**Step 3:** Commit.
```bash
git add src/components/Hero/Hero.jsx src/components/About/AboutMain.jsx src/components/Between/Between.jsx src/components/Projects/ProjectsList.jsx src/components/Projects/ProjectsStrip.jsx src/components/Contact/ContactDarkContent.jsx src/components/ThankYou/ThankYou.jsx src/App.css
git commit -m "feat: render section indices + dividers in mobile sections"
```

---

### Task 5: Flat dither accent (static, no WebGL)

**Files:**
- Modify: `src/components/Layout/GlobalCSS.jsx` (mobile block: add `.dither-accent` background)
- Modify: `src/components/Hero/Hero.jsx` OR `src/components/Projects/ProjectsList.jsx` (apply `.dither-accent` to one section background)

**Step 1:** Add a static Bayer-dot pattern as a CSS background (no shader). Use a tiny inline SVG data-URI of dots or a `radial-gradient` grid at low opacity, layered behind the section's solid color.

```css
.dither-accent {
  background-image:
    radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1.2px);
  background-size: 6px 6px;
}
```

Apply to ONE section only (recommend the lime projects block `.p-proj-l3` on mobile) so boldness is spent in one place:
```css
.p-proj-l3.dither-accent { background-color: var(--accent); }
```
And in the component, add `dither-accent` to that panel's `className`.

**Step 2:** `bun run build` — expected PASS.

**Step 3:** Commit.
```bash
git add src/components/Layout/GlobalCSS.jsx src/components/Projects/ProjectsList.jsx
git commit -m "feat: static flat dither accent on mobile projects block"
```

---

### Task 6: Reduced-motion + final verification

**Files:**
- Modify: `src/components/Layout/GlobalCSS.jsx` (existing `@media (prefers-reduced-motion: reduce)` block)

**Step 1:** Ensure the reduced-motion block disables the reveal transform so content shows immediately:
```css
@media (prefers-reduced-motion: reduce) {
  [data-reveal] { opacity: 1 !important; transform: none !important; transition: none !important; }
  /* existing rules preserved... */
}
```

**Step 2:** `bun run build` then `bun run lint`. Expected: build PASS; lint shows only the 4 PRE-EXISTING errors (line 333 setState-in-effect in App.jsx cursor loop, `cLightRef` unused in Contact.jsx, `__dirname` in vite.config.js). No NEW errors from this work.

**Step 3:** Manual check (note to user: no browser in this env): 375px and 768px — indices consistent, dividers centered, cards fade-up on scroll, one dither accent on projects, no horizontal scroll, no layout shift.

**Step 4:** Commit.
```bash
git add src/components/Layout/GlobalCSS.jsx
git commit -m "fix: disable mobile reveal under prefers-reduced-motion"
```

---

## Notes
- No new dependencies; `IntersectionObserver` is native.
- Every change is gated to `max-width:768px` except the `data-reveal` attribute (harmless on desktop, CSS only animates it within the media query) and the IO effect (early-returns when not mobile).
- Commit style: short `feat:`/`fix:` prefixes, NO `Co-Authored-By` line (user constraint).
