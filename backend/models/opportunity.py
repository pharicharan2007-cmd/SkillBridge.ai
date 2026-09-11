from pydantic import BaseModel
from typing import Optional, List

class MatchDetails(BaseModel):
    finalMatchScore: Optional[float] = None
    skillMatchPercentage: float
    eligibilityMatchPercentage: float
    careerInterestPercentage: float
    matchedSkills: List[str]
    missingSkills: List[str]
    isEligible: bool
    whyRecommended: str

class OpportunityModel(BaseModel):
    id: str
    title: str
    company: str
    companyLogo: Optional[str] = None
    location: str
    type: str # 'Internship' | 'Full-time' | 'Remote Internship'
    stipend: str
    duration: str
    deadline: str
    domain: str
    engineeringCluster: Optional[str] = None
    requiredSkills: List[str]
    minimumCGPA: float
    eligibleBranches: List[str]
    description: str
    responsibilities: List[str]
    perks: List[str]
    postedBy: Optional[str] = None
    matchScore: Optional[float] = None
    matchDetails: Optional[MatchDetails] = None
