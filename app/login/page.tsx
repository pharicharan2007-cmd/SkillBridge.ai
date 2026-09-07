'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, GraduationCap, Building2, ShieldCheck, ArrowRight, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'student' | 'recruiter' | 'institution'>('student');
  const [email, setEmail] = useState('rohan.sharma@institution.edu.in');
  const [password, setPassword] = useState('••••••••••••');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6">
        
        {/* Brand */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">SkillBridge<span className="text-indigo-400">.ai</span></span>
          </Link>
          <p className="text-xs text-slate-400">Sign in to your SkillBridge Career Portal</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setRole('student')}
            className={`py-2 rounded-lg transition flex items-center justify-center gap-1 ${
              role === 'student' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student</span>
          </button>
          
          <button
            onClick={() => setRole('recruiter')}
            className={`py-2 rounded-lg transition flex items-center justify-center gap-1 ${
              role === 'recruiter' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Recruiter</span>
          </button>

          <button
            onClick={() => setRole('institution')}
            className={`py-2 rounded-lg transition flex items-center justify-center gap-1 ${
              role === 'institution' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Campus</span>
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white py-3 rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30 transition hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <span>Enter Student Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Credentials Quick Click */}
        <div className="pt-2 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-400 mb-2">Demo Student Account loaded:</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-800/80 rounded-xl py-2 text-xs font-semibold transition"
          >
            ⚡ Quick Demo Access (Rohan Sharma - 72/100)
          </button>
        </div>

      </div>
    </div>
  );
}
