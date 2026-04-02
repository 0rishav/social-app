import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://localhost:6379",
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
