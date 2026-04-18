import { forwardRef } from 'react';
import { DitheringShader } from '../ui/dithering-shader';

const SKILLS = [
  "HTML", "CSS", "JavaScript", "TypeScript",
  "React", "Next.js", "Node.js", "Express",
  "MongoDB", "MySQL", "Java", "C",
  "Linux", "Framer Motion", "GSAP"
];

const AboutMain = forwardRef((props, ref) => {
  return (
    <div
      className="panel p-about-l2"
      ref={ref}
      style={{ left: "100vw", width: "80vw", zIndex: 10, opacity: 0 }}
    >
      <div style={{
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
      <h2 className="about-h2">
        Designer & Developer —
        <br />
        Building things that matter.
      </h2>
      <p className="about-body">
        I’m a Computer Science student specializing in Artificial Intelligence & Machine Learning, focused on building performant web applications, intelligent systems, and experimental developer tools. I work across frontend, backend, and system design — blending engineering with product thinking.
      </p>
      <div className="skills">
        {SKILLS.map((s) => (
          <span className="skill" key={s}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
});

AboutMain.displayName = 'AboutMain';

export default AboutMain;
