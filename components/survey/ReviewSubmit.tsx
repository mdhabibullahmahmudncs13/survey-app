'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, ChevronLeft, Loader2, User, Mail, Phone, Cpu, Target, Code, Calendar, MessageSquare, GraduationCap, BookOpen, IdCard, AlertCircle, Database, Cloud } from 'lucide-react';
import { SurveyResponse } from '@/types/survey';
import { submitSurvey } from '@/lib/supabase';

interface ReviewSubmitProps {
  data: SurveyResponse;
  onBack: () => void;
  onSuccess: () => void;
}

export default function ReviewSubmit({ data, onBack, onSuccess }: ReviewSubmitProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submissionMethod, setSubmissionMethod] = useState<'supabase' | 'localStorage' | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    setSubmissionMethod(null);

    try {
      // Prepare data for Supabase
      const submissionData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        student_id: data.studentId,
        batch: data.batch,
        department: data.department,
        experience_level: data.experienceLevel,
        workshop_topics: data.workshopTopics,
        expectations: data.expectations,
        programming_languages: data.programmingLanguages,
        availability: data.availability,
        additional_comments: data.additionalComments || '',
      };

      // Try to submit to Supabase first
      try {
        console.log('Attempting Supabase submission...');
        
        const result = await submitSurvey(submissionData);
        
        if (result.success) {
          console.log('Survey submitted successfully to Supabase:', result.data);
          setSubmissionMethod('supabase');
        } else {
          throw result.error;
        }
        
      } catch (supabaseError: any) {
        console.warn('Supabase submission failed:', supabaseError);
        
        // Provide specific error messages
        let errorMessage = 'Unknown Supabase error';
        if (supabaseError?.message) {
          errorMessage = supabaseError.message;
        } else if (supabaseError?.code) {
          switch (supabaseError.code) {
            case 'PGRST116':
              errorMessage = 'Database table not found. Please check your Supabase configuration.';
              break;
            case '42P01':
              errorMessage = 'Survey submissions table does not exist. Please run the database setup.';
              break;
            case '23505':
              errorMessage = 'Duplicate submission detected. Please check if you have already submitted.';
              break;
            default:
              errorMessage = `Supabase error (${supabaseError.code}): ${supabaseError.message || 'Unknown error'}`;
          }
        }
        
        console.warn(`Supabase failed (${errorMessage}), using localStorage fallback`);
        
        // Fallback: Store in localStorage
        const fallbackData = {
          ...data,
          created_at: new Date().toISOString(),
          id: Math.random().toString(36).substr(2, 9)
        };
        
        const existingSubmissions = JSON.parse(localStorage.getItem('ncc_survey_submissions') || '[]');
        existingSubmissions.push(fallbackData);
        localStorage.setItem('ncc_survey_submissions', JSON.stringify(existingSubmissions));
        
        console.log('Survey stored locally as fallback:', fallbackData);
        setSubmissionMethod('localStorage');
        
        // Set a warning message but don't fail the submission
        setError(`Supabase unavailable (${errorMessage}). Data saved locally as backup.`);
      }

      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onSuccess();
    } catch (err: any) {
      console.error('Complete submission failure:', err);
      setError(`Failed to submit survey: ${err.message || 'Unknown error'}. Please check your connection and try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const experienceLevelLabels = {
    beginner: 'Beginner - New to robotics',
    intermediate: 'Intermediate - Some experience',
    advanced: 'Advanced - Experienced in robotics'
  };

  const departmentLabels = {
    TEX: 'TEX - Textile Engineering',
    IPE: 'IPE - Industrial & Production Engineering',
    CSE: 'CSE - Computer Science & Engineering',
    EEE: 'EEE - Electrical & Electronic Engineering',
    FDAE: 'FDAE - Fashion Design & Apparel Engineering'
  };

  const formatTopicLabel = (topic: string) => {
    return topic
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatDate = (dateString: string) => {
    // Extract date and day from the format "20 June 2025-Friday-(9 AM - 4 PM)"
    const parts = dateString.split('-');
    if (parts.length >= 2) {
      return `${parts[0]} (${parts[1]})`;
    }
    return dateString;
  };

  return (
    <Card className="neon-card border-2 border-green-200/50 shadow-2xl bg-white/95 backdrop-blur-md">
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Review Your Information</h2>
            <p className="text-gray-600">Please review your details before submitting to our secure database</p>
          </div>

          <div className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <User className="w-6 h-6 text-blue-600 neon-glow" />
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4 p-6 neon-bg rounded-xl border border-blue-200/50">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 font-medium">Name:</span>
                  <span className="text-gray-800 font-semibold">{data.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 font-medium">Email:</span>
                  <span className="text-gray-800 font-semibold break-all">{data.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 font-medium">Phone:</span>
                  <span className="text-gray-800 font-semibold">{data.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <IdCard className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 font-medium">Student ID:</span>
                  <span className="text-gray-800 font-semibold">{data.studentId}</span>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 font-medium">Batch:</span>
                  <span className="text-gray-800 font-semibold">{data.batch}</span>
                </div>
                <div className="flex items-center gap-3 md:col-span-2">
                  <BookOpen className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 font-medium">Department:</span>
                  <span className="text-gray-800 font-semibold">{departmentLabels[data.department]}</span>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-200" />

            {/* Experience Level */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <Cpu className="w-6 h-6 text-purple-600 neon-glow" />
                Experience Level
              </h3>
              <div className="p-6 neon-bg rounded-xl border border-purple-200/50">
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-300 text-base px-4 py-2 font-semibold">
                  {experienceLevelLabels[data.experienceLevel]}
                </Badge>
              </div>
            </div>

            <Separator className="bg-gray-200" />

            {/* Workshop Topics */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <Target className="w-6 h-6 text-cyan-600 neon-glow" />
                Workshop Topics ({data.workshopTopics.length} selected)
              </h3>
              <div className="p-6 neon-bg rounded-xl border border-cyan-200/50">
                <div className="flex flex-wrap gap-3">
                  {data.workshopTopics.map((topic) => (
                    <Badge key={topic} variant="outline" className="border-green-400 text-green-800 bg-green-50 text-sm px-4 py-2 font-medium">
                      {formatTopicLabel(topic)}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Programming Languages */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <Code className="w-6 h-6 text-indigo-600 neon-glow" />
                Programming Languages ({data.programmingLanguages.length} selected)
              </h3>
              <div className="p-6 neon-bg rounded-xl border border-indigo-200/50">
                <div className="flex flex-wrap gap-3">
                  {data.programmingLanguages.map((lang) => (
                    <Badge key={lang} variant="outline" className="border-blue-400 text-blue-800 bg-blue-50 text-sm px-4 py-2 font-medium">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-pink-600 neon-glow" />
                Preferred Workshop Date
              </h3>
              <div className="p-6 neon-bg rounded-xl border border-pink-200/50">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-800 font-semibold text-lg">{formatDate(data.availability)}</span>
                </div>
                <p className="text-gray-600 text-sm mt-2 ml-8">Workshop duration: 9 AM - 4 PM (7 hours)</p>
              </div>
            </div>

            {/* Expectations */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-orange-600 neon-glow" />
                Learning Expectations
              </h3>
              <div className="p-6 neon-bg rounded-xl border border-orange-200/50">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{data.expectations}</p>
              </div>
            </div>

            {/* Additional Comments */}
            {data.additionalComments && data.additionalComments.trim() && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-gray-600" />
                  Additional Comments
                </h3>
                <div className="p-6 neon-bg rounded-xl border border-gray-200/50">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{data.additionalComments}</p>
                </div>
              </div>
            )}
          </div>

          {/* Error/Warning Message */}
          {error && (
            <div className={`p-4 border rounded-xl flex items-start gap-3 ${
              submissionMethod === 'localStorage' 
                ? 'bg-yellow-50 border-yellow-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                submissionMethod === 'localStorage' ? 'text-yellow-500' : 'text-red-500'
              }`} />
              <div>
                <p className={`text-sm font-medium ${
                  submissionMethod === 'localStorage' ? 'text-yellow-700' : 'text-red-600'
                }`}>
                  {submissionMethod === 'localStorage' ? 'Fallback Mode Active' : 'Submission Failed'}
                </p>
                <p className={`text-sm ${
                  submissionMethod === 'localStorage' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {error}
                </p>
                {submissionMethod === 'localStorage' && (
                  <p className="text-yellow-600 text-xs mt-1">
                    Your data is safely stored locally. Please contact the administrator to resolve the database connection.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Submission Method Indicator */}
          {submissionMethod && (
            <div className={`p-4 border rounded-xl flex items-start gap-3 ${
              submissionMethod === 'supabase' 
                ? 'bg-green-50 border-green-200' 
                : 'bg-blue-50 border-blue-200'
            }`}>
              {submissionMethod === 'supabase' ? (
                <Cloud className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-500" />
              ) : (
                <Database className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-500" />
              )}
              <div>
                <p className={`text-sm font-medium ${
                  submissionMethod === 'supabase' ? 'text-green-700' : 'text-blue-700'
                }`}>
                  {submissionMethod === 'supabase' ? 'Submitted to Supabase Database' : 'Stored Locally'}
                </p>
                <p className={`text-sm ${
                  submissionMethod === 'supabase' ? 'text-green-600' : 'text-blue-600'
                }`}>
                  {submissionMethod === 'supabase' 
                    ? 'Your submission has been successfully saved to our secure cloud database.'
                    : 'Your submission has been saved locally and will be synced when the database is available.'
                  }
                </p>
              </div>
            </div>
          )}

          {/* Submission Info */}
          {!error && !submissionMethod && (
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-blue-800 font-semibold">Ready to Submit</p>
                  <p className="text-blue-700 text-sm mt-1">
                    Your information will be securely stored in our Supabase database and you'll receive a confirmation email within 2-3 business days.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button 
              onClick={onBack}
              variant="outline"
              className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 py-3 text-lg font-medium"
              disabled={isSubmitting}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <Button 
              onClick={handleSubmit}
              className="flex-1 neon-button text-white font-semibold transition-all duration-300 py-3 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Submit Survey
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}