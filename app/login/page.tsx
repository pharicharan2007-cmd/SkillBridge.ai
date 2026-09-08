'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStudent } from '@/lib/context/StudentContext';
import { UserRole } from '@/types';
import { 
  Sparkles, 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Mail, 
  BookOpenCheck,
  CheckCircle2
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { setCurrentRole } = useStudent();
  const [role, setRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('rohan.sharma@institution.edu.in');
  const [password, setPassword] = useState('••••••••••••');

  const roleMeta: Record<UserRole, { title: string; route: string; defaultEmail: string; hint: string }> = {
    student: {
      title: 'Student Portal',
      route: '/dashboard',
      defaultEmail: 'rohan.sharma@institution.edu.in',
      hint: 'Access Skill Assessments, Opportunity Match & Digital Portfolio'
    },
    recruiter: {
      title: 'Industry / Recruiter Portal',
      route: '/industry',
      defaultEmail: 'talent@healthanalytics.co.in',
      hint: 'Post Internships/Jobs, Manage ATS Pipeline & Publish Courses'
    },
    faculty: {
      title: 'Academician / Faculty Portal',
      route: '/faculty',
      defaultEmail: 'sunita.deshmukh@aiia.gov.in',
      hint: 'Faculty Internships, National FDPs & Collaborative Research'
    },
    institution: {
      title: 'Institution / Campus Portal',
      route: '/institution',
      defaultEmail: 'director@aiia.gov.in',
      hint: 'Cohort Readiness, Department Skill Gap Matrix & NIRF/NAAC Analytics'
    }
  };

  const handleRoleSelect = (r: UserRole) => {
    setRole(r);
    setEmail(roleMeta[r].defaultEmail);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentRole(role);
    router.push(roleMeta[role].route);
  };

  const handleQuickDemo = () => {
    setCurrentRole(role);
    router.push(roleMeta[role].route);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex items-center justify-center p-4">
      <div className="bg-[#0f121d] border border-white/[0.08] rounded-3xl max-w-lg w-full p-8 shadow-2xl space-y-6">
        
        {/* Brand */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">SkillBridge<span className="text-indigo-400">.ai</span></span>
          </Link>
          <p className="text-xs text-slate-400">
            Unified Academia–Industry Collaboration Platform <br />
            <span className="text-indigo-300 font-medium">Problem Statement ID: 26044 (Ministry of Ayush / AIIA)</span>
          </p>
        </div>

        {/* 4-Role Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-[#090a0f] p-1.5 rounded-2xl border border-white/[0.06] text-xs font-semibold">
          <button
            type="button"
            onClick={() => handleRoleSelect('student')}
            className={`py-2 px-2 rounded-xl transition flex flex-col items-center justify-center gap-1 ${
              role === 'student' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span className="text-[11px]">Student</span>
          </button>
          
          <button
            type="button"
            onClick={() => handleRoleSelect('recruiter')}
            className={`py-2 px-2 rounded-xl transition flex flex-col items-center justify-center gap-1 ${
              role === 'recruiter' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span className="text-[11px]">Industry</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect('faculty')}
            className={`py-2 px-2 rounded-xl transition flex flex-col items-center justify-center gap-1 ${
              role === 'faculty' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpenCheck className="w-4 h-4" />
            <span className="text-[11px]">Faculty</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect('institution')}
            className={`py-2 px-2 rounded-xl transition flex flex-col items-center justify-center gap-1 ${
              role === 'institution' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[11px]">Campus</span>
          </button>
        </div>

        {/* Role Description Banner */}
        <div className="bg-indigo-950/40 border border-indigo-900/50 rounded-xl p-3 text-xs text-indigo-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>{roleMeta[role].hint}</span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Registered Institutional / Official Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#141824] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Secure Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#141824] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white py-3 rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30 transition hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <span>Sign In to {roleMeta[role].title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Access Bar */}
        <div className="pt-2 border-t border-white/[0.06] text-center space-y-2">
          <p className="text-[11px] text-slate-400">Direct Demo Access (Skip credentials):</p>
          <button
            type="button"
            onClick={handleQuickDemo}
            className="w-full bg-[#141824] hover:bg-[#1a2030] text-indigo-300 border border-indigo-700/40 rounded-xl py-2.5 text-xs font-semibold transition flex items-center justify-center gap-2"
          >
            <span>⚡ Instant Launch: {roleMeta[role].title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
