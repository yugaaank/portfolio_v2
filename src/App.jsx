import { useEffect, useRef, useState, useCallback } from "react";
import { useLenis } from 'lenis/react';
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
import Showcase from "./components/Showcase/Showcase";
import Contact from "./components/Contact/Contact";
import ThankYou from "./components/ThankYou/ThankYou";
import ScrollSpacers from "./components/Layout/ScrollSpacers";
import { cl, lerp, easeOutCubic, easeInCubic, applyLayer, applyPanel } from "./utils/utils";

export default function Portfolio() {
  /* scroll spacer refs */
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const betweenRef = useRef(null);
  const projRef = useRef(null);
  const showcaseRef = useRef(null);
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
  const pShowcaseRef = useRef(null);

  /* contact fracture refs */
  const cDarkRef = useRef(null);
  const cLightRef = useRef(null);
  const cDarkContentRef = useRef(null);
  const cLightContentRef = useRef(null);


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
    const showcaseEl = showcaseRef.current;
    const contactEl = contactRef.current;
    const tyEl = tyRef.current;
    if (!heroEl || !aboutEl || !betweenEl || !projEl || !showcaseEl || !contactEl || !tyEl)
      return;

    const heroTop = heroEl.offsetTop;
    const heroH = heroEl.offsetHeight;
    const aboutTop = aboutEl.offsetTop;
    const aboutH = aboutEl.offsetHeight;
    const betweenTop = betweenEl.offsetTop;
    const betweenH = betweenEl.offsetHeight;
    const projTop = projEl.offsetTop;
    const projH = projEl.offsetHeight;
    const showcaseTop = showcaseEl.offsetTop;
    const showcaseH = showcaseEl.offsetHeight;
    const contactTop = contactEl.offsetTop;
    const contactH = contactEl.offsetHeight;
    const tyTop = tyEl.offsetTop;

    const vh = window.innerHeight;

    /* ── transition progress values ── */
    const tHA = cl((sy - (heroTop + heroH * 0.45)) / (heroH * 0.45)); // hero → about
    const tAB = cl((sy - (aboutTop + aboutH * 0.45)) / (aboutH * 0.45)); // about → between
    const tBP = cl((sy - (betweenTop + betweenH * 0.45)) / (betweenH * 0.45)); // between → projects

    // projects → showcase:
    // projects → showcase:
    const tPS = cl((sy - (projTop + projH * 0.5)) / (projH * 0.4));

    // Showcase internal scroll (0 to 1 over the 450vh spacer)
    const tS_prog = cl((sy - showcaseTop) / (showcaseH - vh));

    // showcase → contact:
    const tSC = cl((sy - (showcaseTop + showcaseH * 0.85)) / (showcaseH * 0.15));

    // contact fracture open (from showcase)
    // We adjust contact trigger relative to contactTop (which is after showcase now)
    const tCO = cl((sy - contactTop) / (vh * 0.5)); // fracture opens
    const tCC = cl((sy - (contactTop + vh * 0.2)) / (vh * 0.6)); // fracture content
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
       tPS: slides off right as showcase takes over
    ─────────────────────────────────────────*/
    let l2L, l2W;

    // Eased progress values for About section
    const tHA_eased = easeOutCubic(tHA); // Fast entry, slow finish
    const tAB_eased = easeInCubic(tAB);  // Slow start, fast exit
    const tBP_in = easeInCubic(tBP);     // Between exit (slow peel)
    const tPS_in = easeInCubic(tPS);     // Showcase entry (fast away)

    if (tPS > 0) {
      l2L = lerp(70, 100, tPS_in);
      l2W = lerp(30, 0, tPS_in);
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
       tPS: slides back off left as showcase takes over
    ─────────────────────────────────────────*/
    const tBP_out = easeOutCubic(tBP);   // Lime entry (fast in)

    const l3Base = lerp(-70, 0, tBP_out);
    const l3L = lerp(l3Base, -70, tPS_in);
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
    const pl3A = cl((tBP - 0.4) / 0.45) * cl(1 - tPS * 3);
    applyPanel(pPL3Ref, Math.max(l3L, -70), 70, pl3A);

    // Projects L2 strip — also fades out as tPS progresses
    const pl2A = cl((tBP - 0.35) / 0.5) * cl(1 - tPS * 3);
    applyPanel(pPL2Ref, l2L, l2W, pl2A);

    /* ── SHOWCASE ────────────────────────────
       1. REVEAL (tPS): Diagonal wipe entry
       2. STACK (tS_prog): Cards slide up
    ─────────────────────────────────────────*/
    if (pShowcaseRef.current) {
      const psEl = pShowcaseRef.current;
      const cards = psEl.querySelectorAll('.showcase-card');
      const totalCards = cards.length;

      // 1. Reveal (Diagonal Clip)
      // Driven by tPS (entry transition)
      if (tPS <= 1) {
        const tRev = easeOutCubic(tPS);
        const x1 = lerp(100, 0, tRev);
        const x2 = lerp(120, -20, tRev);
        psEl.style.clipPath = `polygon(${x1}% 0, 100% 0, 100% 100%, ${x2}% 100%)`;
      } else {
        psEl.style.clipPath = `polygon(0% 0, 100% 0, 100% 100%, 0% 100%)`;
      }

      // 2. Card Stacking
      // Driven by tS_prog (internal scroll)
      // We want Card 1 to enter, then Card 2, etc. (Card 0 is base)
      if (totalCards > 0) {
        // Normalized progress for stacking: 0 -> (N-1)
        const stackProg = tS_prog * (totalCards - 0.5);
        // * (totalCards - 0.5) ensures we can reach the end comfortably

        cards.forEach((card, i) => {
          let y = 0;    // Default position (visible)
          let scale = 1;
          let filter = 100; // brightness

          if (i === 0) {
            // Base card. Always visible (y=0).
            // Reacts (scales down) when Card 1 enters (stackProg > 0)
            if (stackProg > 0) {
              const depth = cl(stackProg); // 0 -> 1 as Card 1 enters
              scale = 1 - (depth * 0.05);
              filter = 100 - (depth * 20);
            }
          } else {
            // Subsequent cards (1, 2, 3...)
            // Enter when stackProg > i - 1
            // e.g. Card 1 enters when stackProg > 0 (0 to 1)
            // Card 2 enters when stackProg > 1 (1 to 2)

            const entryThreshold = i - 1;

            if (stackProg < entryThreshold) {
              // Not started entering yet
              y = 110; // Offscreen
            } else if (stackProg >= entryThreshold && stackProg < i) {
              // Currently Entering
              const entryP = easeOutCubic(stackProg - entryThreshold);
              y = lerp(110, 0, entryP);
            } else {
              // Fully Entered (stackProg > i)
              y = 0;

              // Scale down if NEXT card is entering
              // Next card (i+1) enters when stackProg > i
              const depth = cl(stackProg - i);
              scale = 1 - (depth * 0.05);
              filter = 100 - (depth * 20);
            }
          }

          // Apply styles
          card.style.transform = `translateY(${y}%) scale(${scale})`;
          card.style.filter = `brightness(${filter}%)`;
          card.style.zIndex = i + 10;
        });
      }

      // Exit/Fade out to Contact (tSC)
      if (tSC > 0) {
        psEl.style.opacity = cl(1 - tSC * 2);
        psEl.style.transform = `translateY(${tSC * -20}vh)`;
      } else {
        psEl.style.opacity = 1;
        psEl.style.transform = `translateY(0)`;
      }
    }

    /* ── CONTACT REVEAL ──────────────────────
       Simple fade-in of background and content
    ─────────────────────────────────────────*/

    // Background fade
    if (cDarkRef.current) {
      cDarkRef.current.style.opacity = tCO > 0 ? 1 : 0;
    }

    // Content fade & slide
    // We keep the slide direction: Dark slides up, Light slides down (or up, but we kept logic)
    // tCC is 0->1 based on scroll
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
      // Fix visual glitch line: hide completely when closed
      tyStageRef.current.style.visibility = tTY > 0 ? "visible" : "hidden";
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
        const sections = [heroRef, aboutRef, betweenRef, projRef, showcaseRef, contactRef, tyRef]
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
    // Spring physics state
    let tx = 0, ty = 0; // Target (mouse) position
    let x = 0, y = 0;   // Current ring position
    let vx = 0, vy = 0; // Velocity

    // Spring constants
    // Stiffness 0.1 (stronger pull) + Damping 0.8 (less friction) = smooth, continuous tracking
    const stiffness = 0.1;
    const damping = 0.8;

    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (curRef.current) {
        curRef.current.style.left = tx + "px";
        curRef.current.style.top = ty + "px";
      }
    };

    let rafId;
    const loop = () => {
      // Spring force: F = -k * displacement
      const dx = tx - x;
      const dy = ty - y;

      const ax = dx * stiffness;
      const ay = dy * stiffness;

      vx += ax;
      vy += ay;

      // Friction
      vx *= damping;
      vy *= damping;

      x += vx;
      y += vy;

      if (ringRef.current) {
        ringRef.current.style.left = x + "px";
        ringRef.current.style.top = y + "px";
      }

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    loop(); // Start the physics loop

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <GlobalCSS />
      <Cursor ref={{ curRef, ringRef }} />
      <ProgressBar prog={prog} />
      <Nav lenis={lenis} projRef={projRef} aboutRef={aboutRef} contactRef={contactRef} />
      <Layers ref={{ l1Ref, l2Ref, l3Ref }} />
      <Hero ref={pHeroRef} />
      <AboutStrip ref={pAL1Ref} />
      <AboutMain ref={pAL2Ref} />
      <Between ref={pBetRef} />
      <ProjectsList ref={pPL3Ref} />
      <ProjectsStrip ref={pPL2Ref} />
      <Showcase ref={pShowcaseRef} />
      <Contact ref={{ cDarkRef, cLightRef, cDarkContentRef, cLightContentRef }} />
      <ThankYou ref={tyStageRef} />
      <ScrollSpacers ref={{ heroRef, aboutRef, betweenRef, projRef, showcaseRef, contactRef, tyRef }} />
    </>
  );
}