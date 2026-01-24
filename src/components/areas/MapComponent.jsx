// src/components/areas/MapComponent.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, Tooltip, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import '@maplibre/maplibre-gl-leaflet';
import 'leaflet/dist/leaflet.css';
import 'maplibre-gl/dist/maplibre-gl.css';

// Lucide icons
import { Clock, Users } from 'lucide-react';

// Fix default Leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom SVG marker
const createCustomIcon = (color, isActive = false) => {
  const svg = `
    <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 0C11.716 0 5 6.716 5 15c0 8.284 15 35 15 35s15-26.716 15-35c0-8.284-6.716-15-15-15z"
            fill="${color}" stroke="white" stroke-width="${isActive ? '3' : '2'}"/>
      <circle cx="20" cy="15" r="6" fill="white" opacity="0.9"/>
      ${isActive ? '<circle cx="20" cy="15" r="5" fill="white"/>' : ''}
    </svg>
  `;

  return L.divIcon({
    html: svg,
    className: 'custom-marker',
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50],
  });
};

// Transform relative URLs to absolute
const transformStyleUrls = (style) => {
  const BASE = 'https://vector.openstreetmap.org';
  
  // Transform sources
  if (style.sources) {
    Object.keys(style.sources).forEach(key => {
      const source = style.sources[key];
      
      // Transform tiles array
      if (source.tiles) {
        source.tiles = source.tiles.map(url => 
          url.startsWith('/') ? BASE + url : url
        );
      }
      
      // Transform source url
      if (source.url && source.url.startsWith('/')) {
        source.url = BASE + source.url;
      }
    });
  }
  
  // Transform sprite (can be string or array)
  if (style.sprite) {
    if (typeof style.sprite === 'string' && style.sprite.startsWith('/')) {
      style.sprite = BASE + style.sprite;
    } else if (Array.isArray(style.sprite)) {
      style.sprite = style.sprite.map(s => {
        if (typeof s === 'string' && s.startsWith('/')) {
          return BASE + s;
        }
        if (s && s.url && s.url.startsWith('/')) {
          return { ...s, url: BASE + s.url };
        }
        return s;
      });
    }
  }
  
  // Transform glyphs
  if (style.glyphs && style.glyphs.startsWith('/')) {
    style.glyphs = BASE + style.glyphs;
  }
  
  return style;
};

// Vector tile layer component
const VectorTileLayer = () => {
  const map = useMap();
  const [styleLoaded, setStyleLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let gl = null;
    let mounted = true;

    const loadStyle = async () => {
      try {
        // Fetch the style JSON first
        const response = await fetch('https://vector.openstreetmap.org/demo/shortbread/eclipse.json');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch style: ${response.status}`);
        }
        
        const rawStyle = await response.json();
        
        // Transform all relative URLs to absolute
        const transformedStyle = transformStyleUrls(rawStyle);
        
        if (!mounted) return;
        
        // Now add the layer with the pre-transformed style
        gl = L.maplibreGL({
          style: transformedStyle,
          interactive: false,
        }).addTo(map);
        
        setStyleLoaded(true);
      } catch (err) {
        console.error('Error loading map style:', err);
        setError(err.message);
      }
    };

    loadStyle();

    return () => {
      mounted = false;
      if (gl && map) {
        try {
          map.removeLayer(gl);
        } catch (e) {
          // Layer might already be removed
        }
      }
    };
  }, [map]);

  if (error) {
    return null; // Silently fail - map will still work with markers
  }

  return null;
};

// Smooth fly-to when active city changes
const MapBoundsController = ({ selectedCity }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedCity?.coords) {
      map.flyTo(selectedCity.coords, 10, {
        duration: 1.5,
        easeLinearity: 0.5,
      });
    }
  }, [selectedCity, map]);

  return null;
};

const MapComponent = ({ cities, activeCity, setActiveCity }) => {
  return (
    <>
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
      `}</style>

      <MapContainer
        center={[-37.4713, 144.7852]}
        zoom={7}
        scrollWheelZoom={true}
        zoomControl={true}
        style={{ height: '100%', width: '100%', position: 'relative', zIndex: 1 }}
        maxBounds={[[-45, 140.5], [-33, 150.5]]}
        maxBoundsViscosity={1}
        minZoom={6}
        maxZoom={12}
        preferCanvas={true}
      >
        <VectorTileLayer />
        <MapBoundsController selectedCity={activeCity} />

        {cities.map((city) => (
          <React.Fragment key={city.id}>
            <Circle
              center={city.coords}
              radius={city.isHighlight ? 35000 : 25000}
              pathOptions={{
                fillColor: city.color,
                fillOpacity: 0.15,
                color: city.color,
                weight: 2,
                opacity: 0.6,
              }}
            />

            <Marker
              position={city.coords}
              icon={createCustomIcon(city.color, activeCity?.id === city.id)}
              eventHandlers={{
                click: () => setActiveCity(city),
              }}
            >
              <Tooltip
                direction="top"
                offset={[0, -45]}
                permanent={city.isHighlight}
              >
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
                        <span className="text-blue-400 font-semibold">{city.clients}</span> businesses
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <p className="text-xs text-slate-400 mb-2">Services:</p>
                    <div className="flex flex-wrap gap-1">
                      {city.services?.map((service, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-white/10 rounded-full text-slate-300"
                        >
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
    </>
  );
};

export default MapComponent;