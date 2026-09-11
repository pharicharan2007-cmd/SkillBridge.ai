'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { useStudent } from '@/lib/context/StudentContext';
import { 
  UserCheck, 
  CheckCircle2, 
  Award, 
  BrainCircuit, 
  Target, 
  Plus, 
  ShieldCheck, 
  Clock, 
  ExternalLink, 
  Edit3, 
  FolderGit2,
  Upload,
  X,
  Loader2,
  FileText
} from 'lucide-react';
import { uploadStudentDocument } from '@/lib/services/documentService';
import { DocumentCategory } from '@/types';
import { SkillProfile } from '@/components/profile/SkillProfile';

export default function SkillProfilePage() {
  const { student, updateTargetRole, processDocumentVerification } = useStudent();
  const [activeTab, setActiveTab] = useState<'all' | 'verified' | 'unverified'>('all');
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [newRole, setNewRole] = useState(student.targetRole);

  // Upload Certification Modal State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [modalCategory, setModalCategory] = useState<DocumentCategory>('certifications');
  const [modalIssuer, setModalIssuer] = useState('Coursera');
  const [modalCertId, setModalCertId] = useState('');
  const [modalFile, setModalFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);

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

  const handleModalUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalFile) return;

    setIsUploading(true);
    setUploadFeedback('Uploading document to secure storage...');

    const res = await uploadStudentDocument(student.id || 'std-101', modalCategory, modalFile);
    const filePath = res.data?.filePath || `credentials/${Date.now()}_${modalFile.name}`;

    setUploadFeedback('Running automated verification check...');
    const verifiedDoc = await processDocumentVerification({
      studentId: student.id || 'std-101',
      category: modalCategory,
      title: modalFile.name.replace(/\.[^/.]+$/, ''),
      filePath,
      fileBlob: modalFile,
      issuer: modalIssuer,
      certificateId: modalCertId,
      enrollmentNumber: student.enrollmentNumber
    });

    if (verifiedDoc.verificationStatus === 'verified') {
      setUploadFeedback(`✓ Auto-Verified: ${verifiedDoc.title}`);
      setTimeout(() => {
        setShowUploadModal(false);
        setModalFile(null);
        setModalCertId('');
        setUploadFeedback(null);
        setIsUploading(false);
      }, 1000);
    } else if (verifiedDoc.verificationStatus === 'needs_review') {
      setUploadFeedback(`⏳ Queued for Exception Review: ${verifiedDoc.flaggedReason || 'Visual inspection required'}`);
      setTimeout(() => {
        setShowUploadModal(false);
        setModalFile(null);
        setModalCertId('');
        setUploadFeedback(null);
        setIsUploading(false);
      }, 1500);
    } else {
      setUploadFeedback(`✗ Auto-Rejected: ${verifiedDoc.flaggedReason || 'Validation failed'}`);
      setIsUploading(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        
        {/* Profile Header Banner */}
        <div className="enterprise-card rounded-xl p-6 sm:p-7 relative overflow-hidden space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-slate-200 dark:ring-slate-700 shadow-sm"
                />
                <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full border-2 border-white dark:border-slate-900">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{student.name}</h1>
                  <span className="status-pill status-pill-blue">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Student
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  {student.degree} in {student.branch} • {student.institution}
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <span>Semester: <strong className="text-slate-800 dark:text-slate-200">{student.semester}th</strong></span>
                  <span>CGPA: <strong className="text-slate-800 dark:text-slate-200">{student.cgpa} / 10.0</strong></span>
                  <span>Readiness: <strong className="text-emerald-600 dark:text-emerald-400">{student.readinessScore}/100</strong></span>
                </div>
              </div>
            </div>

            {/* Assessment Badge Action */}
            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-3.5 rounded-xl text-right space-y-2 shrink-0">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Last Assessment Date</div>
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 justify-end">
                <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{student.lastAssessmentDate || 'Recently Completed'}</span>
              </div>
              <div className="flex items-center gap-2 justify-end pt-1">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(true)}
                  className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-2.5 py-1 rounded-lg text-xs font-semibold transition shadow-sm cursor-pointer"
                >
                  <Upload className="w-3 h-3" />
                  <span>Upload Credential</span>
                </button>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-lg text-xs font-semibold transition shadow-sm"
                >
                  <FolderGit2 className="w-3 h-3" />
                  <span>Digital Portfolio</span>
                </Link>
                <Link
                  href="/assessment"
                  className="enterprise-btn-primary px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <BrainCircuit className="w-3 h-3" />
                  <span>Retake Quiz</span>
                </Link>
              </div>
            </div>

          </div>

          {/* Target Role & Career Interests Bar */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Target className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">Target Industry Role:</span>
                {isEditingRole ? (
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="text"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button onClick={handleSaveRole} className="enterprise-btn-primary px-2.5 py-1 rounded-lg text-xs font-semibold">
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{student.targetRole}</span>
                    <button onClick={() => setIsEditingRole(true)} className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Career Interests Pills */}
            <div className="flex items-center gap-1.5 flex-wrap text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium text-[11px]">Interests:</span>
              {student.careerInterests.map((interest, idx) => (
                <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SkillProfile Component */}
        <SkillProfile />

        {/* Verified vs Unverified Skills Section */}
        <div className="enterprise-card rounded-xl p-6 sm:p-7 space-y-6">
          
          {/* Filter Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Skill Inventory & Proficiency Matrix</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Total skills mapped: {student.skills.length}</p>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1 rounded-md transition ${activeTab === 'all' ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
              >
                All Skills ({student.skills.length})
              </button>
              <button
                onClick={() => setActiveTab('verified')}
                className={`px-3 py-1 rounded-md transition ${activeTab === 'verified' ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
              >
                Verified ({verifiedCount})
              </button>
              <button
                onClick={() => setActiveTab('unverified')}
                className={`px-3 py-1 rounded-md transition ${activeTab === 'unverified' ? 'bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-400 shadow-sm font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
              >
                Self-Reported ({unverifiedCount})
              </button>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredSkills.map(skill => (
              <div key={skill.id} className="enterprise-row rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{skill.name}</span>
                    {skill.verified ? (
                      <span className="status-pill status-pill-green text-[10px]">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    ) : (
                      <span className="status-pill status-pill-amber text-[10px]">
                        Unverified
                      </span>
                    )}
                  </div>

                  <span className="font-bold text-blue-600 dark:text-blue-400">{skill.level}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      skill.verified ? 'bg-emerald-600 dark:bg-emerald-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
                  <span>Category: {skill.category}</span>
                  <span>Demand: <strong className="text-slate-700 dark:text-slate-300">{skill.demandLevel}</strong></span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Verified Certifications Section */}
        <div className="enterprise-card rounded-xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Verified Certifications & Credentials ({student.certifications.length})</span>
            </h3>
            <button 
              type="button"
              onClick={() => setShowUploadModal(true)}
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Certification</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {student.certifications.map(cert => (
              <div key={cert.id} className="enterprise-row rounded-xl p-4 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">{cert.issuer}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{cert.title}</h4>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span>Issued: {cert.issueDate}</span>
                  <span className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 cursor-pointer font-medium">
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Upload Credential Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="enterprise-card rounded-2xl max-w-md w-full p-6 space-y-4 shadow-enterprise-modal border border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Add Verified Credential</h3>
              </div>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleModalUpload} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-600 dark:text-slate-300 font-medium">Document Category</label>
                <select
                  value={modalCategory}
                  onChange={(e) => setModalCategory(e.target.value as DocumentCategory)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="certifications">Industry Certification</option>
                  <option value="transcripts">Academic Marksheet</option>
                  <option value="internship_reports">Internship Completion Record</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-600 dark:text-slate-300 font-medium">Issuer</label>
                  <select
                    value={modalIssuer}
                    onChange={(e) => setModalIssuer(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="Coursera">Coursera</option>
                    <option value="NPTEL">NPTEL / IIT</option>
                    <option value="AWS">Amazon AWS</option>
                    <option value="Google">Google Cloud</option>
                    <option value="Microsoft">Microsoft</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-600 dark:text-slate-300 font-medium">Cert ID or URL (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 937BXZ7E or Verify link"
                    value={modalCertId}
                    onChange={(e) => setModalCertId(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-600 dark:text-slate-300 font-medium">Upload Certificate (PDF / Image)</label>
                <input
                  type="file"
                  required
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => setModalFile(e.target.files?.[0] || null)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-slate-700 dark:text-slate-300 text-xs"
                />
              </div>

              {uploadFeedback && (
                <div className={`p-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 ${
                  uploadFeedback.startsWith('✓')
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : uploadFeedback.startsWith('⏳')
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : uploadFeedback.startsWith('✗')
                    ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    : 'bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-pulse'
                }`}>
                  <span>{uploadFeedback}</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="enterprise-btn-secondary px-3 py-1.5 rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading || !modalFile}
                  className="enterprise-btn-primary px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Validating...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      <span>Auto-Verify & Add</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
