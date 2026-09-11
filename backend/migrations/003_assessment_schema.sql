-- Migration: 003_assessment_schema.sql
-- Description: Create tables for assessment flow, integrity tracking, and skill scoring

-- 1. Assessment Questions
CREATE TABLE IF NOT EXISTS public.assessment_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    discipline TEXT NOT NULL,
    phase TEXT NOT NULL CHECK (phase IN ('baseline', 'role_specific', 'soft_skills')),
    text TEXT NOT NULL,
    options JSONB NOT NULL, -- Array of string options
    correct_answer TEXT NOT NULL,
    points INTEGER DEFAULT 1,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Assessment Attempts
CREATE TABLE IF NOT EXISTS public.assessment_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    start_time TIMESTAMPTZ DEFAULT now(),
    end_time TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Assessment Answers
CREATE TABLE IF NOT EXISTS public.assessment_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attempt_id UUID NOT NULL REFERENCES public.assessment_attempts(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.assessment_questions(id) ON DELETE CASCADE,
    selected_option TEXT NOT NULL,
    time_spent_ms INTEGER NOT NULL,
    is_correct BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Assessment Audit Log (Immutable)
CREATE TABLE IF NOT EXISTS public.assessment_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attempt_id UUID NOT NULL REFERENCES public.assessment_attempts(id) ON DELETE CASCADE,
    final_score NUMERIC,
    verification_status TEXT NOT NULL,
    integrity_flags JSONB DEFAULT '{}'::jsonb,
    timestamp TIMESTAMPTZ DEFAULT now()
);

-- 5. Target Roles
CREATE TABLE IF NOT EXISTS public.target_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_name TEXT NOT NULL UNIQUE,
    required_skills JSONB NOT NULL, -- e.g., {"React": 80, "Node.js": 70}
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Skill Scores
CREATE TABLE IF NOT EXISTS public.skill_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    score NUMERIC NOT NULL,
    verification_status TEXT NOT NULL CHECK (verification_status IN ('unverified', 'auto_verified', 'cross_validated')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.assessment_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.target_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_scores ENABLE ROW LEVEL SECURITY;

-- Policies

-- Assessment Questions: readable by everyone, writable only by admins (assuming no specific admin role here, just generic read)
CREATE POLICY "Questions are viewable by everyone" ON public.assessment_questions FOR SELECT USING (true);

-- Assessment Attempts: users can view and create their own
CREATE POLICY "Users can view own attempts" ON public.assessment_attempts FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Users can create own attempts" ON public.assessment_attempts FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Users can update own attempts" ON public.assessment_attempts FOR UPDATE USING (auth.uid() = student_id);

-- Assessment Answers: users can view and create their own via attempt
CREATE POLICY "Users can view own answers" ON public.assessment_answers FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.assessment_attempts a WHERE a.id = attempt_id AND a.student_id = auth.uid())
);
CREATE POLICY "Users can create own answers" ON public.assessment_answers FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.assessment_attempts a WHERE a.id = attempt_id AND a.student_id = auth.uid())
);

-- Assessment Audit Log: immutable, readable by own student or institutions
CREATE POLICY "Users can view own audit logs" ON public.assessment_audit_log FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.assessment_attempts a WHERE a.id = attempt_id AND a.student_id = auth.uid())
);
CREATE POLICY "System can insert audit logs" ON public.assessment_audit_log FOR INSERT WITH CHECK (true);

-- Target Roles: readable by everyone
CREATE POLICY "Target roles viewable by everyone" ON public.target_roles FOR SELECT USING (true);

-- Skill Scores: readable by everyone, writable by system/student
CREATE POLICY "Skill scores viewable by everyone" ON public.skill_scores FOR SELECT USING (true);
CREATE POLICY "Users can manage own skill scores" ON public.skill_scores FOR ALL USING (auth.uid() = student_id) WITH CHECK (auth.uid() = student_id);

-- Also, ensure readiness_score exists on students
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS readiness_score NUMERIC DEFAULT 0;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS target_role_id UUID REFERENCES public.target_roles(id);
