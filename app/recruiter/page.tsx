'use client';

import React, { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { supabase } from '@/lib/supabase/client';
import { Briefcase, Users, Search, ChevronRight, CheckCircle2, UserPlus, Filter, Plus } from 'lucide-react';

export default function RecruiterPortal() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'candidates' | 'applications'>('jobs');
  const [jobs, setJobs] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  
  // Job Post Form
  const [showJobForm, setShowJobForm] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', description: '', skills: '', stipend: '', location: '' });

  // Selected Job for matching
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  // Seeded recruiter ID from 006_recruiter_schema.sql
  const recruiterId = '55555555-0000-0000-0000-000000000001';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [{ data: jData }, { data: sData }, { data: aData }] = await Promise.all([
      supabase.from('industry_jobs').select('*').eq('recruiter_id', recruiterId).order('created_at', { ascending: false }),
      supabase.from('students').select('*').limit(20),
      supabase.from('job_applications').select('*, industry_jobs(title)').order('applied_at', { ascending: false })
    ]);
    
    if (jData) setJobs(jData);
    if (sData) setStudents(sData);
    if (aData) setApplications(aData);
  };

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = newJob.skills.split(',').map(s => s.trim()).filter(Boolean);
    
    await supabase.from('industry_jobs').insert({
      recruiter_id: recruiterId,
      title: newJob.title,
      description: newJob.description,
      required_skills: skillsArray,
      stipend: newJob.stipend,
      location: newJob.location
    });

    setShowJobForm(false);
    setNewJob({ title: '', description: '', skills: '', stipend: '', location: '' });
    fetchData();
  };

  const handleShortlist = async (studentId: string, jobId: string, score: number) => {
    try {
      await supabase.from('job_applications').insert({
        job_id: jobId,
        student_id: studentId,
        match_score: score,
        status: 'Shortlisted'
      });
      alert('Candidate shortlisted successfully!');
      fetchData();
    } catch (e) {
      console.error(e);
      alert('Candidate already applied or shortlisted.');
    }
  };

  const handleUpdateStatus = async (appId: string, newStatus: string) => {
    await supabase.from('job_applications').update({ status: newStatus }).eq('id', appId);
    fetchData();
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Recruiter Dashboard</h1>
          <p className="text-sm text-slate-500">Post opportunities, discover top talent, and manage applications.</p>
        </div>

        {/* Analytics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="enterprise-card p-4 rounded-xl border border-slate-200 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><Briefcase /></div>
            <div>
              <div className="text-2xl font-bold">{jobs.length}</div>
              <div className="text-xs text-slate-500">Active Jobs</div>
            </div>
          </div>
          <div className="enterprise-card p-4 rounded-xl border border-slate-200 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center"><Users /></div>
            <div>
              <div className="text-2xl font-bold">{applications.length}</div>
              <div className="text-xs text-slate-500">Total Applications</div>
            </div>
          </div>
          <div className="enterprise-card p-4 rounded-xl border border-slate-200 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center"><CheckCircle2 /></div>
            <div>
              <div className="text-2xl font-bold">{applications.filter(a => a.status === 'Shortlisted' || a.status === 'Interview').length}</div>
              <div className="text-xs text-slate-500">Candidates Shortlisted</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800">
          <button onClick={() => setActiveTab('jobs')} className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'jobs' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}>My Jobs</button>
          <button onClick={() => setActiveTab('candidates')} className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'candidates' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}>Discover Candidates</button>
          <button onClick={() => setActiveTab('applications')} className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'applications' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}>Manage Applications</button>
        </div>

        {activeTab === 'jobs' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-slate-900">Posted Opportunities</h2>
              <button onClick={() => setShowJobForm(!showJobForm)} className="enterprise-btn py-2 text-sm flex items-center gap-2">
                <Plus className="w-4 h-4" /> Post New Job
              </button>
            </div>

            {showJobForm && (
              <form onSubmit={handlePostJob} className="enterprise-card p-6 rounded-xl space-y-4 border border-slate-200">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs font-bold text-slate-700 mb-1">Job Title</label><input required value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} className="w-full enterprise-input" /></div>
                  <div><label className="block text-xs font-bold text-slate-700 mb-1">Location</label><input required value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} className="w-full enterprise-input" /></div>
                  <div><label className="block text-xs font-bold text-slate-700 mb-1">Stipend / Salary</label><input required value={newJob.stipend} onChange={e => setNewJob({...newJob, stipend: e.target.value})} className="w-full enterprise-input" /></div>
                  <div><label className="block text-xs font-bold text-slate-700 mb-1">Required Skills (comma separated)</label><input required value={newJob.skills} onChange={e => setNewJob({...newJob, skills: e.target.value})} placeholder="React, Node.js, Python" className="w-full enterprise-input" /></div>
                </div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Description</label><textarea required value={newJob.description} onChange={e => setNewJob({...newJob, description: e.target.value})} className="w-full enterprise-input" /></div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowJobForm(false)} className="enterprise-btn-secondary py-2">Cancel</button>
                  <button type="submit" className="enterprise-btn py-2">Publish Job</button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 gap-4">
              {jobs.map(job => (
                <div key={job.id} className="enterprise-card p-5 rounded-xl border border-slate-200 flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-slate-900">{job.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">{job.location} • {job.stipend}</p>
                    <div className="flex gap-2 mt-3">
                      {(job.required_skills || []).map((skill: string) => (
                        <span key={skill} className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="status-pill status-pill-green">{job.status}</span>
                    <button 
                      onClick={() => { setSelectedJobId(job.id); setActiveTab('candidates'); }}
                      className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                    >
                      Find Matches →
                    </button>
                  </div>
                </div>
              ))}
              {jobs.length === 0 && <div className="p-8 text-center text-slate-500">No jobs posted yet.</div>}
            </div>
          </div>
        )}

        {activeTab === 'candidates' && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <label className="font-bold text-sm text-slate-700 shrink-0">Match candidates for:</label>
              <select 
                className="enterprise-input flex-1"
                value={selectedJobId || ''}
                onChange={e => setSelectedJobId(e.target.value)}
              >
                <option value="">Select a job...</option>
                {jobs.map(job => <option key={job.id} value={job.id}>{job.title}</option>)}
              </select>
            </div>

            {selectedJobId ? (
              <div className="enterprise-card rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Match Score</th>
                      <th className="px-6 py-4 font-semibold">Candidate Name</th>
                      <th className="px-6 py-4 font-semibold">Target Role</th>
                      <th className="px-6 py-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {/* Mock matching engine results */}
                    {students.map((s, idx) => {
                      // Fake match score for demo: 95, 88, 82, 75...
                      const matchScore = Math.max(50, 95 - (idx * 7));
                      return (
                        <tr key={s.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4">
                            <span className={`font-bold ${matchScore >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>{matchScore}% Match</span>
                          </td>
                          <td className="px-6 py-4 font-medium text-slate-900">{s.name}</td>
                          <td className="px-6 py-4 text-slate-500">{s.target_role || 'Software Engineer'}</td>
                          <td className="px-6 py-4">
                            <button onClick={() => handleShortlist(s.id, selectedJobId, matchScore)} className="enterprise-btn-secondary py-1.5 px-3 text-xs flex items-center gap-1">
                              <UserPlus className="w-3.5 h-3.5" /> Shortlist
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center text-slate-500 border border-dashed rounded-xl">
                Please select a job above to view AI-matched candidates.
              </div>
            )}
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="enterprise-card rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Candidate</th>
                  <th className="px-6 py-4 font-semibold">Job Title</th>
                  <th className="px-6 py-4 font-semibold">Match</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map(app => (
                  <tr key={app.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">Student ID: {app.student_id.substring(0,6)}...</td>
                    <td className="px-6 py-4 text-slate-600">{app.industry_jobs?.title || 'Unknown'}</td>
                    <td className="px-6 py-4 font-bold text-slate-700">{app.match_score}%</td>
                    <td className="px-6 py-4">
                      <span className={`status-pill ${app.status === 'Applied' ? 'status-pill-blue' : app.status === 'Shortlisted' ? 'status-pill-amber' : app.status === 'Interview' ? 'status-pill-purple' : 'status-pill-green'}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        className="enterprise-input py-1 text-xs"
                        value={app.status}
                        onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                      >
                        <option value="Applied">Applied</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview">Interview</option>
                        <option value="Offered">Offered</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {applications.length === 0 && (
                  <tr><td colSpan={5} className="p-8 text-center text-slate-500">No applications found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </AppLayout>
  );
}
