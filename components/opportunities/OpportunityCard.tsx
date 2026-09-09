'use client';

import React from 'react';
import { Opportunity } from '@/types';
import { CheckCircle2, MapPin, Bookmark, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onApply: (opportunity: Opportunity) => void;
  onViewDetails?: (opportunity: Opportunity) => void;
  isSaved?: boolean;
  onToggleSave?: (id: string) => void;
  isApplied?: boolean;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  onApply,
  onViewDetails,
  isSaved = false,
  onToggleSave,
  isApplied = false
}) => {
  const match = opportunity.matchDetails;
  const matchScore = opportunity.matchScore || match?.finalMatchScore || 75;
  const metCount = match?.matchedSkills?.length || 0;
  const missingCount = match?.missingSkills?.length || 0;
  const totalRequired = metCount + missingCount;

  // Badge color by match quality
  const matchBadgeClass = matchScore >= 85
    ? 'status-pill-green'
    : matchScore >= 70
    ? 'status-pill-blue'
    : 'status-pill-amber';

  return (
    <div className="enterprise-card-interactive rounded-xl p-5 flex flex-col justify-between space-y-4 h-full">
      
      {/* Header Row */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xl shrink-0 shadow-sm">
              {opportunity.companyLogo}
            </div>
            <div className="min-w-0">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-tight line-clamp-2">
                {opportunity.title}
              </h3>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1 truncate">
                <span className="font-medium text-slate-700 dark:text-slate-300 truncate">{opportunity.company}</span>
              </div>
            </div>
          </div>

          {/* Criteria Match Badge */}
          <span className={`status-pill ${matchBadgeClass} text-[10px] shrink-0`}>
            {metCount}/{totalRequired || metCount} Met
          </span>
        </div>

        {/* Meta chips */}
        <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
          <span className="status-pill status-pill-slate">{opportunity.type}</span>
          <span className="credential-tag font-semibold text-emerald-700 dark:text-emerald-400">{opportunity.stipend}</span>
          <span className="credential-tag">{opportunity.duration}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="truncate">{opportunity.location}</span>
        </div>

        {/* Why matched context */}
        {match?.whyRecommended && (
          <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 rounded-lg p-2.5 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
            <span className="font-semibold text-blue-700 dark:text-blue-400">Why matched: </span>
            {match.whyRecommended}
          </div>
        )}

        {/* Matched vs Missing Skills */}
        <div className="space-y-1.5">
          {match?.matchedSkills && match.matchedSkills.length > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 shrink-0">Matched:</span>
              {match.matchedSkills.slice(0, 3).map(skill => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60 px-1.5 py-0.5 rounded text-[10px] font-medium"
                >
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                  {skill}
                </span>
              ))}
              {match.matchedSkills.length > 3 && (
                <span className="text-[10px] text-slate-400 dark:text-slate-500">+{match.matchedSkills.length - 3}</span>
              )}
            </div>
          )}

          {match?.missingSkills && match.missingSkills.length > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 shrink-0">Missing:</span>
              {match.missingSkills.slice(0, 2).map(skill => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/60 px-1.5 py-0.5 rounded text-[10px] font-medium"
                >
                  <AlertCircle className="w-2.5 h-2.5 text-red-500 dark:text-red-400" />
                  {skill}
                </span>
              ))}
              {match.missingSkills.length > 2 && (
                <span className="text-[10px] text-slate-400 dark:text-slate-500">+{match.missingSkills.length - 2}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          {onToggleSave && (
            <button
              onClick={() => onToggleSave(opportunity.id)}
              className={`p-1.5 rounded-lg border transition ${
                isSaved
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900 text-amber-600 dark:text-amber-400'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
              title={isSaved ? 'Saved' : 'Save'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500' : ''}`} />
            </button>
          )}
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(opportunity)}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition px-1.5 py-1"
            >
              Details
            </button>
          )}
        </div>

        {isApplied ? (
          <span className="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Applied
          </span>
        ) : (
          <button
            onClick={() => onApply(opportunity)}
            className="enterprise-btn-primary px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
          >
            <span>Apply</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};
