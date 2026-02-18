import { forwardRef } from 'react';

const ContactSeam = forwardRef((props, ref) => {
  const { cSeamRef, cSeamLabelRef } = ref;
  return (
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
  );
});

ContactSeam.displayName = 'ContactSeam';

export default ContactSeam;
