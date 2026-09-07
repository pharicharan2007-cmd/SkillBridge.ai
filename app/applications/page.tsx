'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { useStudent } from '@/lib/context/StudentContext';
import { 
  Send, 
  CheckCircle2, 
  Clock, 
  Building, 
  Sparkles, 
  Calendar, 
  FileText, 
  ChevronRight, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function ApplicationTrackingPage() {
  const { applications } = useStudent();
  const [selectedAppId, setSelectedAppId] = useState<string>(applications[0]?.id || '');

  const selectedApp = applications.find(a => a.id === selectedAppId) || applications[0];

  const statusColors: Record<string, string> = {
    'Submitted': 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    'Under Review': 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    'Interview Scheduled': 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    'Shortlisted': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    'Offered': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
  };

  return (
    <AppLayout>
      
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-2 shadow-xl">
        <div className="inline-flex items-center gap-2 bg-indigo-950 border border-indigo-800 px-3 py-1 rounded-full text-xs font-bold text-indigo-300">
          <Send className="w-3.5 h-3.5 text-indigo-400" />
          <span>Placement & Application Tracker</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">Application Tracking & Interview Status</h1>
        <p className="text-xs text-slate-400">Track real-time progress for all your submitted internships and job applications.</p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
          <Send className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-xl font-bold text-white">No active applications yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Browse matched opportunities on the portal and click "Apply Now" to start tracking your recruitment status!
          </p>
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 hover:scale-105 transition"
          >
            <span>Explore Internships & Jobs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Applications List */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-between">
              <span>Submitted Applications</span>
              <span className="bg-indigo-950 text-indigo-400 border border-indigo-800 px-2.5 py-0.5 rounded-full text-xs">
                {applications.length} Active
              </span>
            </h2>

            <div className="space-y-3">
              {applications.map(app => {
                const isSelected = app.id === selectedApp?.id;
                return (
                  <button
                    key={app.id}
                    onClick={() => setSelectedAppId(app.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-r from-indigo-950 to-slate-900 border-indigo-500 ring-2 ring-indigo-500/40 text-white shadow-lg'
                        : 'bg-slate-950/80 border-slate-800/80 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-sm font-bold text-white line-clamp-1">{app.opportunityTitle}</h3>
                      <span className="bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                        {app.matchScoreAtApplication}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{app.company}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[app.status] || 'bg-slate-800 text-slate-300'}`}>
                        {app.status}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Application Timeline & Detail Drawer */}
          {selectedApp && (
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[selectedApp.status]}`}>
                      Status: {selectedApp.status}
                    </span>
                    <span className="text-xs text-slate-400">Applied on {selectedApp.appliedDate}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white">{selectedApp.opportunityTitle}</h2>
                  <p className="text-xs text-slate-400">{selectedApp.company}</p>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl text-center shrink-0">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Match Score</span>
                  <span className="text-xl font-black text-indigo-400">{selectedApp.matchScoreAtApplication}%</span>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recruitment Pipeline Timeline</h3>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                  {selectedApp.timeline.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      {/* Circle Dot */}
                      <div className={`absolute -left-6 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        step.completed 
                          ? 'bg-emerald-500 border-slate-900 text-white shadow-md shadow-emerald-500/50' 
                          : 'bg-slate-900 border-slate-700'
                      }`}>
                        {step.completed && <CheckCircle2 className="w-3 h-3" />}
                      </div>

                      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex-1 flex items-center justify-between text-xs">
                        <div>
                          <span className={`font-bold block ${step.completed ? 'text-white' : 'text-slate-400'}`}>
                            {step.step}
                          </span>
                          <span className="text-[11px] text-slate-500">Scheduled / Completed: {step.date}</span>
                        </div>

                        {step.completed ? (
                          <span className="text-emerald-400 font-bold text-[10px] bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded-full">
                            Passed
                          </span>
                        ) : (
                          <span className="text-slate-500 text-[10px] bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full">
                            Pending
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Application Notes */}
              {selectedApp.notes && (
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-xs space-y-1">
                  <span className="font-bold text-slate-300 block">Submitted Notes & Documents:</span>
                  <p className="text-slate-400">{selectedApp.notes}</p>
                </div>
              )}

            </div>
          )}

        </div>
      )}

    </AppLayout>
  );
}
