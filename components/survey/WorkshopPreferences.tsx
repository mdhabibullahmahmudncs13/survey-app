'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Cpu, Zap, Settings, ChevronLeft } from 'lucide-react';
import { SurveyResponse } from '@/types/survey';

interface WorkshopPreferencesProps {
  data: Partial<SurveyResponse>;
  onNext: (data: Partial<SurveyResponse>) => void;
  onBack: () => void;
}

const workshopTopics = [
  { id: 'arduino-basics', label: 'Arduino Programming Basics', icon: Cpu },
  { id: 'sensor-integration', label: 'Sensor Integration & IoT', icon: Zap },
  { id: 'robotics-design', label: 'Robot Design & Mechanics', icon: Bot },
  { id: 'ai-robotics', label: 'AI & Machine Learning in Robotics', icon: Settings },
  { id: 'autonomous-systems', label: 'Autonomous Navigation Systems', icon: Bot },
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
    <Card className="neon-card border-2 border-purple-200/50 shadow-2xl">
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Workshop Preferences</h2>
            <p className="text-gray-600">Select topics you're most interested in learning</p>
          </div>

          <div className="space-y-4">
            <Label className="text-gray-800 text-lg font-semibold">Topics of Interest *</Label>
            <div className="grid md:grid-cols-2 gap-4">
              {workshopTopics.map((topic) => {
                const IconComponent = topic.icon;
                return (
                  <div key={topic.id} className="flex items-center space-x-3 p-4 rounded-lg neon-bg border border-purple-200/50 hover:border-purple-300/70 transition-all duration-300 hover:shadow-lg">
                    <Checkbox
                      id={topic.id}
                      checked={selectedTopics.includes(topic.id)}
                      onCheckedChange={(checked) => handleTopicChange(topic.id, checked as boolean)}
                      className="border-purple-400 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                    />
                    <IconComponent className="w-5 h-5 text-purple-500 neon-glow" />
                    <Label htmlFor={topic.id} className="text-gray-800 cursor-pointer text-sm font-medium">
                      {topic.label}
                    </Label>
                  </div>
                );
              })}
            </div>
            {errors.topics && <p className="text-red-500 text-sm">{errors.topics}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="expectations" className="text-gray-800 font-medium">
              What do you hope to learn from this workshop? *
            </Label>
            <Textarea
              id="expectations"
              value={expectations}
              onChange={(e) => setExpectations(e.target.value)}
              placeholder="Share your learning goals and expectations..."
              className="neon-input text-gray-800 placeholder-gray-500 min-h-[120px]"
            />
            {errors.expectations && <p className="text-red-500 text-sm">{errors.expectations}</p>}
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
              Continue
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}