import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ArrowUpDown, ChevronRight, Eye, Shield, MapPin, Building } from 'lucide-react';
import { Sidebar } from '../../components/common/Sidebar';
import { PriorityBadge, StatusBadge } from '../../components/common/Badge';
import { useComplaints } from '../../context/ComplaintContext';

export function AuthorityQueuePage() {
  const { complaints } = useComplaints();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filtered = complaints.filter((c) => {
    if (deptFilter !== 'all' && c.departmentId !== deptFilter) return false;
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && c.priority !== priorityFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        c.id.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.categoryName.toLowerCase().includes(q) ||
        (c.location?.address && c.location.address.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar type="authority" />

      <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl overflow-y-auto">
        <div className="space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Municipal Complaint Queue
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Prioritized queue management with AI bounding box inspection and SLA dispatch.
              </p>
            </div>
            <span className="font-mono text-xs text-blue-700 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200 font-bold self-start sm:self-auto">
              Total in Queue: {filtered.length}
            </span>
          </div>

          {/* Filter Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search ticket ID, keywords, address..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
              >
                <option value="all">All Departments</option>
                <option value="road_maintenance">Road Maintenance</option>
                <option value="sanitation">Sanitation</option>
                <option value="water_supply">Water Supply</option>
                <option value="electrical">Electrical</option>
                <option value="drainage_flood">Drainage</option>
                <option value="traffic_mgmt">Traffic Infra</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
              >
                <option value="all">All Priorities</option>
                <option value="P1">P1 Critical</option>
                <option value="P2">P2 High</option>
                <option value="P3">P3 Medium</option>
                <option value="P4">P4 Low</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
              >
                <option value="all">All Statuses</option>
                <option value="Reported">Reported</option>
                <option value="AI Verified">AI Verified</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-500 uppercase">
                  <tr>
                    <th className="px-4 py-3.5">Ticket ID</th>
                    <th className="px-4 py-3.5">Issue & Photo</th>
                    <th className="px-4 py-3.5">Department</th>
                    <th className="px-4 py-3.5">Priority</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5">SLA Target</th>
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                        No tickets matching current filters.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((c) => (
                      <tr
                        key={c.id}
                        className="hover:bg-slate-50 transition-colors cursor-pointer group"
                        onClick={() => navigate(`/authority/inspection/${c.id}`)}
                      >
                        <td className="px-4 py-3 font-mono font-bold text-blue-600">
                          {c.id}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={c.imageUrl}
                              alt=""
                              className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                            />
                            <div className="min-w-0 max-w-xs">
                              <p className="font-bold text-slate-900 group-hover:text-blue-600 truncate">
                                {c.title}
                              </p>
                              <p className="text-[11px] text-slate-500 truncate">
                                📍 {c.location?.address}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-medium text-slate-700">
                          {c.departmentName.split(' ')[0]} {c.departmentName.split(' ')[1] || ''}
                        </td>
                        <td className="px-4 py-3">
                          <PriorityBadge priority={c.priority} />
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={c.status} />
                        </td>
                        <td className="px-4 py-3 font-mono text-[11px] text-slate-500">
                          {new Date(c.slaDeadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/authority/inspection/${c.id}`);
                            }}
                            className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                          >
                            Inspect AI →
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
