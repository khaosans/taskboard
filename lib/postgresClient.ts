import { Pool } from 'pg';

class PostgresClientInstance {
  private static instance: PostgresClientInstance;
  private pool: Pool;

  private constructor() {
    this.pool = new Pool({
      connectionString: process.env.PG_URL,
    });
  }

  public static getInstance(): PostgresClientInstance {
    if (!PostgresClientInstance.instance) {
      PostgresClientInstance.instance = new PostgresClientInstance();
    }
    return PostgresClientInstance.instance;
  }

  public getPool() {
    return this.pool;
  }
}

export default PostgresClientInstance.getInstance().getPool();
