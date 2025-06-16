'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, Phone, GraduationCap, BookOpen, IdCard } from 'lucide-react';
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
    experienceLevel: data.experienceLevel || '',
    batch: data.batch || '',
    department: data.department || '',
    studentId: data.studentId || '',
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
    if (!formData.experienceLevel) newErrors.experienceLevel = 'Experience level is required';
    if (!formData.batch) newErrors.batch = 'Batch is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.studentId.trim()) newErrors.studentId = 'Student ID is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext(formData);
    }
  };

  return (
    <Card className="neon-card border-2 border-pink-200/50 shadow-2xl">
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Personal Information</h2>
            <p className="text-gray-600">Tell us about yourself to get started</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-800 flex items-center gap-2 font-medium">
                <User className="w-4 h-4 text-pink-500 neon-glow" />
                Full Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                className="neon-input text-gray-800 placeholder-gray-500"
                error={errors.name}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-800 flex items-center gap-2 font-medium">
                <Mail className="w-4 h-4 text-purple-500 neon-glow" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email address"
                className="neon-input text-gray-800 placeholder-gray-500"
                error={errors.email}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-800 flex items-center gap-2 font-medium">
                <Phone className="w-4 h-4 text-cyan-500 neon-glow" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter your phone number"
                className="neon-input text-gray-800 placeholder-gray-500"
                error={errors.phone}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentId" className="text-gray-800 flex items-center gap-2 font-medium">
                <IdCard className="w-4 h-4 text-blue-500 neon-glow" />
                Student ID *
              </Label>
              <Input
                id="studentId"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                placeholder="Enter your student ID"
                className="neon-input text-gray-800 placeholder-gray-500"
                error={errors.studentId}
              />
              {errors.studentId && <p className="text-red-500 text-sm">{errors.studentId}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-800 flex items-center gap-2 font-medium">
                <GraduationCap className="w-4 h-4 text-green-500 neon-glow" />
                Batch *
              </Label>
              <Select value={formData.batch} onValueChange={(value) => setFormData({ ...formData, batch: value })}>
                <SelectTrigger className="neon-input text-gray-800">
                  <SelectValue placeholder="Select your batch" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-md border-pink-200">
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
              <Label className="text-gray-800 flex items-center gap-2 font-medium">
                <BookOpen className="w-4 h-4 text-orange-500 neon-glow" />
                Department *
              </Label>
              <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
                <SelectTrigger className="neon-input text-gray-800">
                  <SelectValue placeholder="Select your department" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-md border-pink-200">
                  <SelectItem value="TEX" className="text-gray-800">TEX - Textile Engineering</SelectItem>
                  <SelectItem value="IPE" className="text-gray-800">IPE - Industrial & Production Engineering</SelectItem>
                  <SelectItem value="CSE" className="text-gray-800">CSE - Computer Science & Engineering</SelectItem>
                  <SelectItem value="EEE" className="text-gray-800">EEE - Electrical & Electronic Engineering</SelectItem>
                  <SelectItem value="FDAE" className="text-gray-800">FDAE - Fashion Design & Apparel Engineering</SelectItem>
                </SelectContent>
              </Select>
              {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="text-gray-800 font-medium">Experience Level with Robotics *</Label>
              <Select value={formData.experienceLevel} onValueChange={(value) => setFormData({ ...formData, experienceLevel: value })}>
                <SelectTrigger className="neon-input text-gray-800">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-md border-pink-200">
                  <SelectItem value="beginner" className="text-gray-800">Beginner - New to robotics</SelectItem>
                  <SelectItem value="intermediate" className="text-gray-800">Intermediate - Some experience</SelectItem>
                  <SelectItem value="advanced" className="text-gray-800">Advanced - Experienced in robotics</SelectItem>
                </SelectContent>
              </Select>
              {errors.experienceLevel && <p className="text-red-500 text-sm">{errors.experienceLevel}</p>}
            </div>
          </div>

          <Button 
            onClick={validateAndNext}
            className="w-full neon-button text-white font-semibold py-3 rounded-lg transition-all duration-300"
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}