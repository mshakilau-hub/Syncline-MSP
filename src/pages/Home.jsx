// src/pages/Home.jsx
import React, { Suspense, lazy } from 'react';
import Navbar from '../components/navbar/Navbar';
import HeroSection from '../components/hero/HeroSection';

// Lazy load components from their actual locations
const ServicesSection = lazy(() => import('../components/services/ServicesSection'));
const MonitoringDashboard = lazy(() => import('../components/monitoring/MonitoringDashboard'));
const CustomToolsSection = lazy(() => import('../components/tools/CustomToolsSection'));
const SecuritySection = lazy(() => import('../components/security/SecuritySection'));
const TestimonialsSection = lazy(() => import('../components/testimonials/TestimonialsSection'));
const AboutSection = lazy(() => import('../components/about/AboutSection'));
const CTASection = lazy(() => import('../components/cta/CTASection'));
const ContactSection = lazy(() => import('../components/contact/ContactSection'));
const Footer = lazy(() => import('../components/footer/Footer'));
const ChatWidget = lazy(() => import('../components/chat/ChatWidget'));
const AutomationPage = lazy(() => import('./Automation'));
const CloudPage = lazy(() => import('./Cloud'));
const ManagedITPage = lazy(() => import('./ManagedIT'));


const CaseStudies = lazy(() => import('./CaseStudies'));
const ITHealthCheck = lazy(() => import('./ITHealthCheck'));
const AboutShakil = lazy(() => import('./AboutShakil'));
const CustomerPortal = lazy(() => import('./CustomerPortal'));




// Loading fallback
const SectionFallback = () => (
  <div className="w-full py-20 lg:py-32 bg-slate-900/30 animate-pulse">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="h-12 bg-slate-800/60 rounded-xl w-3/4 max-w-lg mx-auto mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-72 bg-slate-800/60 rounded-2xl" />
        ))}
      </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Accessibility skip link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        {/* Hero Section - Always visible */}
        <HeroSection />

        {/* Monitoring Dashboard - ID: monitoring */}
        <section id="monitoring">
          <Suspense fallback={<SectionFallback />}>
            <MonitoringDashboard />
          </Suspense>
        </section>

        {/* Custom Tools - ID: tools */}
        <section id="tools">
          <Suspense fallback={<SectionFallback />}>
            <CustomToolsSection />
          </Suspense>
        </section>

        {/* Security Section - ID: security */}
        <section id="security">
          <Suspense fallback={<SectionFallback />}>
            <SecuritySection />
          </Suspense>
        </section>

        {/* Testimonials - ID: testimonials */}
        <section id="testimonials">
          <Suspense fallback={<SectionFallback />}>
            <TestimonialsSection />
          </Suspense>
        </section>


        {/* Services Section - ID: services */}
        <section id="services">
          <Suspense fallback={<SectionFallback />}>
            <ServicesSection />
          </Suspense>
        </section>

        {/* About Section - ID: about */}
        <section id="about">
          <Suspense fallback={<SectionFallback />}>
            <AboutSection />
          </Suspense>
        </section>

        {/* CTA Section - ID: automation */}
        <section id="automation">
          <Suspense fallback={<SectionFallback />}>
            <AutomationPage />
          </Suspense>
        </section>


                {/* CTA Section - ID: cloud */}
        <section id="cloud">
          <Suspense fallback={<SectionFallback />}>
            <CloudPage />
          </Suspense>
        </section>


      {/* CTA Section - ID: managed-it */}
        <section id="managed-it">
          <Suspense fallback={<SectionFallback />}>
            <ManagedITPage />
          </Suspense>
        </section>



      {/* CTA Section - ID: cta */}
        <section id="cta">
          <Suspense fallback={<SectionFallback />}>
            <CTASection />
          </Suspense>
        </section>

        {/* Contact Section - ID: contact */}
        <section id="contact">
          <Suspense fallback={<SectionFallback />}>
            <ContactSection />
          </Suspense>
        </section>

        {/* Chat Widget */}
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      </main>
    </div>
  );
}






// // src/pages/Home.jsx
// import React, { Suspense, lazy } from 'react';
// import Navbar from '../components/navbar/Navbar';
// import HeroSection from '../components/hero/HeroSection';

// // Lazy load components from their actual locations
// const ServicesSection = lazy(() => import('../components/services/ServicesSection'));
// const MonitoringDashboard = lazy(() => import('../components/monitoring/MonitoringDashboard'));
// const CustomToolsSection = lazy(() => import('../components/tools/CustomToolsSection'));
// const SecuritySection = lazy(() => import('../components/security/SecuritySection'));
// const TestimonialsSection = lazy(() => import('../components/testimonials/TestimonialsSection'));
// const AboutSection = lazy(() => import('../components/about/AboutSection'));
// const CTASection = lazy(() => import('../components/cta/CTASection'));
// const ContactSection = lazy(() => import('../components/contact/ContactSection'));
// const Footer = lazy(() => import('../components/footer/Footer'));
// const ChatWidget = lazy(() => import('../components/chat/ChatWidget'));

// // Loading fallback
// const SectionFallback = () => (
//   <div className="w-full py-20 lg:py-32 bg-slate-900/30 animate-pulse">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="h-12 bg-slate-800/60 rounded-xl w-3/4 max-w-lg mx-auto mb-8" />
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {[...Array(3)].map((_, i) => (
//           <div key={i} className="h-72 bg-slate-800/60 rounded-2xl" />
//         ))}
//       </div>
//     </div>
//   </div>
// );

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
//       {/* Accessibility skip link */}
//       <a 
//         href="#main-content" 
//         className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
//       >
//         Skip to main content
//       </a>

//       <Navbar />

//       <main id="main-content">
//         {/* Hero Section - Always visible */}
//         <HeroSection />

//         {/* Services Section - ID: services */}
//         <section id="services">
//           <Suspense fallback={<SectionFallback />}>
//             <ServicesSection />
//           </Suspense>
//         </section>

//         {/* Monitoring Dashboard - ID: monitoring */}
//         <section id="monitoring">
//           <Suspense fallback={<SectionFallback />}>
//             <MonitoringDashboard />
//           </Suspense>
//         </section>

//         {/* Custom Tools - ID: tools */}
//         <section id="tools">
//           <Suspense fallback={<SectionFallback />}>
//             <CustomToolsSection />
//           </Suspense>
//         </section>

//         {/* Security Section - ID: security */}
//         <section id="security">
//           <Suspense fallback={<SectionFallback />}>
//             <SecuritySection />
//           </Suspense>
//         </section>

//         {/* Testimonials - ID: testimonials */}
//         <section id="testimonials">
//           <Suspense fallback={<SectionFallback />}>
//             <TestimonialsSection />
//           </Suspense>
//         </section>

//         {/* About Section - ID: about */}
//         <section id="about">
//           <Suspense fallback={<SectionFallback />}>
//             <AboutSection />
//           </Suspense>
//         </section>

//         {/* CTA Section - ID: cta */}
//         <section id="cta">
//           <Suspense fallback={<SectionFallback />}>
//             <CTASection />
//           </Suspense>
//         </section>

//         {/* Contact Section - ID: contact */}
//         <section id="contact">
//           <Suspense fallback={<SectionFallback />}>
//             <ContactSection />
//           </Suspense>
//         </section>

//         {/* Chat Widget */}
//         <Suspense fallback={null}>
//           <ChatWidget />
//         </Suspense>
//       </main>
//     </div>
//   );
// }



// // src/pages/Home.jsx

// import React, { Suspense, lazy } from 'react';
// import Navbar from '../components/navbar/Navbar';
// import HeroSection from '../components/hero/HeroSection';

// // Lazy load heavy components
// const ServicesSection = lazy(() => import('../components/services/ServicesSection'));
// const MonitoringDashboard = lazy(() => import('../components/monitoring/MonitoringDashboard'));
// const CustomToolsSection = lazy(() => import('../components/tools/CustomToolsSection'));
// const SecuritySection = lazy(() => import('../components/security/SecuritySection'));
// const TestimonialsSection = lazy(() => import('../components/testimonials/TestimonialsSection'));
// const AboutSection = lazy(() => import('../components/about/AboutSection'));
// const CTASection = lazy(() => import('../components/cta/CTASection'));
// const ContactSection = lazy(() => import('../components/contact/ContactSection'));
// const Footer = lazy(() => import('../components/footer/Footer'));
// const ChatWidget = lazy(() => import('../components/chat/ChatWidget'));

// // Beautiful skeleton fallback
// const SectionFallback = () => (
//   <div className="w-full py-20 lg:py-32 bg-slate-900/30 animate-pulse">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="h-12 bg-slate-800/60 rounded-xl w-3/4 max-w-lg mx-auto mb-8" />
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {[...Array(3)].map((_, i) => (
//           <div key={i} className="h-72 bg-slate-800/60 rounded-2xl" />
//         ))}
//       </div>
//     </div>
//   </div>
// );

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
//       {/* Accessibility skip link */}
//       <a href="#main-content" className="skip-link sr-only focus:not-sr-only">
//         Skip to main content
//       </a>

//       <Navbar />

//       <main id="main-content" className="pb-32 lg:pb-40">
//         {/* Hero - Eager loaded */}
//         <div id="hero">
//           <HeroSection />
//         </div>

//         {/* Services Section */}
//         <div id="services">
//           <Suspense fallback={<SectionFallback />}>
//             <ServicesSection />
//           </Suspense>
//         </div>

//         {/* Monitoring Dashboard */}
//         <div id="monitoring">
//           <Suspense fallback={<SectionFallback />}>
//             <MonitoringDashboard />
//           </Suspense>
//         </div>

//         {/* Custom Tools */}
//         <div id="tools">
//           <Suspense fallback={<SectionFallback />}>
//             <CustomToolsSection />
//           </Suspense>
//         </div>

//         {/* Security */}
//         <div id="security">
//           <Suspense fallback={<SectionFallback />}>
//             <SecuritySection />
//           </Suspense>
//         </div>

//         {/* Testimonials */}
//         <div id="testimonials">
//           <Suspense fallback={<SectionFallback />}>
//             <TestimonialsSection />
//           </Suspense>
//         </div>

//         {/* About */}
//         <div id="about">
//           <Suspense fallback={<SectionFallback />}>
//             <AboutSection />
//           </Suspense>
//         </div>

//         {/* CTA */}
//         <div id="cta">
//           <Suspense fallback={<SectionFallback />}>
//             <CTASection />
//           </Suspense>
//         </div>

//         {/* Contact */}
//         <div id="contact">
//           <Suspense fallback={<SectionFallback />}>
//             <ContactSection />
//           </Suspense>
//         </div>

//         {/* Footer */}
//         <Suspense fallback={null}>
//           <Footer />
//         </Suspense>

//         {/* Chat Widget */}
//         <Suspense fallback={null}>
//           <ChatWidget />
//         </Suspense>
//       </main>
//     </div>
//   );
// }



// // src/pages/Home.jsx
// import React, { Suspense, lazy } from 'react';
// import HeroSection from '../components/hero/HeroSection';

// // Lazy load heavy components
// const ServicesSection = lazy(() => import('../components/services/ServicesSection'));
// const MonitoringDashboard = lazy(() => import('../components/monitoring/MonitoringDashboard'));
// const CustomToolsSection = lazy(() => import('../components/tools/CustomToolsSection'));
// const SecuritySection = lazy(() => import('../components/security/SecuritySection'));
// const TestimonialsSection = lazy(() => import('../components/testimonials/TestimonialsSection'));
// const AboutSection = lazy(() => import('../components/about/AboutSection'));
// const CTASection = lazy(() => import('../components/cta/CTASection'));
// const ContactSection = lazy(() => import('../components/contact/ContactSection'));
// const ChatWidget = lazy(() => import('../components/chat/ChatWidget'));

// // Beautiful skeleton fallback
// const SectionFallback = () => (
//   <div className="w-full py-20 lg:py-32 bg-slate-900/30 animate-pulse">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="h-12 bg-slate-800/60 rounded-xl w-3/4 max-w-lg mx-auto mb-8" />
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {[...Array(3)].map((_, i) => (
//           <div key={i} className="h-72 bg-slate-800/60 rounded-2xl" />
//         ))}
//       </div>
//     </div>
//   </div>
// );

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
//       {/* Accessibility skip link */}
//       <a href="#main-content" className="skip-link sr-only focus:not-sr-only">
//         Skip to main content
//       </a>

//       <main id="main-content" className="pb-32 lg:pb-40">
//         {/* Hero - Eager loaded */}
//         <HeroSection />

//         {/* Lazy sections with individual Suspense */}
//         <Suspense fallback={<SectionFallback />}>
//           <ServicesSection />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <MonitoringDashboard />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <CustomToolsSection />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <SecuritySection />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <TestimonialsSection />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <AboutSection />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <CTASection />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <ContactSection />
//         </Suspense>

//         {/* Chat Widget */}
//         <Suspense fallback={null}>
//           <ChatWidget />
//         </Suspense>
//       </main>
//     </div>
//   );
// }



// // src/pages/Home.jsx
// import React, { Suspense, lazy } from 'react';
// import Navbar from '../components/navbar/Navbar';
// import HeroSection from '../components/hero/HeroSection';

// // Lazy load heavy components
// const ServicesSection = lazy(() => import('../components/services/ServicesSection'));
// const MonitoringDashboard = lazy(() => import('../components/monitoring/MonitoringDashboard'));
// const CustomToolsSection = lazy(() => import('../components/tools/CustomToolsSection'));
// const SecuritySection = lazy(() => import('../components/security/SecuritySection'));
// const TestimonialsSection = lazy(() => import('../components/testimonials/TestimonialsSection'));
// const AboutSection = lazy(() => import('../components/about/AboutSection'));
// const CTASection = lazy(() => import('../components/cta/CTASection'));
// const ContactSection = lazy(() => import('../components/contact/ContactSection'));
// const Footer = lazy(() => import('../components/footer/Footer'));
// const ChatWidget = lazy(() => import('../components/chat/ChatWidget'));

// // Beautiful skeleton fallback
// const SectionFallback = () => (
//   <div className="w-full py-20 lg:py-32 bg-slate-900/30 animate-pulse">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="h-12 bg-slate-800/60 rounded-xl w-3/4 max-w-lg mx-auto mb-8" />
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {[...Array(3)].map((_, i) => (
//           <div key={i} className="h-72 bg-slate-800/60 rounded-2xl" />
//         ))}
//       </div>
//     </div>
//   </div>
// );

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
//       {/* Accessibility skip link */}
//       <a href="#main-content" className="skip-link sr-only focus:not-sr-only">
//         Skip to main content
//       </a>

//       <Navbar />

//       <main id="main-content" className="pb-32 lg:pb-40"> {/* Extra padding for chat widget */}
//         {/* Hero - Eager loaded */}
//         <HeroSection />

//         {/* Lazy sections with individual Suspense */}
//         <Suspense fallback={<SectionFallback />}>
//           <ServicesSection id="services" />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <MonitoringDashboard id="monitoring" />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <CustomToolsSection id="tools" />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <SecuritySection id="security" />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <TestimonialsSection id="testimonials" />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <AboutSection id="about" />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <CTASection id="cta" />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <ContactSection id="contact" />
//         </Suspense>

//         {/* Footer */}
//         <Suspense fallback={null}>
//           <Footer />
//         </Suspense>

//         {/* Chat Widget */}
//         <Suspense fallback={null}>
//           <ChatWidget />
//         </Suspense>
//       </main>
//     </div>
//   );
// }



// // src/pages/Home.jsx
// import React, { Suspense, lazy } from 'react';
// import Navbar from '../components/navbar/Navbar';
// import HeroSection from '../components/hero/HeroSection';

// // Lazy load ALL heavy components (not loaded until needed)
// const ServicesSection = lazy(() => import('../components/services/ServicesSection'));
// const MonitoringDashboard = lazy(() => import('../components/monitoring/MonitoringDashboard'));
// const CustomToolsSection = lazy(() => import('../components/tools/CustomToolsSection'));
// const SecuritySection = lazy(() => import('../components/security/SecuritySection'));
// const TestimonialsSection = lazy(() => import('../components/testimonials/TestimonialsSection'));
// const AboutSection = lazy(() => import('../components/about/AboutSection'));
// const CTASection = lazy(() => import('../components/cta/CTASection'));
// const ContactSection = lazy(() => import('../components/contact/ContactSection'));
// const Footer = lazy(() => import('../components/footer/Footer'));
// const ChatWidget = lazy(() => import('../components/chat/ChatWidget'));

// // Minimal loading fallback to prevent layout shift
// const SectionFallback = () => (
//   <div className="w-full min-h-[400px] flex items-center justify-center">
//     <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//   </div>
// );

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
//       {/* Skip to main content for accessibility */}
//       <a href="#main-content" className="skip-link">
//         Skip to main content
//       </a>

//       <Navbar />

//       <main id="main-content">
//         {/* Load hero immediately (above the fold) */}
//         <HeroSection />

//         {/* Lazy load everything below the fold with individual Suspense boundaries */}
//         <Suspense fallback={<SectionFallback />}>
//           <ServicesSection />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <MonitoringDashboard />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <CustomToolsSection />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <SecuritySection />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <TestimonialsSection />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <AboutSection />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <CTASection />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <ContactSection />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <Footer />
//         </Suspense>

//         {/* Chat widget loads last, minimal fallback */}
//         <Suspense fallback={null}>
//           <ChatWidget />
//         </Suspense>
//       </main>
//     </div>
//   );
// }




// // src/pages/Home.jsx
// import React, { Suspense, lazy } from 'react';
// import Navbar from '../components/navbar/Navbar';
// import HeroSection from '../components/hero/HeroSection';

// // Lazy load heavy components
// const ServicesSection = lazy(() => import('../components/services/ServicesSection'));
// const MonitoringDashboard = lazy(() => import('../components/monitoring/MonitoringDashboard'));
// const CustomToolsSection = lazy(() => import('../components/tools/CustomToolsSection'));
// const SecuritySection = lazy(() => import('../components/security/SecuritySection'));
// const TestimonialsSection = lazy(() => import('../components/testimonials/TestimonialsSection'));
// const AboutSection = lazy(() => import('../components/about/AboutSection'));
// const ServiceAreasSection = lazy(() => import('../components/areas/ServiceAreasSection'));
// const CTASection = lazy(() => import('../components/cta/CTASection'));
// const ContactSection = lazy(() => import('../components/contact/ContactSection'));
// const Footer = lazy(() => import('../components/footer/Footer'));
// const ChatWidget = lazy(() => import('../components/chat/ChatWidget'));

// // Loading skeleton that matches content height
// const SectionFallback = () => (
//   <div className="w-full py-20 bg-slate-900/50 animate-pulse">
//     <div className="max-w-7xl mx-auto px-4">
//       <div className="h-8 bg-slate-800 rounded w-1/3 mx-auto mb-4"></div>
//       <div className="h-4 bg-slate-800 rounded w-1/2 mx-auto"></div>
//     </div>
//   </div>
// );

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
//       <Navbar />

//       <main>
//         <HeroSection />

//         <Suspense fallback={<SectionFallback />}>
//           <ServicesSection />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <MonitoringDashboard />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <CustomToolsSection />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <SecuritySection />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <TestimonialsSection />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <AboutSection />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <ServiceAreasSection />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <CTASection />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <ContactSection />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <Footer />
//         </Suspense>

//         <Suspense fallback={null}>
//           <ChatWidget />
//         </Suspense>
//       </main>
//     </div>
//   );
// }



// // src/pages/Home.jsx
// import React from 'react';
// import Navbar from '../components/navbar/Navbar';
// import HeroSection from '../components/hero/HeroSection';
// import ServicesSection from '../components/services/ServicesSection';
// import MonitoringDashboard from '../components/monitoring/MonitoringDashboard';
// import CustomToolsSection from '../components/tools/CustomToolsSection';
// import SecuritySection from '../components/security/SecuritySection';
// import TestimonialsSection from '../components/testimonials/TestimonialsSection';
// import AboutSection from '../components/about/AboutSection';
// import ServiceAreasSection from '../components/areas/ServiceAreasSection';
// import CTASection from '../components/cta/CTASection';
// import ContactSection from '../components/contact/ContactSection';
// import Footer from '../components/footer/Footer';
// import ChatWidget from '../components/chat/ChatWidget';

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
//       <Navbar />

//       <main>
//         <HeroSection />
//         <ServicesSection />
//         <MonitoringDashboard />
//         <CustomToolsSection />
//         <SecuritySection />
//         <TestimonialsSection />
//         <AboutSection />
//         <ServiceAreasSection />
//         <CTASection />
//         <ContactSection />
//         <Footer />
//         <ChatWidget />
//       </main>
//     </div>
//   );
// }



// import React from 'react';
// import Navbar from '../components/navbar/Navbar';
// import HeroSection from '../components/hero/HeroSection';
// import ServicesSection from '../components/services/ServicesSection';
// import CustomToolsSection from '../components/tools/CustomToolsSection';
// import SecuritySection from '../components/security/SecuritySection';
// import MonitoringDashboard from '../components/monitoring/MonitoringDashboard';
// import AboutSection from '../components/about/AboutSection';
// import ServiceAreasSection from '../components/areas/ServiceAreasSection';
// import TestimonialsSection from '../components/testimonials/TestimonialsSection';
// import CTASection from '../components/cta/CTASection';
// import ContactSection from '../components/contact/ContactSection';
// import Footer from '../components/footer/Footer';
// import ChatWidget from '../components/chat/ChatWidget';

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
//       <Navbar />
//       <HeroSection />
//       <ServicesSection />
//       <MonitoringDashboard />
//       <CustomToolsSection />
//       <SecuritySection />
//       <TestimonialsSection />
//       <AboutSection />
//       <ServiceAreasSection />
//       <CTASection />
//       <ContactSection />
//       <Footer />
//       <ChatWidget />
//     </div>
//   );
// }



// import React from 'react';
// import Navbar from '../components/navbar/Navbar';
// import HeroSection from '../components/hero/HeroSection';
// import ServicesSection from '../components/services/ServicesSection';
// import CustomToolsSection from '../components/tools/CustomToolsSection';
// import SecuritySection from '../components/security/SecuritySection';
// import MonitoringDashboard from '../components/monitoring/MonitoringDashboard';
// import AboutSection from '../components/about/AboutSection';
// import ServiceAreasSection from '../components/areas/ServiceAreasSection';
// import TestimonialsSection from '../components/testimonials/TestimonialsSection';
// import CTASection from '../components/cta/CTASection';
// import ContactSection from '../components/contact/ContactSection';
// import Footer from '../components/footer/Footer';
// import ChatWidget from '../components/chat/ChatWidget';

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
//       <Navbar />
//       <HeroSection />
//       <ServicesSection />
//       <MonitoringDashboard />
//       <CustomToolsSection />
//       <SecuritySection />
//       <TestimonialsSection />
//       <AboutSection />
//       <ServiceAreasSection />
//       <CTASection />
//       <ContactSection />
//       <Footer />
//       <ChatWidget />
//     </div>
//   );
// }




// // // src/pages/Home.jsx
// // import React, { Suspense, lazy } from 'react';

// // // Eager-loaded components (lightweight / above-the-fold)
// // import Navbar from '../components/navbar/Navbar';
// // import HeroSection from '../components/hero/HeroSection';
// // import Footer from '../components/footer/Footer';
// // import ChatWidget from '../components/chat/ChatWidget';

// // // Lazy-loaded heavier sections
// // const ServicesSection = lazy(() => import('../components/services/ServicesSection'));
// // const MonitoringDashboard = lazy(() => import('../components/monitoring/MonitoringDashboard'));
// // const CustomToolsSection = lazy(() => import('../components/tools/CustomToolsSection'));
// // const SecuritySection = lazy(() => import('../components/security/SecuritySection'));
// // const TestimonialsSection = lazy(() => import('../components/testimonials/TestimonialsSection'));
// // const AboutSection = lazy(() => import('../components/about/AboutSection'));
// // const ServiceAreasSection = lazy(() => import('../components/areas/ServiceAreasSection'));
// // const CTASection = lazy(() => import('../components/cta/CTASection'));
// // const ContactSection = lazy(() => import('../components/contact/ContactSection'));

// // const SectionLoader = () => (
// //   <div className="py-24 lg:py-32">
// //     <div className="max-w-7xl mx-auto px-6 text-center">
// //       <div className="animate-pulse">
// //         <div className="h-8 bg-slate-800 rounded w-64 mx-auto mb-4"></div>
// //         <div className="h-4 bg-slate-800 rounded w-96 mx-auto"></div>
// //       </div>
// //     </div>
// //   </div>
// // );

// // export default function Home() {
// //   return (
// //     <>
// //       {/* Native React 19 metadata tags – automatically moved to <head> */}
// //       <title>Shakil IT Solutions | Managed IT Services for Victorian SMBs</title>
// //       <meta
// //         name="description"
// //         content="Enterprise-grade IT support, cybersecurity, and 24/7 monitoring tailored for small and medium businesses in Victoria. 99.9% uptime guaranteed."
// //       />
// //       <link rel="canonical" href="https://www.shakilitsolutions.com.au/" />
// //       {/* Optional Open Graph for better social sharing */}
// //       <meta property="og:title" content="Shakil IT Solutions | Stop Fighting I.T." />
// //       <meta property="og:description" content="Proactive IT solutions for Victorian businesses." />
// //       <meta property="og:image" content="https://www.shakilitsolutions.com.au/og-image.jpg" /> {/* Add an image to public/ */}
// //       <meta property="og:url" content="https://www.shakilitsolutions.com.au/" />
// //       <meta property="og:type" content="website" />

// //       <div className="flex flex-col min-h-screen bg-background text-text overflow-x-hidden">
// //         <Navbar />

// //         <main className="flex-1">
// //           <HeroSection id="home" />

// //           <Suspense fallback={<SectionLoader />}>
// //             <ServicesSection id="services" />
// //             <MonitoringDashboard id="monitoring" />
// //             <CustomToolsSection id="tools" />
// //             <SecuritySection id="security" />
// //             <TestimonialsSection id="testimonials" />
// //             <AboutSection id="about" />
// //             <ServiceAreasSection id="areas" />
// //             <CTASection id="cta" />
// //             <ContactSection id="contact" />
// //           </Suspense>
// //         </main>

// //         <Footer />
// //         <ChatWidget />
// //       </div>
// //     </>
// //   );
// // }


// // // src/pages/Home.jsx (or src/App.jsx if it's your root)
// // import React, { Suspense, lazy } from 'react';
// // import { Helmet } from 'react-helmet-async'; // Optional but recommended for SEO

// // // Eager-loaded: Lightweight, above-the-fold components
// // import Navbar from '../components/navbar/Navbar';
// // import HeroSection from '../components/hero/HeroSection';
// // import Footer from '../components/footer/Footer';
// // import ChatWidget from '../components/chat/ChatWidget';

// // // Lazy-loaded: Heavier sections below the fold (code-split for faster initial load)
// // const ServicesSection = lazy(() => import('../components/services/ServicesSection'));
// // const MonitoringDashboard = lazy(() => import('../components/monitoring/MonitoringDashboard'));
// // const CustomToolsSection = lazy(() => import('../components/tools/CustomToolsSection'));
// // const SecuritySection = lazy(() => import('../components/security/SecuritySection'));
// // const TestimonialsSection = lazy(() => import('../components/testimonials/TestimonialsSection'));
// // const AboutSection = lazy(() => import('../components/about/AboutSection'));
// // const ServiceAreasSection = lazy(() => import('../components/areas/ServiceAreasSection'));
// // const CTASection = lazy(() => import('../components/cta/CTASection'));
// // const ContactSection = lazy(() => import('../components/contact/ContactSection'));

// // // Loading fallback component (you can customize this further with skeletons)
// // const SectionLoader = () => (
// //   <div className="py-24 lg:py-32">
// //     <div className="max-w-7xl mx-auto px-6 text-center">
// //       <div className="animate-pulse">
// //         <div className="h-8 bg-slate-800 rounded w-64 mx-auto mb-4"></div>
// //         <div className="h-4 bg-slate-800 rounded w-96 mx-auto"></div>
// //       </div>
// //     </div>
// //   </div>
// // );

// // export default function Home() {
// //   return (
// //     <>
// //       {/* SEO & Metadata - Highly recommended for production */}
// //       <Helmet>
// //         <title>Shakil IT Solutions | Managed IT Services for Victorian SMBs</title>
// //         <meta
// //           name="description"
// //           content="Enterprise-grade IT support, cybersecurity, and 24/7 monitoring tailored for small and medium businesses in Victoria. 99.9% uptime guaranteed."
// //         />
// //         <link rel="canonical" href="https://www.shakilitsolutions.com.au/" />
// //       </Helmet>

// //       {/* Main layout with flex column to push footer down on short screens */}
// //       <div className="flex flex-col min-h-screen bg-background text-text overflow-x-hidden">
// //         {/* Navbar - fixed or sticky depending on your design */}
// //         <Navbar />

// //         {/* Main content - grows to fill space */}
// //         <main className="flex-1">
// //           {/* Hero: Critical above-the-fold content - eager loaded */}
// //           <HeroSection id="home" />

// //           {/* All other sections: Lazy loaded with smooth fallback */}
// //           <Suspense fallback={<SectionLoader />}>
// //             <ServicesSection id="services" />
// //             <MonitoringDashboard id="monitoring" />
// //             <CustomToolsSection id="tools" />
// //             <SecuritySection id="security" />
// //             <TestimonialsSection id="testimonials" />
// //             <AboutSection id="about" />
// //             <ServiceAreasSection id="areas" />
// //             <CTASection id="cta" />
// //             <ContactSection id="contact" />
// //           </Suspense>
// //         </main>

// //         {/* Footer & Chat Widget - always at bottom */}
// //         <Footer />
// //         <ChatWidget />
// //       </div>
// //     </>
// //   );
// // }