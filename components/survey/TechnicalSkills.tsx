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
  'Weekday mornings (9 AM - 12 PM)',
  'Weekday afternoons (1 PM - 5 PM)',
  'Weekday evenings (6 PM - 9 PM)',
  'Weekend mornings (9 AM - 12 PM)',
  'Weekend afternoons (1 PM - 5 PM)',
  'Weekend evenings (6 PM - 9 PM)',
  'Flexible - any time works'
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
      newErrors.availability = 'Please select your availability';
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
    <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Technical Skills & Availability</h2>
            <p className="text-slate-300">Help us understand your technical background</p>
          </div>

          <div className="space-y-4">
            <Label className="text-white text-lg flex items-center gap-2">
              <Code className="w-5 h-5" />
              Programming Languages/Platforms *
            </Label>
            <div className="grid md:grid-cols-2 gap-3">
              {programmingLanguages.map((language) => (
                <div key={language} className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700 hover:bg-slate-800/50 transition-colors">
                  <Checkbox
                    id={language}
                    checked={selectedLanguages.includes(language)}
                    onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                    className="border-slate-500"
                  />
                  <Label htmlFor={language} className="text-white cursor-pointer text-sm">
                    {language}
                  </Label>
                </div>
              ))}
            </div>
            {errors.languages && <p className="text-red-400 text-sm">{errors.languages}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-white flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Preferred Workshop Timing *
            </Label>
            <Select value={availability} onValueChange={setAvailability}>
              <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                <SelectValue placeholder="Select your preferred timing" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {availabilityOptions.map((option) => (
                  <SelectItem key={option} value={option} className="text-white">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.availability && <p className="text-red-400 text-sm">{errors.availability}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comments" className="text-white">
              Additional Comments or Questions (Optional)
            </Label>
            <Textarea
              id="comments"
              value={additionalComments}
              onChange={(e) => setAdditionalComments(e.target.value)}
              placeholder="Any specific questions, accessibility needs, or additional information you'd like to share..."
              className="bg-slate-800/50 border-slate-600 text-white min-h-[100px]"
            />
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={onBack}
              variant="outline"
              className="flex-1 border-slate-600 text-white hover:bg-slate-800"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button 
              onClick={validateAndNext}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
            >
              Review & Submit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}