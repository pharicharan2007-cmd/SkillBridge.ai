'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { useStudent } from '@/lib/context/StudentContext';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { ApplyModal } from '@/components/opportunities/ApplyModal';
import { Opportunity } from '@/types';
import { 
  BrainCircuit, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Briefcase, 
  Send, 
  Target, 
  GraduationCap, 
  Award, 
  FileCode2,
  AlertTriangle,
  Sparkles,
  BookOpen,
  Compass,
  Loader2,
  TrendingUp,
  Zap,
  Radio,
  Check
} from 'lucide-react';

import { useRouter } from 'next/navigation';
import { computeStudentSkillGaps } from '@/lib/constants/benchmarks';

export default function StudentDashboard() {
  const router = useRouter();
  const { currentRole, student, opportunities, applications, toggleSaveOpportunity, savedOpportunityIds } = useStudent();
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [aiAdvice, setAiAdvice] = useState<{ summary: string; critical_actions: string[]; source: string; target_role?: string } | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [alignedTrends, setAlignedTrends] = useState(false);

  // Dynamically compute active gaps if topGaps is empty
  const activeGaps = (student.topGaps && student.topGaps.length > 0)
    ? student.topGaps
    : computeStudentSkillGaps(student);

  const fetchAiAdvice = async () => {
    setLoadingAi(true);
    try {
      const res = await fetch('/api/ai/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_name: student.name,
          target_role: student.targetRole,
          current_skills: student.skills.map(s => s.name),
          missing_skills: activeGaps.map(g => g.skillName),
          readiness_score: student.readinessScore
        })
      });
      if (res.ok) {
        const data = await res.json();
        setAiAdvice(data);
      }
    } catch (e) {
      console.warn('AI advice fetch error', e);
    } finally {
      setLoadingAi(false);
    }
  };

  React.useEffect(() => {
    if (currentRole === 'faculty') router.replace('/faculty');
    else if (currentRole === 'recruiter') router.replace('/industry');
    else if (currentRole === 'institution') router.replace('/institution');
  }, [currentRole, router]);

  if (currentRole !== 'student') return null; // Prevent flicker before redirect

  const technicalSkills = student.skills.filter(s => s.category === 'Technical' || s.category === 'Digital Skills');
  const softSkills = student.skills.filter(s => s.category === 'Soft Skills' || s.category === 'Problem Solving');
  const topRecommended = opportunities.slice(0, 3);

  // Dynamic GATE paper code per branch
  const getGatePaper = (b: string) => {
    const lower = (b || '').toLowerCase();
    if (lower.includes('electronics') || lower.includes('vlsi') || lower.includes('ece')) return 'EC (Electronics) — Verified';
    if (lower.includes('mechanical') || lower.includes('robotics')) return 'ME (Mechanical) — Verified';
    if (lower.includes('civil') || lower.includes('structural')) return 'CE (Civil) — Verified';
    if (lower.includes('electrical') || lower.includes('power')) return 'EE (Electrical) — Verified';
    return 'CS/IT — Verified';
  };

  const topGap = activeGaps[0];

  // Dynamic readiness criteria breakdown
  const readinessCriteria = [
    { label: 'Academic CGPA', value: `${student.cgpa || 8.0} / 10 (${student.branch})`, met: (student.cgpa || 8.0) >= 7.5, icon: GraduationCap },
    { label: 'GATE 2026 Standing', value: getGatePaper(student.branch), met: true, icon: Award },
    { label: 'Verified Code / Lab Artifacts', value: `${student.skills.length > 0 ? student.skills.length : 4} Registered Competencies`, met: true, icon: FileCode2 },
    { label: 'Accredited Certifications', value: `${student.certifications?.length ? student.certifications.length + ' Certs' : 'NPTEL / AICTE Track'}`, met: true, icon: CheckCircle2 },
    { 
      label: topGap ? topGap.skillName : 'Core Technical Benchmark', 
      value: topGap ? `${topGap.currentLevel}% proficiency — ${topGap.priority} Gap` : 'Benchmarked to Industry Standards', 
      met: !topGap || topGap.gapPercentage === 0, 
      icon: Target 
    },
    { label: 'Institutional Standing', value: student.verificationStatus === 'Verified' ? 'TPO Endorsement Active' : 'TPO Verification In Progress', met: student.verificationStatus === 'Verified', icon: AlertTriangle },
  ];

  const metCount = readinessCriteria.filter(c => c.met).length;

  const statusColors: Record<string, string> = {
    'Submitted': 'status-pill status-pill-blue',
    'Under Review': 'status-pill status-pill-amber',
    'Interview Scheduled': 'status-pill status-pill-purple',
    'Shortlisted': 'status-pill status-pill-green',
    'Offered': 'status-pill status-pill-green',
    'Rejected': 'status-pill status-pill-red',
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        
        {/* Top Banner / Welcome Header */}
        <div className="enterprise-card rounded-xl p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Student Career Workspace</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Welcome back, {student.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Target role: <span className="text-slate-800 dark:text-slate-200 font-semibold">{student.targetRole}</span> · {student.institution}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/80 flex items-center gap-1.5 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                UID: {student.studentUid || 'DL-DEL-DTU-BT-CS-22-0148'}
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                Roll: <strong className="text-slate-700 dark:text-slate-200">{student.enrollmentNumber || '2K22/CO/148'}</strong>
              </span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>AICTE State-Anchored ID</span>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={fetchAiAdvice}
              disabled={loadingAi}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-sm transition"
            >
              {loadingAi ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Consulting AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Career Advisor</span>
                </>
              )}
            </button>

            <Link
              href="/assessment"
              className="enterprise-btn-primary px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2"
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Take Assessment</span>
            </Link>

            <Link
              href="/skill-gap"
              className="enterprise-btn-secondary px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2"
            >
              <Target className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>Gap Matrix</span>
            </Link>
          </div>
        </div>

        {/* AI Career Advice Response Box (Slide 3: Python + LLM API) */}
        {aiAdvice && (
          <div className="enterprise-card rounded-xl p-5 border border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-r from-indigo-50/50 via-white to-purple-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                  Personalized AI Career Roadmap ({aiAdvice.target_role})
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                ⚡ Powered by {aiAdvice.source}
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {aiAdvice.summary}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1">
              {aiAdvice.critical_actions.map((act, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 shrink-0">{i + 1}.</span>
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6-Step Employability Loop Workflow (Slide 4 & 5: Assess -> Gap -> Learn -> Match -> Apply -> Place) */}
        <div className="enterprise-card rounded-xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Unified Employability Loop (6-Step Career Pathway)
              </h2>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              Overall Readiness: <strong className="text-blue-600 dark:text-blue-400">{student.readinessScore}%</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            
            {/* Step 1: Assess */}
            <Link href="/assessment" className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition space-y-1 block">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-slate-400">01. ASSESS</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">AI Skill Benchmark</div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Completed ✓</div>
            </Link>

            {/* Step 2: Gap */}
            <Link href="/skill-gap" className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition space-y-1 block">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-slate-400">02. GAP</span>
                <Target className="w-3.5 h-3.5 text-blue-500" />
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">Skill-Gap Matrix</div>
              <div className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">{student.readinessScore}% Readiness</div>
            </Link>

            {/* Step 3: Learn */}
            <Link href="/learning" className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition space-y-1 block">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-slate-400">03. LEARN</span>
                <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">Targeted Courses</div>
              <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">2 Curated Modules</div>
            </Link>

            {/* Step 4: Match */}
            <Link href="/opportunities" className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition space-y-1 block">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-slate-400">04. MATCH</span>
                <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">Explainable AI</div>
              <div className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">{opportunities.length} Matches Found</div>
            </Link>

            {/* Step 5: Apply */}
            <Link href="/applications" className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition space-y-1 block">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-slate-400">05. APPLY</span>
                <Send className="w-3.5 h-3.5 text-blue-500" />
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">1-Click ATS Pipeline</div>
              <div className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">{applications.length} Submitted</div>
            </Link>

            {/* Step 6: Place */}
            <Link href="/portfolio" className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition space-y-1 block">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-slate-400">06. PLACE</span>
                <Briefcase className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">Digital Portfolio</div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Verified Credential</div>
            </Link>

          </div>
        </div>

        {/* Grid Row 1: Placement Readiness Breakdown & Priority Gaps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 1. Criteria-based Readiness Card */}
          <div className="enterprise-card rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Placement Readiness</h3>
                <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums mt-1">
                  {metCount}<span className="text-sm text-slate-400 dark:text-slate-500 font-normal"> / {readinessCriteria.length} criteria</span>
                </div>
              </div>
              <div className={`status-pill text-xs ${metCount >= 5 ? 'status-pill-green' : metCount >= 3 ? 'status-pill-amber' : 'status-pill-red'}`}>
                {metCount >= 5 ? 'Ready' : metCount >= 3 ? 'Developing' : 'Action Needed'}
              </div>
            </div>

            <div className="space-y-2.5">
              {readinessCriteria.map((c, idx) => {
                return (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className={`mt-0.5 shrink-0 ${c.met ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'}`}>
                      {c.met 
                        ? <CheckCircle2 className="w-3.5 h-3.5" />
                        : <AlertCircle className="w-3.5 h-3.5" />
                      }
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">{c.label}</div>
                      <div className={`text-[10px] ${c.met ? 'text-slate-500 dark:text-slate-400' : 'text-amber-700 dark:text-amber-400'}`}>{c.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link href="/profile" className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>Update Profile & Credentials</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 2. Priority Skill Gaps Card */}
          <div className="lg:col-span-2 enterprise-card rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Priority Skill Gaps</h3>
                </div>
                <Link href="/skill-gap" className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1 transition">
                  <span>Full Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-2.5">
                {activeGaps.slice(0, 3).map((gap) => (
                  <div key={gap.skillId} className="enterprise-row rounded-lg p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">{gap.skillName}</span>
                        <span className={`status-pill text-[10px] ${gap.priority === 'Critical' ? 'status-pill-red' : 'status-pill-amber'}`}>
                          {gap.priority}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{gap.recommendedAction}</p>
                    </div>

                    <div className="shrink-0 text-right sm:min-w-[110px]">
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-300 tabular-nums">
                        {gap.currentLevel}% <span className="text-slate-400 dark:text-slate-500 font-normal">/ {gap.requiredLevel}% req</span>
                      </div>
                      <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-1.5 ml-auto">
                        <div 
                          className={`h-full rounded-full ${gap.priority === 'Critical' ? 'bg-red-500' : 'bg-amber-500'}`} 
                          style={{ width: `${gap.requiredLevel > 0 ? (gap.currentLevel / gap.requiredLevel) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>
                {student.branch.includes('Electronics') || student.branch.includes('VLSI')
                  ? 'Bridge these gaps to unlock roles at Qualcomm, Texas Instruments, Intel'
                  : student.branch.includes('Mechanical')
                  ? 'Bridge these gaps to unlock roles at Ather Energy, GreyOrange, Tata Motors'
                  : student.branch.includes('Civil')
                  ? 'Bridge these gaps to unlock roles at L&T Construction, Bentley Systems'
                  : student.branch.includes('Electrical')
                  ? 'Bridge these gaps to unlock roles at Schneider Electric, Siemens, MathWorks'
                  : 'Bridge these gaps to unlock roles at ISRO, Google, Microsoft'}
              </span>
              <Link href="/learning" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                Browse Courses →
              </Link>
            </div>
          </div>

        </div>

        {/* Future Skill Radar (2026–2030) — Predictive Career Intelligence (PPT Slide 2) */}
        <div className="enterprise-card rounded-2xl p-6 sm:p-7 border border-indigo-200/80 dark:border-indigo-900/60 bg-gradient-to-br from-indigo-950/5 via-white to-sky-950/5 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                <Radio className="w-3 h-3 text-indigo-600 animate-pulse" />
                <span>Career Intelligence & Emerging Market Horizon</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                Future Skill Radar (2026–2030)
                <span className="text-xs font-semibold text-slate-500 font-mono">| India Tech Vision 2030</span>
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                Projected competency demand trajectories modeled from <strong>NASSCOM FutureSkills Prime</strong>, <strong>WEF Future of Jobs 2025</strong>, and <strong>AICTE Industry 4.0 Directives</strong>. Identifies pre-market skill emergence before curriculum updates happen.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <div className="text-xs font-semibold text-slate-500">2028 Cohort Preparedness</div>
                <div className="text-lg font-black text-indigo-600 dark:text-indigo-400">74% Proactive Alignment</div>
              </div>
              <button
                onClick={() => {
                  setAlignedTrends(!alignedTrends);
                  if (!alignedTrends) {
                    alert("Future Skill Radar synchronised! 2028 emerging industry competencies have been prioritized in your recommended learning modules.");
                  }
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                  alignedTrends 
                    ? 'bg-emerald-600 text-white shadow-emerald-500/20' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20'
                }`}
              >
                {alignedTrends ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Roadmap Aligned to 2028</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Align Roadmap to 2028 Trends</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 4 Emerging Clusters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  +340% 3-Yr CAGR
                </span>
                <span className="text-[10px] font-semibold text-slate-400">Tier 1 Critical</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Edge AI & TinyML Silicon</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Quantized ONNX/TFLite models on ARM Cortex-M & ESP32. Qualcomm, MediaTek, Bosch demand spike.
              </p>
              <div className="pt-2 flex items-center justify-between text-[11px] font-medium text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700">
                <span>Your Gap: <strong>Moderate</strong></span>
                <Link href="/learning" className="text-blue-600 hover:underline font-semibold">Prep Module →</Link>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800">
                  +280% 3-Yr CAGR
                </span>
                <span className="text-[10px] font-semibold text-slate-400">Govt Priority</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">RISC-V Custom ISA Design</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                India Semiconductor Mission (ISM) standard. Micro-architecture, Chisel HDL, and RTL verification.
              </p>
              <div className="pt-2 flex items-center justify-between text-[11px] font-medium text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700">
                <span>Your Gap: <strong>High</strong></span>
                <Link href="/learning" className="text-blue-600 hover:underline font-semibold">Prep Module →</Link>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 bg-sky-50 dark:bg-sky-950/40 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-800">
                  +420% 3-Yr CAGR
                </span>
                <span className="text-[10px] font-semibold text-slate-400">Enterprise AI</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Agentic AI & LLM Systems</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Autonomous multi-agent orchestration, tool routing, LangGraph, and deterministic evaluation gates.
              </p>
              <div className="pt-2 flex items-center justify-between text-[11px] font-medium text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700">
                <span>Your Gap: <strong>Low (Active)</strong></span>
                <Link href="/learning" className="text-blue-600 hover:underline font-semibold">Prep Module →</Link>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                  +310% 3-Yr CAGR
                </span>
                <span className="text-[10px] font-semibold text-slate-400">Clean Energy</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">EV Powertrain & BMS Control</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                AIS-156 safety compliance, Kalman filter SoC/SoH estimation, thermal runaway containment.
              </p>
              <div className="pt-2 flex items-center justify-between text-[11px] font-medium text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700">
                <span>Your Gap: <strong>Moderate</strong></span>
                <Link href="/learning" className="text-blue-600 hover:underline font-semibold">Prep Module →</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Row 2: Technical Skills & Competencies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Technical Skills Card */}
          <div className="enterprise-card rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Technical Skills ({technicalSkills.length})</span>
              </h3>
              <Link href="/profile" className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold transition">
                Manage
              </Link>
            </div>

            <div className="space-y-3 pt-1">
              {technicalSkills.slice(0, 5).map(skill => (
                <div key={skill.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      {skill.name}
                      {skill.verified && <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 inline" />}
                    </span>
                    <span className="font-semibold text-slate-500 dark:text-slate-400 tabular-nums">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${skill.level >= 70 ? 'bg-blue-600 dark:bg-blue-500' : skill.level >= 50 ? 'bg-amber-500' : 'bg-red-400'}`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Competencies & Soft Skills */}
          <div className="enterprise-card rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                <span>Competencies & Soft Skills ({softSkills.length})</span>
              </h3>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-normal">Verified by Assessment</span>
            </div>

            <div className="space-y-3 pt-1">
              {softSkills.slice(0, 5).map(skill => (
                <div key={skill.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
                    <span className="font-semibold text-slate-500 dark:text-slate-400 tabular-nums">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-slate-400 dark:bg-slate-500 rounded-full transition-all duration-500" 
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Grid Row 3: Recommended Opportunities */}
        <div className="space-y-3.5 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Recommended Opportunities</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Ranked by 60% skill coverage + 20% eligibility + 20% career alignment</p>
            </div>
            
            <Link
              href="/opportunities"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline transition flex items-center gap-1"
            >
              <span>View all ({opportunities.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topRecommended.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                onApply={(o) => setSelectedOpportunity(o)}
                isSaved={savedOpportunityIds.includes(opp.id)}
                onToggleSave={toggleSaveOpportunity}
                isApplied={applications.some(a => a.opportunityId === opp.id)}
              />
            ))}
          </div>
        </div>

        {/* Grid Row 4: Recent Applications */}
        <div className="enterprise-card rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Send className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              <span>Recent Applications ({applications.length})</span>
            </h3>
            <Link href="/applications" className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold transition">
              Track All →
            </Link>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {applications.map(app => (
              <div key={app.id} className="py-3 flex items-start justify-between text-xs gap-3">
                <div className="space-y-1 min-w-0">
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-sm block truncate">{app.opportunityTitle}</span>
                  <span className="text-slate-500 dark:text-slate-400">{app.company} · Applied {app.appliedDate}</span>
                  {app.notes && (
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 italic leading-relaxed mt-0.5 line-clamp-1">{app.notes}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={statusColors[app.status] || 'status-pill status-pill-slate'}>
                    {app.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Apply Modal */}
        <ApplyModal
          opportunity={selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
          onSuccess={() => setSelectedOpportunity(null)}
        />

      </div>
    </AppLayout>
  );
}
