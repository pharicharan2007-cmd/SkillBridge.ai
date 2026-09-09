import { StudentProfile } from '@/types';

export const MOCK_STUDENTS: StudentProfile[] = [
  {
    id: 'std-101',
    name: 'Arjun Mehta',
    email: 'arjun.mehta@dtu.ac.in',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=256',
    college: 'Delhi Technological University (DTU)',
    institution: 'Delhi Technological University (DTU)',
    degree: 'B.Tech',
    branch: 'Computer Science and Engineering',
    year: 4,
    semester: 7,
    cgpa: 8.65,
    readinessScore: 72,
    targetRole: 'ML Research Engineer',
    careerInterests: ['Machine Learning', 'Computer Vision', 'Embedded AI'],
    enrollmentNumber: '2K22/CO/148',
    graduationYear: 2026,
    verificationStatus: 'Verified',
    verificationType: 'COLLEGE_ID',
    assessmentCompleted: true,
    lastAssessmentDate: '2026-08-28',
    skills: [
      { id: 'sk-1', name: 'Python', category: 'Technical', level: 85, verified: true, demandLevel: 'Critical' },
      { id: 'sk-2', name: 'Machine Learning', category: 'Technical', level: 74, verified: true, demandLevel: 'Critical' },
      { id: 'sk-3', name: 'SQL & Data Pipelines', category: 'Technical', level: 80, verified: true, demandLevel: 'High' },
      { id: 'sk-4', name: 'TensorFlow / PyTorch', category: 'Technical', level: 42, verified: false, demandLevel: 'Critical' },
      { id: 'sk-5', name: 'CUDA & GPU Programming', category: 'Technical', level: 35, verified: false, demandLevel: 'High' },
      { id: 'sk-9', name: 'Data Structures & Algorithms', category: 'Problem Solving', level: 80, verified: true, demandLevel: 'High' },
      { id: 'sk-10', name: 'Git & Linux', category: 'Digital Skills', level: 90, verified: true, demandLevel: 'Critical' },
      { id: 'sk-11', name: 'C++', category: 'Technical', level: 76, verified: true, demandLevel: 'High' },
      { id: 'sk-16', name: 'Problem Solving', category: 'Problem Solving', level: 82, verified: true, demandLevel: 'Critical' },
      { id: 'sk-17', name: 'Technical Communication', category: 'Soft Skills', level: 75, verified: true, demandLevel: 'High' },
      { id: 'sk-24', name: 'Distributed Systems', category: 'Digital Skills', level: 48, verified: false, demandLevel: 'High' },
      { id: 'sk-25', name: 'Pandas & NumPy', category: 'Technical', level: 84, verified: true, demandLevel: 'High' },
      { id: 'sk-30', name: 'Research Methodology', category: 'Soft Skills', level: 70, verified: true, demandLevel: 'High' },
    ],
    topGaps: [
      {
        skillId: 'sk-4',
        skillName: 'TensorFlow / PyTorch',
        category: 'Technical',
        currentLevel: 42,
        requiredLevel: 80,
        gapPercentage: 47,
        priority: 'Critical',
        recommendedAction: 'Complete NPTEL Deep Learning course (IIT Madras) & implement ResNet-50 on ISRO dataset project.'
      },
      {
        skillId: 'sk-5',
        skillName: 'CUDA & GPU Programming',
        category: 'Technical',
        currentLevel: 35,
        requiredLevel: 70,
        gapPercentage: 50,
        priority: 'Critical',
        recommendedAction: 'Complete NVIDIA DLI CUDA Fundamentals & run model training on DTU GPU lab cluster.'
      },
      {
        skillId: 'sk-24',
        skillName: 'Distributed Systems',
        category: 'Digital Skills',
        currentLevel: 48,
        requiredLevel: 75,
        gapPercentage: 36,
        priority: 'High',
        recommendedAction: 'Study MIT 6.824 Distributed Systems lecture series & implement Raft consensus algorithm.'
      }
    ],
    certifications: [
      { id: 'cert-1', title: 'NPTEL Deep Learning (IIT Madras)', issuer: 'NPTEL / IIT Madras', issueDate: '2026-04', verified: true },
      { id: 'cert-2', title: 'GATE 2026 Qualified — CS/IT', issuer: 'IIT Bombay (GATE)', issueDate: '2026-03', verified: true },
      { id: 'cert-3', title: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', issueDate: '2025-11', verified: true },
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'Spectral Crop Disease Classifier',
        techStack: ['Python', 'PyTorch', 'ResNet-50', 'ISRO LISS-IV Dataset'],
        description: 'Trained ResNet-50 on ISRO multispectral imagery to detect wheat rust with 88.4% validation accuracy. Presented at DTU Tech Fest 2026.',
        date: '2026-02'
      },
      {
        id: 'proj-2',
        title: 'RISC-V Pipelined Processor (VHDL)',
        techStack: ['VHDL', 'ModelSim', 'FPGA Artix-7'],
        description: 'Implemented 5-stage pipelined RISC-V RV32I processor on Artix-7 FPGA with hazard detection and branch prediction.',
        date: '2025-11'
      }
    ]
  },
  {
    id: 'std-102',
    name: 'Meera Krishnaswamy',
    email: 'meera.k@iitd.ac.in',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256',
    college: 'IIT Delhi',
    institution: 'Indian Institute of Technology Delhi (IIT Delhi)',
    degree: 'B.Tech',
    branch: 'Electrical Engineering (VLSI Specialisation)',
    year: 4,
    semester: 7,
    cgpa: 9.10,
    readinessScore: 88,
    targetRole: 'VLSI Design Engineer',
    careerInterests: ['VLSI Design', 'Embedded Systems', 'Signal Processing'],
    verificationStatus: 'Verified',
    verificationType: 'COLLEGE_ID',
    enrollmentNumber: '2K22/EE/064',
    graduationYear: 2026,
    assessmentCompleted: true,
    lastAssessmentDate: '2026-09-01',
    skills: [
      { id: 'sk-v1', name: 'Verilog / VHDL', category: 'Technical', level: 88, verified: true, demandLevel: 'Critical' },
      { id: 'sk-v2', name: 'MATLAB / Simulink', category: 'Technical', level: 84, verified: true, demandLevel: 'High' },
      { id: 'sk-v3', name: 'Embedded C', category: 'Technical', level: 76, verified: true, demandLevel: 'High' },
      { id: 'sk-v4', name: 'PCB Design (Altium)', category: 'Technical', level: 62, verified: true, demandLevel: 'High' },
      { id: 'sk-v5', name: 'FPGA Prototyping', category: 'Technical', level: 80, verified: true, demandLevel: 'Critical' },
      { id: 'sk-v6', name: 'Signal Processing (DSP)', category: 'Technical', level: 78, verified: true, demandLevel: 'High' },
      { id: 'sk-10', name: 'Git & Linux', category: 'Digital Skills', level: 88, verified: true, demandLevel: 'Critical' },
      { id: 'sk-11', name: 'C++', category: 'Technical', level: 70, verified: true, demandLevel: 'High' },
    ],
    topGaps: [],
    certifications: [
      { id: 'cert-4', title: 'CDAC VLSI Design Certificate', issuer: 'CDAC Pune', issueDate: '2025-10', verified: true },
      { id: 'cert-5', title: 'NPTEL Digital Circuits & Systems', issuer: 'NPTEL / IIT Madras', issueDate: '2025-08', verified: true },
    ],
    projects: [
      {
        id: 'proj-3',
        title: 'RISC-V SoC on Xilinx UltraScale+',
        techStack: ['Verilog', 'Xilinx Vivado', 'RISC-V', 'AXI Bus'],
        description: 'Designed a complete single-core RISC-V SoC with AXI4-Lite peripherals running at 250 MHz on UltraScale+ device.'
      }
    ]
  },
  {
    id: 'std-103',
    name: 'Sahil Agarwal',
    email: 'sahil.a@nsut.ac.in',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256',
    college: 'Netaji Subhas University of Technology (NSUT)',
    institution: 'Netaji Subhas University of Technology (NSUT)',
    degree: 'B.Tech',
    branch: 'Computer Science — AI & Data Science',
    year: 3,
    semester: 6,
    cgpa: 8.20,
    readinessScore: 65,
    targetRole: 'Data Engineer',
    careerInterests: ['Data Engineering', 'Cloud Computing', 'MLOps'],
    enrollmentNumber: '2K23/AI/089',
    graduationYear: 2026,
    verificationStatus: 'Pending',
    verificationType: 'COLLEGE_ID',
    collegeIdProof: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400',
    assessmentCompleted: true,
    lastAssessmentDate: '2026-09-05',
    skills: [
      { id: 'sk-1', name: 'Python', category: 'Technical', level: 78, verified: true, demandLevel: 'Critical' },
      { id: 'sk-3', name: 'SQL & Data Pipelines', category: 'Technical', level: 74, verified: true, demandLevel: 'High' },
      { id: 'sk-25', name: 'Pandas & NumPy', category: 'Technical', level: 72, verified: true, demandLevel: 'High' },
      { id: 'sk-d1', name: 'Docker & DevOps', category: 'Digital Skills', level: 55, verified: false, demandLevel: 'High' },
      { id: 'sk-d2', name: 'Cloud Computing (AWS)', category: 'Digital Skills', level: 50, verified: false, demandLevel: 'High' },
      { id: 'sk-9', name: 'Data Structures & Algorithms', category: 'Problem Solving', level: 70, verified: true, demandLevel: 'High' },
      { id: 'sk-10', name: 'Git & Linux', category: 'Digital Skills', level: 82, verified: true, demandLevel: 'Critical' },
    ],
    topGaps: [
      {
        skillId: 'sk-d1',
        skillName: 'Docker & DevOps',
        category: 'Digital Skills',
        currentLevel: 55,
        requiredLevel: 75,
        gapPercentage: 27,
        priority: 'High',
        recommendedAction: 'Complete Infosys Springboard DevOps track & containerise a FastAPI ETL project with Docker Compose.'
      }
    ],
    certifications: [
      { id: 'cert-6', title: 'NPTEL Python for Data Science (IIT Madras)', issuer: 'NPTEL / IIT Madras', issueDate: '2025-12', verified: true },
    ],
    projects: [
      {
        id: 'proj-4',
        title: 'Air Quality Index ETL Pipeline',
        techStack: ['Python', 'Apache Airflow', 'PostgreSQL', 'Grafana'],
        description: 'Built a real-time AQI data ingestion pipeline collecting data from CPCB sensors, storing in PostgreSQL, and visualising with Grafana dashboards.'
      }
    ]
  },
  {
    id: 'std-104',
    name: 'Tanvi Saxena',
    email: 'tanvi.s@dtu.ac.in',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    college: 'Delhi Technological University (DTU)',
    institution: 'Delhi Technological University (DTU)',
    degree: 'B.Tech',
    branch: 'Mechanical Engineering (Robotics & Automation)',
    year: 3,
    semester: 5,
    cgpa: 8.52,
    readinessScore: 68,
    targetRole: 'Robotics Software Engineer',
    careerInterests: ['Robotics', 'ROS 2', 'Embedded Systems'],
    enrollmentNumber: '2K23/ME/042',
    graduationYear: 2027,
    verificationStatus: 'Pending',
    verificationType: 'COLLEGE_ID',
    collegeIdProof: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400',
    assessmentCompleted: true,
    lastAssessmentDate: '2026-09-02',
    skills: [
      { id: 'sk-r1', name: 'ROS 2 / Navigation', category: 'Technical', level: 75, verified: true, demandLevel: 'Critical' },
      { id: 'sk-r2', name: 'C++', category: 'Technical', level: 82, verified: true, demandLevel: 'Critical' },
      { id: 'sk-r3', name: 'Python', category: 'Technical', level: 80, verified: true, demandLevel: 'High' },
      { id: 'sk-r4', name: 'Gazebo & Simulation', category: 'Technical', level: 65, verified: false, demandLevel: 'High' },
      { id: 'sk-10', name: 'Git & Linux', category: 'Digital Skills', level: 85, verified: true, demandLevel: 'Critical' }
    ],
    topGaps: [
      {
        skillId: 'sk-r4',
        skillName: 'Gazebo & Simulation',
        category: 'Technical',
        currentLevel: 65,
        requiredLevel: 80,
        gapPercentage: 19,
        priority: 'High',
        recommendedAction: 'Build autonomous robot navigation stack in ROS 2 Humble simulation.'
      }
    ],
    certifications: [
      { id: 'cert-7', title: 'Robotics Specialization (University of Pennsylvania)', issuer: 'Coursera / UPenn', issueDate: '2026-01', verified: true }
    ],
    projects: [
      {
        id: 'proj-5',
        title: 'Autonomous Mobile Robot (AMR) SLAM',
        techStack: ['ROS 2', 'Lidar', 'Nav2', 'Python', 'C++'],
        description: 'Developed SLAM-based indoor navigation for differential drive warehouse robot with dynamic obstacle avoidance.'
      }
    ]
  }
];
