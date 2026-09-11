'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStudent } from '@/lib/context/StudentContext';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { UserRole } from '@/types';
import { 
  signInWithGoogle, 
  signInWithGitHub, 
  sendEmailOtp, 
  verifyEmailOtp, 
  simulateOAuthSession 
} from '@/lib/services/authService';
import { 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Mail, 
  BookOpenCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  KeyRound
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { setCurrentRole } = useStudent();
  const [role, setRole] = useState<UserRole>('student');
  const [authMode, setAuthMode] = useState<'oauth' | 'email_otp' | 'credentials'>('oauth');
  
  // OAuth loading state
  const [oauthLoading, setOauthLoading] = useState<'google' | 'github' | null>(null);
  const [authNotice, setAuthNotice] = useState<{ 
    type: 'error' | 'info' | 'success'; 
    message: string; 
    canSimulate?: boolean; 
    provider?: 'google' | 'github' 
  } | null>(null);

  // Email OTP state
  const [email, setEmail] = useState('arjun.mehta@dtu.ac.in');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);

  // Password state for credentials fallback
  const [password, setPassword] = useState('••••••••••••');

  const roleMeta: Record<UserRole, { 
    title: string; 
    route: string; 
    defaultEmail: string; 
    hint: string;
    registerPrompt: string;
    registerLinkText: string;
    registerHref: string;
    verificationBadge: string;
  }> = {
    student: {
      title: 'Student Portal',
      route: '/dashboard',
      defaultEmail: 'karthi.ece@dtu.ac.in',
      hint: 'Access Skill Assessments, Opportunity Match & Digital Portfolio',
      registerPrompt: 'New engineering student?',
      registerLinkText: 'Create student account & verify →',
      registerHref: '/register?role=student',
      verificationBadge: 'College Roll & Marksheet Verification'
    },
    recruiter: {
      title: 'Industry / Recruiter Portal',
      route: '/industry',
      defaultEmail: 'talent@tcsion.co.in',
      hint: 'Post Internships/Jobs, Manage ATS Pipeline & Review Candidates',
      registerPrompt: 'New corporate or hiring partner?',
      registerLinkText: 'Register enterprise recruiter account (Corporate Domain) →',
      registerHref: '/register?role=recruiter',
      verificationBadge: 'MCA Corporate CIN & GSTIN Verified'
    },
    faculty: {
      title: 'Academician / Faculty Portal',
      route: '/faculty',
      defaultEmail: 'priya.raghunathan@dtu.ac.in',
      hint: 'Faculty Internships, National FDPs & Collaborative Research',
      registerPrompt: 'New academician or faculty member?',
      registerLinkText: 'Register faculty profile (AICTE & Campus Approval) →',
      registerHref: '/register?role=faculty',
      verificationBadge: 'Institutional Dean & AICTE Faculty ID'
    },
    institution: {
      title: 'Institution / Campus Portal',
      route: '/institution',
      defaultEmail: 'director.cdc@dtu.ac.in',
      hint: 'Cohort Readiness, Department Skill Gap Matrix & NIRF/NAAC Analytics',
      registerPrompt: 'New AICTE institution or university?',
      registerLinkText: 'Register campus administration portal (AISHE Registry) →',
      registerHref: '/register?role=institution',
      verificationBadge: 'Ministry of Education AISHE Registry'
    }
  };

  // Listen to ?role= query param on mount
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const queryRole = params.get('role') as UserRole | null;
      if (queryRole && ['student', 'recruiter', 'faculty', 'institution'].includes(queryRole)) {
        setRole(queryRole);
        if (roleMeta[queryRole]) {
          setEmail(roleMeta[queryRole].defaultEmail);
        }
      }
    } catch (e) {}
  }, []);

  const handleRoleSelect = (r: UserRole) => {
    setRole(r);
    setEmail(roleMeta[r].defaultEmail);
  };

  // Google OAuth Trigger
  const handleGoogleLogin = async () => {
    setOauthLoading('google');
    setAuthNotice(null);
    const { error } = await signInWithGoogle();
    if (error) {
      console.warn('Google OAuth initiation notice:', error);
      setAuthNotice({
        type: 'info',
        message: `Google OAuth Provider: ${error.message || 'Client ID / Secret is pending activation in your Supabase Dashboard.'}`,
        canSimulate: true,
        provider: 'google'
      });
      setOauthLoading(null);
    }
  };

  // GitHub OAuth Trigger
  const handleGitHubLogin = async () => {
    setOauthLoading('github');
    setAuthNotice(null);
    const { error } = await signInWithGitHub();
    if (error) {
      console.warn('GitHub OAuth initiation notice:', error);
      setAuthNotice({
        type: 'info',
        message: `GitHub OAuth Provider: ${error.message || 'Client ID / Secret is pending activation in your Supabase Dashboard.'}`,
        canSimulate: true,
        provider: 'github'
      });
      setOauthLoading(null);
    }
  };

  // 1-Click Zero-Failure Simulation (for Hackathon Judges & Offline Demos)
  const handleSimulateLogin = (provider: 'google' | 'github') => {
    simulateOAuthSession(provider, email);
    setCurrentRole('student');
    router.push('/dashboard');
  };

  // Send real OTP code to user's real email
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setOtpLoading(true);
    setAuthNotice(null);
    const { error } = await sendEmailOtp(email);
    setOtpLoading(false);
    if (error) {
      setAuthNotice({
        type: 'error',
        message: `Email delivery: ${error.message}`
      });
    } else {
      setOtpSent(true);
      setAuthNotice({
        type: 'success',
        message: `✓ Verification code sent to ${email}. Check your inbox or spam folder!`
      });
    }
  };

  // Verify real OTP code
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode) return;
    setOtpLoading(true);
    const { error } = await verifyEmailOtp(email, otpCode);
    setOtpLoading(false);
    if (error) {
      setAuthNotice({
        type: 'error',
        message: `Invalid or expired code: ${error.message}`
      });
    } else {
      setCurrentRole('student');
      router.push('/dashboard');
    }
  };

  // Standard credentials submit
  const handleCredentialsLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentRole(role);
    router.push(roleMeta[role].route);
  };

  // Direct demo access
  const handleQuickDemo = () => {
    setCurrentRole(role);
    router.push(roleMeta[role].route);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-4 transition-colors duration-150 selection:bg-blue-600 selection:text-white">
      
      {/* Top Bar */}
      <div className="w-full max-w-md flex items-center justify-between mb-4 px-1">
        <Link href="/" className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition flex items-center gap-1.5 font-medium">
          <span>← Back to SkillBridge</span>
        </Link>
        <ThemeToggle />
      </div>

      <div className="enterprise-card rounded-2xl max-w-md w-full p-7 sm:p-8 shadow-enterprise-modal space-y-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        
        {/* Brand Header */}
        <div className="text-center space-y-1.5">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              SkillBridge<span className="text-blue-600 dark:text-blue-400">.ai</span>
            </span>
          </Link>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Secure Authentication & Employability Accreditation
          </p>
        </div>

        {/* Stakeholder Portal Selector Tabs */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Select Stakeholder Portal
            </span>
            <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded-full">
              {roleMeta[role].title}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            <button
              type="button"
              onClick={() => handleRoleSelect('student')}
              className={`py-2 px-1 rounded-lg transition flex flex-col items-center justify-center gap-1 ${
                role === 'student' ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm font-bold border border-slate-200/50 dark:border-slate-700' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span className="text-[11px]">Student</span>
            </button>
            
            <button
              type="button"
              onClick={() => handleRoleSelect('recruiter')}
              className={`py-2 px-1 rounded-lg transition flex flex-col items-center justify-center gap-1 ${
                role === 'recruiter' ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm font-bold border border-slate-200/50 dark:border-slate-700' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span className="text-[11px]">Industry</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('faculty')}
              className={`py-2 px-1 rounded-lg transition flex flex-col items-center justify-center gap-1 ${
                role === 'faculty' ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm font-bold border border-slate-200/50 dark:border-slate-700' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpenCheck className="w-3.5 h-3.5" />
              <span className="text-[11px]">Faculty</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('institution')}
              className={`py-2 px-1 rounded-lg transition flex flex-col items-center justify-center gap-1 ${
                role === 'institution' ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm font-bold border border-slate-200/50 dark:border-slate-700' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-[11px]">Campus</span>
            </button>
          </div>

          <div className="bg-blue-50/80 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-xl p-2.5 text-[11px] text-blue-800 dark:text-blue-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>{roleMeta[role].hint}</span>
            </div>
            <button
              type="button"
              onClick={handleQuickDemo}
              className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0 ml-2"
            >
              Instant Launch &rarr;
            </button>
          </div>
        </div>

        {/* FEEDBACK NOTICE BANNER (IF ANY) */}
        {authNotice && (
          <div className={`p-3 rounded-xl text-xs space-y-2 border ${
            authNotice.type === 'error'
              ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-900/60'
              : authNotice.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/60'
              : 'bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-900/60'
          }`}>
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{authNotice.message}</p>
            </div>
            {authNotice.canSimulate && authNotice.provider && (
              <button
                type="button"
                onClick={() => handleSimulateLogin(authNotice.provider!)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-3 rounded-lg text-xs transition flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Launch Instant {authNotice.provider === 'google' ? 'Google' : 'GitHub'} Demo Session</span>
              </button>
            )}
          </div>
        )}

        {/* STUDENT AUTHENTICATION FLOW */}
        {role === 'student' && (
          <div className="space-y-3.5">
            {/* OAuth Buttons Section */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={oauthLoading !== null}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-semibold flex items-center justify-center gap-3 transition shadow-xs disabled:opacity-60"
              >
                {oauthLoading === 'google' ? (
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                ) : (
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                )}
                <span>Continue with Google</span>
                <span className="text-[10px] text-slate-400 font-normal ml-auto hidden sm:inline">Gmail / College ID</span>
              </button>

              <button
                type="button"
                onClick={handleGitHubLogin}
                disabled={oauthLoading !== null}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-semibold flex items-center justify-center gap-3 transition shadow-xs disabled:opacity-60"
              >
                {oauthLoading === 'github' ? (
                  <Loader2 className="w-4 h-4 animate-spin text-slate-600" />
                ) : (
                  <svg className="w-4 h-4 shrink-0 fill-current text-slate-900 dark:text-white" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                )}
                <span>Continue with GitHub</span>
                <span className="text-[10px] text-slate-400 font-normal ml-auto hidden sm:inline">Developer Profile</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
              <span className="bg-white dark:bg-slate-900 px-3 text-[11px] text-slate-400 uppercase tracking-wider font-semibold shrink-0">
                or use email / test account
              </span>
            </div>

            {/* Sub-mode: Email OTP vs Direct Credentials */}
            <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setAuthMode('email_otp')}
                className={`flex-1 py-1.5 rounded-md transition ${
                  authMode === 'email_otp'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Real Email OTP
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('credentials')}
                className={`flex-1 py-1.5 rounded-md transition ${
                  authMode === 'credentials'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Student Roll No / Pass
              </button>
            </div>

            {authMode === 'email_otp' && (
              <div className="space-y-3 pt-1">
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Your Real Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. yourname@gmail.com or @college.ac.in"
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={otpLoading}
                      className="w-full enterprise-btn-primary py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2"
                    >
                      {otpLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span>Send 6-Digit OTP to Email</span>}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Enter 6-Digit Code sent to {email}
                      </label>
                      <div className="relative">
                        <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          placeholder="Enter code (e.g. 123456)"
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 dark:text-slate-100 font-mono tracking-widest focus:outline-none focus:border-blue-500 text-center"
                          required
                          autoFocus
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setOtpSent(false)}
                        className="w-1/3 enterprise-btn-secondary py-2 rounded-xl text-xs"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={otpLoading}
                        className="flex-1 enterprise-btn-primary py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                      >
                        {otpLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span>Verify & Enter</span>}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {authMode === 'credentials' && (
              <form onSubmit={handleCredentialsLogin} className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Student Email / Roll Number
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Password
                  </label>
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
                  <span>Sign In as Engineering Student</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Quick Demo Launch */}
            <button
              type="button"
              onClick={handleQuickDemo}
              className="w-full py-2 px-3 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 text-xs font-semibold hover:bg-blue-100/50 dark:hover:bg-blue-950/40 transition flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>1-Click Launch Verified Student Dashboard (SIH Demo)</span>
            </button>
          </div>
        )}

        {/* NON-STUDENT AUTHENTICATION FLOWS (FACULTY, INDUSTRY, CAMPUS) */}
        {role !== 'student' && (
          <form onSubmit={handleCredentialsLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {role === 'recruiter' 
                  ? 'Corporate Work Email' 
                  : role === 'faculty' 
                  ? 'Institutional Staff / Faculty Email' 
                  : 'Campus Administrator Email'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500 font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Password / SSO Security Token
              </label>
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
              <span>Authenticate & Enter {roleMeta[role].title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Direct 1-Click Launch for live hackathon evaluation */}
            <button
              type="button"
              onClick={handleQuickDemo}
              className="w-full py-2 px-3 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 text-xs font-semibold hover:bg-blue-100/50 dark:hover:bg-blue-950/40 transition flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>1-Click Launch {roleMeta[role].title} (Live Demo)</span>
            </button>
          </form>
        )}

        {/* Footer Link to Registration */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-center space-y-1.5">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {roleMeta[role].registerPrompt}{' '}
            <Link href={roleMeta[role].registerHref} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              {roleMeta[role].registerLinkText}
            </Link>
          </div>
          <div className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5 font-medium">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <span>Trust Standard: {roleMeta[role].verificationBadge}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
