// redisClient.js
import { createClient } from 'redis';
import redis from 'redis'

const redisClient = redis.createClient();

redisClient.on('connect', () => {
  console.log('Redis Connected✅');
});

redisClient.on('error', () => {
  console.log('Redis Connection Error')
});

(async () => {
  await redisClient.connect();
})();

const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error('❌ Redis connection failed:', err);
  }
};

export { redisClient, connectRedis };
