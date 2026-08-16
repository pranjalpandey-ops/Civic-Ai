import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Filter, Flame, Layers, Search, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Sidebar } from '../../components/common/Sidebar';
import { LeafletMap } from '../../components/maps/LeafletMap';
import { useComplaints } from '../../context/ComplaintContext';

export function LiveCityMapPage() {
  const { complaints } = useComplaints();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState('all');
  const [activePriority, setActivePriority] = useState('all');
  const [heatmapMode, setHeatmapMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Issues' },
    { id: 'pothole', label: 'Potholes' },
    { id: 'garbage', label: 'Garbage' },
    { id: 'water_leakage', label: 'Water Leaks' },
    { id: 'broken_streetlight', label: 'Streetlights' },
    { id: 'drainage', label: 'Drainage' },
  ];

  const filteredComplaints = complaints.filter((c) => {
    if (activeCategory !== 'all' && c.categoryId !== activeCategory) return false;
    if (activePriority !== 'all' && c.priority !== activePriority) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        (c.location?.address && c.location.address.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar type="authority" />

      <main className="flex-1 p-6 sm:p-8 flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
        {/* Top Command Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-4 space-y-3 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>Live Municipal Operations GIS Map</span>
              </h1>
              <p className="text-xs text-slate-500">
                Spatial distribution of active tickets and hot-spot clusters across Delhi NCR.
              </p>
            </div>

            {/* Heatmap Toggle & Search */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setHeatmapMode(!heatmapMode)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border ${
                  heatmapMode
                    ? 'bg-red-600 text-white border-red-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>{heatmapMode ? 'Heatmap Density Active' : 'Heatmap Layer'}</span>
              </button>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}

            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-600">
                Showing: {filteredComplaints.length} markers
              </span>
            </div>
          </div>
        </div>

        {/* Fullscreen Map Canvas */}
        <div className="flex-1 rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative">
          <LeafletMap
            complaints={filteredComplaints}
            center={[28.6280, 77.3649]}
            zoom={12}
            height="100%"
          />

          {/* Map Legend Overlay */}
          <div className="absolute bottom-4 right-4 z-[400] bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200 shadow-lg text-xs space-y-1.5">
            <p className="font-bold text-[11px] uppercase tracking-wider text-slate-400">Map Legend</p>
            <div className="flex items-center gap-2 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span>P1 Critical (4h SLA)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
              <span>P2 High Priority</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>P3 Medium Priority</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>Resolved & Verified</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
