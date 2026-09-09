'use client';

import React, { useState } from 'react';
import { Opportunity } from '@/types';
import { useStudent } from '@/lib/context/StudentContext';
import { X, CheckCircle2, FileText, Send, ShieldCheck, UserCheck, AlertCircle } from 'lucide-react';

interface ApplyModalProps {
  opportunity: Opportunity | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ opportunity, onClose, onSuccess }) => {
  const { student, applyForOpportunity } = useStudent();
  const [coverNote, setCoverNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!opportunity) return null;

  const match = opportunity.matchDetails;
  const metCount = match?.matchedSkills?.length || 0;
  const missingCount = match?.missingSkills?.length || 0;
  const totalRequired = metCount + missingCount;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      applyForOpportunity(opportunity.id, coverNote);
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 1400);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="enterprise-card rounded-2xl max-w-lg w-full p-6 sm:p-7 space-y-4 shadow-enterprise-modal relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Application Submitted!</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
              Your verified SkillBridge profile and credentials have been shared with{' '}
              <span className="font-semibold text-slate-800 dark:text-slate-200">{opportunity.company}</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleApply} className="space-y-4">
            
            {/* Header */}
            <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Application Submission</span>
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white leading-tight">{opportunity.title}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{opportunity.company} · {opportunity.location}</p>
            </div>

            {/* Criteria Match Summary */}
            <div className="enterprise-row rounded-xl p-3.5 flex items-center justify-between text-xs gap-3">
              <div>
                <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                  {metCount} of {totalRequired || metCount} core criteria met
                </div>
                {match?.whyRecommended && (
                  <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5 leading-relaxed">{match.whyRecommended}</div>
                )}
              </div>
              <span className={`status-pill shrink-0 ${
                missingCount === 0 ? 'status-pill-green' : missingCount <= 1 ? 'status-pill-amber' : 'status-pill-red'
              }`}>
                {missingCount === 0 ? 'All Met' : `${missingCount} Missing`}
              </span>
            </div>

            {/* Missing skills warning */}
            {match?.missingSkills && match.missingSkills.length > 0 && (
              <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-lg p-3 flex items-start gap-2 text-xs">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-800 dark:text-amber-300">Skill gap flagged: </span>
                  <span className="text-amber-700 dark:text-amber-400">{match.missingSkills.join(', ')} — recruiter may request evidence during interview.</span>
                </div>
              </div>
            )}

            {/* Applicant Data Preview */}
            <div className="enterprise-row rounded-xl p-4 space-y-2.5 text-xs">
              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider pb-1.5 border-b border-slate-200 dark:border-slate-700">
                Applicant Details (Auto-filled from Verified Profile)
              </div>
              {[
                { label: 'Name', value: student.name, verified: true },
                { label: 'Institution & Branch', value: `${student.institution} · ${student.branch}`, verified: false },
                { label: 'CGPA', value: `${student.cgpa} / 10`, verified: true },
                { label: 'Readiness Score', value: `${student.readinessScore} / 100`, verified: false },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">{row.label}:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    {row.value}
                    {row.verified && <UserCheck className="w-3 h-3 text-blue-600 dark:text-blue-400" />}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  Verified Resume:
                </span>
                <span className="text-blue-700 dark:text-blue-400 font-medium underline cursor-pointer text-[11px]">
                  SkillBridge_Verified_Resume.pdf
                </span>
              </div>
            </div>

            {/* Cover Note */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Cover Note / Project Highlights (Optional)
              </label>
              <textarea
                rows={3}
                value={coverNote}
                onChange={e => setCoverNote(e.target.value)}
                placeholder="Highlight your top Python/ML projects, GATE score, GitHub repos, or NPTEL certifications..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500 placeholder-slate-400 dark:placeholder-slate-500 resize-none transition"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="enterprise-btn-primary px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Confirm & Submit Application</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};
