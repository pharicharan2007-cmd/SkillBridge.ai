'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { useStudent } from '@/lib/context/StudentContext';
import { 
  FolderGit2, 
  CheckCircle2, 
  Award, 
  ExternalLink, 
  Github, 
  Globe, 
  Plus, 
  Printer, 
  Share2, 
  ShieldCheck, 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  Calendar,
  X
} from 'lucide-react';

export default function StudentDigitalPortfolioPage() {
  const { student, addProjectToPortfolio } = useStudent();
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    techStack: 'Python, PyTorch, React, Docker',
    githubUrl: 'https://github.com/rohan-sharma/new-project',
    liveDemoUrl: 'https://demo.app',
    date: 'Sept 2026'
  });

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.('https://skillbridge.ai/p/rohan-sharma');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;

    addProjectToPortfolio({
      title: newProject.title,
      description: newProject.description,
      techStack: newProject.techStack.split(',').map(s => s.trim()).filter(Boolean),
      githubUrl: newProject.githubUrl,
      liveDemoUrl: newProject.liveDemoUrl,
      verifiedBy: 'Self & Academic Evaluator',
      date: newProject.date
    });

    setShowAddProjectModal(false);
    setNewProject({
      title: '',
      description: '',
      techStack: 'Python, PyTorch, React, Docker',
      githubUrl: 'https://github.com/rohan-sharma/new-project',
      liveDemoUrl: 'https://demo.app',
      date: 'Sept 2026'
    });
  };

  const verifiedSkills = student.skills.filter(s => s.verified);

  return (
    <AppLayout>
      <div className="space-y-6">
        
        {/* Top Header Banner */}
        <div className="bg-[#0f121d] border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 bg-indigo-950/80 border border-indigo-700/60 px-3 py-1 rounded-full text-xs font-semibold text-indigo-300">
                <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Student Digital Portfolio</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Verified Credentials, Projects & Achievements
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                A tamper-evident, verified digital portfolio showcasing your technical capabilities, certified badges, code repositories, and industrial internship records to recruiters.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleCopyLink}
                className="bg-[#141824] hover:bg-[#1a2030] text-slate-200 border border-white/[0.08] px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2"
              >
                <Share2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>{copiedLink ? 'Copied Link!' : 'Share Public Link'}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Resume Card</span>
              </button>
            </div>
          </div>
        </div>

        {/* Portfolio Showcase Card */}
        <div className="bg-[#0f121d] border border-white/[0.08] rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl">
          
          {/* Student Profile Header in Portfolio */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-white/[0.06] pb-8">
            <div className="flex items-center gap-5">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-indigo-500/30 shadow-lg"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <h2 className="text-2xl font-black text-white">{student.name}</h2>
                  <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    Verified Credentials
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  {student.degree} in {student.branch} • {student.institution}
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                  <span>CGPA: <strong className="text-white">{student.cgpa}</strong></span>
                  <span>•</span>
                  <span>Target Role: <strong className="text-indigo-300">{student.targetRole}</strong></span>
                  <span>•</span>
                  <span>Readiness: <strong className="text-emerald-400">{student.readinessScore}/100</strong></span>
                </div>
              </div>
            </div>

            <div className="bg-[#141824] border border-white/[0.06] p-4 rounded-2xl text-right shrink-0 space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Credential ID</div>
              <div className="text-xs font-mono text-indigo-300">SKILLBRIDGE-IND-2026-7789</div>
              <div className="text-[10px] text-emerald-400">All India Institute of Ayurveda Endorsed</div>
            </div>
          </div>

          {/* Section 1: Verified Technical & Soft Skills */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Verified Skills & Competency Levels ({verifiedSkills.length})</span>
              </h3>
              <span className="text-xs text-slate-400">Verified via Algorithm & Diagnostic Tests</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {verifiedSkills.map(s => (
                <div key={s.id} className="bg-[#141824] border border-white/[0.06] rounded-2xl p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white truncate">{s.name}</span>
                    <span className="font-bold text-indigo-400">{s.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${s.level}%` }} />
                  </div>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>Industry Verified</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Projects & Repositories */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-indigo-400" />
                  <span>Capstone Projects & Code Repositories ({student.projects?.length || 0})</span>
                </h3>
                <p className="text-xs text-slate-400">Practical applications built and verified during academic tenure.</p>
              </div>

              <button
                onClick={() => setShowAddProjectModal(true)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(student.projects || []).map(proj => (
                <div key={proj.id} className="bg-[#141824] border border-white/[0.06] rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-indigo-500/30 transition">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 text-[11px]">{proj.date}</span>
                      {proj.verifiedBy && (
                        <span className="bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] px-2 py-0.5 rounded-full font-semibold">
                          Verified by {proj.verifiedBy}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-white leading-snug">{proj.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.techStack.map((tech, idx) => (
                        <span key={idx} className="bg-[#0f121d] border border-white/[0.06] text-slate-200 text-[10px] px-2 py-0.5 rounded-md font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.04] flex items-center gap-3 text-xs">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    )}
                    {proj.liveDemoUrl && (
                      <a
                        href={proj.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Industry Certifications & Internships */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/[0.06]">
            
            {/* Certifications */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-400" />
                <span>Verified Credentials & Certifications ({student.certifications.length})</span>
              </h4>

              <div className="space-y-2.5">
                {student.certifications.map(c => (
                  <div key={c.id} className="bg-[#141824] border border-white/[0.06] rounded-xl p-3.5 flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <div className="font-bold text-white">{c.title}</div>
                      <div className="text-slate-400 text-[11px]">{c.issuer} • Issued {c.issueDate}</div>
                      {c.credentialId && (
                        <div className="text-[10px] text-indigo-300 font-mono">ID: {c.credentialId}</div>
                      )}
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Completed Internships */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-400" />
                <span>Industry Internships & Practical Training</span>
              </h4>

              <div className="space-y-2.5">
                {(student.internshipsCompleted || []).map(intern => (
                  <div key={intern.id} className="bg-[#141824] border border-white/[0.06] rounded-xl p-3.5 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{intern.role}</span>
                      <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        Completed
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px]">{intern.company} • {intern.duration}</p>
                    <div className="text-indigo-400 text-[10px] font-semibold flex items-center gap-1 cursor-pointer hover:underline pt-1">
                      <span>View Completion Certificate</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ADD PROJECT MODAL */}
      {showAddProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f121d] border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">Add Project to Digital Portfolio</h3>
              </div>
              <button onClick={() => setShowAddProjectModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProject} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Automated Clinical Drug Interaction Predictor"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full bg-[#141824] border border-white/[0.08] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Project Summary / Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Summarize key features, algorithms, and real-world problem solved..."
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full bg-[#141824] border border-white/[0.08] rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Technologies Used (Comma separated)</label>
                <input
                  type="text"
                  placeholder="Python, PyTorch, React, PostgreSQL"
                  value={newProject.techStack}
                  onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                  className="w-full bg-[#141824] border border-white/[0.08] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">GitHub / Code URL</label>
                  <input
                    type="url"
                    value={newProject.githubUrl}
                    onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                    className="w-full bg-[#141824] border border-white/[0.08] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    value={newProject.liveDemoUrl}
                    onChange={(e) => setNewProject({ ...newProject, liveDemoUrl: e.target.value })}
                    className="w-full bg-[#141824] border border-white/[0.08] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setShowAddProjectModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-2 rounded-xl shadow-lg transition"
                >
                  Add to Portfolio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AppLayout>
  );
}
