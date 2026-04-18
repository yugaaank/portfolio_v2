import React, { forwardRef } from 'react';
import ContactFracture from './ContactFracture';
import ContactDarkContent from './ContactDarkContent';
import ContactLightContent from './ContactLightContent';
import { DitheringShader } from '../ui/dithering-shader';

const Contact = forwardRef((props, ref) => {
  const { cDarkRef, cLightRef, cDarkContentRef, cLightContentRef } = ref;

  return (
    <>
      <div 
        ref={cDarkRef}
        className="cfrac-dark"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 20,
          opacity: 0,
          pointerEvents: 'none'
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          opacity: 0.2
        }}>
          <DitheringShader 
            shape="simplex" 
            colorBack="#0c0c0c" 
            colorFront="#ffffff" 
            pxSize={4}
            speed={0.5}
          />
        </div>
      </div>
      <ContactDarkContent ref={cDarkContentRef} />
      <ContactLightContent ref={cLightContentRef} />
    </>
  );
});

Contact.displayName = 'Contact';

export default Contact;
