'use client';

import React from 'react';
import { Target } from 'lucide-react';

interface ReadinessGaugeProps {
  score: number; // 0 to 100
  targetRole: string;
}

export const ReadinessGauge: React.FC<ReadinessGaugeProps> = ({ score, targetRole }) => {
  const radius = 64;
  const strokeWidth = 7;
  const normalizedRadius = radius - strokeWidth * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let statusText = 'Placement Ready';
  let dotColor = 'bg-emerald-400';
  let textColor = 'text-emerald-400';
  let strokeColor = '#4361ee';

  if (score < 60) {
    statusText = 'Needs Improvement';
    dotColor = 'bg-amber-400';
    textColor = 'text-amber-400';
    strokeColor = '#f59e0b';
  } else if (score < 75) {
    statusText = 'Placement Ready';
    dotColor = 'bg-indigo-400';
    textColor = 'text-indigo-400';
    strokeColor = '#4361ee';
  } else {
    statusText = 'High Industry Match';
    dotColor = 'bg-emerald-400';
    textColor = 'text-emerald-400';
    strokeColor = '#10b981';
  }

  return (
    <div className="saas-card rounded-xl p-6 flex flex-col items-center justify-between text-center relative">
      {/* Header */}
      <div className="w-full flex items-center justify-between text-xs text-slate-400 font-medium mb-2">
        <span className="flex items-center gap-1.5 text-slate-300">
          <Target className="w-3.5 h-3.5 text-slate-400" />
          Placement Readiness
        </span>
        <span className="text-[11px] text-slate-500">Benchmark Index</span>
      </div>

      {/* Minimal Radial Meter */}
      <div className="relative w-40 h-40 flex items-center justify-center my-3">
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          <circle
            stroke="rgba(255, 255, 255, 0.08)"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke={strokeColor}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-700 ease-out"
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-3xl font-semibold text-white tracking-tight tabular-nums">{score}</span>
          <span className="text-[11px] font-normal text-slate-500">of 100</span>
        </div>
      </div>

      {/* Status & Subtitle */}
      <div className="space-y-1.5 w-full">
        <div className={`inline-flex items-center gap-1.5 text-xs font-medium ${textColor}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
          <span>{statusText}</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
          Calibrated against industry standards for <span className="text-slate-200 font-medium">{targetRole}</span>.
        </p>
      </div>
    </div>
  );
};
