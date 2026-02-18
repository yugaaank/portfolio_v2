import React, { forwardRef } from 'react';
import ContactFracture from './ContactFracture';
import ContactSeam from './ContactSeam';
import ContactDarkContent from './ContactDarkContent';
import ContactLightContent from './ContactLightContent';

const Contact = forwardRef((props, ref) => {
  const { cDarkRef, cLightRef, cSeamRef, cSeamLabelRef, cDarkContentRef, cLightContentRef } = ref;

  return (
    <>
      <ContactFracture ref={{ cDarkRef, cLightRef }} />
      <ContactDarkContent ref={cDarkContentRef} />
      <ContactLightContent ref={cLightContentRef} />
    </>
  );
});

Contact.displayName = 'Contact';

export default Contact;
