import { forwardRef } from 'react';
import Scene from './Scene';

const Hero = forwardRef((props, ref) => {
  return (
    <div
      className="panel p-hero"
      ref={ref}
      style={{ left: 0, width: "100vw", zIndex: 11 }}
    >
      <Scene />
      <p className="hero-tag">Full-Stack Developer & AI/ML Engineer</p>
      <h1 className="hero-title">
        YUGANK
        <br />
        RATHORE
        <div className="hero-invert-circle" />
      </h1>
      <p className="hero-sub">
        Designing and engineering intelligent digital products — from interface to infrastructure — with precision, performance, and purpose.
      </p>
      <p className="hero-hint">↓ Scroll to explore</p>
    </div>
  );
});

Hero.displayName = 'Hero';

export default Hero;
