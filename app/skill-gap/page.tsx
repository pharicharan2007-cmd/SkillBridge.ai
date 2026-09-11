'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { useStudent } from '@/lib/context/StudentContext';
import { 
  GitCompare, 
  Target, 
  CheckCircle2, 
  BookOpen, 
  Sparkles,
  Cpu,
  Layers,
  Award
} from 'lucide-react';
import { ROLE_BENCHMARKS } from '@/lib/constants/benchmarks';

export default function SkillGapPage() {
  const { student, updateTargetRole } = useStudent();
  const [selectedTargetRole, setSelectedTargetRole] = useState(student.targetRole || 'Embedded Systems & Firmware Engineer');

  // Sync state whenever student target role updates or is loaded from storage
  useEffect(() => {
    if (student.targetRole) {
      setSelectedTargetRole(student.targetRole);
    }
  }, [student.targetRole]);

  // Retrieve or synthesize current benchmark
  const currentBenchmark = ROLE_BENCHMARKS[selectedTargetRole] || 
    ROLE_BENCHMARKS['Embedded Systems & Firmware Engineer'] || 
    ROLE_BENCHMARKS['AI/ML Engineer'];

  // Map student's registered skills against current benchmark using flexible matching
  const gapAnalysis = currentBenchmark.map(b => {
    const reqLower = b.skill.toLowerCase();
    
    // Find matching registered skill in student's profile
    const studentSkill = student.skills.find(s => {
      const sLower = s.name.toLowerCase();
      if (sLower === reqLower || sLower.includes(reqLower) || reqLower.includes(sLower)) return true;
      // Handle slash separated items like "Verilog / VHDL" or "SQL & Databases"
      const parts = reqLower.split(/[/,&]/).map(p => p.trim()).filter(Boolean);
      return parts.some(p => sLower.includes(p) || p.includes(sLower));
    });

    // If student has registered this skill, use their actual level; otherwise 0%
    const current = studentSkill ? studentSkill.level : 0;
    const gap = Math.max(0, b.required - current);
    
    let priority: 'Critical' | 'High' | 'Low' = 'Low';
    if (gap >= 35) priority = 'Critical';
    else if (gap >= 15) priority = 'High';

    return {
      skillName: b.skill,
      currentLevel: current,
      requiredLevel: b.required,
      gapPercentage: gap,
      priority,
      verified: studentSkill?.verified || false
    };
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        
        {/* Top Banner */}
        <div className="enterprise-card rounded-xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 px-3 py-1 rounded-full text-xs font-bold text-blue-700 dark:text-blue-300">
              <GitCompare className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Skill Gap Matrix</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Academia–Industry Skill Gap Analysis
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Comparing your registered competencies in <span className="font-semibold text-slate-800 dark:text-slate-200">{student.branch}</span> against industry benchmarks.
            </p>
          </div>

          {/* Role Switcher Dropdown (Categorized by Cluster) */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Target Role Benchmark:
            </label>
            <select
              value={selectedTargetRole}
              onChange={(e) => {
                setSelectedTargetRole(e.target.value);
                updateTargetRole(e.target.value);
              }}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-lg px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm max-w-xs"
            >
              {/* Ensure student's chosen role is always selectable */}
              {student.targetRole && !Object.keys(ROLE_BENCHMARKS).includes(student.targetRole) && (
                <option value={student.targetRole}>{student.targetRole} (Current Target)</option>
              )}

              <optgroup label="Electronics & Communication (VLSI & Embedded)">
                <option value="Embedded Systems & Firmware Engineer">Embedded Systems & Firmware Engineer</option>
                <option value="VLSI Front-End RTL Design Engineer">VLSI Front-End RTL Design Engineer</option>
                <option value="Analog & Mixed-Signal IC Engineer">Analog & Mixed-Signal IC Engineer</option>
                <option value="RF & Signal Processing Engineer">RF & Signal Processing Engineer</option>
              </optgroup>

              <optgroup label="Computer Science & Information Technology">
                <option value="AI/ML Research Engineer">AI/ML Research Engineer</option>
                <option value="AI/ML Engineer">AI/ML Engineer</option>
                <option value="Full Stack Software Architect">Full Stack Software Architect</option>
                <option value="Full Stack Web Developer">Full Stack Web Developer</option>
                <option value="Cloud DevOps & SRE">Cloud DevOps & SRE</option>
                <option value="Data Analyst & Visualization">Data Analyst & Visualization</option>
                <option value="Cyber Security Analyst">Cyber Security Analyst</option>
              </optgroup>

              <optgroup label="Mechanical & Robotics Engineering">
                <option value="Robotics Software Engineer (AMR)">Robotics Software Engineer (AMR)</option>
                <option value="EV Battery Thermal & Structural Design Engineer">EV Battery Thermal & Structural Design Engineer</option>
                <option value="Automotive CAE & Crash Simulation Engineer">Automotive CAE & Crash Simulation Engineer</option>
              </optgroup>

              <optgroup label="Civil & Smart Infrastructure">
                <option value="Structural Design Engineer (Metro & Bridges)">Structural Design Engineer (Metro & Bridges)</option>
                <option value="BIM & Digital Twin Coordinator">BIM & Digital Twin Coordinator</option>
              </optgroup>

              <optgroup label="Electrical & Power Systems">
                <option value="Power Electronics & Inverter Control Engineer">Power Electronics & Inverter Control Engineer</option>
                <option value="Smart Grid & Substation Automation Specialist">Smart Grid & Substation Automation Specialist</option>
                <option value="BMS Firmware & Battery Storage Engineer">BMS Firmware & Battery Storage Engineer</option>
              </optgroup>
            </select>
          </div>
        </div>

        {/* Comparative Gap Visual Bars */}
        <div className="enterprise-card rounded-xl p-6 sm:p-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Benchmark Comparison: <span className="text-blue-600 dark:text-blue-400 font-semibold">{selectedTargetRole}</span></span>
            </h2>

            <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-blue-600 dark:bg-blue-500 rounded-sm inline-block" />
                Your Registered Level
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-slate-300 dark:bg-slate-700 rounded-sm inline-block" />
                Industry Requirement
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {gapAnalysis.map((item, idx) => (
              <div key={idx} className="enterprise-row rounded-xl p-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{item.skillName}</span>
                    {item.verified && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    )}
                    {item.currentLevel === 0 ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
                        Missing Skill (Critical)
                      </span>
                    ) : item.gapPercentage > 0 ? (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        item.priority === 'Critical' 
                          ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900' 
                          : item.priority === 'High' 
                          ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900' 
                          : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900'
                      }`}>
                        -{item.gapPercentage}% Gap ({item.priority})
                      </span>
                    ) : (
                      <span className="status-pill status-pill-green text-[10px]">Target Met</span>
                    )}
                  </div>

                  <div className="text-right font-semibold">
                    <span className="text-blue-600 dark:text-blue-400 font-extrabold text-sm">{item.currentLevel}%</span>
                    <span className="text-slate-500 dark:text-slate-400 text-xs"> / {item.requiredLevel}% Target</span>
                  </div>
                </div>

                {/* Comparative Progress Trackers */}
                <div className="relative w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  {/* Industry Target Marker Background */}
                  <div 
                    className="absolute top-0 bottom-0 bg-slate-300 dark:bg-slate-700 rounded-full"
                    style={{ width: `${item.requiredLevel}%` }}
                  />
                  {/* Student Current Level Fill */}
                  <div 
                    className="absolute top-0 bottom-0 bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-700 shadow-sm"
                    style={{ width: `${item.currentLevel}%` }}
                  />
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Student's Registered Skill Roster */}
        <div className="enterprise-card rounded-xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Your Registered Skill Inventory ({student.skills?.length || 0} Skills)</span>
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Registered for {student.name} ({student.branch})
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(student.skills || []).map((sk, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white truncate">{sk.name}</span>
                  <span className="font-extrabold text-blue-600 dark:text-blue-400">{sk.level}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full" style={{ width: `${sk.level}%` }} />
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                  {sk.category} · {sk.demandLevel || 'Core'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Action Footer */}
        <div className="enterprise-card rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Bridge identified gaps with curated courses</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Targeted courses and hands-on projects available for your specific role requirements.</p>
            </div>
          </div>

          <Link
            href="/learning"
            className="enterprise-btn-primary px-5 py-2.5 rounded-lg text-xs font-semibold shrink-0 flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>View Personalized Learning Path</span>
          </Link>
        </div>

      </div>
    </AppLayout>
  );
}

