'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Bot, Calendar, Mail } from 'lucide-react';

interface SuccessMessageProps {
  onReset: () => void;
}

export default function SuccessMessage({ onReset }: SuccessMessageProps) {
  return (
    <Card className="neon-card border-2 border-green-200/50 shadow-2xl">
      <CardContent className="p-8 text-center">
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <CheckCircle className="w-20 h-20 text-green-500 pulse-neon" />
              <div className="absolute inset-0 rounded-full bg-green-400/20 animate-ping" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">Survey Submitted Successfully!</h2>
            <p className="text-green-600 text-lg font-medium">
              Thank you for your interest in the NCC Robotics Workshop!
            </p>
          </div>

          <div className="neon-bg rounded-lg p-6 border border-gray-200/50">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
              <Bot className="w-6 h-6 text-purple-500 neon-glow" />
              What Happens Next?
            </h3>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-pink-500 neon-glow mt-1" />
                <div>
                  <p className="text-gray-800 font-medium">Workshop Scheduling</p>
                  <p className="text-gray-600 text-sm">We'll review your preferences and schedule the workshop accordingly.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-cyan-500 neon-glow mt-1" />
                <div>
                  <p className="text-gray-800 font-medium">Email Confirmation</p>
                  <p className="text-gray-600 text-sm">You'll receive a confirmation email with workshop details within 2-3 business days.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Bot className="w-5 h-5 text-purple-500 neon-glow mt-1" />
                <div>
                  <p className="text-gray-800 font-medium">Preparation Materials</p>
                  <p className="text-gray-600 text-sm">Pre-workshop materials and setup instructions will be shared via email.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200/50">
            <p className="text-blue-700 text-sm">
              <strong>Questions?</strong> Contact us at robotics@ncc.edu or call (555) 123-4567
            </p>
          </div>

          <Button 
            onClick={onReset}
            variant="outline"
            className="border-2 border-green-400 text-green-600 hover:bg-green-50 hover:border-green-500 transition-all duration-300"
          >
            Submit Another Response
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}