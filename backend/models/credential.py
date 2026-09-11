from pydantic import BaseModel
from typing import Optional

class CredentialModel(BaseModel):
    id: str
    studentId: str
    type: str # 'CERTIFICATE' | 'MARKSHEET' | 'PROJECT_VERIFICATION' | 'COLLEGE_ID'
    issuer: str
    issueDate: str
    verified: bool
    verifiedBy: Optional[str] = None # Name of faculty or institution admin
    verificationDate: Optional[str] = None
    credentialUrl: Optional[str] = None
    metadata: Optional[dict] = {}

class DocumentModel(BaseModel):
    id: str
    studentId: str
    studentName: str
    studentEmail: str
    studentBranch: Optional[str] = None
    studentCgpa: Optional[float] = None
    studentEnrollmentNumber: Optional[str] = None
    category: str # 'certifications' | 'transcripts' | 'internship_reports' | 'resumes' | 'id_proofs'
    title: str
    filePath: str
    issuer: Optional[str] = None
    certificateId: Optional[str] = None
    verificationStatus: str # 'verified' | 'rejected' | 'needs_review' | 'pending'
    verificationMethod: str # 'api_check' | 'db_match' | 'platform_sourced' | 'diagnostic_test' | 'ocr_match' | 'manual_exception'
    flaggedReason: Optional[str] = None
    extractedData: Optional[dict] = {}
    submittedAt: str
    verifiedAt: Optional[str] = None
    verifiedBy: Optional[str] = None

class VerificationLogModel(BaseModel):
    id: str
    documentId: str
    studentId: str
    oldStatus: str
    newStatus: str
    method: str
    reason: Optional[str] = None
    timestamp: str
    actor: str
