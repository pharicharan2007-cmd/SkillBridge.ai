from typing import List, Optional, Any, Dict
from pydantic import BaseModel, Field

class StudentSkill(BaseModel):
    id: Optional[str] = None
    name: str
    category: Optional[str] = "Technical"
    level: int = 50
    verified: Optional[bool] = False
    demandLevel: Optional[str] = "High"

class StudentCertification(BaseModel):
    id: Optional[str] = None
    title: str
    issuer: str
    issueDate: Optional[str] = None
    verified: Optional[bool] = True

class StudentProject(BaseModel):
    id: Optional[str] = None
    title: str
    techStack: Optional[List[str]] = []
    description: Optional[str] = ""

class SkillGapItemModel(BaseModel):
    skillId: Optional[str] = None
    skillName: str
    category: Optional[str] = "Technical"
    currentLevel: int
    requiredLevel: int
    gapPercentage: int
    priority: Optional[str] = "High"
    recommendedAction: Optional[str] = ""

class StudentProfile(BaseModel):
    id: str
    name: str
    email: str
    avatar: Optional[str] = ""
    college: str
    institution: Optional[str] = None
    degree: str
    branch: str
    year: int = 4
    semester: Optional[int] = 7
    cgpa: float = 8.0
    readiness_score: int = 70
    readinessScore: Optional[int] = None
    target_role: Optional[str] = "Software Engineer"
    targetRole: Optional[str] = None
    interests: List[str] = []
    careerInterests: Optional[List[str]] = None
    skills: List[StudentSkill] = []
    certifications: List[StudentCertification] = []
    projects: List[StudentProject] = []
    top_gaps: Optional[List[SkillGapItemModel]] = []
    topGaps: Optional[List[SkillGapItemModel]] = []
    assessmentCompleted: Optional[bool] = False
    lastAssessmentDate: Optional[str] = None

    def model_post_init(self, __context: Any) -> None:
        if self.institution is None:
            self.institution = self.college
        if self.readinessScore is None:
            self.readinessScore = self.readiness_score
        if self.targetRole is None:
            self.targetRole = self.target_role
        if self.careerInterests is None:
            self.careerInterests = self.interests
        if self.topGaps is None or len(self.topGaps) == 0:
            self.topGaps = self.top_gaps

class StudentUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    college: Optional[str] = None
    degree: Optional[str] = None
    branch: Optional[str] = None
    year: Optional[int] = None
    cgpa: Optional[float] = None
    target_role: Optional[str] = None
    interests: Optional[List[str]] = None
    skills: Optional[List[StudentSkill]] = None
    certifications: Optional[List[StudentCertification]] = None
    projects: Optional[List[StudentProject]] = None
    readiness_score: Optional[int] = None
