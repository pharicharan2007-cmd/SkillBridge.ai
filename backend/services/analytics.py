from typing import List, Dict
from models.student import StudentProfile

class AnalyticsService:
    @staticmethod
    def precompute_department_rollups(students: List[StudentProfile]) -> List[Dict]:
        departments = {}
        for student in students:
            branch = student.branch
            if branch not in departments:
                departments[branch] = {
                    "name": branch,
                    "totalStudents": 0,
                    "totalReadiness": 0,
                    "skills_count": {},
                    "gaps_count": {}
                }
            
            departments[branch]["totalStudents"] += 1
            departments[branch]["totalReadiness"] += (student.readinessScore or student.readiness_score or 0)
            
            # Aggregate skills
            for skill in student.skills:
                s_name = skill.name
                departments[branch]["skills_count"][s_name] = departments[branch]["skills_count"].get(s_name, 0) + 1
                
            # Aggregate gaps
            for gap in (student.topGaps or []):
                g_name = gap.skillName
                departments[branch]["gaps_count"][g_name] = departments[branch]["gaps_count"].get(g_name, 0) + 1

        rollups = []
        for branch, data in departments.items():
            total_students = data["totalStudents"]
            avg_readiness = round(data["totalReadiness"] / total_students, 1) if total_students > 0 else 0
            
            # Get top 3 skills
            top_skills = sorted(data["skills_count"].items(), key=lambda x: x[1], reverse=True)[:3]
            top_skills_names = [k for k, v in top_skills]
            
            # Get top 3 gaps
            top_gaps = sorted(data["gaps_count"].items(), key=lambda x: x[1], reverse=True)[:3]
            top_gaps_names = [k for k, v in top_gaps]
            
            rollups.append({
                "name": branch,
                "totalStudents": total_students,
                "avgReadinessScore": avg_readiness,
                "placementRate": 0.0, # Would be calculated from actual placements
                "activeInternships": 0, # Would be calculated from active internships
                "topSkills": top_skills_names,
                "criticalGaps": top_gaps_names
            })
            
        return rollups
