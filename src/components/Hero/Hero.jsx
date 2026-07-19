import { forwardRef, useState } from 'react';
import Scene from './Scene';

const Hero = forwardRef((props, ref) => {
  // Skip the WebGL shader + mouse-driven scene on touch / coarse pointers.
  const [showShader] = useState(
    () => !(window.matchMedia && window.matchMedia('(pointer: coarse)').matches)
  );

  return (
    <div
      className="panel p-hero"
      ref={ref}
      style={{ left: 0, width: "100vw", zIndex: 11 }}
      role="region"
      aria-label="Intro"
    >
      <div className="hero-container">
        <div className="hero-text-block">
          <p className="hero-index">00 / Intro</p>
          <p className="hero-tag">Full-Stack Developer & AI/ML Engineer</p>
          <h1 className="hero-title">
            YUGANK
            <span className="line-2">RATHORE</span>
          </h1>
          <p className="hero-sub">
            Designing and engineering intelligent digital products — from interface to infrastructure — with precision, performance, and purpose.
          </p>
          <p className="hero-hint">↓ Scroll to explore</p>
        </div>

        {showShader && (
          <div className="hero-visual-block">
            <Scene />
          </div>
        )}
      </div>
    </div>
  );
});

Hero.displayName = 'Hero';

export default Hero;
