from typing import List, Optional
from pydantic import BaseModel

class SkillItem(BaseModel):
    id: str
    name: str
    category: str
    aliases: Optional[List[str]] = []
    demand_level: Optional[str] = "High"
    level: Optional[int] = 0
    verified: Optional[bool] = False
    demandLevel: Optional[str] = None
