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
  '20 June (9 AM - 4 PM)',
  '21 June (9 AM - 4 PM)',
  '22 June (9 AM - 4 PM)',
  '23 June (9 AM - 4 PM)',
  '24 June (9 AM - 4 PM)',
  '25 June (9 AM - 4 PM)',
  '26 June (9 AM - 4 PM)',
  '27 June (9 AM - 4 PM)',
  '28 June (9 AM - 4 PM)',
  '29 June (9 AM - 4 PM)',
  '30 June (9 AM - 4 PM)'
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
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Edit Submission
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name" className="text-white">Full Name *</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-slate-800/50 border-slate-600 text-white"
                />
                {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-email" className="text-white">Email Address *</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-slate-800/50 border-slate-600 text-white"
                />
                {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-phone" className="text-white">Phone Number *</Label>
                <Input
                  id="edit-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-slate-800/50 border-slate-600 text-white"
                />
                {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-studentId" className="text-white">Student ID *</Label>
                <Input
                  id="edit-studentId"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  className="bg-slate-800/50 border-slate-600 text-white"
                />
                {errors.studentId && <p className="text-red-400 text-sm">{errors.studentId}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-white">Batch *</Label>
                <Select value={formData.batch} onValueChange={(value) => setFormData({ ...formData, batch: value as any })}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="10th" className="text-white">10th</SelectItem>
                    <SelectItem value="11th" className="text-white">11th</SelectItem>
                    <SelectItem value="12th" className="text-white">12th</SelectItem>
                    <SelectItem value="13th" className="text-white">13th</SelectItem>
                    <SelectItem value="14th" className="text-white">14th</SelectItem>
                  </SelectContent>
                </Select>
                {errors.batch && <p className="text-red-400 text-sm">{errors.batch}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-white">Department *</Label>
                <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value as any })}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="TEX" className="text-white">TEX - Textile Engineering</SelectItem>
                    <SelectItem value="IPE" className="text-white">IPE - Industrial & Production Engineering</SelectItem>
                    <SelectItem value="CSE" className="text-white">CSE - Computer Science & Engineering</SelectItem>
                    <SelectItem value="EEE" className="text-white">EEE - Electrical & Electronic Engineering</SelectItem>
                    <SelectItem value="FDAE" className="text-white">FDAE - Fashion Design & Apparel Engineering</SelectItem>
                  </SelectContent>
                </Select>
                {errors.department && <p className="text-red-400 text-sm">{errors.department}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Experience Level *</Label>
              <Select value={formData.experienceLevel} onValueChange={(value) => setFormData({ ...formData, experienceLevel: value as any })}>
                <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="beginner" className="text-white">Beginner - New to robotics</SelectItem>
                  <SelectItem value="intermediate" className="text-white">Intermediate - Some experience</SelectItem>
                  <SelectItem value="advanced" className="text-white">Advanced - Experienced in robotics</SelectItem>
                </SelectContent>
              </Select>
              {errors.experienceLevel && <p className="text-red-400 text-sm">{errors.experienceLevel}</p>}
            </div>
          </div>

          {/* Workshop Topics */}
          <div className="space-y-4">
            <Label className="text-white text-lg">Workshop Topics *</Label>
            <div className="grid md:grid-cols-2 gap-3">
              {workshopTopics.map((topic) => (
                <div key={topic.id} className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700">
                  <Checkbox
                    id={`edit-${topic.id}`}
                    checked={formData.workshopTopics.includes(topic.id)}
                    onCheckedChange={(checked) => handleTopicChange(topic.id, checked as boolean)}
                    className="border-slate-500"
                  />
                  <Label htmlFor={`edit-${topic.id}`} className="text-white cursor-pointer text-sm">
                    {topic.label}
                  </Label>
                </div>
              ))}
            </div>
            {errors.topics && <p className="text-red-400 text-sm">{errors.topics}</p>}
          </div>

          {/* Programming Languages */}
          <div className="space-y-4">
            <Label className="text-white text-lg">Programming Languages *</Label>
            <div className="grid md:grid-cols-2 gap-3">
              {programmingLanguages.map((language) => (
                <div key={language} className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700">
                  <Checkbox
                    id={`edit-lang-${language}`}
                    checked={formData.programmingLanguages.includes(language)}
                    onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                    className="border-slate-500"
                  />
                  <Label htmlFor={`edit-lang-${language}`} className="text-white cursor-pointer text-sm">
                    {language}
                  </Label>
                </div>
              ))}
            </div>
            {errors.languages && <p className="text-red-400 text-sm">{errors.languages}</p>}
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <Label className="text-white">Preferred Workshop Date *</Label>
            <Select value={formData.availability} onValueChange={(value) => setFormData({ ...formData, availability: value })}>
              <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                <SelectValue />
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

          {/* Expectations */}
          <div className="space-y-2">
            <Label htmlFor="edit-expectations" className="text-white">Expectations *</Label>
            <Textarea
              id="edit-expectations"
              value={formData.expectations}
              onChange={(e) => setFormData({ ...formData, expectations: e.target.value })}
              className="bg-slate-800/50 border-slate-600 text-white min-h-[100px]"
            />
            {errors.expectations && <p className="text-red-400 text-sm">{errors.expectations}</p>}
          </div>

          {/* Additional Comments */}
          <div className="space-y-2">
            <Label htmlFor="edit-comments" className="text-white">Additional Comments</Label>
            <Textarea
              id="edit-comments"
              value={formData.additionalComments || ''}
              onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
              className="bg-slate-800/50 border-slate-600 text-white min-h-[80px]"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button 
              onClick={onClose}
              variant="outline"
              className="flex-1 border-slate-600 text-white hover:bg-slate-800"
            >
              Cancel
            </Button>
            <Button 
              onClick={validateAndSave}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
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