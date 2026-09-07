'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { useStudent } from '@/lib/context/StudentContext';
import { ReadinessGauge } from '@/components/dashboard/ReadinessGauge';
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
  Sparkles
} from 'lucide-react';

export default function StudentDashboard() {
  const { student, opportunities, applications, toggleSaveOpportunity, savedOpportunityIds } = useStudent();
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  // Group Technical vs Soft Skills
  const technicalSkills = student.skills.filter(s => s.category === 'Technical' || s.category === 'Digital Skills');
  const softSkills = student.skills.filter(s => s.category === 'Soft Skills' || s.category === 'Problem Solving');

  // Top 3 recommended opportunities
  const topRecommended = opportunities.slice(0, 3);

  return (
    <AppLayout>
      <div className="space-y-6">
        
        {/* Top Banner / Welcome Header */}
        <div className="saas-card rounded-xl p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Student Career Portal</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Welcome back, {student.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Target role: <span className="text-slate-200 font-medium">{student.targetRole}</span> • {student.institution}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/assessment"
              className="saas-btn-primary px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2"
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Take Skill Assessment</span>
            </Link>

            <Link
              href="/skill-gap"
              className="saas-btn-secondary px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2"
            >
              <Target className="w-3.5 h-3.5 text-slate-400" />
              <span>Skill Gap Matrix</span>
            </Link>
          </div>
        </div>

        {/* Grid Row 1: Readiness Score Gauge & Top Skill Gaps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 1. Readiness Score Gauge Card */}
          <ReadinessGauge score={student.readinessScore} targetRole={student.targetRole} />

          {/* 2. Top Skill Gaps Card */}
          <div className="lg:col-span-2 saas-card rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.06] mb-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-medium text-slate-300 uppercase tracking-wider">Priority Skill Gaps</h3>
                </div>
                <Link href="/skill-gap" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition">
                  <span>Full Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-2.5">
                {student.topGaps.map((gap) => (
                  <div key={gap.skillId} className="saas-row rounded-lg p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs sm:text-sm font-medium text-white">{gap.skillName}</span>
                        <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                          gap.priority === 'Critical' ? 'text-rose-400' : 'text-amber-400'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            gap.priority === 'Critical' ? 'bg-rose-400' : 'bg-amber-400'
                          }`} />
                          {gap.priority}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">{gap.recommendedAction}</p>
                    </div>

                    <div className="shrink-0 text-right sm:min-w-[110px]">
                      <div className="text-xs font-semibold text-slate-200 tabular-nums">
                        {gap.currentLevel}% <span className="text-slate-500 font-normal">/ {gap.requiredLevel}%</span>
                      </div>
                      <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1.5 ml-auto">
                        <div 
                          className={`h-full rounded-full ${gap.priority === 'Critical' ? 'bg-rose-500' : 'bg-amber-500'}`} 
                          style={{ width: `${(gap.currentLevel / gap.requiredLevel) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
              <span>Bridge these gaps to qualify for 4+ high-match roles</span>
              <Link href="/learning" className="text-indigo-400 hover:text-indigo-300 font-medium">
                Browse Courses →
              </Link>
            </div>
          </div>

        </div>

        {/* Grid Row 2: Technical Skills & Soft Skills Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Technical Skills Card */}
          <div className="saas-card rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <h3 className="text-xs font-medium text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-indigo-400" />
                <span>Technical Skills ({technicalSkills.length})</span>
              </h3>
              <Link href="/profile" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition">
                Manage
              </Link>
            </div>

            <div className="space-y-3 pt-1">
              {technicalSkills.slice(0, 5).map(skill => (
                <div key={skill.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-200 flex items-center gap-1.5">
                      {skill.name}
                      {skill.verified && <CheckCircle2 className="w-3 h-3 text-emerald-400 inline" />}
                    </span>
                    <span className="font-medium text-slate-400 tabular-nums">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 rounded-full transition-all duration-500" 
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills & Problem Solving Card */}
          <div className="saas-card rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <h3 className="text-xs font-medium text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-slate-400" />
                <span>Competencies & Soft Skills ({softSkills.length})</span>
              </h3>
              <span className="text-[11px] text-slate-500 font-normal">Verified by Assessment</span>
            </div>

            <div className="space-y-3 pt-1">
              {softSkills.slice(0, 5).map(skill => (
                <div key={skill.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-200">{skill.name}</span>
                    <span className="font-medium text-slate-400 tabular-nums">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-slate-400 rounded-full transition-all duration-500" 
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
              <h2 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-400" />
                <span>Recommended Opportunities</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Ranked by 60% skill match + 20% eligibility + 20% career interest</p>
            </div>
            
            <Link
              href="/opportunities"
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition flex items-center gap-1"
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

        {/* Grid Row 4: Recent Applications Summary */}
        <div className="saas-card rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <h3 className="text-xs font-medium text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Send className="w-3.5 h-3.5 text-slate-400" />
              <span>Recent Applications ({applications.length})</span>
            </h3>
            <Link href="/applications" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition">
              Track All →
            </Link>
          </div>

          <div className="divide-y divide-white/[0.05]">
            {applications.map(app => (
              <div key={app.id} className="py-3 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <span className="font-medium text-white text-sm block">{app.opportunityTitle}</span>
                  <span className="text-slate-400">{app.company} • Applied {app.appliedDate}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-400 tabular-nums font-medium">
                    {app.matchScoreAtApplication}% match
                  </span>
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-medium ${
                    app.status === 'Interview Scheduled' 
                      ? 'bg-purple-950/60 text-purple-300 border border-purple-800/60' 
                      : 'bg-blue-950/60 text-blue-300 border border-blue-800/60'
                  }`}>
                    {app.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Apply Modal Drawer */}
        <ApplyModal
          opportunity={selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
          onSuccess={() => setSelectedOpportunity(null)}
        />

      </div>
    </AppLayout>
  );
}
