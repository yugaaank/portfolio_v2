import { forwardRef } from 'react';

const ContactLightContent = forwardRef((props, ref) => {
  return (
    <div className="cfrac-light-content" ref={ref}>
      <p className="cfrac-light-label">Send a message</p>
      <a className="cfrac-email" href="mailto:yugaankrathore0@gmail.com">
        yugaankrathore0@gmail.com
      </a>
      <div className="cfrac-socials">
        <a className="cfrac-social" href="https://github.com/yugaaank" target="_blank" rel="noopener noreferrer">
          GitHub ↗
        </a>
        <a className="cfrac-social" href="https://www.linkedin.com/in/yugank-rathore-617614317/" target="_blank" rel="noopener noreferrer">
          LinkedIn ↗
        </a>
      </div>
    </div>
  );
});

ContactLightContent.displayName = 'ContactLightContent';

export default ContactLightContent;
