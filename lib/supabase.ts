import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface SurveySubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  student_id: string;
  batch: string;
  department: string;
  experience_level: string;
  workshop_topics: string[];
  expectations: string;
  programming_languages: string[];
  availability: string;
  additional_comments?: string;
  created_at: string;
}

// Helper functions
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('survey_submissions')
      .select('count')
      .limit(1);
    
    if (error) throw error;
    
    console.log('Supabase connection successful');
    return { success: true, data };
  } catch (error) {
    console.error('Supabase connection failed:', error);
    return { success: false, error };
  }
};

export const submitSurvey = async (data: Omit<SurveySubmission, 'id' | 'created_at'>) => {
  try {
    const { data: result, error } = await supabase
      .from('survey_submissions')
      .insert([data])
      .select()
      .single();

    if (error) throw error;

    return { success: true, data: result };
  } catch (error) {
    console.error('Survey submission failed:', error);
    return { success: false, error };
  }
};

export const fetchSubmissions = async () => {
  try {
    const { data, error } = await supabase
      .from('survey_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Failed to fetch submissions:', error);
    return { success: false, error };
  }
};

export const updateSubmission = async (id: string, updates: Partial<SurveySubmission>) => {
  try {
    const { data, error } = await supabase
      .from('survey_submissions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Failed to update submission:', error);
    return { success: false, error };
  }
};

export const deleteSubmission = async (id: string) => {
  try {
    const { error } = await supabase
      .from('survey_submissions')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Failed to delete submission:', error);
    return { success: false, error };
  }
};