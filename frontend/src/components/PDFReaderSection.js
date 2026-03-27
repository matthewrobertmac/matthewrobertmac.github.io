import React, { useState, useCallback, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Download,
  ExternalLink,
  RefreshCw,
  FileText,
} from 'lucide-react';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner';

// Worker is served from /public/pdf.worker.mjs (copied from pdfjs-dist during build)
// react-pdf sets workerSrc = 'pdf.worker.mjs' internally, which resolves to our public file
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const PDF_PROXY_URL = `${BACKEND_URL}/api/pdf`;

export default function PDFReaderSection({ bookData }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [fitWidth, setFitWidth] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const containerRef = useRef(null);

  const pdfUrl = PDF_PROXY_URL;
  const directUrl = bookData?.pdf_url || '#';

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
    setLoadError(false);
    setLoadingPage(false);
  }, []);

  const onDocumentLoadError = useCallback((err) => {
    console.error('PDF load error:', err);
    setLoadError(true);
    setLoadingPage(false);
    toast.error('Could not load the PDF. Please try opening it directly.');
  }, []);

  const prevPage = () => {
    setPageNumber(p => Math.max(1, p - 1));
    setLoadingPage(true);
  };

  const nextPage = () => {
    setPageNumber(p => Math.min(numPages || 1, p + 1));
    setLoadingPage(true);
  };

  const zoomIn = () => {
    setScale(s => Math.min(s + 0.25, 3.0));
    setFitWidth(false);
  };

  const zoomOut = () => {
    setScale(s => Math.max(s - 0.25, 0.5));
    setFitWidth(false);
  };

  const handleFitWidth = () => {
    setFitWidth(true);
    setScale(1.0);
  };

  const handlePageInput = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1 && val <= (numPages || 1)) {
      setPageNumber(val);
      setLoadingPage(true);
    }
  };

  const getPageWidth = () => {
    if (!fitWidth || !containerRef.current) return scale * 612;
    const containerWidth = containerRef.current.offsetWidth;
    return Math.min(containerWidth - 48, 900);
  };

  return (
    <section
      id="read"
      className="scroll-mt-nav"
      style={{
        background: 'var(--paper-tint)',
        borderTop: '1px solid hsl(var(--border))',
        borderBottom: '1px solid hsl(var(--border))',
        paddingBottom: '4rem',
      }}
    >
      {/* Section header */}
      <div style={{
        maxWidth: '72rem',
        margin: '0 auto',
        padding: '3rem 1.5rem 2rem',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.6875rem',
            color: '#005BBB',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}>
            Full Document
          </p>
          <h2 style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 600,
            color: 'hsl(var(--foreground))',
            letterSpacing: '-0.02em',
            marginBottom: '0.5rem',
          }}
            data-testid="read-section-title"
          >
            Read the Thesis
          </h2>
          <div className="ua-accent-line" style={{ marginBottom: '0.75rem' }} />
          <p style={{
            fontSize: '0.9rem',
            color: 'hsl(var(--muted-foreground))',
            maxWidth: '56ch',
            lineHeight: 1.6,
          }}>
            Navigate pages using the toolbar below. Use zoom controls for your preferred reading size, or open the PDF natively in a new tab.
          </p>
        </motion.div>
      </div>

      {/* PDF Viewer Card */}
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          style={{
            background: '#FFFFFF',
            border: '1px solid hsl(var(--border))',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
          }}
        >
          {/* Sticky toolbar */}
          <div
            data-testid="pdf-toolbar"
            style={{
              position: 'sticky',
              top: 'var(--nav-height)',
              zIndex: 20,
              background: '#FFFFFF',
              borderBottom: '1px solid hsl(var(--border))',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            {/* Left: page nav */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={prevPage}
                disabled={pageNumber <= 1}
                data-testid="pdf-toolbar-prev-page-button"
                aria-label="Previous page"
                title="Previous page"
                style={{
                  background: 'none',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  padding: '6px 8px',
                  cursor: pageNumber <= 1 ? 'not-allowed' : 'pointer',
                  opacity: pageNumber <= 1 ? 0.4 : 1,
                  color: '#334155',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <ChevronLeft size={16} />
              </button>

              <div
                data-testid="pdf-page-indicator"
                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <input
                  type="number"
                  min={1}
                  max={numPages || 1}
                  value={pageNumber}
                  onChange={handlePageInput}
                  aria-label="Page number"
                  style={{
                    width: '48px',
                    textAlign: 'center',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '5px',
                    padding: '4px 6px',
                    fontSize: '0.8125rem',
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: '#334155',
                    outline: 'none',
                  }}
                />
                <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontFamily: "'IBM Plex Mono', monospace" }}>
                  / {numPages || '—'}
                </span>
              </div>

              <button
                onClick={nextPage}
                disabled={!numPages || pageNumber >= numPages}
                data-testid="pdf-toolbar-next-page-button"
                aria-label="Next page"
                title="Next page"
                style={{
                  background: 'none',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  padding: '6px 8px',
                  cursor: (!numPages || pageNumber >= numPages) ? 'not-allowed' : 'pointer',
                  opacity: (!numPages || pageNumber >= numPages) ? 0.4 : 1,
                  color: '#334155',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Right: zoom + open + download */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={zoomOut}
                disabled={scale <= 0.5}
                data-testid="pdf-toolbar-zoom-out-button"
                aria-label="Zoom out"
                title="Zoom out"
                style={{
                  background: 'none',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  padding: '6px 8px',
                  cursor: scale <= 0.5 ? 'not-allowed' : 'pointer',
                  opacity: scale <= 0.5 ? 0.4 : 1,
                  color: '#334155',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <ZoomOut size={15} />
              </button>

              <span style={{
                fontSize: '0.6875rem',
                color: '#94A3B8',
                fontFamily: "'IBM Plex Mono', monospace",
                minWidth: '42px',
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
                style={{
                  background: 'none',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  padding: '6px 8px',
                  cursor: scale >= 3.0 ? 'not-allowed' : 'pointer',
                  opacity: scale >= 3.0 ? 0.4 : 1,
                  color: '#334155',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <ZoomIn size={15} />
              </button>

              <button
                onClick={handleFitWidth}
                data-testid="pdf-toolbar-fit-width-button"
                aria-label="Fit to width"
                title="Fit to width"
                style={{
                  background: fitWidth ? '#005BBB' : 'none',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  padding: '6px 8px',
                  cursor: 'pointer',
                  color: fitWidth ? '#FFFFFF' : '#334155',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Maximize2 size={14} />
              </button>

              <div style={{ width: 1, height: 24, background: 'hsl(var(--border))', margin: '0 4px' }} />

              <a
                href={directUrl}
                target="_blank"
                rel="noreferrer"
                data-testid="pdf-toolbar-open-tab-button"
                aria-label="Open in new tab"
                title="Open in new tab"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'none',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  padding: '6px 8px',
                  cursor: 'pointer',
                  color: '#334155',
                  textDecoration: 'none',
                }}
              >
                <ExternalLink size={14} />
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
                  display: 'flex',
                  alignItems: 'center',
                  background: '#005BBB',
                  border: '1px solid #005BBB',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  cursor: 'pointer',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  gap: '5px',
                  fontSize: '0.75rem',
                  fontFamily: "'IBM Plex Sans', sans-serif",
                }}
              >
                <Download size={13} />
                <span className="hide-xs">Download</span>
              </a>
            </div>
          </div>

          {/* PDF Canvas Area */}
          <div
            ref={containerRef}
            className="pdf-container"
            style={{
              background: '#F1F5F9',
              padding: '24px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              minHeight: '600px',
              overflow: 'auto',
            }}
          >
            {loadError ? (
              <div style={{ maxWidth: '480px', width: '100%', margin: '3rem auto' }}>
                <Alert
                  data-testid="pdf-load-error-alert"
                  style={{ border: '1px solid #FCA5A5', background: '#FEF2F2' }}
                >
                  <AlertDescription style={{ color: '#991B1B' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <FileText size={18} />
                      <strong>Unable to load the embedded PDF reader.</strong>
                    </div>
                    <p style={{ marginBottom: '16px', fontSize: '0.875rem', color: '#7F1D1D' }}>
                      The PDF can still be read directly in your browser or downloaded below.
                    </p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <a
                        href={directUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 16px',
                          background: '#005BBB',
                          color: '#FFFFFF',
                          borderRadius: '6px',
                          textDecoration: 'none',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                        }}
                      >
                        <ExternalLink size={14} />
                        Open in Browser
                      </a>
                      <button
                        onClick={() => { setLoadError(false); setLoadingPage(true); }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 16px',
                          background: 'transparent',
                          color: '#005BBB',
                          border: '1px solid #005BBB',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                        }}
                      >
                        <RefreshCw size={14} />
                        Retry
                      </button>
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              <div style={{ width: '100%', maxWidth: '900px' }}>
                {loadingPage && !numPages && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '640px', margin: '0 auto' }}>
                    <Skeleton style={{ height: '800px', width: '100%', borderRadius: '8px' }} />
                    <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#94A3B8', fontFamily: "'IBM Plex Mono', monospace" }}>
                      Loading thesis…
                    </p>
                  </div>
                )}

                <Document
                  file={pdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={null}
                  error={null}
                >
                  <Page
                    pageNumber={pageNumber}
                    width={getPageWidth()}
                    scale={fitWidth ? 1 : scale}
                    onLoadSuccess={() => setLoadingPage(false)}
                    onLoadError={(e) => console.error('Page load error', e)}
                    renderAnnotationLayer={true}
                    renderTextLayer={true}
                    loading={
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '640px', margin: '0 auto' }}>
                        <Skeleton style={{ height: '800px', width: '640px', borderRadius: '8px', maxWidth: '100%' }} />
                      </div>
                    }
                  />
                </Document>
              </div>
            )}
          </div>
        </motion.div>

        {/* Aria live region for page changes */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
          style={{ position: 'absolute', left: '-9999px' }}
        >
          Page {pageNumber} of {numPages || 'unknown'}
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .hide-xs { display: none; }
        }
      `}</style>
    </section>
  );
}
