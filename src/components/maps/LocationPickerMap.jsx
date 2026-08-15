import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Crosshair, MapPin, Check } from 'lucide-react';

const pinIcon = L.divIcon({
  className: 'custom-pin',
  html: `
    <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
      <div style="
        width: 32px; 
        height: 32px; 
        background: #0052cc; 
        border-radius: 50% 50% 50% 0; 
        transform: rotate(-45deg); 
        border: 3px solid #ffffff; 
        box-shadow: 0 8px 16px -2px rgba(0,82,204,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="width: 12px; height: 12px; background: white; border-radius: 50%;"></div>
      </div>
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

function DraggableMarker({ position, setPosition, onAddressChange }) {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const eventHandlers = useMemo(
    () => ({
      dragend(e) {
        const marker = e.target;
        const newPos = marker.getLatLng();
        setPosition(newPos);
      },
    }),
    [setPosition]
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      icon={pinIcon}
    />
  );
}

function PanToLocation({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom());
    }
  }, [position, map]);
  return null;
}

export function LocationPickerMap({
  location,
  onChange,
  className = ''
}) {
  const [position, setPosition] = useState({
    lat: location?.lat || 28.6280,
    lng: location?.lng || 77.3649
  });
  const [address, setAddress] = useState(location?.address || 'Sector 62, Noida, Uttar Pradesh');
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    if (location?.lat && location?.lng) {
      setPosition({ lat: location.lat, lng: location.lng });
      setAddress(location.address || 'Sector 62, Noida');
    }
  }, [location]);

  const handlePositionChange = (newPos) => {
    setPosition(newPos);
    // Rough reverse geocode lookup simulation based on coordinates
    let approxAddr = 'Sector 62, Noida, Uttar Pradesh';
    if (newPos.lat > 28.63) approxAddr = 'Indirapuram / Vaishali, Ghaziabad';
    else if (newPos.lng < 77.30) approxAddr = 'Connaught Place / Central Delhi';
    else if (newPos.lat < 28.59) approxAddr = 'Sector 15 / Sector 50, Noida';

    const updated = {
      lat: Number(newPos.lat.toFixed(6)),
      lng: Number(newPos.lng.toFixed(6)),
      address: approxAddr,
      wardId: 'ward_62',
      wardName: 'Ward 18 (Sector 62, Noida)'
    };
    setAddress(approxAddr);
    if (onChange) onChange(updated);
  };

  const handleGetCurrentLocation = () => {
    setLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPos = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
          handlePositionChange(newPos);
          setLocating(false);
        },
        () => {
          // Fallback to default
          handlePositionChange({ lat: 28.6280, lng: 77.3649 });
          setLocating(false);
        },
        { timeout: 5000 }
      );
    } else {
      setLocating(false);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Map view */}
      <div className="h-64 w-full rounded-xl overflow-hidden border border-slate-200 shadow-inner relative">
        <MapContainer
          center={[position.lat, position.lng]}
          zoom={14}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <PanToLocation position={position} />
          <DraggableMarker
            position={position}
            setPosition={handlePositionChange}
          />
        </MapContainer>

        <button
          type="button"
          onClick={handleGetCurrentLocation}
          className="absolute top-3 right-3 z-[1000] bg-white text-slate-700 px-3 py-1.5 rounded-lg shadow-md border border-slate-200 text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5"
        >
          <Crosshair className={`w-3.5 h-3.5 ${locating ? 'animate-spin text-blue-600' : 'text-blue-600'}`} />
          <span>{locating ? 'Detecting GPS...' : 'Use Current Location'}</span>
        </button>
      </div>

      {/* Detected Location Card (matches Screenshot 2/requirements) */}
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
        <div className="flex items-start gap-2.5">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg shrink-0 mt-0.5">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase text-slate-400">Detected Location</p>
            <p className="text-xs font-bold text-slate-800">{address}</p>
            <p className="text-[10px] font-mono text-slate-500 mt-0.5">
              Lat: {Number(position.lat).toFixed(4)}°, Lng: {Number(position.lng).toFixed(4)}°
            </p>
          </div>
        </div>
        <span className="text-[11px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-1 rounded-md border border-emerald-200 flex items-center gap-1">
          <Check className="w-3 h-3" /> Geotagged
        </span>
      </div>
    </div>
  );
}
