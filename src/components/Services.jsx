import React from 'react';
import TiltCard from './TiltCard';

export default function Services() {
  const servicesList = [
    {
      emoji: '⚙️',
      title: 'Backend Development',
      desc: 'Building reliable server-side architectures, enterprise application layers, and secure system logic designed to process data seamlessly.',
      colorClass: 'card-indigo',
      items: ['Spring Boot & Spring MVC', 'Servlet & JSP Architecture', 'Spring Security & Auth', 'Maven Build Lifecycle']
    },
    {
      emoji: '💻',
      title: 'Java Web Development',
      desc: 'Crafting responsive, clean, and interactive user interfaces using structured HTML/CSS styles, dynamic JSPs, and modular React components.',
      colorClass: 'card-blue',
      items: ['JSP Templates & Views', 'React Web UI Integration', 'Mobile-First Layouts', 'Micro-Animations']
    },
    {
      emoji: '💾',
      title: 'Database & API Design',
      desc: 'Designing structured relational schemas, writing optimized SQL queries, and drafting detailed RESTful endpoints.',
      colorClass: 'card-green',
      items: ['MySQL & DBMS Concepts', 'Relational Schema Design', 'Query Optimizations', 'RESTful API Contracts']
    }
  ];

  return (
    <section id="services">
      <div className="wrap">
        <div className="sl" data-n="02">services</div>
        <h2 className="st">What I <em>can do for you</em></h2>
        
        <div className="services-grid rv in">
          {servicesList.map((s, i) => (
            <TiltCard key={i} className={`sc-card ${s.colorClass}`}>
              <div className="sc-h">
                <span className="sc-ic">{s.emoji}</span>
                <h3 className="sc-title">{s.title}</h3>
              </div>
              <p className="sc-desc">{s.desc}</p>
              <div className="sc-list">
                {s.items.map((item, idx) => (
                  <div key={idx} className="sc-li">{item}</div>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
