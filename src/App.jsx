// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './Layout';

const HomePage        = lazy(() => import('./pages/Home'));
const SecurityPage    = lazy(() => import('./components/security/SecuritySection'));
const AreasPage       = lazy(() => import('./components/areas/ServiceAreasSection'));
const ContactPage     = lazy(() => import('./components/contact/ContactSection'));
const ManagedIT       = lazy(() => import('./pages/ManagedIT'));
const CloudSolutions  = lazy(() => import('./pages/Cloud'));
const Automation      = lazy(() => import('./pages/Automation'));

const CaseStudies     = lazy(() => import('./pages/CaseStudies'));
const ITHealthCheck   = lazy(() => import('./pages/ITHealthCheck'));
const AboutSyncline     = lazy(() => import('./pages/AboutSyncline'));
const CustomerPortal  = lazy(() => import('./pages/CustomerPortal'));

import MonitoringDashboard from './components/monitoring/MonitoringDashboard';

const PageLoader = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          
          {/* Main Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/areas" element={<AreasPage />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="/managed-it" element={<ManagedIT />} />
          <Route path="/cloud" element={<CloudSolutions />} />
          <Route path="/automation" element={<Automation />} />

          {/* Resources */}
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/it-health-check" element={<ITHealthCheck />} />
          <Route path="/about-Syncline" element={<AboutSyncline />} />
          <Route path="/customer-portal" element={<CustomerPortal />} />

          {/* ⭐ NEW: Monitoring Dashboard */}
          <Route path="/monitoring-dashboard" element={<MonitoringDashboard />} />

          {/* Fallback */}
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

