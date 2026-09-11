# SkillBridge.ai - SIH 2026 Problem Statement 26044

### AI-Powered Academia–Industry Collaboration & Verified Talent Gateway

SkillBridge.ai is a **Local-First, Hybrid AI-powered platform** designed to bridge the gap between Indian technical institutions, students, faculties, and industry recruiters. Built specifically for the Indian engineering and higher education ecosystem, it establishes an authentic, multi-stakeholder credential verification and intelligent skill-matching architecture.

---

## 🌟 Why SkillBridge.ai? (Uniqueness vs. Internshala, LinkedIn & Traditional Job Boards)

While platforms like Internshala, Unstop, and LinkedIn serve as broad listing boards, they suffer from critical systemic flaws in the Indian college ecosystem. SkillBridge.ai solves these core problems:

| Dimension | Traditional Portals (Internshala, LinkedIn) | SkillBridge.ai |
| :--- | :--- | :--- |
| **Data Authenticity** | **Self-Reported Resumes**: Students can claim any skill or CGPA with zero verification. | **Triangulated Trust**: Skills and academic credentials are cross-verified by college faculties and institutional admins. |
| **Institutional Governance** | **Zero College Involvement**: Colleges and TPOs have no real-time visibility into student applications or outcomes. | **TPO & Faculty Console**: AICTE Institutional Directory allows colleges to verify faculty, track student cohorts, and endorse skills. |
| **Fraud & Shell Companies** | **High Scam Risk**: Fake companies, unpaid "training fee" scams, and unverified recruiters prey on students. | **Statutory Recruiter Vetting**: Companies must provide MCA21 Corporate CIN and GSTIN identifiers before recruiting. |
| **Matching Mechanism** | **Black-Box Keyword Filtering / ATS**: Resumes get discarded without explanation; students receive generic rejection emails. | **Explainable 60/20/20 Matching**: Transparent breakdown (60% Skill proficiency, 20% Eligibility, 20% Career alignment) with exact missing skill gap diagnosis. |
| **Academic Alignment** | **Western / Open Timelines**: Often assumes 3 to 6-month continuous availability. | **Indian Academic Calendar Compliant**: Tailored for mandatory AICTE internship slots (15-day industrial visits, 30-day winter, and 45-day summer terms). |
| **Feedback Loop** | **Dead End on Rejection**: No actionable feedback given on why a student was not selected. | **Actionable AI Career Coaching**: Generates a personalized capstone project and learning roadmap to bridge identified gaps. |

---

## 🏗️ Core Architecture & Features

### 1. Multi-Stakeholder Verified Portals
- **Students**: Dynamic skill portfolio, verified readiness score, and structured internship applications (15 / 30 / 45-day cycles).
- **Institutional Admins (TPO/Principal)**: AICTE Institutional Governance Directory to provision verified faculty members and monitor institutional talent readiness.
- **Faculties**: Statutory AICTE faculty verification badge, cohort skill audit, and academic credential endorsement.
- **Industry Recruiters**: Corporate hiring portal verified with MCA21 Corporate Identification Number (CIN) and GSTIN.

### 2. Triangulated Trust Model
No single stakeholder can manipulate the platform:
1. **Institutions** validate student academic records and faculty affiliations.
2. **Corporate Entities** validate market skill requirements and internship authenticity via statutory business registries.
3. **SkillBridge Engine** computes objective compatibility through verified data points.

### 3. Dual-Engine Intelligence Architecture
- **Client-Side Deterministic Match Engine (`matchEngine.ts`)**:
  - Runs with zero latency directly in the browser.
  - Transparent, explainable scoring formula:
    $$\text{Score} = (0.60 \times \text{Skill Match}) + (0.20 \times \text{Eligibility}) + (0.20 \times \text{Career Interest})$$
  - Ranks opportunities and explains exactly *why* a role is recommended and which skills are missing.
- **Hybrid Cloud Generative AI Career Advisor (`app/api/ai/coach`)**:
  - Leverages **Google Gemini 1.5 Flash** for personalized career roadmaps, gap remediation strategies, and resume project recommendations.
  - Built-in **Deterministic Semantic Fallback** ensuring 100% demo reliability without crashing even when offline or without API connectivity.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, Lucide Icons
- **State & Storage**: Local-First Architecture (`localStorage` persistent state with multi-persona switching)
- **AI & Algorithms**: Google Gemini 1.5 Flash API + Deterministic Client-Side Matching Algorithm
- **Backend Services**: Next.js API Routes / Optional FastAPI Python backend

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18.x or higher
- npm or yarn

### Installation & Local Run
1. Clone the repository:
   ```bash
   git clone https://github.com/pharicharan2007-cmd/SkillBridge.ai.git
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
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📋 Implementation Matrix
- [x] Client-Side Explainable Matching Engine (60% Skills / 20% Eligibility / 20% Interest)
- [x] Multi-Stakeholder Registration Gateway (Student, Faculty, Industry, Institution)
- [x] AICTE & MCA21 Credential Verification Badges
- [x] Indian Academic Standards Alignment (15, 30, 45-day internships)
- [x] Google Gemini 1.5 Flash AI Career Advisor with Offline Fallback
- [x] Local-First Multi-Persona State Synchronization
