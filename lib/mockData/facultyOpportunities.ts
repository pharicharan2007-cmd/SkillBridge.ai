import { FacultyOpportunity, FacultyApplication } from '@/types';

export const MOCK_FACULTY_OPPORTUNITIES: FacultyOpportunity[] = [
  {
    id: 'fac-1',
    title: 'AICTE National FDP: VLSI Design & FPGA Prototyping',
    organization: 'AICTE — All India Council for Technical Education',
    location: 'IIT Bombay, Mumbai (Onsite)',
    type: 'Faculty Development Program (FDP)',
    domain: 'VLSI & Embedded Systems',
    stipendOrGrant: 'Fully Sponsored + ₹75,000 Honorarium',
    duration: '3 Weeks (Intensive)',
    deadline: '2026-10-10',
    eligibility: 'Faculty teaching Electronics, VLSI, Embedded Systems, or related subjects at AICTE-affiliated colleges',
    description: 'AICTE-sponsored FDP delivering hands-on training in modern VLSI design flows: RTL design, FPGA prototyping on Xilinx UltraScale+, formal verification, and industry EDA tools (Cadence, Synopsys).',
    deliverables: [
      'AICTE Master Trainer Certificate in VLSI Design',
      'Industry-standard lab manual for university VLSI labs',
      'Eligibility for AICTE Research Promotion Scheme (RPS) seed grant'
    ],
    sponsoredBy: 'AICTE / Ministry of Education',
    seats: 40
  },
  {
    id: 'fac-2',
    title: 'TCS Research Collaborative Grant: AI for Smart Manufacturing',
    organization: 'TCS Research & Innovation (TCS R&I)',
    location: 'Hyderabad, Telangana / Remote',
    type: 'Collaborative Research',
    domain: 'AI / Industrial Automation',
    stipendOrGrant: '₹8.5 Lakhs Research Grant (12 Months)',
    duration: '12 Months',
    deadline: '2026-11-05',
    eligibility: 'Assistant / Associate Professors in CSE, AI, Mechanical, or Industrial Engineering with relevant publication track record',
    description: 'TCS invites faculty to co-develop AI-driven predictive maintenance and quality inspection models for Smart Factory deployments. Research output to be deployed in live TCS manufacturing client installations.',
    deliverables: [
      'Joint patent filing via TCS Innovation Labs',
      'Peer-reviewed publication in IEEE Transactions on Industrial Informatics',
      'Curriculum-ready case study for MTech / PhD course integration'
    ],
    sponsoredBy: 'TCS Research & Innovation',
    seats: 5
  },
  {
    id: 'fac-3',
    title: 'ISRO-DTU Joint Research: ML for Hyperspectral Remote Sensing',
    organization: 'ISRO Space Applications Centre (SAC) & DTU',
    location: 'Ahmedabad, Gujarat (Hybrid)',
    type: 'Collaborative Research',
    domain: 'Machine Learning / Remote Sensing',
    stipendOrGrant: '₹4.2 Lakhs Research Grant (6 Months)',
    duration: '6 Months',
    deadline: '2026-10-20',
    eligibility: 'Faculty in CSE / AI with ML research background and interest in satellite data applications',
    description: 'Joint ISRO-DTU research on applying deep learning (CNN, ViT, GNN) to RESOURCESAT-3 hyperspectral imagery for precision agriculture and disaster mapping.',
    deliverables: [
      'Open-source ML pipeline for ISRO hyperspectral datasets',
      'Jointly authored paper submitted to IEEE TGRS or ISPRS',
      'Student project mentorship for 6 B.Tech final year students'
    ],
    sponsoredBy: 'ISRO Space Applications Centre',
    seats: 3
  },
  {
    id: 'fac-4',
    title: 'Infosys Foundation FDP: Advanced Cloud & DevOps Pedagogy',
    organization: 'Infosys Springboard Campus Connect',
    location: 'Mysuru Campus / Virtual',
    type: 'Faculty Development Program (FDP)',
    domain: 'Cloud Computing & DevOps',
    stipendOrGrant: 'Sponsored Training + ₹40,000 Completion Stipend',
    duration: '5 Days (Intensive)',
    deadline: '2026-10-15',
    eligibility: 'Faculty teaching Software Engineering, Cloud, DevOps, or Systems courses',
    description: 'Infosys Springboard brings senior engineers to train faculty on enterprise DevOps practices: Docker, Kubernetes, Terraform IaC, GitHub Actions CI/CD, and AWS deployment patterns.',
    deliverables: [
      'Infosys Certified Cloud Educator credential',
      'Ready-to-use lab curriculum for 3 university elective courses',
      'Student project mentorship pipeline with Infosys Labs'
    ],
    sponsoredBy: 'Infosys Ltd. / Infosys Foundation',
    seats: 25
  },
  {
    id: 'fac-5',
    title: 'DST-SERB Early Career Research Grant: Robotics & Control Systems',
    organization: 'Department of Science & Technology (DST) — SERB',
    location: 'Institution Campus (Delhi / NCR)',
    type: 'Collaborative Research',
    domain: 'Robotics / Control Engineering',
    stipendOrGrant: '₹18 Lakhs (24 Months)',
    duration: '24 Months',
    deadline: '2026-11-30',
    eligibility: 'Faculty within 7 years of PhD, in Mechanical / Electrical / Robotics Engineering or AI',
    description: 'DST SERB-ECR grant for early career faculty to establish independent research in adaptive control, motion planning, or human-robot interaction. Includes equipment grant up to ₹5 Lakhs.',
    deliverables: [
      'Minimum 2 SCI/Scopus publications',
      'At least 1 MTech/PhD student thesis supervised under this project',
      '6-monthly utilisation certificate submitted to DST'
    ],
    sponsoredBy: 'DST-SERB (Govt. of India)',
    seats: 1
  }
];

export const MOCK_FACULTY_APPLICATIONS: FacultyApplication[] = [
  {
    id: 'f-app-1',
    opportunityId: 'fac-4',
    opportunityTitle: 'Infosys Foundation FDP: Advanced Cloud & DevOps Pedagogy',
    organization: 'Infosys Springboard Campus Connect',
    type: 'Faculty Development Program (FDP)',
    facultyName: 'Dr. Priya Raghunathan',
    facultyDesignation: 'Associate Professor',
    department: 'Electrical Engineering (EED)',
    institution: 'Delhi Technological University, New Delhi',
    appliedDate: '2026-09-05',
    status: 'Proposal Submitted',
    proposalNote: 'Submitted intent to integrate DevOps curriculum into EE-604 (Embedded Systems Lab) and ES-712 (IoT Engineering) for B.Tech EE students.'
  },
  {
    id: 'f-app-2',
    opportunityId: 'fac-1',
    opportunityTitle: 'AICTE National FDP: VLSI Design & FPGA Prototyping',
    organization: 'AICTE — All India Council for Technical Education',
    type: 'Faculty Development Program (FDP)',
    facultyName: 'Dr. Priya Raghunathan',
    facultyDesignation: 'Associate Professor',
    department: 'Electrical Engineering (EED)',
    institution: 'Delhi Technological University, New Delhi',
    appliedDate: '2026-08-28',
    status: 'Approved',
    proposalNote: 'Selected under AICTE sponsored Faculty Development quota. FDP session commences Oct 14, 2026 at IIT Bombay.'
  }
];
