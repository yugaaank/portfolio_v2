import React from 'react';

const Nav = ({ lenis, heroRef, projRef, aboutRef, contactRef }) => {
  const scrollTo = (ref) => {
    if (!ref.current) return;
    lenis?.scrollTo(ref.current, { 
      duration: 2.5, 
      easing: (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2 
    });
  };

  const scrollToContact = () => {
    if (!contactRef.current) return;
    lenis?.scrollTo(contactRef.current.offsetTop + window.innerHeight * 1.5, { 
      duration: 2.5, 
      easing: (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2 
    });
  };

  return (
    <nav>
      <div 
        className="nav-logo" 
        style={{ cursor: 'pointer', fontFamily: 'var(--font-heading)' }} 
        onClick={() => scrollTo(heroRef)}
      >
        YUGANK
      </div>
      <ul className="nav-links">
        <li>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo(aboutRef); }}>About</a>
        </li>
        <li>
          <a href="#work" onClick={(e) => { e.preventDefault(); scrollTo(projRef); }}>Work</a>
        </li>
        <li>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToContact(); }}>Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
