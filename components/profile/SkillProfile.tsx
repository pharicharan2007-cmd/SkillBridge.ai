'use client';

import React from 'react';
import { useStudent } from '@/lib/context/StudentContext';
import { TargetRole } from '@/types'; // Assumed imported or available
import { CheckCircle2, ShieldCheck, Target, TrendingUp, AlertCircle } from 'lucide-react';

export const SkillProfile = () => {
  const { student } = useStudent();
  const { skills, readinessScore, targetRole } = student;

  return (
    <div className="space-y-6">
      {/* Readiness Score Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Readiness Score
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Weighted across your skills against {targetRole || 'industry standards'}
          </p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-black text-blue-600 dark:text-blue-400">
            {readinessScore ?? 0}<span className="text-lg text-slate-400">/100</span>
          </div>
        </div>
      </div>

      {/* Skills Breakdown */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-500" />
          Skill Verification Profile
        </h3>
        
        {skills && skills.length > 0 ? (
          <div className="space-y-4">
            {skills.map((skill, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-800 dark:text-slate-200">{skill.name}</span>
                    {skill.verified ? (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 px-2 py-0.5 rounded-full">
                        <ShieldCheck className="w-3 h-3" />
                        Cross-Validated
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 px-2 py-0.5 rounded-full">
                        <AlertCircle className="w-3 h-3" />
                        Unverified
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${skill.verified ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-slate-500">
            <p>No skills recorded yet. Complete the assessment to build your profile.</p>
          </div>
        )}
      </div>
    </div>
  );
};
