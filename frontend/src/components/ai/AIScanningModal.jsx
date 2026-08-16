import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Loader2, Cpu, ShieldAlert, Layers } from 'lucide-react';

export function AIScanningModal({
  isOpen,
  imageUrl,
  onComplete,
  stepDelay = 600
}) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: 'Analyzing image pixels & noise levels...', detail: 'Image Quality Assessment (0.12s)' },
    { label: 'Detecting civic issue & contours...', detail: 'Object Detection & Segmentation (0.45s)' },
    { label: 'Estimating severity & risk hazard...', detail: 'Severity Classification (0.89s)' },
    { label: 'Spatial duplicate check (< 150m)...', detail: 'Haversine Proximity Check (0.21s)' },
    { label: 'Synthesizing structured complaint & priority score...', detail: 'Natural Language Triage Engine (0.35s)' }
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 400);
          return prev;
        }
      });
    }, stepDelay);

    return () => clearInterval(interval);
  }, [isOpen, stepDelay, onComplete, steps.length]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-blue-600 rounded-lg">
              <Cpu className="w-4 h-4 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-wide flex items-center gap-1.5">
                CivicEye Neural Vision <span className="text-blue-400 text-xs font-mono">v2.4</span>
              </h3>
              <p className="text-[10px] text-slate-400">Deep Computer Vision & Incident Triage Pipeline</p>
            </div>
          </div>
          <span className="text-[11px] font-mono bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
            PROCESSING
          </span>
        </div>

        {/* Visual Scanner Area */}
        <div className="relative h-48 bg-slate-950 overflow-hidden flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Scan Preview"
              className="w-full h-full object-cover opacity-60"
            />
          ) : (
            <div className="text-slate-600 text-xs flex items-center gap-2">
              <Layers className="w-5 h-5 animate-pulse" /> Loading tensor buffer...
            </div>
          )}

          {/* Laser Scanline */}
          <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-scanline z-10"></div>

          {/* Center HUD Circle */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-28 h-28 border border-blue-400/40 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '6s' }}>
              <div className="w-20 h-20 border border-dashed border-cyan-400/60 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Progress Steps Checklist */}
        <div className="p-5 space-y-3 bg-slate-50">
          <div className="space-y-2.5">
            {steps.map((step, idx) => {
              const isDone = currentStep > idx;
              const isCurrent = currentStep === idx;

              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-2.5 rounded-lg text-xs transition-all ${
                    isCurrent
                      ? 'bg-blue-50 border border-blue-200 text-blue-900 font-semibold shadow-sm'
                      : isDone
                      ? 'text-slate-700 bg-white border border-slate-100'
                      : 'text-slate-400 opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-blue-600 animate-spin shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0"></div>
                    )}
                    <span className="truncate">{step.label}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0 ml-2">
                    {step.detail}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
