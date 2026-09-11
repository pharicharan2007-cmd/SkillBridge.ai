'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { AssessmentFlow } from '@/components/assessment/AssessmentFlow';
import { BrainCircuit } from 'lucide-react';

export default function SkillAssessmentPage() {
  const [started, setStarted] = useState(false);

  return (
    <AppLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        
        {/* Top Header */}
        <div className="enterprise-card rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 px-3 py-1 rounded-full text-xs font-bold text-blue-700 dark:text-blue-300">
              <BrainCircuit className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>AI Assessment Engine · Engineering Accreditation</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Interactive Skill Assessment</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Multi-phase assessment covering Baseline Fundamentals, Role-Specific Skills, and Soft Skills.
            </p>
          </div>
        </div>

        {/* Content */}
        {!started ? (
          <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 text-center shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Ready to start your assessment?</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-lg mx-auto">
              This assessment consists of three phases. Your activity will be monitored for integrity. Please do not switch tabs during the test.
            </p>
            <button 
              onClick={() => setStarted(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Start Assessment
            </button>
          </div>
        ) : (
          <AssessmentFlow />
        )}

      </div>
    </AppLayout>
  );
}
