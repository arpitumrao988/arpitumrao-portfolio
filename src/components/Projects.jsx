import React, { useState } from 'react';
import TiltCard from './TiltCard';
import { playHapticSound } from './ConsoleWidget';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [view, setView] = useState('grid'); // 'grid' or 'list'

  const projectsList = [
    {
      num: '01',
      title: 'SmartCropAdvisor',
      desc: 'An intelligent crop recommendation system using Machine Learning. Leverages a Java & Spring Boot backend server, a Python AI model for ML predictions, and a React frontend to recommend optimal crops based on soil metrics (N, P, K, pH) and weather parameters.',
      learned: 'Connecting a Java/Spring Boot backend with a Python AI module, building modular React interfaces, and handling cross-platform payloads.',
      tags: ['Java', 'Spring Boot', 'React', 'Python', 'Scikit-learn'],
      category: 'Java',
      featured: true,
      github: 'https://github.com/arpitumrao988',
      colorClass: 'card-green'
    },
    {
      num: '02',
      title: 'Book Recommendation System',
      desc: 'An recommendation engine offering tailored book suggestions. Built with a Java & Spring Boot backend to manage ratings and user schemas, paired with a Python machine learning engine using Content-Based and Collaborative filtering.',
      learned: 'Creating relational SQL schemas for ratings, utilizing TF-IDF vectorization/Cosine similarity in Python, and routing requests.',
      tags: ['Java', 'Spring Boot', 'Python', 'Pandas', 'MySQL'],
      category: 'Java',
      featured: true,
      github: 'https://github.com/arpitumrao988',
      colorClass: 'card-blue'
    },
    {
      num: '03',
      title: 'Portfolio Website',
      desc: 'A component-based, highly responsive developer portfolio website designed with a sophisticated, professional light tech theme.',
      learned: 'React state management, component modularization, live client-side API integrations, CSS custom properties.',
      tags: ['React', 'Vite', 'CSS', 'JavaScript'],
      category: 'React',
      featured: false,
      github: 'https://github.com/arpitumrao988',
      colorClass: 'card-purple'
    }
  ];

  const handleFilterChange = (newFilter) => {
    playHapticSound('click');
    setFilter(newFilter);
  };

  const handleViewChange = (newView) => {
    playHapticSound('beep');
    setView(newView);
  };

  // Filter project lists
  const filteredProjects = projectsList.filter(p => {
    if (filter === 'All') return true;
    return p.category === filter;
  });

  return (
    <section id="projects">
      <div className="wrap">
        <div className="sl" data-n="05">projects</div>
        
        <div className="proj-header-row">
          <h2 className="st" style={{ margin: 0 }}>Things I've <em>built</em></h2>
          
          {/* Interactive controls */}
          <div className="proj-controls">
            {/* View Switcher */}
            <div className="segmented-ctrl">
              <button 
                className={`ctrl-btn ${view === 'grid' ? 'active' : ''}`}
                onClick={() => handleViewChange('grid')}
              >
                Grid View
              </button>
              <button 
                className={`ctrl-btn ${view === 'list' ? 'active' : ''}`}
                onClick={() => handleViewChange('list')}
              >
                List View
              </button>
            </div>
          </div>
        </div>

        {/* Categories / Filters row */}
        <div className="filter-row">
          {['All', 'Java', 'React'].map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => handleFilterChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {view === 'grid' ? (
          /* GRID VIEW: Responsive 3D Tilt Cards */
          <div className="pg rv in">
            {filteredProjects.map((p) => (
              <TiltCard key={p.num} className={`pc ${p.featured ? 'feat' : ''} ${p.colorClass}`}>
                <div className="pt">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="pnum">{p.num}</span>
                    {p.featured && <span className="bdg f">Featured</span>}
                  </div>
                  <div className="pls">
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="pl" onClick={() => playHapticSound('click')}>
                      <svg viewBox="0 0 24 24">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                      </svg>
                      GitHub
                    </a>
                  </div>
                </div>
                <div className="ptitle">{p.title}</div>
                <p className="pdesc">{p.desc}</p>
                <div className="pwhat">
                  <div className="pwl">What I Learned</div>
                  <div className="pwt">{p.learned}</div>
                </div>
                <div className="pst">
                  {p.tags.map((tag) => (
                    <span key={tag} className="stg">{tag}</span>
                  ))}
                </div>
              </TiltCard>
            ))}
          </div>
        ) : (
          /* TABULAR LIST VIEW: Recruiter Console Logs */
          <div className="proj-list-view">
            <div className="list-view-header font-mono">
              <div className="col-idx">ID</div>
              <div className="col-title">PROJECT_NAME</div>
              <div className="col-desc">SUMMARY</div>
              <div className="col-tech">TECH_STACK</div>
              <div className="col-actions">LINK</div>
            </div>
            <div className="list-view-body font-mono">
              {filteredProjects.map((p) => (
                <div className="list-row" key={p.num}>
                  <div className="col-idx font-mono">{p.num}</div>
                  <div className="col-title bold-text">{p.title}</div>
                  <div className="col-desc text-accent">{p.desc}</div>
                  <div className="col-tech">
                    {p.tags.join(' / ')}
                  </div>
                  <div className="col-actions">
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="list-link" onClick={() => playHapticSound('click')}>
                      EXECUTE
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
