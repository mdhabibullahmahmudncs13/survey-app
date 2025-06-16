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
  Filter,
  RefreshCw,
  Database,
  AlertCircle
} from 'lucide-react';
import { SurveyResponse } from '@/types/survey';
import AdminLogin from '@/components/admin/AdminLogin';
import EditSubmissionDialog from '@/components/admin/EditSubmissionDialog';
import { databases, DATABASE_ID, COLLECTION_ID, Query } from '@/lib/appwrite';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<(SurveyResponse & { id: string; submitted_at: string })[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<(SurveyResponse & { id: string; submitted_at: string }) | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'appwrite' | 'localStorage' | 'none'>('none');

  // Fetch submissions from Appwrite or localStorage
  const fetchSubmissions = async () => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    setError(null);

    try {
      // Try Appwrite first
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID,
          [
            Query.orderDesc('submitted_at'),
            Query.limit(100)
          ]
        );
        
        const formattedSubmissions = response.documents.map(doc => ({
          id: doc.$id,
          name: doc.name,
          email: doc.email,
          phone: doc.phone,
          studentId: doc.student_id,
          batch: doc.batch as any,
          department: doc.department as any,
          experienceLevel: doc.experience_level as any,
          workshopTopics: doc.workshop_topics,
          expectations: doc.expectations,
          programmingLanguages: doc.programming_languages,
          availability: doc.availability,
          additionalComments: doc.additional_comments,
          submitted_at: doc.submitted_at
        }));
        
        setSubmissions(formattedSubmissions);
        setDataSource('appwrite');
        console.log('Loaded submissions from Appwrite:', formattedSubmissions.length);
      } catch (appwriteError) {
        console.warn('Appwrite fetch failed, trying localStorage:', appwriteError);
        
        // Fallback to localStorage
        const localData = localStorage.getItem('ncc_survey_submissions');
        if (localData) {
          const parsedData = JSON.parse(localData);
          setSubmissions(parsedData);
          setDataSource('localStorage');
          console.log('Loaded submissions from localStorage:', parsedData.length);
        } else {
          setSubmissions([]);
          setDataSource('none');
          console.log('No submissions found in localStorage');
        }
      }
    } catch (err) {
      console.error('Failed to fetch submissions:', err);
      setError('Failed to load submissions. Please try again.');
      setSubmissions([]);
      setDataSource('none');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [isAuthenticated]);

  const handleLogin = (success: boolean) => {
    setIsAuthenticated(success);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setSubmissions([]);
    setSearchTerm('');
    setSelectedSubmission(null);
    setError(null);
    setDataSource('none');
  };

  const handleEdit = (submission: SurveyResponse & { id: string; submitted_at: string }) => {
    setSelectedSubmission(submission);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async (updatedSubmission: SurveyResponse & { id: string; submitted_at: string }) => {
    try {
      if (dataSource === 'appwrite') {
        // Update in Appwrite
        const updateData = {
          name: updatedSubmission.name,
          email: updatedSubmission.email,
          phone: updatedSubmission.phone,
          student_id: updatedSubmission.studentId,
          batch: updatedSubmission.batch,
          department: updatedSubmission.department,
          experience_level: updatedSubmission.experienceLevel,
          workshop_topics: updatedSubmission.workshopTopics,
          expectations: updatedSubmission.expectations,
          programming_languages: updatedSubmission.programmingLanguages,
          availability: updatedSubmission.availability,
          additional_comments: updatedSubmission.additionalComments || '',
        };

        await databases.updateDocument(
          DATABASE_ID,
          COLLECTION_ID,
          updatedSubmission.id,
          updateData
        );
      } else if (dataSource === 'localStorage') {
        // Update in localStorage
        const localData = JSON.parse(localStorage.getItem('ncc_survey_submissions') || '[]');
        const updatedData = localData.map((sub: any) => 
          sub.id === updatedSubmission.id ? updatedSubmission : sub
        );
        localStorage.setItem('ncc_survey_submissions', JSON.stringify(updatedData));
      }

      // Update local state
      setSubmissions(prev => 
        prev.map(sub => sub.id === updatedSubmission.id ? updatedSubmission : sub)
      );
      
      setIsEditDialogOpen(false);
      setSelectedSubmission(null);
    } catch (err) {
      console.error('Failed to update submission:', err);
      setError('Failed to update submission. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      if (dataSource === 'appwrite') {
        // Delete from Appwrite
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      } else if (dataSource === 'localStorage') {
        // Delete from localStorage
        const localData = JSON.parse(localStorage.getItem('ncc_survey_submissions') || '[]');
        const filteredData = localData.filter((sub: any) => sub.id !== id);
        localStorage.setItem('ncc_survey_submissions', JSON.stringify(filteredData));
      }

      // Update local state
      setSubmissions(prev => prev.filter(sub => sub.id !== id));
    } catch (err) {
      console.error('Failed to delete submission:', err);
      setError('Failed to delete submission. Please try again.');
    }
  };

  const handleExportCSV = () => {
    const headers = [
      'Name', 'Email', 'Phone', 'Student ID', 'Batch', 'Department', 
      'Experience Level', 'Workshop Topics', 'Programming Languages', 
      'Preferred Date', 'Expectations', 'Additional Comments', 'Submitted At'
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

  const formatDate = (dateString: string) => {
    // Handle both old and new date formats
    if (dateString.includes('-') && dateString.includes('(')) {
      const parts = dateString.split('-');
      if (parts.length >= 2) {
        return `${parts[0]} (${parts[1]})`;
      }
    }
    return dateString;
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-200/20 to-transparent rounded-full floating-animation" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-200/20 to-transparent rounded-full floating-animation" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Shield className="w-8 h-8 text-purple-500 neon-glow" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
              <p className="text-gray-600">NCC Robotics Workshop Submissions</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              onClick={fetchSubmissions}
              variant="outline"
              className="border-2 border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-all duration-300"
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="border-2 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-all duration-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Data Source Indicator */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Database className="w-4 h-4" />
            <span className="text-gray-600">Data Source:</span>
            {dataSource === 'appwrite' && (
              <Badge variant="outline" className="border-green-400 text-green-700 bg-green-50">
                Appwrite Database
              </Badge>
            )}
            {dataSource === 'localStorage' && (
              <Badge variant="outline" className="border-yellow-400 text-yellow-700 bg-yellow-50">
                Local Storage (Fallback)
              </Badge>
            )}
            {dataSource === 'none' && (
              <Badge variant="outline" className="border-gray-400 text-gray-700 bg-gray-50">
                No Data
              </Badge>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-600 text-sm font-medium">Error</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="neon-card border-2 border-blue-200/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Users className="w-8 h-8 text-blue-500 neon-glow" />
                <div>
                  <p className="text-gray-600 text-sm">Total Submissions</p>
                  <p className="text-2xl font-bold text-gray-800">{submissions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="neon-card border-2 border-green-200/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Calendar className="w-8 h-8 text-green-500 neon-glow" />
                <div>
                  <p className="text-gray-600 text-sm">Today's Submissions</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {submissions.filter(sub => 
                      new Date(sub.submitted_at).toDateString() === new Date().toDateString()
                    ).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="neon-card border-2 border-yellow-200/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Filter className="w-8 h-8 text-yellow-500 neon-glow" />
                <div>
                  <p className="text-gray-600 text-sm">Filtered Results</p>
                  <p className="text-2xl font-bold text-gray-800">{filteredSubmissions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="neon-card border-2 border-purple-200/50 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <Search className="w-5 h-5 text-gray-500" />
                <Input
                  placeholder="Search by name, email, student ID, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="neon-input text-gray-800 placeholder-gray-500 flex-1"
                />
              </div>
              <Button 
                onClick={handleExportCSV}
                className="neon-button text-white font-semibold"
                disabled={submissions.length === 0}
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Submissions Table */}
        <Card className="neon-card border-2 border-cyan-200/50">
          <CardHeader>
            <CardTitle className="text-gray-800">Survey Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="w-6 h-6 animate-spin text-gray-500 mr-2" />
                <span className="text-gray-600">Loading submissions...</span>
              </div>
            ) : submissions.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg font-medium">No submissions found</p>
                <p className="text-gray-500 text-sm">
                  {dataSource === 'none' 
                    ? 'Submit a survey to see data here, or check your Appwrite configuration.'
                    : 'No survey responses have been submitted yet.'
                  }
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200">
                      <TableHead className="text-gray-600 font-semibold">Name</TableHead>
                      <TableHead className="text-gray-600 font-semibold">Student ID</TableHead>
                      <TableHead className="text-gray-600 font-semibold">Department</TableHead>
                      <TableHead className="text-gray-600 font-semibold">Batch</TableHead>
                      <TableHead className="text-gray-600 font-semibold">Experience</TableHead>
                      <TableHead className="text-gray-600 font-semibold">Preferred Date</TableHead>
                      <TableHead className="text-gray-600 font-semibold">Submitted</TableHead>
                      <TableHead className="text-gray-600 font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id} className="border-gray-200 hover:bg-gray-50/50 transition-colors">
                        <TableCell className="text-gray-800 font-medium">
                          {submission.name}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {submission.studentId}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-blue-400 text-blue-700 bg-blue-50">
                            {departmentLabels[submission.department]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {submission.batch}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={
                              submission.experienceLevel === 'beginner' 
                                ? 'border-green-400 text-green-700 bg-green-50'
                                : submission.experienceLevel === 'intermediate'
                                ? 'border-yellow-400 text-yellow-700 bg-yellow-50'
                                : 'border-red-400 text-red-700 bg-red-50'
                            }
                          >
                            {submission.experienceLevel}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {formatDate(submission.availability)}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {new Date(submission.submitted_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50">
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-white/95 backdrop-blur-md border-gray-200 text-gray-800 max-w-2xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Submission Details</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-gray-600">Name</Label>
                                      <p className="text-gray-800 font-medium">{submission.name}</p>
                                    </div>
                                    <div>
                                      <Label className="text-gray-600">Email</Label>
                                      <p className="text-gray-800 font-medium break-all">{submission.email}</p>
                                    </div>
                                    <div>
                                      <Label className="text-gray-600">Phone</Label>
                                      <p className="text-gray-800 font-medium">{submission.phone}</p>
                                    </div>
                                    <div>
                                      <Label className="text-gray-600">Student ID</Label>
                                      <p className="text-gray-800 font-medium">{submission.studentId}</p>
                                    </div>
                                    <div>
                                      <Label className="text-gray-600">Batch</Label>
                                      <p className="text-gray-800 font-medium">{submission.batch}</p>
                                    </div>
                                    <div>
                                      <Label className="text-gray-600">Department</Label>
                                      <p className="text-gray-800 font-medium">{departmentLabels[submission.department]}</p>
                                    </div>
                                  </div>
                                  <Separator className="bg-gray-200" />
                                  <div>
                                    <Label className="text-gray-600">Workshop Topics</Label>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                      {submission.workshopTopics.map(topic => (
                                        <Badge key={topic} variant="outline" className="border-green-400 text-green-700 bg-green-50">
                                          {topic.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="text-gray-600">Programming Languages</Label>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                      {submission.programmingLanguages.map(lang => (
                                        <Badge key={lang} variant="outline" className="border-blue-400 text-blue-700 bg-blue-50">
                                          {lang}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="text-gray-600">Preferred Workshop Date</Label>
                                    <p className="text-gray-800 font-medium">{formatDate(submission.availability)}</p>
                                  </div>
                                  <div>
                                    <Label className="text-gray-600">Expectations</Label>
                                    <p className="text-gray-800 whitespace-pre-wrap">{submission.expectations}</p>
                                  </div>
                                  {submission.additionalComments && (
                                    <div>
                                      <Label className="text-gray-600">Additional Comments</Label>
                                      <p className="text-gray-800 whitespace-pre-wrap">{submission.additionalComments}</p>
                                    </div>
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-yellow-300 text-yellow-600 hover:bg-yellow-50"
                              onClick={() => handleEdit(submission)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg-white/95 backdrop-blur-md border-gray-200">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-gray-800">Delete Submission</AlertDialogTitle>
                                  <AlertDialogDescription className="text-gray-600">
                                    Are you sure you want to delete {submission.name}'s submission? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="border-gray-300 text-gray-600">Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleDelete(submission.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white"
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
            )}
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