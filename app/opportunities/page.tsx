'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useStudent } from '@/lib/context/StudentContext';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { ApplyModal } from '@/components/opportunities/ApplyModal';
import { Opportunity } from '@/types';
import { Briefcase, Search, Filter, Sparkles, CheckCircle2, SlidersHorizontal } from 'lucide-react';

export default function OpportunitiesPage() {
  const { opportunities, applications, savedOpportunityIds, toggleSaveOpportunity } = useStudent();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'saved'>('all');

  const domains = ['All', 'Artificial Intelligence', 'Software Engineering', 'Data Analytics', 'Cloud & Infrastructure', 'Backend Development', 'Cybersecurity'];

  const filteredOpportunities = opportunities.filter(opp => {
    // Search match
    const matchesSearch = 
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.requiredSkills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    // Domain filter
    const matchesDomain = selectedDomain === 'All' || opp.domain === selectedDomain;

    // Saved filter
    const matchesSaved = activeTab === 'all' || savedOpportunityIds.includes(opp.id);

    return matchesSearch && matchesDomain && matchesSaved;
  });

  return (
    <AppLayout>
      
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-indigo-950 border border-indigo-800 px-3 py-1 rounded-full text-xs font-bold text-indigo-300">
              <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
              <span>AI Match Engine</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">AI Internship & Job Recommendations</h1>
            <p className="text-xs text-slate-400">
              Scored using weighted vector matching: <span className="font-semibold text-indigo-300">60% Skill Match + 20% Eligibility + 20% Career Interest</span>.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold shrink-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg transition ${activeTab === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              All Roles ({opportunities.length})
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-4 py-2 rounded-lg transition ${activeTab === 'saved' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Saved ({savedOpportunityIds.length})
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-800/80">
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by job title, company, or skill (e.g., Python, React, AWS)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500"
            />
          </div>

          <div>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {domains.map(d => (
                <option key={d} value={d}>Domain: {d}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Opportunity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpportunities.map(opp => (
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

      {filteredOpportunities.length === 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 space-y-2">
          <p className="text-base font-bold text-slate-300">No opportunities match your current filters.</p>
          <p className="text-xs">Try resetting your search query or domain filter.</p>
        </div>
      )}

      {/* Apply Modal Drawer */}
      <ApplyModal
        opportunity={selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
        onSuccess={() => setSelectedOpportunity(null)}
      />

    </AppLayout>
  );
}
