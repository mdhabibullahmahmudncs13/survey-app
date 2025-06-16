# Appwrite Setup Guide for NCC Robotics Survey

This comprehensive guide will help you set up Appwrite as the backend for the NCC Robotics survey website and resolve the persistent fallback issues.

## Current Issue Analysis

The application keeps falling back to localStorage because:
1. **Missing Environment Variables**: `.env.local` file is not properly configured
2. **Incorrect Database Schema**: Appwrite collections don't match the application structure
3. **Permission Issues**: Collections may not have proper read/write permissions
4. **Network/Configuration Errors**: Endpoint or project ID might be incorrect

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

Create the following collections with **EXACT** attribute names:

#### 1. Survey Responses Collection
- **Collection ID**: `survey_responses`
- **Name**: Survey Responses

**Attributes** (Create these in order):
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

**Important Notes:**
- Use `student_id` (with underscore), not `studentId`
- Use `experience_level` (with underscore), not `experienceLevel`
- Use `workshop_topics` (with underscore), not `workshopTopics`
- Use `programming_languages` (with underscore), not `programmingLanguages`
- Use `additional_comments` (with underscore), not `additionalComments`
- Use `submitted_at` (with underscore), not `submittedAt`

**Indexes** (for better query performance):
- `email_index` on `email` field (type: key)
- `department_index` on `department` field (type: key)
- `batch_index` on `batch` field (type: key)
- `submitted_at_index` on `submitted_at` field (type: key)

## Step 4: Permissions Setup

**CRITICAL**: Set up permissions correctly to avoid access issues.

### Survey Responses Collection Permissions:
1. Go to your `survey_responses` collection
2. Click on **Settings** → **Permissions**
3. Add the following permissions:

**Create Documents:**
- Role: `any`
- Permission: `create`

**Read Documents:**
- Role: `any`
- Permission: `read`

**Update Documents:**
- Role: `any`
- Permission: `update`

**Delete Documents:**
- Role: `any`
- Permission: `delete`

## Step 5: Environment Variables

Create a `.env.local` file in your Next.js project root with the following variables:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_actual_project_id_here
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_actual_database_id_here
NEXT_PUBLIC_APPWRITE_COLLECTION_ID=survey_responses

# Server-side API Key (keep this secret!)
APPWRITE_API_KEY=your_actual_api_key_here

# Admin Authentication (for demo purposes)
ADMIN_EMAIL=admin@ncc.com
ADMIN_PASSWORD=adminXncc
```

**Replace the placeholder values with your actual Appwrite credentials:**
- `your_actual_project_id_here` → Your Project ID from Appwrite console
- `your_actual_database_id_here` → Your Database ID from Appwrite console
- `your_actual_api_key_here` → Your API Key from Appwrite console

## Step 6: Platform Configuration

**CRITICAL**: Add your domains to Appwrite platforms.

1. In your Appwrite console, go to **Settings** → **Platforms**
2. Click **Add Platform** → **Web**
3. Add the following domains:
   - `http://localhost:3000` (for development)
   - `https://localhost:3000` (for development with HTTPS)
   - Your production domain (e.g., `https://your-domain.com`)

## Step 7: Testing the Connection

### Test 1: Check Environment Variables
1. Restart your development server: `npm run dev`
2. Open browser console and check if environment variables are loaded
3. In your browser console, type:
   ```javascript
   console.log({
     endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
     projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
     databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
     collectionId: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID
   });
   ```

### Test 2: Submit a Survey
1. Fill out and submit a test survey response
2. Check your Appwrite console → Databases → Collections → Documents
3. Verify the data appears in Appwrite

### Test 3: Admin Panel
1. Go to `/admin`
2. Login with: `admin@ncc.com` / `adminXncc`
3. Check if data loads from Appwrite (should show "Appwrite Database" badge)

## Step 8: Troubleshooting Common Issues

### Issue 1: "Appwrite fetch failed, trying localStorage"

**Causes:**
- Incorrect environment variables
- Wrong project ID or database ID
- Missing platform configuration
- Permission issues

**Solutions:**
1. Double-check all environment variables
2. Verify project ID and database ID in Appwrite console
3. Ensure domains are added to platforms
4. Check collection permissions

### Issue 2: "Collection not found"

**Causes:**
- Wrong collection ID
- Collection doesn't exist
- Database ID is incorrect

**Solutions:**
1. Verify collection ID is exactly `survey_responses`
2. Check database ID matches your Appwrite database
3. Ensure collection exists in the correct database

### Issue 3: "Permission denied"

**Causes:**
- Incorrect permissions on collection
- Missing API key scopes

**Solutions:**
1. Set collection permissions to `any` for all operations
2. Verify API key has all required scopes
3. Check if API key is active

### Issue 4: "CORS errors"

**Causes:**
- Domain not added to platforms
- Incorrect endpoint URL

**Solutions:**
1. Add your domain to Appwrite platforms
2. Verify endpoint URL is correct
3. Check for typos in environment variables

## Step 9: Verification Checklist

Before proceeding, verify:

- [ ] ✅ Appwrite project created
- [ ] ✅ Database created with correct ID
- [ ] ✅ Collection `survey_responses` created
- [ ] ✅ All attributes added with correct names and types
- [ ] ✅ Permissions set to `any` for all operations
- [ ] ✅ API key created with all required scopes
- [ ] ✅ Environment variables file created with actual values
- [ ] ✅ Domains added to platforms
- [ ] ✅ Development server restarted
- [ ] ✅ Test submission successful
- [ ] ✅ Data appears in Appwrite console
- [ ] ✅ Admin panel shows "Appwrite Database" badge

## Step 10: Production Deployment

### Environment Variables for Production
Set these environment variables in your production environment:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_production_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_production_database_id
NEXT_PUBLIC_APPWRITE_COLLECTION_ID=survey_responses
APPWRITE_API_KEY=your_production_api_key
```

### Production Checklist
- [ ] Production domain added to Appwrite platforms
- [ ] Environment variables set in production
- [ ] SSL certificate configured
- [ ] Database permissions verified
- [ ] Test submission in production

## Advanced Configuration

### Real-time Updates
Enable real-time updates for the admin dashboard:

```typescript
import { client } from '@/lib/appwrite';

useEffect(() => {
  const unsubscribe = client.subscribe(
    `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`,
    (response) => {
      console.log('Real-time update:', response);
      fetchSubmissions(); // Refresh data
    }
  );

  return () => unsubscribe();
}, []);
```

### Backup Strategy
1. **Automated Backups**: Set up regular database exports
2. **Data Export**: Use the CSV export feature in admin panel
3. **Version Control**: Keep track of schema changes

### Security Best Practices
1. **API Keys**: Never expose API keys in client-side code
2. **Permissions**: Use role-based permissions in production
3. **Validation**: Validate all data on both client and server
4. **Rate Limiting**: Implement rate limiting for submissions
5. **HTTPS**: Always use HTTPS in production

## Monitoring and Maintenance

### Performance Monitoring
1. Monitor API usage in Appwrite console
2. Track query performance
3. Set up alerts for high usage

### Error Tracking
1. Implement error logging
2. Monitor failed submissions
3. Set up notifications for critical errors

### Regular Maintenance
1. Review and optimize database queries
2. Clean up old test data
3. Update dependencies regularly
4. Monitor storage usage

## Migration from localStorage

If you need to migrate existing localStorage data to Appwrite:

1. **Export localStorage data**:
   ```javascript
   const localData = localStorage.getItem('ncc_survey_submissions');
   console.log(JSON.parse(localData || '[]'));
   ```

2. **Import to Appwrite** (run this in browser console):
   ```javascript
   // This is a one-time migration script
   const migrateData = async () => {
     const localData = JSON.parse(localStorage.getItem('ncc_survey_submissions') || '[]');
     
     for (const submission of localData) {
       try {
         await databases.createDocument(
           'your_database_id',
           'survey_responses',
           submission.id,
           {
             name: submission.name,
             email: submission.email,
             phone: submission.phone,
             student_id: submission.studentId,
             batch: submission.batch,
             department: submission.department,
             experience_level: submission.experienceLevel,
             workshop_topics: submission.workshopTopics,
             expectations: submission.expectations,
             programming_languages: submission.programmingLanguages,
             availability: submission.availability,
             additional_comments: submission.additionalComments || '',
             submitted_at: submission.submitted_at
           }
         );
         console.log('Migrated:', submission.name);
       } catch (error) {
         console.error('Migration failed for:', submission.name, error);
       }
     }
   };
   
   migrateData();
   ```

## Getting Help

### Resources:
- [Appwrite Documentation](https://appwrite.io/docs)
- [Appwrite Discord Community](https://discord.gg/GSeTUeA)
- [GitHub Issues](https://github.com/appwrite/appwrite/issues)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/appwrite)

### Common Support Questions:
1. **"Data not appearing"**: Check permissions and collection structure
2. **"CORS errors"**: Verify platform configuration
3. **"Permission denied"**: Check API key scopes and collection permissions
4. **"Collection not found"**: Verify database and collection IDs

## Final Notes

- **Fallback System**: The application will automatically fall back to localStorage if Appwrite fails, ensuring no data loss
- **Data Persistence**: Both Appwrite and localStorage data persist between sessions
- **Admin Panel**: Shows data source indicator (Appwrite vs localStorage)
- **Error Handling**: Comprehensive error messages help identify configuration issues

After following this guide, your application should connect to Appwrite successfully and stop falling back to localStorage. The admin panel will show "Appwrite Database" badge when properly connected.

---

**Need Help?** If you're still experiencing issues after following this guide, check the browser console for specific error messages and refer to the troubleshooting section above.