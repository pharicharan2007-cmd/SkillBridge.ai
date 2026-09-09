'use client';

import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { 
  BrainCircuit, 
  Briefcase, 
  ArrowRight, 
  Target,
  CheckCircle2, 
  GraduationCap, 
  Building2, 
  BookOpenCheck, 
  ShieldCheck, 
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100 transition-colors duration-150">
      
      {/* Top Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur sticky top-0 z-50 transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 dark:bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-base font-bold text-slate-900 dark:text-white tracking-tight">SkillBridge</span>
              <span className="hidden sm:block text-[10px] text-slate-500 dark:text-slate-400 tracking-normal">Academic–Industry Collaboration Portal</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-500 dark:text-slate-400">
            <a href="#capabilities" className="hover:text-slate-900 dark:hover:text-white transition">Capabilities</a>
            <a href="#matching" className="hover:text-slate-900 dark:hover:text-white transition">Matching Rubric</a>
            <a href="#institutions" className="hover:text-slate-900 dark:hover:text-white transition">Institutions</a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Switcher in Landing Header */}
            <ThemeToggle />

            <Link
              href="/login"
              className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition px-2.5 py-1.5"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="enterprise-btn-primary px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <span>Student Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-7">
        
        {/* Institutional Context Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 px-3.5 py-1 rounded-full text-xs font-semibold text-blue-800 dark:text-blue-300">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
          <span>AICTE-aligned · DTU, IIT Delhi, NSUT Onboarded</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.1]">
          From academic credentials to{' '}
          <span className="text-blue-600 dark:text-blue-400">verified placement readiness</span>.
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Diagnostic skill profiling, criteria-based gap analysis, and deterministic placement matching — connecting engineering students, faculty, and industry across DTU, IIT Delhi, and AICTE institutions.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto enterprise-btn-primary px-6 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2"
          >
            <BrainCircuit className="w-4 h-4" />
            <span>Open Student Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/assessment"
            className="w-full sm:w-auto enterprise-btn-secondary px-6 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2"
          >
            <Target className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>Take Skill Assessment</span>
          </Link>
        </div>

        {/* 4 Portal Quick Links */}
        <div className="pt-6 max-w-4xl mx-auto">
          <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
            4 Dedicated Collaboration Portals:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <Link
              href="/dashboard"
              className="enterprise-card hover:border-blue-400 p-3.5 rounded-2xl transition group"
            >
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
                <GraduationCap className="w-4 h-4" />
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">Student Portal</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">Skill Matrix, Gap Analysis & Verified Portfolio</p>
            </Link>

            <Link
              href="/industry"
              className="enterprise-card hover:border-blue-400 p-3.5 rounded-2xl transition group"
            >
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
                <Building2 className="w-4 h-4" />
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">Recruiter Portal</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">Post Roles, ATS Screening & MoU Initiation</p>
            </Link>

            <Link
              href="/faculty"
              className="enterprise-card hover:border-blue-400 p-3.5 rounded-2xl transition group"
            >
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
                <BookOpenCheck className="w-4 h-4" />
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">Faculty Portal</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">AICTE FDPs, DST Grants & Joint Research</p>
            </Link>

            <Link
              href="/institution"
              className="enterprise-card hover:border-emerald-400 p-3.5 rounded-2xl transition group"
            >
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">Campus Portal</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">NAAC/NIRF Analytics & AICTE Compliance</p>
            </Link>
          </div>
        </div>

        {/* Platform Preview Card */}
        <div className="pt-10 max-w-4xl mx-auto">
          <div className="enterprise-card rounded-xl p-4 sm:p-5 shadow-enterprise-hover text-left space-y-4">
            
            {/* Window Chrome */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
              </div>
              <div className="text-[11px] font-mono text-slate-400 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                skillbridge.dtu.ac.in/dashboard
              </div>
              <div className="w-10" />
            </div>

            {/* Preview Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              
              {/* Criteria-based Readiness */}
              <div className="enterprise-row rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-medium">Placement Readiness</span>
                  <span className="status-pill status-pill-green text-[10px]">4 of 5 Met</span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300"><CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> CGPA 8.65 / 10 (CSE, DTU)</div>
                  <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300"><CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> GATE 2026 Qualified (CS/IT)</div>
                  <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300"><CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> 3 Verified GitHub Repos</div>
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400"><Target className="w-3 h-3 text-amber-500" /> TensorFlow proficiency pending</div>
                </div>
              </div>

              {/* Criteria-based Match */}
              <div className="enterprise-row rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-medium">Top Opportunity Match</span>
                  <span className="status-pill status-pill-blue text-[10px]">4/5 Core Met</span>
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white truncate">ISRO ML Research Intern</div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300"><CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Python ✓ · SQL ✓ · Git ✓</div>
                  <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400"><Target className="w-3 h-3 text-amber-500" /> Missing: TensorFlow (mandatory)</div>
                  <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400"><CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> CGPA 8.65 ≥ 8.0 required ✓</div>
                </div>
              </div>

              {/* Priority Gap */}
              <div className="enterprise-row rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-medium">Priority Skill Gap</span>
                  <span className="status-pill status-pill-red text-[10px]">Critical</span>
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">TensorFlow / PyTorch</div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Current: 42% · Required: 80%. Blocks 3 of top 5 opportunities (ISRO, Intel, IIT Delhi).</p>
                <div className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">→ NPTEL Deep Learning, IIT Madras</div>
              </div>

            </div>

          </div>
        </div>

      </section>

      {/* Feature Grid */}
      <section id="capabilities" className="py-16 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-10">
          
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Core Platform Capabilities</h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-lg mx-auto">
              Built for real accreditation workflows, verifiable credentials, and diagnostic career intelligence across Indian engineering institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="enterprise-card rounded-xl p-6 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 flex items-center justify-center">
                <BrainCircuit className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Diagnostic Skill Assessment</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                12-question multi-domain evaluations mapped to AICTE skill framework, producing verifiable proficiency scores with percentile context against DTU/IIT cohorts.
              </p>
            </div>

            <div className="enterprise-card rounded-xl p-6 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Criteria-based Gap Matrix</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Compares verified skill evidence (NPTEL certs, GATE scores, GitHub repos) against specific job prerequisites — showing exactly which requirements are met and which are missing.
              </p>
            </div>

            <div className="enterprise-card rounded-xl p-6 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Deterministic Match Engine</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Transparent opportunity ranking: 60% skill coverage + 20% academic eligibility (CGPA, branch, GATE) + 20% career alignment. No black-box percentages.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Matching Algorithm */}
      <section id="matching" className="py-16 border-t border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">3-Tier Deterministic Matching Rubric</h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">Transparent, reproducible. Every score is traceable to a specific credential or requirement.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="enterprise-card rounded-xl p-5 space-y-1.5">
              <div className="text-blue-600 dark:text-blue-400 font-bold text-sm tabular-nums">60% Weight</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Verified Skill Coverage</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Proficiency evidence from NPTEL certs, GATE scores, GitHub repos, and assessment results matched against role requirements.</p>
            </div>
            <div className="enterprise-card rounded-xl p-5 space-y-1.5">
              <div className="text-blue-600 dark:text-blue-400 font-bold text-sm tabular-nums">20% Weight</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Academic Eligibility</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Hard cutoff verification: CGPA threshold, eligible branch list, graduation year, and GATE/NQT score requirements.</p>
            </div>
            <div className="enterprise-card rounded-xl p-5 space-y-1.5">
              <div className="text-blue-600 dark:text-blue-400 font-bold text-sm tabular-nums">20% Weight</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Career Alignment</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Compatibility with stated target roles, domain interests (AI/ML, VLSI, Cloud), and long-term trajectory preferences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Institutions */}
      <section id="institutions" className="py-12 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Onboarded Institutions & Partners</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">AICTE-affiliated institutions and active industry hiring partners</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tabular-nums">3</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">AICTE Institutions Onboarded</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tabular-nums">52</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Active Hiring Partners</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tabular-nums">48</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">AICTE-Mapped Skill Domains</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tabular-nums">12</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">NAAC Criterion Rubrics</div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {['DTU Delhi', 'IIT Delhi', 'NSUT', 'TCS', 'Qualcomm India', 'ISRO', 'Infosys', 'Bosch India'].map(name => (
              <span key={name} className="credential-tag text-xs px-3 py-1.5">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 dark:text-slate-400 transition-colors duration-150">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">SkillBridge</span>
            <span>— Academic–Industry Collaboration Portal · DTU, IIT Delhi, NSUT</span>
          </div>
          <div className="text-slate-400 dark:text-slate-500">
            Next.js 14 · AICTE Skill Framework Aligned
          </div>
        </div>
      </footer>

    </div>
  );
}
