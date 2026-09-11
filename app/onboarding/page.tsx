'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStudent } from '@/lib/context/StudentContext';
import { Skill, EngineeringCluster, SkillCategory, StudentProfile } from '@/types';
import { 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  BrainCircuit, 
  Target, 
  Upload, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  X, 
  Sliders,
  Clock,
  Layers,
  Building,
  Briefcase,
  TrendingUp,
  Award,
  Loader2,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { uploadStudentDocument } from '@/lib/services/documentService';
import { MOCK_OPPORTUNITIES } from '@/lib/mockData/opportunities';
import { calculateOpportunityMatch } from '@/lib/services/matchEngine';
import { MASTER_ENGINEERING_SKILLS } from '@/lib/mockData/skills';
import { generateIndianStudentUID } from '@/lib/constants/benchmarks';

const COMMON_SOFT_SKILLS: { name: string; description: string }[] = [
  { name: 'Technical Communication', description: 'Clear documentation, design reviews & technical presentations' },
  { name: 'Analytical Problem Solving', description: 'Deconstructing complex engineering bottlenecks with data' },
  { name: 'Teamwork & Cross-Functional Collaboration', description: 'Partnering across hardware, software and operational teams' },
  { name: 'Critical Thinking & Root Cause Analysis', description: 'Applying 5-Whys, failure mode effect analysis (FMEA)' },
  { name: 'Agile Collaboration & Sprint Planning', description: 'Scrum workflows, issue triage, iterative milestone delivery' },
  { name: 'Adaptability & Self-Directed Learning', description: 'Rapidly assimilating new frameworks, CAD tools & standards' }
];

export const INDIAN_INTERNSHIP_TRACKS = [
  {
    id: 'summer_industrial',
    title: '4–6 Weeks Summer Internship (30–45 Days)',
    badge: 'AICTE Mandatory Track',
    timing: 'May – July (Post 4th/6th Sem Break)',
    credits: '4–6 AICTE Credits',
    desc: 'Core industrial training & mini-project mandated between academic years at corporate engineering centers.'
  },
  {
    id: 'semester_ppo',
    title: '6 Months Full-Semester Internship (Final Year)',
    badge: 'PPO & Placement Track',
    timing: '8th Semester (January – June)',
    credits: '10–12 AICTE Credits',
    desc: 'Full-time corporate immersion during final semester with direct Pre-Placement Offer (PPO) conversion.'
  },
  {
    id: 'short_term_training',
    title: '15–30 Days Short-Term Industrial Training',
    badge: 'Winter Break / Vocational Track',
    timing: 'Dec – Jan (Winter Break / Mid-Year)',
    credits: '2–3 AICTE Credits',
    desc: 'Hands-on plant exposure, PSU workshops (BHEL, NTPC, DRDO), or practical tool certifications.'
  },
  {
    id: 'virtual_capstone',
    title: '2–3 Months Virtual / Hybrid Capstone Project',
    badge: 'Concurrent with College Classes',
    timing: 'Flexible (10–15 hrs/week alongside classes)',
    credits: '3 AICTE Credits',
    desc: 'Industry-mentored live open-source engineering problem, R&D simulation, or remote consulting task.'
  }
];

const getClusterForBranch = (b: string): EngineeringCluster => {
  if (b.includes('Mechanical') || b.includes('Robotics') || b.includes('Automobile')) {
    return 'Mechanical, Robotics & Automotive EV';
  }
  if (b.includes('Civil') || b.includes('Structural') || b.includes('Infrastructure')) {
    return 'Civil & Smart Infrastructure';
  }
  if (b.includes('Power') || (b.includes('Electrical') && !b.includes('VLSI'))) {
    return 'Electrical, Power Systems & Renewable Energy';
  }
  if (b.includes('Electronics') || b.includes('VLSI') || b.includes('ECE')) {
    return 'Electronics & Communication (VLSI & Embedded)';
  }
  return 'Computer Science & Information Technology';
};

const CLUSTER_CONFIG: Record<EngineeringCluster, {
  defaultSkills: { name: string; category: SkillCategory; level: number; demandLevel: 'Critical' | 'High' | 'Medium' }[];
  availableSkills: string[];
  roles: { title: string; benchmark: string }[];
  defaultRole: string;
  defaultInterests: string[];
}> = {
  'Computer Science & Information Technology': {
    defaultSkills: [
      { name: 'Python', category: 'Technical', level: 85, demandLevel: 'Critical' },
      { name: 'Data Structures & Algorithms', category: 'Problem Solving', level: 80, demandLevel: 'High' },
      { name: 'SQL & Databases', category: 'Technical', level: 75, demandLevel: 'High' },
      { name: 'Git & Linux', category: 'Digital Skills', level: 85, demandLevel: 'Critical' },
      { name: 'Cloud Computing (AWS)', category: 'Digital Skills', level: 55, demandLevel: 'High' }
    ],
    availableSkills: [
      'Python', 'C++', 'Java', 'Data Structures & Algorithms', 'System Design',
      'React.js', 'TypeScript', 'Node.js', 'SQL & Databases', 'Docker & Containers',
      'Kubernetes', 'Cloud Computing (AWS)', 'TensorFlow / PyTorch', 'Distributed Systems',
      'REST APIs', 'Linux Internals', 'Problem Solving', 'Technical Communication'
    ],
    roles: [
      { title: 'AI/ML Research Engineer', benchmark: 'PyTorch, Python, Distributed Systems, Linear Algebra' },
      { title: 'Full Stack Software Architect', benchmark: 'React, TypeScript, Node.js, Postgres, REST APIs' },
      { title: 'Cloud DevOps & SRE', benchmark: 'Docker, Kubernetes, AWS, Terraform, CI/CD' },
      { title: 'Distributed Systems Engineer', benchmark: 'C++, Go, Raft Consensus, Distributed Storage' }
    ],
    defaultRole: 'AI/ML Research Engineer',
    defaultInterests: ['Artificial Intelligence', 'Distributed Systems', 'Cloud Infrastructure']
  },
  'Electronics & Communication (VLSI & Embedded)': {
    defaultSkills: [
      { name: 'Verilog / VHDL', category: 'Technical', level: 82, demandLevel: 'Critical' },
      { name: 'FPGA Prototyping', category: 'Technical', level: 78, demandLevel: 'Critical' },
      { name: 'Embedded C', category: 'Technical', level: 80, demandLevel: 'High' },
      { name: 'Circuit Analysis & SPICE', category: 'Technical', level: 75, demandLevel: 'High' },
      { name: 'Signal Processing (DSP)', category: 'Technical', level: 70, demandLevel: 'High' }
    ],
    availableSkills: [
      'Verilog / VHDL', 'SystemVerilog UVM', 'FPGA Prototyping', 'Xilinx Vivado',
      'Embedded C', 'FreeRTOS', 'ARM Cortex-M', 'Circuit Analysis & SPICE',
      'Cadence Virtuoso', 'Altium PCB Design', 'Signal Processing (DSP)',
      'MATLAB / Simulink', 'I2C / SPI / CAN Bus', 'Git & Linux'
    ],
    roles: [
      { title: 'VLSI Front-End RTL Design Engineer', benchmark: 'SystemVerilog, UVM, FPGA Vivado, STA Timing Closure' },
      { title: 'Analog & Mixed-Signal IC Engineer', benchmark: 'Cadence Virtuoso, SPICE, ADC/DAC, Silicon Validation' },
      { title: 'Embedded Systems & Firmware Engineer', benchmark: 'Embedded C, FreeRTOS, ARM Cortex-M, Protocols' },
      { title: 'RF & Signal Processing Engineer', benchmark: 'MATLAB, DSP, SDR, Wireless Physical Layer' }
    ],
    defaultRole: 'VLSI Front-End RTL Design Engineer',
    defaultInterests: ['VLSI Design', 'Embedded Systems', 'Semiconductor R&D']
  },
  'Mechanical, Robotics & Automotive EV': {
    defaultSkills: [
      { name: 'SolidWorks CAD', category: 'Technical', level: 82, demandLevel: 'Critical' },
      { name: 'Ansys FEA / CFD', category: 'Technical', level: 75, demandLevel: 'Critical' },
      { name: 'ROS 2 / Navigation', category: 'Technical', level: 70, demandLevel: 'High' },
      { name: 'Kinematics & Dynamics', category: 'Technical', level: 78, demandLevel: 'High' },
      { name: 'GD&T Tolerancing', category: 'Technical', level: 72, demandLevel: 'High' }
    ],
    availableSkills: [
      'SolidWorks CAD', 'CATIA V5', 'Autodesk Fusion 360', 'Ansys FEA / CFD',
      'HyperMesh', 'LS-DYNA', 'ROS 2 / Navigation', 'Gazebo Simulator',
      'MATLAB Simscape EV', 'Thermodynamics & Heat Transfer', 'GD&T Tolerancing',
      'Materials Science', 'C++', 'Python', 'Git & Linux'
    ],
    roles: [
      { title: 'Robotics Software Engineer (AMR)', benchmark: 'ROS 2, Nav2, SLAM, Gazebo, C++, Python' },
      { title: 'EV Battery Thermal & Structural Design Engineer', benchmark: 'SolidWorks, Ansys Fluent CFD, AIS-156, GD&T' },
      { title: 'Automotive CAE & Crash Simulation Engineer', benchmark: 'Altair HyperMesh, LS-DYNA, Non-linear FEA, BIW' },
      { title: 'Mechatronics & Control Systems Engineer', benchmark: 'MATLAB/Simulink, Actuators, CAN Bus, C++' }
    ],
    defaultRole: 'Robotics Software Engineer (AMR)',
    defaultInterests: ['Robotics', 'Electric Vehicles', 'Computational Mechanics']
  },
  'Civil & Smart Infrastructure': {
    defaultSkills: [
      { name: 'Structural Analysis (STAAD.Pro)', category: 'Technical', level: 80, demandLevel: 'Critical' },
      { name: 'Reinforced Concrete (IS 456)', category: 'Technical', level: 85, demandLevel: 'Critical' },
      { name: 'Revit BIM Modeling', category: 'Digital Skills', level: 75, demandLevel: 'High' },
      { name: 'AutoCAD Civil 3D', category: 'Technical', level: 80, demandLevel: 'High' },
      { name: 'Surveying & GIS', category: 'Technical', level: 72, demandLevel: 'Medium' }
    ],
    availableSkills: [
      'Structural Analysis (STAAD.Pro)', 'ETABS', 'Reinforced Concrete (IS 456)',
      'Steel Structures (IS 800)', 'Revit BIM Modeling', 'Navisworks Clash Detection',
      'AutoCAD Civil 3D', 'Bentley OpenBridge', 'Geotechnical Engineering',
      'Surveying & GIS', 'QGIS / ArcGIS', 'Construction Management'
    ],
    roles: [
      { title: 'Structural Design Engineer (Metro & Bridges)', benchmark: 'Bentley STAAD.Pro, ETABS, IS 456 / IS 1893, Concrete Viaducts' },
      { title: 'BIM & Digital Twin Coordinator', benchmark: 'Autodesk Revit Structure, Navisworks Clash Detection, LOD 350, GIS' },
      { title: 'Geotechnical & Highway Infrastructure Engineer', benchmark: 'MX Road, PLAXIS, Deep Piled Foundations, Soil Strata' },
      { title: 'Smart Water & Environmental Modeler', benchmark: 'EPANET, HEC-RAS, GIS Catchment Hydrology' }
    ],
    defaultRole: 'Structural Design Engineer (Metro & Bridges)',
    defaultInterests: ['Structural Design', 'BIM & Digital Twins', 'Metro Infrastructure']
  },
  'Electrical, Power Systems & Renewable Energy': {
    defaultSkills: [
      { name: 'MATLAB / Simulink', category: 'Technical', level: 82, demandLevel: 'Critical' },
      { name: 'Power Electronics', category: 'Technical', level: 80, demandLevel: 'Critical' },
      { name: 'Battery Management (BMS)', category: 'Technical', level: 74, demandLevel: 'High' },
      { name: 'Motor Drives & FOC', category: 'Technical', level: 75, demandLevel: 'High' },
      { name: 'PLC & SCADA Automation', category: 'Technical', level: 70, demandLevel: 'High' }
    ],
    availableSkills: [
      'MATLAB / Simulink', 'SimPowerSystems', 'PLECS', 'Power Electronics',
      'Motor Drives & FOC', 'Battery Management (BMS)', 'PLC & SCADA Automation',
      'Siemens TIA Portal', 'ETAP', 'IEC 61850 Protocols', 'High-Voltage Engineering',
      'Renewable Solar & Wind Systems', 'Embedded C'
    ],
    roles: [
      { title: 'Power Electronics & Inverter Control Engineer', benchmark: 'MATLAB/Simulink, SiC Inverters, FOC Motor Drives, SVPWM' },
      { title: 'Smart Grid & Substation Automation Specialist', benchmark: 'IEC 61850, SCADA, Protection Relays, ETAP Analysis' },
      { title: 'BMS Firmware & Battery Storage Engineer', benchmark: '800V Architecture, Active Balancing, State-of-Charge (SOC)' },
      { title: 'Renewable Microgrid Integration Engineer', benchmark: 'Simulink Solar/Wind, Grid Code Compliance, Inverters' }
    ],
    defaultRole: 'Power Electronics & Inverter Control Engineer',
    defaultInterests: ['Power Electronics', 'Electric Vehicles', 'Renewable Microgrids']
  }
};

export default function StudentOnboardingPage() {
  const router = useRouter();
  const { registerStudent } = useStudent();

  // Stepper State (1 to 4)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Initial Draft Loaded from Registration - Starts clean!
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('Delhi Technological University (DTU)');

  // Phase 1: Academic Credentials - Starts blank for new student!
  const [degree, setDegree] = useState('B.Tech');
  const [branch, setBranch] = useState('Computer Science and Engineering');
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [cgpa, setCgpa] = useState<string>('');
  const [semester, setSemester] = useState<number>(6);
  const [graduationYear, setGraduationYear] = useState<number>(2026);

  // Dynamic State-Anchored Indian Academic Student UID: [State]-[City]-[College]-[Degree]-[Branch]-[Batch]-[Roll]
  const generatedStudentUid = useMemo(() => {
    return generateIndianStudentUID({
      institution,
      college: institution,
      degree,
      branch,
      graduationYear,
      enrollmentNumber,
      semester
    });
  }, [institution, degree, branch, graduationYear, enrollmentNumber, semester]);

  // Current cluster state
  const currentCluster = getClusterForBranch(branch);
  const clusterConfig = CLUSTER_CONFIG[currentCluster];

  // Phase 2: Skills Inventory - Starts completely EMPTY for new student!
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [customSkillInput, setCustomSkillInput] = useState('');
  const [skillSearchQuery, setSkillSearchQuery] = useState('');
  const [skillCategoryFilter, setSkillCategoryFilter] = useState<'all' | 'technical' | 'digital' | 'soft'>('all');

  // Filtered Catalog Skills for Search Bar
  const filteredCatalogSkills = useMemo(() => {
    let list = MASTER_ENGINEERING_SKILLS;
    if (skillCategoryFilter === 'technical') {
      list = list.filter(s => s.category === 'Technical' || s.category === 'Problem Solving');
    } else if (skillCategoryFilter === 'digital') {
      list = list.filter(s => s.category === 'Digital Skills');
    } else if (skillCategoryFilter === 'soft') {
      list = list.filter(s => s.category === 'Soft Skills');
    }

    if (skillSearchQuery.trim()) {
      const q = skillSearchQuery.toLowerCase();
      list = list.filter(s => s.name.toLowerCase().includes(q) || s.domain.toLowerCase().includes(q));
    }
    return list;
  }, [skillSearchQuery, skillCategoryFilter]);

  // Phase 3: Target Role & Career Direction
  const [targetRole, setTargetRole] = useState('');
  const [careerInterests, setCareerInterests] = useState<string[]>([]);
  const [preferredInternshipType, setPreferredInternshipType] = useState('4–6 Weeks Summer Internship (30–45 Days)');

  // Phase 4: Verification Document Upload - Starts null!
  const [uploadedFile, setUploadedFile] = useState<{ file?: File; name: string; size: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFinalizing, setIsFinalizing] = useState(false);

  // Load registration draft on mount
  useEffect(() => {
    try {
      const draft = sessionStorage.getItem('skillbridge_reg_draft');
      if (draft) {
        const parsed = JSON.parse(draft);
        if (parsed.name) setName(parsed.name);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.institution) setInstitution(parsed.institution);
      }
    } catch (e) {}
  }, []);

  // Handle branch change: smoothly update cluster without injecting fake skills
  const handleBranchChange = (newBranch: string) => {
    setBranch(newBranch);
    const newCluster = getClusterForBranch(newBranch);
    const cfg = CLUSTER_CONFIG[newCluster];
    if (!targetRole) setTargetRole(cfg.defaultRole);
  };

  // Skill toggler for technical and soft skills
  const handleToggleSkill = (skillName: string, category: SkillCategory = 'Technical') => {
    const existing = selectedSkills.find(s => s.name === skillName);
    if (existing) {
      setSelectedSkills(selectedSkills.filter(s => s.name !== skillName));
    } else {
      setSelectedSkills([
        ...selectedSkills,
        { 
          id: `sk-custom-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`, 
          name: skillName, 
          category, 
          level: 75, 
          verified: false, 
          demandLevel: category === 'Soft Skills' ? 'High' : 'Critical' 
        }
      ]);
    }
  };

  // Add custom skill
  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSkillInput.trim()) return;
    handleToggleSkill(customSkillInput.trim(), 'Technical');
    setCustomSkillInput('');
  };

  // Skill slider update
  const handleSkillLevelChange = (name: string, level: number) => {
    setSelectedSkills(selectedSkills.map(s => s.name === name ? { ...s, level } : s));
  };

  // Calculate estimated baseline readiness
  const numericCgpa = parseFloat(cgpa) || 0;
  const estimatedReadiness = (selectedSkills.length > 0 && numericCgpa > 0)
    ? Math.min(95, Math.max(35, Math.round(
        (numericCgpa / 10) * 30 + 
        (selectedSkills.reduce((acc, curr) => acc + curr.level, 0) / (selectedSkills.length || 1)) * 0.5
      )))
    : null;

  // Real-time matched opportunities calculation based on student skills & soft skills
  const dummyStudentForMatch = useMemo((): StudentProfile => ({
    id: 'temp-student',
    name: name || 'Candidate',
    email: email || 'student@ac.in',
    avatar: '',
    institution,
    degree,
    branch,
    engineeringCluster: currentCluster,
    semester,
    cgpa: numericCgpa > 0 ? numericCgpa : 8.0,
    readinessScore: estimatedReadiness || 50,
    targetRole: targetRole || clusterConfig.defaultRole,
    careerInterests,
    skills: selectedSkills,
    topGaps: [],
    assessmentCompleted: false,
    certifications: []
  }), [name, email, institution, degree, branch, currentCluster, semester, numericCgpa, estimatedReadiness, targetRole, careerInterests, clusterConfig, selectedSkills]);

  const matchedOpportunities = useMemo(() => {
    if (selectedSkills.length === 0) return [];
    
    return MOCK_OPPORTUNITIES
      .map(opp => ({
        opp,
        match: calculateOpportunityMatch(dummyStudentForMatch, opp)
      }))
      .filter(item => item.match.skillMatchScore > 0 || item.opp.engineeringCluster === currentCluster)
      .sort((a, b) => b.match.skillMatchScore - a.match.skillMatchScore);
  }, [dummyStudentForMatch, selectedSkills, currentCluster]);

  // ID File selection handler
  const handleIdFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds the 10MB limit.');
      return;
    }
    const sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
    setUploadedFile({ file, name: file.name, size: sizeStr });
  };

  // ID File drag & drop handler
  const handleIdDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds the 10MB limit.');
      return;
    }
    const sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
    setUploadedFile({ file, name: file.name, size: sizeStr });
  };

  // Final submit handler
  const handleCompleteOnboarding = async () => {
    setIsFinalizing(true);

    if (uploadedFile?.file) {
      try {
        await uploadStudentDocument(`std-new`, 'id_proofs', uploadedFile.file);
      } catch (err) {}
    }

    registerStudent({
      name: name || 'New Student',
      email: email || 'student@college.ac.in',
      institution,
      college: institution,
      degree,
      branch,
      engineeringCluster: getClusterForBranch(branch),
      enrollmentNumber: enrollmentNumber || '',
      studentUid: generatedStudentUid,
      cgpa: numericCgpa,
      semester,
      graduationYear,
      skills: selectedSkills,
      targetRole: targetRole || clusterConfig.defaultRole,
      careerInterests: careerInterests.length > 0 ? careerInterests : clusterConfig.defaultInterests,
      readinessScore: estimatedReadiness || 0,
      collegeIdProof: uploadedFile?.name || '',
      verificationStatus: 'Pending',
      verificationType: 'COLLEGE_ID'
    });

    setTimeout(() => {
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navbar */}
      <header className="border-b border-white/[0.06] bg-[#090a0f]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="text-sm font-semibold text-white tracking-tight">
              SkillBridge<span className="text-indigo-400">.ai</span>
            </span>
          </Link>

          {/* Stepper Indicator */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Phase {currentStep} of 4</span>
            <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container: Asymmetric Split */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN (40%): Live Preview Card & Accreditation */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-20">
            
            {/* Live Profile Card Preview */}
            <div className="bg-[#0f121d] border border-white/[0.08] rounded-3xl p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  Live Candidate Preview
                </span>
                <span className="bg-amber-950/60 text-amber-300 border border-amber-800/60 text-[10px] px-2 py-0.5 rounded-full font-semibold">
                  Verification Pending
                </span>
              </div>

              {/* Candidate Info Header */}
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-base shadow-md shrink-0">
                  {(name || 'Candidate').charAt(0).toUpperCase()}
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h3 className="text-base font-bold text-white tracking-tight truncate">
                    {name || 'New Engineering Candidate'}
                  </h3>
                  <p className="text-xs text-slate-300 truncate">{degree} in {branch}</p>
                  <p className="text-[11px] text-slate-400 truncate">{institution || 'Campus Not Set'}</p>
                </div>
              </div>

              {/* State-Anchored Indian Academic Student UID Badge */}
              <div className="bg-gradient-to-r from-indigo-950/50 via-slate-900 to-indigo-950/30 border border-indigo-500/25 rounded-2xl p-3 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-indigo-400 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                    Indian Academic Student UID
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">AICTE Standard</span>
                </div>
                <div className="text-xs font-mono font-bold text-white tracking-wide bg-[#141824] px-2.5 py-1.5 rounded-lg border border-white/[0.06] flex items-center justify-between">
                  <span className="text-indigo-200">{generatedStudentUid}</span>
                  <span className="text-[10px] text-emerald-400 font-sans font-medium">Auto-Anchored</span>
                </div>
              </div>

              {/* Structured Metadata Box */}
              <div className="bg-[#141824] rounded-2xl p-3.5 grid grid-cols-3 gap-2 text-center text-xs border border-white/[0.04]">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Roll No</span>
                  <span className="font-semibold text-slate-200 text-[11px] font-mono truncate block">
                    {enrollmentNumber.trim() || '—'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">CGPA</span>
                  <span className="font-bold text-emerald-400 text-sm">
                    {numericCgpa > 0 ? numericCgpa.toFixed(2) : '—'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Readiness</span>
                  <span className="font-bold text-indigo-400 text-sm">
                    {estimatedReadiness !== null ? `${estimatedReadiness}/100` : '—'}
                  </span>
                  {estimatedReadiness === null && (
                    <span className="text-[9px] text-slate-500 block leading-tight">Unassessed</span>
                  )}
                </div>
              </div>

              {/* Target Role & Selected Skills */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Target Role:</span>
                  <span className="font-semibold text-white truncate max-w-[180px]">
                    {targetRole || 'Not Selected Yet'}
                  </span>
                </div>

                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Selected Skills ({selectedSkills.length})
                  </span>
                  {selectedSkills.length === 0 ? (
                    <p className="text-slate-500 italic text-[11px] py-1">
                      No skills selected yet (0). Select technical & soft skills in Phase 2.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                      {selectedSkills.map(s => (
                        <span 
                          key={s.id} 
                          className={`border text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 ${
                            s.category === 'Soft Skills'
                              ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50'
                              : 'bg-[#141824] text-slate-300 border-white/[0.06]'
                          }`}
                        >
                          <span>{s.name}</span>
                          <span className={s.category === 'Soft Skills' ? 'text-emerald-400 font-bold' : 'text-indigo-400 font-bold'}>
                            {s.level}%
                          </span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Document Status */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
                <span>College ID Document:</span>
                <span className="text-slate-300 font-mono text-[10px] truncate max-w-[150px]">
                  {uploadedFile ? uploadedFile.name : 'Not Uploaded'}
                </span>
              </div>
            </div>

            {/* Validation Checklist */}
            <div className="bg-[#0f121d] border border-white/[0.08] rounded-2xl p-4 text-xs space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Engineering Credential Milestones:
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className={`flex items-center gap-2 ${email.includes('@') && email.includes('.') ? 'text-emerald-400' : 'text-slate-500'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>College Domain Email Confirmed</span>
                </div>
                <div className={`flex items-center gap-2 ${enrollmentNumber.trim() && numericCgpa > 0 ? 'text-emerald-400' : 'text-slate-500'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Academic Standing & Roll No Entered</span>
                </div>
                <div className={`flex items-center gap-2 ${selectedSkills.length > 0 ? 'text-emerald-400' : 'text-slate-500'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Technical & Soft Skills Tagged ({selectedSkills.length})</span>
                </div>
                <div className={`flex items-center gap-2 ${uploadedFile ? 'text-emerald-400' : 'text-slate-500'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>College ID Card Uploaded for TPO Review</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (60%): Interactive Step Canvas */}
          <div className="lg:col-span-7 bg-[#0f121d] border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* STEP 1: Academic Identity */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                    Phase 01 of 04
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Academic Background & Standing
                  </h2>
                  <p className="text-xs text-slate-400">
                    Enter your degree program and official enrollment ID for institutional verification.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-slate-300 font-medium">Degree Program</label>
                      <select
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                        className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2.5 text-white focus:outline-none cursor-pointer"
                      >
                        <option value="B.Tech">B.Tech (Bachelor of Technology)</option>
                        <option value="B.E.">B.E. (Bachelor of Engineering)</option>
                        <option value="M.Tech">M.Tech (Master of Technology)</option>
                        <option value="Dual Degree">Dual Degree (B.Tech + M.Tech)</option>
                        <option value="B.Sc CS">B.Sc Computer Science</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-slate-300 font-medium">Engineering Discipline</label>
                      <select
                        value={branch}
                        onChange={(e) => handleBranchChange(e.target.value)}
                        className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2.5 text-white focus:outline-none cursor-pointer"
                      >
                        <option value="Computer Science and Engineering">Computer Science & Engineering (CSE)</option>
                        <option value="AI & Data Science">Artificial Intelligence & Data Science (AI-DS)</option>
                        <option value="Information Technology">Information Technology (IT)</option>
                        <option value="Electronics & Communication (VLSI & Embedded)">Electronics & Communication (ECE / VLSI)</option>
                        <option value="Mechanical & Robotics Engineering">Mechanical & Robotics Engineering</option>
                        <option value="Civil & Smart Infrastructure Engineering">Civil & Smart Infrastructure Engineering</option>
                        <option value="Electrical & Power Systems Engineering">Electrical & Power Systems Engineering</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-slate-300 font-medium">University Roll / Enrollment No</label>
                      <input
                        type="text"
                        required
                        value={enrollmentNumber}
                        onChange={(e) => setEnrollmentNumber(e.target.value)}
                        placeholder="e.g. 2K22/CO/148"
                        className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2.5 font-mono text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-slate-300 font-medium">Cumulative CGPA (Scale of 10)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        required
                        value={cgpa}
                        onChange={(e) => setCgpa(e.target.value)}
                        placeholder="e.g. 8.75"
                        className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2.5 font-mono text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Real-Time Indian Academic Student UID Live Generator */}
                  <div className="bg-[#141824] border border-indigo-500/30 rounded-2xl p-4 space-y-2.5">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-white block">
                            State-Anchored Indian Academic Student UID
                          </span>
                          <span className="text-[10px] text-slate-400">
                            Standardized schema for faculty endorsements, campus database & recruiter records
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-indigo-300 bg-indigo-950/70 border border-indigo-500/30 px-3 py-1 rounded-lg tracking-wider">
                        {generatedStudentUid}
                      </span>
                    </div>

                    {/* UID Segment Breakdown Pills */}
                    <div className="pt-1.5 border-t border-white/[0.06] grid grid-cols-7 gap-1 text-center font-mono text-[10px]">
                      <div className="bg-[#0f121d] rounded-lg p-1.5 border border-white/[0.04]">
                        <span className="text-slate-500 block text-[8px] uppercase">State</span>
                        <span className="font-bold text-indigo-300">{generatedStudentUid.split('-')[0]}</span>
                      </div>
                      <div className="bg-[#0f121d] rounded-lg p-1.5 border border-white/[0.04]">
                        <span className="text-slate-500 block text-[8px] uppercase">City</span>
                        <span className="font-bold text-indigo-300">{generatedStudentUid.split('-')[1]}</span>
                      </div>
                      <div className="bg-[#0f121d] rounded-lg p-1.5 border border-white/[0.04]">
                        <span className="text-slate-500 block text-[8px] uppercase">College</span>
                        <span className="font-bold text-indigo-300">{generatedStudentUid.split('-')[2]}</span>
                      </div>
                      <div className="bg-[#0f121d] rounded-lg p-1.5 border border-white/[0.04]">
                        <span className="text-slate-500 block text-[8px] uppercase">Degree</span>
                        <span className="font-bold text-indigo-300">{generatedStudentUid.split('-')[3]}</span>
                      </div>
                      <div className="bg-[#0f121d] rounded-lg p-1.5 border border-white/[0.04]">
                        <span className="text-slate-500 block text-[8px] uppercase">Branch</span>
                        <span className="font-bold text-indigo-300">{generatedStudentUid.split('-')[4]}</span>
                      </div>
                      <div className="bg-[#0f121d] rounded-lg p-1.5 border border-white/[0.04]">
                        <span className="text-slate-500 block text-[8px] uppercase">Batch</span>
                        <span className="font-bold text-indigo-300">&apos;{generatedStudentUid.split('-')[5]}</span>
                      </div>
                      <div className="bg-[#0f121d] rounded-lg p-1.5 border border-white/[0.04]">
                        <span className="text-slate-500 block text-[8px] uppercase">Roll</span>
                        <span className="font-bold text-emerald-400">{generatedStudentUid.split('-')[6]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-slate-300 font-medium">Current Semester</label>
                      <select
                        value={semester}
                        onChange={(e) => setSemester(parseInt(e.target.value) || 6)}
                        className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2.5 text-white focus:outline-none cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                          <option key={s} value={s}>Semester {s}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-slate-300 font-medium">Expected Graduation Year</label>
                      <select
                        value={graduationYear}
                        onChange={(e) => setGraduationYear(parseInt(e.target.value) || 2026)}
                        className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2.5 text-white focus:outline-none cursor-pointer"
                      >
                        <option value={2025}>2025</option>
                        <option value={2026}>2026</option>
                        <option value={2027}>2027</option>
                        <option value={2028}>2028</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 transition"
                  >
                    <span>Continue to Skills & Stack</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Skills & Soft Skills Inventory + Real-Time Matched Opportunities */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                    Phase 02 of 04
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Skills & Competency Profiling
                  </h2>
                  <p className="text-xs text-slate-400">
                    Select your technical tools and soft skills. Real-time industry job opportunities will match dynamically.
                  </p>
                </div>

                {/* Universal Interactive Search Bar */}
                <div className="bg-[#141824] border border-white/[0.08] rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Search & Explore Engineering Competencies (150+ Standardized Skills)</span>
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {filteredCatalogSkills.length} available
                    </span>
                  </div>

                  {/* Search Input Box */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search skills, CAD tools, frameworks (e.g. PyTorch, Vivado, SolidWorks, STAAD, ROS)..."
                      value={skillSearchQuery}
                      onChange={(e) => setSkillSearchQuery(e.target.value)}
                      className="w-full bg-[#0f121d] border border-white/[0.08] focus:border-indigo-500 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none"
                    />
                    {skillSearchQuery && (
                      <button 
                        type="button"
                        onClick={() => setSkillSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Category Filter Tabs */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setSkillCategoryFilter('all')}
                      className={`px-2.5 py-1 rounded-lg border transition whitespace-nowrap cursor-pointer ${
                        skillCategoryFilter === 'all'
                          ? 'bg-indigo-600 text-white border-indigo-500 font-semibold'
                          : 'bg-[#0f121d] text-slate-400 border-white/[0.06] hover:text-white'
                      }`}
                    >
                      All Domains
                    </button>
                    <button
                      type="button"
                      onClick={() => setSkillCategoryFilter('technical')}
                      className={`px-2.5 py-1 rounded-lg border transition whitespace-nowrap cursor-pointer ${
                        skillCategoryFilter === 'technical'
                          ? 'bg-indigo-600 text-white border-indigo-500 font-semibold'
                          : 'bg-[#0f121d] text-slate-400 border-white/[0.06] hover:text-white'
                      }`}
                    >
                      Core Technical & CAD
                    </button>
                    <button
                      type="button"
                      onClick={() => setSkillCategoryFilter('digital')}
                      className={`px-2.5 py-1 rounded-lg border transition whitespace-nowrap cursor-pointer ${
                        skillCategoryFilter === 'digital'
                          ? 'bg-indigo-600 text-white border-indigo-500 font-semibold'
                          : 'bg-[#0f121d] text-slate-400 border-white/[0.06] hover:text-white'
                      }`}
                    >
                      Cloud & Digital Systems
                    </button>
                    <button
                      type="button"
                      onClick={() => setSkillCategoryFilter('soft')}
                      className={`px-2.5 py-1 rounded-lg border transition whitespace-nowrap cursor-pointer ${
                        skillCategoryFilter === 'soft'
                          ? 'bg-emerald-600 text-white border-emerald-500 font-semibold'
                          : 'bg-[#0f121d] text-slate-400 border-white/[0.06] hover:text-white'
                      }`}
                    >
                      Soft Skills & Leadership
                    </button>
                  </div>

                  {/* Catalog Results Grid */}
                  <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto p-1 bg-[#0f121d] rounded-xl border border-white/[0.04]">
                    {filteredCatalogSkills.map(sk => {
                      const isSelected = selectedSkills.some(sel => sel.name === sk.name);
                      return (
                        <button
                          key={sk.name}
                          type="button"
                          onClick={() => handleToggleSkill(sk.name, sk.category)}
                          className={`text-xs px-2.5 py-1 rounded-lg border transition cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? sk.category === 'Soft Skills'
                                ? 'bg-emerald-600 text-white border-emerald-500 font-medium'
                                : 'bg-indigo-600 text-white border-indigo-500 font-medium'
                              : 'bg-[#141824] text-slate-300 border-white/[0.06] hover:border-slate-600'
                          }`}
                        >
                          <span>{isSelected ? '✓' : '+'}</span>
                          <span>{sk.name}</span>
                          <span className="text-[9px] text-slate-400 opacity-70">({sk.category.slice(0, 4)})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section A: Recommended for your discipline */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Recommended for Your Branch ({branch})</span>
                    </label>
                    <span className="text-[10px] text-indigo-300 font-medium">Quick Select</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {clusterConfig.availableSkills.map(s => {
                      const isSelected = selectedSkills.some(sel => sel.name === s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleToggleSkill(s, 'Technical')}
                          className={`text-xs px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-500 font-medium shadow-sm'
                              : 'bg-[#141824] text-slate-300 border-white/[0.08] hover:border-slate-600'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '} {s}
                        </button>
                      );
                    })}
                  </div>

                  {/* Add custom technical skill */}
                  <form onSubmit={handleAddCustomSkill} className="flex items-center gap-2 pt-1 max-w-sm">
                    <input
                      type="text"
                      placeholder="Add custom unlisted skill..."
                      value={customSkillInput}
                      onChange={(e) => setCustomSkillInput(e.target.value)}
                      className="bg-[#141824] border border-white/[0.08] text-xs text-white rounded-lg px-2.5 py-1.5 flex-1 focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  </form>
                </div>

                {/* Section C: Selected Skills Sliders */}
                {selectedSkills.length > 0 && (
                  <div className="space-y-3 pt-2 border-t border-white/[0.06]">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-medium text-slate-400 block">
                        Adjust Proficiency Levels ({selectedSkills.length} selected):
                      </label>
                      <span className="text-[10px] text-slate-500">Self-reported (verified via diagnostic test)</span>
                    </div>

                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {selectedSkills.map(s => (
                        <div key={s.id} className="bg-[#141824] border border-white/[0.06] rounded-xl p-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">{s.name}</span>
                            <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                              s.category === 'Soft Skills' 
                                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40' 
                                : 'bg-indigo-950/60 text-indigo-300 border border-indigo-800/40'
                            }`}>
                              {s.category}
                            </span>
                          </div>

                          <div className="flex items-center gap-2.5 w-full sm:w-52">
                            <input
                              type="range"
                              min="30"
                              max="95"
                              step="5"
                              value={s.level}
                              onChange={(e) => handleSkillLevelChange(s.name, parseInt(e.target.value))}
                              className="w-full accent-indigo-500 cursor-pointer"
                            />
                            <span className="font-mono text-indigo-300 font-bold tabular-nums w-8 text-right text-xs">
                              {s.level}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section D: LIVE MATCHED OPPORTUNITIES PREVIEW */}
                <div className="bg-[#141824] border border-indigo-500/25 rounded-2xl p-4 sm:p-5 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-indigo-400" />
                      <h3 className="text-xs font-bold text-white">
                        Live Opportunities Matching Your Skills & Soft Skills
                      </h3>
                    </div>
                    <span className="text-[10px] text-indigo-300 font-semibold bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-700/50">
                      Dynamic Match Preview
                    </span>
                  </div>

                  {selectedSkills.length === 0 ? (
                    <div className="text-center py-6 px-4 border border-dashed border-white/[0.08] rounded-xl text-xs text-slate-400 space-y-1">
                      <p className="font-semibold text-slate-300">Select technical and soft skills above</p>
                      <p className="text-[11px]">Real-time opportunities and internships from Qualcomm, TCS, Ather Energy, and more will instantly calculate here.</p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {matchedOpportunities.slice(0, 3).map(({ opp, match }) => (
                        <div key={opp.id} className="bg-[#0f121d] border border-white/[0.06] rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs hover:border-indigo-500/40 transition">
                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-xs truncate">{opp.title}</span>
                              <span className="bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 font-bold text-[10px] px-2 py-0.5 rounded-full shrink-0">
                                {match.skillMatchScore}% Match
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 flex items-center gap-2">
                              <span>{opp.company}</span>
                              <span>•</span>
                              <span className="text-indigo-300 font-mono">{opp.stipend}</span>
                            </div>
                            {match.matchedSkills.length > 0 && (
                              <div className="flex items-center gap-1 flex-wrap pt-0.5 text-[10px]">
                                <span className="text-slate-500">Matched:</span>
                                {match.matchedSkills.slice(0, 3).map(ms => (
                                  <span key={ms} className="text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 px-1.5 py-0.5 rounded">
                                    {ms} ✓
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="shrink-0 text-right">
                            <span className="text-[10px] text-slate-500 block">{opp.location}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-slate-400 hover:text-white text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 transition cursor-pointer"
                  >
                    <span>Continue to Target Roles</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Target Role Benchmark */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                    Phase 03 of 04
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Target Role & Career Benchmark
                  </h2>
                  <p className="text-xs text-slate-400">
                    Choose your desired industry role. The platform compares your skills against live recruiter criteria.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-white block flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Select Target Career Role & Skill Benchmark</span>
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Dynamic Match against {selectedSkills.length} selected skills
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {clusterConfig.roles.map(r => {
                      const isSelected = targetRole === r.title;
                      
                      // Split required skills for this role
                      const reqSkills = r.benchmark.split(',').map(s => s.trim());
                      
                      // Find which required skills the student already selected
                      const matched = reqSkills.filter(req => 
                        selectedSkills.some(sel => 
                          sel.name.toLowerCase().includes(req.toLowerCase()) || 
                          req.toLowerCase().includes(sel.name.toLowerCase())
                        )
                      );
                      const missing = reqSkills.filter(req => !matched.includes(req));
                      const matchScore = reqSkills.length > 0 
                        ? Math.round((matched.length / reqSkills.length) * 100) 
                        : 0;

                      return (
                        <div
                          key={r.title}
                          onClick={() => setTargetRole(r.title)}
                          className={`p-4 rounded-2xl border cursor-pointer transition space-y-2.5 ${
                            isSelected
                              ? 'bg-indigo-950/70 border-indigo-500 ring-1 ring-indigo-500/50 text-white shadow-lg shadow-indigo-950/40'
                              : 'bg-[#141824] border-white/[0.06] text-slate-300 hover:border-slate-600'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-white">{r.title}</span>
                                {matchScore >= 60 && (
                                  <span className="bg-emerald-950/70 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-800/60">
                                    High Match
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-slate-400">
                                {matched.length} of {reqSkills.length} core competencies matched
                              </span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <span className={`text-xs font-bold font-mono px-2.5 py-1 rounded-lg border ${
                                matchScore >= 60 
                                  ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700/60' 
                                  : matchScore >= 30
                                  ? 'bg-indigo-950/80 text-indigo-300 border-indigo-700/60'
                                  : 'bg-slate-900 text-slate-400 border-white/[0.08]'
                              }`}>
                                {matchScore}% Match
                              </span>
                              {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                            </div>
                          </div>

                          {/* Dynamic Skill Badges */}
                          <div className="space-y-1.5 pt-1 border-t border-white/[0.04]">
                            <div className="flex flex-wrap gap-1.5 items-center text-[11px]">
                              {matched.map(m => (
                                <span key={m} className="bg-emerald-950/50 text-emerald-300 border border-emerald-800/50 px-2 py-0.5 rounded-md flex items-center gap-1 font-medium">
                                  ✓ {m}
                                </span>
                              ))}
                              {missing.map(m => (
                                <span key={m} className="bg-[#0f121d] text-slate-400 border border-white/[0.08] px-2 py-0.5 rounded-md flex items-center gap-1">
                                  + {m} (To Learn)
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <label className="text-slate-200 font-semibold block flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Internship Engagement Track (Indian College & AICTE Standard)</span>
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">NEP 2020 Aligned</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {INDIAN_INTERNSHIP_TRACKS.map(t => {
                      const isSelected = preferredInternshipType === t.title;
                      return (
                        <div
                          key={t.id}
                          onClick={() => setPreferredInternshipType(t.title)}
                          className={`p-3.5 rounded-2xl border text-xs text-left transition cursor-pointer space-y-2 ${
                            isSelected
                              ? 'bg-indigo-950/70 border-indigo-500 ring-1 ring-indigo-500/50 text-white shadow-md shadow-indigo-950/50'
                              : 'bg-[#141824] border-white/[0.06] text-slate-300 hover:border-slate-600'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-bold text-xs leading-snug text-white">{t.title}</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />}
                          </div>

                          <div className="flex items-center gap-2 flex-wrap text-[10px]">
                            <span className="bg-indigo-900/60 text-indigo-300 px-2 py-0.5 rounded-md font-semibold border border-indigo-700/50">
                              {t.badge}
                            </span>
                            <span className="text-slate-400 font-mono">
                              {t.credits}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            {t.desc}
                          </p>

                          <div className="text-[10px] text-slate-500 pt-1 border-t border-white/[0.04] flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-500" />
                            <span>{t.timing}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-slate-400 hover:text-white text-xs flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 transition"
                  >
                    <span>Continue to Document Upload</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Institutional Document Upload */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                    Phase 04 of 04
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Institutional ID Verification
                  </h2>
                  <p className="text-xs text-slate-400">
                    Upload your official College ID card or latest grade transcript for review by your campus Training & Placement Office.
                  </p>
                </div>

                {/* Upload Canvas with Interactive File Picker & Drag-and-Drop */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleIdDrop}
                  className="border-2 border-dashed border-white/[0.12] hover:border-indigo-500/60 bg-[#12151f]/40 rounded-2xl p-8 text-center space-y-3 transition cursor-pointer"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="hidden"
                    onChange={handleIdFileSelect}
                  />

                  <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 text-indigo-400 border border-indigo-700/60 flex items-center justify-center mx-auto">
                    <Upload className="w-6 h-6" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-white">
                      Drop your Student ID Card or Marksheet here, or click to browse
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Supports PDF, PNG, JPG up to 10MB
                    </div>
                  </div>

                  {uploadedFile ? (
                    <div 
                      onClick={(e) => e.stopPropagation()}
                      className="bg-[#141824] border border-emerald-500/30 p-3 rounded-xl max-w-sm mx-auto flex items-center justify-between text-xs text-left"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-white font-mono text-[11px] truncate">{uploadedFile.name}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span className="text-[10px] text-slate-400">{uploadedFile.size}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setUploadedFile(null);
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                          className="text-slate-400 hover:text-rose-400 p-0.5 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-indigo-400 hover:underline font-semibold">
                      Click to choose file from computer
                    </div>
                  )}
                </div>

                {/* Verification Notice */}
                <div className="bg-[#141824] border border-white/[0.06] rounded-2xl p-4 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-indigo-300 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-indigo-400" />
                    <span>How Your Verification Works</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    1. Once submitted, your profile enters your college Training & Placement Office (TPO) queue.
                    <br />
                    2. You can immediately access the portal, take diagnostic assessments, and browse matched internships.
                    <br />
                    3. After TPO approval, an official <strong>Campus Verified</strong> badge will appear on your digital portfolio.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="text-slate-400 hover:text-white text-xs flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    disabled={isFinalizing}
                    onClick={handleCompleteOnboarding}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isFinalizing ? 'Finalizing Profile...' : 'Complete Profile & Launch Portal'}</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </main>

    </div>
  );
}
