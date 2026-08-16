import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Building,
  User,
  ShieldCheck,
  Star,
  CheckCircle2,
  AlertTriangle,
  Send,
  RotateCcw,
  Sparkles,
  Share2
} from 'lucide-react';
import { useComplaints } from '../../context/ComplaintContext';
import { useAuth } from '../../context/AuthContext';
import { PriorityBadge, StatusBadge } from '../../components/common/Badge';
import { LeafletMap } from '../../components/maps/LeafletMap';

export function ComplaintDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { complaints, submitFeedback } = useComplaints();
  const { user } = useAuth();

  const [complaint, setComplaint] = useState(null);
  const [rating, setRating] = useState(5);
  const [isResolvedChoice, setIsResolvedChoice] = useState(true);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    const found = complaints.find((c) => c.id === id) || complaints[0];
    setComplaint(found);
    if (found?.feedback) {
      setRating(found.feedback.rating || 5);
      setIsResolvedChoice(found.feedback.resolved);
      setFeedbackComment(found.feedback.comment || '');
      setFeedbackSubmitted(true);
    }
  }, [id, complaints]);

  if (!complaint) return null;

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    await submitFeedback(complaint.id, rating, isResolvedChoice, feedbackComment);
    setFeedbackSubmitted(true);
  };

  const steps = [
    'Reported',
    'AI Verified',
    'Assigned',
    'In Progress',
    'Resolved',
    'Citizen Verified'
  ];

  const getStepIndex = (status) => {
    const idx = steps.indexOf(status);
    return idx >= 0 ? idx : (status === 'Closed' ? 5 : 0);
  };

  const currentStepIdx = getStepIndex(complaint.status);

  return (
    <div className="min-h-screen bg-[#f8fafc] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 bg-white rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-600">#{complaint.id}</span>
                <PriorityBadge priority={complaint.priority} />
                <StatusBadge status={complaint.status} />
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                {complaint.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/authority/inspection/${complaint.id}`)}
              className="px-3.5 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold border border-blue-200 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Inspector View</span>
            </button>
          </div>
        </div>

        {/* Visual Lifecycle Stepper */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
            Incident Lifecycle Progression
          </h3>

          <div className="relative flex items-center justify-between">
            {/* Background progress bar */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 -z-0"></div>
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 -z-0 transition-all duration-500"
              style={{ width: `${(currentStepIdx / (steps.length - 1)) * 100}%` }}
            ></div>

            {steps.map((step, idx) => {
              const isPast = currentStepIdx >= idx;
              const isCurrent = currentStepIdx === idx;

              return (
                <div key={step} className="flex flex-col items-center gap-2 z-10">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-blue-600 text-white ring-4 ring-blue-100 scale-110'
                        : isPast
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-slate-400 border-2 border-slate-200'
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </div>
                  <span
                    className={`text-[11px] font-medium hidden sm:block text-center ${
                      isCurrent ? 'font-bold text-blue-600' : isPast ? 'text-slate-700' : 'text-slate-400'
                    }`}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2-Column Split: Details & Photos vs Timeline & Feedback */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left 7 Cols: Image, Resolution Proof, Location & Department */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Images: Original Report Photo + Resolution Photo */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Photo Evidence & Verification
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 mb-1.5">Original Citizen Report</p>
                  <div className="h-48 rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                    <img
                      src={complaint.imageUrl}
                      alt="Original"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-slate-500 mb-1.5">Resolution Evidence</p>
                  {complaint.resolutionImageUrl ? (
                    <div className="h-48 rounded-xl overflow-hidden bg-slate-900 border border-emerald-200 relative">
                      <img
                        src={complaint.resolutionImageUrl}
                        alt="Resolution"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Resolved
                      </div>
                    </div>
                  ) : (
                    <div className="h-48 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-4 text-center text-slate-400 bg-slate-50">
                      <Clock className="w-6 h-6 mb-1 text-slate-300" />
                      <p className="text-xs font-medium">Pending field crew completion</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 leading-relaxed">
                {complaint.description}
              </div>
            </div>

            {/* Location Map Widget */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Geotagged Location
                  </h3>
                </div>
                <span className="text-xs text-slate-500">{complaint.location?.address}</span>
              </div>

              <div className="h-48 rounded-xl overflow-hidden border border-slate-200">
                <LeafletMap
                  complaints={[complaint]}
                  center={[complaint.location?.lat || 28.6280, complaint.location?.lng || 77.3649]}
                  zoom={14}
                  height="100%"
                />
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Department Assignment, SLA & Citizen Feedback */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Department Assignment Box */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Assigned Authority
              </h3>

              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                  <Building className="w-4 h-4 text-blue-600" />
                  <span>{complaint.departmentName}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Lead Officer: <strong className="text-slate-800">{complaint.assignedOfficer}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>SLA Target: <strong className="text-slate-800">{new Date(complaint.slaDeadline).toLocaleString()}</strong></span>
                </div>
              </div>
            </div>

            {/* Citizen Feedback Form (After Resolution or Current) */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Citizen Verification & Feedback
                </h3>
              </div>

              {feedbackSubmitted ? (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-2">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="font-bold text-emerald-900">
                    {isResolvedChoice ? 'Verified as Resolved by Citizen' : 'Flagged as Incomplete — Reopened'}
                  </p>
                  {feedbackComment && (
                    <p className="text-slate-600 italic">"{feedbackComment}"</p>
                  )}
                  <button
                    onClick={() => setFeedbackSubmitted(false)}
                    className="text-[11px] text-blue-600 font-semibold hover:underline pt-1"
                  >
                    Edit Feedback
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">
                      Was this civic issue resolved to your satisfaction?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setIsResolvedChoice(true)}
                        className={`py-2 px-3 rounded-lg font-bold border transition-colors ${
                          isResolvedChoice
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        Yes, Resolved
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsResolvedChoice(false)}
                        className={`py-2 px-3 rounded-lg font-bold border transition-colors ${
                          !isResolvedChoice
                            ? 'bg-red-600 text-white border-red-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        No (Reopen Ticket)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Rate Resolution Speed & Quality</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-1 hover:scale-125 transition-transform"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Citizen Comments</label>
                    <textarea
                      rows={2}
                      value={feedbackComment}
                      onChange={(e) => setFeedbackComment(e.target.value)}
                      placeholder="e.g. Excellent work, pothole filled cleanly."
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Feedback</span>
                  </button>
                </form>
              )}
            </div>

            {/* Live Timeline Feed */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Full Audit Trail
              </h3>
              <div className="space-y-3">
                {complaint.timeline.map((event, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-1 shrink-0"></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{event.status}</span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-slate-600 mt-0.5 text-[11px]">{event.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
