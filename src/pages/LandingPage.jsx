import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Shield,
  Sparkles,
  PlusCircle,
  Clock,
  MapPin,
  AlertCircle,
  TrendingDown,
  TrendingUp,
  Search,
  Cpu,
  GitPullRequest,
  Eye,
  CheckCircle2,
  Maximize2,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useComplaints } from '../context/ComplaintContext';
import { LeafletMap } from '../components/maps/LeafletMap';

export function LandingPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { complaints } = useComplaints();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/map?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#090d16] text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      {/* Main Container */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        
        {/* Hero Section (Matches Screenshot 1 with enhanced font size) */}
        <section className="text-center space-y-6 max-w-4xl mx-auto pt-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            {t('heroTitle')}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
            {t('heroSubtitle')}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/report"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5"
            >
              <AlertCircle className="w-5 h-5" />
              <span>{t('reportIssue')}</span>
            </Link>
            <Link
              to="/map"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 text-base font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl shadow-sm transition-all hover:-translate-y-0.5"
            >
              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>{t('viewMap')}</span>
            </Link>
          </div>
        </section>

        {/* AI-Powered Search Bar (Matches Screenshot 1) */}
        <section className="max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <Search className="absolute left-4.5 w-5 h-5 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for reports, locations, or departments..."
              className="w-full pl-12 pr-36 py-3.5 bg-white dark:bg-slate-900 text-base text-slate-800 dark:text-slate-100 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all"
            />
            <div className="absolute right-3.5 flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-bold rounded-xl border border-blue-100 dark:border-blue-800">
              <Sparkles className="w-4 h-4" />
              <span>AI-powered</span>
            </div>
          </form>
        </section>

        {/* Quick Actions (Matches Screenshot 1) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <span className="text-blue-600 dark:text-blue-400">⚡</span>
            <span>{t('quickActions')}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Action 1: Report Issue */}
            <Link
              to="/report"
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all group flex flex-col justify-between"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <PlusCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Report Issue
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Submit a new incident</p>
              </div>
            </Link>

            {/* Action 2: Track My Report */}
            <Link
              to="/citizen/complaints"
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all group flex flex-col justify-between"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Track My Report
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Check status updates</p>
              </div>
            </Link>

            {/* Action 3: View Live Map */}
            <Link
              to="/map"
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all group flex flex-col justify-between"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  View Live Map
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">City-wide incident view</p>
              </div>
            </Link>

            {/* Action 4: Emergency Dispatch (Red Alert Card) */}
            <Link
              to="/report?emergency=true"
              className="bg-red-50/70 dark:bg-red-950/30 p-6 rounded-2xl border border-red-100 dark:border-red-900/50 shadow-sm hover:shadow-md hover:border-red-200 transition-all group flex flex-col justify-between relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center mb-4 shadow-md shadow-red-500/20 group-hover:scale-110 transition-transform">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-red-900 dark:text-red-300">
                  Emergency Dispatch
                </h3>
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">Immediate AI routing</p>
              </div>
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-red-200/40 dark:bg-red-900/30 rounded-full blur-xl pointer-events-none"></div>
            </Link>
          </div>
        </section>

        {/* Live Impact Pulse & Sector 62 Overview Split (Matches Screenshot 1) */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left 2 Cols: Live Impact Pulse */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">{t('liveImpactPulse')}</h2>
              </div>
              <span className="font-mono text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-md font-semibold">
                Last 24h
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Stat 1: Active Reports */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-1.5">
                  <span className="font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-slate-400" /> {t('activeReports')}
                  </span>
                </div>
                <div className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">342</div>
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1.5">
                  <TrendingDown className="w-3.5 h-3.5" /> ↓ 12% vs yesterday
                </p>
              </div>

              {/* Stat 2: Resolved This Week */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-1.5">
                  <span className="font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {t('resolvedThisWeek')}
                  </span>
                </div>
                <div className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">1,284</div>
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1.5">
                  <TrendingUp className="w-3.5 h-3.5" /> ↑ 5% vs last week
                </p>
              </div>

              {/* Stat 3: Avg Resolution */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-1.5">
                  <span className="font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" /> {t('avgResolution')}
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">4h 12m</div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mt-2.5 overflow-hidden">
                  <div className="bg-blue-600 dark:bg-blue-400 h-full w-3/4 rounded-full"></div>
                </div>
              </div>

              {/* Stat 4: Satisfaction */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-1.5">
                  <span className="font-medium flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-600" /> {t('satisfaction')}
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">92%</div>
                <div className="flex gap-1.5 mt-2.5">
                  <div className="h-2 flex-1 bg-emerald-500 rounded-full"></div>
                  <div className="h-2 flex-1 bg-emerald-500 rounded-full"></div>
                  <div className="h-2 flex-1 bg-emerald-500 rounded-full"></div>
                  <div className="h-2 flex-1 bg-emerald-500 rounded-full"></div>
                  <div className="h-2 flex-1 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right 1 Col: Sector 62 Overview Mini-Map Widget (Matches Screenshot 1) */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Sector 62 Overview</h3>
              <Link to="/map" className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-bold flex items-center gap-1">
                Expand <Maximize2 className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex-1 relative min-h-[220px]">
              <LeafletMap
                complaints={complaints.slice(0, 4)}
                center={[28.6280, 77.3649]}
                zoom={13}
                height="100%"
                interactive={false}
              />
              
              {/* Floating Bottom Toast Badge */}
              <div className="absolute bottom-3 left-3 right-3 z-[400] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 rounded-lg">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase font-bold text-slate-400">Just Resolved</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Pothole Repair - Sector 62</p>
                  </div>
                </div>
                <span className="font-mono text-xs text-slate-400 font-medium">2m ago</span>
              </div>
            </div>
          </div>
        </section>

        {/* Intelligent Infrastructure (Matches Screenshot 1) */}
        <section className="text-center space-y-10 pt-4">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t('intelligentInfrastructure')}
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              {t('intelligentSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 text-center">
            {/* Card 1: AI Detection */}
            <div className="bg-white dark:bg-slate-900 p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center space-y-4 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Cpu className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('aiDetection')}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('aiDetectionDesc')}
              </p>
            </div>

            {/* Card 2: Rapid Routing */}
            <div className="bg-white dark:bg-slate-900 p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center space-y-4 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <GitPullRequest className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('rapidRouting')}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('rapidRoutingDesc')}
              </p>
            </div>

            {/* Card 3: Citizen Transparency */}
            <div className="bg-white dark:bg-slate-900 p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center space-y-4 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('citizenTransparency')}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('citizenTransparencyDesc')}
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-slate-100 dark:bg-[#070b12] border-t border-slate-200 dark:border-slate-800/80 py-8 mt-14 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-mono text-slate-500 dark:text-slate-400">
          <p>© 2026 CivicEye AI. Precision Urban Governance.</p>
          <div className="flex flex-wrap gap-6 text-slate-600 dark:text-slate-400">
            <Link to="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</Link>
            <Link to="/api-docs" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">API Documentation</Link>
            <Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
