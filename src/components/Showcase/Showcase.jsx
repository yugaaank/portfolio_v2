import React, { forwardRef } from 'react';
import { PROJECTS } from '../../utils/data';

const Showcase = forwardRef((props, ref) => {
    return (
        <div className="showcase-panel" ref={ref}>
            {/* Static intro text that stays or fades out */}
            <div className="showcase-intro-static">
                <h2>Selected Works</h2>
                <p>2023 — Present</p>
            </div>

            <div className="showcase-stage">
                {/* Projects */}
                {PROJECTS.map((p, i) => (
                    <div key={i} className="showcase-card">
                        <div className="card-inner">
                            <div className="card-img-wrap">
                                <img src={p.img} alt={p.name} className="card-img" />
                            </div>
                            <div className="card-content">
                                <span className="card-n">{p.n}</span>
                                <h3>{p.name}</h3>
                                <p className="card-desc">{p.desc}</p>
                                <div className="card-meta">
                                    <span className="card-stack">{p.stack}</span>
                                    <a href={p.link} target="_blank" rel="noreferrer" className="card-link">View ↗</a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

Showcase.displayName = 'Showcase';

export default Showcase;
