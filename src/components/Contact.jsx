import React, { useState } from 'react';
import TiltCard from './TiltCard';
import { playHapticSound } from './ConsoleWidget';

const devQuotes = [
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "One of my most productive days was throwing away 1,000 lines of code.", author: "Ken Thompson" },
  { text: "The best error message is the one that never shows up.", author: "Unknown" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "Programs must be written for people to read, and only secondarily for machines to execute.", author: "Harold Abelson" }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in Name, Email, and Message.');
      return;
    }

    // WEB3FORMS INTEGRATION
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";

    if (accessKey === "YOUR_ACCESS_KEY_HERE") {
      alert("Form submission is wired up! Please replace 'YOUR_ACCESS_KEY_HERE' in src/components/Contact.jsx with your free key from web3forms.com to receive emails.");
      const randomQ = devQuotes[Math.floor(Math.random() * devQuotes.length)];
      setSelectedQuote(randomQ);
      setSubmitted(true);
      setShowSuccessModal(true);
      playHapticSound('success');
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "New Portfolio Contact Message",
          message: formData.message
        })
      });

      const result = await response.json();
      if (result.success) {
        const randomQ = devQuotes[Math.floor(Math.random() * devQuotes.length)];
        setSelectedQuote(randomQ);
        setSubmitted(true);
        setShowSuccessModal(true);
        playHapticSound('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert("Error sending message: " + (result.message || "Please check your access key."));
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Something went wrong while sending the message. Please check your network connection.");
    }
  };

  return (
    <section id="contact">
      <div className="wrap">
        <div className="sl" data-n="06">contact</div>
        <h2 className="st">Let's <em>connect</em></h2>
        
        <div className="cg rv in">
          <div>
            <TiltCard className="ci-box">
              <p className="ci-txt">
                Whether you're a recruiter with an open role, a developer who wants to collaborate, or just someone who wants to talk backend tech — my inbox is always open.
              </p>
              <div className="ci-av">
                <span className="gd"></span>
                Available for full-time, internship & freelance work
              </div>
            </TiltCard>
            
            <div className="chs">
              <TiltCard className="ch card-orange">
                <a href="mailto:arpitumrao08072005@gmail.com" style={{ display: 'flex', width: '100%', alignItems: 'center', gap: '14px' }}>
                  <span className="ch-ic">✉️</span>
                  <div className="ch-nf">
                    <span className="ch-l">Email</span>
                    <span className="ch-v">arpitumrao08072005@gmail.com</span>
                  </div>
                  <span className="ch-ar">→</span>
                </a>
              </TiltCard>
              <TiltCard className="ch card-blue">
                <a href="https://linkedin.com/in/arpitumrao" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: '100%', alignItems: 'center', gap: '14px' }}>
                  <span className="ch-ic">💼</span>
                  <div className="ch-nf">
                    <span className="ch-l">LinkedIn</span>
                    <span className="ch-v">linkedin.com/in/arpitumrao</span>
                  </div>
                  <span className="ch-ar">→</span>
                </a>
              </TiltCard>
              <TiltCard className="ch card-indigo">
                <a href="https://github.com/arpitumrao988" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: '100%', alignItems: 'center', gap: '14px' }}>
                  <span className="ch-ic">🐙</span>
                  <div className="ch-nf">
                    <span className="ch-l">GitHub</span>
                    <span className="ch-v">github.com/arpitumrao988</span>
                  </div>
                  <span className="ch-ar">→</span>
                </a>
              </TiltCard>
              <TiltCard className="ch card-orange">
                <a href="https://leetcode.com/arpitumrao" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: '100%', alignItems: 'center', gap: '14px' }}>
                  <span className="ch-ic">🍊</span>
                  <div className="ch-nf">
                    <span className="ch-l">LeetCode</span>
                    <span className="ch-v">leetcode.com/arpitumrao</span>
                  </div>
                  <span className="ch-ar">→</span>
                </a>
              </TiltCard>
            </div>
            
            <button 
              className="btn-p" 
              style={{ width: '100%', justifyContent: 'center', cursor: 'pointer', border: 'none', outline: 'none' }} 
              onClick={() => {
                playHapticSound('beep');
                setShowResumeModal(true);
              }}
            >
              Download Resume
              <svg viewBox="0 0 24 24" width="14" height="14" style={{ marginLeft: '6px' }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </button>
          </div>
          
          <div className="fw">
            <div className="fbar">// TRANSMIT SECURE MESSAGE</div>
            {!submitted ? (
              <form className="fin" id="formIn" onSubmit={handleSubmit}>
                <div className="fg2">
                  <label className="fl2" htmlFor="name">Your Name</label>
                  <input 
                    id="name" 
                    className="fi" 
                    type="text" 
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="fg2">
                  <label className="fl2" htmlFor="email">Email</label>
                  <input 
                    id="email" 
                    className="fi" 
                    type="email" 
                    placeholder="john@company.com" 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="fg2">
                  <label className="fl2" htmlFor="subject">Subject</label>
                  <input 
                    id="subject" 
                    className="fi" 
                    type="text" 
                    placeholder="Job Opportunity / Collaboration..." 
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="fg2">
                  <label className="fl2" htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    className="fi" 
                    placeholder="Hi! I wanted to reach out about..." 
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button type="submit" className="btn-p" style={{ justifyContent: 'center' }}>
                  Send Message 
                  <svg viewBox="0 0 24 24" width="14" height="14" style={{ marginLeft: '4px' }}>
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
                <p className="fn">* Wired with react state handling.</p>
              </form>
            ) : (
              <div className="fok show">
                <div className="fok-ic">✅</div>
                <div className="fok-t" style={{ cursor: 'pointer' }} onClick={() => setShowSuccessModal(true)}>
                  Message sent! Click to view dispatch logs.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sci-Fi Glassmorphic Resume Modal */}
      {showResumeModal && (
        <div className="resume-modal-overlay" onClick={() => setShowResumeModal(false)}>
          <div className="resume-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="resume-modal-header">
              <span className="modal-header-icon">⚠️</span>
              <span className="modal-header-title font-mono">SYSTEM NOTICE // RESUME_STATUS</span>
              <button className="modal-close-btn" onClick={() => setShowResumeModal(false)}>×</button>
            </div>
            <div className="resume-modal-body">
              <div className="modal-alert-icon">🛠️</div>
              <h3 className="modal-alert-heading">Resume Build in Progress</h3>
              <p className="modal-alert-text">
                The administrator is currently compiling and optimizing the latest version of their engineering credentials database.
              </p>
              <div className="modal-alert-log font-mono">
                <div>[!] PATH: /public/resume.pdf</div>
                <div>[!] STATUS: COMPILING_LATEST_BUILD</div>
                <div>[!] RETRY: Please check back shortly or request details via the contact form.</div>
              </div>
              <button 
                className="btn-p" 
                style={{ width: '100%', justifyContent: 'center', cursor: 'pointer', border: 'none' }} 
                onClick={() => {
                  playHapticSound('click');
                  setShowResumeModal(false);
                }}
              >
                Acknowledge System Log
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sci-Fi Glassmorphic Success Message Modal */}
      {showSuccessModal && selectedQuote && (
        <div className="resume-modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="resume-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="resume-modal-header" style={{ borderBottomColor: 'rgba(16, 185, 129, 0.2)' }}>
              <span className="modal-header-icon" style={{ color: '#10b981' }}>📡</span>
              <span className="modal-header-title font-mono" style={{ color: '#10b981' }}>STATUS // DISPATCH_SUCCESSFUL</span>
              <button className="modal-close-btn" onClick={() => setShowSuccessModal(false)}>×</button>
            </div>
            <div className="resume-modal-body">
              <div className="modal-alert-icon">✉️</div>
              <h3 className="modal-alert-heading" style={{ color: 'var(--text-main)' }}>Message Dispatched!</h3>
              <p className="modal-alert-text">
                Your transmission has been encrypted and sent. The administrator will contact you shortly.
              </p>
              
              {/* Quote Block */}
              <div className="modal-quote-block font-mono">
                <div className="quote-heading">// CODE QUOTE OF THE DAY:</div>
                <div className="quote-text">"{selectedQuote.text}"</div>
                <div className="quote-author">— {selectedQuote.author}</div>
              </div>

              <button 
                className="btn-p" 
                style={{ width: '100%', justifyContent: 'center', cursor: 'pointer', border: 'none', background: 'var(--accent)' }} 
                onClick={() => {
                  playHapticSound('click');
                  setShowSuccessModal(false);
                }}
              >
                Close Connection
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
