'use client';

import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm text-slate-300">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <Progress 
        value={progress} 
        className="h-2 bg-slate-800 border border-slate-700"
        // Custom styling for the progress bar
        style={{
          background: 'linear-gradient(to right, #1e293b, #334155)',
        }}
      />
      <style jsx global>{`
        .progress-bar [data-state="indeterminate"] {
          background: linear-gradient(90deg, #0066ff, #00ff88);
        }
      `}</style>
    </div>
  );
}