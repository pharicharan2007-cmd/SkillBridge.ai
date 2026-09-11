export interface AssessmentQuestionOption {
  label: string;
  score: number;
}

export interface LegacyAssessmentQuestion {
  id: string;
  question: string;
  category: string;
  relatedSkill: string;
  engineeringCluster: string;
  options: AssessmentQuestionOption[];
}

export const MOCK_ASSESSMENT_QUESTIONS: LegacyAssessmentQuestion[] = [
  // ─── Common Engineering Core ───
  {
    id: 'q-gen-1',
    question: 'When analyzing an engineering design constraint or algorithmic bottleneck, what is your approach to systematic optimization?',
    category: 'Problem Solving',
    relatedSkill: 'Problem Solving',
    engineeringCluster: 'General',
    options: [
      { label: 'I struggle to identify governing equations or computational bottlenecks without help.', score: 30 },
      { label: 'I apply standard empirical lookup tables or standard library algorithms.', score: 65 },
      { label: 'I systematically apply first-principles mathematical analysis, divide-and-conquer, or parametric sweeps.', score: 88 },
      { label: 'I develop rigorous mathematical trade-off models and optimize performance within physical/computational limits.', score: 98 }
    ]
  },
  {
    id: 'q-gen-2',
    question: 'When presenting complex technical engineering decisions to interdisciplinary stakeholders or clients, how do you communicate?',
    category: 'Soft Skills',
    relatedSkill: 'Technical Communication',
    engineeringCluster: 'General',
    options: [
      { label: 'Use heavy domain jargon and struggle to translate technical concepts simply.', score: 35 },
      { label: 'Use high-level schematics and analogies to explain core functionality.', score: 70 },
      { label: 'Tailor presentations to design trade-offs, safety factors, and ROI with structured data.', score: 90 },
      { label: 'Confidently lead engineering design reviews and client milestone sign-offs with executive clarity.', score: 98 }
    ]
  },
  {
    id: 'q-gen-3',
    question: 'How do you handle technical version control and engineering documentation across teams?',
    category: 'Digital Skills',
    relatedSkill: 'Git & Linux',
    engineeringCluster: 'General',
    options: [
      { label: 'Save local copies manually with minimal formal revision history.', score: 35 },
      { label: 'Use basic Git commits or cloud folder sharing for design assets.', score: 70 },
      { label: 'Maintain structured Git branches, automated CI testing, and engineering change orders (ECO).', score: 90 },
      { label: 'Architect GitOps / PLM release pipelines and peer-reviewed design revision control.', score: 100 }
    ]
  },

  // ─── 1. Computer Science & AI / IT ───
  {
    id: 'q-cs-1',
    question: 'How comfortably can you write Python code to build production machine learning pipelines or process distributed datasets?',
    category: 'Technical',
    relatedSkill: 'Python',
    engineeringCluster: 'Computer Science & Information Technology',
    options: [
      { label: 'Beginner — Basic syntax, loops, and simple functions', score: 25 },
      { label: 'Intermediate — Comfortable with OOP, Pandas, and basic ML libraries', score: 65 },
      { label: 'Advanced — Can build full ML pipelines, custom decorators, and async scripts', score: 90 },
      { label: 'Expert — Optimize C-extensions, write production PyTorch/TensorFlow modules', score: 100 }
    ]
  },
  {
    id: 'q-cs-2',
    question: 'How experienced are you with Deep Learning architectures like Transformers, CNNs, and framework optimization in PyTorch?',
    category: 'Technical',
    relatedSkill: 'TensorFlow / PyTorch',
    engineeringCluster: 'Computer Science & Information Technology',
    options: [
      { label: 'No hands-on experience / theoretical knowledge only.', score: 20 },
      { label: 'Trained standard baseline models using high-level Keras or Scikit-Learn.', score: 55 },
      { label: 'Customized attention mechanisms, custom loss functions, and distributed PyTorch training.', score: 85 },
      { label: 'Fine-tuned LLMs, pruned models for edge NPU inference, and published ML research.', score: 98 }
    ]
  },
  {
    id: 'q-cs-3',
    question: 'How do you structure high-throughput distributed systems and manage state consistency?',
    category: 'Digital Skills',
    relatedSkill: 'Distributed Systems',
    engineeringCluster: 'Computer Science & Information Technology',
    options: [
      { label: 'Familiar only with monolithic client-server applications.', score: 30 },
      { label: 'Build basic microservices communicating over REST APIs.', score: 65 },
      { label: 'Implement consensus algorithms (Raft), message queues (Kafka), and Redis caching.', score: 88 },
      { label: 'Architect zero-downtime globally distributed systems with sub-millisecond p99 latency.', score: 98 }
    ]
  },

  // ─── 2. Electronics & VLSI / Embedded ───
  {
    id: 'q-vlsi-1',
    question: 'How proficient are you in writing synthesisable RTL code in SystemVerilog / Verilog and building testbenches?',
    category: 'Technical',
    relatedSkill: 'Verilog / VHDL',
    engineeringCluster: 'Electronics & Communication (VLSI & Embedded)',
    options: [
      { label: 'Understand basic boolean gates and combinational multiplexers in theory.', score: 25 },
      { label: 'Write simple FSMs, synchronous counters, and register files in Verilog.', score: 65 },
      { label: 'Design pipelined datapath modules, AXI4-Lite interfaces, and write UVM testbenches.', score: 88 },
      { label: 'Design complex multi-clock domain SoC blocks with formal verification and timing closure.', score: 98 }
    ]
  },
  {
    id: 'q-vlsi-2',
    question: 'How do you diagnose and resolve setup and hold timing violations during Static Timing Analysis (STA)?',
    category: 'Technical',
    relatedSkill: 'FPGA Prototyping',
    engineeringCluster: 'Electronics & Communication (VLSI & Embedded)',
    options: [
      { label: 'Unfamiliar with setup/hold timing slacks and clock skew concepts.', score: 20 },
      { label: 'Can identify negative slack in Vivado timing reports but struggle to fix it.', score: 55 },
      { label: 'Systematically apply pipelining, buffer insertion, and clock tree constraints (SDC).', score: 85 },
      { label: 'Achieve timing closure at >400 MHz on modern Xilinx UltraScale+ / ASIC nodes.', score: 98 }
    ]
  },
  {
    id: 'q-vlsi-3',
    question: 'How experienced are you programming ARM Cortex-M microcontrollers in Embedded C with FreeRTOS?',
    category: 'Technical',
    relatedSkill: 'Embedded C',
    engineeringCluster: 'Electronics & Communication (VLSI & Embedded)',
    options: [
      { label: 'Used Arduino IDE for basic hobbyist projects only.', score: 30 },
      { label: 'Configure GPIO, UART, and ADC peripherals using vendor HAL libraries.', score: 65 },
      { label: 'Write bare-metal register drivers, manage interrupt priorities, and FreeRTOS task queues.', score: 88 },
      { label: 'Develop hard real-time safety-critical firmware compliant with MISRA-C standards.', score: 98 }
    ]
  },

  // ─── 3. Mechanical, Robotics & Automotive / EV ───
  {
    id: 'q-me-1',
    question: 'How proficient are you in 3D Parametric CAD Modeling (SolidWorks / Fusion 360) and GD&T tolerancing?',
    category: 'Technical',
    relatedSkill: 'SolidWorks CAD',
    engineeringCluster: 'Mechanical, Robotics & Automotive EV',
    options: [
      { label: 'Can create simple 2D sketches and basic extrusions with guidance.', score: 30 },
      { label: 'Model parametric multi-part assemblies and generate standard orthographic drawings.', score: 70 },
      { label: 'Apply ASME Y14.5 GD&T feature control frames, tolerance stack-up analysis, and sheet metal design.', score: 90 },
      { label: 'Master complex surfacing, injection molded DFM/DFA, and full vehicle packaging.', score: 98 }
    ]
  },
  {
    id: 'q-me-2',
    question: 'How do you conduct Finite Element Analysis (FEA) and Computational Fluid Dynamics (CFD) in Ansys?',
    category: 'Technical',
    relatedSkill: 'Ansys FEA / CFD',
    engineeringCluster: 'Mechanical, Robotics & Automotive EV',
    options: [
      { label: 'No hands-on simulation experience / textbook theory only.', score: 20 },
      { label: 'Perform linear static stress analysis on single components with automatic meshing.', score: 60 },
      { label: 'Set up non-linear contact analysis, modal vibration, and conjugate heat transfer CFD in Fluent.', score: 88 },
      { label: 'Execute explicit dynamic crash simulations (LS-DYNA) and correlate with physical test data.', score: 98 }
    ]
  },
  {
    id: 'q-me-3',
    question: 'How comfortable are you implementing autonomous robot navigation in ROS 2 with Nav2 and Gazebo?',
    category: 'Technical',
    relatedSkill: 'ROS 2 / Navigation',
    engineeringCluster: 'Mechanical, Robotics & Automotive EV',
    options: [
      { label: 'Never used ROS or Linux-based robotics frameworks.', score: 20 },
      { label: 'Understand ROS topics, publishers/subscribers, and simple teleop nodes.', score: 60 },
      { label: 'Configure Nav2 costmaps, 2D LiDAR SLAM (Cartographer), and EKF odometry sensor fusion.', score: 88 },
      { label: 'Develop custom trajectory controllers and deploy autonomous navigation to physical AMRs.', score: 98 }
    ]
  },

  // ─── 4. Civil, Structural & Smart Infrastructure ───
  {
    id: 'q-ce-1',
    question: 'How proficient are you in designing reinforced concrete structures according to IS 456 Limit State Design?',
    category: 'Technical',
    relatedSkill: 'Reinforced Concrete (IS 456)',
    engineeringCluster: 'Civil & Smart Infrastructure',
    options: [
      { label: 'Familiar only with basic mechanics of materials stress formulas.', score: 25 },
      { label: 'Calculate bending moment and shear reinforcement for singly-reinforced beams.', score: 65 },
      { label: 'Design multi-story shear walls, two-way slabs, and combined footing per IS 456 / IS 1893.', score: 88 },
      { label: 'Design post-tensioned concrete viaducts, seismic ductility detailing, and BBS schedules.', score: 98 }
    ]
  },
  {
    id: 'q-ce-2',
    question: 'How do you conduct 3D structural analysis and seismic load calculations using Bentley STAAD.Pro or ETABS?',
    category: 'Technical',
    relatedSkill: 'Structural Analysis (STAAD.Pro)',
    engineeringCluster: 'Civil & Smart Infrastructure',
    options: [
      { label: 'Never used commercial structural modeling software.', score: 20 },
      { label: 'Model simple 2D portal frames and extract axial/bending moment diagrams.', score: 60 },
      { label: 'Set up 3D multi-story space frames with response spectrum earthquake loads and wind analysis.', score: 88 },
      { label: 'Optimize steel truss designs and pre-stressed bridge structures for code compliance.', score: 98 }
    ]
  },
  {
    id: 'q-ce-3',
    question: 'How experienced are you with Building Information Modeling (BIM - Revit) and coordination clash detection?',
    category: 'Digital Skills',
    relatedSkill: 'Revit BIM Modeling',
    engineeringCluster: 'Civil & Smart Infrastructure',
    options: [
      { label: 'Use 2D AutoCAD only, no 3D BIM experience.', score: 30 },
      { label: 'Create basic 3D building architectural/structural geometry in Autodesk Revit.', score: 65 },
      { label: 'Build parametric families, coordinate structural-MEP clash detection in Navisworks (LOD 350).', score: 88 },
      { label: 'Manage common data environments (CDE) compliant with ISO 19650 BIM execution plans.', score: 98 }
    ]
  },

  // ─── 5. Electrical, Power Systems & Renewable Energy ───
  {
    id: 'q-ee-1',
    question: 'How do you design and simulate power electronic converters (Buck, Boost, Inverters) in MATLAB / Simulink?',
    category: 'Technical',
    relatedSkill: 'Power Electronics',
    engineeringCluster: 'Electrical, Power Systems & Renewable Energy',
    options: [
      { label: 'Understand basic diode rectifiers and transformer ratios only.', score: 25 },
      { label: 'Simulate open-loop DC-DC buck/boost converters and calculate filter inductors.', score: 60 },
      { label: 'Design closed-loop PI current control and Space Vector PWM (SVPWM) for 3-phase inverters.', score: 88 },
      { label: 'Implement SiC/GaN high-frequency inverter hardware with gate-drive isolation & EMI filtering.', score: 98 }
    ]
  },
  {
    id: 'q-ee-2',
    question: 'How experienced are you with Electric Vehicle Battery Management Systems (BMS) and motor control algorithms?',
    category: 'Technical',
    relatedSkill: 'Motor Drives & FOC',
    engineeringCluster: 'Electrical, Power Systems & Renewable Energy',
    options: [
      { label: 'Know basic battery cell chemistry and DC motor rotation principles.', score: 25 },
      { label: 'Understand passive cell balancing and standard trapezoidal BLDC motor control.', score: 60 },
      { label: 'Implement Field-Oriented Control (FOC) with Clarke/Park transforms and Kalman filter SOC estimation.', score: 88 },
      { label: 'Develop ISO 26262 ASIL-D compliant BMS firmware for 800V high-voltage EV battery packs.', score: 98 }
    ]
  },
  {
    id: 'q-ee-3',
    question: 'How proficient are you in Industrial Automation, PLC ladder programming, and SCADA protocols?',
    category: 'Technical',
    relatedSkill: 'PLC & SCADA Automation',
    engineeringCluster: 'Electrical, Power Systems & Renewable Energy',
    options: [
      { label: 'No hands-on industrial automation experience.', score: 20 },
      { label: 'Write basic PLC ladder logic (timers, counters, interlocks) in Siemens TIA Portal.', score: 65 },
      { label: 'Configure Modbus TCP, SCADA mimic screens, and PID loop control for process automation.', score: 88 },
      { label: 'Architect IEC 61850 smart substation automation and cyber-secure microgrid dispatch.', score: 98 }
    ]
  }
];
