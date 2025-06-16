'use client';

import { useState } from 'react';
import { SurveyResponse } from '@/types/survey';
import PersonalInfo from '@/components/survey/PersonalInfo';
import WorkshopPreferences from '@/components/survey/WorkshopPreferences';
import TechnicalSkills from '@/components/survey/TechnicalSkills';
import ReviewSubmit from '@/components/survey/ReviewSubmit';
import SuccessMessage from '@/components/survey/SuccessMessage';
import ProgressBar from '@/components/survey/ProgressBar';
import { Notebook, Zap, Cpu } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-600/10 to-transparent rounded-full animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-600/10 to-transparent rounded-full animate-pulse delay-1000" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="relative">
              <Notebook className="w-12 h-12 text-cyan-400 animate-bounce" />
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full animate-ping" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              NCC Robotics
            </h1>
            <div className="relative">
              <Zap className="w-12 h-12 text-yellow-400 animate-pulse" />
              <div className="absolute inset-0 bg-yellow-400/20 rounded-full animate-ping delay-500" />
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Workshop Registration Survey
          </h2>
          
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
            Help us design the perfect robotics workshop tailored to your interests and skill level. 
            Your responses will shape an engaging learning experience in cutting-edge robotics technology.
          </p>

          <div className="flex justify-center items-center gap-6 text-slate-400">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-400" />
              <span className="text-sm">Arduino & Sensors</span>
            </div>
            <div className="flex items-center gap-2">
              <Notebook className="w-5 h-5 text-green-400" />
              <span className="text-sm">AI & Robotics</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-sm">Hands-on Projects</span>
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
        <div className="text-center mt-12 text-slate-400 text-sm">
          <p>© 2025 NCC Robotics Segment. Building the future, one robot at a time.</p>
        </div>
      </div>
    </div>
  );
}