import { Opportunity } from '@/types';

export const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'ML Research Intern — Remote Sensing & Earth Observation',
    company: 'ISRO Space Applications Centre (SAC)',
    companyLogo: '🛰️',
    location: 'Ahmedabad, Gujarat (Onsite)',
    type: 'Internship',
    stipend: '₹40,000 / month',
    duration: '6 Months',
    deadline: '2026-10-20',
    domain: 'Machine Learning / Remote Sensing',
    requiredSkills: ['Python', 'TensorFlow / PyTorch', 'Machine Learning', 'Pandas & NumPy', 'Git & Linux'],
    minimumCGPA: 8.0,
    eligibleBranches: ['Computer Science and Engineering', 'Electrical Engineering (VLSI Specialisation)', 'AI & Data Science'],
    description: 'Work alongside ISRO scientists developing deep learning models for crop mapping, disaster monitoring, and satellite image classification using LISS-IV and Cartosat imagery.',
    responsibilities: [
      'Train CNN and Vision Transformer models on ISRO multispectral datasets.',
      'Implement reproducible ML pipelines with MLflow and DVC.',
      'Publish or co-author a technical paper in an IEEE or ISPRS journal.',
      'Present weekly findings to SAC Remote Sensing Division.'
    ],
    perks: ['Government Research Fellowship Certificate', 'Co-authorship on ISRO technical report', 'Letter of Recommendation from SAC Scientist']
  },
  {
    id: 'opp-2',
    title: 'VLSI Design Intern — Modem IP Group',
    company: 'Qualcomm India Pvt. Ltd.',
    companyLogo: '📡',
    location: 'Hyderabad, Telangana (Onsite)',
    type: 'Internship',
    stipend: '₹60,000 / month',
    duration: '6 Months',
    deadline: '2026-10-10',
    domain: 'VLSI / Semiconductor',
    requiredSkills: ['Verilog / VHDL', 'FPGA Prototyping', 'C++', 'Git & Linux', 'Signal Processing (DSP)'],
    minimumCGPA: 8.5,
    eligibleBranches: ['Electrical Engineering (VLSI Specialisation)', 'Electronics & Communication Engineering'],
    description: 'Contribute to RTL design and verification of next-generation 5G NR modem IP blocks within Qualcomm\'s Hyderabad Modem Group.',
    responsibilities: [
      'Write synthesisable RTL in SystemVerilog for baseband DSP modules.',
      'Develop UVM testbenches and functional coverage models.',
      'Perform timing closure and logic equivalence checks.',
      'Participate in design review with Senior VLSI Engineers.'
    ],
    perks: ['Pre-Placement Offer (PPO) track', 'Qualcomm VLSI Certification', 'Health Insurance coverage during internship']
  },
  {
    id: 'opp-3',
    title: 'Software Engineer Trainee — TCS iON Campus Programme',
    company: 'Tata Consultancy Services (TCS)',
    companyLogo: '🏢',
    location: 'Pune / Chennai / Noida (Onsite)',
    type: 'Full-time',
    stipend: '₹7.0 LPA',
    duration: 'Full-time Role',
    deadline: '2026-11-01',
    domain: 'Software Engineering',
    requiredSkills: ['Python', 'Data Structures & Algorithms', 'SQL & Data Pipelines', 'Git & Linux', 'Problem Solving'],
    minimumCGPA: 7.5,
    eligibleBranches: ['Computer Science and Engineering', 'AI & Data Science', 'Information Technology'],
    description: 'Join TCS\'s flagship Campus Connect programme. Undergo structured 3-month training in enterprise software development, cloud architecture, and agile delivery before live project deployment.',
    responsibilities: [
      'Complete TCS NQT screening (score ≥ 60 percentile required).',
      'Build and test enterprise-grade software modules with Java / Python.',
      'Follow Agile sprint cycles with senior TCS architects.',
      'Document code and contribute to internal knowledge base.'
    ],
    perks: ['₹7.0 LPA CTC + performance variable', 'TCS Learning Hub access', 'Internal lateral movement to AI/ML BU after 2 years']
  },
  {
    id: 'opp-4',
    title: 'Embedded Systems Intern — Automotive Division',
    company: 'Bosch India Engineering & Technology Centre',
    companyLogo: '⚙️',
    location: 'Bengaluru, Karnataka (Hybrid)',
    type: 'Internship',
    stipend: '₹35,000 / month',
    duration: '6 Months',
    deadline: '2026-10-25',
    domain: 'Embedded Systems / Automotive',
    requiredSkills: ['Embedded C', 'C++', 'Git & Linux', 'Signal Processing (DSP)', 'Problem Solving'],
    minimumCGPA: 7.8,
    eligibleBranches: ['Electrical Engineering (VLSI Specialisation)', 'Electronics & Communication Engineering', 'Computer Science and Engineering'],
    description: 'Develop firmware and AUTOSAR BSW components for ADAS (Advanced Driver-Assistance Systems) ECUs targeting ISO 26262 ASIL-B compliance.',
    responsibilities: [
      'Write and unit-test AUTOSAR MCAL drivers in Embedded C.',
      'Perform MISRA-C static analysis on firmware modules.',
      'Integrate CAN / LIN protocol stacks on NXP S32K platform.',
      'Collaborate with Bosch Stuttgart on requirements verification.'
    ],
    perks: ['AUTOSAR Certification track', 'Patent co-authorship eligibility', 'PPO pipeline for top 20% performers']
  },
  {
    id: 'opp-5',
    title: 'Research Associate — AI4Science Lab',
    company: 'IIT Delhi Department of CSE',
    companyLogo: '🔬',
    location: 'New Delhi (Onsite)',
    type: 'Internship',
    stipend: '₹25,000 / month',
    duration: '6 Months',
    deadline: '2026-10-05',
    domain: 'AI Research',
    requiredSkills: ['Python', 'Machine Learning', 'TensorFlow / PyTorch', 'Research Methodology', 'Git & Linux'],
    minimumCGPA: 8.2,
    eligibleBranches: ['Computer Science and Engineering', 'AI & Data Science'],
    description: 'Collaborate with IIT Delhi faculty on cutting-edge ML research in scientific computing — including materials discovery, protein structure prediction, and climate modelling.',
    responsibilities: [
      'Reproduce and extend recent NeurIPS / ICML papers under faculty guidance.',
      'Implement GNN and physics-informed neural networks for simulation tasks.',
      'Write and submit first-author research paper to top-tier conference.',
      'Present weekly group reading seminar on selected ML paper.'
    ],
    perks: ['IITD Research Portal access', 'Strong LOR for MS/PhD applications', 'Workshop & conference travel grant']
  },
  {
    id: 'opp-6',
    title: 'Deep Learning Engineer Intern — Edge AI',
    company: 'Intel India R&D (VLSI & AI Labs)',
    companyLogo: '💡',
    location: 'Bengaluru, Karnataka (Hybrid)',
    type: 'Internship',
    stipend: '₹55,000 / month',
    duration: '6 Months',
    deadline: '2026-10-30',
    domain: 'Edge AI / Hardware AI',
    requiredSkills: ['TensorFlow / PyTorch', 'Python', 'CUDA & GPU Programming', 'C++', 'Machine Learning'],
    minimumCGPA: 8.0,
    eligibleBranches: ['Computer Science and Engineering', 'Electrical Engineering (VLSI Specialisation)', 'AI & Data Science'],
    description: 'Optimise deep neural networks for Intel\'s OpenVINO toolkit and Gaudi AI accelerator. Focus on model quantization, pruning, and hardware-software co-design.',
    responsibilities: [
      'Quantize transformer and CNN models using PTQ and QAT techniques.',
      'Profile inference latency on Intel Gaudi and Meteor Lake NPU.',
      'Co-develop benchmarking suite against NVIDIA/AMD baselines.',
      'Write technical whitepaper on edge deployment findings.'
    ],
    perks: ['Intel AI Certification', 'PPO opportunity', 'Publication assistance for top interns']
  },
  {
    id: 'opp-7',
    title: 'Data Engineer — Cloud Infrastructure Team',
    company: 'Infosys Labs (Infosys Innovation Network)',
    companyLogo: '🌐',
    location: 'Pune, Maharashtra (Hybrid)',
    type: 'Full-time',
    stipend: '₹8.5 LPA',
    duration: 'Full-time Role',
    deadline: '2026-11-15',
    domain: 'Data Engineering',
    requiredSkills: ['Python', 'SQL & Data Pipelines', 'Docker & DevOps', 'Cloud Computing (AWS / GCP)', 'Distributed Systems'],
    minimumCGPA: 7.5,
    eligibleBranches: ['Computer Science and Engineering', 'AI & Data Science', 'Information Technology'],
    description: 'Build fault-tolerant streaming and batch ETL pipelines for Infosys\'s Enterprise Data Platform, processing millions of daily transactions for global banking clients.',
    responsibilities: [
      'Design Apache Airflow DAGs and Spark jobs for batch pipelines.',
      'Implement Kafka consumer groups for real-time data streaming.',
      'Optimise PostgreSQL query plans and indexing strategies.',
      'Maintain DataOps CI/CD pipeline and data quality SLAs.'
    ],
    perks: ['₹8.5 LPA + performance bonus', 'AWS Professional certification reimbursement', 'Infosys Lex learning platform access']
  },
  {
    id: 'opp-8',
    title: 'Computer Vision Intern — Autonomous Vehicles',
    company: 'Mahindra Research Valley',
    companyLogo: '🚗',
    location: 'Chennai, Tamil Nadu (Onsite)',
    type: 'Internship',
    stipend: '₹38,000 / month',
    duration: '6 Months',
    deadline: '2026-10-15',
    domain: 'Computer Vision / Autonomous Systems',
    requiredSkills: ['Python', 'TensorFlow / PyTorch', 'Machine Learning', 'Pandas & NumPy', 'C++'],
    minimumCGPA: 7.8,
    eligibleBranches: ['Computer Science and Engineering', 'Electrical Engineering (VLSI Specialisation)', 'AI & Data Science'],
    description: 'Develop perception algorithms for Mahindra\'s AV platform — object detection, lane segmentation, and sensor fusion for LiDAR + camera systems.',
    responsibilities: [
      'Train YOLOv8 and SegFormer models on Indian road datasets.',
      'Implement LiDAR-camera calibration and fusion pipelines.',
      'Profile inference FPS on NVIDIA Orin automotive SoC.',
      'Document results in ISO 21448 (SOTIF) compliant format.'
    ],
    perks: ['PPO pipeline', 'ADAS lab access', 'Patent co-filing for novel methods']
  }
];
