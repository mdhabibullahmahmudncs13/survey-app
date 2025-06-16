'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Code, Calendar, ChevronLeft } from 'lucide-react';
import { SurveyResponse } from '@/types/survey';

interface TechnicalSkillsProps {
  data: Partial<SurveyResponse>;
  onNext: (data: Partial<SurveyResponse>) => void;
  onBack: () => void;
}

const programmingLanguages = [
  'C/C++',
  'Python',
  'Arduino IDE',
  'JavaScript',
  'Java',
  'MATLAB',
  'ROS (Robot Operating System)',
  'Assembly',
  'Scratch/Block Programming',
  'No programming experience'
];

const availabilityOptions = [
  '20 June 2025 (9 AM - 4 PM)',
  '21 June 2025 (9 AM - 4 PM)',
  '22 June 2025 (9 AM - 4 PM)',
  '23 June 2025 (9 AM - 4 PM)',
  '24 June 2025 (9 AM - 4 PM)',
  '25 June 2025 (9 AM - 4 PM)',
  '26 June 2025 (9 AM - 4 PM)',
  '27 June 2025 (9 AM - 4 PM)',
  '28 June 2025 (9 AM - 4 PM)',
  '29 June 2025 (9 AM - 4 PM)',
  '30 June 2025 (9 AM - 4 PM)'
];

export default function TechnicalSkills({ data, onNext, onBack }: TechnicalSkillsProps) {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(data.programmingLanguages || []);
  const [availability, setAvailability] = useState(data.availability || '');
  const [additionalComments, setAdditionalComments] = useState(data.additionalComments || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleLanguageChange = (language: string, checked: boolean) => {
    if (checked) {
      setSelectedLanguages([...selectedLanguages, language]);
    } else {
      setSelectedLanguages(selectedLanguages.filter(lang => lang !== language));
    }
  };

  const validateAndNext = () => {
    const newErrors: Record<string, string> = {};

    if (selectedLanguages.length === 0) {
      newErrors.languages = 'Please select at least one option (or "No programming experience")';
    }
    if (!availability) {
      newErrors.availability = 'Please select your preferred workshop date';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext({
        programmingLanguages: selectedLanguages,
        availability,
        additionalComments: additionalComments.trim(),
      });
    }
  };

  return (
    <Card className="neon-card border-2 border-cyan-200/50 shadow-2xl">
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Technical Skills & Availability</h2>
            <p className="text-gray-600">Help us understand your technical background</p>
          </div>

          <div className="space-y-4">
            <Label className="text-gray-800 text-lg flex items-center gap-2 font-semibold">
              <Code className="w-5 h-5 text-cyan-500 neon-glow" />
              Programming Languages/Platforms *
            </Label>
            <div className="grid md:grid-cols-2 gap-3">
              {programmingLanguages.map((language) => (
                <div key={language} className="flex items-center space-x-3 p-3 rounded-lg neon-bg border border-cyan-200/50 hover:border-cyan-300/70 transition-all duration-300 hover:shadow-lg">
                  <Checkbox
                    id={language}
                    checked={selectedLanguages.includes(language)}
                    onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                    className="border-cyan-400 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                  />
                  <Label htmlFor={language} className="text-gray-800 cursor-pointer text-sm font-medium">
                    {language}
                  </Label>
                </div>
              ))}
            </div>
            {errors.languages && <p className="text-red-500 text-sm">{errors.languages}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-gray-800 flex items-center gap-2 font-medium">
              <Calendar className="w-5 h-5 text-pink-500 neon-glow" />
              Preferred Workshop Date *
            </Label>
            <p className="text-gray-600 text-sm mb-3">
              Workshop runs from 20 June 2025 to 30 June 2025 (9 AM - 4 PM daily). Select your preferred date:
            </p>
            <Select value={availability} onValueChange={setAvailability}>
              <SelectTrigger className="neon-input text-gray-800">
                <SelectValue placeholder="Select your preferred workshop date" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-md border-pink-200">
                {availabilityOptions.map((option) => (
                  <SelectItem key={option} value={option} className="text-gray-800">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.availability && <p className="text-red-500 text-sm">{errors.availability}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comments" className="text-gray-800 font-medium">
              Additional Comments or Questions (Optional)
            </Label>
            <Textarea
              id="comments"
              value={additionalComments}
              onChange={(e) => setAdditionalComments(e.target.value)}
              placeholder="Any specific questions, accessibility needs, or additional information you'd like to share..."
              className="neon-input text-gray-800 placeholder-gray-500 min-h-[100px]"
            />
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={onBack}
              variant="outline"
              className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button 
              onClick={validateAndNext}
              className="flex-1 neon-button text-white font-semibold transition-all duration-300"
            >
              Review & Submit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}