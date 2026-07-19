import { forwardRef } from 'react';
import { DitheringShader } from '../ui/dithering-shader';

const Between = forwardRef((props, ref) => {
  return (
    <div
      className="panel p-between"
      ref={ref}
      style={{
        left: "100vw",
        width: "100vw",
        zIndex: 10,
        opacity: 0,
        justifyContent: "center",
        alignItems: "center",
        padding: "var(--padding-y) var(--padding-x)"
      }}
      role="region"
      aria-label="Highlights"
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: -1,
        opacity: 0.1,
        pointerEvents: 'none'
      }}>
        <DitheringShader 
          shape="ripple" 
          colorBack="#f0e9d6" 
          colorFront="#d4f53c" 
          pxSize={5}
          speed={0.3}
        />
      </div>
      <div className="between-bg-text">
        DESIGN&nbsp;&nbsp;DEVELOP&nbsp;&nbsp;SHIP&nbsp;&nbsp;REPEAT
      </div>
      <div className="between-idx" style={{ color: 'var(--text-dark)' }}>02 / Process</div>
      <div className="between-passes" style={{ color: 'var(--text-dark)' }}>
        <span className="pass"><i>01</i> Design</span>
        <span className="pass"><i>02</i> Develop</span>
        <span className="pass"><i>03</i> Ship</span>
      </div>
      <div className="between-sub" style={{ color: 'var(--text-dark)' }}>Web • AI/ML • Systems</div>
    </div>
  );
});

Between.displayName = 'Between';

export default Between;
