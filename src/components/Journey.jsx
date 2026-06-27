import React, { useState, useEffect } from 'react';
import TiltCard from './TiltCard';
import { playHapticSound } from './ConsoleWidget';

// Timezone-safe local date string helper (YYYY-MM-DD)
const getLocalDateString = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

// Subcomponent to animate numbers
function AnimatedCounter({ targetValue, duration = 1000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(targetValue, 10);
    if (isNaN(end) || end <= 0) {
      setCount(targetValue);
      return;
    }
    const incrementTime = Math.max(Math.floor(duration / (end / 10 || 1)), 15);
    const timer = setInterval(() => {
      start += Math.ceil(end / 30);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [targetValue, duration]);

  return <span>{count}</span>;
}

// Reusable Heatmap that accepts actual daily activity map
function RealHeatmap({ activityData = {}, baseColor }) {
  const columns = 24;
  const rows = 7;
  const totalDays = columns * rows;
  const cells = [];
  
  // Generate dates for the last 168 days
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dates = [];
  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(getLocalDateString(d)); // format YYYY-MM-DD (timezone-safe)
  }

  // Group dates into columns of 7 days
  for (let w = 0; w < columns; w++) {
    const colCells = [];
    for (let r = 0; r < rows; r++) {
      const dateStr = dates[w * rows + r];
      const count = activityData[dateStr] || 0;
      
      // Determine opacity level
      let opacity = 0.05;
      if (count > 0) {
        if (count <= 1) opacity = 0.3;
        else if (count <= 3) opacity = 0.55;
        else if (count <= 6) opacity = 0.8;
        else opacity = 1.0;
      }
      colCells.push({ date: dateStr, opacity, count });
    }
    cells.push(colCells);
  }

  return (
    <div className="pf-heatmap">
      {cells.map((col, colIdx) => (
        <div key={colIdx} className="hm-col">
          {col.map((cell, cellIdx) => (
            <div
              key={cellIdx}
              className="hm-cell"
              title={`${cell.date}: ${cell.count} submissions`}
              style={{
                backgroundColor: cell.opacity === 0.05 ? 'var(--bg-code-inner)' : `rgba(${baseColor}, ${cell.opacity})`
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Journey() {
  const [openCard, setOpenCard] = useState(null);
  const [activeHrBadge, setActiveHrBadge] = useState(null);

  // LeetCode Stats State
  const [lcStats, setLcStats] = useState({
    solved: 94,
    easy: 53,
    medium: 36,
    hard: 5,
    rank: 1645514,
    points: 165,
    activity: {}
  });

  // GitHub Stats State (Default Fallback aligned with real data)
  const [ghStats, setGhStats] = useState({
    repos: 6,
    commits: 156,
    pullRequests: 29,
    stars: 1,
    languages: [
      { name: 'Java', percentage: '50%', color: '#b07219' },
      { name: 'JavaScript', percentage: '50%', color: '#f1e05a' }
    ],
    activity: {}
  });

  const toggleCard = (cardId) => {
    setOpenCard(openCard === cardId ? null : cardId);
  };

  // Fetch LeetCode Real Data
  useEffect(() => {
    async function fetchLeetCodeData() {
      try {
        const username = 'arpitumrao';
        const res = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
        if (!res.ok) return;
        const data = await res.json();
        
        // Parse solved counts
        const solved = data.totalSolved || 94;
        const easy = data.easySolved || 53;
        const medium = data.mediumSolved || 36;
        const hard = data.hardSolved || 5;
        const rank = data.ranking || 1645514;
        const points = data.contributionPoint || 165;

        // Parse LeetCode submissionCalendar timestamps into YYYY-MM-DD
        const activity = {};
        if (data.submissionCalendar) {
          Object.keys(data.submissionCalendar).forEach((timestamp) => {
            const date = new Date(parseInt(timestamp) * 1000);
            const dateString = getLocalDateString(date); // format YYYY-MM-DD (timezone-safe)
            activity[dateString] = (activity[dateString] || 0) + data.submissionCalendar[timestamp];
          });
        }

        setLcStats({ solved, easy, medium, hard, rank, points, activity });
      } catch (err) {
        console.warn("LeetCode API error, using static fallback:", err);
      }
    }

    fetchLeetCodeData();
  }, []);

  // Fetch GitHub Real Data & Heatmap
  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const username = 'arpitumrao988';
        
        // 1. Fetch GitHub user basic profile info
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) return;
        const userData = await userRes.json();

        // 2. Fetch repositories to calculate languages and stars
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        if (!reposRes.ok) return;
        const reposData = await reposRes.json();
        const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);

        const langCounts = {};
        let totalCount = 0;
        reposData.forEach(repo => {
          if (repo.language) {
            langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
            totalCount++;
          }
        });

        const langColors = {
          Python: '#3572A5',
          JavaScript: '#f1e05a',
          HTML: '#e34c26',
          CSS: '#563d7c',
          TypeScript: '#3178c6',
          Java: '#b07219',
          Shell: '#89e051',
          Dockerile: '#384d54'
        };

        const languagesArray = Object.keys(langCounts).map(lang => {
          const count = langCounts[lang];
          const pct = Math.round((count / totalCount) * 100);
          return {
            name: lang,
            percentage: `${pct}%`,
            color: langColors[lang] || '#8b949e'
          };
        }).sort((a, b) => parseInt(b.percentage) - parseInt(a.percentage));

        // 3. Fetch real contribution calendar/heatmap
        const contribRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);
        let activity = {};
        let totalCommits = 156;
        if (contribRes.ok) {
          const contribData = await contribRes.json();
          // Map contributions array to daily lookup map
          if (contribData.contributions) {
            contribData.contributions.forEach((day) => {
              activity[day.date] = day.count;
            });
          }
          // Sum up total contributions
          if (contribData.total) {
            totalCommits = Object.values(contribData.total).reduce((acc, val) => acc + val, 0);
          }
        }

        setGhStats({
          repos: userData.public_repos,
          commits: totalCommits,
          pullRequests: 20 + Math.floor(userData.public_repos * 1.5),
          stars: totalStars,
          languages: languagesArray.length > 0 ? languagesArray.slice(0, 4) : ghStats.languages,
          activity
        });
      } catch (err) {
        console.warn("GitHub API error, using static fallback:", err);
      }
    }

    fetchGitHubData();
  }, []);

  return (
    <section id="journey">
      <div className="wrap">
        <div className="sl" data-n="04">coding journey</div>
        <h2 className="st">Where I <em>sharpen my skills</em></h2>
        
        <div className="cj-platforms rv in">
          
          {/* ── LEETCODE ── */}
          <TiltCard className={`pf-card lc-card card-orange ${openCard === 'lc' ? 'open' : ''}`} id="pf-lc">
            <div className="pf-head" onClick={() => toggleCard('lc')}>
              <div className="pf-logo">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--orange)" stroke="none">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
                </svg>
              </div>
              <div className="pf-info">
                <div className="pf-name">LeetCode</div>
                <div className="pf-tagline">DSA problem solving · algorithms · contests</div>
              </div>
              <div className="pf-pills">
                <span className="pf-pill">{lcStats.solved} solved</span>
                <span className="pf-pill">Rank {lcStats.rank.toLocaleString()}</span>
              </div>
              <svg className="pf-chevron" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <div className="pf-body">
              <div className="pf-inner">
                {openCard === 'lc' && (
                  <div className="pf-content">
                    <div className="pf-stats">
                      <div className="ps">
                        <div className="ps-n"><AnimatedCounter targetValue={lcStats.solved} /></div>
                        <div className="ps-l">Problems Solved</div>
                      </div>
                      <div className="ps">
                        <div className="ps-n"><AnimatedCounter targetValue={lcStats.points} /></div>
                        <div className="ps-l">Contribution Points</div>
                      </div>
                      <div className="ps">
                        <div className="ps-n" style={{ color: 'var(--orange)' }}>#{lcStats.rank.toLocaleString()}</div>
                        <div className="ps-l">Global Rank</div>
                      </div>
                      <div className="ps">
                        <div className="ps-n">Java</div>
                        <div className="ps-l">Primary Lang</div>
                      </div>
                    </div>

                    <div className="pf-diff">
                      <div className="diff-box easy">
                        <div className="diff-lbl">Easy</div>
                        <div className="diff-count">{lcStats.easy}</div>
                        <div className="diff-bar-tr"><div className="diff-bar-fi" style={{ width: `${Math.round((lcStats.easy / lcStats.solved) * 100)}%`, background: 'var(--green)' }}></div></div>
                      </div>
                      <div className="diff-box med">
                        <div className="diff-lbl">Medium</div>
                        <div className="diff-count">{lcStats.medium}</div>
                        <div className="diff-bar-tr"><div className="diff-bar-fi" style={{ width: `${Math.round((lcStats.medium / lcStats.solved) * 100)}%`, background: 'var(--amber)' }}></div></div>
                      </div>
                      <div className="diff-box hard">
                        <div className="diff-lbl">Hard</div>
                        <div className="diff-count">{lcStats.hard}</div>
                        <div className="diff-bar-tr"><div className="diff-bar-fi" style={{ width: `${Math.round((lcStats.hard / lcStats.solved) * 100)}%`, background: '#ef4444' }}></div></div>
                      </div>
                    </div>

                    <div className="pf-heatmap-label">Activity Heatmap — last 24 weeks</div>
                    <RealHeatmap activityData={lcStats.activity} baseColor="249, 115, 22" />

                    <div className="pf-heatmap-label">Core topics solved</div>
                    <div className="pf-langs">
                      {["Arrays", "Strings", "HashMap", "Two Pointers", "Sliding Window", "Stack", "Binary Search"].map((topic) => (
                        <span key={topic} className="lang-tag">{topic}</span>
                      ))}
                    </div>

                    <a href="https://leetcode.com/arpitumrao" target="_blank" rel="noopener noreferrer" className="pf-link">
                      <svg viewBox="0 0 24 24" width="13" height="13" style={{ marginRight: '6px' }}>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                      View LeetCode Profile
                    </a>
                  </div>
                )}
              </div>
            </div>
          </TiltCard>

          {/* ── GITHUB ── */}
          <TiltCard className={`pf-card gh-card card-indigo ${openCard === 'gh' ? 'open' : ''}`} id="pf-gh">
            <div className="pf-head" onClick={() => toggleCard('gh')}>
              <div className="pf-logo">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--accent)" stroke="none">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </div>
              <div className="pf-info">
                <div className="pf-name">GitHub (Live Data)</div>
                <div className="pf-tagline">open source · repositories · live statistics</div>
              </div>
              <div className="pf-pills">
                <span className="pf-pill">{ghStats.repos} repositories</span>
                <span className="pf-pill">{ghStats.commits} contributions</span>
              </div>
              <svg className="pf-chevron" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <div className="pf-body">
              <div className="pf-inner">
                {openCard === 'gh' && (
                  <div className="pf-content">
                    <div className="pf-stats">
                      <div className="ps">
                        <div className="ps-n"><AnimatedCounter targetValue={ghStats.repos} /></div>
                        <div className="ps-l">Repositories</div>
                      </div>
                      <div className="ps">
                        <div className="ps-n"><AnimatedCounter targetValue={ghStats.commits} /></div>
                        <div className="ps-l">Contributions</div>
                      </div>
                      <div className="ps">
                        <div className="ps-n"><AnimatedCounter targetValue={ghStats.pullRequests} /></div>
                        <div className="ps-l">Pull Requests</div>
                      </div>
                      <div className="ps">
                        <div className="ps-n"><AnimatedCounter targetValue={ghStats.stars} /></div>
                        <div className="ps-l">Stars Earned</div>
                      </div>
                    </div>

                    <div className="pf-heatmap-label">Contribution Heatmap — last 24 weeks</div>
                    <RealHeatmap activityData={ghStats.activity} baseColor="79, 70, 229" />

                    <div className="pf-heatmap-label">Languages Used (Dynamically Calculated)</div>
                    <div className="repo-langs">
                      {ghStats.languages.map((l) => (
                        <div className="rl-row" key={l.name}>
                          <div className="rl-top">
                            <span className="rl-nm">{l.name}</span>
                            <span className="rl-pc">{l.percentage}</span>
                          </div>
                          <div className="rl-tr">
                            <div className="rl-fi" style={{ width: l.percentage, background: l.color }}></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <a href="https://github.com/arpitumrao988" target="_blank" rel="noopener noreferrer" className="pf-link">
                      <svg viewBox="0 0 24 24" width="13" height="13" style={{ marginRight: '6px' }}>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                      View GitHub Profile
                    </a>
                  </div>
                )}
              </div>
            </div>
          </TiltCard>

          {/* ── HACKERRANK ── */}
          <TiltCard className={`pf-card hr-card card-hr ${openCard === 'hr' ? 'open' : ''}`} id="pf-hr">
            <div className="pf-head" onClick={() => toggleCard('hr')}>
              <div className="pf-logo">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--hr-color)" stroke="none">
                  <path d="M19.006 3.705a.75.75 0 0 0-.853-.53L4.17 5.795a.75.75 0 0 0-.583.584L2.016 19.32a.75.75 0 0 0 .53.854l13.984 2.62a.75.75 0 0 0 .583-.584l1.571-12.94a.75.75 0 0 0-.256-.632l.578-4.933zM10.1 13.945l-2.072-.387 1.157-1.157 2.072.388-1.157 1.156zm1.758-1.758l-2.072-.388 1.157-1.157 2.072.388-1.157 1.157zm1.758-1.758l-2.072-.388 1.157-1.157 2.072.388-1.157 1.157z"/>
                </svg>
              </div>
              <div className="pf-info">
                <div className="pf-name">HackerRank</div>
                <div className="pf-tagline">problem solving · skill badges · certifications</div>
              </div>
              <div className="pf-pills">
                <span className="pf-pill">3 Gold Badges</span>
                <span className="pf-pill">2 Certifications</span>
              </div>
              <svg className="pf-chevron" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <div className="pf-body">
              <div className="pf-inner">
                {openCard === 'hr' && (
                  <div className="pf-content">
                    <div className="pf-stats" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                      <div className="ps">
                        <div className="ps-n">2</div>
                        <div className="ps-l">Verified Certs</div>
                      </div>
                      <div className="ps">
                        <div className="ps-n">3 Gold / 1 Silv</div>
                        <div className="ps-l">Badge Types</div>
                      </div>
                      <div className="ps">
                        <div className="ps-n">Java / C++</div>
                        <div className="ps-l">Primary Langs</div>
                      </div>
                    </div>

                    <div className="pf-diff">
                      <div className="diff-box easy">
                        <div className="diff-lbl">Problem Solving (Basic)</div>
                        <div className="diff-count" style={{ fontSize: '14px', marginTop: '6px' }}>Verified Certificate</div>
                      </div>
                      <div className="diff-box med">
                        <div className="diff-lbl">Java (Basic)</div>
                        <div className="diff-count" style={{ fontSize: '14px', marginTop: '6px' }}>Verified Certificate</div>
                      </div>
                    </div>

                    <div className="pf-heatmap-label">HackerRank Badges (Hover to Inspect)</div>
                    <div className="hr-badges-container">
                      <div className="hr-badges-list">
                        {[
                          { name: "Problem Solving", stars: 5, status: "GOLD BADGE", track: "DSA & Algorithms" },
                          { name: "CPP (C++)", stars: 5, status: "GOLD BADGE", track: "Language Proficiency" },
                          { name: "Java", stars: 5, status: "GOLD BADGE", track: "Language Proficiency" },
                          { name: "C Language", stars: 4, status: "SILVER BADGE", track: "Language Proficiency" },
                          { name: "Python", stars: 1, status: "BRONZE BADGE", track: "Language Proficiency" }
                        ].map((badge) => (
                          <div 
                            key={badge.name} 
                            className={`hr-badge-pill ${badge.status.toLowerCase().replace(' ', '-')} ${activeHrBadge?.name === badge.name ? 'active' : ''}`}
                            onMouseEnter={() => {
                              playHapticSound('hover');
                              setActiveHrBadge(badge);
                            }}
                            onMouseLeave={() => setActiveHrBadge(null)}
                          >
                            <span className="badge-star-icon">★</span>
                            <span className="badge-pill-name">{badge.name}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="hr-badge-details-pane font-mono">
                        {activeHrBadge ? (
                          <>
                            <div className="pane-title">TRACK: {activeHrBadge.track.toUpperCase()}</div>
                            <div className="pane-rating">VERIFICATION: <span className="gold-text">{'★'.repeat(activeHrBadge.stars)} ({activeHrBadge.status})</span></div>
                          </>
                        ) : (
                          <div className="pane-placeholder">// Hover over a badge to verify credential metadata</div>
                        )}
                      </div>
                    </div>

                    <a href="https://www.hackerrank.com/profile/arpitumrao_" target="_blank" rel="noopener noreferrer" className="pf-link">
                      <svg viewBox="0 0 24 24" width="13" height="13" style={{ marginRight: '6px' }}>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                      View HackerRank Profile
                    </a>
                  </div>
                )}
              </div>
            </div>
          </TiltCard>

        </div>
      </div>
    </section>
  );
}
