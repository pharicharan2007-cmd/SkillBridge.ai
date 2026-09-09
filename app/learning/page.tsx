'use client';

import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useStudent } from '@/lib/context/StudentContext';
import { MOCK_LEARNING_RESOURCES } from '@/lib/mockData/learningResources';
import { 
  BookOpenCheck, 
  Clock, 
  Star, 
  ExternalLink, 
} from 'lucide-react';

export default function LearningRecommendationsPage() {
  const { student } = useStudent();
  const resources = MOCK_LEARNING_RESOURCES;

  return (
    <AppLayout>
      <div className="space-y-6">
        
        {/* Page Header */}
        <div className="enterprise-card rounded-xl p-6 sm:p-7 space-y-2">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 px-3 py-1 rounded-full text-xs font-bold text-blue-700 dark:text-blue-300">
            <BookOpenCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>AI Learning Path</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Personalized Learning Recommendations</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Curated courses, hands-on projects, and certifications targeted specifically to close your identified skill gaps in <span className="font-semibold text-blue-600 dark:text-blue-400">{student.targetRole}</span>.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((res) => (
            <div key={res.id} className="enterprise-card rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-enterprise-hover group">
              
              <div>
                {/* Image Header */}
                <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={res.image}
                    alt={res.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-sm">
                    {res.type}
                  </div>
                  {res.isFree && (
                    <div className="absolute top-3 right-3 bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-sm">
                      NPTEL / Free Access
                    </div>
                  )}
                </div>

                {/* Body Content */}
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

              {/* Footer */}
              <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 mt-2 text-xs">
                <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  <span>{res.duration}</span>
                </div>

                <a
                  href={res.enrollUrl}
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
    </AppLayout>
  );
}
