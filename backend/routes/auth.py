from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from models.auth import UserCreate, UserLogin, UserResponse
from datetime import datetime, timedelta
import jwt

router = APIRouter(prefix="/auth", tags=["Authentication"])

SECRET_KEY = "skillbridge-super-secret-key-for-sih-2026"
ALGORITHM = "HS256"

# Mock database
users_db = {}

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=1440) # 24 hours
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@router.post("/register", response_model=UserResponse)
def register_user(user: UserCreate):
    if user.email in users_db:
        raise HTTPException(status_code=400, detail="Email already registered")
        
    user_id = f"usr_{len(users_db) + 1}"
    users_db[user.email] = {
        "id": user_id,
        "email": user.email,
        "password": user.password, # In real app, hash this!
        "name": user.name,
        "role": user.role,
        "institution": user.institution
    }
    
    access_token = create_access_token(data={"sub": user.email, "role": user.role})
    
    return UserResponse(
        id=user_id,
        email=user.email,
        name=user.name,
        role=user.role,
        institution=user.institution,
        access_token=access_token
    )

@router.post("/login", response_model=UserResponse)
def login_user(user: UserLogin):
    db_user = users_db.get(user.email)
    if not db_user or db_user["password"] != user.password:
        raise HTTPException(status_code=401, detail="Invalid email or password")
        
    access_token = create_access_token(data={"sub": db_user["email"], "role": db_user["role"]})
    
    return UserResponse(
        id=db_user["id"],
        email=db_user["email"],
        name=db_user["name"],
        role=db_user["role"],
        institution=db_user.get("institution"),
        access_token=access_token
    )

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")

def require_role(allowed_roles: list[str]):
    def role_checker(token: str): # Usually we'd use OAuth2PasswordBearer
        payload = verify_token(token)
        if payload.get("role") not in allowed_roles:
            raise HTTPException(status_code=403, detail="Not enough permissions")
        return payload
    return role_checker
