import React from 'react';
import { motion } from 'framer-motion';

const PAINTINGS = [
  {
    src: 'https://images.pexels.com/photos/30736365/pexels-photo-30736365.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    title: 'Cossack Horseman',
    subtitle: 'The Warrior of the Steppe',
    caption: 'The Zaporizhian Cossacks were fierce defenders of Ukrainian liberty and democracy.',
    rotate: -1.5,
  },
  {
    src: 'https://images.pexels.com/photos/29189099/pexels-photo-29189099.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    title: 'Knight of the Steppe',
    subtitle: 'By the River Dnipro',
    caption: 'Along the banks of the Dnipro, Cossacks forged a tradition of communal self-governance — the Hromada.',
    rotate: 1.2,
  },
  {
    src: 'https://images.unsplash.com/photo-1647462028480-811fd621c216?crop=entropy&cs=srgb&fm=jpg&q=85&w=800',
    title: 'The Golden Steppe',
    subtitle: 'Ukrainian Heartland',
    caption: 'The vast Ukrainian steppe — from which the Cossack spirit of freedom and resilience emerged.',
    rotate: -0.8,
  },
  {
    src: 'https://images.unsplash.com/photo-1684091484618-60924933854c?crop=entropy&cs=srgb&fm=jpg&q=85&w=800',
    title: 'Fields of Sunflowers',
    subtitle: 'Symbol of Ukraine',
    caption: 'The sunflower, Ukraine\'s national flower, turns always toward the light — as the Cossack spirit turns toward freedom.',
    rotate: 1.5,
  },
  {
    src: 'https://images.pexels.com/photos/14545209/pexels-photo-14545209.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    title: 'Vyshyvanka',
    subtitle: 'The Living Embroidery',
    caption: 'Ukrainian embroidery — vyshyvanka — encodes centuries of cultural memory, identity, and defiance.',
    rotate: -1.2,
  },
  {
    src: 'https://images.unsplash.com/photo-1683881573436-f7f2c0e3c7d0?crop=entropy&cs=srgb&fm=jpg&q=85&w=800',
    title: 'Pysanky',
    subtitle: 'Painted Easter Eggs',
    caption: 'Pysanky — Ukrainian decorated eggs — bear ancient symbols of protection, life, and the continuity of tradition.',
    rotate: 0.9,
  },
];

export default function GallerySection() {
  return (
    <section
      id="gallery"
      className="scroll-mt-nav"
      style={{
        background: '#FAF8F2',
        padding: '5rem 0',
        borderTop: '1px solid #C4A882',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.65rem',
            color: '#005BBB',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}>
            The Cossack Heritage
          </p>
          <h2 className="ornate-heading" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
            fontWeight: 700,
            color: '#2C1A0E',
            letterSpacing: '-0.01em',
            margin: '0 0 0.5rem',
          }}>
            Gallery of the Steppe
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', margin: '0.75rem 0 1rem' }}>
            <div style={{ height: 1, width: 60, background: 'linear-gradient(90deg, transparent, #C4A882)' }} />
            <span style={{ color: '#FFD500', fontSize: '1.2rem' }}>✦</span>
            <div style={{ height: 1, width: 60, background: 'linear-gradient(90deg, #C4A882, transparent)' }} />
          </div>
          <p style={{
            fontFamily: "'Crimson Text', serif",
            fontStyle: 'italic',
            fontSize: '1.125rem',
            color: '#5C3D1E',
            maxWidth: '56ch',
            margin: '0 auto',
            lineHeight: 1.65,
          }}>
            The Diia Thesis draws on centuries of Cossack democratic tradition — a people who forged collective governance, cultural identity, and fierce independence long before the digital age.
          </p>
        </motion.div>

        {/* Painting grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2.5rem',
        }}>
          {PAINTINGS.map((painting, i) => (
            <motion.div
              key={painting.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {/* Frame wrapper with slight rotation */}
              <div
                className="gallery-painting"
                style={{
                  transform: `rotate(${painting.rotate}deg)`,
                  background: '#FFFDF8',
                  padding: '10px 10px 48px',
                  boxShadow: '0 6px 24px rgba(44,26,14,0.18), 0 2px 6px rgba(44,26,14,0.1)',
                  border: '1px solid #C4A882',
                }}
              >
                {/* Painting image */}
                <div style={{
                  overflow: 'hidden',
                  background: '#E8E2D6',
                  lineHeight: 0,
                }}>
                  <img
                    src={painting.src}
                    alt={painting.title}
                    style={{
                      width: '100%',
                      height: 220,
                      objectFit: 'cover',
                      display: 'block',
                      filter: 'sepia(10%) saturate(105%) contrast(103%)',
                    }}
                  />
                </div>
                {/* Caption area (Polaroid style) */}
                <div style={{ padding: '10px 4px 0', textAlign: 'center' }}>
                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                    fontSize: '0.875rem',
                    color: '#2C1A0E',
                    fontWeight: 500,
                    lineHeight: 1.3,
                    marginBottom: '4px',
                  }}>
                    {painting.title}
                  </p>
                  <p style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '0.6rem',
                    color: '#8B6340',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}>
                    {painting.subtitle}
                  </p>
                  <p style={{
                    fontFamily: "'Crimson Text', serif",
                    fontSize: '0.8125rem',
                    color: '#5C3D1E',
                    lineHeight: 1.5,
                  }}>
                    {painting.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cossack quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            marginTop: '4rem',
            padding: '2.5rem',
            background: '#2C1A0E',
            borderRadius: '3px',
            border: '1px solid #8B6340',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Blue/yellow embroidery stripe top */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, height: 4,
            background: 'repeating-linear-gradient(90deg, #005BBB 0px, #005BBB 12px, #FFD500 12px, #FFD500 24px)',
            opacity: 0.7,
          }} />
          <span style={{ color: '#FFD500', fontSize: '2rem', lineHeight: 1 }}>"</span>
          <blockquote style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            color: '#FAF8F2',
            lineHeight: 1.6,
            maxWidth: '60ch',
            margin: '0 auto 1rem',
          }}>
            The hromada is not merely a village council — it is the living spirit of collective dignity. What Diia attempts to digitize, the Cossacks built with fire and council.
          </blockquote>
          <cite style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.7rem',
            color: '#FFD500',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            — The Diia Thesis, Chapter III: Hromada and the Digital Commons
          </cite>
        </motion.div>
      </div>
    </section>
  );
}
