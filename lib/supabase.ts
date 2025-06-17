import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not configured. Using fallback mode.');
}

// Create Supabase client with error handling
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

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
  if (!supabase) {
    return { success: false, error: new Error('Supabase not configured') };
  }

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
  if (!supabase) {
    throw new Error('Supabase not configured. Please check your environment variables.');
  }

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
  if (!supabase) {
    throw new Error('Supabase not configured. Please check your environment variables.');
  }

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
  if (!supabase) {
    throw new Error('Supabase not configured. Please check your environment variables.');
  }

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
  if (!supabase) {
    throw new Error('Supabase not configured. Please check your environment variables.');
  }

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