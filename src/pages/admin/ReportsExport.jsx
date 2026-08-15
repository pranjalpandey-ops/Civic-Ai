import React, { useState } from 'react';
import { Download, FileText, Calendar, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';
import { Sidebar } from '../../components/common/Sidebar';
import { useComplaints } from '../../context/ComplaintContext';

export function ReportsExportPage() {
  const { complaints } = useComplaints();
  const [reportType, setReportType] = useState('monthly');
  const [downloading, setDownloading] = useState(false);

  const handleDownloadCsv = () => {
    setDownloading(true);
    window.open('/api/analytics/export/csv', '_blank');
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar type="admin" />

      <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl overflow-y-auto">
        <div className="space-y-6">
          
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Municipal SLA & Operations Reports
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Generate official audit reports, SLA compliance matrices, and export raw CSV records for ministry review.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Monthly Executive Summary</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Comprehensive summary of 1,284 complaints, 94.6% citizen satisfaction index, and average resolution turnaround of 4h 12m.
              </p>
              <button
                onClick={handleDownloadCsv}
                disabled={downloading}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{downloading ? 'Generating Report...' : 'Download CSV Dataset'}</span>
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <span>SLA Breach Audit Log</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Specific breakdown of 14 tickets that exceeded the initial response window, categorized by ward and resource shortages.
              </p>
              <button
                onClick={handleDownloadCsv}
                className="w-full py-2.5 px-4 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export SLA Audit</span>
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Ward-wise Resolution Performance</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Ward rankings comparing response velocity across Sector 62, Sector 15, Indirapuram, and Connaught Place.
              </p>
              <button
                onClick={handleDownloadCsv}
                className="w-full py-2.5 px-4 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export Ward Breakdown</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
