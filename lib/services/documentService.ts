import { supabase } from '@/lib/supabase/client';

export type DocumentCategory = 'resumes' | 'transcripts' | 'certifications' | 'internship_reports' | 'id_proofs';

export interface UploadResult {
  filePath: string;
  category: DocumentCategory;
  fileName: string;
  uploadedAt: string;
}

export async function uploadStudentDocument(
  studentId: string,
  category: DocumentCategory,
  file: File
): Promise<{ data: UploadResult | null; error: string | null }> {
  try {
    const cleanFileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = `${studentId}/${category}/${cleanFileName}`;

    const { error: uploadError } = await supabase.storage
      .from('student-documents')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      return { data: null, error: uploadError.message };
    }

    return {
      data: {
        filePath,
        category,
        fileName: file.name,
        uploadedAt: new Date().toISOString()
      },
      error: null
    };
  } catch (err: any) {
    return { data: null, error: err.message || 'Unexpected upload error' };
  }
}

export async function getSecureDocumentUrl(
  filePath: string,
  expiresInSeconds = 60
): Promise<{ signedUrl: string | null; error: string | null }> {
  try {
    const { data, error } = await supabase.storage
      .from('student-documents')
      .createSignedUrl(filePath, expiresInSeconds);

    if (error) return { signedUrl: null, error: error.message };
    return { signedUrl: data.signedUrl, error: null };
  } catch (err: any) {
    return { signedUrl: null, error: err.message || 'Failed to generate download link' };
  }
}
