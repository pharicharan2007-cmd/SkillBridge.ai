'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BrainCircuit, 
  Briefcase, 
  ArrowRight, 
  Zap, 
  Target,
  CheckCircle2,
  BarChart3,
  Layers,
  Sparkles
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* Top Header */}
      <header className="border-b border-white/[0.06] bg-[#090a0f]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-base font-semibold text-white tracking-tight">SkillBridge<span className="text-indigo-400">.ai</span></span>
              <span className="hidden sm:block text-[10px] text-slate-400 tracking-normal">Career Intelligence Platform</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition">Capabilities</a>
            <a href="#architecture" className="hover:text-white transition">Matching Formula</a>
            <a href="#stats" className="hover:text-white transition">Platform Impact</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-medium text-slate-300 hover:text-white transition px-3 py-1.5"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="saas-btn-primary px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5"
            >
              <span>Student Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-7">
        
        {/* Minimal Announcement Badge */}
        <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] px-3.5 py-1 rounded-full text-xs font-medium text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          <span>Intelligent Academia–Industry Skill Mapping</span>
        </div>

        {/* High-Contrast, Confident Headline (No Rainbow Gradient Text) */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white max-w-4xl mx-auto leading-[1.12]">
          Bridge the gap between student skills and <span className="text-indigo-400">industry demands</span>.
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
          Automated skill profiling, gap diagnostics, and algorithmic placement matching—connecting students, educators, and recruiters on a single verified platform.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto saas-btn-primary px-6 py-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-2"
          >
            <BrainCircuit className="w-4 h-4" />
            <span>Launch Student Experience</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/assessment"
            className="w-full sm:w-auto saas-btn-secondary px-6 py-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 text-slate-400" />
            <span>Take Quick Assessment</span>
          </Link>
        </div>

        {/* Realistic SaaS Product Showcase Preview */}
        <div className="pt-10 max-w-4xl mx-auto">
          <div className="saas-card rounded-xl p-4 sm:p-5 shadow-2xl text-left space-y-4">
            
            {/* Window Chrome Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/[0.12]" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/[0.12]" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/[0.12]" />
              </div>
              <div className="text-[11px] font-mono text-slate-400 bg-[#131722] px-3 py-0.5 rounded border border-white/[0.06]">
                skillbridge.ai/dashboard
              </div>
              <div className="w-10" />
            </div>

            {/* Preview Grid inside the Application Window */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              
              {/* Metric 1: Readiness */}
              <div className="saas-row rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Readiness Index</span>
                  <span className="text-emerald-400 font-medium text-[11px]">Ready</span>
                </div>
                <div className="text-2xl font-semibold text-white tracking-tight tabular-nums">72 <span className="text-xs text-slate-500 font-normal">/ 100</span></div>
                <p className="text-[11px] text-slate-400">Verified strengths in Python, ML & Systems.</p>
              </div>

              {/* Metric 2: Opportunity Match */}
              <div className="saas-row rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Opportunity Match</span>
                  <span className="text-indigo-400 font-medium text-[11px] tabular-nums">87% Match</span>
                </div>
                <div className="text-sm font-semibold text-white truncate">AI/ML Engineering Intern</div>
                <p className="text-[11px] text-slate-400">Matches Python, SQL • Gap: TensorFlow</p>
              </div>

              {/* Metric 3: Actionable Skill Gap */}
              <div className="saas-row rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Priority Skill Gap</span>
                  <span className="text-amber-400 font-medium text-[11px]">Critical</span>
                </div>
                <div className="text-sm font-semibold text-white truncate">Deep Learning Specialization</div>
                <p className="text-[11px] text-slate-400">Targeted coursework to bridge 40% deficit.</p>
              </div>

            </div>

          </div>
        </div>

      </section>

      {/* Feature Grid */}
      <section id="features" className="py-16 border-t border-white/[0.06] bg-[#0c0f17]/50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-10">
          
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">Core Platform Capabilities</h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto">
              Built to provide clear, actionable intelligence throughout the student-to-career trajectory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="saas-card rounded-xl p-6 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-950/80 text-indigo-400 border border-indigo-800/60 flex items-center justify-center">
                <BrainCircuit className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Dynamic Skill Assessment</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Multi-domain 12-question evaluations measuring technical competence, algorithmic problem-solving, and professional communication.
              </p>
            </div>

            <div className="saas-card rounded-xl p-6 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-950/80 text-indigo-400 border border-indigo-800/60 flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Precision Skill Gap Matrix</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Compares student proficiencies directly against real-world job criteria to surface actionable missing competencies before applying.
              </p>
            </div>

            <div className="saas-card rounded-xl p-6 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-950/80 text-indigo-400 border border-indigo-800/60 flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Weighted Match Engine</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Deterministic matching engine ranking opportunities by 60% Skill Match, 20% Academic Eligibility, and 20% Career Interest.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Architecture & Formula Section */}
      <section id="architecture" className="py-16 border-t border-white/[0.06] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">The 3-Tier Matching Algorithm</h2>
            <p className="text-slate-400 text-xs sm:text-sm">Transparent, reproducible career readiness and opportunity rankings.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="saas-card rounded-xl p-5 space-y-1.5">
              <div className="text-indigo-400 font-semibold text-sm tabular-nums">60% Weight</div>
              <div className="text-sm font-medium text-white">Skill Coverage & Depth</div>
              <p className="text-xs text-slate-400 leading-relaxed">Evaluation of verified competencies against required and preferred job proficiencies.</p>
            </div>
            <div className="saas-card rounded-xl p-5 space-y-1.5">
              <div className="text-indigo-400 font-semibold text-sm tabular-nums">20% Weight</div>
              <div className="text-sm font-medium text-white">Academic Eligibility</div>
              <p className="text-xs text-slate-400 leading-relaxed">Strict criteria verification including branch alignment, CGPA cutoffs, and graduation year.</p>
            </div>
            <div className="saas-card rounded-xl p-5 space-y-1.5">
              <div className="text-indigo-400 font-semibold text-sm tabular-nums">20% Weight</div>
              <div className="text-sm font-medium text-white">Career Alignment</div>
              <p className="text-xs text-slate-400 leading-relaxed">Compatibility with student target roles, industry domains, and long-term trajectory.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Stats / Impact Section */}
      <section id="stats" className="py-12 border-t border-white/[0.06] bg-[#0c0f17]/40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-semibold text-white tabular-nums">84%</div>
            <div className="text-xs text-slate-400 mt-1">Placement Match Accuracy</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-semibold text-white tabular-nums">21+</div>
            <div className="text-xs text-slate-400 mt-1">Taxonomy Skills</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-semibold text-white tabular-nums">30+</div>
            <div className="text-xs text-slate-400 mt-1">Active Industry Roles</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-semibold text-white tabular-nums">12-Pt</div>
            <div className="text-xs text-slate-400 mt-1">Diagnostic Assessment</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-[#090a0f] py-6 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-300">SkillBridge.ai</span>
            <span>— Academia–Industry Collaboration Platform</span>
          </div>
          <div className="text-slate-500">
            Next.js 14 • FastAPI Backend • TypeScript
          </div>
        </div>
      </footer>

    </div>
  );
}
