'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStudent } from '@/lib/context/StudentContext';
import { Skill } from '@/types';
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
  Building
} from 'lucide-react';

export default function StudentOnboardingPage() {
  const router = useRouter();
  const { registerStudent } = useStudent();

  // Stepper State (1 to 4)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Initial Draft Loaded from Registration
  const [name, setName] = useState('Aditya Verma');
  const [email, setEmail] = useState('aditya.verma@dtu.ac.in');
  const [institution, setInstitution] = useState('Delhi Technological University (DTU)');

  // Phase 1: Academic Credentials
  const [degree, setDegree] = useState('B.Tech');
  const [branch, setBranch] = useState('Computer Science and Engineering');
  const [enrollmentNumber, setEnrollmentNumber] = useState('2K22/CO/148');
  const [cgpa, setCgpa] = useState<number>(8.75);
  const [semester, setSemester] = useState<number>(6);
  const [graduationYear, setGraduationYear] = useState<number>(2026);

  // Phase 2: Skills Inventory
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([
    { id: 'sk-1', name: 'Python', category: 'Technical', level: 85, verified: false, demandLevel: 'Critical' },
    { id: 'sk-9', name: 'Data Structures & Algorithms', category: 'Problem Solving', level: 80, verified: false, demandLevel: 'High' },
    { id: 'sk-5', name: 'React.js', category: 'Technical', level: 75, verified: false, demandLevel: 'High' },
    { id: 'sk-10', name: 'Git & Linux', category: 'Digital Skills', level: 85, verified: false, demandLevel: 'Critical' },
    { id: 'sk-8', name: 'Docker & Containers', category: 'Digital Skills', level: 45, verified: false, demandLevel: 'High' }
  ]);

  const availableSkillLibrary = [
    'Python', 'C++', 'Java', 'Data Structures & Algorithms', 'System Design',
    'React.js', 'TypeScript', 'Node.js', 'SQL & Databases', 'Docker & Containers',
    'Kubernetes', 'Cloud Computing (AWS)', 'TensorFlow / PyTorch', 'Embedded C / FreeRTOS',
    'REST APIs', 'Linux Internals', 'Problem Solving', 'Technical Communication'
  ];

  // Phase 3: Target Role & Career Direction
  const [targetRole, setTargetRole] = useState('AI/ML Engineer');
  const [careerInterests, setCareerInterests] = useState<string[]>([
    'Artificial Intelligence', 'Distributed Systems', 'Cloud Infrastructure'
  ]);
  const [preferredInternshipType, setPreferredInternshipType] = useState('Full-Time Summer Internship');

  const engineeringRoles = [
    { title: 'AI/ML Engineer', benchmark: 'PyTorch, Python, Distributed Systems, Linear Algebra' },
    { title: 'Full Stack Web Developer', benchmark: 'React, TypeScript, Node.js, Postgres, REST APIs' },
    { title: 'Cloud & DevOps Engineer', benchmark: 'Docker, Kubernetes, AWS, Terraform, CI/CD' },
    { title: 'Embedded Firmware & IoT Engineer', benchmark: 'Embedded C, RTOS, ARM Cortex, Hardware Protocols' },
    { title: 'Systems & Backend Engineer', benchmark: 'C++, Go, Distributed Systems, Concurrency, SQL' }
  ];

  // Phase 4: Verification Document Upload
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>({
    name: 'dtu_student_id_card_front_back.pdf',
    size: '1.4 MB'
  });
  const [uploadProgress, setUploadProgress] = useState(100);
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

  // Skill toggler
  const handleToggleSkill = (skillName: string) => {
    const existing = selectedSkills.find(s => s.name === skillName);
    if (existing) {
      setSelectedSkills(selectedSkills.filter(s => s.name !== skillName));
    } else {
      setSelectedSkills([
        ...selectedSkills,
        { id: `sk-custom-${Date.now()}`, name: skillName, category: 'Technical', level: 70, verified: false, demandLevel: 'High' }
      ]);
    }
  };

  // Skill slider update
  const handleSkillLevelChange = (name: string, level: number) => {
    setSelectedSkills(selectedSkills.map(s => s.name === name ? { ...s, level } : s));
  };

  // Calculate estimated baseline readiness
  const estimatedReadiness = Math.round(
    (cgpa / 10) * 30 + 
    (selectedSkills.reduce((acc, curr) => acc + curr.level, 0) / (selectedSkills.length || 1)) * 0.5
  );

  // Final submit handler
  const handleCompleteOnboarding = () => {
    setIsFinalizing(true);

    const newStudent = registerStudent({
      name,
      email,
      institution,
      college: institution,
      degree,
      branch,
      enrollmentNumber,
      cgpa,
      semester,
      graduationYear,
      skills: selectedSkills,
      targetRole,
      careerInterests,
      readinessScore: Math.min(95, Math.max(45, estimatedReadiness)),
      collegeIdProof: uploadedFile?.name || 'student_id_card.pdf',
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
                  {name.charAt(0)}
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h3 className="text-base font-bold text-white tracking-tight truncate">{name}</h3>
                  <p className="text-xs text-slate-300 truncate">{degree} in {branch}</p>
                  <p className="text-[11px] text-slate-400 truncate">{institution}</p>
                </div>
              </div>

              {/* Structured Metadata Box */}
              <div className="bg-[#141824] rounded-2xl p-3.5 grid grid-cols-3 gap-2 text-center text-xs border border-white/[0.04]">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Roll No</span>
                  <span className="font-semibold text-slate-200 text-[11px] font-mono truncate block">
                    {enrollmentNumber || '—'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">CGPA</span>
                  <span className="font-bold text-emerald-400 text-sm">
                    {cgpa ? cgpa.toFixed(2) : '—'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Readiness</span>
                  <span className="font-bold text-indigo-400 text-sm">
                    {estimatedReadiness}/100
                  </span>
                </div>
              </div>

              {/* Target Role & Selected Skills */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Target Role:</span>
                  <span className="font-semibold text-white">{targetRole}</span>
                </div>

                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Selected Skills ({selectedSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {selectedSkills.map(s => (
                      <span key={s.id} className="bg-[#141824] text-slate-300 border border-white/[0.06] text-[10px] px-2 py-0.5 rounded-md">
                        {s.name} <span className="text-indigo-400">{s.level}%</span>
                      </span>
                    ))}
                  </div>
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
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>College Domain Email Confirmed</span>
                </div>
                <div className={`flex items-center gap-2 ${currentStep > 1 ? 'text-emerald-400' : 'text-slate-400'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Academic Standing & Roll No Entered</span>
                </div>
                <div className={`flex items-center gap-2 ${currentStep > 2 ? 'text-emerald-400' : 'text-slate-400'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Technical Skills Tagged & Self-Assessed</span>
                </div>
                <div className={`flex items-center gap-2 ${uploadedFile ? 'text-emerald-400' : 'text-slate-400'}`}>
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
                        onChange={(e) => setBranch(e.target.value)}
                        className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2.5 text-white focus:outline-none cursor-pointer"
                      >
                        <option value="Computer Science and Engineering">Computer Science & Engineering (CSE)</option>
                        <option value="AI & Data Science">Artificial Intelligence & Data Science</option>
                        <option value="Information Technology">Information Technology (IT)</option>
                        <option value="Electronics & Communication Engineering">Electronics & Communication (ECE)</option>
                        <option value="Electrical Engineering (VLSI Specialisation)">Electrical Engg. (VLSI Specialization)</option>
                        <option value="Mechanical & Robotics Engineering">Mechanical & Robotics Engineering</option>
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
                        onChange={(e) => setCgpa(parseFloat(e.target.value) || 0)}
                        placeholder="8.75"
                        className="w-full bg-[#141824] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2.5 font-mono text-white focus:outline-none"
                      />
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

            {/* STEP 2: Skills & Proficiency Sliders */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                    Phase 02 of 04
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Technical Stack & Skill Inventory
                  </h2>
                  <p className="text-xs text-slate-400">
                    Select your competencies. Self-reported proficiencies remain pending until verified via assessment.
                  </p>
                </div>

                {/* Quick Add Library */}
                <div className="space-y-2">
                  <label className="text-[11px] font-medium text-slate-400 block">
                    Quick-add Engineering Skills:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {availableSkillLibrary.map(s => {
                      const isSelected = selectedSkills.some(sel => sel.name === s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleToggleSkill(s)}
                          className={`text-xs px-2.5 py-1 rounded-lg border transition ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-500 font-medium'
                              : 'bg-[#141824] text-slate-300 border-white/[0.08] hover:border-slate-600'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '} {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Skills Slider List */}
                <div className="space-y-3 pt-2">
                  <label className="text-[11px] font-medium text-slate-400 block">
                    Adjust Self-Reported Proficiency Levels:
                  </label>

                  <div className="space-y-2.5">
                    {selectedSkills.map(s => (
                      <div key={s.id} className="bg-[#141824] border border-white/[0.06] rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                        <div className="space-y-0.5">
                          <span className="font-semibold text-white">{s.name}</span>
                          <span className="text-[10px] text-slate-400 block">Status: Self-Reported (Unverified)</span>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-60">
                          <input
                            type="range"
                            min="20"
                            max="95"
                            step="5"
                            value={s.level}
                            onChange={(e) => handleSkillLevelChange(s.name, parseInt(e.target.value))}
                            className="w-full accent-indigo-500 cursor-pointer"
                          />
                          <span className="font-mono text-indigo-300 font-bold tabular-nums w-10 text-right">
                            {s.level}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-slate-400 hover:text-white text-xs flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 transition"
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
                  <label className="text-[11px] font-medium text-slate-400 block">
                    Select Target Engineering Benchmark:
                  </label>

                  <div className="space-y-2.5">
                    {engineeringRoles.map(r => {
                      const isSelected = targetRole === r.title;
                      return (
                        <div
                          key={r.title}
                          onClick={() => setTargetRole(r.title)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition ${
                            isSelected
                              ? 'bg-indigo-950/60 border-indigo-500 ring-1 ring-indigo-500/50 text-white'
                              : 'bg-[#141824] border-white/[0.06] text-slate-300 hover:border-slate-600'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-semibold mb-1">
                            <span>{r.title}</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                          </div>
                          <p className="text-[11px] text-slate-400">
                            Required Focus: {r.benchmark}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <label className="text-slate-300 font-medium block">Internship Engagement Preference</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {['Full-Time Summer Internship', 'Remote Sabbatical', 'Live Capstone Project', 'Winter Sprint'].map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setPreferredInternshipType(t)}
                        className={`p-2.5 rounded-xl border text-xs text-left transition ${
                          preferredInternshipType === t
                            ? 'bg-indigo-600 text-white border-indigo-500 font-medium'
                            : 'bg-[#141824] text-slate-300 border-white/[0.06]'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
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

                {/* Upload Canvas */}
                <div className="border-2 border-dashed border-white/[0.12] hover:border-indigo-500/60 bg-[#12151f]/40 rounded-2xl p-8 text-center space-y-3 transition">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 text-indigo-400 border border-indigo-700/60 flex items-center justify-center mx-auto">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-white">
                      Drop your Student ID Card or Marksheet here
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Supports PDF, PNG, JPG up to 10MB
                    </div>
                  </div>

                  {uploadedFile ? (
                    <div className="bg-[#141824] border border-white/[0.08] p-3 rounded-xl max-w-sm mx-auto flex items-center justify-between text-xs text-left">
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-white font-mono text-[11px] truncate">{uploadedFile.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 shrink-0 ml-2">{uploadedFile.size}</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setUploadedFile({ name: 'dtu_student_id_card.pdf', size: '1.2 MB' })}
                      className="text-xs text-indigo-400 hover:underline font-semibold"
                    >
                      Simulate Document Selection
                    </button>
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
