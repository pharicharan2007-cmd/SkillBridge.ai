import { DepartmentMetric } from '@/types';

export interface InstitutionSummary {
  institutionName: string;
  department: string;
  affiliation: string;
  totalStudentsEnrolled: number;
  overallReadinessIndex: number; // 0-100
  internshipParticipationRate: number; // percentage
  placementRate: number; // percentage
  partnerCompaniesCount: number;
  facultyParticipationCount: number;
  readinessCohorts: {
    high: { count: number; percentage: number; label: string };
    moderate: { count: number; percentage: number; label: string };
    needsIntervention: { count: number; percentage: number; label: string };
  };
  departmentMetrics: DepartmentMetric[];
  industrySkillTrends: {
    skill: string;
    industryDemandPercent: number;
    curriculumCoveragePercent: number;
    gapStatus: 'Aligned' | 'Moderate Gap' | 'Critical Gap';
  }[];
}

export const MOCK_INSTITUTION_DATA: InstitutionSummary = {
  institutionName: 'All India Institute of Ayurveda & Affiliated Tech Campuses',
  department: 'Academic Collaboration & Career Services Directorate',
  affiliation: 'Ministry of Ayush, Government of India',
  totalStudentsEnrolled: 1840,
  overallReadinessIndex: 73,
  internshipParticipationRate: 86,
  placementRate: 82,
  partnerCompaniesCount: 48,
  facultyParticipationCount: 64,
  readinessCohorts: {
    high: { count: 956, percentage: 52, label: 'High Readiness (Score ≥ 75)' },
    moderate: { count: 625, percentage: 34, label: 'Moderate Readiness (Score 50–74)' },
    needsIntervention: { count: 259, percentage: 14, label: 'Skill Gap Intervention Needed (Score < 50)' }
  },
  departmentMetrics: [
    {
      name: 'Ayurveda Medicine & Clinical Sciences',
      totalStudents: 540,
      avgReadinessScore: 78,
      placementRate: 88,
      activeInternships: 490,
      topSkills: ['Clinical Diagnostics', 'Herbal Pharmacognosy', 'Patient Care Ethics'],
      criticalGaps: ['Clinical EHR Analytics', 'Digital Telemedicine Tools']
    },
    {
      name: 'Ayush Health Informatics & Biomedical Engg',
      totalStudents: 420,
      avgReadinessScore: 74,
      placementRate: 84,
      activeInternships: 360,
      topSkills: ['Python for Healthcare', 'Sensor Instrumentation', 'SQL Databases'],
      criticalGaps: ['Machine Learning (TensorFlow)', 'FHIR Healthcare Protocols']
    },
    {
      name: 'Computer Science & AI Engineering',
      totalStudents: 560,
      avgReadinessScore: 71,
      placementRate: 81,
      activeInternships: 470,
      topSkills: ['Data Structures & Algorithms', 'React.js', 'Python'],
      criticalGaps: ['Cloud DevOps (AWS/Docker)', 'Deep Learning Frameworks']
    },
    {
      name: 'Pharmaceutical Technology & Biotechnology',
      totalStudents: 320,
      avgReadinessScore: 68,
      placementRate: 75,
      activeInternships: 250,
      topSkills: ['Chromatography', 'Drug Formulation', 'Bioinformatics'],
      criticalGaps: ['Automated Quality Inspection', 'Statistical Process Control']
    }
  ],
  industrySkillTrends: [
    {
      skill: 'Python & Data Analytics',
      industryDemandPercent: 92,
      curriculumCoveragePercent: 80,
      gapStatus: 'Aligned'
    },
    {
      skill: 'Machine Learning / Deep Learning',
      industryDemandPercent: 88,
      curriculumCoveragePercent: 55,
      gapStatus: 'Critical Gap'
    },
    {
      skill: 'Cloud Computing & Docker Containers',
      industryDemandPercent: 84,
      curriculumCoveragePercent: 48,
      gapStatus: 'Critical Gap'
    },
    {
      skill: 'Healthcare Data Informatics & EHR Protocols',
      industryDemandPercent: 78,
      curriculumCoveragePercent: 50,
      gapStatus: 'Moderate Gap'
    },
    {
      skill: 'Full Stack Web (React, Node, APIs)',
      industryDemandPercent: 82,
      curriculumCoveragePercent: 75,
      gapStatus: 'Aligned'
    },
    {
      skill: 'Soft Skills: Technical Communication & Agility',
      industryDemandPercent: 85,
      curriculumCoveragePercent: 70,
      gapStatus: 'Aligned'
    }
  ]
};
