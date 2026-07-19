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
      <h2 className="proj-h2">Selected Work — Proof Sheets</h2>
      <div className="proof-strip">
        <div className="proof-sprockets" aria-hidden="true" />
        <div className="proof-frames">
          {PROJECTS.map((p, i) => (
            <article
              key={p.n}
              className="proof-frame"
              style={{ zIndex: PROJECTS.length - i }}
            >
              <div className="proof-plate">
                <img src={p.img} alt={p.name} loading="lazy" />
                <span className="proof-frame-no">FRAME {p.n}</span>
              </div>
              <div className="proof-meta">
                <div className="proof-meta-head">
                  <span className="proof-tag">{p.tag}</span>
                </div>
                <h3 className="proof-name">{p.name}</h3>
                <p className="proof-desc">{p.desc}</p>
                <div className="proof-foot">
                  <span className="proof-stack">{p.stack}</span>
                  <a
                    className="proof-link"
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View project →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
});

ProjectsList.displayName = 'ProjectsList';

export default ProjectsList;
