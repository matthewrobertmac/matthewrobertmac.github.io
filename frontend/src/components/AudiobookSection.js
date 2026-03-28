import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Headphones, Play, ExternalLink, Volume2 } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  // Handle: youtu.be/ID, youtube.com/watch?v=ID, youtube.com/embed/ID
  let id = null;
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') {
      id = u.pathname.slice(1);
    } else if (u.hostname.includes('youtube.com')) {
      if (u.pathname.includes('/embed/')) {
        id = u.pathname.split('/embed/')[1].split('/')[0];
      } else {
        id = u.searchParams.get('v');
      }
    }
  } catch {
    // Try raw ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) id = url;
  }
  return id ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&color=white` : null;
}

export default function AudiobookSection() {
  const [youtubeUrl, setYoutubeUrl] = useState(null);
  const [configured, setConfigured] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/config`)
      .then(r => r.json())
      .then(data => {
        setYoutubeUrl(data.youtube_url || null);
        setConfigured(data.youtube_configured || false);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const embedUrl = youtubeUrl ? getYouTubeEmbedUrl(youtubeUrl) : null;

  return (
    <section
      id="audiobook"
      className="scroll-mt-nav"
      style={{
        background: '#FFFDF8',
        borderTop: '1px solid #C4A882',
        borderBottom: '1px solid #C4A882',
        padding: '4rem 0',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '2.5rem' }}
        >
          {/* Overline label */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '6px 16px',
            background: '#2C1A0E',
            borderRadius: '2px',
            marginBottom: '1.25rem',
          }}>
            <Headphones size={14} style={{ color: '#FFD500' }} />
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.65rem',
              color: '#FFD500',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}>
              Audiobook
            </span>
            <Volume2 size={14} style={{ color: '#FFD500' }} />
          </div>

          <h2
            data-testid="audiobook-section-title"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              fontWeight: 700,
              color: '#2C1A0E',
              letterSpacing: '-0.01em',
              marginBottom: '0.5rem',
              lineHeight: 1.15,
            }}
          >
            Listen to the Thesis
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
            <div style={{ width: 30, height: 3, background: '#005BBB', opacity: 0.5, borderRadius: 2 }} />
            <div style={{ width: 10, height: 3, background: '#FFD500', opacity: 0.8, borderRadius: 2 }} />
          </div>

          <p style={{
            fontFamily: "'Crimson Text', serif",
            fontStyle: 'italic',
            fontSize: '1.0625rem',
            color: '#5C3D1E',
            maxWidth: '58ch',
            lineHeight: 1.6,
          }}>
            A full audio reading of The Diia Thesis — journey through the Cossack spirit of civic intelligence at your own pace.
          </p>
        </motion.div>

        {/* Player */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          {!loading && embedUrl ? (
            /* YouTube Embed */
            <div style={{
              position: 'relative',
              background: '#1A1009',
              borderRadius: '4px',
              overflow: 'hidden',
              boxShadow: '0 8px 40px rgba(44,26,14,0.2), 0 2px 8px rgba(44,26,14,0.1)',
              border: '1px solid #8B6340',
            }}>
              {/* Embroidery stripe */}
              <div style={{
                height: 5,
                background: 'repeating-linear-gradient(90deg, #005BBB 0px, #005BBB 12px, #FFD500 12px, #FFD500 24px)',
                opacity: 0.8,
              }} />
              {/* 16:9 aspect ratio container */}
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                <iframe
                  data-testid="youtube-iframe"
                  src={embedUrl}
                  title="The Diia Thesis — Audiobook"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  frameBorder="0"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                />
              </div>
              {/* Bottom info bar */}
              <div style={{
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#FFD500' }} />
                  <span style={{
                    fontFamily: "'Crimson Text', serif",
                    fontStyle: 'italic',
                    color: '#8B6340',
                    fontSize: '0.875rem',
                  }}>
                    The Diia Thesis — Full Audiobook
                  </span>
                </div>
                {youtubeUrl && (
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      color: '#A8C4E0',
                      textDecoration: 'none',
                      fontSize: '0.8125rem',
                      fontFamily: "'Crimson Text', serif",
                    }}
                  >
                    <ExternalLink size={12} />
                    Open on YouTube
                  </a>
                )}
              </div>
            </div>
          ) : !loading && !embedUrl ? (
            /* Placeholder — URL not yet configured */
            <div
              data-testid="audiobook-placeholder"
              style={{
                background: '#F5F0E8',
                border: '2px dashed #C4A882',
                borderRadius: '4px',
                padding: '4rem 2rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Decorative corner ornaments */}
              <div style={{ position: 'absolute', top: 12, left: 12, width: 24, height: 24, borderTop: '2px solid #C4A882', borderLeft: '2px solid #C4A882' }} />
              <div style={{ position: 'absolute', top: 12, right: 12, width: 24, height: 24, borderTop: '2px solid #C4A882', borderRight: '2px solid #C4A882' }} />
              <div style={{ position: 'absolute', bottom: 12, left: 12, width: 24, height: 24, borderBottom: '2px solid #C4A882', borderLeft: '2px solid #C4A882' }} />
              <div style={{ position: 'absolute', bottom: 12, right: 12, width: 24, height: 24, borderBottom: '2px solid #C4A882', borderRight: '2px solid #C4A882' }} />

              <div style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: '#2C1A0E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
              }}>
                <Play size={28} style={{ color: '#FFD500', marginLeft: 4 }} />
              </div>

              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.4rem',
                fontWeight: 600,
                color: '#2C1A0E',
                marginBottom: '0.75rem',
              }}>
                Audiobook Coming Soon
              </h3>
              <p style={{
                fontFamily: "'Crimson Text', serif",
                fontStyle: 'italic',
                color: '#8B6340',
                fontSize: '1.0625rem',
                maxWidth: '44ch',
                margin: '0 auto 1.5rem',
                lineHeight: 1.6,
              }}>
                The YouTube audiobook will appear here once the link is configured. A full reading of the thesis awaits.
              </p>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 20px',
                background: 'rgba(44,26,14,0.06)',
                border: '1px solid #C4A882',
                borderRadius: '3px',
              }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: '#8B6340', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Set YOUTUBE_URL in backend configuration
                </span>
              </div>
            </div>
          ) : (
            /* Loading skeleton */
            <div style={{
              background: '#F0EBE0',
              borderRadius: '4px',
              paddingBottom: '56.25%',
              position: 'relative',
              animation: 'shimmer 1.5s infinite',
              backgroundSize: '200% 100%',
              backgroundImage: 'linear-gradient(90deg, #F0EBE0 25%, #FAF8F2 50%, #F0EBE0 75%)',
            }} />
          )}
        </motion.div>

        {/* Listening guide */}
        {embedUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            style={{
              marginTop: '1.5rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            {[
              { icon: '📖', text: 'Follow along in the PDF below' },
              { icon: '🎧', text: 'Best experienced with headphones' },
              { icon: '📍', text: 'Use the Table of Contents to navigate' },
            ].map(({ icon, text }) => (
              <div key={text} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '6px 14px',
                background: '#FAF8F2',
                border: '1px solid #C4A882',
                borderRadius: '3px',
              }}>
                <span style={{ fontSize: '0.875rem' }}>{icon}</span>
                <span style={{
                  fontFamily: "'Crimson Text', serif",
                  fontSize: '0.875rem',
                  color: '#5C3D1E',
                }}>
                  {text}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  );
}
