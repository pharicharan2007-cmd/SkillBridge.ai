-- Migration: 002_scoped_institution_rls.sql
-- Description: Scopes Institution Admin view of document_records to their own institution.

ALTER TABLE IF EXISTS public.students 
ADD COLUMN IF NOT EXISTS institution_id UUID REFERENCES public.institutions(id) ON DELETE SET NULL;

ALTER TABLE IF EXISTS public.users
ADD COLUMN IF NOT EXISTS institution_id UUID REFERENCES public.institutions(id) ON DELETE SET NULL;

DROP POLICY IF EXISTS Institution admins can view all documents ON public.document_records;
DROP POLICY IF EXISTS Institution admins see own institution's documents ON public.document_records;

CREATE POLICY Institution admins see own institution's documents
  ON public.document_records FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      JOIN public.students s ON s.institution_id = u.institution_id
      WHERE u.id = auth.uid() 
        AND u.role = 'institution'
        AND s.id = document_records.student_id
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users u
      JOIN public.students s ON s.institution_id = u.institution_id
      WHERE u.id = auth.uid() 
        AND u.role = 'institution'
        AND s.id = document_records.student_id
    )
  );

CREATE INDEX IF NOT EXISTS idx_students_institution_id ON public.students(institution_id);
CREATE INDEX IF NOT EXISTS idx_document_records_student_id ON public.document_records(student_id);
CREATE INDEX IF NOT EXISTS idx_users_institution_role ON public.users(id, institution_id, role);
