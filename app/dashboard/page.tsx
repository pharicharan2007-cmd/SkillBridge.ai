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
  AlertTriangle
} from 'lucide-react';

export default function StudentDashboard() {
  const { student, opportunities, applications, toggleSaveOpportunity, savedOpportunityIds } = useStudent();
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  const technicalSkills = student.skills.filter(s => s.category === 'Technical' || s.category === 'Digital Skills');
  const softSkills = student.skills.filter(s => s.category === 'Soft Skills' || s.category === 'Problem Solving');
  const topRecommended = opportunities.slice(0, 3);

  // Readiness criteria breakdown
  const readinessCriteria = [
    { label: 'Academic CGPA', value: `${student.cgpa} / 10 (${student.branch})`, met: student.cgpa >= 7.5, icon: GraduationCap },
    { label: 'GATE 2026 Qualified', value: 'CS/IT — Verified', met: true, icon: Award },
    { label: 'Verified Code Repos', value: '3 Public GitHub (Reviewed)', met: true, icon: FileCode2 },
    { label: 'NPTEL Certifications', value: '2 Certs — IIT Madras Verified', met: true, icon: CheckCircle2 },
    { label: 'TensorFlow / PyTorch', value: '42% proficiency — Gap Critical', met: false, icon: Target },
    { label: 'Faculty Endorsement', value: 'Dr. Raghunathan — Pending', met: false, icon: AlertTriangle },
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
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/assessment"
              className="enterprise-btn-primary px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2"
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Take Skill Assessment</span>
            </Link>

            <Link
              href="/skill-gap"
              className="enterprise-btn-secondary px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2"
            >
              <Target className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>Full Gap Matrix</span>
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
                {student.topGaps.map((gap) => (
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
                          style={{ width: `${(gap.currentLevel / gap.requiredLevel) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Bridge these gaps to unlock 3+ high-priority roles (ISRO, Intel, IIT Delhi)</span>
              <Link href="/learning" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                Browse Courses →
              </Link>
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
