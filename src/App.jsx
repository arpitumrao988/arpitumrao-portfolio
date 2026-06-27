import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Skills from './components/Skills';
import Journey from './components/Journey';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ConsoleWidget from './components/ConsoleWidget';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    // 1. Mouse coordinate tracking for 3D cursor-glows
    const handleGlobalMouseMove = (e) => {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);

    // 2. Scroll coordinate tracking for 3D parallax layers
    const handleScroll = () => {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 3. Magnetic button pull interaction
    const magneticElements = document.querySelectorAll('.btn-p, .btn-g, .hud-trigger, .nav-logo img, .ctrl-btn, .filter-btn');
    const handleMagneticMove = (e) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      // Soft drift pull toward mouse
      el.style.transform = `translate3d(${x * 0.25}px, ${y * 0.25}px, 0) scale(1.04)`;
      el.style.transition = 'none';
    };
    const handleMagneticLeave = (e) => {
      const el = e.currentTarget;
      el.style.transform = '';
      el.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
    };
    magneticElements.forEach(el => {
      el.addEventListener('mousemove', handleMagneticMove);
      el.addEventListener('mouseleave', handleMagneticLeave);
    });

    // 4. Sci-Fi Text Decrypt/Scramble Effect
    const scrambleLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    const scrambleElements = document.querySelectorAll('.st, .sl, .ptitle');
    const handleScramble = (e) => {
      const target = e.currentTarget;
      let iteration = 0;
      const originalText = target.dataset.value || target.innerText;
      if (!target.dataset.value) target.dataset.value = originalText;

      clearInterval(target.scrambleInterval);
      target.scrambleInterval = setInterval(() => {
        target.innerText = originalText
          .split("")
          .map((char, index) => {
            if (index < iteration) return originalText[index];
            if (char === " ") return " ";
            return scrambleLetters[Math.floor(Math.random() * scrambleLetters.length)];
          })
          .join("");

        if (iteration >= originalText.length) {
          clearInterval(target.scrambleInterval);
        }
        iteration += 1 / 3;
      }, 25);
    };
    scrambleElements.forEach(el => {
      el.addEventListener('mouseenter', handleScramble);
    });

    // 5. Scroll active section highlighting observer
    const sections = ['hero', 'about', 'services', 'skills', 'journey', 'projects', 'contact'];
    
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25, rootMargin: '-10% 0px -40% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    // 6. Scroll reveal animations observer
    const revealElements = document.querySelectorAll('.rv');
    
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('scroll', handleScroll);
      magneticElements.forEach(el => {
        el.removeEventListener('mousemove', handleMagneticMove);
        el.removeEventListener('mouseleave', handleMagneticLeave);
      });
      scrambleElements.forEach(el => {
        el.removeEventListener('mouseenter', handleScramble);
      });
      sectionObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Decorative premium light theme glowing backdrops */}
      <div className="glowing-orb orb-1"></div>
      <div className="glowing-orb orb-2"></div>
      <div className="glowing-orb orb-3"></div>

      <Navbar activeSection={activeSection} />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Journey />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ConsoleWidget />
    </>
  );
}
