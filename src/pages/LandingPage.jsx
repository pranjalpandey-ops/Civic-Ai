import React, { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Cpu,
  Eye,
  GitPullRequest,
  Layers3,
  MapPin,
  Maximize2,
  PlusCircle,
  Search,
  Shield,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";
import { useComplaints } from "../context/ComplaintContext";
import { LeafletMap } from "../components/maps/LeafletMap";

/* =========================================================
   CIVICEYE AI
   LANDING PAGE — PHASE 2
   ========================================================= */

const CITY_SIGNALS = [
  {
    id: "CE-2026-00124",
    type: "Pothole detected",
    location: "Sector 62",
    confidence: "97%",
    priority: "P1",
    level: "critical",
    x: 63,
    y: 42,
  },
  {
    id: "CE-2026-00131",
    type: "Waterlogging detected",
    location: "NH-24",
    confidence: "94%",
    priority: "P1",
    level: "critical",
    x: 76,
    y: 62,
  },
  {
    id: "CE-2026-00138",
    type: "Streetlight failure",
    location: "Sector 18",
    confidence: "91%",
    priority: "P2",
    level: "high",
    x: 34,
    y: 57,
  },
  {
    id: "CE-2026-00142",
    type: "Garbage accumulation",
    location: "Sector 51",
    confidence: "89%",
    priority: "P2",
    level: "high",
    x: 48,
    y: 72,
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Citizen reports",
    description:
      "A real-world signal enters the CivicEye network.",
    icon: AlertCircle,
  },
  {
    number: "02",
    title: "AI understands",
    description:
      "Evidence is classified, verified, and scored.",
    icon: Cpu,
  },
  {
    number: "03",
    title: "City responds",
    description:
      "The right department and crew are activated.",
    icon: Zap,
  },
  {
    number: "04",
    title: "Everyone sees progress",
    description:
      "Resolution becomes visible and accountable.",
    icon: Eye,
  },
];

function DigitalCity() {
  const [activeSignal, setActiveSignal] = useState(
    CITY_SIGNALS[0]
  );

  return (
    <div className="city-intelligence group">
      {/* Ambient environment */}

      <div className="city-glow city-glow--one" />
      <div className="city-glow city-glow--two" />

      <div className="city-grid" />

      <div className="city-gridline city-gridline--one" />
      <div className="city-gridline city-gridline--two" />

      {/* Roads */}

      <div className="city-road city-road--h" />
      <div className="city-road city-road--v" />
      <div className="city-road city-road--diag" />

      {/* Buildings */}

      <div className="city-block city-block--a" />
      <div className="city-block city-block--b" />
      <div className="city-block city-block--c" />
      <div className="city-block city-block--d" />
      <div className="city-block city-block--e" />
      <div className="city-block city-block--f" />

      {/* Top metadata */}

      <div className="city-corner city-corner--top">
        <div className="city-live">
          <span />
          LIVE CITY INTELLIGENCE
        </div>

        <span>
          NCR NODE / 28.6139° N / 77.2090° E
        </span>
      </div>

      {/* Signal nodes */}

      {CITY_SIGNALS.map((signal) => (
        <button
          key={signal.id}
          type="button"
          aria-label={`${signal.type} at ${signal.location}`}
          onClick={() => setActiveSignal(signal)}
          className={`
            city-node
            city-node--${signal.level}
            ${
              activeSignal.id === signal.id
                ? "is-active"
                : ""
            }
          `}
          style={{
            left: `${signal.x}%`,
            top: `${signal.y}%`,
          }}
        >
          <span className="city-node__ring" />
          <span className="city-node__dot" />
        </button>
      ))}

      {/* AI connection lines */}

      <div
        className="
          absolute left-[33%] top-[56%]
          h-px w-[30%]
          origin-left
          rotate-[-16deg]
          bg-gradient-to-r
          from-blue-400/0
          via-blue-400/30
          to-violet-400/70
          opacity-70
        "
      />

      <div
        className="
          absolute left-[49%] top-[48%]
          h-px w-[30%]
          origin-left
          rotate-[22deg]
          bg-gradient-to-r
          from-violet-400/0
          via-violet-400/35
          to-blue-400/60
          opacity-60
        "
      />

      <div
        className="
          absolute left-[42%] top-[52%]
          h-2 w-2
          rounded-full
          bg-violet-400
          shadow-[0_0_24px_rgba(124,92,255,0.8)]
          animate-ce-pulse
        "
      />

      {/* Center intelligence marker */}

      <div
        className="
          absolute left-[48%] top-[50%]
          z-[5]
          -translate-x-1/2
          -translate-y-1/2
        "
      >
        <div
          className="
            flex h-14 w-14
            items-center justify-center
            rounded-2xl
            border border-violet-400/30
            bg-violet-500/[0.08]
            shadow-[0_0_45px_rgba(124,92,255,0.2)]
            backdrop-blur-md
          "
        >
          <Sparkles
            className="h-6 w-6 text-violet-300"
            strokeWidth={1.7}
          />
        </div>

        <div
          className="
            absolute -inset-3
            rounded-[22px]
            border border-violet-400/10
            animate-ce-pulse
          "
        />
      </div>

      {/* Intelligence card */}

      <div className="city-intelligence-card">
        <div className="flex items-start gap-3">
          <div className="city-card-icon">
            <Sparkles
              className="h-4 w-4"
              strokeWidth={1.8}
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="city-card-kicker">
              AI INCIDENT INTELLIGENCE
            </p>

            <div className="mt-1 flex items-center justify-between gap-3">
              <p className="city-card-title">
                {activeSignal.type}
              </p>

              <span className="city-card-confidence">
                {activeSignal.confidence}
              </span>
            </div>
          </div>
        </div>

        <div className="city-card-grid">
          <span>
            <MapPin className="h-3 w-3 text-blue-400" />
            {activeSignal.location}
          </span>

          <span>
            <Target className="h-3 w-3 text-red-400" />
            {activeSignal.priority} PRIORITY
          </span>

          <span>
            <Cpu className="h-3 w-3 text-violet-400" />
            AI VERIFIED
          </span>

          <span>
            <Clock3 className="h-3 w-3 text-emerald-400" />
            LIVE
          </span>
        </div>
      </div>

      {/* Signal stack */}

      <div className="city-signal-stack">
        <div>
          <span className="city-signal-dot" />
          7 CRITICAL
        </div>

        <div>
          <span
            className="
              city-signal-dot
              !bg-amber-400
              !shadow-[0_0_10px_rgba(245,184,61,0.8)]
            "
          />
          18 AI VERIFIED
        </div>

        <div>
          <span
            className="
              city-signal-dot
              !bg-emerald-400
              !shadow-[0_0_10px_rgba(32,201,151,0.8)]
            "
          />
          94.6% SATISFACTION
        </div>
      </div>

      {/* Bottom label */}

      <div
        className="
          absolute
          right-5
          top-14
          z-[5]
          hidden
          rounded-lg
          border border-[#26344b]
          bg-[#07101e]/80
          px-3 py-2
          backdrop-blur-md
          sm:block
        "
      >
        <p className="text-[8px] font-bold tracking-[0.14em] text-[#68758a]">
          CIVIC INTELLIGENCE LAYER
        </p>

        <div className="mt-1 flex items-center gap-2">
          <span
            className="
              h-1.5 w-1.5
              rounded-full
              bg-blue-400
              shadow-[0_0_8px_rgba(59,130,246,0.8)]
            "
          />

          <span className="text-[9px] font-bold text-[#b8c5d8]">
            NETWORK OPERATIONAL
          </span>
        </div>
      </div>
    </div>
  );
}

function SignalRow({ signal }) {
  return (
    <div
      className="
        group flex items-center
        gap-3
        rounded-xl
        border border-[#202c42]
        bg-[#0a1020]/80
        px-3 py-2.5
        transition-all duration-200
        hover:border-[#34445f]
        hover:bg-[#10182a]
      "
    >
      <span
        className={`
          h-2 w-2
          shrink-0
          rounded-full
          ${
            signal.level === "critical"
              ? "bg-red-400 shadow-[0_0_10px_rgba(255,77,90,0.65)]"
              : "bg-amber-400 shadow-[0_0_10px_rgba(245,184,61,0.55)]"
          }
        `}
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <p className="truncate text-[0.72rem] font-bold text-white">
            {signal.type}
          </p>

          <span className="shrink-0 font-mono text-[0.62rem] font-bold text-blue-300">
            {signal.confidence}
          </span>
        </div>

        <p className="mt-0.5 text-[0.62rem] text-[#68758a]">
          {signal.location}
        </p>
      </div>

      <span
        className={`
          hidden rounded-md border px-1.5 py-1
          font-mono text-[0.58rem] font-bold sm:inline-flex
          ${
            signal.level === "critical"
              ? "border-red-400/20 bg-red-400/[0.06] text-red-300"
              : "border-amber-400/20 bg-amber-400/[0.06] text-amber-300"
          }
        `}
      >
        {signal.priority}
      </span>
    </div>
  );
}

export function LandingPage() {
  const { t } = useLanguage();
  const { complaints = [] } = useComplaints();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const liveSignals = useMemo(
    () => CITY_SIGNALS.slice(0, 3),
    []
  );

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      navigate("/map");
      return;
    }

    navigate(
      `/map?search=${encodeURIComponent(query)}`
    );
  };

  return (
    <div className="min-h-screen bg-[#050811] text-white">
      {/* =====================================================
          HERO
      ===================================================== */}

      <main>
        <section
          className="
            relative overflow-hidden
            border-b border-[#202c42]
          "
        >
          {/* Ambient background */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[-300px]
              h-[650px]
              w-[900px]
              -translate-x-1/2
              rounded-full
              bg-blue-500/[0.055]
              blur-[120px]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              right-[-180px]
              top-[180px]
              h-[420px]
              w-[420px]
              rounded-full
              bg-violet-500/[0.035]
              blur-[110px]
            "
          />

          <div
            className="
              relative
              mx-auto
              max-w-[1500px]
              px-4
              pb-16 pt-12
              sm:px-6 sm:pb-20 sm:pt-16
              lg:px-8 lg:pb-24 lg:pt-20
            "
          >
            <div
              className="
                grid
                items-center
                gap-10
                lg:grid-cols-[0.9fr_1.1fr]
                lg:gap-14
                xl:grid-cols-[0.82fr_1.18fr]
              "
            >
              {/* =================================================
                  HERO COPY
              ================================================= */}

              <div className="relative z-10 max-w-2xl">
                <div
                  className="
                    mb-6
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border border-blue-400/20
                    bg-blue-400/[0.05]
                    px-3 py-1.5
                  "
                >
                  <span
                    className="
                      h-1.5 w-1.5
                      rounded-full
                      bg-blue-400
                      shadow-[0_0_10px_rgba(59,130,246,0.8)]
                    "
                  />

                  <span
                    className="
                      text-[0.62rem]
                      font-bold
                      uppercase
                      tracking-[0.16em]
                      text-blue-300
                    "
                  >
                    Civic Intelligence Platform
                  </span>
                </div>

                <h1
                  className="
                    max-w-3xl
                    text-[clamp(2.8rem,6vw,5.7rem)]
                    font-extrabold
                    leading-[0.98]
                    tracking-[-0.055em]
                    text-white
                  "
                >
                  See the city.
                  <br />

                  <span className="text-[#b8c5d8]">
                    Understand the problem.
                  </span>

                  <br />

                  <span
                    className="
                      bg-gradient-to-r
                      from-blue-400
                      via-blue-300
                      to-violet-300
                      bg-clip-text
                      text-transparent
                    "
                  >
                    Move before it becomes a crisis.
                  </span>
                </h1>

                <p
                  className="
                    mt-7
                    max-w-xl
                    text-[0.95rem]
                    leading-7
                    text-[#9aa8be]
                    sm:text-[1rem]
                  "
                >
                  CivicEye AI transforms citizen signals into
                  verified, prioritized, and actionable municipal
                  intelligence — helping cities respond faster
                  and operate smarter.
                </p>

                {/* CTA */}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/report"
                    className="
                      ce-button-primary
                      min-h-[48px]
                      px-5
                      text-sm
                    "
                  >
                    <AlertCircle className="h-4 w-4" />

                    Report an Issue

                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    to="/map"
                    className="
                      ce-button-ghost
                      min-h-[48px]
                      px-5
                      text-sm
                    "
                  >
                    <MapPin className="h-4 w-4 text-blue-400" />

                    Explore Live City
                  </Link>
                </div>

                {/* Trust metadata */}

                <div
                  className="
                    mt-8
                    flex flex-wrap
                    items-center
                    gap-x-5 gap-y-3
                    text-[0.62rem]
                    font-semibold
                    text-[#68758a]
                  "
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    AI-assisted triage
                  </span>

                  <span className="flex items-center gap-2">
                    <Shield className="h-3.5 w-3.5 text-blue-400" />
                    Transparent response
                  </span>

                  <span className="flex items-center gap-2">
                    <Layers3 className="h-3.5 w-3.5 text-violet-400" />
                    City-wide intelligence
                  </span>
                </div>

                {/* Search */}

                <form
                  onSubmit={handleSearch}
                  className="
                    mt-10
                    max-w-xl
                  "
                >
                  <div
                    className="
                      relative
                      flex
                      items-center
                      rounded-xl
                      border border-[#26344b]
                      bg-[#0a1020]
                      transition-all
                      duration-200
                      focus-within:border-blue-400/50
                      focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]
                    "
                  >
                    <Search
                      className="
                        absolute left-4
                        h-4 w-4
                        text-[#68758a]
                      "
                    />

                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(event) =>
                        setSearchQuery(event.target.value)
                      }
                      placeholder="Search incidents, locations, departments..."
                      aria-label="Search CivicEye"
                      className="
                        min-w-0
                        flex-1
                        bg-transparent
                        px-11
                        py-3.5
                        text-xs
                        text-white
                        outline-none
                        placeholder:text-[#58667b]
                      "
                    />

                    <button
                      type="submit"
                      className="
                        mr-1.5
                        rounded-lg
                        bg-[#10182a]
                        px-3
                        py-2
                        text-[0.62rem]
                        font-bold
                        text-[#aebbd0]
                        transition-colors
                        hover:bg-[#182235]
                        hover:text-white
                      "
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>

              {/* =================================================
                  DIGITAL CITY
              ================================================= */}

              <div className="relative">
                <DigitalCity />

                {/* Small system label */}

                <div
                  className="
                    absolute
                    -bottom-4
                    left-5
                    z-10
                    rounded-xl
                    border border-[#26344b]
                    bg-[#0a1020]/95
                    px-3.5 py-2.5
                    shadow-[0_15px_40px_rgba(0,0,0,0.3)]
                    backdrop-blur-xl
                    sm:left-8
                  "
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="
                        flex h-6 w-6
                        items-center justify-center
                        rounded-md
                        bg-blue-500/[0.08]
                        text-blue-300
                      "
                    >
                      <Cpu className="h-3.5 w-3.5" />
                    </div>

                    <div>
                      <p className="text-[0.55rem] font-bold uppercase tracking-[0.13em] text-[#68758a]">
                        Intelligence Layer
                      </p>

                      <p className="font-mono text-[0.62rem] font-bold text-[#c8d2e1]">
                        99.98% OPERATIONAL
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                LIVE SIGNAL STRIP
            ================================================= */}

            <div
              className="
                mt-20
                grid
                gap-3
                border-t border-[#202c42]
                pt-5
                md:grid-cols-3
              "
            >
              {liveSignals.map((signal) => (
                <SignalRow
                  key={signal.id}
                  signal={signal}
                />
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            CIVIC INTELLIGENCE FLOW
        ===================================================== */}

        <section
          className="
            relative
            mx-auto
            max-w-[1500px]
            px-4
            py-20
            sm:px-6
            lg:px-8
            lg:py-28
          "
        >
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="ce-kicker text-blue-400">
                The CivicEye Loop
              </p>

              <h2
                className="
                  mt-4
                  max-w-xl
                  text-3xl
                  font-bold
                  leading-tight
                  tracking-[-0.035em]
                  text-white
                  sm:text-4xl
                "
              >
                From citizen signal
                <br />
                to city action.
              </h2>

              <p
                className="
                  mt-5
                  max-w-lg
                  text-sm
                  leading-7
                  text-[#8f9db2]
                "
              >
                CivicEye connects the entire response lifecycle.
                A report does not disappear into a database — it
                becomes intelligence, action, and visible progress.
              </p>

              <Link
                to="/map"
                className="
                  mt-7
                  inline-flex
                  items-center
                  gap-2
                  text-xs
                  font-bold
                  text-blue-400
                  transition-colors
                  hover:text-blue-300
                "
              >
                Explore the city network
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {PROCESS_STEPS.map((step) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="
                      ce-panel
                      ce-interactive
                      relative
                      overflow-hidden
                      p-5
                    "
                  >
                    <div
                      className="
                        flex items-start
                        justify-between
                        gap-4
                      "
                    >
                      <div
                        className="
                          flex h-10 w-10
                          items-center justify-center
                          rounded-xl
                          border border-blue-400/15
                          bg-blue-400/[0.05]
                          text-blue-300
                        "
                      >
                        <Icon
                          className="h-5 w-5"
                          strokeWidth={1.8}
                        />
                      </div>

                      <span
                        className="
                          font-mono
                          text-[0.6rem]
                          font-bold
                          tracking-[0.12em]
                          text-[#4f5d72]
                        "
                      >
                        {step.number}
                      </span>
                    </div>

                    <h3 className="mt-6 text-sm font-bold text-white">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-[#75849a]">
                      {step.description}
                    </p>

                    <div
                      className="
                        absolute
                        bottom-0
                        left-5
                        right-5
                        h-px
                        bg-gradient-to-r
                        from-blue-400/0
                        via-blue-400/20
                        to-blue-400/0
                      "
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            LIVE IMPACT
        ===================================================== */}

        <section
          className="
            border-y border-[#202c42]
            bg-[#070c16]
          "
        >
          <div
            className="
              mx-auto
              max-w-[1500px]
              px-4
              py-16
              sm:px-6
              lg:px-8
              lg:py-20
            "
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="ce-kicker text-emerald-400">
                  Live civic pulse
                </p>

                <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">
                  What the city is telling us.
                </h2>
              </div>

              <span className="font-mono text-[0.6rem] font-bold text-[#68758a]">
                LAST 24 HOURS / NCR NODE
              </span>
            </div>

            <div
              className="
                mt-8
                grid
                gap-3
                sm:grid-cols-2
                lg:grid-cols-4
              "
            >
              {/* Active */}

              <div className="ce-panel ce-interactive p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[0.68rem] font-semibold text-[#8190a6]">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    Active incidents
                  </div>

                  <TrendingDown className="h-4 w-4 text-emerald-400" />
                </div>

                <div className="mt-5 flex items-end gap-3">
                  <span className="text-3xl font-extrabold tracking-tight text-white">
                    342
                  </span>

                  <span className="mb-1 text-[0.6rem] font-bold text-emerald-400">
                    −12%
                  </span>
                </div>

                <p className="mt-2 text-[0.62rem] text-[#68758a]">
                  versus yesterday
                </p>
              </div>

              {/* Resolved */}

              <div className="ce-panel ce-interactive p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[0.68rem] font-semibold text-[#8190a6]">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Resolved this week
                  </div>

                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                </div>

                <div className="mt-5 flex items-end gap-3">
                  <span className="text-3xl font-extrabold tracking-tight text-white">
                    1,284
                  </span>

                  <span className="mb-1 text-[0.6rem] font-bold text-emerald-400">
                    +5%
                  </span>
                </div>

                <p className="mt-2 text-[0.62rem] text-[#68758a]">
                  versus last week
                </p>
              </div>

              {/* Resolution */}

              <div className="ce-panel ce-interactive p-5">
                <div className="flex items-center gap-2 text-[0.68rem] font-semibold text-[#8190a6]">
                  <Clock3 className="h-4 w-4 text-blue-400" />
                  Average response
                </div>

                <div className="mt-5 text-3xl font-extrabold tracking-tight text-white">
                  4h 12m
                </div>

                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#202c42]">
                  <div className="h-full w-[74%] rounded-full bg-blue-500" />
                </div>

                <p className="mt-2 text-[0.62rem] text-[#68758a]">
                  74% within target SLA
                </p>
              </div>

              {/* Satisfaction */}

              <div className="ce-panel ce-interactive p-5">
                <div className="flex items-center gap-2 text-[0.68rem] font-semibold text-[#8190a6]">
                  <Users className="h-4 w-4 text-violet-400" />
                  Citizen satisfaction
                </div>

                <div className="mt-5 flex items-end gap-3">
                  <span className="text-3xl font-extrabold tracking-tight text-white">
                    94.6%
                  </span>

                  <span className="mb-1 text-[0.6rem] font-bold text-emerald-400">
                    healthy
                  </span>
                </div>

                <div className="mt-4 flex gap-1">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <span
                      key={item}
                      className={`
                        h-1.5 flex-1 rounded-full
                        ${
                          item === 5
                            ? "bg-[#26344b]"
                            : "bg-emerald-400"
                        }
                      `}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            LIVE MAP PREVIEW
        ===================================================== */}

        <section
          className="
            mx-auto
            max-w-[1500px]
            px-4
            py-20
            sm:px-6
            lg:px-8
            lg:py-28
          "
        >
          <div
            className="
              mb-8
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <p className="ce-kicker text-blue-400">
                See the city
              </p>

              <h2
                className="
                  mt-3
                  text-2xl
                  font-bold
                  tracking-[-0.03em]
                  text-white
                  sm:text-3xl
                "
              >
                One map. Every signal.
              </h2>

              <p className="mt-2 max-w-xl text-sm text-[#7f8da2]">
                Incidents, infrastructure, and response activity
                connected in one operational view.
              </p>
            </div>

            <Link
              to="/map"
              className="
                inline-flex
                items-center
                gap-2
                self-start
                rounded-lg
                border border-[#26344b]
                bg-[#0a1020]
                px-3.5 py-2.5
                text-xs
                font-bold
                text-[#b8c5d8]
                transition-all
                hover:border-[#3a4a65]
                hover:bg-[#10182a]
                hover:text-white
              "
            >
              Open Live Map
              <Maximize2 className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div
            className="
              grid
              overflow-hidden
              rounded-2xl
              border border-[#202c42]
              bg-[#0a1020]
              shadow-[0_30px_80px_rgba(0,0,0,0.25)]
              lg:grid-cols-[1fr_320px]
            "
          >
            {/* Map */}

            <div className="relative min-h-[380px] lg:min-h-[520px]">
              <LeafletMap
                complaints={complaints.slice(0, 12)}
                center={[28.628, 77.3649]}
                zoom={12.5}
                height="100%"
                interactive={false}
              />

              {/* Map overlay */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-4
                  z-[400]
                  rounded-lg
                  border border-[#26344b]
                  bg-[#07101e]/90
                  px-3
                  py-2
                  backdrop-blur-md
                "
              >
                <div className="flex items-center gap-2">
                  <span
                    className="
                      h-1.5 w-1.5
                      rounded-full
                      bg-emerald-400
                      shadow-[0_0_9px_rgba(32,201,151,0.8)]
                    "
                  />

                  <span className="font-mono text-[0.6rem] font-bold text-[#c1ccdc]">
                    LIVE / 2s SYNC
                  </span>
                </div>
              </div>
            </div>

            {/* Activity */}

            <aside
              className="
                border-t
                border-[#202c42]
                bg-[#070c16]
                lg:border-l
                lg:border-t-0
              "
            >
              <div className="border-b border-[#202c42] px-5 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.15em] text-[#68758a]">
                      Live activity
                    </p>

                    <p className="mt-1 text-sm font-bold text-white">
                      City response feed
                    </p>
                  </div>

                  <span
                    className="
                      rounded-md
                      border border-emerald-400/20
                      bg-emerald-400/[0.05]
                      px-2
                      py-1
                      font-mono
                      text-[0.55rem]
                      font-bold
                      text-emerald-300
                    "
                  >
                    LIVE
                  </span>
                </div>
              </div>

              <div className="divide-y divide-[#202c42]">
                <div className="p-5">
                  <p className="font-mono text-[0.55rem] text-[#536176]">
                    02:41:18
                  </p>

                  <p className="mt-2 text-xs font-bold text-white">
                    AI verified
                  </p>

                  <p className="mt-1 text-[0.65rem] text-[#7f8da2]">
                    Waterlogging · NH-24
                  </p>
                </div>

                <div className="p-5">
                  <p className="font-mono text-[0.55rem] text-[#536176]">
                    02:40:53
                  </p>

                  <p className="mt-2 text-xs font-bold text-white">
                    Crew dispatched
                  </p>

                  <p className="mt-1 text-[0.65rem] text-[#7f8da2]">
                    Drainage Team 04 · ETA 18m
                  </p>
                </div>

                <div className="p-5">
                  <p className="font-mono text-[0.55rem] text-[#536176]">
                    02:39:22
                  </p>

                  <p className="mt-2 text-xs font-bold text-white">
                    Priority escalated
                  </p>

                  <p className="mt-1 text-[0.65rem] text-[#7f8da2]">
                    Sector 51 · P2 → P1
                  </p>
                </div>

                <div className="p-5">
                  <p className="font-mono text-[0.55rem] text-[#536176]">
                    02:37:04
                  </p>

                  <p className="mt-2 text-xs font-bold text-white">
                    Incident resolved
                  </p>

                  <p className="mt-1 text-[0.65rem] text-[#7f8da2]">
                    Streetlight · Sector 18
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* =====================================================
            INTELLIGENCE CAPABILITIES
        ===================================================== */}

        <section
          className="
            border-t border-[#202c42]
            bg-[#070c16]
          "
        >
          <div
            className="
              mx-auto
              max-w-[1500px]
              px-4
              py-20
              sm:px-6
              lg:px-8
              lg:py-24
            "
          >
            <div className="max-w-2xl">
              <p className="ce-kicker text-violet-400">
                Built for civic intelligence
              </p>

              <h2
                className="
                  mt-4
                  text-3xl
                  font-bold
                  tracking-[-0.04em]
                  text-white
                  sm:text-4xl
                "
              >
                Intelligence where the city needs it.
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#7f8da2]">
                CivicEye brings AI into the operational workflow
                without hiding the reasoning from the people who
                depend on it.
              </p>
            </div>

            <div
              className="
                mt-10
                grid
                gap-3
                md:grid-cols-3
              "
            >
              {/* AI detection */}

              <div className="ce-panel ce-interactive p-6">
                <div
                  className="
                    flex h-11 w-11
                    items-center justify-center
                    rounded-xl
                    border border-violet-400/15
                    bg-violet-400/[0.06]
                    text-violet-300
                  "
                >
                  <Cpu className="h-5 w-5" />
                </div>

                <h3 className="mt-7 text-base font-bold text-white">
                  AI Detection
                </h3>

                <p className="mt-3 text-xs leading-6 text-[#7f8da2]">
                  Understand images, descriptions, locations,
                  duplicate reports, and severity signals.
                </p>

                <div
                  className="
                    mt-6
                    flex
                    items-center
                    gap-2
                    border-t border-[#202c42]
                    pt-4
                  "
                >
                  <span className="font-mono text-[0.6rem] font-bold text-violet-300">
                    97.4%
                  </span>

                  <span className="text-[0.6rem] text-[#536176]">
                    average confidence
                  </span>
                </div>
              </div>

              {/* Rapid routing */}

              <div className="ce-panel ce-interactive p-6">
                <div
                  className="
                    flex h-11 w-11
                    items-center justify-center
                    rounded-xl
                    border border-blue-400/15
                    bg-blue-400/[0.06]
                    text-blue-300
                  "
                >
                  <GitPullRequest className="h-5 w-5" />
                </div>

                <h3 className="mt-7 text-base font-bold text-white">
                  Rapid Routing
                </h3>

                <p className="mt-3 text-xs leading-6 text-[#7f8da2]">
                  Automatically connect verified incidents to
                  the right department, priority, and response
                  path.
                </p>

                <div
                  className="
                    mt-6
                    flex
                    items-center
                    gap-2
                    border-t border-[#202c42]
                    pt-4
                  "
                >
                  <span className="font-mono text-[0.6rem] font-bold text-blue-300">
                    18 min
                  </span>

                  <span className="text-[0.6rem] text-[#536176]">
                    target dispatch ETA
                  </span>
                </div>
              </div>

              {/* Transparency */}

              <div className="ce-panel ce-interactive p-6">
                <div
                  className="
                    flex h-11 w-11
                    items-center justify-center
                    rounded-xl
                    border border-emerald-400/15
                    bg-emerald-400/[0.06]
                    text-emerald-300
                  "
                >
                  <Eye className="h-5 w-5" />
                </div>

                <h3 className="mt-7 text-base font-bold text-white">
                  Citizen Transparency
                </h3>

                <p className="mt-3 text-xs leading-6 text-[#7f8da2]">
                  Every report has a visible lifecycle — from
                  submission to AI verification to resolution.
                </p>

                <div
                  className="
                    mt-6
                    flex
                    items-center
                    gap-2
                    border-t border-[#202c42]
                    pt-4
                  "
                >
                  <span className="font-mono text-[0.6rem] font-bold text-emerald-300">
                    100%
                  </span>

                  <span className="text-[0.6rem] text-[#536176]">
                    lifecycle visibility
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ===================================================== */}

        <section
          className="
            mx-auto
            max-w-[1500px]
            px-4
            py-20
            sm:px-6
            lg:px-8
            lg:py-28
          "
        >
          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              border border-blue-400/15
              bg-[#0a1020]
              p-8
              sm:p-10
              lg:p-14
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                -right-20
                -top-32
                h-80
                w-80
                rounded-full
                bg-blue-500/[0.08]
                blur-[100px]
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -bottom-32
                left-1/3
                h-72
                w-72
                rounded-full
                bg-violet-500/[0.05]
                blur-[100px]
              "
            />

            <div className="relative z-10 max-w-3xl">
              <p className="ce-kicker text-blue-400">
                CivicEye AI
              </p>

              <h2
                className="
                  mt-4
                  text-3xl
                  font-extrabold
                  tracking-[-0.04em]
                  text-white
                  sm:text-4xl
                  lg:text-5xl
                "
              >
                The city is sending signals.
                <br />
                <span className="text-[#8e9db4]">
                  CivicEye turns them into action.
                </span>
              </h2>

              <p
                className="
                  mt-5
                  max-w-2xl
                  text-sm
                  leading-7
                  text-[#7f8da2]
                "
              >
                See what is happening. Understand why it matters.
                Move the right people at the right time.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/report"
                  className="ce-button-primary"
                >
                  <PlusCircle className="h-4 w-4" />
                  Report an Issue
                </Link>

                <Link
                  to="/authority"
                  className="ce-button-ghost"
                >
                  Open Command Center
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-[#202c42] bg-[#050811]">
        <div
          className="
            mx-auto
            flex
            max-w-[1500px]
            flex-col
            gap-5
            px-4
            py-8
            sm:px-6
            lg:flex-row
            lg:items-center
            lg:justify-between
            lg:px-8
          "
        >
          <div>
            <div className="flex items-center gap-2">
              <div
                className="
                  flex h-7 w-7
                  items-center justify-center
                  rounded-lg
                  bg-blue-600
                  text-white
                "
              >
                <Shield className="h-3.5 w-3.5" />
              </div>

              <span className="text-xs font-bold text-white">
                CivicEye AI
              </span>
            </div>

            <p className="mt-2 text-[0.6rem] text-[#536176]">
              Precision urban intelligence.
            </p>
          </div>

          <div
            className="
              flex flex-wrap
              gap-x-5 gap-y-2
              text-[0.62rem]
              font-semibold
              text-[#68758a]
            "
          >
            <Link
              to="/privacy"
              className="transition-colors hover:text-blue-300"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="transition-colors hover:text-blue-300"
            >
              Terms
            </Link>

            <Link
              to="/api-docs"
              className="transition-colors hover:text-blue-300"
            >
              API
            </Link>

            <Link
              to="/contact"
              className="transition-colors hover:text-blue-300"
            >
              Support
            </Link>
          </div>

          <p className="font-mono text-[0.58rem] text-[#4f5d72]">
            © 2026 CIVICEYE AI / SYSTEM ONLINE
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;