import pinecone from './pineconeClient'; // Import the initialized Pinecone client

// Define RecordMetadataValue to match Pinecone's expectations
type RecordMetadataValue = string | number | boolean | string[];

// Update the RecordMetadata type to match Pinecone's expectations
type RecordMetadata = {
    [key: string]: RecordMetadataValue;
};

export async function insertEmbedding(id: string, vector: number[], metadata: Record<string, any>) {
    const index = pinecone.index('your-index-name');
    await index.namespace('ns1').upsert([{ 
        id, 
        values: vector, 
        metadata: sanitizeMetadata(metadata)
    }]);
}

export async function searchSimilarEmbeddings(vector: number[], topK: number = 5, filter?: object) {
    const index = pinecone.index('your-index-name');
    const results = await index.namespace('ns1').query({
        vector,
        topK,
        includeMetadata: true,
        filter
    });
    return results.matches;
}

// Helper function to sanitize metadata
function sanitizeMetadata(metadata: Record<string, any>): RecordMetadata {
    const sanitized: RecordMetadata = {};
    for (const [key, value] of Object.entries(metadata)) {
        if (value !== null && value !== undefined) {
            if (Array.isArray(value)) {
                sanitized[key] = value.filter(v => typeof v === 'string') as string[];
            } else if (typeof value === 'object') {
                // Convert nested objects to JSON strings
                sanitized[key] = JSON.stringify(value);
            } else if (['string', 'number', 'boolean'].includes(typeof value)) {
                sanitized[key] = value;
            }
        }
    }
    return sanitized;
}