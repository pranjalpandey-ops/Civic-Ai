import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  RotateCw,
  Zap,
  Users,
  ChevronRight,
  Shield,
  Layers,
  Building
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid
} from 'recharts';
import { Sidebar } from '../../components/common/Sidebar';
import { PriorityBadge, StatusBadge } from '../../components/common/Badge';
import { useComplaints } from '../../context/ComplaintContext';
import { useAuth } from '../../context/AuthContext';
import { fetchApi } from '../../utils/api';

const COLORS = ['#ef4444', '#f97316', '#eab308', '#3b82f6', '#10b981'];

export function AuthorityDashboard() {
  const { complaints } = useComplaints();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchApi('/analytics/overview');
        setOverview(data);
      } catch (err) {
        console.warn('Analytics API error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const p1CriticalTickets = complaints.filter(
    (c) => c.priority === 'P1' && c.status !== 'Resolved' && c.status !== 'Closed'
  );

  const priorityChartData = [
    { name: 'P1 Critical', value: complaints.filter(c => c.priority === 'P1').length + 15, color: '#ef4444' },
    { name: 'P2 High', value: complaints.filter(c => c.priority === 'P2').length + 28, color: '#f97316' },
    { name: 'P3 Medium', value: complaints.filter(c => c.priority === 'P3').length + 45, color: '#eab308' },
    { name: 'P4 Low', value: complaints.filter(c => c.priority === 'P4').length + 12, color: '#3b82f6' },
  ];

  const categoryBarData = [
    { name: 'Potholes', count: 42 },
    { name: 'Garbage', count: 35 },
    { name: 'Water Leak', count: 28 },
    { name: 'Streetlights', count: 19 },
    { name: 'Drainage', count: 24 },
    { name: 'Signage', count: 12 },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#090d16] text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      <Sidebar type="authority" />

      <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl overflow-y-auto">
        <div className="space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300">
                  COMMAND CENTER ACTIVE
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500">Node: Central-NCR-01</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Municipal Operations Command Center
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Welcome back, {user?.name || 'Officer Rajesh Kumar'}. Live incident triage and SLA dispatch metrics.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => navigate('/authority/queue')}
                className="px-4 py-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold shadow-sm"
              >
                View Full Queue
              </button>
              <button
                onClick={() => navigate('/authority/map')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20"
              >
                Open City Live Map →
              </button>
            </div>
          </div>

          {/* 5 Core Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* Metric 1: Total Reports */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total System Tickets</span>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">1,284</div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Across all 6 wards</p>
            </div>

            {/* Metric 2: Pending Dispatch */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Pending Triage</span>
              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-2">186</div>
              <p className="text-[11px] text-blue-500 dark:text-blue-400 mt-1">AI verified queues</p>
            </div>

            {/* Metric 3: In Progress */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Field In Progress</span>
              <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-2">324</div>
              <p className="text-[11px] text-amber-500 dark:text-amber-400 mt-1">18 crews active</p>
            </div>

            {/* Metric 4: Resolved */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Resolved (This Mo.)</span>
              <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">774</div>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">↑ 94.6% satisfaction</p>
            </div>

            {/* Metric 5: SLA Breaches (Red Alert Card) */}
            <div className="bg-red-50/70 dark:bg-red-950/30 p-5 rounded-2xl border border-red-200 dark:border-red-900/60 shadow-sm flex flex-col justify-between col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between text-xs font-bold text-red-700 dark:text-red-300">
                <span>SLA Breaches</span>
                <AlertCircle className="w-4 h-4 text-red-600 animate-pulse" />
              </div>
              <div className="text-3xl font-extrabold text-red-700 dark:text-red-400 mt-2">14</div>
              <p className="text-[11px] text-red-600 dark:text-red-400 font-medium mt-1">Action required</p>
            </div>
          </div>

          {/* P1 Critical Rapid Triage Queue */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-red-200 dark:border-red-900/50 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  P1 Critical Priority Rapid Response Queue
                </h2>
              </div>
              <span className="text-xs font-mono font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/70 px-2.5 py-1 rounded-full border border-red-200 dark:border-red-800">
                4-Hour SLA Target
              </span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {p1CriticalTickets.length === 0 ? (
                <p className="text-xs text-slate-400 dark:text-slate-500 py-4 text-center">No active critical tickets.</p>
              ) : (
                p1CriticalTickets.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => navigate(`/authority/inspection/${c.id}`)}
                    className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl px-2 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <img
                        src={c.imageUrl}
                        alt={c.title}
                        className="w-12 h-12 rounded-lg object-cover border border-slate-200 dark:border-slate-800 shrink-0"
                      />
                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">{c.id}</span>
                          <PriorityBadge priority="P1" />
                          <StatusBadge status={c.status} />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                          {c.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">📍 {c.location?.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                      <div className="text-right font-mono text-[11px] text-red-600 dark:text-red-400 font-bold">
                        SLA: {new Date(c.slaDeadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <span className="px-3 py-1.5 bg-blue-600 group-hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm">
                        <span>Inspect AI</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Chart 1: Category Volume */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Incident Volume by Category</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryBarData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', border: 'none', fontSize: '12px' }}
                    />
                    <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Priority Distribution */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Priority Score Distribution</h3>
              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={priorityChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {priorityChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', border: 'none', fontSize: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
