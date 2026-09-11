import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="SkillBridge API",
    description="Backend API for SkillBridge.ai — Academia–Industry Collaboration Platform",
    version="1.0.0"
)

# CORS configuration allowing Next.js frontend
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    os.getenv("FRONTEND_URL", "http://localhost:3000")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", summary="Root endpoint")
def read_root():
    return {"message": "SkillBridge API is running"}

@app.get("/health", summary="Health check endpoint")
def health_check():
    return {"status": "ok"}

# Register routers
from routes.students import router as students_router
from routes.skills import router as skills_router
from routes.auth import router as auth_router
from routes.ai import router as ai_router

app.include_router(students_router)
app.include_router(skills_router)
app.include_router(auth_router)
app.include_router(ai_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
