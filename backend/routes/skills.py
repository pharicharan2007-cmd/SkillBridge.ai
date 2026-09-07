import os
import json
from typing import List, Optional
from fastapi import APIRouter, Query
from models.skill import SkillItem

router = APIRouter(prefix="/api/skills", tags=["Skills"])

SKILLS_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "skills.json")

def load_skills() -> List[SkillItem]:
    if os.path.exists(SKILLS_PATH):
        with open(SKILLS_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
            return [SkillItem(**item) for item in data]
    return []

_skills_cache = load_skills()

@router.get("", response_model=List[SkillItem], summary="Get standardized skill taxonomy")
def get_skills(
    category: Optional[str] = Query(None, description="Filter by category (e.g. technical, soft_skills)"),
    search: Optional[str] = Query(None, description="Search by skill name or alias")
):
    results = _skills_cache
    if category:
        results = [s for s in results if s.category.lower() == category.lower()]
    if search:
        q = search.lower()
        results = [
            s for s in results
            if q in s.name.lower() or any(q in alias.lower() for alias in (s.aliases or []))
        ]
    return results
