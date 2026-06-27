import React from 'react';
import TiltCard from './TiltCard';

export default function Skills() {
  const languages = [
    { name: 'Java', level: 'Primary', width: '86%' },
    { name: 'SQL', level: 'Comfortable', width: '80%' },
    { name: 'C', level: 'Comfortable', width: '75%', class: 'g' },
    { name: 'Python', level: 'Comfortable', width: '70%', class: 'a' },
  ];

  const databases = [
    { name: 'MySQL', level: 'Comfortable', width: '82%' },
    { name: 'DBMS Concepts', level: 'Comfortable', width: '80%', class: 'g' },
  ];

  const frameworks = [
    "Spring Boot", "Spring Framework", "Spring Security", 
    "Servlets", "JSP", "RESTful APIs", "MVC Architecture", "OOP / SOLID Design"
  ];

  const tools = [
    "IntelliJ IDEA", "VS Code", "Maven", "Git & GitHub", 
    "Pandas", "NumPy", "Matplotlib", "Operating Systems",
    "Data Structures", "Algorithms", "Relational Mapping"
  ];

  return (
    <section id="skills">
      <div className="wrap">
        <div className="sl" data-n="03">skills</div>
        <h2 className="st">My <em>tech stack</em></h2>
        
        <div className="sk-grid rv in">
          <TiltCard className="sg card-indigo">
            <div className="sg-h"><div className="sg-ic">⚙️</div>Languages</div>
            <div className="sk-bars">
              {languages.map((l) => (
                <div className="sb" key={l.name}>
                  <div className="sb-top">
                    <span className="sb-nm">{l.name}</span>
                    <span className="sb-lv">{l.level}</span>
                  </div>
                  <div className="sb-tr">
                    <div 
                      className={`sb-fi ${l.class || ''}`} 
                      style={{ width: l.width }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </TiltCard>
          
          <TiltCard className="sg card-blue">
            <div className="sg-h"><div className="sg-ic">🧩</div>Frameworks & Web Tech</div>
            <div className="tags">
              {frameworks.map((f, i) => (
                <span 
                  key={f} 
                  className="tag rv in" 
                  style={{ transitionDelay: `${i * 0.05}s` }}
                >
                  {f}
                </span>
              ))}
            </div>
          </TiltCard>
          
          <TiltCard className="sg card-green">
            <div className="sg-h"><div className="sg-ic">🗄️</div>Databases & Core</div>
            <div className="sk-bars">
              {databases.map((d) => (
                <div className="sb" key={d.name}>
                  <div className="sb-top">
                    <span className="sb-nm">{d.name}</span>
                    <span className="sb-lv">{d.level}</span>
                  </div>
                  <div className="sb-tr">
                    <div 
                      className={`sb-fi ${d.class || ''}`} 
                      style={{ width: d.width }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </TiltCard>
          
          <TiltCard className="sg card-amber">
            <div className="sg-h"><div className="sg-ic">🛠️</div>Tools & Libraries</div>
            <div className="tags">
              {tools.map((t, i) => (
                <span 
                  key={t} 
                  className="tag rv in" 
                  style={{ transitionDelay: `${i * 0.05}s` }}
                >
                  {t}
                </span>
              ))}
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
