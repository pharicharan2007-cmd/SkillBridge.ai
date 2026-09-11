# SkillBridge.ai - SIH 2026 Problem Statement 26044

SkillBridge.ai is a Local-First, Edge AI-powered platform designed to bridge the gap between Indian academic institutions, students, faculties, and industry recruiters. It provides a secure, decentralized, and highly scalable multi-stakeholder credential verification and registration architecture built specifically for the Indian college ecosystem.

## Core Features & Architecture

### 1. Multi-Stakeholder Registration & Portals
- **Students**: Skill-matched dashboard, internship tracking (aligned with Indian standards: 15, 30, or 45 days), and portfolio management.
- **Institutional Admins**: Access to the AICTE Institutional Faculty Verification & Governance Directory to securely provision and verify faculties.
- **Faculties**: Dedicated portals with statutory AICTE verification badges and role-aware dashboards.
- **Industry Recruiters**: Corporate portals verified against MCA21 Corporate CIN and GSTIN records to ensure authenticity.

### 2. Triangulated Trust Model
To ensure maximum security and authenticity, the platform employs a Triangulated Trust verification system:
- **Institutions** are verified via AICTE IDs.
- **Corporate Recruiters** are validated using MCA21 CIN and GSTIN.
- **Faculties and Students** are cross-verified by their respective institutional admins before full platform access is granted.

### 3. Local-First & Edge AI 
- **Zero-Database Dependency**: The application leverages a robust Local-First architecture (using `localStorage` and decentralized caching) to maintain state, user sessions, and dynamic profiles without a central database bottleneck.
- **Edge AI**: Intelligent skill-matching and user profiling are processed locally on the client's device, ensuring privacy, offline capabilities, and instant responsiveness.

## Tech Stack
- **Framework**: Next.js (App Router), React
- **Styling**: Tailwind CSS
- **Data Architecture**: Local-First (`localStorage`), Edge AI
- **Deployment**: Node.js

## Getting Started

### Prerequisites
- Node.js v18.x or higher

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/SkillBridge.ai.git
   cd SkillBridge.ai
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Development Status
- [x] Implement Edge AI skill-matching.
- [x] Establish Multi-Stakeholder Registration Gateway.
- [x] Configure AICTE & MCA21 credential verification badges.
- [x] Align internship/training models to Indian academic cycles.
