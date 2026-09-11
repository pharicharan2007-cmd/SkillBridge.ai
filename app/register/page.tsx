'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStudent } from '@/lib/context/StudentContext';
import { UserRole } from '@/types';
import { 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  Building, 
  CheckCircle2, 
  ShieldCheck, 
  GraduationCap,
  KeyRound,
  X,
  Loader2,
  AlertCircle,
  BookOpenCheck,
  Building2,
  Briefcase,
  Award,
  Globe,
  FileText
} from 'lucide-react';
import { signInWithGoogle, signInWithGitHub, simulateOAuthSession } from '@/lib/services/authService';

export default function MultiStakeholderRegisterPage() {
  const router = useRouter();
  const { setCurrentRole } = useStudent();

  // Active registration role tab
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');

  // ─── Student State ───
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentInstitution, setStudentInstitution] = useState('Delhi Technological University (DTU)');
  const [studentPassword, setStudentPassword] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState(false);

  // ─── Faculty State ───
  const [facultyName, setFacultyName] = useState('Dr. Priya Raghunathan');
  const [facultyEmail, setFacultyEmail] = useState('priya.raghunathan@dtu.ac.in');
  const [facultyInstitution, setFacultyInstitution] = useState('Delhi Technological University (DTU)');
  const [facultyDepartment, setFacultyDepartment] = useState('Electrical & Power Systems Engineering');
  const [facultyDesignation, setFacultyDesignation] = useState('Associate Professor');
  const [facultyEmpId, setFacultyEmpId] = useState('DTU-EE-042');
  const [facultyAicteId, setFacultyAicteId] = useState('FAC-1-9382104');
  const [facultyPassword, setFacultyPassword] = useState('');

  // ─── Industry Recruiter State ───
  const [recruiterName, setRecruiterName] = useState('Rajesh Nambiar');
  const [recruiterEmail, setRecruiterEmail] = useState('talent@tcsion.co.in');
  const [recruiterCompany, setRecruiterCompany] = useState('Tata Consultancy Services');
  const [recruiterDesignation, setRecruiterDesignation] = useState('Campus Talent Acquisition Lead');
  const [recruiterCin, setRecruiterCin] = useState('L74140MH1995PLC088345');
  const [recruiterWebsite, setRecruiterWebsite] = useState('https://www.tcs.com');
  const [recruiterPassword, setRecruiterPassword] = useState('');
  const [emailDomainError, setEmailDomainError] = useState<string | null>(null);

  // ─── Campus Admin State ───
  const [adminName, setAdminName] = useState('Prof. J. P. Saini');
  const [adminEmail, setAdminEmail] = useState('director.cdc@dtu.ac.in');
  const [adminInstitution, setAdminInstitution] = useState('Delhi Technological University (DTU)');
  const [adminAisheCode, setAdminAisheCode] = useState('C-32865');
  const [adminAictePid, setAdminAictePid] = useState('1-4296541');
  const [adminNaacGrade, setAdminNaacGrade] = useState('NAAC A+ (Score 3.42)');
  const [adminCampusCity, setAdminCampusCity] = useState('New Delhi, Delhi');
  const [adminPassword, setAdminPassword] = useState('');

  // Submitting state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [regSuccessNotice, setRegSuccessNotice] = useState<string | null>(null);

  // OAuth state (for students)
  const [oauthLoading, setOauthLoading] = useState<'google' | 'github' | null>(null);
  const [authNotice, setAuthNotice] = useState<{ message: string; provider?: 'google' | 'github' } | null>(null);

  // Read ?role= query param on mount
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const qRole = params.get('role') as UserRole | null;
      if (qRole && ['student', 'recruiter', 'faculty', 'institution'].includes(qRole)) {
        setSelectedRole(qRole);
      }
    } catch (e) {}
  }, []);

  // Google OAuth for students
  const handleGoogleSignup = async () => {
    setOauthLoading('google');
    setAuthNotice(null);
    const { error } = await signInWithGoogle();
    if (error) {
      setAuthNotice({
        message: `Google OAuth: ${error.message || 'Provider pending activation in Supabase Dashboard.'}`,
        provider: 'google'
      });
      setOauthLoading(null);
    }
  };

  // GitHub OAuth for students
  const handleGitHubSignup = async () => {
    setOauthLoading('github');
    setAuthNotice(null);
    const { error } = await signInWithGitHub();
    if (error) {
      setAuthNotice({
        message: `GitHub OAuth: ${error.message || 'Provider pending activation in Supabase Dashboard.'}`,
        provider: 'github'
      });
      setOauthLoading(null);
    }
  };

  const handleSimulateSignup = (provider: 'google' | 'github') => {
    const mockUser = simulateOAuthSession(provider);
    sessionStorage.setItem('skillbridge_reg_draft', JSON.stringify({
      name: mockUser.user_metadata.name,
      email: mockUser.email,
      institution: 'Delhi Technological University (DTU)',
      college: 'Delhi Technological University (DTU)'
    }));
    router.push('/onboarding');
  };

  const recognizedDomains: Record<string, string> = {
    'dtu.ac.in': 'Delhi Technological University (DTU)',
    'iitd.ac.in': 'IIT Delhi',
    'iitb.ac.in': 'IIT Bombay',
    'nitt.edu': 'NIT Trichy',
    'iiit.ac.in': 'IIIT Hyderabad',
    'bits-pilani.ac.in': 'BITS Pilani',
    'nsut.ac.in': 'Netaji Subhas University of Technology (NSUT)'
  };

  const domain = studentEmail.includes('@') ? studentEmail.split('@')[1]?.toLowerCase() : '';
  const isRecognizedDomain = domain && (recognizedDomains[domain] || domain.endsWith('.ac.in') || domain.endsWith('.edu.in'));

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { level: 0, text: 'Empty', color: 'bg-slate-700' };
    if (pwd.length < 6) return { level: 1, text: 'Weak', color: 'bg-rose-500' };
    if (pwd.length < 10) return { level: 2, text: 'Moderate', color: 'bg-amber-500' };
    return { level: 3, text: 'Strong', color: 'bg-emerald-500' };
  };

  // 1. Handle Student Registration
  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentEmail || !studentPassword) return;
    setShowOtpModal(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length < 4) {
      setOtpError(true);
      return;
    }

    try {
      sessionStorage.setItem('skillbridge_reg_draft', JSON.stringify({
        name: studentName,
        email: studentEmail,
        institution: studentInstitution,
        college: studentInstitution
      }));
    } catch (err) {}

    setCurrentRole('student');
    router.push('/onboarding');
  };

  // 2. Handle Faculty Registration
  const handleFacultySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const facultyProfile = {
      name: facultyName,
      email: facultyEmail,
      institution: facultyInstitution,
      department: facultyDepartment,
      designation: facultyDesignation,
      employeeId: facultyEmpId,
      aicteFacultyId: facultyAicteId,
      verificationStatus: 'Pending Dean Approval'
    };

    try {
      localStorage.setItem('skillbridge_faculty_profile', JSON.stringify(facultyProfile));
      localStorage.setItem('skillbridge_role', 'faculty');
    } catch (err) {}

    setCurrentRole('faculty');
    setRegSuccessNotice('Faculty profile registered! Institutional Dean credential verification initiated.');

    setTimeout(() => {
      router.push('/faculty');
    }, 800);
  };

  // 3. Handle Recruiter Registration
  const handleRecruiterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailDomainError(null);

    // Reject free webmail domains for corporate accounts
    const freeDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'rediffmail.com'];
    const recruiterDomain = recruiterEmail.split('@')[1]?.toLowerCase();
    if (freeDomains.includes(recruiterDomain)) {
      setEmailDomainError('Free webmail addresses (gmail, yahoo, etc.) are prohibited for enterprise recruiter accounts. Please enter your official corporate domain.');
      return;
    }

    setIsSubmitting(true);

    const recruiterProfile = {
      name: recruiterName,
      email: recruiterEmail,
      company: recruiterCompany,
      designation: recruiterDesignation,
      cin: recruiterCin,
      website: recruiterWebsite,
      verificationStatus: 'MCA21 Verified'
    };

    try {
      localStorage.setItem('skillbridge_recruiter_profile', JSON.stringify(recruiterProfile));
      localStorage.setItem('skillbridge_role', 'recruiter');
    } catch (err) {}

    setCurrentRole('recruiter');
    setRegSuccessNotice('Enterprise Recruiter account verified & authenticated.');

    setTimeout(() => {
      router.push('/industry');
    }, 800);
  };

  // 4. Handle Campus Admin Registration
  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const adminProfile = {
      name: adminName,
      email: adminEmail,
      institution: adminInstitution,
      aisheCode: adminAisheCode,
      aictePid: adminAictePid,
      naacGrade: adminNaacGrade,
      city: adminCampusCity,
      verificationStatus: 'AISHE Verified'
    };

    try {
      localStorage.setItem('skillbridge_admin_profile', JSON.stringify(adminProfile));
      localStorage.setItem('skillbridge_role', 'institution');
    } catch (err) {}

    setCurrentRole('institution');
    setRegSuccessNotice('Campus Administrator portal initialized with AISHE registry.');

    setTimeout(() => {
      router.push('/institution');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col justify-between p-4 sm:p-6 selection:bg-indigo-500 selection:text-white">
      
      {/* Top Header */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between py-2">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-base font-semibold text-white tracking-tight">
            SkillBridge<span className="text-indigo-400">.ai</span>
          </span>
        </Link>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span>Already have an account?</span>
          <Link
            href={`/login?role=${selectedRole}`}
            className="text-white hover:text-indigo-300 font-medium transition"
          >
            Sign In →
          </Link>
        </div>
      </div>

      {/* Main Registration Card */}
      <div className="max-w-[500px] w-full mx-auto my-6 bg-[#0f121d] border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 space-y-5">
        
        {/* Header Title */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-950/60 text-indigo-300 border border-indigo-800/60 font-mono uppercase tracking-wider">
            <span>Credential Registration & Trust Verification</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Create Your SkillBridge Account
          </h1>
          <p className="text-xs text-slate-400">
            Select your stakeholder persona to initiate role-specific verification.
          </p>
        </div>

        {/* 4-Role Persona Switcher Tabs */}
        <div className="grid grid-cols-4 gap-1.5 p-1 bg-[#141824] rounded-2xl border border-white/[0.06]">
          <button
            type="button"
            onClick={() => setSelectedRole('student')}
            className={`py-2 px-1 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 transition ${
              selectedRole === 'student'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span className="text-[11px]">Student</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('recruiter')}
            className={`py-2 px-1 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 transition ${
              selectedRole === 'recruiter'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span className="text-[11px]">Industry</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('faculty')}
            className={`py-2 px-1 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 transition ${
              selectedRole === 'faculty'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
            }`}
          >
            <BookOpenCheck className="w-4 h-4" />
            <span className="text-[11px]">Faculty</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('institution')}
            className={`py-2 px-1 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 transition ${
              selectedRole === 'institution'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[11px]">Campus</span>
          </button>
        </div>

        {/* Success Banner */}
        {regSuccessNotice && (
          <div className="p-3 rounded-xl text-xs bg-emerald-950/60 text-emerald-200 border border-emerald-800/80 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{regSuccessNotice}</span>
          </div>
        )}

        {/* ─── ROLE 1: STUDENT REGISTRATION FORM ─── */}
        {selectedRole === 'student' && (
          <div className="space-y-4">
            {/* OAuth buttons */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleGoogleSignup}
                disabled={!!oauthLoading}
                className="w-full bg-[#141824] hover:bg-[#1a2030] text-slate-200 font-medium py-2 px-3 rounded-xl border border-white/[0.08] text-xs transition flex items-center justify-center gap-2 shadow-sm"
              >
                {oauthLoading === 'google' ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                )}
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={handleGitHubSignup}
                disabled={!!oauthLoading}
                className="w-full bg-[#141824] hover:bg-[#1a2030] text-slate-200 font-medium py-2 px-3 rounded-xl border border-white/[0.08] text-xs transition flex items-center justify-center gap-2 shadow-sm"
              >
                {oauthLoading === 'github' ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                )}
                <span>Continue with GitHub</span>
              </button>
            </div>

            {authNotice && (
              <div className="p-3 rounded-xl text-xs space-y-2 border bg-indigo-950/40 text-indigo-200 border-indigo-900/60">
                <p>{authNotice.message}</p>
                {authNotice.provider && (
                  <button
                    type="button"
                    onClick={() => handleSimulateSignup(authNotice.provider!)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-1.5 px-3 rounded-lg text-xs transition"
                  >
                    Launch Verified Student Demo Session
                  </button>
                )}
              </div>
            )}

            <div className="relative flex items-center justify-center">
              <div className="border-t border-white/[0.08] w-full" />
              <span className="bg-[#0f121d] px-3 text-[10px] text-slate-500 uppercase tracking-wider font-semibold shrink-0">
                or register with college email
              </span>
            </div>

            <form onSubmit={handleStudentSubmit} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="block text-slate-300 font-medium">Full Legal Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Aditya Verma"
                    className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-300 font-medium">College / University Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    placeholder="rollno@dtu.ac.in or student@college.edu.in"
                    className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none transition"
                  />
                </div>
                {isRecognizedDomain && (
                  <div className="pt-1 flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Accredited Engineering Campus Recognized</span>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-slate-300 font-medium">Affiliated Engineering Campus</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={studentInstitution}
                    onChange={(e) => setStudentInstitution(e.target.value)}
                    className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none cursor-pointer appearance-none transition"
                  >
                    <option value="Delhi Technological University (DTU)">Delhi Technological University (DTU)</option>
                    <option value="IIT Delhi">Indian Institute of Technology (IIT) Delhi</option>
                    <option value="IIT Bombay">Indian Institute of Technology (IIT) Bombay</option>
                    <option value="NIT Trichy">National Institute of Technology (NIT) Trichy</option>
                    <option value="BITS Pilani">BITS Pilani</option>
                    <option value="IIIT Hyderabad">IIIT Hyderabad</option>
                    <option value="NSUT Delhi">Netaji Subhas University of Technology (NSUT)</option>
                    <option value="Other AICTE Engineering College">Other AICTE / State Technical University</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-300 font-medium">Create Secure Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="Create password (min 6 characters)"
                    value={studentPassword}
                    onChange={(e) => setStudentPassword(e.target.value)}
                    className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none transition"
                  />
                </div>
                <div className="pt-1 flex items-center gap-2">
                  <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden flex gap-1">
                    <div className={`h-full flex-1 rounded-full ${getPasswordStrength(studentPassword).level >= 1 ? getPasswordStrength(studentPassword).color : 'bg-transparent'}`} />
                    <div className={`h-full flex-1 rounded-full ${getPasswordStrength(studentPassword).level >= 2 ? getPasswordStrength(studentPassword).color : 'bg-transparent'}`} />
                    <div className={`h-full flex-1 rounded-full ${getPasswordStrength(studentPassword).level >= 3 ? getPasswordStrength(studentPassword).color : 'bg-transparent'}`} />
                  </div>
                  <span className="text-[10px] text-slate-400">{getPasswordStrength(studentPassword).text}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl text-xs shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2 mt-2"
              >
                <span>Proceed to Student Verification</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* ─── ROLE 2: FACULTY / ACADEMICIAN REGISTRATION FORM ─── */}
        {selectedRole === 'faculty' && (
          <form onSubmit={handleFacultySubmit} className="space-y-3.5 text-xs">
            <div className="bg-indigo-950/40 border border-indigo-900/60 rounded-xl p-3 text-[11px] text-indigo-200 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-white">
                <BookOpenCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>Institutional Academician Credential Gate</span>
              </div>
              <p className="leading-relaxed text-slate-300">
                Faculty accounts undergo verification by your college Dean / Admin. Authorized faculties can endorse student skill proficiencies, apply for corporate sabbaticals, and submit joint R&D bids.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-slate-300 font-medium">Faculty Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={facultyName}
                  onChange={(e) => setFacultyName(e.target.value)}
                  placeholder="e.g. Dr. Priya Raghunathan"
                  className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-slate-300 font-medium">Institutional Staff Email</label>
                <input
                  type="email"
                  required
                  value={facultyEmail}
                  onChange={(e) => setFacultyEmail(e.target.value)}
                  placeholder="priya.r@dtu.ac.in"
                  className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-slate-300 font-medium">Affiliated Institution / Campus</label>
                <select
                  value={facultyInstitution}
                  onChange={(e) => setFacultyInstitution(e.target.value)}
                  className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none cursor-pointer"
                >
                  <option value="Delhi Technological University (DTU)">Delhi Technological University (DTU)</option>
                  <option value="IIT Delhi">IIT Delhi</option>
                  <option value="IIT Bombay">IIT Bombay</option>
                  <option value="NIT Trichy">NIT Trichy</option>
                  <option value="BITS Pilani">BITS Pilani</option>
                  <option value="NSUT Delhi">NSUT Delhi</option>
                  <option value="Other AICTE Engineering College">Other AICTE Engineering College</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-300 font-medium">Academic Department</label>
                <select
                  value={facultyDepartment}
                  onChange={(e) => setFacultyDepartment(e.target.value)}
                  className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none cursor-pointer"
                >
                  <option value="Electrical & Power Systems Engineering">Electrical & Power Systems</option>
                  <option value="Electronics & Communication (VLSI & Embedded)">Electronics & Communication (ECE)</option>
                  <option value="Computer Science & Information Technology">Computer Science & IT</option>
                  <option value="Mechanical, Robotics & Automotive EV">Mechanical & Robotics</option>
                  <option value="Civil & Smart Infrastructure">Civil & Smart Infrastructure</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="block text-slate-300 font-medium">Academic Designation</label>
                <select
                  value={facultyDesignation}
                  onChange={(e) => setFacultyDesignation(e.target.value)}
                  className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none cursor-pointer"
                >
                  <option value="Assistant Professor">Assistant Professor</option>
                  <option value="Associate Professor">Associate Professor</option>
                  <option value="Professor">Professor</option>
                  <option value="Head of Department (HOD)">Head of Department</option>
                  <option value="Dean of Research">Dean of Research</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-300 font-medium">Staff Employee ID</label>
                <input
                  type="text"
                  required
                  value={facultyEmpId}
                  onChange={(e) => setFacultyEmpId(e.target.value)}
                  placeholder="e.g. DTU-EE-042"
                  className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-slate-300 font-medium">AICTE Faculty ID (FAC ID)</label>
                <input
                  type="text"
                  required
                  value={facultyAicteId}
                  onChange={(e) => setFacultyAicteId(e.target.value)}
                  placeholder="FAC-1-9382104"
                  className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono text-indigo-300"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-slate-300 font-medium">Set Portal Password</label>
              <input
                type="password"
                required
                value={facultyPassword}
                onChange={(e) => setFacultyPassword(e.target.value)}
                placeholder="Create secure portal password"
                className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl text-xs shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2 mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Registering Faculty Credentials...</span>
                </>
              ) : (
                <>
                  <span>Register Academician Profile & Submit to Dean</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* ─── ROLE 3: INDUSTRY RECRUITER REGISTRATION FORM ─── */}
        {selectedRole === 'recruiter' && (
          <form onSubmit={handleRecruiterSubmit} className="space-y-3.5 text-xs">
            <div className="bg-indigo-950/40 border border-indigo-900/60 rounded-xl p-3 text-[11px] text-indigo-200 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-white">
                <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Enterprise Recruiter & MCA21 Corporate Verification</span>
              </div>
              <p className="leading-relaxed text-slate-300">
                Authorizes posting verified AICTE internships, Pre-Placement Offers (PPOs), and joint research RFPs. Free personal domains (gmail, yahoo) are blocked to maintain student safety.
              </p>
            </div>

            {emailDomainError && (
              <div className="p-3 rounded-xl text-xs bg-rose-950/70 border border-rose-800 text-rose-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <p>{emailDomainError}</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-slate-300 font-medium">Recruiter Legal Name</label>
                <input
                  type="text"
                  required
                  value={recruiterName}
                  onChange={(e) => setRecruiterName(e.target.value)}
                  placeholder="e.g. Rajesh Nambiar"
                  className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-slate-300 font-medium">Corporate Work Email</label>
                <input
                  type="email"
                  required
                  value={recruiterEmail}
                  onChange={(e) => setRecruiterEmail(e.target.value)}
                  placeholder="talent@company.com"
                  className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-slate-300 font-medium">Company / Organization</label>
                <input
                  type="text"
                  required
                  value={recruiterCompany}
                  onChange={(e) => setRecruiterCompany(e.target.value)}
                  placeholder="e.g. Tata Consultancy Services"
                  className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-slate-300 font-medium">Corporate Designation</label>
                <input
                  type="text"
                  required
                  value={recruiterDesignation}
                  onChange={(e) => setRecruiterDesignation(e.target.value)}
                  placeholder="e.g. University Relations Lead"
                  className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-slate-300 font-medium">Corporate CIN / GSTIN (MCA21)</label>
                <input
                  type="text"
                  required
                  value={recruiterCin}
                  onChange={(e) => setRecruiterCin(e.target.value)}
                  placeholder="L74140MH1995PLC088345"
                  className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono text-indigo-300 uppercase"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-slate-300 font-medium">Company Official Website</label>
                <input
                  type="url"
                  required
                  value={recruiterWebsite}
                  onChange={(e) => setRecruiterWebsite(e.target.value)}
                  placeholder="https://company.com"
                  className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-slate-300 font-medium">Create Secure Password</label>
              <input
                type="password"
                required
                value={recruiterPassword}
                onChange={(e) => setRecruiterPassword(e.target.value)}
                placeholder="Create enterprise password"
                className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl text-xs shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2 mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Validating MCA21 Entity...</span>
                </>
              ) : (
                <>
                  <span>Register Enterprise Recruiter Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* ─── ROLE 4: CAMPUS ADMIN REGISTRATION FORM ─── */}
        {selectedRole === 'institution' && (
          <form onSubmit={handleAdminSubmit} className="space-y-3.5 text-xs">
            <div className="bg-indigo-950/40 border border-indigo-900/60 rounded-xl p-3 text-[11px] text-indigo-200 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-white">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>Institutional Administration & AISHE Statutory Anchor</span>
              </div>
              <p className="leading-relaxed text-slate-300">
                For College Deans, Directors, and TPO Heads. Authorizes university-wide student UID credential issuance, faculty sabbatical approvals, and NAAC/NIRF employability analytics.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-slate-300 font-medium">Authorized Administrator Name</label>
                <input
                  type="text"
                  required
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  placeholder="e.g. Prof. J. P. Saini"
                  className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-slate-300 font-medium">Official Registrar / TPO Email</label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="director.cdc@dtu.ac.in"
                  className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-slate-300 font-medium">Institution / University Legal Name</label>
              <input
                type="text"
                required
                value={adminInstitution}
                onChange={(e) => setAdminInstitution(e.target.value)}
                placeholder="e.g. Delhi Technological University (DTU)"
                className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-slate-300 font-medium">AISHE Code (Ministry of Education)</label>
                <input
                  type="text"
                  required
                  value={adminAisheCode}
                  onChange={(e) => setAdminAisheCode(e.target.value)}
                  placeholder="C-32865"
                  className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono text-indigo-300 uppercase"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-slate-300 font-medium">AICTE Permanent Institute ID (PID)</label>
                <input
                  type="text"
                  required
                  value={adminAictePid}
                  onChange={(e) => setAdminAictePid(e.target.value)}
                  placeholder="1-4296541"
                  className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono text-indigo-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-slate-300 font-medium">NAAC / NIRF Accreditation Standing</label>
                <input
                  type="text"
                  required
                  value={adminNaacGrade}
                  onChange={(e) => setAdminNaacGrade(e.target.value)}
                  placeholder="e.g. NAAC A+ (Score 3.42)"
                  className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-slate-300 font-medium">Campus Location (City, State)</label>
                <input
                  type="text"
                  required
                  value={adminCampusCity}
                  onChange={(e) => setAdminCampusCity(e.target.value)}
                  placeholder="New Delhi, Delhi"
                  className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-slate-300 font-medium">Set Administration Password</label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Create administration password"
                className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl text-xs shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2 mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying AISHE Records...</span>
                </>
              ) : (
                <>
                  <span>Register Institutional Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        <div className="pt-2 border-t border-white/[0.06] text-center">
          <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
            Verified AICTE & Ministry of Education Multi-Stakeholder Collaboration Protocol
          </p>
        </div>

      </div>

      {/* Footer */}
      <footer className="max-w-6xl w-full mx-auto text-center py-2 text-[11px] text-slate-400">
        SkillBridge.ai • Engineering & Technical Education Network
      </footer>

      {/* SIMULATED EMAIL OTP VERIFICATION MODAL (For Students) */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f121d] border border-slate-700 rounded-3xl max-w-sm w-full p-6 sm:p-7 space-y-5 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-white">Confirm Campus Email</h3>
              </div>
              <button onClick={() => setShowOtpModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p className="text-slate-300 leading-relaxed">
                A verification code has been dispatched to:
                <br />
                <strong className="text-indigo-300 font-mono text-[11px]">{studentEmail}</strong>
              </p>
              
              <div className="bg-[#141824] border border-white/[0.06] p-2.5 rounded-xl text-[11px] text-slate-400 flex items-center justify-between">
                <span>Demo Code: <strong className="text-emerald-400 font-mono">884210</strong></span>
                <button
                  type="button"
                  onClick={() => setOtpCode('884210')}
                  className="text-indigo-400 hover:underline font-semibold"
                >
                  Auto Fill
                </button>
              </div>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-[11px] text-slate-300 mb-1">Enter 6-Digit Code</label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  placeholder="884210"
                  value={otpCode}
                  onChange={(e) => {
                    setOtpCode(e.target.value);
                    setOtpError(false);
                  }}
                  className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-4 py-2.5 text-center text-base font-mono tracking-widest text-white focus:outline-none transition"
                />
                {otpError && (
                  <span className="text-[10px] text-rose-400 mt-1 block">Please enter a valid code</span>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl text-xs shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2"
              >
                <span>Verify & Launch Onboarding</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
