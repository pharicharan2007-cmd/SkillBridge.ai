'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStudent } from '@/lib/context/StudentContext';
import { UserRole } from '@/types';
import { 
  Bell, 
  Search, 
  Sparkles, 
  GraduationCap, 
  Building2, 
  BookOpenCheck, 
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Layers
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const { currentRole, setCurrentRole, student, applications } = useStudent();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const roles: { role: UserRole; label: string; icon: any; route: string; badge: string }[] = [
    { role: 'student', label: 'Student', icon: GraduationCap, route: '/dashboard', badge: 'Active Learner' },
    { role: 'recruiter', label: 'Industry Recruiter', icon: Building2, route: '/industry', badge: 'Employer Portal' },
    { role: 'faculty', label: 'Academician / Faculty', icon: BookOpenCheck, route: '/faculty', badge: 'Research & FDP' },
    { role: 'institution', label: 'Institution Admin', icon: ShieldCheck, route: '/institution', badge: 'Campus Analytics' },
  ];

  const currentRoleMeta = roles.find(r => r.role === currentRole) || roles[0];
  const CurrentIcon = currentRoleMeta.icon;

  const handleSwitchRole = (r: typeof roles[0]) => {
    setCurrentRole(r.role);
    setShowRoleMenu(false);
    router.push(r.route);
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-[#090a0f]/95 backdrop-blur-md border-b border-white/[0.06] text-white">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Search Bar & Role Switcher Dropdown */}
        <div className="flex items-center gap-3 flex-1 max-w-2xl">
          <div className="relative w-full hidden md:block max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search skills, opportunities, FDPs..."
              className="w-full bg-[#11141e] text-slate-200 text-xs rounded-lg pl-8 pr-3 py-1.5 border border-white/[0.07] focus:outline-none focus:border-indigo-500/60 placeholder-slate-400 transition"
            />
          </div>
          
          {/* Quick Persona Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 bg-indigo-950/80 hover:bg-indigo-900/80 border border-indigo-700/60 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-200 transition shadow-sm"
              title="Click to switch persona (Student, Industry, Academician, Institution)"
            >
              <CurrentIcon className="w-3.5 h-3.5 text-indigo-400" />
              <span>Role: <strong className="text-white">{currentRoleMeta.label}</strong></span>
              <ChevronDown className="w-3 h-3 text-indigo-400 ml-0.5 opacity-80" />
            </button>

            {/* Role Switcher Menu */}
            {showRoleMenu && (
              <div className="absolute left-0 mt-2 w-64 bg-[#0d101b] border border-slate-700/80 rounded-xl shadow-2xl p-2 z-50 animate-fadeIn">
                <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Switch Active Persona
                </div>
                <div className="space-y-1 mt-1">
                  {roles.map(r => {
                    const Icon = r.icon;
                    const isActive = currentRole === r.role;
                    return (
                      <button
                        key={r.role}
                        onClick={() => handleSwitchRole(r)}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition ${
                          isActive
                            ? 'bg-indigo-600 text-white font-bold shadow'
                            : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-indigo-300" />
                          <div>
                            <div className="leading-tight">{r.label}</div>
                            <div className="text-[10px] opacity-70 font-normal">{r.badge}</div>
                          </div>
                        </div>
                        {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Section: Role Quick Pills, Notification Bell & User Profile */}
        <div className="flex items-center gap-3">
          
          {/* Student Readiness Score or Industry Post Action */}
          {currentRole === 'student' && (
            <Link 
              href="/assessment" 
              className="hidden sm:flex items-center gap-1.5 bg-[#141824] hover:bg-[#1a2030] border border-white/[0.08] px-3 py-1 rounded-md text-xs font-medium text-slate-300 transition"
            >
              <span className="text-slate-400 font-normal">Readiness:</span>
              <span className="font-semibold text-emerald-400 tabular-nums">{student.readinessScore}/100</span>
            </Link>
          )}

          {currentRole === 'recruiter' && (
            <Link 
              href="/industry" 
              className="hidden sm:flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-md text-xs font-semibold shadow transition"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>+ Post Opportunity</span>
            </Link>
          )}

          {currentRole === 'faculty' && (
            <Link 
              href="/faculty" 
              className="hidden sm:flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-md text-xs font-semibold shadow transition"
            >
              <BookOpenCheck className="w-3.5 h-3.5" />
              <span>Explore FDPs</span>
            </Link>
          )}

          {currentRole === 'institution' && (
            <Link 
              href="/institution" 
              className="hidden sm:flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-md text-xs font-semibold shadow transition"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>AIIA Analytics</span>
            </Link>
          )}

          {/* Notifications Button & Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/[0.05] transition"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-400 rounded-full" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#0d101b] border border-slate-700/80 rounded-xl shadow-2xl p-3 z-50 animate-fadeIn text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] mb-2 font-bold text-white">
                  <span>Notifications</span>
                  <span className="text-[10px] text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded-full">3 New</span>
                </div>
                <div className="space-y-2">
                  <div className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.05] space-y-0.5">
                    <div className="font-semibold text-white">Interview Scheduled</div>
                    <div className="text-[11px] text-slate-400">NextGen Systems scheduled Final Round on Sept 08.</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.05] space-y-0.5">
                    <div className="font-semibold text-white">FDP Approval</div>
                    <div className="text-[11px] text-slate-400">All India Institute of Ayurveda approved your FDP seat.</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.05] space-y-0.5">
                    <div className="font-semibold text-white">Skill Gap Alert</div>
                    <div className="text-[11px] text-slate-400">High hiring surge for TensorFlow & Healthcare EHR.</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Trigger */}
          <Link href={currentRole === 'student' ? '/profile' : currentRoleMeta.route} className="flex items-center gap-2.5 pl-2 border-l border-white/[0.06] hover:opacity-90 transition">
            <div className="relative">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-white/[0.15]"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 border-2 border-[#090a0f] rounded-full" />
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-medium text-slate-200 leading-none">
                {currentRole === 'student' ? student.name : currentRole === 'faculty' ? 'Dr. Sunita Deshmukh' : currentRole === 'recruiter' ? 'Talent Acquisition Team' : 'AIIA Directorate'}
              </div>
              <div className="text-[10px] text-slate-400 mt-1 truncate max-w-[130px]">
                {currentRoleMeta.label}
              </div>
            </div>
          </Link>

        </div>
      </div>
    </header>
  );
};
