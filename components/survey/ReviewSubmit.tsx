'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, ChevronLeft, Loader2, User, Mail, Phone, Building, Cpu, Target, Code, Calendar, MessageSquare } from 'lucide-react';
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

  return (
    <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Review Your Information</h2>
            <p className="text-slate-300">Please review your details before submitting</p>
          </div>

          <div className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-cyan-400" />
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">Name:</span>
                  <span className="text-white font-medium">{data.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">Email:</span>
                  <span className="text-white font-medium">{data.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">Phone:</span>
                  <span className="text-white font-medium">{data.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">Institution:</span>
                  <span className="text-white font-medium">{data.institution}</span>
                </div>
              </div>
            </div>

            <Separator className="bg-slate-700" />

            {/* Experience Level */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                Experience Level
              </h3>
              <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
                <Badge variant="secondary" className="bg-cyan-600/20 text-cyan-300 border-cyan-600">
                  {experienceLevelLabels[data.experienceLevel]}
                </Badge>
              </div>
            </div>

            <Separator className="bg-slate-700" />

            {/* Workshop Topics */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-400" />
                Workshop Topics
              </h3>
              <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
                <div className="flex flex-wrap gap-2">
                  {data.workshopTopics.map((topic) => (
                    <Badge key={topic} variant="outline" className="border-green-600 text-green-300">
                      {topic.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Programming Languages */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Code className="w-5 h-5 text-cyan-400" />
                Programming Languages
              </h3>
              <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
                <div className="flex flex-wrap gap-2">
                  {data.programmingLanguages.map((lang) => (
                    <Badge key={lang} variant="outline" className="border-blue-600 text-blue-300">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cyan-400" />
                Availability
              </h3>
              <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
                <span className="text-white">{data.availability}</span>
              </div>
            </div>

            {/* Expectations */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                Expectations
              </h3>
              <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
                <p className="text-white text-sm leading-relaxed">{data.expectations}</p>
              </div>
            </div>

            {/* Additional Comments */}
            {data.additionalComments && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Additional Comments</h3>
                <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
                  <p className="text-white text-sm leading-relaxed">{data.additionalComments}</p>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="p-4 bg-red-900/20 border border-red-600 rounded-lg">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-4">
            <Button 
              onClick={onBack}
              variant="outline"
              className="flex-1 border-slate-600 text-white hover:bg-slate-800"
              disabled={isSubmitting}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button 
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
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