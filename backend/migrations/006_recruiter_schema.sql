-- Migration: 006_recruiter_schema.sql

CREATE TABLE IF NOT EXISTS public.recruiters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Mock recruiter
INSERT INTO public.recruiters (id, company_name, contact_name, email) VALUES
('r0000000-0000-0000-0000-000000000001', 'Tata Consultancy Services', 'HR Manager', 'hr@tcs.com')
ON CONFLICT (email) DO NOTHING;

-- Industry Jobs (Opportunities)
CREATE TABLE IF NOT EXISTS public.industry_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recruiter_id UUID NOT NULL REFERENCES public.recruiters(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    required_skills JSONB, -- Array of skills e.g., ["Python", "React"]
    stipend TEXT,
    duration TEXT,
    location TEXT,
    seats INTEGER DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'Open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed some mock jobs
INSERT INTO public.industry_jobs (recruiter_id, title, description, required_skills, stipend, duration, location, seats) VALUES
('r0000000-0000-0000-0000-000000000001', 'Software Engineer Trainee', 'Looking for freshers with good problem-solving skills.', '["Java", "SQL", "Problem Solving"]', '₹35,000 / month', '6 months', 'Bangalore', 10),
('r0000000-0000-0000-0000-000000000001', 'Frontend Developer Intern', 'React developer needed for internal dashboard.', '["React", "JavaScript", "CSS"]', '₹25,000 / month', '3 months', 'Remote', 2);

-- Applications
CREATE TABLE IF NOT EXISTS public.job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES public.industry_jobs(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    match_score INTEGER NOT NULL, -- The percentage match between student readiness/skills and job requirements
    status TEXT NOT NULL DEFAULT 'Applied', -- 'Applied', 'Shortlisted', 'Interview', 'Offered', 'Rejected'
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(job_id, student_id)
);
