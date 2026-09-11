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
  date?: string;
}

export type EngineeringCluster =
  | 'Computer Science & Information Technology'
  | 'Electronics & Communication (VLSI & Embedded)'
  | 'Mechanical, Robotics & Automotive EV'
  | 'Civil & Smart Infrastructure'
  | 'Electrical, Power Systems & Renewable Energy';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  institution: string;
  college?: string;
  degree: string;
  branch: string;
  engineeringCluster?: EngineeringCluster;
  year?: number;
  semester: number;
  cgpa: number;
  readinessScore: number; // 0 to 100
  targetRole: string;
  careerInterests: string[];
  enrollmentNumber?: string;
  studentUid?: string; // State-Anchored Indian Academic Student UID: [State]-[City]-[College]-[Degree]-[Branch]-[Batch]-[Roll]
  graduationYear?: number;
  verificationStatus?: 'Unverified' | 'Pending' | 'Verified';
  verificationType?: 'COLLEGE_ID' | 'MARKSHEET' | 'EXAM_VERIFIED';
  collegeIdProof?: string;
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
  verifiedDocumentIds?: string[];
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
  engineeringCluster?: EngineeringCluster;
  cadToolsRequired?: string[];
  industryStandards?: string[];
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
  discipline: string;
  phase: 'baseline' | 'role_specific' | 'soft_skills';
  text: string;
  options: string[];
  correct_answer: string;
  points?: number;
  metadata?: {
    skill?: string;
    role?: string;
    [key: string]: any;
  };
}

export interface AssessmentAttempt {
  id: string;
  student_id: string;
  start_time: string;
  end_time?: string;
  status: 'in_progress' | 'completed' | 'abandoned';
}

export interface AssessmentAnswer {
  id?: string;
  attempt_id: string;
  question_id: string;
  selected_option: string;
  time_spent_ms: number;
  is_correct: boolean;
}

export interface TargetRole {
  id: string;
  role_name: string;
  required_skills: Record<string, number>;
}

export interface SkillScore {
  id: string;
  student_id: string;
  skill_name: string;
  score: number;
  verification_status: 'unverified' | 'auto_verified' | 'cross_validated';
}


export interface LearningResource {
  id: string;
  title: string;
  provider: string;
  type: 'Course' | 'Certification' | 'Project' | 'Bootcamp' | 'Workshop';
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  skillAddressed: string;
  engineeringCluster?: EngineeringCluster;
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
  matchDetails?: {
    matchedSkills: string[];
    missingSkills: string[];
    skillMatchPercentage: number;
  };
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

export type DocumentCategory = 'certifications' | 'transcripts' | 'internship_reports' | 'resumes' | 'id_proofs';

export type VerificationStatus = 'verified' | 'rejected' | 'needs_review' | 'pending';

export type VerificationMethod = 
  | 'api_check' 
  | 'db_match' 
  | 'platform_sourced' 
  | 'diagnostic_test' 
  | 'ocr_match' 
  | 'manual_exception';

export interface DocumentRecord {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentBranch?: string;
  studentCgpa?: number;
  studentEnrollmentNumber?: string;
  category: DocumentCategory;
  title: string;
  filePath: string;
  issuer?: string;
  certificateId?: string;
  verificationStatus: VerificationStatus;
  verificationMethod: VerificationMethod;
  flaggedReason?: string;
  extractedData?: {
    cgpa?: number;
    enrollmentNumber?: string;
    studentName?: string;
    issuerVerified?: boolean;
    ocrConfidence?: number;
    platformOpportunityId?: string;
    [key: string]: any;
  };
  submittedAt: string;
  verifiedAt?: string;
  verifiedBy?: string;
}

export interface VerificationLog {
  id: string;
  documentId: string;
  studentId: string;
  oldStatus: string;
  newStatus: VerificationStatus;
  method: VerificationMethod;
  reason?: string;
  timestamp: string;
  actor: string; // e.g. 'Automation Engine (API)', 'Institution Admin (Manual)', etc.
}
