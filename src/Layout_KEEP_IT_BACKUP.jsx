// src/components/Layout.jsx (updated)
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
    }
  }, []); // Run once on mount

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased">
      {/* Fixed navbar – measure its height */}
      <header ref={navbarRef} className="fixed inset-x-0 top-0 z-50">
        <Navbar />
      </header>

      <aside className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8">
        <ChatWidget />
      </aside>

      {/* Main – use measured height for perfect no-gap padding */}
      <main
        className="flex-grow"
        style={{ paddingTop: `${navbarHeight}px` }} // ← dynamic!
      >
        <Outlet />
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}




// // src/components/Layout.jsx
// import React from 'react';
// import { Outlet } from 'react-router-dom';
// //C:\Projects\Web\Syncline-it-solutions_BACKUP_WORKINGON\src\components\navbar\Navbar.jsx

// import Navbar from './components/navbar/Navbar';
// import Footer from './components/footer/Footer';
// import ChatWidget from './components/chat/ChatWidget'; // Adjust path if your ChatWidget is elsewhere

// /**
//  * Root layout for all pages.
//  * - Fixed navbar at top
//  * - Chat widget fixed bottom-right (outside flow)
//  * - Main content with responsive top padding to avoid navbar overlap
//  * - Footer pushed to bottom on short pages
//  * - Full viewport height minimum
//  */
// export default function Layout() {
//   return (
//     <div className="relative min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased">
//       {/* Fixed header with navbar */}
//       <header className="fixed inset-x-0 top-0 z-50">
//         <Navbar />
//       </header>

//       {/* Floating chat widget – outside main content flow */}
//       <aside className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8">
//         <ChatWidget />
//       </aside>

//       {/* Main content – push down by navbar height */}
//       <main className="flex-grow pt-16 sm:pt-20 lg:pt-24">
//         {/* All routed page content renders here */}
//         <Outlet />
//       </main>

//       {/* Footer – always at bottom when content is short */}
//       <footer className="mt-auto">
//         <Footer />
//       </footer>
//     </div>
//   );
// }










// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Navbar from './components/navbar/Navbar';
// import Footer from './components/footer/Footer';

// export default function Layout() {
//   return (
//     <div className="min-h-screen bg-slate-950">
//       <style>{`
//         :root {
//           --color-primary: #3b82f6;
//           --color-primary-light: #60a5fa;
//           --color-secondary: #06b6d4;
//           --color-accent: #8b5cf6;
//           --color-background: #020617;
//           --color-surface: #0f172a;
//           --color-text: #f8fafc;
//           --color-text-muted: #94a3b8;
//         }

//         * {
//           scrollbar-width: thin;
//           scrollbar-color: rgba(59, 130, 246, 0.3) transparent;
//         }

//         *::-webkit-scrollbar {
//           width: 6px;
//           height: 6px;
//         }

//         *::-webkit-scrollbar-track {
//           background: transparent;
//         }

//         *::-webkit-scrollbar-thumb {
//           background: rgba(59, 130, 246, 0.3);
//           border-radius: 3px;
//         }

//         *::-webkit-scrollbar-thumb:hover {
//           background: rgba(59, 130, 246, 0.5);
//         }

//         html {
//           scroll-behavior: smooth;
//         }

//         body {
//           font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//           -webkit-font-smoothing: antialiased;
//           -moz-osx-font-smoothing: grayscale;
//         }

//         ::selection {
//           background: rgba(59, 130, 246, 0.3);
//           color: white;
//         }

//         *:focus-visible {
//           outline: 2px solid var(--color-primary);
//           outline-offset: 2px;
//         }

//         @keyframes shimmer {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(100%); }
//         }

//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }

//         @keyframes pulse-glow {
//           0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
//           50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.5); }
//         }

//         .animate-shimmer {
//           animation: shimmer 2s infinite;
//         }

//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }

//         .animate-pulse-glow {
//           animation: pulse-glow 2s ease-in-out infinite;
//         }
//       `}</style>

//       <Navbar />
//       <Outlet />
//       <Footer />
//     </div>
//   );  
// }

