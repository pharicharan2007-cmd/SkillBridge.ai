import { Skill } from '@/types';

export const MOCK_STANDARDIZED_SKILLS: Skill[] = [
  // Technical Skills (15)
  { id: 'sk-1', name: 'Python', category: 'Technical', level: 85, verified: true, demandLevel: 'Critical' },
  { id: 'sk-2', name: 'Machine Learning', category: 'Technical', level: 75, verified: true, demandLevel: 'Critical' },
  { id: 'sk-3', name: 'SQL', category: 'Technical', level: 80, verified: true, demandLevel: 'High' },
  { id: 'sk-4', name: 'TensorFlow', category: 'Technical', level: 40, verified: false, demandLevel: 'High' },
  { id: 'sk-5', name: 'React.js', category: 'Technical', level: 88, verified: true, demandLevel: 'High' },
  { id: 'sk-6', name: 'TypeScript', category: 'Technical', level: 82, verified: true, demandLevel: 'High' },
  { id: 'sk-7', name: 'Node.js', category: 'Technical', level: 70, verified: false, demandLevel: 'High' },
  { id: 'sk-8', name: 'Docker', category: 'Technical', level: 45, verified: false, demandLevel: 'High' },
  { id: 'sk-9', name: 'Data Structures & Algorithms', category: 'Technical', level: 78, verified: true, demandLevel: 'Critical' },
  { id: 'sk-10', name: 'Git & GitHub', category: 'Technical', level: 90, verified: true, demandLevel: 'High' },
  { id: 'sk-11', name: 'REST APIs', category: 'Technical', level: 85, verified: true, demandLevel: 'High' },
  { id: 'sk-12', name: 'FastAPI', category: 'Technical', level: 65, verified: false, demandLevel: 'Medium' },
  { id: 'sk-13', name: 'Deep Learning', category: 'Technical', level: 50, verified: false, demandLevel: 'Critical' },
  { id: 'sk-14', name: 'Natural Language Processing (NLP)', category: 'Technical', level: 60, verified: false, demandLevel: 'High' },
  { id: 'sk-15', name: 'PostgreSQL', category: 'Technical', level: 72, verified: true, demandLevel: 'High' },

  // Soft Skills (8)
  { id: 'sk-16', name: 'Problem Solving', category: 'Soft Skills', level: 80, verified: true, demandLevel: 'Critical' },
  { id: 'sk-17', name: 'Technical Communication', category: 'Soft Skills', level: 75, verified: true, demandLevel: 'High' },
  { id: 'sk-18', name: 'Team Collaboration', category: 'Soft Skills', level: 85, verified: true, demandLevel: 'High' },
  { id: 'sk-19', name: 'Critical Thinking', category: 'Soft Skills', level: 78, verified: true, demandLevel: 'High' },
  { id: 'sk-20', name: 'Time Management', category: 'Soft Skills', level: 70, verified: false, demandLevel: 'Medium' },
  { id: 'sk-21', name: 'Adaptability', category: 'Soft Skills', level: 88, verified: true, demandLevel: 'High' },
  { id: 'sk-22', name: 'Agile & Scrum Principles', category: 'Soft Skills', level: 65, verified: false, demandLevel: 'Medium' },
  { id: 'sk-23', name: 'Presentation Skills', category: 'Soft Skills', level: 72, verified: true, demandLevel: 'Medium' },

  // Digital & Domain Skills (9)
  { id: 'sk-24', name: 'Cloud Computing (AWS)', category: 'Digital Skills', level: 55, verified: false, demandLevel: 'Critical' },
  { id: 'sk-25', name: 'System Design', category: 'Digital Skills', level: 50, verified: false, demandLevel: 'Critical' },
  { id: 'sk-26', name: 'Cybersecurity Fundamentals', category: 'Digital Skills', level: 45, verified: false, demandLevel: 'Medium' },
  { id: 'sk-27', name: 'CI/CD Pipelines', category: 'Digital Skills', level: 48, verified: false, demandLevel: 'High' },
  { id: 'sk-28', name: 'Data Visualization (PowerBI / Tableau)', category: 'Domain Knowledge', level: 68, verified: true, demandLevel: 'High' },
  { id: 'sk-29', name: 'Figma / UI Design', category: 'Digital Skills', level: 60, verified: false, demandLevel: 'Medium' },
  { id: 'sk-30', name: 'Prompt Engineering & LLMs', category: 'Digital Skills', level: 78, verified: true, demandLevel: 'Critical' },
  { id: 'sk-31', name: 'Pandas & NumPy', category: 'Technical', level: 82, verified: true, demandLevel: 'High' },
  { id: 'sk-32', name: 'GraphQL', category: 'Technical', level: 35, verified: false, demandLevel: 'Medium' },
];

export interface CatalogSkill {
  name: string;
  category: 'Technical' | 'Soft Skills' | 'Problem Solving' | 'Digital Skills';
  domain: 'Computer Science & IT' | 'Electronics & VLSI' | 'Mechanical & Automotive' | 'Civil & Infrastructure' | 'Electrical & Energy' | 'Soft Skills';
  demandLevel: 'Critical' | 'High' | 'Medium';
}

export const MASTER_ENGINEERING_SKILLS: CatalogSkill[] = [
  // ─── 1. Computer Science & IT ───
  { name: 'Python', category: 'Technical', domain: 'Computer Science & IT', demandLevel: 'Critical' },
  { name: 'C++', category: 'Technical', domain: 'Computer Science & IT', demandLevel: 'Critical' },
  { name: 'Java', category: 'Technical', domain: 'Computer Science & IT', demandLevel: 'High' },
  { name: 'Data Structures & Algorithms', category: 'Problem Solving', domain: 'Computer Science & IT', demandLevel: 'Critical' },
  { name: 'System Design & Architecture', category: 'Problem Solving', domain: 'Computer Science & IT', demandLevel: 'Critical' },
  { name: 'SQL & Relational Databases', category: 'Technical', domain: 'Computer Science & IT', demandLevel: 'Critical' },
  { name: 'React.js & Frontend Systems', category: 'Technical', domain: 'Computer Science & IT', demandLevel: 'High' },
  { name: 'TypeScript', category: 'Technical', domain: 'Computer Science & IT', demandLevel: 'High' },
  { name: 'Node.js & Backend Architecture', category: 'Technical', domain: 'Computer Science & IT', demandLevel: 'High' },
  { name: 'REST APIs & GraphQL', category: 'Technical', domain: 'Computer Science & IT', demandLevel: 'High' },
  { name: 'Docker & Containers', category: 'Digital Skills', domain: 'Computer Science & IT', demandLevel: 'Critical' },
  { name: 'Kubernetes Cluster Orchestration', category: 'Digital Skills', domain: 'Computer Science & IT', demandLevel: 'Critical' },
  { name: 'Cloud Computing (AWS / GCP)', category: 'Digital Skills', domain: 'Computer Science & IT', demandLevel: 'Critical' },
  { name: 'Git & Linux Internals', category: 'Digital Skills', domain: 'Computer Science & IT', demandLevel: 'Critical' },
  { name: 'Distributed Systems & Raft', category: 'Technical', domain: 'Computer Science & IT', demandLevel: 'Critical' },
  { name: 'PyTorch & Deep Learning', category: 'Technical', domain: 'Computer Science & IT', demandLevel: 'Critical' },
  { name: 'TensorFlow / Keras', category: 'Technical', domain: 'Computer Science & IT', demandLevel: 'High' },
  { name: 'Computer Vision & OpenCV', category: 'Technical', domain: 'Computer Science & IT', demandLevel: 'High' },
  { name: 'NLP & Transformers', category: 'Technical', domain: 'Computer Science & IT', demandLevel: 'Critical' },
  { name: 'LangChain & Agentic AI', category: 'Technical', domain: 'Computer Science & IT', demandLevel: 'Critical' },
  { name: 'Cybersecurity Fundamentals', category: 'Digital Skills', domain: 'Computer Science & IT', demandLevel: 'High' },
  { name: 'CI/CD Pipelines & DevOps', category: 'Digital Skills', domain: 'Computer Science & IT', demandLevel: 'High' },

  // ─── 2. Electronics & Communication (ECE / VLSI) ───
  { name: 'Verilog / VHDL RTL Design', category: 'Technical', domain: 'Electronics & VLSI', demandLevel: 'Critical' },
  { name: 'SystemVerilog & UVM Verification', category: 'Technical', domain: 'Electronics & VLSI', demandLevel: 'Critical' },
  { name: 'FPGA Prototyping (Xilinx Vivado)', category: 'Technical', domain: 'Electronics & VLSI', demandLevel: 'Critical' },
  { name: 'Static Timing Analysis (STA Closure)', category: 'Technical', domain: 'Electronics & VLSI', demandLevel: 'Critical' },
  { name: 'Embedded C / C++', category: 'Technical', domain: 'Electronics & VLSI', demandLevel: 'Critical' },
  { name: 'FreeRTOS & Real-Time Kernels', category: 'Technical', domain: 'Electronics & VLSI', demandLevel: 'Critical' },
  { name: 'ARM Cortex-M Microcontrollers', category: 'Technical', domain: 'Electronics & VLSI', demandLevel: 'High' },
  { name: 'Circuit Analysis & SPICE Simulation', category: 'Technical', domain: 'Electronics & VLSI', demandLevel: 'High' },
  { name: 'Cadence Virtuoso Custom IC Design', category: 'Technical', domain: 'Electronics & VLSI', demandLevel: 'Critical' },
  { name: 'Altium PCB Design & Routing', category: 'Technical', domain: 'Electronics & VLSI', demandLevel: 'High' },
  { name: 'I2C / SPI / CAN Bus Protocols', category: 'Technical', domain: 'Electronics & VLSI', demandLevel: 'High' },
  { name: 'Digital Signal Processing (DSP)', category: 'Technical', domain: 'Electronics & VLSI', demandLevel: 'High' },
  { name: 'RF & Wireless Communications', category: 'Technical', domain: 'Electronics & VLSI', demandLevel: 'High' },
  { name: 'MATLAB / Simulink Systems', category: 'Technical', domain: 'Electronics & VLSI', demandLevel: 'High' },

  // ─── 3. Mechanical, Robotics & Automotive EV ───
  { name: 'SolidWorks CAD & 3D Modeling', category: 'Technical', domain: 'Mechanical & Automotive', demandLevel: 'Critical' },
  { name: 'CATIA V5 Surface Modeling', category: 'Technical', domain: 'Mechanical & Automotive', demandLevel: 'High' },
  { name: 'Ansys FEA (Structural Stress)', category: 'Technical', domain: 'Mechanical & Automotive', demandLevel: 'Critical' },
  { name: 'Ansys Fluent CFD (Fluid Dynamics)', category: 'Technical', domain: 'Mechanical & Automotive', demandLevel: 'Critical' },
  { name: 'ROS 2 (Robot Operating System)', category: 'Technical', domain: 'Mechanical & Automotive', demandLevel: 'Critical' },
  { name: 'Gazebo Robotics Physics Simulation', category: 'Technical', domain: 'Mechanical & Automotive', demandLevel: 'High' },
  { name: 'Kinematics & Multibody Dynamics', category: 'Problem Solving', domain: 'Mechanical & Automotive', demandLevel: 'High' },
  { name: 'GD&T (ASME Y14.5 Tolerancing)', category: 'Technical', domain: 'Mechanical & Automotive', demandLevel: 'High' },
  { name: 'EV Powertrain & Battery Packaging', category: 'Technical', domain: 'Mechanical & Automotive', demandLevel: 'Critical' },
  { name: 'Altair HyperMesh & Crash Analysis', category: 'Technical', domain: 'Mechanical & Automotive', demandLevel: 'High' },
  { name: 'Thermodynamics & Heat Transfer', category: 'Problem Solving', domain: 'Mechanical & Automotive', demandLevel: 'High' },
  { name: 'CNC Machining & CAM Tooling', category: 'Technical', domain: 'Mechanical & Automotive', demandLevel: 'Medium' },

  // ─── 4. Civil & Smart Infrastructure ───
  { name: 'Structural Analysis (STAAD.Pro)', category: 'Technical', domain: 'Civil & Infrastructure', demandLevel: 'Critical' },
  { name: 'ETABS High-Rise Modeling', category: 'Technical', domain: 'Civil & Infrastructure', demandLevel: 'Critical' },
  { name: 'Reinforced Concrete Design (IS 456)', category: 'Technical', domain: 'Civil & Infrastructure', demandLevel: 'Critical' },
  { name: 'Steel Structures Design (IS 800)', category: 'Technical', domain: 'Civil & Infrastructure', demandLevel: 'High' },
  { name: 'Revit BIM Modeling (Autodesk)', category: 'Digital Skills', domain: 'Civil & Infrastructure', demandLevel: 'Critical' },
  { name: 'Navisworks 3D Clash Detection', category: 'Digital Skills', domain: 'Civil & Infrastructure', demandLevel: 'High' },
  { name: 'AutoCAD Civil 3D Highway Design', category: 'Technical', domain: 'Civil & Infrastructure', demandLevel: 'High' },
  { name: 'Geotechnical & Foundation Engineering', category: 'Problem Solving', domain: 'Civil & Infrastructure', demandLevel: 'High' },
  { name: 'GIS & Remote Sensing (QGIS / ArcGIS)', category: 'Digital Skills', domain: 'Civil & Infrastructure', demandLevel: 'High' },
  { name: 'Hydrology & Water Resources (HEC-RAS)', category: 'Technical', domain: 'Civil & Infrastructure', demandLevel: 'Medium' },
  { name: 'Construction Project Management (Primavera P6)', category: 'Digital Skills', domain: 'Civil & Infrastructure', demandLevel: 'Medium' },

  // ─── 5. Electrical, Power Systems & Renewable Energy ───
  { name: 'Power Electronics & Inverters', category: 'Technical', domain: 'Electrical & Energy', demandLevel: 'Critical' },
  { name: 'Motor Drives & Field Oriented Control (FOC)', category: 'Technical', domain: 'Electrical & Energy', demandLevel: 'Critical' },
  { name: 'Battery Management (BMS Firmware)', category: 'Technical', domain: 'Electrical & Energy', demandLevel: 'Critical' },
  { name: 'MATLAB / SimPowerSystems', category: 'Technical', domain: 'Electrical & Energy', demandLevel: 'High' },
  { name: 'Smart Grid & Substation Automation (IEC 61850)', category: 'Technical', domain: 'Electrical & Energy', demandLevel: 'High' },
  { name: 'Power System Analysis (ETAP)', category: 'Technical', domain: 'Electrical & Energy', demandLevel: 'High' },
  { name: 'PLC & SCADA Automation (Siemens)', category: 'Technical', domain: 'Electrical & Energy', demandLevel: 'High' },
  { name: 'Solar PV & Wind Grid-Tied Systems', category: 'Technical', domain: 'Electrical & Energy', demandLevel: 'High' },
  { name: 'High-Voltage Switchgear & Protection', category: 'Technical', domain: 'Electrical & Energy', demandLevel: 'Medium' },

  // ─── 6. Soft Skills & Professional Engineering Competencies ───
  { name: 'Technical Communication & Documentation', category: 'Soft Skills', domain: 'Soft Skills', demandLevel: 'Critical' },
  { name: 'Analytical Problem Solving', category: 'Problem Solving', domain: 'Soft Skills', demandLevel: 'Critical' },
  { name: 'Teamwork & Cross-Functional Collaboration', category: 'Soft Skills', domain: 'Soft Skills', demandLevel: 'High' },
  { name: 'Critical Thinking & Root Cause Analysis', category: 'Problem Solving', domain: 'Soft Skills', demandLevel: 'High' },
  { name: 'Agile Collaboration & Sprint Planning', category: 'Soft Skills', domain: 'Soft Skills', demandLevel: 'High' },
  { name: 'Adaptability & Continuous Self-Learning', category: 'Soft Skills', domain: 'Soft Skills', demandLevel: 'High' },
  { name: 'Engineering Ethics & Intellectual Property', category: 'Soft Skills', domain: 'Soft Skills', demandLevel: 'Medium' }
];

