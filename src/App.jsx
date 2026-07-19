import { useEffect, useRef, useState, useCallback } from "react";
import { useLenis } from 'lenis/react';
import "./App.css";
import GlobalCSS from "./components/Layout/GlobalCSS";
import Cursor from "./components/Layout/Cursor";
import ProgressBar from "./components/Layout/ProgressBar";
import Nav from "./components/Layout/Nav";
import Layers from "./components/Layout/Layers";
import Hero from "./components/Hero/Hero";
import AboutStrip from "./components/About/AboutStrip";
import AboutMain from "./components/About/AboutMain";
import Between from "./components/Between/Between";
import ProjectsList from "./components/Projects/ProjectsList";
import ProjectsStrip from "./components/Projects/ProjectsStrip";
import Contact from "./components/Contact/Contact";
import ThankYou from "./components/ThankYou/ThankYou";
import ScrollSpacers from "./components/Layout/ScrollSpacers";
import { cl, lerp, easeOutCubic, easeInCubic, applyLayer, applyPanel } from "./utils/utils";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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


  /* thank-you refs */
  const tyStageRef = useRef(null);
  const cardsRef = useRef([]);
  const projPosRef = useRef(0);   // damped film position for the frame hold

  /* cursor */
  const curRef = useRef(null);
  const ringRef = useRef(null);

  const [prog, setProg] = useState(0);

  const tick = useCallback((forcedSy) => {
    const sy = forcedSy !== undefined ? forcedSy : window.scrollY;
    const totalH = document.body.scrollHeight - window.innerHeight;
    setProg(totalH > 0 ? sy / totalH : 0);

    // Reduced motion: skip the per-frame layer wipe and jump straight to
    // end states so every panel is visible without animation.
    if (prefersReducedMotion) {
      const tyEl = tyRef.current;
      if (tyEl) applyPanel(pHeroRef, 0, 100, 1, 0);
      applyLayer(l1Ref, -20, 20);
      applyLayer(l2Ref, 100, 0);
      applyLayer(l3Ref, -70, 70);
      applyPanel(pAL1Ref, -20, 20, 1);
      applyPanel(pAL2Ref, 100, 0, 1);
      applyPanel(pBetRef, 100, 0, 1);
      applyPanel(pPL3Ref, -70, 70, 1);
      applyPanel(pPL2Ref, 100, 0, 1);
      if (cDarkRef.current) cDarkRef.current.style.opacity = 1;
      if (cDarkContentRef.current) {
        cDarkContentRef.current.style.opacity = 1;
        cDarkContentRef.current.style.transform = "none";
        cDarkContentRef.current.classList.add("live");
      }
      if (cLightContentRef.current) {
        cLightContentRef.current.style.opacity = 1;
        cLightContentRef.current.style.transform = "none";
        cLightContentRef.current.classList.add("live");
      }
      if (tyStageRef.current) {
        tyStageRef.current.style.clipPath = "inset(0 0 0 0)";
        tyStageRef.current.classList.add("live");
      }
      // Reduced motion: lay proof frames out as a static vertical stack
      // (no overlap, no scroll-driven advance).
      if (pPL3Ref.current) {
        const frames = pPL3Ref.current.querySelectorAll('.proof-frame');
        frames.forEach((f, i) => {
          f.style.position = "relative";
          f.style.transform = "none";
          f.style.opacity = "1";
          f.style.height = "auto";
          f.style.marginBottom = i < frames.length - 1 ? "4rem" : "0";
        });
        const wrap = pPL3Ref.current.querySelector('.proof-frames');
        if (wrap) wrap.style.height = "auto";
      }
      return;
    }

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
    const tHA = heroH > 0 ? cl((sy - (heroTop + heroH * 0.45)) / (heroH * 0.45)) : 0; 
    const tAB = aboutH > 0 ? cl((sy - (aboutTop + aboutH * 0.45)) / (aboutH * 0.45)) : 0;
    const tBP = betweenH > 0 ? cl((sy - (betweenTop + betweenH * 0.45)) / (betweenH * 0.45)) : 0;

    // projects → contact:
    const tPC = projH > 0 ? cl((sy - (projTop + projH * 0.6)) / (projH * 0.35)) : 0;

    // contact fracture open
    const tCO = vh > 0 ? cl((sy - (contactTop - vh * 0.8)) / (vh * 0.8)) : 0;

    // Content animation trigger
    const tCC = vh > 0 ? cl((sy - (contactTop + vh * 0.2)) / (vh * 0.6)) : 0;

    // thank-you shutter
    // Added safety guard for top of page
    const tTY = (sy < 100 || vh <= 0) ? 0 : cl((sy - (tyTop - vh * 0.5)) / (vh * 0.5)); 

    /* ── LAYER 1 (black) ─────────────────────
       tHA: width 100→20vw
       tAB: slides off left
    ─────────────────────────────────────────*/
    const l1W = lerp(100, 20, tHA);
    const l1L = lerp(0, -20, tAB);
    applyLayer(l1Ref, l1L, l1W);

    /* ── LAYER 2 (cream) ─────────────────────*/
    let l2L, l2W;
    const tHA_eased = easeOutCubic(tHA); 
    const tAB_eased = easeInCubic(tAB);  
    const tBP_in = easeInCubic(tBP);     
    const tPC_in = easeInCubic(tPC);     

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

    /* ── LAYER 3 (lime) ─────────────────────*/
    const tBP_out = easeOutCubic(tBP);   
    const l3Base = lerp(-70, 0, tBP_out);
    const l3L = lerp(l3Base, -70, tPC_in);
    applyLayer(l3Ref, l3L, 70);

    /* ── CONTENT PANELS ─────────────────────*/
    // Hero: Safety override - if sy is 0, opacity is 1.
    const heroAlpha = sy < 10 ? 1 : cl(1 - tHA * 2.5);
    applyPanel(pHeroRef, 0, 100, heroAlpha, -tHA * 60);

    // About L1 strip
    const al1A = cl((tHA - 0.4) / 0.4) * cl(1 - tAB * 4);
    applyPanel(pAL1Ref, Math.max(l1L, -20), 20, al1A);

    // About L2 main
    const al2A = cl((tHA - 0.35) / 0.45) * cl(1 - tAB * 3);
    applyPanel(pAL2Ref, l2L, l2W, al2A);

    // Between
    const betA = cl((tAB - 0.4) / 0.45) * cl(1 - tBP * 3);
    applyPanel(pBetRef, l2L, l2W, betA);

    // Projects L3
    const pl3A = cl((tBP - 0.4) / 0.45) * cl(1 - tPC * 3);
    applyPanel(pPL3Ref, Math.max(l3L, -70), 70, pl3A);

    // Projects L2 strip
    const pl2A = cl((tBP - 0.35) / 0.5) * cl(1 - tPC * 3);
    applyPanel(pPL2Ref, l2L, l2W, pl2A);

    /* ── PROJECTS FILM ADVANCE (with frame hold) ──*/
    if (pPL3Ref.current && cardsRef.current.length === 0) {
      cardsRef.current = Array.from(pPL3Ref.current.querySelectorAll('.proof-frame'));
    }
    const cards = cardsRef.current;
    if (cards.length > 0) {
      const tCards = projH > 0 ? cl((sy - projTop) / (projH * 0.6)) : 0;
      // Raw continuous frame position: 0 = first frame, (n-1) = last.
      const rawPos = tCards * (cards.length - 1);

      // Magnetic hold: bias toward the nearest frame so the film settles
      // on each proof when scrolling stops. Pull grows as we near a frame.
      const nearest = Math.round(rawPos);
      const gap = nearest - rawPos;
      const magnet = gap * cl(1 - Math.abs(gap)); // 0 far, ~0.5 at mid, 0 on frame
      const heldPos = rawPos + magnet * 1.6;

      // Damp toward the held position so it eases in instead of snapping.
      projPosRef.current += (heldPos - projPosRef.current) * 0.18;
      const pos = projPosRef.current;

      cards.forEach((card, i) => {
        const dist = i - pos;            // signed distance from the gate
        const absD = Math.abs(dist);
        const offset = dist * 105;        // % of frame height per step
        const scale = 1 - absD * 0.06;
        const opacity = cl(1 - absD * 0.55);
        const yClip = lerp(0, 14, cl(absD)); // neighbors peek, dimmed
        card.style.transform = `translateY(calc(${offset}% + ${yClip}px)) scale(${scale})`;
        card.style.opacity = opacity;
        card.style.zIndex = String(100 - Math.round(absD * 10));
        card.style.pointerEvents = absD < 0.5 ? "auto" : "none";
      });
    }

    /* ── CONTACT REVEAL ──────────────────────*/
    if (cDarkRef.current) cDarkRef.current.style.opacity = tCO;
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

    /* ── THANK-YOU SHUTTER ───────────────────*/
    if (tyStageRef.current) {
      const tTY_out = easeOutCubic(tTY); 
      const inset = lerp(50, 0, tTY_out);
      tyStageRef.current.style.clipPath = `inset(${inset}% 0 ${inset}% 0)`;
      tyStageRef.current.classList.toggle("live", tTY > 0.01);
    }
  }, []);

  const lenis = useLenis(({ scroll }) => {
    tick(scroll);
  });

  useEffect(() => {
    tick();
    const handleResize = () => {
      cardsRef.current = [];
      projPosRef.current = 0;
      tick();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [tick]);

  useEffect(() => {
    let tx = 0, ty = 0, x = 0, y = 0, vx = 0, vy = 0;
    const stiffness = 0.1, damping = 0.8;
    const move = (e) => {
      tx = e.clientX; ty = e.clientY;
      if (curRef.current) {
        curRef.current.style.left = tx + "px"; curRef.current.style.top = ty + "px";
      }
    };
    let rafId;
    const loop = () => {
      const dx = tx - x, dy = ty - y;
      vx += dx * stiffness; vy += dy * stiffness;
      vx *= damping; vy *= damping;
      x += vx; y += vy;
      if (ringRef.current) {
        ringRef.current.style.left = x + "px"; ringRef.current.style.top = y + "px";
      }
      rafId = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    loop();
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <>
      <ScrollSpacers ref={{ heroRef, aboutRef, betweenRef, projRef, contactRef, tyRef }} />
      <GlobalCSS />
      <Cursor ref={{ curRef, ringRef }} />
      <ProgressBar prog={prog} />
      <Nav lenis={lenis} heroRef={heroRef} projRef={projRef} aboutRef={aboutRef} contactRef={contactRef} />
      <Layers ref={{ l1Ref, l2Ref, l3Ref }} />
      <Hero ref={pHeroRef} />
      <AboutStrip ref={pAL1Ref} />
      <AboutMain ref={pAL2Ref} />
      <Between ref={pBetRef} />
      <ProjectsList ref={pPL3Ref} />
      <ProjectsStrip ref={pPL2Ref} />
      <Contact ref={{ cDarkRef, cLightRef, cDarkContentRef, cLightContentRef }} />
      <ThankYou ref={tyStageRef} />
    </>
  );
}
