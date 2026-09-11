from typing import List, Dict
from models.student import StudentProfile
from models.opportunity import OpportunityModel, MatchDetails

class DeterministicMatchingEngine:
    def __init__(self, weights: Dict[str, float] = None):
        if weights is None:
            self.weights = {
                "skills": 0.60,
                "eligibility": 0.25,
                "career_alignment": 0.15
            }
        else:
            self.weights = weights

    def calculate_match(self, student: StudentProfile, opportunity: OpportunityModel) -> MatchDetails:
        # 1. Skill Overlap (60%)
        required_skills = [s.lower() for s in opportunity.requiredSkills]
        student_skills = [s.name.lower() for s in student.skills]
        
        matched_skills = [s for s in required_skills if s in student_skills]
        missing_skills = [s for s in required_skills if s not in student_skills]
        
        skill_match_percentage = 0.0
        if len(required_skills) > 0:
            skill_match_percentage = (len(matched_skills) / len(required_skills)) * 100.0

        # 2. Eligibility (25%)
        # Check CGPA and Branch
        cgpa_eligible = student.cgpa >= opportunity.minimumCGPA
        branch_eligible = True
        if opportunity.eligibleBranches and len(opportunity.eligibleBranches) > 0:
            student_branch = student.branch.lower()
            allowed_branches = [b.lower() for b in opportunity.eligibleBranches]
            branch_eligible = any(allowed in student_branch or student_branch in allowed for allowed in allowed_branches)
        
        is_eligible = cgpa_eligible and branch_eligible
        eligibility_match_percentage = 100.0 if is_eligible else (50.0 if cgpa_eligible or branch_eligible else 0.0)

        # 3. Career Alignment (15%)
        career_alignment_percentage = 0.0
        student_interests = [i.lower() for i in (student.careerInterests or [])]
        target_role = (student.targetRole or "").lower()
        
        domain_match = opportunity.domain.lower() in target_role or any(opportunity.domain.lower() in i for i in student_interests)
        role_match = opportunity.title.lower() in target_role or target_role in opportunity.title.lower()
        
        if role_match and domain_match:
            career_alignment_percentage = 100.0
        elif role_match or domain_match:
            career_alignment_percentage = 70.0
        else:
            career_alignment_percentage = 30.0 # baseline
            
        # Calculate Final Score
        final_score = (
            (skill_match_percentage * self.weights["skills"]) +
            (eligibility_match_percentage * self.weights["eligibility"]) +
            (career_alignment_percentage * self.weights["career_alignment"])
        )
        
        why_recommended = "Matches your current skill profile well."
        if final_score >= 85:
            why_recommended = "Highly recommended based on strong skill alignment and career interests."
        elif final_score >= 70:
            why_recommended = "Good match with some easily bridgeable skill gaps."
        elif not is_eligible:
            why_recommended = "You do not meet the minimum eligibility criteria."

        return MatchDetails(
            finalMatchScore=round(final_score, 1),
            skillMatchPercentage=round(skill_match_percentage, 1),
            eligibilityMatchPercentage=round(eligibility_match_percentage, 1),
            careerInterestPercentage=round(career_alignment_percentage, 1),
            matchedSkills=matched_skills,
            missingSkills=missing_skills,
            isEligible=is_eligible,
            whyRecommended=why_recommended
        )

    def rank_opportunities(self, student: StudentProfile, opportunities: List[OpportunityModel]) -> List[OpportunityModel]:
        for opp in opportunities:
            match_details = self.calculate_match(student, opp)
            opp.matchScore = match_details.finalMatchScore
            opp.matchDetails = match_details
            
        return sorted(opportunities, key=lambda x: x.matchScore or 0, reverse=True)
