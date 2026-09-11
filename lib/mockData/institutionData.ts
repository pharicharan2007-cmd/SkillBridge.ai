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
      name: 'Electronics & Communication (VLSI & Embedded)',
      totalStudents: 580,
      avgReadinessScore: 74,
      placementRate: 72,
      activeInternships: 420,
      topSkills: ['Verilog / VHDL', 'FPGA Prototyping', 'Embedded C', 'Circuit Analysis & SPICE'],
      criticalGaps: ['Cadence / Synopsys EDA', 'SystemVerilog UVM', 'High-Speed PCB Design']
    },
    {
      name: 'Mechanical, Robotics & Automotive EV',
      totalStudents: 680,
      avgReadinessScore: 68,
      placementRate: 66,
      activeInternships: 440,
      topSkills: ['SolidWorks CAD', 'Kinematics & Dynamics', 'Thermodynamics', 'GD&T'],
      criticalGaps: ['ROS 2 / Autonomous Navigation', 'Ansys FEA / CFD', 'EV Battery Thermal Management']
    },
    {
      name: 'Civil & Smart Infrastructure Engineering',
      totalStudents: 490,
      avgReadinessScore: 71,
      placementRate: 64,
      activeInternships: 310,
      topSkills: ['Reinforced Concrete (IS 456)', 'AutoCAD Civil 3D', 'Surveying & GIS', 'Geotechnical Engg'],
      criticalGaps: ['Structural Analysis (STAAD.Pro)', 'Autodesk Revit BIM (LOD 350)', 'Pre-stressed Bridge Design']
    },
    {
      name: 'Electrical, Power Systems & Renewable Energy',
      totalStudents: 520,
      avgReadinessScore: 72,
      placementRate: 69,
      activeInternships: 360,
      topSkills: ['MATLAB / Simulink', 'Power Electronics', 'Circuit Analysis', 'Power Systems'],
      criticalGaps: ['Battery Management Systems (BMS)', 'Motor Drives & FOC', 'IEC 61850 Substation SCADA']
    }
  ],
  industrySkillTrends: [
    {
      skill: 'Python, ML & Data Pipelines',
      industryDemandPercent: 92,
      curriculumCoveragePercent: 80,
      gapStatus: 'Aligned'
    },
    {
      skill: 'Verilog / VHDL & FPGA Chip Design',
      industryDemandPercent: 88,
      curriculumCoveragePercent: 62,
      gapStatus: 'Moderate Gap'
    },
    {
      skill: 'SolidWorks CAD & Ansys FEA Simulation',
      industryDemandPercent: 85,
      curriculumCoveragePercent: 58,
      gapStatus: 'Critical Gap'
    },
    {
      skill: 'ROS 2 & Autonomous Mobile Robotics',
      industryDemandPercent: 82,
      curriculumCoveragePercent: 32,
      gapStatus: 'Critical Gap'
    },
    {
      skill: 'STAAD.Pro & Revit BIM Structural Modeling',
      industryDemandPercent: 84,
      curriculumCoveragePercent: 48,
      gapStatus: 'Critical Gap'
    },
    {
      skill: 'Power Electronics & EV Battery Management (BMS)',
      industryDemandPercent: 89,
      curriculumCoveragePercent: 44,
      gapStatus: 'Critical Gap'
    },
    {
      skill: 'Cloud (AWS / GCP) & Distributed Systems',
      industryDemandPercent: 86,
      curriculumCoveragePercent: 45,
      gapStatus: 'Critical Gap'
    }
  ]
};
