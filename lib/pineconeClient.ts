import { Pinecone } from '@pinecone-database/pinecone';
// Initialize Pinecone with environment variables
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!, // Use the environment variable
});

export default pinecone;