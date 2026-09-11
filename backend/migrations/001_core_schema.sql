-- Migration: 001_core_schema.sql
-- Core tables missing in the database

CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    institution TEXT NOT NULL,
    branch TEXT,
    department_id UUID,
    readiness_score INTEGER DEFAULT 0,
    target_role TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Mock some students so the analytics and matching engines have data
INSERT INTO public.students (id, name, email, institution, branch, readiness_score, target_role) VALUES
('s0000000-0000-0000-0000-000000000001', 'Aditya Verma', 'aditya@dtu.ac.in', 'Delhi Technological University', 'Computer Science and Engineering', 82, 'Software Engineer'),
('s0000000-0000-0000-0000-000000000002', 'Sahil Agarwal', 'sahil@dtu.ac.in', 'Delhi Technological University', 'Computer Science and Engineering', 71, 'Frontend Developer'),
('s0000000-0000-0000-0000-000000000003', 'Priya Sharma', 'priya@dtu.ac.in', 'Delhi Technological University', 'Mechanical Engineering', 65, 'Mechanical Engineer'),
('s0000000-0000-0000-0000-000000000004', 'Rahul Kumar', 'rahul@dtu.ac.in', 'Delhi Technological University', 'Electrical Engineering', 48, 'Electrical Engineer'),
('s0000000-0000-0000-0000-000000000005', 'Neha Gupta', 'neha@dtu.ac.in', 'Delhi Technological University', 'Computer Science and Engineering', 91, 'Machine Learning Engineer')
ON CONFLICT (email) DO NOTHING;

-- Document Records (Certificates, Marksheets)
CREATE TABLE IF NOT EXISTS public.document_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL,
    title TEXT NOT NULL,
    file_path TEXT NOT NULL,
    verification_status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'verified', 'rejected', 'needs_review'
    verification_method TEXT,
    flagged_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Mock a pending document for the Exception Queue
INSERT INTO public.document_records (id, student_id, document_type, title, file_path, verification_status) VALUES
('d0000000-0000-0000-0000-000000000001', 's0000000-0000-0000-0000-000000000001', 'certifications', 'AWS Solutions Architect', '/docs/aws-cert.pdf', 'needs_review')
ON CONFLICT DO NOTHING;

-- Skills
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO public.skills (id, name, category) VALUES
('sk000000-0000-0000-0000-000000000001', 'Python', 'Technical'),
('sk000000-0000-0000-0000-000000000002', 'React', 'Technical'),
('sk000000-0000-0000-0000-000000000003', 'Machine Learning', 'Technical')
ON CONFLICT (name) DO NOTHING;

-- Skill Scores
CREATE TABLE IF NOT EXISTS public.skill_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    proficiency_score INTEGER NOT NULL,
    verification_status TEXT NOT NULL,
    verification_source TEXT,
    UNIQUE(student_id, skill_id)
);

INSERT INTO public.skill_scores (student_id, skill_id, proficiency_score, verification_status) VALUES
('s0000000-0000-0000-0000-000000000001', 'sk000000-0000-0000-0000-000000000001', 85, 'auto_verified'),
('s0000000-0000-0000-0000-000000000001', 'sk000000-0000-0000-0000-000000000002', 78, 'cross_validated')
ON CONFLICT DO NOTHING;
