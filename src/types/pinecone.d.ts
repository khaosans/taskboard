declare module '@pinecone-database/pinecone' {
  export class Pinecone {
    constructor(options: { apiKey: string });

    createIndex(params: {
      name: string;
      dimension: number;
      metric: string;
      spec?: {
        serverless?: {
          cloud: string;
          region: string;
        };
      };
    }): Promise<void>;

    upsert(vectors: Array<{ id: string; values: number[]; metadata?: any }>): Promise<void>;

    query(vector: number[]): Promise<any[]>; // Adjust the return type as needed
  }
}
