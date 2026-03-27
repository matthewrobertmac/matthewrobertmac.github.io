import React from 'react';
import { motion } from 'framer-motion';
import {
  Cpu, Users, Shield, Zap, Eye, Globe, AlertTriangle, Building
} from 'lucide-react';

const ICON_MAP = {
  cpu: Cpu,
  users: Users,
  shield: Shield,
  zap: Zap,
  eye: Eye,
  globe: Globe,
  'alert-triangle': AlertTriangle,
  building: Building,
};

const TAG_COLORS = {
  'Digital Governance': { bg: 'rgba(0,91,187,0.08)', color: '#005BBB', border: 'rgba(0,91,187,0.2)' },
  'Political Philosophy': { bg: 'rgba(139,92,246,0.08)', color: '#7C3AED', border: 'rgba(139,92,246,0.2)' },
  'Ethics': { bg: 'rgba(16,185,129,0.08)', color: '#065F46', border: 'rgba(16,185,129,0.25)' },
  'War-time Governance': { bg: 'rgba(239,68,68,0.08)', color: '#B91C1C', border: 'rgba(239,68,68,0.2)' },
  'AI Ethics': { bg: 'rgba(255,213,0,0.12)', color: '#92400E', border: 'rgba(255,213,0,0.35)' },
  'Cultural Rights': { bg: 'rgba(14,165,233,0.08)', color: '#0369A1', border: 'rgba(14,165,233,0.22)' },
  'Critical Theory': { bg: 'rgba(100,116,139,0.08)', color: '#334155', border: 'rgba(100,116,139,0.2)' },
  'Institutional Design': { bg: 'rgba(0,91,187,0.06)', color: '#1E40AF', border: 'rgba(0,91,187,0.18)' },
};

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

function ThemeCard({ theme, index }) {
  const IconComp = ICON_MAP[theme.icon] || Cpu;
  const tagStyle = TAG_COLORS[theme.tag] || TAG_COLORS['Digital Governance'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
      className="theme-card"
      data-testid={`theme-card-${theme.id}`}
      style={{
        background: '#FFFFFF',
        border: '1px solid hsl(var(--border))',
        borderRadius: '10px',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.875rem',
        cursor: 'default',
      }}
    >
      {/* Icon + Tag row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: '8px',
          background: 'rgba(0,91,187,0.08)',
          border: '1px solid rgba(0,91,187,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <IconComp size={18} color="#005BBB" />
        </div>
        <span style={{
          padding: '3px 10px',
          borderRadius: '4px',
          background: tagStyle.bg,
          border: `1px solid ${tagStyle.border}`,
          color: tagStyle.color,
          fontSize: '0.6875rem',
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 500,
          letterSpacing: '0.03em',
          whiteSpace: 'nowrap',
        }}>
          {theme.tag}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontSize: '0.9375rem',
        fontWeight: 600,
        color: 'hsl(var(--foreground))',
        lineHeight: 1.35,
        margin: 0,
      }}>
        {theme.title}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: '0.8375rem',
        color: 'hsl(var(--muted-foreground))',
        lineHeight: 1.65,
        margin: 0,
        flex: 1,
      }}>
        {theme.description}
      </p>

      {/* UA accent dot */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFD500' }} />
        <span style={{ fontSize: '0.6875rem', color: '#94A3B8', fontFamily: "'IBM Plex Mono', monospace" }}>
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
        background: 'hsl(var(--background))',
        padding: '5rem 0',
        borderTop: '1px solid hsl(var(--border))',
      }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ marginBottom: '3rem' }}
        >
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.6875rem',
            color: '#005BBB',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}>
            Research Themes
          </p>
          <h2 style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 600,
            color: 'hsl(var(--foreground))',
            letterSpacing: '-0.02em',
            marginBottom: '0.5rem',
          }}>
            About the Thesis
          </h2>
          <div className="ua-accent-line" style={{ marginBottom: '1rem' }} />
          <p style={{
            fontSize: '0.9375rem',
            color: 'hsl(var(--muted-foreground))',
            maxWidth: '68ch',
            lineHeight: 1.7,
          }}>
            This thesis weaves together political philosophy, data science, and comparative governance to ask: can digital government genuinely serve human dignity — or does it risk becoming an instrument of control? Eight themes anchor the inquiry.
          </p>
        </motion.div>

        {/* Theme grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}>
          {themes.map((theme, i) => (
            <ThemeCard key={theme.id} theme={theme} index={i} />
          ))}
        </div>

        {/* Philosophical foundations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          style={{
            marginTop: '3.5rem',
            padding: '2rem',
            background: '#0B1220',
            borderRadius: '12px',
            border: '1px solid rgba(0,91,187,0.3)',
          }}
        >
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.6875rem',
            color: '#64748B',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Philosophical Framework
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
          }}>
            {[
              { name: 'Karl Marx', tradition: 'Alienation & Labour', contribution: 'Examining how digital bureaucracy may alienate citizens from their own data and civic identity.' },
              { name: 'Karol Wojtyla', tradition: 'Personalism', contribution: "The philosophy of participation — evaluating whether Diia enhances or diminishes citizens' subjective agency." },
              { name: 'Cossack Tradition', tradition: 'Democratic Radical', contribution: 'Ukrainian historical model of participatory, decentralised self-governance as normative benchmark.' },
              { name: 'Catholic Social Teaching', tradition: 'Common Good', contribution: 'Subsidiarity and the common good as standards for assessing the design of civic AI systems.' },
            ].map(({ name, tradition, contribution }) => (
              <div key={name} style={{
                borderLeft: '2px solid rgba(0,91,187,0.4)',
                paddingLeft: '1rem',
              }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F0F4FA', fontFamily: "'IBM Plex Sans', sans-serif", marginBottom: '2px' }}>
                  {name}
                </p>
                <p style={{ fontSize: '0.6875rem', color: '#FFD500', fontFamily: "'IBM Plex Mono', monospace", marginBottom: '6px' }}>
                  {tradition}
                </p>
                <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.5 }}>
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
