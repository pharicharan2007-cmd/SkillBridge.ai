-- Migration: 004_analytics_views.sql
-- Description: Create views for the Institution Analytics Dashboard

-- 1. Readiness Cohorts
-- Groups students into Tier 1, Tier 2, Tier 3 based on readiness_score
CREATE OR REPLACE VIEW public.view_readiness_cohorts AS
SELECT 
    institution,
    CASE 
        WHEN readiness_score >= 75 THEN 'Tier 1: Ready (75+)'
        WHEN readiness_score >= 50 THEN 'Tier 2: Developing (50-74)'
        ELSE 'Tier 3: Critical (<50)'
    END as tier,
    COUNT(*) as student_count
FROM public.students
GROUP BY institution, tier;

-- 2. Department Skill Intelligence
-- Aggregates readiness score per branch
CREATE OR REPLACE VIEW public.view_department_intelligence AS
SELECT 
    institution,
    branch as department_name,
    COUNT(*) as student_count,
    ROUND(AVG(readiness_score), 1) as avg_readiness
FROM public.students
GROUP BY institution, branch;

-- Note: Placement rate would require joining with an applications table, which we will build in Phase 3.
-- We can update this view in a later migration.

-- 3. Institution Metrics
-- Overall metrics per institution
CREATE OR REPLACE VIEW public.view_institution_metrics AS
SELECT 
    institution,
    COUNT(*) as total_students,
    ROUND(AVG(readiness_score), 1) as avg_readiness
FROM public.students
GROUP BY institution;

-- Set up RLS for views (views usually don't have direct RLS, but their underlying tables do)
-- However, we can restrict access using security definer functions if needed.
-- For this prototype, we'll keep it simple as the base tables have RLS.
