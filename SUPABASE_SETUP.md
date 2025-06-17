# Supabase Setup Guide for NCC Robotics Workshop

This comprehensive guide will help you set up Supabase as the backend for the NCC Robotics survey website.

## Prerequisites

- A Supabase account (free tier available)
- Node.js installed on your system
- Basic understanding of databases and SQL

## Step 1: Create Supabase Project

1. Go to [Supabase](https://supabase.com) and sign up for a free account
2. Click "New Project"
3. Choose your organization (or create one)
4. Fill in project details:
   - **Name**: NCC Robotics Survey
   - **Database Password**: Choose a strong password
   - **Region**: Select the closest region to your users
5. Click "Create new project"
6. Wait for the project to be set up (usually takes 1-2 minutes)

## Step 2: Get Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://your-project-id.supabase.co`)
   - **Anon/Public Key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## Step 3: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the following SQL to create the survey submissions table:

```sql
-- Create survey_submissions table
CREATE TABLE survey_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  student_id TEXT NOT NULL,
  batch TEXT NOT NULL,
  department TEXT NOT NULL,
  experience_level TEXT NOT NULL,
  workshop_topics TEXT[] NOT NULL,
  expectations TEXT NOT NULL,
  programming_languages TEXT[] NOT NULL,
  availability TEXT NOT NULL,
  additional_comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE survey_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (for survey submissions)
CREATE POLICY "Allow public insert" ON survey_submissions
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public read" ON survey_submissions
  FOR SELECT TO anon
  USING (true);

CREATE POLICY "Allow public update" ON survey_submissions
  FOR UPDATE TO anon
  USING (true);

CREATE POLICY "Allow public delete" ON survey_submissions
  FOR DELETE TO anon
  USING (true);

-- Create indexes for better performance
CREATE INDEX idx_survey_submissions_created_at ON survey_submissions(created_at DESC);
CREATE INDEX idx_survey_submissions_department ON survey_submissions(department);
CREATE INDEX idx_survey_submissions_batch ON survey_submissions(batch);
CREATE INDEX idx_survey_submissions_email ON survey_submissions(email);

-- Add some sample data (optional)
INSERT INTO survey_submissions (
  name, email, phone, student_id, batch, department, experience_level,
  workshop_topics, expectations, programming_languages, availability, additional_comments
) VALUES 
(
  'John Doe',
  'john.doe@student.ncc.edu',
  '+1234567890',
  'NCC2024001',
  '12th',
  'CSE',
  'beginner',
  ARRAY['arduino-basics', 'sensor-integration'],
  'I want to learn the basics of robotics and how to program Arduino boards.',
  ARRAY['Python', 'C/C++'],
  '22 June 2025-Sunday-(9 AM - 4 PM)',
  'Very excited to participate!'
),
(
  'Jane Smith',
  'jane.smith@student.ncc.edu',
  '+1234567891',
  'NCC2024002',
  '13th',
  'EEE',
  'intermediate',
  ARRAY['ai-robotics', 'computer-vision'],
  'Looking forward to advanced AI applications in robotics.',
  ARRAY['Python', 'MATLAB', 'JavaScript'],
  '25 June 2025-Wednesday-(9 AM - 4 PM)',
  'I have some experience with basic electronics.'
);
```

4. Click "Run" to execute the SQL
5. You should see "Success. No rows returned" message

## Step 4: Configure Environment Variables

1. In your Next.js project root, create a `.env.local` file
2. Add your Supabase credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Admin credentials for demo
ADMIN_EMAIL=admin@ncc.com
ADMIN_PASSWORD=adminXncc
```

3. Replace `your-project-id` and `your_anon_key_here` with your actual values
4. Save the file and restart your development server

## Step 5: Test the Connection

1. Start your development server: `npm run dev`
2. Open your browser and go to `http://localhost:3000`
3. Fill out and submit a test survey
4. Go to your Supabase dashboard → **Table Editor** → **survey_submissions**
5. You should see your test submission in the table

## Step 6: Test Admin Panel

1. Go to `http://localhost:3000/admin`
2. Login with:
   - **Email**: admin@ncc.com
   - **Password**: adminXncc
3. You should see your submissions loaded from Supabase
4. The data source indicator should show "Supabase Database"

## Step 7: Verify Real-time Updates (Optional)

Supabase supports real-time updates. To test:

1. Open the admin panel in one browser tab
2. Submit a new survey in another tab
3. The admin panel should automatically update with the new submission

## Database Schema Details

### Table: `survey_submissions`

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key, auto-generated |
| `name` | TEXT | Student's full name |
| `email` | TEXT | Student's email address |
| `phone` | TEXT | Student's phone number |
| `student_id` | TEXT | Student ID number |
| `batch` | TEXT | Student's batch (10th, 11th, 12th, 13th, 14th) |
| `department` | TEXT | Department code (TEX, IPE, CSE, EEE, FDAE) |
| `experience_level` | TEXT | Experience level (beginner, intermediate, advanced) |
| `workshop_topics` | TEXT[] | Array of selected workshop topics |
| `expectations` | TEXT | Student's learning expectations |
| `programming_languages` | TEXT[] | Array of known programming languages |
| `availability` | TEXT | Preferred workshop date |
| `additional_comments` | TEXT | Optional additional comments |
| `created_at` | TIMESTAMP | Submission timestamp |

## Security Configuration

### Row Level Security (RLS)

The table has RLS enabled with policies that allow:
- **Public Insert**: Anyone can submit surveys
- **Public Read**: Anyone can view submissions (for admin panel)
- **Public Update**: Anyone can update submissions (for admin editing)
- **Public Delete**: Anyone can delete submissions (for admin management)

### Production Security Recommendations

For production deployment, consider:

1. **Restrict Admin Access**: Create authenticated policies for admin operations
2. **API Rate Limiting**: Enable rate limiting in Supabase dashboard
3. **Email Validation**: Add email verification for submissions
4. **Data Validation**: Add database constraints for data integrity

## Troubleshooting

### Common Issues

1. **"Invalid API key" error**
   - Check that your anon key is correct
   - Ensure the key hasn't expired
   - Verify the project URL is correct

2. **"Table doesn't exist" error**
   - Make sure you ran the SQL schema creation script
   - Check that the table name is `survey_submissions`
   - Verify you're connected to the correct project

3. **"Permission denied" error**
   - Ensure RLS policies are set up correctly
   - Check that the policies allow the required operations
   - Verify the anon key has the necessary permissions

4. **Connection timeout**
   - Check your internet connection
   - Verify the Supabase project is running
   - Try refreshing the page

### Debug Steps

1. **Check Environment Variables**:
   ```javascript
   console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
   console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...');
   ```

2. **Test Connection**:
   ```javascript
   import { supabase } from '@/lib/supabase';
   
   const testConnection = async () => {
     const { data, error } = await supabase.from('survey_submissions').select('count');
     console.log('Connection test:', { data, error });
   };
   ```

3. **Check Browser Console**: Look for any error messages in the browser developer tools

## Advanced Features

### Real-time Subscriptions

Enable real-time updates in the admin panel:

```javascript
useEffect(() => {
  const subscription = supabase
    .channel('survey_submissions')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'survey_submissions' },
      (payload) => {
        console.log('Real-time update:', payload);
        fetchSubmissions(); // Refresh data
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, []);
```

### Data Export

Export data to CSV:

```javascript
const exportToCSV = async () => {
  const { data } = await supabase
    .from('survey_submissions')
    .select('*')
    .csv();
  
  // Download CSV file
  const blob = new Blob([data], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'survey_submissions.csv';
  a.click();
};
```

### Analytics Dashboard

Create analytics views:

```sql
-- Create a view for department statistics
CREATE VIEW department_stats AS
SELECT 
  department,
  COUNT(*) as total_submissions,
  COUNT(*) FILTER (WHERE experience_level = 'beginner') as beginners,
  COUNT(*) FILTER (WHERE experience_level = 'intermediate') as intermediate,
  COUNT(*) FILTER (WHERE experience_level = 'advanced') as advanced
FROM survey_submissions
GROUP BY department;
```

## Production Deployment

### Environment Variables for Production

Set these in your production environment:

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_secure_admin_password
```

### Performance Optimization

1. **Database Indexes**: Already created for common queries
2. **Connection Pooling**: Supabase handles this automatically
3. **Caching**: Consider implementing client-side caching for admin panel
4. **CDN**: Use Vercel or similar for static asset delivery

### Monitoring

1. **Supabase Dashboard**: Monitor database usage and performance
2. **Error Tracking**: Implement error logging for production issues
3. **Analytics**: Track form completion rates and user behavior

## Backup and Recovery

### Automated Backups

Supabase provides automated daily backups for paid plans. For free tier:

1. **Manual Exports**: Regularly export data via SQL or CSV
2. **Schema Backup**: Save your SQL schema creation script
3. **Environment Backup**: Keep a secure copy of your environment variables

### Data Migration

If migrating from another system:

```sql
-- Example migration script
INSERT INTO survey_submissions (
  name, email, phone, student_id, batch, department,
  experience_level, workshop_topics, expectations,
  programming_languages, availability, additional_comments
)
SELECT 
  name, email, phone, student_id, batch, department,
  experience_level, string_to_array(workshop_topics, ','),
  expectations, string_to_array(programming_languages, ','),
  availability, additional_comments
FROM old_survey_table;
```

## Support and Resources

### Documentation
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

### Community
- [Supabase Discord](https://discord.supabase.com/)
- [Supabase GitHub](https://github.com/supabase/supabase)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/supabase)

### Getting Help

If you encounter issues:

1. Check the troubleshooting section above
2. Review the Supabase dashboard for error logs
3. Check browser console for client-side errors
4. Consult the Supabase documentation
5. Ask for help in the Supabase Discord community

---

**Congratulations!** Your NCC Robotics Workshop registration system is now powered by Supabase. The system provides real-time updates, robust data storage, and a scalable foundation for your workshop management needs.