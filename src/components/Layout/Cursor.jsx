import { forwardRef } from 'react';

const Cursor = forwardRef((props, ref) => {
  const { curRef, ringRef } = ref;
  return (
    <>
      <div className="cur" ref={curRef} />
      <div className="cur-ring" ref={ringRef} />
    </>
  );
});

Cursor.displayName = 'Cursor';

export default Cursor;
