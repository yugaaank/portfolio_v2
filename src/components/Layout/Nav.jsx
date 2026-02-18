import React from 'react';

const Nav = ({ lenis, projRef, aboutRef, contactRef }) => {
  return (
    <nav>
      <div className="nav-logo">YUGAANK</div>
      <ul className="nav-links">
        <li>
          <a href="#work" onClick={(e) => { e.preventDefault(); lenis?.scrollTo(projRef.current, { duration: 2, easing: (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2 }); }}>Work</a>
        </li>
        <li>
          <a href="#about" onClick={(e) => { e.preventDefault(); lenis?.scrollTo(aboutRef.current, { duration: 2, easing: (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2 }); }}>About</a>
        </li>
        <li>
          <a href="#contact" onClick={(e) => { e.preventDefault(); lenis?.scrollTo(contactRef.current.offsetTop + window.innerHeight * 1.5, { duration: 2, easing: (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2 }); }}>Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
