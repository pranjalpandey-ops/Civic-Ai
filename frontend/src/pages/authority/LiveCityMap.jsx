import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Flame,
  Layers3,
  Search,
  AlertTriangle,
  ShieldCheck,
  Activity,
  Navigation,
  X,
  ChevronRight,
  Radio,
  Crosshair,
  BarChart3,
  Clock3,
  CircleDot
} from 'lucide-react';

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
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', label: 'All Issues' },
    { id: 'pothole', label: 'Potholes' },
    { id: 'garbage', label: 'Garbage' },
    { id: 'water_leakage', label: 'Water Leaks' },
    { id: 'broken_streetlight', label: 'Streetlights' },
    { id: 'drainage', label: 'Drainage' },
  ];

  /*
   * Filter complaints.
   * Kept entirely client-side so the existing ComplaintContext
   * continues to work without requiring backend changes.
   */
  const filteredComplaints = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return complaints.filter((c) => {
      if (
        activeCategory !== 'all' &&
        c.categoryId !== activeCategory
      ) {
        return false;
      }

      if (
        activePriority !== 'all' &&
        c.priority !== activePriority
      ) {
        return false;
      }

      if (query) {
        return (
          c.title?.toLowerCase().includes(query) ||
          c.id?.toLowerCase().includes(query) ||
          c.location?.address?.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [
    complaints,
    activeCategory,
    activePriority,
    searchQuery
  ]);

  /* Live map statistics */
  const stats = useMemo(() => {
    const active = filteredComplaints.filter(
      (c) =>
        !['Resolved', 'Citizen Verified', 'Closed'].includes(
          c.status
        )
    );

    const critical = filteredComplaints.filter(
      (c) => c.priority === 'P1'
    );

    const high = filteredComplaints.filter(
      (c) => c.priority === 'P2'
    );

    const resolved = filteredComplaints.filter((c) =>
      ['Resolved', 'Citizen Verified', 'Closed'].includes(
        c.status
      )
    );

    return {
      total: filteredComplaints.length,
      active: active.length,
      critical: critical.length,
      high: high.length,
      resolved: resolved.length,
    };
  }, [filteredComplaints]);

  const clearFilters = () => {
    setActiveCategory('all');
    setActivePriority('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex transition-colors duration-300">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <Sidebar type="authority" />

      {/* =====================================================
          MAIN COMMAND AREA
      ====================================================== */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-7 flex flex-col h-screen overflow-hidden">

        {/* ===================================================
            TOP COMMAND HEADER
        ==================================================== */}
        <section className="relative shrink-0 mb-4">

          {/* Ambient glow */}
          <div className="absolute -top-20 left-1/4 w-72 h-40 bg-blue-600/10 blur-3xl pointer-events-none" />
          <div className="absolute -top-20 right-1/4 w-72 h-40 bg-violet-600/10 blur-3xl pointer-events-none" />

          <div className="relative rounded-3xl border border-white/[0.08] bg-[#0d1320]/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden">

            {/* Top accent */}
            <div className="h-[2px] bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400" />

            <div className="p-4 sm:p-5">

              {/* Header row */}
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">

                {/* Title */}
                <div className="flex items-start gap-3 min-w-0">

                  <div className="relative shrink-0">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-[0_10px_30px_rgba(59,130,246,0.3)]">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>

                    <span className="absolute -right-1 -top-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0d1320] shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                        <Radio className="w-3 h-3 animate-pulse" />
                        Live Operations
                      </span>

                      <span className="text-[10px] font-mono text-slate-500">
                        GIS / CENTRAL-NCR-01
                      </span>
                    </div>

                    <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                      Live City Operations Map
                    </h1>

                    <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                      Real-time spatial intelligence across municipal incident zones.
                    </p>
                  </div>
                </div>

                {/* Search + actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">

                  {/* Search */}
                  <div className="relative w-full sm:w-64 lg:w-72">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />

                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) =>
                        setSearchQuery(e.target.value)
                      }
                      placeholder="Search ticket, location..."
                      className="w-full h-10 pl-10 pr-9 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder:text-slate-500 outline-none transition-all focus:border-blue-500/50 focus:bg-blue-500/[0.04] focus:ring-2 focus:ring-blue-500/10"
                    />

                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Heatmap */}
                  <button
                    type="button"
                    onClick={() =>
                      setHeatmapMode(!heatmapMode)
                    }
                    className={`h-10 px-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                      heatmapMode
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white border-red-400/50 shadow-[0_8px_25px_rgba(239,68,68,0.25)]'
                        : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15]'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5" />

                    <span className="hidden sm:inline">
                      {heatmapMode
                        ? 'Heatmap Active'
                        : 'Heatmap'}
                    </span>
                  </button>

                  {/* Filter */}
                  <button
                    type="button"
                    onClick={() =>
                      setShowFilters(!showFilters)
                    }
                    className={`h-10 px-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                      showFilters
                        ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20'
                        : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:bg-white/[0.08]'
                    }`}
                  >
                    <Layers3 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">
                      Layers
                    </span>
                  </button>
                </div>
              </div>

              {/* =================================================
                  LIVE STAT CARDS
              ================================================== */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 mt-4">

                <MapStat
                  icon={Activity}
                  label="Visible Signals"
                  value={stats.total}
                  accent="blue"
                />

                <MapStat
                  icon={CircleDot}
                  label="Active"
                  value={stats.active}
                  accent="cyan"
                />

                <MapStat
                  icon={AlertTriangle}
                  label="P1 Critical"
                  value={stats.critical}
                  accent="red"
                />

                <MapStat
                  icon={Clock3}
                  label="P2 High"
                  value={stats.high}
                  accent="amber"
                />

                <MapStat
                  icon={ShieldCheck}
                  label="Resolved"
                  value={stats.resolved}
                  accent="emerald"
                  className="col-span-2 md:col-span-1"
                />

              </div>

              {/* =================================================
                  FILTER PANEL
              ================================================== */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t border-white/[0.07] animate-in fade-in slide-in-from-top-2 duration-200">

                  {/* Categories */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mr-1">
                      Category
                    </span>

                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() =>
                          setActiveCategory(cat.id)
                        }
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all border ${
                          activeCategory === cat.id
                            ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                            : 'bg-white/[0.035] border-white/[0.07] text-slate-400 hover:text-white hover:bg-white/[0.07]'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Priority */}
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mr-1">
                      Priority
                    </span>

                    <PriorityFilter
                      label="All"
                      value="all"
                      active={activePriority}
                      onClick={setActivePriority}
                    />

                    <PriorityFilter
                      label="P1 Critical"
                      value="P1"
                      active={activePriority}
                      onClick={setActivePriority}
                      color="red"
                    />

                    <PriorityFilter
                      label="P2 High"
                      value="P2"
                      active={activePriority}
                      onClick={setActivePriority}
                      color="orange"
                    />

                    <PriorityFilter
                      label="P3 Medium"
                      value="P3"
                      active={activePriority}
                      onClick={setActivePriority}
                      color="amber"
                    />

                    <PriorityFilter
                      label="P4 Low"
                      value="P4"
                      active={activePriority}
                      onClick={setActivePriority}
                      color="blue"
                    />

                    {(activeCategory !== 'all' ||
                      activePriority !== 'all' ||
                      searchQuery) && (
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="ml-auto text-[10px] font-bold text-slate-400 hover:text-white flex items-center gap-1"
                      >
                        <X className="w-3 h-3" />
                        Clear filters
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =====================================================
            MAP AREA
        ====================================================== */}
        <section className="flex-1 min-h-0 relative rounded-3xl overflow-hidden border border-white/[0.08] bg-[#0d1320] shadow-[0_25px_70px_rgba(0,0,0,0.45)]">

          {/* Map */}
          <div className="absolute inset-0">
            <LeafletMap
              complaints={filteredComplaints}
              center={[28.6280, 77.3649]}
              zoom={12}
              height="100%"
            />
          </div>

          {/* Heatmap visual atmosphere */}
          {heatmapMode && (
            <div className="absolute inset-0 pointer-events-none z-[350]">
              <div className="absolute left-[35%] top-[35%] w-48 h-48 rounded-full bg-red-500/10 blur-3xl" />
              <div className="absolute left-[52%] top-[48%] w-64 h-64 rounded-full bg-orange-500/10 blur-3xl" />
              <div className="absolute left-[25%] top-[60%] w-40 h-40 rounded-full bg-yellow-500/10 blur-3xl" />
            </div>
          )}

          {/* ===================================================
              TOP LEFT MAP STATUS
          ==================================================== */}
          <div className="absolute top-4 left-4 z-[400]">

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0b111d]/90 backdrop-blur-xl border border-white/[0.1] shadow-xl">

              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>

              <div>
                <p className="text-[10px] font-bold text-white">
                  LIVE CIVIC SIGNALS
                </p>
                <p className="text-[9px] text-slate-500">
                  Updated just now
                </p>
              </div>

            </div>
          </div>

          {/* ===================================================
              MAP TOOLS
          ==================================================== */}
          <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">

            <MapToolButton
              icon={Crosshair}
              label="Locate"
              onClick={() => {}}
            />

            <MapToolButton
              icon={BarChart3}
              label="Analytics"
              onClick={() =>
                navigate('/authority/analytics')
              }
            />

          </div>

          {/* ===================================================
              MAP LEGEND
          ==================================================== */}
          <div className="absolute bottom-4 left-4 z-[400] max-w-[230px]">

            <div className="rounded-2xl bg-[#0b111d]/95 backdrop-blur-xl border border-white/[0.1] shadow-[0_15px_40px_rgba(0,0,0,0.35)] p-4">

              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Map Legend
                  </p>
                  <p className="text-[9px] text-slate-600 mt-0.5">
                    Incident severity
                  </p>
                </div>

                <Layers3 className="w-4 h-4 text-blue-400" />
              </div>

              <div className="space-y-2">

                <LegendItem
                  color="bg-red-500"
                  glow="shadow-[0_0_8px_rgba(239,68,68,0.7)]"
                  label="P1 Critical"
                  detail="4h SLA"
                />

                <LegendItem
                  color="bg-orange-500"
                  glow="shadow-[0_0_8px_rgba(249,115,22,0.7)]"
                  label="P2 High"
                  detail="12h SLA"
                />

                <LegendItem
                  color="bg-amber-400"
                  glow="shadow-[0_0_8px_rgba(251,191,36,0.7)]"
                  label="P3 Medium"
                  detail="24h SLA"
                />

                <LegendItem
                  color="bg-blue-400"
                  glow="shadow-[0_0_8px_rgba(96,165,250,0.7)]"
                  label="P4 Low"
                  detail="48h SLA"
                />

                <LegendItem
                  color="bg-emerald-400"
                  glow="shadow-[0_0_8px_rgba(52,211,153,0.7)]"
                  label="Resolved"
                  detail="Verified"
                />

              </div>
            </div>
          </div>

          {/* ===================================================
              BOTTOM RIGHT LIVE COUNTER
          ==================================================== */}
          <div className="absolute bottom-4 right-4 z-[400]">

            <div className="rounded-2xl bg-[#0b111d]/95 backdrop-blur-xl border border-white/[0.1] shadow-xl px-4 py-3">

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Navigation className="w-4 h-4 text-blue-400" />
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-wider font-bold text-slate-500">
                    Visible Markers
                  </p>

                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-extrabold text-white">
                      {filteredComplaints.length}
                    </span>

                    <span className="text-[9px] text-slate-500">
                      signals
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ===================================================
              EMPTY STATE
          ==================================================== */}
          {filteredComplaints.length === 0 && (
            <div className="absolute inset-0 z-[450] flex items-center justify-center pointer-events-none">

              <div className="pointer-events-auto max-w-sm mx-4 rounded-3xl bg-[#0b111d]/95 backdrop-blur-xl border border-white/[0.1] shadow-2xl p-7 text-center">

                <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-800 flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-slate-500" />
                </div>

                <h3 className="text-sm font-bold text-white">
                  No civic signals found
                </h3>

                <p className="text-xs text-slate-500 mt-1.5">
                  Try changing your search or map filters.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
                >
                  Reset Map Filters
                </button>
              </div>
            </div>
          )}

        </section>
      </main>
    </div>
  );
}

/* ============================================================
   STAT CARD
============================================================ */

function MapStat({
  icon: Icon,
  label,
  value,
  accent = 'blue',
  className = ''
}) {
  const accents = {
    blue: {
      icon: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    cyan: {
      icon: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
    },
    red: {
      icon: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
    },
    amber: {
      icon: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
    emerald: {
      icon: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
  };

  const theme = accents[accent];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-white/[0.035] border border-white/[0.07] p-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.055] hover:border-white/[0.12] ${className}`}
    >
      {/* subtle 3D light */}
      <div className="absolute -right-6 -top-6 w-16 h-16 rounded-full bg-white/[0.03] blur-xl group-hover:bg-white/[0.06] transition-all" />

      <div className="flex items-center justify-between gap-2">

        <div className="min-w-0">
          <p className="text-[9px] uppercase tracking-wider font-bold text-slate-500 truncate">
            {label}
          </p>

          <p className="text-xl font-extrabold text-white mt-1">
            {value}
          </p>
        </div>

        <div
          className={`w-8 h-8 rounded-xl ${theme.bg} ${theme.border} border flex items-center justify-center shrink-0`}
        >
          <Icon className={`w-3.5 h-3.5 ${theme.icon}`} />
        </div>

      </div>
    </div>
  );
}

/* ============================================================
   PRIORITY FILTER
============================================================ */

function PriorityFilter({
  label,
  value,
  active,
  onClick,
  color
}) {
  const activeClasses = {
    red: 'bg-red-500/15 border-red-500/30 text-red-300',
    orange: 'bg-orange-500/15 border-orange-500/30 text-orange-300',
    amber: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
    blue: 'bg-blue-500/15 border-blue-500/30 text-blue-300',
  };

  const dotClasses = {
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    amber: 'bg-amber-400',
    blue: 'bg-blue-400',
  };

  const isActive = active === value;

  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold border transition-all flex items-center gap-1.5 ${
        isActive
          ? color
            ? activeClasses[color]
            : 'bg-white/10 border-white/15 text-white'
          : 'bg-white/[0.025] border-white/[0.06] text-slate-500 hover:text-slate-300 hover:bg-white/[0.05]'
      }`}
    >
      {color && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            isActive
              ? dotClasses[color]
              : 'bg-slate-600'
          }`}
        />
      )}

      {label}
    </button>
  );
}

/* ============================================================
   MAP TOOL BUTTON
============================================================ */

function MapToolButton({
  icon: Icon,
  label,
  onClick
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className="w-10 h-10 rounded-xl bg-[#0b111d]/90 backdrop-blur-xl border border-white/[0.1] text-slate-300 hover:text-white hover:bg-blue-600/80 hover:border-blue-400/40 shadow-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}

/* ============================================================
   LEGEND ITEM
============================================================ */

function LegendItem({
  color,
  glow,
  label,
  detail
}) {
  return (
    <div className="flex items-center justify-between gap-4">

      <div className="flex items-center gap-2">
        <span
          className={`w-2.5 h-2.5 rounded-full ${color} ${glow}`}
        />

        <span className="text-[10px] font-semibold text-slate-300">
          {label}
        </span>
      </div>

      <span className="text-[9px] font-mono text-slate-600">
        {detail}
      </span>

    </div>
  );
}