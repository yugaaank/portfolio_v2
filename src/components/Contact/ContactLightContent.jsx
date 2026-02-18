import { forwardRef } from 'react';

const ContactLightContent = forwardRef((props, ref) => {
  return (
    <div className="cfrac-light-content" ref={ref}>
      <p className="cfrac-light-label">Send a message</p>
      <a className="cfrac-email" href="mailto:yugaaank.dev@gmail.com">
        yugaaank.dev@gmail.com
      </a>
      <div className="cfrac-socials">
        <a className="cfrac-social" href="https://github.com/yugaaank" target="_blank">
          GitHub ↗
        </a>
        <a className="cfrac-social" href="#">
          LinkedIn ↗
        </a>
        <a className="cfrac-social" href="#">
          Twitter ↗
        </a>
      </div>
    </div>
  );
});

ContactLightContent.displayName = 'ContactLightContent';

export default ContactLightContent;
