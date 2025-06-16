import { Client, Databases, Account, Query } from 'appwrite';

// Initialize Appwrite client
const client = new Client();

// Get environment variables with fallbacks
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '';

// Configure client
client
  .setEndpoint(endpoint)
  .setProject(projectId);

// Initialize services
export const databases = new Databases(client);
export const account = new Account(client);

// Export configuration
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
export const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || 'survey_responses';

// Export Query for convenience
export { Query };

// Export client for real-time subscriptions
export default client;

// Debug function to check configuration
export const checkAppwriteConfig = () => {
  const config = {
    endpoint,
    projectId,
    databaseId: DATABASE_ID,
    collectionId: COLLECTION_ID,
    isConfigured: !!(endpoint && projectId && DATABASE_ID && COLLECTION_ID)
  };
  
  console.log('Appwrite Configuration:', config);
  return config;
};

// Test connection function
export const testAppwriteConnection = async () => {
  try {
    // Try to list documents to test connection
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.limit(1)]
    );
    
    console.log('Appwrite connection successful:', response);
    return { success: true, data: response };
  } catch (error) {
    console.error('Appwrite connection failed:', error);
    return { success: false, error };
  }
};