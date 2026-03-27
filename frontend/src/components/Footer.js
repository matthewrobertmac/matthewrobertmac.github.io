import React from 'react';
import { ExternalLink, Download, BookOpen } from 'lucide-react';

export default function Footer({ bookData }) {
  const pdfUrl = bookData?.pdf_url || '#';

  return (
    <footer
      style={{
        background: '#0B1220',
        borderTop: '1px solid rgba(0,91,187,0.25)',
        padding: '3rem 0 2rem',
        color: '#64748B',
      }}
    >
      <div style={{
        maxWidth: '72rem',
        margin: '0 auto',
        padding: '0 1.5rem',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.875rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: 24, height: 18, borderRadius: 3, overflow: 'hidden', flexShrink: 0 }}>
                <div style={{ flex: 1, background: '#005BBB' }} />
                <div style={{ flex: 1, background: '#FFD500' }} />
              </div>
              <span style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontWeight: 600,
                fontSize: '0.9375rem',
                color: '#F0F4FA',
              }}>
                The Diia Thesis
              </span>
            </div>
            <p style={{ fontSize: '0.8125rem', lineHeight: 1.65, maxWidth: '38ch' }}>
              AI, Digital Government, and the Future of Civic Intelligence — From Ukraine to the World.
              An open-access academic research program.
            </p>
          </div>

          {/* Citation */}
          <div>
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.6875rem',
              color: '#94A3B8',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}>
              Citation
            </p>
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.75rem',
              lineHeight: 1.65,
              color: '#475569',
              padding: '10px 14px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '6px',
              userSelect: 'all',
            }}>
              "The Diia Thesis: AI, Digital Government, and the Future of Civic Intelligence — From Ukraine to the World." ({bookData?.year || 2024}). Open Access.
            </p>
          </div>

          {/* Links */}
          <div>
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.6875rem',
              color: '#94A3B8',
              letterSpacing: '0.08em',
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
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#93C5FD',
                  textDecoration: 'none',
                  fontSize: '0.8125rem',
                }}
              >
                <Download size={13} />
                Download PDF
              </a>
              <a
                href="https://diia.gov.ua"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#93C5FD',
                  textDecoration: 'none',
                  fontSize: '0.8125rem',
                }}
              >
                <ExternalLink size={13} />
                Diia Platform
              </a>
              <a
                href="https://thedigital.gov.ua"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#93C5FD',
                  textDecoration: 'none',
                  fontSize: '0.8125rem',
                }}
              >
                <ExternalLink size={13} />
                Ministry of Digital Transformation
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
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          <p style={{ fontSize: '0.75rem', fontFamily: "'IBM Plex Mono', monospace" }}>
            {bookData?.license || 'Open Access — Academic Research'}
          </p>
          <p style={{ fontSize: '0.75rem', fontFamily: "'IBM Plex Mono', monospace" }}>
            <span style={{ color: '#334155' }}>Accessibility:</span>{' '}
            <a href={pdfUrl} target="_blank" rel="noreferrer" style={{ color: '#93C5FD', textDecoration: 'none' }}>
              Open PDF natively for screen reader access
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
