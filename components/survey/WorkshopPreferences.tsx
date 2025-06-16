'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Notebook as Robot, Cpu, Zap, Settings, ChevronLeft } from 'lucide-react';
import { SurveyResponse } from '@/types/survey';

interface WorkshopPreferencesProps {
  data: Partial<SurveyResponse>;
  onNext: (data: Partial<SurveyResponse>) => void;
  onBack: () => void;
}

const workshopTopics = [
  { id: 'arduino-basics', label: 'Arduino Programming Basics', icon: Cpu },
  { id: 'sensor-integration', label: 'Sensor Integration & IoT', icon: Zap },
  { id: 'robotics-design', label: 'Robot Design & Mechanics', icon: Robot },
  { id: 'ai-robotics', label: 'AI & Machine Learning in Robotics', icon: Settings },
  { id: 'autonomous-systems', label: 'Autonomous Navigation Systems', icon: Robot },
  { id: 'computer-vision', label: 'Computer Vision & Image Processing', icon: Zap },
  { id: 'robot-control', label: 'Advanced Robot Control Systems', icon: Settings },
  { id: 'drone-technology', label: 'Drone Technology & Applications', icon: Cpu },
];

export default function WorkshopPreferences({ data, onNext, onBack }: WorkshopPreferencesProps) {
  const [selectedTopics, setSelectedTopics] = useState<string[]>(data.workshopTopics || []);
  const [expectations, setExpectations] = useState(data.expectations || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleTopicChange = (topicId: string, checked: boolean) => {
    if (checked) {
      setSelectedTopics([...selectedTopics, topicId]);
    } else {
      setSelectedTopics(selectedTopics.filter(id => id !== topicId));
    }
  };

  const validateAndNext = () => {
    const newErrors: Record<string, string> = {};

    if (selectedTopics.length === 0) {
      newErrors.topics = 'Please select at least one workshop topic';
    }
    if (!expectations.trim()) {
      newErrors.expectations = 'Please share your expectations';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext({
        workshopTopics: selectedTopics,
        expectations: expectations.trim(),
      });
    }
  };

  return (
    <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Workshop Preferences</h2>
            <p className="text-slate-300">Select topics you're most interested in learning</p>
          </div>

          <div className="space-y-4">
            <Label className="text-white text-lg">Topics of Interest *</Label>
            <div className="grid md:grid-cols-2 gap-4">
              {workshopTopics.map((topic) => {
                const IconComponent = topic.icon;
                return (
                  <div key={topic.id} className="flex items-center space-x-3 p-4 rounded-lg bg-slate-800/30 border border-slate-700 hover:bg-slate-800/50 transition-colors">
                    <Checkbox
                      id={topic.id}
                      checked={selectedTopics.includes(topic.id)}
                      onCheckedChange={(checked) => handleTopicChange(topic.id, checked as boolean)}
                      className="border-slate-500"
                    />
                    <IconComponent className="w-5 h-5 text-cyan-400" />
                    <Label htmlFor={topic.id} className="text-white cursor-pointer text-sm">
                      {topic.label}
                    </Label>
                  </div>
                );
              })}
            </div>
            {errors.topics && <p className="text-red-400 text-sm">{errors.topics}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="expectations" className="text-white">
              What do you hope to learn from this workshop? *
            </Label>
            <Textarea
              id="expectations"
              value={expectations}
              onChange={(e) => setExpectations(e.target.value)}
              placeholder="Share your learning goals and expectations..."
              className="bg-slate-800/50 border-slate-600 text-white min-h-[120px]"
            />
            {errors.expectations && <p className="text-red-400 text-sm">{errors.expectations}</p>}
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
              className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
            >
              Continue
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}