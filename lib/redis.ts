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

export async function getSession(sessionId: string): Promise<any | null> {
  try {
    const sessionData = await redis.get(sessionId)
    return sessionData ? JSON.parse(sessionData as string) : null
  } catch (error) {
    console.error("Error getting session:", error)
    return null
  }
}

export async function setSession(sessionId: string, data: any): Promise<void> {
  try {
    await redis.set(sessionId, JSON.stringify(data))
  } catch (error) {
    console.error("Error setting session:", error)
  }
}

export async function deleteSession(sessionId: string): Promise<void> {
  try {
    await redis.del(sessionId)
  } catch (error) {
    console.error("Error deleting session:", error)
  }
}
