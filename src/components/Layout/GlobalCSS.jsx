import React from 'react';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Instrument+Serif:ital@0;1&family=Syne+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: auto; }
body {
  background: var(--bg-dark);
  font-family: var(--font-body);
  overflow-x: hidden;
  cursor: none;
}

/* ── CURSOR ── */
.cur {
  position: fixed; width: 10px; height: 10px;
  background: #ffffff; border-radius: 50%;
  pointer-events: none; z-index: 9999;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
}


/* ── NAV ── */
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 500;
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.8rem var(--padding-x);
  mix-blend-mode: difference;
}
.nav-logo {
  font-family: var(--font-heading);
  font-size: 1.5rem; letter-spacing: .1em; color: var(--bg-cream);
}
.nav-links { display: flex; gap: 2.5rem; list-style: none; }
.nav-links a {
  color: var(--text-main); text-decoration: none;
  font-size: .95rem; letter-spacing: .18em; text-transform: uppercase;
  opacity: .5; transition: opacity .2s;
}
.nav-links a:hover { opacity: 1; }
.nav-links a:focus-visible {
  opacity: 1; outline: 2px solid var(--accent); outline-offset: 4px; border-radius: 2px;
}
.nav-logo:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; border-radius: 2px; }

/* ── PROGRESS BAR ── */
.prog {
  position: fixed; top: 0; left: 0; height: 2px;
  background: var(--accent); z-index: 600;
  pointer-events: none;
}

/* ── FIXED LAYERS ── */
.layer {
  position: fixed; top: 0; bottom: 0;
  will-change: left, width;
  pointer-events: none;
}
.l1 { background: var(--bg-dark); z-index: 10; }
.l2 { background: var(--bg-cream); z-index: 9; }
.l3 { background: var(--accent); z-index: 8; }

/* ── FIXED CONTENT PANELS ── */
.panel {
  position: fixed; top: 0; bottom: 0;
  will-change: opacity, left, width;
  pointer-events: auto;
  display: flex; flex-direction: column;
  padding: var(--padding-y) var(--padding-x);
  overflow: hidden;
}
/* ── HERO ── */
.p-hero { z-index: 11; color: var(--bg-cream); justify-content: center; }
.hero-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 2rem;
}
.hero-text-block {
  flex: 1.2;
}
.hero-visual-block {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.hero-scene-wrap {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.hero-shader {
  max-width: 100%;
  height: auto;
}
.hero-tag {
  font-size: 1rem; letter-spacing: .22em; text-transform: uppercase;
  opacity: .4; margin-bottom: 2rem; color: var(--text-main);
}
.hero-index {
  font-size: .8rem; letter-spacing: .22em; text-transform: uppercase;
  opacity: .35; margin-bottom: .8rem; color: var(--text-main);
}
.hero-title {
  font-family: var(--font-heading);
  font-size: clamp(5rem, 14vw, 17.5rem);
  line-height: .75; letter-spacing: -.03em; margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  width: fit-content;
  text-transform: uppercase;
}
.hero-title .line-2 {
  display: block;
}
.hero-sub {
  font-size: .8rem; line-height: 1.85;
  opacity: .4; max-width: 36ch; margin-bottom: 2.5rem; color: var(--text-main);
}
.hero-hint {
  font-size: .95rem; letter-spacing: .2em; text-transform: uppercase;
  opacity: .3; animation: blink 2s ease infinite; color: var(--text-main);
}
@keyframes blink { 0%,100% { opacity: .3; } 50% { opacity: .75; } }
@keyframes breathe { 0%,100% { transform: translate(-50%, -50%) scale(1); } 50% { transform: translate(-50%, -50%) scale(1.2); } }

.cur-ring {
  position: fixed; width: 64px; height: 64px;
  border: 1px solid rgba(255,255,255,0.8); border-radius: 50%;
  pointer-events: none; z-index: 9998;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
  animation: breathe 3s ease-in-out infinite;
  will-change: left, top, transform;
}

/* ── ABOUT STRIP ── */
.p-about-l1 {
  z-index: 11; color: var(--bg-cream);
  justify-content: space-between;
  padding: 7rem 1.5rem 3.5rem;
  border-right: 1px solid rgba(240,233,214,.07);
}
.strip-label { font-size: .8rem; letter-spacing: .22em; text-transform: uppercase; opacity: .35; color: var(--text-main); }
.strip-num { font-family: var(--font-heading); font-size: clamp(3rem,6vw,8rem); line-height:1; opacity:.1; }
.strip-role {
  font-family: var(--font-heading);
  font-size: clamp(1rem,2vw,1.8rem);
  line-height: 1.15; writing-mode: vertical-rl;
  transform: rotate(180deg); opacity: .65; letter-spacing: .06em;
}

/* ── ABOUT MAIN ── */
.p-about-l2 { z-index: 10; color: var(--text-dark); justify-content: center; padding: 7rem 4.5rem 4rem; }
.about-h2 {
  font-family: var(--font-heading);
  font-size: clamp(3rem, 6.5vw, 7rem);
  line-height: .88; letter-spacing: -.01em; margin-bottom: 2.5rem;
}
.about-body { font-size: .82rem; line-height: 1.9; opacity: .55; max-width: 50ch; margin-bottom: 3rem; color: #000000; }
.skills { display: flex; flex-direction: column; gap: 1rem; }
.skill-group { display: flex; flex-wrap: wrap; align-items: center; gap: .55rem; }
.skill-tag {
  font-size: .7rem; letter-spacing: .22em; text-transform: uppercase;
  opacity: .35; margin-right: .4rem; color: #000000;
}
.skill {
  padding: .32rem .85rem;
  border: 1px solid rgba(12,12,12,.18);
  font-size: .95rem; letter-spacing: .12em; text-transform: uppercase; color: #000000;
}
.skill-core { border-color: var(--accent); color: #0c0c0c; font-weight: 500; }

/* ── BETWEEN ── */
.p-between { z-index: 10; color: var(--text-dark); justify-content: center; align-items: center; text-align: center; }
.between-bg-text {
  position: absolute; white-space: nowrap; user-select: none;
  font-family: var(--font-heading);
  font-size: clamp(5rem,17vw,20rem);
  letter-spacing: -.02em; opacity: .06;
  animation: slideText 14s linear infinite;
}
@keyframes slideText { from { transform: translateX(10%); } to { transform: translateX(-40%); } }
.between-passes { display: flex; gap: clamp(1.5rem, 4vw, 4rem); position: relative; z-index: 2; }
.pass { font-family: var(--font-heading); font-size: clamp(2.5rem, 7vw, 7rem); line-height: 1; letter-spacing: -.01em; display: flex; align-items: baseline; gap: .4rem; }
.pass i { font-family: var(--font-body); font-style: normal; font-size: .9rem; letter-spacing: .15em; opacity: .35; }
.between-idx { font-size: .8rem; letter-spacing: .22em; text-transform: uppercase; opacity: .4; margin-bottom: 1rem; position: relative; z-index: 2; color: #000000; }
.between-sub { font-family: var(--font-italic); font-style: italic; font-size: clamp(1rem,2.5vw,2rem); opacity: .4; margin-top: .8rem; position: relative; z-index: 2; color: #000000; }

/* ── PROJECTS ── */
.p-proj-l3 { z-index: 9; color: var(--text-dark); justify-content: flex-start; padding-top: 7rem; }
.proj-h2 { font-family: var(--font-heading); font-size: clamp(2.5rem,5vw,5rem); letter-spacing: .03em; margin-bottom: 4rem; }
.proj-item {
  border-top: 1px solid rgba(12,12,12,.13);
  padding: 1.6rem 0;
  display: grid; grid-template-columns: 3.5rem 1fr auto;
  align-items: center; gap: 1.5rem;
  cursor: pointer; position: relative; overflow: hidden;
}
.proj-item:last-child { border-bottom: 1px solid rgba(12,12,12,.13); }
.proj-item::before {
  content: ''; position: absolute; inset: 0;
  background: rgba(12,12,12,.06);
  transform: translateX(-102%);
  transition: transform .4s var(--transition-main);
}
.proj-item:hover::before { transform: translateX(0); }
.proj-n { font-size: 1rem; letter-spacing: .1em; opacity: .3; color: #000000; }
.proj-name { font-family: var(--font-heading); font-size: clamp(1.4rem,2.5vw,2.3rem); letter-spacing: .03em; transition: letter-spacing .3s; }
.proj-item:hover .proj-name { letter-spacing: .08em; }
.proj-tag { font-size: 1rem; letter-spacing: .12em; text-transform: uppercase; padding: .28rem .7rem; border: 1px solid rgba(12,12,12,.18); opacity: .5; color: #000000; }

.p-proj-l2 {
  z-index: 10; color: var(--text-dark);
  justify-content: space-between;
  padding: 7rem 2.5rem 3.5rem;
  border-left: 1px solid rgba(12,12,12,.1);
}
.contact-num { font-family: var(--font-heading); font-size: clamp(4rem,8vw,10rem); line-height: 1; opacity: .08; }
.contact-cta { font-family: var(--font-heading); font-size: clamp(1.8rem,3.5vw,3.2rem); line-height: 1.05; margin-bottom: 2rem; }
.contact-link {
  display: block; font-size: 1.1rem; letter-spacing: .08em;
  color: var(--text-dark); text-decoration: none;
  border-bottom: 1px solid rgba(12,12,12,.2);
  padding-bottom: .5rem; margin-bottom: .6rem;
  transition: letter-spacing .25s, border-color .25s;
}
.contact-link:hover { letter-spacing: .14em; border-color: rgba(12,12,12,.5); }

/* ════════════════════════════════════════════
   CONTACT SECTION
════════════════════════════════════════════ */

.s-contact { height: 180vh; }

.cfrac-dark {
  position: fixed; inset: 0; z-index: 20;
  background: var(--bg-dark);
  will-change: opacity;
  pointer-events: none;
  opacity: 0;
}

.cfrac-light { display: none; }

.cfrac-dark-content {
  position: fixed; inset: 0; z-index: 21;
  pointer-events: none;
  display: flex; flex-direction: column;
  justify-content: flex-end;
  padding: 0 var(--padding-x) 4rem;
  color: var(--bg-cream);
  opacity: 0; will-change: opacity, transform;
}
.cfrac-dark-content.live { pointer-events: auto; }

.cfrac-eyebrow {
  font-size: 1rem; letter-spacing: .22em; text-transform: uppercase;
  opacity: .4; margin-bottom: 1.5rem; color: var(--text-main);
}
.cfrac-big {
  font-family: var(--font-heading);
  font-size: clamp(3.5rem, 8vw, 9rem);
  line-height: .9; letter-spacing: -.01em;
  margin-bottom: 2rem;
}
.cfrac-body {
  font-size: .78rem; line-height: 1.85;
  opacity: .45; max-width: 38ch; margin-bottom: 2.5rem; color: var(--text-main);
}
.cfrac-avail {
  display: flex; align-items: center; gap: .7rem;
  font-size: .95rem; letter-spacing: .18em; text-transform: uppercase;
  opacity: .5; color: var(--text-main);
}
.avail-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--accent);
  animation: ping 1.8s ease infinite;
}
@keyframes ping {
  0%  { box-shadow: 0 0 0 0 rgba(212,245,60,.6); }
  70% { box-shadow: 0 0 0 10px rgba(212,245,60,0); }
  100%{ box-shadow: 0 0 0 0 rgba(212,245,60,0); }
}

.cfrac-light-content {
  position: fixed; inset: 0; z-index: 21;
  pointer-events: none;
  display: flex; flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 6rem var(--padding-x) 0;
  color: var(--bg-cream);
  opacity: 0; will-change: opacity, transform;
  text-align: right;
}
.cfrac-light-content.live { pointer-events: auto; }

.cfrac-light-label {
  font-size: 1rem; letter-spacing: .22em; text-transform: uppercase;
  opacity: .35; margin-bottom: 2rem; color: var(--text-main);
}
.cfrac-email {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5vw, 5.5rem);
  line-height: 1; letter-spacing: -.01em;
  text-decoration: none; color: var(--bg-cream);
  border-bottom: 3px solid var(--bg-cream);
  padding-bottom: .3rem; display: inline-block;
  transition: border-color .3s, color .3s;
  margin-bottom: 2.5rem;
}
.cfrac-email:hover { color: var(--accent); border-color: var(--accent); }
.cfrac-socials { display: flex; flex-direction: column; gap: 1rem; align-items: flex-end; }
.cfrac-social {
  font-size: 1rem; letter-spacing: .15em; text-transform: uppercase;
  color: var(--text-main);
  text-decoration: none; opacity: .35;
  transition: opacity .2s, letter-spacing .25s;
}
.cfrac-social:hover { opacity: 1; letter-spacing: .22em; }

.cfrac-seam { display: none; }
.cfrac-seam-label { display: none; }

/* ════════════════════════════════════════════
   THANK YOU
════════════════════════════════════════════ */
.s-thankyou { height: 260vh; }

.ty-stage {
  position: fixed; inset: 0; z-index: 30;
  background: var(--accent);
  clip-path: inset(50% 0 50% 0);
  will-change: clip-path;
  pointer-events: none;
  display: flex; flex-direction: column;
  justify-content: center; align-items: flex-start;
  padding: 0 var(--padding-x);
  visibility: hidden;
}
.ty-stage.live { visibility: visible; pointer-events: auto; }

.ty-counter { position: absolute; top: 2.5rem; left: var(--padding-x); font-size: .95rem; letter-spacing: .2em; text-transform: uppercase; color: #000000; opacity: .3; }

.ty-headline {
  font-family: var(--font-heading);
  font-size: clamp(5rem, 14vw, 16rem);
  line-height: .86; letter-spacing: -.015em;
  color: var(--text-dark); margin-bottom: 2rem;
}
.ty-headline em {
  font-family: var(--font-italic);
  font-style: italic; font-size: .58em;
  color: var(--text-dark); opacity: .6;
}
.ty-sub {
  font-size: .78rem; line-height: 1.9;
  color: #000000; opacity: .5;
  max-width: 42ch; margin-bottom: 3rem;
}
.ty-foot {
  position: absolute; bottom: 2.5rem; left: var(--padding-x); right: var(--padding-x);
  display: flex; justify-content: space-between; align-items: center;
  border-top: 1px solid rgba(12,12,12,.15); padding-top: 1.5rem;
}
.ty-copy { font-size: .95rem; letter-spacing: .1em; text-transform: uppercase; color: #000000; opacity: .35; }
.ty-links { display: flex; gap: 2rem; }
.ty-links a { font-size: .95rem; letter-spacing: .1em; text-transform: uppercase; color: #000000; text-decoration: none; opacity: .35; transition: opacity .2s; }
.ty-links a:hover { opacity: 1; }

/* ── SCROLL SPACERS ── */
.s { width: 100vw; position: relative; }
.s-hero    { height: 220vh; }
.s-about   { height: 220vh; }
.s-between { height: 160vh; }
.s-proj    { height: 260vh; }
.s-contact { height: 180vh; }
.s-thankyou { height: 250vh; }

/* ── REDUCED MOTION ── */
@media (prefers-reduced-motion: reduce) {
  .hero-hint, .cur-ring, .avail-dot, .between-bg-text { animation: none !important; }
  body { cursor: auto; }
  .cur, .cur-ring { display: none; }
  /* Never let the mobile reveal hide content if JS is slow/disabled. */
  [data-reveal] { opacity: 1 !important; transform: none !important; transition: none !important; }
}

/* ── TOUCH / COARSE POINTER ── */
@media (pointer: coarse) {
  body { cursor: auto; }
  .cur, .cur-ring { display: none; }
}

/* ── MOBILE LAYOUT (mobile-first base: static, centered, simple) ──
   The desktop experience is the fixed-panel press-engine. On phones we drop
   that entirely: panels become normal-flow, centered blocks you scroll
   through natively. tick() is gated off on mobile, so these !important
   rules own the layout with no per-frame engine fighting them. Each section
   keeps its signature solid color so the press identity survives. */
@media (max-width: 768px) {
  :root {
    --padding-x: 1.5rem;
    --padding-y: 5.5rem;
  }

  /* No spacer-driven scroll distance on mobile — sections are real blocks. */
  .s { display: none !important; }

  /* The sliding color blocks and the ambient shaders are desktop flourishes.
     Target the shader wrappers by class (added in the components) so we hide
     only those, never the real content (e.g. the projects proof-strip). */
  .layer { display: none !important; }
  .shader-layer, .hero-scene-wrap { display: none !important; }
  .between-bg-text { display: none !important; }

  /* Panels: from fixed overlay to a centered, full-width content block. */
  .panel {
    position: static !important;
    inset: auto !important;
    left: auto !important;
    top: auto !important;
    bottom: auto !important;
    width: 100% !important;
    height: auto !important;
    min-height: auto !important;
    opacity: 1 !important;
    transform: none !important;
    overflow: visible !important;
    pointer-events: auto !important;
    display: flex !important;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: var(--padding-y) var(--padding-x) !important;
  }

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
    background: transparent;
    padding: 0 .8rem;
    font-family: var(--font-heading);
    font-size: .8rem;
    letter-spacing: .2em;
  }
  .p-hero .m-divider span, .p-about-l1 .m-divider span, .cfrac-dark-content .m-divider span { background: var(--bg-dark); }
  .p-about-l2 .m-divider span, .p-between .m-divider span, .p-proj-l2 .m-divider span { background: var(--bg-cream); }
  .p-proj-l3 .m-divider span, .cfrac-light-content .m-divider span, .ty-stage .m-divider span { background: var(--accent); }

  /* Signature backgrounds, preserved per section. */
  .p-hero     { background: var(--bg-dark);  color: var(--bg-cream); min-height: 100vh !important; justify-content: center; }
  .p-about-l1 { background: var(--bg-dark);  color: var(--bg-cream); }
  .p-about-l2 { background: var(--bg-cream); color: var(--text-dark); }
  .p-between  { background: var(--bg-cream); color: var(--text-dark); }
  .p-proj-l3  { background: var(--accent);   color: var(--text-dark); }
  .p-proj-l2  { background: var(--bg-cream); color: var(--text-dark); }

  /* Static flat dither-dot accent on the lime projects block (mobile only). */
  .dither-accent {
    background-image:
      radial-gradient(rgba(12,12,12,0.16) 1px, transparent 1.4px);
    background-size: 6px 6px;
  }

  /* ── HERO ── */
  .hero-container { flex-direction: column; gap: 1.5rem; text-align: center; align-items: center; width: 100%; max-width: 40rem; margin: 0 auto; }
  .hero-text-block { width: 100%; flex: none; }
  .hero-index, .hero-tag { opacity: .4; }
  .hero-title { font-size: clamp(4rem, 21vw, 9rem); line-height: .82; margin: 1rem 0; }
  .hero-sub { font-size: 1rem; line-height: 1.75; max-width: 34ch; margin: 0 auto 1.5rem; opacity: .55; }
  .hero-hint { font-size: .85rem; }

  /* ── ABOUT STRIP (collapse to a simple label) ── */
  .p-about-l1 {
    flex-direction: row; align-items: center; justify-content: space-between;
    padding: 1.2rem var(--padding-x) !important;
  }
  .p-about-l1 .strip-num, .p-about-l1 .strip-role { display: none; }

  /* ── ABOUT MAIN ── */
  .p-about-l2 .about-h2 { font-size: clamp(2.5rem, 11vw, 4.5rem); text-align: center; }
  .about-body { max-width: 42ch; margin: 0 auto 2.5rem; text-align: center; font-size: 1rem; line-height: 1.8; opacity: .6; }
  .skills { align-items: center; width: 100%; max-width: 32rem; margin: 0 auto; }
  .skill-group { justify-content: center; }

  /* ── BETWEEN / PROCESS ── */
  .between-idx { opacity: .5; margin-bottom: 1.5rem; }
  .between-passes { flex-wrap: wrap; justify-content: center; gap: 1rem 2rem; }
  .pass { font-size: clamp(2rem, 9vw, 3.5rem); }
  .between-sub { opacity: .5; margin-top: 1.2rem; }

  /* ── PROJECTS ── */
  .p-proj-l3 .proj-h2 { font-size: clamp(2rem, 9vw, 3.5rem); text-align: center; margin-bottom: 2.5rem; }
  .p-proj-l2 { text-align: center; }
  .p-proj-l2 .contact-num { opacity: .12; }
  .contact-cta { font-size: clamp(2rem, 9vw, 3.2rem); text-align: center; }
  .contact-link { display: inline-block; font-size: 1rem; }

  /* ── CONTACT FRACTURE → simple stacked blocks ── */
  .cfrac-dark { display: none !important; }
  .cfrac-dark-content, .cfrac-light-content {
    position: static !important;
    inset: auto !important;
    opacity: 1 !important;
    transform: none !important;
    pointer-events: auto !important;
    width: 100% !important;
    max-width: 40rem;
    margin: 0 auto;
    text-align: center;
    align-items: center;
    justify-content: center;
    padding: var(--padding-y) var(--padding-x) !important;
  }
  .cfrac-dark-content { background: var(--bg-dark); color: var(--bg-cream); display: flex !important; flex-direction: column; }
  .cfrac-light-content { background: var(--accent); color: var(--text-dark); display: flex !important; flex-direction: column; }
  .cfrac-eyebrow, .cfrac-light-label { opacity: .5; }
  .cfrac-big { font-size: clamp(2.5rem, 12vw, 5rem); }
  .cfrac-body { font-size: 1rem; line-height: 1.8; opacity: .6; max-width: 38ch; margin: 0 auto 2rem; }
  .cfrac-email { font-size: clamp(1.5rem, 7vw, 2.5rem); word-break: break-word; }
  .cfrac-socials { flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 1.5rem; align-items: center; }
  .avail-dot { animation: none; }

  /* ── THANK YOU ── */
  .ty-stage {
    position: static !important;
    inset: auto !important;
    clip-path: none !important;
    visibility: visible !important;
    opacity: 1 !important;
    pointer-events: auto !important;
    width: 100% !important;
    min-height: 80vh !important;
    background: var(--accent);
    color: var(--text-dark);
    display: flex !important;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: var(--padding-y) var(--padding-x) !important;
  }
  .ty-counter { position: static; margin-bottom: 1.5rem; opacity: .4; }
  .ty-headline { font-size: clamp(3.5rem, 18vw, 8rem); text-align: center; }
  .ty-sub { max-width: 40ch; margin: 0 auto 2.5rem; opacity: .6; }
  .ty-foot { position: static; flex-direction: column; gap: 1rem; border-top: 1px solid rgba(12,12,12,.15); padding-top: 1.5rem; margin-top: 2rem; text-align: center; }

  /* Touch targets: nav links + project links get a comfortable tap area. */
  .nav-links a { padding: 0.6rem 0.4rem; }
  .proof-link, .contact-link, .cfrac-email, .cfrac-social, .ty-links a { min-height: 44px; display: inline-flex; align-items: center; }

  /* Kill the 300ms tap delay and double-tap zoom on interactive elements. */
  a, button, [role="button"] { touch-action: manipulation; }
}
`;

const GlobalCSS = () => {
  return <style>{CSS}</style>;
};

export default GlobalCSS;
