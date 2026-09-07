'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { useStudent } from '@/lib/context/StudentContext';
import { 
  GitCompare, 
  Target, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  BrainCircuit, 
  TrendingUp, 
  Sparkles,
  Zap
} from 'lucide-react';

export default function SkillGapPage() {
  const { student, updateTargetRole } = useStudent();
  const [selectedTargetRole, setSelectedTargetRole] = useState(student.targetRole);

  const availableTargetRoles = [
    'AI/ML Engineer',
    'Full Stack Web Developer',
    'Data Analyst & Visualization',
    'Cloud DevOps Engineer',
    'Cyber Security Analyst'
  ];

  // Specific role requirements benchmark
  const roleBenchmarks: Record<string, { skill: string; required: number }[]> = {
    'AI/ML Engineer': [
      { skill: 'Python', required: 85 },
      { skill: 'Machine Learning', required: 80 },
      { skill: 'TensorFlow / PyTorch', required: 80 },
      { skill: 'SQL', required: 75 },
      { skill: 'Cloud Computing (AWS)', required: 75 },
      { skill: 'System Design', required: 70 },
      { skill: 'Docker & Containers', required: 70 }
    ],
    'Full Stack Web Developer': [
      { skill: 'React.js', required: 85 },
      { skill: 'TypeScript', required: 80 },
      { skill: 'Node.js', required: 80 },
      { skill: 'REST APIs', required: 85 },
      { skill: 'SQL / PostgreSQL', required: 75 },
      { skill: 'Docker', required: 65 }
    ],
    'Data Analyst & Visualization': [
      { skill: 'SQL', required: 85 },
      { skill: 'Python', required: 75 },
      { skill: 'Data Visualization (PowerBI / Tableau)', required: 80 },
      { skill: 'Pandas & NumPy', required: 80 },
      { skill: 'Problem Solving', required: 80 }
    ],
    'Cloud DevOps Engineer': [
      { skill: 'Cloud Computing (AWS)', required: 85 },
      { skill: 'Docker & Containers', required: 80 },
      { skill: 'CI/CD Pipelines', required: 80 },
      { skill: 'Python', required: 70 },
      { skill: 'System Design', required: 75 }
    ],
    'Cyber Security Analyst': [
      { skill: 'Cybersecurity Fundamentals', required: 85 },
      { skill: 'System Design', required: 75 },
      { skill: 'Python', required: 70 },
      { skill: 'Critical Thinking', required: 80 }
    ]
  };

  const currentBenchmark = roleBenchmarks[selectedTargetRole] || roleBenchmarks['AI/ML Engineer'];

  // Map student skills against current benchmark
  const gapAnalysis = currentBenchmark.map(b => {
    const studentSkill = student.skills.find(s => 
      s.name.toLowerCase().includes(b.skill.toLowerCase()) || 
      b.skill.toLowerCase().includes(s.name.toLowerCase())
    );
    const current = studentSkill ? studentSkill.level : 30;
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
      
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-indigo-950 border border-indigo-800 px-3 py-1 rounded-full text-xs font-bold text-indigo-300">
              <GitCompare className="w-3.5 h-3.5 text-indigo-400" />
              <span>Skill Gap Matrix</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Academia–Industry Skill Gap Analysis</h1>
            <p className="text-xs text-slate-400">Comparing your current proficiency against real-time industry job role requirements.</p>
          </div>

          {/* Role Switcher Dropdown */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Target Role Benchmark:</label>
            <select
              value={selectedTargetRole}
              onChange={(e) => {
                setSelectedTargetRole(e.target.value);
                updateTargetRole(e.target.value);
              }}
              className="bg-slate-950 border border-indigo-500/50 text-indigo-200 text-xs font-bold rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-inner"
            >
              {availableTargetRoles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Comparative Gap Visual Bars */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-400" />
            <span>Benchmark Comparison: <span className="text-indigo-300">{selectedTargetRole}</span></span>
          </h2>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-indigo-500 rounded-sm inline-block" />
              Your Current Level
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-slate-700 rounded-sm inline-block" />
              Industry Requirement
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {gapAnalysis.map((item, idx) => (
            <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{item.skillName}</span>
                  {item.verified && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  )}
                  {item.gapPercentage > 0 && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      item.priority === 'Critical' 
                        ? 'bg-rose-950 text-rose-300 border-rose-800' 
                        : item.priority === 'High' 
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    }`}>
                      {item.gapPercentage > 0 ? `-${item.gapPercentage}% Gap (${item.priority})` : 'Target Achieved'}
                    </span>
                  )}
                </div>

                <div className="text-right font-semibold">
                  <span className="text-indigo-400 font-extrabold text-sm">{item.currentLevel}%</span>
                  <span className="text-slate-500 text-xs"> / {item.requiredLevel}% Target</span>
                </div>
              </div>

              {/* Comparative Progress Trackers */}
              <div className="relative w-full h-4 bg-slate-800 rounded-full overflow-hidden">
                {/* Industry Target Marker Background */}
                <div 
                  className="absolute top-0 bottom-0 bg-slate-700/80 rounded-full"
                  style={{ width: `${item.requiredLevel}%` }}
                />
                {/* Student Current Level Fill */}
                <div 
                  className="absolute top-0 bottom-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-400 rounded-full transition-all duration-700 shadow-lg"
                  style={{ width: `${item.currentLevel}%` }}
                />
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Recommended Action Footer */}
      <div className="bg-gradient-to-r from-indigo-950/80 to-slate-900 border border-indigo-800/80 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-900 border border-indigo-700 flex items-center justify-center text-indigo-300 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Bridge identified gaps with curated courses</h3>
            <p className="text-xs text-slate-300">Targeted courses and hands-on projects available for PyTorch, AWS, and System Design.</p>
          </div>
        </div>

        <Link
          href="/learning"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition hover:scale-105 shrink-0 flex items-center gap-2"
        >
          <BookOpen className="w-4 h-4" />
          <span>View Personalized Learning Path</span>
        </Link>
      </div>

    </AppLayout>
  );
}
