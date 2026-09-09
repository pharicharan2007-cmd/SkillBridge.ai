'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useStudent } from '@/lib/context/StudentContext';
import { 
  Award,
  Briefcase,
  CheckCircle2, 
  ArrowRight, 
  FileCheck,
  ArrowUpRight,
  ChevronRight,
  BookOpen,
  Microscope,
  Cpu
} from 'lucide-react';

const PROPOSAL_STAGES = ['Draft', 'HOD Forwarded', 'Industry Co-Sign', 'AICTE/DST Sanction', 'Active/Funded'];

const stageColors: Record<string, string> = {
  'Draft': 'status-pill-slate',
  'Proposal Submitted': 'status-pill-blue',
  'HOD Forwarded': 'status-pill-amber',
  'Industry Co-Sign': 'status-pill-purple',
  'Approved': 'status-pill-green',
  'Active/Funded': 'status-pill-green',
};

const typeIcons: Record<string, React.ElementType> = {
  'Faculty Development Program (FDP)': Award,
  'Collaborative Research': Microscope,
  'Faculty Internship': Briefcase,
  'Consultancy Project': Cpu,
  'Industrial Training': BookOpen,
};

export default function FacultyPortal() {
  const { facultyOpportunities, facultyApplications, applyFacultyOpportunity } = useStudent();
  const [activeTab, setActiveTab] = useState<'fdp' | 'research' | 'internships' | 'proposals'>('fdp');
  const [proposalNote, setProposalNote] = useState('');
  const [appliedId, setAppliedId] = useState<string | null>(null);
  const [proposingFor, setProposingFor] = useState<string | null>(null);

  const fdps = facultyOpportunities.filter(o => o.type.includes('FDP') || o.type.includes('Training'));
  const research = facultyOpportunities.filter(o => o.type.includes('Research') || o.type.includes('Consultancy'));
  const internships = facultyOpportunities.filter(o => o.type === 'Faculty Internship');

  const handleApply = (opportunityId: string) => {
    if (!proposalNote.trim()) return;
    const success = applyFacultyOpportunity(opportunityId, proposalNote);
    if (success) {
      setAppliedId(opportunityId);
      setProposingFor(null);
      setProposalNote('');
    }
  };

  const tabs = [
    { id: 'fdp', label: 'FDPs & Training', count: fdps.length, badge: 'AICTE' },
    { id: 'research', label: 'Research & Grants', count: research.length, badge: 'DST/SERB' },
    { id: 'internships', label: 'Faculty Internships', count: internships.length, badge: null },
    { id: 'proposals', label: 'My Proposals', count: facultyApplications.length, badge: null },
  ] as const;

  const renderList = (items: typeof facultyOpportunities) => (
    <div className="space-y-4">
      {items.map(opp => {
        const TypeIcon = typeIcons[opp.type] || Award;
        const isApplied = facultyApplications.some(a => a.opportunityId === opp.id) || appliedId === opp.id;
        const isProposing = proposingFor === opp.id;

        return (
          <div key={opp.id} className="enterprise-card rounded-xl p-5 sm:p-6 space-y-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                <TypeIcon className="w-5 h-5 text-blue-700" />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex flex-wrap items-start gap-2">
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">{opp.title}</h3>
                  <span className="status-pill status-pill-blue text-[10px]">{opp.type}</span>
                </div>
                <div className="text-xs text-slate-500">
                  {opp.organization} · {opp.location}
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-sm font-bold text-emerald-700">{opp.stipendOrGrant}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{opp.duration} · Deadline: {opp.deadline}</div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 leading-relaxed">{opp.description}</p>

            {/* Deliverables */}
            <div className="enterprise-row rounded-lg p-3 space-y-1.5">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Expected Deliverables</div>
              <ul className="space-y-1">
                {opp.deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Meta & Apply */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap gap-2 text-[10px]">
                <span className="credential-tag">{opp.seats} seats</span>
                <span className="credential-tag">Sponsored by {opp.sponsoredBy}</span>
                <span className="credential-tag">Eligible: {opp.eligibility.substring(0, 50)}...</span>
              </div>

              {isApplied ? (
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Proposal Submitted</span>
                </div>
              ) : (
                <button
                  onClick={() => setProposingFor(isProposing ? null : opp.id)}
                  className="enterprise-btn-primary px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>{isProposing ? 'Cancel' : 'Submit Proposal'}</span>
                </button>
              )}
            </div>

            {/* Proposal Form */}
            {isProposing && !isApplied && (
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <div className="text-xs font-semibold text-slate-700">
                  Proposal Note (attach research context & relevance to DTU curriculum)
                </div>
                <textarea
                  rows={4}
                  value={proposalNote}
                  onChange={e => setProposalNote(e.target.value)}
                  placeholder="Describe your research background, how this opportunity aligns with your teaching/research agenda, and any preliminary work done in this domain..."
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 resize-none text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400 transition"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id={`ipr-${opp.id}`} className="w-3.5 h-3.5 accent-blue-700" />
                    <label htmlFor={`ipr-${opp.id}`} className="text-[11px] text-slate-600">
                      Research output may be patentable — notify DTU IPR Cell on sanction
                    </label>
                  </div>
                  <button
                    onClick={() => handleApply(opp.id)}
                    disabled={!proposalNote.trim()}
                    className="enterprise-btn-primary px-4 py-2 rounded-lg text-xs font-semibold disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Submit Proposal</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {items.length === 0 && (
        <div className="enterprise-card rounded-xl p-8 text-center">
          <div className="text-slate-400 text-xs">No opportunities in this category currently.</div>
        </div>
      )}
    </div>
  );

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* Header */}
        <div className="enterprise-card rounded-xl p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span>Faculty & Academician Portal · AICTE Approved</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Dr. Priya Raghunathan
            </h1>
            <p className="text-xs text-slate-500">
              Associate Professor — Electrical Engineering (EED) · Delhi Technological University
            </p>
          </div>

          {/* Grant Pipeline Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            {[
              { label: 'Draft', value: '1', color: 'text-slate-700' },
              { label: 'Submitted', value: '1', color: 'text-blue-700' },
              { label: 'Approved', value: '1', color: 'text-emerald-700' },
              { label: 'Active', value: '0', color: 'text-slate-400' },
            ].map(s => (
              <div key={s.label} className="enterprise-row rounded-lg px-3 py-2 text-center">
                <div className={`text-lg font-bold tabular-nums ${s.color}`}>{s.value}</div>
                <div className="text-[10px] text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-slate-200 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 whitespace-nowrap px-4 py-3 text-xs font-semibold border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-blue-700 text-blue-800'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
              }`}>
                {tab.count}
              </span>
              {tab.badge && (
                <span className="hidden sm:inline status-pill status-pill-green text-[9px]">{tab.badge}</span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'fdp' && renderList(fdps)}
        {activeTab === 'research' && renderList(research)}
        {activeTab === 'internships' && renderList(internships)}

        {activeTab === 'proposals' && (
          <div className="space-y-4">
            <div className="text-xs font-semibold text-slate-700 pb-1 border-b border-slate-100">
              Proposal Pipeline — Dr. Priya Raghunathan
            </div>
            {facultyApplications.length === 0 ? (
              <div className="enterprise-card rounded-xl p-8 text-center text-xs text-slate-400">
                No proposals submitted yet. Browse FDPs & Research tabs to apply.
              </div>
            ) : (
              facultyApplications.map(app => (
                <div key={app.id} className="enterprise-card rounded-xl p-5 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{app.opportunityTitle}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{app.organization} · Applied {app.appliedDate}</p>
                    </div>
                    <span className={`status-pill text-[11px] ${stageColors[app.status] || 'status-pill-slate'}`}>
                      {app.status}
                    </span>
                  </div>

                  {/* Pipeline Tracker */}
                  <div className="flex items-center gap-1 overflow-x-auto pb-1">
                    {PROPOSAL_STAGES.map((stage, i) => {
                      const stageIdx = PROPOSAL_STAGES.indexOf(
                        app.status === 'Approved' ? 'AICTE/DST Sanction' : 
                        app.status === 'Proposal Submitted' ? 'HOD Forwarded' : 'Draft'
                      );
                      const completed = i <= stageIdx;
                      return (
                        <React.Fragment key={stage}>
                          <div className={`flex flex-col items-center shrink-0 w-20`}>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              completed ? 'border-blue-700 bg-blue-700' : 'border-slate-200 bg-white'
                            }`}>
                              {completed && <CheckCircle2 className="w-3 h-3 text-white" />}
                            </div>
                            <span className="text-[9px] text-slate-500 text-center leading-tight mt-1">{stage}</span>
                          </div>
                          {i < PROPOSAL_STAGES.length - 1 && (
                            <div className={`flex-1 h-0.5 mt-[-10px] ${completed ? 'bg-blue-300' : 'bg-slate-200'}`} />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>

                  <div className="text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-lg p-3">
                    <span className="font-medium">Proposal Note:</span> {app.proposalNote}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
