import React from 'react';
import TiltCard from './TiltCard';

export default function About() {
  const values = [
    { emoji: '🔍', title: 'Detail-Oriented', desc: 'I care about edge cases, error handling, and clean code — not just making it work.', colorClass: 'card-indigo' },
    { emoji: '📚', title: 'Always Learning', desc: 'I follow engineering blogs, read docs, and build side projects to keep growing.', colorClass: 'card-green' },
    { emoji: '🤝', title: 'Team Player', desc: 'I communicate clearly, take feedback well, and enjoy collaborating on hard problems.', colorClass: 'card-blue' },
    { emoji: '⚙️', title: 'Systems Thinker', desc: 'I think in architecture and data flow — not just individual functions.', colorClass: 'card-amber' },
  ];

  const stats = [
    { num: '3', label: 'Projects Built' },
    { num: '4', label: 'Languages' },
    { num: '∞', label: 'Bugs Debugged' },
    { num: '1', label: 'Goal: Real Products' },
  ];

  return (
    <section id="about">
      <div className="wrap">
        <div className="sl" data-n="01">about me</div>
        <h2 className="st">The person <em>behind the code</em></h2>
        
        <div className="about-grid rv in">
          <div className="av-col">
            <div className="av">
              <img src="/image1.png" alt="Arpit Umrao" />
            </div>
            <TiltCard className="id-card">
              <div className="id-row"><span className="ik">name</span><span className="iv">Arpit Umrao</span></div>
              <div className="id-row"><span className="ik">role</span><span className="iv">Backend Developer</span></div>
              <div className="id-row"><span className="ik">location</span><span className="iv">Kanpur, UP</span></div>
              <div className="id-row"><span className="ik">type</span><span className="iv">Student · 2028 Grad</span></div>
              <div className="id-row">
                <span className="ik">status</span>
                <span className="iv live"><span className="gd"></span>Open to Work</span>
              </div>
            </TiltCard>
          </div>
          
          <div>
            <div className="about-txt">
              <p>I'm a Computer Science undergraduate at Pranveer Singh Institute of Technology, Kanpur (Class of 2028), specializing in Java backend development. I love the challenge of building reliable enterprise systems, structured databases, and clean server-side logic that operates seamlessly under the hood.</p>
              <p>Through my coursework and active projects, I build RESTful APIs using Spring Boot, design relational database schemas, and work with enterprise Java technologies like Servlets, JSP, and Spring Security. I also utilize Python for data analysis (Pandas, NumPy) to establish a solid foundation in software patterns and system design.</p>
              <p>I'm actively looking for internship opportunities and developer roles where I can contribute to core server engines, write clean Java code, and grow alongside senior engineers.</p>
            </div>
            
            <div className="vals">
              {values.map((v, i) => (
                <TiltCard key={i} className={`vc rv in ${v.colorClass}`} style={{ transitionDelay: `${i * 0.05}s` }}>
                  <div className="vi">{v.emoji}</div>
                  <div className="vt">{v.title}</div>
                  <div className="vd">{v.desc}</div>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
        
        <div className="stats-row rv in" style={{ marginTop: '30px' }}>
          {stats.map((s, i) => (
            <div key={i} className="sc">
              <div className="sn">{s.num}</div>
              <div className="sl2">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
