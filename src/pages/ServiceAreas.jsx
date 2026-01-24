// src/pages/ServiceAreas.jsx
import React from 'react';
import ServiceAreasSection from '../components/areas/ServiceAreasSection';

export default function ServiceAreas() {
  return (
    <div className="pt-12 pb-20 bg-gradient-to-b from-slate-950 to-slate-900 min-h-screen">
      {/* Only this single instance of the section */}
      <ServiceAreasSection />
    </div>
  );
}