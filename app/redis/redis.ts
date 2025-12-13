import { Redis } from "@upstash/redis"

// creating a redis client to interact with 
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})