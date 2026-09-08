import { CollaborationInitiative, MentorshipSession } from '@/types';

export const MOCK_COLLABORATION_INITIATIVES: CollaborationInitiative[] = [
  {
    id: 'collab-1',
    title: 'National Ayush Smart Automation Hackathon 2026',
    industryPartner: 'Ministry of Ayush & AIIA Innovation Cell',
    type: 'Hackathon',
    domain: 'Smart Healthcare & Automation',
    description: 'Build automated solutions for herb identification, digital patient management, smart dosage tracking, and AI-assisted Ayurvedic clinical diagnosis.',
    rewardOrStipend: '₹5,00,000 Prize Pool + Incubation Support',
    registrationDeadline: '2026-10-10',
    dateOrDuration: 'Oct 24-26, 2026 (48-Hour Virtual Hackathon)',
    participantsCount: 420,
    status: 'Open'
  },
  {
    id: 'collab-2',
    title: 'Live Industry Capstone: Distributed EHR Storage with FHIR Standards',
    industryPartner: 'Apollo TeleHealth Labs',
    type: 'Live Project',
    domain: 'Healthcare Informatics',
    description: 'Students and faculty team up with Apollo health tech engineers to implement FHIR-compliant secure patient record microservices with role-based cryptographic access.',
    rewardOrStipend: '₹20,000 Project Completion Grant + PPO Opportunity',
    registrationDeadline: '2026-09-30',
    dateOrDuration: '8 Weeks (Mentored)',
    participantsCount: 65,
    status: 'Open'
  },
  {
    id: 'collab-3',
    title: 'Executive Industry Webinar: Deploying Large Language Models in Clinical Regimes',
    industryPartner: 'Google Health AI Research',
    type: 'Guest Lecture',
    domain: 'Generative AI & Clinical Safety',
    description: 'Distinguished lecture by Dr. Vivek Rajan, Principal Scientist at Google Health AI, covering model hallucination mitigation, medical safety guardrails, and real-time inference optimization.',
    rewardOrStipend: 'Free Certificate of Attendance',
    registrationDeadline: '2026-09-22',
    dateOrDuration: 'Sept 23, 2026 • 5:00 PM IST',
    participantsCount: 1250,
    status: 'Upcoming'
  },
  {
    id: 'collab-4',
    title: 'IoT Embedded Challenge: Smart Panchakarma Pressure Regulation',
    industryPartner: 'AyurTech MedDevices Pvt Ltd',
    type: 'Innovation Challenge',
    domain: 'Embedded Systems & Automation',
    description: 'Design a microcontroller algorithm and physical circuit schematic to maintain uniform fluid viscosity and thermal equilibrium in clinical therapy machines.',
    rewardOrStipend: '₹1,00,000 Cash Award + Paid Internship Offer',
    registrationDeadline: '2026-10-05',
    dateOrDuration: 'Submissions due Oct 18, 2026',
    participantsCount: 112,
    status: 'Open'
  }
];

export const MOCK_MENTORSHIP_SESSIONS: MentorshipSession[] = [
  {
    id: 'mentor-1',
    mentorName: 'Dr. Rajesh Nair',
    mentorTitle: 'Director of AI & Clinical Engineering',
    company: 'Philips Healthcare Informatics',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    expertise: ['AI in Medicine', 'Clinical Data Systems', 'Python & PyTorch', 'Career Trajectory'],
    availableSlots: ['Wed 4:00 PM', 'Fri 6:00 PM', 'Sat 11:00 AM'],
    sessionDuration: '45 mins (1-on-1)',
    rating: 4.9,
    bio: '15+ years leading biomedical and computational algorithms across Philips and GE Healthcare. Mentored 120+ students into Tier-1 product roles.'
  },
  {
    id: 'mentor-2',
    mentorName: 'Priya Sundaram',
    mentorTitle: 'Staff Software Architect',
    company: 'Microsoft Cloud & AI',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    expertise: ['Cloud Architecture', 'Distributed Systems', 'Go & Docker', 'Resume & System Design'],
    availableSlots: ['Tue 7:00 PM', 'Thu 5:30 PM'],
    sessionDuration: '30 mins (1-on-1)',
    rating: 4.8,
    bio: 'Core contributor to enterprise Azure services. Passionate about helping students bridge academic DSA with practical cloud engineering.'
  },
  {
    id: 'mentor-3',
    mentorName: 'Dr. Anand Kulkarni',
    mentorTitle: 'Senior Ayurvedic Pharmacologist & Phytochemist',
    company: 'Dabur Research & Development Foundation',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    expertise: ['Herbal Formulation Standardization', 'Ayush Clinical Trials', 'Faculty Research Collaborations'],
    availableSlots: ['Mon 3:00 PM', 'Sat 4:00 PM'],
    sessionDuration: '45 mins',
    rating: 5.0,
    bio: 'Advisor to AYUSH innovation committees. Specializes in guiding young researchers and faculty in translating classical pharmacology into modern clinical publications.'
  }
];
