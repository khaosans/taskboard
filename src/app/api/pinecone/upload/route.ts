import { Pinecone } from '@pinecone-database/pinecone';

// Ensure process is defined by using a type assertion or providing a default value
const apiKey = process.env.PINECONE_API_KEY as string; // Type assertion to ensure it's a string

const pc = new Pinecone({
  apiKey: apiKey
});

const indexName = 'notes';

(async () => {
  await pc.createIndex({
    name: indexName,
    dimension: 1024, // Replace with your model dimensions
    metric: 'cosine', // Replace with your model metric
    spec: { 
      serverless: { 
        cloud: 'aws', 
        region: 'us-east-1' 
      }
    } 
  });
})();
