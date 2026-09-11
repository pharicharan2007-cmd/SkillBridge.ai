-- Migration: 005_faculty_schema.sql

CREATE TABLE IF NOT EXISTS public.faculty (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    department TEXT NOT NULL,
    institution TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Links a faculty member to specific students (mentorship)
CREATE TABLE IF NOT EXISTS public.faculty_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    faculty_id UUID NOT NULL REFERENCES public.faculty(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'Mentor',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(faculty_id, student_id)
);

-- Mock some faculty and assignments for testing
INSERT INTO public.faculty (id, name, department, institution, email) VALUES
('f0000000-0000-0000-0000-000000000001', 'Dr. Arindam Bose', 'Computer Science and Engineering', 'Delhi Technological University', 'abose@dtu.ac.in')
ON CONFLICT (email) DO NOTHING;

-- FDPs and Research Grants
CREATE TABLE IF NOT EXISTS public.faculty_opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    provider TEXT NOT NULL,
    type TEXT NOT NULL, -- 'FDP', 'Research Grant'
    deadline DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'Open'
);

INSERT INTO public.faculty_opportunities (title, provider, type, deadline, status) VALUES
('AI/ML Faculty Development Program', 'AICTE', 'FDP', '2026-11-30', 'Open'),
('Quantum Computing Fundamentals', 'IIT Bombay', 'FDP', '2026-10-15', 'Open'),
('Smart City Infrastructure Research', 'DST', 'Research Grant', '2026-12-01', 'Open');

-- Faculty proposals for opportunities
CREATE TABLE IF NOT EXISTS public.faculty_proposals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    faculty_id UUID NOT NULL REFERENCES public.faculty(id),
    opportunity_id UUID NOT NULL REFERENCES public.faculty_opportunities(id),
    status TEXT NOT NULL DEFAULT 'Pending',
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
