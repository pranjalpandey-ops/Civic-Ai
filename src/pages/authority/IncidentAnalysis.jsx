import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Flag,
  MapPin,
  Clock,
  Building,
  Upload,
  RotateCw,
  Eye,
  ArrowLeft,
  Share2,
  Check
} from 'lucide-react';
import { Sidebar } from '../../components/common/Sidebar';
import { BoundingBoxViewer } from '../../components/common/BoundingBoxViewer';
import { useComplaints } from '../../context/ComplaintContext';
import { useAuth } from '../../context/AuthContext';
import { fetchApi } from '../../utils/api';

export function IncidentAnalysisPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { complaints, updateStatus, reassignDepartment } = useComplaints();
  const { user } = useAuth();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reassignModalOpen, setReassignModalOpen] = useState(false);
  const [newDept, setNewDept] = useState('road_maintenance');
  const [resolutionPhoto, setResolutionPhoto] = useState(
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1000&auto=format&fit=crop&q=80'
  );
  const [statusNote, setStatusNote] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  useEffect(() => {
    const targetId = id || 'CE-2026-00124';
    const found = complaints.find((c) => c.id === targetId) || complaints[0];
    setComplaint(found);
    if (found) setNewDept(found.departmentId);
    setLoading(false);
  }, [id, complaints]);

  if (loading || !complaint) {
    return (
      <div className="min-h-screen bg-[#f8fafc] dark:bg-[#090d16] flex items-center justify-center">
        <RotateCw className="w-6 h-6 text-blue-600 animate-spin" />
      </div>
    );
  }

  const handleCreateWorkOrder = async () => {
    await updateStatus(
      complaint.id,
      'In Progress',
      'Work order dispatched to Field Team #4. Crew mobilized with asphalt equipment.'
    );
    setActionSuccess('Work Order #WO-891 created & dispatched to Field Crew!');
    setTimeout(() => setActionSuccess(''), 4000);
  };

  const handleMarkResolved = async () => {
    await updateStatus(
      complaint.id,
      'Resolved',
      'Pothole filled with heavy-duty asphalt mix and compacted. Road safe for traffic.',
      resolutionPhoto
    );
    setActionSuccess('Incident marked Resolved & resolution evidence published to citizen!');
    setTimeout(() => setActionSuccess(''), 4000);
  };

  const handleReassign = async () => {
    await reassignDepartment(complaint.id, newDept, 'Lead Officer');
    setReassignModalOpen(false);
    setActionSuccess(`Department successfully reassigned!`);
    setTimeout(() => setActionSuccess(''), 4000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#090d16] text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      {/* Left Sidebar (Matches Screenshot 5) */}
      <Sidebar type="authority" />

      {/* Main Container */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl overflow-y-auto">
        <div className="space-y-6">
          
          {/* Header Row (Matches Screenshot 5) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <button
                  onClick={() => navigate('/authority/queue')}
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Authority Queue
                </button>
                <span className="text-slate-300 dark:text-slate-600">/</span>
                <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">#{complaint.id}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                AI Incident Analysis
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Processing field report data streams.
              </p>
            </div>

            {/* Live Analysis Pulsing Indicator (Matches Screenshot 5) */}
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full border border-blue-200 dark:border-blue-800">
                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-ping"></span>
                LIVE ANALYSIS
              </span>
            </div>
          </div>

          {/* Action Success Toast */}
          {actionSuccess && (
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-xl border border-emerald-200 dark:border-emerald-800 shadow-sm flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{actionSuccess}</span>
            </div>
          )}

          {/* Split 2-Column Grid (Matches Screenshot 5) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 7 Cols: Source Image Viewer & Geotag Card (Matches Screenshot 5) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Bounding Box Image Box */}
              <BoundingBoxViewer
                imageUrl={complaint.imageUrl}
                imageFilename={complaint.imageFilename || 'IMG_8492_RAW.jpg'}
                boundingBox={complaint.aiAnalysis?.boundingBox || { x: 30, y: 35, width: 38, height: 32, label: `${complaint.categoryName} (94%)` }}
                showBox={true}
              />

              {/* Location & Metadata Bar (Matches Screenshot 5) */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-3 gap-4 text-xs">
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase">Location</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span className="truncate">{complaint.location?.lat?.toFixed(4)}° N, {complaint.location?.lng?.toFixed(4)}° E</span>
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{complaint.location?.address}</p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase">Timestamp</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    {new Date(complaint.createdAt).toLocaleTimeString()}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase">Source</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">Citizen App</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Geotagged Camera</p>
                </div>
              </div>

              {/* Status Timeline History */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Lifecycle Progression</h4>
                <div className="space-y-2.5">
                  {complaint.timeline.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs">
                      <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5 shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 dark:text-slate-200">{step.status}</span>
                          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                            {new Date(step.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">{step.note}</p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 italic">By: {step.actor}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Cols: CivicEye Insights Card (Matches Screenshot 5) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
                
                {/* Insights Header */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 rounded">
                      <Shield className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">CivicEye Insights</h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                    ANALYSIS COMPLETE
                  </span>
                </div>

                {/* Checklist with timings (Matches Screenshot 5) */}
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>Image Quality Assessment</span>
                    </span>
                    <span className="text-slate-400 dark:text-slate-500">0.12s</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>Object Detection & Segmentation</span>
                    </span>
                    <span className="text-slate-400 dark:text-slate-500">0.45s</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>Severity Classification</span>
                    </span>
                    <span className="text-slate-400 dark:text-slate-500">0.89s</span>
                  </div>
                </div>

                {/* Detected Issue & Confidence Metric Box (Matches Screenshot 5) */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">Detected Issue</p>
                    <p className="text-lg font-extrabold text-red-600 dark:text-red-400 mt-0.5">
                      {complaint.categoryName}
                    </p>
                  </div>
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">Confidence Score</p>
                    <p className="text-lg font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">
                      {complaint.aiAnalysis?.confidence || 94}%
                    </p>
                  </div>
                </div>

                {/* Severity & Priority Badges (Matches Screenshot 5) */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 font-bold">
                    Severity: {complaint.severity || 'High'}
                  </span>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-bold">
                    Priority: {complaint.priority}
                  </span>
                </div>

                {/* Generated Description (Matches Screenshot 5) */}
                <div className="space-y-1.5">
                  <p className="text-[11px] font-mono uppercase text-slate-400 dark:text-slate-500 font-semibold">
                    Generated Description
                  </p>
                  <div className="p-3.5 bg-blue-50/40 dark:bg-blue-950/30 rounded-xl border-l-4 border-blue-600 dark:border-blue-500 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    {complaint.description}
                  </div>
                </div>

                {/* Assigned Department Row with Reassign (Matches Screenshot 5) */}
                <div className="space-y-1.5 pt-1">
                  <p className="text-[11px] font-mono uppercase text-slate-400 dark:text-slate-500 font-semibold">
                    Assigned Department
                  </p>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                      <Building className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>{complaint.departmentName}</span>
                    </div>
                    <button
                      onClick={() => setReassignModalOpen(true)}
                      className="text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                    >
                      Reassign
                    </button>
                  </div>
                </div>

                {/* Action Buttons (Matches Screenshot 5) */}
                <div className="pt-2 space-y-2.5">
                  <button
                    type="button"
                    onClick={handleCreateWorkOrder}
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Create Work Order</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        updateStatus(complaint.id, 'In Progress', 'Flagged for senior engineering review.');
                        setActionSuccess('Ticket flagged for engineering review.');
                      }}
                      className="py-2.5 px-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-300 rounded-xl text-xs font-semibold border border-blue-300 dark:border-blue-700 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Flag className="w-3.5 h-3.5" />
                      <span>Flag for Review</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleMarkResolved}
                      className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Mark Resolved</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Reassign Modal */}
      {reassignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-md w-full space-y-4 border border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Reassign Department</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select the municipal department to take ownership of ticket #{complaint.id}.
            </p>
            <select
              value={newDept}
              onChange={(e) => setNewDept(e.target.value)}
              className="w-full p-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100"
            >
              <option value="road_maintenance">Road Maintenance Department</option>
              <option value="sanitation">Sanitation & Solid Waste Management</option>
              <option value="water_supply">Water Supply & Sewerage Board</option>
              <option value="electrical">Electrical & Street Lighting Department</option>
              <option value="drainage_flood">Drainage & Stormwater Management</option>
              <option value="traffic_mgmt">Traffic & Urban Transit Infrastructure</option>
            </select>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setReassignModalOpen(false)}
                className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleReassign}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
              >
                Confirm Reassign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
