# Appwrite Setup Guide for NCC Robotics Survey

This guide will help you set up Appwrite as the backend for the NCC Robotics survey website.

## Prerequisites

- Node.js installed on your system
- An Appwrite Cloud account or self-hosted Appwrite instance

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

## Step 3: Database Configuration

1. Navigate to **Databases** in your Appwrite console
2. Create a new database called `robotics_survey`
3. Note down the **Database ID**

### Create Collections

Create the following collections:

#### 1. Survey Responses Collection
- **Collection ID**: `survey_responses`
- **Attributes**:
  - `name` (String, required, size: 100)
  - `email` (Email, required, size: 100)
  - `phone` (String, required, size: 15)
  - `institution` (String, required, size: 200)
  - `experience_level` (String, required, size: 50)
  - `workshop_topics` (String[], required)
  - `expectations` (String, required, size: 1000)
  - `programming_languages` (String[], required)
  - `availability` (String, required, size: 100)
  - `additional_comments` (String, optional, size: 1000)
  - `submitted_at` (DateTime, required, default: now())

#### 2. Workshop Sessions Collection (Optional)
- **Collection ID**: `workshop_sessions`
- **Attributes**:
  - `title` (String, required, size: 200)
  - `description` (String, required, size: 1000)
  - `date` (DateTime, required)
  - `duration` (String, required, size: 50)
  - `max_participants` (Integer, required)
  - `current_participants` (Integer, required, default: 0)

## Step 4: Environment Variables

Create a `.env.local` file in your Next.js project root with the following variables:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here
NEXT_PUBLIC_APPWRITE_COLLECTION_ID=survey_responses
APPWRITE_API_KEY=your_api_key_here
```

## Step 5: Permissions Setup

For each collection, set up the following permissions:

### Survey Responses Collection
- **Create**: Any (for public survey submission)
- **Read**: Users (for admin dashboard)
- **Update**: Users (for admin purposes)
- **Delete**: Users (for admin purposes)

### Workshop Sessions Collection (if used)
- **Create**: Users
- **Read**: Any
- **Update**: Users
- **Delete**: Users

## Step 6: Testing the Connection

1. Start your Next.js development server
2. Try submitting a test survey response
3. Check your Appwrite console to verify the data was stored

## Security Best Practices

1. **API Keys**: Never expose your API key in client-side code
2. **Permissions**: Set up proper read/write permissions for collections
3. **Validation**: Always validate data on both client and server side
4. **Rate Limiting**: Consider implementing rate limiting for form submissions

## Backup and Monitoring

1. Regularly backup your database
2. Monitor usage through the Appwrite console
3. Set up alerts for high usage or errors

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your domain is added to the platform settings in Appwrite
2. **Permission Denied**: Check collection permissions and user authentication
3. **Connection Failed**: Verify your endpoint URL and project ID

### Getting Help:

- [Appwrite Documentation](https://appwrite.io/docs)
- [Appwrite Discord Community](https://discord.gg/GSeTUeA)
- [GitHub Issues](https://github.com/appwrite/appwrite/issues)

## Next Steps

After setting up Appwrite:

1. Test the survey form thoroughly
2. Set up an admin dashboard to view responses
3. Configure email notifications for new submissions
4. Consider implementing real-time updates for workshop capacity

---

**Note**: This setup assumes you're using Appwrite Cloud. If you're self-hosting Appwrite, replace the endpoint URL with your own server URL.