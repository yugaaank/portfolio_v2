import { forwardRef } from 'react';
import { DitheringShader } from '../ui/dithering-shader';

const SKILLS = {
  core: ["AI / ML", "Python", "Systems", "React", "Node.js"],
  also: ["TypeScript", "Next.js", "Rust", "Linux", "Postgres", "C / C++"],
};

const AboutMain = forwardRef((props, ref) => {
  return (
    <div
      className="panel p-about-l2"
      ref={ref}
      data-reveal
      id="about"
      style={{ left: "100vw", width: "80vw", zIndex: 10, opacity: 0 }}
      role="region"
      aria-label="About"
    >
      <div className="shader-layer" style={{
        position: 'absolute',
        inset: 0,
        zIndex: -1,
        opacity: 0.15,
        pointerEvents: 'none'
      }}>
        <DitheringShader 
          shape="warp" 
          colorBack="#f0e9d6" 
          colorFront="#0c0c0c" 
          pxSize={2}
          speed={0.4}
        />
      </div>
      <p className="m-index">01 — About</p>
      <h2 className="about-h2">
        Designer & Developer —
        <br />
        Building things that matter.
      </h2>
      <p className="about-body">
        I’m a Computer Science student specializing in Artificial Intelligence & Machine Learning, focused on building performant web applications, intelligent systems, and experimental developer tools. I work across frontend, backend, and system design — blending engineering with product thinking.
      </p>
      <div className="skills">
        <div className="skill-group">
          <span className="skill-tag">Core</span>
          {SKILLS.core.map((s) => (
            <span className="skill skill-core" key={s}>{s}</span>
          ))}
        </div>
        <div className="skill-group">
          <span className="skill-tag">Also</span>
          {SKILLS.also.map((s) => (
            <span className="skill" key={s}>{s}</span>
          ))}
        </div>
      </div>
      <hr className="m-divider" aria-hidden="true"><span>01</span></hr>
    </div>
  );
});

AboutMain.displayName = 'AboutMain';

export default AboutMain;
