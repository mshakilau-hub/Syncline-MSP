// src/components/areas/MapComponent.jsx
import React, { useEffect } from 'react';
import { MapContainer, Marker, Popup, Tooltip, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
// Official plugin – extends L automatically (recommended approach)
import '@maplibre/maplibre-gl-leaflet';

import 'leaflet/dist/leaflet.css';

// Lucide icons (all retained for potential future use or consistency)
import MapPin from '@lucide/map-pin';
import Clock from '@lucide/clock';
import Phone from '@lucide/phone';
import Users from '@lucide/users';
import Shield from '@lucide/shield';
import Wifi from '@lucide/wifi';
import Navigation from '@lucide/navigation';
import ArrowRight from '@lucide/arrow-right';

// Fix default Leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom SVG marker (clean, performant, no heavy filters/animations)
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

// Vector tile layer using official OSM Shortbread style (fixed URL for dark theme compatibility)
const VectorTileLayer = () => {
  const map = useMap();

  useEffect(() => {
    const gl = L.maplibreGL({
      style: 'https://vector.openstreetmap.org/demo/shortbread/eclipse.json',

      transformStyle: (style) => {
        const BASE = 'https://vector.openstreetmap.org';

        return {
          ...style,
          sprite: `${BASE}${style.sprite}`,
          glyphs: `${BASE}${style.glyphs}`,
        };
      },

      interactive: false,
    }).addTo(map);

    return () => map.removeLayer(gl);
  }, [map]);

  return null;
};


// Smooth fly-to when active city changes (with robustness)
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
        maxBounds={[[-90, 140.5], [90, 150.5]]} // Adjusted for MapLibre latitude limits (prevents projection issues; keeps your longitude bounds)
        maxBoundsViscosity={1} // Recommended for MapLibre integration
        minZoom={6}
        maxZoom={12}
        preferCanvas={true} // Optimizes performance for circles/paths
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
              keyboard={true}
              aria-label={`Service area marker for ${city.name} – ${city.description}`}
            >
              <Tooltip
                direction="top"
                offset={[0, -45]}
                permanent={city.isHighlight}
              >
                {city.name}
              </Tooltip>

              <Popup>
                <div
                  className="p-2"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={`popup-title-${city.id}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: city.color }}
                      aria-hidden="true"
                    />
                    <h3 id={`popup-title-${city.id}`} className="font-bold text-lg">
                      {city.name}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-300 mb-3">{city.description}</p>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-green-400" aria-hidden="true" />
                      <span className="text-slate-300">
                        <span className="text-green-400 font-semibold">{city.responseTime}</span> response
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-blue-400" aria-hidden="true" />
                      <span className="text-slate-300">
                        <span className="text-blue-400 font-semibold">{city.clients}</span> businesses protected
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <p className="text-xs text-slate-400 mb-2">Services Available:</p>
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




// // src/components/areas/MapComponent.jsx
// import React, { useEffect } from 'react';
// import { MapContainer, Marker, Popup, Tooltip, Circle, useMap } from 'react-leaflet';
// import L from 'leaflet';
// import maplibregl from 'maplibre-gl';
// import 'maplibre-gl/dist/maplibre-gl.css';
// import { MapLibreLayer } from '@maplibre/maplibre-gl-leaflet';

// // Individual lucide imports (unchanged)
// import MapPin from '@lucide/map-pin';
// import Clock from '@lucide/clock';
// import Phone from '@lucide/phone';
// import Users from '@lucide/users';
// import Shield from '@lucide/shield';
// import Wifi from '@lucide/wifi';
// import Navigation from '@lucide/navigation';
// import ArrowRight from '@lucide/arrow-right';

// import 'leaflet/dist/leaflet.css';

// // Fix Leaflet default marker icon (unchanged)
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
//   iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
// });

// // Simplified custom icon – removed filter & animate (perf killer)
// const createCustomIcon = (color, isActive = false) => {
//   const svgIcon = `
//     <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
//       <path d="M20 0C11.716 0 5 6.716 5 15c0 8.284 15 35 15 35s15-26.716 15-35c0-8.284-6.716-15-15-15z" 
//             fill="${color}" stroke="white" stroke-width="${isActive ? '3' : '2'}"/>
//       <circle cx="20" cy="15" r="6" fill="white" opacity="0.9"/>
//       ${isActive ? '<circle cx="20" cy="15" r="5" fill="white"/>' : ''} <!-- static highlight -->
//     </svg>
//   `;
//   return L.divIcon({
//     html: svgIcon,
//     className: 'custom-marker',
//     iconSize: [40, 50],
//     iconAnchor: [20, 50],
//     popupAnchor: [0, -50],
//   });
// };

// // Vector Tile Layer using OSMF Shortbread (2025+ production vector tiles)
// const VectorTileLayer = () => {
//   const map = useMap();

//   useEffect(() => {
//     const vectorLayer = new MapLibreLayer({
//       style: 'https://vector.openstreetmap.org/shortbread/style.json', // Official colorful Shortbread style
//       // Alternative darker/minimal style examples (if you want to match dark theme):
//       // style: 'https://demotiles.maplibre.org/style.json'  // demo dark
//       // or custom fork from https://shortbread-tiles.org/ community styles
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(map.getMap()); // attaches to Leaflet map instance

//     // Cleanup
//     return () => {
//       if (vectorLayer && map.getMap().hasLayer(vectorLayer)) {
//         map.getMap().removeLayer(vectorLayer);
//       }
//     };
//   }, [map]);

//   return null;
// };

// // Map bounds controller (unchanged)
// const MapBoundsController = ({ selectedCity }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (selectedCity) {
//       map.flyTo(selectedCity.coords, 10, {
//         duration: 1.5,
//         easeLinearity: 0.5,
//       });
//     }
//   }, [selectedCity, map]);

//   return null;
// };

// const MapComponent = ({ cities, activeCity, setActiveCity }) => {
//   return (
//     <>
//       <style>{`
//         .leaflet-container {
//           height: 100%;
//           width: 100%;
//           background: rgba(15, 23, 42, 0.5) !important;
//           border-radius: 1rem;
//         }
//         .leaflet-tile-pane {
//           opacity: 0.7;
//         }
//         .leaflet-popup-content-wrapper {
//           background: rgba(15, 23, 42, 0.95);
//           backdrop-filter: blur(12px);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 1rem;
//           box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
//         }
//         .leaflet-popup-content {
//           margin: 0;
//           padding: 1rem;
//           color: white;
//           min-width: 200px;
//         }
//         .leaflet-popup-tip {
//           background: rgba(15, 23, 42, 0.95);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//         }
//         .custom-marker {
//           background: none;
//           border: none;
//         }
//         .leaflet-tooltip {
//           background: rgba(15, 23, 42, 0.95);
//           backdrop-filter: blur(12px);
//           border: 1px solid rgba(255, 255, 255, 0.2);
//           color: white;
//           border-radius: 0.5rem;
//           padding: 0.5rem 0.75rem;
//           font-weight: 600;
//           box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
//         }
//         .leaflet-tooltip::before {
//           border-top-color: rgba(15, 23, 42, 0.95);
//         }
//       `}</style>

//       <MapContainer
//         center={[-37.4713, 144.7852]}
//         zoom={7}
//         scrollWheelZoom={true}
//         zoomControl={true}
//         style={{ height: '100%', width: '100%', position: 'relative', zIndex: 1 }}
//         maxBounds={[[-39.5, 140.5], [-33.5, 150.5]]}
//         minZoom={6}
//         maxZoom={12}
//         preferCanvas={true}          // ← Critical: canvas for paths/circles → big TBT & DOM win
//       >
//         <VectorTileLayer />           {/* ← Vector tiles – main perf upgrade */}

//         <MapBoundsController selectedCity={activeCity} />

//         {cities.map((city) => (
//           <React.Fragment key={city.id}>
//             {/* Coverage Circle – now faster on canvas */}
//             <Circle
//               center={city.coords}
//               radius={city.isHighlight ? 35000 : 25000}
//               pathOptions={{
//                 fillColor: city.color,
//                 fillOpacity: 0.15,
//                 color: city.color,
//                 weight: 2,
//                 opacity: 0.6,
//               }}
//             />

//             {/* City Marker – improved accessibility */}
//             <Marker
//               position={city.coords}
//               icon={createCustomIcon(city.color, activeCity?.id === city.id)}
//               eventHandlers={{
//                 click: () => setActiveCity(city),
//               }}
//               keyboard={true}
//               aria-label={`Service area marker for ${city.name} – ${city.description}`}
//             >
//               <Tooltip
//                 direction="top"
//                 offset={[0, -45]}
//                 permanent={city.isHighlight}
//                 className="custom-tooltip"
//               >
//                 {city.name}
//               </Tooltip>

//               <Popup>
//                 <div className="p-2" role="dialog" aria-modal="true" aria-labelledby={`popup-title-${city.id}`}>
//                   <div className="flex items-center gap-2 mb-3">
//                     <div
//                       className="w-3 h-3 rounded-full"
//                       style={{ backgroundColor: city.color }}
//                       aria-hidden="true"
//                     />
//                     <h3 id={`popup-title-${city.id}`} className="font-bold text-lg">
//                       {city.name}
//                     </h3>
//                   </div>

//                   <p className="text-sm text-slate-300 mb-3">{city.description}</p>

//                   <div className="space-y-2 mb-3">
//                     <div className="flex items-center gap-2 text-sm">
//                       <Clock className="w-4 h-4 text-green-400" aria-hidden="true" />
//                       <span className="text-slate-300">
//                         <span className="text-green-400 font-semibold">{city.responseTime}</span> response
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm">
//                       <Users className="w-4 h-4 text-blue-400" aria-hidden="true" />
//                       <span className="text-slate-300">
//                         <span className="text-blue-400 font-semibold">{city.clients}</span> businesses protected
//                       </span>
//                     </div>
//                   </div>

//                   <div className="pt-3 border-t border-white/10">
//                     <p className="text-xs text-slate-400 mb-2">Services Available:</p>
//                     <div className="flex flex-wrap gap-1">
//                       {city.services.map((service, i) => (
//                         <span
//                           key={i}
//                           className="text-xs px-2 py-1 bg-white/10 rounded-full text-slate-300"
//                         >
//                           {service}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </Popup>
//             </Marker>
//           </React.Fragment>
//         ))}
//       </MapContainer>
//     </>
//   );
// };

// export default MapComponent;




// // src/components/areas/MapComponent.jsx
// import React, { useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, Tooltip, Circle, useMap } from 'react-leaflet';
// import L from 'leaflet';

// // Only change this part – individual imports with alias
// import MapPin from '@lucide/map-pin';
// import Clock from '@lucide/clock';
// import Phone from '@lucide/phone';
// import Users from '@lucide/users';
// import Shield from '@lucide/shield';
// import Wifi from '@lucide/wifi';
// import Navigation from '@lucide/navigation';
// import ArrowRight from '@lucide/arrow-right';

// import 'leaflet/dist/leaflet.css';

// // ... rest of your component code remains 100% unchanged ...
// // Fix Leaflet default marker icon
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
//   iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
// });

// // Custom marker creation
// const createCustomIcon = (color, isActive = false) => {
//   const svgIcon = `
//     <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
//       <defs>
//         <filter id="shadow-${color}" x="-50%" y="-50%" width="200%" height="200%">
//           <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
//           <feOffset dx="0" dy="2" result="offsetblur"/>
//           <feComponentTransfer>
//             <feFuncA type="linear" slope="0.3"/>
//           </feComponentTransfer>
//           <feMerge>
//             <feMergeNode/>
//             <feMergeNode in="SourceGraphic"/>
//           </feMerge>
//         </filter>
//       </defs>
//       <path d="M20 0C11.716 0 5 6.716 5 15c0 8.284 15 35 15 35s15-26.716 15-35c0-8.284-6.716-15-15-15z" 
//             fill="${color}" filter="url(#shadow-${color})" stroke="white" stroke-width="${isActive ? '3' : '2'}"/>
//       <circle cx="20" cy="15" r="6" fill="white" opacity="0.9"/>
//       ${isActive ? '<circle cx="20" cy="15" r="4" fill="white"><animate attributeName="r" values="4;6;4" dur="1.5s" repeatCount="indefinite"/></circle>' : ''}
//     </svg>
//   `;
//   return L.divIcon({
//     html: svgIcon,
//     className: 'custom-marker',
//     iconSize: [40, 50],
//     iconAnchor: [20, 50],
//     popupAnchor: [0, -50]
//   });
// };

// // Map bounds controller
// const MapBoundsController = ({ selectedCity }) => {
//   const map = useMap();
  
//   useEffect(() => {
//     if (selectedCity) {
//       map.flyTo(selectedCity.coords, 10, {
//         duration: 1.5,
//         easeLinearity: 0.5
//       });
//     }
//   }, [selectedCity, map]);
  
//   return null;
// };

// const MapComponent = ({ cities, activeCity, setActiveCity }) => {
//   return (
//     <>
//       <style>{`
//         .leaflet-container {
//           height: 100%;
//           width: 100%;
//           background: rgba(15, 23, 42, 0.5) !important;
//           border-radius: 1rem;
//         }
//         .leaflet-tile-pane {
//           opacity: 0.7;
//         }
//         .leaflet-popup-content-wrapper {
//           background: rgba(15, 23, 42, 0.95);
//           backdrop-filter: blur(12px);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 1rem;
//           box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
//         }
//         .leaflet-popup-content {
//           margin: 0;
//           padding: 1rem;
//           color: white;
//           min-width: 200px;
//         }
//         .leaflet-popup-tip {
//           background: rgba(15, 23, 42, 0.95);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//         }
//         .custom-marker {
//           background: none;
//           border: none;
//         }
//         .leaflet-tooltip {
//           background: rgba(15, 23, 42, 0.95);
//           backdrop-filter: blur(12px);
//           border: 1px solid rgba(255, 255, 255, 0.2);
//           color: white;
//           border-radius: 0.5rem;
//           padding: 0.5rem 0.75rem;
//           font-weight: 600;
//           box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
//         }
//         .leaflet-tooltip::before {
//           border-top-color: rgba(15, 23, 42, 0.95);
//         }
//         .leaflet-container {
//           position: relative !important;
//         }
//         .leaflet-pane {
//           z-index: 1 !important;
//         }
//         .leaflet-control-container {
//           position: absolute !important;
//         }
//       `}</style>

//       <MapContainer
//         center={[-37.4713, 144.7852]}
//         zoom={7}
//         scrollWheelZoom={true}
//         zoomControl={true}
//         style={{ height: '100%', width: '100%', position: 'relative', zIndex: 1 }}
//         maxBounds={[[-39.5, 140.5], [-33.5, 150.5]]}
//         minZoom={6}
//         maxZoom={12}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         <MapBoundsController selectedCity={activeCity} />

//         {cities.map((city) => (
//           <React.Fragment key={city.id}>
//             {/* Coverage Circle */}
//             <Circle
//               center={city.coords}
//               radius={city.isHighlight ? 35000 : 25000}
//               pathOptions={{
//                 fillColor: city.color,
//                 fillOpacity: 0.15,
//                 color: city.color,
//                 weight: 2,
//                 opacity: 0.6
//               }}
//             />

//             {/* City Marker */}
//             <Marker
//               position={city.coords}
//               icon={createCustomIcon(city.color, activeCity?.id === city.id)}
//               eventHandlers={{
//                 click: () => setActiveCity(city),
//               }}
//               aria-label={`${city.name} service area marker`}
//             >
//               <Tooltip direction="top" offset={[0, -45]} permanent={city.isHighlight}>
//                 {city.name}
//               </Tooltip>

//               <Popup>
//                 <div className="p-2">
//                   <div className="flex items-center gap-2 mb-3">
//                     <div 
//                       className="w-3 h-3 rounded-full" 
//                       style={{ backgroundColor: city.color }}
//                       aria-hidden="true"
//                     />
//                     <h3 className="font-bold text-lg">{city.name}</h3>
//                   </div>
                  
//                   <p className="text-sm text-slate-300 mb-3">{city.description}</p>
                  
//                   <div className="space-y-2 mb-3">
//                     <div className="flex items-center gap-2 text-sm">
//                       <Clock className="w-4 h-4 text-green-400" aria-hidden="true" />
//                       <span className="text-slate-300">
//                         <span className="text-green-400 font-semibold">{city.responseTime}</span> response
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm">
//                       <Users className="w-4 h-4 text-blue-400" aria-hidden="true" />
//                       <span className="text-slate-300">
//                         <span className="text-blue-400 font-semibold">{city.clients}</span> businesses protected
//                       </span>
//                     </div>
//                   </div>

//                   <div className="pt-3 border-t border-white/10">
//                     <p className="text-xs text-slate-400 mb-2">Services Available:</p>
//                     <div className="flex flex-wrap gap-1">
//                       {city.services.map((service, i) => (
//                         <span key={i} className="text-xs px-2 py-1 bg-white/10 rounded-full text-slate-300">
//                           {service}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </Popup>
//             </Marker>
//           </React.Fragment>
//         ))}
//       </MapContainer>
//     </>
//   );
// };

// export default MapComponent;