'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Save, X } from 'lucide-react';
import { SurveyResponse } from '@/types/survey';

interface EditSubmissionDialogProps {
  submission: SurveyResponse & { id: string; submitted_at: string };
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedSubmission: SurveyResponse & { id: string; submitted_at: string }) => void;
}

const workshopTopics = [
  { id: 'arduino-basics', label: 'Arduino Programming Basics' },
  { id: 'sensor-integration', label: 'Sensor Integration & IoT' },
  { id: 'robotics-design', label: 'Robot Design & Mechanics' },
  { id: 'ai-robotics', label: 'AI & Machine Learning in Robotics' },
  { id: 'autonomous-systems', label: 'Autonomous Navigation Systems' },
  { id: 'computer-vision', label: 'Computer Vision & Image Processing' },
  { id: 'robot-control', label: 'Advanced Robot Control Systems' },
  { id: 'drone-technology', label: 'Drone Technology & Applications' },
];

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

export default function EditSubmissionDialog({ 
  submission, 
  isOpen, 
  onClose, 
  onSave 
}: EditSubmissionDialogProps) {
  const [formData, setFormData] = useState(submission);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleTopicChange = (topicId: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        workshopTopics: [...formData.workshopTopics, topicId]
      });
    } else {
      setFormData({
        ...formData,
        workshopTopics: formData.workshopTopics.filter(id => id !== topicId)
      });
    }
  };

  const handleLanguageChange = (language: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        programmingLanguages: [...formData.programmingLanguages, language]
      });
    } else {
      setFormData({
        ...formData,
        programmingLanguages: formData.programmingLanguages.filter(lang => lang !== language)
      });
    }
  };

  const validateAndSave = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.studentId.trim()) newErrors.studentId = 'Student ID is required';
    if (!formData.batch) newErrors.batch = 'Batch is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.experienceLevel) newErrors.experienceLevel = 'Experience level is required';
    if (formData.workshopTopics.length === 0) newErrors.topics = 'At least one topic is required';
    if (formData.programmingLanguages.length === 0) newErrors.languages = 'At least one language is required';
    if (!formData.availability) newErrors.availability = 'Availability is required';
    if (!formData.expectations.trim()) newErrors.expectations = 'Expectations are required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSave(formData);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/95 backdrop-blur-md border-gray-200 text-gray-800 max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Edit Submission
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name" className="text-gray-800 font-medium">Full Name *</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="neon-input text-gray-800"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-email" className="text-gray-800 font-medium">Email Address *</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="neon-input text-gray-800"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-phone" className="text-gray-800 font-medium">Phone Number *</Label>
                <Input
                  id="edit-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="neon-input text-gray-800"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-studentId" className="text-gray-800 font-medium">Student ID *</Label>
                <Input
                  id="edit-studentId"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  className="neon-input text-gray-800"
                />
                {errors.studentId && <p className="text-red-500 text-sm">{errors.studentId}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-800 font-medium">Batch *</Label>
                <Select value={formData.batch} onValueChange={(value) => setFormData({ ...formData, batch: value as any })}>
                  <SelectTrigger className="neon-input text-gray-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-md border-gray-200">
                    <SelectItem value="10th" className="text-gray-800">10th</SelectItem>
                    <SelectItem value="11th" className="text-gray-800">11th</SelectItem>
                    <SelectItem value="12th" className="text-gray-800">12th</SelectItem>
                    <SelectItem value="13th" className="text-gray-800">13th</SelectItem>
                    <SelectItem value="14th" className="text-gray-800">14th</SelectItem>
                  </SelectContent>
                </Select>
                {errors.batch && <p className="text-red-500 text-sm">{errors.batch}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-800 font-medium">Department *</Label>
                <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value as any })}>
                  <SelectTrigger className="neon-input text-gray-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-md border-gray-200">
                    <SelectItem value="TEX" className="text-gray-800">TEX - Textile Engineering</SelectItem>
                    <SelectItem value="IPE" className="text-gray-800">IPE - Industrial & Production Engineering</SelectItem>
                    <SelectItem value="CSE" className="text-gray-800">CSE - Computer Science & Engineering</SelectItem>
                    <SelectItem value="EEE" className="text-gray-800">EEE - Electrical & Electronic Engineering</SelectItem>
                    <SelectItem value="FDAE" className="text-gray-800">FDAE - Fashion Design & Apparel Engineering</SelectItem>
                  </SelectContent>
                </Select>
                {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-800 font-medium">Experience Level *</Label>
              <Select value={formData.experienceLevel} onValueChange={(value) => setFormData({ ...formData, experienceLevel: value as any })}>
                <SelectTrigger className="neon-input text-gray-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-md border-gray-200">
                  <SelectItem value="beginner" className="text-gray-800">Beginner - New to robotics</SelectItem>
                  <SelectItem value="intermediate" className="text-gray-800">Intermediate - Some experience</SelectItem>
                  <SelectItem value="advanced" className="text-gray-800">Advanced - Experienced in robotics</SelectItem>
                </SelectContent>
              </Select>
              {errors.experienceLevel && <p className="text-red-500 text-sm">{errors.experienceLevel}</p>}
            </div>
          </div>

          {/* Workshop Topics */}
          <div className="space-y-4">
            <Label className="text-gray-800 text-lg font-semibold">Workshop Topics *</Label>
            <div className="grid md:grid-cols-2 gap-3">
              {workshopTopics.map((topic) => (
                <div key={topic.id} className="flex items-center space-x-3 p-3 rounded-lg neon-bg border border-purple-200/50">
                  <Checkbox
                    id={`edit-${topic.id}`}
                    checked={formData.workshopTopics.includes(topic.id)}
                    onCheckedChange={(checked) => handleTopicChange(topic.id, checked as boolean)}
                    className="border-purple-400 data-[state=checked]:bg-purple-500"
                  />
                  <Label htmlFor={`edit-${topic.id}`} className="text-gray-800 cursor-pointer text-sm font-medium">
                    {topic.label}
                  </Label>
                </div>
              ))}
            </div>
            {errors.topics && <p className="text-red-500 text-sm">{errors.topics}</p>}
          </div>

          {/* Programming Languages */}
          <div className="space-y-4">
            <Label className="text-gray-800 text-lg font-semibold">Programming Languages *</Label>
            <div className="grid md:grid-cols-2 gap-3">
              {programmingLanguages.map((language) => (
                <div key={language} className="flex items-center space-x-3 p-3 rounded-lg neon-bg border border-cyan-200/50">
                  <Checkbox
                    id={`edit-lang-${language}`}
                    checked={formData.programmingLanguages.includes(language)}
                    onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                    className="border-cyan-400 data-[state=checked]:bg-cyan-500"
                  />
                  <Label htmlFor={`edit-lang-${language}`} className="text-gray-800 cursor-pointer text-sm font-medium">
                    {language}
                  </Label>
                </div>
              ))}
            </div>
            {errors.languages && <p className="text-red-500 text-sm">{errors.languages}</p>}
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <Label className="text-gray-800 font-medium">Preferred Workshop Date *</Label>
            <Select value={formData.availability} onValueChange={(value) => setFormData({ ...formData, availability: value })}>
              <SelectTrigger className="neon-input text-gray-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-md border-gray-200">
                {availabilityOptions.map((option) => (
                  <SelectItem key={option} value={option} className="text-gray-800">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.availability && <p className="text-red-500 text-sm">{errors.availability}</p>}
          </div>

          {/* Expectations */}
          <div className="space-y-2">
            <Label htmlFor="edit-expectations" className="text-gray-800 font-medium">Expectations *</Label>
            <Textarea
              id="edit-expectations"
              value={formData.expectations}
              onChange={(e) => setFormData({ ...formData, expectations: e.target.value })}
              className="neon-input text-gray-800 min-h-[100px]"
            />
            {errors.expectations && <p className="text-red-500 text-sm">{errors.expectations}</p>}
          </div>

          {/* Additional Comments */}
          <div className="space-y-2">
            <Label htmlFor="edit-comments" className="text-gray-800 font-medium">Additional Comments</Label>
            <Textarea
              id="edit-comments"
              value={formData.additionalComments || ''}
              onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
              className="neon-input text-gray-800 min-h-[80px]"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button 
              onClick={onClose}
              variant="outline"
              className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              onClick={validateAndSave}
              className="flex-1 neon-button text-white font-semibold"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}