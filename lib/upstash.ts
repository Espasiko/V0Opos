import { Redis } from "@upstash/redis"

const redisUrl = process.env.KV_URL
const redisToken = process.env.KV_REST_API_TOKEN

if (!redisUrl || !redisToken) {
  throw new Error("KV_URL and KV_REST_API_TOKEN environment variables must be defined")
}

export const redis = new Redis({
  url: redisUrl,
  token: redisToken,
})

export async function setValue(key: string, value: any) {
  try {
    const res = await redis.set(key, value)
    console.log(`Successfully set key ${key} to value ${value}`)
    return res === "OK"
  } catch (error) {
    console.error(`Failed to set key ${key}:`, error)
    return false
  }
}

export async function getValue(key: string) {
  try {
    const value = await redis.get(key)
    console.log(`Successfully retrieved value for key ${key}:`, value)
    return value
  } catch (error) {
    console.error(`Failed to get key ${key}:`, error)
    return null
  }
}
