export type UserRole = 'student' | 'recruiter' | 'faculty' | 'institution';

export type SkillCategory = 'Technical' | 'Soft Skills' | 'Problem Solving' | 'Digital Skills' | 'Domain Knowledge' | 'Career Interests';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number; // 0 to 100
  verified: boolean;
  demandLevel: 'High' | 'Medium' | 'Critical';
}

export interface SkillGapItem {
  skillId: string;
  skillName: string;
  category: SkillCategory;
  currentLevel: number;
  requiredLevel: number;
  gapPercentage: number;
  priority: 'Critical' | 'High' | 'Medium';
  recommendedAction: string;
}

export interface StudentPortfolioProject {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  verifiedBy?: string;
  date: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  institution: string;
  degree: string;
  branch: string;
  semester: number;
  cgpa: number;
  readinessScore: number; // 0 to 100
  targetRole: string;
  careerInterests: string[];
  skills: Skill[];
  topGaps: SkillGapItem[];
  assessmentCompleted: boolean;
  lastAssessmentDate?: string;
  certifications: {
    id: string;
    title: string;
    issuer: string;
    issueDate: string;
    verified: boolean;
    credentialId?: string;
  }[];
  projects?: StudentPortfolioProject[];
  internshipsCompleted?: {
    id: string;
    role: string;
    company: string;
    duration: string;
    certificateUrl?: string;
    verified: boolean;
  }[];
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: 'Internship' | 'Full-time' | 'Remote Internship' | 'Live Project' | 'Apprenticeship';
  stipend: string;
  duration: string;
  deadline: string;
  domain: string;
  requiredSkills: string[];
  minimumCGPA: number;
  eligibleBranches: string[];
  description: string;
  responsibilities: string[];
  perks: string[];
  postedBy?: string;
  matchScore?: number; // Calculated dynamically
  matchDetails?: {
    finalMatchScore?: number;
    skillMatchPercentage: number;
    eligibilityMatchPercentage: number;
    careerInterestPercentage: number;
    matchedSkills: string[];
    missingSkills: string[];
    isEligible: boolean;
    whyRecommended: string;
  };
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  category: SkillCategory;
  relatedSkill: string;
  options: {
    label: string;
    score: number; // 1 to 5 scale
  }[];
}

export interface LearningResource {
  id: string;
  title: string;
  provider: string;
  type: 'Course' | 'Certification' | 'Project' | 'Bootcamp' | 'Workshop';
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  skillAddressed: string;
  rating: number;
  enrollUrl: string;
  image: string;
  isFree: boolean;
  publishedByIndustry?: string;
}

export interface ApplicationRecord {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  company: string;
  studentName?: string;
  studentEmail?: string;
  studentBranch?: string;
  studentCgpa?: number;
  appliedDate: string;
  status: 'Submitted' | 'Under Review' | 'Interview Scheduled' | 'Shortlisted' | 'Offered' | 'Rejected';
  matchScoreAtApplication: number;
  notes?: string;
  timeline: {
    step: string;
    date: string;
    completed: boolean;
  }[];
}

export interface FacultyOpportunity {
  id: string;
  title: string;
  organization: string;
  location: string;
  type: 'Faculty Internship' | 'Industrial Training' | 'Faculty Development Program (FDP)' | 'Consultancy Project' | 'Collaborative Research';
  domain: string;
  stipendOrGrant: string;
  duration: string;
  deadline: string;
  eligibility: string;
  description: string;
  deliverables: string[];
  sponsoredBy: string;
  seats: number;
}

export interface FacultyApplication {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  organization: string;
  type: string;
  facultyName: string;
  facultyDesignation: string;
  department: string;
  institution: string;
  appliedDate: string;
  status: 'Proposal Submitted' | 'Under Evaluation' | 'Approved' | 'Completed';
  proposalNote: string;
}

export interface CollaborationInitiative {
  id: string;
  title: string;
  industryPartner: string;
  type: 'Innovation Challenge' | 'Guest Lecture' | 'Live Project' | 'Hackathon';
  domain: string;
  description: string;
  rewardOrStipend: string;
  registrationDeadline: string;
  dateOrDuration: string;
  participantsCount: number;
  status: 'Open' | 'Upcoming' | 'In Progress';
}

export interface MentorshipSession {
  id: string;
  mentorName: string;
  mentorTitle: string;
  company: string;
  avatar: string;
  expertise: string[];
  availableSlots: string[];
  sessionDuration: string;
  rating: number;
  bio: string;
}

export interface DepartmentMetric {
  name: string;
  totalStudents: number;
  avgReadinessScore: number;
  placementRate: number;
  activeInternships: number;
  topSkills: string[];
  criticalGaps: string[];
}
