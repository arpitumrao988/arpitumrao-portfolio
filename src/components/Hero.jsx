import React from 'react';
import Terminal from './Terminal';
import TiltCard from './TiltCard';

export default function Hero() {
  const stack = ["Java", "Spring Boot", "MySQL", "REST APIs", "Maven", "Git"];

  const marqueeItems = [
    "Backend Engine", "Database Schemas", "Docker Containers", 
    "API Architecture", "Speed & Scalability", "REST Services", 
    "Data Security", "Clean Server Logic"
  ];

  return (
    <section id="hero">
      {/* Decorative 3D Wireframe floating shapes */}
      <svg className="shape-float" width="220" height="220" viewBox="0 0 100 100" style={{ right: '5%', top: '15%', animationDuration: '25s' }}>
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1.5,1.5" />
        <ellipse cx="50" cy="50" rx="40" ry="15" stroke="currentColor" strokeWidth="0.5" />
        <ellipse cx="50" cy="50" rx="15" ry="40" stroke="currentColor" strokeWidth="0.5" />
        <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,1" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,1" />
      </svg>
      <svg className="shape-float" width="140" height="140" viewBox="0 0 100 100" style={{ left: '5%', bottom: '10%', animationDuration: '35s' }}>
        <polygon points="50,15 90,85 10,85" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
        <circle cx="50" cy="55" r="20" stroke="currentColor" strokeWidth="0.5" />
      </svg>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-tag">Available · Open to Work</div>
        <h1 className="h1">Arpit Umrao</h1>
        <p className="h-sub">Backend Developer</p>
        <p className="h-bio">
          A passionate Computer Science fresher who loves building reliable, clean server-side systems — REST APIs, efficient databases, and the logic that powers great products.
        </p>
        
        <div className="h-btns">
          <a href="#projects" className="btn-p">
            View Projects 
            <svg viewBox="0 0 24 24" width="14" height="14" style={{ marginLeft: '4px' }}>
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
          <a href="#contact" className="btn-g">Get In Touch</a>
        </div>
        
        <div className="h-stack">
          {stack.map((item) => (
            <span key={item} className="stk">{item}</span>
          ))}
        </div>
      </div>
      
      <div className="hero-right" style={{ position: 'relative', zIndex: 1 }}>
        <TiltCard className="term-tilt">
          <Terminal />
        </TiltCard>
      </div>
    </section>
  );
}
