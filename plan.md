# plan.md

## 1. Objectives
- Deliver a minimalist, Ukrainian-themed website to read **“The Diia Thesis: AI, Digital Government, and the Future of Civic Intelligence – From Ukraine to the World”**.
- Provide a **full-featured embedded PDF reader** (page nav, zoom, responsive) using `@react-pdf-viewer/core` (preferred) or PDF.js fallback.
- Present clear context: hero, about/themes, and navigation reflecting **civic AI, dignity/participation (hromada), resilience, honest AI, linguistic sovereignty**.
- Implement a small FastAPI backend to serve **book metadata** (and optionally proxy the PDF URL).

## 2. Implementation Steps

### Phase 1 — Core Workflow (No POC needed)
Core workflow is “open site → PDF loads reliably → user can navigate/zoom on mobile/desktop”; implement directly and validate during Phase 2.

### Phase 2 — V1 App Development (MVP)
**User stories (V1)**
1. As a visitor, I want to land on a beautiful hero section that immediately explains what the thesis is and why it matters.
2. As a reader, I want to open the embedded PDF and reliably navigate pages (next/prev, page input) so I can read end-to-end.
3. As a reader, I want zoom controls and fit-to-width so the PDF is readable on both desktop and mobile.
4. As a visitor, I want an “About / Themes” section that summarizes key ideas (Diia, democracy vs surveillance, dignity, hromada, resilience, honest AI).
5. As a visitor, I want clean navigation (Home, Read, About) so I can jump to the section I need.

**Backend (FastAPI + MongoDB)**
- Create FastAPI service:
  - `GET /api/health`.
  - `GET /api/book` → returns title, subtitle, description, themes list, pdfUrl.
  - (Optional) `GET /api/pdf` → redirects/proxies to the hosted PDF if needed for CORS stability.
- MongoDB:
  - Seed a single `book` document (or keep metadata static in code for MVP, with DB-ready structure).
- CORS config for React frontend.

**Frontend (React)**
- App shell with top nav and anchored sections: `/#home`, `/#read`, `/#about`.
- Visual design:
  - Minimalist, academic layout; lots of white space.
  - Palette: White background, dark blue text; accents in **Ukraine Blue #005BBB** and **Ukraine Yellow #FFD500**.
  - Typography: IBM Plex Sans (or similar) for headings/body; consistent hierarchy.
  - Subtle “civic/digital” motifs (thin lines, grid, map-like pattern) without clutter.
- Hero section:
  - Title + subtitle, short context paragraph, primary CTA “Read the Thesis”.
  - Highlight pills for themes (Civic AI, Dignity, Hromada, Honest AI, Resilience).
- PDF reader section:
  - Implement with `@react-pdf-viewer/core` + `@react-pdf-viewer/default-layout`.
  - Controls: thumbnails/sidebar (optional), page navigation, zoom, download.
  - Load from backend `pdfUrl` (or direct URL if stable).
  - Loading/error states (retry + direct link fallback).
- About/Themes section:
  - 6–8 theme cards with 1–2 line descriptions.
  - Emphasize transparency/accountability and Ukrainian linguistic sovereignty.
- Footer: source link to PDF + brief note.

**Testing (end of Phase 2)**
- End-to-end checks:
  - PDF loads on first visit; navigation/zoom works.
  - Mobile responsiveness (small viewport) and layout stability.
  - Error handling: if PDF fails, show direct open link.
  - Metadata endpoint returns expected data.

### Phase 3 — Incremental Improvements (post-V1)
**User stories (Improvements)**
1. As a reader, I want a “Continue reading” that remembers my last page so I can resume quickly.
2. As a reader, I want a table-of-contents jump list (if available) so I can move between sections.
3. As a visitor, I want Ukrainian/English UI toggle so the site reflects linguistic sovereignty.
4. As a visitor, I want shareable section links so I can cite or share parts of the site.
5. As a reader, I want improved accessibility (keyboard nav, contrast, ARIA labels) so reading is inclusive.

- Add last-page persistence (localStorage).
- Add optional TOC extraction/manual TOC.
- Add i18n (EN/UA) for site chrome (not PDF).
- Add accessibility pass + lighthouse checks.
- Re-test end-to-end.

### Phase 4 — Optional/Stretch (only if requested)
**User stories (Optional)**
1. As a researcher, I want searchable highlights/quotes so I can quickly find concepts.
2. As a visitor, I want a “Civic AI principles” page summarizing honest AI/accountability.
3. As an admin, I want to update metadata from a simple JSON editor (no full auth).
4. As a reader, I want offline-ready caching so the PDF still opens in poor connectivity.
5. As a visitor, I want analytics-free privacy-respecting metrics so the project stays aligned with dignity.

- Add lightweight client-side search (if feasible) or link out to PDF native search.
- Add static pages for principles/resources.
- Add admin-less content editing via environment/config.

## 3. Next Actions
1. Implement FastAPI endpoints (`/api/health`, `/api/book`) + CORS + seed metadata.
2. Implement React layout + theme (colors/typography) + navigation.
3. Integrate `@react-pdf-viewer/*` and validate PDF loads from the provided URL.
4. Add About/Themes content blocks aligned to the provided theme list.
5. Run a full end-to-end test pass (desktop + mobile) and fix any PDF loading/CORS issues.

## 4. Success Criteria
- Landing page is visually aligned with: minimalist academic aesthetic + Ukrainian blue/yellow civic-tech feel.
- PDF viewer is embedded and **fully usable**: loads reliably, page navigation + zoom works, responsive on mobile.
- About/Themes section clearly reflects the thesis themes (Diia, democracy vs surveillance, dignity/participation, resilience, honest AI, linguistic sovereignty).
- Backend returns metadata correctly; frontend consumes it without hard failures.
- Robust states: loading, error fallback (direct PDF link), and no broken navigation.
