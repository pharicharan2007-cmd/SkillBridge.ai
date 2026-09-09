import { DepartmentMetric } from '@/types';

export interface InstitutionSummary {
  institutionName: string;
  department: string;
  affiliation: string;
  totalStudentsEnrolled: number;
  overallReadinessIndex: number;
  internshipParticipationRate: number;
  placementRate: number;
  partnerCompaniesCount: number;
  facultyParticipationCount: number;
  naacGrade: string;
  nirfRank: number;
  readinessCohorts: {
    high: { count: number; percentage: number; label: string };
    moderate: { count: number; percentage: number; label: string };
    needsIntervention: { count: number; percentage: number; label: string };
  };
  naacRubric: {
    criterion: string;
    subCriterion: string;
    status: 'Compliant' | 'Action Required' | 'In Progress';
    metric?: string;
  }[];
  departmentMetrics: DepartmentMetric[];
  industrySkillTrends: {
    skill: string;
    industryDemandPercent: number;
    curriculumCoveragePercent: number;
    gapStatus: 'Aligned' | 'Moderate Gap' | 'Critical Gap';
  }[];
}

export const MOCK_INSTITUTION_DATA: InstitutionSummary = {
  institutionName: 'Delhi Technological University (DTU)',
  department: 'Office of Career Services & Industry Relations',
  affiliation: 'AICTE / GGSIPU, Government of NCT Delhi',
  totalStudentsEnrolled: 4200,
  overallReadinessIndex: 74,
  internshipParticipationRate: 83,
  placementRate: 71,
  partnerCompaniesCount: 52,
  facultyParticipationCount: 78,
  naacGrade: 'A+',
  nirfRank: 36,
  readinessCohorts: {
    high: { count: 1890, percentage: 45, label: 'Tier 1 — High Readiness (Score ≥ 75)' },
    moderate: { count: 1680, percentage: 40, label: 'Tier 2 — Moderate Readiness (Score 50–74)' },
    needsIntervention: { count: 630, percentage: 15, label: 'Tier 3 — Skill Gap Intervention Required (Score < 50)' }
  },
  naacRubric: [
    { criterion: '5.1 — Student Support', subCriterion: 'Career Counselling Sessions', status: 'Compliant', metric: '12 sessions / semester' },
    { criterion: '5.2 — Student Progression', subCriterion: 'Placement % (6-month post-graduation)', status: 'Action Required', metric: '71% — target 80%' },
    { criterion: '3.4 — Research Output', subCriterion: 'Publications per Faculty (avg)', status: 'In Progress', metric: '4.2 avg — target 6.0' },
    { criterion: '1.3 — Curriculum Enrichment', subCriterion: 'Industry-mapped Elective Courses', status: 'Action Required', metric: '34 / 48 updated — 14 pending' },
    { criterion: '6.5 — Institutional Quality Assurance', subCriterion: 'IQAC Annual Report Submitted', status: 'Compliant', metric: 'Submitted Aug 2026' },
  ],
  departmentMetrics: [
    {
      name: 'Computer Science & Engineering (CSE)',
      totalStudents: 1400,
      avgReadinessScore: 76,
      placementRate: 78,
      activeInternships: 1180,
      topSkills: ['Data Structures & Algorithms', 'Python', 'Git & Linux', 'SQL & Data Pipelines'],
      criticalGaps: ['TensorFlow / PyTorch', 'Distributed Systems', 'Docker & DevOps']
    },
    {
      name: 'Electrical Engg. — VLSI Specialisation',
      totalStudents: 520,
      avgReadinessScore: 72,
      placementRate: 68,
      activeInternships: 380,
      topSkills: ['Verilog / VHDL', 'FPGA Prototyping', 'Embedded C', 'MATLAB / Simulink'],
      criticalGaps: ['Industry EDA Tools (Cadence/Synopsys)', 'Formal Verification', 'AUTOSAR']
    },
    {
      name: 'AI & Data Science (AID)',
      totalStudents: 560,
      avgReadinessScore: 70,
      placementRate: 73,
      activeInternships: 460,
      topSkills: ['Python', 'Machine Learning', 'Pandas & NumPy', 'SQL & Data Pipelines'],
      criticalGaps: ['MLOps & Model Deployment', 'CUDA & GPU Programming', 'Cloud (AWS / GCP)']
    },
    {
      name: 'Mechanical & Robotics Engineering',
      totalStudents: 680,
      avgReadinessScore: 65,
      placementRate: 62,
      activeInternships: 410,
      topSkills: ['CAD (SolidWorks / CATIA)', 'MATLAB / Simulink', 'FEM Analysis'],
      criticalGaps: ['ROS & Motion Planning', 'Embedded C for ARM', 'Control Systems Implementation']
    }
  ],
  industrySkillTrends: [
    {
      skill: 'Python & Data Analytics',
      industryDemandPercent: 92,
      curriculumCoveragePercent: 82,
      gapStatus: 'Aligned'
    },
    {
      skill: 'Machine Learning / Deep Learning (TensorFlow / PyTorch)',
      industryDemandPercent: 90,
      curriculumCoveragePercent: 52,
      gapStatus: 'Critical Gap'
    },
    {
      skill: 'CUDA & GPU Accelerated Computing',
      industryDemandPercent: 78,
      curriculumCoveragePercent: 28,
      gapStatus: 'Critical Gap'
    },
    {
      skill: 'Cloud (AWS / GCP) & Docker/Kubernetes',
      industryDemandPercent: 86,
      curriculumCoveragePercent: 45,
      gapStatus: 'Critical Gap'
    },
    {
      skill: 'Verilog / VHDL & FPGA Design',
      industryDemandPercent: 74,
      curriculumCoveragePercent: 68,
      gapStatus: 'Moderate Gap'
    },
    {
      skill: 'Data Structures & Algorithms (DSA)',
      industryDemandPercent: 88,
      curriculumCoveragePercent: 84,
      gapStatus: 'Aligned'
    },
    {
      skill: 'Technical Communication & Research Writing',
      industryDemandPercent: 82,
      curriculumCoveragePercent: 72,
      gapStatus: 'Aligned'
    }
  ]
};
