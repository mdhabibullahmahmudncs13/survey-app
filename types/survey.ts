export interface SurveyResponse {
  name: string;
  email: string;
  phone: string;
  institution: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  batch: '10th' | '11th' | '12th' | '13th' | '14th';
  department: 'TEX' | 'IPE' | 'CSE' | 'EEE' | 'FDAE';
  studentId: string;
  workshopTopics: string[];
  expectations: string;
  programmingLanguages: string[];
  availability: string;
  additionalComments?: string;
}

export interface SurveyStep {
  id: number;
  title: string;
  description: string;
  component: React.ComponentType<any>;
}

export interface WorkshopSession {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  maxParticipants: number;
  currentParticipants: number;
}