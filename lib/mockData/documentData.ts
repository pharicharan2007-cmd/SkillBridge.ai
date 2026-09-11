import { DocumentRecord, VerificationLog } from '@/types';

export const INITIAL_DOCUMENTS: DocumentRecord[] = [
  {
    id: 'doc-1',
    studentId: 'std-101',
    studentName: 'Arjun Mehta',
    studentEmail: 'arjun.mehta@dtu.ac.in',
    studentBranch: 'Computer Science and Engineering',
    studentCgpa: 8.65,
    studentEnrollmentNumber: '2K22/CO/148',
    category: 'certifications',
    title: 'Deep Learning Specialization (NPTEL)',
    filePath: 'std-101/certifications/nptel_deep_learning.pdf',
    issuer: 'NPTEL (IIT Madras)',
    certificateId: 'NPTEL26CS42109',
    verificationStatus: 'verified',
    verificationMethod: 'api_check',
    extractedData: {
      issuerVerified: true,
      score: '88%'
    },
    submittedAt: '2026-09-01T10:30:00Z',
    verifiedAt: '2026-09-01T10:30:04Z',
    verifiedBy: 'Automated API (NPTEL National Registry)'
  },
  {
    id: 'doc-2',
    studentId: 'std-101',
    studentName: 'Arjun Mehta',
    studentEmail: 'arjun.mehta@dtu.ac.in',
    studentBranch: 'Computer Science and Engineering',
    studentCgpa: 8.65,
    studentEnrollmentNumber: '2K22/CO/148',
    category: 'transcripts',
    title: 'Semester VI Marksheet (Official DTU Controller of Examinations)',
    filePath: 'std-101/transcripts/semester_6_marksheet.pdf',
    issuer: 'Delhi Technological University',
    verificationStatus: 'verified',
    verificationMethod: 'db_match',
    extractedData: {
      cgpa: 8.65,
      enrollmentNumber: '2K22/CO/148',
      studentName: 'Arjun Mehta'
    },
    submittedAt: '2026-09-02T14:15:00Z',
    verifiedAt: '2026-09-02T14:15:02Z',
    verifiedBy: 'DTU Institutional Master DB Cross-Matcher'
  },
  {
    id: 'doc-3',
    studentId: 'std-101',
    studentName: 'Arjun Mehta',
    studentEmail: 'arjun.mehta@dtu.ac.in',
    studentBranch: 'Computer Science and Engineering',
    studentCgpa: 8.65,
    studentEnrollmentNumber: '2K22/CO/148',
    category: 'internship_reports',
    title: 'Summer Research Internship Completion (SAC-ISRO)',
    filePath: 'std-101/internship_reports/isro_sac_internship.pdf',
    issuer: 'ISRO Space Applications Centre (SAC)',
    verificationStatus: 'verified',
    verificationMethod: 'platform_sourced',
    extractedData: {
      platformOpportunityId: 'opp-1',
      opportunityTitle: 'ML Research Intern — Remote Sensing',
      company: 'ISRO Space Applications Centre (SAC)'
    },
    submittedAt: '2026-09-04T11:00:00Z',
    verifiedAt: '2026-09-04T11:00:01Z',
    verifiedBy: 'Host Industry Recruiter (ISRO SAC)'
  },
  {
    id: 'doc-4',
    studentId: 'std-104',
    studentName: 'Kavita Sundaram',
    studentEmail: 'kavita.s@dtu.ac.in',
    studentBranch: 'Information Technology',
    studentCgpa: 8.92,
    studentEnrollmentNumber: '2K22/IT/078',
    category: 'transcripts',
    title: 'Provisional Degree Grade Card (Uploaded Scan)',
    filePath: 'std-104/transcripts/grade_card_scan.pdf',
    issuer: 'Delhi Technological University',
    verificationStatus: 'needs_review',
    verificationMethod: 'manual_exception',
    flaggedReason: 'Institutional Master DB Mismatch: Uploaded CGPA 9.40 differs from DTU Institutional Master DB record (8.92).',
    extractedData: {
      uploadedCgpa: 9.40,
      dbCgpa: 8.92,
      discrepancy: 'CGPA inflation detected in uploaded document'
    },
    submittedAt: '2026-09-08T09:20:00Z'
  },
  {
    id: 'doc-5',
    studentId: 'std-105',
    studentName: 'Rohan Deshmukh',
    studentEmail: 'rohan.d@dtu.ac.in',
    studentBranch: 'Computer Science and Engineering',
    studentCgpa: 7.95,
    studentEnrollmentNumber: '2K22/CO/194',
    category: 'internship_reports',
    title: 'Off-Platform Summer Industrial Internship Letter',
    filePath: 'std-105/internship_reports/external_internship_letter.pdf',
    issuer: 'Apex Dynamic Softwares Pvt Ltd (External)',
    verificationStatus: 'needs_review',
    verificationMethod: 'manual_exception',
    flaggedReason: 'Off-platform / External Internship: Certificate from "Apex Dynamic Softwares" was not sourced through SkillBridge ATS. Requires TPO validation.',
    extractedData: {
      isOffPlatform: true,
      company: 'Apex Dynamic Softwares Pvt Ltd'
    },
    submittedAt: '2026-09-08T15:40:00Z'
  },
  {
    id: 'doc-6',
    studentId: 'std-102',
    studentName: 'Sneha Patel',
    studentEmail: 'sneha.p@dtu.ac.in',
    studentBranch: 'Electronics & Communication Engineering',
    studentCgpa: 8.42,
    studentEnrollmentNumber: '2K22/EC/092',
    category: 'certifications',
    title: 'AWS Certified Cloud Practitioner',
    filePath: 'std-102/certifications/aws_cloud_cert.pdf',
    issuer: 'Amazon Web Services (AWS)',
    certificateId: 'AWS-INVALID-KEY-404',
    verificationStatus: 'rejected',
    verificationMethod: 'api_check',
    flaggedReason: 'Issuer registry lookup failed for ID "AWS-INVALID-KEY-404". Invalid format or unverified issuer registry record.',
    extractedData: {
      issuerVerified: false
    },
    submittedAt: '2026-09-07T12:00:00Z',
    verifiedAt: '2026-09-07T12:00:03Z',
    verifiedBy: 'Automated API (AWS Training & Certification)'
  }
];

export const INITIAL_VERIFICATION_LOGS: VerificationLog[] = [
  {
    id: 'vlog-1',
    documentId: 'doc-1',
    studentId: 'std-101',
    oldStatus: 'pending',
    newStatus: 'verified',
    method: 'api_check',
    reason: 'Valid certificate checksum matched against NPTEL public API registry.',
    timestamp: '2026-09-01T10:30:04Z',
    actor: 'Automated API Engine (NPTEL)'
  },
  {
    id: 'vlog-2',
    documentId: 'doc-2',
    studentId: 'std-101',
    oldStatus: 'pending',
    newStatus: 'verified',
    method: 'db_match',
    reason: 'All student fields (Roll: 2K22/CO/148, CGPA: 8.65, Branch: CSE) matched institutional master database.',
    timestamp: '2026-09-02T14:15:02Z',
    actor: 'Automated DB Matcher (DTU SIS)'
  },
  {
    id: 'vlog-3',
    documentId: 'doc-3',
    studentId: 'std-101',
    oldStatus: 'pending',
    newStatus: 'verified',
    method: 'platform_sourced',
    reason: 'Recruiter marked opportunity opp-1 (ML Research Intern) completed via ATS workflow.',
    timestamp: '2026-09-04T11:00:01Z',
    actor: 'Host Industry Recruiter (ISRO SAC)'
  },
  {
    id: 'vlog-4',
    documentId: 'doc-6',
    studentId: 'std-102',
    oldStatus: 'pending',
    newStatus: 'rejected',
    method: 'api_check',
    reason: 'Certificate ID AWS-INVALID-KEY-404 failed checksum lookup in AWS public directory.',
    timestamp: '2026-09-07T12:00:03Z',
    actor: 'Automated API Engine (AWS)'
  },
  {
    id: 'vlog-5',
    documentId: 'doc-4',
    studentId: 'std-104',
    oldStatus: 'pending',
    newStatus: 'needs_review',
    method: 'manual_exception',
    reason: 'CGPA mismatch detected between uploaded scan and university records.',
    timestamp: '2026-09-08T09:20:05Z',
    actor: 'Automated DB Matcher (Flagged)'
  },
  {
    id: 'vlog-6',
    documentId: 'doc-5',
    studentId: 'std-105',
    oldStatus: 'pending',
    newStatus: 'needs_review',
    method: 'manual_exception',
    reason: 'Off-platform internship requiring TPO manual review.',
    timestamp: '2026-09-08T15:40:04Z',
    actor: 'Platform ATS Verification Filter'
  }
];
