import { Queue } from "bullmq";
import type {
  NotificationJobData,
  NotificationJobName,
} from "./notification.types.js";
import { redisQueueConnection } from "./redis-queue.connection.js";

export const notificationQueue = new Queue<
  NotificationJobData,
  void,
  NotificationJobName
>("notifications", {
  connection: redisQueueConnection,

  defaultJobOptions: {
    attempts: 3,

    backoff: {
      type: "exponential",
      delay: 1000,
    },

    removeOnComplete: {
      count: 1000,
    },

    removeOnFail: {
      count: 5000,
    },
  },
});
