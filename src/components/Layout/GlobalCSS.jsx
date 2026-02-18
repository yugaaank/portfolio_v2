import React from 'react';

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
  font-size: .95rem; letter-spacing: .18em; text-transform: uppercase;
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
  font-size: 1rem; letter-spacing: .22em; text-transform: uppercase;
  opacity: .4; margin-bottom: 2rem;
}
.hero-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(5rem, 13.5vw, 17rem);
  line-height: .87; letter-spacing: -.01em; margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  width: fit-content;
}
.hero-invert-circle {
  position: absolute;
  top: 50%;
  right: -0.4em;
  transform: translateY(-50%);
  width: 2.2em;
  height: 2.2em;
  background-color: #f0e9d6;
  border-radius: 50%;
  mix-blend-mode: difference;
  pointer-events: none;
  z-index: 2;
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
  font-size: .95rem; letter-spacing: .2em; text-transform: uppercase;
  opacity: .3; animation: blink 2s ease infinite;
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
  z-index: 11; color: #f0e9d6;
  justify-content: space-between;
  padding: 7rem 1.5rem 3.5rem;
  border-right: 1px solid rgba(240,233,214,.07);
}
.strip-label { font-size: .8rem; letter-spacing: .22em; text-transform: uppercase; opacity: .35; }
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
  padding: .32rem .85rem;
  border: 1px solid rgba(12,12,12,.18);
  font-size: .95rem; letter-spacing: .12em; text-transform: uppercase;
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
.between-lbl { font-size: 1.2rem; letter-spacing: .22em; text-transform: uppercase; opacity: .4; margin-top: .5rem; position: relative; z-index: 2; }
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
.proj-n { font-size: 1rem; letter-spacing: .1em; opacity: .3; }
.proj-name { font-family: 'Bebas Neue', sans-serif; font-size: clamp(1.4rem,2.5vw,2.3rem); letter-spacing: .03em; transition: letter-spacing .3s; }
.proj-item:hover .proj-name { letter-spacing: .08em; }
.proj-tag { font-size: 1rem; letter-spacing: .12em; text-transform: uppercase; padding: .28rem .7rem; border: 1px solid rgba(12,12,12,.18); opacity: .5; }

.p-proj-l2 {
  z-index: 10; color: #0c0c0c;
  justify-content: space-between;
  padding: 7rem 2.5rem 3.5rem;
  border-left: 1px solid rgba(12,12,12,.1);
}
.contact-num { font-family: 'Bebas Neue', sans-serif; font-size: clamp(4rem,8vw,10rem); line-height: 1; opacity: .08; }
.contact-cta { font-family: 'Bebas Neue', sans-serif; font-size: clamp(1.8rem,3.5vw,3.2rem); line-height: 1.05; margin-bottom: 2rem; }
.contact-link {
  display: block; font-size: 1.1rem; letter-spacing: .08em;
  color: #0c0c0c; text-decoration: none;
  border-bottom: 1px solid rgba(12,12,12,.2);
  padding-bottom: .5rem; margin-bottom: .6rem;
  transition: letter-spacing .25s, border-color .25s;
}
.contact-link:hover { letter-spacing: .14em; border-color: rgba(12,12,12,.5); }

/* ── SHOWCASE (Parallax Stack) ── */
.showcase-panel {
  position: fixed; top: 0; bottom: 0; left: 0; right: 0;
  z-index: 15;
  background: radial-gradient(circle at 50% 50%, #1a1a1a 0%, #050505 100%);
  color: #f0e9d6;
  overflow: hidden;
  clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
  will-change: clip-path;
  display: flex; justify-content: center; align-items: center;
}

/* Noise Overlay */
.showcase-panel::before {
  content: "";
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E");
  opacity: 0.035;
  pointer-events: none;
  z-index: 1;
}

.showcase-intro-static {
  position: absolute; top: 3.5rem; left: 3.5rem; z-index: 2;
  mix-blend-mode: exclusion;
  pointer-events: none;
}
.showcase-intro-static h2 { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; letter-spacing: 0.1em; margin-bottom: 0.5rem; }
.showcase-intro-static p { font-family: 'Instrument Serif', serif; font-style: italic; opacity: 0.6; }

.showcase-stage {
  position: absolute; inset: 0;
  display: flex; justify-content: center; align-items: center;
  z-index: 2; /* Ensure content sits above noise if needed, though noise is z-1 and panel is parent */
}

/* Glassmorphism Card */
.showcase-card {
  position: absolute;
  width: 70vw; max-width: 1000px;
  height: 70vh; max-height: 700px;
  
  /* Glass Effect */
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  
  /* Subtle border and deep shadow */
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top: 1px solid rgba(255, 255, 255, 0.15); /* Top highlight */
  border-radius: 12px;
  
  overflow: hidden;
  box-shadow: 
    0 20px 50px -10px rgba(0,0,0,0.8),
    0 0 0 1px rgba(0,0,0,0.2); /* Shadow border */
    
  will-change: transform, filter;
  transform: translateY(120%);
  transition: 
    border-color 0.4s ease, 
    transform 0.4s ease, 
    box-shadow 0.4s ease;
}

.showcase-card:hover {
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 
    0 0 40px -10px rgba(255, 255, 255, 0.1),
    0 30px 60px -15px rgba(0,0,0,0.9);
  transform: translateY(0) scale(1.005); /* Slight lift handled by JS usually, but here for hover if static */
}

.card-inner {
  height: 100%;
  display: grid; grid-template-columns: 1fr 1fr;
}

.card-img-wrap {
  width: 100%; height: 100%;
  position: relative; overflow: hidden;
  border-right: 1px solid rgba(255,255,255,0.08);
}
.card-img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.2, 1, 0.3, 1);
  filter: saturate(0.8) contrast(1.1);
}
.showcase-card:hover .card-img {
  transform: scale(1.05);
  filter: saturate(1.1) contrast(1.1);
}

.card-content {
  padding: 4rem;
  display: flex; flex-direction: column; justify-content: center;
  position: relative;
}
.card-n {
  position: absolute; top: 2rem; right: 2rem;
  font-family: 'Bebas Neue', sans-serif; font-size: 6rem; line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px rgba(212, 245, 60, 0.15);
  opacity: 1;
}
.card-content h3 { font-family: 'Bebas Neue', sans-serif; font-size: 4rem; line-height: 0.9; margin-bottom: 1.5rem; text-shadow: 0 0 20px rgba(0,0,0,0.5); }
.card-desc { font-size: 1rem; line-height: 1.6; opacity: 0.7; margin-bottom: 3rem; max-width: 32ch; }
.card-meta { display: flex; gap: 2rem; align-items: center; margin-top: auto; }
.card-stack {
  font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em;
  color: #d4f53c; opacity: 0.8;
  font-weight: 500;
}
.card-link {
  font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.1em;
  color: #d4f53c; text-decoration: none;
  border-bottom: 1px solid rgba(212,245,60,0.3);
  padding-bottom: 0.2rem;
  transition: all 0.3s ease;
}
.card-link:hover {
  opacity: 1;
  border-color: #d4f53c;
  box-shadow: 0 2px 10px rgba(212, 245, 60, 0.2);
}

/* ════════════════════════════════════════════
   CONTACT SECTION


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
.s-contact { height: 180vh; }

/* Dark half — top-left triangle */
/* Dark half — now full screen background */
.cfrac-dark {
  position: fixed; inset: 0; z-index: 20;
  background: #0c0c0c;
  will-change: opacity;
  pointer-events: none;
  opacity: 0;
}

/* Cream half — REMOVED */
.cfrac-light { display: none; }

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
  font-size: 1rem; letter-spacing: .22em; text-transform: uppercase;
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
  font-size: .95rem; letter-spacing: .18em; text-transform: uppercase;
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

/* Content inside cream half — now on dark background */
.cfrac-light-content {
  position: fixed; inset: 0; z-index: 21;
  pointer-events: none;
  display: flex; flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 6rem 3.5rem 0;
  color: #f0e9d6; /* Changed to light */
  opacity: 0; will-change: opacity, transform;
  text-align: right;
}
.cfrac-light-content.live { pointer-events: auto; }

.cfrac-light-label {
  font-size: 1rem; letter-spacing: .22em; text-transform: uppercase;
  opacity: .35; margin-bottom: 2rem;
}
.cfrac-email {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2rem, 5vw, 5.5rem);
  line-height: 1; letter-spacing: -.01em;
  text-decoration: none; color: #f0e9d6; /* Changed to light */
  border-bottom: 3px solid #f0e9d6; /* Changed to light */
  padding-bottom: .3rem; display: inline-block;
  transition: border-color .3s, color .3s;
  margin-bottom: 2.5rem;
}
.cfrac-email:hover { color: #d4f53c; border-color: #d4f53c; }
.cfrac-socials { display: flex; flex-direction: column; gap: 1rem; align-items: flex-end; }
.cfrac-social {
  font-size: 1rem; letter-spacing: .15em; text-transform: uppercase;
  color: #f0e9d6; /* Changed to light */
  text-decoration: none; opacity: .35;
  transition: opacity .2s, letter-spacing .25s;
}
.cfrac-social:hover { opacity: 1; letter-spacing: .22em; }

/* The diagonal seam line — REMOVED */
.cfrac-seam { display: none; }
.cfrac-seam-label { display: none; }

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

.ty-counter { position: absolute; top: 2.5rem; left: 3.5rem; font-size: .95rem; letter-spacing: .2em; text-transform: uppercase; color: #0c0c0c; opacity: .3; }

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
.ty-copy { font-size: .95rem; letter-spacing: .1em; text-transform: uppercase; color: #0c0c0c; opacity: .35; }
.ty-links { display: flex; gap: 2rem; }
.ty-links a { font-size: .95rem; letter-spacing: .1em; text-transform: uppercase; color: #0c0c0c; text-decoration: none; opacity: .35; transition: opacity .2s; }
.ty-links a:hover { opacity: 1; }

/* ── SCROLL SPACERS ── */
.s { width: 100vw; position: relative; }
.s-hero    { height: 220vh; }
.s-about   { height: 220vh; }
.s-between { height: 160vh; }
.s-proj    { height: 260vh; }
.s-showcase { height: 700vh; }
.s-contact { height: 180vh; }
.s-thankyou { height: 250vh; }
`;

const GlobalCSS = () => {
  return <style>{CSS}</style>;
};

export default GlobalCSS;
