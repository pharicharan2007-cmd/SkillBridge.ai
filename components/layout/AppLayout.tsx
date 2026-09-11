'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BrainCircuit, GitCompare, Briefcase, Send, Users, BookOpenCheck, Award, Target, ShieldCheck } from 'lucide-react';

import { useStudent } from '@/lib/context/StudentContext';
import { ToastProvider } from '@/components/common/Toast';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const { currentRole } = useStudent();

  const mobileNav = React.useMemo(() => {
    switch (currentRole) {
      case 'recruiter':
        return [
          { href: '/industry', icon: LayoutDashboard, label: 'Dashboard' },
          { href: '/industry#applicants', icon: Users, label: 'Pipeline' },
          { href: '/industry#programs', icon: BookOpenCheck, label: 'Programs' },
        ];
      case 'faculty':
        return [
          { href: '/faculty', icon: LayoutDashboard, label: 'Portal' },
          { href: '/faculty#fdp', icon: Award, label: 'FDPs' },
          { href: '/faculty#research', icon: Send, label: 'Proposals' },
        ];
      case 'institution':
        return [
          { href: '/institution', icon: LayoutDashboard, label: 'Analytics' },
          { href: '/institution#departments', icon: Target, label: 'Skill Gaps' },
          { href: '/institution#reports', icon: ShieldCheck, label: 'Reports' },
        ];
      case 'student':
      default:
        return [
          { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { href: '/assessment', icon: BrainCircuit, label: 'Assessment' },
          { href: '/skill-gap', icon: GitCompare, label: 'Skill Gap' },
          { href: '/opportunities', icon: Briefcase, label: 'Jobs' },
          { href: '/applications', icon: Send, label: 'Tracker' },
        ];
    }
  }, [currentRole]);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-150">
      
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 md:pb-8 overflow-y-auto bg-slate-50 dark:bg-slate-950 transition-colors duration-150">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-around px-2 py-2">
          {mobileNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 p-1.5 rounded-lg text-[10px] font-medium transition ${
                  isActive ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <ToastProvider />
      </div>
    </div>
  );
};
