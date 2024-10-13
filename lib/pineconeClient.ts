import { Pinecone } from "@pinecone-database/pinecone";

class PineconeClientInstance {
  private static instance: PineconeClientInstance;
  private client: Pinecone;

  private constructor() {
    this.client = new Pinecone({
      apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY!,
    });
  }

  public static getInstance(): PineconeClientInstance {
    if (!PineconeClientInstance.instance) {
      PineconeClientInstance.instance = new PineconeClientInstance();
    }
    return PineconeClientInstance.instance;
  }

  public getClient() {
    return this.client;
  }
}

export default PineconeClientInstance.getInstance().getClient();
