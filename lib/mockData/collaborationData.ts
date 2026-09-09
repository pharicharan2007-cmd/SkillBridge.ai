import { CollaborationInitiative, MentorshipSession } from '@/types';

export const MOCK_COLLABORATION_INITIATIVES: CollaborationInitiative[] = [
  {
    id: 'collab-1',
    title: 'Smart India Hackathon (SIH 2026) — Autonomous Systems & Edge AI',
    industryPartner: 'AICTE & Ministry of Education Innovation Cell',
    type: 'Hackathon',
    domain: 'Robotics & Edge Computing',
    description: 'Build real-time embedded firmware, perception pipelines, and edge AI inferencing solutions for autonomous UAV navigation and industrial automation.',
    rewardOrStipend: '₹5,00,000 Prize Pool + Pre-Placement Offers',
    registrationDeadline: '2026-10-15',
    dateOrDuration: 'Oct 24-26, 2026 (48-Hour National Hackathon)',
    participantsCount: 580,
    status: 'Open'
  },
  {
    id: 'collab-2',
    title: 'Live Industry Capstone: High-Throughput Distributed Cache with Raft Consensus',
    industryPartner: 'Razorpay Infrastructure Labs',
    type: 'Live Project',
    domain: 'Distributed Systems & Go',
    description: 'Engineering students collaborate with Razorpay core infrastructure architects to design an in-memory key-value store with Raft distributed consensus and sub-millisecond p99 latency.',
    rewardOrStipend: '₹35,000 Project Stipend + Direct Final Round Interview',
    registrationDeadline: '2026-09-30',
    dateOrDuration: '8 Weeks (Mentored Sprint)',
    participantsCount: 92,
    status: 'Open'
  },
  {
    id: 'collab-3',
    title: 'Executive Industry Masterclass: Optimizing LLM Serving with vLLM & Triton Inference Server',
    industryPartner: 'NVIDIA AI & Google Cloud Platform',
    type: 'Guest Lecture',
    domain: 'AI Systems & GPU Acceleration',
    description: 'Deep-dive masterclass by Senior AI Infrastructure Engineers covering continuous batching, PagedAttention, tensor parallelism, and multi-GPU cluster orchestration.',
    rewardOrStipend: 'Free Certificate of Attendance (NVIDIA DLI Endorsed)',
    registrationDeadline: '2026-09-24',
    dateOrDuration: 'Sept 25, 2026 • 6:00 PM IST',
    participantsCount: 1450,
    status: 'Upcoming'
  },
  {
    id: 'collab-4',
    title: 'Embedded Firmware Challenge: Real-Time CAN Bus Telemetry for Electric Powertrains',
    industryPartner: 'Ather Energy & Texas Instruments',
    type: 'Innovation Challenge',
    domain: 'Embedded Systems & Automotive IoT',
    description: 'Design a deterministic FreeRTOS task schedule and CAN protocol driver for high-speed sensor ingestion in next-generation electric vehicle battery management systems.',
    rewardOrStipend: '₹1,50,000 Cash Award + 6-Month Paid R&D Internship',
    registrationDeadline: '2026-10-08',
    dateOrDuration: 'Submissions due Oct 22, 2026',
    participantsCount: 165,
    status: 'Open'
  }
];

export const MOCK_MENTORSHIP_SESSIONS: MentorshipSession[] = [
  {
    id: 'mentor-1',
    mentorName: 'Vikramaditya Sengupta',
    mentorTitle: 'Principal Distributed Systems Engineer',
    company: 'Amazon Web Services (AWS)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    expertise: ['Distributed Systems', 'System Design (HLD/LLD)', 'Go & C++', 'Cloud Scalability'],
    availableSlots: ['Wed 5:00 PM', 'Fri 6:30 PM', 'Sat 11:00 AM'],
    sessionDuration: '45 mins (1-on-1)',
    rating: 4.9,
    bio: '14+ years designing high-throughput cloud primitives and storage architectures at AWS and Microsoft. Has mentored 150+ engineering students into Tier-1 product companies.'
  },
  {
    id: 'mentor-2',
    mentorName: 'Priya Sundaram',
    mentorTitle: 'Staff Software Architect & Tech Lead',
    company: 'Microsoft Cloud & AI',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    expertise: ['Full-Stack Engineering', 'Microservices', 'Docker & Kubernetes', 'Technical Interviews'],
    availableSlots: ['Tue 7:00 PM', 'Thu 5:30 PM'],
    sessionDuration: '30 mins (1-on-1)',
    rating: 4.8,
    bio: 'Core contributor to enterprise cloud services. Passionate about helping engineering graduates bridge academic DSA with production-grade software engineering.'
  },
  {
    id: 'mentor-3',
    mentorName: 'Ankit Saxena',
    mentorTitle: 'Director of Embedded Systems & Robotics R&D',
    company: 'Texas Instruments / DRDO Research Fellow',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    expertise: ['Embedded C/C++', 'FreeRTOS & ARM Cortex', 'IoT Hardware Design', 'Robotics & UAVs'],
    availableSlots: ['Mon 4:00 PM', 'Sat 3:00 PM'],
    sessionDuration: '45 mins',
    rating: 5.0,
    bio: 'Specialist in real-time embedded safety-critical systems. Mentors students on hardware-software co-design, FPGA synthesis, and high-reliability embedded firmware.'
  }
];
