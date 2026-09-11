from pydantic import BaseModel
from typing import Optional, List
from .opportunity import MatchDetails

class ApplicationTimelineStep(BaseModel):
    step: str
    date: str
    completed: bool

class ApplicationModel(BaseModel):
    id: str
    opportunityId: str
    opportunityTitle: str
    company: str
    studentId: str
    studentName: str
    studentEmail: str
    studentBranch: str
    studentCgpa: float
    appliedDate: str
    status: str # 'Submitted' | 'Under Review' | 'Interview Scheduled' | 'Shortlisted' | 'Offered' | 'Rejected'
    matchScoreAtApplication: float
    matchDetails: Optional[MatchDetails] = None
    notes: Optional[str] = None
    timeline: List[ApplicationTimelineStep] = []
