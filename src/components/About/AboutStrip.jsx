import { forwardRef } from 'react';

const AboutStrip = forwardRef((props, ref) => {
  return (
    <div
      className="panel p-about-l1"
      ref={ref}
      data-reveal
      style={{ left: 0, width: "20vw", zIndex: 11, opacity: 0 }}
      role="region"
      aria-label="About"
    >
      <p className="strip-label">01 / About</p>
      <div className="strip-num">01</div>
      <div className="strip-role">Engineering intelligent products — interface to infrastructure.</div>
    </div>
  );
});

AboutStrip.displayName = 'AboutStrip';

export default AboutStrip;
