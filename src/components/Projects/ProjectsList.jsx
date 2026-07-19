import { forwardRef } from 'react';
import { PROJECTS } from '../../utils/data';
import { DitheringShader } from '../ui/dithering-shader';

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
      role="region"
      aria-label="Selected work"
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: -1,
        opacity: 0.1,
        pointerEvents: 'none'
      }}>
        <DitheringShader 
          shape="dots" 
          colorBack="#d4f53c" 
          colorFront="#0c0c0c" 
          pxSize={3}
          speed={0.2}
        />
      </div>
      <h2 className="proj-h2">Selected Work</h2>
      <div className="proj-cards-container">
        {PROJECTS.map((p, i) => (
          <div
            key={p.n}
            className="proj-card-wrapper"
            style={{ zIndex: PROJECTS.length - i }}
          >
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-card"
            >
              <div className="proj-card-img">
                <img src={p.img} alt={p.name} />
              </div>
              <div className="proj-card-info">
                <div className="proj-card-header">
                   <span className="proj-card-n">{p.n}</span>
                   <span className="proj-card-tag">{p.tag}</span>
                </div>
                <h3 className="proj-card-title">{p.name}</h3>
                <p className="proj-card-desc">{p.desc}</p>
                <div className="proj-card-stack-text">{p.stack}</div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
});

ProjectsList.displayName = 'ProjectsList';

export default ProjectsList;
