import { createClient } from 'redis';

// Create a Redis client
export const redis = createClient({
  url: 'redis://:redis@localhost:6379',
});

redis.connect(); // Connect to the Redis server
