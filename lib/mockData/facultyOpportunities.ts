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
  },
  {
    id: 'fac-6',
    title: 'Qualcomm Faculty Immersion Sabbatical: 5G/6G Physical Layer & Edge Silicon',
    organization: 'Qualcomm India R&D',
    location: 'Bangalore / Hyderabad R&D Center',
    type: 'Faculty Internship',
    domain: 'Wireless Comms & VLSI Silicon',
    stipendOrGrant: '₹1,25,000 / Month + Executive Sabbatical Housing',
    duration: '8 Weeks (Summer / Winter Sabbatical)',
    deadline: '2026-10-30',
    eligibility: 'Faculty teaching ECE, Telecom, VLSI, or Embedded Systems with 3+ years teaching experience',
    description: 'Corporate sabbatical designed for senior academicians to embed directly inside Qualcomm modem architecture & RF front-end engineering teams. Gain first-hand exposure to 3GPP Rel-19 standard implementations, beamforming DSP, and Open-RAN acceleration hardware.',
    deliverables: [
      'Qualcomm Certified Academic Fellow Credential',
      '5G/6G Advanced Laboratory Course Module for Indian Universities',
      'Joint Industry Capstone Sponsorship for 10 Undergraduate Students'
    ],
    sponsoredBy: 'Qualcomm Wireless Reach & AICTE Partnership',
    seats: 12
  },
  {
    id: 'fac-7',
    title: 'Tata Motors Engineering Immersion: EV Powertrain Architecture & BMS',
    organization: 'Tata Motors European / Pune Technical Centre (ERC)',
    location: 'Pune, Maharashtra (Onsite)',
    type: 'Faculty Internship',
    domain: 'EV Powertrain & Energy Storage',
    stipendOrGrant: '₹90,000 / Month + Corporate Guest House',
    duration: '6 Weeks (Full-time Sabbatical)',
    deadline: '2026-11-15',
    eligibility: 'Faculty in Electrical, Mechanical, Automobile, or Mechatronics Engineering',
    description: 'Immerse in live electric vehicle engineering programs at Tata Motors ERC. Collaborate with lead powertrain architects on state-of-charge (SoC) estimation algorithms, liquid thermal management for LFP/NMC cells, and regenerative braking transient dynamics.',
    deliverables: [
      'AICTE-Approved Industry Sabbatical Completion Certificate',
      'Electric Vehicle Systems curriculum upgrade guide aligned with AIS-156 Amendment 3',
      'Direct pipeline for faculty-recommended student internships'
    ],
    sponsoredBy: 'Tata Motors Corporate Mobility R&D',
    seats: 8
  },
  {
    id: 'fac-8',
    title: 'L&T Heavy Engineering: BIM & Computational Mechanics Sabbatical',
    organization: 'Larsen & Toubro Ltd. (L&T Construction & Heavy Eng)',
    location: 'Chennai / Mumbai HQ',
    type: 'Faculty Internship',
    domain: 'Civil & Computational Structural Engineering',
    stipendOrGrant: '₹85,000 / Month + Travel Allowance',
    duration: '6 Weeks',
    deadline: '2026-10-25',
    eligibility: 'Faculty teaching Civil, Structural, or Mechanical Engineering',
    description: 'Faculty internship on mega-infrastructure project engineering. Hands-on exposure to 5D Building Information Modeling (BIM), seismic base-isolation modeling, and pre-stressed composite structure lifecycle analytics on live metro rail and bridge projects.',
    deliverables: [
      'L&T Master Structural Educator Certification',
      'Infrastructure digital twin case study repository for classroom instruction',
      'Sponsored software access for university structural design labs'
    ],
    sponsoredBy: 'Larsen & Toubro Build India Academy',
    seats: 15
  },
  {
    id: 'fac-9',
    title: 'Bosch India Consultancy RFP: Acoustic Anomaly Detection in High-Precision CNC Spindles',
    organization: 'Robert Bosch Engineering and Business Solutions',
    location: 'Bengaluru / Hybrid',
    type: 'Consultancy Project',
    domain: 'Signal Processing & Predictive Maintenance',
    stipendOrGrant: '₹14.5 Lakhs Consultancy Fee (9 Months)',
    duration: '9 Months (Phased Milestones)',
    deadline: '2026-11-20',
    eligibility: 'Faculty with expertise in Digital Signal Processing, Vibration Analysis, Wavelet Transforms, or Edge ML',
    description: 'Industry consultancy requirement: Design, train, and benchmark ultra-low latency acoustic anomaly detection algorithms deployed on MEMS microphone sensors for high-speed machining spindles. Must achieve >99.2% bearing fault detection under shop-floor ambient noise.',
    deliverables: [
      'Validated Python / C++ algorithm package ready for Bosch edge firmware integration',
      'Comprehensive benchmark report against ISO 10816 vibration standards',
      'Joint IP co-ownership option with commercial royalty provision'
    ],
    sponsoredBy: 'Bosch Industry 4.0 Center of Excellence',
    seats: 2
  },
  {
    id: 'fac-10',
    title: 'Schneider Electric Consultancy RFP: AI Microgrid Peak Shaving & BESS Optimization',
    organization: 'Schneider Electric Global R&D India',
    location: 'Bangalore / Remote',
    type: 'Consultancy Project',
    domain: 'Power Systems & Energy Management',
    stipendOrGrant: '₹16 Lakhs Consultancy Retainer (12 Months)',
    duration: '12 Months',
    deadline: '2026-12-01',
    eligibility: 'Faculty / Researchers in Power Systems, Renewable Energy Integration, or Reinforcement Learning',
    description: 'Consultancy project focused on developing mathematical optimization models (MILP / RL) for hybrid commercial microgrids with solar PV, battery energy storage systems (BESS), and time-of-day utility tariff arbitration. Goal: 18% peak demand charge reduction.',
    deliverables: [
      'Microgrid dispatch optimization engine code & API integration layer',
      'Hardware-in-the-Loop (HIL) testbench validation report at Schneider EcoStruxure lab',
      'Consultancy report on IEEE 1547-2018 grid interconnection compliance'
    ],
    sponsoredBy: 'Schneider Electric Innovation Fund',
    seats: 3
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
  },
  {
    id: 'f-app-3',
    opportunityId: 'fac-6',
    opportunityTitle: 'Qualcomm Faculty Immersion Sabbatical: 5G/6G Physical Layer & Edge Silicon',
    organization: 'Qualcomm India R&D',
    type: 'Faculty Internship',
    facultyName: 'Dr. Priya Raghunathan',
    facultyDesignation: 'Associate Professor',
    department: 'Electrical Engineering (EED)',
    institution: 'Delhi Technological University, New Delhi',
    appliedDate: '2026-09-02',
    status: 'Under Evaluation',
    proposalNote: 'Proposed 8-week sabbatical project on Open-RAN beamforming DSP acceleration for 6G sub-THz testbeds. Institution NOC issued by DTU Dean Academics.'
  }
];
