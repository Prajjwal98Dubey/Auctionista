import { createClient } from "redis";

let redisClient;

export const connectRedisServer = async () => {
  redisClient = createClient();
  redisClient.on("error", (err) => console.log(err));
  await redisClient.connect();
  return redisClient;
};
