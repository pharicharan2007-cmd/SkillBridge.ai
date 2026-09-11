from pydantic import BaseModel, EmailStr, validator
from typing import Optional, List

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str
    role: str # 'student', 'faculty', 'recruiter', 'institution'
    institution: Optional[str] = None
    
    @validator('email')
    def validate_academic_email(cls, v, values):
        role = values.get('role')
        if role in ['student', 'faculty', 'institution']:
            if not v.endswith('.ac.in') and not v.endswith('.edu.in'):
                raise ValueError('Academic users must use a valid .ac.in or .edu.in institutional email.')
        return v

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: EmailStr
    name: str
    role: str
    institution: Optional[str] = None
    access_token: str
    token_type: str = "bearer"
