import { forwardRef } from 'react';

const Layers = forwardRef((props, ref) => {
  const { l1Ref, l2Ref, l3Ref } = ref;
  return (
    <>
      <div
        className="layer l1"
        ref={l1Ref}
        style={{ left: "0", width: "100vw" }}
      />
      <div
        className="layer l2"
        ref={l2Ref}
        style={{ left: "100vw", width: "0" }}
      />
      <div
        className="layer l3"
        ref={l3Ref}
        style={{ left: "-70vw", width: "70vw" }}
      />
    </>
  );
});

Layers.displayName = 'Layers';

export default Layers;
