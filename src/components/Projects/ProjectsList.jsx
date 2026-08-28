import { forwardRef } from 'react';
import { PROJECTS } from '../../utils/data';
import { DitheringShader } from '../ui/dithering-shader';

const ProjectsList = forwardRef((props, ref) => {
  return (
    <div
      className="panel p-proj-l3 dither-accent"
      ref={ref}
      data-reveal
      id="work"
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
      <div className="shader-layer" style={{
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
      <p className="m-index">03 — Selected Work</p>
      <h2 className="proj-h2">Selected Work — Proof Sheets</h2>
      <div className="proof-strip">
        <div className="proof-sprockets" aria-hidden="true" />
        <div className="proof-frames">
          {PROJECTS.map((p, i) => (
            <article
              key={p.n}
              className="proof-frame"
              data-reveal
              style={{ zIndex: PROJECTS.length - i }}
            >
              <div className="proof-plate">
                <span className="proof-plate-mark">{p.name}</span>
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
      <div className="m-divider" aria-hidden="true"><span>03</span></div>
    </div>
  );
});

ProjectsList.displayName = 'ProjectsList';

export default ProjectsList;
