import React, { useState } from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import {
  Shield,
  Sparkles,
  AlertCircle,
  MapPin,
  Search,
  CheckCircle2,
  BrainCircuit,
  Route,
  Eye,
  ArrowRight,
  Activity,
  Clock3,
  Users,
  Zap,
  Map,
  Radio,
  Database,
  ChevronRight,
  Globe2,
  Cpu,
  Layers3,
  Radar,
  ScanLine,
  CircleDot,
} from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';
import { useComplaints } from '../context/ComplaintContext';
import { useTheme } from '../context/ThemeContext';
import { LeafletMap } from '../components/maps/LeafletMap';

export function LandingPage() {
  const { t } = useLanguage();
  const { isDark = true } = useTheme() || {};

  const navigate = useNavigate();

  const { complaints = [] } = useComplaints();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    navigate(`/map?search=${encodeURIComponent(query)}`);
  };

  /*
   * ============================================================
   * THEME TOKENS
   * ============================================================
   */

  const page = isDark
    ? 'bg-[#070b14] text-white'
    : 'bg-[#f4f7fb] text-slate-950';

  const surface = isDark
    ? 'bg-[#0b1220]/80 border-white/[0.07]'
    : 'bg-white/75 border-white/80';

  const muted = isDark
    ? 'text-slate-400'
    : 'text-slate-500';

  const subtle = isDark
    ? 'text-slate-500'
    : 'text-slate-400';

  /*
   * ============================================================
   * STATS
   * ============================================================
   */

  const stats = [
    {
      label: t('activeSignals'),
      value: '342',
      description: t('liveAcrossCity'),
      icon: Activity,
      gradient: 'from-blue-500 to-cyan-400',
    },
    {
      label: t('aiVerified'),
      value: '97%',
      description: t('classificationConfidence'),
      icon: BrainCircuit,
      gradient: 'from-violet-500 to-indigo-400',
    },
    {
      label: t('avgResponse'),
      value: '4h 12m',
      description: t('fromReportToAction'),
      icon: Zap,
      gradient: 'from-cyan-400 to-blue-500',
    },
    {
      label: t('citizensEngaged'),
      value: '2,847',
      description: t('activeContributors'),
      icon: Users,
      gradient: 'from-emerald-400 to-teal-500',
    },
  ];

  /*
   * ============================================================
   * CIVICEYE PROCESS
   * ============================================================
   */

  const processSteps = [
    {
      number: '01',
      title: t('citizenReports'),
      description: t('citizenReportsDesc'),
      icon: Shield,
      color: 'text-blue-500',
      glow: 'rgba(59,130,246,.35)',
    },
    {
      number: '02',
      title: t('aiUnderstands'),
      description: t('aiUnderstandsDesc'),
      icon: BrainCircuit,
      color: 'text-violet-500',
      glow: 'rgba(139,92,246,.35)',
    },
    {
      number: '03',
      title: t('cityResponds'),
      description: t('cityRespondsDesc'),
      icon: Route,
      color: 'text-cyan-500',
      glow: 'rgba(6,182,212,.35)',
    },
    {
      number: '04',
      title: t('everyoneSees'),
      description: t('everyoneSeesDesc'),
      icon: Eye,
      color: 'text-emerald-500',
      glow: 'rgba(16,185,129,.35)',
    },
  ];

  return (
    <div
      className={`
        relative
        min-h-screen
        overflow-x-hidden
        transition-colors
        duration-500
        ${page}
      `}
    >

      {/* ========================================================
          GLOBAL ATMOSPHERE
      ======================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

        {/* Main glow */}

        <div
          className={`
            absolute
            left-1/2
            top-[10%]
            h-[600px]
            w-[600px]
            -translate-x-1/2
            rounded-full
            blur-[120px]
            transition-opacity
            duration-700
            ${
              isDark
                ? 'bg-indigo-600/[0.08]'
                : 'bg-indigo-400/[0.13]'
            }
          `}
        />

        <div
          className={`
            absolute
            -right-40
            top-[35%]
            h-[500px]
            w-[500px]
            rounded-full
            blur-[120px]
            ${
              isDark
                ? 'bg-cyan-500/[0.06]'
                : 'bg-cyan-300/[0.14]'
            }
          `}
        />

        <div
          className={`
            absolute
            -left-40
            bottom-[5%]
            h-[500px]
            w-[500px]
            rounded-full
            blur-[120px]
            ${
              isDark
                ? 'bg-violet-600/[0.06]'
                : 'bg-violet-300/[0.12]'
            }
          `}
        />

        {/* Technical grid */}

        <div
          className={`
            absolute
            inset-0
            opacity-[0.035]
            ${
              isDark
                ? 'invert'
                : ''
            }
          `}
          style={{
            backgroundImage:
              'linear-gradient(#64748b 1px, transparent 1px), linear-gradient(90deg, #64748b 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />

      </div>

{/* ========================================================
    PREMIUM CIVICEYE HERO
======================================================== */}

<section
  className="
    relative
    z-10
    overflow-hidden
    px-5
    pb-20
    pt-8
    sm:px-8
    lg:px-12
    lg:pb-24
    lg:pt-12
  "
>
  {/* Decorative ambient lines */}

  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div
      className={`
        absolute
        left-[8%]
        top-[18%]
        h-px
        w-[260px]
        rotate-[-18deg]
        bg-gradient-to-r
        from-transparent
        via-blue-500/30
        to-transparent
      `}
    />

    <div
      className="
        absolute
        right-[5%]
        top-[28%]
        h-px
        w-[300px]
        rotate-[22deg]
        bg-gradient-to-r
        from-transparent
        via-violet-500/25
        to-transparent
      "
    />

    <div
      className="
        absolute
        bottom-[12%]
        left-[35%]
        h-px
        w-[420px]
        rotate-[-8deg]
        bg-gradient-to-r
        from-transparent
        via-cyan-500/20
        to-transparent
      "
    />
  </div>

  <div
    className="
      relative
      mx-auto
      grid
      max-w-7xl
      items-center
      gap-12
      lg:grid-cols-[0.92fr_1.08fr]
      lg:gap-10
    "
  >

    {/* ======================================================
        LEFT — HERO CONTENT
    ====================================================== */}

    <div className="relative z-20">

      {/* Live intelligence badge */}

      <div
        className={`
          mb-6
          inline-flex
          items-center
          gap-2.5
          rounded-full
          border
          px-3.5
          py-2
          text-[10px]
          font-black
          uppercase
          tracking-[0.16em]
          backdrop-blur-xl
          ${
            isDark
              ? 'border-blue-400/15 bg-blue-500/[0.07] text-blue-300'
              : 'border-blue-200 bg-white/80 text-blue-600 shadow-sm'
          }
        `}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60" />

          <span className="relative h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(34,197,94,.7)]" />
        </span>

        <span>{t('liveCityIntelligence')}</span>

        <Sparkles className="h-3 w-3 text-violet-400" />
      </div>

      {/* Main heading */}

      <h1
        className={`
          max-w-3xl
          text-[2.7rem]
          font-black
          leading-[0.96]
          tracking-[-0.055em]
          sm:text-5xl
          md:text-6xl
          lg:text-[4.65rem]
          xl:text-[5rem]
          ${
            isDark
              ? 'text-white'
              : 'text-slate-950'
          }
        `}
      >
        {t('heroLine1')}

        <br />

        {t('heroLine2')}

        <br />

        {t('heroLine3')}

        <br />

        <span
          className="
            bg-gradient-to-r
            from-blue-400
            via-indigo-400
            to-violet-400
            bg-clip-text
            text-transparent
          "
        >
          {t('heroGradientLine1')}
        </span>

        <br />

        <span
          className="
            bg-gradient-to-r
            from-violet-400
            via-blue-400
            to-cyan-400
            bg-clip-text
            text-transparent
          "
        >
          {t('heroGradientLine2')}
        </span>
      </h1>

      {/* Description */}

      <p
        className={`
          mt-7
          max-w-xl
          text-sm
          leading-7
          sm:text-base
          lg:text-[15px]
          ${muted}
        `}
      >
        {t('heroDescription')}
      </p>

      {/* ====================================================
          PRIMARY ACTIONS
      ==================================================== */}

      <div className="mt-8 flex flex-wrap items-center gap-3">

        {/* Report */}

        <Link
          to="/report"
          className="
            group
            relative
            inline-flex
            h-12
            items-center
            gap-2
            overflow-hidden
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            via-indigo-600
            to-violet-600
            px-5
            text-sm
            font-black
            text-white
            shadow-xl
            shadow-blue-600/20
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-2xl
            hover:shadow-blue-600/30
          "
        >
          <span
            className="
              absolute
              inset-0
              -translate-x-full
              bg-gradient-to-r
              from-transparent
              via-white/20
              to-transparent
              transition-transform
              duration-700
              group-hover:translate-x-full
            "
          />

          <AlertCircle className="relative h-4 w-4" />

          <span className="relative">
            {t('reportIssue')}
          </span>

          <ArrowRight
            className="
              relative
              h-4
              w-4
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </Link>

        {/* Live map */}

        <Link
          to="/map"
          className={`
            group
            inline-flex
            h-12
            items-center
            gap-2
            rounded-xl
            border
            px-5
            text-sm
            font-bold
            backdrop-blur-xl
            transition-all
            duration-300
            hover:-translate-y-1
            ${
              isDark
                ? 'border-white/10 bg-white/[0.04] text-slate-200 hover:border-blue-400/30 hover:bg-blue-500/[0.07] hover:text-white'
                : 'border-slate-200 bg-white/80 text-slate-800 hover:border-blue-200 hover:text-blue-600'
            }
          `}
        >
          <MapPin className="h-4 w-4 text-blue-500" />

          <span>{t('exploreLiveCity')}</span>

          <ChevronRight
            className="
              h-4
              w-4
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </Link>
      </div>

      {/* ====================================================
          TRUST / SYSTEM STATUS
      ==================================================== */}

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">

        <div
          className={`
            flex
            items-center
            gap-2
            text-[10px]
            font-bold
            ${muted}
          `}
        >
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />

          {t('aiAssistedTriage')}
        </div>

        <div
          className={`
            flex
            items-center
            gap-2
            text-[10px]
            font-bold
            ${muted}
          `}
        >
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />

          {t('transparentResponse')}
        </div>

        <div
          className={`
            flex
            items-center
            gap-2
            text-[10px]
            font-bold
            ${muted}
          `}
        >
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />

          {t('cityWideIntelligence')}
        </div>
      </div>

      {/* Small live status */}

      <div
        className={`
          mt-7
          flex
          w-fit
          items-center
          gap-3
          rounded-xl
          border
          px-3
          py-2.5
          ${
            isDark
              ? 'border-white/[0.06] bg-white/[0.025]'
              : 'border-slate-200 bg-white/60'
          }
        `}
      >
        <div className="relative flex h-2 w-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-50" />

          <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
        </div>

        <div>
          <p
            className={`
              text-[9px]
              font-black
              uppercase
              tracking-wider
              ${isDark ? 'text-slate-200' : 'text-slate-700'}
            `}
          >
            CivicEye AI Online
          </p>

          <p className={`mt-0.5 text-[8px] ${subtle}`}>
            Monitoring civic signals in real time
          </p>
        </div>
      </div>
    </div>

    {/* ======================================================
        RIGHT — CIVIC INTELLIGENCE VISUAL
    ====================================================== */}

    <div
      className="
        relative
        min-h-[500px]
        [perspective:1400px]
        sm:min-h-[570px]
        lg:min-h-[600px]
      "
    >

      {/* Ambient glow */}

      <div
        className={`
          absolute
          left-1/2
          top-1/2
          h-[340px]
          w-[340px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          blur-[100px]
          ${
            isDark
              ? 'bg-blue-600/[0.12]'
              : 'bg-blue-400/[0.15]'
          }
        `}
      />

      {/* Secondary glow */}

      <div
        className="
          absolute
          right-[10%]
          top-[10%]
          h-[180px]
          w-[180px]
          rounded-full
          bg-violet-500/[0.08]
          blur-[80px]
        "
      />

      {/* ====================================================
          3D SCENE
      ==================================================== */}

      <div
        className="
          absolute
          inset-0
          [transform-style:preserve-3d]
        "
      >

        {/* Back technical grid */}

        <div
          className={`
            absolute
            left-1/2
            top-1/2
            h-[440px]
            w-[440px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-[40px]
            border
            [transform-style:preserve-3d]
            ${
              isDark
                ? 'border-blue-400/[0.09]'
                : 'border-blue-200/50'
            }
          `}
          style={{
            backgroundImage:
              'linear-gradient(rgba(59,130,246,.11) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.11) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            transform:
              'translate(-50%, -50%) rotateX(58deg) rotateZ(-12deg) translateZ(-90px)',
          }}
        />

        {/* Orbit rings */}

        <div className="ce-orbit ce-orbit-one" />

        <div className="ce-orbit ce-orbit-two" />

        <div className="ce-orbit ce-orbit-three" />

        {/* ==================================================
            CENTRAL GLOBE
        ================================================== */}

        <div
          className="
            ce-3d-globe
            absolute
            left-1/2
            top-1/2
            h-[245px]
            w-[245px]
            -translate-x-1/2
            -translate-y-1/2
          "
        >

          {/* Globe */}

          <div
            className={`
              absolute
              inset-0
              overflow-hidden
              rounded-full
              border
              ${
                isDark
                  ? 'border-blue-400/30 bg-[#09152c]'
                  : 'border-blue-300/50 bg-[#edf6ff]'
              }
            `}
            style={{
              boxShadow: isDark
                ? 'inset -35px -25px 70px rgba(0,0,0,.75), inset 25px 20px 50px rgba(59,130,246,.18), 0 0 90px rgba(59,130,246,.18)'
                : 'inset -35px -25px 70px rgba(59,130,246,.12), inset 25px 20px 50px rgba(255,255,255,.95), 0 20px 80px rgba(59,130,246,.18)',
            }}
          >

            {/* Latitude */}

            <div className="absolute left-[-10%] top-[20%] h-px w-[120%] rotate-[8deg] bg-blue-400/20" />

            <div className="absolute left-[-10%] top-[38%] h-px w-[120%] rotate-[3deg] bg-blue-400/20" />

            <div className="absolute left-[-10%] top-[58%] h-px w-[120%] -rotate-[3deg] bg-blue-400/20" />

            <div className="absolute left-[-10%] top-[77%] h-px w-[120%] -rotate-[8deg] bg-blue-400/20" />

            {/* Longitude */}

            <div className="absolute left-[22%] top-[-10%] h-[120%] w-px rotate-[18deg] bg-violet-400/15" />

            <div className="absolute left-[42%] top-[-10%] h-[120%] w-px rotate-[8deg] bg-violet-400/15" />

            <div className="absolute left-[60%] top-[-10%] h-[120%] w-px -rotate-[8deg] bg-violet-400/15" />

            <div className="absolute left-[78%] top-[-10%] h-[120%] w-px -rotate-[18deg] bg-violet-400/15" />

            {/* City network */}

            <div className="absolute left-[27%] top-[32%] h-[45%] w-[45%] rotate-12">
              <div className="absolute left-1/2 top-0 h-full w-px bg-cyan-400/35" />

              <div className="absolute left-0 top-1/2 h-px w-full bg-cyan-400/35" />

              <div className="absolute left-[20%] top-[20%] h-[60%] w-[60%] rotate-45 border border-blue-400/25" />

              <div className="absolute left-[15%] top-[15%] h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,.9)]" />

              <div className="absolute bottom-[15%] right-[15%] h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_15px_rgba(139,92,246,.9)]" />
            </div>

            {/* Central AI core */}

            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-[68px]
                w-[68px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-gradient-to-br
                from-blue-400
                via-indigo-500
                to-violet-600
                shadow-[0_0_55px_rgba(59,130,246,.7)]
              "
            >
              <div className="absolute inset-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm" />

              <Cpu
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-7
                  w-7
                  -translate-x-1/2
                  -translate-y-1/2
                  text-white
                "
              />
            </div>
          </div>

          {/* Globe atmosphere */}

          <div className="absolute -inset-5 rounded-full border border-blue-400/10" />

          <div className="absolute -inset-8 rounded-full border border-violet-400/[0.07]" />

          <div className="absolute -inset-11 rounded-full border border-cyan-400/[0.04]" />
        </div>

        {/* ==================================================
            FLOATING SIGNAL NODES
        ================================================== */}

        <div className="ce-floating-node node-one">
          <span className="ce-node-pulse" />
          <MapPin className="h-3.5 w-3.5" />
        </div>

        <div className="ce-floating-node node-two">
          <span className="ce-node-pulse" />
          <Radio className="h-3.5 w-3.5" />
        </div>

        <div className="ce-floating-node node-three">
          <span className="ce-node-pulse" />
          <AlertCircle className="h-3.5 w-3.5" />
        </div>

        <div className="ce-floating-node node-four">
          <span className="ce-node-pulse" />
          <CheckCircle2 className="h-3.5 w-3.5" />
        </div>

        {/* ==================================================
            CRITICAL INCIDENT CARD
        ================================================== */}

        <div
          className={`
            ce-3d-card
            absolute
            left-[0%]
            top-[12%]
            w-[175px]
            rounded-2xl
            border
            p-3.5
            backdrop-blur-xl
            ${
              isDark
                ? 'border-white/10 bg-[#0c1424]/85'
                : 'border-white bg-white/80 shadow-xl'
            }
          `}
        >
          <div className="flex items-center justify-between">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
              <AlertCircle className="h-4 w-4 text-red-500" />
            </div>

            <span className="rounded-md bg-red-500/10 px-1.5 py-1 text-[7px] font-black uppercase tracking-wider text-red-400">
              CRITICAL
            </span>
          </div>

          <p
            className={`
              mt-3
              text-[10px]
              font-black
              ${isDark ? 'text-white' : 'text-slate-900'}
            `}
          >
            {t('nh24')}
          </p>

          <p className={`mt-1 text-[8px] ${subtle}`}>
            {t('waterlogging')}
          </p>

          <div className="mt-3 flex items-center justify-between text-[7px]">
            <span className={subtle}>AI confidence</span>
            <span className="font-black text-red-400">92%</span>
          </div>

          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-slate-500/10">
            <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-red-500 to-orange-400" />
          </div>
        </div>

        {/* ==================================================
            SYSTEM STATUS CARD
        ================================================== */}

        <div
          className={`
            absolute
            right-[3%]
            top-[5%]
            rounded-xl
            border
            px-3.5
            py-2.5
            backdrop-blur-xl
            ${
              isDark
                ? 'border-white/10 bg-[#0b1220]/75'
                : 'border-white bg-white/80 shadow-lg'
            }
          `}
        >
          <div className="flex items-center gap-2">
            <div className="relative h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60" />

              <span className="relative block h-2 w-2 rounded-full bg-emerald-500" />
            </div>

            <span
              className={`
                text-[9px]
                font-black
                uppercase
                tracking-wider
                ${isDark ? 'text-white' : 'text-slate-800'}
              `}
            >
              SYSTEM ONLINE
            </span>
          </div>

          <p className={`mt-1 text-[8px] ${subtle}`}>
            {t('ncrNetworkOperational')}
          </p>
        </div>

        {/* ==================================================
            AI VERIFICATION CARD
        ================================================== */}

        <div
          className={`
            ce-3d-card
            absolute
            bottom-[15%]
            right-[0%]
            w-[180px]
            rounded-2xl
            border
            p-3.5
            backdrop-blur-xl
            ${
              isDark
                ? 'border-white/10 bg-[#0c1424]/85'
                : 'border-white bg-white/80 shadow-xl'
            }
          `}
        >
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </div>

            <div>
              <p
                className={`
                  text-[10px]
                  font-black
                  ${isDark ? 'text-white' : 'text-slate-900'}
                `}
              >
                94.6%
              </p>

              <p className={`text-[8px] ${subtle}`}>
                {t('satisfaction')}
              </p>
            </div>
          </div>

          <div className="mt-3 flex h-7 items-end gap-1">
            {[28, 42, 35, 55, 48, 70, 82, 76, 94].map(
              (height, index) => (
                <span
                  key={index}
                  className="w-full rounded-t-sm bg-gradient-to-t from-emerald-500/20 to-emerald-400"
                  style={{
                    height: `${height * 0.28}px`,
                  }}
                />
              )
            )}
          </div>
        </div>

        {/* ==================================================
            BOTTOM LIVE METRICS
        ================================================== */}

        <div
          className={`
            absolute
            bottom-[3%]
            left-1/2
            w-[88%]
            -translate-x-1/2
            rounded-2xl
            border
            p-3.5
            backdrop-blur-xl
            ${
              isDark
                ? 'border-white/10 bg-[#0b1220]/80'
                : 'border-white bg-white/80 shadow-xl'
            }
          `}
        >
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">

            <div>
              <p className={`text-[7px] font-bold uppercase tracking-wider ${subtle}`}>
                {t('activeIncidents')}
              </p>

              <p
                className={`
                  mt-1
                  text-sm
                  font-black
                  ${isDark ? 'text-white' : 'text-slate-900'}
                `}
              >
                342
              </p>
            </div>

            <div>
              <p className={`text-[7px] font-bold uppercase tracking-wider ${subtle}`}>
                {t('aiVerified')}
              </p>

              <p
                className={`
                  mt-1
                  text-sm
                  font-black
                  ${isDark ? 'text-white' : 'text-slate-900'}
                `}
              >
                97%
              </p>
            </div>

            <div>
              <p className={`text-[7px] font-bold uppercase tracking-wider ${subtle}`}>
                {t('critical')}
              </p>

              <p className="mt-1 text-sm font-black text-red-500">
                07
              </p>
            </div>

            <div className="hidden sm:block">
              <p className={`text-[7px] font-bold uppercase tracking-wider ${subtle}`}>
                {t('satisfaction')}
              </p>

              <p className="mt-1 text-sm font-black text-emerald-500">
                94.6%
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ========================================================
          SEARCH
      ======================================================== */}

     {/* ========================================================
    AI CIVIC SEARCH
======================================================== */}

<section className="relative z-30 mx-auto max-w-5xl px-5 pb-20 sm:px-8">

  <div className="mx-auto max-w-3xl text-center">

    {/* Section label */}
    <div
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        px-3
        py-1.5
        text-[9px]
        font-black
        uppercase
        tracking-[0.16em]
        backdrop-blur-xl
        ${
          isDark
            ? 'border-blue-400/10 bg-blue-500/[0.06] text-blue-400'
            : 'border-blue-200 bg-blue-50 text-blue-600'
        }
      `}
    >
      <Sparkles className="h-3.5 w-3.5" />
      AI Civic Intelligence
    </div>

    <h2
      className={`
        mt-4
        text-2xl
        font-black
        tracking-[-0.04em]
        sm:text-3xl
        ${
          isDark
            ? 'text-white'
            : 'text-slate-950'
        }
      `}
    >
      Find an issue across the city
    </h2>

    <p
      className={`
        mx-auto
        mt-3
        max-w-xl
        text-xs
        leading-6
        sm:text-sm
        ${subtle}
      `}
    >
      Search locations, complaints, roads, waterlogging,
      traffic issues and other civic signals.
    </p>

  </div>

  {/* ======================================================
      SEARCH COMMAND BAR
  ====================================================== */}

  <form
    onSubmit={handleSearch}
    className={`
      group
      relative
      mx-auto
      mt-8
      max-w-4xl
      rounded-2xl
      border
      p-2
      shadow-2xl
      backdrop-blur-2xl
      transition-all
      duration-300
      ${
        isDark
          ? `
            border-white/[0.08]
            bg-[#0b1220]/85
            shadow-black/30
            hover:border-blue-500/20
            focus-within:border-blue-500/40
            focus-within:shadow-blue-500/10
          `
          : `
            border-slate-200
            bg-white/85
            shadow-slate-300/30
            hover:border-blue-200
            focus-within:border-blue-300
            focus-within:shadow-blue-200/30
          `
      }
    `}
  >

    <div className="flex items-center gap-2">

      {/* Search icon */}

      <div
        className={`
          ml-1
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          transition-all
          duration-300
          group-focus-within:scale-105
          ${
            isDark
              ? 'bg-blue-500/10 text-blue-400 group-focus-within:bg-blue-500/15'
              : 'bg-blue-50 text-blue-600 group-focus-within:bg-blue-100'
          }
        `}
      >
        <Search className="h-4.5 w-4.5" />
      </div>

      {/* Input */}

      <div className="min-w-0 flex-1">

        <input
          type="text"
          value={searchQuery}
          onChange={(event) =>
            setSearchQuery(event.target.value)
          }
          placeholder={
            t('searchPlaceholder') ||
            'Search civic issues, locations or reports...'
          }
          aria-label={
            t('searchPlaceholder') ||
            'Search civic issues, locations or reports'
          }
          className={`
            h-11
            w-full
            min-w-0
            bg-transparent
            px-2
            text-sm
            font-semibold
            outline-none
            sm:text-base
            ${
              isDark
                ? 'text-white placeholder:text-slate-600'
                : 'text-slate-900 placeholder:text-slate-400'
            }
          `}
        />

      </div>

      {/* AI indicator */}

      <div
        className={`
          hidden
          items-center
          gap-1.5
          rounded-lg
          border
          px-2.5
          py-1.5
          text-[9px]
          font-black
          uppercase
          tracking-wider
          sm:flex
          ${
            isDark
              ? 'border-violet-400/10 bg-violet-500/10 text-violet-400'
              : 'border-violet-200 bg-violet-50 text-violet-600'
          }
        `}
      >
        <Sparkles className="h-3 w-3" />
        AI
      </div>

      {/* Search button */}

      <button
        type="submit"
        disabled={!searchQuery.trim()}
        className="
          group/search
          flex
          h-11
          shrink-0
          items-center
          gap-2
          rounded-xl
          bg-gradient-to-r
          from-blue-600
          to-indigo-600
          px-4
          text-xs
          font-black
          text-white
          shadow-lg
          shadow-blue-600/20
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:shadow-xl
          hover:shadow-blue-600/30
          disabled:cursor-not-allowed
          disabled:opacity-40
          sm:px-5
        "
      >
        <span className="hidden sm:inline">
          {t('search') || 'Search'}
        </span>

        <Search
          className="
            h-4
            w-4
            transition-transform
            duration-300
            group-hover/search:scale-110
          "
        />
      </button>

    </div>

  </form>

  {/* ======================================================
      QUICK SEARCH SUGGESTIONS
  ====================================================== */}

  <div className="mt-4 flex flex-wrap items-center justify-center gap-2">

    <span
      className={`
        mr-1
        text-[9px]
        font-bold
        uppercase
        tracking-wider
        ${subtle}
      `}
    >
      Try:
    </span>

    {[
      'Waterlogging',
      'Potholes',
      'Traffic',
      'Street lights',
    ].map((suggestion) => (
      <button
        key={suggestion}
        type="button"
        onClick={() => {
          setSearchQuery(suggestion);
        }}
        className={`
          rounded-full
          border
          px-3
          py-1.5
          text-[9px]
          font-bold
          transition-all
          duration-200
          hover:-translate-y-0.5
          ${
            isDark
              ? `
                border-white/[0.07]
                bg-white/[0.025]
                text-slate-400
                hover:border-blue-400/20
                hover:bg-blue-500/[0.06]
                hover:text-blue-400
              `
              : `
                border-slate-200
                bg-white/70
                text-slate-500
                hover:border-blue-200
                hover:bg-blue-50
                hover:text-blue-600
              `
          }
        `}
      >
        {suggestion}
      </button>
    ))}

  </div>

  {/* AI status */}

  <div
    className={`
      mt-5
      flex
      items-center
      justify-center
      gap-2
      text-[9px]
      font-bold
      ${subtle}
    `}
  >
    <span className="relative flex h-2 w-2">

      <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-50" />

      <span className="relative h-2 w-2 rounded-full bg-emerald-500" />

    </span>

    <ScanLine className="h-3.5 w-3.5 text-blue-500" />

    AI-assisted civic issue discovery is online
  </div>

</section>

      {/* ========================================================
          SYSTEM OVERVIEW
      ======================================================== */}

{/* ========================================================
    SYSTEM OVERVIEW
======================================================== */}

<section className="relative z-10 px-5 py-20 sm:px-8 lg:py-28">

  <div className="mx-auto max-w-7xl">

    {/* ======================================================
        SECTION HEADER
    ====================================================== */}

    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

      <div className="max-w-3xl">

        {/* Kicker */}

        <div
          className={`
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            px-3
            py-1.5
            text-[9px]
            font-black
            uppercase
            tracking-[0.16em]
            ${
              isDark
                ? 'border-blue-400/10 bg-blue-500/10 text-blue-400'
                : 'border-blue-200 bg-blue-50 text-blue-600'
            }
          `}
        >
          <Layers3 className="h-3.5 w-3.5" />

          {t('systemOverview')}
        </div>

        {/* Heading */}

        <h2
          className={`
            mt-5
            text-3xl
            font-black
            leading-[1.05]
            tracking-[-0.045em]
            sm:text-4xl
            lg:text-5xl
            ${
              isDark
                ? 'text-white'
                : 'text-slate-950'
            }
          `}
        >
          {t('intelligenceThatMoves')}

          <br />

          <span
            className="
              bg-gradient-to-r
              from-blue-500
              via-violet-500
              to-cyan-400
              bg-clip-text
              text-transparent
            "
          >
            {t('citiesForward')}
          </span>
        </h2>

        {/* Description */}

        <p
          className={`
            mt-5
            max-w-2xl
            text-sm
            leading-7
            sm:text-base
            ${muted}
          `}
        >
          {t('liveIntelligenceNCR')}
        </p>

      </div>

      {/* Live status */}

      <div
        className={`
          flex
          w-fit
          items-center
          gap-3
          rounded-xl
          border
          px-4
          py-3
          backdrop-blur-xl
          ${
            isDark
              ? 'border-white/[0.07] bg-white/[0.025]'
              : 'border-slate-200 bg-white/70'
          }
        `}
      >

        <div className="relative flex h-2.5 w-2.5">

          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-50" />

          <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500" />

        </div>

        <div>

          <p
            className={`
              text-[9px]
              font-black
              uppercase
              tracking-[0.12em]
              ${
                isDark
                  ? 'text-white'
                  : 'text-slate-900'
              }
            `}
          >
            Network Operational
          </p>

          <p
            className={`
              mt-0.5
              text-[8px]
              font-medium
              ${subtle}
            `}
          >
            Real-time civic intelligence
          </p>

        </div>

      </div>

    </div>

    {/* ======================================================
        STAT CARDS
    ====================================================== */}

    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

      {stats.map((stat, index) => {

        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className={`
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              p-5
              shadow-sm
              transition-all
              duration-500
              hover:-translate-y-2
              ${
                isDark
                  ? `
                    border-white/[0.07]
                    bg-[#0b1220]/70
                    hover:border-blue-500/25
                    hover:bg-[#0e1729]
                    hover:shadow-2xl
                    hover:shadow-blue-950/20
                  `
                  : `
                    border-slate-200/70
                    bg-white/75
                    hover:border-blue-200
                    hover:bg-white
                    hover:shadow-xl
                    hover:shadow-blue-100/40
                  `
              }
            `}
          >

            {/* ==================================================
                TOP GRADIENT
            ================================================== */}

            <div
              className={`
                absolute
                left-0
                top-0
                h-1
                w-full
                bg-gradient-to-r
                ${stat.gradient}
              `}
            />

            {/* ==================================================
                BACKGROUND GLOW
            ================================================== */}

            <div
              className={`
                pointer-events-none
                absolute
                -right-12
                -top-12
                h-32
                w-32
                rounded-full
                bg-gradient-to-br
                ${stat.gradient}
                opacity-0
                blur-3xl
                transition-opacity
                duration-500
                group-hover:opacity-10
              `}
            />

            {/* ==================================================
                CARD HEADER
            ================================================== */}

            <div className="relative flex items-center justify-between">

              {/* Icon */}

              <div
                className={`
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  transition-all
                  duration-500
                  group-hover:scale-105
                  ${
                    isDark
                      ? 'border-blue-400/10 bg-blue-500/10'
                      : 'border-blue-100 bg-blue-50'
                  }
                `}
              >
                <Icon
                  className="
                    h-4.5
                    w-4.5
                    text-blue-500
                  "
                />
              </div>

              {/* Number */}

              <span
                className={`
                  text-[9px]
                  font-black
                  tracking-[0.15em]
                  ${
                    isDark
                      ? 'text-slate-700'
                      : 'text-slate-300'
                  }
                `}
              >
                0{index + 1}
              </span>

            </div>

            {/* ==================================================
                VALUE
            ================================================== */}

            <div
              className={`
                relative
                mt-7
                text-3xl
                font-black
                tracking-[-0.04em]
                ${
                  isDark
                    ? 'text-white'
                    : 'text-slate-950'
                }
              `}
            >
              {stat.value}
            </div>

            {/* ==================================================
                LABEL
            ================================================== */}

            <div
              className={`
                relative
                mt-1.5
                text-xs
                font-black
                ${
                  isDark
                    ? 'text-slate-200'
                    : 'text-slate-700'
                }
              `}
            >
              {stat.label}
            </div>

            {/* ==================================================
                DESCRIPTION
            ================================================== */}

            <p
              className={`
                relative
                mt-2
                text-[10px]
                leading-5
                ${subtle}
              `}
            >
              {stat.description}
            </p>

            {/* ==================================================
                BOTTOM STATUS
            ================================================== */}

            <div
              className={`
                relative
                mt-5
                flex
                items-center
                gap-2
                border-t
                pt-3
                text-[8px]
                font-bold
                uppercase
                tracking-wider
                ${
                  isDark
                    ? 'border-white/[0.05] text-slate-600'
                    : 'border-slate-100 text-slate-400'
                }
              `}
            >

              <span
                className={`
                  h-1.5
                  w-1.5
                  rounded-full
                  ${
                    index === 3
                      ? 'bg-emerald-500'
                      : 'bg-blue-500'
                  }
                `}
              />

              {index === 0 && 'Live signal feed'}
              {index === 1 && 'AI verification active'}
              {index === 2 && 'Response monitoring'}
              {index === 3 && 'Community activity'}

            </div>

          </div>
        );
      })}

    </div>

  </div>

</section>

      {/* ========================================================
          3D CIVIC INTELLIGENCE PIPELINE
      ======================================================== */}

{/* ========================================================
    CIVICEYE INTELLIGENCE PIPELINE
======================================================== */}

<section
  className={`
    relative
    overflow-hidden
    border-y
    px-5
    py-24
    sm:px-8
    lg:py-32
    ${
      isDark
        ? 'border-white/[0.05] bg-[#090e19]'
        : 'border-slate-200/70 bg-white/40'
    }
  `}
>

  {/* ======================================================
      BACKGROUND ATMOSPHERE
  ====================================================== */}

  <div className="pointer-events-none absolute inset-0 overflow-hidden">

    <div
      className={`
        absolute
        left-[10%]
        top-1/2
        h-72
        w-72
        -translate-y-1/2
        rounded-full
        blur-[120px]
        ${
          isDark
            ? 'bg-violet-600/[0.06]'
            : 'bg-violet-300/[0.12]'
        }
      `}
    />

    <div
      className={`
        absolute
        right-[5%]
        top-[20%]
        h-64
        w-64
        rounded-full
        blur-[110px]
        ${
          isDark
            ? 'bg-cyan-500/[0.05]'
            : 'bg-cyan-300/[0.10]'
        }
      `}
    />

    {/* Technical grid */}

    <div
      className={`
        absolute
        inset-0
        opacity-[0.025]
        ${isDark ? '' : 'opacity-[0.04]'}
      `}
      style={{
        backgroundImage:
          'linear-gradient(#64748b 1px, transparent 1px), linear-gradient(90deg, #64748b 1px, transparent 1px)',
        backgroundSize: '42px 42px',
      }}
    />

  </div>

  <div className="relative mx-auto max-w-7xl">

    {/* ====================================================
        SECTION HEADER
    ==================================================== */}

    <div className="max-w-3xl">

      <div
        className={`
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          px-3
          py-1.5
          text-[9px]
          font-black
          uppercase
          tracking-[0.16em]
          ${
            isDark
              ? 'border-violet-400/10 bg-violet-500/10 text-violet-400'
              : 'border-violet-200 bg-violet-50 text-violet-600'
          }
        `}
      >
        <Radar className="h-3.5 w-3.5" />

        {t('civicEyeLoop')}

        <span
          className={`
            ml-1
            h-1
            w-1
            rounded-full
            ${
              isDark
                ? 'bg-violet-400'
                : 'bg-violet-500'
            }
          `}
        />
      </div>

      <h2
        className={`
          mt-5
          text-3xl
          font-black
          leading-[1.05]
          tracking-[-0.045em]
          sm:text-4xl
          lg:text-5xl
          ${
            isDark
              ? 'text-white'
              : 'text-slate-950'
          }
        `}
      >
        {t('fromCitizenSignal')}

        <br />

        <span
          className="
            bg-gradient-to-r
            from-violet-500
            via-blue-500
            to-cyan-400
            bg-clip-text
            text-transparent
          "
        >
          {t('toCityAction')}
        </span>
      </h2>

      <p
        className={`
          mt-5
          max-w-2xl
          text-sm
          leading-7
          sm:text-base
          ${muted}
        `}
      >
        {t('completeLifecycle')}
      </p>

    </div>

    {/* ====================================================
        PIPELINE
    ==================================================== */}

    <div className="relative mt-16">

      {/* Desktop connection line */}

      <div
        className="
          pointer-events-none
          absolute
          left-[10%]
          right-[10%]
          top-[78px]
          hidden
          h-px
          lg:block
        "
      >

        <div
          className="
            h-full
            w-full
            bg-gradient-to-r
            from-blue-500/0
            via-blue-500/40
            via-violet-500/50
            to-cyan-500/0
          "
        />

      </div>

      {/* Animated beam */}

      <div
        className="
          pointer-events-none
          absolute
          left-[10%]
          top-[78px]
          hidden
          h-px
          w-20
          animate-pulse
          bg-gradient-to-r
          from-transparent
          via-white
          to-transparent
          opacity-60
          lg:block
        "
      />

      <div className="grid gap-5 lg:grid-cols-4">

        {processSteps.map((step, index) => {

          const Icon = step.icon;

          const stepColor =
            step.color.includes('blue')
              ? '#3b82f6'
              : step.color.includes('violet')
                ? '#8b5cf6'
                : step.color.includes('cyan')
                  ? '#06b6d4'
                  : '#10b981';

          return (
            <div
              key={step.number}
              className={`
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                p-6
                transition-all
                duration-500
                hover:-translate-y-3
                ${
                  isDark
                    ? `
                      border-white/[0.07]
                      bg-[#0c1423]/80
                      hover:border-white/[0.13]
                      hover:bg-[#0e1729]
                      hover:shadow-2xl
                    `
                    : `
                      border-slate-200
                      bg-white/80
                      hover:border-slate-300
                      hover:bg-white
                      hover:shadow-xl
                    `
                }
              `}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >

              {/* ==================================================
                  CARD GLOW
              ================================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-20
                  -top-20
                  h-40
                  w-40
                  rounded-full
                  opacity-0
                  blur-3xl
                  transition-opacity
                  duration-500
                  group-hover:opacity-20
                "
                style={{
                  backgroundColor: stepColor,
                }}
              />

              {/* ==================================================
                  CARD HEADER
              ================================================== */}

              <div className="relative flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <span
                    className={`
                      text-[10px]
                      font-black
                      tracking-[0.2em]
                      ${
                        isDark
                          ? 'text-slate-600'
                          : 'text-slate-300'
                      }
                    `}
                  >
                    {step.number}
                  </span>

                  <span
                    className="h-px w-5"
                    style={{
                      backgroundColor: `${stepColor}40`,
                    }}
                  />

                </div>

                {index < processSteps.length - 1 && (
                  <ChevronRight
                    className={`
                      hidden
                      h-4
                      w-4
                      lg:block
                      transition-all
                      duration-300
                      group-hover:translate-x-1
                      ${
                        isDark
                          ? 'text-slate-700 group-hover:text-slate-500'
                          : 'text-slate-300 group-hover:text-slate-500'
                      }
                    `}
                  />
                )}

              </div>

              {/* ==================================================
                  ICON
              ================================================== */}

              <div
                className="
                  relative
                  mt-8
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  shadow-lg
                  transition-all
                  duration-500
                  group-hover:[transform:translateZ(25px)_rotateX(-5deg)_rotateY(8deg)_scale(1.05)]
                "
                style={{
                  color: stepColor,
                  borderColor: `${stepColor}35`,
                  backgroundColor: `${stepColor}0D`,
                  boxShadow: `0 15px 40px ${step.glow}`,
                }}
              >

                {/* Icon glow */}

                <div
                  className="
                    absolute
                    inset-2
                    rounded-xl
                    opacity-0
                    blur-md
                    transition-opacity
                    duration-500
                    group-hover:opacity-60
                  "
                  style={{
                    backgroundColor: stepColor,
                  }}
                />

                <Icon className="relative h-6 w-6" />

              </div>

              {/* ==================================================
                  STEP TITLE
              ================================================== */}

              <h3
                className={`
                  relative
                  mt-7
                  text-lg
                  font-black
                  tracking-tight
                  ${
                    isDark
                      ? 'text-white'
                      : 'text-slate-950'
                  }
                `}
              >
                {step.title}
              </h3>

              {/* ==================================================
                  DESCRIPTION
              ================================================== */}

              <p
                className={`
                  relative
                  mt-3
                  min-h-[72px]
                  text-xs
                  leading-6
                  ${muted}
                `}
              >
                {step.description}
              </p>

              {/* ==================================================
                  STATUS
              ================================================== */}

              <div
                className={`
                  relative
                  mt-5
                  flex
                  items-center
                  gap-2
                  border-t
                  pt-4
                  text-[8px]
                  font-black
                  uppercase
                  tracking-[0.12em]
                  ${
                    isDark
                      ? 'border-white/[0.05] text-slate-600'
                      : 'border-slate-100 text-slate-400'
                  }
                `}
              >

                <span className="relative flex h-1.5 w-1.5">

                  <span
                    className="absolute inset-0 animate-ping rounded-full opacity-50"
                    style={{
                      backgroundColor: stepColor,
                    }}
                  />

                  <span
                    className="relative h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor: stepColor,
                    }}
                  />

                </span>

                {index === 0 && 'Signal received'}
                {index === 1 && 'AI processing'}
                {index === 2 && 'Response active'}
                {index === 3 && 'Public visibility'}

              </div>

              {/* ==================================================
                  BOTTOM ACCENT
              ================================================== */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  h-[2px]
                  w-0
                  transition-all
                  duration-500
                  group-hover:w-full
                "
                style={{
                  background: `linear-gradient(90deg, transparent, ${stepColor}, transparent)`,
                }}
              />

            </div>
          );
        })}

      </div>

    </div>

    {/* ====================================================
        PIPELINE SUMMARY
    ==================================================== */}

    <div
      className={`
        mt-8
        flex
        flex-col
        gap-4
        rounded-2xl
        border
        px-5
        py-4
        sm:flex-row
        sm:items-center
        sm:justify-between
        ${
          isDark
            ? 'border-white/[0.06] bg-white/[0.02]'
            : 'border-slate-200 bg-white/60'
        }
      `}
    >

      <div className="flex items-center gap-3">

        <div
          className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${
              isDark
                ? 'bg-blue-500/10 text-blue-400'
                : 'bg-blue-50 text-blue-600'
            }
          `}
        >
          <Activity className="h-4 w-4" />
        </div>

        <div>

          <p
            className={`
              text-[10px]
              font-black
              ${
                isDark
                  ? 'text-white'
                  : 'text-slate-900'
              }
            `}
          >
            Continuous civic intelligence loop
          </p>

          <p
            className={`
              mt-0.5
              text-[8px]
              ${subtle}
            `}
          >
            Every report moves through the same transparent workflow.
          </p>

        </div>

      </div>

      <div
        className={`
          flex
          items-center
          gap-2
          text-[8px]
          font-black
          uppercase
          tracking-wider
          ${
            isDark
              ? 'text-emerald-400'
              : 'text-emerald-600'
          }
        `}
      >

        <CheckCircle2 className="h-3.5 w-3.5" />

        End-to-end visibility

      </div>

    </div>

  </div>

</section>

      {/* ========================================================
          LIVE CITY MAP
      ======================================================== */}

{/* ========================================================
    LIVE CITY INTELLIGENCE MAP
======================================================== */}

<section className="relative z-10 px-5 py-20 sm:px-8 lg:py-28">

  <div className="mx-auto max-w-7xl">

    {/* ======================================================
        MAIN CONTAINER
    ====================================================== */}

    <div
      className={`
        relative
        overflow-hidden
        rounded-[2rem]
        border
        p-2
        shadow-2xl
        ${
          isDark
            ? 'border-white/[0.07] bg-[#0b1220]/80 shadow-black/30'
            : 'border-slate-200/70 bg-white/75 shadow-slate-300/30'
        }
      `}
    >

      {/* Background glow */}

      <div
        className={`
          pointer-events-none
          absolute
          -right-32
          -top-32
          h-80
          w-80
          rounded-full
          blur-[110px]
          ${
            isDark
              ? 'bg-blue-600/[0.08]'
              : 'bg-blue-400/[0.10]'
          }
        `}
      />

      <div className="relative grid lg:grid-cols-[1.1fr_0.9fr]">

        {/* ==================================================
            MAP AREA
        ================================================== */}

        <div
          className={`
            group
            relative
            min-h-[390px]
            overflow-hidden
            rounded-[1.5rem]
            lg:min-h-[560px]
          `}
        >

          {/* Actual map */}

          <LeafletMap
            complaints={complaints.slice(0, 8)}
            center={[28.6280, 77.3649]}
            zoom={13}
            height="100%"
            interactive={false}
          />

          {/* Map overlay */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              z-[300]
              bg-gradient-to-t
              from-slate-950/40
              via-transparent
              to-slate-950/10
            "
          />

          {/* ==================================================
              LIVE MAP BADGE
          ================================================== */}

          <div
            className="
              absolute
              left-5
              top-5
              z-[400]
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/70
              bg-white/90
              px-3
              py-2
              shadow-xl
              backdrop-blur-xl
            "
          >

            <span className="relative flex h-2 w-2">

              <span
                className="
                  absolute
                  inset-0
                  animate-ping
                  rounded-full
                  bg-emerald-400
                  opacity-60
                "
              />

              <span
                className="
                  relative
                  h-2
                  w-2
                  rounded-full
                  bg-emerald-500
                "
              />

            </span>

            <span className="text-[9px] font-black uppercase tracking-wider text-slate-800">
              {t('liveCityMap')}
            </span>

          </div>

          {/* ==================================================
              MAP STATUS PANEL
          ================================================== */}

          <div
            className="
              absolute
              bottom-5
              left-5
              z-[400]
              rounded-2xl
              border
              border-white/20
              bg-slate-950/75
              px-4
              py-3
              shadow-2xl
              backdrop-blur-xl
            "
          >

            <div className="flex items-center gap-2">

              <Radio className="h-3.5 w-3.5 text-cyan-400" />

              <span className="text-[8px] font-black uppercase tracking-[0.14em] text-white">
                NCR Intelligence Network
              </span>

            </div>

            <div className="mt-2 flex items-center gap-3">

              <span className="text-[9px] font-bold text-slate-400">
                24 active signals
              </span>

              <span className="h-1 w-1 rounded-full bg-emerald-400" />

              <span className="text-[9px] font-bold text-emerald-400">
                Operational
              </span>

            </div>

          </div>

          {/* ==================================================
              SCANNING LINE
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              left-0
              right-0
              top-0
              z-[350]
              h-px
              bg-gradient-to-r
              from-transparent
              via-cyan-400/70
              to-transparent
              opacity-60
              animate-scanline
            "
          />

        </div>

        {/* ==================================================
            CONTENT PANEL
        ================================================== */}

        <div
          className="
            relative
            flex
            flex-col
            justify-center
            p-7
            sm:p-10
            lg:p-12
          "
        >

          {/* =================================================
              LABEL
          ================================================= */}

          <div
            className={`
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              px-3
              py-1.5
              text-[9px]
              font-black
              uppercase
              tracking-[0.16em]
              ${
                isDark
                  ? 'border-cyan-400/10 bg-cyan-500/10 text-cyan-400'
                  : 'border-cyan-200 bg-cyan-50 text-cyan-600'
              }
            `}
          >

            <Globe2 className="h-3.5 w-3.5" />

            {t('liveCityPreview')}

          </div>

          {/* =================================================
              TITLE
          ================================================= */}

          <h2
            className={`
              mt-5
              text-3xl
              font-black
              leading-[1.05]
              tracking-[-0.045em]
              sm:text-4xl
              lg:text-[2.8rem]
              ${
                isDark
                  ? 'text-white'
                  : 'text-slate-950'
              }
            `}
          >

            {t('seeEverySignal')}

            <br />

            <span
              className="
                bg-gradient-to-r
                from-blue-500
                via-violet-500
                to-cyan-400
                bg-clip-text
                text-transparent
              "
            >
              {t('trackEveryAction')}
            </span>

          </h2>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p
            className={`
              mt-5
              max-w-lg
              text-sm
              leading-7
              ${muted}
            `}
          >
            {t('liveCityDescription')}
          </p>

          {/* =================================================
              LIVE STATUS
          ================================================= */}

          <div
            className={`
              mt-6
              flex
              items-center
              gap-3
              rounded-xl
              border
              px-4
              py-3
              ${
                isDark
                  ? 'border-emerald-500/10 bg-emerald-500/[0.04]'
                  : 'border-emerald-200 bg-emerald-50/70'
              }
            `}
          >

            <div className="relative flex h-2 w-2">

              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-50" />

              <span className="relative h-2 w-2 rounded-full bg-emerald-500" />

            </div>

            <div>

              <p
                className={`
                  text-[9px]
                  font-black
                  uppercase
                  tracking-wider
                  ${
                    isDark
                      ? 'text-emerald-400'
                      : 'text-emerald-600'
                  }
                `}
              >
                System operational
              </p>

              <p
                className={`
                  mt-0.5
                  text-[8px]
                  ${subtle}
                `}
              >
                Live civic signals are being monitored
              </p>

            </div>

          </div>

          {/* =================================================
              METRICS
          ================================================= */}

          <div className="mt-7 grid grid-cols-2 gap-3">

            {/* Active signals */}

            <div
              className={`
                group/metric
                rounded-xl
                border
                p-4
                transition-all
                duration-300
                hover:-translate-y-1
                ${
                  isDark
                    ? 'border-white/[0.07] bg-white/[0.025] hover:border-blue-500/20'
                    : 'border-slate-200 bg-white/70 hover:border-blue-200'
                }
              `}
            >

              <Map className="h-4 w-4 text-blue-500 transition-transform duration-300 group-hover/metric:scale-110" />

              <p
                className={`
                  mt-3
                  text-xl
                  font-black
                  ${
                    isDark
                      ? 'text-white'
                      : 'text-slate-950'
                  }
                `}
              >
                24
              </p>

              <p className={`text-[10px] ${subtle}`}>
                {t('activeSignals')}
              </p>

            </div>

            {/* AI verified */}

            <div
              className={`
                group/metric
                rounded-xl
                border
                p-4
                transition-all
                duration-300
                hover:-translate-y-1
                ${
                  isDark
                    ? 'border-white/[0.07] bg-white/[0.025] hover:border-violet-500/20'
                    : 'border-slate-200 bg-white/70 hover:border-violet-200'
                }
              `}
            >

              <Database className="h-4 w-4 text-violet-500 transition-transform duration-300 group-hover/metric:scale-110" />

              <p
                className={`
                  mt-3
                  text-xl
                  font-black
                  ${
                    isDark
                      ? 'text-white'
                      : 'text-slate-950'
                  }
                `}
              >
                18
              </p>

              <p className={`text-[10px] ${subtle}`}>
                {t('aiVerified')}
              </p>

            </div>

            {/* In progress */}

            <div
              className={`
                group/metric
                rounded-xl
                border
                p-4
                transition-all
                duration-300
                hover:-translate-y-1
                ${
                  isDark
                    ? 'border-white/[0.07] bg-white/[0.025] hover:border-orange-500/20'
                    : 'border-slate-200 bg-white/70 hover:border-orange-200'
                }
              `}
            >

              <Clock3 className="h-4 w-4 text-orange-500 transition-transform duration-300 group-hover/metric:scale-110" />

              <p
                className={`
                  mt-3
                  text-xl
                  font-black
                  ${
                    isDark
                      ? 'text-white'
                      : 'text-slate-950'
                  }
                `}
              >
                7
              </p>

              <p className={`text-[10px] ${subtle}`}>
                {t('inProgressShort')}
              </p>

            </div>

            {/* Resolution */}

            <div
              className={`
                group/metric
                rounded-xl
                border
                p-4
                transition-all
                duration-300
                hover:-translate-y-1
                ${
                  isDark
                    ? 'border-white/[0.07] bg-white/[0.025] hover:border-emerald-500/20'
                    : 'border-slate-200 bg-white/70 hover:border-emerald-200'
                }
              `}
            >

              <CheckCircle2 className="h-4 w-4 text-emerald-500 transition-transform duration-300 group-hover/metric:scale-110" />

              <p className="mt-3 text-xl font-black text-emerald-500">
                94.6%
              </p>

              <p className={`text-[10px] ${subtle}`}>
                {t('resolved')}
              </p>

            </div>

          </div>

          {/* =================================================
              CTA
          ================================================= */}

          <Link
            to="/map"
            className="
              group
              mt-8
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              px-5
              py-3
              text-xs
              font-black
              text-white
              shadow-lg
              shadow-blue-600/20
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
              hover:shadow-blue-600/30
            "
          >

            {t('openLiveMap')}

            <ArrowRight
              className="
                h-4
                w-4
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />

          </Link>

        </div>

      </div>

    </div>

  </div>

</section>

      {/* ========================================================
          FINAL CTA
      ======================================================== */}

{/* ========================================================
    FINAL CTA — CIVIC ACTION
======================================================== */}

<section className="relative z-10 px-5 pb-24 sm:px-8 lg:pb-32">

  <div className="mx-auto max-w-7xl">

    <div
      className={`
        relative
        overflow-hidden
        rounded-[2rem]
        border
        px-6
        py-20
        text-center
        shadow-2xl
        sm:px-10
        lg:py-24
        ${
          isDark
            ? 'border-blue-500/10 bg-gradient-to-br from-blue-600/[0.10] via-violet-600/[0.07] to-cyan-500/[0.08] shadow-black/30'
            : 'border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 shadow-slate-300/30'
        }
      `}
    >

      {/* ==================================================
          AMBIENT GLOW
      ================================================== */}

      <div
        className={`
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          blur-[110px]
          ${
            isDark
              ? 'bg-blue-600/[0.10]'
              : 'bg-blue-400/[0.12]'
          }
        `}
      />

      <div
        className={`
          pointer-events-none
          absolute
          -right-32
          -top-32
          h-72
          w-72
          rounded-full
          blur-[100px]
          ${
            isDark
              ? 'bg-violet-600/[0.10]'
              : 'bg-violet-400/[0.10]'
          }
        `}
      />

      {/* ==================================================
          3D RINGS
      ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[520px]
          w-[520px]
          -translate-x-1/2
          -translate-y-1/2
          [perspective:800px]
        "
      >

        <div
          className={`
            absolute
            inset-[16%]
            rounded-full
            border
            ${
              isDark
                ? 'border-blue-400/[0.10]'
                : 'border-blue-300/30'
            }
          `}
          style={{
            transform:
              'rotateX(65deg) rotateZ(20deg)',
          }}
        />

        <div
          className={`
            absolute
            inset-[27%]
            rounded-full
            border
            ${
              isDark
                ? 'border-violet-400/[0.10]'
                : 'border-violet-300/30'
            }
          `}
          style={{
            transform:
              'rotateX(65deg) rotateZ(-30deg)',
          }}
        />

        <div
          className={`
            absolute
            inset-[38%]
            rounded-full
            border
            ${
              isDark
                ? 'border-cyan-400/[0.08]'
                : 'border-cyan-300/30'
            }
          `}
          style={{
            transform:
              'rotateX(65deg) rotateZ(55deg)',
          }}
        />

      </div>

      {/* ==================================================
          CONTENT
      ================================================== */}

      <div className="relative z-10 mx-auto max-w-4xl">

        {/* Badge */}

        <div
          className={`
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            px-4
            py-2
            text-[9px]
            font-black
            uppercase
            tracking-[0.16em]
            ${
              isDark
                ? 'border-blue-400/10 bg-blue-500/10 text-blue-400'
                : 'border-blue-100 bg-white/80 text-blue-600'
            }
          `}
        >

          <span className="relative flex h-2 w-2">

            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-50" />

            <span className="relative h-2 w-2 rounded-full bg-emerald-500" />

          </span>

          <Shield className="h-3.5 w-3.5" />

          {t('builtForTransparency')}

        </div>

        {/* Heading */}

        <h2
          className={`
            mx-auto
            mt-7
            max-w-4xl
            text-3xl
            font-black
            leading-[1.02]
            tracking-[-0.055em]
            sm:text-5xl
            lg:text-6xl
            ${
              isDark
                ? 'text-white'
                : 'text-slate-950'
            }
          `}
        >

          {t('smarterCitiesStart')}

          <br />

          <span
            className="
              bg-gradient-to-r
              from-blue-500
              via-violet-500
              to-cyan-400
              bg-clip-text
              text-transparent
            "
          >
            {t('withSingleReport')}
          </span>

        </h2>

        {/* Description */}

        <p
          className={`
            mx-auto
            mt-6
            max-w-2xl
            text-sm
            leading-7
            sm:text-base
            ${muted}
          `}
        >
          {t('everyReportBecomes')}
        </p>

        {/* ==================================================
            ACTIONS
        ================================================== */}

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">

          {/* Report */}

          <Link
            to="/report"
            className="
              group
              inline-flex
              h-12
              items-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              px-6
              text-sm
              font-black
              text-white
              shadow-lg
              shadow-blue-600/25
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
              hover:shadow-blue-600/35
            "
          >

            <AlertCircle className="h-4 w-4" />

            {t('reportIssue')}

            <ArrowRight
              className="
                h-4
                w-4
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />

          </Link>

          {/* Live Map */}

          <Link
            to="/map"
            className={`
              group
              inline-flex
              h-12
              items-center
              gap-2
              rounded-xl
              border
              px-6
              text-sm
              font-black
              transition-all
              duration-300
              hover:-translate-y-1
              ${
                isDark
                  ? 'border-white/10 bg-white/[0.04] text-white hover:border-blue-400/20 hover:bg-white/[0.08]'
                  : 'border-slate-200 bg-white/80 text-slate-800 hover:border-blue-200 hover:text-blue-600'
              }
            `}
          >

            <MapPin className="h-4 w-4 text-blue-500" />

            {t('exploreLiveCity')}

            <ChevronRight
              className="
                h-4
                w-4
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />

          </Link>

        </div>

        {/* ==================================================
            TRUST POINTS
        ================================================== */}

        <div
          className={`
            mt-8
            flex
            flex-wrap
            items-center
            justify-center
            gap-x-6
            gap-y-3
            text-[9px]
            font-bold
            ${subtle}
          `}
        >

          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            AI-assisted triage
          </span>

          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            Transparent tracking
          </span>

          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            City-wide intelligence
          </span>

        </div>

      </div>

    </div>

  </div>

</section>

      {/* ========================================================
          FOOTER
      ======================================================== */}

      <footer
        className={`
          relative
          z-10
          border-t
          px-5
          py-8
          sm:px-8
          ${
            isDark
              ? 'border-white/[0.05] bg-[#060a12]'
              : 'border-slate-200 bg-white/70'
          }
        `}
      >

        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-blue-600
                to-violet-600
                text-white
                shadow-lg
                shadow-blue-500/20
              "
            >
              <Shield className="h-4 w-4" />
            </div>

            <div>

              <p
                className={`
                  text-xs
                  font-black
                  ${isDark ? 'text-white' : 'text-slate-900'}
                `}
              >
                CivicEye AI
              </p>

              <p className={`text-[9px] font-medium ${subtle}`}>
                © 2026 · {t('precisionGovernance')}
              </p>

            </div>

          </div>

          <div className="flex flex-wrap items-center gap-5 text-[10px] font-bold">

            <Link
              to="/privacy"
              className={`transition-colors hover:text-blue-500 ${muted}`}
            >
              {t('privacy')}
            </Link>

            <Link
              to="/terms"
              className={`transition-colors hover:text-blue-500 ${muted}`}
            >
              {t('terms')}
            </Link>

            <Link
              to="/api-docs"
              className={`transition-colors hover:text-blue-500 ${muted}`}
            >
              {t('apiDocs')}
            </Link>

            <Link
              to="/contact"
              className={`transition-colors hover:text-blue-500 ${muted}`}
            >
              {t('contact')}
            </Link>

          </div>

        </div>

      </footer>

      {/* ========================================================
          3D / MOTION CSS
      ======================================================== */}

      <style>
        {`
          .ce-3d-globe {
            transform-style: preserve-3d;
            animation: civicFloat 7s ease-in-out infinite;
          }

          .ce-orbit {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 330px;
            height: 150px;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            border: 1px solid rgba(59,130,246,.18);
            transform-style: preserve-3d;
            pointer-events: none;
          }

          .ce-orbit-one {
            transform:
              translate(-50%, -50%)
              rotateX(70deg)
              rotateZ(18deg)
              translateZ(20px);
            animation: civicOrbitOne 12s linear infinite;
          }

          .ce-orbit-two {
            width: 390px;
            height: 180px;
            border-color: rgba(139,92,246,.14);
            transform:
              translate(-50%, -50%)
              rotateX(70deg)
              rotateZ(-28deg)
              translateZ(-15px);
            animation: civicOrbitTwo 15s linear infinite reverse;
          }

          .ce-orbit-three {
            width: 430px;
            height: 210px;
            border-color: rgba(6,182,212,.10);
            transform:
              translate(-50%, -50%)
              rotateY(70deg)
              rotateZ(8deg)
              translateZ(-35px);
            animation: civicOrbitThree 18s linear infinite;
          }

          .ce-floating-node {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            border-radius: 999px;
            color: white;
            background:
              linear-gradient(
                135deg,
                rgba(59,130,246,.9),
                rgba(99,102,241,.75)
              );
            border: 1px solid rgba(255,255,255,.25);
            box-shadow:
              0 0 25px rgba(59,130,246,.35),
              inset 0 1px 1px rgba(255,255,255,.3);
            transform-style: preserve-3d;
            animation: civicNodeFloat 5s ease-in-out infinite;
            z-index: 5;
          }

          .ce-node-pulse {
            position: absolute;
            inset: -7px;
            border-radius: inherit;
            border: 1px solid rgba(59,130,246,.25);
            animation: civicPulse 2.5s ease-out infinite;
          }

          .node-one {
            left: 30%;
            top: 29%;
            animation-delay: -.5s;
          }

          .node-two {
            right: 24%;
            top: 23%;
            background:
              linear-gradient(
                135deg,
                rgba(139,92,246,.95),
                rgba(79,70,229,.75)
              );
            box-shadow:
              0 0 25px rgba(139,92,246,.35),
              inset 0 1px 1px rgba(255,255,255,.3);
            animation-delay: -1.5s;
          }

          .node-three {
            left: 18%;
            bottom: 29%;
            background:
              linear-gradient(
                135deg,
                rgba(239,68,68,.95),
                rgba(249,115,22,.8)
              );
            box-shadow:
              0 0 25px rgba(239,68,68,.30),
              inset 0 1px 1px rgba(255,255,255,.3);
            animation-delay: -2.5s;
          }

          .node-four {
            right: 18%;
            bottom: 27%;
            background:
              linear-gradient(
                135deg,
                rgba(16,185,129,.95),
                rgba(6,182,212,.8)
              );
            box-shadow:
              0 0 25px rgba(16,185,129,.30),
              inset 0 1px 1px rgba(255,255,255,.3);
            animation-delay: -3.5s;
          }

          .ce-3d-card {
            transform-style: preserve-3d;
            transform:
              perspective(800px)
              rotateY(-10deg)
              rotateX(5deg)
              translateZ(35px);
            box-shadow:
              0 30px 70px rgba(15,23,42,.16),
              inset 0 1px 1px rgba(255,255,255,.16);
            animation: civicCardFloat 6s ease-in-out infinite;
          }

          .ce-3d-card:nth-of-type(2) {
            animation-delay: -2s;
          }

          @keyframes civicFloat {
            0%,
            100% {
              transform:
                translate(-50%, -50%)
                translateY(0)
                rotateZ(0deg);
            }

            50% {
              transform:
                translate(-50%, -50%)
                translateY(-10px)
                rotateZ(2deg);
            }
          }

          @keyframes civicOrbitOne {
            from {
              transform:
                translate(-50%, -50%)
                rotateX(70deg)
                rotateZ(0deg)
                translateZ(20px);
            }

            to {
              transform:
                translate(-50%, -50%)
                rotateX(70deg)
                rotateZ(360deg)
                translateZ(20px);
            }
          }

          @keyframes civicOrbitTwo {
            from {
              transform:
                translate(-50%, -50%)
                rotateX(70deg)
                rotateZ(0deg)
                translateZ(-15px);
            }

            to {
              transform:
                translate(-50%, -50%)
                rotateX(70deg)
                rotateZ(360deg)
                translateZ(-15px);
            }
          }

          @keyframes civicOrbitThree {
            from {
              transform:
                translate(-50%, -50%)
                rotateY(70deg)
                rotateZ(0deg)
                translateZ(-35px);
            }

            to {
              transform:
                translate(-50%, -50%)
                rotateY(70deg)
                rotateZ(360deg)
                translateZ(-35px);
            }
          }

          @keyframes civicNodeFloat {
            0%,
            100% {
              transform:
                translate3d(0, 0, 30px)
                scale(1);
            }

            50% {
              transform:
                translate3d(0, -14px, 60px)
                scale(1.08);
            }
          }

          @keyframes civicPulse {
            0% {
              transform: scale(.7);
              opacity: .8;
            }

            70% {
              transform: scale(1.35);
              opacity: 0;
            }

            100% {
              transform: scale(1.35);
              opacity: 0;
            }
          }

          @keyframes civicCardFloat {
            0%,
            100% {
              transform:
                perspective(800px)
                rotateY(-10deg)
                rotateX(5deg)
                translate3d(0, 0, 35px);
            }

            50% {
              transform:
                perspective(800px)
                rotateY(-7deg)
                rotateX(3deg)
                translate3d(0, -9px, 50px);
            }
          }

          @media (max-width: 1023px) {
            .ce-orbit {
              opacity: .65;
            }

            .ce-3d-card {
              transform:
                perspective(800px)
                rotateY(-6deg)
                rotateX(3deg)
                translateZ(25px);
            }
          }

          @media (max-width: 640px) {
            .ce-orbit {
              transform: translate(-50%, -50%) scale(.72);
            }

            .ce-3d-globe {
              transform: translate(-50%, -50%) scale(.78);
            }

            .ce-3d-card {
              width: 140px;
              transform:
                perspective(800px)
                rotateY(-5deg)
                rotateX(2deg)
                translateZ(20px)
                scale(.88);
            }

            .node-one {
              left: 19%;
            }

            .node-two {
              right: 15%;
            }

            .node-three {
              left: 10%;
            }

            .node-four {
              right: 10%;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .ce-3d-globe,
            .ce-orbit,
            .ce-floating-node,
            .ce-node-pulse,
            .ce-3d-card {
              animation: none !important;
            }

            *,
            *::before,
            *::after {
              scroll-behavior: auto !important;
              transition-duration: .01ms !important;
            }
          }
        `}
      </style>

    </div>
  );
}