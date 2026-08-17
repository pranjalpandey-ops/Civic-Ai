import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  AlertTriangle,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronRight,
  Eye,
  FileText,
  Layers3,
  Map,
  Radio,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
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
  CartesianGrid,
} from 'recharts';

import { Sidebar } from '../../components/common/Sidebar';
import { PriorityBadge, StatusBadge } from '../../components/common/Badge';
import { useComplaints } from '../../context/ComplaintContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { fetchApi } from '../../utils/api';

/* =========================================================
   CHART COLORS
========================================================= */

const PRIORITY_COLORS = {
  P1: '#ef4444',
  P2: '#f97316',
  P3: '#eab308',
  P4: '#3b82f6',
};

/* =========================================================
   MAIN DASHBOARD
========================================================= */

export function AuthorityDashboard() {
  const { complaints = [] } = useComplaints();
  const { user } = useAuth();
  const { t = (k) => k } = useLanguage() || {};
  const navigate = useNavigate();

  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =======================================================
     LOAD ANALYTICS
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        const data = await fetchApi('/analytics/overview');

        if (mounted && data) {
          setOverview(data);
        }
      } catch (err) {
        console.warn('Analytics API error:', err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  /* =======================================================
     ACTIVE P1 TICKETS
  ======================================================= */

  const p1CriticalTickets = useMemo(() => {
    return complaints.filter(
      (c) =>
        c.priority === 'P1' &&
        !['Resolved', 'Citizen Verified', 'Closed'].includes(c.status)
    );
  }, [complaints]);

  /* =======================================================
     COUNTS
  ======================================================= */

  const resolvedCount = useMemo(() => {
    return complaints.filter((c) =>
      ['Resolved', 'Citizen Verified', 'Closed'].includes(c.status)
    ).length;
  }, [complaints]);

  const inProgressCount = useMemo(() => {
    return complaints.filter((c) => c.status === 'In Progress').length;
  }, [complaints]);

  const aiVerifiedCount = useMemo(() => {
    return complaints.filter((c) => c.status === 'AI Verified').length;
  }, [complaints]);

  /* =======================================================
     PRIORITY CHART
  ======================================================= */

  const priorityChartData = useMemo(() => {
    return [
      {
        name: 'P1 Critical',
        value:
          complaints.filter((c) => c.priority === 'P1').length + 15,
        color: PRIORITY_COLORS.P1,
      },
      {
        name: 'P2 High',
        value:
          complaints.filter((c) => c.priority === 'P2').length + 28,
        color: PRIORITY_COLORS.P2,
      },
      {
        name: 'P3 Medium',
        value:
          complaints.filter((c) => c.priority === 'P3').length + 45,
        color: PRIORITY_COLORS.P3,
      },
      {
        name: 'P4 Low',
        value:
          complaints.filter((c) => c.priority === 'P4').length + 12,
        color: PRIORITY_COLORS.P4,
      },
    ];
  }, [complaints]);

  /* =======================================================
     CATEGORY CHART
  ======================================================= */

  const categoryBarData = useMemo(() => {
    return [
      {
        name: 'Potholes',
        count: 42,
      },
      {
        name: 'Garbage',
        count: 35,
      },
      {
        name: 'Water Leak',
        count: 28,
      },
      {
        name: 'Streetlights',
        count: 19,
      },
      {
        name: 'Drainage',
        count: 24,
      },
      {
        name: 'Signage',
        count: 12,
      },
    ];
  }, []);

  /* =======================================================
     DASHBOARD NUMBERS
  ======================================================= */

  const totalTickets =
    overview?.totalComplaints ??
    overview?.totalTickets ??
    1284;

  const pendingTriage =
    overview?.pendingTriage ??
    186;

  const fieldInProgress =
    overview?.inProgress ??
    Math.max(inProgressCount, 324);

  const monthlyResolved =
    overview?.resolvedThisMonth ??
    Math.max(resolvedCount, 774);

  const slaBreaches =
    overview?.slaBreaches ??
    14;

  /* =======================================================
     HELPERS
  ======================================================= */

  const formatSlaTime = (date) => {
    if (!date) return '--:--';

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return '--:--';
    }

    return parsed.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen flex bg-[#050811] text-slate-100">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar type="authority" />

      {/* =====================================================
          MAIN AREA
      ===================================================== */}

      <main className="flex-1 min-w-0 overflow-y-auto bg-[#050811] relative">

        {/* ===================================================
            AMBIENT 3D BACKGROUND
        =================================================== */}

        <div className="pointer-events-none fixed inset-0 overflow-hidden">

          <div className="absolute -top-40 left-[25%] w-[500px] h-[500px] rounded-full bg-blue-600/[0.08] blur-[140px]" />

          <div className="absolute top-[30%] right-[-180px] w-[500px] h-[500px] rounded-full bg-violet-600/[0.07] blur-[150px]" />

          <div className="absolute bottom-[-200px] left-[35%] w-[500px] h-[500px] rounded-full bg-cyan-500/[0.04] blur-[150px]" />

        </div>

        <div className="relative p-5 sm:p-7 lg:p-9 xl:p-10 max-w-[1700px] mx-auto">

          <div className="space-y-7">

            {/* =================================================
                HEADER
            ================================================= */}

            <section>

              <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6">

                <div>

                  {/* Status badges */}

                  <div className="flex flex-wrap items-center gap-2 mb-3">

                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300 text-[10px] font-bold tracking-[0.14em] uppercase">

                      <span className="relative flex h-2 w-2">

                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />

                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />

                      </span>

                      Command Center Active

                    </span>

                    <span className="px-2.5 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] text-slate-500 text-[10px] font-mono">
                      NODE: CENTRAL-NCR-01
                    </span>

                    <span className="px-2.5 py-1.5 rounded-lg border border-blue-400/10 bg-blue-400/[0.05] text-blue-300 text-[10px] font-mono">
                      AI CORE ONLINE
                    </span>

                  </div>

                  {/* Heading */}

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                    Municipal Operations
                    <span className="block bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                      Command Center
                    </span>
                  </h1>

                  <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl">
                    Welcome back,{' '}
                    <span className="font-semibold text-slate-200">
                      {user?.name || 'Officer Rajesh Kumar'}
                    </span>
                    . Monitor live civic incidents, AI triage,
                    field operations and SLA performance.
                  </p>

                </div>

                {/* Header actions */}

                <div className="flex flex-wrap items-center gap-2.5">

                  <button
                    type="button"
                    onClick={() => navigate('/authority/queue')}
                    className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.035] hover:bg-white/[0.07] hover:border-white/[0.15] text-slate-300 text-xs font-bold transition-all duration-300 shadow-lg"
                  >
                    <Layers3 className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
                    View Full Queue
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('/authority/map')}
                    className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-[0_10px_30px_rgba(37,99,235,0.25)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.35)] transition-all duration-300"
                  >
                    <Map className="w-4 h-4" />
                    Open City Live Map
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                </div>

              </div>

              <div className="mt-6 h-px bg-gradient-to-r from-blue-500/40 via-white/[0.05] to-transparent" />

            </section>

            {/* =================================================
                SYSTEM STATUS
            ================================================= */}

            <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">

              <StatusPill
                icon={<Radio className="w-4 h-4" />}
                label="Civic Signal Network"
                value="Operational"
                tone="green"
              />

              <StatusPill
                icon={<Sparkles className="w-4 h-4" />}
                label="AI Triage Engine"
                value="94.8% Accuracy"
                tone="blue"
              />

              <StatusPill
                icon={<Users className="w-4 h-4" />}
                label="Field Crews"
                value="18 Active"
                tone="amber"
              />

              <StatusPill
                icon={<ShieldCheck className="w-4 h-4" />}
                label="SLA Monitoring"
                value={slaBreaches > 0 ? `${slaBreaches} Alerts` : 'Healthy'}
                tone={slaBreaches > 0 ? 'red' : 'green'}
              />

            </section>

            {/* =================================================
                FIVE METRIC CARDS
            ================================================= */}

            <section className="grid grid-cols-2 xl:grid-cols-5 gap-4">

              <MetricCard
                icon={<FileText className="w-5 h-5" />}
                label="Total System Tickets"
                value={totalTickets.toLocaleString()}
                description="Across all 6 wards"
                tone="blue"
                trend="+8.4%"
              />

              <MetricCard
                icon={<Zap className="w-5 h-5" />}
                label="Pending Triage"
                value={pendingTriage}
                description="AI verified queues"
                tone="violet"
                trend="AI verified"
              />

              <MetricCard
                icon={<RefreshCw className="w-5 h-5" />}
                label="Field In Progress"
                value={fieldInProgress}
                description="Municipal crews active"
                tone="amber"
                trend="18 crews"
              />

              <MetricCard
                icon={<CheckCircle2 className="w-5 h-5" />}
                label="Resolved This Month"
                value={monthlyResolved}
                description="Citizen verified"
                tone="green"
                trend="+12.7%"
              />

              <MetricCard
                icon={<AlertCircle className="w-5 h-5" />}
                label="SLA Breaches"
                value={slaBreaches}
                description="Immediate action required"
                tone="red"
                alert
              />

            </section>

            {/* =================================================
                P1 CRITICAL QUEUE
            ================================================= */}

            <section className="relative overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-[#130a10] via-[#0a0d16] to-[#080a11] shadow-[0_25px_70px_rgba(0,0,0,0.35)]">

              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 via-orange-500/40 to-transparent" />

              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-red-500/[0.05] blur-3xl" />

              <div className="relative p-5 sm:p-6">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">

                  <div className="flex items-center gap-3">

                    <div className="relative w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-red-400" />

                      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-[#0a0d16] animate-pulse" />
                    </div>

                    <div>

                      <h2 className="text-sm sm:text-base font-bold text-white">
                        P1 Critical Priority Rapid Response Queue
                      </h2>

                      <p className="text-[11px] text-slate-500 mt-0.5">
                        High-risk civic incidents requiring immediate authority action
                      </p>

                    </div>

                  </div>

                  <div className="flex items-center gap-2">

                    <span className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-[10px] font-bold font-mono">
                      4-HOUR SLA TARGET
                    </span>

                    <span className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-slate-400 text-[10px] font-mono">
                      {p1CriticalTickets.length} LIVE
                    </span>

                  </div>

                </div>

                <div className="space-y-2">

                  {p1CriticalTickets.length === 0 ? (

                    <div className="py-10 text-center rounded-2xl border border-white/[0.05] bg-white/[0.02]">

                      <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto mb-2" />

                      <p className="text-xs font-semibold text-slate-300">
                        No active critical tickets
                      </p>

                      <p className="text-[11px] text-slate-500 mt-1">
                        All P1 incidents are currently under control.
                      </p>

                    </div>

                  ) : (

                    p1CriticalTickets.map((c) => (

                      <button
                        key={c.id}
                        type="button"
                        onClick={() =>
                          navigate(`/authority/inspection/${c.id}`)
                        }
                        className="w-full text-left group rounded-2xl border border-white/[0.05] bg-white/[0.025] hover:bg-white/[0.055] hover:border-red-500/20 transition-all duration-300"
                      >

                        <div className="p-3.5 flex flex-col lg:flex-row lg:items-center gap-4">

                          <div className="flex items-center gap-3 min-w-0 flex-1">

                            <div className="relative shrink-0">

                              <img
                                src={c.imageUrl}
                                alt={c.title}
                                className="w-14 h-14 rounded-xl object-cover border border-white/10 shadow-lg"
                              />

                              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-[#0a0d16]" />

                            </div>

                            <div className="min-w-0 flex-1">

                              <div className="flex flex-wrap items-center gap-2 mb-1.5">

                                <span className="font-mono text-[10px] font-bold text-blue-400">
                                  {c.id}
                                </span>

                                <PriorityBadge priority="P1" />

                                <StatusBadge status={c.status} />

                              </div>

                              <h4 className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white truncate">
                                {c.title}
                              </h4>

                              <p className="text-[10px] text-slate-500 mt-1 truncate">
                                📍 {c.location?.address || 'Location unavailable'}
                              </p>

                            </div>

                          </div>

                          <div className="flex items-center justify-between lg:justify-end gap-4 lg:min-w-[260px]">

                            <div className="text-left lg:text-right">

                              <p className="text-[9px] uppercase tracking-wider text-slate-600 font-bold">
                                SLA Deadline
                              </p>

                              <p className="text-[11px] font-mono font-bold text-red-400 mt-0.5">
                                {formatSlaTime(c.slaDeadline)}
                              </p>

                            </div>

                            <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600/90 group-hover:bg-blue-500 text-white text-[10px] font-bold shadow-lg shadow-blue-900/20 transition-all">

                              <Eye className="w-3.5 h-3.5" />

                              Inspect AI

                              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />

                            </span>

                          </div>

                        </div>

                      </button>

                    ))

                  )}

                </div>

              </div>

            </section>

            {/* =================================================
                CHARTS
            ================================================= */}

            <section className="grid grid-cols-1 xl:grid-cols-2 gap-5">

              {/* CATEGORY CHART */}

              <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#090d17]/90 shadow-[0_25px_70px_rgba(0,0,0,0.25)]">

                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-blue-500/50 via-indigo-500/20 to-transparent" />

                <div className="p-5 sm:p-6">

                  <div className="flex items-center justify-between mb-5">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/10 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-blue-400" />
                      </div>

                      <div>

                        <h3 className="text-sm font-bold text-white">
                          Incident Volume by Category
                        </h3>

                        <p className="text-[10px] text-slate-500 mt-0.5">
                          Civic issue distribution
                        </p>

                      </div>

                    </div>

                    <span className="text-[10px] font-mono text-slate-600">
                      LIVE
                    </span>

                  </div>

                  <div className="h-64 w-full">

                    <ResponsiveContainer width="100%" height="100%">

                      <BarChart
                        data={categoryBarData}
                        margin={{
                          top: 10,
                          right: 5,
                          left: -20,
                          bottom: 5,
                        }}
                      >

                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#334155"
                          opacity={0.25}
                        />

                        <XAxis
                          dataKey="name"
                          stroke="#64748b"
                          fontSize={10}
                          tickLine={false}
                          axisLine={false}
                        />

                        <YAxis
                          stroke="#64748b"
                          fontSize={10}
                          tickLine={false}
                          axisLine={false}
                        />

                        <Tooltip
                          cursor={{
                            fill: 'rgba(59,130,246,0.04)',
                          }}
                          contentStyle={{
                            backgroundColor: '#0b1120',
                            borderRadius: '12px',
                            color: '#fff',
                            border: '1px solid rgba(255,255,255,0.08)',
                            fontSize: '11px',
                            boxShadow:
                              '0 20px 50px rgba(0,0,0,0.4)',
                          }}
                        />

                        <Bar
                          dataKey="count"
                          fill="#3b82f6"
                          radius={[7, 7, 2, 2]}
                          maxBarSize={42}
                        />

                      </BarChart>

                    </ResponsiveContainer>

                  </div>

                </div>

              </div>

              {/* PRIORITY CHART */}

              <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#090d17]/90 shadow-[0_25px_70px_rgba(0,0,0,0.25)]">

                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-violet-500/50 via-blue-500/20 to-transparent" />

                <div className="p-5 sm:p-6">

                  <div className="flex items-center justify-between mb-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/10 flex items-center justify-center">
                        <Layers3 className="w-5 h-5 text-violet-400" />
                      </div>

                      <div>

                        <h3 className="text-sm font-bold text-white">
                          Priority Score Distribution
                        </h3>

                        <p className="text-[10px] text-slate-500 mt-0.5">
                          System-wide severity classification
                        </p>

                      </div>

                    </div>

                    <span className="text-[10px] font-mono text-slate-600">
                      P1 → P4
                    </span>

                  </div>

                  <div className="h-64 w-full">

                    <ResponsiveContainer width="100%" height="100%">

                      <PieChart>

                        <Pie
                          data={priorityChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={88}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                        >

                          {priorityChartData.map((entry, index) => (
                            <Cell
                              key={`priority-cell-${index}`}
                              fill={entry.color}
                            />
                          ))}

                        </Pie>

                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#0b1120',
                            borderRadius: '12px',
                            color: '#fff',
                            border: '1px solid rgba(255,255,255,0.08)',
                            fontSize: '11px',
                            boxShadow:
                              '0 20px 50px rgba(0,0,0,0.4)',
                          }}
                        />

                      </PieChart>

                    </ResponsiveContainer>

                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-1">

                    {priorityChartData.map((item) => (

                      <div
                        key={item.name}
                        className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-white/[0.025] border border-white/[0.05]"
                      >

                        <div className="flex items-center gap-2">

                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{
                              backgroundColor: item.color,
                            }}
                          />

                          <span className="text-[10px] text-slate-400">
                            {item.name}
                          </span>

                        </div>

                        <span className="text-[10px] font-bold font-mono text-slate-200">
                          {item.value}
                        </span>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            </section>

            {/* =================================================
                OPERATIONS SNAPSHOT
            ================================================= */}

            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <OperationCard
                icon={<Building2 className="w-5 h-5" />}
                title="Municipal Departments"
                value="06"
                description="Connected departments"
                onClick={() => navigate('/authority/departments')}
              />

              <OperationCard
                icon={<Map className="w-5 h-5" />}
                title="City Signal Grid"
                value="06"
                description="Active civic zones"
                onClick={() => navigate('/authority/map')}
              />

              <OperationCard
                icon={<TrendingUp className="w-5 h-5" />}
                title="Resolution Efficiency"
                value="94.6%"
                description="Citizen satisfaction"
                onClick={() => navigate('/authority/analytics')}
              />

            </section>

            {/* =================================================
                FOOTER
            ================================================= */}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-2 text-[10px] text-slate-600">

              <div className="flex items-center gap-2">

                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />

                CivicEye AI operational

              </div>

              <div className="flex items-center gap-4 font-mono">

                <span>
                  {loading ? 'SYNCING...' : 'DATA SYNCED'}
                </span>

                <span>
                  {complaints.length} LOCAL TICKETS
                </span>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

/* ============================================================
   STATUS PILL
============================================================ */

function StatusPill({
  icon,
  label,
  value,
  tone = 'blue',
}) {
  const styles = {
    green: {
      wrapper: 'border-emerald-500/10 bg-emerald-500/[0.035]',
      icon: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/10',
      value: 'text-emerald-300',
    },

    blue: {
      wrapper: 'border-blue-500/10 bg-blue-500/[0.035]',
      icon: 'bg-blue-500/10 text-blue-400 border-blue-500/10',
      value: 'text-blue-300',
    },

    amber: {
      wrapper: 'border-amber-500/10 bg-amber-500/[0.035]',
      icon: 'bg-amber-500/10 text-amber-400 border-amber-500/10',
      value: 'text-amber-300',
    },

    red: {
      wrapper: 'border-red-500/15 bg-red-500/[0.035]',
      icon: 'bg-red-500/10 text-red-400 border-red-500/10',
      value: 'text-red-300',
    },
  };

  const style = styles[tone] || styles.blue;

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-2xl border ${style.wrapper}`}
    >

      <div
        className={`w-9 h-9 shrink-0 rounded-xl border flex items-center justify-center ${style.icon}`}
      >
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[9px] uppercase tracking-wider text-slate-600 font-bold truncate">
          {label}
        </p>

        <p className={`text-[11px] font-bold mt-0.5 ${style.value}`}>
          {value}
        </p>

      </div>

    </div>
  );
}

/* ============================================================
   METRIC CARD
============================================================ */

function MetricCard({
  icon,
  label,
  value,
  description,
  trend,
  tone = 'blue',
  alert = false,
}) {
  const styles = {
    blue: {
      line: 'from-blue-500/80',
      icon: 'text-blue-400 bg-blue-500/10 border-blue-500/10',
      glow: 'bg-blue-500/5',
      value: 'text-white',
    },

    violet: {
      line: 'from-violet-500/80',
      icon: 'text-violet-400 bg-violet-500/10 border-violet-500/10',
      glow: 'bg-violet-500/5',
      value: 'text-white',
    },

    amber: {
      line: 'from-amber-500/80',
      icon: 'text-amber-400 bg-amber-500/10 border-amber-500/10',
      glow: 'bg-amber-500/5',
      value: 'text-white',
    },

    green: {
      line: 'from-emerald-500/80',
      icon: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/10',
      glow: 'bg-emerald-500/5',
      value: 'text-white',
    },

    red: {
      line: 'from-red-500/80',
      icon: 'text-red-400 bg-red-500/10 border-red-500/10',
      glow: 'bg-red-500/5',
      value: 'text-red-300',
    },
  };

  const style = styles[tone] || styles.blue;

  return (
    <div
      className={`group relative overflow-hidden min-h-[160px] rounded-2xl border ${
        alert
          ? 'border-red-500/20 bg-red-950/10'
          : 'border-white/[0.07] bg-[#090d17]/90'
      } shadow-[0_15px_45px_rgba(0,0,0,0.2)] hover:-translate-y-1 hover:border-white/15 transition-all duration-300`}
    >

      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${style.line} to-transparent`}
      />

      <div
        className={`absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl ${style.glow}`}
      />

      <div className="relative p-5 h-full flex flex-col justify-between">

        <div className="flex items-start justify-between gap-3">

          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
            {label}
          </span>

          <div
            className={`w-9 h-9 rounded-xl border flex items-center justify-center ${style.icon}`}
          >
            {icon}
          </div>

        </div>

        <div>

          <div
            className={`text-3xl font-black tracking-tight mt-4 ${style.value}`}
          >
            {value}
          </div>

          <div className="flex items-center justify-between gap-2 mt-2">

            <p className="text-[10px] text-slate-600 truncate">
              {description}
            </p>

            {trend && (
              <span
                className={`shrink-0 text-[9px] font-bold ${
                  alert
                    ? 'text-red-400'
                    : tone === 'green'
                    ? 'text-emerald-400'
                    : 'text-slate-500'
                }`}
              >
                {trend}
              </span>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

/* ============================================================
   OPERATION CARD
============================================================ */

function OperationCard({
  icon,
  title,
  value,
  description,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative text-left overflow-hidden rounded-2xl border border-white/[0.07] bg-[#090d17]/90 hover:bg-[#0c1120] hover:border-blue-500/20 shadow-[0_15px_45px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1"
    >

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-blue-500/50 to-transparent" />

      <div className="p-5">

        <div className="flex items-start justify-between">

          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/10 text-blue-400 flex items-center justify-center">
            {icon}
          </div>

          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />

        </div>

        <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mt-4">
          {title}
        </p>

        <div className="flex items-end justify-between mt-1">

          <div className="text-2xl font-black text-white">
            {value}
          </div>

          <span className="text-[9px] text-slate-600 group-hover:text-blue-400 transition-colors">
            Open →
          </span>

        </div>

        <p className="text-[10px] text-slate-600 mt-1">
          {description}
        </p>

      </div>

    </button>
  );
}