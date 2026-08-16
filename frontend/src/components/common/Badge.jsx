import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Clock, Cpu, ShieldCheck } from 'lucide-react';

export function PriorityBadge({ priority, className = '' }) {
  const map = {
    P1: { label: 'Critical Priority (P1)', bg: 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 border-red-200 dark:border-red-800', dot: 'bg-red-500', icon: AlertCircle },
    P2: { label: 'High Priority (P2)', bg: 'bg-orange-50 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300 border-orange-200 dark:border-orange-800', dot: 'bg-orange-500', icon: AlertTriangle },
    P3: { label: 'Medium Priority (P3)', bg: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800', dot: 'bg-amber-500', icon: Clock },
    P4: { label: 'Low Priority (P4)', bg: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800', dot: 'bg-blue-500', icon: Clock },
  };

  const item = map[priority] || map.P3;
  const Icon = item.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border ${item.bg} ${className}`}>
      <span className={`w-2 h-2 rounded-full ${item.dot}`}></span>
      <Icon className="w-3.5 h-3.5" />
      {item.label}
    </span>
  );
}

export function StatusBadge({ status, className = '' }) {
  const map = {
    'Reported': { bg: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700', icon: Clock },
    'AI Verified': { bg: 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800', icon: Cpu },
    'Assigned': { bg: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800', icon: Clock },
    'In Progress': { bg: 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800', icon: Clock },
    'Resolved': { bg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800', icon: CheckCircle2 },
    'Citizen Verified': { bg: 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800', icon: ShieldCheck },
    'Closed': { bg: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700', icon: CheckCircle2 },
  };

  const item = map[status] || map.Reported;
  const Icon = item.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${item.bg} ${className}`}>
      <Icon className="w-3.5 h-3.5" />
      {status}
    </span>
  );
}
