import { forwardRef } from 'react';

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
      }}
    >
      <div className="between-bg-text">
        DESIGN&nbsp;&nbsp;DEVELOP&nbsp;&nbsp;SHIP&nbsp;&nbsp;REPEAT
      </div>
      <div className="between-stat">15+</div>
      <div className="between-lbl">Projects Built</div>
      <div className="between-sub">Web • AI/ML • Systems</div>
    </div>
  );
});

Between.displayName = 'Between';

export default Between;
