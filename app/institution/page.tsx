'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  Sparkles,
  Printer,
  ChevronRight,
  UserPlus,
  BookOpenCheck
} from 'lucide-react';

import { supabase } from '@/lib/supabase/client';

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
  const { 
    institutionData, 
    allStudents, 
    documents, 
    verificationLogs, 
    automationRate, 
    resolveExceptionDocument 
  } = useStudent();
  const [activeDept, setActiveDept] = useState('all');
  const [exceptionFilter, setExceptionFilter] = useState<'needs_review' | 'all_exceptions' | 'audit_log'>('needs_review');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocForModal, setSelectedDocForModal] = useState<any | null>(null);
  const [justResolvedId, setJustResolvedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDevMode, setIsDevMode] = useState<boolean>(true);

  // New Modals for Full Feature-Completeness
  const [showReportModal, setShowReportModal] = useState(false);
  const [showInterventionModal, setShowInterventionModal] = useState(false);
  const [selectedDeptForModal, setSelectedDeptForModal] = useState<any | null>(null);
  const [interventionSuccess, setInterventionSuccess] = useState<string | null>(null);

  // Faculty Verification & Provisioning State
  const [facultyList, setFacultyList] = useState<Array<{
    id: string;
    name: string;
    email: string;
    department: string;
    designation: string;
    empId: string;
    aicteFacultyId: string;
    status: 'Verified' | 'Pending Dean Approval' | 'Rejected';
    studentsMentored: number;
  }>>([
    {
      id: 'fac-1',
      name: 'Dr. Priya Raghunathan',
      email: 'priya.raghunathan@dtu.ac.in',
      department: 'Electrical & Power Systems (EED)',
      designation: 'Associate Professor',
      empId: 'DTU-EE-042',
      aicteFacultyId: 'FAC-1-9382104',
      status: 'Verified',
      studentsMentored: 18
    },
    {
      id: 'fac-2',
      name: 'Prof. Arindam Bose',
      email: 'arindam.bose@dtu.ac.in',
      department: 'Computer Science & AI',
      designation: 'Professor & HOD',
      empId: 'DTU-CS-004',
      aicteFacultyId: 'FAC-1-1029384',
      status: 'Verified',
      studentsMentored: 42
    },
    {
      id: 'fac-3',
      name: 'Dr. Ramesh Kumar',
      email: 'ramesh.kumar@dtu.ac.in',
      department: 'Electronics & Communication (ECE / VLSI)',
      designation: 'Assistant Professor',
      empId: 'DTU-EC-089',
      aicteFacultyId: 'FAC-1-4928105',
      status: 'Pending Dean Approval',
      studentsMentored: 0
    },
    {
      id: 'fac-4',
      name: 'Dr. Sunita Rao',
      email: 'sunita.rao@dtu.ac.in',
      department: 'Mechanical & Robotics Engineering',
      designation: 'Associate Professor',
      empId: 'DTU-ME-015',
      aicteFacultyId: 'FAC-1-7819203',
      status: 'Pending Dean Approval',
      studentsMentored: 0
    }
  ]);
  const [facultyFilter, setFacultyFilter] = useState<'all' | 'pending' | 'verified'>('all');
  const [showProvisionFacultyModal, setShowProvisionFacultyModal] = useState(false);
  const [newFacultyForm, setNewFacultyForm] = useState({
    name: '',
    email: '',
    department: 'Computer Science & Information Technology',
    designation: 'Assistant Professor',
    empId: '',
    aicteFacultyId: ''
  });

  // Sync any newly registered faculty from localStorage
  useEffect(() => {
    try {
      const savedFaculty = localStorage.getItem('skillbridge_faculty_profile');
      if (savedFaculty) {
        const parsed = JSON.parse(savedFaculty);
        setFacultyList(prev => {
          if (prev.some(f => f.email.toLowerCase() === (parsed.email || '').toLowerCase())) return prev;
          return [
            {
              id: `fac-${Date.now()}`,
              name: parsed.name || 'Dr. Faculty Member',
              email: parsed.email || 'faculty@dtu.ac.in',
              department: parsed.department || 'Computer Science & IT',
              designation: parsed.designation || 'Assistant Professor',
              empId: parsed.employeeId || 'DTU-FAC-01',
              aicteFacultyId: parsed.aicteFacultyId || 'FAC-1-NEW',
              status: 'Pending Dean Approval',
              studentsMentored: 0
            },
            ...prev
          ];
        });
      }
    } catch (e) {}
  }, []);

  const handleApproveFaculty = (id: string, name: string) => {
    setFacultyList(prev => prev.map(f => f.id === id ? { ...f, status: 'Verified' as const } : f));
    setToastMessage(`✓ ${name} verified & authorized for AICTE student skill endorsements.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRejectFaculty = (id: string, name: string) => {
    setFacultyList(prev => prev.map(f => f.id === id ? { ...f, status: 'Rejected' as const } : f));
    setToastMessage(`✗ ${name} credential rejected & returned.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleProvisionFacultySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFacultyForm.name || !newFacultyForm.email) return;

    const newRecord = {
      id: `fac-${Date.now()}`,
      name: newFacultyForm.name,
      email: newFacultyForm.email,
      department: newFacultyForm.department,
      designation: newFacultyForm.designation,
      empId: newFacultyForm.empId || `DTU-${Date.now().toString().slice(-4)}`,
      aicteFacultyId: newFacultyForm.aicteFacultyId || `FAC-1-${Date.now().toString().slice(-6)}`,
      status: 'Verified' as const,
      studentsMentored: 0
    };

    setFacultyList(prev => [newRecord, ...prev]);
    setShowProvisionFacultyModal(false);
    setNewFacultyForm({
      name: '',
      email: '',
      department: 'Computer Science & Information Technology',
      designation: 'Assistant Professor',
      empId: '',
      aicteFacultyId: ''
    });
    setToastMessage(`✓ Faculty member ${newRecord.name} provisioned with active AICTE verification.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const displayedFaculties = facultyList.filter(f => {
    if (facultyFilter === 'pending') return f.status === 'Pending Dean Approval';
    if (facultyFilter === 'verified') return f.status === 'Verified';
    return true;
  });

  // Live Analytics State from Supabase Views
  const [liveMetrics, setLiveMetrics] = useState<{ total_students: number; avg_readiness: number } | null>(null);
  const [liveCohorts, setLiveCohorts] = useState<any[]>([]);
  const [liveDepartments, setLiveDepartments] = useState<any[]>([]);
  const [liveDocuments, setLiveDocuments] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [{ data: metrics }, { data: cohorts }, { data: depts }, { data: docs }] = await Promise.all([
          supabase.from('view_institution_metrics').select('*').limit(1).single(),
          supabase.from('view_readiness_cohorts').select('*'),
          supabase.from('view_department_intelligence').select('*'),
          supabase.from('document_records').select('*').order('created_at', { ascending: false })
        ]);
        if (metrics) setLiveMetrics(metrics);
        if (cohorts) setLiveCohorts(cohorts);
        if (depts) setLiveDepartments(depts);
        if (docs && docs.length > 0) {
          setLiveDocuments(docs.map((d: any) => ({
            id: d.id,
            studentId: d.student_id,
            studentName: 'Aditya Verma',
            studentEnrollmentNumber: '2K22/CO/148',
            category: d.document_type || 'certifications',
            title: d.title || 'Official Academic Credential',
            filePath: d.file_path,
            verificationStatus: d.verification_status,
            verificationMethod: d.verification_method || 'api_check',
            flaggedReason: d.flagged_reason,
            submittedAt: d.created_at,
            verifiedAt: d.updated_at
          })));
        }
      } catch (err) {
        console.warn("Live analytics fetch note:", err);
      }
    };
    fetchAnalytics();
  }, []);

  const data = institutionData as any;

  // Seamlessly merge live departments with the rich department models
  const currentDepts = useMemo(() => {
    return data.departmentMetrics.map((dept: any) => {
      const liveMatch = liveDepartments.find((ld: any) =>
        ld.department_name?.toLowerCase().includes(dept.name.split(' ')[0].toLowerCase())
      );
      if (liveMatch) {
        return {
          ...dept,
          totalStudents: dept.totalStudents + (liveMatch.student_count || 0),
          avgReadinessScore: Math.round((dept.avgReadinessScore + (liveMatch.avg_readiness || dept.avgReadinessScore)) / 2)
        };
      }
      return dept;
    });
  }, [data.departmentMetrics, liveDepartments]);

  const filteredDepts = activeDept === 'all' 
    ? currentDepts 
    : currentDepts.filter((d: any) => d.name.toLowerCase().includes(activeDept.toLowerCase()));

  // Seamlessly merge live documents without destroying existing rich OCR cases
  const currentDocs = useMemo(() => {
    if (!liveDocuments || liveDocuments.length === 0) return documents;
    const existingIds = new Set(documents.map(d => d.id));
    const newFromDb = liveDocuments.filter(d => !existingIds.has(d.id));
    const updated = documents.map(d => {
      const match = liveDocuments.find(ld => ld.id === d.id);
      return match ? { ...d, verificationStatus: match.verificationStatus, flaggedReason: match.flaggedReason || d.flaggedReason } : d;
    });
    return [...newFromDb, ...updated];
  }, [liveDocuments, documents]);

  const exceptionDocs = currentDocs.filter(d => d.verificationStatus === 'needs_review');
  const autoResolvedDocs = currentDocs.filter(d => d.verificationStatus === 'verified' || d.verificationStatus === 'rejected');

  const displayedDocs = currentDocs.filter(d => {
    if (exceptionFilter === 'needs_review' && d.verificationStatus !== 'needs_review') return false;
    if (exceptionFilter === 'all_exceptions' && d.verificationStatus === 'pending') return false;
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (d.studentName || '').toLowerCase().includes(q);
      const matchTitle = (d.title || '').toLowerCase().includes(q);
      const matchIssuer = (d.issuer || '').toLowerCase().includes(q);
      const matchRoll = (d.studentEnrollmentNumber || '').toLowerCase().includes(q);
      return matchName || matchTitle || matchIssuer || matchRoll;
    }
    return true;
  });

  const handleManualResolve = async (docId: string, decision: 'approve' | 'reject', reviewNote?: string) => {
    // 1. Update in DB if we have live data
    try {
      await supabase.from('document_records').update({
        verification_status: decision === 'approve' ? 'verified' : 'rejected',
        flagged_reason: reviewNote || (decision === 'approve' ? 'Manually Verified by Administrator' : 'Manually Rejected by Administrator'),
        updated_at: new Date().toISOString()
      }).eq('id', docId);

      // Optimistic update
      setLiveDocuments(prev => prev ? prev.map(d => d.id === docId ? { 
        ...d, 
        verificationStatus: decision === 'approve' ? 'verified' : 'rejected',
        flaggedReason: reviewNote 
      } : d) : null);
    } catch (e) {
      console.warn("DB update sync note:", e);
    }

    // 2. Update local Context (mock fallback)
    resolveExceptionDocument(docId, decision, reviewNote || 'Resolved via Institution Admin Exception Desk');
    setJustResolvedId(docId);
    setToastMessage(`Exception ${decision === 'approve' ? 'Approved & Authenticated' : 'Rejected & Returned to Student'} successfully.`);
    
    setTimeout(() => {
      setJustResolvedId(null);
    }, 2500);

    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleExportCSV = () => {
    const headers = "Department,Students Enrolled,Avg Readiness,Placement Rate %,Active Internships\n";
    const rows = currentDepts.map((d: any) => `"${d.name}",${d.totalStudents},${d.avgReadinessScore},${d.placementRate},${d.activeInternships}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DTU_Institutional_Readiness_Report_2026.csv`;
    a.click();
    setToastMessage("Exported Institutional Readiness Report as CSV for Ministry Submission.");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleIntervene = (actionType: string) => {
    if (actionType === 'mentor') {
      setInterventionSuccess("Assigned 14 Faculty Mentors (supervised by Dr. Arindam Bose, CSE) to the Tier 3 cohort.");
    } else if (actionType === 'bridge') {
      setInterventionSuccess("AICTE Bridge Remedial Curriculum (Python & Foundational Data Structures) deployed to 630 students.");
    } else if (actionType === 'dossier') {
      const blob = new Blob(["Student_ID,Name,Branch,ReadinessScore,Action_Required\nstd-104,Rahul Kumar,Electrical,48,Assigned Faculty Mentor\nstd-109,Ankit Verma,Civil,44,Enrolled in Remedial Python\nstd-115,Pooja Rani,Mechanical,46,Enrolled in CAD/FEA Bridge\n"], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'At_Risk_Tier3_Student_Intervention_Dossier.csv';
      a.click();
      setInterventionSuccess("Downloaded At-Risk Student Intervention Dossier (CSV).");
    }
    setTimeout(() => {
      setInterventionSuccess(null);
    }, 4000);
  };

  const cohortDistribution = [
    {
      label: 'Tier 1 — High Readiness (Score ≥ 75)',
      count: 1890 + (liveCohorts.find(c => c.tier?.includes('Tier 1'))?.student_count || 0),
      percentage: 45,
      color: 'bg-blue-600',
      description: 'Ready for Top-Tier & Global Product Engineering Roles',
      actionable: false
    },
    {
      label: 'Tier 2 — Moderate Readiness (Score 50–74)',
      count: 1680 + (liveCohorts.find(c => c.tier?.includes('Tier 2'))?.student_count || 0),
      percentage: 40,
      color: 'bg-amber-400',
      description: 'Core Competency Established; Targeted Bridge Electives Needed',
      actionable: false
    },
    {
      label: 'Tier 3 — Critical Skill Gap (< 50)',
      count: 630 + (liveCohorts.find(c => c.tier?.includes('Tier 3'))?.student_count || 0),
      percentage: 15,
      color: 'bg-red-500',
      description: 'Immediate Remedial Intervention & Faculty Mentorship Required',
      actionable: true
    }
  ];

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
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>AICTE Compliance Dashboard · NAAC A+ Accredited</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{data.institutionName}</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">{data.department} · {data.affiliation}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <div className="text-center enterprise-row rounded-lg px-4 py-2">
                <div className="text-lg font-bold text-slate-900 dark:text-white">{data.naacGrade}</div>
                <div className="text-[10px] text-slate-500">NAAC Grade</div>
              </div>
              <div className="text-center enterprise-row rounded-lg px-4 py-2">
                <div className="text-lg font-bold text-slate-900 dark:text-white">#{data.nirfRank}</div>
                <div className="text-[10px] text-slate-500">NIRF Rank</div>
              </div>
              <button 
                onClick={() => setShowReportModal(true)}
                className="enterprise-btn-secondary px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-blue-600" />
                <span>Export Accreditation Report</span>
              </button>
            </div>

          </div>
        </div>

        {/* Top KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { 
              label: 'Smart Automation Rate', 
              value: `${automationRate}%`, 
              icon: Sparkles, 
              color: 'text-indigo-700 dark:text-indigo-400', 
              bg: 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800',
              subtext: `${100 - automationRate}% Exception Review Rate`
            },
            { 
              label: 'Students Enrolled', 
              value: (liveMetrics?.total_students ? 4200 + liveMetrics.total_students : data.totalStudentsEnrolled).toLocaleString(), 
              icon: Users, 
              color: 'text-blue-700 dark:text-blue-400', 
              bg: 'bg-blue-50 dark:bg-blue-950/60 border-blue-100 dark:border-blue-900',
              subtext: 'Campus Master Record'
            },
            { 
              label: 'Exception Review Queue', 
              value: `${exceptionDocs.length} Cases`, 
              icon: AlertTriangle, 
              color: exceptionDocs.length > 0 ? 'text-amber-600' : 'text-emerald-700', 
              bg: exceptionDocs.length > 0 ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800' : 'bg-emerald-50 border-emerald-200',
              subtext: 'Requires Human Resolution'
            },
            { 
              label: 'Placement Rate', 
              value: `${data.placementRate}%`, 
              icon: ArrowUpRight, 
              color: data.placementRate >= 80 ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-600', 
              bg: 'bg-amber-50 dark:bg-amber-950/60 border-amber-100 dark:border-amber-900', 
              subtext: 'AICTE Target ≥ 80%'
            },
          ].map(kpi => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="enterprise-card rounded-xl p-4 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${kpi.bg} shrink-0`}>
                  <Icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
                <div className="min-w-0">
                  <div className={`text-lg font-bold tabular-nums ${kpi.color}`}>{kpi.value}</div>
                  <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate">{kpi.label}</div>
                  <div className="text-[9px] text-slate-400 truncate">{kpi.subtext}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Exception Review Queue UI (Smart Automation Fallback) ─── */}
        <div className="enterprise-card rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 shadow-sm">
          {/* Section Header */}
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight">
                  Exception Review Queue (Smart Automation Fallback)
                </h2>
                {exceptionDocs.length > 0 ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                    {exceptionDocs.length} Needs Review
                  </span>
                ) : (
                  <span className="status-pill status-pill-green text-[10px]">
                    Zero Backlog
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 pl-9">
                Automated engines processed <strong className="text-emerald-600 dark:text-emerald-400">{automationRate}%</strong> of credentials (API check, DB cross-match, platform-sourced). Only flagged discrepancies reach this exception queue.
              </p>
            </div>

            {/* Filter Tabs & Search */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter student or credential..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 w-44 sm:w-52"
                />
              </div>

              <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
                <button
                  onClick={() => setExceptionFilter('needs_review')}
                  className={`px-3 py-1 rounded-md font-medium transition ${
                    exceptionFilter === 'needs_review'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Exceptions ({exceptionDocs.length})
                </button>
                <button
                  onClick={() => setExceptionFilter('all_exceptions')}
                  className={`px-3 py-1 rounded-md font-medium transition ${
                    exceptionFilter === 'all_exceptions'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  All Submissions ({currentDocs.length})
                </button>
                <button
                  onClick={() => setExceptionFilter('audit_log')}
                  className={`px-3 py-1 rounded-md font-medium transition ${
                    exceptionFilter === 'audit_log'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Audit Log ({verificationLogs.length})
                </button>
              </div>

              {/* Demo Mode Toggle */}
              <button
                onClick={() => setIsDevMode(!isDevMode)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition ${
                  isDevMode 
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/40 font-bold shadow-xs' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'
                }`}
                title="Toggle Demo-Day Stage Safety Net Override Controls"
              >
                {isDevMode ? '⚡ DEV MODE: ON' : 'DEV MODE: OFF'}
              </button>
            </div>
          </div>

          {/* Queue List / Table or Audit Log View */}
          {exceptionFilter === 'audit_log' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 font-bold text-slate-600 dark:text-slate-300">
                  <tr>
                    <th className="p-4">Timestamp</th>
                    <th className="p-4">Verifier / Engine</th>
                    <th className="p-4">Credential & Student</th>
                    <th className="p-4">Action</th>
                    <th className="p-4">Audit Note & Hash</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {verificationLogs.map((log) => {
                    const status = log.newStatus || (log as any).action || 'verified';
                    const actor = log.actor || (log as any).verifiedBy || 'Automated Engine';
                    return (
                      <tr key={log.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30">
                        <td className="p-4 font-mono text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</td>
                        <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">{actor}</td>
                        <td className="p-4">
                          <div className="font-semibold text-slate-900 dark:text-white">Document #{log.documentId}</div>
                          <div className="text-[11px] text-slate-400">Student #{log.studentId}</div>
                        </td>
                        <td className="p-4">
                          <span className={`status-pill ${status === 'verified' ? 'status-pill-green' : 'status-pill-red'}`}>
                            {status.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-4 text-slate-600 dark:text-slate-400 max-w-xs truncate">
                          {log.reason}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : displayedDocs.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {exceptionFilter === 'needs_review' ? 'No Discrepancies Pending! Zero Backlog.' : 'No Matching Records Found'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  {exceptionFilter === 'needs_review' 
                    ? 'All student credentials were automatically authenticated via API or DB Cross-Match. Only genuine anomalies appear here.'
                    : 'Try adjusting your search query or switching filters.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayedDocs.map((doc) => {
                const isNeedsReview = doc.verificationStatus === 'needs_review';
                const isJustResolved = justResolvedId === doc.id;

                return (
                  <div
                    key={doc.id}
                    className="p-5 sm:p-6 transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-800/40 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    {/* Credential & Student Identity */}
                    <div className="flex items-start gap-3.5 sm:gap-4 min-w-0">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">{doc.title}</h3>
                          {isNeedsReview && !isJustResolved ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                              <AlertTriangle className="w-3 h-3 text-amber-500" />
                              Exception Flagged
                            </span>
                          ) : doc.verificationStatus === 'verified' ? (
                            <span className="status-pill status-pill-green text-[10px] inline-flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3" />
                              Auto-Verified ({doc.verificationMethod})
                            </span>
                          ) : (
                            <span className="status-pill status-pill-red text-[10px] inline-flex items-center gap-1">
                              <X className="w-3 h-3" />
                              Auto-Rejected ({doc.verificationMethod})
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{doc.studentName}</span>
                          <span>•</span>
                          <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300 font-semibold text-[11px]">
                            {doc.studentEnrollmentNumber || '2K22/CO/148'}
                          </span>
                          <span>•</span>
                          <span className="text-slate-600 dark:text-slate-400 uppercase font-medium text-[10px]">{doc.category}</span>
                          <span>•</span>
                          <span>{doc.issuer || 'Institutional Record'}</span>
                        </div>

                        {/* Flagged Anomaly Reason */}
                        {doc.flaggedReason && (
                          <div className="p-2 rounded-lg bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 text-[11px] text-amber-900 dark:text-amber-300 flex items-start gap-1.5 mt-1">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                            <span><strong>Anomaly Detected:</strong> {doc.flaggedReason}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Inspection & Exception Actions */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 pl-14 lg:pl-0 shrink-0">
                      {/* Inspect Evidence Button */}
                      <button
                        onClick={() => setSelectedDocForModal(doc)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 flex items-center gap-1.5 transition"
                      >
                        <Eye className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>Inspect Discrepancy</span>
                      </button>

                      {/* Exception Override Controls */}
                      {isNeedsReview && !isJustResolved ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleManualResolve(doc.id, 'approve')}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex items-center gap-1 transition shrink-0 active:scale-95"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve Exception</span>
                          </button>
                          <button
                            onClick={() => handleManualResolve(doc.id, 'reject')}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center gap-1 transition shrink-0"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        </div>
                      ) : isJustResolved ? (
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Status Synced</span>
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-slate-400">
                          Resolved
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ─── Institutional Faculty Directory & Credential Verification Console ─── */}
        <div className="enterprise-card rounded-xl overflow-hidden space-y-0">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 px-2 py-0.5 rounded-full uppercase tracking-wider">
                <BookOpenCheck className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                <span>AICTE Institutional Faculty Governance</span>
              </div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Faculty Directory & Teaching Credential Authority</span>
                <span className="text-[10px] bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded font-mono font-semibold">
                  {facultyList.filter(f => f.status === 'Pending Dean Approval').length} Pending Dean Approval
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Authenticate professors against departmental payroll & AICTE Faculty IDs before enabling student skill endorsement rights.
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Filter Tabs */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs">
                <button
                  onClick={() => setFacultyFilter('all')}
                  className={`px-3 py-1 rounded-md font-medium transition ${facultyFilter === 'all' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold' : 'text-slate-600 dark:text-slate-400'}`}
                >
                  All ({facultyList.length})
                </button>
                <button
                  onClick={() => setFacultyFilter('pending')}
                  className={`px-3 py-1 rounded-md font-medium transition ${facultyFilter === 'pending' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold' : 'text-slate-600 dark:text-slate-400'}`}
                >
                  Pending ({facultyList.filter(f => f.status === 'Pending Dean Approval').length})
                </button>
                <button
                  onClick={() => setFacultyFilter('verified')}
                  className={`px-3 py-1 rounded-md font-medium transition ${facultyFilter === 'verified' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold' : 'text-slate-600 dark:text-slate-400'}`}
                >
                  Verified ({facultyList.filter(f => f.status === 'Verified').length})
                </button>
              </div>

              {/* Provision Faculty Member Button */}
              <button
                onClick={() => setShowProvisionFacultyModal(true)}
                className="enterprise-btn-primary px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>+ Provision Faculty</span>
              </button>
            </div>
          </div>

          {/* Faculty List */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {displayedFaculties.map((f) => (
              <div key={f.id} className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm shrink-0">
                    {f.name.replace('Dr. ', '').replace('Prof. ', '').charAt(0)}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{f.name}</span>
                      <span className="text-[10px] text-slate-500 font-medium">{f.designation}</span>
                      <span className={`status-pill text-[10px] ${f.status === 'Verified' ? 'status-pill-green' : f.status === 'Rejected' ? 'status-pill-red' : 'status-pill-amber'}`}>
                        {f.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2 flex-wrap">
                      <span>{f.department}</span>
                      <span>•</span>
                      <span className="font-mono">{f.email}</span>
                      <span>•</span>
                      <span className="font-mono">Emp ID: {f.empId}</span>
                    </div>
                    <div className="pt-0.5 flex items-center gap-2 text-[10px] font-mono">
                      <span className="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-900 px-2 py-0.5 rounded font-semibold">
                        AICTE PID: {f.aicteFacultyId}
                      </span>
                      {f.status === 'Verified' && (
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-sans font-medium">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Authorized for Student Skill Endorsements</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
                  {f.status === 'Pending Dean Approval' ? (
                    <>
                      <button
                        onClick={() => handleApproveFaculty(f.id, f.name)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex items-center gap-1 transition active:scale-95"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve Faculty</span>
                      </button>
                      <button
                        onClick={() => handleRejectFaculty(f.id, f.name)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center gap-1 transition"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </>
                  ) : f.status === 'Verified' ? (
                    <button
                      onClick={() => handleRejectFaculty(f.id, f.name)}
                      className="px-2.5 py-1 text-[11px] font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition"
                    >
                      Revoke Rights
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApproveFaculty(f.id, f.name)}
                      className="px-2.5 py-1 text-[11px] font-medium text-blue-600 hover:underline transition"
                    >
                      Re-Approve
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Evidence Inspection Modal ─── */}
        {selectedDocForModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl space-y-0">
              
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Audit Inspection: {selectedDocForModal.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedDocForModal(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Side-by-side Evidence Analysis */}
              <div className="p-6 space-y-4 text-xs">
                
                <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Automated Engine Flag:</span>
                  </div>
                  <p className="leading-relaxed">{selectedDocForModal.flaggedReason || 'No anomalies recorded. Verified by algorithm.'}</p>
                </div>

                {/* Data Cross-Match Comparison Table */}
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 font-bold text-slate-600 dark:text-slate-300">
                      <tr>
                        <th className="p-3">Field</th>
                        <th className="p-3">Uploaded / Claimed Value</th>
                        <th className="p-3">Institutional Source of Truth</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      <tr>
                        <td className="p-3 font-medium text-slate-500">Candidate Name</td>
                        <td className="p-3 font-semibold text-slate-900 dark:text-white">{selectedDocForModal.studentName}</td>
                        <td className="p-3 font-semibold text-slate-900 dark:text-white">{selectedDocForModal.studentName}</td>
                        <td className="p-3 text-emerald-600 font-bold">MATCH ✓</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-slate-500">Roll / Enrollment</td>
                        <td className="p-3 font-mono text-slate-800 dark:text-slate-200">{selectedDocForModal.studentEnrollmentNumber || '2K22/CO/148'}</td>
                        <td className="p-3 font-mono text-slate-800 dark:text-slate-200">{selectedDocForModal.studentEnrollmentNumber || '2K22/CO/148'}</td>
                        <td className="p-3 text-emerald-600 font-bold">MATCH ✓</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-slate-500">Academic Standing / CGPA</td>
                        <td className="p-3 font-bold text-amber-600">{selectedDocForModal.extractedData?.uploadedCgpa || selectedDocForModal.studentCgpa || '9.40'}</td>
                        <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{selectedDocForModal.extractedData?.dbCgpa || selectedDocForModal.studentCgpa || '8.65'}</td>
                        <td className="p-3 font-bold text-amber-600">
                          {selectedDocForModal.extractedData?.uploadedCgpa ? 'MISMATCH ⚠' : 'MATCH ✓'}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-slate-500">Issuer Source</td>
                        <td className="p-3 text-slate-700 dark:text-slate-300">{selectedDocForModal.issuer || 'External'}</td>
                        <td className="p-3 text-slate-700 dark:text-slate-300">DTU Registry</td>
                        <td className="p-3 font-medium text-slate-500">
                          {selectedDocForModal.extractedData?.isOffPlatform ? 'OFF-PLATFORM' : 'VERIFIED'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Document Path in Supabase: <code className="font-mono text-blue-600 dark:text-blue-400">{selectedDocForModal.filePath}</code>
                </div>

              </div>

              {/* Modal Actions */}
              <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 flex items-center justify-between">
                <button
                  onClick={() => setSelectedDocForModal(null)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Dismiss
                </button>

                {selectedDocForModal.verificationStatus === 'needs_review' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        handleManualResolve(selectedDocForModal.id, 'reject');
                        setSelectedDocForModal(null);
                      }}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                    >
                      Reject Submission
                    </button>
                    <button
                      onClick={() => {
                        handleManualResolve(selectedDocForModal.id, 'approve');
                        setSelectedDocForModal(null);
                      }}
                      className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex items-center gap-1.5 transition"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve Exception Override</span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Readiness Cohorts */}
        <div className="enterprise-card rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 flex-wrap gap-2">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>Student Readiness Cohort Distribution ({data.totalStudentsEnrolled.toLocaleString()} students)</span>
            </h3>
            <button 
              onClick={() => setShowInterventionModal(true)}
              className="text-xs font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 transition shadow-xs"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
              <span>Intervene with At-Risk Cohort (630 Students) →</span>
            </button>
          </div>

          <div className="space-y-4">
            {cohortDistribution.map((cohort: any) => (
              <div key={cohort.label} className="space-y-1.5 p-3 rounded-lg hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{cohort.label}</span>
                    {cohort.actionable && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
                        Critical Intervention
                      </span>
                    )}
                  </div>
                  <span className="font-semibold text-slate-600 dark:text-slate-400 tabular-nums">
                    {cohort.count.toLocaleString()} <span className="text-slate-400 font-normal">({cohort.percentage}%)</span>
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${cohort.color}`}
                    style={{ width: `${cohort.percentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>{cohort.description}</span>
                  {cohort.actionable && (
                    <button 
                      onClick={() => setShowInterventionModal(true)}
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      Deploy Mentors →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Metrics */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span>Department Skill Intelligence & Placement Analytics</span>
            </h2>
            <div className="flex gap-2 overflow-x-auto max-w-full pb-1">
              <button
                onClick={() => setActiveDept('all')}
                className={`text-[11px] px-3 py-1 rounded-md font-semibold border transition ${activeDept === 'all' ? 'bg-blue-700 text-white border-blue-700' : 'enterprise-btn-secondary'}`}
              >
                All Departments (6)
              </button>
              {currentDepts.map((d: any) => (
                <button
                  key={d.name}
                  onClick={() => setActiveDept(d.name.split(' ')[0])}
                  className={`text-[11px] px-3 py-1 rounded-md font-semibold border transition whitespace-nowrap ${activeDept.toLowerCase() === d.name.split(' ')[0].toLowerCase() ? 'bg-blue-700 text-white border-blue-700' : 'enterprise-btn-secondary'}`}
                >
                  {d.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredDepts.map((dept: any) => (
              <div 
                key={dept.name} 
                onClick={() => setSelectedDeptForModal(dept)}
                className="enterprise-card rounded-xl p-5 space-y-4 hover:border-blue-300 dark:hover:border-blue-700 transition cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition flex items-center gap-1.5">
                      <span>{dept.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition" />
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">{dept.totalStudents} students enrolled</p>
                  </div>
                  <div className={`status-pill text-xs ${dept.placementRate >= 75 ? 'status-pill-green' : 'status-pill-amber'}`}>
                    {dept.placementRate}% placed
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                    <span>Avg. Readiness Score</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums">{dept.avgReadinessScore} / 100</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
                    <div
                      className={`h-full rounded-full ${dept.avgReadinessScore >= 75 ? 'bg-blue-600' : dept.avgReadinessScore >= 65 ? 'bg-amber-400' : 'bg-red-400'}`}
                      style={{ width: `${dept.avgReadinessScore}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div className="space-y-1">
                    <div className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Top Skills</span>
                    </div>
                    {dept.topSkills.map((s: string) => (
                      <div key={s} className="credential-tag text-[10px]">{s}</div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    <div className="font-semibold text-red-600 dark:text-red-400 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      <span>Critical Gaps</span>
                    </div>
                    {dept.criticalGaps.map((g: string) => (
                      <div key={g} className="status-pill status-pill-red text-[9px] px-1.5 py-0.5 rounded-md inline-block mb-1">{g}</div>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3 flex items-center justify-between">
                  <span>{dept.activeInternships} students in active internship/industry projects</span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-[10px]">Inspect Dept →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Skill Trends */}
        <div className="enterprise-card rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <span>Industry Demand vs. Curriculum Coverage — DTU 2026</span>
            </h3>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            {data.industrySkillTrends.map((trend: any) => (
              <div key={trend.skill} className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{trend.skill}</span>
                  <span className={`status-pill ${gapColors[trend.gapStatus as keyof typeof gapColors] || 'status-pill-slate'}`}>
                    {trend.gapStatus}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3 text-[10px] text-slate-500 dark:text-slate-400">
                    <span className="w-32 shrink-0">Industry demand</span>
                    <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${trend.industryDemandPercent}%` }} />
                    </div>
                    <span className="w-8 text-right font-semibold tabular-nums">{trend.industryDemandPercent}%</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-slate-500 dark:text-slate-400">
                    <span className="w-32 shrink-0">Curriculum coverage</span>
                    <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
                      <div className="h-full bg-slate-400 rounded-full" style={{ width: `${trend.curriculumCoveragePercent}%` }} />
                    </div>
                    <span className="w-8 text-right font-semibold tabular-nums">{trend.curriculumCoveragePercent}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NAAC Accreditation & Institutional Rubric Section */}
        <div className="enterprise-card rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>NAAC & NIRF Institutional Compliance Rubric (Criterion 1 to 6)</span>
            </h3>
            <span className="status-pill status-pill-green text-[10px]">NAAC A+ Institutional Standing</span>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {data.naacRubric.map((rubric: any, idx: number) => (
              <div key={idx} className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{rubric.criterion}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{rubric.subCriterion}</div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-300 font-semibold">{rubric.metric}</span>
                  <span className={`status-pill ${naacStatusColors[rubric.status as keyof typeof naacStatusColors] || 'status-pill-slate'}`}>
                    {rubric.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AICTE Institutional Faculty Verification & Governance Directory */}
        <div className="enterprise-card rounded-xl overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="status-pill status-pill-green text-[10px] uppercase tracking-wider font-semibold">
                  Dean of Academics & AISHE Console
                </span>
                <span className="text-[11px] text-slate-500">· AISHE Code: C-32865</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>AICTE Institutional Faculty Verification & Directory</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Authorize faculty members with institutional emails and AICTE Faculty IDs. Only approved faculty can endorse student skills and evaluate industrial training.
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
                <button
                  onClick={() => setFacultyFilter('all')}
                  className={`px-3 py-1 rounded-md transition font-medium ${facultyFilter === 'all' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
                >
                  All ({facultyList.length})
                </button>
                <button
                  onClick={() => setFacultyFilter('pending')}
                  className={`px-3 py-1 rounded-md transition font-medium flex items-center gap-1.5 ${facultyFilter === 'pending' ? 'bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
                >
                  <span>Pending</span>
                  <span className="px-1.5 py-0.2 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 rounded-full text-[10px] font-bold">
                    {facultyList.filter(f => f.status === 'Pending Dean Approval').length}
                  </span>
                </button>
                <button
                  onClick={() => setFacultyFilter('verified')}
                  className={`px-3 py-1 rounded-md transition font-medium ${facultyFilter === 'verified' ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
                >
                  Verified ({facultyList.filter(f => f.status === 'Verified').length})
                </button>
              </div>

              <button
                onClick={() => setShowProvisionFacultyModal(true)}
                className="enterprise-btn px-3.5 py-1.5 text-xs flex items-center gap-1.5 shrink-0"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>+ Provision Faculty</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-semibold border-b border-slate-100 dark:border-slate-800 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-5">Faculty Member</th>
                  <th className="py-3 px-4">Department & Designation</th>
                  <th className="py-3 px-4">AICTE Faculty ID</th>
                  <th className="py-3 px-4">Status & Endorsement</th>
                  <th className="py-3 px-5 text-right">Dean Verification Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {displayedFaculties.map((fac) => (
                  <tr key={fac.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{fac.name}</span>
                        {fac.status === 'Verified' && (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" title="Dean Verified" />
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                        {fac.email} · Emp ID: <span className="font-semibold text-slate-700 dark:text-slate-300">{fac.empId}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-slate-800 dark:text-slate-200 font-medium">{fac.department}</div>
                      <div className="text-[11px] text-slate-500">{fac.designation}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                        {fac.aicteFacultyId}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {fac.status === 'Verified' ? (
                        <div className="space-y-1">
                          <span className="status-pill status-pill-green text-[10px] inline-flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            <span>Verified & Active</span>
                          </span>
                          <div className="text-[10px] text-slate-500">
                            {fac.studentsMentored} students mentored
                          </div>
                        </div>
                      ) : fac.status === 'Pending Dean Approval' ? (
                        <div className="space-y-1">
                          <span className="status-pill status-pill-amber text-[10px] inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>Pending Dean Approval</span>
                          </span>
                          <div className="text-[10px] text-slate-400">Institutional email awaiting signoff</div>
                        </div>
                      ) : (
                        <span className="status-pill status-pill-red text-[10px] inline-flex items-center gap-1">
                          <X className="w-3 h-3" />
                          <span>Access Rejected</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      {fac.status === 'Pending Dean Approval' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleApproveFaculty(fac.id, fac.name)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm transition"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Verify & Authorize</span>
                          </button>
                          <button
                            onClick={() => handleRejectFaculty(fac.id, fac.name)}
                            className="bg-slate-100 hover:bg-red-50 hover:text-red-700 dark:bg-slate-800 dark:hover:bg-red-950/40 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-lg text-xs font-semibold transition border border-slate-200 dark:border-slate-700"
                          >
                            <span>Reject</span>
                          </button>
                        </div>
                      ) : fac.status === 'Verified' ? (
                        <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>AICTE Endorsement Rights Active</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => handleApproveFaculty(fac.id, fac.name)}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Re-authorize
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* ─── OFFICIAL ACCREDITATION & COMPLIANCE MODAL (PDF/PRINT/CSV) ─── */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Official Institutional Compliance & NAAC/NIRF Summary</h3>
              </div>
              <button onClick={() => setShowReportModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl space-y-4 text-xs border border-slate-200 dark:border-slate-700">
              <div className="text-center pb-2 border-b border-slate-200 dark:border-slate-700">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{data.institutionName}</h4>
                <p className="text-slate-500">{data.affiliation} • Problem Statement 26044</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center py-1">
                <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Total Students</span>
                  <span className="font-bold text-slate-900 dark:text-white text-base">4,200</span>
                </div>
                <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Placement Rate</span>
                  <span className="font-bold text-emerald-600 text-base">{data.placementRate}%</span>
                </div>
                <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Internship Rate</span>
                  <span className="font-bold text-indigo-600 text-base">{data.internshipParticipationRate}%</span>
                </div>
                <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Faculty Sabbaticals</span>
                  <span className="font-bold text-purple-600 text-base">{data.facultyParticipationCount}</span>
                </div>
              </div>

              <div className="space-y-2 text-[11px] text-slate-600 dark:text-slate-300">
                <p>• <strong>Accreditation Alignment:</strong> Satisfies NAAC Criterion 5.1 & 5.2 (Student Support & Progression) and NIRF Parameter 3 (Graduation Outcomes).</p>
                <p>• <strong>Skill Gap Remediations:</strong> 83% of final-year students actively mapped to verifiable industrial skill rubrics with cryptographic credentials.</p>
                <p>• <strong>Smart Automation Fallback:</strong> 91% of credentials validated without manual human labor; human TPO exception desk resolves edge cases.</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={handleExportCSV}
                className="enterprise-btn-secondary px-4 py-2 text-xs flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Ministry CSV</span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowReportModal(false)}
                  className="px-4 py-2 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => window.print()}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Official PDF Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TIER 3 COHORT INTERVENTION MODAL ─── */}
      {showInterventionModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Tier 3 Remedial Intervention Desk</h3>
              </div>
              <button onClick={() => setShowInterventionModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>630 students (15% of cohort)</strong> scored below 50 in their multi-phase assessments. Take immediate institutional intervention to prevent placement ineligibility.
            </p>

            {interventionSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{interventionSuccess}</span>
              </div>
            )}

            <div className="space-y-2.5 pt-1">
              <button
                onClick={() => handleIntervene('mentor')}
                className="w-full text-left p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 bg-slate-50/50 dark:bg-slate-800/40 transition flex items-center justify-between group"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-blue-600" />
                    <span>Auto-Assign Faculty Mentor Committee</span>
                  </div>
                  <div className="text-[11px] text-slate-500">Pairs 630 students with Dr. Arindam Bose & departmental mentors.</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition shrink-0" />
              </button>

              <button
                onClick={() => handleIntervene('bridge')}
                className="w-full text-left p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 bg-slate-50/50 dark:bg-slate-800/40 transition flex items-center justify-between group"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 flex items-center gap-2">
                    <BookOpenCheck className="w-4 h-4 text-emerald-600" />
                    <span>Deploy AICTE Remedial Bridge Electives</span>
                  </div>
                  <div className="text-[11px] text-slate-500">Auto-enrolls students in Python & System fundamentals micro-courses.</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition shrink-0" />
              </button>

              <button
                onClick={() => handleIntervene('dossier')}
                className="w-full text-left p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 bg-slate-50/50 dark:bg-slate-800/40 transition flex items-center justify-between group"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-purple-600 flex items-center gap-2">
                    <Download className="w-4 h-4 text-purple-600" />
                    <span>Download At-Risk Student Dossier (CSV)</span>
                  </div>
                  <div className="text-[11px] text-slate-500">Exports student roll numbers, CGPA, and missing skills for HOD review.</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition shrink-0" />
              </button>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowInterventionModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── DEPARTMENT DRILL-DOWN MODAL ─── */}
      {selectedDeptForModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{selectedDeptForModal.name}</h3>
                <p className="text-xs text-slate-500">Department Deep-Dive & Curriculum Alignment</p>
              </div>
              <button onClick={() => setSelectedDeptForModal(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] text-slate-400">Enrolled</div>
                <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{selectedDeptForModal.totalStudents}</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] text-slate-400">Avg Readiness</div>
                <div className="text-base font-bold text-blue-600 mt-0.5">{selectedDeptForModal.avgReadinessScore}/100</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] text-slate-400">Placement %</div>
                <div className="text-base font-bold text-emerald-600 mt-0.5">{selectedDeptForModal.placementRate}%</div>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1.5">Top Core Strengths</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDeptForModal.topSkills.map((s: string) => (
                    <span key={s} className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-[10px] font-semibold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-red-50/60 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl">
                <span className="font-bold text-red-800 dark:text-red-300 block mb-1.5">Critical Syllabus Gaps vs Hiring Partners</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDeptForModal.criticalGaps.map((g: string) => (
                    <span key={g} className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 text-[10px] font-semibold">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <span className="text-[11px] text-slate-500">{selectedDeptForModal.activeInternships} active internships in progress</span>
              <button
                onClick={() => setSelectedDeptForModal(null)}
                className="enterprise-btn px-4 py-2 text-xs"
              >
                Close Drill-down
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── PROVISION VERIFIED FACULTY MODAL ─── */}
      {showProvisionFacultyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-600" />
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Provision Verified Faculty Member</h3>
                  <p className="text-xs text-slate-500">Issue official campus credentials with AICTE Faculty ID</p>
                </div>
              </div>
              <button onClick={() => setShowProvisionFacultyModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProvisionFacultySubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300">Faculty Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajeshwari Sengupta"
                    value={newFacultyForm.name}
                    onChange={e => setNewFacultyForm(prev => ({ ...prev, name: e.target.value }))}
                    className="enterprise-input w-full text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300">Institutional Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. rajeshwari@dtu.ac.in"
                    value={newFacultyForm.email}
                    onChange={e => setNewFacultyForm(prev => ({ ...prev, email: e.target.value }))}
                    className="enterprise-input w-full text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300">Department</label>
                  <select
                    value={newFacultyForm.department}
                    onChange={e => setNewFacultyForm(prev => ({ ...prev, department: e.target.value }))}
                    className="enterprise-input w-full text-xs"
                  >
                    <option value="Computer Science & Information Technology">Computer Science & Information Technology</option>
                    <option value="Electronics & Communication (ECE / VLSI)">Electronics & Communication (ECE / VLSI)</option>
                    <option value="Electrical & Power Systems (EED)">Electrical & Power Systems (EED)</option>
                    <option value="Mechanical & Robotics Engineering">Mechanical & Robotics Engineering</option>
                    <option value="Civil & Infrastructure Engineering">Civil & Infrastructure Engineering</option>
                    <option value="Biotechnology & Bioinformatics">Biotechnology & Bioinformatics</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300">Academic Designation</label>
                  <select
                    value={newFacultyForm.designation}
                    onChange={e => setNewFacultyForm(prev => ({ ...prev, designation: e.target.value }))}
                    className="enterprise-input w-full text-xs"
                  >
                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Professor & HOD">Professor & HOD</option>
                    <option value="Dean of Academics">Dean of Academics</option>
                    <option value="Adjunct / Visiting Professor">Adjunct / Visiting Professor</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300">Campus Employee ID</label>
                  <input
                    type="text"
                    placeholder="e.g. DTU-CS-094"
                    value={newFacultyForm.empId}
                    onChange={e => setNewFacultyForm(prev => ({ ...prev, empId: e.target.value }))}
                    className="enterprise-input w-full text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300">AICTE Faculty ID (FAC ID)</label>
                  <input
                    type="text"
                    placeholder="e.g. FAC-1-9876543"
                    value={newFacultyForm.aicteFacultyId}
                    onChange={e => setNewFacultyForm(prev => ({ ...prev, aicteFacultyId: e.target.value }))}
                    className="enterprise-input w-full text-xs"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-[11px] text-blue-800 dark:text-blue-300 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  Admin Provisioning bypasses manual Dean queue. The faculty member will instantly receive active status and cryptographic endorsement privileges for student credit evaluations.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowProvisionFacultyModal(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Issue & Verify Faculty Account</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AppLayout>
  );
}
