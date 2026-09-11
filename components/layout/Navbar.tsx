'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStudent } from '@/lib/context/StudentContext';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { UserRole } from '@/types';
import { 
  Bell, 
  Search, 
  GraduationCap, 
  Building2, 
  BookOpenCheck, 
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Award,
  LogOut,
  User
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const { currentRole, setCurrentRole, student, logout } = useStudent();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = async () => {
    setShowUserMenu(false);
    await logout();
    router.push('/login');
  };

  const roles: { role: UserRole; label: string; icon: any; route: string; badge: string }[] = [
    { role: 'student', label: 'Student', icon: GraduationCap, route: '/dashboard', badge: 'Student Portal' },
    { role: 'recruiter', label: 'Industry Recruiter', icon: Building2, route: '/recruiter', badge: 'Live DB Hiring' },
    { role: 'faculty', label: 'Faculty / Academician', icon: BookOpenCheck, route: '/faculty', badge: 'Live Endorsements' },
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
    <header className="sticky top-0 z-30 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 transition-colors duration-150">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Search Bar & Role Switcher Dropdown */}
        <div className="flex items-center gap-3 flex-1 max-w-2xl">
          <div className="relative w-full hidden md:block max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search skills, opportunities, FDPs..."
              className="w-full bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs rounded-lg pl-8 pr-3 py-1.5 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 placeholder-slate-400 dark:placeholder-slate-500 transition"
            />
          </div>
          
          {/* Quick Persona Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 transition shadow-sm"
              title="Click to switch portal (Student, Industry, Faculty, Institution)"
            >
              <CurrentIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Portal: <strong className="text-slate-900 dark:text-white">{currentRoleMeta.label}</strong></span>
              <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
            </button>

            {/* Role Switcher Menu */}
            {showRoleMenu && (
              <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-enterprise-modal p-2 z-50">
                <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Switch Active Portal
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
                            ? 'bg-blue-600 dark:bg-blue-600 text-white font-bold shadow-sm'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-blue-200' : 'text-slate-400 dark:text-slate-500'}`} />
                          <div>
                            <div className="leading-tight">{r.label}</div>
                            <div className={`text-[10px] font-normal ${isActive ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'}`}>{r.badge}</div>
                          </div>
                        </div>
                        {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-blue-200 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Role-specific quick action */}
          {currentRole === 'student' && (
            <Link 
              href="/assessment" 
              className="hidden sm:flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-md text-xs font-medium text-slate-600 dark:text-slate-300 transition"
            >
              <span className="text-slate-500 dark:text-slate-400 font-normal">Readiness:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">{student.readinessScore}/100</span>
            </Link>
          )}

          {currentRole === 'recruiter' && (
            <Link 
              href="/industry" 
              className="hidden sm:flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-sm transition"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>+ Post Opportunity</span>
            </Link>
          )}

          {currentRole === 'faculty' && (
            <Link 
              href="/faculty" 
              className="hidden sm:flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-sm transition"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Browse FDPs & Grants</span>
            </Link>
          )}

          {currentRole === 'institution' && (
            <Link 
              href="/institution" 
              className="hidden sm:flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-sm transition"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DTU Analytics</span>
            </Link>
          )}

          {/* Theme Toggle (Light / Dark Mode Switch) */}
          <ThemeToggle />

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-enterprise-modal p-3 z-50 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-2 font-bold text-slate-800 dark:text-slate-100">
                  <span>Notifications</span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 px-2 py-0.5 rounded-full">3 New</span>
                </div>
                <div className="space-y-2">
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 space-y-0.5">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">TCS NQT: Final Interview Scheduled</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">TCS iON Campus Team confirmed Final Round on Sept 14.</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 space-y-0.5">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">AICTE FDP Seat Confirmed</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Dr. Priya Raghunathan approved for VLSI FDP at IIT Bombay, Oct 14.</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 space-y-0.5">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">Qualcomm Drive Opens</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Qualcomm India campus hiring for VLSI Interns opens Oct 10 via DTU CDC.</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Menu */}
          <div className="relative pl-2 border-l border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowRoleMenu(false);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2.5 hover:opacity-90 transition p-1 rounded-lg focus:outline-none"
              title="Account & Profile Settings"
            >
              <div className="relative">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-none flex items-center gap-1">
                  <span>
                    {currentRole === 'student' ? student.name 
                      : currentRole === 'faculty' ? 'Dr. Priya Raghunathan' 
                      : currentRole === 'recruiter' ? 'TCS iON Campus Team' 
                      : 'DTU — Office of Career Services'}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 truncate max-w-[130px]">
                  {currentRole === 'student' ? `${student.branch} • ${student.institution}`
                    : currentRole === 'faculty' ? 'EED, Delhi Technological University'
                    : currentRole === 'recruiter' ? 'Tata Consultancy Services'
                    : 'AICTE Affiliated · NAAC A+'}
                </div>
              </div>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150 space-y-3">
                {/* User Summary */}
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800 space-y-1">
                  <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                    {currentRole === 'student' ? student.name : currentRoleMeta.label}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {student.email || 'aditya.v@dtu.ac.in'}
                  </div>
                  {currentRole === 'student' && student.studentUid && (
                    <div className="pt-1">
                      <div className="text-[10px] font-mono font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 px-2 py-0.5 rounded flex items-center justify-between">
                        <span>UID: {student.studentUid}</span>
                        <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-sans">AICTE</span>
                      </div>
                    </div>
                  )}
                  <div className="pt-1 flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      <span>Verified Auth</span>
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">
                      {currentRoleMeta.badge}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-1 text-xs">
                  <Link
                    href="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition"
                  >
                    <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>View Full Profile & Verification</span>
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>Student Dashboard</span>
                  </Link>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 pt-2">
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-semibold transition text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
