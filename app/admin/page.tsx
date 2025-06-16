'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { 
  Shield, 
  Eye, 
  Edit, 
  Trash2, 
  Users, 
  Calendar, 
  Download,
  LogOut,
  Search,
  Filter
} from 'lucide-react';
import { SurveyResponse } from '@/types/survey';
import AdminLogin from '@/components/admin/AdminLogin';
import EditSubmissionDialog from '@/components/admin/EditSubmissionDialog';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<(SurveyResponse & { id: string; submitted_at: string })[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<(SurveyResponse & { id: string; submitted_at: string }) | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    if (isAuthenticated) {
      // In a real app, this would fetch from Appwrite
      const mockSubmissions = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@student.ncc.edu',
          phone: '+1234567890',
          studentId: 'NCC2024001',
          batch: '12th' as const,
          department: 'CSE' as const,
          experienceLevel: 'beginner' as const,
          workshopTopics: ['arduino-basics', 'sensor-integration'],
          expectations: 'I want to learn the basics of robotics and how to program Arduino boards.',
          programmingLanguages: ['Python', 'C/C++'],
          availability: '22 June (9 AM - 4 PM)',
          additionalComments: 'Very excited to participate!',
          submitted_at: '2025-01-08T10:30:00Z'
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane.smith@student.ncc.edu',
          phone: '+1234567891',
          studentId: 'NCC2024002',
          batch: '13th' as const,
          department: 'EEE' as const,
          experienceLevel: 'intermediate' as const,
          workshopTopics: ['ai-robotics', 'computer-vision'],
          expectations: 'Looking forward to advanced AI applications in robotics.',
          programmingLanguages: ['Python', 'MATLAB', 'JavaScript'],
          availability: '25 June (9 AM - 4 PM)',
          additionalComments: '',
          submitted_at: '2025-01-08T14:15:00Z'
        }
      ];
      setSubmissions(mockSubmissions);
    }
  }, [isAuthenticated]);

  const handleLogin = (success: boolean) => {
    setIsAuthenticated(success);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setSubmissions([]);
    setSearchTerm('');
    setSelectedSubmission(null);
  };

  const handleEdit = (submission: SurveyResponse & { id: string; submitted_at: string }) => {
    setSelectedSubmission(submission);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = (updatedSubmission: SurveyResponse & { id: string; submitted_at: string }) => {
    setSubmissions(prev => 
      prev.map(sub => sub.id === updatedSubmission.id ? updatedSubmission : sub)
    );
    setIsEditDialogOpen(false);
    setSelectedSubmission(null);
  };

  const handleDelete = (id: string) => {
    setSubmissions(prev => prev.filter(sub => sub.id !== id));
  };

  const handleExportCSV = () => {
    const headers = [
      'Name', 'Email', 'Phone', 'Student ID', 'Batch', 'Department', 
      'Experience Level', 'Workshop Topics', 'Programming Languages', 
      'Availability', 'Expectations', 'Additional Comments', 'Submitted At'
    ];
    
    const csvContent = [
      headers.join(','),
      ...submissions.map(sub => [
        sub.name,
        sub.email,
        sub.phone,
        sub.studentId,
        sub.batch,
        sub.department,
        sub.experienceLevel,
        sub.workshopTopics.join('; '),
        sub.programmingLanguages.join('; '),
        sub.availability,
        `"${sub.expectations.replace(/"/g, '""')}"`,
        `"${(sub.additionalComments || '').replace(/"/g, '""')}"`,
        new Date(sub.submitted_at).toLocaleString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ncc-robotics-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredSubmissions = submissions.filter(sub =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const departmentLabels = {
    TEX: 'TEX',
    IPE: 'IPE',
    CSE: 'CSE',
    EEE: 'EEE',
    FDAE: 'FDAE'
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-600/10 to-transparent rounded-full animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-600/10 to-transparent rounded-full animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Shield className="w-8 h-8 text-cyan-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
              <p className="text-slate-300">NCC Robotics Workshop Submissions</p>
            </div>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="border-red-600 text-red-300 hover:bg-red-600/20"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Users className="w-8 h-8 text-cyan-400" />
                <div>
                  <p className="text-slate-300 text-sm">Total Submissions</p>
                  <p className="text-2xl font-bold text-white">{submissions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Calendar className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-slate-300 text-sm">Today's Submissions</p>
                  <p className="text-2xl font-bold text-white">
                    {submissions.filter(sub => 
                      new Date(sub.submitted_at).toDateString() === new Date().toDateString()
                    ).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Filter className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-slate-300 text-sm">Filtered Results</p>
                  <p className="text-2xl font-bold text-white">{filteredSubmissions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <Search className="w-5 h-5 text-slate-400" />
                <Input
                  placeholder="Search by name, email, student ID, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-800/50 border-slate-600 text-white flex-1"
                />
              </div>
              <Button 
                onClick={handleExportCSV}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Submissions Table */}
        <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Survey Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">Name</TableHead>
                    <TableHead className="text-slate-300">Student ID</TableHead>
                    <TableHead className="text-slate-300">Department</TableHead>
                    <TableHead className="text-slate-300">Batch</TableHead>
                    <TableHead className="text-slate-300">Experience</TableHead>
                    <TableHead className="text-slate-300">Preferred Date</TableHead>
                    <TableHead className="text-slate-300">Submitted</TableHead>
                    <TableHead className="text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id} className="border-slate-700">
                      <TableCell className="text-white font-medium">
                        {submission.name}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {submission.studentId}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-blue-600 text-blue-300">
                          {departmentLabels[submission.department]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {submission.batch}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={
                            submission.experienceLevel === 'beginner' 
                              ? 'border-green-600 text-green-300'
                              : submission.experienceLevel === 'intermediate'
                              ? 'border-yellow-600 text-yellow-300'
                              : 'border-red-600 text-red-300'
                          }
                        >
                          {submission.experienceLevel}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {submission.availability}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {new Date(submission.submitted_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Submission Details</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-slate-300">Name</Label>
                                    <p className="text-white">{submission.name}</p>
                                  </div>
                                  <div>
                                    <Label className="text-slate-300">Email</Label>
                                    <p className="text-white">{submission.email}</p>
                                  </div>
                                  <div>
                                    <Label className="text-slate-300">Phone</Label>
                                    <p className="text-white">{submission.phone}</p>
                                  </div>
                                  <div>
                                    <Label className="text-slate-300">Student ID</Label>
                                    <p className="text-white">{submission.studentId}</p>
                                  </div>
                                  <div>
                                    <Label className="text-slate-300">Batch</Label>
                                    <p className="text-white">{submission.batch}</p>
                                  </div>
                                  <div>
                                    <Label className="text-slate-300">Department</Label>
                                    <p className="text-white">{departmentLabels[submission.department]}</p>
                                  </div>
                                </div>
                                <Separator className="bg-slate-700" />
                                <div>
                                  <Label className="text-slate-300">Workshop Topics</Label>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {submission.workshopTopics.map(topic => (
                                      <Badge key={topic} variant="outline" className="border-green-600 text-green-300">
                                        {topic.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-slate-300">Programming Languages</Label>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {submission.programmingLanguages.map(lang => (
                                      <Badge key={lang} variant="outline" className="border-blue-600 text-blue-300">
                                        {lang}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-slate-300">Preferred Workshop Date</Label>
                                  <p className="text-white">{submission.availability}</p>
                                </div>
                                <div>
                                  <Label className="text-slate-300">Expectations</Label>
                                  <p className="text-white">{submission.expectations}</p>
                                </div>
                                {submission.additionalComments && (
                                  <div>
                                    <Label className="text-slate-300">Additional Comments</Label>
                                    <p className="text-white">{submission.additionalComments}</p>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-yellow-600 text-yellow-300"
                            onClick={() => handleEdit(submission)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="outline" className="border-red-600 text-red-300">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-slate-900 border-slate-700">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-white">Delete Submission</AlertDialogTitle>
                                <AlertDialogDescription className="text-slate-300">
                                  Are you sure you want to delete {submission.name}'s submission? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="border-slate-600 text-slate-300">Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDelete(submission.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        {selectedSubmission && (
          <EditSubmissionDialog
            submission={selectedSubmission}
            isOpen={isEditDialogOpen}
            onClose={() => {
              setIsEditDialogOpen(false);
              setSelectedSubmission(null);
            }}
            onSave={handleSaveEdit}
          />
        )}
      </div>
    </div>
  );
}