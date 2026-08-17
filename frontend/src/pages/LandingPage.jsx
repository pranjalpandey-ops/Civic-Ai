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
} from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';
import { useComplaints } from '../context/ComplaintContext';
import { LeafletMap } from '../components/maps/LeafletMap';

export function LandingPage() {
  const { t } = useLanguage();

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
   * STATS
   * ============================================================
   *
   * All text uses t() so it automatically changes when the
   * global language changes from English to Hindi.
   */

  const stats = [
    {
      label: t('activeSignals'),
      value: '342',
      description: t('liveAcrossCity'),
      icon: Activity,
    },
    {
      label: t('aiVerified'),
      value: '97%',
      description: t('classificationConfidence'),
      icon: BrainCircuit,
    },
    {
      label: t('avgResponse'),
      value: '4h 12m',
      description: t('fromReportToAction'),
      icon: Zap,
    },
    {
      label: t('citizensEngaged'),
      value: '2,847',
      description: t('activeContributors'),
      icon: Users,
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
    },
    {
      number: '02',
      title: t('aiUnderstands'),
      description: t('aiUnderstandsDesc'),
      icon: BrainCircuit,
    },
    {
      number: '03',
      title: t('cityResponds'),
      description: t('cityRespondsDesc'),
      icon: Route,
    },
    {
      number: '04',
      title: t('everyoneSees'),
      description: t('everyoneSeesDesc'),
      icon: Eye,
    },
  ];

  return (
    <div className="ce-page">

      {/* ========================================================
          HERO
      ======================================================== */}

      <section className="ce-hero">

        {/* ======================================================
            HERO LEFT
        ====================================================== */}

        <div className="ce-hero-content">

          {/* Badge */}
          <div className="ce-hero-badge">
            <span className="ce-live-dot" />

            {t('liveCityIntelligence')}

            <Sparkles className="w-3.5 h-3.5" />
          </div>

          {/* Heading */}
          <h1 className="ce-hero-title">

            {t('heroLine1')}

            <br />

            {t('heroLine2')}

            <br />

            {t('heroLine3')}

            <br />

            <span className="ce-gradient-text">

              {t('heroGradientLine1')}

              <br />

              {t('heroGradientLine2')}

            </span>

          </h1>

          {/* Description */}
          <p className="ce-hero-description">
            {t('heroDescription')}
          </p>

          {/* CTA */}
          <div className="ce-hero-actions">

            <Link
              to="/report"
              className="ce-primary-btn"
            >
              <AlertCircle className="w-4.5 h-4.5" />

              {t('reportIssue')}

              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/map"
              className="ce-secondary-btn"
            >
              <MapPin className="w-4.5 h-4.5 text-blue-400" />

              {t('exploreLiveCity')}
            </Link>

          </div>

          {/* Trust indicators */}
          <div className="ce-trust-row">

            <div className="ce-trust-item">
              <CheckCircle2 className="w-3.5 h-3.5" />

              {t('aiAssistedTriage')}
            </div>

            <div className="ce-trust-item">
              <CheckCircle2 className="w-3.5 h-3.5" />

              {t('transparentResponse')}
            </div>

            <div className="ce-trust-item">
              <CheckCircle2 className="w-3.5 h-3.5" />

              {t('cityWideIntelligence')}
            </div>

          </div>

        </div>

        {/* ======================================================
            HERO RIGHT — CITY MAP
        ====================================================== */}

        <div className="ce-map-card">

          {/* Grid */}
          <div className="ce-map-grid" />

          {/* Roads */}
          <div className="ce-map-road r1" />
          <div className="ce-map-road r2" />
          <div className="ce-map-road r3" />
          <div className="ce-map-road r4" />
          <div className="ce-map-road r5" />

          {/* Map panel */}
          <div className="ce-map-panel">

            <div className="ce-map-panel-title">

              <span className="ce-live-dot" />

              {t('liveCivicSignals')}

            </div>

            <div className="ce-map-panel-value">
              {t('ncrNetworkOperational')}
            </div>

          </div>

          {/* Statistics panel */}
          <div className="ce-map-stats">

            <div className="ce-map-stat">

              <span>
                {t('activeIncidents')}
              </span>

              <strong>
                342
              </strong>

            </div>

            <div className="ce-map-stat">

              <span>
                {t('aiVerified')}
              </span>

              <strong>
                18
              </strong>

            </div>

            <div className="ce-map-stat">

              <span>
                {t('critical')}
              </span>

              <strong className="text-red-400">
                7
              </strong>

            </div>

            <div className="ce-map-stat">

              <span>
                {t('satisfaction')}
              </span>

              <strong className="text-emerald-400">
                94.6%
              </strong>

            </div>

          </div>

          {/* ====================================================
              MAP NODES
          ==================================================== */}

          <div
            className="ce-map-node critical"
            style={{
              left: '54%',
              top: '48%',
            }}
          />

          <div
            className="ce-map-node"
            style={{
              left: '28%',
              top: '35%',
            }}
          />

          <div
            className="ce-map-node"
            style={{
              left: '73%',
              top: '30%',
            }}
          />

          <div
            className="ce-map-node green"
            style={{
              left: '31%',
              top: '68%',
            }}
          />

          <div
            className="ce-map-node"
            style={{
              left: '77%',
              top: '67%',
            }}
          />

          <div
            className="ce-map-node"
            style={{
              left: '46%',
              top: '75%',
            }}
          />

          {/* ====================================================
              MAP LABELS
          ==================================================== */}

          <div
            className="ce-map-label"
            style={{
              left: '16%',
              top: '27%',
            }}
          >

            <strong>
              {t('sector62')}
            </strong>

            <span>
              {t('potholeDetected')}
            </span>

          </div>

          <div
            className="ce-map-label"
            style={{
              right: '17%',
              top: '40%',
            }}
          >

            <strong>
              {t('nh24')}
            </strong>

            <span>
              {t('waterlogging')}
            </span>

          </div>

          <div
            className="ce-map-label"
            style={{
              left: '20%',
              bottom: '29%',
            }}
          >

            <strong>
              {t('sector18')}
            </strong>

            <span>
              {t('streetlightFailure')}
            </span>

          </div>

          {/* ====================================================
              MAP FOOTER
          ==================================================== */}

          <div className="ce-map-footer">

            <div className="flex items-center gap-3">

              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-400/10 flex items-center justify-center">

                <Radio className="w-4 h-4 text-blue-400" />

              </div>

              <div>

                <small>
                  {t('networkStatus')}
                </small>

                <strong>
                  24 {t('activeSignals')}
                </strong>

              </div>

            </div>

            <Link
              to="/map"
              className="flex items-center gap-1 text-[10px] font-bold text-blue-400 hover:text-blue-300"
            >

              {t('openLiveMap')}

              <ArrowRight className="w-3 h-3" />

            </Link>

          </div>

        </div>

      </section>

      {/* ========================================================
          SEARCH
      ======================================================== */}

      <section className="relative z-20 max-w-3xl mx-auto px-5">

        <form
          onSubmit={handleSearch}
          className="
            relative
            flex
            items-center
            rounded-2xl
            border
            border-slate-800
            bg-[#0b1220]/90
            shadow-2xl
            shadow-black/20
            backdrop-blur-xl
          "
        >

          <Search
            className="
              absolute
              left-4
              w-5
              h-5
              text-slate-500
            "
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
            placeholder={t('searchPlaceholder')}
            aria-label={t('searchPlaceholder')}
            className="
              w-full
              h-14
              bg-transparent
              pl-12
              pr-32
              text-sm
              text-white
              placeholder:text-slate-600
              outline-none
            "
          />

          <button
            type="submit"
            className="
              absolute
              right-2
              h-10
              px-4
              rounded-xl
              bg-blue-600
              hover:bg-blue-500
              text-white
              text-xs
              font-bold
              transition-colors
            "
          >
            {t('search')}
          </button>

          <div
            className="
              absolute
              right-24
              hidden
              sm:flex
              items-center
              gap-1
              text-[9px]
              font-bold
              text-blue-400
              uppercase
              tracking-wider
            "
          >

            <Sparkles className="w-3 h-3" />

            AI

          </div>

        </form>

      </section>

      {/* ========================================================
          SYSTEM OVERVIEW
      ======================================================== */}

      <section className="ce-section">

        <div className="ce-section-heading">

          <div className="ce-section-kicker">
            {t('systemOverview')}
          </div>

          <h2 className="ce-section-title">

            {t('intelligenceThatMoves')}

            <span className="ce-gradient-text">
              {' '}
              {t('citiesForward')}
            </span>

          </h2>

          <p className="ce-section-description">
            {t('liveIntelligenceNCR')}
          </p>

        </div>

        {/* Stats */}
        <div className="ce-stats-grid">

          {stats.map((stat) => {

            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="ce-stat-card"
              >

                <div className="flex items-center justify-between">

                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/10 flex items-center justify-center">

                    <Icon className="w-4 h-4 text-blue-400" />

                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-700" />

                </div>

                <div className="ce-stat-number">
                  {stat.value}
                </div>

                <div className="ce-stat-label">
                  {stat.label}
                </div>

                <p className="mt-2 text-[10px] text-slate-600">
                  {stat.description}
                </p>

              </div>
            );

          })}

        </div>

      </section>

      {/* ========================================================
          CIVICEYE LOOP
      ======================================================== */}

      <section className="ce-section">

        <div className="ce-section-heading">

          <div className="ce-section-kicker">
            {t('civicEyeLoop')}
          </div>

          <h2 className="ce-section-title">

            {t('fromCitizenSignal')}

            <br />

            {t('toCityAction')}

          </h2>

          <p className="ce-section-description">
            {t('completeLifecycle')}
          </p>

        </div>

        <div className="ce-process-grid">

          {processSteps.map((step) => {

            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="
                  ce-process-card
                  group
                  hover:border-blue-500/20
                  transition-colors
                "
              >

                <div className="flex items-center justify-between">

                  <span className="ce-process-number">
                    {step.number}
                  </span>

                  {step.number !== '04' && (
                    <ChevronRight className="w-4 h-4 text-slate-700" />
                  )}

                </div>

                <div
                  className="
                    ce-process-icon
                    group-hover:bg-blue-500/15
                    transition-colors
                  "
                >

                  <Icon className="w-5 h-5" />

                </div>

                <h3 className="ce-process-title">
                  {step.title}
                </h3>

                <p className="ce-process-text">
                  {step.description}
                </p>

              </div>
            );

          })}

        </div>

      </section>

      {/* ========================================================
          LIVE CITY PREVIEW
      ======================================================== */}

      <section className="ce-section">

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-5
            rounded-3xl
            border
            border-slate-800
            bg-[#0b1220]/70
            p-3
            overflow-hidden
          "
        >

          {/* Actual Leaflet map */}
          <div
            className="
              relative
              min-h-[390px]
              rounded-2xl
              overflow-hidden
            "
          >

            <LeafletMap
              complaints={complaints.slice(0, 8)}
              center={[28.6280, 77.3649]}
              zoom={13}
              height="100%"
              interactive={false}
            />

            <div
              className="
                absolute
                top-4
                left-4
                z-[400]
                flex
                items-center
                gap-2
                px-3
                py-2
                rounded-xl
                bg-[#080d18]/90
                border
                border-slate-700/60
                backdrop-blur-md
              "
            >

              <span
                className="
                  w-2
                  h-2
                  rounded-full
                  bg-emerald-400
                  shadow-[0_0_10px_rgba(52,211,153,0.8)]
                "
              />

              <span className="text-[10px] font-bold text-white">
                {t('liveCityMap')}
              </span>

            </div>

          </div>

          {/* Right content */}
          <div className="p-7 lg:p-10 flex flex-col justify-center">

            <div className="ce-section-kicker">
              {t('liveCityPreview')}
            </div>

            <h2
              className="
                mt-3
                text-3xl
                sm:text-4xl
                font-black
                tracking-tight
                text-white
              "
            >

              {t('seeEverySignal')}

              <br />

              <span className="ce-gradient-text">
                {t('trackEveryAction')}
              </span>

            </h2>

            <p
              className="
                mt-5
                text-sm
                leading-7
                text-slate-500
                max-w-lg
              "
            >
              {t('liveCityDescription')}
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3">

              {/* Active signals */}
              <div
                className="
                  p-4
                  rounded-xl
                  bg-slate-900/80
                  border
                  border-slate-800
                "
              >

                <Map className="w-4 h-4 text-blue-400" />

                <p className="mt-3 text-xl font-black text-white">
                  24
                </p>

                <p className="text-[10px] text-slate-600">
                  {t('activeSignals')}
                </p>

              </div>

              {/* AI verified */}
              <div
                className="
                  p-4
                  rounded-xl
                  bg-slate-900/80
                  border
                  border-slate-800
                "
              >

                <Database className="w-4 h-4 text-purple-400" />

                <p className="mt-3 text-xl font-black text-white">
                  18
                </p>

                <p className="text-[10px] text-slate-600">
                  {t('aiVerified')}
                </p>

              </div>

              {/* In progress */}
              <div
                className="
                  p-4
                  rounded-xl
                  bg-slate-900/80
                  border
                  border-slate-800
                "
              >

                <Clock3 className="w-4 h-4 text-orange-400" />

                <p className="mt-3 text-xl font-black text-white">
                  7
                </p>

                <p className="text-[10px] text-slate-600">
                  {t('inProgressShort')}
                </p>

              </div>

              {/* Resolved */}
              <div
                className="
                  p-4
                  rounded-xl
                  bg-slate-900/80
                  border
                  border-slate-800
                "
              >

                <CheckCircle2 className="w-4 h-4 text-emerald-400" />

                <p className="mt-3 text-xl font-black text-white">
                  14
                </p>

                <p className="text-[10px] text-slate-600">
                  {t('resolved')}
                </p>

              </div>

            </div>

            <Link
              to="/map"
              className="
                mt-7
                inline-flex
                items-center
                gap-2
                text-sm
                font-bold
                text-blue-400
                hover:text-blue-300
              "
            >

              {t('openLiveMap')}

              <ArrowRight className="w-4 h-4" />

            </Link>

          </div>

        </div>

      </section>

      {/* ========================================================
          FINAL CTA
      ======================================================== */}

      <section className="ce-section">

        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-blue-500/15
            bg-gradient-to-br
            from-blue-600/10
            via-indigo-600/5
            to-purple-600/10
            px-6
            py-14
            text-center
          "
        >

          <div
            className="
              absolute
              left-1/2
              top-0
              -translate-x-1/2
              w-72
              h-40
              rounded-full
              bg-blue-500/10
              blur-3xl
              pointer-events-none
            "
          />

          <div className="relative">

            <div
              className="
                inline-flex
                items-center
                gap-2
                text-blue-400
                text-[10px]
                font-bold
                uppercase
                tracking-[0.15em]
              "
            >

              <Shield className="w-3.5 h-3.5" />

              {t('builtForTransparency')}

            </div>

            <h2
              className="
                mt-4
                text-3xl
                sm:text-5xl
                font-black
                tracking-tight
                text-white
              "
            >

              {t('smarterCitiesStart')}

              <br />

              {t('withSingleReport')}

            </h2>

            <p
              className="
                max-w-xl
                mx-auto
                mt-4
                text-sm
                leading-7
                text-slate-500
              "
            >
              {t('everyReportBecomes')}
            </p>

            <div
              className="
                mt-7
                flex
                items-center
                justify-center
                gap-3
                flex-wrap
              "
            >

              <Link
                to="/report"
                className="ce-primary-btn"
              >

                {t('reportIssue')}

                <ArrowRight className="w-4 h-4" />

              </Link>

              <Link
                to="/map"
                className="ce-secondary-btn"
              >

                {t('exploreLiveCity')}

              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* ========================================================
          FOOTER
      ======================================================== */}

      <footer className="ce-footer">

        <div className="ce-footer-inner">

          <div className="ce-footer-text">

            © 2026 CivicEye AI.{' '}

            {t('precisionGovernance')}

          </div>

          <div className="ce-footer-links">

            <Link to="/privacy">
              {t('privacy')}
            </Link>

            <Link to="/terms">
              {t('terms')}
            </Link>

            <Link to="/api-docs">
              {t('apiDocs')}
            </Link>

            <Link to="/contact">
              {t('contact')}
            </Link>

          </div>

        </div>

      </footer>

    </div>
  );
}