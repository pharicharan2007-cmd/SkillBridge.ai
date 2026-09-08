'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { useStudent } from '@/lib/context/StudentContext';
import { 
  UserCheck, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  BookOpen, 
  BrainCircuit, 
  Target, 
  Plus, 
  ShieldCheck, 
  Clock,
  ExternalLink,
  Edit3,
  FolderGit2
} from 'lucide-react';

export default function SkillProfilePage() {
  const { student, updateTargetRole } = useStudent();
  const [activeTab, setActiveTab] = useState<'all' | 'verified' | 'unverified'>('all');
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [newRole, setNewRole] = useState(student.targetRole);

  const filteredSkills = student.skills.filter(s => {
    if (activeTab === 'verified') return s.verified;
    if (activeTab === 'unverified') return !s.verified;
    return true;
  });

  const verifiedCount = student.skills.filter(s => s.verified).length;
  const unverifiedCount = student.skills.length - verifiedCount;

  const handleSaveRole = () => {
    updateTargetRole(newRole);
    setIsEditingRole(false);
  };

  return (
    <AppLayout>
      
      {/* Profile Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-indigo-500/40 shadow-lg"
              />
              <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-slate-900">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white">{student.name}</h1>
                <span className="bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-indigo-400" />
                  Verified Student
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                {student.degree} in {student.branch} • {student.institution}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                <span>Semester: <strong className="text-slate-200">{student.semester}th</strong></span>
                <span>CGPA: <strong className="text-slate-200">{student.cgpa} / 10.0</strong></span>
                <span>Readiness: <strong className="text-indigo-400">{student.readinessScore}/100</strong></span>
              </div>
            </div>
          </div>

          {/* Assessment Badge Action */}
          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl text-right space-y-2 shrink-0">
            <div className="text-xs text-slate-400">Last Assessment Date</div>
            <div className="text-sm font-bold text-white flex items-center gap-1.5 justify-end">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>{student.lastAssessmentDate || 'Recently Completed'}</span>
            </div>
            <div className="flex items-center gap-2 justify-end pt-1">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition shadow"
              >
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>Digital Portfolio</span>
              </Link>
              <Link
                href="/assessment"
                className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition shadow"
              >
                <BrainCircuit className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Target Role & Career Interests Bar */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-indigo-400 shrink-0" />
            <div>
              <span className="text-xs text-slate-400 block font-medium">Target Industry Role:</span>
              {isEditingRole ? (
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="bg-slate-800 border border-slate-700 text-xs text-white rounded-lg px-3 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <button onClick={handleSaveRole} className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-bold">
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{student.targetRole}</span>
                  <button onClick={() => setIsEditingRole(true)} className="text-slate-400 hover:text-indigo-300">
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Career Interests Pills */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="text-slate-400 font-medium">Career Interests:</span>
            {student.careerInterests.map((interest, idx) => (
              <span key={idx} className="bg-slate-800 text-slate-200 border border-slate-700 px-2.5 py-1 rounded-full text-[11px] font-semibold">
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Verified vs Unverified Skills Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        
        {/* Filter Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-indigo-400" />
              <span>Skill Inventory & Proficiency Matrix</span>
            </h2>
            <p className="text-xs text-slate-400">Total skills mapped: {student.skills.length}</p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              All Skills ({student.skills.length})
            </button>
            <button
              onClick={() => setActiveTab('verified')}
              className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'verified' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Verified ({verifiedCount})
            </button>
            <button
              onClick={() => setActiveTab('unverified')}
              className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'unverified' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Self-Reported ({unverifiedCount})
            </button>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSkills.map(skill => (
            <div key={skill.id} className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 space-y-2 hover:border-slate-700 transition">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{skill.name}</span>
                  {skill.verified ? (
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  ) : (
                    <span className="bg-amber-950 text-amber-400 border border-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Unverified
                    </span>
                  )}
                </div>

                <span className="font-extrabold text-indigo-400">{skill.level}%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    skill.verified ? 'bg-gradient-to-r from-emerald-500 to-indigo-500' : 'bg-gradient-to-r from-amber-500 to-slate-500'
                  }`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Category: {skill.category}</span>
                <span>Demand: <strong className="text-slate-300">{skill.demandLevel}</strong></span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Verified Certifications Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" />
            <span>Verified Certifications & Credentials ({student.certifications.length})</span>
          </h3>
          <button className="text-xs text-indigo-400 font-bold hover:underline flex items-center gap-1">
            <Plus className="w-3.5 h-3.5" />
            <span>Add Certification</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {student.certifications.map(cert => (
            <div key={cert.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{cert.issuer}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <h4 className="text-sm font-bold text-white">{cert.title}</h4>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-900">
                <span>Issued: {cert.issueDate}</span>
                <span className="text-indigo-400 hover:underline flex items-center gap-0.5 cursor-pointer">
                  <span>Verify</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </AppLayout>
  );
}
