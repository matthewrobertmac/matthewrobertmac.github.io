import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Download, ChevronDown } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1], delay: d } }),
};

// Cossack images
const HERO_PAINTING = 'https://images.unsplash.com/photo-1719498481776-8616359f0df4?crop=entropy&cs=srgb&fm=jpg&q=85&w=800';
const STEPPE_IMG = 'https://images.unsplash.com/photo-1647462028480-811fd621c216?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400';

const THEME_PILLS = [
  { label: 'Civic AI', color: '#005BBB' },
  { label: 'Hromada', color: '#8B4513' },
  { label: 'Honest AI', color: '#005BBB' },
  { label: 'Resilience', color: '#8B4513' },
  { label: 'Digital Sovereignty', color: '#005BBB' },
  { label: 'Human Dignity', color: '#8B4513' },
];

export default function HeroSection({ bookData }) {
  const scrollToRead = () => {
    const el = document.getElementById('audiobook');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 68, behavior: 'smooth' });
  };

  const pdfUrl = bookData?.pdf_url || '#';

  return (
    <section
      id="home"
      className="scroll-mt-nav embroidery-border"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#FAF8F2',
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Ukrainian steppe landscape panorama */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${STEPPE_IMG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        opacity: 0.12,
        zIndex: 0,
      }} />

      {/* Gradient overlay to keep text readable */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(250,248,242,0.85) 0%, rgba(250,248,242,0.7) 50%, rgba(250,248,242,0.95) 100%)',
        zIndex: 1,
      }} />

      {/* Ornamental side decorations - left */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '6px',
        background: 'repeating-linear-gradient(180deg, #005BBB 0px, #005BBB 20px, #FFD500 20px, #FFD500 40px)',
        opacity: 0.6,
        zIndex: 2,
      }} />
      {/* Right */}
      <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: '6px',
        background: 'repeating-linear-gradient(180deg, #FFD500 0px, #FFD500 20px, #005BBB 20px, #005BBB 40px)',
        opacity: 0.6,
        zIndex: 2,
      }} />

      <div style={{
        position: 'relative',
        zIndex: 3,
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        padding: '4rem 2.5rem 3rem',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '3rem',
        alignItems: 'center',
      }}>
        {/* Left: Text content */}
        <div>
          {/* Overline */}
          <motion.div
            initial="hidden" animate="visible" custom={0} variants={fadeUp}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}
          >
            <div style={{ height: 1, width: 40, background: 'linear-gradient(90deg, #005BBB, #FFD500)', opacity: 0.7 }} />
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.7rem',
              color: '#8B6340',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              Academic Thesis · Open Access · {bookData?.year || 2024}
            </span>
            <div style={{ height: 1, width: 40, background: 'linear-gradient(90deg, #FFD500, #005BBB)', opacity: 0.7 }} />
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial="hidden" animate="visible" custom={0.1} variants={fadeUp}
            data-testid="hero-title"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#2C1A0E',
              marginBottom: '0.25rem',
            }}
          >
            {bookData?.title || 'The Diia Thesis'}
          </motion.h1>

          {/* Ornamental divider */}
          <motion.div
            initial="hidden" animate="visible" custom={0.15} variants={fadeUp}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0.75rem 0 1rem' }}
          >
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, #C4A882, transparent)', maxWidth: 80 }} />
            <span style={{ color: '#FFD500', fontSize: '1rem' }}>✦</span>
            <div style={{ width: 30, height: 3, background: '#005BBB', opacity: 0.6, borderRadius: 2 }} />
            <span style={{ color: '#FFD500', fontSize: '1rem' }}>✦</span>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, #C4A882)', maxWidth: 80 }} />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial="hidden" animate="visible" custom={0.2} variants={fadeUp}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              color: '#5C3D1E',
              lineHeight: 1.5,
              marginBottom: '1.5rem',
              maxWidth: '58ch',
            }}
          >
            {bookData?.subtitle || 'AI, Digital Government, and the Future of Civic Intelligence — From Ukraine to the World'}
          </motion.p>

          {/* Description */}
          <motion.p
            initial="hidden" animate="visible" custom={0.28} variants={fadeUp}
            style={{
              fontFamily: "'Crimson Text', Georgia, serif",
              fontSize: '1.0625rem',
              color: '#5C3D1E',
              lineHeight: 1.75,
              marginBottom: '2rem',
              maxWidth: '62ch',
            }}
          >
            {bookData?.description || "A rigorous academic thesis arguing that Ukraine's Diia platform represents a pioneering global laboratory for civic artificial intelligence. Drawing on Cossack democratic traditions, Wojtyla's personalism, and Marxian critique, it asks whether digital government can serve human dignity — or become an instrument of control."}
          </motion.p>

          {/* Theme pills */}
          <motion.div
            initial="hidden" animate="visible" custom={0.35} variants={fadeUp}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '2.5rem' }}
          >
            {THEME_PILLS.map(({ label, color }) => (
              <span key={label} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 12px',
                borderRadius: '2px',
                border: `1px solid ${color}40`,
                background: `${color}08`,
                color: color === '#005BBB' ? '#004A9C' : '#6B3412',
                fontSize: '0.8125rem',
                fontFamily: "'Crimson Text', serif",
                fontWeight: 600,
                letterSpacing: '0.02em',
              }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: color === '#005BBB' ? '#FFD500' : '#005BBB', flexShrink: 0, opacity: 0.8 }} />
                {label}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial="hidden" animate="visible" custom={0.42} variants={fadeUp}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}
          >
            <button
              onClick={scrollToRead}
              data-testid="hero-read-now-button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 28px',
                background: '#2C1A0E',
                color: '#FAF8F2',
                border: 'none',
                borderRadius: '3px',
                fontFamily: "'Playfair Display', serif",
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '0.01em',
                boxShadow: '0 4px 16px rgba(44,26,14,0.2)',
              }}
            >
              <BookOpen size={17} />
              Listen & Read
            </button>

            <a
              href={pdfUrl}
              download="The_Diia_Thesis.pdf"
              target="_blank"
              rel="noreferrer"
              data-testid="hero-download-pdf-button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: 'transparent',
                color: '#005BBB',
                border: '1.5px solid #005BBB',
                borderRadius: '3px',
                fontFamily: "'Playfair Display', serif",
                fontSize: '1rem',
                fontWeight: 600,
                textDecoration: 'none',
                letterSpacing: '0.01em',
              }}
            >
              <Download size={16} />
              Download PDF
            </a>
          </motion.div>
        </div>

        {/* Right: Cossack painting */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="hero-painting-wrapper"
          style={{ flexShrink: 0 }}
        >
          <div className="painting-frame gallery-painting" style={{ maxWidth: 280 }}>
            <img
              src={HERO_PAINTING}
              alt="Historical Cossack horseman painting"
              style={{
                width: '100%',
                height: 340,
                objectFit: 'cover',
                display: 'block',
                filter: 'sepia(15%) saturate(110%) contrast(105%)',
              }}
            />
          </div>
          {/* Caption */}
          <p style={{
            textAlign: 'center',
            marginTop: '8px',
            fontFamily: "'Crimson Text', serif",
            fontStyle: 'italic',
            fontSize: '0.8125rem',
            color: '#8B6340',
          }}>
            Cossack Horseman, oil on canvas
          </p>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: '2rem',
          gap: '6px',
        }}
      >
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: '#C4A882', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Scroll to read
        </span>
        <ChevronDown size={18} style={{ color: '#C4A882', animation: 'cossack-bounce 2s infinite' }} />
      </motion.div>

      <style>{`
        @keyframes cossack-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        @media (max-width: 767px) {
          .hero-painting-wrapper { display: none; }
          #home > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
