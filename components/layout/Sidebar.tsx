'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BrainCircuit, 
  Target, 
  Briefcase, 
  Send, 
  User, 
  BookOpenCheck,
  Sparkles,
  Building2,
  Users,
  Award,
  Share2,
  FolderGit2,
  GraduationCap,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { useStudent } from '@/lib/context/StudentContext';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { currentRole, applications, facultyApplications } = useStudent();

  // Dynamic Navigation definition depending on active persona
  const getNavItems = () => {
    switch (currentRole) {
      case 'recruiter':
        return [
          { name: 'Employer Dashboard', href: '/industry', icon: LayoutDashboard },
          { name: 'Post Opportunity', href: '/industry#post', icon: Briefcase, badge: 'New' },
          { name: 'ATS Applicant Pipeline', href: '/industry#applicants', icon: Users, count: applications.length },
          { name: 'Talent Discovery', href: '/industry#talent', icon: Target },
          { name: 'Publish Courses/FDP', href: '/industry#programs', icon: BookOpenCheck },
          { name: 'Collaboration Hub', href: '/collaboration', icon: Sparkles },
        ];
      case 'faculty':
        return [
          { name: 'Faculty Portal', href: '/faculty', icon: LayoutDashboard },
          { name: 'Faculty Internships', href: '/faculty#internships', icon: Briefcase },
          { name: 'National FDPs', href: '/faculty#fdp', icon: Award, badge: 'AIIA' },
          { name: 'Research & Consultancy', href: '/faculty#research', icon: Target },
          { name: 'My Proposals', href: '/faculty#proposals', icon: FileCheck, count: facultyApplications.length },
          { name: 'Collaboration Hub', href: '/collaboration', icon: Sparkles },
        ];
      case 'institution':
        return [
          { name: 'Campus Analytics', href: '/institution', icon: LayoutDashboard },
          { name: 'Department Skill Gaps', href: '/institution#departments', icon: Target },
          { name: 'Readiness Cohorts', href: '/institution#readiness', icon: TrendingUp },
          { name: 'Curriculum & Trends', href: '/institution#trends', icon: BrainCircuit },
          { name: 'Institutional Reports', href: '/institution#reports', icon: ShieldCheck, badge: 'NAAC' },
          { name: 'Collaboration Hub', href: '/collaboration', icon: Sparkles },
        ];
      case 'student':
      default:
        return [
          { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
          { name: 'Skill Assessment', href: '/assessment', icon: BrainCircuit, badge: 'Quiz' },
          { name: 'Skill Profile', href: '/profile', icon: User },
          { name: 'Skill Gap Matrix', href: '/skill-gap', icon: Target },
          { name: 'Learning Path', href: '/learning', icon: BookOpenCheck },
          { name: 'Opportunities', href: '/opportunities', icon: Briefcase },
          { name: 'Application Tracker', href: '/applications', icon: Send, count: applications.length },
          { name: 'Digital Portfolio', href: '/portfolio', icon: FolderGit2, badge: 'Verified' },
          { name: 'Collaboration Hub', href: '/collaboration', icon: Sparkles },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-[#090a0f] text-slate-300 border-r border-white/[0.06] min-h-screen flex flex-col justify-between hidden md:flex shrink-0">
      
      {/* Brand Header */}
      <div>
        <div className="h-14 flex items-center px-5 border-b border-white/[0.06]">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-sm font-semibold text-white tracking-tight">SkillBridge<span className="text-indigo-400">.ai</span></span>
              <span className="block text-[10px] text-slate-400 font-normal">Academia-Industry Portal</span>
            </div>
          </Link>
        </div>

        {/* Persona Indicator Banner */}
        <div className="mx-3 mt-3 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-300 font-medium capitalize">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{currentRole} Portal</span>
          </div>
          <span className="text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800/80 px-1.5 py-0.5 rounded font-semibold">
            v2.0
          </span>
        </div>

        {/* Nav Links */}
        <div className="px-3 py-4 space-y-1">
          <div className="px-2.5 pb-2 text-[10px] font-medium text-slate-400 uppercase tracking-wider">
            Navigation
          </div>

          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && !item.href.includes('#') && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition ${
                  isActive
                    ? 'bg-white/[0.08] text-white border border-white/[0.08]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 transition ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span className="text-[10px] font-medium bg-indigo-950/60 text-indigo-300 border border-indigo-800/60 px-1.5 py-0.5 rounded">
                    {item.badge}
                  </span>
                )}

                {item.count !== undefined && item.count > 0 && (
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-300 tabular-nums">
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer / Ministry of Ayush & AIIA Badge */}
      <div className="p-3 border-t border-white/[0.06] space-y-2">
        <div className="saas-card rounded-lg p-3 text-xs space-y-1 bg-gradient-to-tr from-indigo-950/40 to-slate-900/40 border border-indigo-900/40">
          <div className="flex items-center gap-1.5 font-bold text-indigo-300 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Problem Statement 26044</span>
          </div>
          <p className="text-slate-400 text-[10px] leading-relaxed">
            Ministry of Ayush • All India Institute of Ayurveda (AIIA)
          </p>
        </div>

        <Link
          href="/"
          className="flex items-center justify-between px-2.5 py-1.5 text-xs text-slate-400 hover:text-slate-200 hover:bg-white/[0.03] rounded-lg transition"
        >
          <div className="flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Landing Page</span>
          </div>
          <ChevronRight className="w-3 h-3 opacity-40" />
        </Link>
      </div>

    </aside>
  );
};
