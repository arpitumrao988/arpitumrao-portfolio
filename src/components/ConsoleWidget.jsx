import React, { useState, useEffect } from 'react';

// Dynamic sound player using Web Audio API
export const playHapticSound = (type) => {
  const isMuted = localStorage.getItem('portfolio-muted') === 'true';
  if (isMuted) return;

  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'hover') {
      osc.frequency.setValueAtTime(500, ctx.currentTime);
      gain.gain.setValueAtTime(0.008, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } else if (type === 'beep') {
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'success') {
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(587.33, ctx.currentTime + 0.08);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    }
  } catch (err) {
    // Audio context was blocked or not supported
  }
};

export default function ConsoleWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [activeTheme, setActiveTheme] = useState('indigo');
  const [timeString, setTimeString] = useState('');
  const [devStatus, setDevStatus] = useState('ONLINE');
  const [ping, setPing] = useState(24);

  // Sync mute state on mount
  useEffect(() => {
    const isMuted = localStorage.getItem('portfolio-muted') === 'true';
    setMuted(isMuted);

    // Get theme from HTML class
    const htmlClasses = document.documentElement.classList;
    if (htmlClasses.contains('theme-green')) setActiveTheme('green');
    else if (htmlClasses.contains('theme-orange')) setActiveTheme('orange');
    else if (htmlClasses.contains('theme-cyan')) setActiveTheme('cyan');
    else setActiveTheme('indigo');
  }, []);

  // Update clock, status and ping dynamically
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formatter = new Intl.DateTimeFormat([], options);
      const parts = formatter.formatToParts(new Date());
      const hh = parts.find(p => p.type === 'hour').value;
      const mm = parts.find(p => p.type === 'minute').value;
      const ss = parts.find(p => p.type === 'second').value;

      setTimeString(`${hh}:${mm}:${ss}`);

      // Calculate online/resting status (Online between 9 AM and 11 PM IST)
      const hourVal = parseInt(hh, 10);
      if (hourVal >= 9 && hourVal < 23) {
        setDevStatus('ONLINE · CODING');
      } else {
        setDevStatus('RESTING · OFFLINE');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulated ping latency fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setPing(prev => {
        const delta = Math.floor(Math.random() * 9) - 4; // -4 to +4
        return Math.max(15, Math.min(60, prev + delta));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMuteToggle = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    localStorage.setItem('portfolio-muted', nextMuted ? 'true' : 'false');
    if (!nextMuted) {
      setTimeout(() => playHapticSound('success'), 50);
    }
  };

  const handleThemeChange = (themeName) => {
    playHapticSound('click');
    
    // Remove current themes
    document.documentElement.classList.remove('theme-green', 'theme-orange', 'theme-cyan');
    
    if (themeName !== 'indigo') {
      document.documentElement.classList.add(`theme-${themeName}`);
    }
    
    setActiveTheme(themeName);
  };

  const handleWidgetToggle = () => {
    playHapticSound('beep');
    setIsOpen(!isOpen);
  };

  return (
    <div className={`console-widget ${isOpen ? 'expanded' : ''}`}>
      {isOpen ? (
        <div className="hud-panel">
          <div className="hud-header">
            <span className="hud-title">SYSTEM CONSOLE v1.0</span>
            <button className="hud-close" onClick={handleWidgetToggle}>×</button>
          </div>
          
          <div className="hud-body">
            {/* Status Section */}
            <div className="hud-section">
              <div className="hud-row">
                <span className="hud-label">CORE STATE:</span>
                <span className="hud-val green-pulse">{devStatus}</span>
              </div>
              <div className="hud-row">
                <span className="hud-label">SERVER LATENCY:</span>
                <span className="hud-val">{ping}ms (OK)</span>
              </div>
              <div className="hud-row">
                <span className="hud-label">LOCAL TIME (IST):</span>
                <span className="hud-val font-mono">{timeString}</span>
              </div>
            </div>

            {/* Theme Switcher */}
            <div className="hud-section">
              <span className="hud-section-title">CYBER COLOR MATRIX</span>
              <div className="theme-options">
                {[
                  { name: 'indigo', color: '#6366f1' },
                  { name: 'green', color: '#10b981' },
                  { name: 'orange', color: '#f97316' },
                  { name: 'cyan', color: '#06b6d4' }
                ].map(t => (
                  <button
                    key={t.name}
                    className={`theme-dot ${activeTheme === t.name ? 'active' : ''}`}
                    style={{ backgroundColor: t.color }}
                    onClick={() => handleThemeChange(t.name)}
                    title={`Theme: ${t.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Audio Section */}
            <div className="hud-section">
              <div className="hud-row">
                <span className="hud-label">HAPTIC AUDIO FX:</span>
                <button 
                  className={`hud-btn ${!muted ? 'btn-enabled' : 'btn-disabled'}`}
                  onClick={handleMuteToggle}
                >
                  {muted ? 'MUTED' : 'ENABLED'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button className="hud-trigger" onClick={handleWidgetToggle} title="Open System Console">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M6 10l3 3-3 3" />
            <line x1="11" y1="16" x2="16" y2="16" />
          </svg>
          <span className="trigger-pulse"></span>
        </button>
      )}
    </div>
  );
}
