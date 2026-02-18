import { forwardRef } from 'react';

const ScrollSpacers = forwardRef((props, ref) => {
  const { heroRef, aboutRef, betweenRef, projRef, showcaseRef, contactRef, tyRef } = ref;
  return (
    <div style={{ position: "relative", zIndex: 0 }}>
      <div className="s s-hero" ref={heroRef} />
      <div className="s s-about" ref={aboutRef} />
      <div className="s s-between" ref={betweenRef} />
      <div className="s s-proj" ref={projRef} />
      <div className="s s-showcase" ref={showcaseRef} />
      <div className="s s-contact" ref={contactRef} />
      <div className="s s-thankyou" ref={tyRef} />
    </div>
  );
});

ScrollSpacers.displayName = 'ScrollSpacers';

export default ScrollSpacers;
