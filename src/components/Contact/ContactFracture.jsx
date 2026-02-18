import { forwardRef } from 'react';

const ContactFracture = forwardRef((props, ref) => {
  const { cDarkRef, cLightRef } = ref;
  return (
    <>
      {/* Dark background (full screen) */}
      <div className="cfrac-dark" ref={cDarkRef} style={{ opacity: 0 }} />
    </>
  );
});

ContactFracture.displayName = 'ContactFracture';

export default ContactFracture;
