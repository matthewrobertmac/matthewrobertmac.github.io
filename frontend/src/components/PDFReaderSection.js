import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2,
  Download, ExternalLink, RefreshCw, FileText, BookOpen, Minimize2,
} from 'lucide-react';
import { toast } from 'sonner';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const NAV_HEIGHT = 68;
const TOOLBAR_HEIGHT = 50; // sticky toolbar inside the reader
const BOTTOM_BAR_HEIGHT = 52; // bottom navigation bar
const SECTION_HEADER_HEIGHT = 112; // dark header

// Page flip animation
const flipVariants = {
  enterFromRight: { rotateY: 55, opacity: 0, x: 30, scale: 0.97 },
  enterFromLeft:  { rotateY: -55, opacity: 0, x: -30, scale: 0.97 },
  center:         { rotateY: 0,   opacity: 1, x: 0,   scale: 1 },
  exitToLeft:     { rotateY: -55, opacity: 0, x: -30, scale: 0.97 },
  exitToRight:    { rotateY: 55,  opacity: 0, x: 30,  scale: 0.97 },
};

const SUNFLOWER_BG = 'https://images.unsplash.com/photo-1684091484618-60924933854c?crop=entropy&cs=srgb&fm=jpg&q=70&w=600';

export default function PDFReaderSection({ bookData }) {
  const [numPages, setNumPages]     = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale]           = useState(1.0);
  const [fitMode, setFitMode]       = useState('height'); // 'height' | 'width' | 'custom'
  const [loadError, setLoadError]   = useState(false);
  const [isLoading, setIsLoading]   = useState(true);
  const [direction, setDirection]   = useState(1);
  const [animKey, setAnimKey]       = useState(0);
  const [inputPage, setInputPage]   = useState('1');
  const [pageSize, setPageSize]     = useState({ width: 612, height: 792 });

  const canvasRef    = useRef(null);
  const [canvasDims, setCanvasDims] = useState({ width: 0, height: 0 });

  const pdfUrl    = `${BACKEND_URL}/api/pdf`;
  const directUrl = bookData?.pdf_url || '#';

  // Measure the canvas area and pick the best page size
  useEffect(() => {
    const measure = () => {
      if (!canvasRef.current) return;
      const w = canvasRef.current.offsetWidth;
      // Available height = viewport − fixed chrome above & below
      const h = window.innerHeight - NAV_HEIGHT - SECTION_HEADER_HEIGHT - TOOLBAR_HEIGHT - BOTTOM_BAR_HEIGHT;
      setCanvasDims({ width: w, height: Math.max(h, 480) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (canvasRef.current) ro.observe(canvasRef.current);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  // Compute final page dimensions
  const getPageDimensions = () => {
    if (canvasDims.width === 0) return { height: 700 };
    const pdfAspect = pageSize.height / pageSize.width;   // e.g. 792/612 ≈ 1.294
    const canvasAspect = canvasDims.height / canvasDims.width;
    const availW = canvasDims.width - 48;   // horizontal padding
    const availH = canvasDims.height - 16;  // a little breathing room

    if (fitMode === 'height') {
      // Fit to height — no scroll needed for one page
      const h = availH;
      const w = h / pdfAspect;
      // If computed width exceeds available width, constrain to width instead
      if (w > availW) {
        return { width: availW };
      }
      return { height: h };
    }
    if (fitMode === 'width') {
      return { width: availW };
    }
    // custom scale
    return { width: Math.round(availW * scale) };
  };

  const dims = getPageDimensions();

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
    setLoadError(false);
    setIsLoading(false);
  }, []);

  const onDocumentLoadError = useCallback((err) => {
    console.error('PDF error:', err);
    setLoadError(true);
    setIsLoading(false);
    toast.error('Could not load PDF. Try opening directly.');
  }, []);

  const onPageLoadSuccess = useCallback((page) => {
    setPageSize({ width: page.originalWidth, height: page.originalHeight });
    setIsLoading(false);
  }, []);

  const goToPage = (newPage, dir) => {
    if (newPage < 1 || newPage > (numPages || 1)) return;
    setDirection(dir);
    setAnimKey(k => k + 1);
    setPageNumber(newPage);
    setInputPage(String(newPage));
  };

  const prevPage = useCallback(() => goToPage(pageNumber - 1, -1), [pageNumber, numPages]);
  const nextPage = useCallback(() => goToPage(pageNumber + 1, 1),  [pageNumber, numPages]);

  const handleInputChange = (e) => setInputPage(e.target.value);
  const handleInputSubmit = (e) => {
    if (e.key === 'Enter') {
      const v = parseInt(inputPage, 10);
      if (!isNaN(v) && v >= 1 && v <= (numPages || 1)) goToPage(v, v > pageNumber ? 1 : -1);
    }
  };

  const enterVariant = direction > 0 ? flipVariants.enterFromRight : flipVariants.enterFromLeft;
  const exitVariant  = direction > 0 ? flipVariants.exitToLeft     : flipVariants.exitToRight;

  return (
    <section
      id="read"
      className="scroll-mt-nav"
      style={{
        background: '#EDE8DE',
        borderTop: '1px solid #C4A882',
        // No bottom padding — we want the reader to feel full-screen
      }}
    >
      {/* Section header */}
      <div style={{
        background: '#2C1A0E',
        padding: '1.5rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, height: 4,
          background: 'repeating-linear-gradient(90deg, #005BBB 0px, #005BBB 12px, #FFD500 12px, #FFD500 24px)',
          opacity: 0.8,
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${SUNFLOWER_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.06,
        }} />

        <div style={{
          position: 'relative',
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <BookOpen size={14} style={{ color: '#FFD500' }} />
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.6rem',
                color: '#FFD500',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}>
                Full Document · {numPages ? `${numPages} pages` : 'Loading…'}
              </span>
            </div>
            <h2
              data-testid="read-section-title"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.4rem, 2.5vw, 1.875rem)',
                fontWeight: 700,
                color: '#FAF8F2',
                margin: 0,
              }}
            >
              Read the Thesis
            </h2>
          </div>

          {/* Page jump + fit controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* Fit height toggle */}
            <button
              onClick={() => setFitMode(f => f === 'height' ? 'width' : 'height')}
              data-testid="fit-mode-toggle"
              title={fitMode === 'height' ? 'Switch to fit width' : 'Switch to fit height'}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '5px 12px',
                background: 'rgba(250,248,242,0.1)',
                border: '1px solid rgba(196,168,130,0.4)',
                borderRadius: '3px',
                color: '#FAF8F2',
                cursor: 'pointer',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.65rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {fitMode === 'height' ? <Maximize2 size={12} /> : <Minimize2 size={12} />}
              {fitMode === 'height' ? 'Fit Height' : 'Fit Width'}
            </button>

            {numPages && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#8B6340', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Page:
                </span>
                <input
                  type="number" min={1} max={numPages}
                  value={inputPage}
                  onChange={handleInputChange}
                  onKeyDown={handleInputSubmit}
                  style={{
                    width: 50, padding: '4px 6px',
                    background: 'rgba(250,248,242,0.1)',
                    border: '1px solid #8B6340',
                    borderRadius: '3px',
                    color: '#FAF8F2',
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '0.8rem',
                    textAlign: 'center',
                    outline: 'none',
                  }}
                />
                <span style={{ color: '#8B6340', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem' }}>of {numPages}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reader card */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem' }}>
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #C4A882',
          borderRadius: '4px',
          overflow: 'hidden',
          boxShadow: '0 4px 32px rgba(44,26,14,0.12)',
        }}>
          {/* Toolbar */}
          <div
            data-testid="pdf-toolbar"
            style={{
              position: 'sticky',
              top: NAV_HEIGHT,
              zIndex: 20,
              height: TOOLBAR_HEIGHT,
              background: '#FAF8F2',
              borderBottom: '1px solid #C4A882',
              padding: '0 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              flexWrap: 'nowrap',
            }}
          >
            {/* Prev / page / next */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ToolbarButton
                onClick={prevPage}
                disabled={pageNumber <= 1}
                data-testid="pdf-toolbar-prev-page-button"
                aria-label="Previous page"
                title="Previous page (← arrow key)"
              >
                <ChevronLeft size={15} />
                <span className="hide-xs">Prev</span>
              </ToolbarButton>

              <div
                data-testid="pdf-page-indicator"
                style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  padding: '4px 10px',
                  background: '#FFFFFF',
                  border: '1px solid #C4A882',
                  borderRadius: '3px',
                  minWidth: 90,
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: '#2C1A0E', fontWeight: 500 }}>
                  {pageNumber} <span style={{ color: '#C4A882' }}>/ </span>{numPages || '—'}
                </span>
              </div>

              <ToolbarButton
                onClick={nextPage}
                disabled={!numPages || pageNumber >= numPages}
                data-testid="pdf-toolbar-next-page-button"
                aria-label="Next page"
                title="Next page (→ arrow key)"
              >
                <span className="hide-xs">Next</span>
                <ChevronRight size={15} />
              </ToolbarButton>
            </div>

            {/* Progress bar (center) */}
            {numPages && (
              <div style={{ flex: 1, maxWidth: 200, display: 'flex', flexDirection: 'column', gap: '2px' }} className="hide-sm">
                <div style={{ height: 4, background: '#F0EBE0', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #005BBB, #FFD500)',
                    borderRadius: 2,
                    width: `${(pageNumber / numPages) * 100}%`,
                    transition: 'width 250ms ease',
                  }} />
                </div>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: '#C4A882', textAlign: 'center' }}>
                  {Math.round((pageNumber / numPages) * 100)}% read
                </span>
              </div>
            )}

            {/* Right utilities */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <ToolbarIconButton onClick={() => { setFitMode('custom'); setScale(s => Math.max(s - 0.25, 0.5)); }} disabled={fitMode === 'custom' && scale <= 0.5} data-testid="pdf-toolbar-zoom-out-button" aria-label="Zoom out" title="Zoom out">
                <ZoomOut size={13} />
              </ToolbarIconButton>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: '#8B6340', minWidth: 36, textAlign: 'center' }}>
                {fitMode === 'height' ? 'Fit H' : fitMode === 'width' ? 'Fit W' : `${Math.round(scale * 100)}%`}
              </span>
              <ToolbarIconButton onClick={() => { setFitMode('custom'); setScale(s => Math.min(s + 0.25, 3)); }} disabled={fitMode === 'custom' && scale >= 3} data-testid="pdf-toolbar-zoom-in-button" aria-label="Zoom in" title="Zoom in">
                <ZoomIn size={13} />
              </ToolbarIconButton>

              <ToolbarIconButton onClick={() => setFitMode('height')} active={fitMode === 'height'} data-testid="pdf-toolbar-fit-width-button" aria-label="Fit to screen" title="Fit to screen height">
                <Maximize2 size={12} />
              </ToolbarIconButton>

              <div style={{ width: 1, height: 20, background: '#C4A882', margin: '0 3px' }} />

              <a
                href={directUrl}
                target="_blank"
                rel="noreferrer"
                data-testid="pdf-toolbar-open-tab-button"
                aria-label="Open in new tab"
                title="Open in new tab"
                style={{ ...iconBtnBase, textDecoration: 'none' }}
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
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  padding: '5px 10px',
                  background: '#005BBB', border: '1px solid #005BBB', borderRadius: '3px',
                  color: '#FFFFFF', textDecoration: 'none',
                  fontSize: '0.7rem', fontFamily: "'Crimson Text', serif", fontWeight: 600,
                }}
              >
                <Download size={11} />
                <span className="hide-xs">Download</span>
              </a>
            </div>
          </div>

          {/* PDF canvas */}
          <div
            ref={canvasRef}
            style={{
              background: '#E8E2D6',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              // Height = viewport minus everything above
              height: `calc(100vh - ${NAV_HEIGHT + SECTION_HEADER_HEIGHT + TOOLBAR_HEIGHT + 3}px)`,
              minHeight: 480,
              overflow: 'hidden',
              padding: '16px 24px',
            }}
          >
            {loadError ? (
              <ErrorState directUrl={directUrl} onRetry={() => { setLoadError(false); setIsLoading(true); }} />
            ) : (
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={null}
                error={null}
              >
                <div style={{ perspective: '2000px' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={animKey}
                      initial={enterVariant}
                      animate={flipVariants.center}
                      exit={exitVariant}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      style={{
                        transformStyle: 'preserve-3d',
                        background: '#FFFFFF',
                        boxShadow: '0 8px 40px rgba(44,26,14,0.18), 4px 4px 0 rgba(44,26,14,0.06)',
                        transformOrigin: 'center center',
                      }}
                    >
                      {/* Loading shimmer */}
                      {isLoading && !numPages && (
                        <div style={{
                          width: dims.width || 480, height: dims.height || 700,
                          background: 'linear-gradient(90deg, #F0EBE0 25%, #FAF8F2 50%, #F0EBE0 75%)',
                          backgroundSize: '200% 100%',
                          animation: 'shimmer 1.4s infinite',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#C4A882' }}>
                            Loading…
                          </p>
                        </div>
                      )}

                      <Page
                        pageNumber={pageNumber}
                        {...dims}
                        onLoadSuccess={onPageLoadSuccess}
                        renderAnnotationLayer
                        renderTextLayer
                        loading={
                          <div style={{
                            width: dims.width || 480, height: dims.height || 700,
                            background: 'linear-gradient(90deg, #F0EBE0 25%, #FAF8F2 50%, #F0EBE0 75%)',
                            backgroundSize: '200% 100%',
                            animation: 'shimmer 1.4s infinite',
                          }} />
                        }
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Invisible click-zones for prev/next */}
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                  <button onClick={prevPage} disabled={pageNumber <= 1} style={{ ...clickZoneStyle, left: 0, cursor: pageNumber <= 1 ? 'default' : 'w-resize', pointerEvents: 'all' }} aria-label="Previous page" />
                  <button onClick={nextPage} disabled={!numPages || pageNumber >= numPages} style={{ ...clickZoneStyle, right: 0, cursor: (!numPages || pageNumber >= numPages) ? 'default' : 'e-resize', pointerEvents: 'all' }} aria-label="Next page" />
                </div>
              </Document>
            )}
          </div>

          {/* Bottom nav bar */}
          <div style={{
            height: BOTTOM_BAR_HEIGHT,
            background: '#FAF8F2',
            borderTop: '1px solid #C4A882',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            padding: '0 1.5rem',
          }}>
            <button
              onClick={prevPage}
              disabled={pageNumber <= 1}
              style={{
                ...navBtnStyle,
                background: pageNumber <= 1 ? 'transparent' : '#2C1A0E',
                color: pageNumber <= 1 ? '#C4A882' : '#FAF8F2',
                opacity: pageNumber <= 1 ? 0.45 : 1,
                cursor: pageNumber <= 1 ? 'not-allowed' : 'pointer',
              }}
            >
              <ChevronLeft size={16} /> Previous Page
            </button>

            {/* Page dots */}
            {numPages && numPages <= 20 && (
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {Array.from({ length: Math.min(numPages, 20) }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i + 1, i + 1 > pageNumber ? 1 : -1)}
                    style={{
                      width: i + 1 === pageNumber ? 12 : 6,
                      height: 6,
                      borderRadius: 3,
                      background: i + 1 === pageNumber ? '#005BBB' : '#C4A882',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'width 200ms ease, background 200ms ease',
                    }}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>
            )}

            {/* For long docs show fraction */}
            {numPages && numPages > 20 && (
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.75rem',
                color: '#C4A882',
              }}>
                Page {pageNumber} of {numPages}
              </span>
            )}

            <button
              onClick={nextPage}
              disabled={!numPages || pageNumber >= numPages}
              style={{
                ...navBtnStyle,
                background: (!numPages || pageNumber >= numPages) ? 'transparent' : '#2C1A0E',
                color: (!numPages || pageNumber >= numPages) ? '#C4A882' : '#FAF8F2',
                opacity: (!numPages || pageNumber >= numPages) ? 0.45 : 1,
                cursor: (!numPages || pageNumber >= numPages) ? 'not-allowed' : 'pointer',
              }}
            >
              Next Page <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

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

// --- Sub-components ---

const navBtnStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '8px 18px',
  border: '1px solid #C4A882',
  borderRadius: '3px',
  fontFamily: "'Playfair Display', serif",
  fontSize: '0.875rem',
  fontWeight: 600,
};

const iconBtnBase = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5px 7px',
  background: 'transparent',
  border: '1px solid #C4A882',
  borderRadius: '3px',
  cursor: 'pointer',
  color: '#5C3D1E',
};

const clickZoneStyle = {
  position: 'absolute',
  top: 0, bottom: 0,
  width: '12%',
  background: 'transparent',
  border: 'none',
  opacity: 0,
};

function ToolbarButton({ children, onClick, disabled, ...rest }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      {...rest}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '4px',
        padding: '6px 12px',
        background: disabled ? 'transparent' : '#2C1A0E',
        border: '1px solid #C4A882', borderRadius: '3px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        color: disabled ? '#8B6340' : '#FAF8F2',
        fontFamily: "'Crimson Text', serif", fontSize: '0.875rem',
      }}
    >
      {children}
    </button>
  );
}

function ToolbarIconButton({ children, onClick, disabled, active, ...rest }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      {...rest}
      style={{
        ...iconBtnBase,
        background: active ? '#005BBB' : 'transparent',
        color: active ? '#FFFFFF' : '#5C3D1E',
        borderColor: active ? '#005BBB' : '#C4A882',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
      }}
    >
      {children}
    </button>
  );
}

function ErrorState({ directUrl, onRetry }) {
  return (
    <div style={{ maxWidth: 440, textAlign: 'center' }}>
      <FileText size={36} style={{ color: '#8B6340', marginBottom: '1rem' }} />
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
          borderRadius: '3px', textDecoration: 'none', fontFamily: "'Crimson Text', serif",
        }}>
          <ExternalLink size={14} /> Open in Browser
        </a>
        <button onClick={onRetry} style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '9px 20px', background: 'transparent', color: '#005BBB',
          border: '1px solid #005BBB', borderRadius: '3px', cursor: 'pointer',
          fontFamily: "'Crimson Text', serif",
        }}>
          <RefreshCw size={14} /> Retry
        </button>
      </div>
    </div>
  );
}

function KeyboardNav({ prevPage, nextPage }) {
  useEffect(() => {
    const fn = (e) => {
      if (e.target.tagName === 'INPUT') return;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')   prevPage();
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextPage();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [prevPage, nextPage]);
  return null;
}
