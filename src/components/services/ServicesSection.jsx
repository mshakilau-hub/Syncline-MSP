import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, Circle, useMap } from 'react-leaflet';
// Fixed / best performance
import MapPin from '@lucide/map-pin';
import Clock from '@lucide/clock';
import Phone from '@lucide/phone';
import CheckCircle from '@lucide/check-circle';
import ArrowRight from '@lucide/arrow-right';
import Building2 from '@lucide/building-2';
import Navigation from '@lucide/navigation';
import Wifi from '@lucide/wifi';
import Users from '@lucide/users';
import Shield from '@lucide/shield';
import GlassCard from '../ui/GlassCard';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom marker creation function
const createCustomIcon = (color, isActive = false) => {
  const svgIcon = `
    <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
          <feOffset dx="0" dy="2" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path d="M20 0C11.716 0 5 6.716 5 15c0 8.284 15 35 15 35s15-26.716 15-35c0-8.284-6.716-15-15-15z" 
            fill="${color}" filter="url(#shadow)" stroke="white" stroke-width="${isActive ? '3' : '2'}"/>
      <circle cx="20" cy="15" r="6" fill="white" opacity="0.9"/>
      ${isActive ? '<circle cx="20" cy="15" r="4" fill="white"><animate attributeName="r" values="4;6;4" dur="1.5s" repeatCount="indefinite"/></circle>' : ''}
    </svg>
  `;
  return L.divIcon({
    html: svgIcon,
    className: 'custom-marker',
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50]
  });
};

// Map bounds controller
const MapBoundsController = ({ selectedCity }) => {
  const map = useMap();
  
  useEffect(() => {
    if (selectedCity) {
      map.flyTo(selectedCity.coords, 10, {
        duration: 1.5,
        easeLinearity: 0.5
      });
    }
  }, [selectedCity, map]);
  
  return null;
};

const ServiceAreasSection = () => {
  const [activeCity, setActiveCity] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const cities = [
  {
    id: 'melbourne',
    name: 'Melbourne',
    coords: [-37.8136, 144.9631],
    response: 'Prompt support',
    responseTime: 'Same-day for most issues',
    description: 'Helping small businesses across greater Melbourne with reliable IT support.',
    coverage: ['CBD', 'Inner Suburbs', 'Eastern Suburbs', 'Western Suburbs', 'Northern Suburbs', 'Bayside'],
    color: '#3b82f6',
    clients: null,
    services: ['Remote Support', 'Onsite Visits', 'Microsoft 365 Setup', 'Business Protection'],
    isHighlight: true
  },
  {
    id: 'geelong',
    name: 'Geelong',
    coords: [-38.1499, 144.3617],
    response: 'Same/next-day',
    responseTime: 'Varies by location',
    description: 'Supporting local businesses along the surf coast with practical IT help.',
    coverage: ['Geelong CBD', 'Bellarine Peninsula', 'Surf Coast', 'Golden Plains'],
    color: '#10b981',
    clients: null,
    services: ['Remote Support', 'Onsite Visits', 'Cloud Setup'],
    isHighlight: true
  },
  {
    id: 'ballarat',
    name: 'Ballarat',
    coords: [-37.5622, 143.8503],
    response: 'Scheduled visits',
    responseTime: 'Planned onsite availability',
    description: 'Reliable IT support for regional businesses in the goldfields.',
    coverage: ['Ballarat', 'Daylesford', 'Creswick', 'Ararat', 'Skipton'],
    color: '#a855f7',
    clients: null,
    services: ['Remote Support', 'Planned Onsite', 'Backup Setup'],
    isHighlight: true
  },
  {
    id: 'bendigo',
    name: 'Bendigo',
    coords: [-36.7570, 144.2794],
    response: 'Scheduled visits',
    responseTime: 'Planned onsite availability',
    description: 'Helping central Victorian businesses with practical IT solutions.',
    coverage: ['Bendigo', 'Castlemaine', 'Echuca', 'Shepparton'],
    color: '#f59e0b',
    clients: null,
    services: ['Remote Support', 'Planned Visits', 'Cloud Setup'],
    isHighlight: true
  },
  {
    id: 'warrnambool',
    name: 'Warrnambool',
    coords: [-38.3815, 142.4860],
    response: 'Remote-first',
    responseTime: 'Remote support available',
    description: 'Supporting south‑west Victoria with remote IT help and planned visits.',
    coverage: ['Warrnambool', 'Port Fairy', 'Portland'],
    color: '#06b6d4',
    clients: null,
    services: ['Remote Support', 'Planned Visits'],
    isHighlight: false
  },
  {
    id: 'mildura',
    name: 'Mildura',
    coords: [-34.1889, 142.1583],
    response: 'Remote-first',
    responseTime: 'Remote support available',
    description: 'Helping northern Victorian businesses with cloud and remote IT support.',
    coverage: ['Mildura', 'Swan Hill', 'Ouyen'],
    color: '#ec4899',
    clients: null,
    services: ['Remote Support', 'Cloud Setup'],
    isHighlight: false
  }
];


  return (
    <section id="areas" className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-full h-1/2 bg-gradient-to-t from-blue-600/5 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-4">
            Interactive Service Coverage
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6" id="areas-heading">
            Local IT Support for{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              All of Victoria
            </span>
          </h2>
          <p className="text-lg text-slate-400">
            Click any location on the map to see detailed coverage, response times, and services available in that area.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* City List - Scrollable on mobile */}
          <div className="space-y-3 lg:sticky lg:top-24 max-h-[600px] overflow-y-auto">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">
              Select Location
            </h3>
            {cities.map((city, i) => (
              <motion.button
                key={city.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setActiveCity(city)}
                className={`w-full text-left p-4 rounded-2xl transition-all duration-300 group ${
                  activeCity?.id === city.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg'
                    : 'bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: city.color }}
                  />
                  <h3 className={`font-bold ${activeCity?.id === city.id ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                    {city.name}
                  </h3>
                  {city.isHighlight && (
                    <span className="ml-auto text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">
                      Priority
                    </span>
                  )}
                </div>
                <p className={`text-xs ${activeCity?.id === city.id ? 'text-white/80' : 'text-slate-500 group-hover:text-slate-400'}`}>
                  <Clock className="w-3 h-3 inline mr-1" />
                  {city.response}
                </p>
                <p className={`text-xs mt-1 ${activeCity?.id === city.id ? 'text-white/70' : 'text-slate-600 group-hover:text-slate-500'}`}>
                  <Users className="w-3 h-3 inline mr-1" />
                  {city.clients} businesses protected
                </p>
              </motion.button>
            ))}
          </div>

          {/* Interactive Map - Fixed container to prevent overflow */}
          <div className="lg:col-span-2">
            <GlassCard className="overflow-hidden" gradient>
              {/* Map Container - Fixed height with proper containment */}
              <div className="relative h-[500px] lg:h-[600px] w-full rounded-xl overflow-hidden">
                <style>{`
                  .leaflet-container {
                    height: 100%;
                    width: 100%;
                    background: rgba(15, 23, 42, 0.5) !important;
                    border-radius: 1rem;
                  }
                  .leaflet-tile-pane {
                    opacity: 0.7;
                  }
                  .leaflet-popup-content-wrapper {
                    background: rgba(15, 23, 42, 0.95);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 1rem;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
                  }
                  .leaflet-popup-content {
                    margin: 0;
                    padding: 1rem;
                    color: white;
                    min-width: 200px;
                  }
                  .leaflet-popup-tip {
                    background: rgba(15, 23, 42, 0.95);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                  }
                  .custom-marker {
                    background: none;
                    border: none;
                  }
                  .leaflet-tooltip {
                    background: rgba(15, 23, 42, 0.95);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: white;
                    border-radius: 0.5rem;
                    padding: 0.5rem 0.75rem;
                    font-weight: 600;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
                  }
                  .leaflet-tooltip::before {
                    border-top-color: rgba(15, 23, 42, 0.95);
                  }
                  /* Prevent map from overflowing during scroll */
                  .leaflet-container {
                    position: relative !important;
                  }
                  .leaflet-pane {
                    z-index: 1 !important;
                  }
                  .leaflet-control-container {
                    position: absolute !important;
                  }
                `}</style>

                <MapContainer
                  center={[-37.4713, 144.7852]}
                  zoom={7}
                  scrollWheelZoom={true}
                  zoomControl={true}
                  style={{ height: '100%', width: '100%', position: 'relative', zIndex: 1 }}
                  maxBounds={[[-39.5, 140.5], [-33.5, 150.5]]}
                  minZoom={6}
                  maxZoom={12}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <MapBoundsController selectedCity={activeCity} />

                  {cities.map((city) => (
                    <React.Fragment key={city.id}>
                      {/* Coverage Circle */}
                      <Circle
                        center={city.coords}
                        radius={city.isHighlight ? 35000 : 25000}
                        pathOptions={{
                          fillColor: city.color,
                          fillOpacity: 0.15,
                          color: city.color,
                          weight: 2,
                          opacity: 0.6
                        }}
                      />

                      {/* City Marker */}
                      <Marker
                        position={city.coords}
                        icon={createCustomIcon(city.color, activeCity?.id === city.id)}
                        eventHandlers={{
                          click: () => setActiveCity(city),
                        }}
                      >
                        <Tooltip direction="top" offset={[0, -45]} permanent={city.isHighlight}>
                          {city.name}
                        </Tooltip>

                        <Popup>
                          <div className="p-2">
                            <div className="flex items-center gap-2 mb-3">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: city.color }}
                              />
                              <h3 className="font-bold text-lg">{city.name}</h3>
                            </div>
                            
                            <p className="text-sm text-slate-300 mb-3">{city.description}</p>
                            
                            <div className="space-y-2 mb-3">
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="w-4 h-4 text-green-400" />
                                <span className="text-slate-300">
                                  <span className="text-green-400 font-semibold">{city.responseTime}</span> response
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Users className="w-4 h-4 text-blue-400" />
                                <span className="text-slate-300">
                                  <span className="text-blue-400 font-semibold">{city.clients}</span> businesses protected
                                </span>
                              </div>
                            </div>

                            <div className="pt-3 border-t border-white/10">
                              <p className="text-xs text-slate-400 mb-2">Services Available:</p>
                              <div className="flex flex-wrap gap-1">
                                {city.services.map((service, i) => (
                                  <span key={i} className="text-xs px-2 py-1 bg-white/10 rounded-full text-slate-300">
                                    {service}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    </React.Fragment>
                  ))}
                </MapContainer>
              </div>

              {/* City Details Panel - Only shown when city is selected */}
              <AnimatePresence>
                {activeCity && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-6 border-t border-white/10"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: activeCity.color }}
                          />
                          <h3 className="text-2xl font-bold text-white">{activeCity.name}</h3>
                        </div>
                        <p className="text-slate-400">{activeCity.description}</p>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
                        <Clock className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-medium text-sm">{activeCity.response}</span>
                      </div>
                    </div>

                    {/* Coverage Areas */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                        Coverage Areas
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeCity.coverage.map((area, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-slate-300 text-sm"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: Shield, text: activeCity.services[0], color: 'text-blue-400' },
                        { icon: MapPin, text: activeCity.services[1], color: 'text-green-400' },
                        { icon: Wifi, text: activeCity.services[2], color: 'text-purple-400' },
                        { icon: Navigation, text: activeCity.services[3] || 'Full Support', color: 'text-amber-400' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                          <item.icon className={`w-5 h-5 ${item.color}`} />
                          <span className="text-slate-300 font-medium text-sm">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </div>
        </div>

        {/* Remote Support Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <GlassCard className="p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10">
                  <Phone className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Remote Support Available Australia-Wide</h4>
                  <p className="text-slate-400">Can't find your area? We provide full remote support to any location in Australia.</p>
                </div>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all whitespace-nowrap group"
              >
                Check Your Area
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceAreasSection;