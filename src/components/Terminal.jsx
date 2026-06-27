import React, { useState, useEffect, useRef } from 'react';
import { playHapticSound } from './ConsoleWidget';

export default function Terminal() {
  const [history, setHistory] = useState([
    { text: 'Initial check: System Operational.', type: 'info' },
    { text: 'Profile JSON loaded successfully.', type: 'info' },
    { text: 'Type "help" for a list of available command-line actions.', type: 'prompt' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const terminalEndRef = useRef(null);

  // Auto scroll to bottom of terminal
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleKeyDown = (e) => {
    // Play subtle mechanical sound on keystrokes
    if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Enter') {
      playHapticSound('hover');
    }

    if (e.key === 'Enter') {
      const command = inputVal.trim();
      if (!command) return;

      const newHistory = [...history, { text: `visitor@arpitumrao:~$ ${command}`, type: 'input' }];
      processCommand(command, newHistory);
      setInputVal('');
    }
  };

  const scrollToSection = (id) => {
    // Wait a brief moment so the user sees the output before scroll executes
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 450);
  };

  const processCommand = (cmdStr, currentHistory) => {
    const parts = cmdStr.toLowerCase().split(' ');
    const cmd = parts[0];

    let output = [];

    switch (cmd) {
      case 'help':
        output = [
          { text: 'Available Commands (will also navigate to that section):', type: 'heading' },
          { text: '  about      - Display background details & scrolls to About', type: 'command' },
          { text: '  skills     - List primary tech stack & scrolls to Skills', type: 'command' },
          { text: '  projects   - Summary of builds & scrolls to Projects', type: 'command' },
          { text: '  resume     - Check current compilation status of resume', type: 'command' },
          { text: '  contact    - Retrieve social handles & scrolls to Contact', type: 'command' },
          { text: '  clear      - Clear the console history', type: 'command' },
          { text: '  secret     - Run a developer diagnostic audit', type: 'command' }
        ];
        break;
      case 'about':
        output = [
          { text: 'Arpit Umrao - Backend Developer', type: 'heading' },
          { text: 'A passionate Computer Science student focusing on building scalable backend engines, REST APIs, and database schemas. Loves using Python, Node.js, and Docker to resolve complex problems.', type: 'text' },
          { text: '[SYSTEM] Scrolling browser to About section...', type: 'info' }
        ];
        scrollToSection('about');
        break;
      case 'skills':
        output = [
          { text: 'Core Developer Stack:', type: 'heading' },
          { text: '  - Languages: Java (Primary), C, Python, SQL', type: 'text' },
          { text: '  - Web Frameworks: Spring Boot, Servlets, JSP, Spring Security', type: 'text' },
          { text: '  - Databases: MySQL, DBMS Concepts', type: 'text' },
          { text: '  - Tools & Libs: IntelliJ IDEA, Maven, Git & GitHub, Pandas, NumPy', type: 'text' },
          { text: '[SYSTEM] Scrolling browser to Skills section...', type: 'info' }
        ];
        scrollToSection('skills');
        break;
      case 'projects':
        output = [
          { text: 'Featured Builds:', type: 'heading' },
          { text: '  1. SmartCropAdvisor - ML crop recommendation using FastAPI & Scikit-learn.', type: 'text' },
          { text: '  2. Book Recommendation System - User recommendation engine filtering volumes.', type: 'text' },
          { text: '  3. Portfolio Website - 3D interactive layout built with React & CSS.', type: 'text' },
          { text: '[SYSTEM] Scrolling browser to Projects section...', type: 'info' }
        ];
        scrollToSection('projects');
        break;
      case 'resume':
        playHapticSound('beep');
        output = [
          { text: '=== RESUME LOG AUDIT ===', type: 'heading' },
          { text: '[!] PATH: /public/resume.pdf', type: 'error' },
          { text: '[!] STATUS: COMPILING_LATEST_BUILD', type: 'error' },
          { text: '[!] Log: The administrator is actively compiling and optimizing engineering credentials.', type: 'info' },
          { text: '[!] Action: Direct skills validation is recommended via "skills" / "projects" commands.', type: 'success' }
        ];
        break;
      case 'contact':
        output = [
          { text: 'Get In Touch:', type: 'heading' },
          { text: '  - Email: arpitumrao08072005@gmail.com', type: 'text' },
          { text: '  - GitHub: https://github.com/arpitumrao988', type: 'text' },
          { text: '  - LeetCode: https://leetcode.com/arpitumrao', type: 'text' },
          { text: '  - HackerRank: https://www.hackerrank.com/profile/arpitumrao_', type: 'text' },
          { text: '[SYSTEM] Scrolling browser to Contact section...', type: 'info' }
        ];
        scrollToSection('contact');
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'secret':
        playHapticSound('success');
        output = [
          { text: '=== DIAGNOSTIC SYSTEM CHECK ===', type: 'heading' },
          { text: '[+] Memory allocation: STABLE (0.04ms leakage)', type: 'info' },
          { text: '[+] API endpoints ping: 24ms latency response', type: 'info' },
          { text: '[+] Developer Motivation: 100% (READY TO BUILD)', type: 'success' },
          { text: '>> Fun Quote: "Java is to JavaScript what car is to carpet."', type: 'info' }
        ];
        break;
      default:
        output = [
          { text: `bash: command not found: "${cmd}". Type "help" for instructions.`, type: 'error' }
        ];
    }

    setHistory([...currentHistory, ...output]);
  };

  return (
    <div className="term" onClick={() => document.getElementById('term-input')?.focus()}>
      <div className="term-bar">
        <span className="td tdr"></span>
        <span className="td tdy"></span>
        <span className="td tdg"></span>
        <span className="term-title">terminal@arpitumrao: ~</span>
      </div>
      
      <div className="term-body font-mono">
        <div className="term-history">
          {history.map((line, idx) => (
            <div key={idx} className={`term-line term-${line.type}`}>
              {line.text}
            </div>
          ))}
        </div>
        
        <div className="term-prompt-line">
          <span className="term-user-prefix">visitor@arpitumrao:~$ </span>
          <input
            id="term-input"
            type="text"
            className="term-input font-mono"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoFocus
          />
        </div>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}
