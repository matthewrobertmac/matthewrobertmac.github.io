import React from 'react';
import { Download, ExternalLink } from 'lucide-react';

export default function Footer({ bookData }) {
  const pdfUrl = bookData?.pdf_url || '#';

  return (
    <footer style={{
      background: '#2C1A0E',
      borderTop: '1px solid #8B6340',
      padding: '3rem 0 1.5rem',
      color: '#8B6340',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Embroidery stripe at top */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, height: 5,
        background: 'repeating-linear-gradient(90deg, #005BBB 0px, #005BBB 12px, #FFD500 12px, #FFD500 24px)',
        opacity: 0.7,
      }} />

      {/* Blue/yellow side stripes */}
      <div style={{
        position: 'absolute',
        left: 0, top: 0, bottom: 0, width: 5,
        background: 'repeating-linear-gradient(180deg, #005BBB 0px, #005BBB 20px, #FFD500 20px, #FFD500 40px)',
        opacity: 0.4,
      }} />
      <div style={{
        position: 'absolute',
        right: 0, top: 0, bottom: 0, width: 5,
        background: 'repeating-linear-gradient(180deg, #FFD500 0px, #FFD500 20px, #005BBB 20px, #005BBB 40px)',
        opacity: 0.4,
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: 26, height: 19, borderRadius: 3, overflow: 'hidden', flexShrink: 0 }}>
                <div style={{ flex: 1, background: '#005BBB' }} />
                <div style={{ flex: 1, background: '#FFD500' }} />
              </div>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: '1rem',
                color: '#FAF8F2',
              }}>
                The Diia Thesis
              </span>
            </div>
            <p style={{
              fontFamily: "'Crimson Text', serif",
              fontSize: '0.9375rem',
              lineHeight: 1.65,
              maxWidth: '38ch',
              color: '#8B6340',
            }}>
              AI, Digital Government, and the Future of Civic Intelligence — From Ukraine to the World. Rooted in Cossack democratic tradition.
            </p>
          </div>

          {/* Citation */}
          <div>
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.6rem',
              color: '#FFD500',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}>
              Suggested Citation
            </p>
            <p style={{
              fontFamily: "'Crimson Text', serif",
              fontStyle: 'italic',
              fontSize: '0.875rem',
              lineHeight: 1.65,
              color: '#6B4F35',
              padding: '12px 14px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(196,168,130,0.2)',
              borderRadius: '3px',
              userSelect: 'all',
            }}>
              "The Diia Thesis: AI, Digital Government, and the Future of Civic Intelligence — From Ukraine to the World." ({bookData?.year || 2024}). Open Access Academic Research.
            </p>
          </div>

          {/* Links */}
          <div>
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.6rem',
              color: '#FFD500',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.875rem',
            }}>
              Resources
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              <a
                href={pdfUrl}
                download="The_Diia_Thesis.pdf"
                target="_blank"
                rel="noreferrer"
                data-testid="footer-download-link"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#A8C4E0', textDecoration: 'none', fontSize: '0.9375rem', fontFamily: "'Crimson Text', serif" }}
              >
                <Download size={13} /> Download PDF
              </a>
              <a
                href="https://diia.gov.ua"
                target="_blank"
                rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#A8C4E0', textDecoration: 'none', fontSize: '0.9375rem', fontFamily: "'Crimson Text', serif" }}
              >
                <ExternalLink size={13} /> Diia Platform
              </a>
              <a
                href="https://thedigital.gov.ua"
                target="_blank"
                rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#A8C4E0', textDecoration: 'none', fontSize: '0.9375rem', fontFamily: "'Crimson Text', serif" }}
              >
                <ExternalLink size={13} /> Ministry of Digital Transformation
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid rgba(196,168,130,0.15)',
        }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: '#6B4F35' }}>
            {bookData?.license || 'Open Access — Academic Research'}
          </p>
          <p style={{ fontFamily: "'Crimson Text', serif", fontStyle: 'italic', fontSize: '0.8125rem', color: '#6B4F35' }}>
            Glory to Ukraine · Слава Україні
          </p>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: '#6B4F35' }}>
            <a href={pdfUrl} target="_blank" rel="noreferrer" style={{ color: '#A8C4E0', textDecoration: 'none' }}>
              Open PDF natively for screen reader access
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
