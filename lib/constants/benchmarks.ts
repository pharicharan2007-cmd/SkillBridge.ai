import { SkillGapItem, StudentProfile, SkillCategory, EngineeringCluster } from '@/types';

export interface BenchmarkRequirement {
  skill: string;
  required: number;
  cluster: 'ECE' | 'CSE' | 'Mechanical' | 'Civil' | 'Electrical';
  category?: SkillCategory;
  recommendedAction?: string;
}

// Multi-Discipline Role Benchmarks across all 5 Engineering Clusters
export const ROLE_BENCHMARKS: Record<string, BenchmarkRequirement[]> = {
  // ─── 1. Electronics & Communication (ECE / VLSI / Embedded) ───
  'Embedded Systems & Firmware Engineer': [
    { skill: 'Embedded C', required: 85, cluster: 'ECE', category: 'Technical', recommendedAction: 'Complete ARM Cortex-M bare-metal & driver development labs.' },
    { skill: 'ARM Cortex-M', required: 80, cluster: 'ECE', category: 'Technical', recommendedAction: 'Practice peripheral interfacing (NVIC, SysTick, DMA) on STM32 / NXP board.' },
    { skill: 'FreeRTOS', required: 80, cluster: 'ECE', category: 'Technical', recommendedAction: 'Implement real-time multithreading, semaphores & queues on FreeRTOS.' },
    { skill: 'Circuit Analysis & SPICE', required: 75, cluster: 'ECE', category: 'Technical', recommendedAction: 'Simulate analog sensor conditioning circuits in LTspice / SPICE.' },
    { skill: 'I2C / SPI / CAN Bus', required: 75, cluster: 'ECE', category: 'Technical', recommendedAction: 'Capture and decode protocol waveforms with logic analyzer.' },
    { skill: 'Verilog / VHDL', required: 70, cluster: 'ECE', category: 'Technical', recommendedAction: 'Synthesize baseline FSM controllers on FPGA.' },
    { skill: 'Git & Linux', required: 75, cluster: 'ECE', category: 'Digital Skills', recommendedAction: 'Master Linux kernel device tree basics and Git branching workflows.' }
  ],
  'VLSI Front-End RTL Design Engineer': [
    { skill: 'Verilog / VHDL', required: 85, cluster: 'ECE', category: 'Technical', recommendedAction: 'Write synthesisable RTL and functional testbenches in SystemVerilog.' },
    { skill: 'SystemVerilog UVM', required: 80, cluster: 'ECE', category: 'Technical', recommendedAction: 'Build constrained-random verification environments with UVM.' },
    { skill: 'FPGA Prototyping', required: 80, cluster: 'ECE', category: 'Technical', recommendedAction: 'Implement digital logic pipelines on Xilinx Artix-7 or UltraScale+.' },
    { skill: 'Xilinx Vivado', required: 75, cluster: 'ECE', category: 'Technical', recommendedAction: 'Perform static timing analysis (STA) and timing closure in Vivado.' },
    { skill: 'Circuit Analysis & SPICE', required: 70, cluster: 'ECE', category: 'Technical', recommendedAction: 'Analyze propagation delay and CMOS transistor switching curves.' },
    { skill: 'Signal Processing (DSP)', required: 70, cluster: 'ECE', category: 'Technical', recommendedAction: 'Implement FIR/IIR digital filter architectures in HDL.' }
  ],
  'Analog & Mixed-Signal IC Engineer': [
    { skill: 'Circuit Analysis & SPICE', required: 85, cluster: 'ECE', category: 'Technical', recommendedAction: 'Simulate precision op-amps, bandgaps & ADC architectures in Cadence/SPICE.' },
    { skill: 'Cadence Virtuoso', required: 80, cluster: 'ECE', category: 'Technical', recommendedAction: 'Complete analog schematic entry and DRC/LVS layout verification.' },
    { skill: 'Altium PCB Design', required: 75, cluster: 'ECE', category: 'Technical', recommendedAction: 'Design 4-layer mixed-signal test fixtures with ground plane partitioning.' },
    { skill: 'Signal Processing (DSP)', required: 70, cluster: 'ECE', category: 'Technical', recommendedAction: 'Evaluate SNR, THD and ENOB parameters in MATLAB.' },
    { skill: 'Embedded C', required: 70, cluster: 'ECE', category: 'Technical', recommendedAction: 'Develop microcontroller firmware for silicon characterization benches.' }
  ],
  'RF & Signal Processing Engineer': [
    { skill: 'Signal Processing (DSP)', required: 85, cluster: 'ECE', category: 'Technical', recommendedAction: 'Implement baseband modulation (QAM, OFDM) and SDR receivers.' },
    { skill: 'MATLAB / Simulink', required: 85, cluster: 'ECE', category: 'Technical', recommendedAction: 'Simulate RF front-end link budget and noise figure in MATLAB.' },
    { skill: 'Circuit Analysis & SPICE', required: 75, cluster: 'ECE', category: 'Technical', recommendedAction: 'Analyze impedance matching networks and S-parameters.' },
    { skill: 'Embedded C', required: 70, cluster: 'ECE', category: 'Technical', recommendedAction: 'Program DSP processors for real-time sample streaming.' }
  ],

  // ─── 2. Computer Science & AI / IT ───
  'AI/ML Research Engineer': [
    { skill: 'Python', required: 85, cluster: 'CSE', category: 'Technical', recommendedAction: 'Practice vectorized NumPy computations and high-throughput Python pipelines.' },
    { skill: 'Machine Learning', required: 80, cluster: 'CSE', category: 'Technical', recommendedAction: 'Study bias-variance tradeoff, regularization, and gradient descent optimization.' },
    { skill: 'TensorFlow / PyTorch', required: 80, cluster: 'CSE', category: 'Technical', recommendedAction: 'Complete Deep Learning Specialization & train ResNet models on PyTorch.' },
    { skill: 'SQL & Databases', required: 75, cluster: 'CSE', category: 'Technical', recommendedAction: 'Optimize complex analytical joins and database indexing strategies.' },
    { skill: 'Cloud Computing (AWS)', required: 75, cluster: 'CSE', category: 'Digital Skills', recommendedAction: 'Deploy containerized ML models to AWS EC2 or SageMaker endpoints.' },
    { skill: 'System Design', required: 70, cluster: 'CSE', category: 'Problem Solving', recommendedAction: 'Study distributed microservices, caching layers, and load balancing.' }
  ],
  'AI/ML Engineer': [
    { skill: 'Python', required: 85, cluster: 'CSE', category: 'Technical', recommendedAction: 'Practice vectorized NumPy computations and high-throughput Python pipelines.' },
    { skill: 'Machine Learning', required: 80, cluster: 'CSE', category: 'Technical', recommendedAction: 'Study bias-variance tradeoff, regularization, and gradient descent optimization.' },
    { skill: 'TensorFlow / PyTorch', required: 80, cluster: 'CSE', category: 'Technical', recommendedAction: 'Complete Deep Learning Specialization & train ResNet models on PyTorch.' },
    { skill: 'SQL & Databases', required: 75, cluster: 'CSE', category: 'Technical', recommendedAction: 'Optimize complex analytical joins and database indexing strategies.' },
    { skill: 'Cloud Computing (AWS)', required: 75, cluster: 'CSE', category: 'Digital Skills', recommendedAction: 'Deploy containerized ML models to AWS EC2 or SageMaker endpoints.' },
    { skill: 'System Design', required: 70, cluster: 'CSE', category: 'Problem Solving', recommendedAction: 'Study distributed microservices, caching layers, and load balancing.' }
  ],
  'Full Stack Software Architect': [
    { skill: 'React.js', required: 85, cluster: 'CSE', category: 'Technical', recommendedAction: 'Build modular design systems with React hooks, context, and SSR.' },
    { skill: 'TypeScript', required: 80, cluster: 'CSE', category: 'Technical', recommendedAction: 'Enforce strict typing, generics, and algebraic data types across API layers.' },
    { skill: 'Node.js', required: 80, cluster: 'CSE', category: 'Technical', recommendedAction: 'Architect event-driven async REST APIs in Node / Express.' },
    { skill: 'REST APIs', required: 85, cluster: 'CSE', category: 'Technical', recommendedAction: 'Implement OpenAPI/Swagger documented endpoints with OAuth 2.0.' },
    { skill: 'SQL & Databases', required: 75, cluster: 'CSE', category: 'Technical', recommendedAction: 'Design normalized schemas and PostgreSQL migration scripts.' },
    { skill: 'Docker & Containers', required: 65, cluster: 'CSE', category: 'Digital Skills', recommendedAction: 'Containerize multi-container full-stack applications with Docker Compose.' }
  ],
  'Full Stack Web Developer': [
    { skill: 'React.js', required: 85, cluster: 'CSE', category: 'Technical', recommendedAction: 'Build responsive web apps with Tailwind CSS and Next.js / React.' },
    { skill: 'TypeScript', required: 80, cluster: 'CSE', category: 'Technical', recommendedAction: 'Write type-safe front-end state management code.' },
    { skill: 'Node.js', required: 80, cluster: 'CSE', category: 'Technical', recommendedAction: 'Develop backend endpoints and middleware services.' },
    { skill: 'REST APIs', required: 85, cluster: 'CSE', category: 'Technical', recommendedAction: 'Connect front-end client to authenticated REST endpoints.' },
    { skill: 'SQL & Databases', required: 75, cluster: 'CSE', category: 'Technical', recommendedAction: 'Execute CRUD operations and relational joins.' }
  ],
  'Cloud DevOps & SRE': [
    { skill: 'Cloud Computing (AWS)', required: 85, cluster: 'CSE', category: 'Digital Skills', recommendedAction: 'Provision VPC, IAM, EC2, and S3 resources via Terraform IaC.' },
    { skill: 'Docker & Containers', required: 80, cluster: 'CSE', category: 'Digital Skills', recommendedAction: 'Write optimized multi-stage Dockerfiles and container health checks.' },
    { skill: 'CI/CD Pipelines', required: 80, cluster: 'CSE', category: 'Digital Skills', recommendedAction: 'Configure automated test and deployment actions in GitHub Workflows.' },
    { skill: 'Python', required: 70, cluster: 'CSE', category: 'Technical', recommendedAction: 'Automate infrastructure health monitoring scripts in Python.' },
    { skill: 'System Design', required: 75, cluster: 'CSE', category: 'Problem Solving', recommendedAction: 'Implement high availability, multi-region failover, and metrics alarms.' }
  ],
  'Data Analyst & Visualization': [
    { skill: 'SQL & Databases', required: 85, cluster: 'CSE', category: 'Technical', recommendedAction: 'Write complex CTEs, window functions, and aggregation queries.' },
    { skill: 'Python', required: 75, cluster: 'CSE', category: 'Technical', recommendedAction: 'Clean, reshape, and analyze structured datasets using Pandas.' },
    { skill: 'Data Visualization (PowerBI / Tableau)', required: 80, cluster: 'CSE', category: 'Digital Skills', recommendedAction: 'Design executive KPI dashboards with interactive filters.' },
    { skill: 'Pandas & NumPy', required: 80, cluster: 'CSE', category: 'Technical', recommendedAction: 'Process large CSV/Parquet time-series datasets.' }
  ],
  'Cyber Security Analyst': [
    { skill: 'Cybersecurity Fundamentals', required: 85, cluster: 'CSE', category: 'Technical', recommendedAction: 'Study OWASP Top 10 vulnerabilities and network security protocols.' },
    { skill: 'System Design', required: 75, cluster: 'CSE', category: 'Problem Solving', recommendedAction: 'Audit enterprise zero-trust access control architectures.' },
    { skill: 'Python', required: 70, cluster: 'CSE', category: 'Technical', recommendedAction: 'Write automated vulnerability scanning and log parsing tools.' },
    { skill: 'Git & Linux', required: 80, cluster: 'CSE', category: 'Digital Skills', recommendedAction: 'Harden Linux servers, manage permissions, and inspect systemd logs.' }
  ],

  // ─── 3. Mechanical & Robotics ───
  'Robotics Software Engineer (AMR)': [
    { skill: 'ROS 2 / Navigation', required: 85, cluster: 'Mechanical', category: 'Technical', recommendedAction: 'Deploy Nav2 costmaps and SLAM localization on differential drive robots.' },
    { skill: 'Kinematics & Dynamics', required: 80, cluster: 'Mechanical', category: 'Technical', recommendedAction: 'Calculate forward and inverse kinematics using Denavit-Hartenberg parameters.' },
    { skill: 'SolidWorks CAD', required: 75, cluster: 'Mechanical', category: 'Technical', recommendedAction: 'Model robot chassis, motor mounts, and sensor brackets in 3D CAD.' },
    { skill: 'Ansys FEA / CFD', required: 70, cluster: 'Mechanical', category: 'Technical', recommendedAction: 'Verify structural load capacity and vibration modes of robotic frames.' },
    { skill: 'C++', required: 80, cluster: 'Mechanical', category: 'Technical', recommendedAction: 'Write high-performance ROS 2 nodes in C++ with modern memory management.' }
  ],
  'EV Battery Thermal & Structural Design Engineer': [
    { skill: 'SolidWorks CAD', required: 85, cluster: 'Mechanical', category: 'Technical', recommendedAction: 'Design aluminum die-cast battery enclosures complying with AIS-156.' },
    { skill: 'Ansys FEA / CFD', required: 85, cluster: 'Mechanical', category: 'Technical', recommendedAction: 'Run conjugate heat transfer (CHT) simulations for battery cooling jackets.' },
    { skill: 'GD&T Tolerancing', required: 80, cluster: 'Mechanical', category: 'Technical', recommendedAction: 'Apply ASME Y14.5 geometric tolerances to battery pack seal surfaces.' },
    { skill: 'Kinematics & Dynamics', required: 75, cluster: 'Mechanical', category: 'Technical', recommendedAction: 'Simulate drop impacts and vehicle shock spectra on battery mounts.' }
  ],
  'Automotive CAE & Crash Simulation Engineer': [
    { skill: 'Ansys FEA / CFD', required: 85, cluster: 'Mechanical', category: 'Technical', recommendedAction: 'Set up non-linear dynamic crash models in LS-DYNA / Ansys.' },
    { skill: 'SolidWorks CAD', required: 80, cluster: 'Mechanical', category: 'Technical', recommendedAction: 'Extract mid-surfaces and clean CAD geometry for FEA meshing.' },
    { skill: 'GD&T Tolerancing', required: 80, cluster: 'Mechanical', category: 'Technical', recommendedAction: 'Check sheet metal body-in-white (BIW) assembly tolerances.' }
  ],

  // ─── 4. Civil & Infrastructure ───
  'Structural Design Engineer (Metro & Bridges)': [
    { skill: 'Structural Analysis (STAAD.Pro)', required: 85, cluster: 'Civil', category: 'Technical', recommendedAction: 'Model 3D portal frames and continuous bridge decks in STAAD.Pro.' },
    { skill: 'Reinforced Concrete (IS 456)', required: 85, cluster: 'Civil', category: 'Technical', recommendedAction: 'Design RCC columns, beams, and slabs per IS 456 / IS 13920 seismic code.' },
    { skill: 'AutoCAD Civil 3D', required: 80, cluster: 'Civil', category: 'Technical', recommendedAction: 'Draft structural reinforcement detailing and bar bending schedules.' },
    { skill: 'Revit BIM Modeling', required: 75, cluster: 'Civil', category: 'Digital Skills', recommendedAction: 'Model parametric bridge piers and viaduct alignments in Revit.' }
  ],
  'BIM & Digital Twin Coordinator': [
    { skill: 'Revit BIM Modeling', required: 85, cluster: 'Civil', category: 'Digital Skills', recommendedAction: 'Coordinate 3D BIM models at LOD 350 and resolve clash reports.' },
    { skill: 'AutoCAD Civil 3D', required: 80, cluster: 'Civil', category: 'Technical', recommendedAction: 'Integrate highway corridor alignments and surface contours.' },
    { skill: 'Structural Analysis (STAAD.Pro)', required: 75, cluster: 'Civil', category: 'Technical', recommendedAction: 'Check design compliance of structural members against BIM geometry.' },
    { skill: 'Surveying & GIS', required: 75, cluster: 'Civil', category: 'Technical', recommendedAction: 'Incorporate drone survey point clouds and GIS elevation layers.' }
  ],

  // ─── 5. Electrical & Power Systems ───
  'Power Electronics & Inverter Control Engineer': [
    { skill: 'Power Electronics', required: 85, cluster: 'Electrical', category: 'Technical', recommendedAction: 'Design 800V SiC traction inverters and gate driver isolation circuits.' },
    { skill: 'MATLAB / Simulink', required: 85, cluster: 'Electrical', category: 'Technical', recommendedAction: 'Simulate space vector PWM (SVPWM) and Field-Oriented Control (FOC).' },
    { skill: 'Motor Drives & FOC', required: 80, cluster: 'Electrical', category: 'Technical', recommendedAction: 'Implement sensorless observer algorithms for PMSM traction motors.' },
    { skill: 'Battery Management (BMS)', required: 75, cluster: 'Electrical', category: 'Technical', recommendedAction: 'Model active cell balancing and battery state-of-charge (SOC) algorithms.' }
  ],
  'Smart Grid & Substation Automation Specialist': [
    { skill: 'PLC & SCADA Automation', required: 85, cluster: 'Electrical', category: 'Technical', recommendedAction: 'Configure IEC 61850 GOOSE messaging and SCADA supervisory screens.' },
    { skill: 'Power Electronics', required: 80, cluster: 'Electrical', category: 'Technical', recommendedAction: 'Coordinate digital protective relays with smart inverter grid codes.' },
    { skill: 'MATLAB / Simulink', required: 80, cluster: 'Electrical', category: 'Technical', recommendedAction: 'Simulate microgrid islanding and renewable power fluctuation dynamics.' }
  ],
  'BMS Firmware & Battery Storage Engineer': [
    { skill: 'Battery Management (BMS)', required: 85, cluster: 'Electrical', category: 'Technical', recommendedAction: 'Develop robust BMS firmware for cell monitoring ICs and thermal protection.' },
    { skill: 'Power Electronics', required: 85, cluster: 'Electrical', category: 'Technical', recommendedAction: 'Integrate DC-DC bidirectional converters for battery energy storage.' },
    { skill: 'MATLAB / Simulink', required: 80, cluster: 'Electrical', category: 'Technical', recommendedAction: 'Run hardware-in-the-loop (HIL) battery pack simulation models.' },
    { skill: 'Motor Drives & FOC', required: 75, cluster: 'Electrical', category: 'Technical', recommendedAction: 'Calibrate motor drive current loops with battery pack voltage sags.' }
  ]
};

// Resolve student engineering cluster reliably from cluster, branch, or target role
export function resolveStudentCluster(student?: Partial<StudentProfile> | null): EngineeringCluster {
  if (!student) return 'Electronics & Communication (VLSI & Embedded)';
  const cluster = (student.engineeringCluster || '').toLowerCase();
  const branch = (student.branch || '').toLowerCase();
  const targetRole = (student.targetRole || '').toLowerCase();
  const combined = `${cluster} ${branch} ${targetRole}`;

  if (combined.includes('electronics') || combined.includes('vlsi') || combined.includes('embedded') || combined.includes('ece') || combined.includes('firmware') || combined.includes('dsp')) {
    return 'Electronics & Communication (VLSI & Embedded)';
  }
  if (combined.includes('mechanical') || combined.includes('robotics') || combined.includes('automotive') || combined.includes('cad') || combined.includes('amr') || combined.includes('fea')) {
    return 'Mechanical, Robotics & Automotive EV';
  }
  if (combined.includes('civil') || combined.includes('structural') || combined.includes('infrastructure') || combined.includes('bim') || combined.includes('staad')) {
    return 'Civil & Smart Infrastructure';
  }
  if (combined.includes('power') || combined.includes('bms') || combined.includes('inverter') || (combined.includes('electrical') && !combined.includes('vlsi'))) {
    return 'Electrical, Power Systems & Renewable Energy';
  }
  return 'Computer Science & Information Technology';
}

// Fallback role lookup by discipline
export function getDefaultRoleForCluster(cluster?: string): string {
  if (!cluster) return 'Embedded Systems & Firmware Engineer';
  const c = cluster.toLowerCase();
  if (c.includes('electronics') || c.includes('vlsi') || c.includes('ece')) {
    return 'Embedded Systems & Firmware Engineer';
  }
  if (c.includes('mechanical') || c.includes('robotics') || c.includes('automotive')) {
    return 'Robotics Software Engineer (AMR)';
  }
  if (c.includes('civil') || c.includes('structural') || c.includes('infrastructure')) {
    return 'Structural Design Engineer (Metro & Bridges)';
  }
  if (c.includes('electrical') || c.includes('power') || c.includes('renewable')) {
    return 'Power Electronics & Inverter Control Engineer';
  }
  return 'AI/ML Research Engineer';
}

/**
 * Dynamically computes skill gaps between a student's registered skills
 * and their target role benchmark across any engineering discipline.
 */
export function computeStudentSkillGaps(student: Partial<StudentProfile>): SkillGapItem[] {
  const targetRole = student.targetRole || getDefaultRoleForCluster(student.engineeringCluster || student.branch);
  const benchmark = ROLE_BENCHMARKS[targetRole] || 
    ROLE_BENCHMARKS[getDefaultRoleForCluster(student.engineeringCluster || student.branch)] || 
    ROLE_BENCHMARKS['Embedded Systems & Firmware Engineer'];

  const studentSkills = student.skills || [];

  const gaps: SkillGapItem[] = [];

  benchmark.forEach((req, idx) => {
    const reqLower = req.skill.toLowerCase();

    // Match against student's registered skills
    const match = studentSkills.find(s => {
      const sLower = s.name.toLowerCase();
      if (sLower === reqLower || sLower.includes(reqLower) || reqLower.includes(sLower)) return true;
      const parts = reqLower.split(/[/,&]/).map(p => p.trim()).filter(Boolean);
      return parts.some(p => sLower.includes(p) || p.includes(sLower));
    });

    const currentLevel = match ? match.level : 0;
    const gapPercentage = Math.max(0, req.required - currentLevel);

    // Only flag as gap if current level is below the required level
    if (gapPercentage > 0) {
      let priority: 'Critical' | 'High' | 'Medium' = 'Medium';
      if (gapPercentage >= 35 || currentLevel === 0) priority = 'Critical';
      else if (gapPercentage >= 15) priority = 'High';

      gaps.push({
        skillId: `gap-${idx}-${req.skill.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        skillName: req.skill,
        category: req.category || 'Technical',
        currentLevel,
        requiredLevel: req.required,
        gapPercentage,
        priority,
        recommendedAction: req.recommendedAction || `Upgrade ${req.skill} to industry required standard of ${req.required}%.`
      });
    }
  });

  // Sort: Critical gaps first, then highest gap percentage
  return gaps.sort((a, b) => {
    const priorityWeight = { Critical: 3, High: 2, Medium: 1 };
    if (priorityWeight[a.priority] !== priorityWeight[b.priority]) {
      return priorityWeight[b.priority] - priorityWeight[a.priority];
    }
    return b.gapPercentage - a.gapPercentage;
  });
}

// Default domain-specific skills for each engineering cluster
export function getDefaultSkillsForCluster(cluster?: string): Array<{ name: string; category: SkillCategory; level: number; demandLevel?: 'Critical' | 'High' | 'Medium'; verified?: boolean }> {
  const c = (cluster || '').toLowerCase();
  if (c.includes('electronics') || c.includes('vlsi') || c.includes('embedded') || c.includes('ece')) {
    return [
      { name: 'Verilog / VHDL', category: 'Technical', level: 68, demandLevel: 'Critical' },
      { name: 'FPGA Prototyping', category: 'Technical', level: 60, demandLevel: 'Critical' },
      { name: 'Embedded C', category: 'Technical', level: 72, demandLevel: 'High' },
      { name: 'Circuit Analysis & SPICE', category: 'Technical', level: 65, demandLevel: 'High' },
      { name: 'ARM Cortex-M', category: 'Technical', level: 55, demandLevel: 'High' },
      { name: 'FreeRTOS', category: 'Technical', level: 50, demandLevel: 'High' }
    ];
  }
  if (c.includes('mechanical') || c.includes('robotics') || c.includes('automotive')) {
    return [
      { name: 'SolidWorks CAD', category: 'Technical', level: 75, demandLevel: 'Critical' },
      { name: 'Ansys FEA / CFD', category: 'Technical', level: 65, demandLevel: 'Critical' },
      { name: 'ROS 2 / Navigation', category: 'Technical', level: 60, demandLevel: 'High' },
      { name: 'Kinematics & Dynamics', category: 'Technical', level: 70, demandLevel: 'High' },
      { name: 'GD&T Tolerancing', category: 'Technical', level: 65, demandLevel: 'High' }
    ];
  }
  if (c.includes('civil') || c.includes('structural') || c.includes('infrastructure')) {
    return [
      { name: 'Structural Analysis (STAAD.Pro)', category: 'Technical', level: 72, demandLevel: 'Critical' },
      { name: 'Reinforced Concrete (IS 456)', category: 'Technical', level: 75, demandLevel: 'Critical' },
      { name: 'Revit BIM Modeling', category: 'Digital Skills', level: 65, demandLevel: 'High' },
      { name: 'AutoCAD Civil 3D', category: 'Technical', level: 70, demandLevel: 'High' }
    ];
  }
  if (c.includes('electrical') || c.includes('power') || c.includes('renewable')) {
    return [
      { name: 'Power Electronics', category: 'Technical', level: 70, demandLevel: 'Critical' },
      { name: 'MATLAB / Simulink', category: 'Technical', level: 75, demandLevel: 'Critical' },
      { name: 'PLC & SCADA Automation', category: 'Technical', level: 65, demandLevel: 'High' },
      { name: 'Motor Drives & FOC', category: 'Technical', level: 60, demandLevel: 'High' }
    ];
  }
  return [
    { name: 'Python', category: 'Technical', level: 75, demandLevel: 'Critical' },
    { name: 'SQL & Databases', category: 'Technical', level: 70, demandLevel: 'High' },
    { name: 'Data Structures & Algorithms', category: 'Technical', level: 75, demandLevel: 'Critical' },
    { name: 'Git & Linux', category: 'Digital Skills', level: 65, demandLevel: 'Medium' }
  ];
}

// ─── State-Anchored Indian Academic Student UID Generator ───
// Standardized Structure: [State]-[City]-[College]-[Degree]-[Branch]-[Batch]-[Roll]
// Omits national 'IN-' anchor as per Indian collegiate & AICTE single-nation scope.
export interface StudentUIDParams {
  institution?: string;
  college?: string;
  degree?: string;
  branch?: string;
  graduationYear?: number;
  enrollmentNumber?: string;
  semester?: number;
}

const COLLEGE_DIRECTORY: Record<string, { state: string; city: string; code: string }> = {
  'delhi technological university': { state: 'DL', city: 'DEL', code: 'DTU' },
  'dtu': { state: 'DL', city: 'DEL', code: 'DTU' },
  'iit delhi': { state: 'DL', city: 'DEL', code: 'IITD' },
  'indian institute of technology delhi': { state: 'DL', city: 'DEL', code: 'IITD' },
  'iitd': { state: 'DL', city: 'DEL', code: 'IITD' },
  'iit bombay': { state: 'MH', city: 'BOM', code: 'IITB' },
  'indian institute of technology bombay': { state: 'MH', city: 'BOM', code: 'IITB' },
  'iitb': { state: 'MH', city: 'BOM', code: 'IITB' },
  'nit trichy': { state: 'TN', city: 'TRY', code: 'NITT' },
  'national institute of technology trichy': { state: 'TN', city: 'TRY', code: 'NITT' },
  'nitt': { state: 'TN', city: 'TRY', code: 'NITT' },
  'bits pilani': { state: 'RJ', city: 'PIL', code: 'BITS' },
  'birla institute of technology': { state: 'RJ', city: 'PIL', code: 'BITS' },
  'iiit hyderabad': { state: 'TS', city: 'HYD', code: 'IIITH' },
  'iiith': { state: 'TS', city: 'HYD', code: 'IIITH' },
  'nsut': { state: 'DL', city: 'DEL', code: 'NSUT' },
  'netaji subhas university of technology': { state: 'DL', city: 'DEL', code: 'NSUT' },
  'rv college of engineering': { state: 'KA', city: 'BLR', code: 'RVCE' },
  'rvce': { state: 'KA', city: 'BLR', code: 'RVCE' },
  'college of engineering pune': { state: 'MH', city: 'PUN', code: 'COEP' },
  'coep': { state: 'MH', city: 'PUN', code: 'COEP' },
  'vit vellore': { state: 'TN', city: 'VEL', code: 'VIT' },
  'vellore institute of technology': { state: 'TN', city: 'VEL', code: 'VIT' },
  'pes university': { state: 'KA', city: 'BLR', code: 'PESU' },
  'manipal institute of technology': { state: 'KA', city: 'MAN', code: 'MIT' },
  'jadavpur university': { state: 'WB', city: 'KOL', code: 'JU' },
  'anna university': { state: 'TN', city: 'CHE', code: 'AU' },
  'iit madras': { state: 'TN', city: 'CHE', code: 'IITM' },
  'iit kharagpur': { state: 'WB', city: 'KGP', code: 'IITKGP' },
  'iit roorkee': { state: 'UK', city: 'ROO', code: 'IITR' },
  'iit kanpur': { state: 'UP', city: 'KAN', code: 'IITK' }
};

export function generateIndianStudentUID(params: StudentUIDParams): string {
  const inst = (params.institution || params.college || 'Delhi Technological University (DTU)').toLowerCase();

  // 1. Locate College, State & City
  let state = 'DL';
  let city = 'DEL';
  let collegeCode = 'DTU';

  const matchedKey = Object.keys(COLLEGE_DIRECTORY).find(k => inst.includes(k));
  if (matchedKey) {
    state = COLLEGE_DIRECTORY[matchedKey].state;
    city = COLLEGE_DIRECTORY[matchedKey].city;
    collegeCode = COLLEGE_DIRECTORY[matchedKey].code;
  } else {
    // Extract acronym from parentheses if available, e.g. "Delhi Technological University (DTU)"
    const parenMatch = (params.institution || params.college || '').match(/\(([^)]+)\)/);
    if (parenMatch && parenMatch[1].length <= 6) {
      collegeCode = parenMatch[1].replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    } else {
      const words = (params.institution || params.college || 'ENG')
        .split(/\s+/)
        .filter(w => !['of', 'and', '&', 'the', 'in', 'for'].includes(w.toLowerCase()));
      collegeCode = words.map(w => w[0]).join('').slice(0, 4).toUpperCase() || 'ENG';
    }

    // Heuristic State & City detection for unlisted colleges
    if (inst.includes('karnataka') || inst.includes('bangalore') || inst.includes('bengaluru')) {
      state = 'KA'; city = 'BLR';
    } else if (inst.includes('maharashtra') || inst.includes('pune')) {
      state = 'MH'; city = 'PUN';
    } else if (inst.includes('mumbai') || inst.includes('bombay')) {
      state = 'MH'; city = 'BOM';
    } else if (inst.includes('tamil') || inst.includes('chennai') || inst.includes('madras')) {
      state = 'TN'; city = 'CHE';
    } else if (inst.includes('telangana') || inst.includes('hyderabad')) {
      state = 'TS'; city = 'HYD';
    } else if (inst.includes('west bengal') || inst.includes('kolkata')) {
      state = 'WB'; city = 'KOL';
    } else if (inst.includes('uttar pradesh') || inst.includes('noida') || inst.includes('kanpur')) {
      state = 'UP'; city = inst.includes('noida') ? 'NOI' : 'KAN';
    } else if (inst.includes('gujarat') || inst.includes('ahmedabad')) {
      state = 'GJ'; city = 'AMD';
    } else if (inst.includes('kerala')) {
      state = 'KL'; city = 'TRV';
    }
  }

  // 2. Degree Code
  const d = (params.degree || 'B.Tech').toLowerCase();
  let degreeCode = 'BT';
  if (d.includes('m.tech') || d.includes('mtech') || d.includes('master')) degreeCode = 'MT';
  else if (d.includes('dual')) degreeCode = 'DD';
  else if (d.includes('b.e') || d.includes('be')) degreeCode = 'BE';
  else if (d.includes('b.sc') || d.includes('bsc')) degreeCode = 'BS';
  else if (d.includes('mca')) degreeCode = 'MC';
  else if (d.includes('bca')) degreeCode = 'BC';

  // 3. Branch Code
  const b = (params.branch || 'Computer Science').toLowerCase();
  let branchCode = 'CS';
  if (b.includes('ai') || b.includes('data science')) branchCode = 'AI';
  else if (b.includes('it') || b.includes('information tech')) branchCode = 'IT';
  else if (b.includes('electronics') || b.includes('vlsi') || b.includes('ece')) branchCode = 'EC';
  else if (b.includes('mechanical') || b.includes('robotics') || b.includes('automobile')) branchCode = 'ME';
  else if (b.includes('civil') || b.includes('structural') || b.includes('infra')) branchCode = 'CE';
  else if (b.includes('electrical') || b.includes('power') || b.includes('eee')) branchCode = 'EE';

  // 4. Batch (Enrollment Year - 2 digits)
  let batchYear = '22';
  const enrollRaw = (params.enrollmentNumber || '').toUpperCase();
  const yearMatch = enrollRaw.match(/2K(2\d)|(20)?(2\d)/);
  if (yearMatch) {
    batchYear = (yearMatch[1] || yearMatch[3] || '22').slice(-2);
  } else if (params.graduationYear) {
    const degreeDuration = degreeCode === 'MT' || degreeCode === 'MC' ? 2 : 4;
    batchYear = (params.graduationYear - degreeDuration).toString().slice(-2);
  }

  // 5. Roll Serial (4 digits)
  let rollSerial = '0148';
  if (enrollRaw) {
    const segments = enrollRaw.split(/[\/\-\s_]+/);
    const lastPartWithDigits = [...segments].reverse().find(s => /\d+/.test(s));
    if (lastPartWithDigits) {
      const segDigits = lastPartWithDigits.replace(/\D/g, '');
      if (segDigits.length > 0) {
        rollSerial = segDigits.slice(-4).padStart(4, '0');
      }
    } else {
      const allDigits = enrollRaw.replace(/\D/g, '');
      if (allDigits.length > 0) {
        rollSerial = allDigits.slice(-4).padStart(4, '0');
      }
    }
  }

  return `${state}-${city}-${collegeCode}-${degreeCode}-${branchCode}-${batchYear}-${rollSerial}`;
}


