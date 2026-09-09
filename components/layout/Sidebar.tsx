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
  Users,
  Award,
  FolderGit2,
  GraduationCap,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  FileCheck,
  Microscope
} from 'lucide-react';
import { useStudent } from '@/lib/context/StudentContext';
import { ThemeToggle } from '@/components/common/ThemeToggle';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { currentRole, applications, facultyApplications } = useStudent();

  const getNavItems = () => {
    switch (currentRole) {
      case 'recruiter':
        return [
          { name: 'Recruiter Dashboard', href: '/industry', icon: LayoutDashboard },
          { name: 'Post Opportunity', href: '/industry#post', icon: Briefcase, badge: 'New' },
          { name: 'ATS Candidate Pipeline', href: '/industry#applicants', icon: Users, count: applications.length },
          { name: 'Talent Discovery Pool', href: '/industry#talent', icon: Target },
          { name: 'Publish Courses / FDP', href: '/industry#programs', icon: BookOpenCheck },
        ];
      case 'faculty':
        return [
          { name: 'Faculty Portal', href: '/faculty', icon: LayoutDashboard },
          { name: 'Faculty Internships', href: '/faculty#internships', icon: Briefcase },
          { name: 'National FDPs', href: '/faculty#fdp', icon: Award, badge: 'AICTE' },
          { name: 'Research & Grants', href: '/faculty#research', icon: Microscope },
          { name: 'My Proposals', href: '/faculty#proposals', icon: FileCheck, count: facultyApplications.length },
        ];
      case 'institution':
        return [
          { name: 'Campus Analytics', href: '/institution', icon: LayoutDashboard },
          { name: 'Department Skill Gaps', href: '/institution#departments', icon: Target },
          { name: 'Readiness Cohorts', href: '/institution#readiness', icon: TrendingUp },
          { name: 'Curriculum & Industry Trends', href: '/institution#trends', icon: BrainCircuit },
          { name: 'Accreditation Reports', href: '/institution#reports', icon: ShieldCheck, badge: 'NAAC' },
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
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-800 min-h-screen flex flex-col justify-between hidden md:flex shrink-0 transition-colors duration-150">
      
      <div>
        {/* Brand Header */}
        <div className="h-14 flex items-center px-5 border-b border-slate-200 dark:border-slate-800">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-blue-600 dark:bg-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">SkillBridge</span>
              <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-normal">Academic–Industry Portal</span>
            </div>
          </Link>
        </div>

        {/* Portal Indicator Banner */}
        <div className="mx-3 mt-3 px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300 font-semibold capitalize">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{currentRole} Portal</span>
          </div>
          <span className="text-[10px] bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 px-1.5 py-0.5 rounded font-semibold">
            DTU
          </span>
        </div>

        {/* Nav Links */}
        <div className="px-3 py-4 space-y-0.5">
          <div className="px-2.5 pb-2 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
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
                    ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 border-l-2 border-blue-600 dark:border-blue-400 pl-2 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 transition ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded">
                    {item.badge}
                  </span>
                )}

                {item.count !== undefined && item.count > 0 && (
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60 tabular-nums">
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer — Theme & Institution Badge */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
        
        {/* Quick Theme Switcher in Sidebar */}
        <div className="flex items-center justify-between px-1 py-1">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Theme</span>
          <ThemeToggle variant="pill" />
        </div>

        <div className="enterprise-card rounded-lg p-3 text-xs space-y-1 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-750">
          <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-200 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>NAAC A+ · NIRF Rank 36</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-[10px] leading-relaxed">
            Delhi Technological University · AICTE Affiliated
          </p>
        </div>

        <Link
          href="/"
          className="flex items-center justify-between px-2.5 py-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-lg transition"
        >
          <div className="flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Back to Landing</span>
          </div>
          <ChevronRight className="w-3 h-3 opacity-40" />
        </Link>
      </div>

    </aside>
  );
};
