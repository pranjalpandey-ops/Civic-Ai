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
  Send,
  Sparkles,
  Share2,
  Activity,
  Navigation,
  ExternalLink
} from 'lucide-react';

import { useComplaints } from '../../context/ComplaintContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { PriorityBadge, StatusBadge } from '../../components/common/Badge';
import { LeafletMap } from '../../components/maps/LeafletMap';
import { Sidebar } from '../../components/common/Sidebar';

export function ComplaintDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { complaints, submitFeedback } = useComplaints();
  const { user } = useAuth();
  const { t = (k) => k } = useLanguage() || {};

  const [complaint, setComplaint] = useState(null);
  const [rating, setRating] = useState(5);
  const [isResolvedChoice, setIsResolvedChoice] = useState(true);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    const found = complaints.find((c) => c.id === id);

    if (found) {
      setComplaint(found);

      if (found.feedback) {
        setRating(found.feedback.rating || 5);
        setIsResolvedChoice(found.feedback.resolved);
        setFeedbackComment(found.feedback.comment || '');
        setFeedbackSubmitted(true);
      }
    }
  }, [id, complaints]);

  if (!complaint) {
    return (
      <div className="min-h-screen bg-[#060914] text-white flex">
        <Sidebar type="citizen" />

        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Activity className="w-7 h-7 text-blue-400" />
            </div>

            <h2 className="text-xl font-bold">Complaint not found</h2>

            <button
              onClick={() => navigate('/citizen/complaints')}
              className="mt-5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold"
            >
              Back to My Complaints
            </button>
          </div>
        </main>
      </div>
    );
  }

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    await submitFeedback(
      complaint.id,
      rating,
      isResolvedChoice,
      feedbackComment
    );

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

    if (idx >= 0) return idx;

    return status === 'Closed' ? 5 : 0;
  };

  const currentStepIdx = getStepIndex(complaint.status);

  const progress =
    (currentStepIdx / (steps.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-[#060914] text-slate-100 flex">
      <Sidebar type="citizen" />

      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-8">

          {/* =========================================
              HEADER
          ========================================= */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-7">

            <div className="flex items-start gap-3">

              <button
                onClick={() => navigate(-1)}
                className="
                  w-10 h-10 shrink-0
                  rounded-xl
                  bg-white/[0.04]
                  border border-white/[0.08]
                  flex items-center justify-center
                  text-slate-400
                  hover:text-white
                  hover:bg-white/[0.08]
                  hover:-translate-y-0.5
                  transition-all
                  shadow-[0_8px_30px_rgba(0,0,0,0.25)]
                "
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="min-w-0">

                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-mono text-[11px] font-bold tracking-wide text-blue-400">
                    #{complaint.id}
                  </span>

                  <PriorityBadge priority={complaint.priority} />

                  <StatusBadge status={complaint.status} />
                </div>

                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
                  {complaint.title}
                </h1>

                <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5" />

                  Reported{' '}
                  {new Date(complaint.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">

              <button
                onClick={() =>
                  navigate(`/authority/inspection/${complaint.id}`)
                }
                className="
                  inline-flex items-center gap-2
                  px-4 py-2.5
                  rounded-xl
                  bg-blue-500/10
                  border border-blue-500/20
                  text-blue-400
                  hover:bg-blue-500/15
                  hover:border-blue-400/40
                  transition-all
                  text-xs font-bold
                "
              >
                <Sparkles className="w-4 h-4" />
                AI Inspector
              </button>

              <button
                className="
                  w-10 h-10
                  rounded-xl
                  bg-white/[0.04]
                  border border-white/[0.08]
                  flex items-center justify-center
                  text-slate-400
                  hover:text-white
                  transition-all
                "
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* =========================================
              STATUS HERO
          ========================================= */}
          <section className="
            relative overflow-hidden
            rounded-3xl
            border border-white/[0.08]
            bg-gradient-to-br from-[#10182c] via-[#0b1020] to-[#080c16]
            shadow-[0_25px_70px_rgba(0,0,0,0.35)]
            mb-7
          ">

            <div className="absolute -top-32 -right-32 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full" />
            <div className="absolute -bottom-32 left-20 w-64 h-64 bg-purple-600/10 blur-3xl rounded-full" />

            <div className="relative p-5 sm:p-7">

              <div className="flex items-center justify-between mb-7">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
                    Incident Lifecycle
                  </p>

                  <h2 className="text-lg font-bold text-white mt-1">
                    Resolution Progress
                  </h2>
                </div>

                <div className="
                  px-3 py-1.5
                  rounded-full
                  bg-emerald-500/10
                  border border-emerald-500/20
                  text-emerald-400
                  text-[10px] font-bold
                ">
                  {Math.round(progress)}% Complete
                </div>
              </div>

              {/* Desktop Progress */}
              <div className="relative hidden sm:block">

                <div className="
                  absolute left-4 right-4 top-4
                  h-[2px]
                  bg-white/[0.07]
                " />

                <div
                  className="
                    absolute left-4 top-4
                    h-[2px]
                    bg-gradient-to-r from-blue-500 to-cyan-400
                    transition-all duration-700
                  "
                  style={{
                    width: `calc(${progress}% - ${
                      progress === 100 ? '32px' : '16px'
                    })`
                  }}
                />

                <div className="relative flex justify-between">

                  {steps.map((step, idx) => {
                    const isPast = currentStepIdx >= idx;
                    const isCurrent = currentStepIdx === idx;

                    return (
                      <div
                        key={step}
                        className="flex flex-col items-center gap-2"
                      >
                        <div
                          className={`
                            w-8 h-8 rounded-full
                            flex items-center justify-center
                            border
                            transition-all duration-500
                            ${
                              isCurrent
                                ? 'bg-blue-600 border-blue-400 text-white scale-110 shadow-[0_0_25px_rgba(59,130,246,0.5)]'
                                : isPast
                                ? 'bg-blue-600/90 border-blue-400/40 text-white'
                                : 'bg-[#0b1020] border-white/10 text-slate-600'
                            }
                          `}
                        >
                          {isPast ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            idx + 1
                          )}
                        </div>

                        <span
                          className={`
                            text-[10px] text-center max-w-[90px]
                            ${
                              isCurrent
                                ? 'text-blue-400 font-bold'
                                : isPast
                                ? 'text-slate-300'
                                : 'text-slate-600'
                            }
                          `}
                        >
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile */}
              <div className="sm:hidden">
                <div className="flex items-center gap-3">

                  <div className="
                    w-11 h-11 rounded-2xl
                    bg-blue-500/10
                    border border-blue-500/20
                    flex items-center justify-center
                  ">
                    <Activity className="w-5 h-5 text-blue-400" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white">
                      {complaint.status}
                    </p>

                    <p className="text-[11px] text-slate-500">
                      Step {currentStepIdx + 1} of {steps.length}
                    </p>
                  </div>
                </div>

                <div className="mt-5 h-2 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* =========================================
              MAIN CONTENT
          ========================================= */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

            {/* LEFT */}
            <div className="xl:col-span-7 space-y-6">

              {/* Evidence */}
              <section className="
                rounded-3xl
                border border-white/[0.08]
                bg-[#0b101d]
                shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                overflow-hidden
              ">

                <div className="px-5 sm:px-6 py-5 border-b border-white/[0.06]">

                  <div className="flex items-center gap-3">
                    <div className="
                      w-9 h-9 rounded-xl
                      bg-purple-500/10
                      border border-purple-500/20
                      flex items-center justify-center
                    ">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-white">
                        Photo Evidence
                      </h3>

                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Visual verification & resolution proof
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* Original */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Original Report
                        </span>

                        <span className="text-[9px] px-2 py-1 rounded-full bg-blue-500/10 text-blue-400">
                          Citizen
                        </span>
                      </div>

                      <div className="
                        h-52 rounded-2xl overflow-hidden
                        bg-black
                        border border-white/[0.08]
                        shadow-inner
                      ">
                        <img
                          src={complaint.imageUrl}
                          alt="Original citizen report"
                          className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
                        />
                      </div>
                    </div>

                    {/* Resolution */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Resolution Proof
                        </span>

                        {complaint.resolutionImageUrl && (
                          <span className="text-[9px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                            Verified
                          </span>
                        )}
                      </div>

                      {complaint.resolutionImageUrl ? (
                        <div className="
                          h-52 rounded-2xl overflow-hidden
                          bg-black
                          border border-emerald-500/20
                        ">
                          <img
                            src={complaint.resolutionImageUrl}
                            alt="Resolution evidence"
                            className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="
                          h-52 rounded-2xl
                          border border-dashed border-white/10
                          bg-white/[0.02]
                          flex flex-col items-center justify-center
                          text-center
                        ">
                          <Clock className="w-7 h-7 text-slate-600 mb-2" />

                          <p className="text-xs font-semibold text-slate-500">
                            Resolution evidence pending
                          </p>

                          <p className="text-[10px] text-slate-700 mt-1">
                            Field crew completion required
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="
                    mt-5 p-4
                    rounded-2xl
                    bg-white/[0.025]
                    border border-white/[0.06]
                  ">
                    <p className="text-xs leading-6 text-slate-400">
                      {complaint.description}
                    </p>
                  </div>
                </div>
              </section>

              {/* Location */}
              <section className="
                rounded-3xl
                border border-white/[0.08]
                bg-[#0b101d]
                shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                overflow-hidden
              ">

                <div className="px-5 sm:px-6 py-5 border-b border-white/[0.06]">

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

                    <div className="flex items-center gap-3">

                      <div className="
                        w-9 h-9 rounded-xl
                        bg-cyan-500/10
                        border border-cyan-500/20
                        flex items-center justify-center
                      ">
                        <MapPin className="w-4 h-4 text-cyan-400" />
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-white">
                          Incident Location
                        </h3>

                        <p className="text-[10px] text-slate-500">
                          GPS verified civic location
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] text-slate-500">
                      {complaint.location?.address}
                    </span>
                  </div>
                </div>

                <div className="p-4">

                  <div className="
                    h-64 rounded-2xl overflow-hidden
                    border border-white/[0.08]
                    relative
                  ">
                    <LeafletMap
                      complaints={[complaint]}
                      center={[
                        complaint.location?.lat || 28.6280,
                        complaint.location?.lng || 77.3649
                      ]}
                      zoom={14}
                      height="100%"
                    />

                    <div className="
                      absolute left-3 bottom-3
                      px-3 py-2 rounded-xl
                      bg-[#080c16]/90 backdrop-blur-xl
                      border border-white/10
                      text-[10px] text-slate-300
                      flex items-center gap-2
                    ">
                      <Navigation className="w-3 h-3 text-cyan-400" />
                      GPS Location
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT */}
            <div className="xl:col-span-5 space-y-6">

              {/* Authority */}
              <section className="
                rounded-3xl
                border border-white/[0.08]
                bg-[#0b101d]
                p-5
                shadow-[0_20px_60px_rgba(0,0,0,0.25)]
              ">

                <div className="flex items-center gap-3 mb-5">

                  <div className="
                    w-9 h-9 rounded-xl
                    bg-blue-500/10
                    border border-blue-500/20
                    flex items-center justify-center
                  ">
                    <Building className="w-4 h-4 text-blue-400" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Assigned Authority
                    </h3>

                    <p className="text-[10px] text-slate-500">
                      Municipal response team
                    </p>
                  </div>
                </div>

                <div className="space-y-3">

                  <div className="
                    p-4 rounded-2xl
                    bg-blue-500/[0.05]
                    border border-blue-500/10
                  ">
                    <p className="text-[10px] uppercase tracking-wider text-blue-400 font-bold mb-1">
                      Department
                    </p>

                    <p className="text-sm font-bold text-white">
                      {complaint.departmentName}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">

                    <div className="
                      p-3 rounded-xl
                      bg-white/[0.025]
                      border border-white/[0.06]
                    ">
                      <User className="w-4 h-4 text-slate-500 mb-2" />

                      <p className="text-[9px] uppercase tracking-wider text-slate-600">
                        Lead Officer
                      </p>

                      <p className="text-xs font-bold text-slate-300 mt-1">
                        {complaint.assignedOfficer}
                      </p>
                    </div>

                    <div className="
                      p-3 rounded-xl
                      bg-white/[0.025]
                      border border-white/[0.06]
                    ">
                      <Clock className="w-4 h-4 text-amber-400 mb-2" />

                      <p className="text-[9px] uppercase tracking-wider text-slate-600">
                        SLA Target
                      </p>

                      <p className="text-xs font-bold text-slate-300 mt-1">
                        {new Date(
                          complaint.slaDeadline
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Feedback */}
              <section className="
                rounded-3xl
                border border-white/[0.08]
                bg-[#0b101d]
                p-5
                shadow-[0_20px_60px_rgba(0,0,0,0.25)]
              ">

                <div className="flex items-center gap-3 mb-5">

                  <div className="
                    w-9 h-9 rounded-xl
                    bg-emerald-500/10
                    border border-emerald-500/20
                    flex items-center justify-center
                  ">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Citizen Verification
                    </h3>

                    <p className="text-[10px] text-slate-500">
                      Confirm the resolution quality
                    </p>
                  </div>
                </div>

                {feedbackSubmitted ? (
                  <div className="
                    p-4 rounded-2xl
                    bg-emerald-500/[0.06]
                    border border-emerald-500/15
                  ">

                    <div className="flex gap-1 mb-3">
                      {[...Array(rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    <p className="text-sm font-bold text-emerald-400">
                      {isResolvedChoice
                        ? 'Verified as Resolved'
                        : 'Flagged as Incomplete'}
                    </p>

                    {feedbackComment && (
                      <p className="text-xs text-slate-400 mt-2 italic">
                        "{feedbackComment}"
                      </p>
                    )}

                    <button
                      onClick={() => setFeedbackSubmitted(false)}
                      className="mt-4 text-[11px] font-bold text-blue-400 hover:text-blue-300"
                    >
                      Edit Feedback
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleFeedbackSubmit}
                    className="space-y-5"
                  >

                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-2">
                        Was this issue resolved?
                      </label>

                      <div className="grid grid-cols-2 gap-2">

                        <button
                          type="button"
                          onClick={() => setIsResolvedChoice(true)}
                          className={`
                            py-2.5 rounded-xl text-xs font-bold border transition-all
                            ${
                              isResolvedChoice
                                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.08)]'
                                : 'bg-white/[0.02] border-white/[0.08] text-slate-500'
                            }
                          `}
                        >
                          Yes, Resolved
                        </button>

                        <button
                          type="button"
                          onClick={() => setIsResolvedChoice(false)}
                          className={`
                            py-2.5 rounded-xl text-xs font-bold border transition-all
                            ${
                              !isResolvedChoice
                                ? 'bg-red-500/15 border-red-500/40 text-red-400'
                                : 'bg-white/[0.02] border-white/[0.08] text-slate-500'
                            }
                          `}
                        >
                          Reopen Ticket
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-2">
                        Resolution Rating
                      </label>

                      <div className="flex gap-2">

                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="hover:scale-125 transition-transform"
                          >
                            <Star
                              className={`
                                w-6 h-6
                                ${
                                  star <= rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-slate-700'
                                }
                              `}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <textarea
                      rows={3}
                      value={feedbackComment}
                      onChange={(e) =>
                        setFeedbackComment(e.target.value)
                      }
                      placeholder="Share your experience..."
                      className="
                        w-full p-3
                        rounded-xl
                        bg-white/[0.03]
                        border border-white/[0.08]
                        text-xs text-white
                        placeholder:text-slate-600
                        focus:outline-none
                        focus:border-blue-500/50
                        focus:ring-2 focus:ring-blue-500/10
                        resize-none
                      "
                    />

                    <button
                      type="submit"
                      className="
                        w-full py-3
                        rounded-xl
                        bg-gradient-to-r from-blue-600 to-indigo-600
                        hover:from-blue-500 hover:to-indigo-500
                        text-white
                        text-xs font-bold
                        shadow-[0_10px_30px_rgba(37,99,235,0.25)]
                        transition-all
                        hover:-translate-y-0.5
                        flex items-center justify-center gap-2
                      "
                    >
                      <Send className="w-3.5 h-3.5" />
                      Submit Verification
                    </button>
                  </form>
                )}
              </section>

              {/* Timeline */}
              <section className="
                rounded-3xl
                border border-white/[0.08]
                bg-[#0b101d]
                p-5
                shadow-[0_20px_60px_rgba(0,0,0,0.25)]
              ">

                <div className="flex items-center gap-3 mb-5">

                  <div className="
                    w-9 h-9 rounded-xl
                    bg-purple-500/10
                    border border-purple-500/20
                    flex items-center justify-center
                  ">
                    <Activity className="w-4 h-4 text-purple-400" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Audit Trail
                    </h3>

                    <p className="text-[10px] text-slate-500">
                      Complete incident activity
                    </p>
                  </div>
                </div>

                <div className="relative space-y-5">

                  <div className="
                    absolute left-[7px] top-2 bottom-2
                    w-px bg-white/[0.07]
                  " />

                  {complaint.timeline?.map((event, idx) => (
                    <div
                      key={idx}
                      className="relative flex gap-4"
                    >
                      <div className="
                        relative z-10
                        w-[15px] h-[15px]
                        rounded-full
                        bg-blue-500
                        border-4 border-[#0b101d]
                        shadow-[0_0_12px_rgba(59,130,246,0.5)]
                        shrink-0
                      " />

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold text-slate-200">
                            {event.status}
                          </span>

                          <span className="text-[9px] font-mono text-slate-600">
                            {new Date(
                              event.timestamp
                            ).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-500 mt-1 leading-5">
                          {event.note}
                        </p>
                      </div>
                    </div>
                  ))}

                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}