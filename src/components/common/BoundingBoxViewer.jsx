import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Eye, Contrast, AlertTriangle } from 'lucide-react';

export function BoundingBoxViewer({
  imageUrl,
  imageFilename = 'IMG_8492_RAW.jpg',
  boundingBox = { x: 30, y: 35, width: 38, height: 32, label: 'Pothole (94%)' },
  showBox = true,
  className = ''
}) {
  const [zoom, setZoom] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  return (
    <div className={`relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 group ${className}`}>
      {/* Top Bar with filename and controls */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-2 bg-slate-900/80 backdrop-blur-md text-white border-b border-white/10">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-medium text-slate-200">Source Image</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
            {imageFilename}
          </span>
        </div>
      </div>

      {/* Main Image Viewport */}
      <div className="relative w-full h-[340px] md:h-[400px] overflow-hidden flex items-center justify-center bg-slate-950">
        <img
          src={imageUrl}
          alt="Civic Issue Source"
          className={`w-full h-full object-cover transition-all duration-300 ${
            zoom ? 'scale-125' : 'scale-100'
          } ${highContrast ? 'contrast-150 brightness-110' : ''}`}
        />

        {/* AI Bounding Box Overlay */}
        {showBox && boundingBox && (
          <div
            className="absolute border-2 border-blue-500 rounded-sm pointer-events-none transition-all duration-500"
            style={{
              left: `${boundingBox.x}%`,
              top: `${boundingBox.y}%`,
              width: `${boundingBox.width}%`,
              height: `${boundingBox.height}%`,
              boxShadow: '0 0 0 1px rgba(0, 82, 204, 0.4), inset 0 0 12px rgba(59, 130, 246, 0.2)'
            }}
          >
            {/* Box Label Tag */}
            <div className="absolute -top-7 left-0 bg-blue-600 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-md flex items-center gap-1 whitespace-nowrap">
              <AlertTriangle className="w-3 h-3 text-amber-300" />
              <span>{boundingBox.label || 'Detected Issue'}</span>
            </div>
            
            {/* Corner crosshairs */}
            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-blue-400"></div>
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-blue-400"></div>
            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-blue-400"></div>
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-blue-400"></div>
          </div>
        )}

        {/* Bottom Left Toolbar */}
        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-md p-1 rounded-lg border border-white/15">
          <button
            type="button"
            onClick={() => setZoom(!zoom)}
            className={`p-1.5 rounded transition-colors ${zoom ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
            title="Toggle Zoom"
          >
            {zoom ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => setHighContrast(!highContrast)}
            className={`p-1.5 rounded transition-colors ${highContrast ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
            title="Toggle Contrast Enhance"
          >
            <Contrast className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
