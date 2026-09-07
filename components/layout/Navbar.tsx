'use client';

import React from 'react';
import Link from 'next/link';
import { useStudent } from '@/lib/context/StudentContext';
import { Bell, Search, UserCheck, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { student } = useStudent();

  return (
    <header className="sticky top-0 z-30 w-full bg-[#090a0f]/90 backdrop-blur-md border-b border-white/[0.06] text-white">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Search Bar & Role Pill */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <div className="relative w-full hidden md:block max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search skills, opportunities, or certifications..."
              className="w-full bg-[#11141e] text-slate-200 text-xs rounded-lg pl-8 pr-3 py-1.5 border border-white/[0.07] focus:outline-none focus:border-indigo-500/60 placeholder-slate-400 transition"
            />
          </div>
          
          <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.07] px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span>Student Portal</span>
          </div>
        </div>

        {/* Right Section: Readiness Badge & User Profile */}
        <div className="flex items-center gap-3">
          
          {/* Quick Readiness Score Pill */}
          <Link 
            href="/assessment" 
            className="hidden sm:flex items-center gap-1.5 bg-[#141824] hover:bg-[#1a2030] border border-white/[0.08] px-3 py-1 rounded-md text-xs font-medium text-slate-300 transition"
          >
            <span className="text-slate-400 font-normal">Readiness:</span>
            <span className="font-semibold text-white tabular-nums">{student.readinessScore}/100</span>
          </Link>

          {/* Notifications Button */}
          <button className="relative p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/[0.05] transition">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-400 rounded-full" />
          </button>

          {/* User Profile Dropdown / Trigger */}
          <Link href="/profile" className="flex items-center gap-2.5 pl-2 border-l border-white/[0.06] hover:opacity-90 transition">
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
                {student.name}
              </div>
              <div className="text-[10px] text-slate-400 mt-1 truncate max-w-[130px]">
                {student.branch}
              </div>
            </div>
          </Link>

        </div>
      </div>
    </header>
  );
};
