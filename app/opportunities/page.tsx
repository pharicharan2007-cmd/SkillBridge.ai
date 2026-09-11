'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useStudent } from '@/lib/context/StudentContext';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { ApplyModal } from '@/components/opportunities/ApplyModal';
import { Opportunity } from '@/types';
import { Briefcase, Search, Bookmark } from 'lucide-react';

const DOMAINS = [
  'All',
  'AI & Machine Learning',
  'Software Engineering',
  'VLSI & Embedded Systems',
  'Data Engineering & Analytics',
  'Cloud & DevOps',
  'Robotics & Control Systems',
  'Research Internship',
];

const ENGINEERING_CLUSTERS: { label: string; value: string }[] = [
  { label: 'All Disciplines', value: 'All' },
  { label: 'Electronics & VLSI', value: 'Electronics & Communication (VLSI & Embedded)' },
  { label: 'Mechanical & Robotics', value: 'Mechanical, Robotics & Automotive EV' },
  { label: 'Civil & Infrastructure', value: 'Civil & Smart Infrastructure' },
  { label: 'Electrical & Power', value: 'Electrical, Power Systems & Renewable Energy' },
  { label: 'Computer Science & AI', value: 'Computer Science & Information Technology' },
];

export default function OpportunitiesPage() {
  const { opportunities, applications, savedOpportunityIds, toggleSaveOpportunity } = useStudent();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedCluster, setSelectedCluster] = useState<string>('All');
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'saved'>('all');

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.requiredSkills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDomain = selectedDomain === 'All' || opp.domain === selectedDomain;
    const matchesCluster = selectedCluster === 'All' || opp.engineeringCluster === selectedCluster;
    const matchesSaved = activeTab === 'all' || savedOpportunityIds.includes(opp.id);
    return matchesSearch && matchesDomain && matchesCluster && matchesSaved;
  });

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* Page Header */}
        <div className="enterprise-card rounded-xl p-6 sm:p-7">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                <Briefcase className="w-3 h-3" />
                <span>Matched Opportunities — Criteria-Based Ranking</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Internships & Campus Roles
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ranked by: <span className="font-semibold text-slate-700 dark:text-slate-300">60% Verified Skill Coverage + 20% Academic Eligibility (CGPA, branch, GATE) + 20% Career Alignment</span>
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 rounded-lg text-xs font-semibold shrink-0">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-1.5 rounded-md transition ${activeTab === 'all' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
              >
                All Roles ({opportunities.length})
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`px-4 py-1.5 rounded-md transition flex items-center gap-1.5 ${activeTab === 'saved' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
              >
                <Bookmark className="w-3 h-3" />
                Saved ({savedOpportunityIds.length})
              </button>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="relative sm:col-span-2">
              <Search className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by role, company, or skill (e.g., TensorFlow, Verilog, Python)..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-8 pr-4 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500 placeholder-slate-400 dark:placeholder-slate-500 transition"
              />
            </div>
            <select
              value={selectedDomain}
              onChange={e => setSelectedDomain(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              {DOMAINS.map(d => (
                <option key={d} value={d}>Domain: {d}</option>
              ))}
            </select>
          </div>

          {/* Engineering Discipline Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-3 border-t border-slate-100 dark:border-slate-800/80">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500 shrink-0 mr-1">
              Discipline:
            </span>
            {ENGINEERING_CLUSTERS.map(c => {
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

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            Showing <strong className="text-slate-800 dark:text-slate-200">{filteredOpportunities.length}</strong> of {opportunities.length} opportunities
            {selectedDomain !== 'All' && <span> in <strong>{selectedDomain}</strong></span>}
          </span>
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="text-blue-600 dark:text-blue-400 hover:underline font-semibold transition">
              Clear search
            </button>
          )}
        </div>

        {/* Opportunity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOpportunities.map(opp => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              onApply={o => setSelectedOpportunity(o)}
              isSaved={savedOpportunityIds.includes(opp.id)}
              onToggleSave={toggleSaveOpportunity}
              isApplied={applications.some(a => a.opportunityId === opp.id)}
            />
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <div className="enterprise-card rounded-xl p-12 text-center space-y-2">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No opportunities match your current filters.</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Try resetting the search query or switching domain.</p>
          </div>
        )}

        <ApplyModal
          opportunity={selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
          onSuccess={() => setSelectedOpportunity(null)}
        />
      </div>
    </AppLayout>
  );
}
