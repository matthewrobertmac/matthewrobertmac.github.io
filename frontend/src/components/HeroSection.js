import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { BookOpen, Download, ChevronDown } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1], delay },
  }),
};

const THEME_PILLS = [
  'Civic AI',
  'Hromada',
  'Honest AI',
  'Digital Sovereignty',
  'Human Dignity',
  'Resilience',
  'Transparency',
];

export default function HeroSection({ bookData }) {
  const scrollToRead = () => {
    const el = document.getElementById('read');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const pdfUrl = bookData?.pdf_url || '#';

  return (
    <section
      id="home"
      className="noise scroll-mt-nav"
      style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        background: '#0B1220',
        overflow: 'hidden',
      }}
    >
      {/* Blue radial glow */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-5%',
        width: '60%',
        height: '70%',
        background: 'radial-gradient(ellipse at 20% 10%, rgba(0,91,187,0.32), transparent 55%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />
      {/* Yellow radial glow */}
      <div style={{
        position: 'absolute',
        top: '5%',
        right: '5%',
        width: '45%',
        height: '50%',
        background: 'radial-gradient(ellipse at 80% 20%, rgba(255,213,0,0.12), transparent 60%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />
      {/* Grid pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,91,187,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,91,187,0.06) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '72rem',
        margin: '0 auto',
        padding: '5rem 1.5rem 4rem',
        width: '100%',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
        }}>

          {/* Left: Main content */}
          <div style={{ maxWidth: '660px' }}>
            {/* Overline */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fadeUp}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', width: 28, height: 20, borderRadius: 3, overflow: 'hidden', flexShrink: 0 }}>
                <div style={{ flex: 1, background: '#005BBB' }} />
                <div style={{ flex: 1, background: '#FFD500' }} />
              </div>
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.75rem',
                color: '#64748B',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                Academic Thesis · Open Access · {bookData?.year || 2024}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial="hidden"
              animate="visible"
              custom={0.1}
              variants={fadeUp}
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: '-0.025em',
                color: '#F0F4FA',
                marginBottom: '0.5rem',
              }}
              data-testid="hero-title"
            >
              {bookData?.title || 'The Diia Thesis'}
            </motion.h1>

            {/* UA accent line */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.15}
              variants={fadeUp}
              className="ua-accent-line"
              style={{ marginBottom: '1.25rem' }}
            />

            {/* Subtitle */}
            <motion.p
              initial="hidden"
              animate="visible"
              custom={0.2}
              variants={fadeUp}
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                fontWeight: 300,
                color: '#94A3B8',
                lineHeight: 1.5,
                marginBottom: '1.75rem',
                maxWidth: '60ch',
              }}
            >
              {bookData?.subtitle || 'AI, Digital Government, and the Future of Civic Intelligence — From Ukraine to the World'}
            </motion.p>

            {/* Description */}
            <motion.p
              initial="hidden"
              animate="visible"
              custom={0.28}
              variants={fadeUp}
              style={{
                fontSize: '0.9375rem',
                color: '#64748B',
                lineHeight: 1.7,
                marginBottom: '2rem',
                maxWidth: '64ch',
              }}
            >
              {bookData?.description || 'A rigorous academic thesis examining Ukraine\'s Diia platform as a global model for civic AI, exploring the balance between citizen empowerment and state control.'}
            </motion.p>

            {/* Theme pills */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.35}
              variants={fadeUp}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '2.5rem' }}
            >
              {THEME_PILLS.map(pill => (
                <span
                  key={pill}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: '99px',
                    border: '1px solid rgba(0,91,187,0.35)',
                    background: 'rgba(0,91,187,0.1)',
                    color: '#93C5FD',
                    fontSize: '0.75rem',
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontWeight: 500,
                    letterSpacing: '0.01em',
                  }}
                >
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#FFD500', flexShrink: 0 }} />
                  {pill}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.42}
              variants={fadeUp}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}
            >
              <Button
                onClick={scrollToRead}
                data-testid="hero-read-now-button"
                size="lg"
                style={{
                  background: '#005BBB',
                  color: '#FFFFFF',
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.9375rem',
                  padding: '0 28px',
                  height: '48px',
                  gap: '8px',
                  boxShadow: '0 4px 20px rgba(0,91,187,0.35)',
                }}
              >
                <BookOpen size={18} />
                Read the Thesis
              </Button>

              <a
                href={pdfUrl}
                download="The_Diia_Thesis.pdf"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Button
                  variant="outline"
                  data-testid="hero-download-pdf-button"
                  size="lg"
                  style={{
                    borderColor: 'rgba(255,213,0,0.4)',
                    color: '#FFD500',
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: '0.9375rem',
                    padding: '0 24px',
                    height: '48px',
                    gap: '8px',
                    background: 'transparent',
                  }}
                >
                  <Download size={16} />
                  Download PDF
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Right: Institutional metadata card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(0,91,187,0.25)',
              borderRadius: '12px',
              padding: '1.75rem',
              backdropFilter: 'blur(8px)',
              minWidth: '260px',
              maxWidth: '360px',
            }}
            data-testid="hero-metadata-card"
          >
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.6875rem',
              color: '#64748B',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}>
              Document Metadata
            </p>

            {[
              { label: 'Document Type', value: 'Academic Thesis' },
              { label: 'Subject', value: 'Digital Governance · Civic AI' },
              { label: 'Geographic Focus', value: 'Ukraine → Global' },
              { label: 'Language', value: bookData?.language || 'English' },
              { label: 'Access', value: bookData?.license || 'Open Access' },
              { label: 'Published', value: String(bookData?.year || 2024) },
            ].map(({ label, value }) => (
              <div key={label} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '1rem',
                padding: '10px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}>
                <span style={{ fontSize: '0.75rem', color: '#64748B', fontFamily: "'IBM Plex Mono', monospace", flexShrink: 0 }}>
                  {label}
                </span>
                <span style={{ fontSize: '0.8125rem', color: '#CBD5E1', textAlign: 'right', lineHeight: 1.4 }}>
                  {value}
                </span>
              </div>
            ))}

            {/* Comparison countries */}
            <div style={{ marginTop: '1.25rem' }}>
              <p style={{ fontSize: '0.6875rem', color: '#64748B', fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Comparative Cases
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {(bookData?.comparisons || ['Estonia', 'India', 'China', 'Singapore', 'Rwanda', 'Brazil']).map(c => (
                  <span key={c} style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: 'rgba(0,91,187,0.15)',
                    border: '1px solid rgba(0,91,187,0.2)',
                    color: '#93C5FD',
                    fontSize: '0.6875rem',
                    fontFamily: "'IBM Plex Mono', monospace",
                  }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '6px',
            marginTop: '4rem',
          }}
        >
          <span style={{ fontSize: '0.6875rem', color: '#475569', fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Scroll to read
          </span>
          <ChevronDown size={16} style={{ color: '#475569', animation: 'bounce 1.8s infinite' }} />
        </motion.div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
      `}</style>
    </section>
  );
}
