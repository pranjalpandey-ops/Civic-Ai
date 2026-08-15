import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { PriorityBadge, StatusBadge } from '../common/Badge';

// Helper to create colored custom SVG markers
function createCustomIcon(priority, isResolved = false) {
  let color = '#3b82f6'; // blue
  if (isResolved) color = '#10b981'; // green
  else if (priority === 'P1') color = '#ef4444'; // red
  else if (priority === 'P2') color = '#f97316'; // orange
  else if (priority === 'P3') color = '#eab308'; // yellow

  const svgHtml = `
    <div style="position: relative; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
      <div style="
        width: 28px; 
        height: 28px; 
        background: ${color}; 
        border-radius: 50% 50% 50% 0; 
        transform: rotate(-45deg); 
        border: 2px solid #ffffff; 
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="width: 10px; height: 10px; background: white; border-radius: 50%;"></div>
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: svgHtml,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}

function MapUpdater({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || map.getZoom());
    }
  }, [center, zoom, map]);
  return null;
}

export function LeafletMap({
  complaints = [],
  center = [28.6280, 77.3649],
  zoom = 13,
  height = '500px',
  interactive = true,
  onMarkerClick
}) {
  const navigate = useNavigate();

  return (
    <div style={{ height, width: '100%' }} className="rounded-xl overflow-hidden shadow-sm border border-slate-200 relative">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={interactive}
        dragging={interactive}
        zoomControl={interactive}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater center={center} zoom={zoom} />

        {complaints.map((c) => {
          if (!c.location?.lat || !c.location?.lng) return null;
          const isResolved = ['Resolved', 'Citizen Verified', 'Closed'].includes(c.status);
          const icon = createCustomIcon(c.priority, isResolved);

          return (
            <Marker
              key={c.id}
              position={[c.location.lat, c.location.lng]}
              icon={icon}
              eventHandlers={{
                click: () => onMarkerClick && onMarkerClick(c)
              }}
            >
              <Popup>
                <div className="p-3 w-64 text-slate-800">
                  <div className="relative h-28 -mx-3 -mt-3 mb-2.5 overflow-hidden bg-slate-100">
                    <img
                      src={c.imageUrl}
                      alt={c.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="font-mono text-[10px] bg-slate-900/80 backdrop-blur-sm text-white px-2 py-0.5 rounded font-bold">
                        {c.id}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-bold text-xs leading-snug mb-1 text-slate-900 line-clamp-2">
                    {c.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mb-2 truncate">
                    📍 {c.location.address}
                  </p>
                  <div className="flex items-center justify-between gap-1 mb-2.5">
                    <PriorityBadge priority={c.priority} />
                    <StatusBadge status={c.status} />
                  </div>
                  <button
                    onClick={() => navigate(`/complaints/${c.id}`)}
                    className="w-full py-1.5 px-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold text-center transition-colors"
                  >
                    Inspect Complaint →
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
