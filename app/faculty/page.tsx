'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useStudent } from '@/lib/context/StudentContext';
import { FacultyOpportunity } from '@/types';
import { 
  BookOpenCheck, 
  Award, 
  Briefcase, 
  Target, 
  Search, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Building, 
  Sparkles, 
  Send, 
  ShieldCheck, 
  ChevronRight, 
  ExternalLink,
  GraduationCap,
  X
} from 'lucide-react';

export default function FacultyPortalPage() {
  const { facultyOpportunities, facultyApplications, applyFacultyOpportunity } = useStudent();

  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOpportunity, setSelectedOpportunity] = useState<FacultyOpportunity | null>(null);
  const [proposalNote, setProposalNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [activeView, setActiveView] = useState<'browse' | 'my-proposals'>('browse');

  const types = [
    'All',
    'Faculty Development Program (FDP)',
    'Faculty Internship',
    'Industrial Training',
    'Collaborative Research',
    'Consultancy Project'
  ];

  const filteredOpportunities = facultyOpportunities.filter(opp => {
    const matchesType = selectedType === 'All' || opp.type === selectedType;
    const matchesSearch = 
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.domain.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleOpenApply = (opp: FacultyOpportunity) => {
    setSelectedOpportunity(opp);
    setProposalNote('');
    setSubmissionSuccess(false);
  };

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOpportunity) return;

    setIsSubmitting(true);
    setTimeout(() => {
      applyFacultyOpportunity(selectedOpportunity.id, proposalNote);
      setIsSubmitting(false);
      setSubmissionSuccess(true);
    }, 400);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        
        {/* Top Header Banner */}
        <div className="bg-[#0f121d] border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 bg-indigo-950/80 border border-indigo-700/60 px-3 py-1 rounded-full text-xs font-semibold text-indigo-300">
                <BookOpenCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>Academician & Faculty Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Faculty Sabbaticals, National FDPs & Joint Research
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                Connect academic pedagogy with cutting-edge industrial practice. Explore sponsored industrial sabbaticals, Faculty Development Programs (FDPs), consultancy proposals, and Ministry of Ayush joint grants.
              </p>
            </div>

            <div className="bg-[#141824] border border-white/[0.08] p-4 rounded-2xl shrink-0 space-y-1 text-right">
              <div className="text-[11px] text-slate-400">Authenticated Faculty Member</div>
              <div className="text-sm font-bold text-white flex items-center gap-1.5 justify-end">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                <span>Dr. Sunita Deshmukh</span>
              </div>
              <div className="text-[10px] text-slate-400">
                Assoc. Professor • All India Institute of Ayurveda
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/[0.06]">
            <div className="bg-[#141824] rounded-2xl p-4 border border-white/[0.06]">
              <div className="text-xs text-slate-400">Available Faculty Programs</div>
              <div className="text-2xl font-bold text-white mt-1 tabular-nums">{facultyOpportunities.length}</div>
            </div>
            <div className="bg-[#141824] rounded-2xl p-4 border border-white/[0.06]">
              <div className="text-xs text-slate-400">Active Proposals Submitted</div>
              <div className="text-2xl font-bold text-indigo-400 mt-1 tabular-nums">{facultyApplications.length}</div>
            </div>
            <div className="bg-[#141824] rounded-2xl p-4 border border-white/[0.06]">
              <div className="text-xs text-slate-400">Approved Sabbaticals/FDPs</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1 tabular-nums">
                {facultyApplications.filter(a => a.status === 'Approved').length}
              </div>
            </div>
            <div className="bg-[#141824] rounded-2xl p-4 border border-white/[0.06]">
              <div className="text-xs text-slate-400">Sponsored Grants Value</div>
              <div className="text-2xl font-bold text-purple-400 mt-1 tabular-nums">₹5.3 Lakhs</div>
            </div>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('browse')}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
                activeView === 'browse' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white bg-[#141824]'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Browse All Opportunities ({facultyOpportunities.length})</span>
            </button>

            <button
              onClick={() => setActiveView('my-proposals')}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
                activeView === 'my-proposals' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white bg-[#141824]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>My Submitted Proposals ({facultyApplications.length})</span>
            </button>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-lg">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Ministry of Ayush Recognized</span>
          </span>
        </div>

        {/* VIEW 1: BROWSE OPPORTUNITIES */}
        {activeView === 'browse' && (
          <div className="space-y-6">
            
            {/* Filter Bar */}
            <div className="bg-[#0f121d] border border-white/[0.08] rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="relative sm:col-span-2">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by program title, domain, or sponsoring partner..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#141824] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 placeholder-slate-500"
                />
              </div>

              <div>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-[#141824] border border-white/[0.08] text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  {types.map(t => (
                    <option key={t} value={t}>{t === 'All' ? 'All Categories' : t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Opportunities Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredOpportunities.map(opp => (
                <div
                  key={opp.id}
                  className="bg-[#0f121d] border border-white/[0.08] rounded-3xl p-6 flex flex-col justify-between space-y-5 hover:border-indigo-500/40 transition shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="bg-indigo-950 text-indigo-300 border border-indigo-800 px-2.5 py-1 rounded-md font-bold text-[11px]">
                        {opp.type}
                      </span>
                      <span className="text-slate-400 text-[11px] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>Deadline: {opp.deadline}</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white leading-snug">{opp.title}</h3>
                    
                    <div className="text-xs text-slate-300 flex items-center gap-2">
                      <Building className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>{opp.organization} • {opp.location}</span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">{opp.description}</p>

                    <div className="bg-[#141824] rounded-2xl p-3 space-y-2 text-xs border border-white/[0.04]">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-medium text-[11px]">Funding / Honorarium:</span>
                        <span className="font-bold text-emerald-400 text-xs">{opp.stipendOrGrant}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-medium text-[11px]">Duration:</span>
                        <span className="font-semibold text-white text-xs">{opp.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-medium text-[11px]">Sponsored By:</span>
                        <span className="font-semibold text-indigo-300 text-xs">{opp.sponsoredBy}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 block">Expected Deliverables:</span>
                      <ul className="space-y-1">
                        {opp.deliverables.map((del, idx) => (
                          <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">{opp.seats} Seats Available</span>
                    <button
                      onClick={() => handleOpenApply(opp)}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
                    >
                      <span>Submit Proposal / Apply</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* VIEW 2: MY SUBMITTED PROPOSALS */}
        {activeView === 'my-proposals' && (
          <div className="space-y-4">
            <div className="bg-[#0f121d] border border-white/[0.08] rounded-3xl p-6 space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Submitted Applications & Research Sabbaticals
              </h2>

              <div className="divide-y divide-white/[0.06]">
                {facultyApplications.map(app => (
                  <div key={app.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{app.opportunityTitle}</span>
                        <span className="bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] px-2 py-0.5 rounded font-semibold">
                          {app.type}
                        </span>
                      </div>
                      <p className="text-slate-400">{app.organization} • Applied on {app.appliedDate}</p>
                      <p className="text-[11px] text-slate-300 italic pt-1">
                        "{app.proposalNote}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        app.status === 'Approved' 
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : 'bg-indigo-950 text-indigo-300 border-indigo-800'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* PROPOSAL APPLICATION MODAL */}
      {selectedOpportunity && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f121d] border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block">{selectedOpportunity.type}</span>
                <h3 className="text-base font-bold text-white">{selectedOpportunity.title}</h3>
              </div>
              <button onClick={() => setSelectedOpportunity(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {submissionSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-white">Proposal Successfully Submitted!</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Your institutional application has been registered with {selectedOpportunity.organization}. You can track evaluation progress in "My Proposals".
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedOpportunity(null);
                    setActiveView('my-proposals');
                  }}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-xs font-bold"
                >
                  View My Proposals
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitProposal} className="space-y-4 text-xs">
                <div className="bg-[#141824] p-3 rounded-xl space-y-1 text-[11px] text-slate-300">
                  <div><strong>Applicant:</strong> Dr. Sunita Deshmukh, Associate Professor</div>
                  <div><strong>Department:</strong> Pharmacognosy & Phytochemistry, All India Institute of Ayurveda</div>
                  <div><strong>Grant / Stipend:</strong> {selectedOpportunity.stipendOrGrant}</div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Statement of Intent & Research / Training Objectives *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe how this sabbatical, FDP, or consultancy project aligns with your research and will be integrated into the academic curriculum..."
                    value={proposalNote}
                    onChange={(e) => setProposalNote(e.target.value)}
                    className="w-full bg-[#141824] border border-white/[0.08] rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                  <input type="checkbox" required id="endorse" className="rounded accent-indigo-600 cursor-pointer" />
                  <label htmlFor="endorse" className="cursor-pointer">
                    I confirm institutional authorization from All India Institute of Ayurveda (AIIA).
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => setSelectedOpportunity(null)}
                    className="px-4 py-2 text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg transition disabled:opacity-50 flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Official Proposal'}</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </AppLayout>
  );
}
