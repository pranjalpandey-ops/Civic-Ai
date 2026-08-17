import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  FileText,
  Clock,
  RotateCw,
  CheckCircle2,
  Search,
  MapPin,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Activity,
  ShieldCheck,
  Navigation,
  TrendingUp,
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useComplaints } from '../../context/ComplaintContext';
import { Sidebar } from '../../components/common/Sidebar';
import { StatusBadge } from '../../components/common/Badge';
import { LeafletMap } from '../../components/maps/LeafletMap';

export function CitizenDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { complaints } = useComplaints();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  /* =========================================================
     USER
  ========================================================= */

  const displayName = useMemo(() => {
    const name = user?.name?.trim();

    if (name) {
      return name.split(/\s+/)[0];
    }

    return user?.email?.split('@')[0] || 'Citizen';
  }, [user]);

  /* =========================================================
     CITIZEN COMPLAINTS
  ========================================================= */

  const citizenComplaints = useMemo(() => {
    return complaints.filter(
      (c) =>
        c.citizenId === user?.id ||
        c.citizenId === 'usr_citizen_1'
    );
  }, [complaints, user?.id]);

  /* =========================================================
     COUNTERS
  ========================================================= */

  const activeCount = citizenComplaints.filter((c) =>
    ['Reported', 'AI Verified', 'Assigned'].includes(c.status)
  ).length;

  const inProgressCount = citizenComplaints.filter(
    (c) => c.status === 'In Progress'
  ).length;

  const resolvedCount = citizenComplaints.filter((c) =>
    ['Resolved', 'Citizen Verified', 'Closed'].includes(c.status)
  ).length;

  /* =========================================================
     SEARCH
  ========================================================= */

  const filteredReports = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return citizenComplaints;

    return citizenComplaints.filter((c) => {
      const title = c.title?.toLowerCase() || '';
      const id = c.id?.toLowerCase() || '';
      const address =
        c.location?.address?.toLowerCase() || '';

      return (
        title.includes(query) ||
        id.includes(query) ||
        address.includes(query)
      );
    });
  }, [citizenComplaints, searchTerm]);

  /* =========================================================
     RECENT REPORTS
  ========================================================= */

  const recentReports = useMemo(() => {
    return [...filteredReports]
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      )
      .slice(0, 4);
  }, [filteredReports]);

  /* =========================================================
     PRIORITY
  ========================================================= */

  const getPriority = (priority) => {
    switch (priority) {
      case 'P1':
        return {
          label: 'Critical',
          color: 'text-red-400',
          dot: 'bg-red-500',
        };

      case 'P2':
        return {
          label: 'High',
          color: 'text-orange-400',
          dot: 'bg-orange-500',
        };

      case 'P3':
        return {
          label: 'Medium',
          color: 'text-amber-400',
          dot: 'bg-amber-500',
        };

      default:
        return {
          label: 'Low',
          color: 'text-slate-400',
          dot: 'bg-slate-500',
        };
    }
  };

  return (
    <div
      className="
        relative
        flex
        min-h-screen
        overflow-x-hidden
        bg-[#070b12]
        text-slate-100
        transition-colors
        duration-300
      "
    >

      {/* =====================================================
          PREMIUM AMBIENT BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div
          className="
            absolute
            -left-40
            top-32
            h-[420px]
            w-[420px]
            rounded-full
            bg-blue-600/[0.055]
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            right-[-180px]
            top-[35%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-violet-600/[0.045]
            blur-[140px]
          "
        />

        <div
          className="
            absolute
            bottom-[-180px]
            left-[35%]
            h-[420px]
            w-[420px]
            rounded-full
            bg-cyan-500/[0.035]
            blur-[130px]
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.018]
            [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)]
            [background-size:42px_42px]
          "
        />

      </div>

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar type="citizen" />

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="relative z-10 min-w-0 flex-1 p-5 sm:p-7 lg:p-10">

        <div className="mx-auto max-w-7xl">

          <div className="space-y-8">

            {/* =================================================
                HEADER
            ================================================= */}

            <header
              className="
                flex
                flex-col
                gap-5
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >

              <div className="min-w-0">

                <div
                  className="
                    mb-2
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-blue-500/10
                    bg-blue-500/[0.07]
                    px-3
                    py-1.5
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[0.16em]
                    text-blue-400
                    shadow-[0_0_25px_rgba(59,130,246,0.06)]
                  "
                >
                  <Sparkles className="h-3 w-3" />

                  Citizen Intelligence

                </div>

                <h1
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-2
                    text-2xl
                    font-black
                    tracking-[-0.045em]
                    text-white
                    sm:text-3xl
                  "
                >
                  {t('goodMorning') || 'Good morning'},

                  <span
                    className="
                      bg-gradient-to-r
                      from-blue-400
                      via-violet-400
                      to-cyan-400
                      bg-clip-text
                      text-transparent
                    "
                  >
                    {displayName}
                  </span>

                  <span>👋</span>

                </h1>

                <p
                  className="
                    mt-2
                    max-w-2xl
                    text-xs
                    leading-6
                    text-slate-500
                    sm:text-sm
                  "
                >
                  Your civic activity, reports, and city intelligence
                  — all in one place.
                </p>

              </div>

              {/* SEARCH */}

              <div className="relative w-full lg:w-80">

                <Search
                  className="
                    absolute
                    left-3.5
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-slate-500
                  "
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  placeholder="Search reports or locations..."
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-white/[0.07]
                    bg-white/[0.025]
                    pl-10
                    pr-4
                    text-xs
                    font-medium
                    text-white
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]
                    outline-none
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    placeholder:text-slate-600
                    focus:border-blue-500/30
                    focus:bg-blue-500/[0.025]
                    focus:ring-4
                    focus:ring-blue-500/[0.06]
                  "
                />

              </div>

            </header>

            {/* =================================================
                PREMIUM HERO
            ================================================= */}

            <section
              className="
                group
                relative
                overflow-hidden
                rounded-[26px]
                border
                border-blue-400/10
                bg-gradient-to-br
                from-[#123fbb]
                via-[#3349cf]
                to-[#6844d4]
                p-6
                shadow-[0_25px_80px_rgba(37,99,235,0.12)]
                transition-all
                duration-500
                hover:-translate-y-1
                hover:shadow-[0_35px_100px_rgba(37,99,235,0.18)]
                sm:p-8
              "
            >

              {/* Ambient glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-24
                  -top-32
                  h-[380px]
                  w-[380px]
                  rounded-full
                  bg-cyan-300/20
                  blur-[90px]
                  transition-transform
                  duration-700
                  group-hover:scale-110
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-40
                  left-1/3
                  h-[360px]
                  w-[360px]
                  rounded-full
                  bg-violet-300/20
                  blur-[100px]
                "
              />

              {/* Grid */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  opacity-[0.05]
                  [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)]
                  [background-size:32px_32px]
                "
              />

              {/* 3D orb */}

              <div
                className="
                  pointer-events-none
                  absolute
                  right-[-40px]
                  top-1/2
                  hidden
                  h-52
                  w-52
                  -translate-y-1/2
                  rounded-full
                  border
                  border-white/[0.08]
                  bg-white/[0.025]
                  shadow-[inset_0_0_80px_rgba(255,255,255,0.04),0_0_80px_rgba(59,130,246,0.12)]
                  lg:block
                "
                style={{
                  transform:
                    'translateY(-50%) perspective(700px) rotateX(62deg) rotateZ(25deg)',
                }}
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  right-[30px]
                  top-1/2
                  hidden
                  h-32
                  w-32
                  -translate-y-1/2
                  rounded-full
                  border
                  border-cyan-200/10
                  lg:block
                "
                style={{
                  transform:
                    'translateY(-50%) perspective(700px) rotateX(62deg) rotateZ(-20deg)',
                }}
              />

              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                <div className="max-w-2xl">

                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-white/10
                      bg-white/10
                      px-3
                      py-1.5
                      text-[9px]
                      font-black
                      uppercase
                      tracking-[0.16em]
                      text-blue-50
                      backdrop-blur-md
                    "
                  >
                    <Activity className="h-3 w-3" />

                    AI-powered civic reporting

                  </div>

                  <h2
                    className="
                      mt-4
                      text-2xl
                      font-black
                      tracking-[-0.045em]
                      text-white
                      sm:text-3xl
                    "
                  >
                    See something wrong?

                    <br />

                    <span className="text-blue-100">
                      Turn it into action.
                    </span>

                  </h2>

                  <p
                    className="
                      mt-3
                      max-w-xl
                      text-xs
                      leading-6
                      text-blue-100/80
                      sm:text-sm
                    "
                  >
                    Capture a civic issue, let AI analyze it,
                    and send it to the right department with
                    intelligent priority and location routing.
                  </p>

                </div>

                <button
                  onClick={() => navigate('/report')}
                  className="
                    group/button
                    relative
                    inline-flex
                    h-12
                    shrink-0
                    items-center
                    justify-center
                    gap-2
                    overflow-hidden
                    rounded-xl
                    bg-white
                    px-5
                    text-xs
                    font-black
                    text-blue-700
                    shadow-[0_12px_35px_rgba(0,0,0,0.18)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:scale-[1.02]
                    hover:shadow-[0_18px_45px_rgba(0,0,0,0.25)]
                  "
                >

                  <span
                    className="
                      absolute
                      inset-0
                      -translate-x-full
                      bg-gradient-to-r
                      from-transparent
                      via-blue-100/60
                      to-transparent
                      transition-transform
                      duration-700
                      group-hover/button:translate-x-full
                    "
                  />

                  <PlusCircle className="relative h-4 w-4" />

                  <span className="relative">
                    Report an Issue
                  </span>

                  <ArrowRight
                    className="
                      relative
                      h-3.5
                      w-3.5
                      transition-transform
                      duration-300
                      group-hover/button:translate-x-1
                    "
                  />

                </button>

              </div>

            </section>

            {/* =================================================
                METRIC CARDS
            ================================================= */}

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

              <MetricCard
                label={t('totalReports')}
                value={citizenComplaints.length}
                icon={FileText}
                accent="blue"
              />

              <MetricCard
                label={t('active')}
                value={activeCount}
                icon={Clock}
                accent="violet"
              />

              <MetricCard
                label={t('inProgress')}
                value={inProgressCount}
                icon={RotateCw}
                accent="amber"
              />

              <MetricCard
                label={t('resolved')}
                value={resolvedCount}
                icon={CheckCircle2}
                accent="emerald"
              />

            </div>

            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

              {/* =================================================
                  REPORTS
              ================================================= */}

              <div className="min-w-0 space-y-4 lg:col-span-7">

                <SectionHeading
                  icon={FileText}
                  title={t('recentReports')}
                  subtitle="Your latest civic activity"
                >
                  <Link
                    to="/citizen/complaints"
                    className="
                      group
                      inline-flex
                      items-center
                      gap-1
                      text-[10px]
                      font-black
                      text-blue-400
                      transition-colors
                      hover:text-blue-300
                    "
                  >
                    {t('viewAll')}

                    <ArrowRight
                      className="
                        h-3.5
                        w-3.5
                        transition-transform
                        group-hover:translate-x-1
                      "
                    />
                  </Link>
                </SectionHeading>

                <div className="space-y-3">

                  {recentReports.length === 0 ? (

                    <div
                      className="
                        rounded-2xl
                        border
                        border-dashed
                        border-white/[0.08]
                        bg-white/[0.02]
                        px-6
                        py-12
                        text-center
                      "
                    >

                      <FileText className="mx-auto h-7 w-7 text-slate-600" />

                      <p className="mt-3 text-sm font-bold text-slate-300">
                        {searchTerm
                          ? 'No matching reports'
                          : 'No reports yet'}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-600">
                        Your civic reports will appear here.
                      </p>

                    </div>

                  ) : (

                    recentReports.map((c) => {

                      const priority = getPriority(c.priority);

                      return (
                        <ReportCard
                          key={c.id}
                          complaint={c}
                          priority={priority}
                          onClick={() =>
                            navigate(`/complaints/${c.id}`)
                          }
                        />
                      );
                    })

                  )}

                </div>

              </div>

              {/* =================================================
                  MAP
              ================================================= */}

              <div className="min-w-0 space-y-4 lg:col-span-5">

                <SectionHeading
                  icon={Navigation}
                  title={t('nearbyIssues')}
                  subtitle="Live civic activity around your city"
                >
                  <Link
                    to="/map"
                    className="
                      group
                      inline-flex
                      items-center
                      gap-1
                      text-[10px]
                      font-black
                      text-blue-400
                      transition-colors
                      hover:text-blue-300
                    "
                  >
                    Full Map

                    <ArrowRight
                      className="
                        h-3.5
                        w-3.5
                        transition-transform
                        group-hover:translate-x-1
                      "
                    />
                  </Link>
                </SectionHeading>

                <div
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[22px]
                    border
                    border-white/[0.07]
                    bg-[#0b111c]
                    p-1.5
                    shadow-[0_20px_60px_rgba(0,0,0,0.18)]
                    transition-all
                    duration-500
                    hover:-translate-y-1
                    hover:border-blue-500/15
                    hover:shadow-[0_28px_70px_rgba(0,0,0,0.25)]
                  "
                >

                  <div
                    className="
                      relative
                      h-[300px]
                      overflow-hidden
                      rounded-[16px]
                      sm:h-[330px]
                    "
                  >

                    <LeafletMap
                      complaints={complaints}
                      center={[28.6280, 77.3649]}
                      zoom={12}
                      height="100%"
                    />

                    <div
                      className="
                        absolute
                        left-3
                        top-3
                        z-[400]
                        flex
                        items-center
                        gap-2
                        rounded-lg
                        border
                        border-white/60
                        bg-white/90
                        px-2.5
                        py-1.5
                        shadow-xl
                        backdrop-blur-xl
                      "
                    >

                      <span className="relative flex h-2 w-2">

                        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-70" />

                        <span className="relative h-2 w-2 rounded-full bg-emerald-500" />

                      </span>

                      <span
                        className="
                          text-[8px]
                          font-black
                          uppercase
                          tracking-[0.13em]
                          text-slate-700
                        "
                      >
                        Live Civic Signals
                      </span>

                    </div>

                  </div>

                </div>

                {/* MAP STATS */}

                <div className="grid grid-cols-2 gap-3">

                  <MiniStat
                    icon={MapPin}
                    label="City Signals"
                    value={complaints.length}
                    color="blue"
                  />

                  <MiniStat
                    icon={ShieldCheck}
                    label="Your Resolved"
                    value={resolvedCount}
                    color="emerald"
                  />

                </div>

              </div>

            </div>

            {/* =================================================
                QUICK ACTIONS
            ================================================= */}

            <div
              className="
                grid
                grid-cols-1
                gap-3
                sm:grid-cols-3
              "
            >

              <QuickAction
                icon={PlusCircle}
                title="Report an Issue"
                description="Submit a new civic complaint"
                onClick={() => navigate('/report')}
              />

              <QuickAction
                icon={FileText}
                title="My Complaints"
                description="Track your report history"
                onClick={() =>
                  navigate('/citizen/complaints')
                }
              />

              <QuickAction
                icon={MapPin}
                title="Explore City Map"
                description="Discover live civic activity"
                onClick={() => navigate('/map')}
              />

            </div>

          </div>

        </div>

      </main>
    </div>
  );
}

/* =============================================================
   METRIC CARD
============================================================= */

function MetricCard({
  label,
  value,
  icon: Icon,
  accent,
}) {
  const styles = {
    blue: {
      icon: 'text-blue-400',
      bg: 'bg-blue-500/10',
      glow: 'from-blue-500 to-cyan-400',
      shadow: 'hover:shadow-blue-500/[0.07]',
    },

    violet: {
      icon: 'text-violet-400',
      bg: 'bg-violet-500/10',
      glow: 'from-violet-500 to-fuchsia-400',
      shadow: 'hover:shadow-violet-500/[0.07]',
    },

    amber: {
      icon: 'text-amber-400',
      bg: 'bg-amber-500/10',
      glow: 'from-amber-500 to-orange-400',
      shadow: 'hover:shadow-amber-500/[0.07]',
    },

    emerald: {
      icon: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      glow: 'from-emerald-500 to-cyan-400',
      shadow: 'hover:shadow-emerald-500/[0.07]',
    },
  };

  const style = styles[accent];

  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.07]
        bg-[#0b111c]
        p-4
        shadow-[0_12px_35px_rgba(0,0,0,0.12)]
        transition-all
        duration-500
        hover:-translate-y-2
        hover:[transform:perspective(800px)_rotateX(2deg)_rotateY(-2deg)]
        ${style.shadow}
        sm:p-5
      `}
    >

      {/* Top gradient */}

      <div
        className={`
          absolute
          left-0
          right-0
          top-0
          h-[2px]
          bg-gradient-to-r
          ${style.glow}
        `}
      />

      {/* Hover glow */}

      <div
        className={`
          pointer-events-none
          absolute
          -right-10
          -top-10
          h-24
          w-24
          rounded-full
          bg-gradient-to-br
          ${style.glow}
          opacity-0
          blur-3xl
          transition-opacity
          duration-500
          group-hover:opacity-20
        `}
      />

      <div className="relative flex items-start justify-between">

        <div>

          <p
            className="
              text-[8px]
              font-black
              uppercase
              tracking-[0.14em]
              text-slate-500
            "
          >
            {label}
          </p>

          <p
            className="
              mt-3
              text-3xl
              font-black
              tracking-[-0.05em]
              text-white
            "
          >
            {value}
          </p>

        </div>

        <div
          className={`
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            ${style.bg}
            shadow-inner
            transition-all
            duration-500
            group-hover:scale-110
            group-hover:rotate-3
          `}
        >
          <Icon
            className={`
              h-4
              w-4
              ${style.icon}
            `}
          />
        </div>

      </div>

      <div className="relative mt-4 flex items-center gap-1.5">

        <span
          className="
            h-1.5
            w-1.5
            rounded-full
            bg-emerald-400
            shadow-[0_0_8px_rgba(52,211,153,0.5)]
          "
        />

        <span className="text-[8px] font-bold text-slate-500">
          Live data
        </span>

      </div>

    </div>
  );
}

/* =============================================================
   SECTION HEADING
============================================================= */

function SectionHeading({
  icon: Icon,
  title,
  subtitle,
  children,
}) {
  return (
    <div className="flex items-center justify-between gap-4">

      <div className="flex min-w-0 items-center gap-2.5">

        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-blue-500/10
            bg-blue-500/[0.07]
            shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]
          "
        >
          <Icon className="h-4 w-4 text-blue-400" />
        </div>

        <div className="min-w-0">

          <h2
            className="
              text-sm
              font-black
              tracking-tight
              text-white
            "
          >
            {title}
          </h2>

          <p className="mt-0.5 truncate text-[9px] text-slate-600">
            {subtitle}
          </p>

        </div>

      </div>

      {children}

    </div>
  );
}

/* =============================================================
   REPORT CARD
============================================================= */

function ReportCard({
  complaint,
  priority,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className="
        group
        relative
        cursor-pointer
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.07]
        bg-[#0b111c]
        p-4
        shadow-[0_10px_30px_rgba(0,0,0,0.1)]
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-blue-500/20
        hover:shadow-[0_20px_50px_rgba(0,0,0,0.22)]
        hover:[transform:perspective(900px)_rotateX(1deg)_rotateY(-1deg)]
      "
    >

      {/* Priority rail */}

      <div
        className={`
          absolute
          bottom-0
          left-0
          top-0
          w-[3px]
          ${priority.dot}
        `}
      />

      {/* Hover gradient */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-r
          from-blue-500/[0.025]
          via-transparent
          to-violet-500/[0.02]
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      <div className="relative flex items-center gap-3">

        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap items-center gap-2">

            <span
              className="
                font-mono
                text-[9px]
                font-black
                tracking-wider
                text-blue-400
              "
            >
              #{complaint.id}
            </span>

            <StatusBadge status={complaint.status} />

          </div>

          <h3
            className="
              mt-1.5
              truncate
              text-sm
              font-black
              tracking-tight
              text-white
              transition-colors
              group-hover:text-blue-400
            "
          >
            {complaint.title}
          </h3>

          <div
            className="
              mt-2.5
              flex
              flex-wrap
              items-center
              gap-x-4
              gap-y-1.5
            "
          >

            <span
              className="
                flex
                min-w-0
                items-center
                gap-1
                text-[10px]
                text-slate-500
              "
            >
              <MapPin className="h-3 w-3 shrink-0" />

              <span className="max-w-[260px] truncate">
                {complaint.location?.address ||
                  'Location unavailable'}
              </span>
            </span>

            <span
              className={`
                text-[10px]
                font-bold
                ${priority.color}
              `}
            >
              {priority.label} Priority
            </span>

          </div>

        </div>

        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-white/[0.05]
            bg-white/[0.025]
            text-slate-600
            transition-all
            duration-300
            group-hover:border-blue-500/10
            group-hover:bg-blue-500/10
            group-hover:text-blue-400
          "
        >
          <ChevronRight
            className="
              h-4
              w-4
              transition-transform
              duration-300
              group-hover:translate-x-0.5
            "
          />
        </div>

      </div>

    </div>
  );
}

/* =============================================================
   MINI MAP STAT
============================================================= */

function MiniStat({
  icon: Icon,
  label,
  value,
  color,
}) {
  const iconColor =
    color === 'emerald'
      ? 'text-emerald-400'
      : 'text-blue-400';

  const bgColor =
    color === 'emerald'
      ? 'bg-emerald-500/10'
      : 'bg-blue-500/10';

  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-white/[0.07]
        bg-[#0b111c]
        p-4
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-white/[0.1]
      "
    >

      <div className="flex items-center gap-2">

        <div
          className={`
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-lg
            ${bgColor}
          `}
        >
          <Icon className={`h-3.5 w-3.5 ${iconColor}`} />
        </div>

        <span className="text-[9px] font-bold text-slate-500">
          {label}
        </span>

      </div>

      <div className="mt-3 flex items-end justify-between">

        <span
          className={`
            text-xl
            font-black
            tracking-tight
            ${
              color === 'emerald'
                ? 'text-emerald-400'
                : 'text-white'
            }
          `}
        >
          {value}
        </span>

        <TrendingUp
          className="
            h-3.5
            w-3.5
            text-slate-700
            transition-colors
            group-hover:text-blue-400
          "
        />

      </div>

    </div>
  );
}

/* =============================================================
   QUICK ACTION
============================================================= */

function QuickAction({
  icon: Icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="
        group
        relative
        flex
        min-w-0
        items-center
        gap-3
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.07]
        bg-[#0b111c]
        p-4
        text-left
        shadow-sm
        transition-all
        duration-400
        hover:-translate-y-1
        hover:border-blue-500/20
        hover:shadow-[0_15px_40px_rgba(0,0,0,0.18)]
      "
    >

      <div
        className="
          absolute
          inset-y-0
          left-0
          w-1
          bg-gradient-to-b
          from-blue-500
          to-violet-500
          opacity-0
          transition-opacity
          group-hover:opacity-100
        "
      />

      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          border
          border-blue-500/10
          bg-blue-500/[0.07]
          transition-all
          duration-300
          group-hover:scale-105
          group-hover:bg-blue-500/10
        "
      >
        <Icon className="h-4 w-4 text-blue-400" />
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-xs font-black text-white">
          {title}
        </p>

        <p className="mt-0.5 truncate text-[9px] text-slate-600">
          {description}
        </p>

      </div>

      <ArrowRight
        className="
          h-4
          w-4
          shrink-0
          text-slate-700
          transition-all
          duration-300
          group-hover:translate-x-1
          group-hover:text-blue-400
        "
      />

    </button>
  );
}