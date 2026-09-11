import { StudentProfile, Opportunity } from '@/types';

export interface MatchResult {
  finalMatchScore: number;
  skillMatchScore: number;
  eligibilityScore: number;
  careerInterestScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  isEligible: boolean;
  whyRecommended: string;
}

export function calculateOpportunityMatch(
  student: StudentProfile,
  opportunity: Opportunity
): MatchResult {
  const reqSkills = opportunity.requiredSkills || [];
  
  // 1. Skill Match Calculation (60% Weight)
  const studentSkillMap = new Map<string, number>();
  student.skills.forEach(s => {
    studentSkillMap.set(s.name.toLowerCase(), s.level);
  });

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];
  let totalSkillProficiency = 0;

  reqSkills.forEach(reqSkillName => {
    const normalizedReq = reqSkillName.toLowerCase();
    
    // Check if student has skill or similar skill
    let found = false;
    for (const [sName, sLevel] of studentSkillMap.entries()) {
      if (sName.includes(normalizedReq) || normalizedReq.includes(sName)) {
        if (sLevel >= 55) {
          matchedSkills.push(reqSkillName);
          totalSkillProficiency += Math.min(100, sLevel);
          found = true;
          break;
        }
      }
    }

    if (!found) {
      missingSkills.push(reqSkillName);
    }
  });

  const skillCoverageRatio = reqSkills.length > 0 ? (matchedSkills.length / reqSkills.length) : 1;
  const avgProficiencyRatio = matchedSkills.length > 0 ? (totalSkillProficiency / (matchedSkills.length * 100)) : 0;
  
  // Combine coverage (70%) and proficiency (30%)
  const skillMatchScore = Math.round((skillCoverageRatio * 70 + avgProficiencyRatio * 30));

  // 2. Eligibility Calculation (20% Weight)
  let eligibilityScore = 100;
  const isCgpaEligible = student.cgpa >= opportunity.minimumCGPA;
  const isClusterEligible = !!(opportunity.engineeringCluster && student.engineeringCluster && opportunity.engineeringCluster === student.engineeringCluster);

  const isBranchEligible = isClusterEligible || opportunity.eligibleBranches.some(b => {
    const bLower = b.toLowerCase();
    const sLower = (student.branch || '').toLowerCase();
    if (bLower.includes('all')) return true;
    if (sLower.includes(bLower) || bLower.includes(sLower)) return true;

    // Check engineering discipline keywords (e.g. ECE / Electronics / VLSI)
    const keywords = ['electronics', 'vlsi', 'embedded', 'ece', 'mechanical', 'robotics', 'automotive', 'civil', 'structural', 'electrical', 'computer', 'software', 'data science'];
    const matchedKeyword = keywords.find(k => bLower.includes(k) && sLower.includes(k));
    return !!matchedKeyword;
  });

  if (!isCgpaEligible) eligibilityScore -= 40;
  if (!isBranchEligible) eligibilityScore -= 40;
  eligibilityScore = Math.max(0, eligibilityScore);
  const isEligible = isCgpaEligible && isBranchEligible;

  // 3. Career Interest Calculation (20% Weight)
  let careerInterestScore = 50; // Default baseline
  const targetRoleMatch = student.targetRole.toLowerCase().includes(opportunity.domain.toLowerCase()) ||
    opportunity.title.toLowerCase().includes(student.targetRole.toLowerCase());
  
  const interestMatch = student.careerInterests.some(ci => 
    opportunity.domain.toLowerCase().includes(ci.toLowerCase()) || 
    opportunity.title.toLowerCase().includes(ci.toLowerCase())
  );

  if (targetRoleMatch && interestMatch) {
    careerInterestScore = 100;
  } else if (targetRoleMatch || interestMatch) {
    careerInterestScore = 80;
  }

  // 4. Final Match Score = 60% Skill Match + 20% Eligibility + 20% Career Interest
  const finalMatchScore = Math.round(
    0.60 * skillMatchScore + 0.20 * eligibilityScore + 0.20 * careerInterestScore
  );

  // 5. Why Recommended Rationale Generation
  let whyRecommended = '';
  if (matchedSkills.length >= 2) {
    whyRecommended = `Your ${matchedSkills.slice(0, 2).join(' and ')} skills strongly match the role requirements.`;
  } else if (matchedSkills.length === 1) {
    whyRecommended = `Your ${matchedSkills[0]} proficiency aligns well with this position.`;
  } else {
    whyRecommended = `This role aligns with your target career path in ${opportunity.domain}.`;
  }

  return {
    finalMatchScore,
    skillMatchScore,
    eligibilityScore,
    careerInterestScore,
    matchedSkills,
    missingSkills,
    isEligible,
    whyRecommended
  };
}
