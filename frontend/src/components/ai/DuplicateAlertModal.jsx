import React from 'react';
import { AlertTriangle, Users, ArrowRight, PlusCircle, CheckCircle2 } from 'lucide-react';
import { PriorityBadge, StatusBadge } from '../common/Badge';

export function DuplicateAlertModal({
  isOpen,
  duplicates = [],
  onJoin,
  onSubmitNew,
  onCancel
}) {
  if (!isOpen || duplicates.length === 0) return null;

  const topMatch = duplicates[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-amber-200 max-w-lg w-full overflow-hidden">
        {/* Amber Header */}
        <div className="p-4 bg-amber-500 text-white flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-base">Possible Duplicate Detected</h3>
            <p className="text-xs text-amber-100">
              We found {duplicates.length} similar active report{duplicates.length > 1 ? 's' : ''} within 150 meters.
            </p>
          </div>
        </div>

        {/* Duplicate Ticket Card */}
        <div className="p-5 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Joining an ongoing complaint aggregates your report count (+1), boosting its municipal priority score without creating duplicate work orders.
          </p>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex gap-3">
            {topMatch.imageUrl && (
              <img
                src={topMatch.imageUrl}
                alt="Existing report"
                className="w-20 h-20 rounded-lg object-cover border border-slate-200 shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs font-bold text-blue-600">
                  #{topMatch.complaintId}
                </span>
                <span className="text-[11px] text-amber-700 bg-amber-100 font-semibold px-2 py-0.5 rounded-full">
                  {topMatch.distanceMeters}m away
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 line-clamp-1 mb-1.5">
                {topMatch.title}
              </h4>
              <div className="flex items-center gap-2 mb-2">
                <PriorityBadge priority={topMatch.priority} />
                <StatusBadge status={topMatch.status} />
              </div>
              <p className="text-[11px] text-slate-500 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                <span>{topMatch.reportCount} citizens already reported</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => onJoin(topMatch.complaintId)}
              className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Join Existing Report (#{topMatch.complaintId})</span>
            </button>
            <button
              type="button"
              onClick={onSubmitNew}
              className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit New Ticket</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
