import { forwardRef } from 'react';

const ProjectsStrip = forwardRef((props, ref) => {
  return (
    <div
      className="panel p-proj-l2"
      ref={ref}
      style={{
        left: "100vw",
        width: "30vw",
        zIndex: 10,
        opacity: 0,
        color: "#0c0c0c",
      }}
    >
      <div>
        <p className="strip-label" style={{ color: "#0c0c0c" }}>
          03 / Work
        </p>
        <div className="contact-num">03</div>
      </div>
      <div>
        <p className="contact-cta">
          Let's build
          <br />
          something
          <br />
          great.
        </p>
        <a className="contact-link" href="mailto:yugaaank.dev@gmail.com">
          yugaaank.dev@gmail.com
        </a>
        <a className="contact-link" href="mailto:yugaaank.dev@gmail.com">
          WORK WITH ME →
        </a>
      </div>
    </div>
  );
});

ProjectsStrip.displayName = 'ProjectsStrip';

export default ProjectsStrip;
