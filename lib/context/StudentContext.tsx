'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole,
  StudentProfile, 
  Opportunity, 
  ApplicationRecord, 
  SkillGapItem,
  FacultyOpportunity,
  FacultyApplication,
  CollaborationInitiative,
  MentorshipSession,
  LearningResource,
  StudentPortfolioProject,
  DocumentRecord,
  VerificationLog
} from '@/types';
import { MOCK_STUDENTS } from '@/lib/mockData/students';
import { MOCK_OPPORTUNITIES } from '@/lib/mockData/opportunities';
import { MOCK_FACULTY_OPPORTUNITIES, MOCK_FACULTY_APPLICATIONS } from '@/lib/mockData/facultyOpportunities';
import { MOCK_COLLABORATION_INITIATIVES, MOCK_MENTORSHIP_SESSIONS } from '@/lib/mockData/collaborationData';
import { MOCK_INSTITUTION_DATA, InstitutionSummary } from '@/lib/mockData/institutionData';
import { MOCK_LEARNING_RESOURCES } from '@/lib/mockData/learningResources';
import { INITIAL_DOCUMENTS, INITIAL_VERIFICATION_LOGS } from '@/lib/mockData/documentData';
import { calculateOpportunityMatch } from '@/lib/services/matchEngine';
import { 
  verifyCertificate, 
  verifyAcademicRecord, 
  verifyInternshipRecord, 
  verifyGenericDocumentOCR,
  verifyIdProof
} from '@/lib/services/verificationEngine';
import { toastService } from '@/components/common/Toast';
import { supabase } from '@/lib/supabase/client';
import { computeStudentSkillGaps, getDefaultRoleForCluster, resolveStudentCluster, getDefaultSkillsForCluster, generateIndianStudentUID } from '@/lib/constants/benchmarks';

interface StudentContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  student: StudentProfile;
  allStudents: StudentProfile[];
  opportunities: Opportunity[];
  applications: ApplicationRecord[];
  savedOpportunityIds: string[];
  facultyOpportunities: FacultyOpportunity[];
  facultyApplications: FacultyApplication[];
  collaborationInitiatives: CollaborationInitiative[];
  mentorshipSessions: MentorshipSession[];
  institutionData: InstitutionSummary;
  learningResources: LearningResource[];
  documents: DocumentRecord[];
  verificationLogs: VerificationLog[];
  automationRate: number; // Percentage auto-verified or rejected
  
  // Actions
  submitAssessment: (answers: Record<string, number>) => void;
  applyForOpportunity: (opportunityId: string, notes?: string) => boolean;
  toggleSaveOpportunity: (opportunityId: string) => void;
  updateTargetRole: (role: string) => void;
  getOpportunityById: (id: string) => Opportunity | undefined;
  
  // Smart Automated Verification Actions
  processDocumentVerification: (docInput: {
    studentId: string;
    category: DocumentRecord['category'];
    title: string;
    filePath: string;
    fileBlob?: File | Blob;
    issuer?: string;
    certificateId?: string;
    cgpa?: number;
    enrollmentNumber?: string;
  }) => Promise<DocumentRecord>;
  resolveExceptionDocument: (documentId: string, decision: 'approve' | 'reject', reviewNote?: string) => void;
  
  // Industry / Recruiter Actions
  addOpportunity: (opportunity: Omit<Opportunity, 'id'>) => Opportunity;
  updateApplicationStatus: (applicationId: string, newStatus: ApplicationRecord['status']) => void;
  addLearningResource: (resource: Omit<LearningResource, 'id'>) => void;
  
  // Academician Actions
  applyFacultyOpportunity: (opportunityId: string, proposalNote: string) => boolean;
  updateFacultyApplicationStatus: (applicationId: string, newStatus: FacultyApplication['status'], feedback?: string) => void;
  
  // Student Portfolio Actions
  addProjectToPortfolio: (project: Omit<StudentPortfolioProject, 'id'>) => void;
  
  // Registration & Verification Actions
  registerStudent: (data: Partial<StudentProfile>) => StudentProfile;
  verifyStudentCredential: (studentId: string) => void;
  
  // Mentorship & Collaboration Actions
  bookMentorshipSlot: (mentorId: string, slot: string) => boolean;

  // Authentication Actions
  logout: () => Promise<void>;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current active persona
  const [currentRole, setCurrentRoleState] = useState<UserRole>('student');
  
  // Core Entities
  const [student, setStudent] = useState<StudentProfile>(MOCK_STUDENTS[0]);
  const [allStudents, setAllStudents] = useState<StudentProfile[]>(MOCK_STUDENTS);
  const [rawOpportunities, setRawOpportunities] = useState<Opportunity[]>(MOCK_OPPORTUNITIES);
  const [savedOpportunityIds, setSavedOpportunityIds] = useState<string[]>(['opp-1', 'opp-3']);
  
  const [applications, setApplications] = useState<ApplicationRecord[]>([
    {
      id: 'app-1',
      opportunityId: 'opp-3',
      opportunityTitle: 'Software Engineer Trainee — TCS iON Campus Programme',
      company: 'Tata Consultancy Services (TCS)',
      studentName: 'Arjun Mehta',
      studentEmail: 'arjun.mehta@dtu.ac.in',
      studentBranch: 'Computer Science and Engineering',
      studentCgpa: 8.65,
      appliedDate: '2026-08-30',
      status: 'Interview Scheduled',
      matchScoreAtApplication: 82,
      notes: 'TCS NQT Score: 78/100 (above 60-percentile cutoff). Matched: Python ✓ DSA ✓ SQL ✓ Git ✓. Technical Round 1 completed Sept 04. Final Interview: Sept 14.',
      timeline: [
        { step: 'Application Submitted', date: '2026-08-30', completed: true },
        { step: 'TCS NQT Score Verified (78/100)', date: '2026-09-01', completed: true },
        { step: 'Technical Round 1', date: '2026-09-04', completed: true },
        { step: 'Final HR Interview', date: '2026-09-14', completed: false },
      ]
    },
    {
      id: 'app-2',
      opportunityId: 'opp-5',
      opportunityTitle: 'Research Associate — AI4Science Lab',
      company: 'IIT Delhi Department of CSE',
      studentName: 'Arjun Mehta',
      studentEmail: 'arjun.mehta@dtu.ac.in',
      studentBranch: 'Computer Science and Engineering',
      studentCgpa: 8.65,
      appliedDate: '2026-08-22',
      status: 'Under Review',
      matchScoreAtApplication: 74,
      notes: 'Matched: Python ✓ ML ✓ Research Methodology ✓ Git ✓. Missing: TensorFlow/PyTorch (mandatory — flagged). GATE Qualified: Yes. Prof. recommendation letter pending.',
      timeline: [
        { step: 'Application Submitted', date: '2026-08-22', completed: true },
        { step: 'Portfolio & Credentials Verified', date: '2026-08-26', completed: true },
        { step: 'Faculty Shortlisting', date: '2026-09-03', completed: true }
      ]
    },
    {
      id: 'app-3',
      opportunityId: 'opp-1',
      opportunityTitle: 'ML Research Intern — Remote Sensing & Earth Observation',
      company: 'ISRO Space Applications Centre (SAC)',
      studentName: 'Meera Krishnaswamy',
      studentEmail: 'meera.k@iitd.ac.in',
      studentBranch: 'Electrical Engineering (VLSI Specialisation)',
      studentCgpa: 9.10,
      appliedDate: '2026-09-02',
      status: 'Shortlisted',
      matchScoreAtApplication: 88,
      notes: 'Matched: Python ✓ ML Fundamentals ✓ Git ✓ Pandas ✓. PyTorch: partial (42%) — under review by ISRO SAC scientist. CGPA 9.10 ≥ 8.0 ✓.',
      timeline: [
        { step: 'Application Submitted', date: '2026-09-02', completed: true },
        { step: 'Candidate Shortlisted by SAC', date: '2026-09-06', completed: true }
      ]
    }
  ]);

  const [facultyOpportunities, setFacultyOpportunities] = useState<FacultyOpportunity[]>(MOCK_FACULTY_OPPORTUNITIES);
  const [facultyApplications, setFacultyApplications] = useState<FacultyApplication[]>(MOCK_FACULTY_APPLICATIONS);
  const [collaborationInitiatives, setCollaborationInitiatives] = useState<CollaborationInitiative[]>(MOCK_COLLABORATION_INITIATIVES);
  const [mentorshipSessions, setMentorshipSessions] = useState<MentorshipSession[]>(MOCK_MENTORSHIP_SESSIONS);
  const [institutionData, setInstitutionData] = useState<InstitutionSummary>(MOCK_INSTITUTION_DATA);
  const [learningResources, setLearningResources] = useState<LearningResource[]>(MOCK_LEARNING_RESOURCES);
  const [documents, setDocuments] = useState<DocumentRecord[]>(INITIAL_DOCUMENTS);
  const [verificationLogs, setVerificationLogs] = useState<VerificationLog[]>(INITIAL_VERIFICATION_LOGS);

  // Compute live automation rate: auto-verified or rejected vs total logs
  const autoProcessedCount = verificationLogs.filter(l => l.method !== 'manual_exception').length;
  const totalLogsCount = verificationLogs.length || 1;
  const automationRate = Math.round((autoProcessedCount / totalLogsCount) * 100);

  // Load any local storage cache safely on mount
  useEffect(() => {
    try {
      const savedRole = localStorage.getItem('skillbridge_role') as UserRole | null;
      if (savedRole) setCurrentRoleState(savedRole);

      const savedDocs = localStorage.getItem('skillbridge_documents');
      if (savedDocs) setDocuments(JSON.parse(savedDocs));

      const savedLogs = localStorage.getItem('skillbridge_verification_logs');
      if (savedLogs) setVerificationLogs(JSON.parse(savedLogs));

      const savedOpps = localStorage.getItem('skillbridge_opportunities');
      if (savedOpps) setRawOpportunities(JSON.parse(savedOpps));

      const savedApps = localStorage.getItem('skillbridge_applications');
      if (savedApps) setApplications(JSON.parse(savedApps));

      const savedFacApps = localStorage.getItem('skillbridge_faculty_applications');
      if (savedFacApps) setFacultyApplications(JSON.parse(savedFacApps));

      const savedStudent = localStorage.getItem('skillbridge_registered_student');
      if (savedStudent) {
        const parsed = JSON.parse(savedStudent);
        parsed.engineeringCluster = resolveStudentCluster(parsed);
        if (!parsed.targetRole || parsed.targetRole === 'Engineering Student') {
          parsed.targetRole = getDefaultRoleForCluster(parsed.engineeringCluster);
        }
        if (!parsed.skills || parsed.skills.length === 0) {
          parsed.skills = getDefaultSkillsForCluster(parsed.engineeringCluster);
        }
        if (!parsed.studentUid) {
          parsed.studentUid = generateIndianStudentUID(parsed);
        }
        parsed.topGaps = computeStudentSkillGaps(parsed);
        setStudent(parsed);
        setAllStudents(prev => {
          const exists = prev.some(s => s.id === parsed.id);
          if (exists) {
            return prev.map(s => s.id === parsed.id ? parsed : s);
          }
          return [parsed, ...prev];
        });
        try {
          localStorage.setItem('skillbridge_registered_student', JSON.stringify(parsed));
        } catch (e) {}
      }
    } catch (e) {
      console.warn('LocalStorage error or not available', e);
    }
  }, []);

  // Supabase Auth Session Listener & Profile Synchronization
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;

    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          const u = session.user;
          const fullName = u.user_metadata?.full_name || u.user_metadata?.name || u.email?.split('@')[0] || 'Engineering Student';
          const avatarUrl = u.user_metadata?.avatar_url || u.user_metadata?.picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=256';
          
          setStudent(prev => {
            const updated = {
              ...prev,
              email: u.email || prev.email,
              name: fullName || prev.name,
              avatar: avatarUrl || prev.avatar,
            };
            try {
              localStorage.setItem('skillbridge_registered_student', JSON.stringify(updated));
            } catch (e) {}
            return updated;
          });
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    } catch (e) {}
  }, []);

  // Supabase Realtime Subscription: Sync document verification & student profile live
  useEffect(() => {
    if (!student?.id || !process.env.NEXT_PUBLIC_SUPABASE_URL) return;

    try {
      const channel = supabase
        .channel(`documents:student:${student.id}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'document_records',
            filter: `student_id=eq.${student.id}`,
          },
          async (payload) => {
            try {
              // Sync updated student profile & readiness score from Supabase
              const { data, error } = await supabase
                .from('students')
                .select('*')
                .eq('id', student.id)
                .single();

              if (!error && data) {
                setStudent(prev => ({ ...prev, ...data }));
                setAllStudents(prev => prev.map(s => s.id === data.id ? { ...s, ...data } : s));
              }

              // Also sync updated documents for this student
              const { data: updatedDocs } = await supabase
                .from('document_records')
                .select('*')
                .eq('student_id', student.id);

              if (updatedDocs && updatedDocs.length > 0) {
                setDocuments(prev => {
                  const map = new Map(prev.map(d => [d.id, d]));
                  updatedDocs.forEach((d: any) => {
                    map.set(d.id, {
                      id: d.id,
                      studentId: d.student_id,
                      studentName: student.name,
                      studentEmail: student.email,
                      category: d.document_type || 'certifications',
                      title: d.title || 'Verified Document',
                      filePath: d.file_path,
                      verificationStatus: d.verification_status,
                      verificationMethod: d.verification_method,
                      flaggedReason: d.flagged_reason,
                      submittedAt: d.created_at,
                      verifiedAt: d.updated_at
                    });
                  });
                  return Array.from(map.values());
                });
              }
            } catch (fetchErr) {
              console.warn('Realtime profile sync error:', fetchErr);
            }
          }
        )
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'students',
            filter: `id=eq.${student.id}`
          },
          (payload) => {
            const updatedData = payload.new;
            if (updatedData.readiness_score !== undefined) {
              setStudent(prev => ({ ...prev, readinessScore: updatedData.readiness_score, targetRole: updatedData.target_role_id || prev.targetRole }));
            }
          }
        )
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'skill_scores',
            filter: `student_id=eq.${student.id}`
          },
          async (payload) => {
            // Re-fetch skill scores to sync with the mock context
            const { data: scores } = await supabase
              .from('skill_scores')
              .select('*')
              .eq('student_id', student.id);
            if (scores && scores.length > 0) {
              setStudent(prev => {
                const updatedSkills = prev.skills.map(skill => {
                  const sScore = scores.find((s: any) => s.skill_name === skill.name);
                  if (sScore) {
                    return { ...skill, level: sScore.score, verified: sScore.verification_status !== 'unverified' };
                  }
                  return skill;
                });
                return { ...prev, skills: updatedSkills };
              });
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } catch (subErr) {
      console.warn('Realtime subscription initialization error:', subErr);
    }
  }, [student?.id]);

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    try {
      localStorage.setItem('skillbridge_role', role);
    } catch (e) {}
  };

  // Compute live match scores for all opportunities against active student profile
  const opportunities = rawOpportunities.map(opp => {
    const matchDetails = calculateOpportunityMatch(student, opp);
    return {
      ...opp,
      matchScore: matchDetails.finalMatchScore,
      matchDetails: {
        finalMatchScore: matchDetails.finalMatchScore,
        skillMatchPercentage: matchDetails.skillMatchScore,
        eligibilityMatchPercentage: matchDetails.eligibilityScore,
        careerInterestPercentage: matchDetails.careerInterestScore,
        matchedSkills: matchDetails.matchedSkills,
        missingSkills: matchDetails.missingSkills,
        isEligible: matchDetails.isEligible,
        whyRecommended: matchDetails.whyRecommended
      }
    };
  }).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

  const getOpportunityById = (id: string) => {
    return opportunities.find(o => o.id === id);
  };

  const toggleSaveOpportunity = (id: string) => {
    setSavedOpportunityIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const updateTargetRole = (newRole: string) => {
    setStudent(prev => {
      const updatedGaps = computeStudentSkillGaps({ ...prev, targetRole: newRole });
      const updated = {
        ...prev,
        targetRole: newRole,
        topGaps: updatedGaps
      };
      try {
        localStorage.setItem('skillbridge_registered_student', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const submitAssessment = (answers: Record<string, number>) => {
    const scores = Object.values(answers);
    if (scores.length === 0) return;

    const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const newReadinessScore = Math.max(40, Math.min(98, Math.round(avgScore * 0.95 + 10)));

    const updatedSkills = student.skills.map(skill => {
      const boost = Math.min(15, Math.round((avgScore / 100) * 12));
      const newLevel = Math.min(100, skill.level + boost);
      return {
        ...skill,
        level: newLevel,
        verified: newLevel >= 70 ? true : skill.verified
      };
    });

    const newGaps = computeStudentSkillGaps({
      ...student,
      skills: updatedSkills
    });

    const updated = {
      ...student,
      readinessScore: newReadinessScore,
      assessmentCompleted: true,
      lastAssessmentDate: new Date().toISOString().split('T')[0],
      skills: updatedSkills,
      topGaps: newGaps
    };

    setStudent(updated);
    setAllStudents(prev => prev.map(s => s.id === updated.id ? updated : s));

    try {
      localStorage.setItem('skillbridge_registered_student', JSON.stringify(updated));
    } catch (e) {}
  };

  const applyForOpportunity = (opportunityId: string, notes?: string): boolean => {
    const opp = getOpportunityById(opportunityId);
    if (!opp) return false;

    if (applications.some(a => a.opportunityId === opportunityId && a.studentEmail === student.email)) {
      return false;
    }

    const newApp: ApplicationRecord = {
      id: `app-${Date.now()}`,
      opportunityId: opp.id,
      opportunityTitle: opp.title,
      company: opp.company,
      studentName: student.name,
      studentEmail: student.email,
      studentBranch: student.branch,
      studentCgpa: student.cgpa,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Submitted',
      matchScoreAtApplication: opp.matchScore || 85,
      notes: notes || 'Applied via SkillBridge.ai automated portal with verified digital credentials.',
      timeline: [
        { step: 'Application Submitted', date: new Date().toISOString().split('T')[0], completed: true },
        { step: 'Digital Portfolio & Match Score Verified', date: new Date().toISOString().split('T')[0], completed: true },
        { step: 'Recruiter Screening', date: 'Pending', completed: false },
        { step: 'Technical Interview', date: 'Pending', completed: false }
      ]
    };

    const updated = [newApp, ...applications];
    setApplications(updated);
    try {
      localStorage.setItem('skillbridge_applications', JSON.stringify(updated));
    } catch (e) {}

    toastService.notify('success', `Application submitted to ${opp.company} successfully!`);
    return true;
  };

  // Industry / Recruiter: Post new opportunity
  const addOpportunity = (newOppData: Omit<Opportunity, 'id'>): Opportunity => {
    const newId = `opp-${Date.now()}`;
    const newOpportunity: Opportunity = {
      ...newOppData,
      id: newId,
      companyLogo: newOppData.companyLogo || 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=128&auto=format&fit=crop&q=80'
    };

    const updated = [newOpportunity, ...rawOpportunities];
    setRawOpportunities(updated);
    try {
      localStorage.setItem('skillbridge_opportunities', JSON.stringify(updated));
    } catch (e) {}

    return newOpportunity;
  };

  // Industry / Recruiter: Update student application status in ATS
  const updateApplicationStatus = (applicationId: string, newStatus: ApplicationRecord['status']) => {
    const updated = applications.map(app => {
      if (app.id === applicationId) {
        const today = new Date().toISOString().split('T')[0];
        const updatedTimeline = [...app.timeline];

        // Add or update timeline milestone
        if (newStatus === 'Interview Scheduled' && !updatedTimeline.some(t => t.step === 'Interview Scheduled')) {
          updatedTimeline.push({ step: 'Interview Scheduled', date: today, completed: true });
        } else if (newStatus === 'Shortlisted' && !updatedTimeline.some(t => t.step === 'Candidate Shortlisted')) {
          updatedTimeline.push({ step: 'Candidate Shortlisted', date: today, completed: true });
        } else if (newStatus === 'Offered' && !updatedTimeline.some(t => t.step === 'Formal Offer Issued')) {
          updatedTimeline.push({ step: 'Formal Offer Issued', date: today, completed: true });
        }

        // Auto-populate Digital Portfolio when Offered
        if (newStatus === 'Offered' && app.status !== 'Offered') {
          setStudent(prevStudent => {
            if (prevStudent.email !== app.studentEmail) return prevStudent; // Only if it's current student
            const newInternship = {
              id: `int-${Date.now()}`,
              role: app.opportunityTitle,
              company: app.company,
              duration: '6 Months (Upcoming)',
              verified: true
            };
            const updatedProfile = {
              ...prevStudent,
              internshipsCompleted: [newInternship, ...(prevStudent.internshipsCompleted || [])]
            };
            try {
              localStorage.setItem('skillbridge_registered_student', JSON.stringify(updatedProfile));
            } catch (e) {}
            return updatedProfile;
          });
          
          // Also update in allStudents
          setAllStudents(prevAll => prevAll.map(s => {
            if (s.email !== app.studentEmail) return s;
            const newInternship = {
              id: `int-${Date.now()}`,
              role: app.opportunityTitle,
              company: app.company,
              duration: '6 Months (Upcoming)',
              verified: true
            };
            return {
              ...s,
              internshipsCompleted: [newInternship, ...(s.internshipsCompleted || [])]
            };
          }));
        }

        return {
          ...app,
          status: newStatus,
          timeline: updatedTimeline
        };
      }
      return app;
    });

    setApplications(updated);
    try {
      localStorage.setItem('skillbridge_applications', JSON.stringify(updated));
    } catch (e) {}
    toastService.notify('success', `Candidate stage updated to ${newStatus}`);
  };

  // Industry / Recruiter: Publish new course or workshop
  const addLearningResource = (resource: Omit<LearningResource, 'id'>) => {
    const newResource: LearningResource = {
      ...resource,
      id: `lr-${Date.now()}`
    };
    setLearningResources(prev => [newResource, ...prev]);
  };

  // Academician: Apply for Faculty Internship / FDP / Research
  const applyFacultyOpportunity = (opportunityId: string, proposalNote: string): boolean => {
    const opp = facultyOpportunities.find(f => f.id === opportunityId);
    if (!opp) return false;

    const newApp: FacultyApplication = {
      id: `f-app-${Date.now()}`,
      opportunityId: opp.id,
      opportunityTitle: opp.title,
      organization: opp.organization,
      type: opp.type,
      facultyName: 'Dr. Priya Raghunathan',
      facultyDesignation: 'Associate Professor',
      department: 'Electrical Engineering (EED)',
      institution: 'Delhi Technological University, New Delhi',
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Proposal Submitted',
      proposalNote
    };

    const updated = [newApp, ...facultyApplications];
    setFacultyApplications(updated);
    try {
      localStorage.setItem('skillbridge_faculty_applications', JSON.stringify(updated));
    } catch (e) {}

    return true;
  };

  // Academician: Update Faculty Internship / FDP / Research status
  const updateFacultyApplicationStatus = (applicationId: string, newStatus: FacultyApplication['status'], feedback?: string) => {
    const updated = facultyApplications.map(app => {
      if (app.id === applicationId) {
        
        // Auto-populate Project Portfolio if Completed
        if (newStatus === 'Completed' && app.status !== 'Completed') {
          const newProject = {
            id: `proj-${Date.now()}`,
            title: `Capstone / Research: ${app.opportunityTitle}`,
            description: `Research collaboration with ${app.organization}. Faculty Feedback: ${feedback || 'Successfully completed research deliverables.'}`,
            techStack: ['Research', app.type],
            verifiedBy: app.facultyName
          };
          setStudent(prev => ({
            ...prev,
            projects: [newProject, ...(prev.projects || [])]
          }));
        }

        return {
          ...app,
          status: newStatus,
          proposalNote: feedback ? `${app.proposalNote}\n\n[Faculty Feedback]: ${feedback}` : app.proposalNote
        };
      }
      return app;
    });

    setFacultyApplications(updated);
    try {
      localStorage.setItem('skillbridge_faculty_applications', JSON.stringify(updated));
    } catch (e) {}
  };

  // Student: Add Project to Verified Portfolio
  const addProjectToPortfolio = (project: Omit<StudentPortfolioProject, 'id'>) => {
    const newProject: StudentPortfolioProject = {
      ...project,
      id: `proj-${Date.now()}`
    };
    setStudent(prev => ({
      ...prev,
      projects: [newProject, ...(prev.projects || [])]
    }));
  };

  // Registration: Create new student and set as active session
  const registerStudent = (data: Partial<StudentProfile>): StudentProfile => {
    const newId = `std-${Date.now()}`;
    const resolvedCluster = data.engineeringCluster || resolveStudentCluster(data);
    const resolvedRole = data.targetRole || getDefaultRoleForCluster(resolvedCluster);
    const resolvedSkills = (data.skills && data.skills.length > 0) 
      ? data.skills 
      : getDefaultSkillsForCluster(resolvedCluster);

    const initialGaps = computeStudentSkillGaps({
      targetRole: resolvedRole,
      engineeringCluster: resolvedCluster,
      branch: data.branch,
      skills: resolvedSkills
    });

    const newStudent: StudentProfile = {
      id: newId,
      name: data.name || 'New Student',
      email: data.email || 'student@dtu.ac.in',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=256',
      institution: data.institution || data.college || 'Delhi Technological University (DTU)',
      college: data.college || data.institution || 'Delhi Technological University (DTU)',
      degree: data.degree || 'B.Tech',
      branch: data.branch || 'Electronics & Communication (VLSI & Embedded)',
      engineeringCluster: resolvedCluster,
      year: data.year || 3,
      semester: data.semester || 6,
      cgpa: data.cgpa || 0,
      readinessScore: data.readinessScore !== undefined ? data.readinessScore : 0,
      targetRole: resolvedRole,
      careerInterests: data.careerInterests || [],
      enrollmentNumber: data.enrollmentNumber || '',
      studentUid: data.studentUid || generateIndianStudentUID({
        institution: data.institution || data.college,
        college: data.college || data.institution,
        degree: data.degree,
        branch: data.branch,
        graduationYear: data.graduationYear,
        enrollmentNumber: data.enrollmentNumber,
        semester: data.semester
      }),
      graduationYear: data.graduationYear || 2026,
      verificationStatus: 'Pending',
      verificationType: 'COLLEGE_ID',
      collegeIdProof: data.collegeIdProof || '',
      assessmentCompleted: false,
      skills: resolvedSkills,
      topGaps: initialGaps,
      certifications: [],
      projects: []
    };

    setStudent(newStudent);
    setAllStudents(prev => [newStudent, ...prev]);

    try {
      localStorage.setItem('skillbridge_registered_student', JSON.stringify(newStudent));
    } catch (e) {}

    return newStudent;
  };

  // Smart Automated Verification Processing
  const processDocumentVerification = async (docInput: {
    studentId: string;
    category: DocumentRecord['category'];
    title: string;
    filePath: string;
    fileBlob?: File | Blob;
    issuer?: string;
    certificateId?: string;
    cgpa?: number;
    enrollmentNumber?: string;
  }): Promise<DocumentRecord> => {
    const targetStudent = allStudents.find(s => s.id === docInput.studentId) || student;
    let result;

    if (docInput.category === 'certifications') {
      result = await verifyCertificate(
        docInput.certificateId, 
        docInput.issuer, 
        docInput.title || docInput.filePath,
        docInput.fileBlob || docInput.filePath
      );
    } else if (docInput.category === 'transcripts') {
      result = await verifyAcademicRecord(targetStudent, {
        cgpa: docInput.cgpa,
        enrollmentNumber: docInput.enrollmentNumber,
        name: targetStudent.name,
        fileName: docInput.title || docInput.filePath,
        fileBlob: docInput.fileBlob || docInput.filePath
      });
    } else if (docInput.category === 'internship_reports') {
      result = verifyInternshipRecord(docInput.issuer || docInput.title, applications, targetStudent.email);
    } else if (docInput.category === 'id_proofs') {
      result = await verifyIdProof(targetStudent, {
        fileName: docInput.title || docInput.filePath,
        fileBlob: docInput.fileBlob || docInput.filePath
      });
    } else {
      result = verifyGenericDocumentOCR(docInput.filePath || docInput.title, targetStudent);
    }

    const newDocId = `doc-${Date.now()}`;
    const newDoc: DocumentRecord = {
      id: newDocId,
      studentId: targetStudent.id,
      studentName: targetStudent.name,
      studentEmail: targetStudent.email,
      studentBranch: targetStudent.branch,
      studentCgpa: targetStudent.cgpa,
      studentEnrollmentNumber: targetStudent.enrollmentNumber,
      category: docInput.category,
      title: docInput.title,
      filePath: docInput.filePath,
      issuer: docInput.issuer,
      certificateId: docInput.certificateId,
      verificationStatus: result.status,
      verificationMethod: result.method,
      flaggedReason: result.flaggedReason,
      extractedData: result.extractedData,
      submittedAt: new Date().toISOString(),
      verifiedAt: result.status === 'verified' ? new Date().toISOString() : undefined,
      verifiedBy: result.verifiedBy
    };

    // Create Audit Log
    const newLog: VerificationLog = {
      id: `vlog-${Date.now()}`,
      documentId: newDocId,
      studentId: targetStudent.id,
      oldStatus: 'pending',
      newStatus: result.status,
      method: result.method,
      reason: result.flaggedReason || (result.status === 'verified' ? 'Automated check completed successfully' : 'Validation check failed'),
      timestamp: new Date().toISOString(),
      actor: result.verifiedBy || 'Automated Verification Engine'
    };

    const updatedDocs = [newDoc, ...documents];
    const updatedLogs = [newLog, ...verificationLogs];
    setDocuments(updatedDocs);
    setVerificationLogs(updatedLogs);

    try {
      localStorage.setItem('skillbridge_documents', JSON.stringify(updatedDocs));
      localStorage.setItem('skillbridge_verification_logs', JSON.stringify(updatedLogs));
    } catch (e) {}

    // Real-Time State Propagation if Verified (Idempotent)
    if (result.status === 'verified') {
      const isCurrentStudent = student.id === targetStudent.id;
      const docUniqueKey = (docInput.certificateId && docInput.certificateId.trim())
        ? `ID_${docInput.certificateId.trim().toUpperCase()}`
        : `${docInput.category}_${(docInput.title || '').trim().toLowerCase()}_${(docInput.issuer || '').trim().toLowerCase()}`;
      
      const alreadyCredited = (targetStudent.verifiedDocumentIds || []).includes(docUniqueKey);
      
      // Update Digital Portfolio & Boost Readiness Score
      if (docInput.category === 'certifications') {
        const newCert = {
          id: `cert-${Date.now()}`,
          title: docInput.title,
          issuer: docInput.issuer || 'Accredited Issuer',
          issueDate: new Date().toISOString().split('T')[0],
          verified: true,
          credentialId: docInput.certificateId || `VERIFIED-${Date.now()}`
        };

        const scoreBoost = alreadyCredited ? 0 : 4;

        if (isCurrentStudent) {
          setStudent(prev => ({
            ...prev,
            certifications: [newCert, ...(prev.certifications || [])],
            readinessScore: Math.min(100, (prev.readinessScore || 0) + scoreBoost),
            verifiedDocumentIds: alreadyCredited ? prev.verifiedDocumentIds : [...(prev.verifiedDocumentIds || []), docUniqueKey]
          }));
        }

        setAllStudents(prev => prev.map(s => {
          if (s.id === targetStudent.id) {
            return {
              ...s,
              certifications: [newCert, ...(s.certifications || [])],
              readinessScore: Math.min(100, (s.readinessScore || 0) + scoreBoost),
              verifiedDocumentIds: alreadyCredited ? s.verifiedDocumentIds : [...(s.verifiedDocumentIds || []), docUniqueKey]
            };
          }
          return s;
        }));
      } else if (docInput.category === 'transcripts') {
        const scoreBoost = alreadyCredited ? 0 : 3;
        if (isCurrentStudent) {
          setStudent(prev => ({
            ...prev,
            verificationStatus: 'Verified',
            readinessScore: Math.min(100, (prev.readinessScore || 0) + scoreBoost),
            verifiedDocumentIds: alreadyCredited ? prev.verifiedDocumentIds : [...(prev.verifiedDocumentIds || []), docUniqueKey]
          }));
        }
        setAllStudents(prev => prev.map(s => s.id === targetStudent.id ? { 
          ...s, 
          verificationStatus: 'Verified',
          readinessScore: Math.min(100, (s.readinessScore || 0) + scoreBoost),
          verifiedDocumentIds: alreadyCredited ? s.verifiedDocumentIds : [...(s.verifiedDocumentIds || []), docUniqueKey]
        } : s));
      } else if (docInput.category === 'internship_reports') {
        const newInternship = {
          id: `int-${Date.now()}`,
          role: docInput.title,
          company: docInput.issuer || 'Partner Corporation',
          duration: '3 Months (Verified)',
          verified: true
        };
        const scoreBoost = alreadyCredited ? 0 : 5;
        if (isCurrentStudent) {
          setStudent(prev => ({
            ...prev,
            internshipsCompleted: [newInternship, ...(prev.internshipsCompleted || [])],
            readinessScore: Math.min(100, (prev.readinessScore || 0) + scoreBoost),
            verifiedDocumentIds: alreadyCredited ? prev.verifiedDocumentIds : [...(prev.verifiedDocumentIds || []), docUniqueKey]
          }));
        }
        setAllStudents(prev => prev.map(s => s.id === targetStudent.id ? {
          ...s,
          internshipsCompleted: [newInternship, ...(s.internshipsCompleted || [])],
          readinessScore: Math.min(100, (s.readinessScore || 0) + scoreBoost),
          verifiedDocumentIds: alreadyCredited ? s.verifiedDocumentIds : [...(s.verifiedDocumentIds || []), docUniqueKey]
        } : s));
      }

      if (alreadyCredited) {
        toastService.notify('info', `✓ Document Verified: Credential already recorded; readiness score kept intact without double-counting.`);
      } else {
        toastService.notify('success', `✓ Document Auto-Verified (${result.method.replace('_', ' ').toUpperCase()}): ${docInput.title} (+readiness score updated)`);
      }
    } else if (result.status === 'rejected') {
      toastService.notify('error', `Automated Check Failed: ${result.flaggedReason || 'Certificate ID invalid'}`);
    } else if (result.status === 'needs_review') {
      toastService.notify('info', `Routed to Exception Review Queue: Discrepancy flagged for administrative check.`);
    }

    return newDoc;
  };

  // Institution Admin: Resolve Exception Document
  const resolveExceptionDocument = (documentId: string, decision: 'approve' | 'reject', reviewNote?: string) => {
    const doc = documents.find(d => d.id === documentId);
    if (!doc) return;

    const newStatus = decision === 'approve' ? 'verified' : 'rejected';

    const updatedDocs = documents.map(d => {
      if (d.id === documentId) {
        return {
          ...d,
          verificationStatus: newStatus as DocumentRecord['verificationStatus'],
          verifiedAt: new Date().toISOString(),
          verifiedBy: 'Institution Admin (Manual Exception Override)',
          flaggedReason: reviewNote ? `Exception resolved: ${reviewNote}` : d.flaggedReason
        };
      }
      return d;
    });

    const newLog: VerificationLog = {
      id: `vlog-${Date.now()}`,
      documentId,
      studentId: doc.studentId,
      oldStatus: doc.verificationStatus,
      newStatus: newStatus as DocumentRecord['verificationStatus'],
      method: 'manual_exception',
      reason: reviewNote || `TPO Manual Resolution: Marked ${newStatus}`,
      timestamp: new Date().toISOString(),
      actor: 'Institution Admin (TPO)'
    };

    setDocuments(updatedDocs);
    setVerificationLogs([newLog, ...verificationLogs]);

    try {
      localStorage.setItem('skillbridge_documents', JSON.stringify(updatedDocs));
      localStorage.setItem('skillbridge_verification_logs', JSON.stringify([newLog, ...verificationLogs]));
    } catch (e) {}

    // If approved, propagate to student (Idempotent)
    if (decision === 'approve') {
      const docUniqueKey = (doc.certificateId && doc.certificateId.trim())
        ? `ID_${doc.certificateId.trim().toUpperCase()}`
        : `${doc.category}_${(doc.title || '').trim().toLowerCase()}_${(doc.issuer || '').trim().toLowerCase()}`;

      setAllStudents(prev => prev.map(s => {
        if (s.id === doc.studentId) {
          const alreadyCredited = (s.verifiedDocumentIds || []).includes(docUniqueKey);
          if (alreadyCredited) {
            return { ...s, verificationStatus: 'Verified' };
          }
          return {
            ...s,
            verificationStatus: 'Verified',
            readinessScore: Math.min(100, (s.readinessScore || 0) + 4),
            verifiedDocumentIds: [...(s.verifiedDocumentIds || []), docUniqueKey]
          };
        }
        return s;
      }));

      setStudent(prev => {
        if (prev.id === doc.studentId) {
          const alreadyCredited = (prev.verifiedDocumentIds || []).includes(docUniqueKey);
          if (alreadyCredited) {
            return { ...prev, verificationStatus: 'Verified' };
          }
          return {
            ...prev,
            verificationStatus: 'Verified',
            readinessScore: Math.min(100, (prev.readinessScore || 0) + 4),
            verifiedDocumentIds: [...(prev.verifiedDocumentIds || []), docUniqueKey]
          };
        }
        return prev;
      });

      toastService.notify('success', `Exception Approved: ${doc.title} verified and published.`);
    } else {
      toastService.notify('error', `Exception Rejected: ${doc.title} marked inactive.`);
    }
  };

  // Backwards-compatible verifyStudentCredential helper
  const verifyStudentCredential = (studentId: string) => {
    setAllStudents(prev => prev.map(s => s.id === studentId ? { ...s, verificationStatus: 'Verified' as const } : s));
    if (student.id === studentId) {
      setStudent(prev => ({ ...prev, verificationStatus: 'Verified' as const }));
    }
    toastService.notify('success', `Credential verified for student.`);
  };

  // Mentorship Booking
  const bookMentorshipSlot = (mentorId: string, slot: string): boolean => {
    return true;
  };

  // Sign out user session & clear cache
  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {}
    try {
      localStorage.removeItem('skillbridge_auth_provider');
      localStorage.removeItem('skillbridge_auth_user');
      localStorage.removeItem('skillbridge_registered_student');
      localStorage.removeItem('skillbridge_last_assessment_result');
    } catch (e) {}
    setStudent(MOCK_STUDENTS[0]);
    setCurrentRoleState('student');
    toastService.notify('info', 'Signed out successfully.');
  };

  return (
    <StudentContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        student,
        allStudents,
        opportunities,
        applications,
        savedOpportunityIds,
        facultyOpportunities,
        facultyApplications,
        collaborationInitiatives,
        mentorshipSessions,
        institutionData,
        learningResources,
        documents,
        verificationLogs,
        automationRate,
        submitAssessment,
        applyForOpportunity,
        toggleSaveOpportunity,
        updateTargetRole,
        getOpportunityById,
        processDocumentVerification,
        resolveExceptionDocument,
        addOpportunity,
        updateApplicationStatus,
        addLearningResource,
        applyFacultyOpportunity,
        updateFacultyApplicationStatus,
        addProjectToPortfolio,
        registerStudent,
        verifyStudentCredential,
        bookMentorshipSlot,
        logout
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};
