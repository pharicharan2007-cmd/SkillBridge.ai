'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useStudent } from '@/lib/context/StudentContext';
import { StudentProfile } from '@/types';
import { 
  ShieldCheck, 
  BarChart3, 
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Users,
  Briefcase,
  Award,
  ArrowUpRight,
  Download,
  Building2,
  UserCheck,
  Eye,
  Clock,
  Check,
  X,
  FileText,
  Search,
  ExternalLink,
  GraduationCap,
  Sparkles
} from 'lucide-react';

const gapColors = {
  'Aligned': 'status-pill-green',
  'Moderate Gap': 'status-pill-amber',
  'Critical Gap': 'status-pill-red',
};

const naacStatusColors = {
  'Compliant': 'status-pill-green',
  'Action Required': 'status-pill-red',
  'In Progress': 'status-pill-amber',
};

export default function InstitutionPortal() {
  const { institutionData, allStudents, verifyStudentCredential } = useStudent();
  const [activeDept, setActiveDept] = useState('all');
  const [verificationTab, setVerificationTab] = useState<'pending' | 'verified' | 'all'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<StudentProfile | null>(null);
  const [justApprovedId, setJustApprovedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const data = institutionData as any;

  const filteredDepts = activeDept === 'all' 
    ? data.departmentMetrics 
    : data.departmentMetrics.filter((d: any) => d.name.includes(activeDept));

  // Verification Queue Filtering
  const pendingStudents = allStudents.filter(s => s.verificationStatus === 'Pending');
  const verifiedStudents = allStudents.filter(s => s.verificationStatus === 'Verified');

  const displayedStudents = allStudents.filter(s => {
    if (verificationTab === 'pending' && s.verificationStatus !== 'Pending') return false;
    if (verificationTab === 'verified' && s.verificationStatus !== 'Verified') return false;
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = s.name.toLowerCase().includes(q);
      const matchRoll = (s.enrollmentNumber || '').toLowerCase().includes(q);
      const matchBranch = s.branch.toLowerCase().includes(q);
      const matchEmail = s.email.toLowerCase().includes(q);
      return matchName || matchRoll || matchBranch || matchEmail;
    }
    return true;
  });

  const handleApprove = (studentId: string, studentName: string) => {
    verifyStudentCredential(studentId);
    setJustApprovedId(studentId);
    setToastMessage(`Institutional credential verified for ${studentName}! Campus badge issued.`);
    
    setTimeout(() => {
      setJustApprovedId(null);
    }, 2500);

    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 text-emerald-100 border border-emerald-700 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs font-semibold">{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="ml-2 text-emerald-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Header */}
        <div className="enterprise-card rounded-xl p-6 sm:p-7">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3" />
                <span>AICTE Compliance Dashboard · NAAC A+ Accredited</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{data.institutionName}</h1>
              <p className="text-xs text-slate-500">{data.department} · {data.affiliation}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-center enterprise-row rounded-lg px-4 py-2">
                <div className="text-lg font-bold text-slate-900">{data.naacGrade}</div>
                <div className="text-[10px] text-slate-500">NAAC Grade</div>
              </div>
              <div className="text-center enterprise-row rounded-lg px-4 py-2">
                <div className="text-lg font-bold text-slate-900">#{data.nirfRank}</div>
                <div className="text-[10px] text-slate-500">NIRF Rank</div>
              </div>
              <button className="enterprise-btn-secondary px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">Export Report</span>
              </button>
            </div>

          </div>
        </div>

        {/* Top KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Students Enrolled', value: data.totalStudentsEnrolled.toLocaleString(), icon: Users, color: 'text-blue-700', bg: 'bg-blue-50 border-blue-100' },
            { label: 'Placement Rate', value: `${data.placementRate}%`, icon: ArrowUpRight, color: data.placementRate >= 80 ? 'text-emerald-700' : 'text-amber-600', bg: 'bg-amber-50 border-amber-100', warn: data.placementRate < 80 },
            { label: 'Pending Verifications', value: `${pendingStudents.length} Students`, icon: UserCheck, color: pendingStudents.length > 0 ? 'text-amber-600' : 'text-emerald-700', bg: pendingStudents.length > 0 ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200' },
            { label: 'Partner Companies', value: data.partnerCompaniesCount, icon: Building2, color: 'text-blue-700', bg: 'bg-blue-50 border-blue-100' },
          ].map(kpi => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="enterprise-card rounded-xl p-4 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${kpi.bg}`}>
                  <Icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
                <div>
                  <div className={`text-lg font-bold tabular-nums ${kpi.color}`}>{kpi.value}</div>
                  <div className="text-[10px] text-slate-500">{kpi.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── TPO Credential Verification Queue (Interactive) ─── */}
        <div className="enterprise-card rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 shadow-sm">
          {/* Section Header */}
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 flex items-center justify-center">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight">
                  Student Credential Verification Queue (TPO Desk)
                </h2>
                {pendingStudents.length > 0 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                    {pendingStudents.length} Pending Review
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 pl-9">
                Validate engineering student enrollment numbers and uploaded College ID cards to grant official Campus Verified status.
              </p>
            </div>

            {/* Filter Tabs & Search */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search student or roll no..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 w-44 sm:w-52"
                />
              </div>

              <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
                <button
                  onClick={() => setVerificationTab('pending')}
                  className={`px-3 py-1 rounded-md font-medium transition ${
                    verificationTab === 'pending'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Pending ({pendingStudents.length})
                </button>
                <button
                  onClick={() => setVerificationTab('verified')}
                  className={`px-3 py-1 rounded-md font-medium transition ${
                    verificationTab === 'verified'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Verified ({verifiedStudents.length})
                </button>
                <button
                  onClick={() => setVerificationTab('all')}
                  className={`px-3 py-1 rounded-md font-medium transition ${
                    verificationTab === 'all'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  All ({allStudents.length})
                </button>
              </div>
            </div>
          </div>

          {/* Queue List / Table */}
          {displayedStudents.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {verificationTab === 'pending' ? 'All Student Credentials Reviewed!' : 'No Matching Records Found'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  {verificationTab === 'pending' 
                    ? 'No pending student credentials currently awaiting verification. Newly registered candidates will automatically populate here.'
                    : 'Try clearing your search query or switching between the filter tabs.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayedStudents.map((s) => {
                const isPending = s.verificationStatus === 'Pending';
                const isJustApproved = justApprovedId === s.id;

                return (
                  <div
                    key={s.id}
                    className="p-5 sm:p-6 transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-800/40 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    {/* Student Identity */}
                    <div className="flex items-start gap-3.5 sm:gap-4 min-w-0">
                      <img
                        src={s.avatar}
                        alt={s.name}
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700 shrink-0"
                      />
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">{s.name}</h3>
                          {isPending && !isJustApproved ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                              <Clock className="w-3 h-3" />
                              Pending Verification
                            </span>
                          ) : (
                            <span className="status-pill status-pill-green text-[10px] inline-flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3" />
                              Campus Verified
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                          <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300 font-semibold text-[11px]">
                            {s.enrollmentNumber || '2K23/ENR/001'}
                          </span>
                          <span>•</span>
                          <span className="text-slate-700 dark:text-slate-300">{s.branch}</span>
                          <span>•</span>
                          <span>Batch {s.graduationYear || 2026}</span>
                        </div>

                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {s.email} · {s.institution}
                        </p>
                      </div>
                    </div>

                    {/* Academic Standing & ID Card Proof */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 pl-14 lg:pl-0">
                      <div className="space-y-0.5 text-left sm:text-right">
                        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">CGPA</div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                          {s.cgpa} / 10.0
                        </div>
                      </div>

                      <div className="space-y-0.5 text-left sm:text-right">
                        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Readiness</div>
                        <div className="text-xs font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                          {s.readinessScore}/100
                        </div>
                      </div>

                      {/* View Uploaded Proof Trigger */}
                      <button
                        onClick={() => setSelectedStudentForModal(s)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 flex items-center gap-1.5 transition"
                      >
                        <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>Inspect ID Card</span>
                      </button>

                      {/* Approval Action */}
                      {isPending && !isJustApproved ? (
                        <button
                          onClick={() => handleApprove(s.id, s.name)}
                          className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex items-center gap-1.5 transition shrink-0 active:scale-95"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve Credential</span>
                        </button>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>Credential Approved</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ─── College ID Card Inspection Modal ─── */}
        {selectedStudentForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 animate-fadeIn">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-scaleUp">
              
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    College ID Verification Credential
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedStudentForModal(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* ID Card Graphic Canvas */}
              <div className="p-6 bg-slate-50 dark:bg-slate-950/60 flex justify-center">
                <div className="w-full max-w-md bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-xl p-5 shadow-xl border border-blue-800/40 space-y-4 relative overflow-hidden">
                  
                  {/* Subtle Background Badge */}
                  <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none">
                    <ShieldCheck className="w-48 h-48 text-white" />
                  </div>

                  {/* ID Card Top Header */}
                  <div className="border-b border-blue-500/20 pb-3 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-extrabold uppercase tracking-widest text-blue-300">
                        {selectedStudentForModal.institution || 'Delhi Technological University'}
                      </div>
                      <div className="text-[9px] text-slate-400 uppercase tracking-wider">
                        Official Engineering Student Identification
                      </div>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      ACCREDITED
                    </span>
                  </div>

                  {/* ID Card Body */}
                  <div className="flex items-start gap-4">
                    <img
                      src={selectedStudentForModal.avatar}
                      alt={selectedStudentForModal.name}
                      className="w-20 h-24 rounded-lg object-cover ring-2 ring-blue-400/50 shadow-md shrink-0 bg-slate-800"
                    />

                    <div className="space-y-1.5 min-w-0 flex-1">
                      <div>
                        <div className="text-xs text-slate-400 uppercase font-semibold text-[9px]">Student Name</div>
                        <div className="text-sm font-bold text-white tracking-tight">{selectedStudentForModal.name}</div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div>
                          <div className="text-slate-400 text-[9px] uppercase">Enrollment No</div>
                          <div className="font-mono font-bold text-blue-200">
                            {selectedStudentForModal.enrollmentNumber || '2K23/AI/089'}
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-400 text-[9px] uppercase">Passing Year</div>
                          <div className="font-bold text-slate-200">
                            {selectedStudentForModal.graduationYear || 2026}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-slate-400 text-[9px] uppercase">Program & Branch</div>
                        <div className="text-[11px] font-medium text-slate-200 truncate">
                          {selectedStudentForModal.degree} {selectedStudentForModal.branch}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ID Card Footer Barcode & Security Strip */}
                  <div className="border-t border-blue-500/20 pt-2.5 flex items-center justify-between text-[9px] text-slate-400">
                    <div className="font-mono text-blue-300 tracking-wider">
                      VERIFIED-STUDENT-HASH: #{selectedStudentForModal.id}-2026
                    </div>
                    <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Valid 2023-2027</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Status: <strong className={selectedStudentForModal.verificationStatus === 'Verified' ? 'text-emerald-600' : 'text-amber-600'}>
                    {selectedStudentForModal.verificationStatus || 'Pending'}
                  </strong>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedStudentForModal(null)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    Close
                  </button>
                  {selectedStudentForModal.verificationStatus === 'Pending' && (
                    <button
                      onClick={() => {
                        handleApprove(selectedStudentForModal.id, selectedStudentForModal.name);
                        setSelectedStudentForModal(null);
                      }}
                      className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex items-center gap-1.5 transition"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve & Verify</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* NAAC Rubric Table */}
        <div className="enterprise-card rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>NAAC Criterion Compliance Status</span>
            </h3>
            <span className="text-[11px] text-slate-400">Last updated: Aug 2026</span>
          </div>
          <div className="divide-y divide-slate-100">
            {(data.naacRubric || []).map((row: any, i: number) => (
              <div key={i} className="px-6 py-3.5 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 text-xs">
                <div className="sm:w-64 shrink-0">
                  <div className="font-semibold text-slate-800">{row.criterion}</div>
                  <div className="text-slate-500 font-normal">{row.subCriterion}</div>
                </div>
                <div className="flex-1 text-slate-500">{row.metric}</div>
                <span className={`status-pill ${naacStatusColors[row.status as keyof typeof naacStatusColors] || 'status-pill-slate'}`}>
                  {row.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Readiness Cohorts */}
        <div className="enterprise-card rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>Student Readiness Cohort Distribution ({data.totalStudentsEnrolled.toLocaleString()} students)</span>
            </h3>
          </div>

          <div className="space-y-4">
            {Object.values(data.readinessCohorts).map((cohort: any) => (
              <div key={cohort.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">{cohort.label}</span>
                  <span className="font-semibold text-slate-600 tabular-nums">{cohort.count.toLocaleString()} <span className="text-slate-400 font-normal">({cohort.percentage}%)</span></span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      cohort.label.includes('High') ? 'bg-blue-600' 
                      : cohort.label.includes('Moderate') ? 'bg-amber-400' 
                      : 'bg-red-400'
                    }`}
                    style={{ width: `${cohort.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Metrics */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span>Department Skill Intelligence</span>
            </h2>
            <div className="flex gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveDept('all')}
                className={`text-[11px] px-3 py-1 rounded-md font-semibold border transition ${activeDept === 'all' ? 'bg-blue-700 text-white border-blue-700' : 'enterprise-btn-secondary'}`}
              >
                All Departments
              </button>
              {data.departmentMetrics.map((d: any) => (
                <button
                  key={d.name}
                  onClick={() => setActiveDept(d.name.split(' ')[0])}
                  className={`text-[11px] px-3 py-1 rounded-md font-semibold border transition whitespace-nowrap ${activeDept === d.name.split(' ')[0] ? 'bg-blue-700 text-white border-blue-700' : 'enterprise-btn-secondary'}`}
                >
                  {d.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredDepts.map((dept: any) => (
              <div key={dept.name} className="enterprise-card rounded-xl p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{dept.name}</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">{dept.totalStudents} students enrolled</p>
                  </div>
                  <div className={`status-pill text-xs ${dept.placementRate >= 75 ? 'status-pill-green' : 'status-pill-amber'}`}>
                    {dept.placementRate}% placed
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Avg. Readiness Score</span>
                    <span className="font-bold text-slate-800 tabular-nums">{dept.avgReadinessScore} / 100</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div
                      className={`h-full rounded-full ${dept.avgReadinessScore >= 75 ? 'bg-blue-600' : dept.avgReadinessScore >= 65 ? 'bg-amber-400' : 'bg-red-400'}`}
                      style={{ width: `${dept.avgReadinessScore}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div className="space-y-1">
                    <div className="font-semibold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Top Skills</span>
                    </div>
                    {dept.topSkills.map((s: string) => (
                      <div key={s} className="credential-tag text-[10px]">{s}</div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    <div className="font-semibold text-red-600 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      <span>Critical Gaps</span>
                    </div>
                    {dept.criticalGaps.map((g: string) => (
                      <div key={g} className="status-pill status-pill-red text-[9px] px-1.5 py-0.5 rounded-md inline-block mb-1">{g}</div>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-3">
                  {dept.activeInternships} students in active internship/industry projects
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Skill Trends */}
        <div className="enterprise-card rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <span>Industry Demand vs. Curriculum Coverage — DTU 2026</span>
            </h3>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            {data.industrySkillTrends.map((trend: any) => (
              <div key={trend.skill} className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-slate-800">{trend.skill}</span>
                  <span className={`status-pill ${gapColors[trend.gapStatus as keyof typeof gapColors] || 'status-pill-slate'}`}>
                    {trend.gapStatus}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3 text-[10px] text-slate-500">
                    <span className="w-32 shrink-0">Industry demand</span>
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${trend.industryDemandPercent}%` }} />
                    </div>
                    <span className="w-8 text-right font-semibold tabular-nums">{trend.industryDemandPercent}%</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-slate-500">
                    <span className="w-32 shrink-0">Curriculum coverage</span>
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div className="h-full bg-slate-400 rounded-full" style={{ width: `${trend.curriculumCoveragePercent}%` }} />
                    </div>
                    <span className="w-8 text-right font-semibold tabular-nums">{trend.curriculumCoveragePercent}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
