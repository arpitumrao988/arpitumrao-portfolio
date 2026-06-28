import React, { useState, useRef } from 'react';
import { playHapticSound } from './ConsoleWidget';

export default function Navbar({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  const navLinks = [
    { href: '#hero', label: 'home' },
    { href: '#about', label: 'about' },
    { href: '#services', label: 'services' },
    { href: '#skills', label: 'skills' },
    { href: '#journey', label: 'journey' },
    { href: '#projects', label: 'projects' },
  ];

  const handleLinkClick = () => {
    playHapticSound('click');
    setIsOpen(false);
  };

  const handleBurgerClick = () => {
    playHapticSound('beep');
    setIsOpen(!isOpen);
  };

  const handleMouseMove = (e) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    navRef.current.style.setProperty('--mouse-x', `${x}px`);
    navRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <nav 
      id="nav" 
      ref={navRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => playHapticSound('hover')}
    >
      <a href="#hero" className="nav-logo" onClick={() => playHapticSound('click')}>
        <img src="/logo.png" alt="Logo" />
      </a>
      
      <ul className={`nav-links ${isOpen ? 'open' : ''}`} id="navLinks">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={`nl ${activeSection === link.href.slice(1) ? 'on' : ''}`}
              onClick={handleLinkClick}
              onMouseEnter={() => playHapticSound('hover')}
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#contact"
            className={`nl cta ${activeSection === 'contact' ? 'on' : ''}`}
            onClick={handleLinkClick}
            onMouseEnter={() => playHapticSound('hover')}
          >
            contact
          </a>
        </li>
      </ul>
      
      <button
        className="burger"
        id="burger"
        onClick={handleBurgerClick}
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}
