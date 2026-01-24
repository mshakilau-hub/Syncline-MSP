import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Users,
  Shield,
  Wifi,
  Navigation,
  ArrowRight
} from 'lucide-react';

// Mock GlassCard component
const GlassCard = ({ children, className = '' }) => (
  <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl ${className}`}>
    {children}
  </div>
);

// Lazy load map for performance
const MapComponent = React.lazy(() => import('./MapComponent'));

const ServiceAreasSection = () => {
  const [activeCity, setActiveCity] = useState(null);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const sectionRef = useRef(null);

  // Memoize cities data
  const cities = useMemo(() => [
    {
      id: 'melbourne',
      name: 'Melbourne',
      coords: [-37.8136, 144.9631],
      response: 'Same-day onsite',
      responseTime: '< 2 hours',
      description: 'Full coverage across greater Melbourne metro area',
      coverage: ['CBD', 'Inner Suburbs', 'Eastern Suburbs', 'Western Suburbs', 'Northern Suburbs', 'Bayside'],
      color: '#3b82f6',
      clients: 85,
      services: ['24/7 Monitoring', 'Same-day Onsite', 'Emergency Support', 'Cloud Solutions'],
      isHighlight: true
    },
    {
      id: 'geelong',
      name: 'Geelong',
      coords: [-38.1499, 144.3617],
      response: 'Same/Next-day',
      responseTime: '< 4 hours',
      description: 'Supporting businesses along the surf coast',
      coverage: ['Geelong CBD', 'Bellarine Peninsula', 'Surf Coast', 'Golden Plains'],
      color: '#10b981',
      clients: 32,
      services: ['24/7 Monitoring', 'Next-day Onsite', 'Remote Support', 'Security Services'],
      isHighlight: true
    },
    {
      id: 'ballarat',
      name: 'Ballarat',
      coords: [-37.5622, 143.8503],
      response: '24-48 hours',
      responseTime: '< 24 hours',
      description: 'Reliable IT support for regional goldfields',
      coverage: ['Ballarat', 'Daylesford', 'Creswick', 'Ararat', 'Skipton'],
      color: '#a855f7',
      clients: 18,
      services: ['24/7 Monitoring', 'Scheduled Visits', 'Remote Priority', 'Cloud Backup'],
      isHighlight: true
    },
    {
      id: 'bendigo',
      name: 'Bendigo',
      coords: [-36.7570, 144.2794],
      response: '24-72 hours',
      responseTime: '< 48 hours',
      description: 'Enterprise IT in central Victoria',
      coverage: ['Bendigo', 'Castlemaine', 'Echuca', 'Shepparton'],
      color: '#f59e0b',
      clients: 15,
      services: ['24/7 Monitoring', 'Bi-weekly Visits', 'Remote Support', 'Network Management'],
      isHighlight: true
    },
    {
      id: 'warrnambool',
      name: 'Warrnambool',
      coords: [-38.3815, 142.4860],
      response: '48-72 hours',
      responseTime: '< 72 hours',
      description: 'Regional support for south-west Victoria',
      coverage: ['Warrnambool', 'Port Fairy', 'Portland'],
      color: '#06b6d4',
      clients: 8,
      services: ['Remote Support', 'Monthly Visits', 'Cloud Solutions'],
      isHighlight: false
    },
    {
      id: 'mildura',
      name: 'Mildura',
      coords: [-34.1889, 142.1583],
      response: 'Remote priority',
      responseTime: '< 4 hours (remote)',
      description: 'Remote-first support for northern Victoria',
      coverage: ['Mildura', 'Swan Hill', 'Ouyen'],
      color: '#ec4899',
      clients: 5,
      services: ['Remote Support', 'Quarterly Visits', 'Cloud-First'],
      isHighlight: false
    }
  ], []);

  const handleCitySelect = useCallback((city) => {
    setActiveCity(city);
  }, []);

  const handleLoadMap = useCallback(() => {
    setShouldLoadMap(true);
  }, []);

  // Intersection Observer for lazy loading map
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shouldLoadMap) {
          setShouldLoadMap(true);
        }
      },
      { rootMargin: '200px 0px', threshold: 0.01 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [shouldLoadMap]);

  const serviceItems = useMemo(() => {
    if (!activeCity) return [];
    return [
      { icon: Shield, text: activeCity.services[0] || 'Enterprise Security', color: 'text-blue-400' },
      { icon: MapPin, text: activeCity.services[1] || 'Full Coverage', color: 'text-green-400' },
      { icon: Wifi, text: activeCity.services[2] || '24/7 Remote', color: 'text-purple-400' },
      { icon: Navigation, text: activeCity.services[3] || 'Priority Support', color: 'text-amber-400' }
    ];
  }, [activeCity]);

  return (
    <section 
      id="areas" 
      ref={sectionRef}
      className="relative py-20 sm:py-30 sm:py-28 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full h-1/2 bg-gradient-to-t from-blue-600/5 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-4">
            Interactive Service Coverage
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
            Local IT Support for{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              All of Victoria
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Click any location on the map to see detailed coverage, response times, and services available.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          <nav className="space-y-2 lg:sticky lg:top-24 max-h-[500px] overflow-y-auto lg:order-1">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">
              Select Location
            </h3>
            {cities.map((city) => (
              <button
                key={city.id}
                onClick={() => handleCitySelect(city)}
                className={`w-full text-left p-4 rounded-xl transition-colors duration-150 ${
                  activeCity?.id === city.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg'
                    : 'bg-white/5 border border-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <span 
                    className="w-3 h-3 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: city.color }}
                  />
                  <span className={`font-bold text-sm sm:text-base ${activeCity?.id === city.id ? 'text-white' : 'text-slate-200'}`}>
                    {city.name}
                  </span>
                  {city.isHighlight && (
                    <span className="ml-auto text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full font-medium">
                      Priority
                    </span>
                  )}
                </div>
                <p className={`text-xs ${activeCity?.id === city.id ? 'text-white/80' : 'text-slate-400'}`}>
                  <Clock className="w-3 h-3 inline mr-1" />
                  {city.response}
                </p>
                <p className={`text-xs mt-0.5 ${activeCity?.id === city.id ? 'text-white/70' : 'text-slate-500'}`}>
                  <Users className="w-3 h-3 inline mr-1" />
                  {city.clients} businesses
                </p>
              </button>
            ))}
          </nav>

          <div className="lg:col-span-2 lg:order-2">
            <GlassCard className="overflow-hidden shadow-xl">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-lg overflow-hidden bg-slate-800">
                {shouldLoadMap ? (
                  <React.Suspense fallback={
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                      <div className="text-center">
                        <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <p className="text-slate-300 text-sm">Loading map...</p>
                      </div>
                    </div>
                  }>
                    <MapComponent 
                      cities={cities} 
                      activeCity={activeCity} 
                      setActiveCity={handleCitySelect} 
                    />
                  </React.Suspense>
                ) : (
                  <button 
                    onClick={handleLoadMap}
                    className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-800 hover:bg-slate-700/80 transition-colors"
                  >
                    <div className="text-center p-4">
                      <MapPin className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                      <p className="text-white font-semibold text-lg mb-1">Interactive Map</p>
                      <p className="text-slate-400 text-sm">Click to load coverage map</p>
                    </div>
                  </button>
                )}
              </div>

              {activeCity && (
                <div className="p-4 sm:p-6 border-t border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <span 
                        className="w-4 h-4 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: activeCity.color }}
                      />
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        {activeCity.name}
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {activeCity.response}
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 mb-4">{activeCity.description}</p>

                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Coverage Areas
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeCity.coverage.map((area, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-slate-300 text-xs"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {serviceItems.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
                        <item.icon className={`w-4 h-4 ${item.color} flex-shrink-0`} />
                        <span className="text-xs sm:text-sm text-slate-200 font-medium truncate">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </GlassCard>
          </div>
        </div>

        <div className="mt-10 sm:mt-14">
          <GlassCard className="p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="p-2.5 rounded-lg bg-blue-500/10 flex-shrink-0">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white mb-0.5">
                    Remote Support Australia-Wide
                  </h4>
                  <p className="text-sm text-slate-400">
                    Full remote support available to any location.
                  </p>
                </div>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-sm rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition-shadow"
              >
                Check Your Area
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreasSection;