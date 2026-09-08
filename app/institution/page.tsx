'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useStudent } from '@/lib/context/StudentContext';
import { 
  ShieldCheck, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target, 
  Award, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertTriangle, 
  Building, 
  GraduationCap, 
  Download,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Printer
} from 'lucide-react';

export default function InstitutionAnalyticsPage() {
  const { institutionData } = useStudent();
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [showReportModal, setShowReportModal] = useState(false);

  const departments = institutionData.departmentMetrics;
  const filteredDepts = selectedDept === 'All' 
    ? departments 
    : departments.filter(d => d.name === selectedDept);

  return (
    <AppLayout>
      <div className="space-y-6">
        
        {/* Institutional Header Banner */}
        <div className="bg-[#0f121d] border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-700/60 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ministry of Ayush Institutional Analytics Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Campus Employability & Skill Gap Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                {institutionData.institutionName} • {institutionData.affiliation}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setShowReportModal(true)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 transition flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Export Accreditation Report</span>
              </button>
            </div>
          </div>

          {/* High-Level Institutional KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/[0.06]">
            <div className="bg-[#141824] rounded-2xl p-4 border border-white/[0.06]">
              <div className="text-xs text-slate-400">Total Enrolled Students</div>
              <div className="text-2xl font-bold text-white mt-1 tabular-nums">
                {institutionData.totalStudentsEnrolled.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Across 4 core technical & clinical depts</div>
            </div>

            <div className="bg-[#141824] rounded-2xl p-4 border border-white/[0.06]">
              <div className="text-xs text-slate-400">Overall Readiness Index</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1 tabular-nums">
                {institutionData.overallReadinessIndex} <span className="text-xs text-slate-400 font-normal">/ 100</span>
              </div>
              <div className="text-[10px] text-emerald-400 mt-0.5 font-medium">+6.4% from previous batch</div>
            </div>

            <div className="bg-[#141824] rounded-2xl p-4 border border-white/[0.06]">
              <div className="text-xs text-slate-400">Active Internship Participation</div>
              <div className="text-2xl font-bold text-indigo-400 mt-1 tabular-nums">
                {institutionData.internshipParticipationRate}%
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">1,570 active industry sabbaticals</div>
            </div>

            <div className="bg-[#141824] rounded-2xl p-4 border border-white/[0.06]">
              <div className="text-xs text-slate-400">Placement Conversion Rate</div>
              <div className="text-2xl font-bold text-purple-400 mt-1 tabular-nums">
                {institutionData.placementRate}%
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">48 Industry hiring partners</div>
            </div>
          </div>
        </div>

        {/* SECTION 1: Cohort Placement Readiness Distribution */}
        <div className="bg-[#0f121d] border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
                <span>Student Cohort Readiness Distribution (0–100 Scale)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Evaluated through algorithmic skill assessments, aptitude testing, and verified digital portfolio credentials.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-400 bg-[#141824] px-3 py-1 rounded-xl border border-white/[0.06]">
              Total Cohort: {institutionData.totalStudentsEnrolled}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* High Readiness */}
            <div className="bg-[#141824] border border-emerald-500/30 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400">Tier 1 • High Readiness</span>
                <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Score ≥ 75
                </span>
              </div>
              <div className="text-3xl font-black text-white tabular-nums">
                {institutionData.readinessCohorts.high.count} <span className="text-xs text-slate-400 font-normal">Students</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${institutionData.readinessCohorts.high.percentage}%` }} />
              </div>
              <p className="text-[11px] text-slate-400">
                {institutionData.readinessCohorts.high.percentage}% of cohort. Fully qualified for immediate product & clinical placements.
              </p>
            </div>

            {/* Moderate Readiness */}
            <div className="bg-[#141824] border border-indigo-500/30 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400">Tier 2 • Moderate Readiness</span>
                <span className="bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Score 50–74
                </span>
              </div>
              <div className="text-3xl font-black text-white tabular-nums">
                {institutionData.readinessCohorts.moderate.count} <span className="text-xs text-slate-400 font-normal">Students</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${institutionData.readinessCohorts.moderate.percentage}%` }} />
              </div>
              <p className="text-[11px] text-slate-400">
                {institutionData.readinessCohorts.moderate.percentage}% of cohort. Enrolled in targeted industry learning bridge courses.
              </p>
            </div>

            {/* Needs Intervention */}
            <div className="bg-[#141824] border border-amber-500/30 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400">Tier 3 • Needs Intervention</span>
                <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Score &lt; 50
                </span>
              </div>
              <div className="text-3xl font-black text-white tabular-nums">
                {institutionData.readinessCohorts.needsIntervention.count} <span className="text-xs text-slate-400 font-normal">Students</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${institutionData.readinessCohorts.needsIntervention.percentage}%` }} />
              </div>
              <p className="text-[11px] text-slate-400">
                {institutionData.readinessCohorts.needsIntervention.percentage}% of cohort. Assigned to faculty mentors and foundational lab modules.
              </p>
            </div>

          </div>
        </div>

        {/* SECTION 2: Departmental Skill Gap Matrix */}
        <div className="bg-[#0f121d] border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-400" />
                <span>Departmental Skill Gap Matrix & Performance</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Granular visibility into department strengths, placement outcomes, and identified industry gaps.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Filter Department:</span>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="bg-[#141824] border border-white/[0.08] text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="All">All Departments</option>
                {departments.map(d => (
                  <option key={d.name} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDepts.map((dept, idx) => (
              <div key={idx} className="bg-[#141824] border border-white/[0.06] rounded-2xl p-5 space-y-4 hover:border-indigo-500/30 transition">
                <div className="flex items-start justify-between gap-2 border-b border-white/[0.06] pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">{dept.name}</h3>
                    <p className="text-[11px] text-slate-400">{dept.totalStudents} Enrolled • {dept.activeInternships} Active Internships</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Avg Readiness</span>
                    <span className="text-lg font-bold text-emerald-400 tabular-nums">{dept.avgReadinessScore}/100</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-[#0f121d] p-3 rounded-xl space-y-1">
                    <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Strengths</span>
                    </span>
                    <div className="text-[11px] text-slate-300 space-y-0.5">
                      {dept.topSkills.map((s, i) => (
                        <div key={i}>• {s}</div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#0f121d] p-3 rounded-xl space-y-1">
                    <span className="text-[11px] font-bold text-rose-400 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      <span>Critical Gaps</span>
                    </span>
                    <div className="text-[11px] text-slate-300 space-y-0.5">
                      {dept.criticalGaps.map((g, i) => (
                        <div key={i}>• {g}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/[0.04]">
                  <span>Placement Rate: <strong className="text-white">{dept.placementRate}%</strong></span>
                  <span className="text-indigo-400 text-[11px] font-medium">Curriculum Bridge Active →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: Industry Demand vs. Academic Curriculum Coverage */}
        <div className="bg-[#0f121d] border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-400" />
                <span>Industry Skill Demand vs. Academic Curriculum Coverage</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time alignment comparing 48+ hiring partner job specifications against institutional syllabi.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-indigo-500 rounded-sm inline-block" />
                Industry Hiring Demand
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-slate-600 rounded-sm inline-block" />
                Current Curriculum Depth
              </span>
            </div>
          </div>

          <div className="space-y-5">
            {institutionData.industrySkillTrends.map((trend, idx) => (
              <div key={idx} className="bg-[#141824] border border-white/[0.06] rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{trend.skill}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      trend.gapStatus === 'Critical Gap'
                        ? 'bg-rose-950 text-rose-300 border-rose-800'
                        : trend.gapStatus === 'Moderate Gap'
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    }`}>
                      {trend.gapStatus}
                    </span>
                  </div>

                  <div className="text-right font-medium text-xs">
                    <span className="text-indigo-400 font-bold">{trend.industryDemandPercent}% Demand</span>
                    <span className="text-slate-500"> vs {trend.curriculumCoveragePercent}% Covered</span>
                  </div>
                </div>

                {/* Comparative Double Progress Bar */}
                <div className="space-y-1">
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${trend.industryDemandPercent}%` }} />
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden opacity-70">
                    <div className="h-full bg-slate-400 rounded-full" style={{ width: `${trend.curriculumCoveragePercent}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ACCREDITATION & COMPLIANCE MODAL */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f121d] border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Official Institutional Compliance & NAAC/NIRF Summary</h3>
              </div>
              <button onClick={() => setShowReportModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="bg-[#141824] p-5 rounded-2xl space-y-3 text-xs border border-white/[0.06]">
              <div className="text-center pb-2 border-b border-white/[0.06]">
                <h4 className="text-sm font-bold text-white">{institutionData.institutionName}</h4>
                <p className="text-slate-400">{institutionData.affiliation} • Problem Statement 26044</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center py-2">
                <div className="bg-[#0f121d] p-2 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">Total Students</span>
                  <span className="font-bold text-white">{institutionData.totalStudentsEnrolled}</span>
                </div>
                <div className="bg-[#0f121d] p-2 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">Placement Rate</span>
                  <span className="font-bold text-emerald-400">{institutionData.placementRate}%</span>
                </div>
                <div className="bg-[#0f121d] p-2 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">Internship Rate</span>
                  <span className="font-bold text-indigo-400">{institutionData.internshipParticipationRate}%</span>
                </div>
                <div className="bg-[#0f121d] p-2 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">Faculty Sabbaticals</span>
                  <span className="font-bold text-purple-400">{institutionData.facultyParticipationCount}</span>
                </div>
              </div>

              <div className="space-y-1.5 text-[11px] text-slate-300">
                <p>• <strong>Accreditation Alignment:</strong> Satisfies NAAC Criterion 5.1 & 5.2 (Student Support & Progression) and NIRF Parameter 3 (Graduation Outcomes).</p>
                <p>• <strong>Skill Gap Remediations:</strong> 34% of students actively enrolled in Ministry of Ayush & Industry sponsored learning pathways for TensorFlow & EHR protocols.</p>
                <p>• <strong>Digital Portfolios:</strong> 100% of final-year students have verifiable digital skill portfolios with encrypted certification hashes.</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowReportModal(false)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official PDF Report</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </AppLayout>
  );
}
