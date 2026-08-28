import { forwardRef } from 'react';

const ProjectsStrip = forwardRef((props, ref) => {
  return (
    <div
      className="panel p-proj-l2"
      ref={ref}
      data-reveal
      style={{
        left: "100vw",
        width: "30vw",
        zIndex: 10,
        opacity: 0,
        color: "#0c0c0c",
      }}
      role="region"
      aria-label="Selected work"
    >
      <div>
        <p className="m-index">03 — Selected Work</p>
        <div className="contact-num">03</div>
      </div>
      <div>
        <p className="contact-cta">
          Crafting
          <br />
          digital
          <br />
          experiences.
        </p>
        <div style={{ marginTop: '2rem' }}>
          <p style={{ fontSize: '0.8rem', opacity: 0.5, marginBottom: '0.5rem', letterSpacing: '0.1em' }}>REACH OUT</p>
          <a className="contact-link" href="mailto:yugaankrathore0@gmail.com">
            yugaankrathore0@gmail.com
          </a>
          <a className="contact-link" href="https://github.com/yugaaank" target="_blank" rel="noopener noreferrer" style={{ border: 'none', color: '#0c0c0c', opacity: 0.6 }}>
            VIEW ALL REPOS →
          </a>
        </div>
      </div>
      <div className="m-divider" aria-hidden="true"><span>03</span></div>
    </div>
  );
});

ProjectsStrip.displayName = 'ProjectsStrip';

export default ProjectsStrip;
