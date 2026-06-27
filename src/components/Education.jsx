import React from 'react';
import TiltCard from './TiltCard';

export default function Education() {
  const certifications = [
    { title: 'The Complete Python Bootcamp', issuer: 'Udemy · 2023' },
    { title: 'Node.js, Express, MongoDB Bootcamp', issuer: 'Udemy · 2023' },
    { title: 'SQL for Data Science', issuer: 'Coursera · 2022' },
    { title: 'Docker for Beginners', issuer: 'freeCodeCamp · 2024' },
  ];

  const selfLearning = [
    { emoji: '📖', title: 'System Design Primer', desc: 'GitHub repo for learning distributed systems concepts' },
    { emoji: '💻', title: 'LeetCode', desc: 'Regular DSA practice · 80+ problems solved' },
    { emoji: '🎧', title: 'Engineering Podcasts', desc: 'Hussein Nasser, Software Engineering Daily' },
    { emoji: '📝', title: 'Technical Blogs', desc: 'Dev.to, Medium, Hashnode — backend & architecture' },
  ];

  return (
    <section id="education">
      <div className="wrap">
        <div className="sl" data-n="05">education</div>
        <h2 className="st">My <em>academic journey</em></h2>

        <TiltCard className="edu-main rv in">
          <div className="edu-l">
            <div className="edu-yr">2024 – 2028</div>
            <div className="edu-em">🎓</div>
          </div>
          <div>
            <span className="edu-type">Bachelor's Degree</span>
            <h3 className="edu-deg">B.Tech in Computer Science & Engineering (Data Science)</h3>
            <p className="edu-inst">Pranveer Singh Institute of Technology · Kanpur, Uttar Pradesh</p>
            <div className="edu-stats">
              <div className="es">
                <span className="esn">9.2</span>
                <span className="esl">CGPA / 10</span>
              </div>
              <div className="es">
                <span className="esn">2026(3rd)</span>
                <span className="esl">Graduation Year</span>
              </div>
            </div>
            <p className="cl">Key Courses</p>
            <div className="ctags">
              {[
                "Data Structures & Algorithms", "Database Management Systems",
                "Operating Systems", "Computer Networks",
                "Software Engineering", "OOP",
                "Web Technologies", "Cloud Computing (elective)"
              ].map((course) => (
                <span key={course} className="ct">{course}</span>
              ))}
            </div>
          </div>
        </TiltCard>

        <div className="edu-2 rv in">
          <TiltCard className="sch">
            <span className="sy">2020</span>
            <div className="sl3">Class XII (PCM)</div>
            <div className="si">[School Name], Kanpur</div>
            <div className="sp">Percentage: 85%</div>
          </TiltCard>
          <TiltCard className="sch">
            <span className="sy">2018</span>
            <div className="sl3">Class X</div>
            <div className="si">[School Name], Kanpur</div>
            <div className="sp">Percentage: 90%</div>
          </TiltCard>
        </div>

        <div className="sl" data-n="↳" style={{ marginBottom: '14px' }}>Certifications</div>
        <div className="cert-list rv in">
          {certifications.map((c, i) => (
            <TiltCard key={i} className="cert">
              <span className="ci2">📜</span>
              <div className="cn-wrap">
                <span className="cn">{c.title}</span>
                <span className="ciss">{c.issuer}</span>
              </div>
              <a href="#" className="cv" onClick={(e) => e.preventDefault()}>View →</a>
            </TiltCard>
          ))}
        </div>

        <div className="sl" data-n="↳" style={{ margin: '24px 0 14px' }}>Self-Learning</div>
        <div className="lg rv in">
          {selfLearning.map((item, i) => (
            <TiltCard key={i} className="lgc">
              <div className="lgi">{item.emoji}</div>
              <div className="lgt">{item.title}</div>
              <div className="lgd">{item.desc}</div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
