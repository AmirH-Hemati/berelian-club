import { Redis } from "ioredis";

export const redisQueueConnection = new Redis({
  username: "default",
  password: "V6PfqBO001CcA3GzZeybwOPRVAa6vJPL",

  host: "flameproof-selection-golden-19126.db.redis.io",
  port: 19385,

  maxRetriesPerRequest: null,
});

redisQueueConnection.on("connect", () => {
  console.log("BullMQ Redis Connected!");
});

redisQueueConnection.on("error", (error) => {
  console.error("BullMQ Redis Error:", error);
});
