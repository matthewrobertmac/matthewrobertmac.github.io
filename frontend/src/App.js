import React, { useState, useEffect } from 'react';
import './App.css';
import TopNav from './components/TopNav';
import HeroSection from './components/HeroSection';
import PDFReaderSection from './components/PDFReaderSection';
import ThemesSection from './components/ThemesSection';
import Footer from './components/Footer';
import { Toaster } from './components/ui/sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function App() {
  const [bookData, setBookData] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('diia-dark-mode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('diia-dark-mode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/book`)
      .then(r => r.json())
      .then(data => setBookData(data))
      .catch(err => console.error('Failed to load book metadata', err));
  }, []);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <div className="App">
      <TopNav darkMode={darkMode} onToggleDark={toggleDarkMode} bookData={bookData} />
      <main>
        <HeroSection bookData={bookData} />
        <PDFReaderSection bookData={bookData} />
        <ThemesSection bookData={bookData} />
      </main>
      <Footer bookData={bookData} />
      <Toaster position="bottom-right" />
    </div>
  );
}
