import React, { useState, useEffect } from 'react';
import { Download, Menu, X, BookOpen } from 'lucide-react';

export default function TopNav({ bookData }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 32);
      const sections = ['home', 'read', 'gallery', 'about'];
      for (const sec of [...sections].reverse()) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80) { setActiveSection(sec); break; }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 68;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const pdfUrl = bookData?.pdf_url || '#';

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'read', label: 'Read the Thesis' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header
      data-testid="top-nav"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        height: 'var(--nav-height)',
        backgroundColor: scrolled ? 'rgba(250, 248, 242, 0.97)' : 'rgba(250, 248, 242, 0.92)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: scrolled ? '1px solid #C4A882' : '1px solid rgba(196,168,130,0.4)',
        boxShadow: scrolled ? '0 2px 20px rgba(44,26,14,0.1)' : 'none',
        transition: 'background-color 200ms ease, border-color 200ms ease, box-shadow 200ms ease',
      }}
    >
      {/* Embroidery accent line top */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        background: 'repeating-linear-gradient(90deg, #005BBB 0px, #005BBB 12px, #FFD500 12px, #FFD500 24px)',
        opacity: 0.7,
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '4px',
      }}>
        {/* Logo */}
        <button
          data-testid="top-nav-home-link"
          onClick={() => scrollTo('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          {/* Tryzub-inspired icon */}
          <div style={{
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Simplified stylized Tryzub */}
              <path d="M14 3 L14 22 M14 22 L9 17 M14 22 L19 17" stroke="#005BBB" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M7 5 L7 15 M21 5 L21 15" stroke="#005BBB" strokeWidth="2" strokeLinecap="round"/>
              <path d="M4 8 Q7 5 7 5 Q7 15 7 15 Q7 19 10 20" stroke="#005BBB" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              <path d="M24 8 Q21 5 21 5 Q21 15 21 15 Q21 19 18 20" stroke="#005BBB" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              <line x1="5" y1="8" x2="9" y2="8" stroke="#FFD500" strokeWidth="2" strokeLinecap="round"/>
              <line x1="19" y1="8" x2="23" y2="8" stroke="#FFD500" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: '1rem',
              color: '#2C1A0E',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}>
              The Diia Thesis
            </div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.6rem',
              color: '#8B6340',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              From Ukraine to the World
            </div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          {navLinks.map(({ id, label }) => (
            <button
              key={id}
              data-testid={`top-nav-${id}-link`}
              onClick={() => scrollTo(id)}
              className={`nav-link ${activeSection === id ? 'active' : ''}`}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Crimson Text', Georgia, serif",
                fontSize: '1.0625rem',
                fontWeight: activeSection === id ? 600 : 400,
                color: activeSection === id ? '#005BBB' : '#5C3D1E',
                padding: '4px 0',
                letterSpacing: '0.01em',
              }}
            >
              {label}
            </button>
          ))}

          {/* Download */}
          <a
            href={pdfUrl}
            download="The_Diia_Thesis.pdf"
            target="_blank"
            rel="noreferrer"
            data-testid="top-nav-download-button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 18px',
              background: 'transparent',
              border: '1.5px solid #005BBB',
              borderRadius: '4px',
              color: '#005BBB',
              fontFamily: "'Crimson Text', serif",
              fontSize: '0.9375rem',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            <Download size={14} />
            Download
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(v => !v)}
          aria-label="Toggle menu"
          className="mobile-menu-btn"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#2C1A0E',
            padding: '6px',
          }}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: 'var(--nav-height)',
          left: 0,
          right: 0,
          background: 'rgba(250,248,242,0.99)',
          borderBottom: '1px solid #C4A882',
          padding: '1rem 1.5rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
        }}>
          {navLinks.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: '1px solid rgba(196,168,130,0.3)',
                cursor: 'pointer',
                fontFamily: "'Crimson Text', serif",
                fontSize: '1.125rem',
                color: activeSection === id ? '#005BBB' : '#5C3D1E',
                fontWeight: activeSection === id ? 600 : 400,
                textAlign: 'left',
                padding: '12px 0',
              }}
            >
              {label}
            </button>
          ))}
          <a
            href={pdfUrl}
            download="The_Diia_Thesis.pdf"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '1rem',
              padding: '10px 20px',
              background: '#005BBB',
              color: '#FFFFFF',
              borderRadius: '4px',
              textDecoration: 'none',
              fontFamily: "'Crimson Text', serif",
              fontSize: '1rem',
              justifyContent: 'center',
            }}
          >
            <Download size={14} />
            Download PDF
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
