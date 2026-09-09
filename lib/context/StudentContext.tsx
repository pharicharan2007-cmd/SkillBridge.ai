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
  StudentPortfolioProject
} from '@/types';
import { MOCK_STUDENTS } from '@/lib/mockData/students';
import { MOCK_OPPORTUNITIES } from '@/lib/mockData/opportunities';
import { MOCK_FACULTY_OPPORTUNITIES, MOCK_FACULTY_APPLICATIONS } from '@/lib/mockData/facultyOpportunities';
import { MOCK_COLLABORATION_INITIATIVES, MOCK_MENTORSHIP_SESSIONS } from '@/lib/mockData/collaborationData';
import { MOCK_INSTITUTION_DATA, InstitutionSummary } from '@/lib/mockData/institutionData';
import { MOCK_LEARNING_RESOURCES } from '@/lib/mockData/learningResources';
import { calculateOpportunityMatch } from '@/lib/services/matchEngine';

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
  
  // Actions
  submitAssessment: (answers: Record<string, number>) => void;
  applyForOpportunity: (opportunityId: string, notes?: string) => boolean;
  toggleSaveOpportunity: (opportunityId: string) => void;
  updateTargetRole: (role: string) => void;
  getOpportunityById: (id: string) => Opportunity | undefined;
  
  // Industry / Recruiter Actions
  addOpportunity: (opportunity: Omit<Opportunity, 'id'>) => Opportunity;
  updateApplicationStatus: (applicationId: string, newStatus: ApplicationRecord['status']) => void;
  addLearningResource: (resource: Omit<LearningResource, 'id'>) => void;
  
  // Academician Actions
  applyFacultyOpportunity: (opportunityId: string, proposalNote: string) => boolean;
  
  // Student Portfolio Actions
  addProjectToPortfolio: (project: Omit<StudentPortfolioProject, 'id'>) => void;
  
  // Registration & Verification Actions
  registerStudent: (data: Partial<StudentProfile>) => StudentProfile;
  verifyStudentCredential: (studentId: string) => void;
  
  // Mentorship & Collaboration Actions
  bookMentorshipSlot: (mentorId: string, slot: string) => boolean;
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

  // Load any local storage cache safely on mount
  useEffect(() => {
    try {
      const savedRole = localStorage.getItem('skillbridge_role') as UserRole | null;
      if (savedRole) setCurrentRoleState(savedRole);

      const savedOpps = localStorage.getItem('skillbridge_opportunities');
      if (savedOpps) setRawOpportunities(JSON.parse(savedOpps));

      const savedApps = localStorage.getItem('skillbridge_applications');
      if (savedApps) setApplications(JSON.parse(savedApps));

      const savedFacApps = localStorage.getItem('skillbridge_faculty_applications');
      if (savedFacApps) setFacultyApplications(JSON.parse(savedFacApps));

      const savedStudent = localStorage.getItem('skillbridge_registered_student');
      if (savedStudent) {
        const parsed = JSON.parse(savedStudent);
        setStudent(parsed);
        setAllStudents(prev => {
          const exists = prev.some(s => s.id === parsed.id);
          if (exists) {
            return prev.map(s => s.id === parsed.id ? parsed : s);
          }
          return [parsed, ...prev];
        });
      }
    } catch (e) {
      console.warn('LocalStorage error or not available', e);
    }
  }, []);

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
    setStudent(prev => ({
      ...prev,
      targetRole: newRole
    }));
  };

  const submitAssessment = (answers: Record<string, number>) => {
    const scores = Object.values(answers);
    if (scores.length === 0) return;

    const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const newReadinessScore = Math.max(40, Math.min(98, Math.round(avgScore * 0.95 + 10)));

    const updatedSkills = student.skills.map(skill => {
      let levelBoost = 0;
      if (skill.name.toLowerCase().includes('python') && answers['q-1']) levelBoost = Math.round(answers['q-1'] * 0.1);
      if (skill.name.toLowerCase().includes('sql') && answers['q-3']) levelBoost = Math.round(answers['q-3'] * 0.1);
      if (skill.name.toLowerCase().includes('tensorflow') && answers['q-4']) levelBoost = Math.round(answers['q-4'] * 0.15);
      
      const newLevel = Math.min(100, skill.level + levelBoost);
      return {
        ...skill,
        level: newLevel,
        verified: newLevel > 70 ? true : skill.verified
      };
    });

    const newGaps: SkillGapItem[] = [
      {
        skillId: 'sk-4',
        skillName: 'TensorFlow / PyTorch',
        category: 'Technical',
        currentLevel: Math.round(answers['q-4'] || 45),
        requiredLevel: 80,
        gapPercentage: Math.max(0, 80 - Math.round(answers['q-4'] || 45)),
        priority: 'Critical',
        recommendedAction: 'Complete Deep Learning Specialization & practical project.'
      },
      {
        skillId: 'sk-24',
        skillName: 'Cloud Computing (AWS)',
        category: 'Digital Skills',
        currentLevel: Math.round(answers['q-11'] || 60),
        requiredLevel: 75,
        gapPercentage: Math.max(0, 75 - Math.round(answers['q-11'] || 60)),
        priority: 'High',
        recommendedAction: 'Practice AWS EC2/S3 deployment labs.'
      }
    ];

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
    const newStudent: StudentProfile = {
      id: newId,
      name: data.name || 'New Student',
      email: data.email || 'student@dtu.ac.in',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=256',
      institution: data.institution || data.college || 'Delhi Technological University (DTU)',
      college: data.college || data.institution || 'Delhi Technological University (DTU)',
      degree: data.degree || 'B.Tech',
      branch: data.branch || 'Computer Science and Engineering',
      year: data.year || 3,
      semester: data.semester || 6,
      cgpa: data.cgpa || 8.5,
      readinessScore: data.readinessScore || 52,
      targetRole: data.targetRole || 'Software Engineer',
      careerInterests: data.careerInterests || ['Software Engineering', 'Cloud & Systems'],
      enrollmentNumber: data.enrollmentNumber || '2K23/CO/201',
      graduationYear: data.graduationYear || 2026,
      verificationStatus: 'Pending',
      verificationType: 'COLLEGE_ID',
      collegeIdProof: data.collegeIdProof || 'student_id_card.pdf',
      assessmentCompleted: false,
      skills: data.skills && data.skills.length > 0 ? data.skills : [
        { id: 'sk-1', name: 'Python', category: 'Technical', level: 75, verified: false, demandLevel: 'Critical' },
        { id: 'sk-9', name: 'Data Structures & Algorithms', category: 'Technical', level: 70, verified: false, demandLevel: 'High' },
        { id: 'sk-5', name: 'React.js', category: 'Technical', level: 68, verified: false, demandLevel: 'High' }
      ],
      topGaps: [
        {
          skillId: 'sk-24',
          skillName: 'Cloud Computing (AWS)',
          category: 'Digital Skills',
          currentLevel: 40,
          requiredLevel: 75,
          gapPercentage: 35,
          priority: 'Critical',
          recommendedAction: 'Complete AWS Academy Cloud Foundations & build deployment project.'
        }
      ],
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

  // Institution TPO: Approve student verification
  const verifyStudentCredential = (studentId: string) => {
    setAllStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return { ...s, verificationStatus: 'Verified' as const };
      }
      return s;
    }));

    if (student.id === studentId) {
      const updated = { ...student, verificationStatus: 'Verified' as const };
      setStudent(updated);
      try {
        localStorage.setItem('skillbridge_registered_student', JSON.stringify(updated));
      } catch (e) {}
    }
  };

  // Mentorship Booking
  const bookMentorshipSlot = (mentorId: string, slot: string): boolean => {
    return true;
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
        submitAssessment,
        applyForOpportunity,
        toggleSaveOpportunity,
        updateTargetRole,
        getOpportunityById,
        addOpportunity,
        updateApplicationStatus,
        addLearningResource,
        applyFacultyOpportunity,
        addProjectToPortfolio,
        registerStudent,
        verifyStudentCredential,
        bookMentorshipSlot
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
