import { createClient } from "redis";
import dotenv from "dotenv"

dotenv.config()

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => console.error("Redis Client Error:", err));
redisClient.on("connect", () => console.log("Redis Connected Successfully!"));

const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error("Could not connect to Redis:", err);
  }
};

connectRedis();

export default redisClient;
