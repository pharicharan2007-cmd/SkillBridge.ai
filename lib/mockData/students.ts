import { StudentProfile } from '@/types';
import { MOCK_STANDARDIZED_SKILLS } from './skills';

export const MOCK_STUDENTS: StudentProfile[] = [
  {
    id: 'std-101',
    name: 'Rohan Sharma',
    email: 'rohan.sharma@institution.edu.in',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    institution: 'Delhi Technological University (DTU)',
    degree: 'B.Tech',
    branch: 'Computer Science and Engineering',
    semester: 7,
    cgpa: 8.65,
    readinessScore: 72,
    targetRole: 'AI/ML Engineer',
    careerInterests: ['Artificial Intelligence', 'Data Engineering', 'Full Stack Development', 'Healthcare AI'],
    assessmentCompleted: true,
    lastAssessmentDate: '2026-08-28',
    skills: [
      MOCK_STANDARDIZED_SKILLS[0],  // Python (85)
      MOCK_STANDARDIZED_SKILLS[1],  // Machine Learning (75)
      MOCK_STANDARDIZED_SKILLS[2],  // SQL (80)
      MOCK_STANDARDIZED_SKILLS[3],  // TensorFlow (40)
      MOCK_STANDARDIZED_SKILLS[4],  // React.js (88)
      MOCK_STANDARDIZED_SKILLS[5],  // TypeScript (82)
      MOCK_STANDARDIZED_SKILLS[8],  // DSA (78)
      MOCK_STANDARDIZED_SKILLS[9],  // Git (90)
      MOCK_STANDARDIZED_SKILLS[15], // Problem Solving (80)
      MOCK_STANDARDIZED_SKILLS[16], // Tech Comm (75)
      MOCK_STANDARDIZED_SKILLS[23], // AWS (55)
      MOCK_STANDARDIZED_SKILLS[24], // System Design (50)
      MOCK_STANDARDIZED_SKILLS[29], // Prompt Engineering (78)
      MOCK_STANDARDIZED_SKILLS[30], // Pandas & NumPy (82)
    ],
    topGaps: [
      {
        skillId: 'sk-4',
        skillName: 'TensorFlow / PyTorch',
        category: 'Technical',
        currentLevel: 40,
        requiredLevel: 80,
        gapPercentage: 50,
        priority: 'Critical',
        recommendedAction: 'Complete Deep Learning Specialization on Coursera & build a CNN project.'
      },
      {
        skillId: 'sk-24',
        skillName: 'Cloud Computing (AWS)',
        category: 'Digital Skills',
        currentLevel: 55,
        requiredLevel: 75,
        gapPercentage: 27,
        priority: 'High',
        recommendedAction: 'Practice AWS EC2, S3 & SageMaker deployment labs.'
      },
      {
        skillId: 'sk-25',
        skillName: 'System Design',
        category: 'Digital Skills',
        currentLevel: 50,
        requiredLevel: 75,
        gapPercentage: 33,
        priority: 'High',
        recommendedAction: 'Study Microservices & API gateway architecture principles.'
      },
      {
        skillId: 'sk-8',
        skillName: 'Docker & Containerization',
        category: 'Technical',
        currentLevel: 45,
        requiredLevel: 70,
        gapPercentage: 36,
        priority: 'Medium',
        recommendedAction: 'Containerize a FastAPI + React project using Docker Compose.'
      }
    ],
    certifications: [
      { id: 'cert-1', title: 'Deep Learning Fundamentals', issuer: 'NPTEL / IIT Madras', issueDate: '2026-03', verified: true, credentialId: 'NPTEL-AI-2026-8842' },
      { id: 'cert-2', title: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', issueDate: '2025-11', verified: true, credentialId: 'AWS-CCP-992140' },
      { id: 'cert-3', title: 'Algorithmic Problem Solving & Data Structures', issuer: 'Coursera / Stanford', issueDate: '2025-06', verified: true, credentialId: 'COURSERA-VERIF-7721' }
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'AyurMed Vision: Automated Medicinal Plant Species Classifier',
        description: 'Convolutional neural network for classification of 45+ Ayurvedic medicinal plants from high-resolution leaf imagery with 94.2% top-1 accuracy. Embedded with botanical metadata API.',
        techStack: ['Python', 'PyTorch', 'FastAPI', 'React', 'OpenCV'],
        githubUrl: 'https://github.com/rohan-sharma/ayurmed-vision',
        liveDemoUrl: 'https://ayurmed-vision.demo.app',
        verifiedBy: 'AIIA Innovation Cell Evaluator',
        date: 'July 2026'
      },
      {
        id: 'proj-2',
        title: 'Distributed FHIR Healthcare Records Exchange',
        description: 'Secure, encrypted HL7 FHIR standard microservices gateway with OAuth2 role-based authorization for interoperable patient records across university health clinics.',
        techStack: ['TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Redis'],
        githubUrl: 'https://github.com/rohan-sharma/fhir-health-gateway',
        verifiedBy: 'Department Faculty Coordinator',
        date: 'May 2026'
      },
      {
        id: 'proj-3',
        title: 'Smart SkillGap Diagnostic & Career Path Recommendation Engine',
        description: 'Weighted 3-tier matching vector engine (60% skills, 20% eligibility, 20% interest) evaluating student profiles against live industry hiring criteria.',
        techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Vector Match Algorithms'],
        githubUrl: 'https://github.com/rohan-sharma/skillbridge-engine',
        liveDemoUrl: 'https://skillbridge.ai',
        verifiedBy: 'Smart India Hackathon Mentor',
        date: 'Aug 2026'
      }
    ],
    internshipsCompleted: [
      {
        id: 'intern-1',
        role: 'Data Science & Machine Learning Intern',
        company: 'HealthAnalytics India Pvt Ltd',
        duration: 'May 2026 – July 2026 (8 Weeks)',
        certificateUrl: 'https://credentials.skillbridge.ai/intern/cert-rohan-2026.pdf',
        verified: true
      }
    ]
  },
  // Additional realistic student profiles
  ...Array.from({ length: 19 }).map((_, i) => {
    const names = [
      'Ananya Verma', 'Aarav Patel', 'Priya Iyer', 'Devansh Gupta', 'Sneha Reddy',
      'Karan Malhotra', 'Riya Sen', 'Aditya Joshi', 'Meera Deshmukh', 'Vikram Choudhury',
      'Ishita Nair', 'Siddharth Rao', 'Pooja Agarwal', 'Manish Pandey', 'Divya Kapoor',
      'Harsh Vardhan', 'Kavya Pillai', 'Tarun Saxena', 'Nisha Trivedi'
    ];
    const roles = ['AI/ML Engineer', 'Full Stack Developer', 'Data Analyst', 'Cloud Engineer', 'Cyber Security Analyst'];
    const insts = ['All India Institute of Ayurveda', 'IIT Delhi', 'DTU Delhi', 'BITS Pilani', 'NSUT Delhi'];
    const branches = ['Computer Science', 'Ayush Health Informatics', 'Biomedical Engineering', 'AI & Data Science'];

    return {
      id: `std-10${i + 2}`,
      name: names[i] || `Student ${i + 2}`,
      email: `${(names[i] || 'student').toLowerCase().replace(' ', '.')}@institution.edu.in`,
      avatar: `https://images.unsplash.com/photo-${1535713875002 + i * 2000}?auto=format&fit=crop&q=80&w=256`,
      institution: insts[i % insts.length],
      degree: 'B.Tech',
      branch: branches[i % branches.length],
      semester: 6 + (i % 3),
      cgpa: parseFloat((7.4 + (i * 0.11) % 2.4).toFixed(2)),
      readinessScore: 60 + ((i * 4) % 36),
      targetRole: roles[i % roles.length],
      careerInterests: ['Artificial Intelligence', 'Web Development', 'Cloud Computing', 'Biomedical Systems'],
      assessmentCompleted: i % 2 === 0,
      skills: MOCK_STANDARDIZED_SKILLS.slice(0, 8 + (i % 6)),
      topGaps: [
        {
          skillId: 'sk-4',
          skillName: 'TensorFlow / PyTorch',
          category: 'Technical' as const,
          currentLevel: 45,
          requiredLevel: 80,
          gapPercentage: 35,
          priority: 'High' as const,
          recommendedAction: 'Practice model fine-tuning and deployment.'
        }
      ],
      certifications: [
        {
          id: `cert-gen-${i}`,
          title: 'Full Stack Web Fundamentals',
          issuer: 'NPTEL',
          issueDate: '2026-01',
          verified: true,
          credentialId: `NPTEL-GEN-${i + 1000}`
        }
      ],
      projects: [
        {
          id: `proj-gen-${i}`,
          title: `${roles[i % roles.length]} Portfolio Project`,
          description: 'Capstone project implementing REST APIs, database schemas, and responsive UI components.',
          techStack: ['Python', 'SQL', 'React'],
          date: '2026-05'
        }
      ]
    };
  })
];
