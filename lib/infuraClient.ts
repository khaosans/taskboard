import { ethers } from "ethers";

class InfuraClientInstance {
  private static instance: InfuraClientInstance;
  private provider: ethers.providers.JsonRpcProvider;

  private constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(
      `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`
    );
  }

  public static getInstance(): InfuraClientInstance {
    if (!InfuraClientInstance.instance) {
      InfuraClientInstance.instance = new InfuraClientInstance();
    }
    return InfuraClientInstance.instance;
  }

  public getProvider() {
    return this.provider;
  }
}

export default InfuraClientInstance.getInstance().getProvider();
