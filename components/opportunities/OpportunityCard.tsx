'use client';

import React from 'react';
import { Opportunity } from '@/types';
import { Check, X, MapPin, Building, Calendar, DollarSign, Bookmark, ArrowRight, ShieldCheck } from 'lucide-react';

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

  let matchBadgeStyle = 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60';
  if (matchScore < 70) {
    matchBadgeStyle = 'bg-amber-950/40 text-amber-400 border-amber-800/60';
  } else if (matchScore >= 85) {
    matchBadgeStyle = 'bg-indigo-950/60 text-indigo-300 border-indigo-700/60';
  }

  return (
    <div className="saas-card rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-white/[0.14] transition-all">
      
      {/* Top Header Row */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-[#141824] border border-white/[0.08] flex items-center justify-center text-xl shrink-0">
              {opportunity.companyLogo}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-white truncate">
                {opportunity.title}
              </h3>
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                <span className="text-slate-300 font-medium">{opportunity.company}</span>
                <span>•</span>
                <span>{opportunity.location}</span>
              </div>
            </div>
          </div>

          {/* Match Score Badge */}
          <div className={`px-2.5 py-1 rounded-md border text-[11px] font-semibold tabular-nums shrink-0 ${matchBadgeStyle}`}>
            {matchScore}% Match
          </div>
        </div>

        {/* Opportunity Meta Info */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
          <span className="bg-[#141824] px-2 py-0.5 rounded border border-white/[0.06]">
            {opportunity.type}
          </span>
          <span className="bg-[#141824] px-2 py-0.5 rounded border border-white/[0.06] text-slate-300">
            {opportunity.stipend}
          </span>
          <span className="bg-[#141824] px-2 py-0.5 rounded border border-white/[0.06]">
            {opportunity.duration}
          </span>
        </div>

        {/* Why Recommended Explanation */}
        {match?.whyRecommended && (
          <div className="bg-[#121622] border border-white/[0.06] rounded-lg p-2.5 text-[11px] text-slate-300 leading-relaxed">
            <span className="text-indigo-400 font-medium">Why matched: </span>
            {match.whyRecommended}
          </div>
        )}

        {/* Matched vs Missing Skills Breakdown */}
        <div className="space-y-1.5 pt-1">
          {/* Matched Skills */}
          {match?.matchedSkills && match.matchedSkills.length > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-[10px] text-slate-500 mr-1">Matched:</span>
              {match.matchedSkills.slice(0, 3).map(skill => (
                <span key={skill} className="bg-[#141926] text-slate-300 border border-white/[0.06] px-1.5 py-0.5 rounded text-[10px] font-normal flex items-center gap-1">
                  <Check className="w-2.5 h-2.5 text-emerald-400" />
                  {skill}
                </span>
              ))}
              {match.matchedSkills.length > 3 && (
                <span className="text-[10px] text-slate-500">+{match.matchedSkills.length - 3}</span>
              )}
            </div>
          )}

          {/* Missing Skills */}
          {match?.missingSkills && match.missingSkills.length > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-[10px] text-slate-500 mr-1">Gap:</span>
              {match.missingSkills.slice(0, 2).map(skill => (
                <span key={skill} className="bg-rose-950/20 text-rose-300 border border-rose-900/40 px-1.5 py-0.5 rounded text-[10px] font-normal flex items-center gap-1">
                  <X className="w-2.5 h-2.5 text-rose-400" />
                  {skill}
                </span>
              ))}
              {match.missingSkills.length > 2 && (
                <span className="text-[10px] text-slate-500">+{match.missingSkills.length - 2}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          {onToggleSave && (
            <button
              onClick={() => onToggleSave(opportunity.id)}
              className={`p-1.5 rounded-lg border transition ${
                isSaved 
                  ? 'bg-amber-950/40 border-amber-800/60 text-amber-400' 
                  : 'bg-[#141824] border-white/[0.08] text-slate-400 hover:text-white'
              }`}
              title={isSaved ? 'Saved' : 'Save'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-400' : ''}`} />
            </button>
          )}

          {onViewDetails && (
            <button
              onClick={() => onViewDetails(opportunity)}
              className="text-xs text-slate-400 hover:text-slate-200 transition px-1.5 py-1"
            >
              Details
            </button>
          )}
        </div>

        {isApplied ? (
          <span className="bg-[#141824] text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Applied
          </span>
        ) : (
          <button
            onClick={() => onApply(opportunity)}
            className="saas-btn-primary px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5"
          >
            <span>Apply</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>

    </div>
  );
};
