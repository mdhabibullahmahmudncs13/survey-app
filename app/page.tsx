'use client';

import { useState } from 'react';
import { SurveyResponse } from '@/types/survey';
import PersonalInfo from '@/components/survey/PersonalInfo';
import WorkshopPreferences from '@/components/survey/WorkshopPreferences';
import TechnicalSkills from '@/components/survey/TechnicalSkills';
import ReviewSubmit from '@/components/survey/ReviewSubmit';
import SuccessMessage from '@/components/survey/SuccessMessage';
import ProgressBar from '@/components/survey/ProgressBar';
import { Bot, Zap, Cpu, Sparkles, Rocket, Brain } from 'lucide-react';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [surveyData, setSurveyData] = useState<Partial<SurveyResponse>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 4;

  const handleNext = (data: Partial<SurveyResponse>) => {
    setSurveyData({ ...surveyData, ...data });
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSuccess = () => {
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSurveyData({});
    setIsSubmitted(false);
  };

  const renderStep = () => {
    if (isSubmitted) {
      return <SuccessMessage onReset={handleReset} />;
    }

    switch (currentStep) {
      case 1:
        return <PersonalInfo data={surveyData} onNext={handleNext} />;
      case 2:
        return <WorkshopPreferences data={surveyData} onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <TechnicalSkills data={surveyData} onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <ReviewSubmit data={surveyData as SurveyResponse} onBack={handleBack} onSuccess={handleSuccess} />;
      default:
        return <PersonalInfo data={surveyData} onNext={handleNext} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-200/20 to-transparent rounded-full floating-animation" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-indigo-200/20 to-transparent rounded-full floating-animation" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-200/15 to-blue-200/15 rounded-full floating-animation" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-200/15 to-teal-200/15 rounded-full floating-animation" style={{ animationDelay: '6s' }} />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-8 mb-8">
            <div className="relative">
              <Bot className="w-16 h-16 text-blue-600 pulse-neon floating-animation" />
              <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-ping" />
            </div>
            
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                NCC Robotics
              </h1>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span className="font-medium">Innovation • Technology • Future</span>
                <Sparkles className="w-4 h-4 text-yellow-500" />
              </div>
            </div>
            
            <div className="relative">
              <Rocket className="w-16 h-16 text-purple-600 pulse-neon floating-animation" style={{ animationDelay: '1s' }} />
              <div className="absolute inset-0 bg-purple-400/20 rounded-full animate-ping" style={{ animationDelay: '500ms' }} />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Workshop Registration Survey
          </h2>
          
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
            Join our comprehensive robotics workshop and embark on a journey through cutting-edge technology. 
            From Arduino programming to AI-powered robotics, we'll help you build the future, one robot at a time.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6 text-gray-600">
            <div className="flex items-center gap-3 neon-card px-6 py-3 rounded-full border border-blue-200/50 bg-white/80 backdrop-blur-sm">
              <Cpu className="w-6 h-6 text-blue-600 neon-glow" />
              <span className="font-semibold text-gray-800">Arduino & IoT</span>
            </div>
            <div className="flex items-center gap-3 neon-card px-6 py-3 rounded-full border border-purple-200/50 bg-white/80 backdrop-blur-sm">
              <Brain className="w-6 h-6 text-purple-600 neon-glow" />
              <span className="font-semibold text-gray-800">AI & Machine Learning</span>
            </div>
            <div className="flex items-center gap-3 neon-card px-6 py-3 rounded-full border border-green-200/50 bg-white/80 backdrop-blur-sm">
              <Zap className="w-6 h-6 text-green-600 neon-glow" />
              <span className="font-semibold text-gray-800">Hands-on Projects</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {!isSubmitted && (
          <div className="max-w-2xl mx-auto mb-8">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          </div>
        )}

        {/* Survey Content */}
        <div className="max-w-4xl mx-auto">
          {renderStep()}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500 text-sm">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Bot className="w-4 h-4" />
            <span className="font-medium">NCC Robotics Segment</span>
            <Bot className="w-4 h-4" />
          </div>
          <p>Building the future, one robot at a time • Powered by Supabase</p>
        </div>
      </div>
    </div>
  );
}