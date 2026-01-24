// src/components/Layout.jsx
import React, { useRef, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import ChatWidget from './components/chat/ChatWidget'; // Adjust path if your ChatWidget is elsewhere

export default function Layout() {
  const navbarRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(64); // fallback

  useEffect(() => {
    if (navbarRef.current) {
      const height = navbarRef.current.offsetHeight;
      setNavbarHeight(height);
      // Optional: re-measure on window resize (good for mobile rotation)
      const handleResize = () => {
        if (navbarRef.current) {
          setNavbarHeight(navbarRef.current.offsetHeight);
        }
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased">
      {/* Fixed navbar – measure its height */}
      <header ref={navbarRef} className="fixed inset-x-0 top-0 z-[1000]">
        <Navbar />
      </header>

      {/* Chat widget – fixed, high z-index, responsive positioning */}
      <div className="fixed bottom-4 right-4 z-[9999] sm:bottom-5 sm:right-5 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8">
        <ChatWidget />
      </div>

      {/* Main content – dynamic padding based on real navbar height */}
      <main
        className="flex-grow"
        style={{ paddingTop: `${navbarHeight}px` }}
      >
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}