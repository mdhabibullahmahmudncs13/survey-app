'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, ChevronLeft, Loader2, User, Mail, Phone, Cpu, Target, Code, Calendar, MessageSquare, GraduationCap, BookOpen, IdCard } from 'lucide-react';
import { SurveyResponse } from '@/types/survey';

interface ReviewSubmitProps {
  data: SurveyResponse;
  onBack: () => void;
  onSuccess: () => void;
}

export default function ReviewSubmit({ data, onBack, onSuccess }: ReviewSubmitProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // For now, simulate a successful submission since Appwrite isn't configured
      // In a real implementation, this would connect to your Appwrite backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate storing the data locally for demonstration
      const submissionData = {
        ...data,
        submitted_at: new Date().toISOString(),
        id: Math.random().toString(36).substr(2, 9)
      };
      
      console.log('Survey submitted:', submissionData);
      onSuccess();
    } catch (err) {
      console.error('Submission error:', err);
      setError('Failed to submit survey. Please try again.');
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

  return (
    <Card className="neon-card border-2 border-green-200/50 shadow-2xl">
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Review Your Information</h2>
            <p className="text-gray-600">Please review your details before submitting</p>
          </div>

          <div className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <User className="w-5 h-5 text-pink-500 neon-glow" />
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4 p-4 neon-bg rounded-lg border border-pink-200/50">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600">Name:</span>
                  <span className="text-gray-800 font-medium">{data.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600">Email:</span>
                  <span className="text-gray-800 font-medium">{data.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600">Phone:</span>
                  <span className="text-gray-800 font-medium">{data.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IdCard className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600">Student ID:</span>
                  <span className="text-gray-800 font-medium">{data.studentId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600">Batch:</span>
                  <span className="text-gray-800 font-medium">{data.batch}</span>
                </div>
                <div className="flex items-center gap-2 md:col-span-2">
                  <BookOpen className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600">Department:</span>
                  <span className="text-gray-800 font-medium">{departmentLabels[data.department]}</span>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-200" />

            {/* Experience Level */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-purple-500 neon-glow" />
                Experience Level
              </h3>
              <div className="p-4 neon-bg rounded-lg border border-purple-200/50">
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-300">
                  {experienceLevelLabels[data.experienceLevel]}
                </Badge>
              </div>
            </div>

            <Separator className="bg-gray-200" />

            {/* Workshop Topics */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-500 neon-glow" />
                Workshop Topics
              </h3>
              <div className="p-4 neon-bg rounded-lg border border-cyan-200/50">
                <div className="flex flex-wrap gap-2">
                  {data.workshopTopics.map((topic) => (
                    <Badge key={topic} variant="outline" className="border-green-400 text-green-700 bg-green-50">
                      {topic.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Programming Languages */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-500 neon-glow" />
                Programming Languages
              </h3>
              <div className="p-4 neon-bg rounded-lg border border-blue-200/50">
                <div className="flex flex-wrap gap-2">
                  {data.programmingLanguages.map((lang) => (
                    <Badge key={lang} variant="outline" className="border-blue-400 text-blue-700 bg-blue-50">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-pink-500 neon-glow" />
                Preferred Workshop Date
              </h3>
              <div className="p-4 neon-bg rounded-lg border border-pink-200/50">
                <span className="text-gray-800 font-medium">{data.availability}</span>
              </div>
            </div>

            {/* Expectations */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-orange-500 neon-glow" />
                Expectations
              </h3>
              <div className="p-4 neon-bg rounded-lg border border-orange-200/50">
                <p className="text-gray-800 text-sm leading-relaxed">{data.expectations}</p>
              </div>
            </div>

            {/* Additional Comments */}
            {data.additionalComments && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Additional Comments</h3>
                <div className="p-4 neon-bg rounded-lg border border-gray-200/50">
                  <p className="text-gray-800 text-sm leading-relaxed">{data.additionalComments}</p>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-4">
            <Button 
              onClick={onBack}
              variant="outline"
              className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
              disabled={isSubmitting}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button 
              onClick={handleSubmit}
              className="flex-1 neon-button text-white font-semibold transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
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