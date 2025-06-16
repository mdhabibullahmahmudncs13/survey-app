'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, Phone, Building } from 'lucide-react';
import { SurveyResponse } from '@/types/survey';

interface PersonalInfoProps {
  data: Partial<SurveyResponse>;
  onNext: (data: Partial<SurveyResponse>) => void;
}

export default function PersonalInfo({ data, onNext }: PersonalInfoProps) {
  const [formData, setFormData] = useState({
    name: data.name || '',
    email: data.email || '',
    phone: data.phone || '',
    institution: data.institution || '',
    experienceLevel: data.experienceLevel || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateAndNext = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.institution.trim()) newErrors.institution = 'Institution is required';
    if (!formData.experienceLevel) newErrors.experienceLevel = 'Experience level is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext(formData);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Personal Information</h2>
            <p className="text-slate-300">Tell us about yourself to get started</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                className="bg-slate-800/50 border-slate-600 text-white"
                error={errors.name}
              />
              {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email address"
                className="bg-slate-800/50 border-slate-600 text-white"
                error={errors.email}
              />
              {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter your phone number"
                className="bg-slate-800/50 border-slate-600 text-white"
                error={errors.phone}
              />
              {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="institution" className="text-white flex items-center gap-2">
                <Building className="w-4 h-4" />
                Institution/Organization *
              </Label>
              <Input
                id="institution"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                placeholder="Your school, college, or company"
                className="bg-slate-800/50 border-slate-600 text-white"
                error={errors.institution}
              />
              {errors.institution && <p className="text-red-400 text-sm">{errors.institution}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Experience Level with Robotics *</Label>
            <Select value={formData.experienceLevel} onValueChange={(value) => setFormData({ ...formData, experienceLevel: value })}>
              <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                <SelectValue placeholder="Select your experience level" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="beginner" className="text-white">Beginner - New to robotics</SelectItem>
                <SelectItem value="intermediate" className="text-white">Intermediate - Some experience</SelectItem>
                <SelectItem value="advanced" className="text-white">Advanced - Experienced in robotics</SelectItem>
              </SelectContent>
            </Select>
            {errors.experienceLevel && <p className="text-red-400 text-sm">{errors.experienceLevel}</p>}
          </div>

          <Button 
            onClick={validateAndNext}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}