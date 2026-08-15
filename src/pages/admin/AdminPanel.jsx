import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Users,
  Layers,
  Cpu,
  ShieldCheck,
  FileText,
  Sliders,
  CheckCircle2,
  Download,
  AlertCircle
} from 'lucide-react';
import { Sidebar } from '../../components/common/Sidebar';
import { useComplaints } from '../../context/ComplaintContext';

export function AdminPanelPage() {
  const { complaints } = useComplaints();
  const navigate = useNavigate();

  const [aiConfidenceThreshold, setAiConfidenceThreshold] = useState(85);
  const [duplicateRadius, setDuplicateRadius] = useState(150);
  const [p1SlaHours, setP1SlaHours] = useState(4);
  const [savedMessage, setSavedMessage] = useState('');

  const handleSaveConfigs = (e) => {
    e.preventDefault();
    setSavedMessage('Municipal AI & SLA parameters updated successfully across cluster.');
    setTimeout(() => setSavedMessage(''), 4000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar type="admin" />

      <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl overflow-y-auto">
        <div className="space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-purple-100 text-purple-700">
                  SYSTEM GOVERNANCE ROOT
                </span>
                <span className="text-xs text-slate-400">Version 2.4.0-PROD</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Municipal Governance Administration
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Configure departments, assign lead engineers, tune AI triage sensitivity, and monitor compliance.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/admin/reports')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export SLA Reports</span>
              </button>
            </div>
          </div>

          {/* Toast */}
          {savedMessage && (
            <div className="p-3.5 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 shadow-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{savedMessage}</span>
            </div>
          )}

          {/* 3 Config Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* AI Model Sensitivity Settings */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Cpu className="w-4 h-4 text-blue-600" />
                <span>AI Vision & NLP Sensitivity</span>
              </div>

              <form onSubmit={handleSaveConfigs} className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-medium text-slate-700 mb-1">
                    <span>Auto-Verification Confidence</span>
                    <span className="font-mono font-bold text-blue-600">{aiConfidenceThreshold}%</span>
                  </div>
                  <input
                    type="range"
                    min="70"
                    max="99"
                    value={aiConfidenceThreshold}
                    onChange={(e) => setAiConfidenceThreshold(e.target.value)}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Reports above this threshold bypass manual supervisor triage.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between font-medium text-slate-700 mb-1">
                    <span>Duplicate Radius Threshold</span>
                    <span className="font-mono font-bold text-blue-600">{duplicateRadius}m</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="25"
                    value={duplicateRadius}
                    onChange={(e) => setDuplicateRadius(e.target.value)}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Haversine distance for automatic duplicate complaint detection.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Save AI Parameters
                </button>
              </form>
            </div>

            {/* SLA Escalation Rules */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Sliders className="w-4 h-4 text-orange-600" />
                <span>SLA Escalation Windows</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-red-50 rounded-xl border border-red-100 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-red-900">P1 Critical Escalation</p>
                    <p className="text-[11px] text-red-600">Open manholes, pipe bursts, gas leaks</p>
                  </div>
                  <span className="font-mono font-bold text-red-700 bg-white px-2 py-1 rounded border border-red-200">
                    4 Hours
                  </span>
                </div>

                <div className="p-3 bg-orange-50 rounded-xl border border-orange-100 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-orange-900">P2 High Priority</p>
                    <p className="text-[11px] text-orange-600">Arterial potholes, overflowing dumps</p>
                  </div>
                  <span className="font-mono font-bold text-orange-700 bg-white px-2 py-1 rounded border border-orange-200">
                    12 Hours
                  </span>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-amber-900">P3 Medium Priority</p>
                    <p className="text-[11px] text-amber-600">Streetlights, minor road cracks</p>
                  </div>
                  <span className="font-mono font-bold text-amber-700 bg-white px-2 py-1 rounded border border-amber-200">
                    24 Hours
                  </span>
                </div>
              </div>
            </div>

            {/* System Status Node */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>System Health & Node Status</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-600">API Gateway</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 99.98% Healthy
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-600">Computer Vision Mesh</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Latency 0.89s
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-600">Spatial GIS Database</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Active (6 Wards)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Department Management Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>Municipal Departments & Lead Engineers</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-500 uppercase">
                  <tr>
                    <th className="px-4 py-3">Department Name</th>
                    <th className="px-4 py-3">Lead Superintendent</th>
                    <th className="px-4 py-3">Contact Email</th>
                    <th className="px-4 py-3">Active Tickets</th>
                    <th className="px-4 py-3">Resolved</th>
                    <th className="px-4 py-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-4 py-3 font-bold text-slate-900">Road Maintenance Department</td>
                    <td className="px-4 py-3">Rajesh Kumar</td>
                    <td className="px-4 py-3 font-mono text-slate-500">roads@city.gov</td>
                    <td className="px-4 py-3 font-bold text-blue-600">42</td>
                    <td className="px-4 py-3 font-bold text-emerald-600">312</td>
                    <td className="px-4 py-3 text-right">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[11px]">Active</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-slate-900">Sanitation & Solid Waste Management</td>
                    <td className="px-4 py-3">Priya Verma</td>
                    <td className="px-4 py-3 font-mono text-slate-500">sanitation@city.gov</td>
                    <td className="px-4 py-3 font-bold text-blue-600">28</td>
                    <td className="px-4 py-3 font-bold text-emerald-600">489</td>
                    <td className="px-4 py-3 text-right">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[11px]">Active</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-slate-900">Water Supply & Sewerage Board</td>
                    <td className="px-4 py-3">Amitabh Sen</td>
                    <td className="px-4 py-3 font-mono text-slate-500">water@city.gov</td>
                    <td className="px-4 py-3 font-bold text-blue-600">19</td>
                    <td className="px-4 py-3 font-bold text-emerald-600">215</td>
                    <td className="px-4 py-3 text-right">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[11px]">Active</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-slate-900">Electrical & Street Lighting</td>
                    <td className="px-4 py-3">Suresh Patel</td>
                    <td className="px-4 py-3 font-mono text-slate-500">lighting@city.gov</td>
                    <td className="px-4 py-3 font-bold text-blue-600">15</td>
                    <td className="px-4 py-3 font-bold text-emerald-600">198</td>
                    <td className="px-4 py-3 text-right">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[11px]">Active</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
