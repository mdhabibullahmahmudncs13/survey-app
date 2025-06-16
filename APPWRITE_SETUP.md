# Appwrite Setup Guide for NCC Robotics Survey

This guide will help you set up Appwrite as the backend for the NCC Robotics survey website.

## Prerequisites

- Node.js installed on your system
- An Appwrite Cloud account or self-hosted Appwrite instance
- Basic understanding of databases and collections

## Step 1: Create Appwrite Account

1. Go to [Appwrite Cloud](https://cloud.appwrite.io/) and create a free account
2. Verify your email address
3. Create a new project called "NCC Robotics Survey"

## Step 2: Project Setup

1. After creating the project, note down your:
   - **Project ID** (found in project settings)
   - **API Endpoint** (usually `https://cloud.appwrite.io/v1`)

2. Go to **Settings** → **API Keys** and create a new API key with the following scopes:
   - `databases.read`
   - `databases.write`
   - `collections.read`
   - `collections.write`
   - `documents.read`
   - `documents.write`
   - `attributes.read`
   - `attributes.write`
   - `indexes.read`
   - `indexes.write`

## Step 3: Database Configuration

1. Navigate to **Databases** in your Appwrite console
2. Create a new database called `ncc_robotics_survey`
3. Note down the **Database ID**

### Create Collections

Create the following collections:

#### 1. Survey Responses Collection
- **Collection ID**: `survey_responses`
- **Name**: Survey Responses

**Attributes**:
```
name (String, required, size: 100)
email (Email, required, size: 100)
phone (String, required, size: 20)
student_id (String, required, size: 50)
batch (String, required, size: 10)
department (String, required, size: 10)
experience_level (String, required, size: 20)
workshop_topics (String[], required)
expectations (String, required, size: 2000)
programming_languages (String[], required)
availability (String, required, size: 100)
additional_comments (String, optional, size: 2000)
submitted_at (DateTime, required, default: now())
```

**Indexes** (for better query performance):
- `email_index` on `email` field
- `department_index` on `department` field
- `batch_index` on `batch` field
- `submitted_at_index` on `submitted_at` field

#### 2. Workshop Sessions Collection (Optional)
- **Collection ID**: `workshop_sessions`
- **Name**: Workshop Sessions

**Attributes**:
```
title (String, required, size: 200)
description (String, required, size: 1000)
date (DateTime, required)
duration (String, required, size: 50)
max_participants (Integer, required)
current_participants (Integer, required, default: 0)
topics (String[], required)
instructor (String, required, size: 100)
location (String, required, size: 200)
status (String, required, size: 20, default: "scheduled")
created_at (DateTime, required, default: now())
updated_at (DateTime, required, default: now())
```

## Step 4: Environment Variables

Create a `.env.local` file in your Next.js project root with the following variables:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here
NEXT_PUBLIC_APPWRITE_COLLECTION_ID=survey_responses
NEXT_PUBLIC_APPWRITE_SESSIONS_COLLECTION_ID=workshop_sessions

# Server-side API Key (keep this secret!)
APPWRITE_API_KEY=your_api_key_here

# Admin Authentication (for demo purposes)
ADMIN_EMAIL=admin@ncc.com
ADMIN_PASSWORD=adminXncc
```

## Step 5: Permissions Setup

For each collection, set up the following permissions:

### Survey Responses Collection
- **Create**: Any (for public survey submission)
- **Read**: Users (for admin dashboard)
- **Update**: Users (for admin purposes)
- **Delete**: Users (for admin purposes)

### Workshop Sessions Collection (if used)
- **Create**: Users (admin only)
- **Read**: Any (public viewing)
- **Update**: Users (admin only)
- **Delete**: Users (admin only)

## Step 6: Update Application Code

The application is already configured to work with Appwrite. You'll need to update the following files:

### 1. Update Survey Submission (`components/survey/ReviewSubmit.tsx`)

Replace the mock submission with actual Appwrite integration:

```typescript
import { databases, DATABASE_ID, COLLECTION_ID } from '@/lib/appwrite';
import { ID } from 'appwrite';

const handleSubmit = async () => {
  setIsSubmitting(true);
  setError(null);

  try {
    const submissionData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      student_id: data.studentId,
      batch: data.batch,
      department: data.department,
      experience_level: data.experienceLevel,
      workshop_topics: data.workshopTopics,
      expectations: data.expectations,
      programming_languages: data.programmingLanguages,
      availability: data.availability,
      additional_comments: data.additionalComments || '',
      submitted_at: new Date().toISOString()
    };

    await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      submissionData
    );

    onSuccess();
  } catch (err) {
    console.error('Submission error:', err);
    setError('Failed to submit survey. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
```

### 2. Update Admin Panel (`app/admin/page.tsx`)

Replace mock data with actual Appwrite queries:

```typescript
import { databases, DATABASE_ID, COLLECTION_ID, Query } from '@/lib/appwrite';

useEffect(() => {
  const fetchSubmissions = async () => {
    if (isAuthenticated) {
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
          batch: doc.batch,
          department: doc.department,
          experienceLevel: doc.experience_level,
          workshopTopics: doc.workshop_topics,
          expectations: doc.expectations,
          programmingLanguages: doc.programming_languages,
          availability: doc.availability,
          additionalComments: doc.additional_comments,
          submitted_at: doc.submitted_at
        }));
        
        setSubmissions(formattedSubmissions);
      } catch (error) {
        console.error('Failed to fetch submissions:', error);
      }
    }
  };

  fetchSubmissions();
}, [isAuthenticated]);
```

## Step 7: Testing the Connection

1. Start your Next.js development server: `npm run dev`
2. Try submitting a test survey response
3. Check your Appwrite console to verify the data was stored
4. Test the admin panel to ensure data is displayed correctly

## Step 8: Production Deployment

### Environment Variables for Production
Make sure to set the following environment variables in your production environment:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_production_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_production_database_id
NEXT_PUBLIC_APPWRITE_COLLECTION_ID=survey_responses
APPWRITE_API_KEY=your_production_api_key
```

### Domain Configuration
1. In your Appwrite console, go to **Settings** → **Platforms**
2. Add your production domain (e.g., `https://ncc-robotics.com`)
3. Add your development domain (e.g., `http://localhost:3000`)

## Security Best Practices

1. **API Keys**: Never expose your API key in client-side code
2. **Permissions**: Set up proper read/write permissions for collections
3. **Validation**: Always validate data on both client and server side
4. **Rate Limiting**: Consider implementing rate limiting for form submissions
5. **HTTPS**: Always use HTTPS in production
6. **Environment Variables**: Keep sensitive data in environment variables

## Advanced Features

### 1. Real-time Updates
Enable real-time updates for the admin dashboard:

```typescript
import { client } from '@/lib/appwrite';

useEffect(() => {
  const unsubscribe = client.subscribe(
    `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`,
    (response) => {
      // Handle real-time updates
      fetchSubmissions();
    }
  );

  return () => unsubscribe();
}, []);
```

### 2. File Uploads
If you need to handle file uploads (e.g., resumes, portfolios):

```typescript
import { storage } from '@/lib/appwrite';

const uploadFile = async (file: File) => {
  try {
    const response = await storage.createFile(
      'bucket_id',
      ID.unique(),
      file
    );
    return response;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};
```

### 3. Email Notifications
Set up email notifications for new submissions using Appwrite Functions.

## Backup and Monitoring

1. **Regular Backups**: Set up automated database backups
2. **Usage Monitoring**: Monitor API usage through the Appwrite console
3. **Error Tracking**: Implement error tracking for production
4. **Performance Monitoring**: Monitor query performance and optimize as needed

## Troubleshooting

### Common Issues:

1. **CORS Errors**: 
   - Make sure your domain is added to the platform settings in Appwrite
   - Check that the endpoint URL is correct

2. **Permission Denied**: 
   - Verify collection permissions are set correctly
   - Ensure API key has the required scopes

3. **Connection Failed**: 
   - Verify your endpoint URL and project ID
   - Check network connectivity

4. **Data Not Appearing**:
   - Check attribute names match exactly
   - Verify data types are correct
   - Check for validation errors

### Getting Help:

- [Appwrite Documentation](https://appwrite.io/docs)
- [Appwrite Discord Community](https://discord.gg/GSeTUeA)
- [GitHub Issues](https://github.com/appwrite/appwrite/issues)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/appwrite)

## Migration from Mock Data

If you're migrating from the current mock data setup:

1. **Backup Current Data**: Export any existing mock data
2. **Update Components**: Replace mock data calls with Appwrite queries
3. **Test Thoroughly**: Test all CRUD operations
4. **Update Types**: Ensure TypeScript types match Appwrite document structure
5. **Handle Errors**: Implement proper error handling for network issues

## Performance Optimization

1. **Pagination**: Implement pagination for large datasets
2. **Caching**: Use appropriate caching strategies
3. **Indexes**: Create indexes on frequently queried fields
4. **Query Optimization**: Use specific queries instead of fetching all data
5. **Image Optimization**: Use Appwrite's image transformation features

---

**Note**: This setup assumes you're using Appwrite Cloud. If you're self-hosting Appwrite, replace the endpoint URL with your own server URL and ensure your server is properly configured with SSL certificates.

## Next Steps

After setting up Appwrite:

1. ✅ Test the survey form thoroughly
2. ✅ Set up the admin dashboard to view responses
3. ✅ Configure email notifications for new submissions
4. ✅ Implement real-time updates for workshop capacity
5. ✅ Set up automated backups
6. ✅ Configure monitoring and alerts
7. ✅ Implement advanced features as needed

For any questions or issues during setup, refer to the troubleshooting section or reach out to the Appwrite community for support.