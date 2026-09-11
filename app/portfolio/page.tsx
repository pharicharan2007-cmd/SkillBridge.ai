'use client';

import React, { useState, useRef } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useStudent } from '@/lib/context/StudentContext';
import { uploadStudentDocument, DocumentCategory } from '@/lib/services/documentService';
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
  Briefcase, 
  Clock,
  X,
  Upload,
  FileCheck,
  Loader2,
  FileText
} from 'lucide-react';

export default function StudentDigitalPortfolioPage() {
  const { student, addProjectToPortfolio, processDocumentVerification } = useStudent();
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Supabase Upload State
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [docUploadStatus, setDocUploadStatus] = useState<string | null>(null);
  const [targetCategory, setTargetCategory] = useState<DocumentCategory>('certifications');
  const [certIdInput, setCertIdInput] = useState('');
  const [issuerInput, setIssuerInput] = useState('NPTEL');
  const [academicCgpaInput, setAcademicCgpaInput] = useState<number>(student.cgpa || 8.65);
  const docInputRef = useRef<HTMLInputElement>(null);
  const [recentUploads, setRecentUploads] = useState<Array<{ name: string; category: string; path: string; status: string; date: string }>>([]);

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingDoc(true);
    setDocUploadStatus('1/2 Uploading document to private Supabase bucket...');

    const res = await uploadStudentDocument(student.id || 'std-101', targetCategory, file);

    if (res.error) {
      setDocUploadStatus(`Upload failed: ${res.error}`);
      setUploadingDoc(false);
      return;
    }

    if (res.data) {
      setDocUploadStatus('2/2 Running Automated Verification Engine (API / Checksum / DB Cross-Match)...');

      const verifiedDoc = await processDocumentVerification({
        studentId: student.id || 'std-101',
        category: targetCategory,
        title: file.name.replace(/\.[^/.]+$/, ''),
        filePath: res.data.filePath,
        fileBlob: file,
        issuer: issuerInput,
        certificateId: certIdInput,
        cgpa: targetCategory === 'transcripts' ? academicCgpaInput : undefined,
        enrollmentNumber: student.enrollmentNumber
      });

      const statusBadge = verifiedDoc.verificationStatus === 'verified' 
        ? '✓ Auto-Verified' 
        : verifiedDoc.verificationStatus === 'rejected'
        ? '✗ Auto-Rejected'
        : '⏳ Queued for Exception Review';

      setDocUploadStatus(`${statusBadge}: ${verifiedDoc.title} (${verifiedDoc.verificationMethod.toUpperCase()})`);
      
      setRecentUploads(prev => [
        { 
          name: verifiedDoc.title, 
          category: verifiedDoc.category, 
          path: verifiedDoc.filePath, 
          status: verifiedDoc.verificationStatus,
          date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        ...prev
      ]);

      if (docInputRef.current) docInputRef.current.value = '';
    }
    setUploadingDoc(false);
  };

  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    techStack: 'Python, PyTorch, React, Docker',
    githubUrl: 'https://github.com/arjun-mehta/new-project',
    liveDemoUrl: 'https://demo.app',
    date: 'Sept 2026'
  });

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.('https://skillbridge.dtu.ac.in/p/arjun-mehta');
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
      verifiedBy: 'DTU CSE Evaluator',
      date: newProject.date
    });

    setShowAddProjectModal(false);
    setNewProject({
      title: '',
      description: '',
      techStack: 'Python, PyTorch, React, Docker',
      githubUrl: 'https://github.com/arjun-mehta/new-project',
      liveDemoUrl: 'https://demo.app',
      date: 'Sept 2026'
    });
  };

  const verifiedSkills = student.skills.filter(s => s.verified);

  return (
    <AppLayout>
      <div className="space-y-6">
        
        {/* Top Header Banner */}
        <div className="enterprise-card rounded-xl p-6 sm:p-7 space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 px-3 py-1 rounded-full text-xs font-bold text-blue-700 dark:text-blue-300">
                <FolderGit2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Student Digital Portfolio</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Verified Credentials, Projects & Achievements
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
                A verified digital portfolio showcasing your technical capabilities, certified badges, code repositories, and industrial training records to recruiters.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 flex items-center gap-1.5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  UID: {student.studentUid || 'DL-DEL-DTU-BT-CS-22-0148'}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {student.degree} ({student.branch}) · {student.institution}
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  <ShieldCheck className="w-3 h-3" />
                  <span>AICTE Accredited Identity</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleCopyLink}
                className="enterprise-btn-secondary px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{copiedLink ? 'Copied Link!' : 'Share Public Link'}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="enterprise-btn-primary px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Resume Card</span>
              </button>
            </div>
          </div>
        </div>

        {/* Supabase Secure Document Management Section */}
        <div className="enterprise-card rounded-xl p-5 sm:p-6 space-y-4 border-2 border-dashed border-blue-200 dark:border-blue-900/50 bg-gradient-to-r from-blue-50/50 via-white to-indigo-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  <FileCheck className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Upload Verified Document to Supabase Storage
                </h3>
                <span className="status-pill status-pill-green text-[10px]">
                  Private S3 Bucket
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Upload your resumes, certificates, and marksheet PDFs directly to your encrypted student folder in <code className="text-blue-700 dark:text-blue-300 font-mono">student-documents</code>.
              </p>
            </div>

            {/* Document Type Selector & Contextual Inputs */}
            <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
              <select
                value={targetCategory}
                onChange={(e) => setTargetCategory(e.target.value as DocumentCategory)}
                className="text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg px-3 py-2 font-medium text-slate-700 dark:text-slate-200 shadow-sm"
              >
                <option value="certifications">Certificate (NPTEL/Coursera/AWS)</option>
                <option value="transcripts">Academic Marksheet (CGPA Match)</option>
                <option value="id_proofs">College ID Card (Name Verification)</option>
                <option value="internship_reports">Internship Completion Record</option>
                <option value="resumes">Resume (PDF)</option>
              </select>

              {/* Dynamic ID Card Helper */}
              {targetCategory === 'id_proofs' && (
                <div className="flex items-center gap-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-2.5 py-1.5 rounded-lg">
                  <span className="text-slate-400 font-medium">Verify against:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{student.name}</span>
                </div>
              )}

              {/* Dynamic Certificate Verification Inputs */}
              {targetCategory === 'certifications' && (
                <>
                  <select
                    value={issuerInput}
                    onChange={(e) => setIssuerInput(e.target.value)}
                    className="text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg px-2.5 py-2 font-medium text-slate-700 dark:text-slate-200 shadow-sm"
                  >
                    <option value="NPTEL">NPTEL / IIT</option>
                    <option value="Coursera">Coursera</option>
                    <option value="AWS">Amazon AWS</option>
                    <option value="Google">Google Cloud</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Cert ID or Verify Link (Optional)"
                    value={certIdInput}
                    onChange={(e) => setCertIdInput(e.target.value)}
                    className="text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg px-2.5 py-2 font-mono text-slate-700 dark:text-slate-200 shadow-sm w-52"
                  />
                </>
              )}

              {/* Dynamic Transcript Inputs */}
              {targetCategory === 'transcripts' && (
                <div className="flex items-center gap-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-2.5 py-1.5 rounded-lg">
                  <span className="text-slate-400 font-medium">Claimed CGPA:</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={academicCgpaInput}
                    onChange={(e) => setAcademicCgpaInput(parseFloat(e.target.value))}
                    className="w-16 font-bold text-blue-600 dark:text-blue-400 text-xs bg-transparent focus:outline-none"
                  />
                </div>
              )}

              <input
                type="file"
                ref={docInputRef}
                onChange={handleDocumentUpload}
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
              />

              <button
                type="button"
                onClick={() => docInputRef.current?.click()}
                disabled={uploadingDoc}
                className="enterprise-btn-primary px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98] transition"
              >
                {uploadingDoc ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Validating...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Upload & Auto-Verify</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Status Message */}
          {docUploadStatus && (
            <div className={`text-xs px-3.5 py-2.5 rounded-lg font-medium flex items-center gap-2 ${
              docUploadStatus.startsWith('✓') 
                ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800' 
                : docUploadStatus.includes('failed') 
                ? 'bg-red-50 dark:bg-red-950/50 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800' 
                : 'bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800 animate-pulse'
            }`}>
              <span>{docUploadStatus}</span>
            </div>
          )}

          {/* List of uploaded documents in this session */}
          {recentUploads.length > 0 && (
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Recently Uploaded Documents:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {recentUploads.map((u, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="font-semibold truncate">{u.name}</span>
                    </div>
                    <span className="status-pill status-pill-blue text-[10px] shrink-0 uppercase">{u.category}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Portfolio Showcase Card */}
        <div className="enterprise-card rounded-xl p-6 sm:p-8 space-y-8">
          
          {/* Student Profile Header in Portfolio */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="flex items-center gap-4 sm:gap-5">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-slate-200 dark:ring-slate-700 shadow-sm"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{student.name}</h2>
                  {student.verificationStatus === 'Pending' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      <Clock className="w-3 h-3" />
                      Institutional Review Pending
                    </span>
                  ) : (
                    <span className="status-pill status-pill-green">
                      <ShieldCheck className="w-3 h-3" />
                      Campus Verified
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {student.degree} in {student.branch} • {student.institution}
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <span>CGPA: <strong className="text-slate-800 dark:text-slate-200">{student.cgpa}</strong></span>
                  <span>•</span>
                  <span>Target Role: <strong className="text-blue-600 dark:text-blue-400">{student.targetRole}</strong></span>
                  <span>•</span>
                  <span>Readiness: <strong className="text-emerald-600 dark:text-emerald-400">{student.readinessScore}/100</strong></span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-3.5 rounded-xl text-right shrink-0 space-y-1">
              <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Credential ID</div>
              <div className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
                {student.enrollmentNumber || `SKILLBRIDGE-${student.id.toUpperCase()}`}
              </div>
              <div className="text-[10px] font-medium">
                {student.verificationStatus === 'Pending' ? (
                  <span className="text-amber-600 dark:text-amber-400">Institutional Review in Progress</span>
                ) : (
                  <span className="text-emerald-600 dark:text-emerald-400">{student.institution || 'Delhi Technological University'} Endorsed</span>
                )}
              </div>
            </div>
          </div>

          {/* Section 1: Verified Technical & Soft Skills */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Verified Skills & Competency Levels ({verifiedSkills.length})</span>
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">Verified via Algorithm & Diagnostic Tests</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {verifiedSkills.map(s => (
                <div key={s.id} className="enterprise-row rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-900 dark:text-white truncate">{s.name}</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{s.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" style={{ width: `${s.level}%` }} />
                  </div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>Industry Verified</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Projects & Repositories */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Capstone Projects & Code Repositories ({student.projects?.length || 0})</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Practical applications built and verified during academic tenure.</p>
              </div>

              <button
                onClick={() => setShowAddProjectModal(true)}
                className="enterprise-btn-primary px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(student.projects || []).map(proj => (
                <div key={proj.id} className="enterprise-row rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400 text-[11px]">{proj.date}</span>
                      {proj.verifiedBy && (
                        <span className="status-pill status-pill-blue text-[10px]">
                          Verified by {proj.verifiedBy}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{proj.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{proj.description}</p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.techStack.map((tech, idx) => (
                        <span key={idx} className="credential-tag text-[10px]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-4 text-xs">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1"
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
                        className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold flex items-center gap-1"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200 dark:border-slate-800">
            
            {/* Certifications */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Verified Credentials & Certifications ({student.certifications.length})</span>
              </h4>

              <div className="space-y-2.5">
                {student.certifications.map(c => (
                  <div key={c.id} className="enterprise-row rounded-xl p-3.5 flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <div className="font-bold text-slate-900 dark:text-white">{c.title}</div>
                      <div className="text-slate-500 dark:text-slate-400 text-[11px]">{c.issuer} • Issued {c.issueDate}</div>
                      {c.credentialId && (
                        <div className="text-[10px] text-blue-600 dark:text-blue-400 font-mono">ID: {c.credentialId}</div>
                      )}
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Completed Internships */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Industry Internships & Practical Training</span>
              </h4>

              <div className="space-y-2.5">
                {(student.internshipsCompleted || []).map(intern => (
                  <div key={intern.id} className="enterprise-row rounded-xl p-3.5 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">{intern.role}</span>
                      <span className="status-pill status-pill-green text-[10px]">
                        Completed
                      </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">{intern.company} • {intern.duration}</p>
                    <div className="text-blue-600 dark:text-blue-400 text-[10px] font-semibold flex items-center gap-1 cursor-pointer hover:underline pt-1">
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="enterprise-card rounded-2xl max-w-lg w-full p-6 sm:p-7 space-y-4 shadow-enterprise-modal">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Add Project to Digital Portfolio</h3>
              </div>
              <button
                onClick={() => setShowAddProjectModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddProject} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-slate-600 dark:text-slate-400 font-medium">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Autonomous Quadcopter Flight Controller"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg p-2.5 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-600 dark:text-slate-400 font-medium">Description & Architecture</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Summarize the algorithm, hardware or models used and measurable outcomes."
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg p-2.5 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-600 dark:text-slate-400 font-medium">Tech Stack (comma-separated)</label>
                <input
                  type="text"
                  placeholder="Python, ROS2, C++, OpenCV, Gazebo"
                  value={newProject.techStack}
                  onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg p-2.5 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-600 dark:text-slate-400 font-medium">GitHub Repository URL</label>
                  <input
                    type="url"
                    value={newProject.githubUrl}
                    onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg p-2.5 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-600 dark:text-slate-400 font-medium">Live Demo URL</label>
                  <input
                    type="url"
                    value={newProject.liveDemoUrl}
                    onChange={(e) => setNewProject({ ...newProject, liveDemoUrl: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg p-2.5 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddProjectModal(false)}
                  className="enterprise-btn-secondary px-3.5 py-1.5 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="enterprise-btn-primary px-4 py-1.5 rounded-lg font-semibold"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AppLayout>
  );
}

