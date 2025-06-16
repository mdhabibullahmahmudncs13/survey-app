'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Notebook, Calendar, Mail } from 'lucide-react';

interface SuccessMessageProps {
  onReset: () => void;
}

export default function SuccessMessage({ onReset }: SuccessMessageProps) {
  return (
    <Card className="bg-gradient-to-br from-green-900/50 to-emerald-800/50 border-green-700 backdrop-blur-sm">
      <CardContent className="p-8 text-center">
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <CheckCircle className="w-20 h-20 text-green-400 animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-green-400/20 animate-ping" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">Survey Submitted Successfully!</h2>
            <p className="text-green-100 text-lg">
              Thank you for your interest in the NCC Robotics Workshop!
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center justify-center gap-2">
              <Notebook className="w-6 h-6 text-cyan-400" />
              What Happens Next?
            </h3>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-cyan-400 mt-1" />
                <div>
                  <p className="text-white font-medium">Workshop Scheduling</p>
                  <p className="text-slate-300 text-sm">We'll review your preferences and schedule the workshop accordingly.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-cyan-400 mt-1" />
                <div>
                  <p className="text-white font-medium">Email Confirmation</p>
                  <p className="text-slate-300 text-sm">You'll receive a confirmation email with workshop details within 2-3 business days.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Notebook className="w-5 h-5 text-cyan-400 mt-1" />
                <div>
                  <p className="text-white font-medium">Preparation Materials</p>
                  <p className="text-slate-300 text-sm">Pre-workshop materials and setup instructions will be shared via email.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg p-4 border border-blue-600/30">
            <p className="text-blue-100 text-sm">
              <strong>Questions?</strong> Contact us at robotics@ncc.edu or call (555) 123-4567
            </p>
          </div>

          <Button 
            onClick={onReset}
            variant="outline"
            className="border-green-600 text-green-300 hover:bg-green-600/20"
          >
            Submit Another Response
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}