import React, { useState, useEffect } from 'react';
import './App.css';
import TopNav from './components/TopNav';
import HeroSection from './components/HeroSection';
import AudiobookSection from './components/AudiobookSection';
import TableOfContents from './components/TableOfContents';
import PDFReaderSection from './components/PDFReaderSection';
import GallerySection from './components/GallerySection';
import ThemesSection from './components/ThemesSection';
import Footer from './components/Footer';
import { Toaster } from './components/ui/sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function App() {
  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/book`)
      .then(r => r.json())
      .then(data => setBookData(data))
      .catch(err => console.error('Failed to load book metadata', err));
  }, []);

  return (
    <div className="App parchment-texture">
      <TopNav bookData={bookData} />
      <main>
        {/* 1. Hero landing */}
        <HeroSection bookData={bookData} />

        {/* 2. Audiobook (YouTube) — primary viewing experience */}
        <AudiobookSection />

        {/* 3. Table of Contents */}
        <TableOfContents />

        {/* 4. PDF Reader — full viewport height */}
        <PDFReaderSection bookData={bookData} />

        {/* 5. Cossack Gallery */}
        <GallerySection />

        {/* 6. About / Themes */}
        <ThemesSection bookData={bookData} />
      </main>
      <Footer bookData={bookData} />
      <Toaster position="bottom-right" />
    </div>
  );
}
