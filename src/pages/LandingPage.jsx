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

    navigate(
      `/map?search=${encodeURIComponent(query)}`
    );
  };

  const stats = [
    {
      label: 'Active Signals',
      value: '342',
      description: 'Live across the city',
      icon: Activity,
    },
    {
      label: 'AI Verified',
      value: '97%',
      description: 'Classification confidence',
      icon: BrainCircuit,
    },
    {
      label: 'Avg Response',
      value: '4h 12m',
      description: 'From report to action',
      icon: Zap,
    },
    {
      label: 'Citizens Engaged',
      value: '2,847',
      description: 'Active contributors',
      icon: Users,
    },
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Citizen reports',
      description:
        'A real-world civic signal enters the CivicEye network.',
      icon: Shield,
    },
    {
      number: '02',
      title: 'AI understands',
      description:
        'Evidence is classified, verified and intelligently scored.',
      icon: BrainCircuit,
    },
    {
      number: '03',
      title: 'City responds',
      description:
        'The right department and response team are activated.',
      icon: Route,
    },
    {
      number: '04',
      title: 'Everyone sees',
      description:
        'Resolution becomes visible, measurable and accountable.',
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

            LIVE CITY INTELLIGENCE

            <Sparkles className="w-3.5 h-3.5" />
          </div>

          {/* Heading */}
          <h1 className="ce-hero-title">

            See the city.

            <br />

            Understand
            <br />

            the problem.

            <br />

            <span className="ce-gradient-text">
              Move before it becomes
              a crisis.
            </span>

          </h1>

          {/* Description */}
          <p className="ce-hero-description">
            CivicEye AI transforms citizen signals
            into verified, prioritized and actionable
            municipal intelligence — helping cities
            respond faster and operate smarter.
          </p>

          {/* CTA */}
          <div className="ce-hero-actions">

            <Link
              to="/report"
              className="ce-primary-btn"
            >
              <AlertCircle className="w-4.5 h-4.5" />

              Report an Issue

              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/map"
              className="ce-secondary-btn"
            >
              <MapPin className="w-4.5 h-4.5 text-blue-400" />

              Explore Live City
            </Link>

          </div>

          {/* Trust indicators */}
          <div className="ce-trust-row">

            <div className="ce-trust-item">
              <CheckCircle2 className="w-3.5 h-3.5" />
              AI-assisted triage
            </div>

            <div className="ce-trust-item">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Transparent response
            </div>

            <div className="ce-trust-item">
              <CheckCircle2 className="w-3.5 h-3.5" />
              City-wide intelligence
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

              LIVE CIVIC SIGNALS
            </div>

            <div className="ce-map-panel-value">
              NCR NODE / NETWORK OPERATIONAL
            </div>

          </div>

          {/* Statistics panel */}
          <div className="ce-map-stats">

            <div className="ce-map-stat">
              <span>Active incidents</span>
              <strong>342</strong>
            </div>

            <div className="ce-map-stat">
              <span>AI verified</span>
              <strong>18</strong>
            </div>

            <div className="ce-map-stat">
              <span>Critical</span>
              <strong className="text-red-400">
                7
              </strong>
            </div>

            <div className="ce-map-stat">
              <span>Satisfaction</span>
              <strong className="text-emerald-400">
                94.6%
              </strong>
            </div>

          </div>

          {/* Map nodes */}

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

          {/* Labels */}

          <div
            className="ce-map-label"
            style={{
              left: '16%',
              top: '27%',
            }}
          >
            <strong>
              Sector 62
            </strong>

            <span>
              Pothole detected · P1
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
              NH-24
            </strong>

            <span>
              Waterlogging · P1
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
              Sector 18
            </strong>

            <span>
              Streetlight failure
            </span>
          </div>

          {/* Bottom map information */}
          <div className="ce-map-footer">

            <div className="flex items-center gap-3">

              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-400/10 flex items-center justify-center">
                <Radio className="w-4 h-4 text-blue-400" />
              </div>

              <div>
                <small>
                  NETWORK STATUS
                </small>

                <strong>
                  24 active signals
                </strong>
              </div>

            </div>

            <Link
              to="/map"
              className="flex items-center gap-1 text-[10px] font-bold text-blue-400 hover:text-blue-300"
            >
              Open Live Map

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
              setSearchQuery(
                event.target.value
              )
            }
            placeholder="Search reports, locations or departments..."
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
            Search
          </button>

          <div className="
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
          ">
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
            CIVICEYE SYSTEM OVERVIEW
          </div>

          <h2 className="ce-section-title">
            Intelligence that moves
            <span className="ce-gradient-text">
              {" "}cities forward.
            </span>
          </h2>

          <p className="ce-section-description">
            Live intelligence from NCR-07
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
            THE CIVICEYE LOOP
          </div>

          <h2 className="ce-section-title">
            From citizen signal
            <br />
            to city action.
          </h2>

          <p className="ce-section-description">
            CivicEye connects the complete
            response lifecycle.
          </p>

        </div>

        <div className="ce-process-grid">

          {processSteps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="ce-process-card group hover:border-blue-500/20 transition-colors"
              >

                <div className="flex items-center justify-between">

                  <span className="ce-process-number">
                    {step.number}
                  </span>

                  {step.number !== '04' && (
                    <ChevronRight className="w-4 h-4 text-slate-700" />
                  )}

                </div>

                <div className="ce-process-icon group-hover:bg-blue-500/15 transition-colors">
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
          <div className="relative min-h-[390px] rounded-2xl overflow-hidden">

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
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />

              <span className="text-[10px] font-bold text-white">
                LIVE CITY MAP
              </span>
            </div>

          </div>

          {/* Right content */}
          <div className="p-7 lg:p-10 flex flex-col justify-center">

            <div className="ce-section-kicker">
              LIVE CITY PREVIEW
            </div>

            <h2 className="
              mt-3
              text-3xl
              sm:text-4xl
              font-black
              tracking-tight
              text-white
            ">
              See every signal.
              <br />

              <span className="ce-gradient-text">
                Track every action.
              </span>
            </h2>

            <p className="
              mt-5
              text-sm
              leading-7
              text-slate-500
              max-w-lg
            ">
              Citizens report problems.
              AI verifies and prioritizes them.
              Authorities receive actionable
              intelligence. Everyone sees the
              progress.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3">

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <Map className="w-4 h-4 text-blue-400" />

                <p className="mt-3 text-xl font-black text-white">
                  24
                </p>

                <p className="text-[10px] text-slate-600">
                  Active signals
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <Database className="w-4 h-4 text-purple-400" />

                <p className="mt-3 text-xl font-black text-white">
                  18
                </p>

                <p className="text-[10px] text-slate-600">
                  AI verified
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <Clock3 className="w-4 h-4 text-orange-400" />

                <p className="mt-3 text-xl font-black text-white">
                  7
                </p>

                <p className="text-[10px] text-slate-600">
                  In progress
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />

                <p className="mt-3 text-xl font-black text-white">
                  14
                </p>

                <p className="text-[10px] text-slate-600">
                  Resolved
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
              Open full live map

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

          <div className="
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
          " />

          <div className="relative">

            <div className="inline-flex items-center gap-2 text-blue-400 text-[10px] font-bold uppercase tracking-[0.15em]">
              <Shield className="w-3.5 h-3.5" />
              Built for transparency
            </div>

            <h2 className="
              mt-4
              text-3xl
              sm:text-5xl
              font-black
              tracking-tight
              text-white
            ">
              Smarter cities start
              <br />
              with a single report.
            </h2>

            <p className="
              max-w-xl
              mx-auto
              mt-4
              text-sm
              leading-7
              text-slate-500
            ">
              Every report becomes intelligence,
              action and visible progress.
            </p>

            <div className="
              mt-7
              flex
              items-center
              justify-center
              gap-3
              flex-wrap
            ">

              <Link
                to="/report"
                className="ce-primary-btn"
              >
                Report an Issue
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/map"
                className="ce-secondary-btn"
              >
                Explore Live City
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
            © 2026 CivicEye AI.
            Precision Urban Governance.
          </div>

          <div className="ce-footer-links">

            <Link to="/privacy">
              Privacy
            </Link>

            <Link to="/terms">
              Terms
            </Link>

            <Link to="/api-docs">
              API Docs
            </Link>

            <Link to="/contact">
              Contact
            </Link>

          </div>

        </div>

      </footer>

    </div>
  );
}