import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Moon, Sun, Download, BookOpen, Menu, X } from 'lucide-react';

export default function TopNav({ darkMode, onToggleDark, bookData }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      // Update active section based on scroll position
      const sections = ['home', 'read', 'about'];
      for (const sec of sections.reverse()) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const pdfUrl = bookData?.pdf_url || '#';

  return (
    <header
      data-testid="top-nav"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        height: 'var(--nav-height)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        backgroundColor: scrolled
          ? darkMode ? 'rgba(11, 18, 32, 0.95)' : 'rgba(246, 248, 252, 0.95)'
          : darkMode ? 'rgba(11, 18, 32, 0.85)' : 'rgba(246, 248, 252, 0.85)',
        borderBottom: scrolled ? '1px solid hsl(var(--border))' : '1px solid transparent',
        boxShadow: scrolled ? '0 1px 16px rgba(0,0,0,0.08)' : 'none',
        transition: 'background-color 200ms ease, border-color 200ms ease, box-shadow 200ms ease',
      }}
    >
      <div
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo / Brand */}
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
          {/* UA Flag mini */}
          <div style={{ display: 'flex', flexDirection: 'column', width: 22, height: 16, borderRadius: 2, overflow: 'hidden', flexShrink: 0 }}>
            <div style={{ flex: 1, background: '#005BBB' }} />
            <div style={{ flex: 1, background: '#FFD500' }} />
          </div>
          <span style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontWeight: 600,
            fontSize: '0.95rem',
            color: darkMode ? '#F0F4FA' : '#0B1220',
            letterSpacing: '-0.01em',
            lineHeight: 1,
          }}>
            The Diia Thesis
          </span>
        </button>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
          }}
          className="hidden-mobile"
        >
          {[
            { id: 'home', label: 'Home' },
            { id: 'read', label: 'Read the Thesis' },
            { id: 'about', label: 'About' },
          ].map(({ id, label }) => (
            <button
              key={id}
              data-testid={`top-nav-${id}-link`}
              onClick={() => scrollTo(id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '0.875rem',
                fontWeight: activeSection === id ? 600 : 400,
                color: activeSection === id
                  ? '#005BBB'
                  : darkMode ? '#94A3B8' : '#334155',
                position: 'relative',
                padding: '4px 0',
              }}
            >
              {label}
              {activeSection === id && (
                <span style={{
                  position: 'absolute',
                  bottom: -2,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: '#FFD500',
                  borderRadius: 1,
                }} />
              )}
            </button>
          ))}

          {/* Download Button */}
          <a
            href={pdfUrl}
            download="The_Diia_Thesis.pdf"
            target="_blank"
            rel="noreferrer"
            data-testid="top-nav-download-button"
            style={{ textDecoration: 'none' }}
          >
            <Button
              variant="outline"
              size="sm"
              style={{
                borderColor: '#005BBB',
                color: '#005BBB',
                fontSize: '0.8125rem',
                height: '34px',
                padding: '0 14px',
                gap: '6px',
              }}
            >
              <Download size={14} />
              Download
            </Button>
          </a>

          {/* Dark mode toggle */}
          <button
            data-testid="dark-mode-toggle"
            onClick={onToggleDark}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: darkMode ? '#FFD500' : '#005BBB',
              display: 'flex',
              alignItems: 'center',
              padding: '6px',
              borderRadius: '6px',
            }}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>

        {/* Mobile: hamburger + dark toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="show-mobile">
          <button
            onClick={onToggleDark}
            aria-label="Toggle dark mode"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: darkMode ? '#FFD500' : '#005BBB', padding: '6px' }}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: darkMode ? '#F0F4FA' : '#0B1220', padding: '6px' }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: 'var(--nav-height)',
          left: 0,
          right: 0,
          backgroundColor: darkMode ? 'rgba(11, 18, 32, 0.98)' : 'rgba(246, 248, 252, 0.98)',
          borderBottom: '1px solid hsl(var(--border))',
          padding: '1rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          zIndex: 49,
        }}>
          {[
            { id: 'home', label: 'Home' },
            { id: 'read', label: 'Read the Thesis' },
            { id: 'about', label: 'About' },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '1rem',
                fontWeight: activeSection === id ? 600 : 400,
                color: activeSection === id ? '#005BBB' : darkMode ? '#94A3B8' : '#334155',
                textAlign: 'left',
                padding: '8px 0',
                borderBottom: '1px solid hsl(var(--border))',
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
            style={{ textDecoration: 'none', marginTop: '0.5rem' }}
          >
            <Button variant="outline" size="sm" style={{ borderColor: '#005BBB', color: '#005BBB', width: '100%', justifyContent: 'center' }}>
              <Download size={14} style={{ marginRight: '6px' }} />
              Download PDF
            </Button>
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
