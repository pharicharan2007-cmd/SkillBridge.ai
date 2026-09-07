'use client';

import React from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { useStudent } from '@/lib/context/StudentContext';
import { MOCK_LEARNING_RESOURCES } from '@/lib/mockData/learningResources';
import { 
  BookOpenCheck, 
  Sparkles, 
  Clock, 
  Star, 
  ExternalLink, 
  CheckCircle2, 
  Award, 
  BrainCircuit, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function LearningRecommendationsPage() {
  const { student } = useStudent();
  const resources = MOCK_LEARNING_RESOURCES;

  return (
    <AppLayout>
      
      {/* Page Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-2 shadow-xl">
        <div className="inline-flex items-center gap-2 bg-indigo-950 border border-indigo-800 px-3 py-1 rounded-full text-xs font-bold text-indigo-300">
          <BookOpenCheck className="w-3.5 h-3.5 text-indigo-400" />
          <span>AI Learning Path</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">Personalized Learning Recommendations</h1>
        <p className="text-xs text-slate-400">
          Curated courses, hands-on projects, and certifications targeted specifically to close your identified skill gaps in <span className="font-semibold text-indigo-300">{student.targetRole}</span>.
        </p>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res) => (
          <div key={res.id} className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 group">
            
            <div>
              {/* Image Header */}
              <div className="relative h-44 w-full bg-slate-800 overflow-hidden">
                <img
                  src={res.image}
                  alt={res.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md border border-slate-700 text-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                  {res.type}
                </div>
                {res.isFree && (
                  <div className="absolute top-3 right-3 bg-emerald-500/90 text-white px-2.5 py-1 rounded-lg text-[10px] font-extrabold shadow">
                    NPTEL / Free Access
                  </div>
                )}
              </div>

              {/* Body Content */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-indigo-400">{res.provider}</span>
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{res.rating}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition line-clamp-2">
                  {res.title}
                </h3>

                <div className="bg-indigo-950/60 border border-indigo-900/80 rounded-xl p-2.5 text-xs text-indigo-200 flex items-center justify-between">
                  <span className="text-[11px]">Bridges Skill Gap:</span>
                  <span className="font-bold text-white bg-indigo-900 border border-indigo-700 px-2 py-0.5 rounded-md text-[10px]">
                    {res.skillAddressed}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-2 text-xs">
              <div className="flex items-center gap-1 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{res.duration}</span>
              </div>

              <a
                href={res.enrollUrl}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 transition shadow-md shadow-indigo-600/30 hover:scale-105"
              >
                <span>Enroll Now</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        ))}
      </div>

    </AppLayout>
  );
}
