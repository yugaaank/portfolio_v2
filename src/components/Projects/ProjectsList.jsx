import { forwardRef } from 'react';

import { PROJECTS } from '../../utils/data';

const ProjectsList = forwardRef((props, ref) => {
  return (
    <div
      className="panel p-proj-l3"
      ref={ref}
      style={{
        left: "-70vw",
        width: "70vw",
        zIndex: 9,
        opacity: 0,
        color: "#0c0c0c",
      }}
    >
      <h2 className="proj-h2">Selected Work</h2>
      <div>
        {PROJECTS.map((p) => (
          <a
            key={p.n}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-item"
            style={{ textDecoration: 'none', color: 'inherit', display: 'grid' }}
          >
            <span className="proj-n">{p.n}</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <span className="proj-name">{p.name}</span>
              <span style={{ fontSize: '1rem', opacity: 0.5 }}>{p.desc}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem' }}>
              <span className="proj-tag">{p.tag}</span>
              <span style={{ fontSize: '0.85rem', opacity: 0.4 }}>{p.stack}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
});

ProjectsList.displayName = 'ProjectsList';

export default ProjectsList;
