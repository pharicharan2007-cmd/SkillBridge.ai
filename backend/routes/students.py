from typing import List
from fastapi import APIRouter, HTTPException, status
from models.student import StudentProfile, StudentUpdate
from services.student_store import student_store

router = APIRouter(prefix="/api/students", tags=["Students"])

@router.get("", response_model=List[StudentProfile], summary="List all students")
def get_students():
    return student_store.get_all()

@router.get("/{student_id}", response_model=StudentProfile, summary="Get student profile by ID")
def get_student(student_id: str):
    student = student_store.get_by_id(student_id)
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student with ID '{student_id}' not found"
        )
    return student

@router.put("/{student_id}", response_model=StudentProfile, summary="Update student profile")
def update_student(student_id: str, updates: StudentUpdate):
    updated = student_store.update(student_id, updates)
    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student with ID '{student_id}' not found"
        )
    return updated
