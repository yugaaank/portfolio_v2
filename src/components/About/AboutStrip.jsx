import { forwardRef } from 'react';

const AboutStrip = forwardRef((props, ref) => {
  return (
    <div
      className="panel p-about-l1"
      ref={ref}
      style={{ left: 0, width: "20vw", zIndex: 11, opacity: 0 }}
    >
      <p className="strip-label">01 / About</p>
      <div className="strip-num">01</div>
      <div className="strip-role">Designer & Developer</div>
    </div>
  );
});

AboutStrip.displayName = 'AboutStrip';

export default AboutStrip;
