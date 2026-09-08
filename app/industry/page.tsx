'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { useStudent } from '@/lib/context/StudentContext';
import { Opportunity, ApplicationRecord, LearningResource } from '@/types';
import { 
  Building2, 
  Briefcase, 
  Users, 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Sparkles, 
  Award, 
  BookOpen, 
  ChevronRight, 
  Send, 
  ArrowRight,
  ShieldCheck,
  Target,
  ExternalLink,
  GraduationCap,
  X
} from 'lucide-react';

export default function IndustryPortalPage() {
  const { 
    opportunities, 
    applications, 
    allStudents, 
    addOpportunity, 
    updateApplicationStatus, 
    addLearningResource,
    learningResources 
  } = useStudent();

  const [activeTab, setActiveTab] = useState<'applicants' | 'postings' | 'programs' | 'talent'>('applicants');
  const [showPostModal, setShowPostModal] = useState(false);
  const [showProgramModal, setShowProgramModal] = useState(false);
  
  // ATS Filter states
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchApplicant, setSearchApplicant] = useState('');
  const [selectedApplicant, setSelectedApplicant] = useState<ApplicationRecord | null>(applications[0] || null);

  // Talent Search states
  const [talentSearchSkill, setTalentSearchSkill] = useState('');
  const [talentMinCgpa, setTalentMinCgpa] = useState(7.5);

  // New Opportunity Form state
  const [newOpp, setNewOpp] = useState({
    title: '',
    company: 'HealthAnalytics India / Ayush Labs',
    location: 'Bengaluru, India (Hybrid)',
    type: 'Internship' as Opportunity['type'],
    stipend: '₹30,000 / month',
    duration: '3 Months',
    deadline: '2026-10-15',
    domain: 'Healthcare Informatics',
    requiredSkills: 'Python, Machine Learning, SQL, Healthcare EHR',
    minimumCGPA: 7.5,
    eligibleBranches: 'Computer Science, AI & Data Science, Biomedical Engg',
    description: 'Work with medical researchers and engineering teams to deploy AI models for botanical and clinical diagnostics.',
    responsibilities: 'Build reproducible ML pipelines, integrate FHIR API endpoints, and assist with validation trials.',
    perks: 'Certificate of Excellence, Pre-Placement Offer (PPO) opportunity, flexible hybrid schedule'
  });

  // New Learning Program Form state
  const [newProgram, setNewProgram] = useState({
    title: '',
    provider: 'Ayush Industry Consortium',
    type: 'Workshop' as LearningResource['type'],
    duration: '4 Weeks',
    level: 'Intermediate' as LearningResource['level'],
    skillAddressed: 'Healthcare Informatics & EHR',
    rating: 4.9,
    enrollUrl: 'https://skillbridge.ai/learn/ayush-informatics',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    isFree: true
  });

  // Handle Post Opportunity Submit
  const handlePostOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOpp.title.trim()) return;

    addOpportunity({
      title: newOpp.title,
      company: newOpp.company,
      companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=128&auto=format&fit=crop&q=80',
      location: newOpp.location,
      type: newOpp.type,
      stipend: newOpp.stipend,
      duration: newOpp.duration,
      deadline: newOpp.deadline,
      domain: newOpp.domain,
      requiredSkills: newOpp.requiredSkills.split(',').map(s => s.trim()).filter(Boolean),
      minimumCGPA: Number(newOpp.minimumCGPA),
      eligibleBranches: newOpp.eligibleBranches.split(',').map(b => b.trim()).filter(Boolean),
      description: newOpp.description,
      responsibilities: newOpp.responsibilities.split('.').map(r => r.trim()).filter(Boolean),
      perks: newOpp.perks.split(',').map(p => p.trim()).filter(Boolean),
      postedBy: 'Industry Recruiter'
    });

    setShowPostModal(false);
    setActiveTab('postings');
  };

  // Handle Publish Program Submit
  const handlePublishProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProgram.title.trim()) return;

    addLearningResource({
      title: newProgram.title,
      provider: newProgram.provider,
      type: newProgram.type,
      duration: newProgram.duration,
      level: newProgram.level,
      skillAddressed: newProgram.skillAddressed,
      rating: newProgram.rating,
      enrollUrl: newProgram.enrollUrl,
      image: newProgram.image,
      isFree: newProgram.isFree,
      publishedByIndustry: 'Verified Industry Partner'
    });

    setShowProgramModal(false);
    setActiveTab('programs');
  };

  // Filtered applicants
  const filteredApplicants = applications.filter(app => {
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    const matchesSearch = 
      (app.studentName || '').toLowerCase().includes(searchApplicant.toLowerCase()) ||
      app.opportunityTitle.toLowerCase().includes(searchApplicant.toLowerCase()) ||
      app.company.toLowerCase().includes(searchApplicant.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Filtered talent pool
  const filteredTalent = allStudents.filter(std => {
    const matchesCgpa = std.cgpa >= talentMinCgpa;
    const matchesSkill = !talentSearchSkill.trim() || std.skills.some(s => 
      s.name.toLowerCase().includes(talentSearchSkill.toLowerCase())
    );
    return matchesCgpa && matchesSkill;
  });

  const statusColors: Record<string, string> = {
    'Submitted': 'bg-blue-950 text-blue-300 border-blue-800',
    'Under Review': 'bg-amber-950 text-amber-300 border-amber-800',
    'Interview Scheduled': 'bg-purple-950 text-purple-300 border-purple-800',
    'Shortlisted': 'bg-indigo-950 text-indigo-300 border-indigo-800',
    'Offered': 'bg-emerald-950 text-emerald-300 border-emerald-800',
    'Rejected': 'bg-rose-950 text-rose-300 border-rose-800'
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        
        {/* Header Banner */}
        <div className="bg-[#0f121d] border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 bg-indigo-950/80 border border-indigo-700/60 px-3 py-1 rounded-full text-xs font-semibold text-indigo-300">
                <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Industry & Recruiter Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Recruitment, ATS & Learning Programs
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                Post internships and jobs, review algorithmically matched student candidates, manage your recruitment pipeline, and publish industry training courses.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setShowPostModal(true)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Post Opportunity</span>
              </button>

              <button
                onClick={() => setShowProgramModal(true)}
                className="bg-[#1a2030] hover:bg-[#222a40] text-slate-200 border border-white/[0.08] px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Publish Course / FDP</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/[0.06]">
            <div className="bg-[#141824] rounded-2xl p-4 border border-white/[0.06]">
              <div className="text-xs text-slate-400">Active Postings</div>
              <div className="text-2xl font-bold text-white mt-1 tabular-nums">{opportunities.length}</div>
            </div>
            <div className="bg-[#141824] rounded-2xl p-4 border border-white/[0.06]">
              <div className="text-xs text-slate-400">Total Applicants</div>
              <div className="text-2xl font-bold text-indigo-400 mt-1 tabular-nums">{applications.length}</div>
            </div>
            <div className="bg-[#141824] rounded-2xl p-4 border border-white/[0.06]">
              <div className="text-xs text-slate-400">Avg Skill Compatibility</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1 tabular-nums">84%</div>
            </div>
            <div className="bg-[#141824] rounded-2xl p-4 border border-white/[0.06]">
              <div className="text-xs text-slate-400">Interviews & Shortlists</div>
              <div className="text-2xl font-bold text-purple-400 mt-1 tabular-nums">
                {applications.filter(a => a.status === 'Interview Scheduled' || a.status === 'Shortlisted').length}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('applicants')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
              activeTab === 'applicants' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white bg-[#141824]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>ATS Candidate Pipeline ({applications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('postings')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
              activeTab === 'postings' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white bg-[#141824]'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Published Opportunities ({opportunities.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('talent')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
              activeTab === 'talent' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white bg-[#141824]'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Talent Discovery Pool ({allStudents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('programs')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
              activeTab === 'programs' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white bg-[#141824]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Industry Learning Programs ({learningResources.length})</span>
          </button>
        </div>

        {/* TAB 1: ATS Candidate Pipeline */}
        {activeTab === 'applicants' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left 2 Cols: Applicants List & Filters */}
            <div className="lg:col-span-2 space-y-4">
              
              {/* Filter controls */}
              <div className="bg-[#0f121d] border border-white/[0.08] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search candidate name or role..."
                    value={searchApplicant}
                    onChange={(e) => setSearchApplicant(e.target.value)}
                    className="w-full bg-[#141824] border border-white/[0.08] rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-slate-400 text-[11px] shrink-0">Stage:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-[#141824] border border-white/[0.08] text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="All">All Stages</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Interview Scheduled">Interview Scheduled</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Offered">Offered</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {/* Applicant Cards List */}
              <div className="space-y-3">
                {filteredApplicants.map(app => {
                  const isSelected = selectedApplicant?.id === app.id;
                  return (
                    <div
                      key={app.id}
                      onClick={() => setSelectedApplicant(app)}
                      className={`bg-[#0f121d] border rounded-2xl p-4 transition-all duration-200 cursor-pointer hover:border-indigo-500/50 ${
                        isSelected 
                          ? 'border-indigo-500 ring-2 ring-indigo-500/30 bg-gradient-to-r from-[#141824] to-[#0f121d]' 
                          : 'border-white/[0.08]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{app.studentName || 'Student Candidate'}</span>
                            <span className="text-xs text-slate-400">• {app.studentBranch || 'Computer Science'}</span>
                          </div>
                          <p className="text-xs text-indigo-300 font-medium">{app.opportunityTitle}</p>
                          <div className="text-[11px] text-slate-400">
                            CGPA: <strong className="text-slate-200">{app.studentCgpa || 8.5}</strong> • Applied: {app.appliedDate}
                          </div>
                        </div>

                        <div className="text-right space-y-2 shrink-0">
                          <div className="inline-flex items-center gap-1 bg-indigo-950/80 border border-indigo-700/60 px-2.5 py-0.5 rounded-full text-xs font-bold text-indigo-300">
                            <span>{app.matchScoreAtApplication}% Match</span>
                          </div>
                          <div>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[app.status]}`}>
                              {app.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {filteredApplicants.length === 0 && (
                  <div className="bg-[#0f121d] border border-white/[0.08] rounded-2xl p-8 text-center text-slate-400 text-xs">
                    No candidates found for this filter.
                  </div>
                )}
              </div>

            </div>

            {/* Right 1 Col: Candidate Review & Status Advancement Drawer */}
            {selectedApplicant && (
              <div className="bg-[#0f121d] border border-white/[0.08] rounded-3xl p-6 space-y-6 shadow-xl sticky top-20">
                <div className="border-b border-white/[0.06] pb-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Candidate Profile</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[selectedApplicant.status]}`}>
                      {selectedApplicant.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{selectedApplicant.studentName || 'Student Candidate'}</h3>
                  <p className="text-xs text-slate-400">{selectedApplicant.studentEmail}</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="bg-[#141824] p-3 rounded-xl space-y-1">
                    <span className="text-slate-400 block text-[11px]">Applied Opportunity:</span>
                    <span className="font-semibold text-white">{selectedApplicant.opportunityTitle}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-[#141824] p-3 rounded-xl">
                      <span className="text-[11px] text-slate-400 block">AI Match Score</span>
                      <span className="text-xl font-bold text-indigo-400">{selectedApplicant.matchScoreAtApplication}%</span>
                    </div>
                    <div className="bg-[#141824] p-3 rounded-xl">
                      <span className="text-[11px] text-slate-400 block">Academic CGPA</span>
                      <span className="text-xl font-bold text-emerald-400">{selectedApplicant.studentCgpa || 8.65}</span>
                    </div>
                  </div>

                  {selectedApplicant.notes && (
                    <div className="bg-[#141824] p-3 rounded-xl space-y-1">
                      <span className="text-slate-400 block text-[11px] font-bold">Candidate Submission Notes:</span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">{selectedApplicant.notes}</p>
                    </div>
                  )}

                  {/* Recruiter Stage Updater */}
                  <div className="pt-3 border-t border-white/[0.06] space-y-2">
                    <label className="text-xs font-bold text-white block">Update Candidate Stage:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => updateApplicationStatus(selectedApplicant.id, 'Interview Scheduled')}
                        className="bg-purple-950/80 hover:bg-purple-900 border border-purple-800 text-purple-200 py-2 px-3 rounded-xl text-xs font-bold transition"
                      >
                        Schedule Interview
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(selectedApplicant.id, 'Shortlisted')}
                        className="bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-800 text-indigo-200 py-2 px-3 rounded-xl text-xs font-bold transition"
                      >
                        Shortlist Candidate
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(selectedApplicant.id, 'Offered')}
                        className="bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-emerald-200 py-2 px-3 rounded-xl text-xs font-bold transition"
                      >
                        Extend Offer
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(selectedApplicant.id, 'Rejected')}
                        className="bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-200 py-2 px-3 rounded-xl text-xs font-bold transition"
                      >
                        Mark Inactive
                      </button>
                    </div>
                  </div>
                </div>

                <Link
                  href="/portfolio"
                  className="w-full bg-[#1a2030] hover:bg-[#222a40] text-slate-200 border border-white/[0.08] py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>View Verified Student Portfolio</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

              </div>
            )}

          </div>
        )}

        {/* TAB 2: Published Opportunities */}
        {activeTab === 'postings' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">Active Postings on Portal</h2>
              <button
                onClick={() => setShowPostModal(true)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Post New Role</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {opportunities.map(opp => (
                <div key={opp.id} className="bg-[#0f121d] border border-white/[0.08] rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="bg-indigo-950 text-indigo-300 border border-indigo-800 px-2 py-0.5 rounded-md font-semibold text-[10px]">
                        {opp.type}
                      </span>
                      <span className="text-slate-400 text-[11px]">{opp.duration}</span>
                    </div>

                    <h3 className="text-base font-bold text-white">{opp.title}</h3>
                    <p className="text-xs text-slate-400">{opp.company} • {opp.location}</p>

                    <div className="pt-2">
                      <div className="text-[11px] text-slate-400 mb-1.5">Required Skills:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {opp.requiredSkills.map((s, idx) => (
                          <span key={idx} className="bg-[#141824] text-slate-300 border border-white/[0.06] text-[10px] px-2 py-0.5 rounded-md font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-400">{opp.stipend}</span>
                    <span className="text-slate-400 text-[11px]">Min CGPA: {opp.minimumCGPA}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Talent Discovery Search */}
        {activeTab === 'talent' && (
          <div className="space-y-6">
            
            {/* Filter Bar */}
            <div className="bg-[#0f121d] border border-white/[0.08] rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="relative sm:col-span-2">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by skill keyword (e.g., Python, PyTorch, React, SQL)..."
                  value={talentSearchSkill}
                  onChange={(e) => setTalentSearchSkill(e.target.value)}
                  className="w-full bg-[#141824] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <select
                  value={talentMinCgpa}
                  onChange={(e) => setTalentMinCgpa(Number(e.target.value))}
                  className="w-full bg-[#141824] border border-white/[0.08] text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value={7.0}>Min CGPA: 7.0+</option>
                  <option value={7.5}>Min CGPA: 7.5+</option>
                  <option value={8.0}>Min CGPA: 8.0+</option>
                  <option value={8.5}>Min CGPA: 8.5+</option>
                </select>
              </div>
            </div>

            {/* Students Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTalent.map(cand => (
                <div key={cand.id} className="bg-[#0f121d] border border-white/[0.08] rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={cand.avatar}
                        alt={cand.name}
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/[0.1]"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white">{cand.name}</h4>
                        <p className="text-[11px] text-slate-400">{cand.branch} • {cand.institution}</p>
                        <div className="flex items-center gap-2 text-[11px] text-indigo-300 font-semibold mt-0.5">
                          <span>CGPA: {cand.cgpa}</span>
                          <span>•</span>
                          <span>Readiness: {cand.readinessScore}/100</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-[11px] text-slate-400 font-medium">Top Verified Skills:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {cand.skills.slice(0, 5).map(s => (
                          <span key={s.id} className="bg-[#141824] border border-white/[0.06] text-slate-200 text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1">
                            {s.verified && <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />}
                            <span>{s.name} ({s.level}%)</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">Target: {cand.targetRole}</span>
                    <button
                      onClick={() => alert(`Invitation to apply sent to ${cand.name} (${cand.email})`)}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg font-bold text-[11px] transition shadow"
                    >
                      Invite to Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 4: Industry Learning Programs */}
        {activeTab === 'programs' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white">Company Training Programs & Workshops</h2>
                <p className="text-xs text-slate-400">Courses published by industry to train students before recruitment.</p>
              </div>
              <button
                onClick={() => setShowProgramModal(true)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Publish Course</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {learningResources.map(prog => (
                <div key={prog.id} className="bg-[#0f121d] border border-white/[0.08] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-indigo-500/40 transition">
                  <div>
                    <img src={prog.image} alt={prog.title} className="w-full h-36 object-cover" />
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="text-indigo-400 font-bold text-[11px]">{prog.provider}</span>
                        <span className="bg-indigo-950 text-indigo-300 border border-indigo-800 px-2 py-0.5 rounded text-[10px]">{prog.type}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{prog.title}</h4>
                      <p className="text-xs text-slate-400">Skill Addressed: <strong className="text-slate-200">{prog.skillAddressed}</strong></p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex items-center justify-between text-xs border-t border-white/[0.06] mt-2">
                    <span className="text-slate-400 text-[11px]">{prog.duration} • {prog.level}</span>
                    <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      {prog.isFree ? 'Free Access' : 'Sponsored'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* POST OPPORTUNITY MODAL */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0f121d] border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">Post New Industry Opportunity</h3>
              </div>
              <button onClick={() => setShowPostModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostOpportunity} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Opportunity Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayush AI Informatics Research Intern"
                    value={newOpp.title}
                    onChange={(e) => setNewOpp({ ...newOpp, title: e.target.value })}
                    className="w-full bg-[#141824] border border-white/[0.08] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={newOpp.company}
                    onChange={(e) => setNewOpp({ ...newOpp, company: e.target.value })}
                    className="w-full bg-[#141824] border border-white/[0.08] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Role Type</label>
                  <select
                    value={newOpp.type}
                    onChange={(e) => setNewOpp({ ...newOpp, type: e.target.value as any })}
                    className="w-full bg-[#141824] border border-white/[0.08] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="Internship">Internship</option>
                    <option value="Full-time">Full-time Entry Level</option>
                    <option value="Remote Internship">Remote Internship</option>
                    <option value="Live Project">Live Project</option>
                    <option value="Apprenticeship">Apprenticeship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Stipend / CTC</label>
                  <input
                    type="text"
                    value={newOpp.stipend}
                    onChange={(e) => setNewOpp({ ...newOpp, stipend: e.target.value })}
                    className="w-full bg-[#141824] border border-white/[0.08] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Duration</label>
                  <input
                    type="text"
                    value={newOpp.duration}
                    onChange={(e) => setNewOpp({ ...newOpp, duration: e.target.value })}
                    className="w-full bg-[#141824] border border-white/[0.08] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Required Skills (Comma separated) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Python, Machine Learning, SQL, FHIR"
                    value={newOpp.requiredSkills}
                    onChange={(e) => setNewOpp({ ...newOpp, requiredSkills: e.target.value })}
                    className="w-full bg-[#141824] border border-white/[0.08] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Eligible Branches</label>
                  <input
                    type="text"
                    value={newOpp.eligibleBranches}
                    onChange={(e) => setNewOpp({ ...newOpp, eligibleBranches: e.target.value })}
                    className="w-full bg-[#141824] border border-white/[0.08] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Role Description</label>
                <textarea
                  rows={3}
                  value={newOpp.description}
                  onChange={(e) => setNewOpp({ ...newOpp, description: e.target.value })}
                  className="w-full bg-[#141824] border border-white/[0.08] rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-2 rounded-xl shadow-lg transition"
                >
                  Publish Role to Students
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PUBLISH PROGRAM MODAL */}
      {showProgramModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f121d] border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">Publish Industry Course / Workshop</h3>
              </div>
              <button onClick={() => setShowProgramModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePublishProgram} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Program Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Clinical Health Informatics Bootcamp"
                  value={newProgram.title}
                  onChange={(e) => setNewProgram({ ...newProgram, title: e.target.value })}
                  className="w-full bg-[#141824] border border-white/[0.08] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Skill Addressed *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Python for Healthcare"
                    value={newProgram.skillAddressed}
                    onChange={(e) => setNewProgram({ ...newProgram, skillAddressed: e.target.value })}
                    className="w-full bg-[#141824] border border-white/[0.08] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Duration</label>
                  <input
                    type="text"
                    value={newProgram.duration}
                    onChange={(e) => setNewProgram({ ...newProgram, duration: e.target.value })}
                    className="w-full bg-[#141824] border border-white/[0.08] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setShowProgramModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-2 rounded-xl shadow-lg transition"
                >
                  Publish Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AppLayout>
  );
}
