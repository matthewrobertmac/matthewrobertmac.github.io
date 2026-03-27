import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Users, Shield, Zap, Eye, Globe, AlertTriangle, Building } from 'lucide-react';

const ICON_MAP = { cpu: Cpu, users: Users, shield: Shield, zap: Zap, eye: Eye, globe: Globe, 'alert-triangle': AlertTriangle, building: Building };

const DEFAULT_THEMES = [
  { id: 'civic-ai', title: 'Civic AI & Digital Government', description: "Ukraine's Diia platform as a global model for citizen-first artificial intelligence in public service delivery.", tag: 'Digital Governance', icon: 'cpu' },
  { id: 'hromada', title: 'Hromada: Community Self-Governance', description: 'The Ukrainian concept of hromada — collective community agency — as the normative ideal guiding digital transformation.', tag: 'Political Philosophy', icon: 'users' },
  { id: 'dignity', title: 'Human Dignity & Participation', description: "Synthesizing Wojtyla's philosophy of participation with Marxian alienation theory to evaluate citizen-state digital relationships.", tag: 'Ethics', icon: 'shield' },
  { id: 'resilience', title: 'War-Time Resilience', description: "Ukraine's digital transformation under active conflict — how crisis accelerates civic technology and tests institutional design.", tag: 'War-time Governance', icon: 'zap' },
  { id: 'honest-ai', title: 'Honest AI & Transparency', description: 'AI systems must report uncertainty rather than fabricate answers. Transparency and accountability as foundational civic values.', tag: 'AI Ethics', icon: 'eye' },
  { id: 'linguistic-sovereignty', title: 'Linguistic Sovereignty', description: 'Developing AI models that preserve and process the Ukrainian language — linking technological capacity to national identity.', tag: 'Cultural Rights', icon: 'globe' },
  { id: 'surveillance', title: 'Democracy vs. Surveillance', description: 'Critical engagement with Zuboff, Morozov, and Eubanks on algorithmic discrimination, surveillance capitalism, and authoritarian creep.', tag: 'Critical Theory', icon: 'alert-triangle' },
  { id: 'institutional-design', title: 'Institutional Design', description: 'Technology is not neutral: the political valence of digital government is determined by institutional architecture, not the code itself.', tag: 'Institutional Design', icon: 'building' },
];

const PHILOSOPHERS = [
  { name: 'Karl Marx', tradition: 'Alienation & Labour', contribution: 'Examining how digital bureaucracy may alienate citizens from their own data and civic identity.' },
  { name: 'Karol Wojtyla', tradition: 'Personalism', contribution: "The philosophy of participation — evaluating whether Diia enhances or diminishes citizens' subjective agency." },
  { name: 'Cossack Tradition', tradition: 'Democratic Radical', contribution: 'Ukrainian historical model of participatory, decentralised self-governance as normative benchmark.' },
  { name: 'Catholic Social Teaching', tradition: 'Common Good', contribution: 'Subsidiarity and the common good as standards for assessing the design of civic AI systems.' },
];

function ThemeCard({ theme, index }) {
  const Icon = ICON_MAP[theme.icon] || Cpu;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
      data-testid={`theme-card-${theme.id}`}
      style={{
        background: '#FFFFFF',
        border: '1px solid #C4A882',
        borderRadius: '3px',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        transition: 'box-shadow 200ms ease, transform 200ms ease, border-color 200ms ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 6px 24px rgba(44,26,14,0.12)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.borderColor = '#005BBB40';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = '#C4A882';
      }}
    >
      {/* Top: icon + tag */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
        <div style={{
          width: 38, height: 38, borderRadius: '3px',
          background: 'rgba(0,91,187,0.07)',
          border: '1px solid rgba(0,91,187,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Icon size={17} color="#005BBB" />
        </div>
        <span style={{
          padding: '3px 9px',
          border: '1px solid #C4A882',
          borderRadius: '2px',
          background: '#FAF8F2',
          color: '#8B6340',
          fontSize: '0.6rem',
          fontFamily: "'IBM Plex Mono', monospace",
          letterSpacing: '0.05em',
          whiteSpace: 'nowrap',
          textTransform: 'uppercase',
        }}>
          {theme.tag}
        </span>
      </div>

      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '1rem',
        fontWeight: 600,
        color: '#2C1A0E',
        lineHeight: 1.3,
        margin: 0,
      }}>
        {theme.title}
      </h3>

      <p style={{
        fontFamily: "'Crimson Text', serif",
        fontSize: '0.9375rem',
        color: '#5C3D1E',
        lineHeight: 1.65,
        margin: 0,
        flex: 1,
      }}>
        {theme.description}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#FFD500' }} />
        <span style={{ fontSize: '0.6875rem', color: '#C4A882', fontFamily: "'IBM Plex Mono', monospace" }}>
          Why it matters
        </span>
      </div>
    </motion.div>
  );
}

export default function ThemesSection({ bookData }) {
  const themes = bookData?.themes || DEFAULT_THEMES;

  return (
    <section
      id="about"
      className="scroll-mt-nav"
      style={{
        background: '#FAF8F2',
        padding: '5rem 0',
        borderTop: '1px solid #C4A882',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          style={{ marginBottom: '3rem' }}
        >
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.65rem',
            color: '#005BBB',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}>
            Research Themes
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight: 700,
            color: '#2C1A0E',
            letterSpacing: '-0.01em',
            marginBottom: '0.5rem',
          }}>
            About the Thesis
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <div style={{ width: 30, height: 3, background: '#005BBB', opacity: 0.6, borderRadius: 2 }} />
            <div style={{ width: 15, height: 3, background: '#FFD500', opacity: 0.8, borderRadius: 2 }} />
          </div>
          <p style={{
            fontFamily: "'Crimson Text', serif",
            fontSize: '1.0625rem',
            color: '#5C3D1E',
            maxWidth: '66ch',
            lineHeight: 1.72,
          }}>
            This thesis weaves together political philosophy, data science, and comparative governance to ask: can digital government genuinely serve human dignity — or does it risk becoming an instrument of control? Eight themes anchor the inquiry.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
          gap: '1.25rem',
          marginBottom: '4rem',
        }}>
          {themes.map((theme, i) => <ThemeCard key={theme.id} theme={theme} index={i} />)}
        </div>

        {/* Philosophical foundations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            background: '#F5F0E8',
            border: '1px solid #C4A882',
            borderRadius: '3px',
            padding: '2.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Accent stripe */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, bottom: 0, width: 4,
            background: 'repeating-linear-gradient(180deg, #005BBB 0px, #005BBB 12px, #FFD500 12px, #FFD500 24px)',
            opacity: 0.6,
          }} />

          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.65rem',
            color: '#8B6340',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            paddingLeft: '1rem',
          }}>
            Philosophical Framework
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            paddingLeft: '1rem',
          }}>
            {PHILOSOPHERS.map(({ name, tradition, contribution }) => (
              <div key={name} style={{
                borderLeft: '2px solid rgba(0,91,187,0.3)',
                paddingLeft: '1rem',
              }}>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#2C1A0E',
                  marginBottom: '2px',
                }}>
                  {name}
                </p>
                <p style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.6rem',
                  color: '#005BBB',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}>
                  {tradition}
                </p>
                <p style={{
                  fontFamily: "'Crimson Text', serif",
                  fontSize: '0.9rem',
                  color: '#5C3D1E',
                  lineHeight: 1.6,
                }}>
                  {contribution}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
