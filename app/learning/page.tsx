'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useStudent } from '@/lib/context/StudentContext';
import { MOCK_LEARNING_RESOURCES } from '@/lib/mockData/learningResources';
import { 
  BookOpenCheck, 
  Clock, 
  Star, 
  ExternalLink,
  Layers,
  Sparkles,
  Target,
  Building2,
  CheckCircle2
} from 'lucide-react';

const CLUSTERS = [
  { label: 'All Disciplines', value: 'All' },
  { label: 'Electronics & VLSI', value: 'Electronics & Communication (VLSI & Embedded)' },
  { label: 'Mechanical & Robotics', value: 'Mechanical, Robotics & Automotive EV' },
  { label: 'Civil & Infrastructure', value: 'Civil & Smart Infrastructure' },
  { label: 'Electrical & Power', value: 'Electrical, Power Systems & Renewable Energy' },
  { label: 'Software & AI', value: 'Computer Science & Information Technology' },
];

import { computeStudentSkillGaps, resolveStudentCluster } from '@/lib/constants/benchmarks';

export default function LearningRecommendationsPage() {
  const { student } = useStudent();
  const currentCluster = resolveStudentCluster(student);
  const [selectedCluster, setSelectedCluster] = useState<string>(currentCluster);

  // Sync cluster if student profile or discipline updates
  React.useEffect(() => {
    const resolved = resolveStudentCluster(student);
    setSelectedCluster(resolved);
  }, [student.branch, student.engineeringCluster, student.targetRole]);

  // Compute student-specific skill gaps (fallback to real-time computation if empty)
  const activeGaps = (student.topGaps && student.topGaps.length > 0) 
    ? student.topGaps 
    : computeStudentSkillGaps(student);

  const studentGaps = activeGaps.map(g => g.skillName.toLowerCase());
  
  // Find courses that specifically bridge identified skill gaps in their discipline
  let targetedResources = MOCK_LEARNING_RESOURCES.filter(r => {
    const skillLower = r.skillAddressed.toLowerCase();
    const matchesGap = studentGaps.some(gap => skillLower.includes(gap) || gap.includes(skillLower));
    return matchesGap && (r.engineeringCluster === currentCluster || !r.engineeringCluster);
  });

  // Fallback: Ensure student has domain-specific recommendations for their chosen cluster
  if (targetedResources.length < 2) {
    const clusterMatches = MOCK_LEARNING_RESOURCES.filter(
      r => r.engineeringCluster === currentCluster && !targetedResources.some(t => t.id === r.id)
    );
    targetedResources = [...targetedResources, ...clusterMatches].slice(0, 4);
  }

  // Filter full catalog by discipline cluster
  const catalogResources = selectedCluster === 'All'
    ? MOCK_LEARNING_RESOURCES
    : MOCK_LEARNING_RESOURCES.filter(r => r.engineeringCluster === selectedCluster);

  return (
    <AppLayout>
      <div className="space-y-8">
        
        {/* Page Header */}
        <div className="enterprise-card rounded-xl p-6 sm:p-7 space-y-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 px-3 py-1 rounded-full text-xs font-bold text-blue-700 dark:text-blue-300">
              <BookOpenCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>AI Learning Path · NPTEL & Industry Mapped</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Personalized Learning Recommendations</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Curated courses, hands-on projects, and certifications targeted specifically to close your identified skill gaps in <span className="font-semibold text-blue-600 dark:text-blue-400">{student.targetRole}</span>.
            </p>
          </div>
        </div>

        {/* Section 1: Personalized Gap-Bridge Courses (SIH Submission Requirement) */}
        {targetedResources.length > 0 && (
          <div className="enterprise-card rounded-xl p-6 border-2 border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-r from-indigo-50/40 via-white to-purple-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    <Target className="w-3.5 h-3.5" />
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    Targeted to Close Your Critical Skill Gaps ({targetedResources.length})
                  </h2>
                  <span className="status-pill status-pill-purple text-[10px]">
                    AI Recommended
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Directly addresses priority gaps: <strong className="text-indigo-600 dark:text-indigo-400">{activeGaps.map(g => g.skillName).join(', ')}</strong> to elevate your readiness score to 90%+.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {targetedResources.map((res) => (
                <div key={`target-${res.id}`} className="enterprise-card rounded-xl overflow-hidden flex flex-col justify-between border-2 border-indigo-200 dark:border-indigo-900/50 shadow-sm hover:shadow-md transition group bg-white dark:bg-slate-900">
                  <div>
                    <div className="relative h-40 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <img src={res.image} alt={res.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                      <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-sm">
                        {res.type}
                      </div>
                      {res.publishedByIndustry && (
                        <div className="absolute top-3 right-3 bg-indigo-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-sm flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          <span>Industry Authored ({res.publishedByIndustry})</span>
                        </div>
                      )}
                      {!res.publishedByIndustry && res.isFree && (
                        <div className="absolute top-3 right-3 bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-sm">
                          NPTEL / Free Access
                        </div>
                      )}
                    </div>

                    <div className="p-4 space-y-2.5">
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">{res.provider}</span>
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{res.rating}</span>
                        </div>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                        {res.title}
                      </h3>

                      <div className="bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-900/60 rounded-lg p-2 text-xs flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          Bridges Critical Gap:
                        </span>
                        <span className="font-bold bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 px-2 py-0.5 rounded text-[10px]">
                          {res.skillAddressed}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 mt-2 text-xs">
                    <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                      <span>{res.duration}</span>
                    </div>

                    <a
                      href={res.enrollUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
                    >
                      <span>Enroll in Program</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: Full Catalog with Discipline Tabs */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Explore All Curated Industry Programs & Certifications
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Accredited NPTEL, Coursera, and Industry Partner courses mapped across engineering clusters.
              </p>
            </div>

            {/* Discipline Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {CLUSTERS.map(c => {
                const isActive = selectedCluster === c.value;
                return (
                  <button
                    key={c.value}
                    onClick={() => setSelectedCluster(c.value)}
                    className={`text-xs px-2.5 py-1 rounded-lg border font-medium whitespace-nowrap transition ${
                      isActive
                        ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {catalogResources.map((res) => (
              <div key={res.id} className="enterprise-card rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-enterprise-hover group">
                <div>
                  <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <img
                      src={res.image}
                      alt={res.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-sm">
                      {res.type}
                    </div>
                    {res.publishedByIndustry && (
                      <div className="absolute top-3 right-3 bg-indigo-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-sm flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        <span>{res.publishedByIndustry}</span>
                      </div>
                    )}
                    {!res.publishedByIndustry && res.isFree && (
                      <div className="absolute top-3 right-3 bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-sm">
                        NPTEL / Free Access
                      </div>
                    )}
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">{res.provider}</span>
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{res.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition line-clamp-2">
                      {res.title}
                    </h3>

                    <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 rounded-lg p-2.5 text-xs text-blue-900 dark:text-blue-200 flex items-center justify-between">
                      <span className="text-[11px] text-blue-700 dark:text-blue-300">Bridges Skill Gap:</span>
                      <span className="font-bold bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-2 py-0.5 rounded text-[10px]">
                        {res.skillAddressed}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 mt-2 text-xs">
                  <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    <span>{res.duration}</span>
                  </div>

                  <a
                    href={res.enrollUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="enterprise-btn-primary px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                  >
                    <span>Enroll Now</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
