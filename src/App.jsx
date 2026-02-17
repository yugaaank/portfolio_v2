import { useEffect, useRef, useState, useCallback } from "react";
import { useLenis } from 'lenis/react';

/*
  SECTIONS
  ─────────────────────────────────────────────
  Hero      Layer 1 full (black)
  About     Layer 1 strip left 20% + Layer 2 right 80% (cream)
  Between   Layer 2 full (cream, stat)
  Projects  Layer 3 left 70% (lime) + Layer 2 right 30% strip (cream)
  Contact   ← NEW: scroll-driven diagonal fracture, no fixed layers involved
  Thank You ← shutter clip-path reveal
  ─────────────────────────────────────────────
*/

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Instrument+Serif:ital@0;1&family=Syne+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: auto; }
body {
  background: #0c0c0c;
  font-family: 'Syne Mono', monospace;
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
.cur-ring {
  position: fixed; width: 38px; height: 38px;
  border: 1px solid rgba(255,255,255,0.8); border-radius: 50%;
  pointer-events: none; z-index: 9998;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
  transition: left .14s ease, top .14s ease;
}

/* ── NAV ── */
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 500;
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.8rem 3rem;
  mix-blend-mode: difference;
}
.nav-logo {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.5rem; letter-spacing: .1em; color: #f0e9d6;
}
.nav-links { display: flex; gap: 2.5rem; list-style: none; }
.nav-links a {
  color: #f0e9d6; text-decoration: none;
  font-size: .62rem; letter-spacing: .18em; text-transform: uppercase;
  opacity: .5; transition: opacity .2s;
}
.nav-links a:hover { opacity: 1; }

/* ── PROGRESS BAR ── */
.prog {
  position: fixed; top: 0; left: 0; height: 2px;
  background: #d4f53c; z-index: 600;
  pointer-events: none;
}

/* ── FIXED LAYERS ── */
.layer {
  position: fixed; top: 0; bottom: 0;
  will-change: left, width;
  pointer-events: none;
}
.l1 { background: #0c0c0c; z-index: 10; }
.l2 { background: #f0e9d6; z-index: 9; }
.l3 { background: #d4f53c; z-index: 8; }

/* ── FIXED CONTENT PANELS ── */
.panel {
  position: fixed; top: 0; bottom: 0;
  will-change: opacity, left, width;
  pointer-events: auto;
  display: flex; flex-direction: column;
  padding: 5.5rem 3.5rem 4rem;
  overflow: hidden;
}

/* ── HERO ── */
.p-hero { z-index: 11; color: #f0e9d6; justify-content: flex-end; }
.hero-tag {
  font-size: .62rem; letter-spacing: .22em; text-transform: uppercase;
  opacity: .4; margin-bottom: 2rem;
}
.hero-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(5rem, 13.5vw, 17rem);
  line-height: .87; letter-spacing: -.01em; margin-bottom: 1.5rem;
}
.hero-title em {
  font-family: 'Instrument Serif', serif;
  font-style: italic; color: #d4f53c; font-size: .52em;
}
.hero-sub {
  font-size: .8rem; line-height: 1.85;
  opacity: .4; max-width: 36ch; margin-bottom: 2.5rem;
}
.hero-hint {
  font-size: .58rem; letter-spacing: .2em; text-transform: uppercase;
  opacity: .3; animation: blink 2s ease infinite;
}
@keyframes blink { 0%,100% { opacity: .3; } 50% { opacity: .75; } }

/* ── ABOUT STRIP ── */
.p-about-l1 {
  z-index: 11; color: #f0e9d6;
  justify-content: space-between;
  padding: 7rem 1.5rem 3.5rem;
  border-right: 1px solid rgba(240,233,214,.07);
}
.strip-label { font-size: .55rem; letter-spacing: .22em; text-transform: uppercase; opacity: .35; }
.strip-num { font-family: 'Bebas Neue', sans-serif; font-size: clamp(3rem,6vw,8rem); line-height:1; opacity:.1; }
.strip-role {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(1rem,2vw,1.8rem);
  line-height: 1.15; writing-mode: vertical-rl;
  transform: rotate(180deg); opacity: .65; letter-spacing: .06em;
}

/* ── ABOUT MAIN ── */
.p-about-l2 { z-index: 10; color: #0c0c0c; justify-content: center; padding: 7rem 4.5rem 4rem; }
.about-h2 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(3rem,6.5vw,7rem);
  line-height: .88; letter-spacing: -.01em; margin-bottom: 2.5rem;
}
.about-body { font-size: .82rem; line-height: 1.9; opacity: .55; max-width: 50ch; margin-bottom: 3rem; }
.skills { display: flex; flex-wrap: wrap; gap: .55rem; }
.skill {
  padding: .32rem .85rem;
  border: 1px solid rgba(12,12,12,.18);
  font-size: .58rem; letter-spacing: .12em; text-transform: uppercase;
}

/* ── BETWEEN ── */
.p-between { z-index: 10; color: #0c0c0c; justify-content: center; align-items: center; text-align: center; }
.between-bg-text {
  position: absolute; white-space: nowrap; user-select: none;
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(5rem,17vw,20rem);
  letter-spacing: -.02em; opacity: .06;
  animation: slideText 14s linear infinite;
}
@keyframes slideText { from { transform: translateX(10%); } to { transform: translateX(-40%); } }
.between-stat { font-family: 'Bebas Neue', sans-serif; font-size: clamp(6rem,16vw,16rem); line-height: 1; position: relative; z-index: 2; }
.between-lbl { font-size: .68rem; letter-spacing: .22em; text-transform: uppercase; opacity: .4; margin-top: .5rem; position: relative; z-index: 2; }
.between-sub { font-family: 'Instrument Serif', serif; font-style: italic; font-size: clamp(1rem,2.5vw,2rem); opacity: .4; margin-top: .8rem; position: relative; z-index: 2; }

/* ── PROJECTS ── */
.p-proj-l3 { z-index: 9; color: #0c0c0c; justify-content: flex-start; padding-top: 7rem; }
.proj-h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.5rem,5vw,5rem); letter-spacing: .03em; margin-bottom: 4rem; }
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
  transition: transform .4s cubic-bezier(.16,1,.3,1);
}
.proj-item:hover::before { transform: translateX(0); }
.proj-n { font-size: .58rem; letter-spacing: .1em; opacity: .3; }
.proj-name { font-family: 'Bebas Neue', sans-serif; font-size: clamp(1.4rem,2.5vw,2.3rem); letter-spacing: .03em; transition: letter-spacing .3s; }
.proj-item:hover .proj-name { letter-spacing: .08em; }
.proj-tag { font-size: .58rem; letter-spacing: .12em; text-transform: uppercase; padding: .28rem .7rem; border: 1px solid rgba(12,12,12,.18); opacity: .5; }

.p-proj-l2 {
  z-index: 10; color: #0c0c0c;
  justify-content: space-between;
  padding: 7rem 2.5rem 3.5rem;
  border-left: 1px solid rgba(12,12,12,.1);
}
.contact-num { font-family: 'Bebas Neue', sans-serif; font-size: clamp(4rem,8vw,10rem); line-height: 1; opacity: .08; }
.contact-cta { font-family: 'Bebas Neue', sans-serif; font-size: clamp(1.8rem,3.5vw,3.2rem); line-height: 1.05; margin-bottom: 2rem; }
.contact-link {
  display: block; font-size: .7rem; letter-spacing: .08em;
  color: #0c0c0c; text-decoration: none;
  border-bottom: 1px solid rgba(12,12,12,.2);
  padding-bottom: .5rem; margin-bottom: .6rem;
  transition: letter-spacing .25s, border-color .25s;
}
.contact-link:hover { letter-spacing: .14em; border-color: rgba(12,12,12,.5); }

/* ════════════════════════════════════════════
   CONTACT SECTION — diagonal fracture concept

   The screen is split by a diagonal line.
   Top-left half: black with white text sliding UP from below
   Bottom-right half: cream with black text sliding DOWN from above
   The diagonal seam itself carries a giant "WORK WITH ME" text
   that is masked to only show across the seam — like it's carved
   into the crack between the two worlds.

   Mechanism: two fixed panels, each clipped to a triangle
   via polygon clip-path. As tC progresses (0→1):
     - Both triangles start collapsed along the diagonal (zero area)
     - They expand outward to fill their half of the screen
   Content fades in after panels are mostly open (tCC)
════════════════════════════════════════════ */

/* The scroll spacer section */
.s-contact { height: 300vh; }

/* Dark half — top-left triangle */
.cfrac-dark {
  position: fixed; inset: 0; z-index: 20;
  background: #0c0c0c;
  will-change: clip-path;
  pointer-events: none;
  /* diagonal: top-left → top-right → bottom-left */
  clip-path: polygon(0% 0%, 0% 0%, 0% 0%);
}

/* Cream half — bottom-right triangle */
.cfrac-light {
  position: fixed; inset: 0; z-index: 20;
  background: #f0e9d6;
  will-change: clip-path;
  pointer-events: none;
  clip-path: polygon(100% 100%, 100% 100%, 100% 100%);
}

/* Content inside dark half */
.cfrac-dark-content {
  position: fixed; inset: 0; z-index: 21;
  pointer-events: none;
  display: flex; flex-direction: column;
  justify-content: flex-end;
  padding: 0 3.5rem 4rem;
  color: #f0e9d6;
  opacity: 0; will-change: opacity, transform;
}
.cfrac-dark-content.live { pointer-events: auto; }

.cfrac-eyebrow {
  font-size: .6rem; letter-spacing: .22em; text-transform: uppercase;
  opacity: .4; margin-bottom: 1.5rem;
}
.cfrac-big {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(3.5rem, 8vw, 9rem);
  line-height: .9; letter-spacing: -.01em;
  margin-bottom: 2rem;
}
.cfrac-body {
  font-size: .78rem; line-height: 1.85;
  opacity: .45; max-width: 38ch; margin-bottom: 2.5rem;
}
.cfrac-avail {
  display: flex; align-items: center; gap: .7rem;
  font-size: .6rem; letter-spacing: .18em; text-transform: uppercase;
  opacity: .5;
}
.avail-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #d4f53c;
  animation: ping 1.8s ease infinite;
}
@keyframes ping {
  0%  { box-shadow: 0 0 0 0 rgba(212,245,60,.6); }
  70% { box-shadow: 0 0 0 10px rgba(212,245,60,0); }
  100%{ box-shadow: 0 0 0 0 rgba(212,245,60,0); }
}

/* Content inside cream half */
.cfrac-light-content {
  position: fixed; inset: 0; z-index: 21;
  pointer-events: none;
  display: flex; flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 6rem 3.5rem 0;
  color: #0c0c0c;
  opacity: 0; will-change: opacity, transform;
  text-align: right;
}
.cfrac-light-content.live { pointer-events: auto; }

.cfrac-light-label {
  font-size: .6rem; letter-spacing: .22em; text-transform: uppercase;
  opacity: .35; margin-bottom: 2rem;
}
.cfrac-email {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2rem, 5vw, 5.5rem);
  line-height: 1; letter-spacing: -.01em;
  text-decoration: none; color: #0c0c0c;
  border-bottom: 3px solid #0c0c0c;
  padding-bottom: .3rem; display: inline-block;
  transition: border-color .3s, color .3s;
  margin-bottom: 2.5rem;
}
.cfrac-email:hover { color: #0c0c0c; border-color: #d4f53c; }
.cfrac-socials { display: flex; flex-direction: column; gap: 1rem; align-items: flex-end; }
.cfrac-social {
  font-size: .62rem; letter-spacing: .15em; text-transform: uppercase;
  color: #0c0c0c; text-decoration: none; opacity: .35;
  transition: opacity .2s, letter-spacing .25s;
}
.cfrac-social:hover { opacity: 1; letter-spacing: .22em; }

/* The diagonal seam line */
.cfrac-seam {
  position: fixed; inset: 0; z-index: 22;
  pointer-events: none;
  opacity: 0; will-change: opacity;
}
.cfrac-seam svg {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
}

/* Seam label — rotated along the diagonal */
.cfrac-seam-label {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%) rotate(-38deg);
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(3rem, 7vw, 8rem);
  letter-spacing: .08em;
  color: #d4f53c;
  white-space: nowrap;
  text-shadow: 0 0 80px rgba(212,245,60,.3);
  opacity: 0; will-change: opacity;
}

/* ════════════════════════════════════════════
   THANK YOU — the final shutter (clip-path)
════════════════════════════════════════════ */
.s-thankyou { height: 260vh; }

.ty-stage {
  position: fixed; inset: 0; z-index: 30;
  background: #d4f53c;
  clip-path: inset(50% 0 50% 0);
  will-change: clip-path;
  pointer-events: none;
  display: flex; flex-direction: column;
  justify-content: center; align-items: flex-start;
  padding: 0 3.5rem;
}
.ty-stage.live { pointer-events: auto; }

.ty-counter { position: absolute; top: 2.5rem; left: 3.5rem; font-size: .6rem; letter-spacing: .2em; text-transform: uppercase; color: #0c0c0c; opacity: .3; }

.ty-headline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(5rem, 14vw, 16rem);
  line-height: .86; letter-spacing: -.015em;
  color: #0c0c0c; margin-bottom: 2rem;
}
.ty-headline em {
  font-family: 'Instrument Serif', serif;
  font-style: italic; font-size: .58em;
  color: #0c0c0c; opacity: .6;
}
.ty-sub {
  font-size: .78rem; line-height: 1.9;
  color: #0c0c0c; opacity: .5;
  max-width: 42ch; margin-bottom: 3rem;
}
.ty-foot {
  position: absolute; bottom: 2.5rem; left: 3.5rem; right: 3.5rem;
  display: flex; justify-content: space-between; align-items: center;
  border-top: 1px solid rgba(12,12,12,.15); padding-top: 1.5rem;
}
.ty-copy { font-size: .58rem; letter-spacing: .1em; text-transform: uppercase; color: #0c0c0c; opacity: .35; }
.ty-links { display: flex; gap: 2rem; }
.ty-links a { font-size: .58rem; letter-spacing: .1em; text-transform: uppercase; color: #0c0c0c; text-decoration: none; opacity: .35; transition: opacity .2s; }
.ty-links a:hover { opacity: 1; }

/* ── SCROLL SPACERS ── */
.s { width: 100vw; position: relative; }
.s-hero    { height: 220vh; }
.s-about   { height: 220vh; }
.s-between { height: 160vh; }
.s-proj    { height: 220vh; }
`;

const PROJECTS = [
  {
    n: "01",
    name: "InterventionGPT",
    tag: "AI / RAG",
    desc: "RAG-based app for road safety intervention strategies",
    stack: "Python • Chromadb • Transformers",
    link: "https://github.com/yugaaank/InterventionGPT"
  },
  {
    n: "02",
    name: "Code Relay",
    tag: "Full Stack",
    desc: "Enterprise task management with complex workflows",
    stack: "React • Node.js • MySQL",
    link: "https://github.com/yugaaank/code-relay-foobar"
  },
  {
    n: "03",
    name: "RecoveryLens",
    tag: "Web App",
    desc: "Intelligent recovery tracking system",
    stack: "TypeScript • Next.js",
    link: "https://github.com/yugaaank/recoveryLens"
  },
  {
    n: "04",
    name: "ClearView",
    tag: "Python / AI",
    desc: "Data clarity and visualization tool",
    stack: "Python • Streamlit",
    link: "https://github.com/yugaaank/clearView"
  },
  {
    n: "05",
    name: "ffflow",
    tag: "Systems / Rust",
    desc: "FFmpeg workflow automation tool",
    stack: "Rust • CLI",
    link: "https://github.com/yugaaank/ffflow"
  },
];

const SKILLS = [
  "HTML", "CSS", "JavaScript", "TypeScript",
  "React", "Next.js", "Node.js", "Express",
  "MongoDB", "MySQL", "Java", "C",
  "Linux", "Framer Motion", "GSAP"
];

const cl = (v) => Math.min(Math.max(v, 0), 1);
const lerp = (a, b, t) => a + (b - a) * cl(t);
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t) => t * t * t;

export default function Portfolio() {
  /* scroll spacer refs */
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const betweenRef = useRef(null);
  const projRef = useRef(null);
  const contactRef = useRef(null);
  const tyRef = useRef(null);

  /* layer colour-block refs */
  const l1Ref = useRef(null);
  const l2Ref = useRef(null);
  const l3Ref = useRef(null);

  /* content panel refs */
  const pHeroRef = useRef(null);
  const pAL1Ref = useRef(null);
  const pAL2Ref = useRef(null);
  const pBetRef = useRef(null);
  const pPL3Ref = useRef(null);
  const pPL2Ref = useRef(null);

  /* contact fracture refs */
  const cDarkRef = useRef(null);
  const cLightRef = useRef(null);
  const cDarkContentRef = useRef(null);
  const cLightContentRef = useRef(null);
  const cSeamRef = useRef(null);
  const cSeamLabelRef = useRef(null);

  /* thank-you refs */
  const tyStageRef = useRef(null);

  /* cursor */
  const curRef = useRef(null);
  const ringRef = useRef(null);

  const [prog, setProg] = useState(0);

  const tick = useCallback(() => {
    const sy = window.scrollY;
    const totalH = document.body.scrollHeight - window.innerHeight;
    setProg(totalH > 0 ? sy / totalH : 0);

    const heroEl = heroRef.current;
    const aboutEl = aboutRef.current;
    const betweenEl = betweenRef.current;
    const projEl = projRef.current;
    const contactEl = contactRef.current;
    const tyEl = tyRef.current;
    if (!heroEl || !aboutEl || !betweenEl || !projEl || !contactEl || !tyEl)
      return;

    const heroTop = heroEl.offsetTop;
    const heroH = heroEl.offsetHeight;
    const aboutTop = aboutEl.offsetTop;
    const aboutH = aboutEl.offsetHeight;
    const betweenTop = betweenEl.offsetTop;
    const betweenH = betweenEl.offsetHeight;
    const projTop = projEl.offsetTop;
    const projH = projEl.offsetHeight;
    const contactTop = contactEl.offsetTop;
    const contactH = contactEl.offsetHeight;
    const tyTop = tyEl.offsetTop;

    const vh = window.innerHeight;

    /* ── transition progress values ── */
    const tHA = cl((sy - (heroTop + heroH * 0.45)) / (heroH * 0.45)); // hero → about
    const tAB = cl((sy - (aboutTop + aboutH * 0.45)) / (aboutH * 0.45)); // about → between
    const tBP = cl((sy - (betweenTop + betweenH * 0.45)) / (betweenH * 0.45)); // between → projects
    // projects → contact: starts halfway through projects scroll
    const tPC = cl((sy - (projTop + projH * 0.5)) / (projH * 0.42)); // projects → contact
    // contact fracture open
    const tCO = cl((sy - contactTop) / (vh * 0.8)); // fracture opens
    const tCC = cl((sy - (contactTop + vh * 0.5)) / (vh * 0.9)); // fracture content
    // thank-you shutter
    const tTY = cl((sy - (tyTop - vh * 0.1)) / (vh * 0.7)); // shutter opens

    /* ── LAYER 1 (black) ─────────────────────
       tHA: width 100→20vw
       tAB: slides off left
       tPC: when projects exit, also fade layer completely out
    ─────────────────────────────────────────*/
    const l1W = lerp(100, 20, tHA);
    const l1L = lerp(0, -20, tAB);
    applyLayer(l1Ref, l1L, l1W);

    /* ── LAYER 2 (cream) ─────────────────────
       tHA: enters from right → 80vw
       tAB: expands to 100vw
       tBP: collapses to 30vw right strip
       tPC: slides off right as contact takes over
    ─────────────────────────────────────────*/
    let l2L, l2W;

    // Eased progress values for About section
    const tHA_eased = easeOutCubic(tHA); // Fast entry, slow finish
    const tAB_eased = easeInCubic(tAB);  // Slow start, fast exit
    const tBP_in = easeInCubic(tBP);     // Between exit (slow peel)
    const tPC_in = easeInCubic(tPC);     // Projects exit (fast away)

    if (tPC > 0) {
      l2L = lerp(70, 100, tPC_in);
      l2W = lerp(30, 0, tPC_in);
    } else if (tBP > 0) {
      l2L = lerp(0, 70, tBP_in);
      l2W = lerp(100, 30, tBP_in);
    } else if (tAB > 0) {
      l2L = lerp(20, 0, tAB_eased);
      l2W = lerp(80, 100, tAB_eased);
    } else {
      l2L = lerp(100, 20, tHA_eased);
      l2W = lerp(0, 80, tHA_eased);
    }
    applyLayer(l2Ref, l2L, l2W);

    /* ── LAYER 3 (lime) ─────────────────────
       tBP: slides in from left → 70vw
       tPC: slides back off left as contact takes over
    ─────────────────────────────────────────*/
    const tBP_out = easeOutCubic(tBP);   // Lime entry (fast in)

    const l3Base = lerp(-70, 0, tBP_out);
    const l3L = lerp(l3Base, -70, tPC_in);
    applyLayer(l3Ref, l3L, 70);

    /* ── CONTENT PANELS ─────────────────────*/
    // Hero
    applyPanel(pHeroRef, 0, 100, cl(1 - tHA * 2.5), -tHA * 60);

    // About L1 strip
    const al1A = cl((tHA - 0.4) / 0.4) * cl(1 - tAB * 4);
    applyPanel(pAL1Ref, Math.max(l1L, -20), 20, al1A);

    // About L2 main
    const al2A = cl((tHA - 0.35) / 0.45) * cl(1 - tAB * 3);
    // Note: We use the eased values for position/width to match the layer
    applyPanel(pAL2Ref, l2L, l2W, al2A);

    // Between
    const betA = cl((tAB - 0.4) / 0.45) * cl(1 - tBP * 3);
    applyPanel(pBetRef, l2L, l2W, betA);

    // Projects L3
    const pl3A = cl((tBP - 0.4) / 0.45) * cl(1 - tPC * 3);
    applyPanel(pPL3Ref, Math.max(l3L, -70), 70, pl3A);

    // Projects L2 strip — also fades out as tPC progresses
    const pl2A = cl((tBP - 0.35) / 0.5) * cl(1 - tPC * 3);
    applyPanel(pPL2Ref, l2L, l2W, pl2A);

    /* ── CONTACT FRACTURE ────────────────────
       Concept: two triangular halves of the screen
       split along a diagonal from top-right to bottom-left.

       Dark half  (black): grows from diagonal toward top-left
       Light half (cream): grows from diagonal toward bottom-right

       tCO 0→1:  triangles expand from zero area → full half
       tCC 0→1:  content fades in inside each half
    ─────────────────────────────────────────*/

    // Dark triangle: polygon top-left area
    // At tCO=0: collapsed to the diagonal line (zero area)
    // At tCO=1: covers full top-left half
    // Diagonal goes from (100%, 0%) to (0%, 100%)
    // Dark fills: top-right corner → top-left corner → bottom-left corner
    // We grow it by pushing corners away from the diagonal
    const tCO_out = easeOutCubic(tCO); // Fracture fast open -> slow finish

    const darkExpand = lerp(0, 100, tCO_out); // how far corners move out
    const darkClip = `polygon(
      ${lerp(100, 0, tCO_out)}% 0%,
      0% 0%,
      0% ${lerp(0, 100, tCO_out)}%
    )`;
    const lightExpand = lerp(0, 100, tCO_out);
    const lightClip = `polygon(
      100% ${lerp(100, 0, tCO_out)}%,
      100% 100%,
      ${lerp(0, 100, tCO_out)}% 100%
    )`;

    if (cDarkRef.current) {
      cDarkRef.current.style.clipPath = darkClip;
      cDarkRef.current.style.opacity = tCO > 0 ? "1" : "0";
    }
    if (cLightRef.current) {
      cLightRef.current.style.clipPath = lightClip;
      cLightRef.current.style.opacity = tCO > 0 ? "1" : "0";
    }

    // Seam line + label
    const seamAlpha = cl(tCO * 3 - 0.5);
    if (cSeamRef.current) {
      cSeamRef.current.style.opacity = seamAlpha;
    }
    if (cSeamLabelRef.current) {
      cSeamLabelRef.current.style.opacity = cl((tCC - 0.2) / 0.5);
    }

    // Content inside halves — dark slides up, light slides down
    const contentA = cl((tCC - 0.1) / 0.6);
    const darkSlide = lerp(40, 0, cl((tCC - 0.1) / 0.7));
    const lightSlide = lerp(-40, 0, cl((tCC - 0.1) / 0.7));

    if (cDarkContentRef.current) {
      const s = cDarkContentRef.current.style;
      s.opacity = contentA;
      s.transform = `translateY(${darkSlide}px)`;
      cDarkContentRef.current.classList.toggle("live", contentA > 0.05);
    }
    if (cLightContentRef.current) {
      const s = cLightContentRef.current.style;
      s.opacity = contentA;
      s.transform = `translateY(${lightSlide}px)`;
      cLightContentRef.current.classList.toggle("live", contentA > 0.05);
    }

    /* ── THANK-YOU SHUTTER ───────────────────
       clip-path inset opens from center outward (vertical)
    ─────────────────────────────────────────*/
    if (tyStageRef.current) {
      const tTY_out = easeOutCubic(tTY); // Shutter fast open
      const inset = lerp(50, 0, tTY_out);
      tyStageRef.current.style.clipPath = `inset(${inset}% 0 ${inset}% 0)`;
      tyStageRef.current.classList.toggle("live", tTY > 0.05);
    }
  }, []);

  /* ── SCROLL SNAP LOGIC (JS) ── */
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    let snapTimeout;

    const handleScroll = () => {
      clearTimeout(snapTimeout);
      // Wait for scroll to largely stop (e.g., 200ms)
      snapTimeout = setTimeout(() => {
        // Find closest section
        const sections = [heroRef, aboutRef, betweenRef, projRef, contactRef, tyRef]
          .map(r => r.current)
          .filter(Boolean);

        const scrollY = window.scrollY;
        let closest = null;
        let minDist = Infinity;

        sections.forEach(sec => {
          const dist = Math.abs(sec.offsetTop - scrollY);
          if (dist < minDist) {
            minDist = dist;
            closest = sec;
          }
        });

        // If we are close enough to a section (e.g. within 30vh), snap to it
        // Duration 2.5s and easeInOutQuint provides a very slow, heavy, non-snappy glide.
        if (closest && minDist < window.innerHeight * 0.3) {
          lenis.scrollTo(closest, {
            duration: 2.5,
            easing: (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2, // easeInOutQuint
            lock: false,
          });
        }
      }, 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(snapTimeout);
    };
  }, [lenis]);

  function applyLayer(ref, leftVw, widthVw) {
    if (!ref.current) return;
    ref.current.style.left = `${leftVw}vw`;
    ref.current.style.width = `${Math.max(0, widthVw)}vw`;
  }

  function applyPanel(ref, leftVw, widthVw, alpha, ty = 0) {
    if (!ref.current) return;
    const s = ref.current.style;
    s.left = `${leftVw}vw`;
    s.width = `${Math.max(0, widthVw)}vw`;
    s.opacity = alpha;
    s.transform = ty ? `translateY(${ty}px)` : "";
  }

  useEffect(() => {
    tick();
    const onScroll = () => requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", tick);
    };
  }, [tick]);

  useEffect(() => {
    let rx = 0,
      ry = 0;
    const move = (e) => {
      if (curRef.current) {
        curRef.current.style.left = e.clientX + "px";
        curRef.current.style.top = e.clientY + "px";
      }
      rx += (e.clientX - rx) * 0.16;
      ry += (e.clientY - ry) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top = ry + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <style>{CSS}</style>

      <div className="cur" ref={curRef} />
      <div className="cur-ring" ref={ringRef} />
      <div className="prog" style={{ width: `${prog * 100}%` }} />

      <nav>
        <div className="nav-logo">YUGAANK</div>
        <ul className="nav-links">
          <li>
            <a href="#">Work</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>

      {/* ── LAYERS ── */}
      <div
        className="layer l1"
        ref={l1Ref}
        style={{ left: "0", width: "100vw" }}
      />
      <div
        className="layer l2"
        ref={l2Ref}
        style={{ left: "100vw", width: "0" }}
      />
      <div
        className="layer l3"
        ref={l3Ref}
        style={{ left: "-70vw", width: "70vw" }}
      />

      {/* ── HERO ── */}
      <div
        className="panel p-hero"
        ref={pHeroRef}
        style={{ left: 0, width: "100vw", zIndex: 11 }}
      >
        <p className="hero-tag">Full-Stack Developer & AI/ML Engineer</p>
        <h1 className="hero-title">
          YUGAANK
          <br />
          RATHORE
        </h1>
        <p className="hero-sub">
          Designing and engineering intelligent digital products — from interface to infrastructure — with precision, performance, and purpose.
        </p>
        <p className="hero-hint">↓ Scroll to explore</p>
      </div>

      {/* ── ABOUT STRIP ── */}
      <div
        className="panel p-about-l1"
        ref={pAL1Ref}
        style={{ left: 0, width: "20vw", zIndex: 11, opacity: 0 }}
      >
        <p className="strip-label">01 / About</p>
        <div className="strip-num">01</div>
        <div className="strip-role">Designer & Developer</div>
      </div>

      {/* ── ABOUT MAIN ── */}
      <div
        className="panel p-about-l2"
        ref={pAL2Ref}
        style={{ left: "100vw", width: "80vw", zIndex: 10, opacity: 0 }}
      >
        <h2 className="about-h2">
          Designer & Developer —
          <br />
          Building things that matter.
        </h2>
        <p className="about-body">
          I’m a Computer Science student specializing in Artificial Intelligence & Machine Learning, focused on building performant web applications, intelligent systems, and experimental developer tools. I work across frontend, backend, and system design — blending engineering with product thinking.
        </p>
        <div className="skills">
          {SKILLS.map((s) => (
            <span className="skill" key={s}>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* ── BETWEEN ── */}
      <div
        className="panel p-between"
        ref={pBetRef}
        style={{
          left: "100vw",
          width: "100vw",
          zIndex: 10,
          opacity: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="between-bg-text">
          DESIGN&nbsp;&nbsp;DEVELOP&nbsp;&nbsp;SHIP&nbsp;&nbsp;REPEAT
        </div>
        <div className="between-stat">15+</div>
        <div className="between-lbl">Projects Built</div>
        <div className="between-sub">Web • AI/ML • Systems</div>
      </div>

      {/* ── PROJECTS L3 ── */}
      <div
        className="panel p-proj-l3"
        ref={pPL3Ref}
        style={{
          left: "-70vw",
          width: "70vw",
          zIndex: 9,
          opacity: 0,
          color: "#0c0c0c",
        }}
      >
        <h2 className="proj-h2">Selected Work</h2>
        <div>
          {PROJECTS.map((p) => (
            <a
              key={p.n}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-item"
              style={{ textDecoration: 'none', color: 'inherit', display: 'grid' }}
            >
              <span className="proj-n">{p.n}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <span className="proj-name">{p.name}</span>
                <span style={{ fontSize: '0.6rem', opacity: 0.5 }}>{p.desc}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem' }}>
                <span className="proj-tag">{p.tag}</span>
                <span style={{ fontSize: '0.5rem', opacity: 0.4 }}>{p.stack}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ── PROJECTS L2 STRIP ── */}
      <div
        className="panel p-proj-l2"
        ref={pPL2Ref}
        style={{
          left: "100vw",
          width: "30vw",
          zIndex: 10,
          opacity: 0,
          color: "#0c0c0c",
        }}
      >
        <div>
          <p className="strip-label" style={{ color: "#0c0c0c" }}>
            03 / Work
          </p>
          <div className="contact-num">03</div>
        </div>
        <div>
          <p className="contact-cta">
            Let's build
            <br />
            something
            <br />
            great.
          </p>
          <a className="contact-link" href="mailto:yugaaank.dev@gmail.com">
            yugaaank.dev@gmail.com
          </a>
          <a className="contact-link" href="mailto:yugaaank.dev@gmail.com">
            WORK WITH ME →
          </a>
        </div>
      </div>

      {/* ════════════════════════════════════════
          CONTACT FRACTURE
          Two triangular halves that grow from the diagonal
      ════════════════════════════════════════ */}

      {/* Dark triangle (top-left) */}
      <div className="cfrac-dark" ref={cDarkRef} style={{ opacity: 0 }} />

      {/* Cream triangle (bottom-right) */}
      <div className="cfrac-light" ref={cLightRef} style={{ opacity: 0 }} />

      {/* Seam line + label */}
      <div className="cfrac-seam" ref={cSeamRef}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <line
            x1="100"
            y1="0"
            x2="0"
            y2="100"
            stroke="rgba(212,245,60,0.35)"
            strokeWidth=".15"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="cfrac-seam-label" ref={cSeamLabelRef}>
          WORK WITH ME
        </div>
      </div>

      {/* Dark half content — slides UP from below */}
      <div className="cfrac-dark-content" ref={cDarkContentRef}>
        <p className="cfrac-eyebrow">04 / Contact — Let's collaborate</p>
        <h2 className="cfrac-big">
          Got a project
          <br />
          in mind?
        </h2>
        <p className="cfrac-body">
          Whether it's a full product build, a design system, or a brand that
          needs to move — I'm ready to make it real. Let's start a conversation.
        </p>
        <div className="cfrac-avail">
          <span className="avail-dot" />
          Currently available for internships & collaborations
        </div>
      </div>

      {/* Cream half content — slides DOWN from above */}
      <div className="cfrac-light-content" ref={cLightContentRef}>
        <p className="cfrac-light-label">Send a message</p>
        <a className="cfrac-email" href="mailto:yugaaank.dev@gmail.com">
          yugaaank.dev@gmail.com
        </a>
        <div className="cfrac-socials">
          <a className="cfrac-social" href="https://github.com/yugaaank" target="_blank">
            GitHub ↗
          </a>
          <a className="cfrac-social" href="#">
            LinkedIn ↗
          </a>
          <a className="cfrac-social" href="#">
            Twitter ↗
          </a>
        </div>
      </div>

      {/* ════════════════════════════════════════
          THANK YOU — lime shutter
      ════════════════════════════════════════ */}
      <div className="ty-stage" ref={tyStageRef}>
        <div className="ty-counter">05 / End</div>
        <h2 className="ty-headline">
          THANK
          <br />
          YOU
          <br />
          <em>for visiting.</em>
        </h2>
        <p className="ty-sub">
          Every product starts as an idea. I build the ones that refuse to stay ideas.
        </p>
        <div className="ty-foot">
          <span className="ty-copy">© 2026 Yugaank Rathore</span>
          <div className="ty-links">
            <a href="https://github.com/yugaaank" target="_blank">GitHub</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </div>

      {/* ── SCROLL SPACERS ── */}
      <div style={{ position: "relative", zIndex: 0 }}>
        <div className="s s-hero" ref={heroRef} />
        <div className="s s-about" ref={aboutRef} />
        <div className="s s-between" ref={betweenRef} />
        <div className="s s-proj" ref={projRef} />
        <div className="s s-contact" ref={contactRef} />
        <div className="s s-thankyou" ref={tyRef} />
      </div>
    </>
  );
}
