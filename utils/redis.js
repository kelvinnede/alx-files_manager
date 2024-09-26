const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (error) => {
      console.error(error);
    });
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.expAsync = promisify(this.client.expire).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  isAlive() {
    return this.client.connected;
  }
  /* eslint-disable */
  async get(key) {
    const val = await this.getAsync(key);
    return val;
  }

  async set(key, val, dur) {
    this.setAsync(key, val);
    this.expAsync(key, dur);
  }

  async del(key) {
    this.delAsync(key);
}
}
const redisClient = new RedisClient();
module.exports = redisClient;
