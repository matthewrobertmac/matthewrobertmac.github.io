import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2,
  Download, ExternalLink, RefreshCw, FileText, BookOpen,
} from 'lucide-react';
import { toast } from 'sonner';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Page-flip animation variants
const flipVariants = {
  enterFromRight: { rotateY: 60, opacity: 0, x: 40 },
  enterFromLeft: { rotateY: -60, opacity: 0, x: -40 },
  center: { rotateY: 0, opacity: 1, x: 0 },
  exitToLeft: { rotateY: -60, opacity: 0, x: -40 },
  exitToRight: { rotateY: 60, opacity: 0, x: 40 },
};

// Cossack decoration
const COSSACK_STEPPE = 'https://images.unsplash.com/photo-1684091484618-60924933854c?crop=entropy&cs=srgb&fm=jpg&q=75&w=400';

export default function PDFReaderSection({ bookData }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [fitWidth, setFitWidth] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [animKey, setAnimKey] = useState(0);
  const [inputPage, setInputPage] = useState('1');
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(800);

  const pdfUrl = `${BACKEND_URL}/api/pdf`;
  const directUrl = bookData?.pdf_url || '#';

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth - 64);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
    setLoadError(false);
    setIsLoading(false);
  }, []);

  const onDocumentLoadError = useCallback((err) => {
    console.error('PDF load error:', err);
    setLoadError(true);
    setIsLoading(false);
    toast.error('Could not load PDF. Try opening directly.');
  }, []);

  const goToPage = (newPage, dir) => {
    if (newPage < 1 || newPage > (numPages || 1)) return;
    setDirection(dir);
    setAnimKey(k => k + 1);
    setPageNumber(newPage);
    setInputPage(String(newPage));
  };

  const prevPage = () => goToPage(pageNumber - 1, -1);
  const nextPage = () => goToPage(pageNumber + 1, 1);

  const handleInputChange = (e) => setInputPage(e.target.value);
  const handleInputSubmit = (e) => {
    if (e.key === 'Enter') {
      const val = parseInt(inputPage, 10);
      if (!isNaN(val) && val >= 1 && val <= (numPages || 1)) {
        goToPage(val, val > pageNumber ? 1 : -1);
      }
    }
  };

  const zoomIn = () => { setScale(s => Math.min(s + 0.25, 3)); setFitWidth(false); };
  const zoomOut = () => { setScale(s => Math.max(s - 0.25, 0.5)); setFitWidth(false); };
  const handleFitWidth = () => { setFitWidth(true); setScale(1); };

  const pageWidth = fitWidth ? Math.min(containerWidth, 860) : scale * 612;

  const enterVariant = direction > 0 ? flipVariants.enterFromRight : flipVariants.enterFromLeft;
  const exitVariant = direction > 0 ? flipVariants.exitToLeft : flipVariants.exitToRight;

  return (
    <section
      id="read"
      className="scroll-mt-nav"
      style={{
        background: '#F0EBE0',
        borderTop: '1px solid #C4A882',
        borderBottom: '1px solid #C4A882',
        padding: '0 0 4rem',
      }}
    >
      {/* Section header banner */}
      <div style={{
        background: '#2C1A0E',
        padding: '2.5rem 2.5rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Embroidery top stripe */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, height: 5,
          background: 'repeating-linear-gradient(90deg, #005BBB 0px, #005BBB 12px, #FFD500 12px, #FFD500 24px)',
          opacity: 0.8,
        }} />

        {/* Steppe background image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${COSSACK_STEPPE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.08,
        }} />

        <div style={{
          position: 'relative',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
              <BookOpen size={16} style={{ color: '#FFD500' }} />
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.65rem',
                color: '#FFD500',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}>
                Full Document · {numPages ? `${numPages} pages` : 'Loading…'}
              </span>
            </div>
            <h2
              data-testid="read-section-title"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: '#FAF8F2',
                letterSpacing: '-0.01em',
                margin: 0,
              }}
            >
              Read the Thesis
            </h2>
            <p style={{
              fontFamily: "'Crimson Text', serif",
              fontStyle: 'italic',
              color: '#C4A882',
              fontSize: '1rem',
              marginTop: '4px',
            }}>
              Navigate with the arrows or keyboard · Use zoom for comfort
            </p>
          </div>

          {/* Page jump */}
          {numPages && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#8B6340', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem' }}>Go to page:</span>
              <input
                type="number"
                min={1}
                max={numPages}
                value={inputPage}
                onChange={handleInputChange}
                onKeyDown={handleInputSubmit}
                style={{
                  width: 56,
                  padding: '6px 8px',
                  background: 'rgba(250,248,242,0.1)',
                  border: '1px solid #8B6340',
                  borderRadius: '3px',
                  color: '#FAF8F2',
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.875rem',
                  textAlign: 'center',
                  outline: 'none',
                }}
              />
              <span style={{ color: '#8B6340', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem' }}>of {numPages}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main reader area */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem 0' }}>
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #C4A882',
          borderRadius: '4px',
          boxShadow: '0 4px 32px rgba(44,26,14,0.12), 0 1px 4px rgba(44,26,14,0.06)',
          overflow: 'hidden',
        }}>
          {/* Toolbar */}
          <div
            data-testid="pdf-toolbar"
            style={{
              position: 'sticky',
              top: 'var(--nav-height)',
              zIndex: 20,
              background: '#FAF8F2',
              borderBottom: '1px solid #C4A882',
              padding: '10px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            {/* Left: prev/next + page indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={prevPage}
                disabled={pageNumber <= 1}
                data-testid="pdf-toolbar-prev-page-button"
                aria-label="Previous page"
                title="Previous page (←)"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '7px 14px',
                  background: pageNumber <= 1 ? 'transparent' : '#2C1A0E',
                  border: '1px solid #C4A882',
                  borderRadius: '3px',
                  cursor: pageNumber <= 1 ? 'not-allowed' : 'pointer',
                  opacity: pageNumber <= 1 ? 0.4 : 1,
                  color: pageNumber <= 1 ? '#8B6340' : '#FAF8F2',
                  fontFamily: "'Crimson Text', serif",
                  fontSize: '0.875rem',
                }}
              >
                <ChevronLeft size={15} />
                <span className="hide-xs">Prev</span>
              </button>

              <div
                data-testid="pdf-page-indicator"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  background: 'white',
                  border: '1px solid #C4A882',
                  borderRadius: '3px',
                  minWidth: '110px',
                  justifyContent: 'center',
                }}
              >
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.8125rem',
                  color: '#2C1A0E',
                  fontWeight: 500,
                }}>
                  {pageNumber} <span style={{ color: '#C4A882' }}>of</span> {numPages || '—'}
                </span>
              </div>

              <button
                onClick={nextPage}
                disabled={!numPages || pageNumber >= numPages}
                data-testid="pdf-toolbar-next-page-button"
                aria-label="Next page"
                title="Next page (→)"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '7px 14px',
                  background: (!numPages || pageNumber >= numPages) ? 'transparent' : '#2C1A0E',
                  border: '1px solid #C4A882',
                  borderRadius: '3px',
                  cursor: (!numPages || pageNumber >= numPages) ? 'not-allowed' : 'pointer',
                  opacity: (!numPages || pageNumber >= numPages) ? 0.4 : 1,
                  color: (!numPages || pageNumber >= numPages) ? '#8B6340' : '#FAF8F2',
                  fontFamily: "'Crimson Text', serif",
                  fontSize: '0.875rem',
                }}
              >
                <span className="hide-xs">Next</span>
                <ChevronRight size={15} />
              </button>
            </div>

            {/* Center: progress bar */}
            {numPages && (
              <div style={{ flex: 1, maxWidth: 240, display: 'flex', flexDirection: 'column', gap: '3px' }} className="hide-sm">
                <div style={{ height: 4, background: '#F0EBE0', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #005BBB, #FFD500)',
                    borderRadius: 2,
                    width: `${(pageNumber / numPages) * 100}%`,
                    transition: 'width 300ms ease',
                  }} />
                </div>
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.6rem',
                  color: '#C4A882',
                  textAlign: 'center',
                }}>
                  {Math.round((pageNumber / numPages) * 100)}% read
                </span>
              </div>
            )}

            {/* Right: zoom + utilities */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={zoomOut}
                disabled={scale <= 0.5}
                data-testid="pdf-toolbar-zoom-out-button"
                aria-label="Zoom out"
                title="Zoom out"
                style={toolbarBtnStyle(scale <= 0.5)}
              >
                <ZoomOut size={14} />
              </button>

              <span style={{
                fontSize: '0.6875rem',
                color: '#8B6340',
                fontFamily: "'IBM Plex Mono', monospace",
                minWidth: '40px',
                textAlign: 'center',
              }}>
                {fitWidth ? 'Fit' : `${Math.round(scale * 100)}%`}
              </span>

              <button
                onClick={zoomIn}
                disabled={scale >= 3.0}
                data-testid="pdf-toolbar-zoom-in-button"
                aria-label="Zoom in"
                title="Zoom in"
                style={toolbarBtnStyle(scale >= 3.0)}
              >
                <ZoomIn size={14} />
              </button>

              <button
                onClick={handleFitWidth}
                data-testid="pdf-toolbar-fit-width-button"
                aria-label="Fit to width"
                title="Fit to width"
                style={{
                  ...toolbarBtnStyle(false),
                  background: fitWidth ? '#005BBB' : 'transparent',
                  color: fitWidth ? '#FFFFFF' : '#5C3D1E',
                  borderColor: fitWidth ? '#005BBB' : '#C4A882',
                }}
              >
                <Maximize2 size={13} />
              </button>

              <div style={{ width: 1, height: 22, background: '#C4A882', margin: '0 4px' }} />

              <a
                href={directUrl}
                target="_blank"
                rel="noreferrer"
                data-testid="pdf-toolbar-open-tab-button"
                aria-label="Open in new tab"
                title="Open in new tab"
                style={{ ...toolbarBtnStyle(false), textDecoration: 'none' }}
              >
                <ExternalLink size={13} />
              </a>

              <a
                href={directUrl}
                download="The_Diia_Thesis.pdf"
                target="_blank"
                rel="noreferrer"
                data-testid="pdf-toolbar-download-button"
                aria-label="Download PDF"
                title="Download PDF"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 12px',
                  background: '#005BBB',
                  border: '1px solid #005BBB',
                  borderRadius: '3px',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  fontFamily: "'Crimson Text', serif",
                  fontWeight: 600,
                }}
              >
                <Download size={12} />
                <span className="hide-xs">Download</span>
              </a>
            </div>
          </div>

          {/* PDF canvas area */}
          <div
            ref={containerRef}
            style={{
              background: '#E8E2D6',
              padding: '32px',
              minHeight: '700px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              overflow: 'hidden',
            }}
          >
            {loadError ? (
              <div style={{ maxWidth: 480, width: '100%', margin: '3rem auto', textAlign: 'center' }}>
                <div data-testid="pdf-load-error-alert" style={{
                  background: '#FFFBF0',
                  border: '1px solid #C4A882',
                  borderRadius: '6px',
                  padding: '2rem',
                }}>
                  <FileText size={32} style={{ color: '#8B6340', marginBottom: '1rem' }} />
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: '#2C1A0E', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Unable to Load PDF Reader
                  </p>
                  <p style={{ fontFamily: "'Crimson Text', serif", color: '#5C3D1E', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    The document is still available to read in your browser or download below.
                  </p>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a href={directUrl} target="_blank" rel="noreferrer" style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      padding: '9px 20px', background: '#2C1A0E', color: '#FAF8F2',
                      borderRadius: '3px', textDecoration: 'none', fontFamily: "'Crimson Text', serif", fontSize: '0.9375rem',
                    }}>
                      <ExternalLink size={14} /> Open in Browser
                    </a>
                    <button onClick={() => { setLoadError(false); setIsLoading(true); }} style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      padding: '9px 20px', background: 'transparent', color: '#005BBB',
                      border: '1px solid #005BBB', borderRadius: '3px', cursor: 'pointer',
                      fontFamily: "'Crimson Text', serif", fontSize: '0.9375rem',
                    }}>
                      <RefreshCw size={14} /> Retry
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ width: '100%', maxWidth: 900 }}>
                {/* Hidden Document component to load PDF */}
                <Document
                  file={pdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={null}
                  error={null}
                >
                  {/* Page flip container */}
                  <div className="pdf-flip-container" style={{ position: 'relative' }}>
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={animKey}
                        initial={enterVariant}
                        animate={flipVariants.center}
                        exit={exitVariant}
                        transition={{
                          duration: 0.38,
                          ease: [0.4, 0.0, 0.2, 1],
                        }}
                        style={{
                          transformStyle: 'preserve-3d',
                          transformOrigin: 'center center',
                          boxShadow: '0 8px 32px rgba(44,26,14,0.18), 4px 4px 0 rgba(44,26,14,0.08)',
                          background: '#FFFFFF',
                        }}
                      >
                        {/* Loading skeleton */}
                        {isLoading && !numPages && (
                          <div style={{
                            width: '100%',
                            height: 800,
                            background: 'linear-gradient(90deg, #F0EBE0 25%, #FAF8F2 50%, #F0EBE0 75%)',
                            backgroundSize: '200% 100%',
                            animation: 'shimmer 1.5s infinite',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#C4A882', fontSize: '1.1rem' }}>
                              Loading thesis…
                            </p>
                          </div>
                        )}
                        <Page
                          pageNumber={pageNumber}
                          width={pageWidth}
                          scale={fitWidth ? 1 : scale}
                          onLoadSuccess={() => setIsLoading(false)}
                          renderAnnotationLayer={true}
                          renderTextLayer={true}
                          loading={
                            <div style={{
                              width: pageWidth || 600,
                              height: 800,
                              background: 'linear-gradient(90deg, #F0EBE0 25%, #FAF8F2 50%, #F0EBE0 75%)',
                              backgroundSize: '200% 100%',
                              animation: 'shimmer 1.5s infinite',
                            }} />
                          }
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Previous page click zone */}
                    <button
                      onClick={prevPage}
                      disabled={pageNumber <= 1}
                      aria-label="Previous page"
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '15%',
                        background: 'transparent',
                        border: 'none',
                        cursor: pageNumber <= 1 ? 'default' : 'pointer',
                        opacity: 0,
                        zIndex: 10,
                      }}
                    />
                    {/* Next page click zone */}
                    <button
                      onClick={nextPage}
                      disabled={!numPages || pageNumber >= numPages}
                      aria-label="Next page"
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: '15%',
                        background: 'transparent',
                        border: 'none',
                        cursor: (!numPages || pageNumber >= numPages) ? 'default' : 'pointer',
                        opacity: 0,
                        zIndex: 10,
                      }}
                    />
                  </div>
                </Document>
              </div>
            )}
          </div>

          {/* Bottom nav bar */}
          <div style={{
            background: '#FAF8F2',
            borderTop: '1px solid #C4A882',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}>
            {/* Keyboard shortcuts hint */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
              <button
                onClick={prevPage}
                disabled={pageNumber <= 1}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 20px',
                  background: pageNumber <= 1 ? 'transparent' : '#2C1A0E',
                  border: '1px solid #C4A882',
                  borderRadius: '3px',
                  cursor: pageNumber <= 1 ? 'not-allowed' : 'pointer',
                  opacity: pageNumber <= 1 ? 0.4 : 1,
                  color: pageNumber <= 1 ? '#8B6340' : '#FAF8F2',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                <ChevronLeft size={16} /> Previous
              </button>

              <span style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.75rem',
                color: '#C4A882',
                padding: '0 8px',
              }}>
                Page {pageNumber} of {numPages || '…'}
              </span>

              <button
                onClick={nextPage}
                disabled={!numPages || pageNumber >= numPages}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 20px',
                  background: (!numPages || pageNumber >= numPages) ? 'transparent' : '#2C1A0E',
                  border: '1px solid #C4A882',
                  borderRadius: '3px',
                  cursor: (!numPages || pageNumber >= numPages) ? 'not-allowed' : 'pointer',
                  opacity: (!numPages || pageNumber >= numPages) ? 0.4 : 1,
                  color: (!numPages || pageNumber >= numPages) ? '#8B6340' : '#FAF8F2',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard navigation */}
      <KeyboardNav prevPage={prevPage} nextPage={nextPage} />

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @media (max-width: 600px) {
          .hide-xs { display: none !important; }
          .hide-sm { display: none !important; }
        }
        @media (max-width: 900px) {
          .hide-sm { display: none !important; }
        }
      `}</style>
    </section>
  );
}

function toolbarBtnStyle(disabled) {
  return {
    display: 'flex',
    alignItems: 'center',
    padding: '6px 8px',
    background: 'transparent',
    border: '1px solid #C4A882',
    borderRadius: '3px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    color: '#5C3D1E',
  };
}

function KeyboardNav({ prevPage, nextPage }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'INPUT') return;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevPage();
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextPage();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prevPage, nextPage]);
  return null;
}
