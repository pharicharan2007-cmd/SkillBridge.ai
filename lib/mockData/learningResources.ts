import { LearningResource } from '@/types';

export const MOCK_LEARNING_RESOURCES: LearningResource[] = [
  {
    id: 'lr-1',
    title: 'NPTEL Deep Learning (IIT Madras) — 12-Week Certification',
    provider: 'NPTEL / IIT Madras',
    type: 'Certification',
    duration: '12 Weeks (Self-paced)',
    level: 'Intermediate',
    skillAddressed: 'TensorFlow / PyTorch',
    rating: 4.9,
    enrollUrl: 'https://nptel.ac.in/courses/106106213',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=400',
    isFree: true
  },
  {
    id: 'lr-2',
    title: 'NVIDIA DLI: CUDA Fundamentals & GPU-Accelerated Computing',
    provider: 'NVIDIA Deep Learning Institute',
    type: 'Certification',
    duration: '6 Weeks (40 Hours)',
    level: 'Intermediate',
    skillAddressed: 'CUDA & GPU Programming',
    rating: 4.8,
    enrollUrl: 'https://courses.nvidia.com',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400',
    isFree: false
  },
  {
    id: 'lr-3',
    title: 'MIT 6.824: Distributed Systems (Lectures + Labs)',
    provider: 'MIT OpenCourseWare',
    type: 'Course',
    duration: '8 Weeks (Self-paced)',
    level: 'Advanced',
    skillAddressed: 'Distributed Systems',
    rating: 4.9,
    enrollUrl: 'https://pdos.csail.mit.edu/6.824/',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=400',
    isFree: true
  },
  {
    id: 'lr-4',
    title: 'NPTEL VLSI Design (IIT Kharagpur) — FPGA & RTL',
    provider: 'NPTEL / IIT Kharagpur',
    type: 'Certification',
    duration: '8 Weeks',
    level: 'Intermediate',
    skillAddressed: 'Verilog / VHDL',
    rating: 4.8,
    enrollUrl: 'https://nptel.ac.in/courses/117105080',
    image: 'https://images.unsplash.com/photo-1580983218765-f663bec07b37?auto=format&fit=crop&q=80&w=400',
    isFree: true
  },
  {
    id: 'lr-5',
    title: 'AWS Certified Solutions Architect — Associate Track',
    provider: 'AWS Academy (via NPTEL)',
    type: 'Certification',
    duration: '6 Weeks (30 Hours)',
    level: 'Beginner',
    skillAddressed: 'Cloud Computing (AWS / GCP)',
    rating: 4.7,
    enrollUrl: 'https://aws.amazon.com/training/awsacademy/',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400',
    isFree: true
  },
  {
    id: 'lr-6',
    title: 'Infosys Springboard: DevOps & Containerisation Bootcamp',
    provider: 'Infosys Springboard',
    type: 'Bootcamp',
    duration: '4 Weeks (Online + Project)',
    level: 'Intermediate',
    skillAddressed: 'Docker & DevOps',
    rating: 4.6,
    enrollUrl: 'https://infyspringboard.com',
    image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&q=80&w=400',
    isFree: true,
    publishedByIndustry: 'Infosys Ltd.'
  }
];
