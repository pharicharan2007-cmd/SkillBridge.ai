import { FacultyOpportunity, FacultyApplication } from '@/types';

export const MOCK_FACULTY_OPPORTUNITIES: FacultyOpportunity[] = [
  {
    id: 'fac-1',
    title: 'Industry Research Fellowship in AI-Driven Botanical Standardization',
    organization: 'Himalaya Wellness R&D Centers',
    location: 'Bengaluru, Karnataka (Hybrid)',
    type: 'Collaborative Research',
    domain: 'Ayush & Herbal Informatics',
    stipendOrGrant: '₹3,50,000 Research Grant',
    duration: '6 Months',
    deadline: '2026-10-15',
    eligibility: 'Assistant / Associate Professors in Ayurveda, Biotechnology, or Pharmacognosy',
    description: 'Collaborative research sabbatical focusing on computer vision and chromatographic spectroscopy to automate quality control in herbal extract supply chains.',
    deliverables: [
      'Joint peer-reviewed patent/publication',
      'Standardized computer-vision identification dataset for 50 medicinal plants',
      'Final technical whitepaper for Ministry of Ayush regulatory alignment'
    ],
    sponsoredBy: 'Ministry of Ayush & Himalaya Wellness',
    seats: 4
  },
  {
    id: 'fac-2',
    title: 'Industrial Sabbatical: Cloud Distributed Systems & Kubernetes',
    organization: 'Tata Consultancy Services - Cloud Innovations Lab',
    location: 'Hyderabad, Telangana',
    type: 'Faculty Internship',
    domain: 'Cloud & Distributed Systems',
    stipendOrGrant: '₹60,000 / month Sabbatical Honorarium',
    duration: '2 Months (Summer / Winter Break)',
    deadline: '2026-10-30',
    eligibility: 'Faculty with 3+ years teaching Computer Science, Cloud, or Distributed Computing',
    description: 'Immersive industrial internship embedding engineering faculty inside real-world cloud modernization pipelines and enterprise microservices architecture.',
    deliverables: [
      'Live deployment of multi-region fault tolerant microservices',
      'Curriculum modernization roadmap for university syllabus update',
      'Industry-verified case study for classroom pedagogy'
    ],
    sponsoredBy: 'TCS Industry-Academia Council',
    seats: 8
  },
  {
    id: 'fac-3',
    title: 'National FDP: AI & Machine Learning in Clinical Decision Support Systems',
    organization: 'All India Institute of Ayurveda (AIIA) & IIT Delhi',
    location: 'New Delhi (Hybrid / On-Campus)',
    type: 'Faculty Development Program (FDP)',
    domain: 'Healthcare AI & Smart Automation',
    stipendOrGrant: 'Fully Sponsored + Travel & Accommodation',
    duration: '2 Weeks (Intensive)',
    deadline: '2026-09-28',
    eligibility: 'Faculty from Engineering, Medical, Ayush, and Pharmacy colleges',
    description: 'Comprehensive Ministry of Ayush-supported FDP training faculty in predictive modeling, clinical EHR analytics, diagnostic NLP, and ethical AI integration in healthcare.',
    deliverables: [
      'Certificate of Master Trainer in Clinical AI',
      'Hands-on laboratory manual and reusable Jupyter notebooks for institutional teaching',
      'Eligibility for joint institutional research seed funds'
    ],
    sponsoredBy: 'All India Institute of Ayurveda',
    seats: 35
  },
  {
    id: 'fac-4',
    title: 'Consultancy: IoT Sensor Array for Automated Panchakarma Monitoring',
    organization: 'AyurTech MedDevices Pvt Ltd',
    location: 'Pune / Remote',
    type: 'Consultancy Project',
    domain: 'IoT & Smart Automation',
    stipendOrGrant: '₹1,80,000 Consultancy Honorarium',
    duration: '3 Months',
    deadline: '2026-11-10',
    eligibility: 'Faculty with expertise in Embedded Systems, IoT, or Biomedical Engineering',
    description: 'Industry consultancy inviting academic experts to design and calibrate non-invasive sensor protocols for automated temperature and pressure control in clinical Ayurvedic procedures.',
    deliverables: [
      'Sensor calibration specification doc',
      'Validation test report for prototype hardware',
      'Institutional consultancy revenue sharing (60:40 model)'
    ],
    sponsoredBy: 'AyurTech Healthcare Solutions',
    seats: 2
  },
  {
    id: 'fac-5',
    title: 'Industrial Training on Full Stack Microservices & DevOps CI/CD',
    organization: 'Infosys Springboard Campus Connect',
    location: 'Mysuru Campus / Virtual',
    type: 'Industrial Training',
    domain: 'Software Engineering',
    stipendOrGrant: 'Sponsored Training + ₹25,000 Completion Stipend',
    duration: '4 Weeks',
    deadline: '2026-10-20',
    eligibility: 'Faculty teaching Software Engineering, Web Development, or DevOps',
    description: 'Direct hands-on training on enterprise DevOps, Docker, Kubernetes, Next.js, and CI/CD pipelines, enabling academicians to guide high-impact industry capstone projects.',
    deliverables: [
      'Industry DevOps Educator Certification',
      'Industry capstone project repository access for students',
      'Mentorship access for 50 student projects'
    ],
    sponsoredBy: 'Infosys Ltd',
    seats: 20
  }
];

export const MOCK_FACULTY_APPLICATIONS: FacultyApplication[] = [
  {
    id: 'f-app-1',
    opportunityId: 'fac-1',
    opportunityTitle: 'Industry Research Fellowship in AI-Driven Botanical Standardization',
    organization: 'Himalaya Wellness R&D Centers',
    type: 'Collaborative Research',
    facultyName: 'Dr. Sunita Deshmukh',
    facultyDesignation: 'Associate Professor',
    department: 'Pharmacognosy & Phytochemistry',
    institution: 'All India Institute of Ayurveda, New Delhi',
    appliedDate: '2026-09-02',
    status: 'Proposal Submitted',
    proposalNote: 'Submitted research proposal on hyperspectral imaging for medicinal plant leaf quality assessment.'
  },
  {
    id: 'f-app-2',
    opportunityId: 'fac-3',
    opportunityTitle: 'National FDP: AI & Machine Learning in Clinical Decision Support Systems',
    organization: 'All India Institute of Ayurveda (AIIA) & IIT Delhi',
    type: 'Faculty Development Program (FDP)',
    facultyName: 'Dr. Sunita Deshmukh',
    facultyDesignation: 'Associate Professor',
    department: 'Pharmacognosy & Phytochemistry',
    institution: 'All India Institute of Ayurveda, New Delhi',
    appliedDate: '2026-08-25',
    status: 'Approved',
    proposalNote: 'Selected under Ministry of Ayush sponsored quota. Session starts next month.'
  }
];
