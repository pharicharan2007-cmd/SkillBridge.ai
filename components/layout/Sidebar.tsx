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
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useStudent } from '@/lib/context/StudentContext';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { applications } = useStudent();

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Skill Assessment',
      href: '/assessment',
      icon: BrainCircuit,
      badge: 'Quiz'
    },
    {
      name: 'Skill Profile',
      href: '/profile',
      icon: User,
    },
    {
      name: 'Skill Gap Analysis',
      href: '/skill-gap',
      icon: Target,
    },
    {
      name: 'Learning Path',
      href: '/learning',
      icon: BookOpenCheck,
    },
    {
      name: 'Opportunities',
      href: '/opportunities',
      icon: Briefcase,
    },
    {
      name: 'Application Tracker',
      href: '/applications',
      icon: Send,
      count: applications.length
    },
  ];

  return (
    <aside className="w-60 bg-[#090a0f] text-slate-300 border-r border-white/[0.06] min-h-screen flex flex-col justify-between hidden md:flex shrink-0">
      
      {/* Brand Header */}
      <div>
        <div className="h-14 flex items-center px-5 border-b border-white/[0.06]">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-sm font-semibold text-white tracking-tight">SkillBridge<span className="text-indigo-400">.ai</span></span>
              <span className="block text-[10px] text-slate-400 font-normal">Career Platform</span>
            </div>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="px-3 py-4 space-y-1">
          <div className="px-2.5 pb-2 text-[10px] font-medium text-slate-400 uppercase tracking-wider">
            Navigation
          </div>

          {navigationItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
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

      {/* Footer / Quick Help & Switcher */}
      <div className="p-3 border-t border-white/[0.06] space-y-2">
        <div className="saas-card rounded-lg p-3 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-medium text-indigo-400 text-xs">
            <Sparkles className="w-3 h-3" />
            <span>AI Match Engine</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Vectorized skill scoring calibrated to industry criteria.
          </p>
        </div>

        <Link
          href="/"
          className="flex items-center justify-between px-2.5 py-1.5 text-xs text-slate-400 hover:text-slate-200 hover:bg-white/[0.03] rounded-lg transition"
        >
          <div className="flex items-center gap-2">
            <LogOut className="w-3.5 h-3.5" />
            <span>Switch Role / Home</span>
          </div>
          <ChevronRight className="w-3 h-3 opacity-40" />
        </Link>
      </div>

    </aside>
  );
};
