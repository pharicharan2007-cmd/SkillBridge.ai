'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  X
} from 'lucide-react';

export default function StudentRegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('Aditya Verma');
  const [email, setEmail] = useState('aditya.verma@dtu.ac.in');
  const [institution, setInstitution] = useState('Delhi Technological University (DTU)');
  const [password, setPassword] = useState('SecurePass#2026');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState(false);

  const recognizedDomains: Record<string, string> = {
    'dtu.ac.in': 'Delhi Technological University (DTU)',
    'iitd.ac.in': 'IIT Delhi',
    'iitb.ac.in': 'IIT Bombay',
    'nitt.edu': 'NIT Trichy',
    'iiit.ac.in': 'IIIT Hyderabad',
    'bits-pilani.ac.in': 'BITS Pilani',
    'nsut.ac.in': 'Netaji Subhas University of Technology (NSUT)'
  };

  const domain = email.includes('@') ? email.split('@')[1]?.toLowerCase() : '';
  const isRecognizedDomain = domain && (recognizedDomains[domain] || domain.endsWith('.ac.in') || domain.endsWith('.edu.in'));

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return { level: 0, text: 'Empty', color: 'bg-slate-700' };
    if (password.length < 6) return { level: 1, text: 'Weak', color: 'bg-rose-500' };
    if (password.length < 10) return { level: 2, text: 'Moderate', color: 'bg-amber-500' };
    return { level: 3, text: 'Strong', color: 'bg-emerald-500' };
  };
  const strength = getPasswordStrength();

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    setShowOtpModal(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length < 4) {
      setOtpError(true);
      return;
    }

    // Save initial registration to sessionStorage
    try {
      sessionStorage.setItem('skillbridge_reg_draft', JSON.stringify({
        name,
        email,
        institution,
        college: institution
      }));
    } catch (err) {}

    router.push('/onboarding');
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
          <span>Already registered?</span>
          <Link
            href="/login"
            className="text-white hover:text-indigo-300 font-medium transition"
          >
            Sign In →
          </Link>
        </div>
      </div>

      {/* Main Registration Card */}
      <div className="max-w-[460px] w-full mx-auto my-8 bg-[#0f121d] border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 space-y-6">
        
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-indigo-400 uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Engineering Student Registration</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Create Your Verified Profile
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Join the verified academia–industry network connecting engineering students with recruiters and national internships.
          </p>
        </div>

        <form onSubmit={handleInitialSubmit} className="space-y-4 text-xs">
          
          {/* Full Name */}
          <div className="space-y-1">
            <label className="block text-slate-300 font-medium">Full Legal Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aditya Verma"
                className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none transition"
              />
            </div>
          </div>

          {/* College / University Email */}
          <div className="space-y-1">
            <label className="block text-slate-300 font-medium">College / University Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rollno@dtu.ac.in or student@college.edu.in"
                className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none transition"
              />
            </div>
            
            {/* Domain recognition tag */}
            {isRecognizedDomain && (
              <div className="pt-1 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Accredited Engineering Domain Recognized</span>
              </div>
            )}
          </div>

          {/* Institution Selector */}
          <div className="space-y-1">
            <label className="block text-slate-300 font-medium">Affiliated Engineering Campus</label>
            <div className="relative">
              <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
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

          {/* Master Password */}
          <div className="space-y-1">
            <label className="block text-slate-300 font-medium">Create Secure Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none transition"
              />
            </div>

            {/* Password strength visual bar */}
            <div className="pt-1 flex items-center gap-2">
              <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden flex gap-1">
                <div className={`h-full flex-1 rounded-full ${strength.level >= 1 ? strength.color : 'bg-transparent'}`} />
                <div className={`h-full flex-1 rounded-full ${strength.level >= 2 ? strength.color : 'bg-transparent'}`} />
                <div className={`h-full flex-1 rounded-full ${strength.level >= 3 ? strength.color : 'bg-transparent'}`} />
              </div>
              <span className="text-[10px] text-slate-400 font-medium">{strength.text}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl text-xs shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2 group mt-2"
          >
            <span>Proceed to Identity Verification</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
          </button>
        </form>

        <div className="pt-2 border-t border-white/[0.06] text-center">
          <p className="text-[11px] text-slate-400 leading-relaxed">
            By registering, you agree to academic credential verification by your college Training & Placement Office (TPO).
          </p>
        </div>

      </div>

      {/* Footer */}
      <footer className="max-w-6xl w-full mx-auto text-center py-2 text-[11px] text-slate-400">
        SkillBridge.ai • Engineering & Technical Education Network
      </footer>

      {/* SIMULATED EMAIL OTP VERIFICATION MODAL */}
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
                <strong className="text-indigo-300 font-mono text-[11px]">{email}</strong>
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
