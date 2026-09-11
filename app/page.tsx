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
  Users,
  Award,
  Sparkles,
  TrendingUp,
  Layers,
  FileCheck
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
              <span className="text-base font-bold text-slate-900 dark:text-white tracking-tight">SkillBridge<span className="text-blue-600 dark:text-blue-400">.ai</span></span>
              <span className="hidden sm:block text-[10px] text-slate-500 dark:text-slate-400 tracking-normal">AICTE Academic–Industry Collaboration Ecosystem</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Link href="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5" /> Students
            </Link>
            <Link href="/industry" className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" /> Recruiters
            </Link>
            <Link href="/faculty" className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1">
              <BookOpenCheck className="w-3.5 h-3.5" /> Faculty
            </Link>
            <Link href="/institution" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> TPO & Campus
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            <Link
              href="/login"
              className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition px-2.5 py-1.5"
            >
              Sign In
            </Link>

            <Link
              href="/register"
              className="enterprise-btn-primary px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6">
        
        {/* Institutional Context Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 px-3.5 py-1 rounded-full text-xs font-semibold text-blue-800 dark:text-blue-300">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
          <span>Unified Academic–Industry Collaboration · DTU, IIT Delhi, NSUT & AICTE</span>
        </div>

        {/* Master Multi-Stakeholder Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.15]">
          The Unified Collaboration Platform for{' '}
          <span className="text-blue-600 dark:text-blue-400">Engineering Academia & Industry</span>.
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Connecting <strong className="text-slate-900 dark:text-white font-semibold">Engineering Students</strong>, <strong className="text-slate-900 dark:text-white font-semibold">Corporate Recruiters</strong>, <strong className="text-slate-900 dark:text-white font-semibold">Faculty Researchers</strong>, and <strong className="text-slate-900 dark:text-white font-semibold">TPO Administrators</strong> on a single verified platform with diagnostic readiness, criteria matching, and NAAC accreditation analytics.
        </p>

        {/* Role-Based Gateway Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 max-w-3xl mx-auto">
          <Link
            href="/register"
            className="enterprise-btn-primary px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm"
          >
            <GraduationCap className="w-4 h-4" />
            <span>New Student Registration</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/industry"
            className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition"
          >
            <Building2 className="w-4 h-4 text-blue-400" />
            <span>Recruiter Portal (Hire Talent)</span>
          </Link>

          <Link
            href="/faculty"
            className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition"
          >
            <BookOpenCheck className="w-4 h-4 text-indigo-500" />
            <span>Faculty & Research</span>
          </Link>

          <Link
            href="/institution"
            className="bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>TPO & Campus Admin</span>
          </Link>
        </div>

        {/* Platform Architecture & Collaboration Portals */}
        <div
          className="pt-8 max-w-5xl mx-auto"
          style={{
            background: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            borderRadius: '1.5rem',
            padding: '2.5rem 1.5rem',
          }}
        >
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold block mb-1">
                Platform Architecture
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                How SkillBridge.ai Connects Academia &amp; Industry
              </h2>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Zero Resume Inflation · AICTE Standard</span>
            </div>
          </div>

          {/* 3-Step Pipeline */}
          <div className="relative flex flex-col md:flex-row items-stretch gap-4 mb-10">

            {/* Connector lines — desktop only */}
            <div className="hidden md:flex absolute inset-0 items-center pointer-events-none" aria-hidden>
              <div className="w-full flex items-center justify-between px-[calc(33.333%-1rem)]">
                <ArrowRight className="w-5 h-5 text-blue-300 dark:text-blue-700 flex-shrink-0" />
                <ArrowRight className="w-5 h-5 text-indigo-300 dark:text-indigo-700 flex-shrink-0" />
              </div>
            </div>

            {/* Step 01 — Identity */}
            <div className="flex-1 group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-600 rounded-2xl p-5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-600 text-white shadow-sm shadow-blue-500/30">
                  01
                </span>
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">Identity</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Institutional Verification
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Students and faculty authenticate using official university domains and enrollment numbers verified by campus TPO offices.
              </p>
              {/* .ac.in chip */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 text-[10px] font-semibold text-blue-700 dark:text-blue-400">
                  ✓ .ac.in verified
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                  Corp domain
                </span>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Verified academic &amp; corporate identity</span>
              </div>
            </div>

            {/* Step 02 — Mapping */}
            <div className="flex-1 group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600 rounded-2xl p-5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-600 text-white shadow-sm shadow-indigo-500/30">
                  02
                </span>
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">Mapping</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Competency &amp; CAD Diagnostics
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Diagnostic benchmarking across 5 engineering disciplines mapped to industry CAD tools and national AICTE rubrics.
              </p>
              {/* Discipline pill chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['CSE', 'ECE/VLSI', 'Mechanical', 'Civil', 'EEE'].map(d => (
                  <span key={d} className="inline-flex px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-900 text-[10px] font-semibold text-indigo-700 dark:text-indigo-400">
                    {d}
                  </span>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Deterministic skill &amp; criteria matching</span>
              </div>
            </div>

            {/* Step 03 — Outcomes */}
            <div className="flex-1 group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600 rounded-2xl p-5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-600 text-white shadow-sm shadow-emerald-500/30">
                  03
                </span>
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">Outcomes</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Collaboration &amp; Placements
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Students secure verified internships; recruiters hire pre-screened cohorts; faculty co-author funded R&amp;D; TPOs export audited NAAC &amp; NIRF reports.
              </p>
              {/* Metric badge */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                  ⚡ Deterministic Match: 94%
                </span>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Audited outcomes for all 4 stakeholders</span>
              </div>
            </div>

          </div>

          {/* 4 Stakeholder Portal Cards */}
          <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4 text-center">
            Dedicated Collaboration Portals
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">

            {/* Engineering Students — Electric Blue */}
            <Link
              href="/dashboard"
              className="group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-blue-100 dark:hover:shadow-blue-900/20 p-4 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center mb-3 shadow-sm shadow-blue-500/30">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 block mb-1">Engineering Students</span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">Diagnostic assessments, skill gap matrices, CAD tool tagging, and criteria-ranked internships.</p>
              </div>
              <div className="mt-3 text-[10px] font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                Enter Portal <ArrowRight className="w-3 h-3 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>

            {/* Industry Recruiters — Deep Violet */}
            <Link
              href="/industry"
              className="group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-violet-400 dark:hover:border-violet-500 hover:shadow-violet-100 dark:hover:shadow-violet-900/20 p-4 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-xl bg-violet-700 flex items-center justify-center mb-3 shadow-sm shadow-violet-500/30">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-violet-700 dark:group-hover:text-violet-400 block mb-1">Industry Recruiters</span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">ATS screening, post engineering roles, verified candidate discovery, and campus MoU initiation.</p>
              </div>
              <div className="mt-3 text-[10px] font-semibold text-violet-700 dark:text-violet-400 flex items-center gap-1">
                Enter Portal <ArrowRight className="w-3 h-3 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>

            {/* Faculty & Academicians — Amber */}
            <Link
              href="/faculty"
              className="group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-amber-100 dark:hover:shadow-amber-900/20 p-4 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-xl bg-amber-600 flex items-center justify-center mb-3 shadow-sm shadow-amber-500/30">
                  <BookOpenCheck className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400 block mb-1">Faculty &amp; Academicians</span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">Joint industry R&amp;D proposals, AICTE FDP certifications, corporate sabbaticals, and curriculum co-design.</p>
              </div>
              <div className="mt-3 text-[10px] font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                Enter Portal <ArrowRight className="w-3 h-3 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>

            {/* TPO & Campus Admin — Emerald */}
            <Link
              href="/institution"
              className="group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-emerald-100 dark:hover:shadow-emerald-900/20 p-4 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center mb-3 shadow-sm shadow-emerald-500/30">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 block mb-1">TPO &amp; Campus Admin</span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">Student credential verification queue, department analytics, and automated NAAC/NIRF metrics.</p>
              </div>
              <div className="mt-3 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                Enter Portal <ArrowRight className="w-3 h-3 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>

          </div>
        </div>

      </section>

      {/* Multi-Stakeholder Capabilities Grid */}
      <section id="capabilities" className="py-16 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-10">
          
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Ecosystem Architecture & Capabilities</h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
              Purpose-built infrastructure serving students, industry hiring partners, academic faculty, and college administrators across premier Indian engineering colleges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="enterprise-card rounded-xl p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 flex items-center justify-center">
                <BrainCircuit className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider text-blue-600 dark:text-blue-400">For Students</h3>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Diagnostic Skill Intelligence</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Adaptive assessments, CAD tool tracking, transparent skill gap matrix, and NPTEL course bridges targeted directly to role prerequisites.
              </p>
            </div>

            <div className="enterprise-card rounded-xl p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider text-blue-600 dark:text-blue-400">For Recruiters</h3>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Criteria-Based ATS Sourcing</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Pre-screened candidate shortlists with 100% verified CGPAs, campus endorsements, and direct 1-click campus interview pipeline management.
              </p>
            </div>

            <div className="enterprise-card rounded-xl p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900 flex items-center justify-center">
                <BookOpenCheck className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-indigo-400">For Faculty</h3>
              <div className="text-sm font-bold text-slate-900 dark:text-white">R&D Grants & Industry Sabbaticals</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Co-sponsored research proposals, AICTE faculty development programs (FDPs), industry sabbaticals, and joint capstone advisories.
              </p>
            </div>

            <div className="enterprise-card rounded-xl p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider text-emerald-600 dark:text-emerald-400">For Campuses</h3>
              <div className="text-sm font-bold text-slate-900 dark:text-white">TPO Verification & NAAC Analytics</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                1-click College ID verification queue, real-time departmental placement metrics, and automated NAAC Criterion 5 / NIRF reporting.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Governance & Trust Framework */}
      <section id="matching" className="py-16 border-t border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Institutional Trust & Deterministic Governance</h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">Eliminating resume inflation with verified institutional credentials and transparent matching algorithms.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="enterprise-card rounded-xl p-5 space-y-2">
              <div className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">Accredited Evidence</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Verified Skill Coverage (60%)</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Technical proficiencies backed by diagnostic assessments, NPTEL scores, and verified repository evidence.</p>
            </div>
            <div className="enterprise-card rounded-xl p-5 space-y-2">
              <div className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">Campus Endorsed</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Academic Standing (20%)</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">TPO-validated university roll numbers, CGPA thresholds, and branch eligibility verified against college records.</p>
            </div>
            <div className="enterprise-card rounded-xl p-5 space-y-2">
              <div className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">Career Alignment</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Trajectory Match (20%)</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Deterministic matching aligned with engineering disciplines, CAD tool proficiency, and industry domain tracks.</p>
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
