// src/components/navbar/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom'; // ← Changed from Link to NavLink for active state
import { Menu, Phone, ChevronDown, X, Shield } from 'lucide-react';
import MegaMenu from './MegaMenu';
import OffcanvasMenu from './OffcanvasMenu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const timeoutRef = useRef(null);
  const navRef = useRef(null);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Desktop dropdown handlers with longer delay + gap tolerance
  const handleMenuEnter = (menuId) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menuId);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 500); // Increased delay
  };

  // Close on link click or outside
  const handleLinkClick = () => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  // navItems – Added Home explicitly
  const navItems = [
    { id: 'home', label: 'Home', to: '/', hasDropdown: false },
    { id: 'services', label: 'Services', hasDropdown: true },
    { id: 'resources', label: 'Resources', hasDropdown: true },
    // { label: 'Security', to: '/security', hasDropdown: false },
    // { label: 'Service Areas', to: '/areas', hasDropdown: false },
    { label: 'Contact', to: '/contact', hasDropdown: false },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/95 backdrop-blur-md border-b border-white/10 shadow-xl'
            : 'bg-transparent'
        }`}
        ref={navRef}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <NavLink
              to="/"
              onClick={handleLinkClick}
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
            >
              <div className="relative flex-shrink-0">
                <img
                  src="https://placehold.co/48x48/3b82f6/ffffff?text=SI&font=roboto"
                  alt="Shakil IT Logo"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse" />
              </div>
              <div className="min-w-0">
                <span className="text-base sm:text-lg lg:text-xl font-bold text-white block truncate">Shakil IT</span>
                <span className="hidden sm:block text-xs text-slate-400 truncate">Enterprise IT Solutions</span>
              </div>
            </NavLink>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" role="navigation">
              {navItems.map((item) => (
                <div
                  key={item.id || item.label}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && handleMenuEnter(item.id)}
                  onMouseLeave={() => item.hasDropdown && handleMenuLeave()}
                >
                  {item.hasDropdown ? (
                    <button
                      className={`flex items-center gap-1 px-4 py-2 text-slate-300 hover:text-white font-medium transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        activeMenu === item.id ? 'text-white bg-white/5' : ''
                      }`}
                      aria-expanded={activeMenu === item.id}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          activeMenu === item.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  ) : (
                    <NavLink
                      to={item.to}
                      onClick={handleLinkClick}
                      className={({ isActive }) =>
                        `px-4 py-2 text-slate-300 hover:text-white font-medium transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isActive ? 'text-white bg-white/10 font-semibold' : ''
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:1300000000"
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium text-sm">1300 XXX XXX</span>
              </a>
              <NavLink
                to="/contact"
                onClick={handleLinkClick}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:scale-105 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Free Assessment
              </NavLink>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* MegaMenu Dropdown – full width, taller, stable */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute top-full left-0 w-full bg-slate-950 border-t border-slate-700 shadow-2xl z-[999]"
              onMouseEnter={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
              }}
              onMouseLeave={handleMenuLeave}
            >
              <div className="max-w-7xl mx-auto px-6 py-10 min-h-[35vh]"> {/* ← ~30-40% height feel */}
                <MegaMenu type={activeMenu} isOpen={true} onClose={handleLinkClick} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Offcanvas */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <OffcanvasMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;







// // src/components/navbar/Navbar.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { NavLink } from 'react-router-dom'; // ← Changed from Link to NavLink for active state
// import { Menu, Phone, ChevronDown, X, Shield } from 'lucide-react';
// import MegaMenu from './MegaMenu';
// import OffcanvasMenu from './OffcanvasMenu';

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [activeMenu, setActiveMenu] = useState(null);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const timeoutRef = useRef(null);
//   const navRef = useRef(null);

//   // Scroll detection
//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Clear timeout on unmount
//   useEffect(() => {
//     return () => {
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     };
//   }, []);

//   // Desktop dropdown handlers with longer delay + gap tolerance
//   const handleMenuEnter = (menuId) => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     setActiveMenu(menuId);
//   };

//   const handleMenuLeave = () => {
//     timeoutRef.current = setTimeout(() => {
//       setActiveMenu(null);
//     }, 500); // ← Increased to 500ms – feels more stable/professional
//   };

//   // Close on link click or outside
//   const handleLinkClick = () => {
//     setActiveMenu(null);
//     setMobileMenuOpen(false);
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//   };

//   // navItems – Added Home explicitly
//   const navItems = [
//     { id: 'home', label: 'Home', to: '/', hasDropdown: false },
//     { id: 'services', label: 'Services', hasDropdown: true },
//     { id: 'resources', label: 'Resources', hasDropdown: true },
//     { label: 'Security', to: '/security', hasDropdown: false },
//     { label: 'Service Areas', to: '/areas', hasDropdown: false },
//     { label: 'Contact', to: '/contact', hasDropdown: false },
//   ];

//   return (
//     <>
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5, ease: 'easeOut' }}
//         className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
//           isScrolled
//             ? 'bg-slate-900/95 backdrop-blur-md border-b border-white/10 shadow-xl'
//             : 'bg-transparent'
//         }`}
//         ref={navRef}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16 sm:h-20">
//             {/* Logo */}
//             <NavLink
//               to="/"
//               onClick={handleLinkClick}
//               className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
//             >
//               <div className="relative flex-shrink-0">
//                 <img
//                   src="https://placehold.co/48x48/3b82f6/ffffff?text=SI&font=roboto"
//                   alt="Shakil IT Logo"
//                   className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow object-cover"
//                 />
//                 <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse" />
//               </div>
//               <div className="min-w-0">
//                 <span className="text-base sm:text-lg lg:text-xl font-bold text-white block truncate">Shakil IT</span>
//                 <span className="hidden sm:block text-xs text-slate-400 truncate">Enterprise IT Solutions</span>
//               </div>
//             </NavLink>

//             {/* Desktop Nav */}
//             <nav className="hidden lg:flex items-center gap-1" role="navigation">
//               {navItems.map((item) => (
//                 <div
//                   key={item.id || item.label}
//                   className="relative"
//                   onMouseEnter={() => item.hasDropdown && handleMenuEnter(item.id)}
//                   onMouseLeave={() => item.hasDropdown && handleMenuLeave()}
//                 >
//                   {item.hasDropdown ? (
//                     <button
//                       className={`flex items-center gap-1 px-4 py-2 text-slate-300 hover:text-white font-medium transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                         activeMenu === item.id ? 'text-white bg-white/5' : ''
//                       }`}
//                       aria-expanded={activeMenu === item.id}
//                       aria-haspopup="true"
//                     >
//                       {item.label}
//                       <ChevronDown
//                         className={`w-4 h-4 transition-transform duration-300 ${
//                           activeMenu === item.id ? 'rotate-180' : ''
//                         }`}
//                       />
//                     </button>
//                   ) : (
//                     <NavLink
//                       to={item.to}
//                       onClick={handleLinkClick}
//                       className={({ isActive }) =>
//                         `px-4 py-2 text-slate-300 hover:text-white font-medium transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                           isActive ? 'text-white bg-white/10 font-semibold' : ''
//                         }`
//                       }
//                     >
//                       {item.label}
//                     </NavLink>
//                   )}
//                 </div>
//               ))}
//             </nav>

//             {/* Desktop CTA */}
//             <div className="hidden lg:flex items-center gap-4">
//               <a
//                 href="tel:1300000000"
//                 className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1"
//               >
//                 <Phone className="w-4 h-4" />
//                 <span className="font-medium text-sm">1300 XXX XXX</span>
//               </a>
//               <NavLink
//                 to="/contact"
//                 onClick={handleLinkClick}
//                 className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:scale-105 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950"
//               >
//                 Free Assessment
//               </NavLink>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setMobileMenuOpen(true)}
//               className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
//               aria-label="Open menu"
//               aria-expanded={mobileMenuOpen}
//             >
//               <Menu className="w-6 h-6 text-white" />
//             </button>
//           </div>
//         </div>

//         {/* MegaMenu Dropdown – full width, taller, stable */}
//         <AnimatePresence>
//           {activeMenu && (
//             <motion.div
//               key={activeMenu}
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.25, ease: 'easeOut' }}
//               className="absolute top-full left-0 w-full bg-slate-950 border-t border-slate-700 shadow-2xl z-[999]"
//               onMouseEnter={() => {
//                 if (timeoutRef.current) clearTimeout(timeoutRef.current);
//               }}
//               onMouseLeave={handleMenuLeave}
//             >
//               <div className="max-w-7xl mx-auto px-6 py-10 min-h-[35vh]"> {/* ← ~30-40% height feel */}
//                 <MegaMenu type={activeMenu} isOpen={true} onClose={handleLinkClick} />
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.nav>

//       {/* Mobile Offcanvas */}
//             <OffcanvasMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
//           </>
//   );
// };

// export default Navbar;





// // src/components/navbar/Navbar.jsx
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { Menu, Phone, ChevronDown, X, Shield } from 'lucide-react';

// import MegaMenu from './MegaMenu';
// import OffcanvasMenu from './OffcanvasMenu';

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [activeMenu, setActiveMenu] = useState(null);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [menuTimeout, setMenuTimeout] = useState(null);

//   // Scroll detection
//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Desktop dropdown handlers
//   const handleMenuEnter = (menuId) => {
//     if (menuTimeout) clearTimeout(menuTimeout);
//     setActiveMenu(menuId);
//   };

//   const handleMenuLeave = () => {
//     const timeout = setTimeout(() => {
//       setActiveMenu(null);
//     }, 300);
//     setMenuTimeout(timeout);
//   };

//   // Link click handler
//   const handleLinkClick = () => {
//     setActiveMenu(null);
//     setMobileMenuOpen(false);
//     if (menuTimeout) clearTimeout(menuTimeout);
//   };

//   const navItems = [
//     { id: 'services', label: 'Services', hasDropdown: true },
//     { id: 'resources', label: 'Resources', hasDropdown: true },
//     { label: 'Security', to: '/security' },
//     { label: 'Service Areas', to: '/areas' },
//     { label: 'Contact', to: '/contact' },
//   ];

//   return (
//     <>
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5 }}
//         className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
//           isScrolled ? 'bg-slate-900 border-b border-white/10 shadow-lg' : 'bg-transparent'
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16 sm:h-20">
//             {/* Logo */}
//             <Link to="/" onClick={handleLinkClick} className="flex items-center gap-3 group">
//               <div className="relative flex-shrink-0">
//                 <img
//                   src="https://placehold.co/48x48/3b82f6/ffffff?text=SI&font=roboto"
//                   alt="Shakil IT Logo"
//                   className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow object-cover"
//                 />
//                 <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse" />
//               </div>
//               <div className="min-w-0">
//                 <span className="text-base sm:text-lg lg:text-xl font-bold text-white block truncate">Shakil IT</span>
//                 <span className="hidden sm:block text-xs text-slate-400 truncate">Enterprise IT Solutions</span>
//               </div>
//             </Link>

//             {/* Desktop Nav */}
//             <nav className="hidden lg:flex items-center gap-1" role="navigation">
//               {navItems.map((item) => (
//                 <div
//                   key={item.id || item.label}
//                   className="relative"
//                   onMouseEnter={() => item.hasDropdown && handleMenuEnter(item.id)}
//                   onMouseLeave={handleMenuLeave}
//                 >
//                   {item.hasDropdown ? (
//                     <button
//                       className="flex items-center gap-1 px-3 py-2 text-slate-300 hover:text-white font-medium transition-colors"
//                       aria-expanded={activeMenu === item.id}
//                       aria-haspopup="true"
//                     >
//                       {item.label}
//                       <ChevronDown
//                         className={`w-4 h-4 transition-transform duration-300 ${
//                           activeMenu === item.id ? 'rotate-180' : ''
//                         }`}
//                       />
//                     </button>
//                   ) : (
//                     <Link
//                       to={item.to}
//                       onClick={handleLinkClick}
//                       className="px-3 py-2 text-slate-300 hover:text-white font-medium transition-colors"
//                     >
//                       {item.label}
//                     </Link>
//                   )}
//                 </div>
//               ))}
//             </nav>

//             {/* Desktop CTA */}
//             <div className="hidden lg:flex items-center gap-4">
//               <a href="tel:1300000000" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
//                 <Phone className="w-4 h-4" />
//                 <span className="font-medium text-sm">1300 XXX XXX</span>
//               </a>
//               <Link
//                 to="/contact"
//                 onClick={handleLinkClick}
//                 className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-105 text-sm"
//               >
//                 Free Assessment
//               </Link>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setMobileMenuOpen(true)}
//               className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
//               aria-label="Open menu"
//               aria-expanded={mobileMenuOpen}
//             >
//               <Menu className="w-6 h-6 text-white" />
//             </button>
//           </div>
//         </div>

//         {/* MegaMenu Dropdown */}
//         <AnimatePresence>
//           {activeMenu && (
//             <motion.div
//               key={activeMenu}
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.3 }}
//               className="absolute top-full left-0 w-full z-[999] bg-slate-900 shadow-xl"
//             >
//               <MegaMenu type={activeMenu} isOpen={true} onClose={handleLinkClick} />
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.nav>

//       {/* Mobile Offcanvas */}
//       <OffcanvasMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

//       {/* Spacer for fixed nav */}
//       <div className="h-16 sm:h-20 lg:h-24" aria-hidden="true" />
//     </>
//   );
// };

// export default Navbar;



// // src/components/navbar/Navbar.jsx



// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router-dom';

// // Individual Lucide icon imports (tree-shake friendly + alias)
// // Using original names to avoid renaming in JSX
// import Menu from '@lucide/menu';
// import Phone from '@lucide/phone';
// import ChevronDown from '@lucide/chevron-down';
// import X from '@lucide/x';

// import MegaMenu from './MegaMenu';
// import OffcanvasMenu from './OffcanvasMenu';

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [activeMenu, setActiveMenu] = useState(null);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [menuTimeout, setMenuTimeout] = useState(null);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleMenuEnter = (menuId) => {
//     if (menuTimeout) clearTimeout(menuTimeout);
//     setActiveMenu(menuId);
//   };

//   const handleMenuLeave = () => {
//     const timeout = setTimeout(() => {
//       setActiveMenu(null);
//     }, 500); // Reliable hover switching
//     setMenuTimeout(timeout);
//   };

//   const handleLinkClick = () => {
//     setActiveMenu(null);
//     setMobileMenuOpen(false);
//     if (menuTimeout) clearTimeout(menuTimeout);
//   };

//   const navItems = [
//     { id: 'services', label: 'Services', hasDropdown: true },
//     { id: 'resources', label: 'Resources', hasDropdown: true },
//     { label: 'Security', to: '/security' },
//     { label: 'Service Areas', to: '/areas' },
//     { label: 'Contact', to: '/contact' },
//   ];

//   return (
//     <>
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5 }}
//         className={`
//           fixed top-0 left-0 right-0 z-[1000]
//           transition-all duration-300
//           ${isScrolled 
//             ? 'bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-xl' 
//             : 'bg-transparent'
//           }
//         `}
//         style={{
//           isolation: 'isolate',
//           contain: 'layout style paint',
//         }}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16 sm:h-20">
//             {/* Logo */}
//             <Link
//               to="/"
//               className="flex items-center gap-3 group"
//               onClick={handleLinkClick}
//             >
//               <div className="relative flex-shrink-0">
//                 <img
//                   src="https://placehold.co/48x48/3b82f6/ffffff?text=SI&font=roboto"
//                   alt="Shakil IT Logo"
//                   className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow object-cover"
//                 />
//                 <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse" />
//               </div>
//               <div className="min-w-0">
//                 <span className="text-base sm:text-lg lg:text-xl font-bold text-white block">Shakil IT</span>
//                 <span className="hidden sm:block text-xs text-slate-400 truncate">Enterprise IT Solutions</span>
//               </div>
//             </Link>

//             {/* Desktop Navigation */}
//             <nav className="hidden lg:flex items-center gap-1" role="navigation">
//               {navItems.map((item) => (
//                 <div
//                   key={item.id || item.label}
//                   className="relative"
//                   onMouseEnter={() => item.hasDropdown && handleMenuEnter(item.id)}
//                   onMouseLeave={handleMenuLeave}
//                 >
//                   {item.hasDropdown ? (
//                     <button
//                       className="flex items-center gap-1 px-3 xl:px-4 py-2 text-slate-300 hover:text-white font-medium transition-colors group"
//                       aria-expanded={activeMenu === item.id}
//                       aria-haspopup="true"
//                     >
//                       <span className="text-sm xl:text-base">{item.label}</span>
//                       <ChevronDown
//                         className={`w-4 h-4 transition-transform duration-300 ${
//                           activeMenu === item.id ? 'rotate-180' : ''
//                         } group-hover:text-blue-300`}
//                       />
//                     </button>
//                   ) : (
//                     <Link
//                       to={item.to}
//                       className="px-3 xl:px-4 py-2 text-slate-300 hover:text-white font-medium transition-colors text-sm xl:text-base"
//                       onClick={handleLinkClick}
//                     >
//                       {item.label}
//                     </Link>
//                   )}
//                 </div>
//               ))}
//             </nav>

//             {/* Desktop CTA Buttons – Phone icon now works */}
//             <div className="hidden lg:flex items-center gap-3 xl:gap-4">
//               <a
//                 href="tel:1300000000"
//                 className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors group"
//               >
//                 <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
//                 <span className="font-medium text-sm xl:text-base">1300 XXX XXX</span>
//               </a>
//               <Link
//                 to="/contact"
//                 onClick={handleLinkClick}
//                 className="px-5 xl:px-6 py-2 xl:py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-105 text-sm xl:text-base"
//               >
//                 Free Assessment
//               </Link>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
//               aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
//               aria-expanded={mobileMenuOpen}
//             >
//               {mobileMenuOpen ? (
//                 <X className="w-6 h-6 text-white" />
//               ) : (
//                 <Menu className="w-6 h-6 text-white" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mega Menu Dropdown */}
//         <AnimatePresence>
//           {activeMenu && (
//             <div
//               className="absolute top-full left-0 w-full z-[9999] pointer-events-auto"
//               style={{ isolation: 'isolate' }}
//               onMouseEnter={() => {
//                 if (menuTimeout) clearTimeout(menuTimeout);
//               }}
//               onMouseLeave={handleMenuLeave}
//             >
//               <MegaMenu
//                 type={activeMenu}
//                 isOpen={true}
//                 onClose={handleLinkClick}
//               />
//             </div>
//           )}
//         </AnimatePresence>
//       </motion.nav>

//       {/* Mobile Offcanvas */}
//       <OffcanvasMenu 
//         isOpen={mobileMenuOpen} 
//         onClose={() => setMobileMenuOpen(false)} 
//       />

//       {/* Spacer */}
//       <div className="h-16 sm:h-20 lg:h-24" aria-hidden="true" />
//     </>
//   );
// };

// export default Navbar;



// // src/components/navbar/Navbar.jsx
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { Menu, Phone, ChevronDown, X } from 'lucide-react';
// import MegaMenu from './MegaMenu';
// import OffcanvasMenu from './OffcanvasMenu';

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [activeMenu, setActiveMenu] = useState(null);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [menuTimeout, setMenuTimeout] = useState(null);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleMenuEnter = (menuId) => {
//     if (menuTimeout) clearTimeout(menuTimeout);
//     setActiveMenu(menuId);
//   };

//   const handleMenuLeave = () => {
//     const timeout = setTimeout(() => setActiveMenu(null), 500); // reliable hover
//     setMenuTimeout(timeout);
//   };

//   const handleLinkClick = () => {
//     setActiveMenu(null);
//     setMobileMenuOpen(false);
//     if (menuTimeout) clearTimeout(menuTimeout);
//   };

//   const navItems = [
//     { id: 'services', label: 'Services', hasDropdown: true },
//     { id: 'resources', label: 'Resources', hasDropdown: true },
//     { label: 'Security', to: '/security' },
//     { label: 'Service Areas', to: '/areas' },
//     { label: 'Contact', to: '/contact' },
//   ];

//   return (
//     <>
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5 }}
//         className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
//           isScrolled ? 'bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-xl' : 'bg-transparent'
//         }`}
//         style={{ isolation: 'isolate', contain: 'layout style paint' }}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16 sm:h-20">
//             {/* Logo */}
//             <Link to="/" className="flex items-center gap-3 group" onClick={handleLinkClick}>
//               <div className="relative">
//                 <img
//                   src="https://placehold.co/48x48/3b82f6/ffffff?text=SI"
//                   alt="Shakil IT"
//                   className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow"
//                 />
//                 <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse" />
//               </div>
//               <div>
//                 <span className="text-lg sm:text-xl font-bold text-white block">Shakil IT</span>
//                 <span className="hidden sm:block text-xs text-slate-400">Enterprise IT Solutions</span>
//               </div>
//             </Link>

//             {/* Desktop Nav */}
//             <nav className="hidden lg:flex items-center gap-1">
//               {navItems.map((item) => (
//                 <div
//                   key={item.id || item.label}
//                   className="relative"
//                   onMouseEnter={() => item.hasDropdown && handleMenuEnter(item.id)}
//                   onMouseLeave={handleMenuLeave}
//                 >
//                   {item.hasDropdown ? (
//                     <button
//                       className="flex items-center gap-1 px-3 xl:px-4 py-2 text-slate-300 hover:text-white font-medium transition-colors"
//                     >
//                       <span className="text-sm xl:text-base">{item.label}</span>
//                       <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === item.id ? 'rotate-180' : ''}`} />
//                     </button>
//                   ) : (
//                     <Link
//                       to={item.to}
//                       className="px-3 xl:px-4 py-2 text-slate-300 hover:text-white font-medium transition-colors text-sm xl:text-base"
//                       onClick={handleLinkClick}
//                     >
//                       {item.label}
//                     </Link>
//                   )}
//                 </div>
//               ))}
//             </nav>

//             {/* Desktop CTAs */}
//             <div className="hidden lg:flex items-center gap-4">
//               <a href="tel:1300000000" className="flex items-center gap-2 text-slate-300 hover:text-white">
//                 <Phone className="w-4 h-4" />
//                 <span>1300 XXX XXX</span>
//               </a>
//               <Link
//                 to="/contact"
//                 className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-105"
//               >
//                 Free Assessment
//               </Link>
//             </div>

//             {/* Mobile Toggle */}
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="lg:hidden p-2 rounded-lg hover:bg-white/10"
//             >
//               {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mega Menu */}
//         <AnimatePresence>
//           {activeMenu && (
//             <div
//               className="absolute top-full left-0 w-full z-[9999] pointer-events-auto"
//               style={{ isolation: 'isolate' }}
//               onMouseEnter={() => menuTimeout && clearTimeout(menuTimeout)}
//               onMouseLeave={handleMenuLeave}
//             >
//               <MegaMenu type={activeMenu} isOpen onClose={handleLinkClick} />
//             </div>
//           )}
//         </AnimatePresence>
//       </motion.nav>

//       <OffcanvasMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

//       {/* Spacer */}
//       <div className="h-16 sm:h-20 lg:h-24" aria-hidden="true" />
//     </>
//   );
// };

// export default Navbar;




// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Menu, Phone, Shield, ChevronDown } from 'lucide-react';
// import MegaMenu from './MegaMenu';
// import OffcanvasMenu from './OffcanvasMenu';

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [activeMenu, setActiveMenu] = useState(null);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [menuTimeout, setMenuTimeout] = useState(null);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleMenuEnter = (menuId) => {
//     if (menuTimeout) clearTimeout(menuTimeout);
//     const timeout = setTimeout(() => setActiveMenu(menuId), 150);
//     setMenuTimeout(timeout);
//   };

//   const handleMenuLeave = () => {
//     if (menuTimeout) clearTimeout(menuTimeout);
//     const timeout = setTimeout(() => {
//       setActiveMenu(null);
//     }, 300);
//     setMenuTimeout(timeout);
//   };

//   const handleLinkClick = () => {
//     setActiveMenu(null);
//     if (menuTimeout) clearTimeout(menuTimeout);
//   };

//   const navItems = [
//     { id: 'services', label: 'Services', hasDropdown: true },
//     { id: 'resources', label: 'Resources', hasDropdown: true },
//     { id: 'security', label: 'Security', href: '#security' },
//     { id: 'areas', label: 'Service Areas', href: '#areas' },
//     { id: 'contact', label: 'Contact', href: '#contact' }
//   ];

//   return (
//     <>
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5 }}
//         className={`fixed top-0 left-0 right-0 z-[49] transition-all duration-300 ${
//           isScrolled 
//             ? 'bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-lg' 
//             : 'bg-transparent'
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-20">
//             {/* Logo */}
//             <a href="#" className="flex items-center gap-3 group" aria-label="Shakil IT - Home" onClick={handleLinkClick}>
//               <div className="relative flex-shrink-0">
//                 {/* Logo Placeholder - Replace with your own logo */}
//                 <img 
//                   src="https://placehold.co/48x48/3b82f6/ffffff?text=SI&font=roboto" 
//                   alt="Shakil IT Logo"
//                   className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow object-cover"
//                   onError={(e) => {
//                     e.target.style.display = 'none';
//                     e.target.nextElementSibling.style.display = 'flex';
//                   }}
//                 />
//                 <div className="hidden w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
//                   <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
//                 </div>
//                 <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse" aria-hidden="true" />
//               </div>
//               <div className="min-w-0">
//                 <span className="text-lg sm:text-xl font-bold text-white truncate block">Shakil IT</span>
//                 <span className="hidden sm:block text-xs text-slate-400 truncate">Enterprise IT Solutions</span>
//               </div>
//             </a>

//             {/* Desktop Navigation */}
//             <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
//               {navItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className="relative"
//                   onMouseEnter={() => item.hasDropdown && handleMenuEnter(item.id)}
//                   onMouseLeave={handleMenuLeave}
//                 >
//                   {item.hasDropdown ? (
//                     <button 
//                       className="flex items-center gap-1 px-4 py-2 text-slate-300 hover:text-white font-medium transition-colors"
//                       aria-expanded={activeMenu === item.id}
//                       aria-haspopup="true"
//                       aria-label={`${item.label} menu`}
//                     >
//                       {item.label}
//                       <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === item.id ? 'rotate-180' : ''}`} aria-hidden="true" />
//                     </button>
//                   ) : (
//                     <a
//                       href={item.href}
//                       onClick={handleLinkClick}
//                       className="px-4 py-2 text-slate-300 hover:text-white font-medium transition-colors"
//                       aria-label={item.label}
//                     >
//                       {item.label}
//                     </a>
//                   )}
//                 </div>
//               ))}
//             </nav>

//             {/* CTA Buttons */}
//             <div className="hidden lg:flex items-center gap-4">
//               <a
//                 href="tel:1300000000"
//                 className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
//                 aria-label="Call 1300 XXX XXX"
//               >
//                 <Phone className="w-4 h-4" aria-hidden="true" />
//                 <span className="font-medium">1300 XXX XXX</span>
//               </a>
//               <a
//                 href="#contact"
//                 onClick={handleLinkClick}
//                 className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-105"
//                 aria-label="Get Free IT Assessment"
//               >
//                 Free Assessment
//               </a>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setMobileMenuOpen(true)}
//               className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
//               aria-label="Open navigation menu"
//               aria-expanded={mobileMenuOpen}
//             >
//               <Menu className="w-6 h-6 text-white" aria-hidden="true" />
//             </button>
//           </div>
//         </div>

//         {/* Mega Menus */}
//         <div
//           onMouseEnter={() => {
//             if (menuTimeout) clearTimeout(menuTimeout);
//           }}
//           onMouseLeave={handleMenuLeave}
//         >
//           <MegaMenu type="services" isOpen={activeMenu === 'services'} onClose={handleLinkClick} />
//           <MegaMenu type="resources" isOpen={activeMenu === 'resources'} onClose={handleLinkClick} />
//         </div>
//       </motion.nav>

//       {/* Mobile Offcanvas */}
//       <OffcanvasMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
//     </>
//   );
// };

// export default Navbar;



// // src/components/navbar/Navbar.jsx
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { Menu, Phone, Shield, ChevronDown, X } from 'lucide-react';
// import MegaMenu from './MegaMenu';
// import OffcanvasMenu from './OffcanvasMenu';

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [activeMenu, setActiveMenu] = useState(null);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [menuTimeout, setMenuTimeout] = useState(null);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleMenuEnter = (menuId) => {
//     if (menuTimeout) clearTimeout(menuTimeout);
//     setActiveMenu(menuId);
//   };

//   const handleMenuLeave = () => {
//     const timeout = setTimeout(() => {
//       setActiveMenu(null);
//     }, 400); // Improved hover reliability
//     setMenuTimeout(timeout);
//   };

//   const handleLinkClick = () => {
//     setActiveMenu(null);
//     setMobileMenuOpen(false);
//     if (menuTimeout) clearTimeout(menuTimeout);
//   };

//   const navItems = [
//     { id: 'services', label: 'Services', hasDropdown: true },
//     { id: 'resources', label: 'Resources', hasDropdown: true },
//     { id: 'security', label: 'Security', href: '/security' },
//     { id: 'areas', label: 'Service Areas', href: '/areas' },
//     { id: 'contact', label: 'Contact', href: '/contact' },
//   ];

//   return (
//     <>
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5 }}
//         className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
//           isScrolled
//             ? 'bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-xl'
//             : 'bg-transparent'
//         }`}
//         style={{
//           isolation: 'isolate',
//           contain: 'layout style paint',
//         }}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16 sm:h-20">
//             {/* Logo */}
//             <Link
//               to="/"
//               className="flex items-center gap-2 sm:gap-3 group"
//               onClick={handleLinkClick}
//             >
//               <div className="relative flex-shrink-0">
//                 <img
//                   src="https://placehold.co/48x48/3b82f6/ffffff?text=SI&font=roboto"
//                   alt="Shakil IT Logo"
//                   className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow"
//                 />
//                 <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse" />
//               </div>
//               <div>
//                 <span className="text-base sm:text-lg lg:text-xl font-bold text-white block">Shakil IT</span>
//                 <span className="hidden sm:block text-xs text-slate-400">Enterprise IT Solutions</span>
//               </div>
//             </Link>

//             {/* Desktop Navigation */}
//             <nav className="hidden lg:flex items-center gap-1">
//               {navItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className="relative"
//                   onMouseEnter={() => item.hasDropdown && handleMenuEnter(item.id)}
//                   onMouseLeave={handleMenuLeave}
//                 >
//                   {item.hasDropdown ? (
//                     <button
//                       className="flex items-center gap-1 px-3 xl:px-4 py-2 text-slate-300 hover:text-white font-medium transition-colors group"
//                       aria-expanded={activeMenu === item.id}
//                     >
//                       <span className="text-sm xl:text-base">{item.label}</span>
//                       <ChevronDown
//                         className={`w-4 h-4 transition-transform duration-300 ${
//                           activeMenu === item.id ? 'rotate-180' : ''
//                         } group-hover:text-blue-300`}
//                       />
//                     </button>
//                   ) : (
//                     <Link
//                       to={item.href}
//                       onClick={handleLinkClick}
//                       className="px-3 xl:px-4 py-2 text-slate-300 hover:text-white font-medium transition-colors text-sm xl:text-base"
//                     >
//                       {item.label}
//                     </Link>
//                   )}
//                 </div>
//               ))}
//             </nav>

//             {/* CTA Buttons */}
//             <div className="hidden lg:flex items-center gap-3 xl:gap-4">
//               <a
//                 href="tel:1300000000"
//                 className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors group"
//               >
//                 <Phone className="w-4 h-4 group-hover:text-blue-300 transition-colors" />
//                 <span className="font-medium text-sm xl:text-base">1300 XXX XXX</span>
//               </a>
//               <Link
//                 to="/contact"
//                 onClick={handleLinkClick}
//                 className="px-5 xl:px-6 py-2 xl:py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-105 text-sm xl:text-base"
//               >
//                 Free Assessment
//               </Link>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
//               aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
//             >
//               {mobileMenuOpen ? (
//                 <X className="w-6 h-6 text-white" />
//               ) : (
//                 <Menu className="w-6 h-6 text-white" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mega Menu Dropdown */}
//         <AnimatePresence>
//           {activeMenu && (
//             <div
//               className="absolute top-full left-0 w-full z-[9999]"
//               style={{ isolation: 'isolate' }}
//               onMouseEnter={() => {
//                 if (menuTimeout) clearTimeout(menuTimeout);
//               }}
//               onMouseLeave={handleMenuLeave}
//             >
//               <MegaMenu
//                 type={activeMenu}
//                 isOpen={true}
//                 onClose={handleLinkClick}
//               />
//             </div>
//           )}
//         </AnimatePresence>
//       </motion.nav>

//       {/* Mobile Offcanvas */}
//       <OffcanvasMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

//       {/* Critical spacer to prevent content jump under fixed navbar */}
//       <div className="h-16 sm:h-20 lg:h-24" aria-hidden="true" />
//     </>
//   );
// };

// export default Navbar;


// // src/components/navbar/Navbar.jsx
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { Menu, Phone, Shield, ChevronDown } from 'lucide-react';
// import MegaMenu from './MegaMenu';
// import OffcanvasMenu from './OffcanvasMenu';

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [activeMenu, setActiveMenu] = useState(null);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [menuTimeout, setMenuTimeout] = useState(null);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleMenuEnter = (menuId) => {
//     if (menuTimeout) clearTimeout(menuTimeout);
//     setActiveMenu(menuId);
//   };

//   const handleMenuLeave = () => {
//     const timeout = setTimeout(() => {
//       setActiveMenu(null);
//     }, 150); // Faster close for better UX
//     setMenuTimeout(timeout);
//   };

//   const handleLinkClick = () => {
//     setActiveMenu(null);
//     setMobileMenuOpen(false);
//     if (menuTimeout) clearTimeout(menuTimeout);
//   };

//   const navItems = [
//     { id: 'services', label: 'Services', hasDropdown: true },
//     { id: 'resources', label: 'Resources', hasDropdown: true },
//     { id: 'security', label: 'Security', href: '/security' },
//     { id: 'areas', label: 'Service Areas', href: '/areas' },
//     { id: 'contact', label: 'Contact', href: '/contact' }
//   ];

//   return (
//     <>
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5 }}
//         className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
//           isScrolled
//             ? 'bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-lg'
//             : 'bg-transparent'
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-20">
//             {/* Logo */}
//             <Link
//               to="/"
//               className="flex items-center gap-3 group"
//               aria-label="Shakil IT - Home"
//               onClick={handleLinkClick}
//             >
//               <div className="relative flex-shrink-0">
//                 <img
//                   src="https://placehold.co/48x48/3b82f6/ffffff?text=SI&font=roboto"
//                   alt="Shakil IT Logo"
//                   className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow object-cover"
//                 />
//                 <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse" />
//               </div>
//               <div className="min-w-0">
//                 <span className="text-lg sm:text-xl font-bold text-white block">Shakil IT</span>
//                 <span className="hidden sm:block text-xs text-slate-400 truncate">Enterprise IT Solutions</span>
//               </div>
//             </Link>

//             {/* Desktop Navigation */}
//             <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
//               {navItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className="relative"
//                   onMouseEnter={() => item.hasDropdown && handleMenuEnter(item.id)}
//                   onMouseLeave={handleMenuLeave}
//                 >
//                   {item.hasDropdown ? (
//                     <button
//                       className="flex items-center gap-1 px-4 py-2 text-slate-300 hover:text-white font-medium transition-colors"
//                       aria-expanded={activeMenu === item.id}
//                       aria-haspopup="true"
//                       aria-label={`${item.label} menu`}
//                     >
//                       {item.label}
//                       <ChevronDown
//                         className={`w-4 h-4 transition-transform ${activeMenu === item.id ? 'rotate-180' : ''}`}
//                         aria-hidden="true"
//                       />
//                     </button>
//                   ) : (
//                     <Link
//                       to={item.href}
//                       onClick={handleLinkClick}
//                       className="px-4 py-2 text-slate-300 hover:text-white font-medium transition-colors"
//                       aria-label={item.label}
//                     >
//                       {item.label}
//                     </Link>
//                   )}
//                 </div>
//               ))}
//             </nav>

//             {/* CTA Buttons */}
//             <div className="hidden lg:flex items-center gap-4">
//               <a
//                 href="tel:1300000000"
//                 className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
//                 aria-label="Call 1300 XXX XXX"
//               >
//                 <Phone className="w-4 h-4" aria-hidden="true" />
//                 <span className="font-medium">1300 XXX XXX</span>
//               </a>
//               <Link
//                 to="/contact"
//                 onClick={handleLinkClick}
//                 className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-105"
//                 aria-label="Get Free IT Assessment"
//               >
//                 Free Assessment
//               </Link>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setMobileMenuOpen(true)}
//               className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
//               aria-label="Open navigation menu"
//               aria-expanded={mobileMenuOpen}
//             >
//               <Menu className="w-6 h-6 text-white" aria-hidden="true" />
//             </button>
//           </div>
//         </div>

//         {/* Mega Menus - Instant, no gap */}
//         <AnimatePresence>
//           {activeMenu && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.15 }}
//               className="absolute top-full left-0 w-full z-[999]"
//               onMouseEnter={() => {
//                 if (menuTimeout) clearTimeout(menuTimeout);
//               }}
//               onMouseLeave={handleMenuLeave}
//             >
//               <MegaMenu
//                 type={activeMenu}
//                 isOpen={true}
//                 onClose={handleLinkClick}
//               />
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.nav>

//       {/* Mobile Offcanvas */}
//       <OffcanvasMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

//       {/* Spacer */}
//       <div className="h-20" />
//     </>
//   );
// };

// export default Navbar;


// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Menu, Phone, Shield, ChevronDown } from 'lucide-react';
// import MegaMenu from './MegaMenu';
// import OffcanvasMenu from './OffcanvasMenu';

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [activeMenu, setActiveMenu] = useState(null);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [menuTimeout, setMenuTimeout] = useState(null);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleMenuEnter = (menuId) => {
//     if (menuTimeout) clearTimeout(menuTimeout);
//     setActiveMenu(menuId);
//   };

//   const handleMenuLeave = () => {
//     const timeout = setTimeout(() => {
//       setActiveMenu(null);
//     }, 200);
//     setMenuTimeout(timeout);
//   };

//   const handleLinkClick = () => {
//     setActiveMenu(null);
//     if (menuTimeout) clearTimeout(menuTimeout);
//   };

//   const navItems = [
//     { id: 'services', label: 'Services', hasDropdown: true },
//     { id: 'resources', label: 'Resources', hasDropdown: true },
//     { id: 'security', label: 'Security', href: '#security' },
//     { id: 'areas', label: 'Service Areas', href: '#areas' },
//     { id: 'contact', label: 'Contact', href: '#contact' }
//   ];

//   return (
//     <>
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5 }}
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//           isScrolled 
//             ? 'bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-lg' 
//             : 'bg-transparent'
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-20">
//             {/* Logo */}
//             <a href="#" className="flex items-center gap-3 group" aria-label="Shakil IT - Home" onClick={handleLinkClick}>
//               <div className="relative flex-shrink-0">
//                 {/* Logo Placeholder - Replace with your own logo */}
//                 <img 
//                   src="https://placehold.co/48x48/3b82f6/ffffff?text=SI&font=roboto" 
//                   alt="Shakil IT Logo"
//                   className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow object-cover"
//                   onError={(e) => {
//                     e.target.style.display = 'none';
//                     e.target.nextElementSibling.style.display = 'flex';
//                   }}
//                 />
//                 <div className="hidden w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
//                   <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
//                 </div>
//                 <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse" aria-hidden="true" />
//               </div>
//               <div className="min-w-0">
//                 <span className="text-lg sm:text-xl font-bold text-white truncate block">Shakil IT</span>
//                 <span className="hidden sm:block text-xs text-slate-400 truncate">Enterprise IT Solutions</span>
//               </div>
//             </a>

//             {/* Desktop Navigation */}
//             <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
//               {navItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className="relative"
//                   onMouseEnter={() => item.hasDropdown && handleMenuEnter(item.id)}
//                   onMouseLeave={handleMenuLeave}
//                 >
//                   {item.hasDropdown ? (
//                     <button 
//                       className="flex items-center gap-1 px-4 py-2 text-slate-300 hover:text-white font-medium transition-colors"
//                       aria-expanded={activeMenu === item.id}
//                       aria-haspopup="true"
//                       aria-label={`${item.label} menu`}
//                     >
//                       {item.label}
//                       <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === item.id ? 'rotate-180' : ''}`} aria-hidden="true" />
//                     </button>
//                   ) : (
//                     <a
//                       href={item.href}
//                       onClick={handleLinkClick}
//                       className="px-4 py-2 text-slate-300 hover:text-white font-medium transition-colors"
//                       aria-label={item.label}
//                     >
//                       {item.label}
//                     </a>
//                   )}
//                 </div>
//               ))}
//             </nav>

//             {/* CTA Buttons */}
//             <div className="hidden lg:flex items-center gap-4">
//               <a
//                 href="tel:1300000000"
//                 className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
//                 aria-label="Call 1300 XXX XXX"
//               >
//                 <Phone className="w-4 h-4" aria-hidden="true" />
//                 <span className="font-medium">1300 XXX XXX</span>
//               </a>
//               <a
//                 href="#contact"
//                 onClick={handleLinkClick}
//                 className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-105"
//                 aria-label="Get Free IT Assessment"
//               >
//                 Free Assessment
//               </a>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setMobileMenuOpen(true)}
//               className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
//               aria-label="Open navigation menu"
//               aria-expanded={mobileMenuOpen}
//             >
//               <Menu className="w-6 h-6 text-white" aria-hidden="true" />
//             </button>
//           </div>
//         </div>

//         {/* Mega Menus */}
//         <div
//           onMouseEnter={() => {
//             if (menuTimeout) clearTimeout(menuTimeout);
//           }}
//           onMouseLeave={handleMenuLeave}
//         >
//           <MegaMenu type="services" isOpen={activeMenu === 'services'} onClose={handleLinkClick} />
//           <MegaMenu type="resources" isOpen={activeMenu === 'resources'} onClose={handleLinkClick} />
//         </div>
//       </motion.nav>

//       {/* Mobile Offcanvas */}
//       <OffcanvasMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
//     </>
//   );
// };

// export default Navbar;