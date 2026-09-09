'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStudent } from '@/lib/context/StudentContext';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { UserRole } from '@/types';
import { 
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
  const [email, setEmail] = useState('arjun.mehta@dtu.ac.in');
  const [password, setPassword] = useState('••••••••••••');

  const roleMeta: Record<UserRole, { title: string; route: string; defaultEmail: string; hint: string }> = {
    student: {
      title: 'Student Portal',
      route: '/dashboard',
      defaultEmail: 'arjun.mehta@dtu.ac.in',
      hint: 'Access Skill Assessments, Opportunity Match & Digital Portfolio'
    },
    recruiter: {
      title: 'Industry / Recruiter Portal',
      route: '/industry',
      defaultEmail: 'talent@tcsion.co.in',
      hint: 'Post Internships/Jobs, Manage ATS Pipeline & Review Candidates'
    },
    faculty: {
      title: 'Academician / Faculty Portal',
      route: '/faculty',
      defaultEmail: 'priya.raghunathan@dtu.ac.in',
      hint: 'Faculty Internships, National FDPs & Collaborative Research'
    },
    institution: {
      title: 'Institution / Campus Portal',
      route: '/institution',
      defaultEmail: 'director.cdc@dtu.ac.in',
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-4 transition-colors duration-150">
      
      {/* Top Bar with Theme Toggle and Back */}
      <div className="w-full max-w-md flex items-center justify-between mb-4 px-1">
        <Link href="/" className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition flex items-center gap-1.5 font-medium">
          <span>← Back to SkillBridge</span>
        </Link>
        <ThemeToggle />
      </div>

      <div className="enterprise-card rounded-2xl max-w-md w-full p-7 sm:p-8 shadow-enterprise-modal space-y-6">
        
        {/* Brand */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-blue-600 dark:bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">SkillBridge</span>
          </Link>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Academic–Industry Collaboration Portal <br />
            <span className="text-blue-600 dark:text-blue-400 font-medium">DTU, IIT Delhi & AICTE Network</span>
          </p>
        </div>

        {/* 4-Role Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
          <button
            type="button"
            onClick={() => handleRoleSelect('student')}
            className={`py-2 px-1 rounded-lg transition flex flex-col items-center justify-center gap-1 ${
              role === 'student' ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span className="text-[11px]">Student</span>
          </button>
          
          <button
            type="button"
            onClick={() => handleRoleSelect('recruiter')}
            className={`py-2 px-1 rounded-lg transition flex flex-col items-center justify-center gap-1 ${
              role === 'recruiter' ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span className="text-[11px]">Industry</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect('faculty')}
            className={`py-2 px-1 rounded-lg transition flex flex-col items-center justify-center gap-1 ${
              role === 'faculty' ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <BookOpenCheck className="w-3.5 h-3.5" />
            <span className="text-[11px]">Faculty</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect('institution')}
            className={`py-2 px-1 rounded-lg transition flex flex-col items-center justify-center gap-1 ${
              role === 'institution' ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-[11px]">Campus</span>
          </button>
        </div>

        {/* Role Description Banner */}
        <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 rounded-xl p-3 text-xs text-blue-800 dark:text-blue-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>{roleMeta[role].hint}</span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Official / Institutional Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Secure Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full enterprise-btn-primary py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2"
          >
            <span>Sign In to {roleMeta[role].title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Access Bar */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-center space-y-2">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            New engineering student?{' '}
            <Link href="/register" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
              Create student account & verify →
            </Link>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">Direct Demo Access:</p>
          <button
            type="button"
            onClick={handleQuickDemo}
            className="w-full enterprise-btn-secondary py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
          >
            <span>⚡ Instant Launch: {roleMeta[role].title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
