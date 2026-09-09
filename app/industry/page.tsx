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
  Award, 
  BookOpen, 
  Send,
  Target,
  ExternalLink,
  Download,
  HandshakeIcon,
  X,
  AlertCircle
} from 'lucide-react';

const statusPills: Record<string, string> = {
  'Submitted': 'status-pill-blue',
  'Under Review': 'status-pill-amber',
  'Interview Scheduled': 'status-pill-purple',
  'Shortlisted': 'status-pill-green',
  'Offered': 'status-pill-green',
  'Rejected': 'status-pill-red',
};

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
    company: 'Tata Consultancy Services (TCS)',
    location: 'Pune / Chennai / Noida (Onsite)',
    type: 'Internship' as Opportunity['type'],
    stipend: '₹40,000 / month',
    duration: '6 Months',
    deadline: '2026-11-30',
    domain: 'Software Engineering',
    requiredSkills: 'Python, Data Structures & Algorithms, SQL & Data Pipelines, Git & Linux',
    minimumCGPA: 7.5,
    eligibleBranches: 'Computer Science and Engineering, AI & Data Science, Information Technology',
    description: '',
    responsibilities: '',
    perks: 'TCS NQT Score verification, Pre-Placement Offer track, TCS Learning Hub access'
  });

  // New Learning Program Form state
  const [newProgram, setNewProgram] = useState({
    title: '',
    provider: 'TCS iON / Infosys Springboard',
    type: 'Workshop' as LearningResource['type'],
    duration: '4 Weeks',
    level: 'Intermediate' as LearningResource['level'],
    skillAddressed: 'Python & Data Engineering',
    rating: 4.9,
    enrollUrl: 'https://infyspringboard.com',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400',
    isFree: true
  });

  const handlePostOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOpp.title.trim()) return;
    addOpportunity({
      title: newOpp.title,
      company: newOpp.company,
      companyLogo: '🏢',
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

  const filteredApplicants = applications.filter(app => {
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    const matchesSearch = 
      (app.studentName || '').toLowerCase().includes(searchApplicant.toLowerCase()) ||
      app.opportunityTitle.toLowerCase().includes(searchApplicant.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredTalent = allStudents.filter(std => {
    const matchesCgpa = std.cgpa >= talentMinCgpa;
    const matchesSkill = !talentSearchSkill.trim() || std.skills.some(s => 
      s.name.toLowerCase().includes(talentSearchSkill.toLowerCase())
    );
    return matchesCgpa && matchesSkill;
  });

  // ATS summary KPIs
  const screened = applications.filter(a => a.status !== 'Submitted').length;
  const interviews = applications.filter(a => a.status === 'Interview Scheduled' || a.status === 'Shortlisted').length;

  const tabs = [
    { id: 'applicants', label: 'ATS Pipeline', count: applications.length },
    { id: 'postings', label: 'Active Postings', count: opportunities.length },
    { id: 'talent', label: 'Talent Discovery', count: allStudents.length },
    { id: 'programs', label: 'Learning Programs', count: learningResources.length },
  ] as const;

  return (
    <AppLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="enterprise-card rounded-xl p-6 sm:p-7">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                <Building2 className="w-3 h-3 text-blue-700" />
                <span>Industry & Recruiter Portal · TCS iON Campus Team</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Recruitment, ATS & Learning Programs
              </h1>
              <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
                Post campus hiring opportunities, screen candidates by criteria, manage recruitment pipeline, and publish training programs for DTU, IIT Delhi, and NSUT students.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setShowPostModal(true)}
                className="enterprise-btn-primary px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Post Opportunity</span>
              </button>
              <button
                onClick={() => setShowProgramModal(true)}
                className="enterprise-btn-secondary px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                <span>Publish Course</span>
              </button>
            </div>
          </div>

          {/* ATS KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 mt-5 border-t border-slate-100">
            {[
              { label: 'Active Postings', value: opportunities.length, color: 'text-slate-900' },
              { label: 'Applications Received', value: applications.length, color: 'text-blue-700' },
              { label: 'Screened (criteria met)', value: screened, color: 'text-emerald-700' },
              { label: 'Interviews & Shortlists', value: interviews, color: 'text-purple-700' },
            ].map(kpi => (
              <div key={kpi.label} className="enterprise-row rounded-lg px-3 py-2.5 text-center">
                <div className={`text-xl font-bold tabular-nums ${kpi.color}`}>{kpi.value}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{kpi.label}</div>
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
            </button>
          ))}
        </div>

        {/* TAB 1: ATS Pipeline */}
        {activeTab === 'applicants' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left: Applicants List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="enterprise-card rounded-xl p-4 flex flex-col sm:flex-row items-center gap-3">
                <div className="relative w-full sm:flex-1">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search candidate name or role..."
                    value={searchApplicant}
                    onChange={e => setSearchApplicant(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-400 placeholder-slate-400"
                  />
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] text-slate-400">Stage:</span>
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="bg-white border border-slate-200 text-slate-700 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-400 cursor-pointer"
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

              <div className="space-y-3">
                {filteredApplicants.map(app => {
                  const isSelected = selectedApplicant?.id === app.id;
                  return (
                    <div
                      key={app.id}
                      onClick={() => setSelectedApplicant(app)}
                      className={`enterprise-card rounded-xl p-4 cursor-pointer transition-all ${
                        isSelected ? 'border-blue-400 ring-1 ring-blue-300 bg-blue-50/30' : 'hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{app.studentName || 'Candidate'}</span>
                            <span className="text-xs text-slate-400">· {app.studentBranch}</span>
                          </div>
                          <p className="text-xs font-medium text-blue-700">{app.opportunityTitle}</p>
                          <div className="text-[11px] text-slate-500">
                            CGPA: <strong className="text-slate-800">{app.studentCgpa}</strong> · Applied: {app.appliedDate}
                          </div>
                          {app.notes && (
                            <p className="text-[11px] text-slate-500 italic mt-0.5 line-clamp-1">{app.notes}</p>
                          )}
                        </div>

                        <span className={`status-pill shrink-0 ${statusPills[app.status] || 'status-pill-slate'}`}>
                          {app.status}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {filteredApplicants.length === 0 && (
                  <div className="enterprise-card rounded-xl p-8 text-center text-xs text-slate-400">
                    No candidates match the current filter.
                  </div>
                )}
              </div>
            </div>

            {/* Right: Candidate Detail Drawer */}
            {selectedApplicant && (
              <div className="enterprise-card rounded-xl p-5 space-y-5 sticky top-20">
                <div className="pb-3 border-b border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Candidate Profile</span>
                    <span className={`status-pill ${statusPills[selectedApplicant.status] || 'status-pill-slate'}`}>
                      {selectedApplicant.status}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{selectedApplicant.studentName}</h3>
                  <p className="text-xs text-slate-500">{selectedApplicant.studentEmail}</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="enterprise-row rounded-lg p-3 space-y-0.5">
                    <span className="text-slate-400 text-[11px] font-semibold">Applied Role:</span>
                    <div className="font-semibold text-slate-800">{selectedApplicant.opportunityTitle}</div>
                    <div className="text-slate-500">{selectedApplicant.company}</div>
                  </div>

                  {/* Criteria breakdown instead of match % */}
                  <div className="enterprise-row rounded-lg p-3 space-y-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Eligibility Verification</span>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-[11px] text-slate-700">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>CGPA {selectedApplicant.studentCgpa} — meets cutoff</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-700">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>Branch: {selectedApplicant.studentBranch}</span>
                      </div>
                      {selectedApplicant.notes && (
                        <p className="text-[11px] text-slate-500 leading-relaxed pt-1 border-t border-slate-100">{selectedApplicant.notes}</p>
                      )}
                    </div>
                  </div>

                  {/* ATS Stage Updater */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <label className="text-xs font-bold text-slate-700 block">Update Candidate Stage:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => updateApplicationStatus(selectedApplicant.id, 'Interview Scheduled')}
                        className="enterprise-btn-secondary border border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 py-1.5 px-2 rounded-lg text-[11px] font-semibold transition"
                      >
                        Schedule Interview
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(selectedApplicant.id, 'Shortlisted')}
                        className="enterprise-btn-secondary border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 py-1.5 px-2 rounded-lg text-[11px] font-semibold transition"
                      >
                        Shortlist
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(selectedApplicant.id, 'Offered')}
                        className="enterprise-btn-secondary border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 py-1.5 px-2 rounded-lg text-[11px] font-semibold transition"
                      >
                        Extend Offer
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(selectedApplicant.id, 'Rejected')}
                        className="enterprise-btn-secondary border border-slate-200 text-slate-500 hover:bg-slate-100 py-1.5 px-2 rounded-lg text-[11px] font-semibold transition"
                      >
                        Mark Inactive
                      </button>
                    </div>
                  </div>

                  {/* Verified Actions */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => alert(`Verified transcript for ${selectedApplicant.studentName} downloaded.`)}
                      className="enterprise-btn-secondary w-full py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-500" />
                      <span>Download Verified Transcript</span>
                    </button>
                    <button
                      onClick={() => alert(`MoU initiation request sent to DTU Career Services for ${selectedApplicant.company}.`)}
                      className="enterprise-btn-secondary w-full py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                    >
                      <HandshakeIcon className="w-3.5 h-3.5 text-slate-500" />
                      <span>Initiate MoU with DTU</span>
                    </button>
                    <Link
                      href="/portfolio"
                      className="enterprise-btn-secondary w-full py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                      <span>View Verified Portfolio</span>
                    </Link>
                  </div>

                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: Active Postings */}
        {activeTab === 'postings' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Active Postings on Portal ({opportunities.length})</h2>
              <button
                onClick={() => setShowPostModal(true)}
                className="enterprise-btn-primary px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Post New Role</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {opportunities.map(opp => (
                <div key={opp.id} className="enterprise-card-interactive rounded-xl p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="status-pill status-pill-blue">{opp.type}</span>
                      <span className="text-slate-400 text-[11px]">{opp.duration}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">{opp.title}</h3>
                    <p className="text-xs text-slate-500">{opp.company} · {opp.location}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {opp.requiredSkills.slice(0, 4).map((s, idx) => (
                        <span key={idx} className="credential-tag text-[10px]">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-700">{opp.stipend}</span>
                    <span className="text-slate-400">Min CGPA: {opp.minimumCGPA}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Talent Discovery */}
        {activeTab === 'talent' && (
          <div className="space-y-5">
            <div className="enterprise-card rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="relative sm:col-span-2">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by skill (e.g., TensorFlow, Verilog, Python, CUDA)..."
                  value={talentSearchSkill}
                  onChange={e => setTalentSearchSkill(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-400 placeholder-slate-400"
                />
              </div>
              <select
                value={talentMinCgpa}
                onChange={e => setTalentMinCgpa(Number(e.target.value))}
                className="bg-white border border-slate-200 text-slate-700 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-400 cursor-pointer"
              >
                <option value={7.0}>Min CGPA: 7.0+</option>
                <option value={7.5}>Min CGPA: 7.5+</option>
                <option value={8.0}>Min CGPA: 8.0+</option>
                <option value={8.5}>Min CGPA: 8.5+</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTalent.map(cand => (
                <div key={cand.id} className="enterprise-card-interactive rounded-xl p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={cand.avatar}
                        alt={cand.name}
                        className="w-11 h-11 rounded-xl object-cover ring-1 ring-slate-200"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{cand.name}</h4>
                        <p className="text-[11px] text-slate-500 leading-tight">{cand.branch}</p>
                        <p className="text-[11px] text-slate-400 leading-tight">{cand.institution}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-center">
                      <div className="enterprise-row rounded-lg py-1.5">
                        <div className="font-bold text-slate-900">{cand.cgpa}</div>
                        <div className="text-slate-400">CGPA</div>
                      </div>
                      <div className="enterprise-row rounded-lg py-1.5">
                        <div className="font-bold text-slate-900">{cand.readinessScore}/100</div>
                        <div className="text-slate-400">Readiness</div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Verified Skills</div>
                      <div className="flex flex-wrap gap-1.5">
                        {cand.skills.filter(s => s.verified).slice(0, 5).map(s => (
                          <span key={s.id} className="credential-tag text-[10px] flex items-center gap-1">
                            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                            {s.name} ({s.level}%)
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Target: {cand.targetRole}</span>
                    <button
                      onClick={() => alert(`Invitation sent to ${cand.name} (${cand.email})`)}
                      className="enterprise-btn-primary px-3 py-1.5 rounded-lg text-[11px] font-semibold transition"
                    >
                      Invite to Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Learning Programs */}
        {activeTab === 'programs' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Company Training Programs & Workshops</h2>
                <p className="text-xs text-slate-500 mt-0.5">Published by industry partners to upskill campus students before recruitment.</p>
              </div>
              <button
                onClick={() => setShowProgramModal(true)}
                className="enterprise-btn-primary px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Publish Course</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {learningResources.map(prog => (
                <div key={prog.id} className="enterprise-card-interactive rounded-xl overflow-hidden flex flex-col justify-between">
                  <div>
                    <img src={prog.image} alt={prog.title} className="w-full h-36 object-cover" />
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-blue-700 text-[11px]">{prog.provider}</span>
                        <span className="status-pill status-pill-blue text-[10px]">{prog.type}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900">{prog.title}</h4>
                      <p className="text-[11px] text-slate-500">Skill: <strong className="text-slate-700">{prog.skillAddressed}</strong></p>
                    </div>
                  </div>
                  <div className="p-4 pt-0 flex items-center justify-between text-[11px] border-t border-slate-100 mt-2">
                    <span className="text-slate-400">{prog.duration} · {prog.level}</span>
                    <span className={`status-pill ${prog.isFree ? 'status-pill-green' : 'status-pill-blue'}`}>
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
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-enterprise-modal my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-700" />
                <h3 className="text-sm font-bold text-slate-900">Post Campus Opportunity</h3>
              </div>
              <button onClick={() => setShowPostModal(false)} className="text-slate-400 hover:text-slate-700 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostOpportunity} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Role Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ML Intern — AI Systems Group"
                    value={newOpp.title}
                    onChange={e => setNewOpp({ ...newOpp, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={newOpp.company}
                    onChange={e => setNewOpp({ ...newOpp, company: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-400 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Role Type</label>
                  <select
                    value={newOpp.type}
                    onChange={e => setNewOpp({ ...newOpp, type: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:border-blue-400 cursor-pointer"
                  >
                    <option value="Internship">Internship</option>
                    <option value="Full-time">Full-time Entry Level</option>
                    <option value="Remote Internship">Remote Internship</option>
                    <option value="Live Project">Live Project</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Stipend / CTC</label>
                  <input
                    type="text"
                    value={newOpp.stipend}
                    onChange={e => setNewOpp({ ...newOpp, stipend: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Min. CGPA</label>
                  <input
                    type="number"
                    step={0.1}
                    min={0}
                    max={10}
                    value={newOpp.minimumCGPA}
                    onChange={e => setNewOpp({ ...newOpp, minimumCGPA: parseFloat(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-400 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Required Skills (comma separated) *</label>
                <input
                  type="text"
                  required
                  placeholder="Python, TensorFlow, Git & Linux, SQL & Data Pipelines"
                  value={newOpp.requiredSkills}
                  onChange={e => setNewOpp({ ...newOpp, requiredSkills: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-400 transition"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Eligible Branches (comma separated)</label>
                <input
                  type="text"
                  value={newOpp.eligibleBranches}
                  onChange={e => setNewOpp({ ...newOpp, eligibleBranches: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-400 transition"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Role Description</label>
                <textarea
                  rows={3}
                  value={newOpp.description}
                  onChange={e => setNewOpp({ ...newOpp, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-400 resize-none transition"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setShowPostModal(false)} className="text-xs text-slate-500 hover:text-slate-800 px-3 py-2 transition">
                  Cancel
                </button>
                <button type="submit" className="enterprise-btn-primary px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish to Student Portal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PUBLISH PROGRAM MODAL */}
      {showProgramModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-enterprise-modal">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-700" />
                <h3 className="text-sm font-bold text-slate-900">Publish Industry Course / Workshop</h3>
              </div>
              <button onClick={() => setShowProgramModal(false)} className="text-slate-400 hover:text-slate-700 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePublishProgram} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Program Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TCS iON: Python for Engineering — 4 Week Bootcamp"
                  value={newProgram.title}
                  onChange={e => setNewProgram({ ...newProgram, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-400 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Skill Addressed *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Python & Data Engineering"
                    value={newProgram.skillAddressed}
                    onChange={e => setNewProgram({ ...newProgram, skillAddressed: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Duration</label>
                  <input
                    type="text"
                    value={newProgram.duration}
                    onChange={e => setNewProgram({ ...newProgram, duration: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-400 transition"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setShowProgramModal(false)} className="text-xs text-slate-500 hover:text-slate-800 px-3 py-2 transition">
                  Cancel
                </button>
                <button type="submit" className="enterprise-btn-primary px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>Publish Course</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AppLayout>
  );
}
