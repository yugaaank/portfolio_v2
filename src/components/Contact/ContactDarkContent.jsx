import { forwardRef } from 'react';

const ContactDarkContent = forwardRef((props, ref) => {
  return (
    <div className="cfrac-dark-content" ref={ref} id="contact" role="region" aria-label="Contact" data-reveal>
      <p className="m-index">04 — Contact — Let's collaborate</p>
      <h2 className="cfrac-big">
        Got a project
        <br />
        in mind?
      </h2>
      <p className="cfrac-body">
        Whether it's a full product build, a design system, or a brand that
        needs to move — I'm ready to make it real. Let's start a conversation.
      </p>
      <div className="cfrac-avail">
        <span className="avail-dot" />
        Currently available for internships & collaborations
      </div>
      <hr className="m-divider" aria-hidden="true"><span>04</span></hr>
    </div>
  );
});

ContactDarkContent.displayName = 'ContactDarkContent';

export default ContactDarkContent;
