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
      opportunityId: 'opp-2',
      opportunityTitle: 'Full Stack Web Developer Intern',
      company: 'NextGen Systems',
      studentName: 'Rohan Sharma',
      studentEmail: 'rohan.sharma@institution.edu.in',
      studentBranch: 'Computer Science and Engineering',
      studentCgpa: 8.65,
      appliedDate: '2026-08-30',
      status: 'Interview Scheduled',
      matchScoreAtApplication: 84,
      notes: 'Submitted customized GitHub portfolio link and clinical FHIR project demo.',
      timeline: [
        { step: 'Application Submitted', date: '2026-08-30', completed: true },
        { step: 'Resume Screening', date: '2026-09-01', completed: true },
        { step: 'Technical Round 1', date: '2026-09-04', completed: true },
        { step: 'Final Interview', date: '2026-09-08', completed: false },
      ]
    },
    {
      id: 'app-2',
      opportunityId: 'opp-10',
      opportunityTitle: 'Product Management Intern',
      company: 'InnoVenture Labs',
      studentName: 'Rohan Sharma',
      studentEmail: 'rohan.sharma@institution.edu.in',
      studentBranch: 'Computer Science and Engineering',
      studentCgpa: 8.65,
      appliedDate: '2026-08-20',
      status: 'Under Review',
      matchScoreAtApplication: 76,
      notes: 'Attached case study design doc.',
      timeline: [
        { step: 'Application Submitted', date: '2026-08-20', completed: true },
        { step: 'Profile Verification', date: '2026-08-25', completed: true },
        { step: 'Recruiter Review', date: '2026-09-02', completed: true }
      ]
    },
    {
      id: 'app-3',
      opportunityId: 'opp-1',
      opportunityTitle: 'AI/ML Research Intern - Healthcare Automation',
      company: 'HealthAnalytics India',
      studentName: 'Ananya Verma',
      studentEmail: 'ananya.verma@institution.edu.in',
      studentBranch: 'AI & Data Science',
      studentCgpa: 8.9,
      appliedDate: '2026-09-01',
      status: 'Shortlisted',
      matchScoreAtApplication: 91,
      notes: 'Specializes in NLP and medical knowledge graphs.',
      timeline: [
        { step: 'Application Submitted', date: '2026-09-01', completed: true },
        { step: 'Candidate Shortlisted', date: '2026-09-05', completed: true }
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

    setStudent(prev => ({
      ...prev,
      readinessScore: newReadinessScore,
      assessmentCompleted: true,
      lastAssessmentDate: new Date().toISOString().split('T')[0],
      skills: updatedSkills,
      topGaps: newGaps
    }));
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
      facultyName: 'Dr. Sunita Deshmukh',
      facultyDesignation: 'Associate Professor',
      department: 'Pharmacognosy & Phytochemistry',
      institution: 'All India Institute of Ayurveda, New Delhi',
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
