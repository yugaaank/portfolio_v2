import { forwardRef } from 'react';

const Hero = forwardRef((props, ref) => {
  return (
    <div
      className="panel p-hero"
      ref={ref}
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
  );
});

Hero.displayName = 'Hero';

export default Hero;
