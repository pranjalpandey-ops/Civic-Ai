import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  PlusCircle,
  MapPin,
  ChevronRight,
  SlidersHorizontal,
  FileText,
  Activity,
  CheckCircle2
} from 'lucide-react';

import { Sidebar } from '../../components/common/Sidebar';
import { PriorityBadge, StatusBadge } from '../../components/common/Badge';
import { useComplaints } from '../../context/ComplaintContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export function MyComplaintsPage() {
  const { complaints } = useComplaints();
  const { user } = useAuth();
  const { t = (k) => k } = useLanguage() || {};
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const citizenComplaints = complaints.filter(
    (c) =>
      c.citizenId === user?.id ||
      c.citizenId === 'usr_citizen_1'
  );

  const filtered = citizenComplaints.filter((c) => {

    if (
      statusFilter !== 'all' &&
      c.status !== statusFilter
    ) {
      return false;
    }

    if (
      priorityFilter !== 'all' &&
      c.priority !== priorityFilter
    ) {
      return false;
    }

    if (search.trim()) {
      const q = search.toLowerCase();

      return (
        c.title?.toLowerCase().includes(q) ||
        c.id?.toLowerCase().includes(q) ||
        c.location?.address?.toLowerCase().includes(q)
      );
    }

    return true;
  });

  const resolvedCount = citizenComplaints.filter((c) =>
    ['Resolved', 'Citizen Verified', 'Closed'].includes(c.status)
  ).length;

  const activeCount = citizenComplaints.filter((c) =>
    ['Reported', 'AI Verified', 'Assigned'].includes(c.status)
  ).length;

  const inProgressCount = citizenComplaints.filter(
    (c) => c.status === 'In Progress'
  ).length;

  return (
    <div className="min-h-screen bg-[#060914] text-slate-100 flex">

      <Sidebar type="citizen" />

      <main className="flex-1 min-w-0 overflow-y-auto">

        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-10 py-7">

          {/* HEADER */}
          <div className="
            flex flex-col lg:flex-row
            lg:items-center
            justify-between
            gap-5
            mb-7
          ">

            <div>
              <div className="
                flex items-center gap-2
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-blue-400
                mb-2
              ">
                <FileText className="w-3.5 h-3.5" />
                {t('myComplaints') || 'Civic Reports'}
              </div>

              <h1 className="
                text-2xl sm:text-3xl
                font-black
                tracking-tight
                text-white
              ">
                {t('myComplaints') || 'My Complaints'}
              </h1>

              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                Track your reported civic issues and municipal response.
              </p>
            </div>

            <button
              onClick={() => navigate('/report')}
              className="
                inline-flex items-center justify-center gap-2
                px-5 py-3
                rounded-xl
                bg-gradient-to-r from-blue-600 to-indigo-600
                hover:from-blue-500 hover:to-indigo-500
                text-white
                text-xs font-bold
                shadow-[0_12px_35px_rgba(37,99,235,0.28)]
                hover:-translate-y-0.5
                transition-all
              "
            >
              <PlusCircle className="w-4 h-4" />
              {t('reportIssue') || 'Report New Issue'}
            </button>
          </div>

          {/* STAT MINI CARDS */}
          <div className="
            grid grid-cols-1 sm:grid-cols-3
            gap-3
            mb-6
          ">

            <div className="
              relative overflow-hidden
              p-4 rounded-2xl
              bg-[#0b101d]
              border border-white/[0.07]
              shadow-[0_15px_40px_rgba(0,0,0,0.22)]
            ">
              <div className="absolute right-0 top-0 w-24 h-24 bg-blue-500/10 blur-3xl rounded-full" />

              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-slate-600 font-bold">
                    {t('totalReports') || 'Total Reports'}
                  </p>

                  <p className="text-2xl font-black text-white mt-1">
                    {citizenComplaints.length}
                  </p>
                </div>

                <div className="
                  w-9 h-9 rounded-xl
                  bg-blue-500/10
                  border border-blue-500/20
                  flex items-center justify-center
                ">
                  <FileText className="w-4 h-4 text-blue-400" />
                </div>
              </div>
            </div>

            <div className="
              p-4 rounded-2xl
              bg-[#0b101d]
              border border-white/[0.07]
              shadow-[0_15px_40px_rgba(0,0,0,0.22)]
            ">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-[9px] uppercase tracking-widest text-slate-600 font-bold">
                    {t('active') || 'Active'}
                  </p>

                  <p className="text-2xl font-black text-white mt-1">
                    {activeCount}
                  </p>
                </div>

                <div className="
                  w-9 h-9 rounded-xl
                  bg-purple-500/10
                  border border-purple-500/20
                  flex items-center justify-center
                ">
                  <Activity className="w-4 h-4 text-purple-400" />
                </div>
              </div>
            </div>

            <div className="
              p-4 rounded-2xl
              bg-[#0b101d]
              border border-white/[0.07]
              shadow-[0_15px_40px_rgba(0,0,0,0.22)]
            ">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-[9px] uppercase tracking-widest text-slate-600 font-bold">
                    {t('resolved') || 'Resolved'}
                  </p>

                  <p className="text-2xl font-black text-white mt-1">
                    {resolvedCount}
                  </p>
                </div>

                <div className="
                  w-9 h-9 rounded-xl
                  bg-emerald-500/10
                  border border-emerald-500/20
                  flex items-center justify-center
                ">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            </div>
          </div>

          {/* FILTER PANEL */}
          <div className="
            relative overflow-hidden
            bg-[#0b101d]
            border border-white/[0.07]
            rounded-3xl
            p-4
            mb-6
            shadow-[0_20px_55px_rgba(0,0,0,0.25)]
          ">

            <div className="flex flex-col lg:flex-row gap-3">

              <div className="relative flex-1">

                <Search className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  w-4 h-4
                  text-slate-600
                " />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search ticket ID, issue or location..."
                  className="
                    w-full
                    pl-11 pr-4 py-3
                    rounded-xl
                    bg-white/[0.03]
                    border border-white/[0.07]
                    text-xs text-white
                    placeholder:text-slate-600
                    focus:outline-none
                    focus:border-blue-500/40
                    focus:ring-2 focus:ring-blue-500/10
                    transition-all
                  "
                />
              </div>

              <div className="flex gap-2">

                <div className="relative flex-1">
                  <SlidersHorizontal className="
                    absolute left-3 top-1/2
                    -translate-y-1/2
                    w-3.5 h-3.5
                    text-slate-600
                    pointer-events-none
                  " />

                  <select
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(e.target.value)
                    }
                    className="
                      w-full
                      pl-9 pr-8 py-3
                      rounded-xl
                      bg-[#101625]
                      border border-white/[0.07]
                      text-xs font-semibold
                      text-slate-300
                      focus:outline-none
                    "
                  >
                    <option value="all">All Statuses</option>
                    <option value="Reported">Reported</option>
                    <option value="AI Verified">AI Verified</option>
                    <option value="Assigned">Assigned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Citizen Verified">Citizen Verified</option>
                  </select>
                </div>

                <select
                  value={priorityFilter}
                  onChange={(e) =>
                    setPriorityFilter(e.target.value)
                  }
                  className="
                    px-3 py-3
                    rounded-xl
                    bg-[#101625]
                    border border-white/[0.07]
                    text-xs font-semibold
                    text-slate-300
                    focus:outline-none
                  "
                >
                  <option value="all">All Priority</option>
                  <option value="P1">Critical</option>
                  <option value="P2">High</option>
                  <option value="P3">Medium</option>
                  <option value="P4">Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* RESULTS */}
          <div className="space-y-3">

            {filtered.length === 0 ? (

              <div className="
                py-16
                rounded-3xl
                bg-[#0b101d]
                border border-white/[0.07]
                text-center
              ">
                <FileText className="w-9 h-9 text-slate-700 mx-auto mb-3" />

                <h3 className="text-sm font-bold text-slate-400">
                  No complaints found
                </h3>

                <p className="text-xs text-slate-600 mt-1">
                  Try changing your search or filters.
                </p>
              </div>

            ) : (

              filtered.map((c) => (

                <div
                  key={c.id}
                  onClick={() =>
                    navigate(`/complaints/${c.id}`)
                  }
                  className="
                    group
                    relative overflow-hidden
                    p-4 sm:p-5
                    rounded-3xl
                    bg-[#0b101d]
                    border border-white/[0.07]
                    hover:border-blue-500/25
                    shadow-[0_15px_45px_rgba(0,0,0,0.2)]
                    hover:shadow-[0_20px_55px_rgba(37,99,235,0.10)]
                    hover:-translate-y-1
                    cursor-pointer
                    transition-all duration-300
                  "
                >

                  {/* Left Accent */}
                  <div
                    className={`
                      absolute left-0 top-5 bottom-5
                      w-[3px] rounded-r-full
                      ${
                        c.priority === 'P1'
                          ? 'bg-red-500'
                          : c.priority === 'P2'
                          ? 'bg-orange-500'
                          : c.priority === 'P3'
                          ? 'bg-amber-400'
                          : 'bg-blue-500'
                      }
                    `}
                  />

                  <div className="
                    flex flex-col md:flex-row
                    md:items-center
                    justify-between
                    gap-4
                  ">

                    <div className="
                      flex items-start
                      gap-4
                      min-w-0
                    ">

                      <div className="
                        w-20 h-20
                        rounded-2xl
                        overflow-hidden
                        bg-black
                        border border-white/[0.08]
                        shrink-0
                        shadow-inner
                      ">
                        <img
                          src={c.imageUrl}
                          alt={c.title}
                          className="
                            w-full h-full
                            object-cover
                            group-hover:scale-110
                            transition-transform duration-500
                          "
                        />
                      </div>

                      <div className="min-w-0">

                        <div className="
                          flex flex-wrap
                          items-center
                          gap-2
                          mb-2
                        ">
                          <span className="
                            font-mono
                            text-[10px]
                            font-bold
                            text-blue-400
                          ">
                            #{c.id}
                          </span>

                          <PriorityBadge
                            priority={c.priority}
                          />

                          <StatusBadge
                            status={c.status}
                          />
                        </div>

                        <h3 className="
                          text-sm sm:text-base
                          font-bold
                          text-white
                          group-hover:text-blue-400
                          transition-colors
                          truncate
                        ">
                          {c.title}
                        </h3>

                        <div className="
                          flex items-center
                          gap-1.5
                          mt-2
                          text-xs
                          text-slate-500
                        ">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />

                          <span className="truncate">
                            {c.location?.address || 'Location unavailable'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="
                      flex items-center
                      justify-between
                      md:justify-end
                      gap-5
                      shrink-0
                    ">

                      <div className="
                        hidden md:block
                        text-right
                      ">
                        <p className="text-[10px] text-slate-600 uppercase tracking-wider">
                          Reported
                        </p>

                        <p className="text-xs font-mono text-slate-400 mt-1">
                          {new Date(
                            c.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="
                        w-9 h-9
                        rounded-xl
                        bg-white/[0.03]
                        border border-white/[0.06]
                        flex items-center justify-center
                        text-slate-600
                        group-hover:text-blue-400
                        group-hover:bg-blue-500/10
                        group-hover:border-blue-500/20
                        transition-all
                      ">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </main>
    </div>
  );
}