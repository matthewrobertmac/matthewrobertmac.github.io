import React, { useState, useEffect } from 'react';
import './App.css';
import TopNav from './components/TopNav';
import HeroSection from './components/HeroSection';
import PDFReaderSection from './components/PDFReaderSection';
import ThemesSection from './components/ThemesSection';
import GallerySection from './components/GallerySection';
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
        <HeroSection bookData={bookData} />
        <PDFReaderSection bookData={bookData} />
        <GallerySection />
        <ThemesSection bookData={bookData} />
      </main>
      <Footer bookData={bookData} />
      <Toaster position="bottom-right" />
    </div>
  );
}
