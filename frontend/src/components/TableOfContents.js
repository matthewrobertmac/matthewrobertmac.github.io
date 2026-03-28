import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight, Scroll } from 'lucide-react';

const TOC_ENTRIES = [
  {
    type: 'front',
    label: 'Preface',
    subtitle: 'On Cossack Democracy and the Digital Age',
    pages: '1–4',
    icon: '✦',
  },
  {
    type: 'chapter',
    num: 'Introduction',
    label: 'The Laboratory at the Edge of Empire',
    subtitle: 'Why Ukraine matters to global digital governance',
    pages: '5–18',
    icon: 'I',
  },
  {
    type: 'chapter',
    num: 'Chapter I',
    label: 'Diia — Architecture of the Digital State',
    subtitle: 'Platform design, service delivery, and democratic legitimacy',
    pages: '19–38',
    icon: 'I',
  },
  {
    type: 'chapter',
    num: 'Chapter II',
    label: 'The Philosophy of Participation',
    subtitle: 'Wojtyla\'s personalism and the citizen-state digital relationship',
    pages: '39–58',
    icon: 'II',
  },
  {
    type: 'chapter',
    num: 'Chapter III',
    label: 'Hromada and the Digital Commons',
    subtitle: 'Cossack self-governance as the normative benchmark',
    pages: '59–76',
    icon: 'III',
  },
  {
    type: 'chapter',
    num: 'Chapter IV',
    label: 'Comparative Digital Governance',
    subtitle: 'Estonia, India, China, Singapore, Rwanda, Brazil',
    pages: '77–98',
    icon: 'IV',
  },
  {
    type: 'chapter',
    num: 'Chapter V',
    label: 'The Architecture of Honest AI',
    subtitle: 'Transparency, uncertainty, and accountability in civic systems',
    pages: '99–116',
    icon: 'V',
  },
  {
    type: 'chapter',
    num: 'Chapter VI',
    label: 'Linguistic Sovereignty',
    subtitle: 'Ukrainian language models and cultural self-determination',
    pages: '117–130',
    icon: 'VI',
  },
  {
    type: 'chapter',
    num: 'Chapter VII',
    label: 'Humanitarian Technology',
    subtitle: 'Demining, crisis AI, and governance under conflict',
    pages: '131–144',
    icon: 'VII',
  },
  {
    type: 'chapter',
    num: 'Chapter VIII',
    label: 'Democracy vs. Surveillance',
    subtitle: 'Zuboff, Morozov, Eubanks and the techno-political question',
    pages: '145–158',
    icon: 'VIII',
  },
  {
    type: 'chapter',
    num: 'Conclusion',
    label: 'From Zaporizhia to the World',
    subtitle: 'A Cossack model for civic AI in the 21st century',
    pages: '159–172',
    icon: '✦',
  },
  {
    type: 'back',
    label: 'Appendices & Bibliography',
    subtitle: 'Comparative platform data, methodology, and sources',
    pages: '173–end',
    icon: '✦',
  },
];

export default function TableOfContents({ onPageSelect }) {
  const [hoveredEntry, setHoveredEntry] = useState(null);

  const scrollToRead = () => {
    const el = document.getElementById('read');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 68, behavior: 'smooth' });
  };

  return (
    <section
      id="toc"
      className="scroll-mt-nav"
      style={{
        background: '#FAF8F2',
        borderTop: '1px solid #C4A882',
        padding: '4rem 0',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
            <Scroll size={15} style={{ color: '#005BBB' }} />
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.65rem',
              color: '#005BBB',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              margin: 0,
            }}>
              Contents
            </p>
          </div>
          <h2
            data-testid="toc-section-title"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 700,
              color: '#2C1A0E',
              letterSpacing: '-0.01em',
              marginBottom: '0.5rem',
            }}
          >
            Table of Contents
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
            <div style={{ width: 30, height: 3, background: '#005BBB', opacity: 0.5, borderRadius: 2 }} />
            <div style={{ width: 10, height: 3, background: '#FFD500', opacity: 0.8, borderRadius: 2 }} />
          </div>
          <p style={{
            fontFamily: "'Crimson Text', serif",
            fontStyle: 'italic',
            color: '#8B6340',
            fontSize: '1rem',
          }}>
            Click any chapter to jump to it in the document below
          </p>
        </motion.div>

        {/* TOC table */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            background: '#FFFFFF',
            border: '1px solid #C4A882',
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow: '0 2px 16px rgba(44,26,14,0.07)',
          }}
        >
          {/* Table header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '1rem',
            padding: '10px 24px',
            background: '#2C1A0E',
            borderBottom: '1px solid #8B6340',
          }}>
            {/* Embroidery stripe */}
            <div style={{
              position: 'absolute',
              left: 0,
              width: 4,
              background: 'repeating-linear-gradient(180deg, #005BBB 0px, #005BBB 10px, #FFD500 10px, #FFD500 20px)',
            }} />
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.6rem',
              color: '#FFD500',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              Chapter
            </span>
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.6rem',
              color: '#8B6340',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              Pages
            </span>
          </div>

          {/* Entries */}
          {TOC_ENTRIES.map((entry, i) => {
            const isHovered = hoveredEntry === i;
            const isFrontBack = entry.type === 'front' || entry.type === 'back';

            return (
              <motion.button
                key={i}
                data-testid={`toc-entry-${i}`}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                onClick={scrollToRead}
                onMouseEnter={() => setHoveredEntry(i)}
                onMouseLeave={() => setHoveredEntry(null)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  gap: '1rem',
                  alignItems: 'center',
                  padding: '14px 24px',
                  background: isHovered ? 'rgba(0,91,187,0.04)' : '#FFFFFF',
                  border: 'none',
                  borderBottom: i < TOC_ENTRIES.length - 1 ? '1px solid rgba(196,168,130,0.25)' : 'none',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'background 150ms ease',
                }}
              >
                {/* Chapter num / icon */}
                <div style={{
                  width: isFrontBack ? 28 : 40,
                  height: 28,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  borderRight: '1px solid rgba(196,168,130,0.3)',
                  paddingRight: '0.75rem',
                }}>
                  {isFrontBack ? (
                    <span style={{ color: '#FFD500', fontSize: '0.875rem', lineHeight: 1 }}>✦</span>
                  ) : (
                    <span style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '0.6rem',
                      color: isHovered ? '#005BBB' : '#C4A882',
                      letterSpacing: '0.04em',
                      whiteSpace: 'nowrap',
                      textTransform: 'uppercase',
                    }}>
                      {entry.num?.split(' ').pop()}
                    </span>
                  )}
                </div>

                {/* Title + subtitle */}
                <div>
                  {!isFrontBack && entry.num !== 'Conclusion' && entry.num !== 'Introduction' && (
                    <p style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '0.6rem',
                      color: isHovered ? '#005BBB' : '#8B6340',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      margin: '0 0 3px',
                      transition: 'color 150ms ease',
                    }}>
                      {entry.num}
                    </p>
                  )}
                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: isFrontBack ? '0.9rem' : '1rem',
                    fontWeight: isFrontBack ? 400 : 600,
                    fontStyle: isFrontBack ? 'italic' : 'normal',
                    color: isHovered ? '#005BBB' : '#2C1A0E',
                    margin: '0 0 2px',
                    transition: 'color 150ms ease',
                    lineHeight: 1.3,
                  }}>
                    {entry.label}
                  </p>
                  {entry.subtitle && (
                    <p style={{
                      fontFamily: "'Crimson Text', serif",
                      fontStyle: 'italic',
                      fontSize: '0.875rem',
                      color: '#8B6340',
                      margin: 0,
                      lineHeight: 1.4,
                    }}>
                      {entry.subtitle}
                    </p>
                  )}
                </div>

                {/* Pages + arrow */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  {/* Dot leader */}
                  <div style={{
                    width: 48,
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                  }} className="hide-sm">
                    <div style={{
                      flex: 1,
                      borderBottom: '1px dotted #C4A882',
                      height: 1,
                    }} />
                  </div>
                  <span style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '0.6875rem',
                    color: '#8B6340',
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                  }}>
                    {entry.pages}
                  </span>
                  <ChevronRight
                    size={14}
                    style={{
                      color: isHovered ? '#005BBB' : '#C4A882',
                      opacity: isHovered ? 1 : 0.5,
                      transition: 'color 150ms ease, opacity 150ms ease',
                    }}
                  />
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Open in PDF CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{
            marginTop: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '0.75rem',
          }}
        >
          <span style={{
            fontFamily: "'Crimson Text', serif",
            fontStyle: 'italic',
            color: '#8B6340',
            fontSize: '0.9375rem',
          }}>
            Read the full document below
          </span>
          <button
            onClick={scrollToRead}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              padding: '8px 18px',
              background: '#2C1A0E',
              color: '#FAF8F2',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              fontFamily: "'Playfair Display', serif",
              fontSize: '0.9375rem',
              fontWeight: 600,
            }}
          >
            <BookOpen size={15} />
            Read PDF
          </button>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .hide-sm { display: none !important; }
        }
      `}</style>
    </section>
  );
}
