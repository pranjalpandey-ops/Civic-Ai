import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  FileText,
  Clock,
  RotateCw,
  CheckCircle2,
  Search,
  MapPin,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useComplaints } from '../../context/ComplaintContext';
import { Sidebar } from '../../components/common/Sidebar';
import { PriorityBadge, StatusBadge } from '../../components/common/Badge';
import { LeafletMap } from '../../components/maps/LeafletMap';

export function CitizenDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { complaints } = useComplaints();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const citizenComplaints = complaints.filter(
    (c) => c.citizenId === user?.id || c.citizenId === 'usr_citizen_1'
  );

  const activeCount = citizenComplaints.filter((c) =>
    ['Reported', 'AI Verified', 'Assigned'].includes(c.status)
  ).length;

  const inProgressCount = citizenComplaints.filter((c) => c.status === 'In Progress').length;
  const resolvedCount = citizenComplaints.filter((c) =>
    ['Resolved', 'Citizen Verified', 'Closed'].includes(c.status)
  ).length;

  const filteredReports = citizenComplaints.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.location?.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#090d16] text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      {/* Left Sidebar (Matches Screenshot 2) */}
      <Sidebar type="citizen" />

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl overflow-y-auto">
        <div className="space-y-8">
          
          {/* Header Row (Matches Screenshot 2) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                {t('goodMorning')}, {user?.name?.split(' ')[0] || 'Pranjal'} 👋
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Here is your city engagement overview for today.
              </p>
            </div>

            {/* Top Search Input (Matches Screenshot 2) */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search issues..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100/80 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all"
              />
            </div>
          </div>

          {/* Primary CTA Button: + Report an Issue (Matches Screenshot 2) */}
          <div>
            <button
              onClick={() => navigate('/report')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
            >
              <PlusCircle className="w-5 h-5" />
              <span>+ Report an Issue</span>
            </button>
          </div>

          {/* 4 Metric Cards (Matches Screenshot 2) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Total Reports */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span>{t('totalReports')}</span>
                <FileText className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-3">
                {citizenComplaints.length > 0 ? citizenComplaints.length + 8 : 12}
              </div>
            </div>

            {/* Active */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span>{t('active')}</span>
                <Clock className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-3">
                {activeCount > 0 ? activeCount : 3}
              </div>
            </div>

            {/* In Progress */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span>{t('inProgress')}</span>
                <RotateCw className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-3">
                {inProgressCount > 0 ? inProgressCount : 5}
              </div>
            </div>

            {/* Resolved */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span>{t('resolved')}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-3">
                {resolvedCount > 0 ? resolvedCount : 4}
              </div>
            </div>
          </div>

          {/* Bottom Split: Recent Reports vs Nearby Issues (Matches Screenshot 2) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 7 Cols: Recent Reports */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">{t('recentReports')}</h2>
                <Link
                  to="/citizen/complaints"
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t('viewAll')}
                </Link>
              </div>

              <div className="space-y-3">
                {filteredReports.slice(0, 4).map((c) => (
                  <div
                    key={c.id}
                    onClick={() => navigate(`/complaints/${c.id}`)}
                    className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer transition-all flex items-start justify-between gap-3 group"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                          {c.id}
                        </span>
                        <StatusBadge status={c.status} />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                        {c.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                          <span className="truncate">{c.location?.address || 'Sector 62, Noida'}</span>
                        </span>
                        <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                          {c.priority === 'P1' || c.priority === 'P2' ? (
                            <span className="text-orange-600 dark:text-orange-400 font-semibold">! {c.priority === 'P1' ? 'Critical' : 'High'} Priority</span>
                          ) : (
                            <span className="text-slate-500 dark:text-slate-400">{c.priority === 'P3' ? 'Medium Priority' : 'Low Priority'}</span>
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="p-2 text-slate-300 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 Cols: Nearby Issues Mini Map (Matches Screenshot 2) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">{t('nearbyIssues')}</h2>
                <Link
                  to="/map"
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Full Map →
                </Link>
              </div>

              <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden h-[300px]">
                <LeafletMap
                  complaints={complaints}
                  center={[28.6280, 77.3649]}
                  zoom={12}
                  height="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
