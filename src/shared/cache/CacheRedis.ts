import cacheConfig from '@config/cache';
import { Redis as RedisClient } from 'ioredis';

export default class RedisCache {
  private client: RedisClient;

  constructor() {
    this.client = new RedisClient(cacheConfig.config.redis);
  }

  public async save<T>(key: string, value: T): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    return data ? (JSON.parse(data) as T) : null;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }
}
