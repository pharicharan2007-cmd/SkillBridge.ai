'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { useStudent } from '@/lib/context/StudentContext';
import { 
  Send, 
  CheckCircle2, 
  Briefcase, 
  Clock, 
  ArrowRight, 
} from 'lucide-react';

const statusPills: Record<string, string> = {
  'Submitted': 'status-pill-blue',
  'Under Review': 'status-pill-amber',
  'Interview Scheduled': 'status-pill-purple',
  'Shortlisted': 'status-pill-green',
  'Offered': 'status-pill-green',
  'Rejected': 'status-pill-red',
};

export default function ApplicationsPage() {
  const { applications } = useStudent();
  const [selectedAppId, setSelectedAppId] = useState<string | null>(
    applications.length > 0 ? applications[0].id : null
  );

  const selectedApp = applications.find(a => a.id === selectedAppId) || applications[0];

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* Page Header */}
        <div className="enterprise-card rounded-xl p-6 sm:p-7">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
            <Send className="w-3 h-3" />
            <span>Placement Tracker</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Application Status & Hiring Pipeline
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Real-time progress for submitted internships and campus hiring applications.</p>
        </div>

        {applications.length === 0 ? (
          <div className="enterprise-card rounded-xl p-12 text-center space-y-4">
            <Send className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-700 dark:text-slate-200">No active applications yet</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
              Browse matched opportunities and click "Apply" to begin tracking your recruitment status.
            </p>
            <Link
              href="/opportunities"
              className="inline-flex items-center gap-2 enterprise-btn-primary px-5 py-2 rounded-lg text-xs font-semibold"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Browse Opportunities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Applications List */}
            <div className="enterprise-card rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Submitted Applications</h2>
                <span className="status-pill status-pill-blue">{applications.length} Active</span>
              </div>

              <div className="space-y-2">
                {applications.map(app => {
                  const isSelected = app.id === selectedApp?.id;
                  return (
                    <button
                      key={app.id}
                      onClick={() => setSelectedAppId(app.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-400 dark:border-blue-600 ring-1 ring-blue-300 dark:ring-blue-800 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-850 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight">{app.opportunityTitle}</h3>
                        <span className={`status-pill text-[10px] shrink-0 ${statusPills[app.status] || 'status-pill-slate'}`}>
                          {app.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{app.company} · {app.appliedDate}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Application Detail Drawer */}
            {selectedApp && (
              <div className="lg:col-span-2 enterprise-card rounded-xl p-6 space-y-6">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`status-pill ${statusPills[selectedApp.status] || 'status-pill-slate'}`}>
                        {selectedApp.status}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">Applied {selectedApp.appliedDate}</span>
                    </div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">{selectedApp.opportunityTitle}</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{selectedApp.company}</p>
                  </div>

                  {/* Criteria score */}
                  <div className="enterprise-row rounded-xl px-4 py-3 text-center shrink-0">
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Score at Apply</div>
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400 tabular-nums mt-0.5">
                      {selectedApp.matchScoreAtApplication}<span className="text-sm font-normal text-slate-400 dark:text-slate-500">/100</span>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Recruitment Pipeline</h3>

                  <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
                    {selectedApp.timeline.map((step, idx) => (
                      <div key={idx} className="relative flex items-start gap-4">
                        {/* Step dot */}
                        <div className={`absolute -left-6 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          step.completed
                            ? 'bg-emerald-500 border-emerald-300 text-white shadow-sm'
                            : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600'
                        }`}>
                          {step.completed && <CheckCircle2 className="w-2.5 h-2.5" />}
                        </div>

                        <div className={`enterprise-row rounded-lg p-3.5 flex-1 flex items-center justify-between text-xs ${
                          step.completed ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20' : ''
                        }`}>
                          <div className="space-y-0.5">
                            <span className={`font-semibold block ${step.completed ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                              {step.step}
                            </span>
                            <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {step.date}
                            </span>
                          </div>

                          {step.completed ? (
                            <span className="status-pill status-pill-green text-[10px]">Completed</span>
                          ) : (
                            <span className="status-pill status-pill-slate text-[10px]">Pending</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {selectedApp.notes && (
                  <div className="enterprise-row rounded-xl p-4 space-y-1.5 text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-300 block">Submission Notes & Criteria Evidence:</span>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{selectedApp.notes}</p>
                  </div>
                )}

              </div>
            )}

          </div>
        )}
      </div>
    </AppLayout>
  );
}
