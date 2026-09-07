import os
import json
from typing import Dict, Optional, List
from models.student import StudentProfile, StudentUpdate

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "students.json")

class StudentStore:
    def __init__(self):
        self._students: Dict[str, StudentProfile] = {}
        self.load()

    def load(self):
        if os.path.exists(DATA_PATH):
            with open(DATA_PATH, "r", encoding="utf-8") as f:
                data = json.load(f)
                for item in data:
                    student = StudentProfile(**item)
                    self._students[student.id] = student

    def get_all(self) -> List[StudentProfile]:
        return list(self._students.values())

    def get_by_id(self, student_id: str) -> Optional[StudentProfile]:
        return self._students.get(student_id)

    def update(self, student_id: str, updates: StudentUpdate) -> Optional[StudentProfile]:
        student = self._students.get(student_id)
        if not student:
            return None
        
        data_dict = student.model_dump()
        update_dict = updates.model_dump(exclude_unset=True)

        # Handle compatibility fields
        if "college" in update_dict:
            update_dict["institution"] = update_dict["college"]
        if "interests" in update_dict:
            update_dict["careerInterests"] = update_dict["interests"]
        if "target_role" in update_dict:
            update_dict["targetRole"] = update_dict["target_role"]
        if "readiness_score" in update_dict:
            update_dict["readinessScore"] = update_dict["readiness_score"]

        data_dict.update(update_dict)
        updated_student = StudentProfile(**data_dict)
        self._students[student_id] = updated_student
        return updated_student

student_store = StudentStore()
