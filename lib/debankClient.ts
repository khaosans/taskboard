import axios, { AxiosInstance } from 'axios';

class DebankClientInstance {
  private static instance: DebankClientInstance;
  private client: AxiosInstance;

  private constructor() {
    this.client = axios.create({
      baseURL: 'https://pro-openapi.debank.com/v1',
      headers: {
        'AccessKey': process.env.DEBANK_API_KEY!,
      },
    });
  }

  public static getInstance(): DebankClientInstance {
    if (!DebankClientInstance.instance) {
      DebankClientInstance.instance = new DebankClientInstance();
    }
    return DebankClientInstance.instance;
  }

  public getClient() {
    return this.client;
  }
}

export default DebankClientInstance.getInstance().getClient();
